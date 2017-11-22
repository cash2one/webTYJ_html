/**
 * Created by wuying on 16/1/29.
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('publicNumberManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
        };

        $scope.shownum = true;

        var url = $rootScope.jiajiaUrl;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        $scope.companyId = $scope.user.companyId;
        $scope.companyName = $scope.user.Company.companyName;

       
        $http.get(url + '/subscribe/getSubscribeId/' + $scope.companyId).success(function(data){
            //如果订阅号不存在则创建订阅号
            if(data == "") {
                $http.get(url + '/subscribe/createSubscribe/' + $scope.companyId+"/" + $scope.companyName);
                console.dir("创建");
            }
        }).error(function(data){

        });
    }]);
});