/**
 * Created by NM on 2018/1/18.
 * 服务请求js
*/

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('serviceRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.test = 11111;

    }]);
});