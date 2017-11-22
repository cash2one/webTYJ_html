/**
 * Created by NM on 2018/1/18.
 * 装修申请展示页面
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('decorateShowCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.show4 = false;
        $scope.show5 = false;
        $scope.show6 = false;
        $scope.show7 = false;
        $scope.show8 = false;
        $scope.show9 = false;


        /**
         * 显示新建方案
         */
        $scope.chooseHouse = function(){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };

        /**
         * 显示新建方案
         */
        $scope.applicationData = function(){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.verification = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.payDeposit = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = true;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.Alicence = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = true;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.workProgress = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = true;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.addCheck = function(taskId){

            $http.get(url+'/RenovationInspectionOrders/getRenovationInspectionOrdersbyTypeAndTaskId/15/'+taskId).success(function(data){

                $scope.RenovationInspectionOrders=data.RenovationInspectionOrders;
                console.log("1111111122222")
                console.log($scope.RenovationInspectionOrders)
                console.log("11111111")
            }).error(function(data,status,headers,config){

            });
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = true;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.acceptance = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = true;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.costClearing = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = true;
        };
        var url = $rootScope.url;
        $http.get(url+'/Tasks/getTasksbyServiceRequestId/'+$rootScope.service.serviceRequestId).success(function(data){
            if(data){
                $scope.Tasks= data.Tasks;
                console.log(data);
                for(var i in $scope.Tasks){
                    console.log($scope.Tasks[i].buildingStructureNew.id);
                    //房屋信息详情
                    $http.get(url+'/HouseNew/listHouseByBuildingStructureId/'+ $scope.Tasks[i].buildingStructureNew.id).success(function(data){
                        $scope.house=  data.HouseNew;
                        console.log($scope.house);
                    }).error(function(data,status,headers,config){
                        alert("请求失败！");
                    });
                    //巡检任务信息详情
                    $http.get(url+'/Tasks/getTasksbyTaskTypeAndServiceId/4/'+$rootScope.service.serviceRequestId).success(function(data){
                        $scope.xunJian=data.Tasks;
                        console.log("巡检")
                        console.log(data)
                        console.log("巡检")
                        //for(var j in $scope.xunJian){
                        //    $http.get(url+'/RenovationInspectionOrders/getTasksbyTaskTypeAndServiceId/15/'+$scope.xunJian[j].taskId).success(function(data){
                        //
                        //        $scope.RenovationInspectionOrders=data.RenovationInspectionOrders;
                        //        console.log("巡检工单")
                        //        console.log($scope.RenovationInspectionOrders)
                        //        console.log("巡检工单")
                        //    }).error(function(data,status,headers,config){
                        //
                        //    });
                        //}

                    }).error(function(data,status,headers,config){

                    });

                    //核查任务
                    $http.get(url+'/Tasks/getTasksbyTaskTypeAndServiceId/18/'+$rootScope.service.serviceRequestId).success(function(data){

                        $scope.heCha=data.Tasks;
                        for(var j in $scope.heCha){
                            $http.get(url+'/RenovationCheckOrders/getRenovationCheckOrdersbyTypeAndTaskId/14/'+$scope.heCha[j].taskId).success(function(data){

                                $scope.RenovationCheckOrders=data.RenovationCheckOrders;
                                console.log("核查")
                                console.log($scope.RenovationCheckOrders)
                                console.log("核查")
                            }).error(function(data,status,headers,config){

                            });
                        }

                        console.log(data)
                    }).error(function(data,status,headers,config){

                    });
                    //验收任务
                    $http.get(url+'/Tasks/getTasksbyTaskTypeAndServiceId/5/'+$rootScope.service.serviceRequestId).success(function(data){

                        $scope.yanShou=data.Tasks;
                        for(var j in $scope.yanShou){
                            $http.get(url+'/RenovationAcceptanceOrders/getRenovationAcceptanceOrdersbyTypeAndTaskId/16/'+$scope.yanShou[j].taskId).success(function(data){

                                $scope.RenovationAcceptanceOrders=data.RenovationAcceptanceOrders;
                                console.log("验收")
                                console.log($scope.RenovationAcceptanceOrders)
                                console.log("验收")
                            }).error(function(data,status,headers,config){

                            });
                        }

                        console.log(data)
                    }).error(function(data,status,headers,config){

                    });

                }
            }else{
                alert("没有任务！")
            }
        }).error(function(data,status,headers,config){
            alert("服务器请求失败！");
        });

        //根据服务请求ID查询申请信息
        $http.get(url+'/OwnerRenovationApply/getOwnerRenovationApplyByServiceId/'+$rootScope.service.serviceRequestId).success(function(data){
            $scope.OwnerRenovationApply=  data.OwnerRenovationApply;
            console.log($scope.OwnerRenovationApply);
            //根据企业ID查询企业下员工信息
            $http.get(url + '/PersonCustNew/findEnterpriseCustByIdRestful/'+ $scope.OwnerRenovationApply.decorateAssociatedRecords.decorateId).success(function(data) {
                $scope.PersonCustNew = data.PersonCustNew;
                console.log($scope.PersonCustNew);

            }).error(function(data, status, headers, config) {
                //alert("人员信息获取失败");
            });
            //根据企业ID查询企业信息
            $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+$scope.OwnerRenovationApply.decorateAssociatedRecords.decorateId).success(function(data) {
                $scope.EnterpriseCustNew = data.EnterpriseCustNew;
                console.log($scope.EnterpriseCustNew);
            }).error(function(data, status, headers, config) {
                //alert("人员信息获取失败");
            });
            //根据客户ID查询客户信息
            $http.get(url + '/PersonCustNew/getPersonCustNewByIdRestful/'+ $scope.OwnerRenovationApply.decorateAssociatedRecords.headId).success(function(data) {
                $scope.personCustNew = data.PersonCustNew;
                console.log($scope.PersonCustNew);

            }).error(function(data, status, headers, config) {
                //alert("人员信息获取失败");
            });
            //根据申请id查询备案证
            $http.get(url + '/ConstructionRecordCard/getConstructionRecordCardbyApplyId/'+ $scope.OwnerRenovationApply.applyId).success(function(data) {
                $scope.ConstructionRecordCard = data.ConstructionRecordCard;
                console.log($scope.ConstructionRecordCard);




                $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+$scope.ConstructionRecordCard.propertyId).success(function(data) {
                    $scope.WuYe= data.EnterpriseCustNew;
                    console.log($scope.WuYe);
                }).error(function(data, status, headers, config) {
                    //alert("人员信息获取失败");
                });


            }).error(function(data, status, headers, config) {
                //alert("人员信息获取失败");
            });

            //获取人员信息
            $http.get(url + "/staff/listAllStaffRestful").success(function(data){
                $scope.staffs = data.Staff;
            }).error(function(data,status,headers,config){
                console.log("获取人员信息失败,请稍后重试!");
            });

        }).error(function(data,status,headers,config){
            alert("请求失败！");
        });


        //显示申请详情页
        $scope.nextPage=function(){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;

        }

    }]);
});