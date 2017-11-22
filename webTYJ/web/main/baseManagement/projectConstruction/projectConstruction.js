/**
 * Created by wangzhou on 2016/1/25.
 */

'use strict';

define(function (require) {
    var app = require('../../../app');
    app.controller('projectConstructionCtrl', ['$scope','$http','$location','$rootScope','$anchorScroll','$timeout',
        function ($scope,$http,$location,$rootScope,$anchorScroll,$timeout) {

            $scope.doClick(3);//增加tab高亮显示  王洲  2016.2.2
            var projectid = '';//
            var projectids = JSON.parse(localStorage.getItem("project_id"));
            //searchHouseNewByBuildingStructureId
            var buildingStructureIdTmp="";
            $scope.projectIds = projectids?projectids:projectid;

            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.showMain = true;
            $scope.showTitle = false;
            /*列表页面*/
            var url= $rootScope.url;           //访问路径
            $scope.fileUrl = $rootScope.fileUrl;   //文件路径
            $scope.allProjects=[];              //所有项目信息
            $scope.currentProject={};           //当前所选项目
            $scope.buildingMap={};             //建筑对象映射
            $scope.buildingList=[];             //建筑对象列表(包含树形结构)
            $scope.currentBuilding={            //当前操作的建筑对象
                id:'',                          //建筑ID
                buildingName:'',                //建筑名称
                totalArea:0,                    //总建筑面积
                totalAreas:0,                       //用地总面积
                areaNew:[],                       //面积属性详情列表
                nodes:[],                        //子建筑
                parcelId:''                     //宗地id  王洲  2016.2.2
            };
            /*第一步编辑建筑面积*/
            $scope.editArea=false;             //控制面积属性编辑框的显示
            $scope.areaTypes=[];                //面积属性列表
            $scope.currentEditArea={};          //当前编辑(选择)面积
            $scope.currentEditIndex=null;      //当前编辑框(初始为空)
            $scope.areaTypeMap={};              //存放当前建筑已经设置的面积属性
            /*第二步编辑建筑结构*/
            $scope.currentBuildingNode={};      //当前建筑节点
            $scope.unsaveBuildingList=[];       //未提交建筑映射
            /*第三步编辑住宅信息*/
            $scope.buildingDetailList=[];       //建筑详情集合
            $scope.buildingDetailMap={};        //建筑详情映射对象
            $scope.buildingDetailNew={};        //新建筑详情对象
            $scope.exceltype = "";              //excel导入时判断excel对应对象
            $scope.showUp = '';                 //判断是否显示上一步  王洲   2016.1.7
            $scope.areaTypeToSelect = [];       //用于创建建筑结构时存放选择的面积类型  王洲  2016.1.12
            //$scope.parentId = '1';

            /**---------------------------------------项目建筑列表--------------------------------------------------**/

            /**
             * 新增点击切换事件
             */
            $scope.jump1 = function(num)
            {
                //switch(num)
                //{
                //    case 1:
                //        $scope.show1 = true;
                //        $scope.show2 = false;
                //        $scope.show3 = false;
                //        $scope.show4 = false;
                //        $scope.show5 = false;
                //        $scope.showMain = false;
                //        $scope.showTitle = true;
                //        break;
                //    case 2:
                //        $scope.show1 = false;
                //        $scope.show2 = true;
                //        $scope.show3 = false;
                //        $scope.show4 = false;
                //        $scope.show5 = false;
                //        $scope.showMain = false;
                //        $scope.showTitle = true;
                //        break;
                //    case 3:
                //        $scope.show1 = false;
                //        $scope.show2 = false;
                //        $scope.show3 = true;
                //        $scope.show4 = false;
                //        $scope.show5 = false;
                //        $scope.showMain = false;
                //        $scope.showTitle = true;
                //        break;
                //    case 4:
                //        $scope.show1 = false;
                //        $scope.show2 = false;
                //        $scope.show3 = false;
                //        $scope.show4 = true;
                //        $scope.show5 = false;
                //        $scope.showMain = false;
                //        $scope.showTitle = true;
                //        break;
                //    case 5:
                //        $scope.show1 = false;
                //        $scope.show2 = false;
                //        $scope.show3 = false;
                //        $scope.show4 = false;
                //        $scope.show5 = true;
                //        $scope.showMain = false;
                //        $scope.showTitle = true;
                //        break;
                //}
            };

            /**
             * 初始化方法
             */
            var init=function(){
                //加载项目信息
                //$scope.loadProject();
                //监测项目下拉框的变化
               // $scope.$watch('currentProject',function(){
                    $scope.loadBuilding();
                //});
            };
            /**
             * 加载下拉框中的项目信息  allProjects
             */
            /*$scope.loadProject=function(){
                //从后台接口获取项目id
                $scope.projectId = JSON.parse(localStornewCurrentBuildingage.getItem("project_id"));    //获取项目id

                *//**
                 * 根据项目id获取项目信息
                 *//*
                $http.get(url + '/Project/getProjectbyId/' + $scope.projectId).success(function(data) {
                    console.log(data);
                    $scope.currentObject = data.Project;
                }).error(function(data, status, headers, config){
                    layer.alert('查询失败',{icon:2});
                });
            };*/
            /**
             * 根据选中项目加载建筑信息
             */
            var idMap=[];           //id和对象的映射

            $scope.loadBuilding=function(){
                if($scope.projectIds==null||$scope.projectIds==""){
                    return;
                }
                if($scope.projectIds!=null&&$scope.projectIds!=""){

                    //根据项目id获取宗地信息  王洲  2016.2.2
                    $scope.Parcel = [];
                    $http.get(url + '/Parcel/getParcelByprojectId/' + $scope.projectIds).success(function(data){
                        $scope.Parcel = data.Parcel;
                    }).error(function(data){
                        layer.msg('无有效宗地信息！',{icon : 0,time : 1000});
                    });

                    $http.get(url+'/BuildingStructureNew/listAllBuildingStructureTreeNew1Rest/'+$scope.projectIds+'/'+$scope.projectIds).success(function(data){
                        var nodes=data.BuildingStructureNew;
                        var nodeList=nodes;

                        var tempList=[];
                        //以ID为key，对象为值定义IdMap
                        for(var i=0;i<nodeList.length;i++){
                            idMap[nodeList[i].id]=nodeList[i];
                            idMap[nodeList[i].id].collapse=false;
                            tempList.push(nodeList[i]);
                        }
                        //for(i=0;i<nodeList.length;i++){
                        //    //if(nodeList[i].parentId!=null){
                        //    //    var parent=nodeList[i].parentId;
                        //    //    //alert(1);
                        //    //}else{
                        //    //    var parent=null;
                        //    //}
                        //    //
                        //    //if(parent!=null && parent!=$scope.projectIds){
                        //    //    if(!idMap[parent].nodes){
                        //    //        idMap[parent].nodes=[];
                        //    //        idMap[id].collapse=false;
                        //    //
                        //    //    }
                        //    //    idMap[parent].nodes.push(nodeList[i]);
                        //    //}
                        //    //else{
                        //        tempList.push(nodeList[i]);
                        //
                        //    //}
                        //}
                        $scope.buildingMap=idMap;
                        $scope.buildingList=tempList;
                    });
                    $scope.buildingToTree = {id : '',name : '',buildingId : '',parcelId : '',buildingStructureId:''};//修改对象，改变查询的条件 王洲  2016.1.21//增加宗地id  王洲  2016.2.2
                    $scope.building='';
                    $scope.buildingprice = '';
                    $scope.areaNews=[];
                    $scope.showUp = '';
                }
            };




            /**
             * 根据所选建筑显示右侧详情
             * @param id     建筑ID
             */
                /*
            var areaNews=new Array();                   //建筑面积属性
            $scope.building={};                         //建筑信息
            $scope.buildingToTree = {id : '',name : ''};
            $scope.showBuildingInfo=function(item){
                console.log(item);
                //var id = item.buildingId;
                //console.log(item.buildingId);
                if($scope.buildingToTree.name == item.nodeName){
                    $scope.buildingToTree = {id : '',name : '',buildingId : '',parcelId : ''};
                    $scope.showUp = '';
                }else{
                    $scope.buildingToTree.id = item.id;
                    $scope.buildingToTree.name = item.nodeName;
                    $scope.buildingToTree.buildingId = item.buildingId;
                    $scope.buildingToTree.parcelId = item.parcelId;
                    $scope.showUp = $scope.buildingToTree.id;
                }
                console.log(item.buildingId);
                console.log(item.id);
                $http.get(url+'/BuildingNew/getBuildingbyId/'+ item.buildingId).success(function(data){
                    $scope.building=data.BuildingNew;
                    //console.log(data.BuildingNew.buildingArea);
                    areaNews=[];
                    $scope.buildingprice = '';

                    if(angular.isUndefined(data.BuildingNew)){
                        return;
                    }

                    console.log($scope.building);
                    if(angular.isArray(data.BuildingNew.buildingStructureNews)==false){
                        areaNews.push(eval(data.BuildingNew.buildingStructureNews));
                        $scope.buildingprice = data.BuildingNew.buildingArea;
                    }else{
                        areaNews=$scope.building.buildingStructureNews;

                        var areas = 0;
                        for(var i=0;i<areaNews.length;i++){
                            var area = parseInt(areaNews[i].buildingArea==null||typeof(areaNews[i].buildingArea) == "undefined"?0:areaNews[i].buildingArea);
                            areas += area;
                        }
                        $scope.buildingprice=areas;
                    }
                    $scope.areaNews=areaNews;
                    //在现有建筑下新建建筑时，将建筑的面积类型去重放入面积类型选择数组  王洲  2016.1.12
                    $scope.areaTypeToSelect = [];

                    //console.log($scope.BuildingNew);
                    //console.log($scope.areaNews);

                    for(var i = 0,len = $scope.areaNews.length; i < len; i++){
                        var t = 0;
                        for(var j = 0,lens = $scope.areaTypeToSelect.length; j < lens; j++){
                            if($scope.areaNews[i].areaTypeId == $scope.areaTypeToSelect[j].buildingId){
                                t ++;
                                break;
                            }
                        }
                        if(t == 0){

                            $scope.areaTypeToSelect.push($scope.areaNews[i].buildingType);
                        }
                    }
                });
            };
*/
            var areaNews=new Array();                   //建筑面积属性
            $scope.building={};                         //建筑信息
            $scope.buildingToTree = {id : '',name : ''};
            $scope.showBuildingInfo=function(item){
                console.log(item);
                //var id = item.buildingId;
                $scope.buildingToTree.buildingStructureId=undefined;
                if($scope.buildingToTree.name == item.nodeName){
                    $scope.buildingToTree = {id : '',name : '',buildingId : '',parcelId : '',buildingStructureId:''};
                    $scope.showUp = '';
                }else{
                    $scope.buildingToTree.id = item.id;
                    $scope.buildingToTree.name = item.nodeName;
                    $scope.buildingToTree.buildingId = item.buildingId;
                    $scope.buildingToTree.parcelId = item.parcelId;
                    $scope.showUp = $scope.buildingToTree.id;
                    $scope.buildingToTree.buildingStructureId=item.buildingStructureId;
                }
                $http.get(url+'/BuildingNew/getBuildingbyId/'+ item.buildingId).success(function(data){
                    $scope.building=data.BuildingNew;
                    areaNews=[];
                    $scope.buildingprice = '';

                    if(angular.isUndefined(data.BuildingNew)){
                        return;
                    }

                    if(angular.isUndefined(data.BuildingNew.areaNew)){
                        console.log('未查询到相关区域信息。');
                        $scope.areaNews=areaNews;
                        return;
                    }
                    if(angular.isArray(data.BuildingNew.buildingStructureNews)==false) {

                    }else{
                        for(var i=0;i<data.BuildingNew.buildingStructureNews.length;i++){
                            if(item.nodeName == data.BuildingNew.buildingStructureNews[i].nodeName){
                                $scope.buildingToTree.buildingStructureId = data.BuildingNew.buildingStructureNews[i].id;
                                break;
                            }
                        }
                    }

                    if(angular.isArray(data.BuildingNew.areaNew)==false){

                        areaNews.push(eval(data.BuildingNew.areaNew));
                        $scope.buildingprice = data.BuildingNew.areaNew.buildingArea;
                    }else{
                        areaNews=$scope.building.areaNew;

                        var areas = 0;
                        for(var i=0;i<areaNews.length;i++){
                            var area = parseInt(areaNews[i].buildingArea);
                            areas += area;
                        }
                        $scope.buildingprice=areas;
                    }
                    $scope.areaNews=areaNews;
                    //在现有建筑下新建建筑时，将建筑的面积类型去重放入面积类型选择数组  王洲  2016.1.12
                    $scope.areaTypeToSelect = [];
                    for(var i = 0,len = $scope.areaNews.length; i < len; i++){
                        var t = 0;
                        for(var j = 0,lens = $scope.areaTypeToSelect.length; j < lens; j++){
                            if($scope.areaNews[i].areaTypeId == $scope.areaTypeToSelect[j].id){
                                t ++;
                            }
                        }
                        if(t == 0){
                            $scope.areaTypeToSelect.push($scope.areaNews[i].areaTypeNew);
                        }
                    }
                });
            };

            /***
             * 根据左边树结构所选内容显示右侧详情
             * @param id
             */
            //var areaBuilding = new Array(); //建筑面积属性
            //$scope.buildingStructure={};              //建筑信息
            $scope.buildingToTree = {id : '',name : ''};
            $scope.showBuildingInfo_click=function(item){
                console.log(item);
                if($scope.buildingToTree.name == item.nodeName){
                    $scope.buildingToTree = {id : '',name : '',buildingId : '',parcelId : '',buildingStructureId:''};
                    $scope.showUp = '';
                }else{
                    $scope.buildingToTree.id = item.id;
                    $scope.buildingToTree.name = item.nodeName;
                    $scope.buildingToTree.buildingId = item.buildingId;
                    $scope.buildingToTree.parcelId = item.parcelId;
                    $scope.showUp = $scope.buildingToTree.id;
                    $scope.buildingToTree.buildingStructureId=item.buildingStructureId;
                }

                $http.get(url+'/BuildingStructureNew/getBuildingStructurebyId/'+ item.id).success(function(data){

                    console.log(url+'/BuildingStructureNew/getBuildingStructurebyId/'+ item.id);

                    $scope.buildingStructure=data.BuildingStructureNew;
                    console.log($scope.buildingStructure);

                    areaNews=[];
                    $scope.buildingprice = '';

                    if(angular.isUndefined(data.BuildingStructureNew)){
                        return;
                    }

                    if(angular.isArray(data.BuildingStructureNew)==false){
                        $scope.buildingToTree.buildingStructureId = data.BuildingStructureNew.id;
                        areaNews.push(eval(data.BuildingStructureNew));
                        $scope.buildingprice = data.BuildingStructureNew.buildingArea;
                    }else{
                        areaNews=$scope.buildingStructure;

                        var areas = 0;
                        for(var i=0;i<areaNews.length;i++){
                            var area = parseInt(areaNews[i].buildingArea==null||typeof(areaNews[i].buildingArea) == "undefined"?0:areaNews[i].buildingArea);
                            areas += area;
                        }
                        $scope.buildingprice=areas;
                    }
                    $scope.areaNews=areaNews;
                    //在现有建筑下新建建筑时，将建筑的面积类型去重放入面积类型选择数组  王洲  2016.1.12
                    $scope.areaTypeToSelect = [];

                    //console.log($scope.BuildingNew);
                    //console.log($scope.areaNews);

                    for(var i = 0,len = $scope.areaNews.length; i < len; i++){
                        var t = 0;
                        for(var j = 0,lens = $scope.areaTypeToSelect.length; j < lens; j++){
                            if($scope.areaNews[i].areaTypeId == $scope.areaTypeToSelect[j].buildingId){
                                t ++;
                                break;
                            }
                        }
                        if(t == 0){

                            $scope.areaTypeToSelect.push($scope.areaNews[i].buildingType);
                        }
                    }
                });

            }

            /**
             * 展开/收起树形结构
             * @param id    建筑ID
             */
            $scope.toggleNode=function(id,projectId){
                //console.log($scope.buildingMap[id]);
                $scope.buildingMap[id].collapse=!$scope.buildingMap[id].collapse;

                $scope.projectId = projectId;
                $scope.parentId = id;
                $scope.idMaptemp = idMap;
                if($scope.buildingMap[id].collapse)
                {
                    $http.get(url+'/BuildingStructureNew/listAllBuildingStructureTreeNew1Rest/'+$scope.projectId+'/'+$scope.parentId).success(function(data){
                       // console.log(data.BuildingStructureNew);
                        //console.log(idMap);
                        idMap[id].nodes=data.BuildingStructureNew;
                        for(var i=0;i<idMap[$scope.parentId].nodes.length;i++)
                        {
                            $scope.buildingMap[idMap[$scope.parentId].nodes[i].id] = idMap[$scope.parentId].nodes[i];
                            $scope.buildingMap[idMap[$scope.parentId].nodes[i].id].collapse = false;
                        }
                        idMap = $scope.buildingMap;
                        //for(var i=0;i<data.BuildingStructureNew.length;i++)
                        //{
                        //    //console.log(data.BuildingStructureNew[i].id);
                        //    console.log(data.BuildingStructureNew.length);
                        //    //$scope.buildingMap[data.BuildingStructureNew[i].id].collapse = false;
                        //}
                        //console.log(data.BuildingStructureNew);
                        //$scope.buildingMap[idMap[id].nodes.id].collapse=!$scope.buildingMap[id].collapse;
                        //$scope.buildingMap = [];
                    });
                }
            };

            /**---------------------------------------新增建筑(建筑面积配置)--------------------------------------------------**/

            //分页查询 wangzhou  2016-03-24

            /**
             $scope.house = {page : {}};
            var fetchFunctionHouse = function(page, callback){
                $scope.house.page = page;
                $scope.house.projectId = $scope.projectIds;
                //$scope.buildingToTree.buildingStructureId;
                $scope.house.buildingStructureId = $scope.buildingToTree.buildingStructureId;
                var searchUrl='';
                if(angular.isUndefined($scope.buildingToTree.buildingStructureId)){
                    searchUrl=url + '/HouseNew/listPageHouseByProjectId';
                }else{
                    searchUrl=url + '/HouseNew/searchHouseNewByBuildingStructureId';
                }
                $http.post(searchUrl,{HouseNew : $scope.house}).success(callback);
            };
            $scope.searchHousePaginator=app.get('Paginator').list(fetchFunctionHouse,6);
            console.log($scope.searchHousePaginator);
             **/
            $scope.house = {page : {}};
            $scope.listHouse=function(){
                var fetchFunctionHouse = function(page, callback){
                    $scope.house.page = page;
                    $scope.house.projectId = $scope.projectIds;
                    //$scope.buildingToTree.buildingStructureId;
                    $scope.house.buildingStructureId = $scope.currentBuilding.id;
                    var searchUrl='';
                    if(angular.isUndefined($scope.currentBuilding.id)){
                        searchUrl=url + '/HouseNew/listPageHouseByProjectId';
                    }else{
                        searchUrl=url + '/HouseNew/searchHouseNewByBuildingStructureId';
                    }
                    $http.post(searchUrl,{HouseNew : $scope.house}).success(callback);
                };
                $scope.searchHousePaginator=app.get('Paginator').list(fetchFunctionHouse,6);

                console.log($scope.searchHousePaginator);
            };

            //分页查询 wangzhou  2016-03-24
            /**
            $scope.stallNew = {page : {}};
            var fetchFunctionStallNew = function(page, callback){
                $scope.stallNew.page = page;
                $scope.stallNew.projectId = $scope.projectIds;
                $scope.stallNew.buildingStructureId = $scope.buildingToTree.buildingStructureId;
                //
                var searchUrl='';
                if(angular.isUndefined($scope.buildingToTree.buildingStructureId)){
                    searchUrl=url + '/StallNew/listPageStallByProjectId';
                }else{
                    searchUrl=url + '/StallNew/listPageStallByBuildingStructureId';
                }
                $http.post(searchUrl,{StallNew : $scope.stallNew}).success(callback);
                //$http.post(url + '/StallNew/listPageStallByProjectId',{StallNew : $scope.stallNew}).success(callback);
            };
            $scope.searchStallNewPaginator=app.get('Paginator').list(fetchFunctionStallNew,6);
            console.log($scope.searchStallNewPaginator);
**/

            $scope.stallNew = {page : {}};
            $scope.listStallNew=function(){
                var fetchFunctionStallNew = function(page, callback){
                    $scope.stallNew.page = page;
                    $scope.stallNew.projectId = $scope.projectIds;
                    $scope.stallNew.buildingStructureId = $scope.currentBuilding.id;
                    //
                    var searchUrl='';
                    if(angular.isUndefined($scope.currentBuilding.id)){
                        searchUrl=url + '/StallNew/listPageStallByProjectId';
                    }else{
                        searchUrl=url + '/StallNew/listPageStallByBuildingStructureId';
                    }
                    $http.post(searchUrl,{StallNew : $scope.stallNew}).success(callback);
                };
                $scope.searchStallNewPaginator=app.get('Paginator').list(fetchFunctionStallNew,6);
                console.log($scope.searchStallNewPaginator);
            };

            /**
            $scope.storeNew = {page : {}};
            var fetchFunctionStoreNew = function(page, callback){
                $scope.storeNew.page = page;
                $scope.storeNew.projectId = $scope.projectIds;
                $scope.storeNew.buildingStructureId = $scope.buildingToTree.buildingStructureId;
                //
                var searchUrl='';
                if(angular.isUndefined($scope.buildingToTree.buildingStructureId)){
                    searchUrl=url + '/StoreNew/listPageStoreByProjectId';
                }else{
                    searchUrl=url + '/StoreNew/listPageStoreByBuildingStructureId';
                }
                $http.post(searchUrl,{StoreNew : $scope.storeNew}).success(callback);
                //$http.post(url + '/StoreNew/listPageStoreByProjectId',{StoreNew : $scope.storeNew}).success(callback);
            };
            $scope.searchStoreNewPaginator=app.get('Paginator').list(fetchFunctionStoreNew,6);
            console.log($scope.searchStoreNewPaginator);
             **/

            $scope.storeNew = {page : {}};
            $scope.listStoreNew=function(){
                var fetchFunctionStoreNew = function(page, callback){
                    $scope.storeNew.page = page;
                    $scope.storeNew.projectId = $scope.projectIds;
                    $scope.storeNew.buildingStructureId = $scope.currentBuilding.id;
                    //
                    var searchUrl='';
                    if(angular.isUndefined($scope.currentBuilding.id)){
                        searchUrl=url + '/StoreNew/listPageStoreByProjectId';
                    }else{
                        searchUrl=url + '/StoreNew/listPageStoreByBuildingStructureId';
                    }
                    $http.post(searchUrl,{StoreNew : $scope.storeNew}).success(callback);
                    //$http.post(url + '/StoreNew/listPageStoreByProjectId',{StoreNew : $scope.storeNew}).success(callback);
                };
                $scope.searchStoreNewPaginator=app.get('Paginator').list(fetchFunctionStoreNew,6);
                console.log($scope.searchStoreNewPaginator);
            };

            /**
             *
             * 数据迁移
             */
            $scope.isFinish = 0;
            var mark = false;
            $scope.finishName = '数据迁移';
            $scope.moveData = function()
            {

                if(mark)
                {
                    $("input[type='checkbox']").checked=false;
                    mark = false;
                    $scope.isFinish = 0;
                    $scope.finishName = '数据迁移';
                    layer.msg('关闭数据迁移！',{icon : 0,time : 1000});
                }else
                {
                    $("input[type='checkbox']").checked=true;
                    mark = true;
                    $scope.isFinish = 1;
                    $scope.finishName = '数据迁移';
                    layer.msg('打开数据迁移！',{icon : 1,time : 1000});
                }

            };

            // 新增建筑(模态框初始化方法)

            $scope.addBuilding=function(){
                var projectCons = JSON.parse(localStorage.getItem("project_id"));
                if(projectCons == null||projectCons==""){
                    layer.alert('请选择项目！',{icon : 0});
                    return;
                }

                // 初始化面积属性
                $scope.areaTypes={};
                $http.get(url+'/AreaTypeNew/listAllAreaTypeNew').success(function(data){
                    $scope.areaTypes=data.AreaTypeNew;
                });

                $scope.currentBuilding={            //新建筑对象
                    id:'',                          //建筑ID
                    buildingName:'',                //建筑名称
                    buildingArea:'',                    //总建筑面积
                    projectId:$scope.projectIds,  //项目id
                    areaNew:[],                      //面积属性详情列表
                    parcelId:''                     //宗地id  王洲  2016.2.2
                };
                $scope.editArea = false;
                $scope.currentEditArea = {};
                if($scope.buildingToTree.id != ''){
                    $scope.currentBuilding.id = $scope.buildingToTree.id;
                    $scope.currentBuilding.buildingName = $scope.buildingToTree.name;
                    $scope.currentBuilding.areaNew = [{areaTypeId : 1}];
                    $scope.currentBuilding.totalArea = 10;
                    $scope.currentBuilding.totalAreas = 10;
                    $scope.currentBuilding.parcelId = $scope.buildingToTree.parcelId;
                    //$scope.currentBuilding.buildingStructureId=$scope.buildingToTree.buildingStructureId;buildingStructureId
                    $scope.saveBuildingArea();
                    $scope.show1 = false;
                    $scope.showTitle = true;
                    //$scope.show2 = true;
                    if(!$scope.show2){
                        $scope.show2 = true;
                    }
                }else{
                    //$scope.show1 = true;
                    if(!$scope.show1){
                        $scope.show1 = true;
                    }
                    $scope.showTitle = true;
                    $scope.show2 = false;
                }
                $scope.show3 = false;
                $scope.show4 = false;
                $scope.show5 = false;
                $scope.showMain = false;
                //$("#neworlostModal").modal({backdrop: 'static',keyboard: false});
                //$scope.selectHouse();   //打开新增的模态框时查询住宅、商铺、车位  王洲  2016.1.7
                //刷新一下
                $scope.listHouse();
                //$scope.selectParking();
                $scope.listStallNew();
                //$scope.selectBusiness();
                $scope.listStoreNew();
            };

            /**
             * 新增面积详情
             * 增加判断，当有数据正在修改时给出提示，不执行新增操作
             * 王洲
             * 2016.1.6
             */
            $scope.newArea=function(){
                if(angular.isUndefined($scope.currentEditArea.buildingArea)){
                    $scope.editArea=true;
                    $scope.currentEditIndex=null;
                }else{
                    layer.msg('请先保存正在修改的数据！',{icon : 0,time : 1000});
                }
                if($scope.editArea==true)
                {
                    $timeout(function()
                    {
                            $location.hash('nam');
                            $anchorScroll();

                    },100);
                }
            };
            /**
             * 修改面积详情
             * @param index 面积详情下标
             */
            $scope.updateArea=function(index,item){
                //增加验证，有数据修改时修改别的数据给出保存提示，王洲 2016.02.24
                if(angular.isDefined($scope.currentEditArea.buildingArea)){
                    layer.msg('请先保存正在修改的数据！',{icon : 0,time : 1000});
                    return;
                }
                $scope.editArea=true;
                $scope.currentEditIndex=index;
                var areatype = null;
                for(var i = 0,len = $scope.areaTypes.length; i < len; i++){
                    if($scope.areaTypes[i].id == item.areaTypeId){
                        areatype = $scope.areaTypes[i];
                    }
                }
                var current=$scope.currentBuilding.areaNew[index];
                $scope.currentEditArea={
                    areaType:areatype,
                    buildingArea:current.buildingArea,
                    commonalityArea:current.commonalityArea,
                    insideArea:current.insideArea,
                    utilityRatio:current.utilityRatio
                };
            };
            /**
             * 删除面积详情
             * 增加删除前的询问
             * 王洲
             * 2016.1.12
             * @param index  面积详情下标
             */
            $scope.deleteArea=function(index){
              //  增加判断，当有数据在新增或编辑时不允许删除  王洲  2016.04.12
                if($scope.editArea){
                    layer.msg('请先保存正在填写的面积信息！',{icon : 0,time : 1000});
                    return;
                }
                layer.confirm('是否删除该面积？',function(){
                    $scope.currentBuilding.areaNew.splice(index,1);
                    recountArea();
                    layer.msg('删除成功！',{icon : 0,time : 1000});
                    $scope.$apply($scope.currentBuilding.areaNew);
                });
            };
            $scope.deleteAreaTwo=function (){
                $scope.editArea=false;
                $scope.currentEditArea = {};
            }

            /**
             * 重算总建筑面积
             */
            var recountArea= function(){
                var total=0;
                for(var i=0;i<$scope.currentBuilding.areaNew.length;i++){
                    total+=parseInt($scope.currentBuilding.areaNew[i].buildingArea);
                }
                $scope.currentBuilding.totalArea=total;
            };
            /**
             * 保存面积详情
             */
            $scope.saveArea=function(){
                if(angular.isUndefined($scope.currentEditArea)){
                    layer.alert('请先输入面积数据！',{icon : 0});
                    return;
                }
                if(angular.isUndefined($scope.currentEditArea.areaType) || $scope.currentEditArea.areaType == null )
                {
                    layer.msg('请选择面积属性！',{icon : 0,time : 1000});
                    return;
                }else if($scope.currentEditArea.buildingArea == null || $scope.currentEditArea.buildingArea == "")
                {
                    layer.msg('建筑面积不能为空！',{icon : 0,time : 1000});
                    return;
                }else if($scope.currentEditArea.commonalityArea == null || $scope.currentEditArea.commonalityArea == "")
                {
                    layer.msg('公摊面积不能为空！',{icon : 0,time : 1000});
                    return;
                }else if($scope.currentEditArea.utilityRatio == null || $scope.currentEditArea.utilityRatio == "")
                {
                    layer.msg('实用率不能为空！',{icon : 0,time : 1000});
                    return;
                }else if($scope.currentEditArea.insideArea == null || $scope.currentEditArea.insideArea == "")
                {
                    layer.msg('套内面积不能为空！',{icon : 0,time : 1000});
                    return;
                }
                if(isNaN($scope.currentEditArea.buildingArea)){
                    layer.msg('建筑面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }
                if(isNaN($scope.currentEditArea.commonalityArea)){
                    layer.msg('公摊面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }
                if(isNaN($scope.currentEditArea.utilityRatio)){
                    layer.msg('实用率必须为数字！',{icon : 0,time : 1000});
                    return;
                }
                if(isNaN($scope.currentEditArea.insideArea)){
                    layer.msg('套内面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }

                if($scope.currentEditIndex!=null){
                    $scope.currentBuilding.areaNew[$scope.currentEditIndex]={
                        areaTypeId:$scope.currentEditArea.areaType.id,
                        areaTypeName:$scope.currentEditArea.areaType.areaTypeName,
                        buildingArea:$scope.currentEditArea.buildingArea,
                        commonalityArea:$scope.currentEditArea.commonalityArea,
                        insideArea:$scope.currentEditArea.insideArea,
                        utilityRatio:$scope.currentEditArea.utilityRatio
                    };
                }
                else{

                    $scope.currentBuilding.areaNew.push({
                        areaTypeId:$scope.currentEditArea.areaType.id,
                        areaTypeName:$scope.currentEditArea.areaType.areaTypeName,
                        buildingArea:$scope.currentEditArea.buildingArea,
                        commonalityArea:$scope.currentEditArea.commonalityArea,
                        insideArea:$scope.currentEditArea.insideArea,
                        utilityRatio:$scope.currentEditArea.utilityRatio
                    });
                }
                $scope.currentEditArea={};
                $scope.editArea=false;
                recountArea();
            };
            
            $scope.projectLoad = function(){
                $http.get(url + '/Project/getProjectbyId/' + $scope.projectId).success(function(data) {
                    $scope.currentObject = data.Project;
                    app.get('instance').obj = $scope.currentObject;
                }).error(function(data, status, headers, config){
                    layer.alert('查询失败',{icon:2});
                });
            };
            
            
            /**
             * 保存建筑面积信息
             */
            $scope.saveBuildingArea=function(){
                if($scope.currentBuilding.buildingName == null || $scope.currentBuilding.buildingName == ""){
                    layer.alert('请输入建筑名称！',{icon : 0});
                    return;
                }
                //增加建筑名称长度验证  王洲  2016.02.24
                if($scope.currentBuilding.buildingName.length > 25){
                    layer.alert('建筑名称不能超过25个汉字！',{icon : 0});
                    return;
                }
                //增加建筑总面积为空验证  王洲  2016.1.21
                if(angular.isUndefined($scope.currentBuilding.totalArea) || $scope.currentBuilding.totalArea == ""){
                    layer.alert('建筑总面积不能为空！',{icon : 0});
                    return;
                }
                //bug613 用地总面积输入长度不能超过20！周恒 2016.2.18
                if($scope.currentBuilding.totalAreas.length>20){
                    layer.alert('用地总面积长度不能超过20！',{icon : 0});
                    return;
                }
                if(isNaN($scope.currentBuilding.totalArea)){
                    layer.alert('建筑总面积必须为数字！',{icon : 0});
                    return;
                }
                //增加用地总面积的判断  王洲  2016.1.7
                //修改判断方法  王洲  2016.1.8
                //增加用地总面积为空判断  王洲  2016.1.21
                if(angular.isUndefined($scope.currentBuilding.totalAreas) || $scope.currentBuilding.totalAreas == ""){
                    layer.alert('用地总面积不能为空！',{icon : 0});
                    return;
                }
                if(isNaN($scope.currentBuilding.totalAreas)){
                    layer.alert('用地总面积必须为数字！',{icon : 0});
                    return;
                }
                if(angular.isUndefined($scope.currentBuilding.parcelId) || $scope.currentBuilding.parcelId == "" || $scope.currentBuilding.parcelId == null){
                    layer.alert('宗地号不能为空！',{icon : 0});
                    return;                 //宗号的判断与保存面积的判断 调换先后顺序  杨升权 2016.5.26
                }
                if($scope.editArea == true){//增加判断面积类型输入table是否有数据在输入  王洲  2016.1.8
                    layer.alert('请先保存面积信息！',{icon : 0});
                    return;
                }

                if($scope.currentBuilding.areaNew.length == 0){
                    layer.alert('请添加建筑面积类型信息！',{icon : 0});
                    return;
                }
                $scope.show1 = false;

                if(!$scope.show2){
                    $scope.show2 = true;
                }
                //初始化当前建筑
                if($scope.currentBuilding.id == null || $scope.currentBuilding.id == ''){
                    $scope.currentBuilding.id = app.get('tyjUtil').uuid();
                }
                $scope.currentBuilding.parentId=null;
                $scope.currentBuilding.collapse=false;
                $scope.currentBuilding.subNodeName='';
                $scope.currentBuilding.editing=false;
                //保存当前建筑currentBuilding
                $scope.buildingMap[$scope.currentBuilding.id]=$scope.currentBuilding;
                $scope.buildingList.push($scope.currentBuilding);
                //默认当前操作节点为currentBuilding
                $scope.currentBuildingNode=$scope.currentBuilding;

                if($scope.buildingToTree.id == ''){
                    //将建筑的面积类型去重放入面积类型选择数组  王洲  2016.1.12
                    $scope.areaTypeToSelect = [];
                    for(var i = 0,len = $scope.currentBuilding.areaNew.length; i < len; i++){
                        var t = 0;
                        for(var j = 0,lens = $scope.areaTypeToSelect.length; j < lens; j++){
                            if($scope.currentBuilding.areaNew[i].areaTypeId == $scope.areaTypeToSelect[j].areaTypeId){
                                t++;
                            }
                        }
                        if(t == 0){
                            $scope.areaTypeToSelect.push($scope.currentBuilding.areaNew[i]);
                        }
                    }
                }
                pcTree();
            };

            var pcTree = function(){
                var setting = {
                    view: {
                        addDiyDom: addDiyDom,
                        addHoverDom: addHoverDom,
                        removeHoverDom: removeHoverDom,
                        selectedMulti: false
                    },
                    edit: {
                        enable: true,
                        editNameSelectAll: true,
                        showRemoveBtn: showRemoveBtn,
                        showRenameBtn: showRenameBtn
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        beforeDrag: beforeDrag,
                        beforeEditName: beforeEditName,
                        beforeRemove: beforeRemove,
                        beforeRename: beforeRename,
                        onRemove: onRemove,
                        onRename: onRename
                    }
                };

                var zNodes =[
                    { id:"root", pId:"0", name:$scope.currentBuilding.buildingName,types:"",open:true,checked:true}
                ];
                $.fn.zTree.init($("#treeProjectConstruction"), setting, zNodes);
            };

            /**
             * 获取树的选中节点
             */
            $scope.tempbuilding = {id : '',name : ''};//如果选定了建筑，重新查询时用于存放建筑信息  王洲  2016.1.7
            $scope.zTreeGetAllNodes =  function(){
                $scope.pcNodes = [{}];
                var treeObj=$.fn.zTree.getZTreeObj("treeProjectConstruction");
                var znodes=treeObj.getCheckedNodes(true);
                for(var i=1;i<znodes.length;i++){
                    $scope.pcNode ={id:znodes[i].id,pId:znodes[i].pId,name:znodes[i].name,types:znodes[i].types};
                    $scope.pcNodes.push($scope.pcNode);
                }
                $scope.currentBuilding.treeList =  $scope.pcNodes;
                $scope.currentBuilding.buildingArea = $scope.currentBuilding.totalArea;
                $scope.currentBuilding.totalArea = $scope.currentBuilding.totalAreas;//将用地总面积传到后台  王洲 2016.1.7
                $scope.currentBuilding.isFinish = $scope.isFinish;
                $http.post(url+'/BuildingNew/AddBuildingNew', {BuildingNew:$scope.currentBuilding}).success(function(data){
                    $scope.zTreevisible = !$scope.zTreevisible;
                    layer.alert('添加建筑及结构成功！',{icon : 1});
                    $scope.tempbuilding = $scope.buildingToTree;
                    $scope.loadBuilding();
                    $scope.projectLoad();
                    //刷新一下
                    //$scope.searchHousePaginator._load();
                    //$scope.searchStallNewPaginator._load();
                    //$scope.searchStoreNewPaginator._load();
                    $scope.listHouse();
                    //$scope.selectParking();
                    $scope.listStallNew();
                    //$scope.selectBusiness();
                    $scope.listStoreNew();
                    $scope.showUp = $scope.currentBuilding.id;
                });
            };

            /**
             * 返回到新建建筑页面
             */
            $scope.gotoFirst = function(){
                pcTree();
                if(!$scope.show1){
                    $scope.show1 = true
                }
                //$scope.show1 = true;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = false;
                $scope.show5 = false;
            };

            /**
             * 查询该项目住宅类型的数据
             */
            $scope.getBuildingStructureHouse = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                if(!$scope.show3){
                    $scope.show3 = true
                }
                //$scope.show3 = true;
            };

            /**
             * 查询住宅方法  王洲  2016.1.7
             */
            $scope.selectHouse = function(){
                $scope.BuildingStructureHouse = [];
                var projectId = $scope.projectIds;
                //查询该项目住宅类型的数据
                $scope.build1 = {};
                $scope.build1.projectId = projectId;
                $scope.build1.areaId = '0';
                if($scope.tempbuilding.id != ''){
                    $scope.build1.buildingId = $scope.tempbuilding.buildingId;
                }else{
                    $scope.build1.buildingId = $scope.buildingToTree.buildingId;
                }
                $http.post(url + '/BuildingStructureNew/listAllBuildingStructureNewByProjectIdAndAreaId',{BuildingStructureNew : $scope.build1}).success(function (data) {
                    $scope.BuildingStructureHouse = [];
                    if(angular.isArray(data.BuildingStructureNew.houseList)){
                        $scope.BuildingStructureHouse = data.BuildingStructureNew.houseList;
                    }else{
                        $scope.BuildingStructureHouse.push(data.BuildingStructureNew.houseList);
                    }
                    for(var i = 0, len = $scope.BuildingStructureHouse.length; i < len; i ++){
                        $scope.BuildingStructureHouse[i].joinGangState = $scope.BuildingStructureHouse[i].joinGangState.toString();
                    }
                    console.log($scope.BuildingStructureHouse);
                });
            };

            /**
             * 返回上一步
             */
            $scope.close = function(){
                $scope.show1 = false;
                //$scope.show2 = true;
                $scope.show3 = false;
                if(!$scope.show2){
                    $scope.show2 = true
                }
            };

            /**
             * 查询该项目车位类型的数据
             */
            $scope.getBuildingStructureParking = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                //$scope.show4 = true;
                if(!$scope.show4){
                    $scope.show4 = true
                }
            };

            /**
             * 查询车位方法  王洲  2016.1.7
             */
            $scope.selectParking = function(){
                $scope.BuildingStructureParking = [];
                var projectId =$scope.projectIds;
                //查询该项目车位类型的数据
                $scope.build2 = {};
                $scope.build2.projectId = projectId;
                $scope.build2.areaId = '2';
                if($scope.tempbuilding.id != ''){
                    $scope.build2.buildingId = $scope.tempbuilding.buildingId;
                }else{
                    $scope.build2.buildingId = $scope.buildingToTree.buildingId;
                }
                $http.post(url + '/BuildingStructureNew/listAllBuildingStructureNewByProjectIdAndAreaId',{BuildingStructureNew : $scope.build2}).success(function (data) {
                    $scope.BuildingStructureParking = [];
                    if(angular.isArray(data.BuildingStructureNew.stallList)){
                        $scope.BuildingStructureParking = data.BuildingStructureNew.stallList;
                    }else{
                        $scope.BuildingStructureParking.push(data.BuildingStructureNew.stallList);
                    }
                    for(var i = 0, len = $scope.BuildingStructureParking.length; i < len; i ++){
                        $scope.BuildingStructureParking[i].isMechanicalStall = $scope.BuildingStructureParking[i].isMechanicalStall.toString();
                        $scope.BuildingStructureParking[i].intakeState = $scope.BuildingStructureParking[i].intakeState.toString();
                    }
                    console.log($scope.BuildingStructureParking);
                });
            };
            /**
             * 返回上一步
             */
            $scope.close1 = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                //$scope.show3 = true;
                if(!$scope.show3){
                    $scope.show3 = true
                }
                $scope.show4 = false;
            };

            /**
             * 查询该项目商业类型的数据
             */
            $scope.getBuildingStructureBusiness = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = false;
               // $scope.show5 = true;
                if(!$scope.show5){
                    $scope.show5 = true
                }

            };

            /**
             * 查询商铺方法  王洲 2016.1.7
             */
            $scope.selectBusiness = function(){
                $scope.BuildingStructureBusiness = [];
                var projectId =$scope.projectIds;
                //查询该项目商业类型的数据
                $scope.build3 = {};
                $scope.build3.projectId = projectId;
                $scope.build3.areaId = '1';
                if($scope.tempbuilding.id != ''){
                    $scope.build3.buildingId = $scope.tempbuilding.buildingId;
                }else{
                    $scope.build3.buildingId = $scope.buildingToTree.buildingId;
                }
                $http.post(url + '/BuildingStructureNew/listAllBuildingStructureNewByProjectIdAndAreaId',{BuildingStructureNew : $scope.build3}).success(function (data) {
                    $scope.BuildingStructureBusiness = [];
                    if(angular.isArray(data.BuildingStructureNew.storeList)){
                        $scope.BuildingStructureBusiness = data.BuildingStructureNew.storeList;
                    }else {
                        $scope.BuildingStructureBusiness.push(data.BuildingStructureNew.storeList);
                    }
                    console.log($scope.BuildingStructureBusiness);
                    for(var i = 0, len = $scope.BuildingStructureBusiness.length; i < len; i++){
                        $scope.BuildingStructureBusiness[i].intakeState = $scope.BuildingStructureBusiness[i].intakeState.toString();
                    }
                });
            };

            /**
             * 添加住宅详情
             * @type {{}}
             */
            $scope.houseNew={};

            $scope.addBuildingStructureHouse = function(index,item){
                $scope.BuildingStructureHouseLists = [];
                var getTd=document.getElementById("houseTable");
                $scope.BuildingStructureHouselist ={
                    buildingStructureId:"",
                    buildingId:"",
                    projectId:"",
                    houseAddress:"",
                    houseAttribute:"",
                    houseType:"",
                    houseArea:"",
                    usableArea:"",
                    shareArea:"",
                    completeArea:"",
                    completeDate:"",
                    houseNum:"",
                    joinGangState:"",
                    id:"",
                    password:"",
                    sipId:""
                };
                var bsh1 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[0].value;
                $scope.BuildingStructureHouselist.buildingStructureId = bsh1;
                var bsh9 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[1].value;
                $scope.BuildingStructureHouselist.buildingId = bsh9;
                var bsh10 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[2].value;
                $scope.BuildingStructureHouselist.projectId = bsh10;
                var bsh11 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[3].value;
                $scope.BuildingStructureHouselist.houseAddress = bsh11;
                var houseId = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[4].value;
                $scope.BuildingStructureHouselist.id = houseId;
                var password = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[5].value;
                $scope.BuildingStructureHouselist.password = password;
                var sipId = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[6].value;
                $scope.BuildingStructureHouselist.sipId = sipId;
                if(isNaN(item.houseArea)){
                    layer.msg('建筑面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }else if(isNaN(item.usableArea))
                {
                    layer.msg('套内面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }else if(isNaN(item.shareArea))
                {
                    layer.msg('分摊面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }else if(isNaN(item.completeArea))
                {
                    layer.msg('竣工面积必须为数字！',{icon : 0,time : 1000});
                    return;
                }else if(item.houseAttribute==null||item.houseAttribute=='')
                {
                    layer.msg('楼房属性不能为空！',{icon : 0,time : 1000});
                    return;
                }else if(item.houseType==null||item.houseType=='')
                {
                    layer.msg('房屋户型不能为空！',{icon : 0,time : 1000});
                    return;
                }else if(item.saleState==null||item.saleState=='')
                {
                    layer.msg('销售状态不能为空！',{icon : 0,time : 1000});
                    return;
                }

                $scope.BuildingStructureHouselist.houseNum = item.houseNum;
                $scope.BuildingStructureHouselist.houseArea = item.houseArea;
                $scope.BuildingStructureHouselist.usableArea = item.usableArea;
                $scope.BuildingStructureHouselist.shareArea = item.shareArea;
                $scope.BuildingStructureHouselist.completeArea = item.completeArea;
                $scope.BuildingStructureHouselist.completeDate = new Date(item.completeDate);
                $scope.BuildingStructureHouselist.houseAttribute = item.houseAttribute;
                $scope.BuildingStructureHouselist.houseType = item.houseType;
                if(item.saleState=='已售')
                {
                    $scope.BuildingStructureHouselist.saleState=1;
                }else
                {
                    item.joinGangState = 0;
                }


                $scope.BuildingStructureHouselist.joinGangState = item.joinGangState;

                $scope.houseNew = $scope.BuildingStructureHouselist;
                console.log($scope.houseNew);
                $http.post(url+'/HouseNew/updateHouseNews',{HouseNew: $scope.houseNew}).success(function(){
                    layer.alert('住宅信息修改成功！',{icon : 1});
                    $scope.BuildingStructureHouseLists={};
                    //$scope.selectHouse();
                    //刷新一下
                    $scope.searchHousePaginator._load();
                    $scope.listHouse();
                    //$scope.selectParking();
                    //$scope.listStallNew();
                    ////$scope.selectBusiness();
                    //$scope.listStoreNew();
                }).error(function(data,status,headers,config){
                    layer.alert('住宅信息修改失败！',{icon : 2});
                });
            };

            /**
             * 添加车位详情
             * @type {{}}
             */
            $scope.stallNew={};
            $scope.addBuildingStructureStall = function(index,item){
                //$scope.BuildingStructureStallLists = [];
                var getTd=document.getElementById("stallTable");
                //var rowsLength=getTd.rows.length;
                //for(var i=1;i<rowsLength;i++)
                //{
                    $scope.BuildingStructureStalllist ={
                        buildingStructureId:"",
                        buildingId:"",
                        projectId:"",
                        stallProperty:"",
                        isMechanicalStall:"",
                        intakeDate:"",
                        stallCoding:"",
                        stallNumber:"",
                        intakeState:"",
                        stallId:""
                    };
                    //车位新增功能调整  王洲  2016.02.25
                    var stallId = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[0].value;
                    $scope.BuildingStructureStalllist.stallId = stallId;
                    var bsh1 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[2].value;
                    $scope.BuildingStructureStalllist.buildingStructureId = bsh1;
                    var bsh9 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[1].value;
                    $scope.BuildingStructureStalllist.buildingId = bsh9;
                    var bsh10 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[3].value;
                    $scope.BuildingStructureStalllist.projectId = bsh10;
                    if(item.stallCoding == null || item.stallCoding == ""){
                        layer.msg('车位编码必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }else if(item.stallProperty == null || item.stallProperty == "")
                    {
                        layer.msg('车位属性必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }else if(isNaN(item.stallNumber))
                    {
                        layer.msg('车位号必须为数字！',{icon : 0,time : 1000});
                        return;
                    }else if(item.isMechanicalStall == null || item.isMechanicalStall == "")
                    {
                        layer.msg('机械车位必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }else if(item.intakeDate == null || item.intakeDate == "")
                    {
                        layer.msg('竣工日期必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }else if(item.intakeStates == null || item.intakeStates == "")
                    {
                        layer.msg('销售状态必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }
                    $scope.BuildingStructureStalllist.stallCoding = item.stallCoding;
                    $scope.BuildingStructureStalllist.stallProperty = item.stallProperty;
                    $scope.BuildingStructureStalllist.stallNumber = item.stallNumber;
                    if(item.isMechanicalStall=='是')
                    {
                        item.isMechanicalStall = 1;
                    }else
                    {
                        item.isMechanicalStall = 0;
                    }
                    $scope.BuildingStructureStalllist.isMechanicalStall = item.isMechanicalStall;
                    $scope.BuildingStructureStalllist.intakeDate = new Date(Date.parse(item.intakeDate));
                    if(item.intakeStates=='已售')
                    {
                        item.stallState = 1;
                    }else
                    {
                        item.stallState = 0;
                    }
                    $scope.BuildingStructureStalllist.stallState = item.stallState;
                //}
                $scope.stallNew = $scope.BuildingStructureStalllist;
                console.log($scope.stallNew);
                $http.post(url+'/StallNew/updateStall',{StallNew: $scope.stallNew}).success(function(){
                    layer.alert('车位信息修改成功！',{icon : 1});
                    //$scope.visibleStall = !$scope.visibleStall;
                    $scope.BuildingStructureStallLists = {};
                    //$scope.selectParking();
                    //$scope.searchStallNewPaginator._load();
                    //$scope.listHouse();
                    //$scope.selectParking();
                    $scope.listStallNew();
                    //$scope.selectBusiness();
                    //$scope.listStoreNew();
                }).error(function(data,status,headers,config){
                    layer.alert('车位信息修改失败！',{icon : 2});
                });
            };

            /**
             * 返回
             */

            $scope.back = function()
            {
                $scope.doClick(1);
                $location.path('/index/baseManagement/projectManagement');
            };

            /**
             * 返回上一步
             */
            $scope.close2 = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = true;
                $scope.show5 = false;
            };

            /**
             * 增加商铺详情
             * @type {{}}
             */
            //$scope.storeNew={};
            $scope.storeNew = {page : {}};
            $scope.addBuildingStructureStore = function(index,item){
                //$scope.BuildingStructureStoreLists = [];
                var getTd=document.getElementById("storeTable");
                //var rowsLength=getTd.rows.length;
                //for(var i=1;i<rowsLength;i++)
                //{
                    $scope.BuildingStructureStorelist ={
                        buildingStructureId:"",
                        buildingId:"",
                        projectId:"",
                        storeTyoe:"",
                        storeNumber:"",
                        buildingArea:"",
                        insideArea:"",
                        commonalityArea:"",
                        completionArea:"",
                        intakeDate:"",
                        storeCode:"",
                        intakeState:"",
                        storeId:""
                    };
                    //商铺新增功能调整  王洲  2016.02.25
                    var bsh1 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[0].value;
                    $scope.BuildingStructureStorelist.buildingStructureId = bsh1;
                    var bsh9 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[1].value;
                    $scope.BuildingStructureStorelist.buildingId = bsh9;
                    var bsh10 = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[2].value;
                    $scope.BuildingStructureStorelist.projectId = bsh10;
                    var storeId = getTd.rows[index+1].cells[0].getElementsByTagName("INPUT")[3].value;
                    $scope.BuildingStructureStorelist.storeId = storeId;
                    if(item.storeTyoe == null || item.storeTyoe == ""){
                        layer.msg('商铺属性必须填写完整！',{icon : 0,time : 1000});
                        return;
                    }else if(item.storeCode == null || item.storeCode == ""){
                        layer.msg('商铺编码必须填写完整！',{icon : 0,time : 2000});
                        return;
                    }else if(item.storeNumber == null || item.storeNumber == ""){
                        layer.msg('商铺号必须填写完整！',{icon : 0,time : 2000});
                        return;
                    }else if(isNaN(item.buildingArea)){
                        layer.msg('建筑面积必须为数字！',{icon : 0,time : 2000});
                        return;
                    }else if(isNaN(item.insideArea)){
                        layer.msg('套内面积必须为数字！',{icon : 0,time : 2000});
                        return;
                    }else if(isNaN(item.commonalityArea)){
                        layer.msg('分摊面积必须为数字！',{icon : 0,time : 2000});
                        return;
                    }else if(isNaN(item.completionArea)){
                        layer.msg('竣工面积必须为数字！',{icon : 0,time : 2000});
                        return;
                    }
                    $scope.BuildingStructureStorelist.storeTyoe = item.storeTyoe;
                    $scope.BuildingStructureStorelist.storeCode = item.storeCode;
                    $scope.BuildingStructureStorelist.storeNumber = item.storeNumber;
                    $scope.BuildingStructureStorelist.buildingArea = item.buildingArea;
                    $scope.BuildingStructureStorelist.insideArea = item.insideArea;
                    $scope.BuildingStructureStorelist.commonalityArea = item.commonalityArea;
                    $scope.BuildingStructureStorelist.completionArea = item.completionArea;
                    $scope.BuildingStructureStorelist.intakeDate = new Date(Date.parse(item.intakeDate));
                    if(item.intakeStates=='已售')
                    {
                        item.intakeState = 1;
                    }else
                    {
                        item.intakeState = 0;
                    }
                    $scope.BuildingStructureStorelist.intakeState = item.intakeState;
                //}
                $scope.storeNew = $scope.BuildingStructureStorelist;
                $http.post(url+'/StoreNew/updateStore',{StoreNew: $scope.storeNew}).success(function(){
                    layer.alert('商铺信息修改成功！',{icon : 1});
                    //$scope.visibleStore = !$scope.visibleStore;
                    $scope.BuildingStructureStoreLists={};
                    //$scope.searchStoreNewPaginator._load();
                    //$scope.listHouse();
                    //$scope.selectParking();
                    //$scope.listStallNew();
                    //$scope.selectBusiness();
                    $scope.listStoreNew();
                    //$scope.selectBusiness();
                }).error(function(data,status,headers,config){
                    layer.alert('商铺信息修改失败！',{icon : 2});
                });
            };




            /**---------------------------------------新增建筑(建筑结构配置)--------------------------------------------------**/
            /**
             * 新增子建筑(开始新增)显示文本框和保存按钮
             * @param id  父建筑ID
             */
            $scope.enterSubNodeName=function(id){
                $scope.currentBuildingNode=$scope.buildingMap[id];
                $scope.currentBuildingNode.subNodeName='';
                $scope.currentBuildingNode.editing=!$scope.currentBuildingNode.editing;
            };
            /**
             * 新增子建筑(新增保存)
             * @param id 父建筑ID
             */
            $scope.addBuildingNode=function(id){
                var newBuilding={
                    id:app.get('tyjUtil').uuid(),
                    parentId:id,
                    collapse:false,
                    subNodeName:'',
                    editing:false,
                    buildingName:$scope.currentBuildingNode.subNodeName,
                    /* areaNew:[],*/
                    nodes:[]
                };

                //在映射中保存当前新增的子建筑
                $scope.buildingMap[newBuilding.id]=newBuilding;
                //当前新增的子建筑放入父建筑的nodes里面

                $scope.buildingMap[id].nodes.push(newBuilding);
                //收起保存栏
                $scope.currentBuildingNode.editing=!$scope.currentBuildingNode.editing;
                //新增加的结构信息
                $scope.unsaveBuildingList.push(newBuilding);
            };

            $scope.saveBuildingStructure=function(){
            };
            /**---------------------------------------新增建筑(建筑详情配置)--------------------------------------------------**/
            /**
             * 建筑详情子项新增
             */
            $scope.buildingDetailItemAdd=function(){
                $scope.buildingDetailNew.editing=true;
            };
            /**
             * 建筑详情子项新增保存
             */
            $scope.buildingDetailNewItemSave=function(){
                //生成主键
                $scope.buildingDetailNew.id=app.get('tyjUtil').uuid();
                //设置为非编辑状态
                $scope.buildingDetailNew.editing=false;
                //分别添加到Map和List中
                $scope.buildingDetailList.push($scope.buildingDetailNew);
                $scope.buildingDetailMap[$scope.buildingDetailNew.id]=$scope.buildingDetailNew;
                //重置
                $scope.buildingDetailNew={};
            };
            /**
             * 建筑详情子项修改
             * @param id 建筑详情子项ID
             */
            $scope.buildingDetailItemUpdate=function(id){
                $scope.buildingDetailMap[id].editing=true;
            };
            /**
             * 建筑详情子项删除
             * @param id 建筑详情子项ID
             */
            $scope.buildingDetailItemDelete=function(id){
                var temp=$scope.buildingDetailMap[id];
                var index=$scope.buildingDetailList.indexOf(temp);
                $scope.buildingDetailList.splice(index,1);
                delete $scope.buildingDetailMap[id];
            };
            /**
             * 建筑详情子项修改保存
             * @param id 建筑详情子项ID
             */
            $scope.buildingDetailItemSave=function(id){
                $scope.buildingDetailMap[id].editing=false;
            };
            /**
             * 建筑详情的上一步按钮
             * @param index 当前建筑详情页面下标
             */
            $scope.buildingDetailPrev=function(index){
                $scope.buildingDetailList=[];
                $scope.buildingDetailMap={};
            };
            /**
             *
             * 建筑详情的保存按钮
             * @param index 当前建筑详情页面下标
             */
            $scope.buildingDetailSave=function(index){

            };
            /**
             * 建筑详情的下一步按钮
             * @param index 当前建筑详情页面下标
             */
            $scope.buildingDetailNext=function(index){
                $scope.buildingDetailList=[];
                $scope.buildingDetailMap={};
            };
            init();

            /**
             * 导入Excel数据文档
             */
            var fileUrl=$rootScope.fileUrl;    //上传的文件路径
            var filePath='';          //上传文件的路径
            $scope.annex={
                annexAddress:'',
                annexName:'',
                relationId:''
            };

            $scope.inportExcel = function(){
                $scope.exceltype = "house";
                $scope.uploadPic();//修改上传图片模态框  王洲  2016.1.13
            };
            $scope.inportExcelStall = function(){
                $scope.exceltype = "stall";
                $scope.uploadPic();//修改上传图片模态框  王洲  2016.1.13
            };
            $scope.inportExcelStore = function(){
                $scope.exceltype = "store";
                $scope.uploadPic();//修改上传图片模态框  王洲  2016.1.13
            };


            //修改上传图片模态框  王洲  2016.1.13
            $scope.uploadPic=function() {
                $("#excelupload").remove();
                $("#remove").append("<div id='excelupload' class='zyupload'></div>");
                $(function () {
                    // 初始化插件
                    $("#excelupload").zyUpload({
                        itemWidth: "140px",                 // 文件项的宽度
                        itemHeight: "115px",                 // 文件项的高度
                        url: fileUrl + "/FileService",  // 上传文件的路径
                        fileType: ["xls", "xlsx"],          // 上传文件的类型
                        fileSize: 51200000,                // 上传文件的大小
                        multiple: true,                    // 是否可以多个文件上传
                        dragDrop: true,                    // 是否可以拖动上传文件
                        tailor: true,                    // 是否可以裁剪图片
                        del: true,                    // 是否可以删除文件
                        finishDel: false,  				  // 是否在上传文件完成后删除预览
                        /* 外部获得的回调接口 */
                        onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                        },
                        onDelete: function (file, files) {
                        },
                        onSuccess: function (file, response) {          // 文件上传成功的回调方法

                            filePath = response;
                            $scope.annex.annexAddress = filePath;
                            $scope.annex.annexName = file.name;
                            $scope.annex.isFinish = $scope.isFinish;
                            if ($scope.exceltype != "") {
                                if ($scope.exceltype == "house") {
                                    $http.post(url + "/HouseNew/importExcelFile", {Annex: $scope.annex}).success(function (data) {
                                        layer.msg('导入成功！等待数据刷新！', {icon: 1, time: 2000});
                                        $("#ddd").hide();
                                        //$scope.selectHouse();
                                        //刷新一下
                                        $scope.searchHousePaginator._load();
                                        $scope.listHouse();
                                        //$scope.selectParking();
                                        //$scope.listStallNew();
                                        //$scope.selectBusiness();
                                        //$scope.listStoreNew();
                                    });
                                } else if ($scope.exceltype == "stall") {
                                    $http.post(url + '/StallNew/importExcelFile', {Annex: $scope.annex}).success(function (data) {
                                        layer.msg('导入成功！等待数据刷新！', {icon: 1, time: 2000});
                                        angular.element("#ddd").hide();
                                        //$scope.selectParking();
                                        $scope.searchStallNewPaginator._load();
                                        //$scope.listHouse();
                                        //$scope.selectParking();
                                        $scope.listStallNew();
                                        //$scope.selectBusiness();
                                        //$scope.listStoreNew();
                                    });
                                } else if ($scope.exceltype == "store") {
                                    $http.post(url + '/StoreNew/importExcelFile', {Annex: $scope.annex}).success(function (data) {
                                        layer.msg('导入成功！等待数据刷新！', {icon: 1, time: 2000});
                                        angular.element("#ddd").hide();
                                        //$scope.selectBusiness();
                                        $scope.listStallNew();
                                    });
                                }
                            } else {
                                layer.msg('尚未选择excel需要导入的建筑结构类型', {icon: 0, time: 2000});
                            }

                        },
                        onFailure: function (file, response) {          // 文件上传失败的回调方法
                            layer.alert('此文件上传失败：', {icon: 2});
                        },
                        onComplete: function (response) {           	  // 上传完成的回调方法
                        }
                    });

                });
            };

            /**
             * 修改建筑结构名称
             * 王洲
             * 2016.02.24
             * @param item
             */
            $scope.changeName = function(item){
                layer.prompt({
                    title : '请输入修改后的建筑名称',
                    formType : 0
                },function(val){
                    if(val.replace(/\s/g,"").length == 0){
                        layer.msg('输入的名字不能为空格！',{icon : 0,time : 1000});
                    }else{
                        $http.post(url + '/BuildingStructureNew/changeBuildName/' + item.id + '/' + val).success(function(data){
                            if(data.Info.state == 'success'){
                                layer.msg('修改成功！',{icon : 1,time : 1000});
                                $scope.loadBuilding();
                            }else{
                                layer.msg('修改失败，请重试',{icon : 0,time : 1000});
                            }
                        }).error(function(data){
                            layer.msg('修改出错，请重试！',{icon : 0,time : 1000});
                        });
                    }
                });
            };

            $scope.finishBuilding = function(){
                layer.confirm('是否完成建筑新增？',
                    {btn : ['确定','取消']},
                    function(){
                        $http.post(url + '/projectCompletion/changeStateByProjectIdAndParamTypes/' + $scope.projectIds + '/' + 'building').success(function(data){
                            if(data.Info.state == 'success'){
                                layer.msg('操作成功！',{icon : 1,time : 1000});
                                $scope.loadBuilding();
                            }else {
                                layer.msg('操作异常，请重试！',{icon : 0,time : 1000});
                            }
                        }).error(function(data){
                            layer.msg('操作异常，请重试！',{icon : 0,time : 1000});
                        });
                    },function(){});
            };

            $scope.refeashHtml = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = false;
                $scope.show5 = false;
                if(!$scope.showMain){
                    $scope.showMain = true;
                }
                $scope.showTitle = false;
            };

            var IDMark_A = "_a";
            //var newCount = 1;
            function addDiyDom(treeId, treeNode){
                if (treeNode.parentNode && treeNode.parentNode.id!=2) return;
                if(treeNode.id == 'root') return;
                var aObj = $("#" + treeNode.tId + IDMark_A);
                var editStr = "<select class='selDemo' id='diyBtn_" +treeNode.id+ "'><option value=0>无类型</option>";
                //循环遍历面积类型数组，用于选择建筑面积类型  王洲  2016.1.12
                if($scope.areaTypeToSelect.length > 0){
                    for(var j = 0,lens = $scope.areaTypeToSelect.length; j < lens; j++){
                        if($scope.areaTypeToSelect[j].areaTypeName == '住宅'){
                            $scope.areaTypeToSelect[j].id = '1';
                        }else if($scope.areaTypeToSelect[j].areaTypeName == '商铺'){
                            $scope.areaTypeToSelect[j].id = '2';
                        }else if($scope.areaTypeToSelect[j].areaTypeName == '车位'){
                            $scope.areaTypeToSelect[j].id = '3';
                        }else if($scope.areaTypeToSelect[j].areaTypeName == '公摊'){
                            $scope.areaTypeToSelect[j].id = '4';
                        }else if($scope.areaTypeToSelect[j].areaTypeName == '公建'){
                            $scope.areaTypeToSelect[j].id = '5';
                        }else {
                            $scope.areaTypeToSelect[j].id = '';
                        }
                    }
                    for(var i = 0,len = $scope.areaTypeToSelect.length; i < len; i++){
                        editStr += "<option value ="+$scope.areaTypeToSelect[i].id+">"+$scope.areaTypeToSelect[i].areaTypeName+"</option>";
                    }
                }
                editStr += "</select>";
                aObj.after(editStr);
                var btn = $("#diyBtn_"+treeNode.id);
                if (btn) btn.bind("change", function(){
                    // alert("diy Select value="+btn.find("option:selected").val()+" for " + treeNode.name);
                    var zTree = $.fn.zTree.getZTreeObj("treeProjectConstruction");
                    treeNode.types = btn.find("option:selected").val();
                    zTree.updateNode(treeNode,true);
                    return true;
                });
            };

            //修改删除提示，删除确认，增加删除成功的提示  王洲  2016.1.21
            function beforeRemove(treeId, treeNode) {
                className = (className === "dark" ? "":"dark");
                var zTree = $.fn.zTree.getZTreeObj("treeProjectConstruction");
                zTree.selectNode(treeNode);
                layer.msg('删除成功！',{icon : 1,time : 1000});
            }


            var newCount = 1;
            function addHoverDom(treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                    + "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_"+treeNode.tId);
                if (btn) btn.bind("click", function(){
                    var zTree = $.fn.zTree.getZTreeObj("treeProjectConstruction");
                    zTree.addNodes(treeNode, {id:(1000 + newCount), pId:treeNode.id, name:"new node" + (newCount++),types:"",checked:true});
                    return true;
                });
            };

            function removeHoverDom(treeId, treeNode) {
                    $("#addBtn_"+treeNode.tId).unbind().remove();
            };

            /*
             * Excel文件导入
             */

            $scope.isShow = false;
            $scope.bsnum = 0;//上传成功数
            $scope.totalnum = 0;//总共上传数
            $scope.bfNum ='';//百分比
            $scope.key ="110";
            var flagInterval = null;
            $scope.exportBuildingStructureNew=function(){
                angular.element('#addExcel').modal({backdrop: 'static', keyboard: false});
               // $('#addExcel').modal({backdrop: 'static', keyboard: false});
                $scope.annexExcel={
                    annexAddress:'',
                    annexName:''
                };
                //$("#excelupload").remove();
                angular.element('#excelupload').remove();
                angular.element('#remove1').append("<div id='excelupload' class='zyupload'></div>");
                //$("#remove1").append("<div id='excelupload' class='zyupload'></div>");
                $(function(){
                    // 初始化插件
                    angular.element('#remove1').html('');
                    //$("#remove1").html('');
                    angular.element('#remove1').append('<div id="excelupload" class="zyupload"></div>');
                    //$("#remove1").append('<div id="excelupload" class="zyupload"></div>');
                    angular.element('#excelupload').zyUpload({
                    //$("#excelupload").zyUpload({
                        itemWidth        :   "140px",                 // 文件项的宽度
                        itemHeight       :   "115px",                 // 文件项的高度
                        url              :   fileUrl+"/FileService",  // 上传文件的路径
                        fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                        fileSize         :   51200000,                // 上传文件的大小
                        multiple         :   true,                    // 是否可以多个文件上传
                        dragDrop         :   true,                    // 是否可以拖动上传文件
                        tailor           :   true,                    // 是否可以裁剪图片
                        del              :   true,                    // 是否可以删除文件
                        finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                        /* 外部获得的回调接口 */
                        onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                            /*if(selectFiles.length > 0){
                             for(var i=0;i<selectFiles.length;i++){
                             var fileName = selectFiles[i].name;
                             var pos = fileName.lastIndexOf(".");
                             var suffix = fileName.substring(pos+1,fileName.length);
                             alert("xls" == suffix || "xlsx" == suffix)
                             if("xls" == suffix || "xlsx" == suffix){
                             alert(i)
                             $("#uploadImage_"+i).attr("src","fileType/xls.png");
                             }
                             if("png" == suffix || "jpg" == suffix || "jpeg" == suffix || "gif" == suffix){
                             $("#uploadImage_"+i).attr("src","fileType/png.png");
                             }
                             if("pdf" == suffix){
                             $("#uploadImage_"+i).attr("src","fileType/pdf.png");
                             }
                             if("doc" == suffix || "doc" == suffix){
                             $("#uploadImage_"+i).attr("src","fileType/doc.png");
                             }
                             if("ppt" == suffix){
                             $("#uploadImage_"+i).attr("src","fileType/ppt.png");
                             }
                             }
                             }*/
                        },
                        onDelete: function(file, files){
                        },
                        onSuccess: function(file, response){          // 文件上传成功的回调方法
                            filePath=response;
                            $scope.annexExcel.annexAddress=filePath;
                            $scope.annexExcel.annexName=file.name;
                            $scope.annexExcel.projectId=$scope.projectId;
                            flagInterval =setInterval(getProcess,1000);
                            //$scope.annexExcel.companyId= $scope.user.companyId;
                            $http.post(url + "/BuildingStructureNew/importDataFromExcelFile",{Annex:$scope.annexExcel}).success(function(data){
                                if(data.Info.state){
                                    $scope.key = data.Info.info.$;
                                    //$('#addExcel').modal('hide');
                                    angular.element('#addExcel').modal('hide');
                                    //$("#uploadProcessDialog").modal('show');

                                }else{
                                    layer.msg('导入失败',{icon : 1,time : 2000});
                                    //$('#addExcel').modal('hide');
                                    angular.element('#addExcel').modal('hide');
                                }
                                /*if(data.Info.state){
                                    layer.alert(data.Info.info.$,{icon : 0});
                                    //layer.alert(data.Info.info.$,{icon : 0});
                                    //layer.alert(data.Info.info.$,{icon : 1,time : 2000});
                                    $('#addExcel').modal('hide');
                                }else{
                                    layer.msg('导入失败',{icon : 1,time : 2000});
                                    $('#addExcel').modal('hide');
                                }
                                $("#fileImage").val("");
                                $("#uploadList_" + file.index).fadeOut();*/
                            });
                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法
                            alert("此文件上传失败：");
                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });
                });
            };

            $scope.saveExcel=function(){
                angular.element('#addExcel').modal('hide');
                angular.element('#uploadProcessDialog').modal('show');
                //$('#addExcel').modal('hide');
                //$('#uploadProcessDialog').modal('show');
                $scope.load();
            }

            function getProcess(){
                $.ajax({
                    url:fileUrl + "/info/getImportProcess.do",
                    data:{key:$scope.key},
                    type:'get',
                    cache:false,
                    success:function(data){
                        console.log(data);
                        if(data!=null && data!=undefined && data!=''){
                            var uploadArr = data.split("|");
                            console.log(uploadArr[0]);
                            if(uploadArr[0] == 0){
                                //$("#uploadProcessDialog").modal('hide');
                                angular.element('#uploadProcessDialog').modal('hide');
                                clearInterval(flagInterval);
                                layer.alert('数据已存在，请检查导入数据是否重复！');
                            }else{
                                if(!$scope.isShow){
                                    $scope.isShow = true;
                                    angular.element('#uploadProcessDialog').modal('show');
                                    angular.element('#uploadProcessDialog').modal({backdrop: 'static', keyboard: false});
                                    //$("#uploadProcessDialog").modal('show');
                                    //$('#uploadProcessDialog').modal({backdrop: 'static', keyboard: false});
                                }
                                $scope.totalnum = parseInt(uploadArr[1]);
                                $scope.bsnum =parseInt(uploadArr[0]);
                                $scope.bfNum = Math.round(($scope.bsnum/$scope.totalnum)*100)+'%';
                                angular.element('#bsnum').html(uploadArr[0]);
                                angular.element('#totalnum2').html(uploadArr[1]);
                                angular.element('#progress').css('width',$scope.bfNum);

                                //$("#bsnum").html(uploadArr[0]);
                                //$("#totalnum2").html(uploadArr[1]);
                                //$('#progress').css('width',$scope.bfNum);
                                if(parseInt(uploadArr[0]) > 0 && parseInt(uploadArr[0]) == parseInt(uploadArr[1])){
                                    layer.msg('导入成功！',{icon:1});
                                    angular.element('#uploadProcessDialog').modal('hide');
                                    //$("#uploadProcessDialog").modal('hide');
                                    clearInterval(flagInterval);
                                    $scope.isShow = false;
                                    $scope.loadBuilding();
                                }
                            }
                        }
                    }
                });
            }

            $scope.cancleExcel=function(){
                angular.element('#addExcel').modal('hide');
                //$('#addExcel').modal('hide');
                $scope.load();
            }
        }]);
    angular.module('app').directive('formatDate', function(){
            return {
                require: 'ngModel',
                link: function(scope, elem, attr, ngModelCtrl) {
                    ngModelCtrl.$formatters.push(function(modelValue){
                        if(modelValue) {
                            return new Date(modelValue);
                        }
                    });

                    ngModelCtrl.$parsers.push(function(value){
                        if(value) {
                            return $filter('date')(value, 'yyyy-MM-dd');
                        }
                    });
                }
            };
        });
});