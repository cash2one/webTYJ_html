/**
 * Created by NM on 2018/1/18.
 * 项目详情js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('projectDetailsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //增加入伙前置条件判断  王洲  2016.2.1

        //获取后台访问路径
        var url = $rootScope.url;
        //获取项目id
        var projectid = '';
        var projectids = JSON.parse(localStorage.getItem("project_id"));
        $scope.projectIds = projectids?projectids:projectid;
        //获取建筑基础数据数量、建筑数量、客户资产数量、个人客户、企业客户数量
        $scope.buildAreaNum = 0;
        $scope.buildNum = 0;
        $scope.assetNum = 0;
        $scope.personNum = 0;
        $scope.enterpriseNum = 0;

        /**
         * 选中样式
         * @type {number}
         */

        $scope.btnIndex=1;
        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };


        $http.get(url + '/Project/getProjectbyId/' + $scope.projectIds).success(function(data){
            $scope.buildAreaNum = data.Project.projectCompletion.areaType;
            $scope.buildNum = data.Project.projectCompletion.building;
            $scope.assetNum = data.Project.projectCompletion.assetbinding;
            $scope.personNum = data.Project.projectCompletion.person;
            $scope.enterpriseNum = data.Project.projectCompletion.enterprise;
        }).error(function(data){
            layer.msg('未找到有效数据，请重试！',{icon : 0,time : 1000});
        });

        //进入入伙前判断其他数据是否已经有数据
        //ui-sref="index.baseManagement.project.newActivity"
        $scope.checkNum = function(){
            if($scope.buildAreaNum == 0 || $scope.buildNum == 0 || $scope.assetNum == 0 || $scope.personNum == 0 || $scope.enterpriseNum == 0){
                layer.msg('还有基础数据未完成，不能进行入伙操作！',{icon : 0,time : 1000});
            }else {
                //$location.path("/index/baseManagement/project/newActivity");
                layer.alert('此功能暂未开放，敬请期待！',{icon : 0});
            }
        };

    }]);
});