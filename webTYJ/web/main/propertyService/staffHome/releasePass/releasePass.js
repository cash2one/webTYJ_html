/**
 * Created by NM on 2018/1/18.
 * 放行条js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('releasePassCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(1);
        $scope.doClick(13);
        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        }

    }]);
});