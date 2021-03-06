/**
 * Created by NM on 2018/1/18.
 * 首页js
 */

'use strict';

define(function (require) {
    var app = require('../app');

    app.controller('mainCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {

        //107版本配置
        //$rootScope.videoUrl ="http://120.24.223.107:90/VideoSystem/cxfws/rest";
        //$rootScope.homeUrl ="http://120.24.223.107:8080/System/cxfws/rest";
        //$rootScope.url="http://120.24.223.107:8080/webTYJ/cxfws/rest";
        //$rootScope.fileUrl="http://120.24.223.107:8080/webTYJ";
        //$rootScope.jiajiaUrl = "http://120.24.223.107:90/System/cxfws/rest";
        //$rootScope.jiajiaFileUrl = "http://120.24.223.107:90/System";
        //$rootScope.saasUrl = "http://120.24.223.107:8080/SaaS";
        //$rootScope.payUrl = "http://120.24.223.107:8080/payms/cxfws";
        //$rootScope.userPlatformUrl="http://120.24.223.107:9999/UserPlatform/cxfws";

        $rootScope.loginState=0;
        //本地版本配置
        $rootScope.videoUrl ="http://192.168.10.204:90/VideoSystem/cxfws/rest";
        $rootScope.homeUrl ="http://192.168.10.204:8080/System/cxfws/rest";
        $rootScope.url="http://127.0.0.1:8080/webTYJ/cxfws/rest";
        $rootScope.fileUrl="http://127.0.0.1:8080/webTYJ";
        $rootScope.jiajiaUrl = "http://192.168.10.204:90/System/cxfws/rest";
        $rootScope.jiajiaFileUrl = "http://192.168.10.204:90/System";
        $rootScope.saasUrl = "http://120.24.223.107:8080/SaaS";
        $rootScope.payUrl = "http://120.24.223.107:8080/payms/cxfws";//增加跳转支付系统路径
        $rootScope.userPlatformUrl="http://120.24.223.107:9999/UserPlatform/cxfws";//增加用户统一管理平台地址


    }]);

});
