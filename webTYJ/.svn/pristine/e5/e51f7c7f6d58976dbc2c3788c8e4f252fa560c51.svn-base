/**
 * Created by LM on 2015/3/11.
 * 专项资金处理管理项
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('specialProjectManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var fileUrl = $rootScope.fileUrl;    //上传的文件路径
        var filePath = '';                   //上传文件的路径
        var url = $rootScope.url;

        var user = {};
        var companyId ;//设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;
        console.log($scope.user);

        $scope.loginName='';
        if($scope.user.staff!=null){
            $scope.loginName=$scope.user.staff.staffName;
        }else{
            $scope.loginName="超级管理员";
        }

        $scope.specialRepairProjects = [];
        $scope.specialRepairProject = {};
        $scope.annexs = [];
        $scope.annex = {
            annexAddress: '',
            annexName: '',
            relationId: ''
        };
        /* $http.get(url + "/SpecialRepairProject/getSpecialRepairProjectbyState/1").success(function(data){

         console.log(data);
         $scope.isNotComplete=true;
         $scope.specialRepairProjects = data.SpecialRepairProject;
         }).error(function(data,status,headers,config){
         alert("查询失败!")
         });*/
        //进行中
        $scope.loading = function () {
            $scope.searchone = {page: {}};
            var currentCheck = function (page, callback) {
                $scope.searchone.page = page;
                $scope.searchone.state = '1';
                /*$http.post(url+'/Project/listPageProjectAll',{Project:$scope.projectList}).success(callback);*/
                //$http.get(url+'/SpecialRepairProject/listPageSpecialRepairProjectbyState',{teamworkStaffs:$scope.searchone}).success(callback);
                $http.post(url + '/SpecialRepairProject/listPageSpecialRepairProjectbyState', {SpecialRepairProject: $scope.searchone}).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
        };
        //已完成
       /* $scope.loading2 = function () {
            $scope.searchone2 = {page: {}};
            var currentCheck2 = function (page, callback) {
                $scope.searchone2.page = page;
                $scope.searchone2.state = '2';
                /!*$http.post(url+'/Project/listPageProjectAll',{Project:$scope.projectList}).success(callback);*!/
                //$http.get(url+'/SpecialRepairProject/listPageSpecialRepairProjectbyState',{teamworkStaffs:$scope.searchone}).success(callback);
                $http.post(url + '/SpecialRepairProject/listPageSpecialRepairProjectbyState', {SpecialRepairProject: $scope.searchone2}).success(callback);
            };
            $scope.projectItem2 = app.get('Paginator').list(currentCheck2, 6);
            console.log($scope.projectItem2);
        };*/
        $scope.loading();
        //$scope.loading2();

        $scope.specialProject=false; //新建
        $scope.ongoing=true;       //进行中
        $scope.ongoing1=false;      //已完成
        $scope.all=true;
        $scope.details=false;       //详情
        $scope.specialSelectState =true;//专项状态选择
        $scope.isNotComplete=true;        //  判断是否是已完成
        $scope.demo=true;

        $scope.addSpecialRepairProject = function(){
            if($scope.specialRepairProject.specialName==''||$scope.specialRepairProject.specialName==null){
                layer.msg('项目名称不能为空！',{icon:0})
                return;
            }
           /* if($scope.specialRepairProject.specialType==''||$scope.specialRepairProject.specialType==null){
                layer.msg('项目分类不能为空！',{icon:0})
                return;
            }*/
            if($scope.specialRepairProject.specialPrincipal==''||$scope.specialRepairProject.specialPrincipal==null){
                layer.msg("请选择负责人！",{icon:0});
                return;
            }
            if($scope.specialRepairProject.startTime==''||$scope.specialRepairProject.startTime==null){
                layer.msg('启动时间不能为空！',{icon:0})
                return;
            }
            if($scope.specialRepairProject.endTime==''||$scope.specialRepairProject.endTime==null){
                layer.msg("结束时间不能为空！",{icon:0});
                return;
            }
            if(new Date($scope.specialRepairProject.endTime)- new Date($scope.specialRepairProject.startTime)< 0){
                layer.msg('结束时间不能在开始时间之前！',{icon:0,time : 2000});
                return;
            }
            var area= app.get('valueCheck').isNumberAndNotNull($scope.specialRepairProject.specialEstimateMoney);
            if(area.state==false){
                layer.msg('预计金额'+area.info+'！',{icon:0});
                return;
            }
            if($scope.specialRepairProject.remarks==''||$scope.specialRepairProject.remarks==null){
                layer.msg('备注不能为空！',{icon:0})
                return;
            }
            $scope.specialRepairProject.specialWriter=$scope.loginName;
            console.log($scope.specialRepairProject);
            $http.post( url + "/SpecialRepairProject/insertSpecialRepairProject",{SpecialRepairProject: $scope.specialRepairProject}).success(function(data){
                console.log($scope.specialRepairProject);
                layer.msg("添加成功!",{icon:1});
                $scope.specialRepairProject='';//清空对象
                getSpecialRepairProject();
                return;
               /* $scope.specialProject=false;
                $scope.ongoing=true;
                $scope.ongoing1=false;
                $scope.details=false;
                $scope.specialSelectState =true;
                $scope.isNotComplete=true;
                $scope.specialRepairProject='';//清空对象*/
                //$location.path("/index/internalProfession/specialProjectManagement");
            }).error(function(data,status,headers,config){
                layer.msg("添加失败!",{icon:2});
                return;
            });
        }


        function getSpecialRepairProject(){
            $http.get(url + "/SpecialRepairProject/getSpecialRepairProjectbyState/1").success(function(data){
                console.log(data);
                $scope.specialRepairProjects = data.SpecialRepairProject;
                $scope.newOngoing();

            });
        }
       /* function getSpecialRepairProject2(){
            $http.get(url + "/SpecialRepairProject/getSpecialRepairProjectbyState/2").success(function(data){
                console.log(data);
                $scope.specialRepairProjects = data.SpecialRepairProject;
            });
        }*/

        $scope.newSpecialProject=function(){
            $scope.oneChangel=false;
            $scope.twoChangel=false;
            $scope.specialProject=true;
            $scope.ongoing=false;
            $scope.ongoing1=false;
            $scope.newSpecialProject1=true;
            $scope.newOngoing1=false;
            $scope.newCompleted1=false;
            $scope.details=false;
        };

        $scope.newOngoing=function(){
            $scope.oneChangel=true;
            $scope.twoChangel=false;
            $scope.specialRepairProject='';//清空对象
            $scope.specialProject=false;
            $scope.ongoing=true;
            $scope.ongoing1=false;
            $scope.newSpecialProject1=false;
            $scope.newOngoing1=true;
            $scope.newCompleted1=false;
            $scope.details=false;
            $scope.specialSelectState =true;
           /* $http.get(url + "/SpecialRepairProject/getSpecialRepairProjectbyState/1").success(function(data){

                console.log(data);
                $scope.isNotComplete=true;
                $scope.specialRepairProjects = data.SpecialRepairProject;
            }).error(function(data,status,headers,config){
                alert("查询失败!")
            });*/
            $scope.searchone={page:{}};
            var currentCheck = function(page,callback){
                $scope.searchone.page = page;
                $scope.searchone.state = '1';
                $http.post(url+'/SpecialRepairProject/listPageSpecialRepairProjectbyState',{SpecialRepairProject:$scope.searchone}).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck,6);
            $scope.isNotComplete=true;
        };

        //失效弹框里取消
        $scope.specialClose=function(){
            $scope.journal.remarks='';
        }

        $scope.newCompleted=function(){
            $scope.oneChangel=false;
            $scope.twoChangel=true;
            $scope.loading();
            $scope.specialProject=false;
            $scope.ongoing1=true;
            $scope.ongoing=false;
            $scope.newSpecialProject1=false;
            $scope.newOngoing1=false;
            $scope.newCompleted1=true;
            $scope.details=false;
            $scope.specialSelectState =false;
            var currentCheck = function(page,callback){
                $scope.searchone.page = page;
                $scope.searchone.state = '2';
                $http.post(url+'/SpecialRepairProject/listPageSpecialRepairProjectbyState',{SpecialRepairProject:$scope.searchone}).success(callback);
            };
            $scope.projectItem2 = app.get('Paginator').list(currentCheck,6);
            $scope.isNotComplete=true;
        };

        $scope.newDetails=function(project){
            $scope.project = project;
            //根据专项id获取任务信息
            $http.get(url + "/Tasks/getTasksbyProjectId/"+$scope.project.specialId).success(function(data){
                console.log(data);
                $scope.tasks = data.Tasks;
            }).error(function(data,status,headers,config){
                layer.msg("获取任务信息失败,请稍后重试!",{icon:2})
                return;
            });

            $scope.specialProject=false;
            $scope.ongoing=false;
            $scope.ongoing1=false;
            $scope.details = true;
            $scope.clickGoing();
            $scope.demo=false;
            $scope.all=false;
        }

        /**
         * 任务页面网格列表切换 2016/7/7 yangshengquan
         */
        $scope.oneChangel=true;
        $scope.twoChangel=false;
        $scope.grid1=true;//默认显示网格
        $scope.list1=function(index){
            if(index==1){
                $scope.grids1=false;
                $scope.grids2=true;
            }else if(index==2){
                $scope.Grids1=false;
                $scope.Grids2=true;
            }else if(index==3){
                $scope.grid1=false;
                $scope.grid2=true;

            }

        }
        $scope.grids1=true;
        $scope.Grids1=true;
        $scope.gridChange1=function(index){
            if(index==1){
                $scope.grids2=false;
                $scope.grids1=true;
            }else if(index==2){
                $scope.Grids2=false;
                $scope.Grids1=true;
            }else if(index==3){
                $scope.grid2=false;
                $scope.grid1=true;
            }


        }

        //专项资金项下任务的分类
        $scope.clickGoing=function(project){
            $scope.searchone = {page: {}};
            var currentCheck = function (page, callback) {
                $scope.searchone.page = page;
                $scope.searchone.subordinateType='1';
                $scope.searchone.subordinateId=$scope.project .specialId;
                //$scope.project.tasksId='9';
                $http.post(url + '/Tasks/listPageTaskbySubordinateIdAndType2', {Tasks: $scope.searchone}).success(callback);
                console.log($scope.searchone);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
            //$scope.demo=false;
            $scope.specialProject=false;
            $scope.ongoing=false;
            $scope.ongoing1=false;
            $scope.details=true;
            $scope.all=false;
            $scope.isNotComplete=true;
            $scope.clickGoing1=true;
            $scope.clickCompleted1=false;
        };

        $scope.clickCompleted=function(project){
            var currentCheck = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url + '/Tasks/listPageTaskbySubordinateIdAndType1', {Tasks: $scope.searchone}).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
            //$scope.demo=false;
            $scope.taskDemo=true;
            $scope.specialProject=false;
            $scope.ongoing=false;
            $scope.ongoing1=false;
            $scope.details=true;
            $scope.all=false;


            $scope.clickGoing1=false;
            $scope.clickCompleted1=true;
        };

        /*//传任务ID给工单页面
        $scope.taskDetailsId = function(taskId,taskState){
            //$location.path("/index/serviceRequest/taskDetails/"+taskId);
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:'',taskState:taskState}));
            $location.path("/index/serviceRequest/repairOrder");
        }*/
        //传任务ID给工单页面
        $scope.taskDetailsId = function(taskId,taskState,buildingStructureNew,serviceRequestId){
            localStorage.setItem('item',JSON.stringify({taskId:taskId,taskState:taskState,buildingStructureNew:buildingStructureNew,serviceRequestId:serviceRequestId}))
            $location.path("/index/serviceRequest/repairOrder");
        }

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            console.log(data);
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            layer.msg("获取人员信息失败,请稍后重试!",{icon:2});
            return''
        });

        $scope.aaa={};


        //修改状态
        $scope.change = function(maintain){
            $scope.aaa=maintain;
            console.log(maintain);
            $scope.aaa.remarks='';

        }

        //集中处理
        //$scope.updateTasks=function(){
        //    if($scope.aaa.taskState == 10){
        //        alert("任务已经是集中处理状态!");
        //        return;
        //    }
        //    $scope.aaa.taskState=10;
        //    $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
        //        alert("任务转集中处理成功!");
        //    }).error(function(data,status,headers,config){
        //        alert("任务转集中处理失败,请稍后重试！");
        //    })
        //};
        //转专项处理
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                layer.msg("任务已经是转专项状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //console.log($scope.aaa.taskId);
                layer.msg("任务转专项成功!",{icon:1})
                return;
            }).error(function(data,status,headers,config){
                //console.log(data);
                later.msg("任务转专项失败,请稍后重试!",{icon:2});
                return;
            })
        };

        //转出处理
        $scope.updateRollOut=function(){
            if($scope.aaa.taskState == 5){
                layer.msg("任务已经是转出状态!",{icon:0});
                return;
            }
            if($scope.aaa.type==null || $scope.aaa.type==''){
                layer.msg('请选择转出类型!',{icon:0});
                return;
            }
            if($scope.aaa.staff.staffName==null || $scope.aaa.staff.staffName==''){
                layer.msg('请填写转出接手人!',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==''){
                layer.msg('请填写转出说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState=5;
            $scope.aaa.taskOutType=$scope.aaa.type;
            $scope.aaa.principal=$scope.aaa.staff.staffName;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //console.log($scope.aaa.taskId);
                layer.msg("任务成功转出成功!",{icon:1});
                $scope.aaa.type='';
                $scope.aaa.staff.staffName='';
                $scope.aaa.remarks='';
                return;
            }).error(function(data,status,headers,config){
                layer.msg("任务转出操作失败,请稍后重试!",{icon:2});
                return;
            })
        };
        //接受
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
                layer.msg("任务已经是接受状态！",{icon:0});
                return;
            }
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务已经接受",{icon:0});
                return;
            }).error(function(data,status,headers,config){
                layer.msg("任务接受失败，请稍后重试!",{icon:2});
                return;
            })
        };
        //完成操作
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                layer.msg("任务已经是完成状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务完成操作成功",{icon:1});
                return;
            }).error(function(data,status,headers,config){
                layer.msg("任务完成失败,请稍后重试!",{icon:2});
                return;
            })
        };
        //关闭
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                layer.msg("任务已经是关闭状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务关闭操作成功",{icon:1});
                return;
            }).error(function(data,status,headers,config){
                layer.msg("任务关闭失败,请稍后重试!",{icon:2});
                return;
            })
        };

        //指派
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                layer.msg("任务已经是指派状态!",{icon:0});
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务指派成功!",{icon:1});
                $scope.aaa.staff.staffName='';
                return;
            }).error(function(data,status,headers,config){
                layer.msg("任务指派失败，请稍后重试!",{icon:2});
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
                layer.msg("催促操作成功",{icon:1});
                return;
            }).error(function(data,status,headers,config){
                layer.msg("催促操作失败,请稍后重试!",{icon:2});
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
                layer.msg("延时操作成功",{icon:1});
                console.log(data);
                $scope.ApplicationDelayRecords.delayTime="";
                $scope.aaa.remarks="";
                $scope.clickGoing();
                return;
            }).error(function(data,status,headers,config){
                layer.msg("延时操作失败,请稍后重试!",{icon:2});
                return;
            })
        };


        $scope.journal = {};
        $scope.bbb = {};
        $scope.specialChange = function(specialProject){
            $scope.bbb = specialProject;
            $scope.journal.remarks = "";
        }

        //专项资金项目关闭操作
        $scope.specialClosed = function(){
            if($scope.bbb.specialState == 0){
                layer.msg("专项资金已经是关闭状态!",{icon:0});
                return;
            }
            if($scope.journal.remarks==''||$scope.journal.remarks==null){
                layer.msg('失效备注不能为空！',{icon:0,time:1000})
                return;
            }
            $scope.journal.specialId = $scope.bbb.specialId;
            $scope.journal.changeState = 0;
            $scope.journal.operationPersonId = "11"  //操作人i
            console.log($scope.journal.specialId);
            $http.put(url + "/SpecialRepairProject/changeState",{
                SpecialRepairProjectJournal : $scope.journal
            }).success(function(data){
                layer.msg("任务失效操作成功",{icon : 1,time : 2000})
                getSpecialRepairProject();
                $scope.journal.remarks = "";
                return;
            }).error(function(){
                layer.msg("关闭操作失败，请稍后重试!",{icon:0,time:1000})
                return;
            });
        }

        //专项资金项目完成操作
        $scope.specialFinish = function(){
            if($scope.bbb.specialState == 2){
                layer.msg("专项资金已经是完成状态!",{icon:0});
                return;
            }
            if($scope.journal.remarks==''||$scope.journal.remarks==null){
                layer.msg('完成备注不能为空！',{icon:0,time:1000})
                return;
            }
            $scope.journal.specialId = $scope.bbb.specialId;
            $scope.journal.changeState = 2;
            $scope.journal.operationPersonId = "11"  //操作人id
            $http.put(url + "/SpecialRepairProject/changeState",{
                SpecialRepairProjectJournal : $scope.journal
            }).success(function(data){
                layer.msg("任务完成操作成功!",{icon : 1,time : 2000});
                getSpecialRepairProject();
                $scope.journal.remarks='';
                console.log(getSpecialRepairProject)
                return;
            }).error(function(){
                layer.msg("完成操作失败，请稍后重试!",{icon:2})
                return;
            });
        }

        $scope.Datil={
            /**项目类型**/
            Type: [
                { id: '1',name:'维修' }
            ]
        };

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

     /*   $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
            console.log($scope.person)
        };*/

        //指派 负责人
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

