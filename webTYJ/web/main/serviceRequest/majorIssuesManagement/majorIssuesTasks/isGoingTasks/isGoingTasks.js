/**
 * Created by NM on 2018/1/18.
 * 重大事项管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('isGoingTaskCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.id=sessionStorage.getItem("data1");
        $scope.tasks={serverId:'',page:{}};
        $scope.tasks.serverId=$scope.id;//关联服务请求id
        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.tasks.page = page;
                $http.post(url + '/Tasks/listPageGetTasksbyServiceRequestId', {Tasks: $scope.tasks}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        };
        $scope.load();

        /********操作开始******************************/
        /**
         * 任务全选按钮功能
         */
        $scope.isAllChecked = false;//是否全选，默认否
        $scope.forChangeTasks = {tasksIds:[]};
        $scope.allTasksChecked = function(){
            $scope.forChangeTasks.tasksIds=[];
            $scope.isAllChecked = true;
            var items = $scope.searchPaginator.object.tasks;
            if(items != null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].taskId != null){
                        $scope.forChangeTasks.tasksIds.push(items[i].taskId);
                    }
                }
            }
            console.log($scope.forChangeTasks.tasksIds);
        }
        /**
         * 获取单个任务
         */
            // 集中处理项
        $scope.account1=function(){
            if($scope.isAllChecked){
                $("#concentrated").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };
        //转专项
        $scope.account2=function(){
            if($scope.isAllChecked){
                $("#turn").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };

        //转出
        $scope.account3=function(){
            if($scope.isAllChecked){
                $("#free").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };

        //完成
        $scope.account4=function(){
            if($scope.isAllChecked){
                $("#finish").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };

        //失效
        $scope.account5=function(){
            if($scope.isAllChecked){
                $("#close").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };
        //合并
        $scope.account6=function(){
            if($scope.isAllChecked){
                $("#new1").modal("show");
            }else{
                layer.alert('请先全选!',{icon : 0});
            }
        };

        //新建
        $scope.newT=function(){
            $location.path("/index/serviceRequest/majorIssuesManagement/majorIssuesTasks/newTasks");

        };

        //传任务ID给工单页面
        $scope.taskDetailsId=function(items){
            $scope.currentCheck = items;
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
            layer.alert('获取专项信息失败,请稍后重试!',{icon : 0});
        });

        //获取集中处理项信息
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjects").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            layer.alert('获取集中处理信息失败,请稍后重试！',{icon : 0});
        });

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            layer.alert('获取人员信息失败,请稍后重试！',{icon : 0});
        });

        //修改状态--得到操作的对象
        $scope.aaa={};
        $scope.change = function(maintain){
            $scope.aaa=maintain;
        }

        //校验是否能够操作
        var flag=0;
        $scope.checkData=function(data_info){
            flag=0;
            if(data_info.taskState == 3){
                layer.alert("任务已经是接受状态！",{icon : 0});
                flag=1;
                return;
            }else if(data_info.taskState == 0){
                layer.alert("任务为失效状态,不可操作！",{icon : 0});
                flag=1;
                return;
            }else if(data_info.taskState == 2){
                layer.alert("任务为完成状态,不可操作！",{icon : 0});
                flag=1;
                return;
            }
        };

        //对单独的任务进行操作
        $scope.toUpadteState=function(){
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务接受成功",{icon : 1,time : 2000});
                $scope.load();
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg("任务接受失败，请稍后重试",{icon : 3,time : 2000});
            })
        };

        //对全选的任务进行操作
        $scope.toAllUpdate=function(){
            $scope.forChangeTasks.taskState = data_info.taskState;
            $scope.forChangeTasks.remarks = $scope.aaa.remarks;
            $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                .success(function(data){
                    console.log(data);
                    $scope.load();
                })
                .error(function(){
                    layer.alert('操作失败，请稍后重试',{icon : 0});
                });
            $scope.isAllChecked = false;
            $scope.aaa.remarks = "";
        };
        //集中处理
        $scope.updateTasks=function(data_info){
            if($scope.isAllChecked){
                $scope.toAllUpdate();
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 10;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };
        //转专项处理
        $scope.updateSpecial=function(data_info){
            if($scope.isAllChecked){
                $scope.toAllUpdate();
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 9;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };

        //转出处理
        $scope.updateRollOut=function(data_info){
            if($scope.isAllChecked){
                $scope.toAllUpdate();
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 5;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };
        //接受
        $scope.updateAccept=function(data_info){
            if($scope.isAllChecked){
                $scope.toAllUpdate();
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 3;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };
        //关闭
        $scope.updateClosed=function(data_info){
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = data_info.taskState;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.load();
                    }).error(function(){
                        layer.alert('操作失败，请稍后重试',{icon : 0});
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 0;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };

        //指派
        $scope.updateAssign=function(data_info){
            if($scope.isAllChecked){
                $scope.toAllUpdate();
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState = 11;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };

        //完成操作
        $scope.updateFinish=function(data_info){
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = data_info.taskState;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        $scope.load();
                    })
                    .error(function(){
                        layer.alert("操作失败，请稍后重试",{icon : 0});
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                $scope.checkData(data_info);
                if(flag!=0)
                    return;
                $scope.aaa =data_info;
                $scope.aaa.taskState =2;
                $scope.toUpadteState();
            }
            $scope.aaa={};
        };

        //催促操作
        $scope.UrgeTaskRecords={};
        $scope.urgeTask=function(state){
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                layer.msg('催促操作成功',{icon : 3,time : 2000});
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                layer.msg('催促操作失败,请稍后重试',{icon : 3,time : 2000});
                $scope.aaa.remarks = "";
            })
        };

        //延时操作
        $scope.ApplicationDelayRecords = {};
        $scope.delayTask=function(state){
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){

                layer.msg('延时操作成功',{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.load();
                console.log(data)
            }).error(function(data,status,headers,config){
                layer.msg('延时操作失败,请稍后重试',{icon : 3,time : 2000});
                $scope.aaa.remarks = "";
            })
        };

        //负责人模态框
        $scope.addPerson=function(){
            $('#newPerson').modal('show');
            //负责人信息
            $scope.Teamworkstaff = {page:{}};
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)
            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);

            //获取专业线
            $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
                $scope.SpecialtyInfo = data.SpecialtyInfo;
            }).error(function(data,status,headers,config){
                layer.alert('获取信息失败,请稍后重试',{icon : 0});
            });
        }


        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            $scope.chooseData={};//得到选择的人员
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.chooseData=item;
                    $scope.d=true;
                    $scope.btnIndex=item.staffId;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };
        //保存负责人到页面
        $scope.savePerson=function(){
            if($scope.chooseData!=null){
                $scope.aaa.principal= $scope.chooseData.staffId;
                $scope.aaa.staff.staffName= $scope.chooseData.staffName;
            }
        };
        //将负责人信息取消
        $scope.canclePerson=function(){
            $scope.chooseData={};
        };

        /********操作结束*****************************/

    }]);
});