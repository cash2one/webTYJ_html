/**
 * Created by NM on 2018/1/18.
 * 向业主索赔服务请求管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('claimToOwnerSRCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.claimToOwnerSR={page:{}};//水表抄表服务请求
        $scope.task={page:{}};//任务

        $scope.show1=true;
        $scope.show2=false;
        $scope.show3=false;
        $scope.show4=false;
        $scope.show5=false;
        $scope.datils1=false;
        $scope.tasks1=false;
        $scope.addService1=false;
        $scope.addDatils1=false;
        $scope.showAddTask=false;
        $scope.btnIndex = 1;  //默认显示服务请求
        $scope.service=function(index){
            $scope.btnIndex = index;
            $scope.show1=true;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;

        };

        $scope.datils=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
            $scope.datils1=true;
        };
        $scope.tasks=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=true;
            $scope.show4=false;
            $scope.show5=false;
        };
        $scope.addService=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=true;
            $scope.show5=false;
            $scope.addService1=true;
        };
        $scope.addDatils=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=true;
            $scope.showAddTask=true;
            $scope.addDatils1=true;
        };

        /**
         * 获取服务请求
         */
        var load = function(){
            var parent = function (page, callback) {
                $scope.claimToOwnerSR.page = page;
                $scope.claimToOwnerSR.serviceRequestType = 8;
                $http.post(url + '/ServiceRequest/listPageServiceRequestByType', {ServiceRequest: $scope.claimToOwnerSR}).success(callback);
            };
            $scope.currentClaimToOwnerSR = app.get('Paginator').list(parent,6);
            //console.log($scope.currentClaimToOwnerSR);
        }
        load();//加载

        /**
         * 服务请求全选按钮功能
         */
        $scope.isAllChecked=false;//判断是否全选,默认否
        $scope.forChangeSR = {serviceRequestIds:[]};
        $scope.allChecked = function(){
            layer.msg("全选成功",{icon:1,time:1000});
            /*     $scope.checked=[];*/
            //console.log($scope.currentMeterReadingSR);
            $scope.forChangeSR.serviceRequestIds=[];
            $scope.isAllChecked = true;
            var items = $scope.currentClaimToOwnerSR.object.serviceRequests;
            if(items!=null && items.length>0){
                // var btns;
                for(var i=0;i<items.length;i++){
                    if(items[i].serviceRequestId != null){
                        $scope.forChangeSR.serviceRequestIds.push(items[i].serviceRequestId);
                    }
                    //$scope.btnIndex=btns
                    // btns=items[i].serviceRequestId
                }
            }
            //$scope.btnIndex=btns

            // console.log($scope.forChangeSR.serviceRequestIds);
        }

        /**
         * 获取对单个服务请求
         */
        $scope.sr = {};
        $scope.getSR = function(item){
            $scope.sr = item;
        }

        /**
         * 使选择的服务请求失效
         * 如果$scope.isAllChecked = true;则使用全选的服务请求id，否则选用传递过来的服务请求
         */
        $scope.journal = {};//单个服务请求使用
        $scope.bbb = {};  //选中的服务请求对象
        //选中要改变的服务请求对象
        $scope.servicechange = function(serviceRequest){
            $scope.bbb = serviceRequest;
        };
        /**
         * 服务请求全部失效
         */
        $scope.ClosedAll=function(){
            if($scope.isAllChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#serviceClosedAll').modal({backdrop: 'static', keyboard: false});
            }
        }
        $scope.serviceClosedAll=function(){
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.isAllChecked) {//全选
                $scope.forChangeSR.serviceRequestState = 0;
                $scope.forChangeSR.serviceRequestJournal = $scope.journal;
                $http.post(url + '/ServiceRequest/changeServiceRequestStateByIds', {ServiceRequest: $scope.forChangeSR})
                    .success(function (data) {
                        // console.log(data);
                        layer.alert(data.Info.info.$,{icon:1});
                        $scope.journal.remarks = "";
                        load();
                    })
                    .error(function () {
                        layer.alert("失效操作失败，请稍后重试!",{icon:2});
                        load();
                    });
                $scope.isAllChecked = false;//全选失效
                $scope.journal = {};         //传递参数初始化
            }
        };
        $scope.quxiao=function(){
            $scope.isAllChecked = false;//全选失效
            $scope.journal = {};         //传递参数初始化
        };
        /**
         * 服务请求失效
         */
        $scope.serviceClosed = function(){
            if($scope.bbb.serviceRequestState == 0){//单个选中的服务请求关闭
                layer.alert("服务请求已经是关闭状态!",{icon:0});
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c";  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";  //备注初始化
                layer.alert(data.Info.info.$,{icon:1});
                load();
            }).error(function(){
                layer.alert("关闭操作失败，请稍后重试!",{icon:2});
                load();
                $scope.journal.remarks = "";
            });
        };
        /**
         * 服务请求完成
         */
        $scope.serviceFinish = function(){
            if($scope.bbb.serviceRequestState == 3){
                layer.alert("服务请求已经是完成状态!",{icon:0});
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                layer.alert(data.Info.info.$,{iocn:1});
                load();
            }).error(function(){
                layer.alert("完成操作失败，请稍后重试!",{icon:2})
                load();
                $scope.journal.remarks = "";
            });
        };
        /**
         * 服务请求全部完成
         */
        $scope.serviceAll=function(){
            if($scope.isAllChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#serviceFinishAll').modal({backdrop: 'static', keyboard: false});
            }
        }
        $scope.serviceFinishAll = function(){

            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.isAllChecked){//全选
                $scope.forChangeSR.serviceRequestState = 3;
                $scope.forChangeSR.serviceRequestJournal=$scope.journal;
                $http.post(url+'/ServiceRequest/changeServiceRequestStateByIds',{ServiceRequest:$scope.forChangeSR})
                    .success(function(data){
                        //  console.log(data);
                        layer.alert(data.Info.info.$,{icon:1});
                        load();
                        $scope.journal.remarks = "";
                    })
                    .error(function(){
                        layer.alert("完成操作失败，请稍后重试!",{icon:2});
                        load();
                    });
                $scope.isAllChecked=false;//全选失效
                $scope.journal = {};
            }

        };
        /**
         * 获取服务请求下的任务列表
         * SRId:服务请求id
         */
        $scope.commonSR = {serviceRequestId:'',remarks:''};
        $scope.getTasks = function(item){
            //console.log(item);
            $scope.commonSR.serviceRequestId = item.serviceRequestId;
            $scope.commonSR.remarks = item.remarks;//与任务备注联动
            /*     var parent = function (page, callback) {
             $scope.task.page = page;
             $scope.task.serverId = $scope.commonSR.serviceRequestId;
             $http.post(url + '/Tasks/listPageGetTasksbyServiceRequestId', {Tasks: $scope.task}).success(callback);
             };
             $scope.currentTasks = app.get('Paginator').list(parent,6);*/
            $http.get(url+'/ServiceRequest/getServiceRequestbyId/'+item.serviceRequestId).success(function(data){
                if(data){
                    $scope.Service= data.ServiceRequest;
                    //console.log(data);
                }else{
                    layer.alert("没有任务！",{icon:2})
                }
            }).error(function(data,status,headers,config){
                //alert("服务器请求失败！");
            });
            $scope.loadTask();
            $scope.datils();//显示任务页面
            $scope.datils1=true;

        }
        $scope.loadTask=function() {
            var parent = function (page, callback) {
                $scope.task.page = page;
                $scope.task.serverId = $scope.commonSR.serviceRequestId;
                $http.post(url + '/Tasks/listPageGetTasksbyServiceRequestId', {Tasks: $scope.task}).success(callback)
            };
            $scope.currentTasks = app.get('Paginator').list(parent, 6);
            //console.log($scope.currentTasks);
        };
        /**
         * 任务全选按钮功能
         */
        $scope.isAllTasksChecked = false;//是否全选，默认否
        $scope.forChangeTasks = {tasksIds:[]};
        $scope.allTasksChecked = function(){
            layer.msg("全选成功",{icon:1,time:1000});
            $scope.forChangeTasks.tasksIds=[];
            $scope.isAllTasksChecked = true;
            var items = $scope.currentTasks.object.tasks;
            if(items != null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].taskId != null){
                        $scope.forChangeTasks.tasksIds.push(items[i].taskId);
                    }
                }
            }
            // console.log($scope.forChangeTasks.tasksIds);
        }

        /**
         *  获取专业线
         */
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!");
        });
        /**   修改任务状态  start  **/

            //获取专项信息
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            //console.log ("获取专项信息失败,请稍后重试!");
        });

        //获取集中处理项信息
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjectsAlive").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            //console.log("获取集中处理信息失败,请稍后重试!");
        });

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            //console.log("获取人员信息失败,请稍后重试!");
        });

        /**
         * 获取单个任务
         */
        $scope.ts = {};
        $scope.getTs = function(item){
            $scope.ts = item;
        }

        /**
         * 任务失效操作
         * 如果$scope.isAllChecked = true;则使用全选的服务请求id，否则选用传递过来的服务请求
         */
        $scope.aaa={};
        /**
         * 修改状态
         */
        $scope.change = function(maintain){
            $scope.aaa=maintain;
        };

        /**
         *  集中处理
         */
        $scope.updateTasks=function(){
            if($scope.aaa.taskState == 10){
                layer.alert("任务已经是集中处理状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=10;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务转集中处理成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务转集中处理失败,请稍后重试！",{icon:2});
            })
        };

        /**
         * 转专项处理
         */
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                layer.alert("任务已经是转专项状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //console.log($scope.aaa.taskId);
                //alert("任务转专项成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                console.log(data);
                layer.alert("任务转专项失败,请稍后重试!",{icon:2});
            })
        };

        /**
         * 转出处理
         */
        $scope.updateRollOut=function(){
            if($scope.aaa.taskState == 5){
                layer.alert("任务已经是转出状态!",{icon:.0});
                return;
            }
            $scope.aaa.taskState=5;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //console.log($scope.aaa.taskId);
                //alert("任务成功转出!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务转出操作失败,请稍后重试!",{icon:2});
            })
        };

        /**
         * 接受
         */
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
                layer.alert("任务已经是接受状态！",{icon:0});
                return;
            }
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务已经接受");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务接受失败，请稍后重试!",{icon:2});
            })
        };

        /**
         *  失效
         */
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                layer.alert("任务已经是关闭状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务关闭操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务关闭失败,请稍后重试!",{icon:2});
            })
        };

        /**
         *  指派
         */
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                layer.alert("任务已经是指派状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务指派成功!");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务指派失败，请稍后重试!",{icon:2});
            })
        };

        /**
         * 完成操作
         */
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                layer.alert("任务已经是完成状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务完成操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("任务完成失败,请稍后重试!",{icon:2});
            })
        };

        /**
         * 催促操作
         */
        $scope.UrgeTaskRecords={};
        $scope.urgeTask=function(){
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                //alert("催促操作成功");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.alert("催促操作失败,请稍后重试!",{icon:2});
                $scope.aaa.remarks = "";
            })
        };

        /**
         *  延时操作
         * @type {{}}
         */
        $scope.ApplicationDelayRecords = {};
        $scope.delayTask=function(){
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            //console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                //alert("延时操作成功");
                $scope.aaa.remarks = "";
                //  console.log(data)
            }).error(function(data,status,headers,config){
                layer.alert("延时操作失败,请稍后重试!",{icon:2});
                $scope.aaa.remarks = "";
            })
        };

        /**
         * 工单处理状态处理
         * @param state
         */
        $scope.changeTasks=function(){
            if($scope.isAllTasksChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#close').modal({backdrop: 'static', keyboard: false});
            }
        };
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
                        layer.alert("操作失败，请稍后重试!",{icon:2})
                    });
                $scope.loadTask();
                $scope.isAllTasksChecked = false;
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    layer.alert("任务已经是"+name+"状态!",{icon:0});
                    return;
                }
            }
        };
        $scope.quxiaoo=function(){
            $scope.isAllTasksChecked = false;
        };
        /**
         *任务全部完成
         */
        $scope.changeFinishs=function(){
            if($scope.isAllTasksChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#finishs').modal({backdrop: 'static', keyboard: false});
            }
        };
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
                        layer.alert("操作失败，请稍后重试!",{icon:2})
                    });
                $scope.isAllTasksChecked = false;
                $scope.loadTask();
            }
        }

        /**
         * 任务全部转出
         */
        $scope.changeRollOuts=function(){
            if($scope.isAllTasksChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#frees').modal({backdrop: 'static', keyboard: false});
            }
        };
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

        /**
         *  任务全部转集中处理
         */
        $scope.changeSpecials=function(){
            if($scope.isAllTasksChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#concentrateds').modal({backdrop: 'static', keyboard: false});
            }
        };
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

        /**
         * 任务全部转专项处理
         */
        $scope.changeTaskss=function(){
            if($scope.isAllTasksChecked==false){
                layer.alert("未全选",{icon:0})
                return
            }else{
                $('#turns').modal({backdrop: 'static', keyboard: false});

            }
        };
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
        //传任务ID给工单页面
        $scope.taskDetailsIds=function(taskId,taskState,buildingStructureNew,serviceRequestId){
            //$location.path("/index/serviceRequest/repairOrder/"+taskId).search({taskDetailsIds:taskId});
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:$scope.ServiceRequest.customerId,taskState:taskState,buildingStructureNew:buildingStructureNew,serviceRequestId:serviceRequestId}))
            $location.path("/index/serviceRequest/repairOrder");
        };

        /**
         *  传任务ID给工单页面
         */
        $scope.taskDetailsIds=function(taskId,taskState,buildingStructureNew,serviceRequestId){
            //$location.path("/index/serviceRequest/repairOrder/"+taskId).search({taskDetailsIds:taskId});
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:$scope.ServiceRequest.customerId,taskState:taskState,buildingStructureNew:buildingStructureNew,serviceRequestId:serviceRequestId}))
            $location.path("/index/serviceRequest/repairOrder");
        };


        /************服务请求返回***************/
        $scope.cancel1=function(){
            $scope.service();
            load();
            $scope.ServiceRequest={};
            $scope.ServiceRequest.tasks={};
            $scope.person={};
            $scope.person1={};
            $scope.addWaterCheck=[];
            $scope.name=null;
        };
        /**   修改任务状态  stop  **/

        /***********     新增服务请求 start      **************/
        $scope.tasks={};
        $scope.ServiceRequest={};
        $scope.ServiceRequest.tasks={};

        $scope.ServiceRequest.writerId='1';

        $scope.Datil={
            /**任务类型**/
            taskType: [
                { id:'0',name:'园林' },
                { id:'1',name:'维修' },
                { id:'2',name:'护管' },
                { id:'11',name:'清洁' },
                { id:'12',name:'回访'},
                { id:'13',name:'投诉'},
                { id:'16',name:'抄水表'},
                { id:'17',name:'抄电表'},
                { id:'10',name:'向业主索赔'},
                { id:'9',name:'赔偿给业主'},
                { id:'19',name:'固定车位'},
                { id: '3',name:'部门质检' },
                { id: '4',name:'装修巡检' },
                { id: '5',name:'装修验收' },
                { id: '6',name:'施工巡检' },
                { id: '7',name:'施工核查' },
                { id: '8',name:'施工验收' },
                {id:'14',name:'验房'},
                {id:'15',name:'咨询'},
            ]
        };



        /**
         * 显示新建方案
         */
        $scope.mark = true;
        $scope.detail1 = function(){
            $scope.ServiceRequest.tasks= {};
            $scope.mark = true;
            $scope.btnIndex = null;
        };
        $scope.detail2 = function(index){
            $scope.mark = false;
            $scope.ServiceRequest.tasks= $scope.ServiceRequestList[index];
            $scope.btnIndex=index;
        };

        /**
         *
         * @type {number}
         */
        $scope.showNum = 0;
        var num=0;
        var num1=0;
        $scope.titleChange = function(index)
        {
            if(index==1)
            {
                if((num1==0)&&(num!=0))
                {
                    $scope.showNum+=10;
                    $scope.maxTitleNum = true;
                    $scope.maxTitleNum1=true;
                    num1++;
                    num--;
                    if((num1!=0)&&(num==0))
                    {
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=false;
                    }
                } else if((num!=0)&&(num1!=0))
                {
                    $scope.showNum+=10;
                    $scope.maxTitleNum = true;
                    $scope.maxTitleNum1=true;
                    num1++;
                    num--;
                    if((num1!=0)&&(num==0))
                    {
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=false;
                    }
                }
                else
                {
                    return;
                }
            }
            if(index==0)
            {
                if((num==0)&&(num1!=0))
                {
                    $scope.showNum-=10;
                    $scope.maxTitleNum = true;
                    $scope.maxTitleNum1=true;
                    num++;
                    num1--;
                    if((num!=0)&&(num1==0))
                    {
                        $scope.maxTitleNum = false;
                        $scope.maxTitleNum1=true;
                    }
                } else if((num!=0)&&(num1!=0))
                {
                    $scope.showNum-=10;
                    $scope.maxTitleNum = true;
                    $scope.maxTitleNum1=true;
                    num++;
                    num1--;
                    if((num!=0)&&(num1==0))
                    {
                        $scope.maxTitleNum = false;
                        $scope.maxTitleNum1=true;
                    }
                }else
                {
                    return;
                }
            }
        };
        $scope.ServiceRequestList=[];
        $scope.listTasks = [];
        $scope.save=function(){
            //负责人
            var staffName = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.principal);
             if(staffName.state == false){
             layer.msg('请选择负责人！',{icon : 0,time : 2000});
             return;
             }
            //完成时间
            var estimatedTime = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.estimatedTime);
            if(estimatedTime.state == false){
                layer.msg('请选择完成时间！',{icon : 0,time : 2000});
                return;
            }
            //任务描述
            var taskDescription = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.taskDescription);
            if(taskDescription.state == false){
                layer.msg('请输入任务描述！',{icon : 0,time : 2000});
                return;
            }
            $scope.ServiceRequest.tasks.taskType = '10';
            $scope.listTasks.push($scope.ServiceRequest.tasks);
            $scope.ServiceRequestList.push($scope.ServiceRequest.tasks);
            console.log($scope.ServiceRequestList);

            $scope.ServiceRequest.tasks={};
            $scope.addWaterCheck = {};
            $scope.person.staff = {};

            if($scope.ServiceRequestList.length%10==0)
            {
                $scope.showNum+=10;
                $scope.maxTitleNum1=false;
                $scope.maxTitleNum=true;
                num=0;
                num1++;
            }
        };

        $scope.person={};
        $scope.name;
        $scope.choicePerson1=function(person){
            $scope.person=person;
            /*  console.log($scope.person);*/
            $scope.btnIndex=person.custId;
            $scope.name=$scope.person.name;
            $scope.ServiceRequest.customerId= $scope.person.custId;
            $scope.ServiceRequest.accessPhone=$scope.person.phoneNum
            $scope.ServiceRequest.reviewId= $scope.person.custId;
        };
        $scope.addReqService=function(){
            $scope.ServiceRequest.importantEvent = 0;
            $scope.ServiceRequest.requestSource = "前台";
            $scope.ServiceRequest.directionType = 0;//外部服务
            $scope.ServiceRequest.serviceRequestType = 8;//向业主索赔
            $scope.ServiceRequest.tasks.taskDescription= $scope.ServiceRequest.remarks;

            var accessPhone = app.get("valueCheck").isPhoneOrTelAndNotNull($scope.ServiceRequest.accessPhone);
            if(accessPhone.state == false){
                layer.msg('客户'+accessPhone.info,{icon : 0});
                return;
            }else if($scope.ServiceRequest.customerId==undefined ||$scope.ServiceRequest.customerId.replace(/\s+/g,"")=="" ||$scope.ServiceRequest.customerId == null){
                layer.alert('客户姓名不能为空！',{icon : 0});
                return;
            }
            else if($scope.ServiceRequest.remarks==undefined ||$scope.ServiceRequest.remarks.replace(/\s+/g,"")=="" ||$scope.ServiceRequest.remarks == null){
                layer.alert('备注不能为空！',{icon : 0});
                return;
            }
            if($scope.ServiceRequestList.length ==0){
                layer.msg('任务不能为空！',{icon : 0,time : 2000});
                return;
            }
            $scope.ServiceRequest.listTasks = $scope.listTasks;

            //判断加急状态
            var anxious = document.getElementsByName("anxious");
            for(var i = 0;i<anxious.length;i++){
                if(anxious[i].checked == true){
                    $scope.ServiceRequest.anxious = 1;
                } else{
                    $scope.ServiceRequest.anxious = 0;
                }
            }

            if($scope.ServiceRequest.customerId!=null) {
                $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {
                    ServiceRequest: $scope.ServiceRequest
                }).success(function (data) {
                    if($scope.ServiceRequest.tasks != null){var addressId = $scope.ServiceRequest.tasks.addressId;}
                    layer.msg("添加服务成功！",{icon:1, time :1000});
                    $scope.service();
                    load();
                    $scope.ServiceRequest={};
                    $scope.ServiceRequest.tasks={};
                    $scope.person={};
                    $scope.person1={};
                    $scope.addWaterCheck=[];
                    $scope.name=null;
                }).error(function (data) {
                    layer.alert("服务器请求失败！",{icon:2});
                });
            }
        };

        $scope.getValue=function(){
            var tt=document.getElementsByName("ims");
            for(var i=0;i<tt.length;i++){
                if(tt[i].checked === true) {
                    $scope.ServiceRequest.importantEvent = 1;
                    $scope.impro=true;

                }else{
                    $scope.impro=false;
                }
            }

        };

        /**
         * 查询所有建筑结构信息.
         */
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
            layer.alert("建筑信息查询失败！",{icon:2})
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
                    //console.log($scope.addressId);
                }
            }
            //console.log($scope.treeResult.treeList);
            $scope.bslist=$scope.treeResult.treeList;
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            if($scope.treeResult.treeList.length > 1){
                layer.msg('只能选择一个地址！',{icon : 0,time : 2000});
                return;
            }
            $scope.addWaterCheck = $scope.treeResult.treeList;
            $scope.ServiceRequest.tasks.addressId = $scope.treeResult.treeList[0].id;
            $scope.ServiceRequest.tasks.fullname = $scope.treeResult.treeList[0].fullname;
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

        //负责人信息
        $scope.Teamworkstaff = {page:{}};

        $scope.load1 = function(){
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);
            // console.log($scope.searchPaginator2);
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
        $scope.checkShow=function(item){
            $scope.btnIndex=item.id;
        };
        $scope.person1={};
        $scope.addPerson=function(){
            $scope.person1= $scope.accountRecord;

            $scope.ServiceRequest.tasks.principal=$scope.accountRecord.staffId;


        };
        //判断checkbx是否选中
        $scope.c=false;
        $scope.getdata1=function(item){
            var chk = document.getElementsByName("aa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.account=item;
                    $scope.c=true;
                    return;
                }else{
                    $scope.c=false;
                }
            }
        };
        $scope.newtasks={}
        $scope.addPerson1=function(){
            $scope.newtasks= $scope.account;
            $scope.newtasks.principal=$scope.account.staffId;
        };
        //根据条件搜索人员信息
        $scope.searchone={page:{}};

        var parent = function (page, callback) {
            $scope.searchone.page = page;
            $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
        };
        $scope.currentPaginator = app.get('Paginator').list(parent,4);
        //console.log($scope.currentPaginator);


        /************   新增服务请求 stop    ****************/
        /*******新建任务返回和取消******/
        $scope.cancel=function(){
            $scope.datils();
            $scope.Tasks={};
            $scope.taskList = [];
            $scope.newtask = {};
            $scope.newtasks = {};
        };
        /************      新增任务 start       ***************/
        $scope.Tasks={};
        $scope.addTasks=function(serviceRequest){
            //    console.log('************** in 1***************');
            $scope.Tasks.serverId=serviceRequest;
            $scope.Tasks.customerId=$rootScope.user.custId;
            $scope.Tasks.remarks = $scope.serviceRequest.remarks;
            $scope.addDatils();
            $scope.addTask=function(serviceRequest){
                //  console.log('************** in 2***************');
                $scope.Tasks.addressId=$rootScope.addressId;

                if(serviceRequest!=null){
                    $http.post(url +'/Tasks/insertTasks',{Tasks:$scope.Tasks}).success(function(data) {

                        //console.log($scope.Tasks);
                        $scope.datils();
                        //$scope.selectTasks(serviceRequest);
                        //   $location.path("/index/serviceRequest/serviceRequestDatil/allWorkOrders/");
                    }).error(function(data){
                        layer.alert("请求失败！",{icon:2});
                    })
                }else{
                    layer.alert("服务ID不存在！不允许新建任务!",{icon:2});
                }
            };
            // console.log('************** out ***************');
        };


        /**
         * 新增多个任务
         */
        $scope.taskList = [];
        $scope.staff={};
        $scope.i = 1;
        $scope.addNewTasks = function(){
            if($scope.newtasks.principal==undefined ||$scope.newtasks.principal.replace(/\s+/g,"")=="" ||$scope.newtasks.principal == null){
                layer.alert('负责人不能为空！',{icon : 0});
                return;
            }else if($scope.newtask.taskDescription==undefined ||$scope.newtask.taskDescription.replace(/\s+/g,"")=="" ||$scope.newtask.taskDescription == null){
                layer.alert('任务描述不能为空！',{icon : 0});
                return;
            }else if($scope.newtask.estimatedTime==undefined ||$scope.newtask.estimatedTime =="" ||$scope.newtask.estimatedTime == null){
                layer.alert('预计完成时间不能为空！',{icon : 0});
                return;
            } else if($scope.newtask.taskType==undefined ||$scope.newtask.taskType.replace(/\s+/g,"")=="" ||$scope.newtask.taskType == null){
                layer.alert('任务类型不能为空！',{icon : 0});
                return;
            }
            $scope.i++;
            $scope.taskList.push({
                principal: $scope.newtasks.principal,
                taskDescription: $scope.newtask.taskDescription,
                estimatedTime:$scope.newtask.estimatedTime,
                taskType:$scope.newtask.taskType,
                addressId:$scope.addressId,
                staffName:$scope.newtasks.staff.staffName,
                fullname:$scope.addWaterCheck[0].fullname,
                serverId: $scope.commonSR.serviceRequestId
            });
            $scope.newtask={};
            $scope.newtasks={};
            $scope.addWaterCheck=[];
            $scope.showAddTask=false;

        }
        $scope.deleteArea=function(index){
            $scope.taskList.splice(index,1);
        };
        $scope.showAddTasks=function(){
            $scope.showAddTask=true;
        };
        /**
         * 取消新增任务
         */
        $scope.newTaskCancel = function(){
            $scope.i = 1;
            $scope.datils();
            $scope.Tasks={};
            $scope.taskList = [];
            $scope.newtask = {};
            $scope.newtasks = {};
            /*     $scope.addWaterCheck[0].fullname=null;*/
        }

        /**
         * test
         */
        $scope.Tasks={}
        $scope.newtask = {};
        $scope.newTasks = function(){
            $scope.i = 1;
            $scope.newtask.serverId = $scope.commonSR.serviceRequestId;
            /*  $scope.newtask.remarks = $scope.commonSR.remarks;
             $scope.newtask.addressId=$rootScope.addressId;
             $scope.newtask.principal = $scope.newtasks.principal;
             if($scope.newtask.principal==undefined ||$scope.newtask.principal.replace(/\s+/g,"")=="" ||$scope.newtask.principal == null){
             layer.alert('负责人不能为空！',{icon : 0});
             return;
             }else if($scope.newtask.taskDescription==undefined ||$scope.newtask.taskDescription.replace(/\s+/g,"")=="" ||$scope.newtask.taskDescription == null){
             layer.alert('任务描述不能为空！',{icon : 0});
             return;
             }else if($scope.newtask.estimatedTime==undefined ||$scope.newtask.estimatedTime =="" ||$scope.newtask.estimatedTime == null){
             layer.alert('预计完成时间不能为空！',{icon : 0});
             return;
             } else if($scope.newtask.taskType==undefined ||$scope.newtask.taskType.replace(/\s+/g,"")=="" ||$scope.newtask.taskType == null){
             layer.alert('任务类型不能为空！',{icon : 0});
             return;
             }*/
            $scope.Tasks.tasks=  $scope.taskList;
            if($scope.newtask.serverId!=null && $scope.newtask.serverId != ""){
                $http.post(url +'/Tasks/insertTasksAll',{Tasks:$scope.Tasks}).success(function(data) {
                    layer.msg('提交成功！',{icon : 1, time : 1000});

                    $scope.datils();
                    $scope.getTasks($scope.commonSR);
                    //$scope.selectTasks(serviceRequest);
                    //   $location.path("/index/serviceRequest/serviceRequestDatil/allWorkOrders/");
                    $scope.Tasks={};
                    $scope.taskList = [];
                    $scope.newtask = {};
                    $scope.newtasks = {};
                }).error(function(data){
                    layer.alert("请求失败！",{icon:2});
                })
            }else{
                layer.alert("服务ID不存在！不允许新建任务!",{icon:2});
            }
        }
        /************      新增任务 stop        ***************/

    }]);
});
