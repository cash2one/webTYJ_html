/**
 * Created by wz on 2016/03/31.
 * 计费管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('productAndPropertyCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = '1';

        $scope.doClick = function(item){
            $scope.btnIndex = item;
        };

    }]);
});