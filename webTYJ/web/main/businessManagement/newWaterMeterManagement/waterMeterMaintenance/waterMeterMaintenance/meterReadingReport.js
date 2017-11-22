/**
 * Created by Administrator on 2015/12/15.
 */

        'use strict';

        define(function (require) {
            var app = require('../../../../../app');
            app.controller('meterReadingReportCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test='抄表报表';
        var url=$rootScope.url;
        $scope.fileurl=$rootScope.fileUrl;
        $scope.searchMeter={page:{}};
        $scope.load=function(){
            var waterCheckFunction = function(page,callback){
                $scope.searchMeter.page=page;
                $http.post(url + '/MeterReadingResults/listPageMeterReadingResults',
                    {searchMeter:$scope.searchMeter}).success(callback);
            };
            $scope.waterChecks = app.get('Paginator').list(waterCheckFunction,10);
            console.log($scope.waterChecks);
        }
        $scope.load();
    }]);
});