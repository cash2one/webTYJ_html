/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../app');
    app.controller('queryGatingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        /**
         * 选中样式
         * @type {number}
         */
        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };
    }]);
});