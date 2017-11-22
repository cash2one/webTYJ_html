/**
 * Created by NM on 2018/1/18.
 * 装修管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('addDecorationTaskCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$rootScope.url;
        $scope.ServiceRequest={};
        $scope.Tasks={};
        $scope.bslist={};       //建筑结构id集合
        $scope.compensateObject=[];
        $scope.compensateObjects={
            customerId:'',
            phoneNum:''
        };

        /**
         * 保存新增任务
         */
        $scope.submitDecoration = function(serverId){
            //$scope.Tasks.addressId=$rootScope.addressIdT;
            //$scope.Tasks.customerId=$rootScope.user.custId;
            //console.log($rootScope.user);
            //$scope.compensateObjects.customerId=$rootScope.user.custId;
            //$scope.compensateObjects.phoneNum=$rootScope.user.phoneNum;
            //$scope.compensateObject.push($scope.compensateObjects);
            //$scope.Tasks.compensateObject=$scope.compensateObject;
            //console.log($scope.Tasks.compensateObject);
            $scope.Tasks.addressId = $scope.addressId;
            if(serverId!=null){
                $http.post(url +'/Tasks/insertTasks',{Tasks:$scope.Tasks}).success(function(data) {
                    //alert("添加任务成功！");
                    console.log($scope.Tasks);
                    $location.path("/index/serviceRequest/decorationManagement/decorationInspectionManagement");
                }).error(function(data){
                    alert("服务器请求失败！");
                })
            }else{
                alert("服务ID不存在！不允许新建任务!");
            }
        };

        //绑定服务ID，地址ID，
        $scope.Tasks.serverId=$rootScope.serviceDecoration.serviceRequestId;
        /**
         * 取消新增装修页面
         */
        $scope.cancelDecoration = function(){
            $location.path("/index/serviceRequest/decorationManagement/decorationInspectionManagement");
        };

        //切换填写单
        var map = {"0":"divOne_1", "1":"divOne_1", "2":"divOne_1"};
        $(".s").bind("change", function(){
            var divId = map[this.value];
            $("#"+divId).show().siblings().hide();
        });

        //任务类型
        $scope.Datil= {
            taskType: [
                { id:'18',name:'装修核查任务' },
                { id:'4',name:'装修巡检任务' },
                { id:'5',name:'装修验收任务' }
            ]
        };

        //获取取负责人
        $scope.dutyPerson=[];
        $http.get(url+'/staff/listAllStaffRestful').success(function(data){
            $scope.dutyPerson=data.Staff;
        }).error(function(data,status,headers,config){
            alert("负责人信息查询失败！")
        });

        //查询所有建筑结构信息.
        $http.get(url+'/BuildingStructureNew/listAllBuildingStructureNewByAllIdOptimize/'+$scope.id).success(function(data){
            $scope.zNodes =[{}];
            //获取json数据
            $scope.buildingStructureNews = data.BuildingStructureNew;
            var tasks =  $scope.buildingStructureNews;
            if(tasks!=null){
                for(var i=0;i<tasks.length;i++){
                    $scope.zNode ={ id:tasks[i].id, pId:tasks[i].parentId, name:tasks[i].nodeName,fullname:tasks[i].fullName,checked:tasks[i].checked};
                    $scope.zNodes.push($scope.zNode);
                }
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);

                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
            }
        }).error(function(data,status,headers,config){
            alert("建筑信息查询失败！")
        });

        /**
         * 显示树状结构
         */
        //得到选中的数据
        var zTreeOnCheck=function(event, treeId, treeNode) {
            var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
            var nodes=treeObj.getCheckedNodes(true);
            $scope.treeResult={treeList:[]};
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].isParent==false) {
                    $scope.treeResult.treeList.push(nodes[i]);
                }
                if(nodes[i].check_Child_State == -1)
                {
                    $scope.addressId=nodes[i].id;
                    console.log($scope.addressId);
                }
            }
            console.log($scope.treeResult.treeList);
            $scope.bslist=$scope.treeResult.treeList;
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            $scope.addWaterCheck = $scope.treeResult.treeList;
            console.log($scope.addWaterCheck);
        };
        var setting = {
            check:{
                enable:true
            },
            view: {
                selectedMulti: false
            },
            edit: {
                enable: false,
                editNameSelectAll: false,
                showRemoveBtn: showRemoveBtn,
                showRenameBtn: showRenameBtn
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onCheck:zTreeOnCheck
            }
        };
        function onRename(e, treeId, treeNode, isCancel) {
            showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
        }
        function showRemoveBtn(treeId, treeNode) {
            return !treeNode.isFirstNode;
        }
        function showRenameBtn(treeId, treeNode) {
            return !treeNode.isLastNode;
        }
        function showLog(str) {
            if (!log) log = $("#log");
            log.append("<li class='"+className+"'>"+str+"</li>");
            if(log.children("li").length > 8) {
                log.get(0).removeChild(log.children("li")[0]);
            }
        }
        function getTime() {
            var now= new Date(),
                h=now.getHours(),
                m=now.getMinutes(),
                s=now.getSeconds(),
                ms=now.getMilliseconds();
            return (h+":"+m+":"+s+ " " +ms);
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
                var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
                return false;
            });
        };

        function selectAll() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
        }

        $(document).ready(function(){
            $("#selectAll").bind("click", selectAll);
        });

    }]);
});
