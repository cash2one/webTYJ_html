/**
 * Created by rui on 2016/8/9.
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('ordersListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var filePath='';
        var fileUrl=$rootScope.fileUrl;             //上传的文件路径

        $scope.index = 0;
        $scope.page1 = 1;
        $scope.showDetails = function (num) {
            switch (num){
                case 1:$scope.index=1;break;
                case 2:$scope.index=2;break;
                case 3:$scope.index=3;break;
                case 4:$scope.index=4;break;
                case 5:$scope.index=5;break;
                case 6:$scope.index=6;break;
                case 7:$scope.index=7;break;
                case 8:$scope.index=8;break;
                case 9:$scope.index=9;break;
                case 10:$scope.index=10;break;
                case 11:$scope.index=11;break;
                case 12:$scope.index=12;break;
                case 13:$scope.index=13;break;
                case 14:$scope.index=14;break;
                default:$scope.index=0;
            }
        };

        $scope.backToList = function () {
            $scope.index = 0;
        };

        $scope.changePage = function (i) {
          $scope.page1 = i;
        };
        /*/!**
         * 领取物品前端分页查询
         * @type {number}
         *!/
         $scope.index2=1;
         $scope.showCount2=5;
         $scope.totalPage2 = 0;
         $scope.page2=function(){
         $scope.data2 = [];
         if($scope.index2!=$scope.totalPage2){
         for(var i=(($scope.index2-1)*$scope.showCount2);i<($scope.index2*$scope.showCount2);i++){
         $scope.data2.push($scope.currentItem2[i]);
         }
         }else{
         for(var i=(($scope.index2-1)*$scope.showCount2);i<$scope.currentItem2.length;i++){
         $scope.data2.push($scope.currentItem2[i]);
         }
         }
         console.log($scope.data2)
         };
         /!**
         * 显示下一页
         *!/
         $scope.next2=function(){
         if($scope.index2==$scope.totalPage2){
         alert('已经是末页');
         }else{
         $scope.index2 += 1;
         $scope.page2();
         }
         };
         /!**
         * 显示上一页
         *!/
         $scope.previous2=function(){
         if($scope.index2==1){
         alert('已经是首页');
         }else{
         $scope.index2 -= 1;
         $scope.page2();
         }
         };
         /!**
         * 显示当前页
         *!/
         $scope.go2=function(index2) {
         if(index2>=1 && index2<=$scope.totalPage2) {
         $scope.totalPage2=index2;
         }
         $scope.page2();
         };
         */
    }]);
});

