/**
 * Created by wuying on 16/1/29.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('informationManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.jiajiaUrl;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.Message={page:{}};
        $scope.Message.range = 1;
        //$scope.user.companyId = '1';
        //获取订阅号信息
        $http.get(url + '/subscribe/getSubscribeId/'+$scope.user.companyId).success(function(data){
            $scope.subscribe = data.Subscribe;
            $scope.Message.receiveUserId=$scope.subscribe.subscribeId;
            $scope.load();
        }).error(function(data){
        });

        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.Message.page = page;
                $http.post(url + '/message/listPageMessage',{Message: $scope.Message}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };




        /**
         * 修改查询
         * @param x
         */
        $scope.changeData = function(x){
            $scope.Message.range = x;
            $scope.load();
        };

        /**
         * 根据消息内容查询
         */
        $scope.query = function(){
            $scope.load();
        };

        /**
         * 选择回复消息
         * @param index
         */
        $scope.selectMessage = function(index){
            for(var i=0;i<$scope.searchPaginator.object.messageList.length;i++) {
                if($scope.searchPaginator.object.messageList[i].messageId == null){
                    continue;
                }
                if(i==index){
                    $scope.searchPaginator.object.messageList[i].show=!$scope.searchPaginator.object.messageList[i].show;
                } else {
                    $scope.searchPaginator.object.messageList[i].show=false;
                }
            }
        };

        /**
         * 发送回复消息
         * @param index
         */
        $scope.receive = function(index){
            if($scope.searchPaginator.object.messageList[index].receiveMsg == '' || $scope.searchPaginator.object.messageList[index].receiveMsg == null){
                layer.alert('回复内容不能为空！',{icon : 0});
                return;
            }
            if($scope.searchPaginator.object.messageList[index].receiveMsg.length>600){
                layer.alert('回复内容不能超过600字！',{icon : 0});
                return;
            }
            $scope.receiveMessage={};
            $scope.receiveMessage.messageId = $scope.searchPaginator.object.messageList[index].messageId;
            $scope.receiveMessage.sendUserId = $scope.subscribe.subscribeId;
            $scope.receiveMessage.receiveUserId = $scope.searchPaginator.object.messageList[index].sendUserId;
            $scope.receiveMessage.createTime = new Date();
            $scope.receiveMessage.content = $scope.searchPaginator.object.messageList[index].receiveMsg;
            $http.post(url+'/message/receiveMessage',{Message:$scope.receiveMessage}).success(function(){
                layer.msg('回复成功！',{icon : 1,time : 1000});
                $scope.searchPaginator.object.messageList[index].reply=1;
                $scope.searchPaginator.object.messageList[index].show=false;
                $scope.searchPaginator.object.messageList[index].receiveMsg='';
            }).error(function(data, status, headers, config){
                layer.msg('回复失败！',{icon : 2,time : 1000});
            });
        };

        /**
         * 查看历史记录
         * @param sendUserId
         */
        $scope.history = function(sendUserId){
            $location.path("/index/systemSettings/publicNumberManagement/informationHistory/"+sendUserId);
        };
    }]);
});