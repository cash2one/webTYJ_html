/**
 * Created by NM on 2016/1/22.
 * 建筑组件初始化
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('buildingInitializationCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        /**
         * 选中样式
         * @type {number}
         */
        $scope.btnIndex = 3;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };
    }]);
});