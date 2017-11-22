/**
 * Created by chenl on 2016/7/5.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('eventTasksCtrl', ['$scope','$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var localStorageItem=JSON.parse(localStorage.getItem('EventItem'));
        var serviceRequestId = '';
        if(localStorageItem.Itme!=null){
            serviceRequestId = localStorageItem.Itme.serviceRequestId;
        }
        $scope.Itmes=localStorageItem.Itme;
        console.log($scope.Itmes);
        console.log(localStorageItem);
        console.log(serviceRequestId);
        var url=$rootScope.url;

        $scope.clickGoing1 = true;
        $scope.clickCompleted1 = false;

        $scope.clickGoing=function(project){
            $scope.TasksPage();
            $scope.clickGoing1 = true;
            $scope.clickCompleted1 = false;
        }

        $scope.clickCompleted=function(project){
            $scope.TasksPage1();
            $scope.clickGoing1 = false;
            $scope.clickCompleted1 = true;
        }

        //重大事项任务下的请求分页
        $scope.TasksPage=function(){
            $scope.TaskProject={page:{}};
            var currentCheck11 = function(page,callback){
                $scope.TaskProject.page = page;
                $scope.TaskProject.serverId = serviceRequestId;
                $http.post(url+'/Tasks/listPageTasksbyServiceRequestId',{Tasks:$scope.TaskProject}).success(callback);
            };
            $scope.projectTask = app.get('Paginator').list(currentCheck11,6);
            console.log($scope.projectTask);
        }
        $scope.TasksPage();

        /**
         * 任务页面网格列表切换
         */
        $scope.grid1=true;//默认显示网格

        $scope.list1=function(index){
            if(index==1){
                $scope.grid1=false;
                $scope.grid2=true;
            }else if(index==2){

            }


        }

        $scope.gridChange1=function(index){
            if(index==1){
                $scope.grid2=false;
                $scope.grid1=true;
            }else if(index==2){

            }


        }


        $scope.TasksPage1=function(){
            $scope.TaskProject={page:{}};
            console.log($http);
            var currentCheck11 = function(page,callback){
                $scope.TaskProject.page = page;
                $scope.TaskProject.subordinateType = 2;
                $scope.TaskProject.subordinateId = $scope.project.projectId;

                $http.post(url+'/Tasks/listPageTaskbySubordinateIdAndType1',{Tasks:$scope.TaskProject}).success(callback);
            };
            $scope.projectTask = app.get('Paginator').list(currentCheck11,6);
            console.log($scope.projectTask);
        }

        //传任务ID给工单页面
        $scope.taskDetailsId = function(taskId,taskState,buildingStructureNew,serviceRequestId){
            localStorage.setItem('item',JSON.stringify({taskId:taskId,taskState:taskState,buildingStructureNew:buildingStructureNew,serviceRequestId:serviceRequestId}))
            $location.path("/index/serviceRequest/repairOrder");
        }

        $scope.newDetails=function(project){

        };

    }]);
});