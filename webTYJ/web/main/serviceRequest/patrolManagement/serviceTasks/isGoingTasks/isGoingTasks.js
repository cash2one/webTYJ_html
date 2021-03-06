/**
 * Created by NM on 2018/1/18.
 * 巡检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('isGoingTasksCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.id=sessionStorage.getItem("data1");
        $scope.tasks={serverId:'',page:{}};
        $scope.tasks.serverId=$scope.id;//关联服务请求id
        $scope.load=function(){
            var fetchFunction = function (page, callback){
                $scope.tasks.page = page;
                $http.post(url + '/Tasks/listPageGetTasksbyServiceRequestId', {Tasks: $scope.tasks}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        };
        $scope.load();



        /**
         * 任务页面网格列表切换
         */
        $scope.grids=false;
        $scope.list=function(){
            $scope.grids=true;

        }
        $scope.gridChange=function(){
            $scope.grids=false;
        }


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
        $scope.ts = {};
        $scope.getTs = function(item){
            $scope.ts = item;
        }

        //全部失效
        $scope.changeTaskState = function(state){
            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != 0){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        }

        // 集中处理项
        $scope.account1=function(){
            if($scope.isAllChecked){
                $("#concentrated").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };
        //转专项
        $scope.account2=function(){
            if($scope.isAllChecked){
                $("#turn").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };

        //转出
        $scope.account3=function(){
            if($scope.isAllChecked){
                $("#free").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };

        //完成
        $scope.account4=function(){
            if($scope.isAllChecked){
                $("#finish").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };

        //失效
        $scope.account5=function(){
            if($scope.isAllChecked){
                $("#close").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };
        //合并
        $scope.account6=function(){
            if($scope.isAllChecked){
                $("#new1").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };

        //新建任务按钮
        $scope.NewTasks=function(){
                $location.path("/index/serviceRequest/patrolManagement/serviceTasks/newServiceTasks");
        }

        //传任务ID给工单页面
        $scope.taskDetailsId = function(taskId,taskState){
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:'',taskState:taskState,taskType:'20'}));
            $location.path("/index/serviceRequest/repairOrder");
        }


        //获取专业线
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!");
        });




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
        $scope.updateTasks=function(state){
            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
            /*

             if($scope.aaa.taskState == 10){
             alert("任务已经是集中处理状态!");
             return;
             }
             $scope.aaa.taskState=10;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             alert("任务转集中处理成功!");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             alert("任务转集中处理失败,请稍后重试！");
             })*/
        };
        //转专项处理
        $scope.updateSpecial=function(state){
            /*if($scope.aaa.taskState == 9){
             alert("任务已经是转专项状态!");
             return;
             }
             $scope.aaa.taskState=9;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             console.log($scope.aaa.taskId);
             alert("任务转专项成功!");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             console.log(data);
             alert("任务转专项失败,请稍后重试!");
             })*/

            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };

        //转出处理
        $scope.updateRollOut=function(state){
            /*if($scope.aaa.taskState == 5){
             alert("任务已经是转出状态!");
             return;
             }
             $scope.aaa.taskState=5;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             console.log($scope.aaa.taskId);
             alert("任务成功转出!");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             alert("任务转出操作失败,请稍后重试!");
             })*/

            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };
        //接受
        $scope.updateAccept=function(state){
            /* if(maintain.taskState == 3){
             alert("任务已经是接受状态！");
             return;
             }
             $scope.aaa =maintain;
             $scope.aaa.taskState = 3;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             alert("任务已经接受");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             alert("任务接受失败，请稍后重试!");
             })*/

            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };
        //关闭
        $scope.updateClosed=function(state){
            /*if($scope.aaa.taskState == 0){
             alert("任务已经是关闭状态!");
             return;
             }
             $scope.aaa.taskState=0;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             alert("任务关闭操作成功");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             alert("任务关闭失败,请稍后重试!");
             })*/

            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };

        //指派
        $scope.updateAssign=function(state){
            /*if($scope.aaa.taskState == 11){
             alert("任务已经是指派状态!");
             return;
             }
             $scope.aaa.taskState = 11;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             alert("任务指派成功!");
             $scope.aaa.remarks = "";
             }).error(function(data,status,headers,config){
             alert("任务指派失败，请稍后重试!");
             })*/

            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };

        //完成操作
        $scope.updateFinish=function(state){
            /*if($scope.aaa.taskState == 2){
             alert("任务已经是完成状态!");
             return;
             }
             $scope.aaa.taskState=2;
             $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
             alert("任务完成操作成功");
             $scope.aaa.remarks = "";
             $scope.load();
             }).error(function(data,status,headers,config){
             alert("任务完成失败,请稍后重试!");
             })*/
            var map = ['关闭','重启','已完成','已接受','未处理','转出','提交完成','处理中','合并','转专项','转集中处理'];
            var name = map[state];//获取操作名称
            if($scope.isAllChecked){
                $scope.forChangeTasks.taskState = state;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        console.log(data);
                        alert(data.info);
                        $scope.load();
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllChecked = false;
                $scope.aaa.remarks = "";
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
                    return;
                }
                if(item.taskState != state){
                    item.taskState=state;
                    item.remarks = $scope.aaa.remarks;
                    $http.put(url+'/Tasks/changeTasksState',{Tasks:item}).success(function(data){
                        alert(data.info);
                        $scope.aaa.remarks = "";
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        alert("任务关闭失败,请稍后重试!");
                    })
                }else{
                    alert("任务为失效状态，不可修改！");
                }
            }
            $scope.aaa={};
        };
        $scope.UrgeTaskRecords={};
        //催促操作
        $scope.urgeTask=function(state){
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                alert("催促操作成功");
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                alert("催促操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
        };

        $scope.ApplicationDelayRecords = {};
        //延时操作
        $scope.delayTask=function(state){
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                alert("延时操作成功");
                $scope.aaa.remarks = "";
                $scope.load();
                console.log(data)
            }).error(function(data,status,headers,config){
                alert("延时操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
        };

        /********操作结束*****************************/

    }]);
});


