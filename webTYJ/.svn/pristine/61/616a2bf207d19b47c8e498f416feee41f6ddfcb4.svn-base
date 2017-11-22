/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('newElectricMeterManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };

        //获取登录信息
        var user = {employId: ''};
        //查看登录是否成功
        if (JSON.parse(sessionStorage.getItem("USER_LOGIN")) == null) {
            layer.msg('无登录信息，请重新登录！', {icon: 0, time: 1000});
            $location.path("/login");
            return;
        } else {
            var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
            $scope.user = userCookie ? userCookie : user;
        }

        var url = $rootScope.url;//获取后台访问路径

        $scope.btnIndex = 1;
        $scope.doClick = function (index) {

            if (angular.isUndefined($scope.user.userId)) {
                layer.msg('无登录信息，请重新登录！', {icon: 0, time: 1000});
                $location.path("/login");
            } else {
                //获取登录用户的权限信息
                $scope.userRole = [];
                if (angular.isArray($scope.user.tUserRoles)) {
                    $scope.userRole = $scope.user.tUserRoles;
                } else {
                    $scope.userRole.push($scope.user.tUserRoles);
                }
                //循环用户角色信息，判断是否有超级管理员角色
                var tmp = 0;
                for (var i = 0, len = $scope.userRole.length; i < len; i++) {
                    if ($scope.userRole[i].tRole.roleType == 0) {
                        tmp++;
                    }
                }
                //电表列表，审核
                if (index == 1 || index == 4) {
                    if (tmp > 0) {
                        if (index == 1) {
                            $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                        } else if (index == 4) {
                            $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterAudit");
                        }
                        $scope.btnIndex = index;
                    } else {
                        if ($scope.user.userId != null || angular.isDefined($scope.user.userId)) {
                            if ($scope.user.staff != null) {
                                var count = 0;
                                for (var i = 0, len = $scope.user.staff.post.length; i < len; i++) {
                                    //电表抄表审核员,抄表经理
                                    if ($scope.user.staff.post[i].postId == '112' || $scope.user.staff.post[i].postId == '109') {
                                        count++;
                                    }
                                }
                                if (count > 0) {
                                    if (index == 1) {
                                        $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                                    } else if (index == 4) {
                                        $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterAudit");
                                    }
                                    $scope.btnIndex = index;
                                } else {
                                    layer.msg('权限不足，无法进入！', {icon: 0, time: 2000});
                                    return;
                                }
                            } else {
                                if (index == 1) {
                                    $location.path("/index/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList");
                                } else if (index == 4) {
                                    $location.path("index/businessManagement/newElectricMeterManagement/electricMeterAudit");
                                }
                                $scope.btnIndex = index;
                            }
                        } else {
                            layer.msg('请先登录！', {icon: 0, time: 1000});
                        }
                    }
                } else
                //表计划
                if (index == 2) {
                    if (tmp > 0) {
                        $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterReadingProgram");
                        $scope.btnIndex = index;
                    } else {
                        if ($scope.user.userId != null || angular.isDefined($scope.user.userId)) {
                            if ($scope.user.staff != null) {
                                var count = 0;
                                for (var i = 0, len = $scope.user.staff.post.length; i < len; i++) {
                                    //电表抄表计划员,抄表经理
                                    if ($scope.user.staff.post[i].postId == '115' || $scope.user.staff.post[i].postId == '109') {
                                        count++;
                                    }
                                }
                                if (count > 0) {
                                    $location.path("/iindex/businessManagement/newElectricMeterManagement/electricMeterReadingProgram");
                                    $scope.btnIndex = index;
                                } else {
                                    layer.msg('权限不足，无法进入！', {icon: 0, time: 2000});
                                    return;
                                }
                            } else {
                                $location.path("/iindex/businessManagement/newElectricMeterManagement/electricMeterReadingProgram");
                                $scope.btnIndex = index;
                            }
                        } else {
                            layer.msg('请先登录！', {icon: 0, time: 1000});
                        }
                    }
                } else
                //抄表结果
                if (index == 3) {
                    if (tmp > 0) {
                        $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterReadingResults");
                        $scope.btnIndex = index;
                    } else {
                        if ($scope.user.userId != null || angular.isDefined($scope.user.userId)) {
                            if ($scope.user.staff != null) {
                                var count = 0;
                                for (var i = 0, len = $scope.user.staff.post.length; i < len; i++) {
                                    //电表抄表计划员,抄表经理
                                    if ($scope.user.staff.post[i].postId == '113' || $scope.user.staff.post[i].postId == '109') {
                                        count++;
                                    }
                                }
                                if (count > 0) {
                                    $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterReadingResults");
                                    $scope.btnIndex = index;
                                } else {
                                    layer.msg('权限不足，无法进入！', {icon: 0, time: 2000});
                                    return;
                                }
                            } else {
                                $location.path("/index/businessManagement/newElectricMeterManagement/electricMeterReadingResults");
                                $scope.btnIndex = index;
                            }
                        } else {
                            layer.msg('请先登录！', {icon: 0, time: 1000});
                        }
                    }
                }
            }
        };
    }]);
});