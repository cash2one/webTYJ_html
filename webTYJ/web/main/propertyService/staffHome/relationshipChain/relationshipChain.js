/**
 * Created by NM on 2018/1/18.
 * 亲属关系绑定js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('relationshipChainCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(1);
        $scope.doClick(14);
        $scope.btnIndex = 2;
        $scope.doCheck = function(index){
            $scope.btnIndex = index
        }

    }]);
});