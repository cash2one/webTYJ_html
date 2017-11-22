/**
 * Created by NM on 2018/1/18.
 * 房屋初验js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('houseListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        /****  2015.12.22 王洲 删除无用代码，增加注释start  ****/

            //分页对象
        $scope.acceptanceHouse = {page: {}};
        var url = $rootScope.url;   //全局访问路径

        //分页查询历史记录
       $scope.load = function () {
            var acceptanceHouse = function (page, callback) {
                $scope.acceptanceHouse.page = page;
                $http.post(url + '/AcceptanceHouse/listPageAcceptanceHouse', {AcceptanceHouse: $scope.acceptanceHouse}).success(callback);
            };
            $scope.currentAcceptanceHouse = app.get('Paginator').list(acceptanceHouse, 6);
        };
        $scope.load();
        /****  2015.12.22 王洲 删除无用代码，增加注释end  ****/
            //设置数据默认以列表显示
        $scope.showStatus=1;

        //网格  陈秋旭  2016.02.03
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }

    }]);
});