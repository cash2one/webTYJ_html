/**
 * Created by NM on 2018/1/18.
 * 装修管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('newDecorateManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

      /*  $scope.datils=function(){
            $location.path("/index/serviceRequest/newDecorateManagement/newDecorateServiceManagement")
        }
        $scope.service=function(){
            $location.path("/index/serviceRequest/newDecorateManagement/newDecorateServiceRequestManagement")
        }*/
        $scope.test='newDecorateManagement';
        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };
    }]);
});