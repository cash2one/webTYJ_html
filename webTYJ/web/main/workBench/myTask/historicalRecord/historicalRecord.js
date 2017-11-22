/**
 * Created by LM on 2015/3/11.
 * 我的任务
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('historicalRecordCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.test = 11111;

    }]);
});
