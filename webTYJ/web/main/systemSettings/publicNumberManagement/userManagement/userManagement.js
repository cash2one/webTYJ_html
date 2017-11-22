/**
 * Created by wuying on 16/2/17.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('userManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.jiajiaUrl;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.SubscribeJiaJia={page:{}};
        //$scope.user.companyId = '1';
        $scope.SubscribeJiaJia.companyId = $scope.user.companyId;
        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.SubscribeJiaJia.page = page;
                $http.post(url + '/subscribeJiaJia/listPageSubscribeUser',{SubscribeJiaJia: $scope.SubscribeJiaJia}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.dir($scope.searchPaginator);
        };
        $scope.load();

        $scope.query = function () {
            $scope.load();
        };


        //得到选中的复选框的值
        $scope.chooseData = {datas: []};
        $scope.getData = function (data) {
            setTimeout(function(){
                var id = data.jiajiaUserId;
                var temp = document.getElementById(id);
                $scope.dataa = {};
                $scope.dataa = data;
                if (temp.checked == true) {
                    $scope.chooseData.datas.push($scope.dataa);
                } else {
                    $scope.temp = [];
                    $scope.temp = $scope.chooseData.datas;
                    $scope.chooseData = {datas: []};
                    for (var i = 0; i < $scope.temp.length; i++) {
                        if ($scope.temp[i].jiajiaUserId != id) {
                            $scope.chooseData.datas.push($scope.temp[i]);
                        }
                    }
                }
                console.dir($scope.chooseData.datas);
            },"10");
        };



        //删除
        $scope.dleteData={subscribeJiaJias:[],companyId:$scope.user.companyId};
        $scope.toDelete = function(){
            if ($scope.chooseData.datas.length >= 1) {
                layer.confirm("您确定要吧选中的用户加入黑名单吗?", {btn: ['是', '否']}, function () {
                    $scope.dleteData.subscribeJiaJias = $scope.chooseData.datas;
                    $http.post(url + '/subscribeJiaJia/updateSubscribeJiaJiaById', {SubscribeJiaJia: $scope.dleteData}).success(function () {
                        layer.msg("加入黑名单成功", {icon: 1, time: 2000});
                        $scope.chooseData = {datas: []};
                        $scope.load();
                    }).error(function (data, status, headers, config) {
                        layer.msg("加入黑名单失败", {icon: 3, time: 2000});
                    });
                })
            } else {
                layer.alert("请选择要加入黑名单的用户", {icon: 0});
            }
        };


    }]);
});