/**
 * Created by NM on 2018/1/18.
 * 服务请求js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('decorationInspectionManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1 = true;
        $scope.show3 = false;
        $scope.show4 = false;
        $scope.show5 = false;
        $scope.show6 = false;
        $scope.recordCheck = false;
        var url = $rootScope.url;         //url地址
        $scope.ServiceRequest={};

        $http.get(url+'/Tasks/getTasksbyServiceRequestId/'+$rootScope.serviceDecoration.serviceRequestId).success(function(data){
            if(data){
                $scope.Tasks= data.Tasks;
                console.log(data);
            }else{
                alert("没有任务！")
            }
        }).error(function(data,status,headers,config){
            alert("服务器请求失败！");
        });

        //添加任务事件
        $scope.addTasks=function(serviceRequestId){
            console.log(serviceRequestId);
            $location.path("/index/serviceRequest/decorationManagement/addDecorationTask/"+serviceRequestId);
        };

        //传任务ID给工单页面
        $scope.taskDetailsId=function(items){
            $scope.currentCheck = items;
            console.log($scope.currentCheck.taskId);
            if($scope.currentCheck.taskType == 18){
                $location.path("/index/serviceRequest/decorationManagement/decorationWork/"+$scope.currentCheck.taskId).search({decorationWorkId:$scope.currentCheck.taskId});
            }else if($scope.currentCheck.taskType == 4){
                $location.path("/index/serviceRequest/decorationManagement/inspectionOrders/"+$scope.currentCheck.taskId).search({decorationWorkId:$scope.currentCheck.taskId});
            }else if($scope.currentCheck.taskType == 5){
                $location.path("/index/serviceRequest/decorationManagement/acceptanceOrders/"+$scope.currentCheck.taskId).search({decorationWorkId:$scope.currentCheck.taskId});
            }
        };


        //获取专项信息
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            console.log ("获取专项信息失败,请稍后重试!");
        });

        //获取集中处理项信息
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjects").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            console.log("获取集中处理信息失败,请稍后重试!");
        });

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            console.log("获取人员信息失败,请稍后重试!");
        });

        $scope.aaa={};

        //修改状态
        $scope.change = function(maintain){
            $scope.aaa=maintain;
        }

        //集中处理
        $scope.updateTasks=function(){
            if($scope.aaa.taskState == 10){
                alert("任务已经是集中处理状态!");
                return;
            }
            $scope.aaa.taskState=10;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                alert("任务转集中处理成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务转集中处理失败,请稍后重试！");
            })
        };
        //转专项处理
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                alert("任务已经是转专项状态!");
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                alert("任务转专项成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                console.log(data);
                alert("任务转专项失败,请稍后重试!");
            })
        };

        //转出处理
        $scope.updateRollOut=function(){
            if($scope.aaa.taskState == 5){
                alert("任务已经是转出状态!");
                return;
            }
            $scope.aaa.taskState=5;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                alert("任务成功转出!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务转出操作失败,请稍后重试!");
            })
        };
        //接受
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
                alert("任务已经是接受状态！");
                return;
            }
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                alert("任务已经接受");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务接受失败，请稍后重试!");
            })
        };
        //关闭
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                alert("任务已经是关闭状态!");
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                alert("任务关闭操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务关闭失败,请稍后重试!");
            })
        };

        //指派
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                alert("任务已经是指派状态!");
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                alert("任务指派成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务指派失败，请稍后重试!");
            })
        };

        //完成操作
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                alert("任务已经是完成状态!");
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                alert("任务完成操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务完成失败,请稍后重试!");
            })
        };
        $scope.UrgeTaskRecords={};
        //催促操作
        $scope.urgeTask=function(){
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                alert("催促操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("催促操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
        };

        $scope.ApplicationDelayRecords = {};
        //延时操作
        $scope.delayTask=function(){
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                alert("延时操作成功");
                $scope.aaa.remarks = "";
                console.log(data)
            }).error(function(data,status,headers,config){
                alert("延时操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
        };

        /**
         * 核查任务明细页面
         */
        $scope.checkOut = function(){
            $scope.show1 = false;
            $scope.show3 = true;
            $scope.recordCheck = true;
            $scope.show5 = true;
        };

        /**
         * 保存核查任务
         */
        $scope.submitCheck = function(){
            $scope.show1 = true;
            $scope.show3 = false;
            $scope.recordCheck = false;
            $scope.show5 = false;
        };

        /**
         * 取消核查任务
         */
        $scope.cancelCheck = function(){
            $scope.show1 = true;
            $scope.show3 = false;
            $scope.recordCheck = false;
            $scope.show5 = false;
        };

        /**
         * 巡检任务明细页面
         */
        $scope.checkInspection = function(){
            $scope.show1 = false;
            $scope.show4 = true;
            $scope.recordCheck = true;
            $scope.show7 = true;
        };

        /**
         * 保存巡检任务
         */
        $scope.submitInspection = function(){
            $scope.show1 = true;
            $scope.show4 = false;
            $scope.recordCheck = false;
            $scope.show7 = false;
        };

        /**
         * 取消巡检任务
         */
        $scope.cancelInspection = function(){
            $scope.show1 = true;
            $scope.show4 = false;
            $scope.recordCheck = false;
            $scope.show7 = false;
        };

        /**
         * 巡检任务明细页面
         */
        $scope.checkAccept = function(){
            $scope.show1 = false;
            $scope.show6 = true;
            $scope.recordCheck = true;
            $scope.show8 = true;
        };

        /**
         * 保存巡检任务
         */
        $scope.submitAccept = function(){
            $scope.show1 = true;
            $scope.show6 = false;
            $scope.recordCheck = false;
            $scope.show8 = false;
        };

        /**
         * 取消巡检任务
         */
        $scope.cancelAccept = function(){
            $scope.show1 = true;
            $scope.show6 = false;
            $scope.recordCheck = false;
            $scope.show8 = false;
        };

    }]);
});