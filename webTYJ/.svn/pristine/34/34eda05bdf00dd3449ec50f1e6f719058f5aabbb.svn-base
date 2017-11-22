/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('cashiersCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndex = 2;
        $scope.power=[];
        var url = $rootScope.url;
        //获取登录用户的权限
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;
        $scope.postName=[];
        $scope.postName=$scope.user.staff.post;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.shoukuanyuan='';
        $scope.shoukuanzhuzhang='';
        $scope.chuna='';
        $scope.kuaiji=''
        $scope.total=0;
        $scope.doClick = function(index){
           for(var i=0;i<$scope.postName.length;i++){
                if($scope.project.projectId == $scope.postName[i].projectId && $scope.postName[i].nameOfCustom=='收银员'){
                    if($scope.user.cashierStatus=='1'){
                        $scope.shoukuanyuan='收银员';
                        $scope.total++;
                        $scope.power.push(2);
                        $location.path("/index/cashier/cashier/accountFor/accountFors");
                    }
                }
                if($scope.project.projectId == $scope.postName[i].projectId && $scope.postName[i].nameOfCustom=='收银组长'){
                    if($scope.user.cashierLeaderStatus=='1'){
                        $scope.shoukuanzhuzhang='收银组长';
                        $scope.total++;
                        if($scope.power.length==0) {
                            $scope.power.push(3);
                            $location.path("/index/cashier/cashier/accountFor/cashierLeader");
                        }
                    }
                }
                if($scope.project.projectId == $scope.postName[i].projectId && $scope.postName[i].nameOfCustom=='出纳'){
                    if($scope.user.tellerStatus=='1'){
                        $scope.chuna='出纳';
                        $scope.total++;
                        if($scope.power.length==0) {
                            $scope.power.push(4);
                            $location.path("/index/cashier/cashier/accountFor/cashierPay");
                        }
                    }
                }
                if($scope.project.projectId == $scope.postName[i].projectId && $scope.postName[i].nameOfCustom=='会计'){
                    if($scope.user.accountantStatus=='1'){
                        $scope.kuaiji='会计';
                        $scope.total++;
                        if($scope.power.length==0) {
                            $scope.power.push(5);
                            $location.path("/index/cashier/cashier/accountFor/accounting");
                        }
                    }
                }
           }
           $scope.btnIndex = index;
        };
        $scope.doClickForAccount($scope.power[0]);
        $scope.doClickForAccountFor=function(index){
            $scope.doClick(index);
        }
    }]);
});