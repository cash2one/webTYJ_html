/**
 * Created by NM on 2018/1/18.
 * 租赁管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('leaseManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = 2;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };

    }]);
});