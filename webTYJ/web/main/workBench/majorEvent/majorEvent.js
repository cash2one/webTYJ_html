/**
 * Created by chenl on 2016/7/5.
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('majorEventCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        console.log($rootScope);
        $scope.treatmentProjects = [];
        $scope.treatmentProject = {};
        $scope.tasks = [];

        $http.get(url + "/CentralizedTreatmentProjects/getCentralizedTreatmentProjectsbyState/1").success(function(data){
            $scope.treatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            layer.msg("获取进行中的集中处理项失败!",{icon : 0,time : 2000})
            return;

        });


        //获取登录人的信息
        var user = {};
        var companyId ;//设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.loginName = '';
        if($scope.user.staff != null){
            $scope.loginName = $scope.user.staff.staffName;
        }else{
            $scope.loginName = '超级管理员';
        }
        companyId= $scope.user.companyId;

        $scope.goingEventSum = 0;
        $scope.endEventSum = 0;
        //获取当前重大事项各数量
        $scope.EventSum=function(){
            $http.get(url+'/ServiceRequest/getEventSum').success(function(data){
                $scope.goingEventSum = data.ServiceRequest.goingSum;
                $scope.endEventSum = data.ServiceRequest.historySum;
            }).error(function(){
            });
        };
        $scope.EventSum();

        /**
         * 任务页面网格列表切换
         */
        $scope.grid1=true;//默认显示网格
        $scope.oneChangel=true;
        $scope.twoChangel=false;
        $scope.list1=function(index){
            if(index==1){
                $scope.grid1=false;
                $scope.grid2=true;
            }else if(index==2){
                $scope.grids1=false;
                $scope.grids2=true;
            }


        }

        $scope.gridChange1=function(index){
            if(index==1){
                $scope.grid2=false;
                $scope.grid1=true;
            }else if(index==2){
                $scope.grids2=false;
                $scope.grids1=true;
            }


        }


        //进行中页面分页
        $scope.TreatmentProjectPage=function(){
            $scope.serviceRequest={page:{}};
            var currentCheck = function(page,callback){
                $scope.serviceRequest.page = page;
                $http.post(url+'/ServiceRequest/listPageGoingServiceRequestsbyEventType',{ServiceRequest:$scope.serviceRequest}).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck,6);
            console.log($scope.projectItem);
        }
        $scope.TreatmentProjectPage();

        //已完成页面分页
        $scope.TreatmentProjectPage1=function() {
            $scope.serviceRequest = {page: {}};
            var currentCheck1 = function (page, callback) {
                $scope.serviceRequest.page = page;
                $http.post(url + '/ServiceRequest/listPageHistoryServiceRequestsbyEventType', {ServiceRequest: $scope.serviceRequest}).success(callback);
            };
            $scope.projectItem1 = app.get('Paginator').list(currentCheck1, 6);
            console.log($scope.projectItem1);
        }
        $scope.TreatmentProjectPage1();

        $scope.focus=false;      //新建
        $scope.ongoing=true;    //进行中
        $scope.newCompleteds=false;//已完成
        $scope.all=true;        //集中处理详情
        $scope.details=false;
        $scope.centralizedSelectState = true;//集中处理状态选择
        $scope.stateDemo=true;    //集中处理项下任务完成状态
        $scope.taskDemo=false;     //集中处理项下任务详情
        $scope.demo=true;  //导航选择
        //新建集中处理项
        $scope.newFocus=function(index){
            $scope.focus=true;
            $scope.ongoing=false;
            $scope.newCompleteds=false;
            $scope.details=false;
            $scope.btnIndex = index;
        };

        //查询集中处理项目列表
        $scope.newOngoing=function(index){
            $scope.oneChangel=true;
            $scope.twoChangel=false;
            $scope.focus=false;
            $scope.ongoing=true;
            $scope.newCompleteds=false;
            $scope.details=false;
            $scope.all=true;
            $scope.centralizedSelectState=true;
            $scope.demo=true;
            $scope.btnIndex = index;
        };

        $scope.newCompleted = function(index){
            $scope.oneChangel=false;
            $scope.twoChangel=true;
            $scope.focus=false;
            $scope.ongoing=false;
            $scope.newCompleteds=true;
            $scope.details=false;
            $scope.all=true;
            $scope.centralizedSelectState = false;
            $scope.demo=true;
            $scope.btnIndex = index;
        }

        $scope.ashow=function(){
            $('#newPerson').modal('show');
        }

        $scope.newDetails=function(itme){
            localStorage.setItem('EventItem',JSON.stringify({Itme:itme}));
            $location.path("index/workBench/majorEvent/eventTasks");
        };

        //集中任务下的请求分页
        $scope.TasksPage=function(){
            $scope.TaskProject={page:{}};
            console.log($http);
            var currentCheck11 = function(page,callback){
                $scope.TaskProject.page = page;
                $scope.TaskProject.subordinateType = 2;
                $scope.TaskProject.subordinateId = $scope.project.projectId;

                $http.post(url+'/Tasks/listPageTaskbySubordinateIdAndType2',{Tasks:$scope.TaskProject}).success(callback);
            };
            $scope.projectTask = app.get('Paginator').list(currentCheck11,6);
            console.log($scope.projectTask);
        }



        $scope.TasksPage1=function(){
            $scope.TaskProject={page:{}};
            console.log($http);
            var currentCheck11 = function(page,callback){
                $scope.TaskProject.page = page;
                $scope.TaskProject.subordinateType = 2;
                $scope.TaskProject.subordinateId = $scope.project.projectId;

                $http.post(url+'/Tasks/listPageTaskbySubordinateIdAndType1',{Tasks:$scope.TaskProject}).success(callback);
            };
            $scope.projectTask = app.get('Paginator').list(currentCheck11,6);
            console.log($scope.projectTask);
        }




