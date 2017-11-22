/**
 * Created by Administrator on 2015/5/17.
 * 人员信息常用
 */

/**
 * Created by NM on 2018/1/18.
 * 人员信息js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('commonUserCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.search={};
        $scope.search.staffName=$rootScope.user.name;

        //停车卡相关
        $http.post(url+'/PersonCustNew/propertyServiceSearchCommon',{Search:$scope.search}).success(function(data)
        {
            console.log("搜索成功");
            $scope.propertyService=data.propertyService;
            console.log($scope.propertyService);

            //车位相关
            $scope.stalls=$scope.propertyService.stalls;
            $scope.stall=$scope.stalls[1];
            //门禁卡相关
            $scope.caraccesscards=$scope.propertyService.caraccesscards;
            $scope.caraccesscard=$scope.caraccesscards[1];
            //车辆相关
            $scope.carInfos=$scope.propertyService.carInfos;
            $scope.carInfo=$scope.propertyService.carInfos[1];
            //门禁卡

            $scope.entrances=$scope.propertyService.entrances;
            $scope.entrance=$scope.propertyService.entrances[1];

            //服务请求相关

            //计费相关
        });

        $scope.GetUser=function(customerId){
            console.log(customerId);
            if(customerId!=0){
                $http.get(url+'/ServiceRequest/getServiceRequestbyCustomerId/'+customerId).success(function(data){
                    $scope.ServiceRequest = data.ServiceRequest;
                    $scope.doClick(2);
                    //$location.path("/index/propertyService/staffHome/serviceRequestNew/"+customerId);
                    $location.path("/index/propertyService/staffHome/serviceRequestNew");
                }).error(function(data,status,headers,config){
                    layer.alert('查询失败！',{icon : 2});
                });
            }
        };

        /**
         * 控制跳转
         */
        $scope.Jump = function(num)
        {
            switch (num)
            {
                case 1:
                    $scope.change(1);
                    $scope.change(1);
                    $scope.doClick(16);
                    $location.path("/index/propertyService/staffHome/accountManagement");
                    break;
                case 3:
                    $scope.change(1);
                    $scope.doClick(10);
                    $location.path("/index/propertyService/staffHome/changeTitle");
                    break;
                case 4:
                    $scope.change(1);
                    $scope.doClick(9);
                    $location.path("/index/propertyService/staffHome/entranceGuard/checkEntranceGuard");
                    break;
                case 5:
                    $scope.doClick(8);
                    $location.path("/index/propertyService/staffHome/parkingCard/historyRecord");
                    break;
                case 6:
                    $scope.doClick(7);
                    $location.path("/index/propertyService/staffHome/vehicleManagement/vehicleManagementCheck");
                    break;
            }
        };

    }]);
});