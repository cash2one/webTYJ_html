/**
 * Created by SZ on 2018/1/18.
 * 区域组管理js
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('teamManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.videoUrl;
        var urlbase =$rootScope.url; //"http://127.0.0.1:8080/webTYJ/cxfws/rest";    //
        $scope.gating = {};
        var projectId = "";
        var companyId = "";
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;
        var treeId = "";
        var setting = {
            check:{
                enable:true,
                chkStyle: "checkbox",
                chkboxType: { "Y" : "s", "N" : "ps" }
                //,
                //radioType:"all"
            },
            treeNode:{
                nocheck:false

            },
            edit: {
                enable: false,
                editNameSelectAll: false
            },
            view: {
                selectedMulti: false,
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onCheck:zTreeCheck,
                onClick: onClick
            },
            async: {
                enable: true
            }
        };
        $scope.Area = {
            nodeName:'',//节点名称
            detailsName:''//详情名称

        }
        //$scope.go = function (data){
        //    var index = ids.indexOf(data);
        //    if(index >-1){
        //        ids.splice(index,1);
        //    }else{
        //        ids.push(data);
        //    }
        // }


        //获取项目信息
        $scope.projectIdList = [];
        $http.get(urlbase + '/Company/getCompanyInformation/' + companyId).success(function(data){
            for(var i=0; i<data.Company.projectList.length; i++){
                if(data.Company.projectList[i].projectId!=null && data.Company.projectList[i].projectId != undefined){
                    $scope.projectIdList.push(data.Company.projectList[i]);
                }

            }
        }).error(function(data){
            layer.msg('没有有效的公司信息！',{icon : 0,time : 1000});
        });

        //获取全部组列表
        $scope.teamList = [];
        $scope.getTeamList = function(){
            $http.get(url + "/areaService/getTeamByCompanyId/" + companyId).success(function(data){
                if(data.state == "success"){
                    $scope.temp = data.info;
                    if(!angular.isArray($scope.temp)){
                        $scope.teamList.push($scope.temp);
                    }else{
                        $scope.teamList = $scope.temp;
                    }
                    if($scope.team.name != null && $scope.team.name != ''){
                        var temp = [];
                        for(var i=0; i<$scope.teamList.length; i++){
                            if($scope.teamList[i].nodeName.indexOf($scope.team.name)>=0){
                                temp.push($scope.teamList[i]);
                            }
                        }
                        $scope.teamList = temp;
                    }
                    if($scope.team.projectId != null && $scope.team.projectId != ''){
                        var temp = [];
                        for(var i=0; i<$scope.teamList.length; i++){
                            if($scope.teamList[i].projectId == $scope.team.projectId){
                                temp.push($scope.teamList[i]);
                            }
                        }
                        $scope.teamList = temp;
                    }
                    $scope.pages=[];
                    $scope.loadPages($scope.teamList);
                }else if(data.state == "failure"){
                    $scope.loadPages([]);
                    layer.msg("查询项目信息失败",{icon : 2,time : 1000});
                }
            });
        };


        ///**
        // * 查询所有的公司信息
        // */
        //$scope.company = {};
        //if(angular.isDefined($scope.user.companyId)){
        //    if($scope.user.companyId != ''){
        //        $http.get(urlbase + '/Company/getCompanyInformation/' + $scope.user.companyId).success(function(data){
        //            $scope.company = $scope.user.Company;
        //            $scope.company.projectArea = data.Company.projectArea;
        //            $scope.company.projectList = data.Company.projectList;
        //            $scope.company.projectNum = data.Company.projectNum;
        //            $scope.company.staffNum = data.Company.staffNum;
        //        }).error(function(data){
        //            layer.msg('没有有效的公司信息！',{icon : 0,time : 1000});
        //        });
        //    }
        //}

        $scope.addteam = function(){
            $scope.team.name='';
            $scope.team.info='';
            treeId = "";
            $http.get(urlbase + "/BuildingStructureNew/listBuildingByProjectId/"+ $scope.projectId).success(function (data) {
                $scope.zNodes=[];                    //获取json数据
                $scope.buildingStructureNews = data.BuildingStructureNew;

                var tasks = $scope.buildingStructureNews;
                if (tasks != null) {
                    for (var i = 0; i < tasks.length; i++) {
                        if(tasks[i].parentId == '' || tasks[i].parentId == null){//如果是一级节点设置为不可选
                        //if(tasks[i].parentId == $scope.projectId){//如果是一级节点设置为不可选
                            $scope.zNode = {
                                id: tasks[i].id,
                                pId: tasks[i].parentId,
                                name: tasks[i].nodeName,
                                fullName: tasks[i].fullName,
                                nocheck: true
                            };
                        } else {//其余节点设置可选
                            $scope.zNode = {
                                id: tasks[i].id,
                                pId: tasks[i].parentId,
                                name: tasks[i].nodeName,
                                fullName: tasks[i].fullName
                            };
                        }

                        $scope.zNodes.push($scope.zNode);
                    }
                    $.fn.zTree.init($("#buildingtreeforTeam"), setting, $scope.zNodes);
                    //var zTree = $.fn.zTree.getZTreeObj("buildingtreeforTeam");
                    //var nodes = zTree.getNodes();
                    //nodes[0].name = "建筑信息";
                    //zTree.updateNode(nodes[0]);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('建筑信息查询失败！',{icon : 2,time : 1000});
            });

        };


        $scope.team = {
            name : '',
            info : '',
            projectId :''
        };

        $scope.new = {
            name : '',
            info : ''
        };
        //保存
        $scope.save = function(){
            var name = $scope.new.name;
            var info = $scope.new.info;

            var infoId =  treeId;

            if(name == null || name == ""){
                layer.alert('请输入组名！',{icon : 0});
                return ;
            }
            //else if(info == null || info == ""){
            //    layer.alert('请输入组详情！',{icon : 0});
            //    return ;
            //}
            else if(infoId == null || infoId == ""){
                layer.alert('请选择小区建筑！',{icon : 0});
                return ;
            }
            else{
                $scope.Area ={
                    nodeName: name,
                    detailsName : info,
                    projectId: $scope.projectId,
                    detailsId : infoId
                };

                $http.post(url + "/areaService/saveTeam/", {Area:$scope.Area}).success(function(){
                    layer.msg('保存成功！',{icon : 1,time : 1000});
                    //$("#new").hide();
                    $("#new").modal("hide");
                    $scope.getTeamList();
                    $scope.new.name='';
                    $scope.new.info='';
                    $scope.projectId='';
                    treeId='';
                    $.fn.zTree.init($("#buildingtreeforTeam"), setting, '');
                }).error(function(data,status,headers,config){
                    layer.msg('保存失败！',{icon : 2,time : 1000});
                });
            }
        }

        $scope.getTeamList();


        $scope.deleteTeam = function(){
            if($scope.chooseData.datas.length == 0){
                layer.alert("请选择要删除的组", {icon: 0});
            }else{
                layer.confirm("您确定要删除选定的组吗?", {btn: ['是', '否']}, function () {
                    var ids;
                    for(var i=0; i<$scope.chooseData.datas.length; i++){
                        if(i==0){
                            ids=$scope.chooseData.datas[i].id;
                        } else {
                            ids+=","+$scope.chooseData.datas[i].id;
                        }
                    }
                    $http.get(url + "/areaService/DeleteTeam/"+ids).success(function(data){
                        if(data.state == "success"){
                            $scope.chooseData.datas=[];
                            $scope.getTeamList();
                            layer.msg("删除成功", {icon: 1, time: 2000});
                        } else if(data.state == "failure") {
                            layer.msg(data.info, {icon: 2, time: 2000});
                        }
                    }).error(function (data, status, headers, config) {
                        layer.msg("删除失败", {icon: 3, time: 2000});
                    });
                })
            }

        };

        //根据搜索条件获取组列表
        $scope.searchTeam = function(){
            var key = $scope.team.name;
            if(key== "" || key==null){
                key = -1;
            }
            $http.get(url + "/areaService/getAllTeamlistByKey/"+key).success(function(data){
                if(data.state == "success"){
                    $scope.temp = data.info;
                    if(!angular.isArray($scope.temp)){
                        $scope.teamList.push($scope.temp);
                    }else{
                        $scope.teamList = $scope.temp;

                    }
                    $scope.loadPages($scope.teamList);
                }else if(data.state == "failure"){
                    layer.alert(data.info,{icon:2});
                }
            });
        };

        //查看完整数据
        $scope.getInfo = function(info){
            $http.get(urlbase + "/BuildingStructureNew/getBuildingByIds/"+info).success(function(data){
                var fullNames;
                for(var i=0; i<data.BuildingStructureNew.length; i++){
                    if(i==0){
                        fullNames = data.BuildingStructureNew[i].fullName;
                    } else {
                        fullNames += ",<br/>" + data.BuildingStructureNew[i].fullName;
                    }
                }
                layer.alert("所属组为：<br/>"+fullNames);
            }).error(function(data){

            });
        };

        function zTreeCheck(){
            var treeObj=$.fn.zTree.getZTreeObj("buildingtreeforTeam");
            var znode=treeObj.getCheckedNodes(true);

            //if (znode.length > 0) {
            //    var node = znode[0].getParentNode();
            //    if (node == null) {
            //        layer.alert("请选择专业分类",{icon:0})
            //        return;
            //    }else{
            var funllName;
                    for(var i=0;i<znode.length;i++){
                        if(znode[i].id != undefined){
                            //var majarName = node.name;
                            //var classifyName = znode[i].name;
                            //var propertyTypeId =znode[i].id; //获取选中节点的值
                            if(i==0){
                                treeId = znode[i].id;
                                funllName = znode[i].fullName;
                            } else {
                                treeId += ","+znode[i].id;
                                funllName += "," + znode[i].fullName;
                            }
                            console.log(treeId);
                        }
                    }
            $scope.new.info = funllName;
            //    }
            //}
            //if(majarName != undefined && classifyName != undefined && propertyTypeId != undefined){
            //    //document.getElementById("majorName").value = majarName;
            //    //document.getElementById("classifyName").value = classifyName;
            //    //document.getElementById("majorId").value = propertyTypeId;
            //    treeId += propertyTypeId;
            //}
        }


        //得到选中的复选框的值
        $scope.chooseData = {datas: []};
        $scope.getData = function (data) {
            setTimeout(function(){
                var id = data.id;
                var temp = document.getElementById(id);
                $scope.dataa = {};
                $scope.dataa = data;
                if (temp.checked == true) {
                    $scope.chooseData.datas.push($scope.dataa);
                } else {
                    $scope.temp = [];
                    $scope.temp = $scope.chooseData.datas;
                    $scope.chooseData = {datas: []};
                    for (var i = 0; i < $scope.temp.length; i++) {
                        if ($scope.temp[i].id != id) {
                            $scope.chooseData.datas.push($scope.temp[i]);
                        }
                    }
                }
                console.dir($scope.chooseData.datas);
            },"10");
        };

        /****************************   分页start   ******************************/

        $scope.currentPage = 1;             //分页相关参数
        $scope.totalPage = 1;
        $scope.pageSize = 6;
        $scope.pages = [];
        $scope.endPage = 1;

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
        $scope.currentHouse = [];
        $scope.loadPages = function (array) {
            //for(var i=0;i<$scope.checked.length;i++){
            //    $scope.checked[i]=false;
            //}
            $scope.currentHouse = $scope.listPages($scope.currentPage,$scope.pageSize,array);
            $scope.totalPage = Math.ceil(array.length / $scope.pageSize);
            $scope.endPage = $scope.totalPage;
            //生成数字链接
            //if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
            //    $scope.pages = [
            //        $scope.currentPage - 1,
            //        $scope.currentPage,
            //        $scope.currentPage + 1
            //    ];
            //} else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
            //    $scope.pages = [
            //        $scope.currentPage,
            //        $scope.currentPage + 1
            //    ];
            //} else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
            //    $scope.pages = [
            //        $scope.currentPage - 1,
            //        $scope.currentPage
            //    ];
            //}else if($scope.currentPage == 1 && $scope.totalPage == 1){
            //    $scope.pages = [
            //        $scope.currentPage
            //    ];
            //}
            if($scope.totalPage<=5){
                for(var i=1; i<=$scope.totalPage; i++){
                    $scope.pages.push(i);
                }
            } else {
                $scope.pages = [
                    $scope.currentPage-1,
                    $scope.currentPage,
                    $scope.currentPage+1,
                    $scope.currentPage+2,
                    $scope.currentPage+3
                ];
                if($scope.pages[0]<1){
                    $scope.pages = [
                        1,2,3,4,5
                    ];
                }
                if($scope.pages[$scope.pages.length-1] > $scope.totalPage){
                    $scope.pages = [
                        $scope.totalPage-4,
                        $scope.totalPage-3,
                        $scope.totalPage-2,
                        $scope.totalPage-1,
                        $scope.totalPage
                    ];
                }
            }
        };

        /**
         *查询下一页
         */
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }
            $scope.loadPages($scope.teamList);
        };

        /**
         *  查询前一页
         */
        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
            }
            $scope.loadPages($scope.teamList);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.loadPages($scope.teamList);
        };

        /****************************   分页end   ******************************/

    }]);
});
