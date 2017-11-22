/**
 * Created by wuying on 16/1/29.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('massInformationCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.jiajiaUrl;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        $scope.Information={page:{}};
        $scope.Information.range = 1;
        $scope.Information.companyId = $scope.user.companyId;
        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.Information.page = page;
                $http.post(url + '/information/listPageInformation',{Information: $scope.Information}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };
        $scope.load();

        $scope.changeData = function(x){
            $scope.Information.range = x;
            $scope.load();
        };

        $scope.query = function(){
            $scope.load();
        }
    }]);
});