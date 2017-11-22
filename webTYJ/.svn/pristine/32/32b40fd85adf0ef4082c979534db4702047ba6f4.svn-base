/**
 * Created by NM on 2018/1/18.
 * 亲属关系绑定js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('relationshipChainHistoryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.PersonBuildingNew={page:{}};
        $scope.custId=$rootScope.user.custId;//得到登录人的id
        $scope.enterpriseCustNew={};
        $scope.currentPage = 1;             //分页相关参数
        $scope.totalPage = 1;
        $scope.pageSize=10;
        $scope.pages = [];
        $scope.endPage = 1;
        $scope.x=false;             //用于绑定checkbox
        $scope.choiceRelations=[];  //checkbox选择的关系对象集合
        $scope.choiceRelationIds=[]; //checkbox选择的关系对象主键集合
        $scope.showYonggong=false;
        $scope.showGuanxi=true;

        /**
         * 加载执行开始方法
         */
        $scope.checkallEnterprise=function(){
            //var custId= $scope.custId;
            //执行判断登录人是否为企业法人
            $scope.showYonggong=true;
            $scope.showGuanxi=false;
            $scope.showHistory=[];
            //$scope.enterpriseCustNew.representative=$rootScope.user.name;
            $scope.enterpriseCustNew.representative=$rootScope.custId;
            $http.post(url+'/EnterpriseCustNew/findEnterpriseCustNewRestful',{EnterpriseCustNew:$scope.enterpriseCustNew}).success(function(data)
            {
                if(data.EnterpriseCustNew.length>0){
                    $scope.checkEnterPrices(data);
                    //执行查询登录人的企业公司相关联房屋与员工的关系信息
                }else{
                    layer.msg('不是企业法人',{icon : 2});
                    return;
                }
            }).error(function(data, status, headers, config){
                layer.msg('添加关系链失败',{icon : 2});
            }) ;
        };

        /**
         * 根据客户id查询个人员工关系
         */
        $scope.checkYuangong=function(custId){
            $http.get(url + '/PersonBuildingNew/getRelationBycustId/'+custId).success(function (data) {
            }).error(function (data, status, headers, config) {
                layer.msg('获取企业关系失败',{icon : 2});
            });
        };

        /**
         * 执行查询登录人的企业公司相关联房屋与员工的关系信息
         */
        $scope.checkEnterPrices=function(data){
            var personBuildingNew={};
            personBuildingNew.enterpriseIds=[];
            // personBuildingNew.custId=$rootScope.user.custId;
            for(var i=0;i<data.EnterpriseCustNew.length;i++){
                personBuildingNew.enterpriseIds.push(data.EnterpriseCustNew[i].enterpriseId);
            }
            $http.post(url + '/PersonBuildingNew/getRelationOfemplers',{PersonBuildingNew:personBuildingNew}).success(function (data) {
                $scope.personBuilldings=data.PersonBuildingNew;
                $scope.personBuilldings=$scope.clearRepeat($scope.personBuilldings);
                $scope.loadPages($scope.personBuilldings);
            }).error(function (data, status, headers, config) {
                layer.msg('获取企业与员工关系失败',{icon : 2});
            });
        };

        /**
         * 根据custId查询个人关系链
         */
        $scope.checkRelations=function(){
            $scope.showYonggong=false;
            $scope.showGuanxi=true;
            $http.get(url + '/PersonBuildingNew/getRelationOfemplersByCustId/'+$scope.custId).success(function (data) {
                $scope.personBuilldings=data.PersonBuildingNew;
                $scope.personBuilldings=$scope.clearRepeat($scope.personBuilldings);
                $scope.loadPages($scope.personBuilldings);
            }).error(function (data, status, headers, config) {
                layer.msg('获取个人关系失败',{icon : 2});
            });
        };

        /**
         * 去重复数据
         */
        $scope.clearRepeat=function(array){
            var hash = {},
                len = array.length,
                result = [];

            for (var i = 0; i < len; i++){
                if (!hash[array[i].personBuildingId]){
                    hash[array[i].personBuildingId] = true;
                    result.push(array[i]);
                }
            }
            return result;
        };

        /**
         * 实现分页
         */
        $scope.listPages=function(currentPage,pageSize,array){
            var dataArray=[];
            if(currentPage*pageSize>array.length){
                for(var i=(currentPage-1)*pageSize;i<array.length;i++) {
                    dataArray.push(array[i]);
                }
            }else{
                for(var i=(currentPage-1)*pageSize;i<currentPage*pageSize;i++){
                    dataArray.push(array[i]);
                }
            }
            return dataArray;
        };

        /**
         * 实现分页及参数改变
         */
        $scope.loadPages = function (array) {
            var array=array;
            $scope.showHistory= $scope.listPages($scope.currentPage,$scope.pageSize,array);
            $scope.totalPage = Math.ceil(array.length / $scope.pageSize);
            $scope.endPage = $scope.totalPage;
            //生成数字链接
            $scope.pages=[];
            if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage
                ];
            }else if($scope.currentPage == 1 && $scope.totalPage == 1){
                $scope.pages = [
                    $scope.currentPage
                ];
            }

            //if ($scope.currentPage >= 1 && $scope.currentPage <= $scope.totalPage) {
            //    for(var i=1;i<=$scope.totalPage;i++){
            //        $scope.pages.push(i);
            //    }
            //}
        };

        /**
         *查询下一页
         */
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }
            $scope.loadPages($scope.personBuilldings);
        };

        /**
         *  查询前一页
         */
        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
            }
            $scope.loadPages($scope.personBuilldings);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.loadPages($scope.personBuilldings);
        };

        /**修改bug1787
         * 修改点击效果为整行点击有效
         *徐文广  2016/5/24
         */
        $scope.choiceRelation=function(Relation){
            if(document.getElementById(Relation.personBuildingId).checked==true){
                document.getElementById(Relation.personBuildingId).checked = false;
                document.getElementById(Relation.personBuildingId).parentNode.parentNode.style.background = '';
                if($scope.choiceRelations.length>0){
                    for(var i=0;i<$scope.choiceRelations.length;i++){
                        if(Relation.personBuildingId==$scope.choiceRelations[i].personBuildingId){
                            $scope.choiceRelations.splice(i,1) ;
                        }
                    }
                }
            }else{
                document.getElementById(Relation.personBuildingId).checked = true;
                document.getElementById(Relation.personBuildingId).parentNode.parentNode.style.background = '#f6f8fa';
                $scope.choiceRelations.push(Relation);
            }
            $scope.choiceRelationIds=[];
            if($scope.choiceRelations.length>0){
                for(var i=0;i<$scope.choiceRelations.length;i++){
                    $scope.choiceRelationIds.push($scope.choiceRelations[i].personBuildingId);
                }
            }
        };

        /**
         * 删除关系链
         */
        $scope.deleteRelation=function(){
            // 1791 当没有选择数据，点击删除时，弹框提醒要选择数据
            if($scope.choiceRelations.length==0) {
                layer.msg('请选择至少一条关系',{icon : 0});
                return;
            }
                layer.confirm("您确定要删除选中的关系？",
                {btn : ['是','否']},function(){
                        //执行删除操作
                        for(var i=0;i<$scope.choiceRelations.length;i++){
                            $scope.choiceRelations[i].state=1;
                        }
                        var params={};
                        params.personBuildingNews=$scope.choiceRelations;
                        $http.put(url+'/PersonBuildingNew/deletePersonBuildingById',{PersonBuildingNew:params}).success(function (data) {
                            layer.msg('删除关系成功',{icon : 1, time : 2000});

                            if($scope.showYonggong==true){
                                $scope.checkallEnterprise();//重新查询历史记录
                            }
                            if($scope.showGuanxi==true){
                                $scope.checkRelations()//重新查询历史记录
                            }
                            //1798 删除一个关系成功以后，不勾选，继续点击删除，提示至少要选择一条
                            $scope.choiceRelations=[];
                        }).error(function (data, status, headers, config) {
                            layer.msg('删除关系失败',{icon : 2});
                        });
                }
            );


        };


        /**
         * 编辑关系
         */
        $scope.editRelation=function(){
            //1788 当没有选择数据进行编辑时，提示信息不准确，及多选时提示每次只能编辑一条信息
            if($scope.choiceRelations.length==0) {
                layer.msg('请选择一条信息', {icon: 0});
                return;
            }
            if($scope.choiceRelations.length>1){
                layer.msg('每次只能编辑一条信息',{icon:0});
                return;
            }

                //执行编辑操作
                var param={};
                param.personBuilding=$scope.choiceRelations[0];   //需要修改的关系对象
                if($scope.choiceRelations[0].custType=='员工'){
                    param.edit='企业';
                    layer.msg('企业关系无法被修改',{icon : 2});
                }else{
                    param.edit='个人';
                    sessionStorage.setItem('editPersonBuilding',JSON.stringify(param));
                    $location.path("/index/propertyService/staffHome/relationshipChain/relationshipChainAdd");
                }
        };

        /**
         * 点击新建跳转
         */
        $scope.creat = function()
        {
            $scope.doCheck(1);
        };

        $scope.load=function(){
            $scope.checkRelations();
        };

        /**
         * 开始执行
         */
        $scope.load();

    }]);
});