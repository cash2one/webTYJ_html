/**
 * Created by NM on 2016/1/22.
 * 企业客户管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('enterpriseCustomerCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        /**
         * 选中样式
         * @type {number}
         */
        $scope.btnIndex = 2;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };
    }]);
});