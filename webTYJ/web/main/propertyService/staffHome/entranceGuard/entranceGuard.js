/**
 * Created by NM on 2018/1/18.
 * 人员信息门禁卡js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('entranceGuardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(1);
        $scope.doClick(9);
        $scope.btnIndex = 1;
        //鼠标点击选中
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

    }]);
});



