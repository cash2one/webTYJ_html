/**
 *  create by Hardy
 *  @date 2016/01/30
 */
'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('videoIntercomCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.shownum = true;
        /**
         * 选中样式
         * @type {number}
         */
        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

        $scope.change = function(item){
            if(item == 0){
                $scope.shownum = true;
            }else if(item == 1){
                $scope.shownum = false;
            }
        };
    }]);
});