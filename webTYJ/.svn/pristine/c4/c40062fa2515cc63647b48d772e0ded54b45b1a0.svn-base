/**
 * Created by NM on 2018/1/18.
 * 物业合同管理的合同列表
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('contractListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };


        $scope.checkShow = true;
        $scope.show1 = false;
        var url = $rootScope.url;
        $scope.searchTenementPact = {state : -1,page : {}};

        var checkItem = function (page, callback) {
            $scope.searchTenementPact.page = page;
            $http.post(url + '/TenementPact/listPageTenementPactRestful', {TenementPact: $scope.searchTenementPact}).success(callback);
        };
        $scope.currentItem = app.get('Paginator').list(checkItem, 6);

        /**
         * 查询详情
         */
        $scope.currentCheck = function(items){
            $scope.checkShow = false;
            $scope.show1 = true;
            $scope.annexs = [];
            $scope.tenementPact = items;
            if(!angular.isArray(items.annexs)){
                $scope.annexs.push(items.annexs);
                $scope.tenementPact.annexs = $scope.annexs;
            }
            console.log($scope.tenementPact);
        };

        /**
         * 关闭详情
         */
        $scope.checkClose = function(){
            $scope.checkShow = true;
            $scope.show1 = false;
        };

    }]);
});
