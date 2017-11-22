/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('meterLogStatementsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test = '日志报表';
        var url = $rootScope.url;
        $scope.searchLog = {page: {}};       //url地址
        $scope.load = function () {
            var electricCheckFunction = function (page, callback) {
                $scope.searchLog.page = page;
                $http.post(url + '/Log/listPageElectricityLog',
                    {SearchLog: $scope.searchLog}).success(callback);
            };
            $scope.electricChecks = app.get('Paginator').list(electricCheckFunction, 6);
            console.log($scope.electricChecks);
        }
        $scope.load();
        $scope.checkCurrentElectric = function (item) {
            $scope.btnIndex = item;
            $scope.item2 = item;
        };


    }]);
});
