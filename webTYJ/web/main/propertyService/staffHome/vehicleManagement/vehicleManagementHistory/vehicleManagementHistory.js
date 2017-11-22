/**
 * Created by NM on 2018/1/18.
 * 车辆管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('vehicleManagementHistoryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.CarInfo={page:{}};

        $scope.load=function(){
            $scope.CarInfo.owner=$rootScope.user.custId;
            var fetchFunction1 = function (page, callback) {
                $scope.CarInfo.page = page;
                $http.post(url + '/CarInfo/listPageCarInfoByDelete', {CarInfo: $scope.CarInfo}).success(callback)

            };

            $scope.searchPaginator = app.get('Paginator').list(fetchFunction1,6);
            //   console.log($scope.searchPaginator);

        };
        $scope.load();

        //选中车辆
        $scope.carInfoone={};
        $scope.choiceCar=function(carInfo)
        {
            $scope.carInfoone=carInfo;
        };

    }]);
});