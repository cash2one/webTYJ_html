/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('printReceiptCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClickForAccount(9);
        $scope.test = 111111111;

    }]);
});
