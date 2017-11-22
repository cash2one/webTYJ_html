/**
 * Created by NM on 2018/1/18.
 * 房屋初验js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('houseNewCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;  //全局访问路径
        $scope.houseStart=true;
        $scope.houseOne=false;
        $scope.houseEnd=false;
        $scope.allProjects={};              //所有项目信息
        $scope.currentProject={};           //当前所选项目
        $scope.chooseData=[];               //选中节点数据
        $scope.acceptanceHouse={
            startDate:'',    //验房开始时间
            endDate:'',       //验房结束时间
            personInCharge:'', //验房负责人
            projectId:'',       // 项目
            acceptanceType:'验房类型',
            ahrList:[]    //人和建筑关系
        };
        $scope.acceptanceHouseRelation={ //得到所选的人员房子
            staffId:'',
            buildingStructureId:'',
            staffName:''
        };
        $scope.serviceRequest={       //服务请求对象
            directionType:0,//服务请求类型（内部服务请求，外部服务请求）
            serviceRequestType:3,    //服务请求类型(判断报事类型)
            writerId:'',      //创建人id(登录人id)
            serviceRequestName:'',//服务请求名称
            requestSource:'验房', //服务请求来源
            listTasks:[]            //任务对象集合
        };
        $scope.personone = {};//负责人对象
        $scope.testArray = [];      //临时存放团队成员
        $scope.personAll=[];         //所有选择员工

        /****  修改选择员工的方法，增加分页，判断是否有负责人来查询不同的数据  王洲 2015.12.22  start ****/
        $scope.staff = {page:{}};   //分页参数
        $scope.members = {page:{}};
        $scope.isHasManage = '';     //判断是否存在负责人，false无负责人，true有负责人，选中负责人时将负责人id存入$scope.staff.staffId
        var searchStaff = function(page, callback){
            $scope.staff.page = page;
            $http.post(url + '/staff/listPageStaffRestful',{Staff : $scope.staff}).success(callback);
        };
        $scope.getPageStaff = app.get('Paginator').list(searchStaff, 5);
        /****  修改选择员工的方法，增加分页，判断是否有负责人来查询不同的数据  王洲 2015.12.22  end ****/

        $scope.speciatyList = [];   //初始化专业线数组

        /**
         *  增加查询专业线方法，将专业线作为员工的岗位查询条件
         *  王洲
         *  2015.12.25
         */
        $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoRestful').success(function(data){
            if(angular.isDefined(data.SpecialtyInfo)){
                if(angular.isArray(data.SpecialtyInfo)){
                    $scope.speciatyList = data.SpecialtyInfo;
                }else{
                    $scope.speciatyList.push(data.SpecialtyInfo);
                }
            }
        }).error(function(data){
            layer.alert('岗位信息查询出错，请重试！',{icon : 0});
        });

        /**
         * 选择负责人时触发方法，将isHasManage的值置为true
         * 王洲
         * 2015.12.24
         */
        $scope.openLeader = function(){
            $("#chooseStaff").modal("show");
            $scope.isHasManage = 'manage';
        };

        /**
         * 选择成员时触发方法，将isHasManage的值置为false
         * 王洲
         * 2015.12.24
         */
        $scope.openMember = function(){
            $("#chooseStaff").modal("show");
            $scope.isHasManage = 'member';
        };

        /**
         * 根据isHasManage的值，改变选中效果，负责人单选，成员多选
         * 王洲
         * 2015.12.24
         * @param items
         * @returns {boolean}
         */
        $scope.chocieCss=function(items){

            if($scope.isHasManage == 'manage'){
                if($scope.personone.staffId == items.staffId){
                    return true;
                }else{
                    return false;
                }
            }else{
                if($scope.testArray.length==0){
                    return false;
                }
                var j=0;
                for(var i=0;i<$scope.testArray.length;i++){
                    if($scope.testArray[i].staffId==items.staffId){
                        j=1;
                    }
                }
                if(j==1){
                    return true;
                }else{
                    return false;
                }
            }
        };

        /**
         * 选择员工，并放入对应的对象或数组，负责人放入personone对象，成员放入personAll数组
         * @param items
         */
        $scope.choiceStaff = function(items){
            if($scope.isHasManage == 'manage'){
                if($scope.personone.staffId == items.staffId){
                    $scope.personone = {};
                }else{
                    $scope.personone = items;
                    if($scope.personAll.length > 0){
                        for(var i = 0; i < $scope.personAll.length; i++){
                            if($scope.personAll[i].staffId == items.staffId){
                                $scope.personAll.splice(i, 1);
                            }
                        }
                    }
                }
            }else{
                if($scope.testArray.length == 0){
                    $scope.testArray.push(items);
                    if($scope.personone.staffId == items.staffId){
                        $scope.personone = {};
                    }
                }else{
                    var j = 0;
                    for ( var i = 0; i < $scope.testArray.length; i++) {
                        if ($scope.testArray[i].staffId == items.staffId) {
                            $scope.testArray.splice(i, 1);
                            j++;
                        }
                    }
                    if(j == 0){
                        $scope.testArray.push(items);
                        if($scope.personone.staffId == items.staffId){
                            $scope.personone = {};
                        }
                    }
                }
            }
        };

        /**
         * 确认负责人后重新查询员工
         * 王洲
         * 2015.12.24
         */
        $scope.addLeader = function(){
            if($scope.isHasManage == 'manage'){
                $scope.staff.postId = '';   //选择负责人后查询员工时初始化查询方法    王洲  2015.12.28
                $scope.staff.staffName = '';
                $scope.staff.staffNumber = '';
                $scope.getPageStaff._load();
            }else{
                $scope.personAll = $scope.testArray;
            }
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
            var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
            $http.get(url+'/Project/listAllProject/'+userCook.companyId).success(function(data){
                $scope.allProjects=data.Project;
            });
        };

        //根据所选项目信息查询项目下的建筑信息
        $scope.loadBuilding=function(){
            if($scope.currentProject.projectId!=null) {
                $scope.acceptanceHouse.projectId=$scope.currentProject.projectId;//得到项目的id
                $http.get(url + '/BuildingStructureNew/listAllBuildingStructureNewRest/' + $scope.currentProject.projectId).success(function (data) {
                    $scope.zNodes = [{}];                    //获取json数据
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
            }
        };

        //初始化
        init();

        /**
         *判断结束时间不能小于开始时间
         * 王洲
         * 2015.12.22
         */
        $scope.cheakTime = function(){
            var startTime = $scope.acceptanceHouse.startDate;
            var endTime = $scope.acceptanceHouse.endDate;
            if(startTime > endTime){
                layer.msg('结束时间不能早于开始时间！',{icon : 0,time : 1000});
                $scope.acceptanceHouse.endDate = '';
            }
        };

        /**
         * 修改选择人员后点击下一步方法，增加判断，只有当时间、负责人、成员都有数据时，才能进行下一步操作
         * 王洲
         * 2015.12.24
         */
        $scope.goOne=function(){
            if($scope.acceptanceHouse.startDate == '' || $scope.acceptanceHouse.endDate == ''){
                layer.alert('开始时间和结束时间不能为空！',{icon : 0});
                return;
            }
            if(angular.isUndefined($scope.personone.staffId)){
                layer.alert('请先选择负责人！',{icon : 0});
                return;
            }
            if($scope.personAll.length == 0){
                layer.alert('必须至少有一名团队成员！',{icon : 0});
                return;
            }
            $scope.houseStart = false;
            $scope.houseOne = true;
        };

        /**
         * 修改选择建筑后的方法，必须要选择建筑才能下一步
         * 王洲
         * 2015.12.24
         */
        $scope.goTwo = function() {
            if($scope.currentProject.projectId == null){
                layer.alert('请先选择建筑！',{icon : 0});
                return;
            }
            //获取选择节点的建筑id
            if($.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true).length>0){
                var nodes = $.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true);
                $scope.chooseData=[];
                for(var i=0;i<nodes.length;i++){
                    var isNode = nodes[i];
                   if(isNode.name=='建筑信息'){

                   }else{
                       $scope.chooseData.push(isNode);
                   }


                    //得到所选节点的全名
                    //if(isNode.check_Child_State<0){  注释只获取子节点的判断

                    //}
                };
                console.log($scope.chooseData);
                $scope.houseStart=false;
                $scope.houseOne=false;
                $scope.houseEnd=true;
            }else{
                layer.alert('请选择建筑！',{icon : 0});
            }

        };

        //上一步
        $scope.goBack=function(){
            $scope.houseStart=true;
            $scope.houseOne=false;
        };

        //上一步
        $scope.goBack1=function(){
            $scope.houseStart=false;
            $scope.houseOne=true;
            $scope.houseEnd=false;
        };


        //得到人员id和姓名
        /**
         * 修改方法，增加传入buildingstructureid，增加点击或取消时数组的数据变化
         * 王洲
         * 2015.12.30
         * @param bid
         * @param id
         * @param name
         */
        $scope.test1=function(bid,id,name){
            $scope.acceptanceHouseRelation={ //得到所选的人员房子
                staffId:'',
                buildingStructureId:''
            };

            var tab = document.getElementById("tab");
            var td=event.srcElement;
            if(td.innerHTML!=""){
                $scope.acceptanceHouseRelation.staffId=id;  //验房人员id
                $scope.acceptanceHouseRelation.buildingStructureId=bid;//验房关联建筑结构id
                $scope.acceptanceHouse.ahrList.push($scope.acceptanceHouseRelation);
            }else{
                var temp = [];
                temp = $scope.acceptanceHouse.ahrList;
                $scope.acceptanceHouse.ahrList = [];
                for(var i = 0,len = temp.length; i < len; i++){
                    if(temp[i].buildingStructureId == bid && temp[i].staffId == id){
                        //not to do
                    }else{
                        $scope.acceptanceHouse.ahrList.push(temp[i]);
                    }
                }
            }
        };

        /**
         * 修改保存方法，给出绑定建筑与人员的提示，成功后返回到列表页面
         * 王洲
         * 2015.12.30
         */
        $scope.save=function(){
            $scope.acceptanceHouse.personInCharge = $scope.personone.staffId;
            $scope.acceptanceHouse.personInChargeName = $scope.personone.staffName;
            if($scope.acceptanceHouse.ahrList.length < $scope.chooseData.length){
                layer.msg('每栋建筑都必须指定一名员工！',{icon : 0,time : 1000});
                return;
            }
            for(var i = 0,len = $scope.chooseData.length; i < len; i++){
                var num = 0;
                for(var j = 0,lens = $scope.acceptanceHouse.ahrList.length; j < lens; j++){
                    if($scope.chooseData[i].id == $scope.acceptanceHouse.ahrList[j].buildingStructureId){
                        num++;
                    }
                }
                if(num != 1){
                    layer.msg('每栋建筑只能指定一名员工！',{icon : 0,time : 1000});
                    return;
                }
            }
            $scope.membertoadd = [];
            for(var k = 0,lk = $scope.personAll.length; k < lk; k++){
                var staffnum = 0;
                for(var l = 0,ll = $scope.acceptanceHouse.ahrList.length; l < ll; l++){
                    if($scope.personAll[k].staffId == $scope.acceptanceHouse.ahrList[l].staffId){
                        staffnum++;
                    }
                }
                if(staffnum == 0){
                    $scope.membertoadd.push($scope.personAll[k]);
                }
            }
            for(var n = 0,ln = $scope.membertoadd.length; n < ln; n++){
                $scope.acceptanceHouseRelation={staffId:''};
                $scope.acceptanceHouseRelation.staffId = $scope.membertoadd[n].staffId;
                $scope.acceptanceHouse.ahrList.push($scope.acceptanceHouseRelation);
            }
            var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
           $scope.acceptanceHouse.issuer=userCook.userId
            $http.post(url+'/AcceptanceHouse/insertAcceptanceHouse',{AcceptanceHouse:$scope.acceptanceHouse}).success(function()
            {
                layer.msg('添加成功！',{icon : 1,time : 1000});
                $location.path("/index/businessManagement/housingManagement/houseList");
            }).error(function(data, status, headers, config){
                layer.msg('添加失败！',{icon : 2,time : 1000});
            }) ;
        };

    }]);
});