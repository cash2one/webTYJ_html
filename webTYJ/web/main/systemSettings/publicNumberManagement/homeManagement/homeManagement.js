/**
 * Created by SZ on 2018/1/18.
 * 家家账号管理js
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('homeManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.jiajiaUrl;
        var urlbase =$rootScope.url;

        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        var companyId= $scope.user.companyId;

        //获取项目信息
        $scope.projectIdList = [];
        $http.get(urlbase + '/Company/getCompanyInformation/' + companyId).success(function(data){
            for(var i=0; i<data.Company.projectList.length; i++){
                if(data.Company.projectList[i].projectId!=null && data.Company.projectList[i].projectId != undefined){
                    $scope.projectIdList.push(data.Company.projectList[i]);
                }

            }
        }).error(function(data){
            layer.msg('没有有效的公司信息！',{icon : 0,time : 1000});
        });

        $scope.UserList = [];
        $scope.load = function(){
            $http.get(url + '/sample/getUserByCompany/' + companyId).success(function (data) {
                if(data[0].state=="success"){
                    $scope.temp = data[0].info;
                    if(!angular.isArray($scope.temp)){
                        $scope.UserList.push($scope.temp);
                    }else{
                        $scope.UserList = $scope.temp;
                    }
                    if($scope.projectId != null && $scope.projectId != ''){
                        var temp = [];
                        for(var i=0; i<$scope.UserList.length; i++){
                            if($scope.UserList[i].projectId.indexOf($scope.projectId)>=0){
                                temp.push($scope.UserList[i]);
                            }
                        }
                        $scope.UserList = temp;
                    }
                    if($scope.loginname != null && $scope.loginname != ''){
                        var temp = [];
                        for(var i=0; i<$scope.UserList.length; i++){
                            if($scope.UserList[i].loginname.indexOf($scope.loginname)>=0){
                                temp.push($scope.UserList[i]);
                            }
                        }
                        $scope.UserList = temp;
                    }
                    if($scope.username != null && $scope.username != ''){
                        var temp = [];
                        for(var i=0; i<$scope.UserList.length; i++){
                            if($scope.UserList[i].username.indexOf($scope.username)>=0){
                                temp.push($scope.UserList[i]);
                            }
                        }
                        $scope.UserList = temp;
                    }
                    if($scope.cardNum != null && $scope.cardNum != ''){
                        var temp = [];
                        for(var i=0; i<$scope.UserList.length; i++){
                            if($scope.UserList[i].cardNum.indexOf($scope.cardNum)>=0){
                                temp.push($scope.UserList[i]);}
                        }
                        $scope.UserList = temp;
                    }
                    $scope.loadPages($scope.UserList);
                } else if(data.state == "failure"){
                    $scope.UserList=[];
                    $scope.loadPages([]);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('家家账号查询失败！',{icon : 0,time : 1000});
            });
        };

        $scope.load();


        /****************************   分页start   ******************************/

        $scope.currentPage = 1;             //分页相关参数
        $scope.totalPage = 1;
        $scope.pageSize = 6;
        $scope.pages = [];
        $scope.endPage = 1;

        /**
         * 实现分页
         */
        $scope.listPages=function(currentPage,pageSize,array){
            var dataArray=[];
            if(currentPage*pageSize>array.length){
                for(var i=(currentPage-1)*pageSize;i<array.length;i++) {
                    dataArray.push(array[i]);
                }
            }else{
                for(var i=(currentPage-1)*pageSize;i<currentPage*pageSize;i++){
                    dataArray.push(array[i]);
                }
            }
            return dataArray;
        };

        /**
         * 实现分页及参数改变
         */
        $scope.currentHouse = [];
        $scope.loadPages = function (array) {
            //for(var i=0;i<$scope.checked.length;i++){
            //    $scope.checked[i]=false;
            //}
            $scope.currentHouse = $scope.listPages($scope.currentPage,$scope.pageSize,array);
            $scope.totalPage = Math.ceil(array.length / $scope.pageSize);
            $scope.endPage = $scope.totalPage;
            //生成数字链接
            if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage
                ];
            }else if($scope.currentPage == 1 && $scope.totalPage == 1){
                $scope.pages = [
                    $scope.currentPage
                ];
            }
        };

        /**
         *查询下一页
         */
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }
            $scope.loadPages($scope.UserList);
        };

        /**
         *  查询前一页
         */
        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
            }
            $scope.loadPages($scope.UserList);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.loadPages($scope.UserList);
        };

        /****************************   分页end   ******************************/

    }]);
});
