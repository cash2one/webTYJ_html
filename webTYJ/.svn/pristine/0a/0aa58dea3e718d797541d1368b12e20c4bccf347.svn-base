/**
 * Created by wangzhou on 2016/1/25.
 * Name :
 */
'use strict';
define(function (require) {
    var app = require('../../../app');

    app.controller('myTeamManagementCtrl', ['$scope', '$http','$rootScope',
        function ($scope,$http,$rootScope) {
            //从session中获取登陆人信息，判断是否是专业线经理  王洲  2016.1.22
            var user = {employId : ''};
            var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
            $scope.user = userCookie?userCookie:user;

            var url = $rootScope.url;

            //我的团队数据加载
            $scope.data1=[];
            $scope.load=function(){
                if($scope.user.employId == ''){
                    if($scope.user.userName == 'admin'){
                        layer.msg('请使用专业线经理账号进行登录！',{icon : 0,time : 1000});
                    }else{
                        layer.msg('请先登录！',{icon : 0,time : 1000});
                    }
                    return;
                }
                $http.get(url + '/CorePosition/checkCorePositionByStaffId/' + $scope.user.employId).success(function(data){
                    if(data.Info.state == false){
                        layer.msg('非专业线经理无法查看数据！',{icon : 0,time : 1000});
                        return;
                    }else{
                        if(data.Info.info.$ == "1"){
                            layer.msg('请在项目经理团队中查看数据！',{icon : 0,time : 1000});
                            return;
                        }else{
                            $http.get(url + '/Teamwork/myTeamProfession/' + $scope.user.employId).success(function(data){
                                var teamworkResult=data.TeamworkResult;
                                $scope.staffs = [];
                                $scope.staffsList=teamworkResult.staffs;//员工信息
                                if(angular.isArray($scope.staffsList)){
                                    $scope.staffs = $scope.staffsList;
                                }else{
                                    if(!angular.isUndefined($scope.staffsList)){
                                        $scope.staffs.push($scope.staffsList);
                                    }
                                }
                                $scope.teamwork=teamworkResult.teamwork;//团队信息
                                $scope.data=JSON.parse(teamworkResult.data);
                                $scope.title=$scope.data.shift();
                                $scope.tr=[];
                                for(var i=0;i<$scope.data.length;i++){
                                    var tr=$scope.data[i].shift();
                                    $scope.tr.push(tr);
                                }
                                $scope.data1 = [];
                                for(var i=0;i<$scope.tr.length;i++){
                                    var data={tr:$scope.tr[i],td:$scope.data[i]};
                                    $scope.data1.push(data);
                                }
                            }).error(
                                function(data, status, headers, config) {
                                    layer.alert('查询我的团队失败！',{icon : 2});
                                });
                        }
                    }

                }).error(function(data){
                    layer.msg('用户信息查询失败，请重试！',{icon : 0,time : 1000});
                    return;
                });
            };

            $scope.load();//第一次加载我的团队数据

            //查询项目下的专业线下的岗位
            $scope.showPost=function(id,pid,count,per){
                $scope.projectId=$scope.tr[pid].project.projectId;//项目id
                $scope.specialtyId=$scope.title[id].SpecialtyInfo.specialtyId;//专业线id
                $http.get(url + '/Prepare/listAllSearchPrepare/'+$scope.projectId+"/"+$scope.specialtyId)
                    .success(function(data) {
                        $scope.prepares = data.Prepare;
                        $http.get(url + '/Post/listPostsByProjectIdAndSpecialtyId/' + $scope.projectId + "/" + $scope.specialtyId)
                            .success(function (data) {
                                $scope.posts = data.Post;
                                $("#postShow").modal("show");
                            }).error(
                            function (data, status, headers, config) {
                                layer.alert('查询岗位失败！',{icon : 2});
                            });
                    }).error(
                    function (data, status, headers, config) {
                        layer.alert('查询岗位失败！',{icon : 2});
                    });
            };

            //选择岗位
            $scope.postIndex1 = 0;
            $scope.choosePost=function(post,index){
                if(post.postNum == 0){
                    layer.msg('该岗位已满编！',{icon : 0});
                    document.getElementById(post.postId).checked = false;
                    return;
                }
                $scope.post=post;
                $scope.postIndex1 = index;
            };

            //选择员工并将选择了的员工隐藏
            $scope.staffsone=[];
            $scope.choiceStaff=function(staff,index){

                if($scope.countone<=0){
                    layer.alert('员工分配已满编！',{icon : 0});
                    $scope.countone==0;
                }
                else{
                    if($scope.staffsone.length == 0){
                        $scope.staffsone.push(staff);
                    }else{
                        var j = 0;
                        for ( var i = 0; i < $scope.staffsone.length; i++) {
                            if ($scope.staffsone[i].staffId == staff.staffId) {
                                $scope.staffsone.splice(i, 1);
                                j++;
                            }
                        }
                        if(j == 0){
                            $scope.staffsone.push(staff);
                        }
                    }
                }
                $scope.countone= $scope.countone-1;
            };

            /**
             * 选中样式
             */
            $scope.chocieCss=function(items){
                if($scope.staffsone.length==0){
                    return false;
                }
                var j=0;
                for(var i=0;i<$scope.staffsone.length;i++){
                    if($scope.staffsone[i].staffId==items.staffId){
                        j=1;
                    }
                }
                if(j==1){
                    return true;
                }else{
                    return false;
                }
            };
            //选择编制信息
            $scope.choicePrepare=function(prepare){
                $scope.prepareId=prepare.prepareId;
                $scope.postId=prepare.postId;


                //查询该项目该岗位已有人数，即编制中已编制人数
                $http.get(url + '/Teamworkstaff/staffCountByPrepareId/'+$scope.prepareId)
                    .success(function(data){
                        var countStaff=data;
                        $scope.countone=prepare.prepareNumber-countStaff;
                    }).error(
                    function(data, status, headers, config) {
                        layer.alert('查询人数失败！',{icon : 2});
                    });
            };


            //保存
            $scope.save=function(){
                var staffs=[];//选中的员工集合
                for(var i=0;i<$scope.staffsone.length;i++){
                    staffs.push($scope.staffsone[i]);
                }
                var prepareResult={projectId:$scope.projectId,post:$scope.post,staffs:staffs};
                if(angular.isUndefined(prepareResult.post)){
                    layer.msg('请先选择岗位！',{icon : 0,time : 1000});
                    return;
                }
                if(prepareResult.staffs.length == 0){
                    layer.msg('请先选择人员！',{icon : 0,time : 1000});
                    return;
                }
                $http.post(url+ '/Teamworkstaff/prepareAddStaff',{PrepareResult:prepareResult})
                    .success(function(data){
                        $scope.load();//刷新数据
                        layer.alert('保存成功！',{icon : 1});
                        $("#postShow").modal("hide");
                        $scope.staffsone=[];
                    }).error(
                    function(data, status, headers, config) {
                        layer.alert('保存失败！',{icon : 2});
                    });
            };

            //满编时给出提示
            $scope.showTips = function(per){
                if(per == 0){
                    layer.msg('没有该专业线的操作权限！',{icon : 0,time : 1000});
                }else{
                    layer.msg('该专业线已满编！',{icon : 0,time : 1000});
                }
            };
        }]);
    });