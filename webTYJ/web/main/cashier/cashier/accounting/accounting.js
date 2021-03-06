/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('accountingCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClickForAccountFor(5);
        var url = $rootScope.url;             //IP地址
        $scope.searchAccountRecord = {page: {}};      //分页
        $scope.accountRecord={
            staffId:'',
            financialStaffName:'',
            accountState:'',
            page:{}
        };
        $scope.show1 = true;
        $scope.show3 = false;
        $scope.btnIndex =1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
            if($scope.btnIndex ==1){
                $scope.chooseDatas={chooseData:[]};
                $scope.load();
                $scope.show1 = true;
                $scope.show3 = false;
            }
            if($scope.btnIndex ==3){
                $scope.loadDataf();
                $scope.show1 = false;
                $scope.show3 = true;
            }
        };

        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);

        /**
         * 分页显示
         */
        $scope.AccountRecord={};
        $scope.load=function(){
            var fetchFunction = function(page,callback) {
                $scope.searchAccountRecord.page=page;
                $scope.searchAccountRecord.nameOfCustom = '会计';
                $scope.searchAccountRecord.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/listByPostId',{AccountRecord:$scope.searchAccountRecord}).success(callback);
            };
            $scope.currentMeter=app.get('Paginator').list(fetchFunction,6);
        }
        $scope.load();


        //分页显示未交账记录
        var checkAccountRecordUnFinish = function(page, callback){
            $scope.AccountRecordUnFinish = {};
            $scope.AccountRecordUnFinish.page=page;
            $scope.AccountRecordUnFinish.projectId= $scope.project.projectId;
            $http.post(url + '/AccountRecord/listPageAccountRecordUnFinishTest', {AccountRecord : $scope.AccountRecordUnFinish}).success(callback);
        };
        $scope.currentAccountRecord = app.get('Paginator').list(checkAccountRecordUnFinish, 5);

        $scope.lookAccount=function(accountRecordId){
            $('#and').modal({backdrop: 'static', keyboard: false});
            $http.get(url + "/BankDeposit/getBankDepositById/"+accountRecordId).success(function(data){
                $scope.BankDeposit = data.BankDeposit;
            }).error(function(data,status,headers,config){
                layer.msg("失败", {icon: 3, time: 2000});
            });
        };

        //判断是否选中
        $scope.chooseDatas={chooseData:[]};
        $scope.getData=function(item){
            var chk = document.getElementById(item.accountRecordId);
            if(chk.checked == true){
                $scope.chooseDatas.chooseData.push(item);
            }else{
                for(var i=0;i<$scope.chooseDatas.chooseData.length;i++){
                    if($scope.chooseDatas.chooseData[i].accountRecordId == item.accountRecordId){
                        $scope.chooseDatas.chooseData.splice(i,1);
                    }
                }
            }
        };

        //确认收账 将状态改为   已完成
        $scope.updateData={accountRecordList:[]};
        $scope.updateAccountRecord=function(){
            if($scope.chooseDatas.chooseData.length>0){
                for(var j=0;j<$scope.chooseDatas.chooseData.length;j++){
                    if($scope.chooseDatas.chooseData[j].accountState!=0){
                        layer.msg('勾选的数据不能进行收账操作，请重新选择!',{icon : 0});
                        return;
                    }else{
                        $scope.updateData={accountRecordList:[]};
                        $scope.updateData.accountRecordList=$scope.chooseDatas.chooseData;
                        $scope.updateData.staffId=$scope.user.employId;
                        layer.confirm('确定要确认收账?', {btn: ['确定', '取消']},function(){
                            $http.put(url + '/AccountRecord/updateAccountState', {AccountRecord: $scope.updateData}).success(function () {
                                layer.msg("收账成功!", {icon: 1, time: 2000});
                                $scope.currentMeter._load();//刷新
                                $scope.chooseDatas = {chooseData: []};
                            }).error(function (data, status, headers, config) {
                                layer.msg("收账失败!", {icon: 3, time: 2000});
                            });
                        });
                    }
                }
            }else{
                layer.msg('请先选择收账数据',{icon : 0});
            }
        };

        //将未收账的账单退回
        $scope.accountRecords={accountRecordList:[]};
        $scope.rejection=function(){
            if($scope.chooseDatas.chooseData.length>0){
                for(var j=0;j<$scope.chooseDatas.chooseData.length;j++){
                    if($scope.chooseDatas.chooseData[j].accountState!=0){
                        layer.msg('勾选的数据不能退回,请重新选择!',{icon : 0});
                        return;
                    }else{
                        $scope.accountRecords.accountRecordList=$scope.chooseDatas.chooseData;
                        $scope.accountRecords.backState=1;
                        $scope.accountRecords.backPerosn=2;
                        $scope.accountRecords.staffId=$scope.user.employId;
                        layer.confirm('确定要退回选中的数据?',{btn: ['确定', '取消']},function(){
                            $http.put(url + '/AccountRecord/backAccountRecord', {AccountRecord: $scope.accountRecords}).success(function () {
                                layer.msg("退回成功", {icon: 1, time: 2000});
                                $scope.currentMeter._load();//刷新
                                $scope.chooseDatas = {chooseData: []};
                            }).error(function (data, status, headers, config){
                                layer.msg("退回失败", {icon: 3, time: 2000});
                            });
                        });
                    }
                }
            }else{
                layer.msg('请选择需要退回的数据!',{icon : 0});
            }
        };
        //分页显示 未交账中的数据    BEGIN------------------------------------------------------------------------------
        $scope.loadDataf=function(){
            var fetchFunction = function(page,callback) {
                $scope.accountRecord.page=page;
                $scope.accountRecord.nameOfCustom = '会计';
                $scope.accountRecord.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/listPageByPost',{AccountRecord:$scope.accountRecord}).success(callback);
            };
            $scope.searchPaginators=app.get('Paginator').list(fetchFunction,6);
        };
        //分页显示 未交账中的数据    END--------------------------------------------------------------------------------
        $scope.btnCashSum=function(){
            layer.alert('现金交易不支持查看详情', {icon: 0});
        };
        $scope.loadDataf();
        //查看详情
        $scope.getDatils=function(id){
            //$('#datil').modal({backdrop: 'static', keyboard: false});
            angular.element('#datil').modal({backdrop: 'static', keyboard: false});
            $scope.btnIndex=id;
            $http.get(url+'/BankDeposit/getBankDepositById/'+id).success(function(data)
            {
                $scope.banks=data.BankDeposit;
            });
        };

    }]);
});