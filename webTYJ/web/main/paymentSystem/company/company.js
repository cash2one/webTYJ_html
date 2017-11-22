/**
 * Created by wangzhou on 2016/4/15.
 * Name :
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('companyCtrl', ['$scope', '$http','$rootScope','$location','$sce', function ($scope,$http,$rootScope,$location,$sce) {

        //获取登录人的信息
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;
        console.log($scope.user);

        //设置访问后台路径
        var loginName = $scope.user.loginName;
        var userId = $scope.user.userId;
        var userName = $scope.user.userName;
        var company_id = $scope.user.companyId;
        var role = 1;
        var payurl = $rootScope.payUrl;
        payurl += "/login/to?role=" + role + "&loginName=" + loginName + "&userId=" + userId + "&userName=" + userName + "&company_id=" + company_id + "";
        $scope.abc = $sce.trustAsResourceUrl(payurl);

    }]);
});