//集中处理项下任务的分类
        $scope.clickGoing=function(project){

            $scope.TasksPage();
            /* $http.get(url + "/Tasks/getTaskbySubordinateIdAndType2/2/"+$scope.project.projectId).success(function(data){
             console.log(data);
             $scope.tasks = data.Tasks;
             }).error(function(data,status,headers,config){
             layer.msg("获取已完成的集中处理项失败!",{icon : 0,time : 2000})
             return;
             });*/
            $scope.taskDemo=true;
            $scope.focus=false;
            $scope.ongoing=false;
            $scope.newCompleteds=false;
            $scope.details=true;
            $scope.all=false;
            $scope.stateDemo=true;
            $scope.clickGoing1 = true;
            $scope.clickCompleted1 = false;

        };

        $scope.clickCompleted=function(project){
            /*$http.get(url + "/Tasks/getTaskbySubordinateIdAndType1/2/"+$scope.project.projectId).success(function(data){

             console.log(data);
             $scope.tasks = data.Tasks;

             }).error(function(data,status,headers,config){
             layer.msg("获取已完成的集中处理项失败!",{icon : 0,time : 2000})
             return;
             });*/
            $scope.TasksPage1();
            $scope.taskDemo=true;
            $scope.focus=false;
            $scope.ongoing=false;
            $scope.newCompleteds=false;
            $scope.details=true;
            $scope.all=false;
            $scope.stateDemo=false;
            $scope.clickGoing1 = false;
            $scope.clickCompleted1 = true;

        };

        //传任务ID给工单页面
        $scope.taskDetailsId = function(taskId,taskState){
            //$location.path("/index/serviceRequest/taskDetails/"+taskId);
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:'',taskState:taskState}));
            $location.path("/index/serviceRequest/repairOrder");
        }

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            layer.msg("获取人员信息失败,请稍后重试!",{icon : 0,time : 2000});
            return;
        });

        //获取专业线
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!",{icon : 0,time : 2000});
            return;
        });

        $scope.aaa={};

        //获取专项信息
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            console.log ("获取专项信息失败,请稍后重试!",{icon : 0,time : 2000});
            return;
        });

        //获取集中处理项信息
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjects").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            layer.msg("获取集中处理信息失败,请稍后重试!",{icon : 0,time : 2000});
            return;
        });

        //修改状态
        $scope.change = function(maintain){
            $scope.aaa='';
            $scope.aaa=maintain;
            console.log(maintain);

        }

        //集中处理
        $scope.updateTasks=function(){
            if($scope.aaa.taskState == 10){
                layer.msg("任务已经是集中处理状态!",{icon : 0,time : 2000});
                return;
            }
            $scope.aaa.taskState=10;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务转集中处理成功!",{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务转集中处理失败,请稍后重试！",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };
        //转专项处理
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                layer.msg("任务已经是转专项状态!",{icon : 0,time : 2000});
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                layer.msg("任务转专项成功!",{icon : 1,time : 2000})
                $scope.aaa.remarks = "";
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                console.log(data);
                layer.msg("任务转专项失败,请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };

        //转出处理

        /*$scope.Datils={
         /!**项目类型**!/
         Type: [
         { id: '1',name:'能力不足' },
         { id: '2',name:'单据错误' }
         ]
         };*/

        $scope.updateRollOut=function(){
            if($scope.aaa.taskState == 5){
                layer.msg("任务已经是转出状态!",{icon : 0,time : 2000});
                return;
            }
            if(($scope.aaa.outType==undefined)||($scope.aaa.outType=='')){
                layer.msg("请选择转出类型！",{icon:0,time:2000});
                return;
            }
            if(($scope.aaa.staff.staffName==undefined)||($scope.aaa.staff.staffName=='')){
                layer.msg("请选择接手人！",{icon:0,time:2000});
                return;
            }
            if(($scope.aaa.remarks==undefined)||($scope.aaa.remarks=='')){
                layer.msg("转出说明不能空！",{icon:0,time:2000});
                return;
            }
            $scope.aaa.taskState=5;
            $scope.aaa.taskOutType=$scope.aaa.outType;
            $scope.aaa.principal=$scope.aaa.staff.staffName; //接手人替换负责人
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                layer.msg("任务成功转出!",{icon : 1,time : 2000})
                $scope.aaa.remarks='';
                $scope.aaa.staff.staffName='';
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务转出操作失败,请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };
        //接受
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
                layer.msg("任务已经是接受状态！",{icon : 0,time : 2000});
                return;
            }
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务已经接受",{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务接受失败，请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };
        //关闭
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                layer.msg("任务已经是关闭状态!",{icon : 0,time : 2000});
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务关闭操作成功",{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务关闭失败,请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };

        //指派
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                layer.msg("任务已经是指派状态!",{icon : 0,time : 2000});
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务指派成功!",{icon : 1,time : 2000});
                $scope.aaa.staff.staffName='';
                $scope.aaa.remarks='';
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务指派失败，请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };

        $scope.UrgeTaskRecords={};
        //催促操作
        $scope.urgeTask=function(){
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                layer.msg("催促操作成功",{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.TasksPage();
            }).error(function(data,status,headers,config){
                layer.msg("催促操作失败,请稍后重试!",{icon : 0,time : 2000});
                return;
            })
        };

        $scope.ApplicationDelayRecords = {};
        //延时操作
        $scope.Dalay={};
        $scope.delayTask=function(){
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $scope.Dalay= $(('#delay'+$scope.aaa.taskId)).html();
            if($scope.ApplicationDelayRecords.delayTime==null || $scope.ApplicationDelayRecords.delayTime==0){
                layer.msg('请填写延长时间!',{icon:0});
                return;
            }
            if(new Date($scope.ApplicationDelayRecords.delayTime)-new Date($scope.Dalay)<0){
                layer.msg('延时时间不能在完成时间之前!',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写延迟说明!',{icon:0});
                return;
            }

            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                layer.msg("延时操作成功",{icon : 1,time : 2000});
                $scope.ApplicationDelayRecords.delayTime='';
                $scope.aaa.remarks='';
                console.log(data)
                $scope.TasksPage();
            }).error(function(data,status,headers,config){
                layer.msg("延时操作失败,请稍后重试!",{icon : 0,time : 2000});
                return;
            })
        };

        //完成操作
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                layer.msg("任务已经是完成状态!",{icon : 1,time : 2000});
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务完成操作成功",{icon : 1,time : 2000});
                $scope.aaa.remarks = "";
                $scope.clickGoing();
            }).error(function(data,status,headers,config){
                layer.msg("任务完成失败,请稍后重试!",{icon : 0,time : 2000});
                $scope.aaa.remarks = "";
                return;
            })
        };

        $scope.journal = {};
        $scope.bbb = {};
        $scope.centralizedChange = function(majorProject){
            $scope.bbb = majorProject;
            console.log(majorProject);
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

        /* //判断checkbx是否选中
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
         };*/

        // 负责人
        $scope.personArray=[];
        var getChosedPets=function(){
            $scope.personArray = [];//清空
            var ids = document.getElementsByName("aaa");
            for ( var i = 0; i < ids.length; i++) {
                if (ids[i].checked ==true) {
                    $scope.personArray.push(ids[i].value);
                }
            }
        }
        $scope.personArray1=[];
        var getChosedPets1=function(){
            $scope.personArray1 = [];//清空
            var ids = document.getElementsByName("aa");
            for ( var i = 0; i < ids.length; i++) {
                if (ids[i].checked ==true) {
                    $scope.personArray1.push(ids[i].value);
                }
            }
        }

        // 负责人行选中
        $scope.accountRecord='';
        $scope.getdata = function(item){
            var checked = document.getElementById(item.id);
            if(checked.checked == true){
                checked.checked = false;
                checked.parentNode.parentNode.style.background = '';
                if($scope.personArray.length>0){
                    for(var i=0;i<$scope.personArray.length;i++){
                        if(item.id==$scope.personArray[i]){
                            $scope.personArray.splice(i,1) ;
                        }
                    }
                }
            }else {

                checked.checked = true;
                checked.parentNode.parentNode.style.background = '#f6f8fa';
                $scope.personArray = [];//清空
                $scope.personArray.push(item);
                $scope.accountRecord=item;

            }
        }
        $scope.accountRecord1='';
        $scope.getdata1 = function(item){
            var checked = document.getElementById(item.id);
            if(checked.checked == true){
                checked.checked = false;
                checked.parentNode.parentNode.style.background = '';
                if($scope.personArray1.length>0){
                    for(var i=0;i<$scope.personArray1.length;i++){
                        if(item.id==$scope.personArray1[i]){
                            $scope.personArray1.splice(i,1) ;
                        }
                    }
                }
            }else {

                checked.checked = true;
                checked.parentNode.parentNode.style.background = '#f6f8fa';
                $scope.personArray = [];//清空
                $scope.personArray.push(item);
                $scope.accountRecord=item;

            }
        }


        // 负责人 只能选择一个

        $scope.addPerson = function() {
            getChosedPets1();
            if ($scope.personArray.length > 1) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                $scope.aaa.staff = {};
                $scope.aaa.staff.staffName= $scope.accountRecord.staffName;
            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }

        $scope.addPersons1 = function() {
            getChosedPets1();
            if ($scope.personArray.length > 1) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                $scope.treatmentProject.principal= $scope.accountRecord.staffName;
            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }





        //点击取消清空
        $scope.CloseALLS = function(index){
            if(index==1){
                $scope.aaa.outType='';
                $scope.aaa.remarks='';
                $scope.aaa.staff.staffName='';
            }else if(index==2){
                $scope.ApplicationDelayRecords.delayTime='';
                $scope.aaa.remarks='';
            }else if(index==3){
                $scope.aaa.remarks='';
            }else if(index==4){
                $scope.aaa.remarks='';
            }else if(index==5){
                $scope.aaa.staff.staffName='';
                $scope.aaa.remarks='';
            }else if(index==6){
                $scope.aaa.remarks='';
            }
        }


        $scope.Datil={
            /**任务类型**/
            taskType: [
                { id: '0',name:'园林' },
                { id: '1',name:'维修' },
                { id: '2',name:'护管' },
                //{ id: '4',name:'部门质检' },
                //{ id: '5',name:'装修巡检' },
                //{ id: '7',name:'装修验收' },
                //{ id: '8',name:'施工巡检' },
                //{ id: '9',name:'施工核查' },
                //{ id: '10',name:'施工验收' },
                { id: '9',name:'赔偿给业主' },
                { id: '11',name:'清洁' },
                { id: '10',name:'向业主索赔' },
                { id: '12',name:'回访'},
                { id: '13',name:'投诉'}
            ]
        };

    }]);
});