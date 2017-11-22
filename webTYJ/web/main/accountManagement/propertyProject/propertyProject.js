/**
 * Created by NM on 2018/1/18.
 * 物业项目计费模块
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('propertyProjectCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.searchProject = {page:{}};

        /**
         * 项目分页查询
         * @param page
         * @param callback
         */
        var projectCheckFunction = function(page,callback){
            $scope.searchProject.page = page;
            $http.post(url + "/Project/listPageProject",{Project:$scope.searchProject}).success(callback);
        }
        $scope.currentProject = app.get('Paginator').list(projectCheckFunction,10);
        console.log($scope.currentProject);

        //获取项目个数
        $http.get(url+"/Project/getusesystemcount").success(function(data){
            $scope.projectCount = data;
            console.log($scope.projectCount)
        }).error(function(data,status,headers,config){
            alert("获取项目个数失败!")
        });

        //跳转方案详情
        $scope.detail = function(temp){
            $scope.temp = temp;
            var project = JSON.stringify(temp);
            sessionStorage.setItem("_project",project);
            $location.path("/index/accountManagement/propertyProject/plan/detailPlan/");
        }

    }]);
});