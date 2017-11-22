/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('allProfessionInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };

    }]);
});