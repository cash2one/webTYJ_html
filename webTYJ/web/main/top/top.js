/**
 * Created by NM on 2016/1/21.
 *
 */
'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('topCtrl', ['$scope', '$location','$http','$rootScope', function ($scope,$location,$http,$rootScope) {

        //设置基础管理、人事管理、系统设置三个模块的功能权限  王洲  2016.1.30

        //获取登录信息
        var user = {employId : ''};
        //查看登录是否成功
        if(JSON.parse(sessionStorage.getItem("USER_LOGIN"))==null){
            layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
            $location.path("/login");
            return;
        }else{
            var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
            $scope.user = userCookie?userCookie:user;
        }


        var url = $rootScope.url;//获取后台访问路径

        //$scope.specialtyinfo = {};
        //$http.get(url + '/SpecialtyInfo/getSpecialtyInfoByName/' + '门控机').success(function(data){
        //    $scope.specialtyinfo = data.SpecialtyInfo;
        //});

		//修改专业线的查询方法  王洲  2016.04.13
        $scope.specialtyinfoList = [];
        $scope.user.financial = [];
        $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoRestful').success(function(data){
            $scope.specialtyinfoList = data.SpecialtyInfo;
        });
        ////根据用工id查询财务岗位列表  陈秋旭 2016.04.20
        //if($scope.user.staff != null) {
        //    $scope.staffId=$scope.user.staff.staffId;
        //    var fetchFunction = $http.get(url + '/FinancialStaff/getFinancialStaffbyStaffId/' + $scope.staffId).success(function (callback) {
        //    });
        //}

        //鼠标点击选中
        $scope.doClick=function(index){
            $scope.btnIndex=index;

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

                //根据index获取点击的模块，并且判断进入该模块需要的权限
                if(index == 6){
                    //index == 6时为系统设置模块，此模块下所有功能都只能有超级管理员进行操作，故只需判断登录用户是否有超级管理员权限
                    if(tmp == 0){
                        layer.msg('只有超级管理员可以操作此模块！',{icon : 0, time : 1000});
                    }else{
                        $location.path("/index/systemSettings");
                    }
                }else if(index == 4){
                    //index == 4时，为基础管理模块，此模块除了超级管理员可以进行操作，还可以由有相关权限的hr管理员和系统管理员进行操作，故需要进行双重判断
                    //进入此模块需要的权限有：物业项目管理；子公司管理；建筑组件初始化；专业资产初始化；建筑组件绑定；合同初始化；项目资产库管理
                    //对应的功能权限别名分别为：property;affiliate;component;asset;bindcomponent;contract;assetlib
                    if(tmp == 0){
                        $scope.perList = [];
                        $scope.perList = $scope.user.tuserPermissions;
                        var checkper = 0;
                        for(var i = 0,len = $scope.perList.length; i < len; i++){
                            if($scope.perList[i].permissions.permissionsDescription == 'property' ||
                                $scope.perList[i].permissions.permissionsDescription == 'affiliate' ||
                                $scope.perList[i].permissions.permissionsDescription == 'component' ||
                                $scope.perList[i].permissions.permissionsDescription == 'asset' ||
                                $scope.perList[i].permissions.permissionsDescription == 'bindcomponent' ||
                                $scope.perList[i].permissions.permissionsDescription == 'contract' ||
                                $scope.perList[i].permissions.permissionsDescription == 'assetlib'){
                                    checkper ++;
                            }
                        }
                        if(checkper == 0){
                            layer.msg('此账户没有基础管理模块操作权限！',{icon : 0,time : 1000});
                        }else{
                            $location.path("/index/baseManagement");
                        }
                    }else{
                        $location.path("/index/baseManagement");

                    }
                }else if(index == 5){
                    //index == 5 时，为人事管理模块，此模块除了超级管理员可以进行操作，还可以由有相关权限的hr管理员和系统管理员进行操作，故需要进行双重判断
                    //进入此模块需要的权限有：人员管理；核心岗位任命；人员管理设置；项目团队；岗位人员设置；我的团队
                    //对应的功能权限别名分别为：person;coreposition;admins;project;staff;myteam
                    //团队领袖即使没有相关的权限，但是仍能够进入我的团队模块 王洲 2016.03.16
                    if(tmp == 0){
                        //初始化数组存放登录用户的权限
                        $scope.personList = [];
                        $scope.personList = $scope.user.tuserPermissions;
                        var checkperson = false;    //初始化flag
                        if($scope.personList.length == 0){
                            if($scope.user.postRole == 'projectManager'){
                                $location.path("/index/personnelManagement/myTeamManagement");
                                checkperson = true;
                            }
                        }else{
                            for(var i = 0,len = $scope.personList.length; i < len; i ++){
                                //循环数组，当有匹配的权限时结束循环并跳转到对应的页面，flag为true
                                if($scope.personList[i].permissions.permissionsDescription == 'person'){
                                    $location.path("/index/personnelManagement/appPersonManagement/appUserCheck");
                                    checkperson = true;
                                    break;
                                }else if($scope.personList[i].permissions.permissionsDescription == 'coreposition'){
                                    $location.path("/index/personnelManagement/corePost");
                                    checkperson = true;
                                    break;
                                }else if($scope.personList[i].permissions.permissionsDescription == 'admins'){
                                    $location.path("/index/personnelManagement/personnelManagement");
                                    checkperson = true;
                                    break;
                                }else if($scope.personList[i].permissions.permissionsDescription == 'project'){
                                    $location.path("/index/personnelManagement/projectTeamManagement");
                                    checkperson = true;
                                    break;
                                }else if($scope.personList[i].permissions.permissionsDescription == 'staff'){
                                    $location.path("/index/personnelManagement/postPersonnelConfiguration");
                                    checkperson = true;
                                    break;
                                }else if($scope.personList[i].permissions.permissionsDescription == 'myteam' || $scope.user.postRole == 'projectManager'){
                                    $location.path("/index/personnelManagement/myTeamManagement");
                                    checkperson = true;
                                    break;
                                }
                            }
                        }
                        //判断flag，如果不为true即没有认识管理所有模块的操作权限，给出提示
                        if(!checkperson){
                            layer.msg('此账户没有人事管理模块操作权限！',{icon : 0,time : 1000});
                        }
                    }else{
                        $location.path("/index/personnelManagement/appPersonManagement/appUserCheck");
                    }
                }else if(index == 12){

                    if($scope.user.userId != null || angular.isDefined($scope.user.userId)){
                        if($scope.user.staff != null){
                        //修改可视对讲判断权限的方法  王洲  2016.04.13
                            var specialtyIdVideo = '';
                            for(var i = 0, len = $scope.specialtyinfoList.length; i < len; i ++){
                                if($scope.specialtyinfoList[i].specialtyName == '门控机'){
                                    specialtyIdVideo = $scope.specialtyinfoList[i].specialtyId;
                                }
                            }
                            if(specialtyIdVideo == ''){
                                layer.msg('请检查门控机专业线是否开启！',{icon : 0,time : 1000});
                                return;
                            }
                            var count = 0;
                            for(var i = 0,len = $scope.user.staff.post.length; i < len; i ++){
                                if($scope.user.staff.post[i].professionalLineId == specialtyIdVideo){
                                    count++;
                                }
                            }
                            if($scope.user.staff.corePost != null || angular.isDefined($scope.user.staff.corePost)){
                                for(var i = 0, len = $scope.user.staff.corePost.length; i < len; i ++){
                                    if($scope.user.staff.corePost[i].professionalLineId == specialtyIdVideo){
                                        count++;
                                    }
                                }
                            }
                            if(count > 0){
                                $location.path("/index/videoIntercom/equipmentManage");
                            }else{
                                layer.msg('只有门控机专业线下的员工可以操作此模块！',{icon : 0,time : 1000});
                            }
                        }else{
                            $location.path("/index/videoIntercom/equipmentManage");
                        }

                    }else{
                        layer.msg('请先登录！',{icon : 0,time : 1000});
                    }
                }else if(index == 9){
                //计费收费模块增加进入判断，必须为财务专业线的员工才能进入  王洲  2016.04.13
                    if($scope.user.userId != null || angular.isDefined($scope.user.userId)){
                        if($scope.user.staff != null){
                            var specialtyIdMoney = '';
                            for(var i = 0, len = $scope.specialtyinfoList.length; i < len; i ++){
                                if($scope.specialtyinfoList[i].specialtyName == '财务'){
                                    specialtyIdMoney = $scope.specialtyinfoList[i].specialtyId;
                                }
                            }
                        //if(fetchFunction.$$state.value.data!=null) {
                        //    if (fetchFunction.$$state.value.data.FinancialStaff !=undefined) {
                        //        sessionStorage.setItem('financialInfo', JSON.stringify(fetchFunction.$$state.value.data.FinancialStaff));
                        //    }
                        //}
                            if(specialtyIdMoney == 'undefined'){
                                layer.msg('请检查财务专业线是否开启！',{icon : 0,time : 1000});
                                return;
                            }

                            if($scope.user.staff.corePost.length > 0 || $scope.user.staff.post.length > 0){
                                var cpcount = 0;
                                if($scope.user.staff.corePost.length > 0){
                                    for(var i = 0,len = $scope.user.staff.corePost.length; i < len; i ++){
                                        if($scope.user.staff.corePost[i].professionalLineId == specialtyIdMoney){
                                            cpcount ++;
                                        }
                                    }
                                    if(cpcount > 0){
                                        $location.path('index/accountManagement/productAndProperty/product/propertyProject');
                                    }
                                }

                                var count = 0;
                                if($scope.user.staff.post.length>0){
                                    for(var i = 0,len = $scope.user.staff.post.length; i < len; i ++){
                                        if($scope.user.staff.post[i].professionalLineId == specialtyIdMoney){
                                            count ++;
                                        }
                                    }
                                    if(count > 0){
                                        $location.path("/index/accountManagement/productAndProperty/product/propertyProject");
                                    }
                                }
                                if(cpcount==0 && count==0 ){
                                    layer.msg('非财务专业线员工不能进入计费收费模块！',{icon : 0,time : 1000});
                                }
                            }else{
                                layer.msg('非财务专业线员工不能进入计费收费模块！',{icon : 0,time : 1000});
                            }
                        }else{
                            layer.msg('超级管理员没有此模块的权限！',{icon : 0,time : 1000});
                        }
                    }else{
                        layer.msg('请先登录！',{icon : 0,time : 1000});
                    }
                }else if(index == 16){
                    $location.path('index/paymentSystem');
                }
            }



        };
    }]);
});
//系统设置路径 ui-sref="index.systemSettings"
//基础管理路径 ui-sref="index.baseManagement"
//人事管理路径 ui-sref="index.personnelManagement.staffsuperviseIT.staffsuperviseITCheck"
//计费收费路径 ui-sref="index.accountManagement"
