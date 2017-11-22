/**
 * Created by NM on 2018/1/18.
 * 物业项目计费模块
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('propertyProjectCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.searchProject = {page:{}};
        $scope.btnIndex =2;

        /**
         * 高亮显示
         */
        $scope.doClick = function(item){
            $scope.btnIndex = item;
        };

        /**
         * 项目分页查询
         * @param page
         * @param callback
         */
        var projectCheckFunction = function(page,callback){
            $scope.searchProject.page = page;
            $http.post(url + "/Project/listPageProject",{Project:$scope.searchProject}).success(callback);
        }
        $scope.currentProject = app.get('Paginator').list(projectCheckFunction,6);

        //获取项目个数
        $http.get(url+"/Project/getusesystemcount").success(function(data){
            $scope.projectCount = data;
        }).error(function(data,status,headers,config){
            layer.msg('获取项目个数失败!', {icon: 0, time: 2000});
        });

        //根据当期登录人的id查询所在团队管理的项目
        $http.get(url+"/Teamworkstaff/getProjectByStaffId/"+$scope.user.employId).success(function(data){
            $scope.teamworkStaff = data.Teamworkstaff;
        }).error(function(data,status,headers,config){
            layer.msg('查询失败!', {icon: 0, time: 2000});
        });

        //跳转方案详情
        $scope.detail = function(temp){
            $scope.temp = temp;
            if($scope.temp.isUseSystem==1){
                layer.msg('请先启用该项目!', {icon: 0, time: 2000});
                return;
            }
            var count=0;
            for(var i=0;i<$scope.teamworkStaff.length;i++){
                if($scope.teamworkStaff[i].projectId == temp.projectId){
                    var project = JSON.stringify(temp);
                    sessionStorage.setItem("_project",project);
                    $location.path("/index/accountManagement");
                    count++;
                }
            }
            if(count==0){
                layer.msg('该操作人员无权限进入此项目!', {icon: 0, time: 2000});
            }
        }
        
        //跳转状态启停
        $scope.changeStatus = function(temp){
            $scope.temp = temp;
            if(temp['isUseSystem']==0)
            {
                $scope.chouseName='停用';
            }else if(temp['isUseSystem']==1)
            {
                $scope.chouseName='启用';
            }
            layer.confirm("您确定要"+ $scope.chouseName+"该项目吗？", {btn: ['是', '否']}, function () {
                $http.post(url + '/Project/updateIsUseSystemByProjectId', {Project:$scope.temp}).success(function (data) {
                    layer.msg($scope.chouseName+"项目成功！", {icon: 1, time: 2000});
                    $scope.currentProject._load();
                    $http.get(url+"/Project/getusesystemcount").success(function(data){
                        $scope.projectCount = data;
                    });
                });
            });
        }

    }]);
});