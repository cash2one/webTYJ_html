/**
 * Created by Administrator on 2016/1/29.
 *
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('systemManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test = 111;
        console.log($scope.test);
    }]);
});