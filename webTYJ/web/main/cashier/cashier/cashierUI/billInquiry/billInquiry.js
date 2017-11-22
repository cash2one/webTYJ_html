/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('billInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1 = false;
        $scope.show2 = false;
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.projectId=$scope.project.projectId;
        //$scope.electronic={page:{}};
        ////条件查询电子账单
        //$scope.load = function () {
        //    var fetchFunction = function (page, callback) {
        //        $scope.electronic.page = page;
        //        $http.post(url + '/ElectronicBilling/listPageElectronicBilling', {ElectronicBilling: $scope.electronic}).success(callback);
        //    };
        //    $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        //    $http.post(url + '/ElectronicBilling/listPageElectronicBilling', {ElectronicBilling: $scope.electronic}).success(function(data){
        //
        //        var bdt = data.PageRestful.electronicBillings[1];
        //        if(bdt!= null){
        //            $scope.showBills(data.PageRestful.electronicBillings[1]);
        //        }else{
        //            $scope.showBills("0");
        //        }
        //    });
        //};
        //$scope.load();

        /**
         * 判断条件是否可以跳转界面
         */
        $scope.searchAssetAccount ={};
        $scope.showManagement = function(){
            if($scope.bill.billNumMonth){
                layer.msg('账单编号不为空，无法查询!',{icon : 0,time : 1000});
                return;
            }
            if(($scope.bill.custName == null || $scope.bill.custName=="")
                && ($scope.bill.cardNum == null || $scope.bill.cardNum == "")
                &&  ($scope.bill.fullName == null || $scope.bill.fullName == "")){
                layer.msg('查询条件不能为空!',{icon : 0,time : 1000});
                return;
            }
            $scope.searchAssetAccount.name=$scope.bill.custName;
            $scope.searchAssetAccount.cardNum=$scope.bill.cardNum;
            $scope.searchAssetAccount.houseAddress=$scope.bill.fullName;
            var searchAssetAccount=JSON.stringify($scope.searchAssetAccount);
            sessionStorage.setItem("searchAssetAccount",searchAssetAccount);
            //更改了路由
            $location.path("/index/cashier/cashier/accountManagements");
        }

        //条件查询电子账单
        $scope.load = function () {
            var fetchFunction = function (page, callback) {
                $scope.bill.page = page;
                $scope.bill.billDate=new Date();
                $scope.bill.projectId= $scope.projectId;
                $http.post(url + '/Bill/listPageFindBillsByPersonMessage', {Bill: $scope.bill}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            $http.post(url + '/Bill/listPageFindBillsByPersonMessage', {Bill: $scope.bill}).success(function(data){
                var bdt = data.PageRestful.bills[1];
                if(bdt!= null){
                    $scope.showBills(data.PageRestful.bills[1]);
                }else{
                    $scope.showBills("0");
                }
            });
        };

        /**
         * 界面跳转取值
         */
        var bill = sessionStorage.getItem("bill");
        $scope.bill = JSON.parse(bill);
        if($scope.bill){
            $scope.load();
        }

        $scope.searchData=function(){
            var s=$scope.bill;//billNumMonth: "1", custName: "2", cardNum: "3", fullName: "4"
            if((s.billNumMonth==null|| s.billNumMonth=='')&&(s.cardNum==null|| s.cardNum=='')&&(s.custName==null|| s.custName=='')&&(s.fullName==null|| s.fullName==''))
            {
                layer.msg('请输入一项关键字用来查询!',{icon : 0,time : 1000});
                return;
            }
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.load();
        };

        $scope.info={billNum:'',total:''};
        $scope.custId='';
        $scope.currData={};//得到当前选择的数据
        //获取电子账单下的应付款账单
        $scope.Bill={page:{},billDate:''}
        $scope.showBills=function(currentData){
            $scope.buildingId = currentData.buildingId;
            $scope.show1 = true;
            $scope.currData=currentData;
            $scope.btnIndex=currentData.buildingId;
            $scope.info.billNumMonth=currentData.billNumMonth;
            $scope.assetAccountId=currentData.assetAccountId;
            $scope.assetAccountNum=currentData.assetAccountNum;
            $scope.info.total=currentData.totalOverdue+currentData.totalLastOweSum+currentData.totalCurrentOweSum;
            var fetchFunction = function (page, callback){
                $scope.Bill.page = page;
                $scope.Bill.billDate=currentData.billDate;
                $scope.Bill.buildingId=currentData.buildingId;
                $scope.Bill.projectId= $scope.projectId;
                $http.post(url + '/Bill/listPageFindChargeBybuildingIdThisMonth', {Bill: $scope.Bill}).success(callback);
            };
            $scope.searchPaginator1 = app.get('Paginator').list(fetchFunction, 6);
        }
        //显示收费的详细信息
        $scope.Billd={page:{},billDate:''}
        $scope.getWaterDetails=function(item) {
            if (item!=null) {
                $scope.chargeTypeName=item.chargeTypeName;
                angular.element('#waterDetailsModal').modal({backdrop: 'static', keyboard: true});
                var fetchFunction = function (page, callback) {
                    $scope.Billd.page = page;
                    $scope.Billd.billDate = item.billDate;
                    //$scope.Billd.electronicBillingId = item.electronicBillingId;
                    $scope.Billd.buildingId=item.buildingId;
                    $scope.Billd.chargeTypeId = item.chargeTypeId;
                    $http.post(url + '/Bill/findChargeDetailsBychargeTypeIdThisMonth', {Bill: $scope.Billd}).success(callback);
                };
                $scope.searchPaginator3 = app.get('Paginator').list(fetchFunction, 6);
            }
            else {
                layer.alert("暂无详情",{icon:0});
            }
        }
        //查询历史账单
        $scope.Billa={page:{},billDate:''};
        $scope.showHistory=function(){
            $scope.show1 = true;
            $scope.show2 = true;
            var fetchFunction = function (page, callback) {
                $scope.Billa.page = page;
                $scope.Billa.billDate= $scope.currData.billDate;
                // $scope.Billa.electronicBillingId = $scope.btnIndex
                //$http.post(url + '/Bill/listPageBillsByelectronicBillingIdLastMonth', {Bill: $scope.Billa}).success(callback);
                $scope.Billa.buildingId=$scope.btnIndex;
                $http.post(url + '/Bill/listPageBillsBybuildingIdLastMonth', {Bill: $scope.Billa}).success(callback);
            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction, 6);
        }
        $scope.Billd={page:{},billDate:''}
        $scope.getHistoryDetails=function(item) {
            if (item!=null) {
                $scope.chargeTypeName=item.chargeTypeName;
                angular.element('#waterDetailsModal').modal({backdrop: 'static', keyboard: true});
                var fetchFunction = function (page, callback) {
                    $scope.Billd.page = page;
                    $scope.Billd.billDate = item.billDate;
                    //$scope.Billd.electronicBillingId = item.electronicBillingId;
                    $scope.Billd.buildingId=item.buildingId;
                    $scope.Billd.chargeTypeId = item.chargeTypeId;
                    $http.post(url + '/Bill/findChargeDetailsBychargeTypeIdLastMonth', {Bill: $scope.Billd}).success(callback);
                };
                $scope.searchPaginator3 = app.get('Paginator').list(fetchFunction, 6);
            }
            else {
                layer.alert("暂无详情",{icon:0});
            }
        }
        //选中数据
        $scope.dataa={list:[]};
        $scope.chooseData={};
        $scope.getData=function(datas){
            datas.buildingId = $scope.buildingId;
            var id=datas.billId;
            var chk = document.getElementById(id);
            $scope.chooseData=datas;
            if(chk.checked == true){
                //$scope.btnIndex=id;
                $scope.dataa.list.push($scope.chooseData);
            }else{
                $scope.temp = [];
                $scope.temp = $scope.dataa.list;
                $scope.dataa={list:[]};
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i].billId != id){
                        $scope.dataa.list.push($scope.temp[i]);
                        //$scope.btnIndex='';
                    }
                }
            }
            event.stopPropagation();
        };

        //添加到购物车
        $scope.addCart=function(){
            //将值传递到收款台页面
            $scope.dataa.custId = $scope.custId;
            $scope.dataa.assetAccountId = $scope.assetAccountId;
            $scope.dataa.chargeTypeName = $scope.chargeTypeName;
            $scope.dataa.assetAccountNum=$scope.assetAccountNum;
            $scope.dataa.chargeType="2";
            if($scope.dataa.list.length>0 ){
                for(var i=0; i<$scope.dataa.list.length; i++){
                    console.info($scope.dataa.list[i].billState);
                    if($scope.dataa.list[i].billState==0){
                        layer.alert("不能添加已托收的账单！", {icon: 0});
                        return;
                    }
                    if($scope.dataa.list[i].billState==3){
                        layer.alert("不能添加已失效的账单！", {icon: 0});
                        return;
                    }
                    if($scope.dataa.list[i].totalCurrentOweSum+$scope.dataa.list[i].totalOverdue+$scope.dataa.list[i].totalLastOweSum ==0)
                    {
                        layer.alert("不能添加本期欠款累计金额为0的账单！", {icon: 0});
                        return;
                    }
                }
                //产生交易单号
                $scope.dataa.paymentNum='';
                $http.get(url + '/PaymentDetails/createPaymentNum/'+$scope.projectId).success(function(data) {
                    $scope.dataa.paymentNum=data.PaymentDetails.paymentNum;
                    var dataa=JSON.stringify($scope.dataa);
                    sessionStorage.setItem("data1",dataa);
                    $location.path("/index/cashier/cashier/cashiers").search();
                });
            }else{
                layer.alert("请先选择数据", {icon: 0});
            }
        };

    }]);
});