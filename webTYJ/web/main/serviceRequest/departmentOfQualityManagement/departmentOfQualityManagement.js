/**
 * Created by NM on 2018/1/18.
 * 部门质检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('departmentOfQMCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /**
         * 选中样式
         * @type {number}
         */
        $scope.test='departmentOfQM';
        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

    }]);
});
