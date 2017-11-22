/**
 * Created by NM on 2018/1/18.
 * 车辆查询js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('allVehiclesCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.searchInf={page:{}};//查询车辆条件对象
        // $scope.search.custId=$rootScope.user.custId;
        /**
        $scope.selectCarInfo=function(){
            $http.post(url+'/CarInfo/listSearchCarInfo',{Search:$scope.search}).success(function(data)
            {
                //console.log("获取车辆成功");
                //console.log(data);
                $scope.carInfos=data.CarInfo;
                console.log($scope.carInfos);
                //$scope.carInfos=$scope.notrepeat($scope.carInfos);
                //console.log($scope.carInfos);
            }).error(function(data, status, headers, config){
                console.log("获取车辆失败");
            }) ;
        }
**/
        $scope.searchCarInfoListPage=function(){
            var fetchFunction = function(page, callback){
                $scope.searchInf.page=page;
                $http.post(url + '/CarInfo/listPageCarInfoBySearchItems',{Search:$scope.searchInf}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        }
        $scope.searchCarInfoListPage();
        $scope.updateCarDeleteState=function(carInfo){
            //console.log(carInfo.carId);
            $http.post(url+'/CarInfo/updateCarInfoDeleteCarByCarId/',{CarInfo:carInfo}).success(function()
            {
                //console.log("删除成功");
                $scope.searchCarInfoListPage();
            }).error(function(data, status, headers, config){
                alert("删除失败");
            }) ;
        }


        //选中车辆
        $scope.carInfoone={};
        $scope.choiceCar=function(carInfo)
        {
            $scope.carInfoone=carInfo;
        };


        //编辑车辆信息
        $scope.updateCarInfo=function()
        {

            $http.put(url+'/CarInfo/UpdateCarInfo',{CarInfo:$scope.carInfoone}).success(function()
            {
                //console.log("修改成功");
                $scope.searchCarInfoListPage();
            }).error(function(data, status, headers, config){
                alert("修改失败");
            }) ;
        };

        //删除车辆信息
        /**
        $scope.deleteCarInfo=function(items)
        {
            console.log(items.carId);
            $http.get(url + '/CarInfo/deleteCarInfoById/carId='+ items.carId).success(function()
            {
                console.log("删除成功");
                //$scope.searchCarInfoListPage();
            }).error(function(data, status, headers, config){
                console.log("删除失败");
            }) ;

        };**/

        //重新获取车辆信息
        $scope.repeatCarInfo=function(){
            //$scope.search={};
            //$scope.search.custId=$rootScope.user.custId;
            $http.post(url+'/CarInfo/listSearchCarInfo',{Search:$scope.search}).success(function(data)
            {
                //console.log("获取车辆成功");
                //console.log(data);
                $scope.carInfos=data.CarInfo;
               // console.log($scope.carInfos);

            }).error(function(data, status, headers, config){
                console.log("获取车辆失败");
            }) ;
        };



        //去重车辆信息
        $scope.notrepeat=function(entrances){
            for ( var i = 0; i < entrances.length; i++) {
                for(var j = entrances.length-1 ; j > i; j--){
                    if (entrances[i].carId == entrances[j].carId) {
                        entrances[j]={};
                    }
                }
                console.log(entrances);
            }
            return entrances;

        };

        //删除车辆信息
        $scope.deleteCarInfo=function()
        {
            $http.put(url + '/CarInfo/deleteCarInfo/'+ $scope.carInfoone.carId).success(function()
            {
                console.log("删除成功");

            }).error(function(data, status, headers, config){
                console.log("删除失败");
            }) ;

        };
    }]);
});