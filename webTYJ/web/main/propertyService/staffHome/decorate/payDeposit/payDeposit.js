/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('payDepositCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.test="查看缴纳押金";
        $scope.Charges={};

        $http.get(url + '/Charge/listAllCharge').success(function(data) {
            console.log(data);
            $scope.Charge = data.Charge;
        });

    }]);
});