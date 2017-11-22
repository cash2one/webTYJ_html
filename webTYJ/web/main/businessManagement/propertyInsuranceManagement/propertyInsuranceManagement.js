/**
 * Created by NM on 2018/1/18.
 * 物业保险管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('propertyInsuranceManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex=2;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };

    }]);
});