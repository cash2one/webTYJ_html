/**
 * Created by NM on 2018/1/18.
 * 人事管理js
 */

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('personnelManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //获取登录用户的权限
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        $scope.shownum = true;
        /**
         * 选中样式
         * @type {number}
         */
        $scope.btnIndex=0;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

        //修改子模块入口显示方法，在跳转前加入权限判断
        $scope.checkPer = function(index){
            $scope.doClick(index);

            //判断用户登录状态
            if(angular.isUndefined($scope.user.userId)){
                layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                $location.path("/login");
            }else{

                //获取登录用户的角色权限
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

                //判断是否是超级管理员，如果是超级管理员不做权限判断，直接跳转
                if(tmp == 0){
                    //如果不是超级管理员，需判断是否有对应模块的权限
                    //初始化存放登录用户功能权限的数组
                    $scope.perList = [];
                    $scope.perList = $scope.user.tuserPermissions;
                    var flag = 0;
                    var items = '';
                    if(index == 0){
                        items = 'app';
                    }else if(index == 1){
                        items = 'person';
                    }else if(index == 2){
                        items = 'coreposition';
                    }else if(index == 3){
                        items = 'admins';
                    }else if(index == 4){
                        items = 'project';
                    }else if(index == 5){
                        items = 'staff';
                    }else {
                        items = 'myteam';
                    }

                    for(var i = 0,len = $scope.perList.length; i < len; i++){
                        if($scope.perList[i].permissions.permissionsDescription == items){
                            flag ++;
                        }
                    }
                    if(items == 'myteam'){
                        if($scope.user.postRole == 'projectManager'){
                            flag ++;
                        }
                    }
                    if(flag == 0){
                        layer.msg('用户没有此模块操作权限！',{icon : 0, time : 1000});
                    }else{
                        switch (items) {
                            case 'person' :
                                $location.path("/index/personnelManagement/staffsuperviseIT/staffsuperviseITCheck");
                                break;
                            case 'coreposition' :
                                $location.path("/index/personnelManagement/corePost");
                                break;
                            case 'admins' :
                                $location.path("/index/personnelManagement/personnelManagement");
                                break;
                            case 'project' :
                                $location.path("/index/personnelManagement/projectTeamManagement");
                                break;
                            case 'staff' :
                                $location.path("/index/personnelManagement/postPersonnelConfiguration");
                                break;
                            case 'myteam' :
                                $location.path("/index/personnelManagement/myTeamManagement");
                                break;
                            case 'app' :
                                $location.path("/index/personnelManagement/appPersonManagement");
                                break;
                        }
                    }
                }else{
                    switch (index) {
                        case 0 :
                            $location.path("/index/personnelManagement/appPersonManagement");
                            break;
                        case 1 :
                            $location.path("/index/personnelManagement/staffsuperviseIT/staffsuperviseITCheck");
                            break;
                        case 2 :
                            $location.path("/index/personnelManagement/corePost");
                            break;
                        case 3 :
                            $location.path("/index/personnelManagement/personnelManagement");
                            break;
                        case 4 :
                            $location.path("/index/personnelManagement/projectTeamManagement");
                            break;
                        case 5 :
                            $location.path("/index/personnelManagement/postPersonnelConfiguration");
                            break;
                        case 8 :
                            $location.path("/index/personnelManagement/myTeamManagement");
                            break;
                    }
                }
            }


        };

        $scope.change = function(item){
            //没有需要分页显示的标签，故屏蔽分页方法  王洲  2016.2.1
            /*if(item == 0){
                $scope.shownum = true;
            }else if(item == 1){
                $scope.shownum = false;
            }*/
        };

    }]);
});

//人事管理模块各子模块路径
//人员管理路径：ui-sref="index.personnelManagement.staffsuperviseIT.staffsuperviseITCheck"
//核心岗位任命路径：ui-sref="index.personnelManagement.corePost"
//人员管理设置路径：ui-sref="index.personnelManagement.personnelManagement"
//项目团队路径：ui-sref="index.personnelManagement.projectTeamManagement"
//岗位员工设置路径：ui-sref="index.personnelManagement.postPersonnelConfiguration"
//我的团队路径：ui-sref="index.personnelManagement.myTeamManagement"