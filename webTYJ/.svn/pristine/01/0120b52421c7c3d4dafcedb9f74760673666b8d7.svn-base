/**
 * Created by NM on 2018/1/18.
 * 产权变更的房屋信息JS
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('addHousingInformationCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        /**
         * 通过业主房屋id获取房屋对象信息
         */
        $scope.changeTitle1={};

        $http.get(url + '/House/getHouseById/' +3).success(function(data) {
            $scope.changeTitle1 = data.House;
            alert("房屋信息注入成功");
        }).error(
            function(data, status,
                     headers, config) {
                alert("房屋信息注入失败");
            });

        /**
         * 通过人员信息条件搜索人员
         */

        $scope.PersonCust = {};
        $scope.listAllPersonCustRestfulone = function() {
            $http.post(
                url + '/PersonCust/listAllPersonCustRestfulone', {
                    PersonCust : $scope.PersonCust
                })
                .success(function(data) {
                    $scope.personCust1 = data.PersonCust;
                    console.log($scope.personCust1);
                    alert("人员信息获取成功");
                }).error(
                function(data, status, headers, config) {
                    alert("人员信息获取失败");
                });
        };

        /**
         * 通过人员id获取人员对象
         */
        $scope.addOwner = {};
        $scope.getPersonBycustId = function(id) {
            $http.get(url + '/PersonCust/getPersonCustByIdRestfulone/' + id).success(function(data) {
                $scope.addOwner = data.PersonCust;
                console.log($scope.addOwner);
                alert("人员信息获取成功");

            }).error(
                function(data, status,
                         headers, config) {
                    alert("人员信息注入失败");
                });
        };



        //保存产权变更信息
        $scope.changeTitle={};
        $scope.insertChangeTitleRestful = function() {
            //alert($scope.addOwner.custId);

            $scope.changeTitle.custId=$scope.addOwner.custId;
            alert($scope.changeTitle.custId);
            if($scope.addOwner.name) {
                $http.post(url + '/ChangeTitle/insertChangeTitleRestful/', {ChangeTitle: $scope.changeTitle}).success(function () {
                    alert("信息保存成功");
                }).error(
                    function (data, status, headers, config) {
                        alert("信息保存失败");
                    });
            } };


        //通过业主ID查询出所有业主资产信息
        $scope.assets={};
        $http.get(url + '/House/listHouseByCustId/'+2).success(function(data) {
            console.log(data);
            $scope.assets = data.House;
        });

    }]);
});