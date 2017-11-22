/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('costClearingCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.test="查看收费信息";
        $scope.Charges={};

        $http.get(url + '/Charge/listAllCharge').success(function(data) {
            console.log(data);
            $scope.Charge = data.Charge;
        });

    }]);
});