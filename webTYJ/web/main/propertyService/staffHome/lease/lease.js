/**
 * Created by NM on 2018/1/18.
 * 房屋信息里的租赁
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('leaseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(1);
        $scope.doClick(12);
        $scope.btnIndex = 1;
        //鼠标点击选中
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

    }]);
});