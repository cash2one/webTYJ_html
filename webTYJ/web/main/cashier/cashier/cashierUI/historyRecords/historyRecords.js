/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historyRecordsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClickForAccount(11);
        var url = $rootScope.url;             //IP地址
        $scope.searchPaymentDetails = {page: {}};      //分页
        $scope.PaymentDetails={};
        $scope.showStatus=1;
        var user = {employId: ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie ? userCookie : user;
        $scope.staffId = $scope.user.staff.staffId;
        $scope.searchPaymentDetails.financialStaffId = $scope.staffId;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        /**
         * 查询所有历史记录
         * @param page
         * @param callback
         */
        var checkPayment = function (page, callback) {
            $scope.searchPaymentDetails.page=page;
            $scope.searchPaymentDetails.projectId=$scope.project.projectId;
            $http.post(url + '/PaymentDetails/listPagePaymentDetails', {PaymentDetails: $scope.searchPaymentDetails}).success(callback);
        };
        $scope.currentMeter = app.get('Paginator').list(checkPayment, 6);
        //网格  chenqiuxu  2016.02.03
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }

    }]);
});