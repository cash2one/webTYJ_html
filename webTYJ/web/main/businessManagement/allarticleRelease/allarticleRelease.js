/**
 * 创建时间：2015/5/19
 * jsName:放行条查询
 */
'use strict';

/**
 * Created by NM on 2018/1/18.
 * 放行条查询js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('allReleaseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.itemsone=[{}];
        //$scope.sesrch={};
        $scope.tag=0;

        $scope.articleRelease = {page:{}};
        $scope.sesrch = {page:{}};

        //console.log($rootScope.user.custId);

        /*$scope.load = function(){
            var fetchFunction = function (page, callback) {
                //$scope.articleRelease.custId = $rootScope.user.custId;
                $scope.articleRelease.custId="";
                $scope.articleRelease.page = page;
                $http.post(url + '/ArticleRelease/listPageArticleReleaseByPersonId',{ArticleRelease:$scope.articleRelease}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);
        };*/
        //$scope.load();

        //查询数组
        $scope.change=function(){
            $scope.tag=1;
            var fetchFunction = function (page, callback) {
                //$scope.articleRelease.custId = $rootScope.user.custId;
                $scope.sesrch.page = page;
                $http.post(url + '/ArticleRelease/listPageArticleReleaseByCondition',{Search:$scope.sesrch}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);
            //$http.post(url + '/ArticleRelease/listPageArticleReleaseByCondition',{Search:$scope.sesrch}).success(function (data) {
            //    console.log("搜索成功");
            //    console.log(data.ArticleRelease);
            //    $scope.itemsone=data.ArticleRelease;
            //    //$scope.load();
            //}).error(function(){
            //    console.log("搜索失败")
            //});
        };

        /*$scope.change=function(){
            $http.post(url + '/ArticleRelease/listAllArticleRelease',{Search:$scope.sesrch}).success(function (data) {
                    console.log("搜索成功");
                    console.log(data.ArticleRelease);
                    $scope.itemsone=data.ArticleRelease;
                    $scope.load();
                }).error(function(){
                    console.log("搜索失败")
                });
        }*/
        //模态框数据
        $scope.rele={};
        $scope.show = function(item) {
            $scope.rele=item;
        };

        $scope.showStatus=1;

        //网格切换
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }

    }]);
});