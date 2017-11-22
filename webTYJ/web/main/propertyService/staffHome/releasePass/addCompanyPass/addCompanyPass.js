/**
 * Created by NM on 2018/1/18.
 * 放行条js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('addCompanyPassCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.items=[{}];
        var url=$rootScope.url;
        $scope.company1={};
        $scope.person1={};
        $scope.company={};   //定义公司的对象
        $scope.person={};   //定义申请人的对象
        $scope.release={};   //定义放行条对象
        $scope.release.person={}; //定义放行条业主对象
        $scope.release.personCust={};  //定义放行条申请人的对象



        //【物品动态添加行】
        $scope.tt=[{}];
        $scope.it=[{}];
        $scope.bao=[{}];
        $scope.bubao=[{}];
        $scope.add=function(){
            $scope.tt=$scope.items;
            //$scope.it=$scope.items;
            // $scope.items=$scope.it;
            $scope.items=[];
            $scope.items=$scope.it;
            $scope.bubao=$scope.it;
            $scope.addRow=function() {
                var item = {};
                $scope.items.push(item);
            };
        }
        $scope.adds=function() {
            $scope.it=$scope.items;
            $scope.items=[];
            $scope.items=$scope.tt;
            $scope.bao=$scope.tt;
            $scope.addRow=function() {
                var item = {};
                $scope.items.push(item);
            };
        }
        //【点击添加行按钮下面表格添加一行】
        $scope.addRow=function(){
            var item={};
            $scope.items.push(item);
        }

        //单位搜索模态框的搜索
        $scope.selectCompanyBycustId=function(){
            $http.post(url+'/EnterpriseCustNew/findEnterpriseCustNewRestful',{EnterpriseCustNew:$scope.company1}).success(function(data)
            {
                console.log("搜索成功");
                $scope.company2=data.EnterpriseCustNew;
                console.log($scope.company2);
            }).error(function(){
                console.log("搜索失败");
            });


        };

        //清空查询的数据
        $scope.clearCompany=function(){
            $scope.company1={};
            $scope.company2={};
        };

        //单位搜索的数据填充
        $scope.getCompanyBycustId=function(items2){
            $scope.company=items2;
            console.log($scope.company);
        };

        //人员搜索模态框的搜索
        $scope.selectPersonBycustId=function(){
            console.log($scope.person1.name);
            $http.post(url+'/PersonCustNew/listAllPersonBySearch',{Search:$scope.person1}).success(function(data)
            {
                console.log("搜索成功");
                $scope.person2=data.PersonCustNew;
                console.log($scope.person2);
            }).error(function(){
                console.log("搜索失败");
            });

        };

        //清空查询的数据
        $scope.clearPerson=function(){
            $scope.person1={};
            $scope.person2={};
        };

        //人员搜索的数据填充
        $scope.getPersonBycustId=function(items2){
            $scope.person=items2;
            console.log($scope.person);
        };


        $scope.saveRelease=function(){
            if(
                $scope.company.enterpriseName==null ||
                $scope.company.businessAddress==null||
                $scope.person.name==null ||
                $scope.person.cardNum==null ||
                $scope.person.jiajiaNum==null ||
                $scope.release.applyTime==null ||
                $scope.release.releaseTime ||
                $scope.release.acceptTime ||
                $scope.release.name||
                $scope.release.names||
                $scope.release.cid||
                $scope.release.nums)
            {
                alert("请把信息输入完整！");
                return;
            }
            else {
                console.log($scope.items);
                $scope.release.item = $scope.items;
                $scope.release.enterpriseId = $scope.company.enterpriseId;
                $scope.release.personId = $scope.person.custId;
                $scope.release.custID = $rootScope.user.custId;
                $scope.release.customerType = "2";
                console.log($scope.release);

                $http.post(url + '/ArticleRelease/insertArticleRelease', {ArticleRelease: $scope.release}).success(function () {
                    console.log("添加授权成功");
                }).error(function (data, status, headers, config) {
                    console.log("添加授权失败");
                });
            }
        }

    }]);
});