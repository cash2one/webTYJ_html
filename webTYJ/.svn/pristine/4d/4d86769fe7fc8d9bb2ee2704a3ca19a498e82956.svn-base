/**
 * Created by NM on 2018/1/18.
 * 物业项目计费模块
 */

'use strict';

define(function (require) {
    var app = require('../../../../../../../app');

    app.controller('propertyDetailPlanCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.projectName=$scope.project.projectName;
        $scope.btnIndex =2;
        $scope.doClick = function(item){
            $scope.btnIndex = item;
        };
        $scope.scheme_show=true;
        $scope.chargeItemNew_show=true;
        /*$('#editScheme_show').modal('hide');*/
        $scope.schemes =[];
        var arr = [];

        /**
         * maogaofei 20160704
         * 查看收费项目列表
         * @param schemeId
         */
        $scope.viewChargeItemNewList = function(schemeId){
            $scope.SchemeIdIndex=schemeId;
            $scope.ChargeItemNewList={};
            $scope.ChargeItemNewInit={};
            $scope.ChargeItemNewInit.schemeId=schemeId;
            $http.post(url + "/ChargeItemNew/listAllChargeItemNew",{ChargeItemNew:$scope.ChargeItemNewInit}).success(function(data){
                $scope.ChargeItemNewList = data.ChargeItemNew;
            }).error(function(){
                layer.msg("获取方案明细列表失败!",{icon:2,time:1000});
            });
        }

        /**
         * maogaofei 20160704
         * 获取项目方案列表
         * @type {Array}
         */
        $scope.schemeListInit = function(){
            arr = [];
            $scope.schemes =[];
            $http.get(url + "/Scheme/getsmbyprojectid/"+$scope.project.projectId).success(function(data){
                $scope.schemes = data.Scheme;
                if($scope.schemes != null){
                    $scope.viewChargeItemNewList($scope.schemes[0].schemeId);
                }
            }).error(function(){
                layer.msg("获取项目方案列表失败!",{icon:2,time:1000});
            });
        }
        $scope.schemeListInit();

        /**
         * maogaofei 20160630
         * 显示收费项目详情列表
         */
        $scope.veiwChargeItemNewDatails = function(chargeItemNewId){
            $scope.ChargeItemNewIdIndex=chargeItemNewId;
            $scope.newScheme_show = false;
            $scope.newChargeItemDetails_show = true;
            $scope.NewChargeItemNewDetailsList={};
            $scope.NewChargeItemNewDetails={};
            $scope.NewChargeItemNewDetails.chargeItemNewId=chargeItemNewId;
            $http.post(url+ "/ChargeItemNewDetails/listAllChargeItemNewDetails",{ChargeItemNewDetails:$scope.NewChargeItemNewDetails}).success(function(data){
                $scope.NewChargeItemNewDetailsList = data.ChargeItemNewDetails;
                if($scope.NewChargeItemNewDetailsList != null){
                    $scope.viewFormulaList($scope.NewChargeItemNewDetailsList[0].chargeItemDetailsId);
                }
            }).error(function(){
                layer.msg("获取收费项目详情列表失败!",{icon:2,time:1000});
            })
        }
        /**
         * maogaofei 20160701
         * 显示公式列表
         */
        $scope.viewFormulaList = function(ciDetailsId){
            $scope.ChargeItemDetailsIdIndex = ciDetailsId;
            $scope.NewFormula={};
            $scope.NewFormula.chargeItemDetailsId=ciDetailsId;
            $http.post(url+ "/Formula/listAllFormula",{Formula:$scope.NewFormula}).success(function(data){
                $scope.NewFormulaList = data.Formula;
            }).error(function(){
                layer.msg("获取公式列表失败!",{icon:2,time:1000});
            })
        }

        /**
         * maogaofei 20160704
         * 查看收费项目使用范围
         * @param chargeItemNewId
         */
        $scope.viewRange = function(chargeItemNewId){
            $http.get(url+'/ChargeItemNew/getBuildingListByChargeItemNewId/'+chargeItemNewId).success(function(data){
                $scope.zNodes =[{}];
                //获取json数据
                $scope.buildingStructureNews = data.BuildingStructureNew;
                var tasks =  $scope.buildingStructureNews;
                if(tasks!=null){
                    for(var i=0;i<tasks.length;i++){
                        $scope.zNode ={ id:tasks[i].id, pId:tasks[i].parentId, name:tasks[i].nodeName,fullname:tasks[i].fullName};
                        $scope.zNodes.push($scope.zNode);
                    }
                    $.fn.zTree.init($("#viewRangetree"), setting, $scope.zNodes);

                    var zTree = $.fn.zTree.getZTreeObj("viewRangetree");
                    var nodes = zTree.getNodes();
                    nodes[0].name = "建筑信息";
                    zTree.updateNode(nodes[0]);
                }
            }).error(function(data,status,headers,config){
                layer.msg("建筑信息查询失败！",{icon:2,time:1000});
            });
        }

        /**
         * maogaofei 20160704
         * 复选框点击事件
         * @type {Array}
         */
        $scope.getCheckBoxs = function(arg){
            var index = arr.indexOf(arg)
            if(index > -1){
                arr.splice(index,1);
            }else{
                arr.push(arg);
            }
        }
        /**
         * maogaofei 20160704
         * 新建计费方案
         */
        $scope.addPlan = function () {
        	$location.path("/index/accountManagement/productAndProperty/product/propertyProject/plan/newPlan");
        }
        $scope.EditScheme={};
        /**
         * maogaofei 20160705
         * 编辑计费方案
         */
        $scope.editPlan = function () {
            $scope.EditScheme={};
            var checkNum = arr.length;
            if(parseInt(checkNum) != 1){
                layer.msg("请选择一个项目!",{icon:0,time:1000});
                return;
            }
            $http.get(url+"/Scheme/showSchemeById/"+arr).success(function(data){
                $scope.EditScheme=data.Scheme;
                if("02" == $scope.EditScheme.status){
                    layer.msg("已失效方案不能编辑!",{icon:0,time:2000});
                    return;
                }
                angular.element('#editScheme_show').modal('show');
            }).error(function(){
                layer.msg("操作失败",{icon:2,time:2000});
            });
        }
        /**
         * maogaofei 20160705
         * 保存编辑的计费方案
         */
        $scope.saveEditScheme = function () {
            var rightTime = app.get('valueCheck').isNotRightSchemeTime($scope.EditScheme.startDate,$scope.EditScheme.endDate)
            if(!rightTime.state){
                layer.msg(rightTime.info,{icon: 0,time:2000});
                return;
            }
            $http.post(url+"/Scheme/updateSchemeEndDate",{Scheme:$scope.EditScheme}).success(function(data){
                layer.msg("保存成功",{icon: 1,time:2000});
                angular.element('#editScheme_show').modal('hide');
                $scope.schemeListInit();
            }).error(function(){
                layer.msg("保存失败",{icon:2,time:2000});
            });
        }
        /**
         * maogaofei 20160705
         * 编辑方案模态框的关闭
         */
        $scope.clean = function () {
            $scope.EditScheme={};
        }

        /**
         * maogaofei 20160704
         * 批量失效计费方案
         */
        $scope.deletePlan = function () {
        	 var checkNum = arr.length;
             if(parseInt(checkNum) < 1){
                 layer.msg("请选择项目!",{icon:0,time:1000});
                 return;
             }
             layer.confirm('确定要使记录失效？', {
                 btn: ['确定','取消'] //按钮
             }, function(){
                 $http.get(url + "/Scheme/updateScheme/"+arr.join(",")).success(function(data){
                     if(angular.equals(data.code,'200')){
                         layer.msg(data.information,{icon:1,time:1000});
                         $scope.schemeListInit();
                     }else if(angular.equals(data.code,'3001')){
                         layer.msg(data.information,{icon:0,time:1000});
                     }
                 }).error(function(){
                     layer.msg("操作失败!",{icon:2,time:1000});
                 });
             }, function(){
            	 
             });
        }

    }]);
});