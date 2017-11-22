/**
 * Created by NM on 2018/1/18.
 * 账单js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('chargingProgramCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.projectName=$scope.project.projectName;
        $scope.btnIndex = 2;
        $scope.doClick = function(index) {
            $scope.btnIndex = index;
        }

    }]);
});
