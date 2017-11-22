/**
 * Created by yeshengqiang on 2016/2/24.
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('administratorSettingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /**
         * 选中样式
         * @type {number}
         */
        $scope.test='管理员设置';
        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

        $scope.shownum = true;
    }]);
});