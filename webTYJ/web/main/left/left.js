/**
 * Created by NM on 2016/1/21.
 *
 */
'use strict';

define(function (require) {
    var app = require('../../app');

    app.controller('leftCtrl', ['$scope', function ($scope) {
        //屏幕适配
        $scope.loadDefault=function(){
            var wWidth = $(window).width();
            var wHeight = $(window).height();
            $(".left").height(wHeight-70);
            $(".content").height(wHeight-100);
        };
        $scope.loadDefault();

        //修改资料
        $scope.changeData = function()
        {
            layer.msg('此功能还未开放，敬请期待!',{icon:0});
        };

        var user = {userId : ''};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.loginName = '';
        if($scope.user.userId != ''){
            if($scope.user.staff != null){
                $scope.loginName = $scope.user.staff.staffName;
            }else{
                $scope.loginName = '超级管理员';
            }
            $scope.loginName = '欢迎！' + $scope.loginName;
        }else{
            $scope.loginName = '暂无登陆信息';
        }
    }]);
});