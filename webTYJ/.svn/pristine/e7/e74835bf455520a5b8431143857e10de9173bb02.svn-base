/**
 * Created by NM on 2018/1/18.
 * 收费项目js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('chargingItemCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.chargeItemNew = {page:{}};

        $scope.load = function(){
            var fetchFunction = function(page,callback) {
                $scope.chargeItemNew.page=page;
                $http.post(url + '/ChargeItemNew/listPageChargeItemNew',{ChargeItemNew:$scope.chargeItemNew}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,5);
            console.log( $scope.searchPaginator);
        };

        //加载
        $scope.load();
        //查询所有物业项目
        $http.get(url+'/Project/listAllProject').success(function(data){
            console.log(data);
            $scope.projects=data.Project;
        }).error(function(data, status, headers, config){
            alert("查询物业项目失败");
        });
        //判断checkbox是否选中
        $scope.d=false;
        $scope.getData=function(items){
            var chk = document.getElementsByName("name");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.updateChargeItem=items;
                    $http.get(url+'/ChargeItemNew/getChargeItemNewByIds/'+ items.ciId).success(function(data){
                        $scope.updateChargeItem.chargeItemNewList = data.ChargeItemNew;
                    }).error(function(data, status, headers, config){
                        alert("查询收费详情失败");
                    });
                    console.log($scope.updateChargeItem);
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };

        /**
         * 根据收费项目显示收费详情
         */
        $scope.checkItem = function(items){
            $scope.id = items.ciId;
            $http.get(url+'/ChargeItemNew/getChargeItemNewByIds/'+ $scope.id).success(function(data){
                $scope.currentCheck = data.ChargeItemNew;
                console.log($scope.currentCheck);
            }).error(function(data, status, headers, config){
                alert("查询收费详情失败");
            });
        };

        /**
         * 添加一个收费详情
         */
        $scope.chargingAdd=[];           //收费详情
        $scope.addRow=function() {
            var item = {};
            $scope.chargingAdd.push(item);
        };

        /**
         * 新增保存收费项目
         */
        $scope.chargeItemNewAdd = {chargeItemNewList:[]};
        $scope.save = function(){
            $scope.chargeItemNewAdd.chargeItemNewList = $scope.chargingAdd;
            $http.post(url + '/ChargeItemNew/insertChargeItemNew',{ChargeItemNew:$scope.chargeItemNewAdd}).success(function(){
                alert('新增物品成功！');
                console.log($scope.chargeItemNewAdd);
                $scope.chargeItemNewAdd = {};
                $scope.load();
            }).error(function(data, status, headers, config){
                alert('新增物品失败！');
            });
        };

        /**
         * 修改页面添加收费详情
         */
        $scope.addUpdateRow=function() {
            var item = {};
            $scope.updateChargeItem.chargeItemNewList.push(item);
        };

        /**
         * 修改保存收费项目
         */
        $scope.update = function(){
            $http.put(url + '/ChargeItemNew/updateChargeItemNew',{ChargeItemNew:$scope.updateChargeItem}).success(function(){
                alert('修改收费项目成功！');
                console.log($scope.updateChargeItem);
                $scope.load();
            }).error(function(data, status, headers, config){
                alert('修改收费项目失败！');
            });
        };

    }]);
});
