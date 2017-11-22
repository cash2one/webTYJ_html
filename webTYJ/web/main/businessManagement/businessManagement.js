/**
 * Created by NM on 2018/1/18.
 * 人事管理js
 */

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('businessManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //获取登录信息
        var user = {employId : ''};
        //查看登录是否成功
        if(JSON.parse(sessionStorage.getItem("USER_LOGIN"))==null){
            layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
            $location.path("/login");
            return;
        }else
        {
            var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
            $scope.user = userCookie?userCookie:user;
        }

        var url = $rootScope.url;//获取后台访问路径

        //专业线的查询方法
        $scope.specialtyinfoList = [];
        $scope.user.financial = [];
        $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoRestful').success(function(data){
            $scope.specialtyinfoList = data.SpecialtyInfo;
        });

        $scope.doClick=function(index){

            //首先判断是否登录，未登录给出提示并跳转到登录页面
            if(angular.isUndefined($scope.user.userId)){
                layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                $location.path("/login");
            }else{
                //获取登录用户的权限信息
                $scope.userRole = [];
                if(angular.isArray($scope.user.tUserRoles)){
                    $scope.userRole = $scope.user.tUserRoles;
                }else{
                    $scope.userRole.push($scope.user.tUserRoles);
                }
                //循环用户角色信息，判断是否有超级管理员角色
                var tmp = 0;
                for(var i = 0,len = $scope.userRole.length; i < len; i ++){
                    if($scope.userRole[i].tRole.roleType == 0){
                        tmp ++;
                    }
                }
                //水表管理
                if(index==1){

                    if(tmp > 0){
                        $location.path("/index/businessManagement/newWaterMeterManagement/waterMeterMaintenance/listOfWaterMeter");
                    }else{
                        if($scope.user.userId != null || angular.isDefined($scope.user.userId)) {
                            if ($scope.user.staff != null) {
                                var specialtyIdWater = '';
                                for(var i = 0, len = $scope.specialtyinfoList.length; i < len; i ++){
                                    if($scope.specialtyinfoList[i].specialtyName == '抄表'){
                                        specialtyIdWater = $scope.specialtyinfoList[i].specialtyId;
                                    }
                                }
                                if(specialtyIdWater == ''){
                                    layer.msg('请检查抄表专业线是否开启！',{icon : 0,time : 1000});
                                    return;
                                }
                                var count = 0;
                                for(var i = 0,len = $scope.user.staff.post.length; i < len; i ++){
                                    if($scope.user.staff.post[i].professionalLineId == specialtyIdWater){
                                        count++;
                                    }
                                }
                                if($scope.user.staff.corePost != null || angular.isDefined($scope.user.staff.corePost)){
                                    for(var i = 0, len = $scope.user.staff.corePost.length; i < len; i ++){
                                        if($scope.user.staff.corePost[i].professionalLineId == specialtyIdWater){
                                            count++;
                                        }
                                    }
                                }
                                if(count > 0){
                                    $location.path("/index/businessManagement/newWaterMeterManagement/waterMeterMaintenance/listOfWaterMeter");
                                }else{
                                    layer.msg('只有抄表专业线下的员工可以操作此模块！',{icon : 0,time : 1000});
                                    return;
                                }
                            }else{
                                $location.path("/index/businessManagement/newWaterMeterManagement/waterMeterMaintenance/listOfWaterMeter");
                            }
                        }else{
                            layer.msg('请先登录！',{icon : 0,time : 1000});
                        }
                    }
                }
                //电表管理
            }
        }
        $scope.doClick2=function(index){

            //首先判断是否登录，未登录给出提示并跳转到登录页面
            if(angular.isUndefined($scope.user.userId)){
                layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                $location.path("/login");
            }else{
                //获取登录用户的权限信息
                $scope.userRole = [];
                if(angular.isArray($scope.user.tUserRoles)){
                    $scope.userRole = $scope.user.tUserRoles;
                }else{
                    $scope.userRole.push($scope.user.tUserRoles);
                }
                //循环用户角色信息，判断是否有超级管理员角色
                var tmp = 0;
                for(var i = 0,len = $scope.userRole.length; i < len; i ++){
                    if($scope.userRole[i].tRole.roleType == 0){
                        tmp ++;
                    }
                }
                //电表管理
                if(index==1){

                     if(tmp > 0){
                        $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                     }else{
                         if($scope.user.userId != null || angular.isDefined($scope.user.userId)) {
                             if ($scope.user.staff != null) {
                                 var specialtyIdWater = '';
                                 for(var i = 0, len = $scope.specialtyinfoList.length; i < len; i ++){
                                     if($scope.specialtyinfoList[i].specialtyName == '抄表'){
                                     specialtyIdWater = $scope.specialtyinfoList[i].specialtyId;
                                     }
                                 }
                                 if(specialtyIdWater == ''){
                                    layer.msg('请检查抄表专业线是否开启！',{icon : 0,time : 1000});
                                 return;
                                 }
                                 var count = 0;
                                 for(var i = 0,len = $scope.user.staff.post.length; i < len; i ++){
                                     if($scope.user.staff.post[i].professionalLineId == specialtyIdWater){
                                     count++;
                                 }
                                 }
                                 if($scope.user.staff.corePost != null || angular.isDefined($scope.user.staff.corePost)){
                                     for(var i = 0, len = $scope.user.staff.corePost.length; i < len; i ++){
                                         if($scope.user.staff.corePost[i].professionalLineId == specialtyIdWater){
                                         count++;
                                        }
                                     }
                                 }
                                 if(count > 0){
                                    $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                                 }else{
                                 layer.msg('只有抄表专业线下的员工可以操作此模块！',{icon : 0,time : 1000});
                                 return;
                                 }
                                 }else{
                                     $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                                 }
                                 }else{
                                     layer.msg('请先登录！',{icon : 0,time : 1000});
                             }
                     }
                 }

            }
        }

    }]);
});