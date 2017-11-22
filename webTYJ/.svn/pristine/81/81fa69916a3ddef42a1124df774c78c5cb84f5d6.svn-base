/**
 * Created by wuying on 16/2/18.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('informationHistoryCtrl', ['$scope', '$http','$rootScope','$stateParams','$location', function ($scope,$http,$rootScope,$stateParams,$location) {

        var url = $rootScope.jiajiaUrl;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        $scope.Message={page:{}};
        $scope.Message.sendUserId = $stateParams.sendUserId;
        //$scope.user.companyId = '1';
        //获取订阅号
        $http.get(url + '/subscribe/getSubscribeId/'+$scope.user.companyId).success(function(data){
            $scope.subscribe = data.Subscribe;
            $scope.Message.receiveUserId=$scope.subscribe.subscribeId;
            $scope.load();
        }).error(function(data){
        });

        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.Message.page = page;
                $http.post(url + '/message/selectUserMessage',{Message: $scope.Message}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,20);
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
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.msg('回复失败！',{icon : 2,time : 1000});
            });
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
         * 直接发送消息
         */
        $scope.msg={};
        $scope.sendMsg = function () {
            if($scope.msg.content == '' || $scope.msg.content == null){
                layer.alert('回复内容不能为空！',{icon : 0});
                return;
            }
            if($scope.msg.content.length>600){
                layer.alert('回复内容不能超过600字！',{icon : 0});
                return;
            }
            $scope.msg.sendUserId = $scope.subscribe.subscribeId;
            $scope.msg.receiveUserId = $stateParams.sendUserId;
            $scope.msg.createTime = new Date();
            $http.post(url+'/message/receiveMessage',{Message:$scope.msg}).success(function(){
                layer.msg('回复成功！',{icon : 1,time : 1000});
                $scope.msg.content='';
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.msg('回复失败！',{icon : 2,time : 1000});
            });
        }
    }]);
});