/**
 * Created by NM on 2018/1/18.
 * 租赁管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('leaseContractListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.projects=[];      //项目列表
        $scope.selectProjects=[{id:0,name:'请选择项目'}];      //项目列表
        $scope.selectProjects.id = 0;
        $scope.increaseTypes=[];      //递增类型列表
        $scope.selectIncreaseTypes=[{id:0,name:'请选择递增类型'}];
        $scope.selectIncreaseTypes.id = 0;
        $scope.payTypes=[];       //支付类型列表
        $scope.selectPayTypes=[{id:0,name:'请选择支付类型'}];
        $scope.selectPayTypes.id = 0;
        $scope.leaseContracts=[];       //租赁合同列表
        $scope.param={page:{}};          //查询参数
        $scope.expired=false;     //已失效勾选状态
        $scope.achieved=false;     //执行中勾选状态
        $scope.willFail=false;     //将失效勾选状态
        $scope.statusList=[];     //状态勾选参数集合

        /**
         * 查询项目列表
         */
        var companyId ;
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;
        $scope.checkProjects=function(){
            $http.get(url + '/Project/listAllProject/'+companyId).success(function (data) {
                $scope.projects=data.Project;
                for(var i=0;i< $scope.projects.length;i++){
                    var selectProject={};
                    selectProject.id=$scope.projects[i].projectId;
                    selectProject.name=$scope.projects[i].projectName;
                    $scope.selectProjects.push(selectProject);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('查询项目列表失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 获取项目id
         */
        $scope.getProject=function(projectId){
            $scope.param.projectId=projectId;
            $scope.checkIncreaseTypes();
            $scope.selectPaytypes();
        };

        /**
         * 查询支付类型列表,通过项目id
         */
        $scope.selectPaytypes=function(){
            $scope.selectPayTypes=[{id:0,name:'请选择支付类型'}];
            $scope.selectPayTypes.id = 0;
            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/pay_way/'+$scope.param.projectId).success(function (data) {
                $scope.payTypes=data.DataDictionarySlave;
                for(var i=0;i< $scope.payTypes.length;i++){
                    var selectProject={};
                    selectProject.id=$scope.payTypes[i].slaveId;
                    selectProject.name=$scope.payTypes[i].description;
                    $scope.selectPayTypes.push(selectProject);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('支付类型列表查询失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 获取支付类型属性id
         */
        $scope.getPayTypes=function(payWay){
            $scope.param.payWay=payWay;
        };


        /**
         * 查询递增信息列表或者固定在页面显示
         */
        $scope.checkIncreaseTypes=function(){
            $scope.selectIncreaseTypes=[{id:0,name:'请选择递增类型'}];
            $scope.selectIncreaseTypes.id = 0;
            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/rent_type/'+$scope.param.projectId).success(function (data) {
                $scope.increaseTypes=data.DataDictionarySlave;
                for(var i=0;i< $scope.increaseTypes.length;i++){
                    var selectProject={};
                    selectProject.id=$scope.increaseTypes[i].slaveId;
                    selectProject.name=$scope.increaseTypes[i].description;
                    $scope.selectIncreaseTypes.push(selectProject);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('递增类型列表查询失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 获取递增类型属性id
         */
        $scope.getIncreaseTypes=function(rentType){
            $scope.param.rentType=rentType;
        };

        /**
         * 勾选事件，单选效果
         */
        $scope.clickCheckbox=function(state){
            if(state=='expired'){
                $scope.achieved=false;
                $scope.willFail=false;
                $scope.param.state=3;
            }
            if(state=='achieved'){
                $scope.expired=false;
                $scope.willFail=false;
                $scope.param.state=1;
            }
            if(state=='willFail'){
                $scope.expired=false;
                $scope.achieved=false;
                $scope.param.state=2;
            }
        };


        /**
         * 查询租赁合同列表
         */
        $scope.checkleaseContracts=function(){
            var parent = function (page, callback) {
                $scope.param.page = page;
                //$scope.param.payWay='002';
                $http.post(url+'/LeaseContractService/listPageLeaseContracts',{LeaseContract:$scope.param}).success(callback);
            };
            $scope.leaseContracts = app.get('Paginator').list(parent,10);
        };

        /**
         * 初始化执行方法
         */
        $scope.load=function(){
            $scope.checkleaseContracts();
            $scope.checkProjects();
        };
        $scope.load();

        /**
         * 详情显示
         */
        $scope.showDetail=function(object){
            if(object==undefined){
                layer.msg("请选择有效租赁合同",{icon : 0,time : 2000});
                return ;
            }
            $scope.leaseContract=object;
        };

    }]);
});