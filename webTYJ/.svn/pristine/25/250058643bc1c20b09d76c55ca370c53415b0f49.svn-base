/**
 * Created by NM on 2018/1/18.
 * 收银员 交账
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('accountForCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClickForAccountFor(1);
        var url = $rootScope.url;
        $scope.btnIndex =1;
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.black = 0;
        var user = {employId: ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie ? userCookie : user;
        $scope.postName = $scope.user.staff.post;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.payDetails=[];

        $scope.doClick = function(index) {
            $scope.btnIndex = index;
            if ($scope.btnIndex == 1) {
                $scope.show1 = true;
                $scope.show2 = false;
                $scope.load();
            }
            if ($scope.btnIndex == 2) {
                $scope.show1 = false;
                $scope.show2 = true;
                $scope.loadData();
            }
        }

        //新增 交账对象
        $scope.addAccountRecord={
            accountTotalNum:'',//交账笔数
            cashSum:'',//现金金额
            creditCardSum:'',//刷卡金额
            wechatSum:'',//微信金额
            refundSum:'',//退款金额
            financialStaffId:'',//交账人id
            staffId:'',//收账人id
            totalSum:''//总金额
        };

        $scope.financialStaffFirst={
            financialStaffId:'',
            postId:''//岗位id
        };
        $scope.paymentDetails={};//收支明细对象
        $scope.accountRecordData={};//交账对象


        //将所有的收款金额相加 显示
        $scope.ids=[];//得到结算数据的id
        $scope.num=0;//交账笔数

        $scope.load=function() {
            //收款记录各类总金额
            $scope.totals = {
                cashTotal: 0, creditTotal: 0, wechatTotal: 0,totalSum: 0
            };
            //根据登录人的员工id查询
            $scope.paymentDetails = {page:{},financialStaffId:''};
            var listPage = function (page, callback) {
                $scope.paymentDetails.financialStaffId = $scope.user.employId;
                $scope.paymentDetails.projectId = $scope.project.projectId;
                $scope.paymentDetails.page=page;
                $http.post(url + '/PaymentDetails/listPageWithPaymentDetails',{PaymentDetails:$scope.paymentDetails}).success(callback);
            }
            $scope.searchPaginator2=app.get('Paginator').list(listPage,6);

            //收款记录中总金额，现金总额，刷卡总额，微信总额
            $http.get(url + '/PaymentDetails/getPaymentDatilsSumByStaffId/'+$scope.user.employId+'/'+$scope.project.projectId).success(function(data){
                $scope.payDetails = data.PaymentDetails;
                for(var i=0;i<$scope.payDetails.length;i++) {
                    $scope.totals.cashTotal = $scope.totals.cashTotal +$scope.payDetails[i].cashSum;//现金总额
                    $scope.totals.creditTotal = $scope.totals.creditTotal + $scope.payDetails[i].creditCardSum;//刷卡总额
                    $scope.totals.wechatTotal = $scope.totals.wechatTotal + $scope.payDetails[i].wechatSum;//微信总额
                    $scope.paymentDetailsId = $scope.payDetails[i].paymentDetailsId;
                    $scope.ids.push($scope.paymentDetailsId);
                    $scope.num=$scope.payDetails.length;
                }
                $scope.totals.totalSum=$scope.totals.cashTotal+ $scope.totals.wechatTotal+$scope.totals.creditTotal;
            });

            //收款记录中已交金额总和
            $http.get(url + '/AccountRecord/queryByFsid/' +$scope.user.employId+'/'+$scope.project.projectId).success(function (data) {
                $scope.accountRecordData = data.AccountRecord;
            });
        };
        $scope.load();

        //弹出现金缴款模态框
        $scope.cashHand=function(){
            $scope.noHandedSum = $scope.totals.cashTotal - $scope.accountRecordData.cashSum;
            if( $scope.noHandedSum != 0) {
                angular.element('#cash').modal({backdrop: 'static', keyboard: false});
                $scope.addAccountRecord.cashSum = '';
            }else{
                layer.msg('没有现金未交账!', {icon: 0, time: 2000});
            }
        }
        /**现金交款 */
        $scope.account=function(){
            $scope.noHandedSum = $scope.totals.cashTotal - $scope.accountRecordData.cashSum;
            if ($scope.addAccountRecord.cashSum != "") {
                if ($scope.addAccountRecord.cashSum > $scope.noHandedSum) {
                    layer.msg('交账金额不能大于未交帐金额!', {icon: 0});
                    return;
                }
                if (IsNum($scope.addAccountRecord.cashSum)) {
                    $scope.addAccountRecord.accountType = 0;//现金交账类型
                    $scope.addAccountRecord.accountTotalNum = 1;//交账笔数
                    $scope.addAccountRecord.financialStaffId= $scope.user.employId;//交账人
                    $scope.addAccountRecord.cashSum= $scope.addAccountRecord.cashSum;
                    $scope.addAccountRecord.projectId= $scope.project.projectId;
                    $http.post(url + '/AccountRecord/insertAccountRecordRes', {AccountRecord: $scope.addAccountRecord}).success(function(){
                        layer.msg('现金交账成功', {icon: 1, time: 2000});
                        angular.element('#cash').modal('hide');
                        $scope.load();
                    }).error(function (data, status, headers, config) {
                        layer.msg('现金交账失败', {icon: 3, time: 2000});
                    });
                }
            } else {
                layer.msg('请输入交账金额', {icon: 0});
            }
        };

        /********结算********/
        //结算模态框
        $scope.toAccount=function(){
            angular.element('#account').modal({backdrop: 'static', keyboard: false});
        }

        //确认交账
        $scope.handAccount=function(){
            if($scope.payDetails.length >0) {
                $scope.addAccountRecord.parentId ="";
                $scope.diss=[];
                $scope.diss=uniqueArray( $scope.ids) ;
                for (var i = 0; i < $scope.diss.length; i++) {
                    if (i < $scope.diss.length) {
                        $scope.addAccountRecord.parentId += $scope.ids[i] + ",";
                    }else{
                        $scope.addAccountRecord.parentId += $scope.ids[i];
                    }
                }
                $scope.addAccountRecord.accountType = 1;//结算
                $scope.addAccountRecord.cashSum = $scope.totals.cashTotal - $scope.accountRecordData.cashSum;//现金金额
                $scope.addAccountRecord.creditCardSum = $scope.totals.creditTotal;//刷卡金额
                $scope.addAccountRecord.wechatSum = $scope.totals.wechatTotal;//微信金额
                $scope.addAccountRecord.totalSum =$scope.addAccountRecord.cashSum+$scope.addAccountRecord.creditCardSum+$scope.addAccountRecord.wechatSum;//总金额
                $scope.addAccountRecord.accountTotalNum = $scope.num;//交账笔数
                $scope.addAccountRecord.financialStaffId= $scope.user.employId;
                $scope.addAccountRecord.projectId= $scope.project.projectId;
                $http.post(url + '/AccountRecord/insertAccountRecordRes', {AccountRecord: $scope.addAccountRecord}).success(function () {
                        layer.msg('结算成功', {icon: 1, time: 2000});
                        $('#account').modal('hide');
                        $scope.load();//重新加载数据
                    }).error(function (data, status, headers, config) {
                        layer.msg('结算失败', {icon: 3, time: 2000});
                    })
            }else{
                layer.msg('没有结算数据!', {icon: 1, time: 2000});
            }
        };


        //分页显示 交账中的数据
        $scope.accountR={page:{},financialStaffId:''};
        $scope.loadData=function(){
            var fetchFunction = function(page,callback) {
                $scope.accountR.financialStaffId=$scope.user.employId;
                $scope.accountR.projectId=$scope.project.projectId;
                $scope.accountR.page=page;
                $http.post(url + '/AccountRecord/listPageByState',{AccountRecord:$scope.accountR}).success(callback);
            };
            $scope.searchPaginator1=app.get('Paginator').list(fetchFunction,6);
        }

        //判断是否选中
        $scope.accountRecords={accountRecordList:[]};
        $scope.getData=function(data){
            var chk = document.getElementById(data.accountRecordId);
            $scope.data={};
            $scope.data=data;
            if(chk.checked == true){
                $scope.accountRecords.accountRecordList.push($scope.data);
            }else{
                $scope.tem=[];
                $scope.tem=$scope.accountRecords.accountRecordList;
                $scope.accountRecords={accountRecordList:[]};
                for(var i = 0; i < $scope.tem.length; i ++){
                    if($scope.tem[i].accountRecordId != data.accountRecordId){
                        $scope.accountRecords.accountRecordList.push($scope.data);
                    }
                }
            }
        };

        //撤回
        $scope.withDraw=function(){
            if($scope.accountRecords.accountRecordList.length>0){
                layer.confirm('确定要撤回选中的数据?', {btn: ['确定', '取消']}, function(){
                    $http.put(url + '/AccountRecord/backAccountRecordData', {AccountRecord: $scope.accountRecords}).success(function(){
                        layer.msg("退回成功!", {icon: 1, time: 2000});
                        $scope.loadData();//刷新
                        $scope.accountRecords = {accountRecordList: []};
                    }).error(function (data, status, headers, config) {
                        layer.msg("退回失败!", {icon: 3, time: 2000});
                    })
                });
            }else{
                layer.msg('请选择需要撤回的数据!',{icon : 0});
            }
       };

        //查看详情
        $scope.getDatils = function(id){
            $scope.banks={};
            $('#datil').modal({backdrop: 'static', keyboard: false});
            $scope.btnIndex=id;
            $http.get(url+'/BankDeposit/getBankDepositById/'+id).success(function(data)              {
                $scope.banks=data.BankDeposit;
            });
        };
    }]);
});

function uniqueArray(data){
    data = data || [];
    var a = {};
    for (var i=0; i<data.length; i++) {
        var v = data[i];
        if (typeof(a[v]) == 'undefined'){
            a[v] = 1;
        }
    };
    data.length=0;
    for (var i in a){
        data[data.length] = i;
    }
    return data;
}

function IsNum(num) {
    var reNum = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    if(num==0){
        layer.msg('交账金额不能为零!', {icon: 0});
        return false;
    }else {
        if (reNum.test(num)) {
            return true;
        } else {
            if (num < 0) {
                layer.msg('交账金额不能为负数', {icon: 0});
                return false;
            } else {
                layer.msg('交账金额必须为数字', {icon: 0});
                return false;
            }
        }
    }
}