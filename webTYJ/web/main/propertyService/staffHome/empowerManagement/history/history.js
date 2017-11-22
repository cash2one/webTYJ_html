/**
 * Created by 彭婷婷  on 2015/4/13.
 *
 */

/**
 * Created by NM on 2018/1/18.
 * 授权管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('empowerHistoryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(2);
        var url = $rootScope.url;
        $scope.personCust = $rootScope.user;
        //根据被授权人id查询授权信息
        $scope.authorization = {authorizedPersonid:'', page: {}};
        //查询所有的授权项目
        $scope.authorizationProjectType = {};

        //页面显示
        $scope.show1 = false;
        $scope.show2 = false;
        //加载数据
        $scope.loading = function () {
            var fetchFunction = function (page, callback) {
                $scope.authorization.page = page;
                $scope.authorization.authorizedPersonid = $scope.personCust.custId;
                $http.post(url + '/Authorization/listPageAuthorizationRestful', {Authorization: $scope.authorization}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        };
        $scope.loading();
        $http.get(url + '/AuthorizationProjectType/listAllData').success(function(data) {
            $scope.authorizationProjectType = data.AuthorizationProjectType;
        });

        /**
         *  新建授权信息
         */
        $scope.addNew = function()
        {
            $scope.doClick(1);
        };

    }]);
});