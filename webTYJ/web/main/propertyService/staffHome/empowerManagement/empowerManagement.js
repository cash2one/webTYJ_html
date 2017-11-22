/**
 * Created by NM on 2018/1/18.
 * 授权管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('empowerManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(3);
        $scope.btnIndex = 2;
        $scope.doClick = function(index) {
            $scope.btnIndex = index;
        }

    }]);
});