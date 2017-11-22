/**
 * Created by NM on 2018/1/18.
 * 物业项目计费模块
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('propertyDetailPlanCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;

        $scope.currentEditIndex = null;
        $scope.currentBuilding={areaNew:[]};
        $scope.editArea=false;
        $scope.currentEditArea={};

        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        console.log($scope.project);

        //获取项目方案列表
        $scope.schemes =[];
        $http.get(url + "/Scheme/getschemebyprojectid/"+$scope.project.projectId).success(function(data){
            $scope.schemes = data.Scheme;
            //console.log($scope.schemes);
        }).error(function(){
            alert("获取项目方案详情失败!");
        });

        var arr_schemeId = {};
        //获取方案明细列表
        $scope.schemeRelations=[];
        $scope.detail = function(schemeId){
            arr_schemeId = schemeId;
            $scope.show2 = true;
            $scope.show3 = true;
            $scope.schemeId=schemeId;
            schemeRelationDetail(schemeId)
        }

        function schemeRelationDetail(schemeId){
            $http.get(url + "/SchemeRelation/getSchemeRelationBySchemeId/"+schemeId).success(function(data){
                $scope.schemeRelations = data.SchemeRelation;
                //console.log(data);
            }).error(function(){
                alert("获取方案明细列表失败!")
            });
        }

        //获取收费项目明细表
        $scope.ChargeItemNew = {};
        $scope.detail1 = function(temp){
            $http.get(url+ "/ChargeItemNew/getChargeItemNewbyciIdAndSchemeId/" + temp.chargeItemId).success(function(data){
                $scope.ChargeItemNew = data.ChargeItemNew;
                console.log(data);
            }).error(function(){
                alert("获取收费项目明细表信息失败!");
            });
        }

        //获取公式和条件信息
        $scope.checkDetail2 = function(temp){
            $http.get(url + "/Formula/getFormulaByciId/"+temp.ciId).success(function(data){
                $scope.Formula = data.Formula;
            }).error(function(){
                alert("获取公式信息失败!");
            });

            //获取常量
            $http.get(url + "/Constant/getConstantBySchemeId/"+ $scope.schemeId).success(function(data){
                $scope.Constant = data.Constant;
            }).error(function(){
                alert("获取常量失败!");
            });
        }


        //复选框点击事件
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
            $http.post(url + "/ChargeItemNew/insertChargeItemNewAndRelation/"+arr_schemeId,{ChargeItemNew:$scope.f_ChargeItem}).success(function(data){
                $scope.detail(arr_schemeId);
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
         * 删除功能
         */

        $scope.deleteChargeItem = function(){
            var checkNum = arr.length;
            if(parseInt(checkNum) < 1){
                alert("请选择一个项目删除!")
                return;
            }

            if(confirm("是否确定删除！")){
                $http.get(url + "/SchemeRelation/deleteSchemeRelationBySchemeId/"+arr.join(",")+"/"+$scope.schemeId).success(function(data){
                    schemeRelationDetail($scope.schemeId);
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

            $("#_addBtn1").hide();


            $http.get(url + "/ChargeItemNew/getChargeItemNewById/" + arr[0]).success(function(data){
                $scope.currentBuilding.areaNew = [];
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


        //新增时清空记录
        $scope.addModal = function(){
            $scope.f_ChargeItem = {};
            $scope.currentBuilding.areaNew = [];
            $("#_addBtn1").show();
        }

        $scope.show2 = true;
        $scope.show3 = false;
        /**
         * 显示新建方案
         */
        $scope.programme = function(){
            $scope.show2 = true;
            $scope.show3 = false;

        };

        $scope.back = function(){
            $location.path("index/accountManagement/propertyProject");
        }

    }]);
});