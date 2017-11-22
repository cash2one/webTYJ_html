/**
 * Created by NM on 2018/1/18.
 * 系统设置js
 */

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('systemSettingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //增加系统设置子模块点击时的权限判断  王洲  2016.1.30

        //获取登录人的信息
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        //设置访问后台路径
        var url = $rootScope.url;

        //点击管理员设置时跳转的方法，判断时候有设置管理员的权限
        $scope.checkAuthority = function(index){

            //如果登录信息中账户id为空即无账户信息，则提示需要登陆并跳转到登录页面
            if(angular.isUndefined($scope.user.userId)){
                layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                $location.path("/login");
            }else{

                //如果有账户信息，即已登录，则根据账户的权限进行判断，如果不是超级管理员则提示不能进入该功能
                $scope.roles = [];
                if(angular.isArray($scope.user.tUserRoles)){
                    $scope.roles = $scope.user.tUserRoles;
                }else{
                    $scope.roles.push($scope.user.tUserRoles);
                }
                var temp = 0;
                for(var i = 0,len = $scope.roles.length; i < len; i++){
                    if($scope.roles[i].tRole.roleType == 0){
                        temp ++;
                    }
                }
                if(temp == 0){
                    layer.msg('只有超级管理员可以操作此功能！',{icon : 0,time : 1000});
                }else{
                    if(index == 1){
                        //跳转到岗位设置
                        $location.path("/index/systemSettings/postsSetting/postsSettings");
                    }else if(index == 2){
                        //跳转到管理员设置
                        $location.path("/index/systemSettings/administratorSettings/hRAdminSettings");
                    }else if(index == 3){
                        //跳转到规章制度
                        $location.path("/index/systemSettings/institution");
                    }else if(index == 4){
                        //跳转到属性设置
                        $location.path("/index/systemSettings/attributesSettings");
                    }else{
                        //跳转到专业线管理
                        $location.path("/index/systemSettings/professionallinemanagement");
                    }
                }
            }
        };
    }]);
});
//岗位设置路径：index.systemSettings.postsSetting.postsSettings
//管理员设置路径：index.systemSettings.hRAdminSettings
//规章制度路径：index.systemSettings.institution
//属性设置路径：index.systemSettings.attributesSettings
//专业线管理路径：index.systemSettings.professionallinemanagement