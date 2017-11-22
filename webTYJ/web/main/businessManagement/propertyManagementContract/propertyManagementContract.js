/**
 * Created by NM on 2018/1/18.
 * 物业合同管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('propertyManagementContractCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //鼠标点击选中
        $scope.btnIndex = 2;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

    }]);
});