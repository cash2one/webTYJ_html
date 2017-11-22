/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('refundCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.test='退款';
        var url = $rootScope.url;             //IP地址

        $scope.searchBill = {page: {}};      //分页
        $scope.Bill={};
        var checkBill= function (page, callback) {
            $scope.searchBill.page = page;
            $http.post(url + '/Bill/listPageBill', {Bill: $scope.searchBill}).success(callback);
        };
        $scope.currentMeter = app.get('Paginator').list(checkBill, 6);
        $scope.showStatus=1;
        //网格  chenqiuxu  2016.02.03
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }
        //console.log($scope.currentMeter);
        //退款
        $scope.refundMoney=function(){
            if($scope.d==false){
                alert("请先选择退款项 ");
            }else if($scope.d==true) {
                if (confirm("是否退款？")) {
                    $http.put(url + '/Bill/updateRefund', {Bill: $scope.billRefund}).success(function () {
                        alert("成功");
                        $scope.currentMeter._load();

                    }).error(function (data, status, headers, config) {
                        alert("失败");
                    });
                }
            }
        };

        //冲正
        $scope.Impact=function(){
            if($scope.d==false){
                alert("请先选择冲正项 ");
            }else if($scope.d==true) {
                if (confirm("是否冲正？")) {
                    $http.put(url + '/Bill/updateImpact', {Bill: $scope.billRefund}).success(function () {

                        $scope.currentMeter._load();

                    }).error(function (data, status, headers, config) {
                        alert("失败");
                    });
                }
                ;
            }
        };

        //退款网格
        $scope.refundMoneyDiv=function(item){
                if (confirm("是否退款？")) {
                    $http.put(url + '/Bill/updateRefund', {Bill: item}).success(function () {
                        alert("成功");
                        $scope.currentMeter._load();

                    }).error(function (data, status, headers, config) {
                        alert("失败");
                    });
                }
        };

        //冲正 网格
        $scope.ImpactDiv=function(item){
                if (confirm("是否冲正？")) {
                    $http.put(url + '/Bill/updateImpact', {Bill: item}).success(function () {

                        $scope.currentMeter._load();

                    }).error(function (data, status, headers, config) {
                        alert("失败");
                    });
                } ;
        }
        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.billRefund=item;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };

    }]);
});