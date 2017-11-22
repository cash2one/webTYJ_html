/**
 * Created by NM on 2018/1/18.
 * 停车卡js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('parkingCardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(8);
        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

    }]);
});
