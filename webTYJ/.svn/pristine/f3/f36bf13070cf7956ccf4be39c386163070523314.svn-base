/**
 * Created by NM on 2018/1/18.
 * 全部门禁卡s
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('allCardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.n=1;
        //通过条件查询门禁卡信息
        $scope.search={};
        $scope.selectEntrance=function(){

            $http.post(url+'/Entrance/listAllEntranceBySearch',{Search:$scope.search}).success(function(data)
            {
                console.log("搜索门禁卡成功");
                $scope.entrances=data.Entrance;
                console.log("根据条件查到的门禁卡信息");
                console.log($scope.entrances);
                $scope.entrances= $scope.notrepeat($scope.entrances);
                console.log("去重成功");
                console.log($scope.entrances);
            }).error(function(data, status, headers, config){
                console.log("门禁卡查询失败");
            }) ;
        }


        //选择门禁卡
        $scope.entranceone={};//选择的门禁卡对象
        $scope.choiceEntrance=function(entrance){
            console.log("选择门禁卡");
            $scope.entranceone = entrance;
            console.log($scope.entranceone);
        };

        //更换门禁卡 newCarNum为新卡的卡号

        $scope.changeEntrance=function() {
            console.log("跟换门禁卡信息");
            if ($scope.newCardNum) {
                $scope.err="";
                $http.get(url + '/Entrance/getEntrance/' + $scope.entranceone.cardId).success(function (data) {
                    console.log("门禁卡获取成功");
                    $scope.changeEntranceone = data.Entrance;
                    $scope.changeEntranceone.newCardNum = $scope.newCardNum;
                    /* $scope.changeEntranceone.operateDate=new Date();//操作时间赋值*/
                    console.log($scope.changeEntranceone);
                    console.log($scope.changeEntranceone.newCardNum);
                    $http.put(url + '/Entrance/updateEntranceByIdRest', {Entrance: $scope.changeEntranceone}).success(function (data) {
                        console.log("更换门禁卡成功");
                        $scope.repeatEntrance();
                    }).error(function (data, status, headers, config) {
                        console.log("门禁卡更换失败");
                    });

                }).error(function (data, status, headers, config) {
                    console.log("门禁卡获取失败");
                });
            } else{
                $scope.err="请您输入正确的新卡卡号！";
            }}

        //门禁卡退卡
        $scope.returnEntrance=function(entrance){
            /* console.log($scope.entranceone.cardId);*/
            /*  $scope.entranceone.operateDate=new Date();//操作时间赋值*/
            $http.put(url+'/Entrance/updateEntranceByIdAndReturn/'+entrance.cardId).success(function()
            {
                console.log("更换门禁卡成功");
                $scope.repeatEntrance();
            }).error(function(data, status, headers, config){
                console.log("门禁卡更换失败");
            }) ;
        }


        //门禁卡挂失
        $scope.loseeEntrance=function(entrance){
            /*console.log($scope.entranceone.cardId);*/
            /*  $scope.entranceone.operateDate=new Date();//操作时间赋值*/
            /* console.log($scope.entranceone.cardId);*/

            $http.put(url+'/Entrance/updateEntranceByIdAndLost/'+entrance.cardId).success(function()
            {
                console.log("挂失门禁卡成功");
                $scope.repeatEntrance();
            }).error(function(data, status, headers, config){
                console.log("挂失门禁卡失败");
            }) ;
        }



        //重新获取门禁卡
        $scope.repeatEntrance=function(){
            $http.post(url+'/Entrance/listSearchEntrancedAu',{Search:$scope.search}).success(function(data)
            {
                console.log("搜索门禁卡成功");
                $scope.entrances=data.Entrance;
                console.log("根据条件查到的门禁卡信息");
                $scope.entrances= $scope.notrepeat($scope.entrances);
                console.log($scope.entrances);

            }).error(function(data, status, headers, config){
                console.log("门禁卡查询失败");
            }) ;
        };

        //去重门禁卡
        $scope.notrepeat=function(entrances){
            for ( var i = 0; i < entrances.length; i++) {
                for(var j = entrances.length-1 ; j > i; j--){
                    if (entrances[i].cardId == entrances[j].cardId) {
                        entrances[j]={};
                    }
                }
                console.log(entrances);
            }
            return entrances;
        };

        //取消模态框(新卡数据)
        $scope.clearModel=function(){
            $scope.newCardNum=null;
        };

        //跳转到物业服务的门禁卡增加
        $scope.gotoEntrance=function(){
            $rootScope.user=$scope.entranceone.user;
        };

    }]);
});