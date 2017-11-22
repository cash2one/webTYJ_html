/**
 * Created by NM on 2018/1/18.
 * 巡检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('plansCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.$btnIndex = 1;
        $scope.doClick = function(index){
            $scope.$btnIndex = index;
        }
        $location.path("/index/serviceRequest/patrolManagement/plans/validPlans");

    }]);
});
