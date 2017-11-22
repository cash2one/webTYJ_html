/**
 * Created by NM on 2018/1/18.
 * 装修日志js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newDecorateCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(6);
        var url = $rootScope.url;

        $http.get(url+'/ServiceRequest/getServiceRequestbyTypeAndCustomerId/1/'+$scope.user.custId).success(function(data){
            $scope.ServiceRequest= data.ServiceRequest;
            console.log(data)
        }).error(function(data,status,headers,config){
            layer.alert('获取失败',{icon : 2});
        });
        $scope.add=function(ite) {

            if (ite != null) {
                $location.path("/index/propertyService/staffHome/decorateShow");
                $rootScope.service=ite
            }else{
                layer.alert('无效的服务ID',{icon : 2});
            }
        };
        $scope.add1=function() {
            $location.path("/index/propertyService/staffHome/decorate");

        };

    }]);
});