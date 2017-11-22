/**
 * Created by 彭婷婷 on 2015/5/7.
 * 我的团队(专业)
 * 修改时间：2015/6/4
 * 修改人：彭婷婷
 * 修改内容:数据从后台显示
 */
'use strict';
define(function (require){
    var app = require('../../../app');
    app.controller('postPersonnelConfigurationCtrl', ['$scope', '$http','$rootScope','$location','$filter', function ($scope,$http,$rootScope,$location,$filter) {
        var url = $rootScope.url;
        /**
         * 查询未分配的员工信息
         */
        $scope.getStaffsNot_distribution=function(){
            $http.get(url + '/staff/listAllStaffRestful').success(function(data) {
                $scope.staffs = data.Staff;
            }).error(function(data, status, headers, config){
                layer.msg('获取员工信息失败',{icon : 2});
            }) ;
        };

        /**
         * 加载矩阵信息（缺编人数）
         */
        $scope.load=function(){
            $scope.getStaffsNot_distribution();
            $http.get(url + '/Teamwork/myTeamProfessionone')
                .success(function(data){
                    var teamworkResult=data.TeamworkResult;
                    $scope.data=JSON.parse(teamworkResult.data);
                    $scope.title=$scope.data.shift();
                    $scope.tr=[];
                    for(var i=0;i<$scope.data.length;i++){
                        var tr=$scope.data[i].shift();
                        $scope.tr.push(tr);
                    }
                    $scope.data1=[];
                    for(var i=0;i<$scope.tr.length;i++){
                        var data={tr:$scope.tr[i],td:$scope.data[i]};
                        $scope.data1.push(data);
                    }
                }).error(
                function(data, status, headers, config) {
                    layer.msg('获取专业线项目编制信息失败',{icon : 2});
                });
        };

        $scope.load();

        /**
         * 查询项目下的专业线下的岗位及管理该项目下该专业线的团队
         * @param id
         * @param pid
         * @param count
         */
        $scope.countTeamStaff = 0;//是否满编 0否1是
        $scope.showPost=function(id,pid,count,string){
            $scope.staffsone.length=0 ;
         //   if(string=='无编制'||string=='满编'){
            if(string=='无编制'){
                layer.msg('无法操作',{icon:0});
                return;
            }
            /* BUG编号：604，满编也是可以点击进入页面进行编辑 朱琪 2016-2-18 start */
            if(string=='满编'){
                $scope.countTeamStaff = 1;
            } else {
                $scope.countTeamStaff = 0;
            }
            /* BUG编号：604，满编也是可以点击进入页面进行编辑 朱琪 2016-2-18 end */

            $scope.projectId=$scope.tr[pid].project.projectId;//项目id
            $scope.specialtyId=$scope.title[id].SpecialtyInfo.specialtyId;//专业线id
            //查询该项目下该专业线的编制结果集
            $http.get(url + '/Prepare/listAllSearchPrepare/'+$scope.projectId+"/"+$scope.specialtyId).success(function(data){
                    $scope.prepares=data.Prepare;   //编制信息
                    $("#postShow").modal("show");
                    //$http.get(url + '/Teamwork/getTeamworkIdBySearch/'+$scope.projectId+"/"+$scope.specialtyId)
                    //    .success(function(data){
                    //        $scope.teamwork=data.Teamwork;
                    //        $("#postShow").modal("show");
                    //        if(data.Teamwork==undefined){
                    //            //layer.msg('该编制未绑定团队',{icon : 0});
                    //        }else{
                    //            $scope.teamworkId=$scope.teamwork.id;
                    //        }
                    //    }).error(
                    //    function(data, status, headers, config) {
                    //        layer.msg('查询团队信息失败',{icon : 2});
                    //    });
                }).error(
                function(data, status, headers, config) {
                    layer.msg('查询岗位失败',{icon : 2});
                });
        };


        /**
         *  选择员工并将选择了的员工隐藏
         */
        $scope.staffsone=[];
        $scope.choiceStaff=function(staff,index){
            if($scope.countone<=0){
                layer.msg('员工分配已满编',{icon : 2});
                $scope.countone==0;
            }
            else{
                $scope.staffsone.push(staff);
                $scope.staffs.splice(index,1);
            }
            $scope.countone= $scope.countone-1;

        };

        /**
         * 选择编制信息
         */
        $scope.choicePrepare=function(prepare){
            //$scope.prepare=prepare;
            $scope.staffsone=[];
            $scope.prepareId=prepare.prepareId;
            $scope.postId=prepare.postId;
            $scope.getFenpeiStaffs($scope.postId,$scope.specialtyId,$scope.projectId);
            //查询该项目该岗位已有人数，即编制中已编制人数
            //$http.get(url + '/Teamworkstaff/staffCountByPrepareId/'+$scope.prepareId)
            //    .success(function(data){
            //        var countStaff=data;
            //        $scope.countone=prepare.prepareNumber-countStaff;
            //    }).error(
            //    function(data, status, headers, config) {
            //        layer.msg('查询该项目该岗位编制信息失败',{icon : 2});
            //    });
        };

        $scope.getFenpeiStaffs=function(postId,specialtyId,projectId){
            $http.get(url + '/Teamworkstaff/getPostyuangongxinxi/'+postId+"/"+specialtyId+"/"+projectId).success(function(data){
                    $scope.fenpeiStaffs=data.Teamworkstaff;
                }).error(
                function(data, status, headers, config) {
                    layer.msg('查询分配到该岗位编制下的人员信息失败',{icon : 2});
                });
        };

        $scope.shanchufenpei=function(teamworkStaff){
            layer.confirm("您确定要删除选中的关系？",
                {btn : ['是','否']},function(){
                    $http.get(url + '/Teamworkstaff/shanchuTeamworkstaff/'+teamworkStaff.id).success(function(data){
                       if(data=='200'){
                           layer.msg('删除成功',{icon:1});
                           $scope.getFenpeiStaffs($scope.postId,$scope.specialtyId,$scope.projectId);
                       }
                    }).error(
                        function(data, status, headers, config) {
                            layer.msg('删除失败',{icon : 2});
                        });
                })

        };

        /**
         * 取消选择
         */
        $scope.quxiaoxuanze= function () {
            $scope.staffsone.length=0 ;
        };

        $scope.frameclose = function()
        {
            $scope.postId =null;
        };

        /**
         * 保存岗位人员分配
         */
        $scope.save=function(){
            if($scope.staffsone.length==0){
                layer.msg('请选择员工信息',{icon : 0});
                return;
            }
           $scope.addTeamworkstaffResult={};
            var teamworkstaffs=[];
            for(var i=0;i<$scope.staffsone.length;i++){
                var teamworkstaff={};
                teamworkstaff.prepareId=$scope.prepareId;
                teamworkstaff.postId=$scope.postId;
                teamworkstaff.projectId=$scope.projectId;
                teamworkstaff.professionalLineId=$scope.specialtyId;
                teamworkstaff.teamworkId=$scope.teamworkId;
                teamworkstaff.staffId=$scope.staffsone[i].staffId;
                if(teamworkstaff.prepareId==''||teamworkstaff.prepareId==undefined){
                    layer.msg('请选择编制信息',{icon : 0});
                    return;
                }
                if(teamworkstaff.postId==''||teamworkstaff.postId==undefined){
                    layer.msg('请选择岗位信息',{icon : 0});
                    return;
                }
                if(teamworkstaff.projectId==''||teamworkstaff.projectId==undefined){
                    layer.msg('请选择项目信息',{icon : 0});
                    return;
                }
                if(teamworkstaff.professionalLineId==''||teamworkstaff.professionalLineId==undefined){
                    layer.msg('请选择专业线信息',{icon : 0});
                    return;
                }
                if(teamworkstaff.staffId==''||teamworkstaff.staffId==undefined){
                    layer.msg('有员工信息为空',{icon : 0});
                    return;
                }
                teamworkstaffs.push(teamworkstaff);
            }
            $scope.addTeamworkstaffResult.teamworkstaffs=teamworkstaffs;
            $http.post(url+ '/Teamworkstaff/insertListTeamworkstaffone',{TeamworkstaffResult: $scope.addTeamworkstaffResult}).success(function(data){
                    $scope.load();//刷新数据
                    layer.msg('保存岗位人员配置信息成功',{icon : 1});
                    $("#postShow").modal("hide");
                    $scope.load();
                    $scope.staffsone=[];
                    $scope.postId =null;
                }).error(
                function(data, status, headers, config) {
                    layer.msg('保存岗位人员配置信息失败',{icon : 2});
                });
        }

        /**
         *   判断人员选择是否重复,重复从数组中删除此对象，不重复则添加到该对象中
         */
        $scope.notrepeat=function(staffs,staff){
            var j=0;
            for ( var i = 0; i < $scope.staffsone.length; i++) {
                if ($scope.staffsone[i].staffId == staff.staffId) {
                    //j = 1;
                    $scope.staffsone.splice(i, 1);
                    j=1;
                }
            }
            if(j==0){
                $scope.staffsone.push(staff);
            }
        };

        /**
         * 选中样式
         */
        $scope.chocieCss=function(staffId){
            if($scope.staffsone.length==0){
                return false;
            }
            var j=0;
            for(var i=0;i<$scope.staffsone.length;i++){
                if($scope.staffsone[i].staffId==staffId){
                    j=1;
                }
            }
            if(j==1){
                return true;
            }else{
                return false;
            }
        };

        /**
         * 页面调用
         * @param person
         */
        $scope.choicePerson=function(staff) {
            if($scope.postId ==''||$scope.postId==null||$scope.postId==undefined){
                layer.msg('请先选择岗位信息',{icon:0});
                return;
            }
            /* BUG编号：604，满编也是可以点击进入页面进行编辑 朱琪 2016-2-18 start */
            if($scope.countTeamStaff=='1'){
                layer.msg('编制已满',{icon:0});
                return;
            }
            /* BUG编号：604，满编也是可以点击进入页面进行编辑 朱琪 2016-2-18 end */
            $scope.isFenpei(staff.staffId,$scope.postId,$scope.prepareId,staff);
        };

        /**
         * 判断是否已分配到该岗位编制
         * @param staffId
         * @param postId
         * @param prepareId
         */
        $scope.isFenpei=function(staffId,postId,prepareId,staff){
            $http.get(url + '/Teamworkstaff/isFenpei/'+staffId+"/"+postId+"/"+prepareId).success(function(data){
                if(angular.equals(true,data)){
                    layer.msg('此员工已分配到该岗位编制',{icon:0});
                    return ;
                }else{
                    $scope.notrepeat($scope.staffs, staff);
                }
                return false;
            }).error(
                function(data, status, headers, config) {
                    layer.msg('查询员工是否分配此岗位失败',{icon : 2});
                });
        };

        /**
         * 判断满编还是该项目对应的专业线未开启的编制
         */
        $scope.isFull=function(count ,countTeamStaff){
            if(countTeamStaff==0&& count==0){
                return '无编制';
            }
            else if(count==0){
               return '满编';
            }else{
                return '缺编'+count+'人';
            }
        };
    }]);
});