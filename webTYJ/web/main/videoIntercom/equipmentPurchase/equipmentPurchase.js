/**
 * Created by wuying on 16/5/4.
 */
'use strict';

define(function (require) {
    var app = require('../../../app');
    app.controller('equipmentPurchaseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
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