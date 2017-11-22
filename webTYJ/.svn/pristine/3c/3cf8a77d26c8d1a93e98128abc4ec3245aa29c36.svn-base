/**
 * Created by NM on 2018/1/18.
 * 收费项目js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('payServiceCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.projectName=$scope.project.projectName;
        $scope.test = 11111;
        $scope.btnIndex = 1;

        $scope.doClick = function (item) {
            $scope.btnIndex = item;
        };

    }]);
});
