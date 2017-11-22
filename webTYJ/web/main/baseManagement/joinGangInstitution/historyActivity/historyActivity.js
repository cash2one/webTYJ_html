/**
 * Created by 彭婷婷 on 2015/5/14.
 * 名称：入伙初始化历史活动js
 * 修改人：倪明   修改时间：2015/8/26
 */

/**
 * Created by NM on 2018/1/18.
 * 入伙初始化历史活动js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('historyActivityCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(1);//增加tab高亮显示  王洲  2016.2.2

        var url = $rootScope.url;           //IP地址
        $scope.intake={page:{}};       //水表抄表投诉分页

        $scope.load = function(){
            /**
             * 查询所有入伙历史活动
             */
            var checkFunction = function(page,callback){
                $scope.intake.page = page;
                $http.post(url+'/IntakeActivity/listPageIntakeActivity',{IntakeActivity:$scope.intake}).success(callback);
            };
            $scope.checkItem = app.get('Paginator').list(checkFunction,5);
        };

        //加载数据
        $scope.load();
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