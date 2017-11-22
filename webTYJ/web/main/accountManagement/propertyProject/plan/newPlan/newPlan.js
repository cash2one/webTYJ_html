/**
 * Created by NM on 2018/1/18.
 * 物业项目计费模块
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('propertyNewPlansCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;

        $scope.currentEditIndex = null;
        $scope.currentBuilding={areaNew:[]};
        $scope.editArea=false;
        $scope.currentEditArea={};

        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);

        //获取收项目的信息列表
        $scope.ChargeItemNew = [];
        function chargeItemInit(){
            $http.get(url + "/ChargeItemNew/listChargeItemNewbyProjectId/" + $scope.project.projectId).success(function(data){
                $scope.ChargeItemNew = data.ChargeItemNew;
            }).error(function(){
                alert("获取收项目的信息列表失败!");
            });
        }

        //初始化
        chargeItemInit();

        //新增收费项目
        $scope.f_ChargeItem = {};
        //$scope.s_ChargeItem = [];
        $scope.addChargeItem = function(){

            //删除二级项目(项目修改功能)
            if(parseInt(del_arr.length)>0){
                $http.get(url + "/ChargeItemNew/deleteChargeItemParentsAndSon/" + del_arr.join(","));
                del_arr  = [];
            }

            $scope.f_ChargeItem.projectId = $scope.project.projectId;
            $scope.f_ChargeItem.chargeItemNewList = $scope.currentBuilding.areaNew;
            $http.post(url + "/ChargeItemNew/insertChargeItemNew",{ChargeItemNew:$scope.f_ChargeItem}).success(function(data){
                chargeItemInit();
                arr = [];
                alert("操作成功!");
            }).error(function(){
                alert("操作失败!");
            });
        }

        /**
         * 新增按钮事件
         */
        $scope.addItem=function(){
            $scope.editArea=true;
            $scope.currentEditIndex=null;
        };

        /**
         * 新增二级收费项目保存功能
         */
        $scope.addSave=function(){
            if($scope.currentEditIndex!=null){
                $scope.currentBuilding.areaNew[$scope.currentEditIndex]={
                    ciName:$scope.currentEditArea.ciName,
                    ciNum:$scope.currentEditArea.ciNum
                };
            }
            else{
                $scope.currentBuilding.areaNew.push({
                    ciName:$scope.currentEditArea.ciName,
                    ciNum:$scope.currentEditArea.ciNum
                });
            }
            $scope.currentEditArea={};
            $scope.editArea=false;
            //$scope.s_ChargeItem = $scope.currentBuilding.areaNew;
            //console.log($scope.s_ChargeItem);
        };

        /**
         *  复选框点击事件
         */
        var arr = [];
        $scope.getCheckBoxs = function(arg){
            var index = arr.indexOf(arg)
            if(index > -1){
                arr.splice(index,1);
            }else{
                arr.push(arg);
            }
            //console.log(arr);
        }

        /**
         * 删除功能
         */

        $scope.deleteChargeItem = function(){
            var checkNum = arr.length;
            if(parseInt(checkNum) < 1){
                alert("请选择一个项目删除!")
                return;
            }

            if(confirm("是否确定删除！")){
                $http.get(url + "/ChargeItemNew/deleteChargeItemParentsAndSon/"+arr.join(",")).success(function(data){
                    chargeItemInit();
                    arr = [];
                    alert(data.Info.info.$);
                }).error(function(){
                    alert("删除失败!");
                });
            }
        }


        /**
         *  修改按钮点击事件
         * @param index  行下标
         */
        $scope.updateItem=function(index){
            $scope.editArea=true;
            $scope.currentEditIndex=index;
            var current=$scope.currentBuilding.areaNew[index];
            $scope.currentEditArea={
                chargeItemType:current.chargeItemType,
                chargeItemArea:current.chargeItemArea,
                unitPrice:current.unitPrice,
                chargeUnit:current.chargeUnit
            };
        };


        /**
         * 修改保存
         * @param index 行下标
         */
        $scope.updateSave=function(index){
            $scope.tenementPact[index].editing=false;
        };

        /**
         * 取消
         * @param index 行下标
         */
        $scope.updateCancel=function(index){
            $scope.tenementPact[index]=$scope.cloneItem;
            $scope.tenementPact[index].editing=false;
        };

        /**
         * 删除数据
         * @param index 行下标
         */
        var del_arr = [];
        $scope.deleteItem=function(index){
            $scope._deleteChargeItem = $scope.currentBuilding.areaNew.splice(index,1);
            if($scope._deleteChargeItem[0].ciId != undefined){
                del_arr.push($scope._deleteChargeItem[0].ciId);
            }
            //console.log(del_arr.join(","));
        };

        /**
         * 新增取消
         */
        $scope.addCancel=function(){
            $scope.editArea=false;
        };

        /**
         * 点击编辑按钮的事件
         */
        $scope.editChargeItem = function(){

            var checkNum = arr.length;
            if(parseInt(checkNum)== 0){
                alert("请选择一个项目进行修改!");
                return;
            }

            if(parseInt(checkNum)>1){
                alert("请选择一个项目进行修改!");
                return;
            }

            $("#_addBtn").hide();


            $http.get(url + "/ChargeItemNew/getChargeItemNewById/" + arr[0]).success(function(data){
                $scope.f_ChargeItem = data.ChargeItemNew;
                $scope.f_ChargeItem.startDate = new Date(data.ChargeItemNew.startDate);
                $scope.f_ChargeItem.endDate = new Date(data.ChargeItemNew.endDate);
                $scope.f_ChargeItem.billingDate = new Date(data.ChargeItemNew.billingDate);

                if(angular.isObject($scope.f_ChargeItem)){
                    if(angular.isObject($scope.f_ChargeItem.chargeItemNewList)){
                        $scope.currentBuilding.areaNew.push($scope.f_ChargeItem.chargeItemNewList);
                    }
                    if(angular.isArray($scope.f_ChargeItem.chargeItemNewList)){
                        $scope.currentBuilding.areaNew = $scope.f_ChargeItem.chargeItemNewList;
                    }
                }

                $("#new").modal("show");
            }).error(function(){
                alert("获取数据失败！");
            });
        }



        $scope.show4 = true;
        $scope.show5 = false;
        $scope.show6 = false;

        /**
         * 显示新建二级收费项目
         */
        $scope.plan = function(temp){
            $scope.show4 = false;
            $scope.show5 = true;
            $scope.show6 = false;
            $scope.temp = temp;
            $http.get(url+ "/ChargeItemNew/getChargeItemNewbyciIdAndSchemeId/" + $scope.temp.ciId).success(function(data){
                $scope.addChargeItemNew_two = data.ChargeItemNew;
                //console.log($scope.addChargeItemNew_two);
            }).error(function(){
                alert("获取收费项目明细表信息失败!");
            });
        };

        /**
         * 根据二级收费项目获取公式和条件信息
         */
        $scope.newPlan = function(param){
            $scope.show4 = false;
            $scope.show5 = true;
            $scope.show6 = true;
            console.log(param);
            $http.get(url + "/Formula/getFormulaByciId/" + param.ciId ).success(function(data){
                $scope.Formula = data.Formula;
                console.log($scope.Formula);
            }).error(function(){
                alert("获取公式信息失败!");
            });
        };

        //清空
        $scope.clean = function(){
            $scope.f_ChargeItem = {};
        }

        //新增时清空记录
        $scope.addModal = function(){
            $scope.f_ChargeItem = {};
            $scope.currentBuilding.areaNew = [];
            $("#_addBtn").show();
        }

        $scope.addConditionList= [];//添加的条件集合
        $scope.addFormula = {};//添加的公式
        $scope._addCondition = {};//临时的条件对象


        //添加建筑结构id
        $scope.addBuildingIdListToDetails = function(){
            $scope.buildingids = [];
            $scope.buildingids = $scope.addWaterCheck;
            for(var i = 0; i < $scope.buildingids.length; i ++){
                $scope.buildingIdlist.push($scope.addWaterCheck[i].id);
            }
        };

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
                    $rootScope.addressIdT=nodes[i].id;
                    console.log($rootScope.addressIdT);
                }
            }
            console.log("treeList:" + $scope.treeResult.treeList);
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            $scope.addWaterCheck = $scope.treeResult.treeList;
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
                editNameSelectAll: false
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

        function selectAll() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
        }

        $(document).ready(function(){
            $("#selectAll").bind("click", selectAll);
        });

        $scope.backList = function(){
            $scope.show4 = true;
            $scope.show5 = false;
            $scope.show6 = false;
        }

        /**
         *
         */
        $scope.saveScheme = function(){
            $http.post(url + "/Scheme/insertSchemeNew",{Scheme:$scope.Scheme}).success(function(data){

            });
        };
    }]);
});