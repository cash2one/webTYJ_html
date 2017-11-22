/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('decorationCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.tmpList=[
            'top-chooseHouse',
            'top-applicationData',
            'top-verification',
            'top-payDeposit',
            'top-Alicence',
            'top-workProgress',
            'top-acceptance',
            'top-costClearing'
        ];
        $scope.currentTemplate = "top-chooseHouse";
        $scope.changeTemplate = function(index){
            $scope.currentTemplate =$scope.tmpList[index];
        }

    }]);
});