/*        //指派 负责人行选中
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
        }*/

        //指派 负责人 只能选择一个
        $scope.addPersons = function(index) {
            getChosedPets();
            if ($scope.personArray.length > 1) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                if(index==1){
                    $scope.specialRepairProject.specialPrincipal= $scope.accountRecord.staffName;
                    console.log($scope.specialRepairProject.specialPrincipal);
                }else if(index==2){
                    $scope.aaa.staff={};
                    $scope.aaa.staff.staffName=$scope.accountRecord.staffName;
                }else if(index==3){
                    $scope.aaa.staff={};
                    $scope.aaa.staff.staffName=$scope.accountRecord.staffName;
                }


            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }

        //取消的方法
        $scope.CloseAlls = function(index){
            if(index==1){
                $scope.ApplicationDelayRecords.delayTime='';
            }else if(index==2){
                $scope.aaa.staff.staffName='';
                $scope.aaa.remarks='';
            }else if(index==3){
                $scope.aaa.remarks='';
                $scope.aaa.staff.staffName='';
            }else if(index==4){
                $scope.aaa.remarks='';
            }else if(index==5){
                $scope.aaa.remarks='';
            }else if(index==6){
                $scope.aaa.remarks='';
            }
        }


        //上传照片
        $(function(){
            // 初始化插件
            $("#zyupload").zyUpload({
                width            :   "420px",                 // 宽度
                height           :   "auto",                 // 高度
                itemWidth        :   "140px",                 // 文件项的宽度
                itemHeight       :   "115px",                 // 文件项的高度
                url              :   fileUrl+"/FileService",  // 上传文件的路径
                fileType         :   ["jpg","png","jpeg","gif","docx","xlsx","pptx"],// 上传文件的类型
                fileSize         :   51200000,                // 上传文件的大小
                multiple         :   true,                    // 是否可以多个文件上传
                dragDrop         :   true,                    // 是否可以拖动上传文件
                tailor           :   true,                    // 是否可以裁剪图片
                del              :   true,                    // 是否可以删除文件
                finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    console.info(selectFiles);
                },
                onDelete: function(file, files){
                    console.info(file.name);
                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    console.info("此文件上传成功：");
                    console.info(file.name);
                    console.info("此文件上传到服务器地址：");
                    filePath=response;

                    $scope.annex.annexAddress=filePath;
                    $scope.annex.annexName=file.name;
                    $scope.annexs.push($scope.annex);
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    console.info("此文件上传失败：");
                    console.info(file.name);
                },
                onComplete: function(response){           	  // 上传完成的回调方法
                    console.info("文件上传完成");
                    console.info(response);
                }
            });
        });

    }]);
});