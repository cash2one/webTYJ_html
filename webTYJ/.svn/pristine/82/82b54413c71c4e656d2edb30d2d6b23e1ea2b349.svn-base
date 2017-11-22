/**
 * Created by 王洲  2016.04.15
 * 支付系统JS
 */

'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('paymentSystemCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //获取登录人的信息
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        //设置访问后台路径
        var url = $rootScope.url;

        /**
         * 增加用户角色判断，公司级限制只有超级管理员可以进入，项目级只有绑定了关联项目的员工可以进入，并给出相应的权限
         * 王洲
         * 2016.04.21
         * @param item
         */
        $scope.test = function(item){
            if($scope.user.userId == '' || angular.isUndefined($scope.user.userId)){
                layer.msg('请先登录！', {icon : 0,time : 1000});
                $location.path("/login");
            }else{
                var toPaySystem = '';
                if($scope.user.staff == null){
                    toPaySystem = '1';
                }else{
                    toPaySystem = '2';
                }
                if(item == 1){
                    if(toPaySystem == '1'){
                        $location.path('/index/paymentSystem/banner/company');
                    }else if(toPaySystem == '2'){
                        layer.msg('只有超级管理员可以使用此功能！', {icon : 0,time : 1000});
                    }else{
                        layer.msg('没有对应权限，请确认登录信息！', {icon : 0,time : 1000});
                    }
                }else if(item == 2){
                    if(toPaySystem == '1'){
                        layer.msg('只有岗位员工可以使用此功能！', {icon : 0,time : 1000});
                    }else if(toPaySystem == '2'){
                        //查询员工关联的项目  王洲  2016.04.21
                        $http.get(url + '/Teamworkstaff/getProjectByStaffId/' + $scope.user.staff.staffId).success(function(data){
                            if(data.Teamworkstaff.length == 0){
                                layer.msg('该账号未关联项目，请关联项目后重试！', {icon : 0,time : 1000});
                            }else{
                                $scope.projectList = [];
                                $scope.projectList = data.Teamworkstaff;
                                $('#chooseProject').modal('show');
                            }
                        }).error(function(data){
                            layer.msg('查询关联项目失败，请重试！', {icon : 0,time : 1000});
                        });
                    }else{
                        layer.msg('没有对应权限，请确认登录信息！', {icon : 0,time : 1000});
                    }
                }
            }
        };

        $scope.projectids = '';
        /**
         * 选择项目，并增加单选效果
         * 王洲
         * 2016.04.21
         * @param id
         */
        $scope.chooseProject = function(id){
            if(document.getElementById(id).checked == true){
                document.getElementById(id).checked = false;
                document.getElementById(id).parentNode.parentNode.style.background = '';
                $scope.projectids = '';
            }else{
                if($scope.projectids != '' && $scope.projectids != id){
                    document.getElementById($scope.projectids).checked = false;
                    document.getElementById($scope.projectids).parentNode.parentNode.style.background = '';
                }
                document.getElementById(id).checked = true;
                document.getElementById(id).parentNode.parentNode.style.background = '#f6f8fa';
                $scope.projectids = id;
            }
        };

        /**
         * 关闭模态框
         * 王洲
         * 2016.04.21
         */
        $scope.closeMod = function(){
            $scope.projectids = '';
        };

        /**
         * 点击确定时判断时候选择项目，并跳转到对应的页面
         * 王洲
         * 2016.04.21
         */
        $scope.addProjectIds = function(){
            if($scope.projectids == ''){
                layer.msg('请先选择项目！',{icon : 0,time : 1000});
                return;
            }
            $('#chooseProject').modal('hide');
            localStorage.setItem("project_ids",JSON.stringify($scope.projectids));
            $location.path('/index/paymentSystem/banner/project');
        };

    }]);
});
/*
1、员工信息：登录名、员工id、员工姓名
2、物业公司级：公司id、标识（公司/项目）
3、项目级：项目id、项目名称、标识（公司/项目）
*/
