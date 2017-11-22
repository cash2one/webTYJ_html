/**
 * 页面名称：【建筑组件绑定】组件绑定
 * 撰写人：朱伟
 * 创建时间：2015/07/02.
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('buildingComponentBindingCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;

        /**
         * 查询所有组件列表方法
         */
        $http.get(url + '/BuildingComponent/listBuildingComponentAll').success(function(data) {
            $scope.buildingComponentss = data.BuildingComponent;
        }).error(function(data,status,headers,config){
            layer.alert("查询组件列表出错,请重试！",{icon:2});
        });

        /**
         * 查询所有建筑项目
         */
        var user = {employId : ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;
        $scope.load=function(){
            if($scope.user.userId == '' || angular.isUndefined($scope.user.userId)){
                layer.msg('请先登录！',{icon : 0,time : 1000});
                return;
            }
            $http.get(url + '/Project/listAllProject/' + $scope.user.companyId).success(function(data) {
                $scope.buildingProjects = data.Project;
            }).error(function(data,status,headers,config){
                layer.alert("查询组件列表出错,请重试！",{icon:2});
            });
        };
        $scope.load();

        /**
         * 根据组件名称查询组件相关信息
         * @param componentId
         * 合并样式变更方法，在查询的同时更改样式  王洲  2016.1.8
         */
        $scope.selectBcDetails = function(item){
            $scope.btnIndex=item;
            $scope.buildingComponent = null;
            $scope.componentpropertys = null;
            //$scope.projectId = componentId;
            $http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+item.componentId).success(function(data) {
                $scope.buildingComponent = data.BuildingComponent;
                $http.get(url + '/ComponentProperty/getComponentPropertyByComponentIdRest/'+item.componentId).success(function(data) {
                    $scope.componentpropertys = data.ComponentProperty;
                }).error(function(data,status,headers,config){
                    layer.alert("查询组件资产出错,请重试！",{icon:2});
                });
            }).error(function(data,status,headers,config){
                layer.alert("查询组件列表出错,请重试！",{icon:2});
            });
        }

        /**
         * 根据选择项目获取建筑结构关系
         */
        $scope.selectBuildingStructure = function() {
            var projectId = $("#projects option:selected").val();
            document.getElementById("buildingbindingId").value = "";
            if(projectId == ''){
                return;
            }
            $http.get(url + '/BuildingNew/jsonBuildingNewprojectIdAll/'+projectId).success(function (data) {
                $scope.trees = data.Tree;
                $.fn.zTree.init($("#treeBC"), setting,  $scope.trees);
            }).error(function (data, status, headers, config) {
                layer.alert("项目建筑及结构查询失败！",{icon:2})
            });
        };

        /**
         * 组件绑定方法
         * @type {{}}
         */
        $scope.bindCassetRepository={};
        $scope.projectId = {};
        $scope.buildingBindMethod = function(){
            var myString =  document.getElementById("buildingbindingId").value;
            if($scope.buildingComponent != null && $scope.buildingComponent != "undefined"){
                $scope.bindCassetRepository.buildingComponent =  $scope.buildingComponent;
            }else{
                layer.alert("绑定组件未选择",{icon:0});
                return;
            }
            if(myString == null || myString == ""){
                layer.alert("请选择建筑结构",{icon:0});
                return;
            }
            if($scope.projectId == null || $scope.projectId ==""){
                layer.alert("请重新选择项目",{icon:0});
                return;
            }

            $scope.bindCassetRepository.componentPropertys = $scope.componentpropertys;
            $scope.bindCassetRepository.buildingStructureString = myString;
            $scope.bindCassetRepository.projectId =  $scope.projectId;
            console.log($scope.bindCassetRepository);
            $http.post(url+'/CassetRepository/bindingCassetRepository',{CassetRepository:$scope.bindCassetRepository}).success(function(date){
                layer.alert("绑定资产库成功！",{icon:1});
                $scope.selectBuildingStructure();
            }).error(function(data,status,headers,config){
                layer.alert("绑定资产库失败！",{icon:2})
            })
        };
    }]);
});

/**
 * 获取树的选中节点
 */
function zTreeBuildingBindingCheck(){
    var bbid ="";
    var treeObj=$.fn.zTree.getZTreeObj("treeBC");
    var znode=treeObj.getCheckedNodes(true);
    for(var i=0;i<znode.length;i++){
        if(znode[i].id != undefined){
            bbid = bbid + znode[i].id+",";
        }
    }
    document.getElementById("buildingbindingId").value = bbid;
};