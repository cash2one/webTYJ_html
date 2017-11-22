/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('chooseHouseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;


        //加载房屋信息
        $scope.search.custId=$rootScope.user.custId;
        $http.post(url+'/HouseNew/listAllHouseNewBySearch',{Search:$scope.search}).success(function(data)
        {
            console.log("搜索成功");
            $scope.HouseNew=data.HouseNew;
            console.log("***************************");
            console.log($scope.HouseNew);
            console.log("***************************");
        }).error(function(data,status,headers,config){
            console.log("搜索失败，自己填充数据")

        });

        $scope.choses=function(){


        };

        // $scope.test=' 选择房屋信息';
        // //获取房子的Id号
        // $scope.getHouseId=function(houseId){
        //
        //   	$http.get(url+'/House/getHouseById/'+houseId).success(function(data){
        //   		console.log(data);
        //		$scope.house = data.House;
        //
        //
        //       });
        //
        //};
        //
        //
        //
        // $http.get(url + '/House/listPagehouseRest').success(function(data) {
        //   		console.log(data);
        //   		$scope.House = data.House;
        //   	});

    }]);
});