/**
 * Created by wangzhou on 2016/4/15.
 * Name :
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('projectCtrl', ['$scope', '$http','$rootScope','$location','$sce', function ($scope,$http,$rootScope,$location,$sce) {

        //获取登录人的信息
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        var productid = '';
        productid = JSON.parse(localStorage.getItem("project_ids"));

        //设置访问后台路径

        var loginName = $scope.user.loginName;
        var userId = $scope.user.userId;
        var userName = $scope.user.userName;
        var project_id = productid;
        var role = 2;
        var payurl = $rootScope.payUrl;
        payurl += "/login/to?role=" + role + "&loginName=" + loginName + "&userId=" + userId + "&userName=" + userName + "&project_id=" + project_id + "";
        $scope.abc = $sce.trustAsResourceUrl(payurl);

    }]);
});