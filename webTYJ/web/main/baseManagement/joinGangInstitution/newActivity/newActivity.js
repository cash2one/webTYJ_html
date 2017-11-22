/**
 * Created by NM on 2018/1/18.
 * 入伙初始化新增活动
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newActivityCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.activityStart=true;
        $scope.activityOne=false;
        $scope.activityTwo=false;
        $scope.activityThree=false;
        var url = $rootScope.url;           //全局访问路径
        $scope.searchArticle={page:{}};       //物品包分页分页
        $scope.allProjects=[];              //所有项目信息
        $scope.currentProject={};           //当前所选项目
        $scope.chooseData=[];               //选中的建筑信息
        $scope.currentJoinProject={};       //新增入伙保存所有数据
        $scope.acceptanceHouseRelation={    //得到所选的人员房子
            staffId:'',
            buildingStructureId:''
        };
        /**
         * 显示第二个页面
         */
        $scope.oneCheck = function(){
            $scope.activityStart=false;
            $scope.activityOne=true;
            $scope.activityTwo=false;
            $scope.activityThree=false;
        };
        /**
         * 返回上一步
         */
        $scope.oneBack = function(){
            $scope.activityStart=true;
            $scope.activityOne=false;
            $scope.activityTwo=false;
            $scope.activityThree=false;
        };
        /**
         *
         *
         *
         * 显示第三个页面
         */
        $scope.chooseDatas = [];
        $scope.current = null;
        $scope.twoCheck = function(){
            if($scope.currentProject.projectId != null){
                $scope.activityStart=false;
                $scope.activityOne=false;
                $scope.activityTwo=true;
                $scope.activityThree=false;
                //获取选择节点的建筑id
                if($.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true).length>0){
                    var nodes = $.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true);
                    for(var i=0;i<nodes.length;i++){
                        var isNode = nodes[i];
                        //得到所选节点的全名
                        if(isNode.check_Child_State<0){
                            $scope.chooseData.push(isNode);
                        }
                    }
                    for(var j=0;j<$scope.chooseData.length;j++){
                        $scope.chooseDatas.push($scope.chooseData[j].id);

                    }
                    $scope.currentJoinProject.buildingStructureIds = $scope.chooseDatas;
                    $scope.personBuildingNew.buildingStructureIds = $scope.chooseDatas;
                    console.log($scope.currentJoinProject.buildingStructureIds);
                }
            }else{
                alert('请选择建筑');
            }
        };

        $scope.currentCheck = function(items){
            $scope.currentBuilding =  items;
        };
        /**
         * 返回上一步
         */
        $scope.twoBack = function(){
            $scope.activityStart=false;
            $scope.activityOne=true;
            $scope.activityTwo=false;
            $scope.activityThree=false;
        };
        /**
         * 显示第四个页面
         */
        $scope.personBuildingNew = {};
        $scope.threeCheck = function(){
            $scope.activityStart=false;
            $scope.activityOne=false;
            $scope.activityTwo=false;
            $scope.activityThree=true;
            if($scope.personBuildingNew.buildingStructureIds != null){
                $http.post(url + '/PersonBuildingNew/listPagePersonBuildingNew',{PersonBuildingNew:$scope.personBuildingNew}).success(function(data){
                    $scope.currentItem=data.PageRestful.personBuildingNew;
                    console.log($scope.currentItem);
                    $scope.totalPage = Math.ceil($scope.currentItem.length / $scope.showCount);
                    $scope.page();
                });
            }else{
                $scope.data = {};
            }

        };
        /**
         * 返回上一步
         */
        $scope.threeBack = function(){
            $scope.activityStart=false;
            $scope.activityOne=false;
            $scope.activityTwo=true;
            $scope.activityThree=false;
        };

        var init=function(){
            //加载项目信息
            $scope.loadProject();
            //监测项目下拉框的变化
            $scope.$watch('currentProject',function(){
                $scope.loadBuilding();
            });
        };
        $scope.loadProject=function(){
            //获取所有项目信息
            $http.get(url+'/Project/listAllProject').success(function(data){
                $scope.allProjects=data.Project;
            });
        };
        //根据所选项目信息查询项目下的建筑信息
        $scope.loadBuilding=function(){
            if($scope.currentProject.projectId!=null) {
                $http.get(url + '/BuildingStructureNew/listAllBuildingStructureNewRest/' + $scope.currentProject.projectId).success(function (data) {
                    $scope.zNodes = [{}];
                    //获取json数据
                    $scope.buildingStructureNews = data.BuildingStructureNew;

                    var tasks = $scope.buildingStructureNews;
                    if (tasks != null) {
                        for (var i = 0; i < tasks.length; i++) {
                            $scope.zNode = {id: tasks[i].id, pId: tasks[i].parentId, name: tasks[i].nodeName,fullName:tasks[i].fullName};
                            $scope.zNodes.push($scope.zNode);
                        }
                        $.fn.zTree.init($("#buildingNewtreeDemo"), setting, $scope.zNodes);
                        var zTree = $.fn.zTree.getZTreeObj("buildingNewtreeDemo");
                        var nodes = zTree.getNodes();
                        nodes[0].name = "建筑信息";
                        zTree.updateNode(nodes[0]);
                    }
                }).error(function (data, status, headers, config) {
                    alert("建筑信息查询失败！")
                });
                $scope.currentJoinProject.projectName=$scope.currentProject.projectName;//得到项目的id
            }
        };

        /**
         * 查询所有的员工
         */
            //所有选择员工
        $scope.listAllStaff=function(){
            $http.get(url+'/staff/listAllStaffRestful').success(function(data){
                $scope.staff=data.Staff;
            });
        };

        //选中人员
        $scope.choicePerson=function(items){
            $scope.persons=items;
            $scope.btnIndex = items;
        };

        //获取选中的人员
        $scope.addInfo = function(){
            $scope.personone = $scope.persons;
            alert('获取负责人成功');
            $scope.currentJoinProject.staffId= $scope.personone.staffId;
        };

        //显示所选员工
        $scope.person = {};
        $scope.personAll=[];
        $scope.choice=function(item,index){
            $scope.person=item;
            $scope.personAll.push($scope.person);
            $scope.staff.splice(index,1);
        };
        $scope.personAlls = [];
        $scope.addInfoPerson = function(){
            alert('获取团队人员成功');
            for(var i=0;i<$scope.personAll.length;i++){
                $scope.personAlls.push($scope.personAll[i].staffId);
            }
            $scope.currentJoinProject.staffIds = $scope.personAlls;

        };
        init();

        $scope.fullData=function(id){
            console.log("点击的建筑id是"+id);
            $scope.acceptanceHouseRelation.buildingStructureId=id;
            $scope.currentJoinProject.ahrList.push($scope.acceptanceHouseRelation);
            $scope.acceptanceHouseRelation={ //得到所选的人员房子
                staffId:'',
                buildingStructureId:''
            };
        };

        $scope.personData=function(id){
            $scope.acceptanceHouseRelation.staffId=id;
            $scope.currentJoinProject.ahrList.push($scope.acceptanceHouseRelation);

        };

        /**
         * 分页查询物品包
         */
        var articleCheckFunction = function(page,callback){
            $scope.searchArticle.page=page;
            $http.post(url + '/Gift/listPageGift', {Gift:$scope.searchArticle}).success(callback);
        };
        $scope.articleChecks = app.get('Paginator').list(articleCheckFunction,5);

        /**
         * 添加一个物品
         */
        $scope.articleShow = false;
        $scope.items=[];           //物品包
        $scope.addRow=function() {
            var item = {};
            $scope.items.push(item);
        };
        /**
         * 新增保存物品包
         */
        $scope.article = {gift:{},houseArticles:[]};
        $scope.addArticleInfo=function(){
            $scope.article.houseArticles = $scope.items;
            console.log($scope.article.gift);
            $http.post(url + '/GiftArticle/insertGiftArticle',{GiftArticle:$scope.article}).success(function(){
                alert('新增物品成功！');
                console.log($scope.article);
            }).error(function(data, status, headers, config){
                alert('新增物品失败！');
            });
            $scope.articleChecks._load();
        };
        /**
         * 选中物品包显示所对应的物品
         */
        $scope.currentBuilding = {};    //选中的物品包
        $scope.articleData = {gift:{},houseArticles:[]};
        $scope.articleCheck = function(items){
            $scope.articleShow = true;
            $scope.currentBuilding = items;
            $scope.currentJoinProject.giftId = $scope.currentBuilding.giftId;
            $scope.btnIndex = items['giftId'];
            var gift={};
            gift = items;
            $scope.articleData.gift=gift;
            /**
             * 获取物品包里所有物品
             */
            $http.get(url+'/GiftArticle/getGiftArticlebyGiftId/'+ $scope.btnIndex).success(function(data){
                $scope.giftArticleCheck = data.GiftArticle;
            }).error(function(data,status,headers,config){
                alert('查询物品失败!');
            });
        };
        /**
         * 点击新增按钮
         */
        $scope.addItem = function(){
            $scope.articleShow = false;
            $scope.items=[];
            $scope.btnIndex = '';
        };
        /**
         * 点击修改按钮
         */
        $scope.updateItem = function(){
        };
        /**
         * 修改页面添加一个物品
         */
        $scope.addUpdateRow=function() {
            var item = {};
            $scope.giftArticleCheck.push(item);
        };
        /**
         * 修改保存物品包
         */
        $scope.updateArticleInfo = function(){
            var houseArticles=[];
            for(var i=0;i<$scope.giftArticleCheck.length;i++){
                houseArticles.push($scope.giftArticleCheck[i].houseArticle);
            }
            $scope.articleData.houseArticles = houseArticles;
            $http.put(url + '/GiftArticle/updateGiftArticle',{GiftArticle:$scope.articleData}).success(function(){
                alert('修改物品成功！');
                console.log($scope.articleData);
            }).error(function(data, status, headers, config){
                alert('修改物品失败！');
            });
        };
        /**
         * 新增保存入伙
         */
        $scope.currentJoinProject = {buildingStructureIds:[],staffIds:[]};
        $scope.addJoin = function(){
            $http.post(url + '/IntakeActivity/insertIntakeActivity',{IntakeActivity:$scope.currentJoinProject}).success(function(){
                alert('新增保存入伙成功！');
                console.log($scope.currentJoinProject);
            }).error(function(){
                alert('新增保存入伙失败！');
            });
        };

        /**
         * 前端分页查询
         * @type {number}
         */
        $scope.index=1;
        $scope.showCount=5;
        $scope.totalPage = 0;
        $scope.page=function(){
            $scope.data = [];
            if($scope.index!=$scope.totalPage){
                for(var i=(($scope.index-1)*$scope.showCount);i<($scope.index*$scope.showCount);i++){
                    $scope.data.push($scope.currentItem[i]);
                }
            }else{
                for(var i=(($scope.index-1)*$scope.showCount);i<$scope.currentItem.length;i++){
                    $scope.data.push($scope.currentItem[i]);
                }
            }
        };
        /**
         * 显示下一页
         */
        $scope.next=function(){
            if($scope.index==$scope.totalPage){
                alert('已经是末页');
            }else{
                $scope.index += 1;
                $scope.page();
            }
        };
        /**
         * 显示上一页
         */
        $scope.previous=function(){
            if($scope.index==1){
                alert('已经是首页');
            }else{
                $scope.index -= 1;
                $scope.page();
            }
        };
        /**
         * 显示当前页
         */
        $scope.go=function(index) {
            if(index>=1 && index<=$scope.totalPage) {
                $scope.totalPage=index;
            }
            $scope.page();
        };

    }]);
});