/**
 * Created by NM on 2018/1/18.
 * 基础管理js
 */

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('baseManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //加入点击模块时的权限判断  王洲  2016.1.30

        //获取登录信息
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        //点击子模块时进行权限判断
        $scope.checkPermission = function(per){
            //用户id为空时即未登录，返回到登录页面
            if(angular.isUndefined($scope.user.userId)){
                layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                $location.path("/login");
            }else{
                //获取登录用户的权限信息，判断是否是超级管理员
                $scope.userRole = [];
                if(angular.isArray($scope.user.tUserRoles)){
                    $scope.userRole = $scope.user.tUserRoles;
                }else{
                    $scope.userRole.push($scope.user.tUserRoles);
                }
                var tmp = 0;
                for(var i = 0,len = $scope.userRole.length; i < len; i ++){
                    if($scope.userRole[i].tRole.roleType == 0){
                        tmp ++;
                    }
                }
                //tmp == 0时不是超级管理员，根据功能权限信息进行判断
                if(tmp == 0){
                    //根据传入的别名进行循环判断，查询是否有对应的权限
                    $scope.perList = [];
                    $scope.perList = $scope.user.tuserPermissions;
                    var flag = 0;
                    for(var i = 0,len = $scope.perList.length; i < len; i ++){
                        if($scope.perList[i].permissions.permissionsDescription == per){
                            flag ++;
                        }
                    }
                    if(flag > 0 || $scope.user.postRole == 'projectManager'){
                        switch (per){
                            case 'property' :
                                $location.path("/index/baseManagement/projectManagement");
                                break;
                            case 'affiliate' :
                                $location.path("/index/baseManagement/subCompanyManagement/subCompanyList");
                                break;
                            case 'component' :
                                $location.path("/index/baseManagement/buildingInitialization/buildingList");
                                break;
                            case 'asset' :
                                $location.path("/index/baseManagement/majorAssetInitialization/queryAssets");
                                break;
                            case 'bindcomponent' :
                                $location.path("/index/baseManagement/buildingComponentBinding");
                                break;
                            case 'contract' :
                                $location.path("/index/baseManagement/newContractInitialization/newContractCheck");
                                break;
                            case 'assetlib' :
                                $location.path("/index/baseManagement/assetPoolManagement");
                                break;
                        }
                    }else{
                        layer.msg('用户没有此模块操作权限！',{icon : 0, time : 1000});
                    }
                }else{
                    //如果登录用户为超级管理员，不做判断
                    switch (per){
                        case 'property' :
                            $location.path("/index/baseManagement/projectManagement");
                            break;
                        case 'affiliate' :
                            $location.path("/index/baseManagement/subCompanyManagement/subCompanyList");
                            break;
                        case 'component' :
                            $location.path("/index/baseManagement/buildingInitialization/buildingList");
                            break;
                        case 'asset' :
                            $location.path("/index/baseManagement/majorAssetInitialization/queryAssets");
                            break;
                        case 'bindcomponent' :
                            $location.path("/index/baseManagement/buildingComponentBinding");
                            break;
                        case 'contract' :
                            $location.path("/index/baseManagement/newContractInitialization/newContractCheck");
                            break;
                        case 'assetlib' :
                            $location.path("/index/baseManagement/assetPoolManagement");
                            break;
                    }
                }
            }
        };

    }]);
});
//物业项目管理路径 ui-sref="index.baseManagement.projectManagement"
//子公司管理路径 ui-sref="index.baseManagement.subCompanyManagement.subCompanyList"
//建筑组件初始化路径 ui-sref="index.baseManagement.buildingInitialization.buildingList"
//专业资产初始化路径 ui-sref="index.baseManagement.majorAssetInitialization.queryAssets"
//建筑组件绑定路径 ui-sref="index.baseManagement.buildingComponentBinding"
//合同初始化路径 ui-sref="index.baseManagement.newContractInitialization.newContractCheck"
//项目资产库管理路径 ui-sref="index.baseManagement.assetPoolManagement"