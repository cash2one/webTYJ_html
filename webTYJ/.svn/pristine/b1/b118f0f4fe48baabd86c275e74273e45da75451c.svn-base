/**
 * Created by NM on 2018/1/18.
 * 管理员设置js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('hRAdminSettingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /*****************     参数start       **************************/
        var url = $rootScope.url;
        $scope.Staff = {page:{}};               //员工表查询条件
        $scope.tuserList = [];                  //管理员列表数组
        $scope.staffList = [];                  //员工列表数组
        $scope.HrPermissions = [];              //功能权限列表数组
        $scope.CorePosition = [];               //核心岗位列表数组
        $scope.tUserPermissions = {};           //用户功能权限关联对象
        $scope.hrAuthoritys = {};               //用户核心团队关联对象
        $scope.tUserPermissionList = [];        //管理员绑定的功能权限数组
        $scope.hrAuthorityList = [];            //管理员绑定的核心团队数组
        $scope.TUserRole = {page:{}};
        $scope.Staffs = {};                     //新增员工时使用

        /*****************     参数end         **************************/

        /*****************     载入方法start       **************************/

        //获取登录信息  王洲  2016.02.18
        var user = {};
        var userSession = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userSession?userSession:user;


        /**
         * 查询hr管理员
         * @type {{page: {}}}
         */
        $scope.checkHrAdmain=function(roletype){
            $scope.TUserRole.roleType=roletype;
            var currentAdmin = function(page, callback){
                $scope.TUserRole.page = page;
                $http.post(url + '/Admin/listPageAdmin',{TUserRole : $scope.TUserRole}).success(callback);
            };
            $scope.searchAdmin = app.get('Paginator').list(currentAdmin, 5);
        };


        /**
         * 项目初始化
         */
        $scope.load=function(){
            //默认查询系统设置
            $scope.checkHrAdmain(1);
        };

        $scope.load();


        /**
         * 查询功能权限数据
         */
        $scope.getPermissions = function(){
            $scope.HrPermissions = [];
            $http.get(url + '/Admin/listHrPermissions').success(function(data){
                $scope.HrPermissoions = data.HrPermissions;
            }).error(function(data){
                layer.alert('查询功能权限失败',{icon : 2});
            });
        };
        $scope.getPermissions();

        //查询团队信息
        $scope.getCorePosition = function(){
            $scope.Teamwork = [];
            $http.get(url + '/Teamwork/listAllTeamwork').success(function(data){
                $scope.Teamwork = data.Teamwork;
            }).error(function(data){
                layer.alert('查询团队失败',{icon : 2});
            });
        };
        $scope.getCorePosition();

        /*****************     载入方法end         **************************/

        /*****************     方法start       **************************/

        //查询员工
        $scope.liststaff = function(){
            $http.get(url + '/staff/listAllStaffRestful', {Staff : $scope.Staff}).success(function(data){
                var len = data.Staff.length;
                if(len == 0){
                    //没有员工时弹出是否新增员工页面，并查询出新增员工时需要带出的下拉框选项  王洲  2016.02.18
                    $("#new").modal("show");
                    $http.get(url + '/Project/getProjectByState').success(function(data){
                        //学历
                        $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/eduLever/'+ data.Project.projectId).success(function(data){
                            $scope.eduLeverList = data.DataDictionarySlave;
                        });
                        //婚姻状况
                        $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/married/' + data.Project.projectId).success(function(data){
                            $scope.marriedList = data.DataDictionarySlave;
                        });

                        //性别
                        $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/sex/' + data.Project.projectId).success(function(data){
                            $scope.sexList = data.DataDictionarySlave;
                        });
                        //证件类型
                        $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/cardType/' + data.Project.projectId).success(function(data){
                            $scope.cardTypeList = data.DataDictionarySlave;
                        });
                    }).error(function(data){
                        layer.msg('项目获取异常，请重试！',{icon : 0,time : 1000});
                    });
                }else{
                    $scope.staffList = [];
                    $scope.staffList = data.Staff;
                    $("#new2").modal("show");
                }
            }).error(function(data){
                layer.alert('查询失败！',{icon : 0});
            });
        };

        var currentStaff = function(page, callback){
            $scope.Staff.page = page;
            $scope.Staff.roleType='1';
            $http.post(url + '/staff/listPageStaffForUser', {Staff : $scope.Staff}).success(callback);
        };
        $scope.getStaffNotAdmin = app.get('Paginator').list(currentStaff, 5);

        //新增员工并设置为管理员
        $scope.addStaff = function(){
            $scope.Staffs.roleType = 'hradmin';
            $scope.Staffs.companyId = $scope.user.companyId;
            if($scope.Staffs.staffNo == null || angular.isUndefined($scope.Staffs.staffNo)){
                layer.msg('员工工号不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.staffName == null || angular.isUndefined($scope.Staffs.staffName)){
                layer.msg('员工姓名不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.sex == null || angular.isUndefined($scope.Staffs.sex)){
                layer.msg('员工性别不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.birthday == null || angular.isUndefined($scope.Staffs.birthday)){
                layer.msg('出生日期不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.telphone == null || angular.isUndefined($scope.Staffs.telphone)){
                layer.msg('联系电话不能为空！',{icon : 0,time : 1000});
                return;
            }
            var pattern=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var patt=/^0\d{2,3}-?\d{7,8}$/;
            if(pattern.test($scope.Staffs.telphone)||patt.test($scope.Staffs.telphone)){
            }else{
                    layer.msg('请输入正确的号码！',{icon : 0,time : 1000});
                    return;
            }
            if($scope.Staffs.eduLever == null || angular.isUndefined($scope.Staffs.eduLever)){
                layer.msg('学历不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.cardType == null || angular.isUndefined($scope.Staffs.cardType)){
                layer.msg('证件类型不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.Staffs.cardNum == null || angular.isUndefined($scope.Staffs.cardNum)){
                layer.msg('证件号不能为空！',{icon : 0,time : 1000});
                return;
            }
            var pattern=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if(pattern.test($scope.Staffs.cardNum)){
            }else{
                layer.msg('请输入正确的身份证号码！',{icon : 0,time : 1000});
                return;
            }
            $http.post(url + '/Admin/insertTUserByStaff', {Staff : $scope.Staffs}).success(function(data){
                layer.alert('新增成功',{icon : 1});
                $("#new1").modal("hide");
                $("#new").modal("hide");
                $scope.load();
            }).error(function(data){
                layer.alert('新增失败，请确认数据',{icon : 2});
            });
        };

        //取消新增员工时关闭模态框并清空数据  王洲  2016.02.18
        $scope.closeAddStaff = function(){
            $("#new1").modal("hide");
            $scope.Staffs = {};
        };

        /**
         * 选择将成为管理员的员工
         * @type {{}}
         */
        $scope.user_permisson={};
        $scope.addTUser = function(item){
            $scope.user_permisson=item;
            $scope.btnIndex=item.staffId;
        };

        /**
         * 将选择的员工添加为管理员
         * @param userId
         */
        $scope.addTUser_permission = function(){
            if($scope.user_permisson.staffId==undefined){
                layer.alert('请选择员工',{icon : 2});
                return;
            }
            $scope.user_permisson.roleType = 'hradmin';
            $http.post(url + '/Admin/insertTUserByStaff', {Staff : $scope.user_permisson}).success(function(data){
                layer.alert('添加成功',{icon : 1});
                $("#new2").modal("hide");
                $scope.load();
            }).error(function(data){
                layer.alert('添加失败，请重新操作',{icon : 2});
            });
        };

        //选择管理员时将用户id存入数组
        $scope.getPremission = function(userId,id){
            $scope.btnIndex_permission=id;
            var percheckbox = document.getElementsByName("permissionIds");
            for(var i = 0; i < percheckbox.length; i ++){
                percheckbox[i].checked = false;
            }
            var authcheckbox = document.getElementsByName("authorityIds");
            for(var j = 0; j < authcheckbox.length; j ++){
                authcheckbox[j].checked = false;
            }
            $scope.tUserPermissionList = [];
            $scope.hrAuthorityList = [];
            $scope.tUserPermissions = {};
            $scope.tUserPermissions.userId = userId;
            $scope.hrAuthoritys = {};
            $scope.hrAuthoritys.tUserId = userId;
            //查询关联的功能权限
            $http.get(url + '/Admin/listTUserPermissionsByuserId/' + $scope.tUserPermissions.userId).success(function(data){
                $scope.tUserPermissionList = data.TUserPermissions;
                for(var i = 0; i < $scope.tUserPermissionList.length; i ++){
                    document.getElementById($scope.tUserPermissionList[i].permissionsId).checked = true;
                }
            }).error(function(){
                layer.alert('无有效数据',{icon : 2});
            });
            //查询关联的核心团队
            $http.get(url + '/Admin/listAuthorityByuserId/' + $scope.hrAuthoritys.tUserId).success(function(data){
                $scope.hrAuthorityList = data.HrAuthority;
                for(var i = 0; i < $scope.hrAuthorityList.length; i ++){
                    document.getElementById($scope.hrAuthorityList[i].corePositionId).checked = true;
                }
            }).error(function(data){
                layer.alert('无有效数据',{icon : 2});
            });
        };

        //勾选功能全选多选框时执行新增或删除操作
        $scope.setPermission = function(permissionsId){
            if(angular.isUndefined($scope.tUserPermissions.userId)){
                layer.alert('请先选择管理员',{icon : 0});
                document.getElementById(permissionsId).checked = false;
            }else {
                $scope.tUserPermissions.permissionsId = permissionsId;
                if (document.getElementById(permissionsId).checked == true) {
                    $http.get(url + '/Admin/insertTUserPermissions/' + $scope.tUserPermissions.userId + '/' + $scope.tUserPermissions.permissionsId).success(function (data) {
                        //alert("绑定成功！");
                        //layer.alert('绑定成功！',{icon : 6});
                        layer.msg('绑定成功',{icon : 6});
                        $scope.getPremission($scope.tUserPermissions.userId,$scope.btnIndex_permission);
                    }).error(function (data) {
                        //alert("绑定失败，请重新选择！");
                        layer.msg('绑定失败，请重新选择',{icon : 5});
                    });
                }else{
                    $http.post(url + '/Admin/deleteTUserPermissions/' + $scope.tUserPermissions.userId + '/' + $scope.tUserPermissions.permissionsId).success(function(data){
                        layer.msg('取消绑定成功！',{icon : 6});
                        $scope.getPremission($scope.tUserPermissions.userId,$scope.btnIndex_permission);
                    }).error(function(data){
                        //alert("取消绑定失败，请重新选择！");
                        layer.msg('取消绑定失败，请重新选择',{icon : 5});
                    });
                }
            }
        };

        //勾选核心团队时执行新增或删除操作
        $scope.setAuthority = function(corePositionId){
            $scope.hrAuthoritys.corePositionId = corePositionId;
            if(angular.isUndefined($scope.hrAuthoritys.tUserId)){
                layer.alert('请先选择管理员',{icon : 2});
            }else{
                $http.get(url + '/Admin/ifOderToAuthorityByuserId/' + $scope.hrAuthoritys.tUserId).success(function(data){
                    if(data == 1){
                        if(document.getElementById(corePositionId).checked == true){
                            $http.post(url + '/Admin/insertHrAuthority/' + $scope.hrAuthoritys.tUserId + '/' +  $scope.hrAuthoritys.corePositionId).success(function(data){
                                layer.alert('绑定成功',{icon : 1});
                                $scope.getPremission($scope.hrAuthoritys.tUserId,$scope.btnIndex_permission);
                            }).error(function(data){
                                layer.alert('绑定失败，请重新选择',{icon : 2});
                            });
                        }else{
                            $http.post(url + '/Admin/deleteHrAuthority/' + $scope.hrAuthoritys.tUserId + '/' +  $scope.hrAuthoritys.corePositionId).success(function(data){
                                layer.alert('取消绑定成功',{icon : 1});
                                $scope.getPremission($scope.hrAuthoritys.tUserId,$scope.btnIndex_permission);
                            }).error(function(data){
                                layer.alert('取消绑定失败，请重新选择',{icon : 1});
                            });
                        }
                    }else{
                        layer.alert('此管理员没有团队管理权限，请先分配团队管理权限',{icon : 1});
                        $scope.getPremission($scope.hrAuthoritys.tUserId,$scope.btnIndex_permission);
                    }
                }).error(function(data){
                    layer.alert('权限查询失败',{icon : 1});
                });
            }
        };
        /*****************     方法end         **************************/

    }]);
});
