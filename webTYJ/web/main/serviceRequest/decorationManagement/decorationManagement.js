/**
 * Created by NM on 2018/1/18.
 * 装修服务请求详情
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('decorationManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$rootScope.url;
        $scope.show1=true;
        $scope.show2=false;
        $scope.decorate1=function(){
            $scope.show1=true;
            $scope.show2=false;
        };
        $scope.addDecorate1=function(){
            $scope.show1=false;
            $scope.show2=true
        };
        //查看任务
        $scope.Tasks={page:{}};

        //console.log(serviceRequest);
        $scope.Tasks.serverId = $rootScope.serviceDecoration.serviceRequestId;
        var fetchFunction1 = function (page, callback) {
            $scope.Tasks.page = page;
            $http.post(url + '/Tasks/listPageTasksbyServiceRequestId', {Tasks: $scope.Tasks}).success(callback)

        };

        $scope.searchPaginator = app.get('Paginator').list(fetchFunction1,6);
        console.log($scope.searchPaginator);

        /**
         * 任务全选按钮功能
         */
        $scope.isAllTasksChecked = false;//是否全选，默认否
        $scope.forChangeTasks = {tasksIds:[]};
        $scope.allTasksChecked = function(){
            $scope.forChangeTasks.tasksIds=[];
            $scope.isAllTasksChecked = true;
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

        //负责人信息
        $scope.Teamworkstaff = {page:{}};

        $scope.load1 = function(){
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);
            console.log($scope.searchPaginator2);
        };
        $scope.load1();

        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.accountRecord=item;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };

        $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
            console.log($scope.person)
        };
        //获取专业线
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!");
        });


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







        $scope.ServiceRequest = {};

        $scope.load = function(){
            $scope.serviceRequestType = 1;
            $http.get(url + '/ServiceRequest/getServiceRequestbyDecoration/' + $scope.serviceRequestType).success(function (data) {
                $scope.ServiceRequest = data.ServiceRequest;
            }).error(function (data, status, headers, config) {
                alert("查询失败！");
            });
        };


        //查看任务
        $scope.selectTasks = function (serviceRequest) {
            console.log(serviceRequest);
            if(serviceRequest!=null){
                $location.path("/index/serviceRequest/decorationManagement/decorationInspectionManagement");
                $rootScope.serviceDecoration=serviceRequest;
            }else{
                alert("无效的服务ID！");
            }
        };

        $scope.load();

        //业主装修修改状态
        $scope.bbb = {};
        $scope.managmentChange = function(serviceRequest){
            $scope.bbb = serviceRequest;
        }

        //业主装修关闭操作
        $scope.managmentClosed = function(){
            if($scope.bbb.serviceRequestState == 0){
                alert("服务请求已经是关闭状态!");
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                alert(data.Info.info.$);
                $scope.load();
            }).error(function(){
                alert("关闭操作失败，请稍后重试!")
                $scope.journal.remarks = "";
            });
        }

        //业主装修完成操作
        $scope.managmentFinish = function(){
            if($scope.bbb.serviceRequestState == 3){
                alert("服务请求已经是完成状态!");
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                alert(data.Info.info.$);
                $scope.load();
            }).error(function(){
                alert("完成操作失败，请稍后重试!")
                $scope.journal.remarks = "";
            });
        }
        $scope.changeTaskState = function(state){
            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
            }
        }

        $scope.changeTaskState = function(state){
            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                        $scope.loadTask();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.loadTask();
                $scope.isAllTasksChecked = false;
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
            }
        };
        //任务全部完成
        $scope.updateFinishs=function(){
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = 2;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                        $scope.loadTask();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;
                $scope.loadTask();
            }
        }
        //任务全部转出
        $scope.updateRollOuts=function(){
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = 5;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                        $scope.loadTask();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;
                $scope.loadTask();
            }
        }
        //任务全部转集中处理
        $scope.updateTaskss=function(){
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState =10;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                        $scope.loadTask();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;

            }
        }
        //任务全部转专项处理
        $scope.updateSpecials=function(){
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = 9;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                        $scope.loadTask();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;

            }
        }

    }]);
});
