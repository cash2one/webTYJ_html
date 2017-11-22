/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('cashierPayCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClickForAccountFor(4);
        var url = $rootScope.url;
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
            if($scope.btnIndex ==1){
                $scope.chooseDatas={chooseData:[]};
                $scope.load();
                $scope.show1 = true;
                $scope.show2 = false;
                $scope.show3 = false;
            }
            if($scope.btnIndex ==2){
                $scope.show1 = false;
                $scope.show2 = true;
                $scope.show3 = false;
                $scope.loadData();
            }
            if($scope.btnIndex ==3){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = true;
                $scope.loadDataf();
            }
        };
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        //搜索条件（0待交账1交账中2已完成）
        $scope.accountRecord={
            staffId:'',
            financialStaffName:'',
            accountState:'',
            page:{}
        };

        //新增 交账对象
        $scope.addAccountRecord={
            accountTotalNum:'0',//交账笔数
            cashSum:'0',//现金金额
            creditCardSum:'0',//刷卡金额
            wechatSum:'0',//微信金额
            refundSum:'0',//退款金额
            financialStaffId:'',//交账人id
            accountState:'',//交账状态（0待交账1交账中2已完成3已退回）
            totalSum:'0',//总金额
            staffId:'',//收账人id
            bList:[],//银行存单列表
            parentId:'',
            accountRecordList:[]//选中的需要交账的数据
        };

        $scope.load=function(){
            var fetchFunction = function(page,callback) {
                $scope.accountRecord.page=page;
                $scope.accountRecord.nameOfCustom = '出纳';
                $scope.accountRecord.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/listByPostId',{AccountRecord:$scope.accountRecord}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);
        }
        $scope.load();

        //判断是否选中
        $scope.chooseDatas={chooseData:[]};
        $scope.getData=function(item){
            var chk = document.getElementById(item.accountRecordId).checked;
            if(chk == true){
                $scope.chooseDatas.chooseData.push(item);
            }else{
                for(var i=0;i<$scope.chooseDatas.chooseData.length;i++){
                    if($scope.chooseDatas.chooseData[i].accountRecordId == item.accountRecordId){
                        $scope.chooseDatas.chooseData.splice(i,1);
                    }
                }
            }
        };

        //确认收账 将状态改为   已完成 保存到收账记录表对象
        $scope.updateData={accountRecordList:[]};
        $scope.verifyAccounts=function(){
            if($scope.chooseDatas.chooseData.length>0){
                for(var j=0;j<$scope.chooseDatas.chooseData.length;j++){
                    if($scope.chooseDatas.chooseData[j].accountState!=0){
                        layer.msg('勾选的数据不能进行收账操作，请重新选择!',{icon : 0});
                        return;
                    }else{
                        $scope.updateData = {accountRecordList: []};
                        $scope.updateData.accountRecordList = $scope.chooseDatas.chooseData;
                        $scope.updateData.staffId=$scope.user.employId;
                        layer.confirm('确定要确认收账吗?',{btn: ['确定', '取消']},function(){
                            $http.put(url + '/AccountRecord/updateAccountState', {AccountRecord: $scope.updateData}).success(function(){
                                layer.msg("收账成功!", {icon: 1, time: 2000});
                                $scope.searchPaginator._load();//刷新
                                $scope.chooseDatas = {chooseData: []};
                            }).error(function (data, status, headers, config) {
                                layer.msg("收账失败!", {icon: 1, time: 2000});
                            });
                        });
                    }
                }
            }else{
                layer.alert('请先选择收账数据!',{icon : 0});
            }
        };

        //查看详情
        $scope.getDatils=function(id){
            $scope.banks={};
            angular.element("#datil").modal({backdrop: 'static', keyboard: false});
            $scope.btnIndex=id;
            $http.get(url+'/BankDeposit/getBankDepositById/'+id).success(function(data)              {
                $scope.banks=data.BankDeposit;
            });
        };

        //交账
        $scope.handAccount=function(){
            $scope.ids=[];//得到选中数据的id
            $scope.addAccountRecord={
                accountTotalNum:'0',//交账笔数
                cashSum:'0',//现金金额
                creditCardSum:'0',//刷卡金额
                wechatSum:'0',//微信金额
                refundSum:'0',//退款金额
                financialStaffId:'',//交账人id
                accountState:'',//交账状态（0待交账1交账中2已完成3已退回）
                totalSum:'0',//总金额
                staffId:'',//收账人id
                bList:[],//银行存单列表
                parentId:'',
                accountRecordList:[]//选中的需要交账的数据
            };
            if($scope.chooseDatas.chooseData.length==0){
                layer.msg('请选择交账数据!',{icon : 0});
            }else {
                for (var i = 0; i < $scope.chooseDatas.chooseData.length; i++) {
                    if ($scope.chooseDatas.chooseData[i].accountState!=1) {
                        layer.msg('勾选的数据不能进行交账操作，请重新选择!', {icon: 0});
                    } else {
                        $('#showAccount').modal({backdrop: 'static', keyboard: false});
                        $scope.addAccountRecord.cashSum=$scope.chooseDatas.chooseData[i].cashSum*1+$scope.addAccountRecord.cashSum*1;
                        $scope.addAccountRecord.creditCardSum=$scope.chooseDatas.chooseData[i].creditCardSum *1+ $scope.addAccountRecord.creditCardSum*1;
                        $scope.addAccountRecord.wechatSum=$scope.chooseDatas.chooseData[i].wechatSum *1+ $scope.addAccountRecord.wechatSum*1;
                        $scope.addAccountRecord.refundSum=$scope.chooseDatas.chooseData[i].refundSum *1;
                        $scope.addAccountRecord.accountTotalNum=$scope.chooseDatas.chooseData.length;
                        $scope.addAccountRecord.totalSum=$scope.addAccountRecord.cashSum+$scope.addAccountRecord.creditCardSum+$scope.addAccountRecord.wechatSum;
                        $scope.id=$scope.chooseDatas.chooseData[i].accountRecordId;
                        $scope.ids.push($scope.id);
                        //获取选中的数据的存单号
                        $scope.addAccountRecord.bList=[];
                        $http.get(url+'/BankDeposit/getBankDepositById/'+$scope.chooseDatas.chooseData[i].accountRecordId).success(function(data){   $scope.banksList={};
                            for(var j=0;j< data.BankDeposit.length;j++){
                                $scope.banksList=data.BankDeposit[j];
                                $scope.addAccountRecord.bList.push($scope.banksList);
                            }
                        });
                    }
                }
            }
        };

        //确认交账
        $scope.insertAccount=function(){
            $scope.total=0.0;//总金额
            for (var i = 0; i < $scope.chooseDatas.chooseData.length; i++) {
                $scope.total = $scope.total * 1 + $scope.addAccountRecord.bList[i].sum * 1;
            }
            if ($scope.total != $scope.addAccountRecord.cashSum) {
                layer.msg('交账总金额数据有误，请重新检查!', {icon: 0});
                return;
            } else {
                //交账人id
                $scope.addAccountRecord.financialStaffId = $scope.user.employId;
                $scope.addAccountRecord.projectId= $scope.project.projectId;
                $scope.addAccountRecord.accountRecordList = $scope.chooseDatas.chooseData;
                $scope.addAccountRecord.parentId = '';
                for (var i = 0; i < $scope.ids.length; i++) {
                    if (i < $scope.ids.length) {
                        $scope.addAccountRecord.parentId += $scope.ids[i] + ",";
                    }else{
                        $scope.addAccountRecord.parentId = $scope.ids[i];
                    }
                }

                $http.post(url + '/AccountRecord/insertAccountRecord', {AccountRecord: $scope.addAccountRecord}).success(function () {
                    layer.msg('交账成功!', {icon: 1, time: 2000});
                    $("#showAccount").modal("hide");
                    $scope.addAccountRecord={
                        accountTotalNum:'0',//交账笔数
                        cashSum:'0',//现金金额
                        creditCardSum:'0',//刷卡金额
                        wechatSum:'0',//微信金额
                        refundSum:'0',//退款金额
                        financialStaffId:'',//交账人id
                        accountState:'',//交账状态（0待交账1交账中2已完成3已退回）
                        totalSum:'0',//总金额
                        staffId:'',//收账人id
                        bList:[],//银行存单列表
                        parentId:'',
                        accountRecordList:[]//选中的需要交账的数据
                    };
                    $scope.searchPaginator._load();//刷新
                    $scope.chooseDatas = {chooseData: []};
                }).error(function (data, status, headers, config) {
                    layer.msg("交账失败", {icon: 3, time: 2000});
                });
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
                        $scope.accountRecords.backPerosn=1;
                        $scope.accountRecords.staffId = $scope.user.employId;
                        layer.confirm('确定要退回选中的数据?', {btn: ['确定', '取消']},function(){
                            $http.put(url + '/AccountRecord/backAccountRecord', {AccountRecord: $scope.accountRecords}).success(function(){
                                layer.msg("退回成功!", {icon: 1, time: 2000});
                                $scope.searchPaginator._load();//刷新
                                $scope.chooseDatas = {chooseData: []};
                            }).error(function (data, status, headers, config) {
                                layer.msg("退回失败!", {icon: 3, time: 2000});
                            });
                        });
                    }
                }
            }else{
                layer.msg('请选择需要退回的数据!',{icon : 0});
            }
        };

        $scope.accountR={page:{},financialStaffId:''};
        $scope.loadData=function(){
            var fetchFunction = function(page,callback) {
                $scope.accountR.page=page;
                $scope.accountR.financialStaffId=$scope.user.employId;//登录人id
                $scope.accountR.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/listPageByState',{AccountRecord:$scope.accountR}).success(callback);
            };
            $scope.searchPaginator1=app.get('Paginator').list(fetchFunction,6);
        }
        $scope.loadData();

        //分页显示 未交账中的数据    BEGIN------------------------------------------------------------------------------
        $scope.loadDataf=function(){
            var fetchFunction = function(page,callback) {
                $scope.accountRecord.page=page;
                $scope.accountRecord.nameOfCustom = '出纳';
                $scope.accountRecord.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/listPageByPost',{AccountRecord:$scope.accountRecord}).success(callback);
            };
            $scope.searchPaginators=app.get('Paginator').list(fetchFunction,6);
        }
        $scope.loadDataf();
        
        //得到选中的数据
        $scope.accounta={accountRecordList:[]};
        $scope.getDatas=function(data){
            var chk = document.getElementById(data.accountRecordId);
            if(chk.checked == true){
                $scope.accounta.accountRecordList.push(data);
            }else{
                $scope.temp = [];
                $scope.temp = $scope.accounta.accountRecordList;
                $scope.accounta={accountRecordList:[]};
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i].accountRecordId != data.accountRecordId){
                        $scope.accounta.accountRecordList.push($scope.temp[i]);
                    }
                }
            }
        };

        //将交账中的数据退回
        $scope.rejection1=function(){
            if($scope.accounta.accountRecordList.length>0){
                for(var i=0;i<$scope.accounta.accountRecordList.length;i++) {
                    if($scope.accounta.accountRecordList[i].accountState!='0') {
                        layer.msg('只能退回未收账数据!',{icon : 0});
                        return;
                    }
                }
                $scope.accounta.backState=0;
                $scope.accounta.backPerosn=2;
                $scope.accounta.staffId=$scope.user.employId;
                layer.confirm('确定要撤回选中的数据？',{btn: ['确定', '取消']},function(){
                    $http.put(url + '/AccountRecord/backAccountRecord', {AccountRecord: $scope.accounta}).success(function(){
                        layer.msg("退回成功!", {icon: 1, time: 2000});
                        $scope.searchPaginator1._load();//刷新
                        $scope.accounta = {accountRecordList: []};
                    }).error(function (data, status, headers, config) {
                        layer.msg("退回失败!", {icon: 3, time: 2000});
                    });
                });
            }else{
                layer.alert('请选择需要退回的数据!',{icon : 0});
            }
        };
    }]);
});