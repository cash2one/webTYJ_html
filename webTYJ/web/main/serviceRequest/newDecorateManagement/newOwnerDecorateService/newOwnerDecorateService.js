/**
 * Created by NM on 2018/1/18.
 * 装修管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newOwnerDecorateServiceCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1=true;
        $scope.show2=false;
        $scope.decorate1=function(){
            $scope.show1=true;
            $scope.show2=false;
        }
        $scope.addDecorate1=function(){
            $scope.show1=false;
            $scope.show2=true;
        }
        $scope.lookOwner=function(){
            $location.path("/index/serviceRequest/newDecorateManagement/newAcceptanceTask")
        }

    }]);
});