/**
 * Created by Administrator on 2015/12/15.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');
    app.controller('logStatementsCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.test = '日志报表';
        var url = $rootScope.url;
        $scope.searchLog = {page: {}};       //url地址
        $scope.load = function () {
            var waterCheckFunction = function (page, callback) {
                $scope.searchLog.page = page;
                $http.post(url + '/Log/listPageWaterLog',
                    {SearchLog: $scope.searchLog}).success(callback);
            };
            $scope.waterChecks = app.get('Paginator').list(waterCheckFunction, 6);
            console.log($scope.waterChecks);
        }
        $scope.load();
        $scope.checkCurrentWater = function (item) {
            $scope.btnIndex = item;
            $scope.item2 = item;
        };

    }]);
});