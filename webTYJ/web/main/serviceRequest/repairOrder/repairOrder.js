/**
 * Created by NM on 2018/1/18.
 * 工单js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('repairOrderCtrl', ['$scope', '$http','$rootScope','$stateParams','$location','$timeout', function ($scope,$http,$rootScope,$stateParams,$location,$timeout) {

        var localStorageItem=JSON.parse(localStorage.getItem('item'));
        console.log(localStorageItem);
        $scope.taskId = localStorageItem.taskId;
        $scope.taskState = localStorageItem.taskState;
        $scope.taskType = localStorageItem.taskType;
        console.log($scope.taskType);
        if(localStorageItem.buildingStructureNew!=null&&localStorageItem.buildingStructureNew.id!=null){
            $scope.addressId = localStorageItem.buildingStructureNew.id;
        }
        $scope.serviceRequestId = localStorageItem.serviceRequestId;
        $scope.taskShow = true;
        //未接受、转出、失效
        if($scope.taskState==5 || $scope.taskState==4 || $scope.taskState==0){
            $scope.taskShow = false;
            $scope.AcceptShow = true;
        }
        if($scope.taskState==3) {
            $scope.AcceptShow = false;
        }
        if($scope.taskType==20){
            $scope.AddTask=false;
            $scope.order=false;
            $scope.AcceptShow = true;
        }else{
            $scope.AddTask=true;
            $scope.order=true;
        }
        if($scope.taskType==20 && $scope.taskState==3){
            $scope.AcceptShow = false;
        }


        var url=$rootScope.url;
        var filePath='';

        //临时对象（ps:存储图片）
        $scope.tempObj = {annexs:[]};

        //获取登录人的信息
        var loginUser = {employId : ''};
        $scope.loginName='';
        var loginUserCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.loginUser = loginUserCookie?loginUserCookie:loginUser;
        if($rootScope.user!=undefined)
        {
            localStorage.setItem('setUser',JSON.stringify($rootScope.user));

        }else
        {
            $rootScope.user = JSON.parse(localStorage.getItem('setUser'));
        };
        $scope.users=$rootScope.user;
        console.log($scope.users)
        console.log($scope.loginUser);
        //获取登录人名字

        if($scope.loginUser.staff != null){
            $scope.loginName = $scope.loginUser.staff.staffName;
        }else{
            $scope.loginName = '超级管理员';
        }

        var fileUrl=$rootScope.fileUrl;             //上传的文件路径
        $scope.annex={
            annexAddress:'',
            annexName:'',
            relationId:''
        };
        var user = {employId: ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        // var financialInfo = JSON.parse(sessionStorage.getItem("financialInfo"));
        $scope.user = userCookie ? userCookie : user;

        //$scope.order=true;
        $scope.order1=false;       //显示新建工单
        $scope.closed=false;      //显示工单关闭原因
        $scope.addTask1=function(){
            if($('#s').val()==''){
                layer.msg('请选择工单类型!',{icon:0,time:2000});
                return;
            }
            $scope.isActive = 1;
            $scope.typeShow=0;
            $scope.AddTask=true;
            $scope.order=true;
            $scope.order1=true;
            $('#zyuploadPraiseOrdersfile').show();
        };
        $scope.addTask2=function(){
            $scope.dropdownMenu1=true;
        };




        //显示隐藏新建工单
        var map = {"报价单":"div1", "检测":"div2", "处理":"div3","完成确认":"div4","赔偿给业主":"div5","表扬":"div6",
            "结算":"div7","回访":"div8","查抄电表":"div9","查抄水表":"div10","申诉工单":"div11","投诉工单":"div12",
            "咨询工单":"div13","固定车位工单":"div14","维修":"div15","验房":"div16","失效":"div17","向业主索赔":"div18"};
        $("#s").bind("change", function(){
            //修改了1887 bug
            //初始化了所有
            //徐文广 2016/5/23
            //console.log(this.value)
            $('textarea').val("");
            $('input').val("");
            if(this.value=='' || this.value==null){
                return;
            }
            var divId = map[this.value];
            /*if(divId=='div10'){
             $http.get(url +'/WaterMeterRecords/waterMeterRecordsbybuildigIds/'+ $scope.Tasks.addressId).success(function(data){
             $scope.WaterMeterRecords = data.WaterMeterRecords;
             });
             }
             if(divId=='div9'){
             $http.get(url +'/ElectricityMeterRecords/electricityMeterRecordsbybuildigId/'+ $scope.Tasks.addressId).success(function(data){
             $scope.ElectricityMeterRecords = data.ElectricityMeterRecords;
             });
             }*/
            if(divId=='div9'){
                $scope.loadElectrics($scope.Tasks.addressId);
            }else if(divId=='div10'){
               // $scope.loadWaters();
            }
            $("#"+divId).show().siblings().hide();
        });
        $scope.quoteItemRecordsList = {};
        $scope.settleAccountsItemRecordsSum = 0.00;
        $scope.orderChange=function(item){
            console.log(item);
            if($scope.TasksJournal==null||$scope.TasksJournal.length==0){
                return;
            }
            if(item == "结算"){
                var taskId = '';
                console.log($scope.TasksJournal);
                for(var i=0; i<$scope.TasksJournal.length; i++){
                    if($scope.TasksJournal[i].taskId != null || $scope.TasksJournal[0].taskId!=''){
                        taskId = $scope.TasksJournal[i].taskId;
                        break;
                    }
                }
                $http.get(url +'/QuoteItemRecords/getQuoteItemRecordsByTaskId/'+ taskId).success(function(data) {
                    $scope.quoteItemRecordsList = data.QuoteItemRecords;
                    console.log($scope.quoteItemRecordsList);
                    $scope.settleAccountsItemRecordsSum = 0.00;
                    for(var i=0; i<$scope.quoteItemRecordsList.length; i++){
                        $scope.settleAccountsItemRecordsSum += $scope.quoteItemRecordsList[i].quoteItemTotal;
                    }
                });
            }
        };
        /*$scope.waterMeter = {custId:'f22cd363-2809-4af4-9199-872c68ffc9be'}
         $http.post(url + '/WaterMeter/listPageWaterMeterByCustId',{WaterMeter : $scope.waterMeter}).success(function(data){
         console.log(data);
         }).error(function(data){
         layer.msg("没有关联的建筑",{icon : 3,time : 2000});
         });*/


        $scope.Tasks={};
        //绑定任务ID
        //$scope.Tasks.taskId=$stateParams.taskDetailsIds;
        $scope.Tasks.taskId=localStorageItem.taskId;
        //查询任务信息
        $http.get(url+'/Tasks/getTasksbyId/'+$scope.Tasks.taskId).success(function(data){
            $scope.Tasks= data.Tasks;
            console.log($scope.Tasks);
            if($scope.Tasks.addressId!=null){
                $scope.loadWaters();
                $scope.loadElectrics($scope.Tasks.addressId);
            }
        }).error(function(data,status,headers,config){
            layer.alert("失败！");
        });

        /**
         * 撤销
         */
        $scope.cancel=function(index){
            if(index!=5&&index!=8&&index!=9&&index!=10){
                return;
            }
            layer.confirm('是否要进行撤回？', {
                btn: ['是','否'] //按钮
            }, function(){
                var tasksState='';
                var type = '';
                if(index==5){
                    type = 'rollOut';
                    tasksState = '7';//处理中
                }else if (index==8){
                    type = 'merge';
                    tasksState = '7';//处理中
                }else if(index=9){
                    type = 'shiftSpecial';
                    tasksState = '7';//处理中
                }else if(index=10){
                    type = 'centralized';
                    tasksState = '7';//处理中
                }
                $http.get(url+'/Tasks/changeTasksStateById/'+$scope.taskId+'/'+tasksState+'/'+ type).success(function(data){
                    layer.msg('撤回成功！', {icon: 1});
                    $scope.load();
                }).error(function(){
                    layer.msg('撤回失败！', {icon: 2});
                });
            }, function(){
            });
        }

        //任务日志查询
        $scope.TasksJournal={};
        //$scope.TasksJournal.taskId=$stateParams.taskDetailsIds;
        $scope.TasksJournal.taskId=localStorageItem.taskId;
        $scope.enableToAdd=true;//判断是从历史跳转还是处理中跳转而来页面为：externalProfession/claimToCustomerManagement
        $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
            //$location.path("/index/serviceRequest/repairOrder/"+$scope.TasksJournal.taskId).search({taskDetailsId:$scope.TasksJournal.taskId});
            $scope.TasksJournal = data.TasksJournal;
            console.log($scope.TasksJournal);
        }).error(function(data,status,headers,config){
            alert("查询失败！");
        });

        $scope.load=function(){
            $scope.TasksJournal.taskId=localStorageItem.taskId;
            $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                $scope.TasksJournal = data.TasksJournal;
                console.log($scope.TasksJournal);
                $('#s').val('');
            }).error(function(data,status,headers,config){
            });
            $scope.order1=false;
        };
        /* ******************************************修改任务状态*****************************************    */
        /**
         *  负责人信息
         */
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
        /**
         *  获取专业线
         */
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!");
        });

        /**
         * 获取专项信息
         */
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            console.log ("获取专项信息失败,请稍后重试!");
        });

        /**
         * 获取集中处理项信息
         */
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjectsAlive").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            console.log("获取集中处理信息失败,请稍后重试!");
        });

        /**
         *  获取人员信息
         */
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            console.log("获取人员信息失败,请稍后重试!");
        });

        $scope.aaa={staff:{}};
        /**
         * 修改状态
         */
        $scope.change = function(index){
            /*if($scope.AcceptShow==true){
             layer.msg('请填接受任务!',{icon:0});
             return;
             }*/
            $scope.aaa=$scope.Tasks;
            if(index==1){
                $scope.mergePage();
            }
        };

        $scope.mergeList = {page:{}};
        $scope.mergePage=function(){
            var parent = function (page, callback) {
                $scope.mergeList.page = page;
                $scope.mergeList.taskType = $scope.Tasks.taskType;
                $scope.mergeList.taskId = $scope.Tasks.taskId;
                $http.post(url+'/Tasks/listPageTasksByType',{Tasks:$scope.mergeList}).success(callback);
            };
            $scope.mergeList = app.get('Paginator').list(parent,6);
            console.log($scope.mergeList);
        }

        /**
         *  集中处理
         */
        $scope.updateTasks=function(){
            if($scope.aaa.taskState == 10){
                layer.msg("任务已经是集中处理状态!");
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState=10;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务转集中处理成功!");
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                layer.msg("任务转集中处理失败,请稍后重试！");
            })
        };

        /**
         * 任务合并
         * zhuqi 20160711
         */
        $scope.merge = {};
        $scope.mergeTasks= function () {
            if($scope.mergeLists.length>2){
                layer.msg("每次只能合并一条任务!",{icon:0});
                return;
            }
            if($scope.aaa.taskState == 10){
                layer.msg("任务已经是集中处理状态!",{icon:0});
                return;
            }
            if($scope.aaa.taskState == 8){
                layer.msg("任务已经是合并状态!",{icon:0});
                return;
            }
            if($scope.merge.remarks==null || $scope.merge.remarks==0){
                layer.msg('请填写说明!',{icon:0});
                return;
            }
            $scope.merge.lesserTaskId = $scope.taskId;
            $http.post(url+'/TasksMerge/insertTasksMerge',{TasksMerge:$scope.merge}).success(function(data){
                layer.msg('任务合并成功!',{icon:1});
                $scope.aaa.remarks = "";
                $scope.mergeLists=[];
                $scope.load();
            }).error(function(data,status,headers,config){
                $scope.mergeLists=[];
                layer.msg('任务合并失败！',{icon:2});
            })
        }
        //合并任务选中 2016-07-11 yangshengquan
        $scope.x=false;             //用于绑定checkbox
        $scope.mergeLists=[];  //checkbox选择的关系对象集合
        $scope.mergeListIds=[]; //checkbox选择的关系对象主键集合
        $scope.mergeOrder=function(item){ 

                if (document.getElementById(item.taskId).checked == true) {
                    document.getElementById(item.taskId).checked = false;
                    document.getElementById(item.taskId).parentNode.parentNode.style.background = '';
                    if ($scope.mergeLists.length > 0) {
                        for (var i = 0; i < $scope.mergeLists.length; i++) {
                            if (item.taskId == $scope.mergeLists[i].taskId) {
                                $scope.mergeLists.splice(i, 1);
                            }
                        }
                    }
                } else {
                    document.getElementById(item.taskId).checked = true;
                    document.getElementById(item.taskId).parentNode.parentNode.style.background = '#f6f8fa';
                    $scope.mergeLists.push(item);
                }
                $scope.mergeListIds = [];
                if ($scope.mergeLists.length > 0) {
                    for (var i = 0; i < $scope.mergeLists.length; i++) {
                        $scope.mergeListIds.push($scope.mergeLists[i].taskId);
                    }
                }

        };





        /**
         * 转专项处理
         */
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                layer.msg("任务已经是转专项状态!",{icon:0});
                return;
            }
            if($scope.aaa.turnSpecialRecordsId==null || $scope.aaa.turnSpecialRecordsId==0){
                layer.msg('请选择转入专项资金维修项目！',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                layer.msg("任务转专项成功!");
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                console.log(data);
                alert("任务转专项失败,请稍后重试!");
            })
        };

        /**
         * 转出处理
         */
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
            //$scope.aaa.principal=$scope.aaa.staff.staffName;
            $scope.aaa.transferPrincipal=$scope.aaa.staff.staffId;//转出负责人
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                layer.msg("任务成功转出!",{icon:1});
                $scope.aaa.remarks = "";
                $scope.aaa.staff.staffName='';
                $scope.aaa.type='';
                $scope.load();
            }).error(function(data,status,headers,config){
                layer.msg("任务转出操作失败,请稍后重试!",{icon:2});
            })
        };

        /**
         * 接受
         */
        $scope.updateAccept=function(){
            if($scope.Tasks.taskState == 3){
                layer.msg('任务已经是接受状态！',{icon : 0});
                return;
            }
            if($scope.Tasks.taskState == 0){
                layer.msg('任务已经是失效状态！',{icon : 0});
                return;
            }
            if($scope.loginUser.staff==null||$scope.loginUser.staff.staffId==null){
                layer.msg('系统管理员不能接受任务！',{icon : 0});
                return;
            }
            $scope.Tasks.principal = $scope.loginUser.staff.staffId;
            $scope.aaa =$scope.Tasks;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                localStorage.setItem('item',JSON.stringify({taskId:localStorageItem.taskId,personId:localStorageItem.personId,taskState:3}))
                layer.msg("任务已经接受",{icon : 1});
                $scope.taskShow = true;
                $scope.AcceptShow = false;
                $scope.load();

            }).error(function(data,status,headers,config){
                layer.msg("任务接受失败，请稍后重试!");
            })
        };

        /**
         *  失效
         */
        $scope.updateClosed1=function(){
            if($scope.aaa.taskState == 0){
                layer.msg("任务已经是关闭状态!");
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写失效说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务关闭操作成功");
                $scope.aaa.remarks = "";
                localStorage.setItem('item',JSON.stringify({taskId:localStorageItem.taskId,personId:localStorageItem.personId,taskState:0}));
                $scope.taskShow = false;
                $scope.AcceptShow = true;
                $scope.load();
            }).error(function(data,status,headers,config){
                layer. msg("任务关闭失败,请稍后重试!");
            })
        };

        /**
         *  指派
         */
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                layer.msg("任务已经是指派状态!",{icon:0});
                return;
            }
            if($scope.chargeName==null || $scope.chargeName==0){
                layer.msg('请选择指派负责人!',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写指派说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务指派成功!",{icon:1});
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                alert("任务指派失败，请稍后重试!",{icon:0});
            })
        };

        /**
         * 完成操作
         */
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                layer.msg("任务已经是完成状态!",{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写完成说明!',{icon:0});
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg("任务完成操作成功",{icon:1});
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                layer.msg("任务完成失败,请稍后重试!",{icon:0});
            })
        };

        /**
         * 催促操作
         */
        $scope.UrgeTaskRecords={};
        $scope.urgeTask=function(){
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.msg('请填写催促说明!',{icon:0});
                return;
            }
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                layer.msg("催促操作成功",{icon:1});
                $scope.aaa.remarks = "";
                $scope.load();
            }).error(function(data,status,headers,config){
                layer.msg("催促操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
        };

        /**
         *  延时操作
         * @type {{}}
         */
        $scope.Dalay={};
        $scope.ApplicationDelayRecords = {};
        $scope.delayTask=function(){
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
            console.log($scope.aaa);
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                layer.msg("延时操作成功",{icon : 1,time : 2000});
                $scope.ApplicationDelayRecords.delayTime="";
                $scope.aaa.remarks = "";
                console.log(data);
                $scope.load();
            }).error(function(data,status,headers,config){
                alert("延时操作失败,请稍后重试!",{icon:0});
                $scope.aaa.remarks = "";
            })
        };



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


        $scope.accountRecord='';
        $scope.getdata1 = function(item){
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

        //指派 负责人 只能选择一个

        $scope.addPerson1 = function(index) {
            getChosedPets();
            if ($scope.personArray.length == 0) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                 if(index==1){
                    $scope.chargeName= $scope.accountRecord.staffName;
                }else if(index==2){
                    $scope.aaa.staff = {};
                    $scope.aaa.staff.staffName= $scope.accountRecord.staffName;
                     $scope.aaa.staff.staffId = $scope.accountRecord.staffId;
                }

            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }

        /*******************************************************************************************************/

        /**
         * 判断是否已经失效
         */
        $scope.item1=function(item){
            $scope.isActive = item.tasksJournalId
            $http.get(url +'/TasksJournal/getTasksJournalbyDateandType/'+ item.creOrderType+"/"+item.operationTime).success(function(data) {
                $scope.aa=data.TasksJournal;
                console.log($scope.aa);
                //赔偿给业主关闭先显示
                /* if($scope.aa.compensateOwner!=null){
                 if($scope.aa.compensateOwner.orderState==0){
                 $scope.closed=true;
                 }else{
                 $scope.closed=false;
                 }
                 }
                 //if($scope.aa.compensateOwner!=null){
                 //
                 //    $scope.imgList =  $scope.aa.compensateOwner.annexs;
                 //}*/


                if($scope.aa.compensateOwner!=null){
                    if($scope.aa.compensateOwner.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.compensateOwner.annexs)) {
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.compensateOwner.annexs);
                        $scope.aa.compensateOwner.annexs = $scope.annexList;
                    }
                }


                if($scope.aa.claimToCustomerOrders!=null){
                    if($scope.aa.claimToCustomerOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(!angular.isArray($scope.aa.claimToCustomerOrders.annexs)){
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.claimToCustomerOrders.annexs);
                        $scope.aa.claimToCustomerOrders.annexs = $scope.annexList;
                    }
                }

                //表扬单关闭显示

                if($scope.aa.praiseOrders!=null){
                    if($scope.aa.praiseOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(!angular.isArray($scope.aa.praiseOrders.annexs)){
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.praiseOrders.annexs);
                        $scope.aa.praiseOrders.annexs = $scope.annexList;
                    }
                }
                //结算单关闭显示
                if($scope.aa.settleAccountsOrders!=null){
                    if($scope.aa.settleAccountsOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.settleAccountsOrders.annexs)) {
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.settleAccountsOrders.annexs);
                        $scope.aa.settleAccountsOrders.annexs = $scope.annexList;
                    }
                }

                //完成确认单关闭显示
                if($scope.aa.acceptanceOrders!=null){
                    if($scope.aa.acceptanceOrders.orderState==0){
                        /*  alert($scope.aa.acceptanceOrders.orderState);*/
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.acceptanceOrders.annexs)) {
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.acceptanceOrders.annexs);
                        $scope.aa.acceptanceOrders.annexs = $scope.annexList;
                    }
                }

                //处理单关闭显示
                if($scope.aa.disposeOrder!=null){
                    if($scope.aa.disposeOrder.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }
                //if($scope.aa.disposeOrder!=null){
                //    $scope.imgList =  $scope.aa.disposeOrder.annexs;
                //}
                //检测单关闭显示
                if($scope.aa.checkOrders!=null){
                    if($scope.aa.checkOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.checkOrders.annexs)) {

                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.checkOrders.annexs);
                        $scope.aa.checkOrders.annexs = $scope.annexList;
                    }
                    if(angular.isArray($scope.aa.checkOrders.checkItemRecords)) {
                    }else{
                        $scope.checkItemRecord = [];
                        $scope.checkItemRecord.push($scope.aa.checkOrders.checkItemRecords);
                        $scope.aa.checkOrders.checkItemRecords = $scope.checkItemRecord;
                    }
                }

                //申诉单关闭显示

                if($scope.aa.appealOrders!=null){
                    if($scope.aa.appealOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.appealOrders.annexs)) {
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.appealOrders.annexs);
                        $scope.aa.appealOrders.annexs = $scope.annexList;
                    }
                }
                //投诉单关闭显示
                if($scope.aa.complaintOrders!=null){
                    if($scope.aa.complaintOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.complaintOrders.annexs)){

                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.complaintOrders.annexs);
                        $scope.aa.complaintOrders.annexs = $scope.annexList;
                    }
                }
                //咨询单关闭显示
                if($scope.aa.consultationOrders!=null){
                    if($scope.aa.consultationOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }
                //固定车位单关闭显示

                if($scope.aa.fixedParkingOrders!=null){
                    if($scope.aa.fixedParkingOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    /*if(angular.isObject($scope.aa.fixedParkingOrders.annexs)){
                     $scope.annexList = [];
                     $scope.annexList.push($scope.aa.fixedParkingOrders.annexs);
                     $scope.aa.fixedParkingOrders.annexs = $scope.annexList;
                     }*/
                    if(angular.isArray($scope.aa.fixedParkingOrders.annexs)){
                        ///
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.fixedParkingOrders.annexs);
                        $scope.aa.fixedParkingOrders.annexs = $scope.annexList;
                    }
                }
                //回访单关闭
                if($scope.aa.returnVisitOrders!=null){
                    switch($scope.aa.returnVisitOrders.attitude){
                        case 1:
                            $scope.aa.returnVisitOrders.attitude=1;
                            $scope.star1=true;
                            break;
                        case 2:
                            $scope.aa.returnVisitOrders.attitude=2;
                            $scope.star1=true;
                            $scope.star2=true;
                            break;
                        case 3:
                            $scope.aa.returnVisitOrders.attitude=3;
                            $scope.star1=true;
                            $scope.star2=true;
                            $scope.star3=true;
                            break;
                        case 4:
                            $scope.aa.returnVisitOrders.attitude=4;
                            $scope.star1=true;
                            $scope.star2=true;
                            $scope.star3=true;
                            $scope.star4=true;
                            break;
                        case 5:
                            $scope.aa.returnVisitOrders.attitude=5;
                            $scope.star1=true;
                            $scope.star2=true;
                            $scope.star3=true;
                            $scope.star4=true;
                            $scope.star5=true;
                            break;
                    }
                    switch($scope.aa.returnVisitOrders.completion){
                        case 1:
                            $scope.aa.returnVisitOrders.completion=1;
                            $scope.star6=true;
                            break;
                        case 2:
                            $scope.aa.returnVisitOrders.completion=2;
                            $scope.star6=true;
                            $scope.star7=true;
                            break;
                        case 3:
                            $scope.aa.returnVisitOrders.completion=3;
                            $scope.star6=true;
                            $scope.star7=true;
                            $scope.star8=true;
                            break;
                        case 4:
                            $scope.aa.returnVisitOrders.completion=4;
                            $scope.star6=true;
                            $scope.star7=true;
                            $scope.star8=true;
                            $scope.star9=true;
                            break;
                        case 5:
                            $scope.aa.returnVisitOrders.completion=5;
                            $scope.star6=true;
                            $scope.star7=true;
                            $scope.star8=true;
                            $scope.star9=true;
                            $scope.star10=true;
                            break;
                    }

                    switch($scope.aa.returnVisitOrders.processing){
                        case 1:
                            $scope.aa.returnVisitOrders.processing=1;
                            $scope.star11=true;
                            break;
                        case 2:
                            $scope.aa.returnVisitOrders.processing=2;
                            $scope.star11=true;
                            $scope.star12=true;
                            break;
                        case 3:
                            $scope.aa.returnVisitOrders.processing=3;
                            $scope.star11=true;
                            $scope.star12=true;
                            $scope.star13=true;
                            break;
                        case 4:
                            $scope.aa.returnVisitOrders.processing=4;
                            $scope.star11=true;
                            $scope.star12=true;
                            $scope.star13=true;
                            $scope.star14=true;
                            break;
                        case 5:
                            $scope.aa.returnVisitOrders.processing=5;
                            $scope.star11=true;
                            $scope.star12=true;
                            $scope.star13=true;
                            $scope.star14=true;
                            $scope.star15=true;
                            break;
                    }
                    if($scope.aa.returnVisitOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }
                //if($scope.aa.checkOrders!=null){
                //    $scope.imgList =  $scope.aa.checkOrders.annexs;
                //  alert( $scope.aa.checkOrders.annexs.annexAddress)
                //}
                //报价单
                if($scope.aa.quoteOrders!=null){
                    if($scope.aa.quoteOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.quoteOrders.annexs)) {

                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.aa.quoteOrders.annexs);
                        $scope.aa.quoteOrders.annexs = $scope.annexList;
                    }
                }
                if($scope.aa.quoteOrders!=null){
                    var tasksJ = $scope.aa.quoteOrders.itemRecords;
                    var pcust=0;
                    var tcust=0;
                    var wcust=0;
                    for(var i=0;i<tasksJ.length;i++){
                        if(tasksJ[i].quoteItemType == '1'){
                            pcust += parseFloat(tasksJ[i].quoteItemTotal)*parseFloat(tasksJ[i].quoteItemNum);
                        }else if(tasksJ[i].quoteItemType == '2'){
                            wcust += parseFloat(tasksJ[i].quoteItemTotal)*parseFloat(tasksJ[i].quoteItemNum);
                        }else if(tasksJ[i].quoteItemType == '3'){
                            tcust +=parseFloat(tasksJ[i].quoteItemTotal)*parseFloat(tasksJ[i].quoteItemNum);
                        }
                    }
                    $scope.personCust = pcust;
                    $scope.toolCust=tcust;
                    $scope.wuLiaoCust=wcust;
                    $scope.imgList =  $scope.aa.quoteOrders.annexs;
                }
                //维修单
                if($scope.aa.RepairOrders!=null){
                    if($scope.aa.RepairOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }

                //查抄水表单关闭显示
                if($scope.aa.waterMeterOrders!=null){
                    if($scope.aa.waterMeterOrders.orderState==0){
                        //alert($scope.aa.waterMeterOrders.orderState);
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    //$scope.loadWaters();
                }
                //电表单
                if($scope.aa.meterReadingOrders!=null){
                    if($scope.aa.meterReadingOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    $scope.loadElectrics($scope.Tasks.addressId);
                }

            }).error(function(data,status,headers,config){
                alert("查询失败！");
            });
            //$scope.order=false;
            $scope.order1=false;
            if(item.creOrderType==1){
                $scope.typeShow=3;
            }else if(item.creOrderType==2){
                $scope.typeShow=4;//完成确认单
            }else if(item.creOrderType==3){
                $scope.typeShow=2;
            }else if(item.creOrderType==4){
                //结算单
                $scope.typeShow=7;
            }else if(item.creOrderType==5){
                //赔偿给业主
                $scope.typeShow=5;
            }else if(item.creOrderType==6){
                $scope.typeShow=6;
            }else  if(item.creOrderType==0){
                //报价单
                $scope.typeShow=1;
            }else  if(item.creOrderType==7){
                //回访
                $scope.typeShow=8;
            }else  if(item.creOrderType==8){
                //申诉
                $scope.typeShow=9;
            }else  if(item.creOrderType==9){
                //抄水表
                $scope.typeShow=10;
            }else  if(item.creOrderType==10){
                //抄电表
                $scope.typeShow=11;
            }else  if(item.creOrderType==11){
                //投诉
                $scope.typeShow=12;
            }
            else  if(item.creOrderType==12){
                //咨询
                $scope.typeShow=13;
            }
            else  if(item.creOrderType==13){
                //固定工单
                $scope.typeShow=14;
            }
            else  if(item.creOrderType==17){
                //表扬表
                $scope.typeShow=17;
            }
            else if(item.creOrderType==22) {
                //维修单
                $scope.typeShow = 22;
            }else if(item.creOrderType==23){
                //向业主索赔
                $scope.typeShow=23;
            }else if(item.creOrderType==24){
                //失效单
                $scope.typeShow=24;
            }
            else if(item.creOrderType==20){
                //巡检
                $scope.typeShow=20;
            }
            else{
                layer.msg('工单类型不存在!',{icon : 2});
            }
        };


        //打开选择工单类型下拉框
        $scope.addTask=function(){
            $scope.typeShow=0;
            $scope.AddTask=true;
            $scope.order=true;
            $scope.order1=true;
        };


        /*****************  咨询工单方法  *********************/

            //输入客户问题时改变faq检索处的值
        $scope.Faqs = {};
        $scope.changeFaqs = function(){
            var item = document.getElementById("faqquestion").value;
            $scope.Faqs = {};
            $scope.Faqs.faqQuestionName = item;
        };

        //失去焦点
        $scope.blurFaqs = function(){
            $scope.getFaqs();
        };

        //根据客户提问查询FAQS中的数据
        $scope.FaqsList = [];
        $scope.getFaqs = function(){
            /*if($scope.Faqs.faqQuestionName == "" || angular.isUndefined($scope.Faqs.faqQuestionName)){
             $scope.FaqsList = [];
             layer.alert('请输入问题！',{icon : 0});
             }else{*/
            $http.post(url + '/Faqs/getFaqsByQuestionName/' + $scope.Faqs.faqQuestionName).success(function(data){
                $scope.FaqsList = data.Faqs;
                if( $scope.FaqsList.length==0){
                    layer.msg('查无数据！',{icon:0});
                    $scope.FaqsList = [];
                    return;
                }
                if($scope.FaqsList.length==1){
                    $timeout(function(){
                        document.getElementById($scope.FaqsList[0].faqQuestionId).checked = true;
                    },100);
                    document.getElementById($scope.FaqsList[0].faqQuestionId).checked = true;
                    $scope.addfaqType($scope.FaqsList[0].faqQuestionId);
                }
            }).error(function(data){
            });
            //}
        };

        //实现FAQS单选效果并将选中的问题的faqQuestionId存入咨询单
        $scope.addfaqType = function(id){
            var faqidList = document.getElementsByName("faqQuestionId");
            if(document.getElementById(id).checked == true){
                for(var i = 0; i < faqidList.length; i ++){
                    if(faqidList[i].id == id){
                        document.getElementById(id).checked = true;
                        $scope.ConsultationOrders.faqQuestionId = id;
                        for(var j = 0; j < $scope.FaqsList.length; j ++){
                            if(faqidList[i].id == $scope.FaqsList[j].faqQuestionId){
                                $scope.ConsultationOrders.problemType = $scope.FaqsList[j].faqTypes.faqTypeId;
                            }
                        }
                    } else{
                        document.getElementById(faqidList[i].id).checked = false;
                    }
                }
            }else{
                $scope.ConsultationOrders.faqQuestionId = '';
                $scope.ConsultationOrders.problemType = '';
            }
        };

        //将选中的FAQS引用进咨询单引用显示
        $scope.addFaqToConsultationOrders = function(){
            var faqidList = document.getElementsByName("faqQuestionId");
            if(faqidList.length == 0){
                layer.alert('请先查询出FAQ后再进行引用！',{icon : 0});
                // alert("请先查询出FAQ后再进行引用");
            }else{
                var num = 0;
                for(var i = 0; i < faqidList.length; i ++){
                    if(document.getElementById(faqidList[i].id).checked == true){
                        for(var j = 0; j < $scope.FaqsList.length; j ++){
                            if(faqidList[i].id == $scope.FaqsList[j].faqQuestionId){
                                var showfaq = "问题编号：" + $scope.FaqsList[j].faqQuestionNum + '\n'
                                    + "问：" + $scope.FaqsList[j].faqQuestionName + '\n'
                                    + "答：" + $scope.FaqsList[j].faqQuestionAnswer;
                                document.getElementById("faqId").value = showfaq;
                            }
                        }
                        num ++;
                    }
                }
                if(num == 0){
                    alert("请先选择一条问题记录后再引用！");
                }
            }
        };
        /*//初始化申诉单关闭原因  bug1882 xuwenguang 2016/5/20
         $scope.close=function(){
         $scope.aa.appealOrders.closeRemarks = '';
         };*/

        //取消新增咨询工单并关闭新增页面
        $scope.colseConsultation = function(index) {
            $scope.Faqs = {};
            $scope.FaqsList = [];
            $scope.ConsultationOrders = {};
            document.getElementById("faqId").value = "";
            $scope.order1 = false;
            //清空报价单
            if (index==1) {
                $scope.itemRecords = [];
                $scope.QuoteOrders.discount = '';
                $scope.QuoteOrders.finalPrice = '';
                $scope.QuoteOrders.signature = '';
                $scope.QuoteOrders.allTotal = 0;
                $scope.aa.quoteOrders.annexs = [];
            }else if(index==2){
                //清空检测单
                $scope.CheckOrdersService.checkItemRecords=[];
                $scope.CheckOrdersService.remarks='';
                $scope.CheckOrdersService.signatory='';
                $scope.CheckOrdersService.annexs=[];
            }else if(index==3){
                //清空完成确认单
                $scope.AcceptanceOrders.acceptanceItemResult='';
                $scope.AcceptanceOrders.remarks='';
                $scope.AcceptanceOrders.signatory='';
                $scope.aa.acceptanceOrders.annexs=[];
            }else if(index==4){
                //清空赔偿给业主
                $scope.compensateOwner.compensateObjectName='';
                $scope.CompensateOrderss=[];
                $scope.compensateOwner.compensateMethods.compensateStartTime='';
                $scope.compensateOwner.compensateMethods.compensateEndTime='';
                $scope.compensateOwner.remarks='';
                $scope.compensateOwner.compensatename='';
                $scope.aa.compensateOwner.annexs=[];
            }else if(index==5){
                //清空表扬单
                $scope.PraiseOrders.praiseObjectId='';
                $scope.PraiseOrders.praiseObjectName='';
                $scope.PraiseOrders.remarks='';
                $scope.aa.praiseOrders.annexs=[];
            }else if(index==6){
                //清空结算单
                $scope.SettleAccountsOrders.allTotal='';
                $scope.SettleAccountsOrders.signature='';
                $scope.SettleAccountsOrders.annexs=[];
            }else if(index==7){
                //清空水表单
                $scope.aa.waterMeterOrders.waterMeterOrderRecords.waterMeterReading='';
                $scope.aa.waterMeterOrders.remarks='';
                $scope.aa.waterMeterOrders.annexs=[];
            }else if(index==8){
                //清空电表单
                $scope.aa.meterReadingOrders.meterReadingRecords.waterMeterReading='';
                $scope.aa.meterReadingOrders.remarks='';
                $scope.aa.meterReadingOrders.annexs=[];
            }else if(index==9){
                //清空申诉单
                $scope.AppealOrders.remarks='';
                $scope.AppealOrders.annexs=[];
            }else if(index==10) {
                //清空投诉单
                $scope.ComplainOrders.complaintObjectName = '';
                $scope.ComplainOrders.remarks = '';
                $scope.ComplainOrders.annexs = [];
            }else if(index==11) {
                //清空咨询工单
                $scope.ConsultationOrders.problemRemarks = '';
                $scope.ConsultationOrders.remarks = '';
                $scope.Faqs.faqQuestionName = '';
                $scope.FaqsList = [];
            }else if(index==12) {
                //清空固定车位
                $scope.FixedParkingOrders.parkingOperation = '';
                $scope.FixedParkingOrders.remarks = '';
                $scope.FixedParkingOrders.annexs = [];
            }else if(index==13) {
                //清空维修单
                $scope.ServiceOrderss = [];
                $scope.RepairOrders.remarks = '';
                $scope.RepairOrders.annexs = [];
            }else if(index==14) {
                //清空失效单
                $scope.ClosedOrders.remarks = '';
            }else if(index==15){
                //清空向业主索赔单
                $scope.ctcOrder.customerObjectName='';
                $scope.ctcOrder.claimToCustomerRethods.claimMoney=''
                $scope.ctcOrder.remarks='';
                $scope.ctcOrder.signature='';
                $scope.ctcOrder.annexs=[];
            }else if(index==1){
                //处理工单
                //清空投诉单
                $scope.processService.processName = '';
                $scope.processService.remarks = '';
                $scope.processService.annexs = [];
            }
        };

        //新增咨询单
        $scope.ConsultationOrders={orderState:1,orderType:12};
        $scope.ConsultationOrders.taskId=localStorageItem.taskId;
        $scope.AddOrUpdateConsultationFile = function(){

            if($scope.ConsultationOrders.orderType==undefined)
            {
                $scope.ConsultationOrders.orderState = 1;
                $scope.ConsultationOrders.orderType = 12;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                if(($scope.ConsultationOrders.problemRemarks==undefined)||($scope.ConsultationOrders.problemRemarks=='')){
                    layer.alert('客户问题不能为空！',{icon : 0});
                    return;
                }
                if(($scope.FaqsList==undefined||$scope.FaqsList.length==0)&&($scope.ConsultationOrders.remarks==undefined)||($scope.ConsultationOrders.remarks=='')){
                    var faqs = {};
                    faqs.faqQuestionName = $scope.ConsultationOrders.problemRemarks;
                    faqs.personCustId= $rootScope.user.custId;
                    faqs.crePersonId = localStorageItem.taskId;
                    $http.post(url+'/Faqs/insertFaqs', {Faqs : faqs}).success(function(){
                        layer.msg('新增成功,已生成代办FAQ！',{icon : 1,time:2000});
                    }).error(function(){
                        layer.alert('新增咨询工单失败！',{icon : 2,time:2000});
                    });
                }
                $scope.ConsultationOrders.personId = localStorageItem.personId;
                $scope.ConsultationOrders.taskId=localStorageItem.taskId;
                $http.post(url+'/ConsultationOrders/insertConsultationOrders',{ConsultationOrders:$scope.ConsultationOrders}).success(function(){
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.ConsultationOrders.taskId).search({taskDetailsId:$scope.ConsultationOrders.taskId});
                    layer.msg('新增咨询工单成功！',{icon : 1,time:2000});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.alert('新增咨询工单失败！',{icon : 2,time:2000});
                });
            }else{
                layer.alert('新增咨询工单失败！',{icon : 2,time:2000});
            }
            $scope.colseConsultation();
        };
        /*$scope.closeRemarks=function(){
         $scope.aa.consultationOrders.closeRemarks='';
         }*/

        //关闭咨询
        $scope.CloseConsultationOrders=function(){
            if( $scope.aa.consultationOrders.orderState==0){
                layer.alert('咨询单已经是关闭状态！',{icon : 2});
                $scope.aa.consultationOrders.closeRemarks='';
                return;
            }
            $scope.consultorder = {};
            $scope.consultorder = $scope.aa.consultationOrders;

            $scope.aa.consultationOrders.closeRemarks=$scope.consultationOrders.closeRemarks;
            // $scope.aa.consultationOrders.closePersonId=14;
            $scope.aa.consultationOrders.closePersonId=$scope.loginUser.companyId;
            $http.put(url+"/ConsultationOrders/closeConsultationOrders",{ConsultationOrders: $scope.aa.consultationOrders}).success(function(){
                layer.msg('关闭成功!',{icon : 1});
                $scope.consultorder.creOrderType = $scope.consultorder.orderType;
                $scope.consultorder.operationTime = $scope.consultorder.finishTime;
                $scope.item1($scope.consultorder);
            }).error(function(data,status,headers,config){
                layer.alert('关闭失败！',{icon : 2});
            });
            $scope.aa.consultationOrders.closeRemarks={}
        };
        /*****************  咨询工单方法  *********************/


        /*****************  维修单方法    *********************/
        $scope.annexs = [];
        //新建维修单
        $scope.RepairOrders={orderState:1,orderType:22,serviceRequestId:$scope.Tasks.serverId,annexs:[]};
        $scope.RepairOrders.annexs = $scope.annexs;
        $scope.RepairOrders.itemRecords=[];
        //$scope.RepairOrders.taskId=$stateParams.taskDetailsIds;
        $scope.RepairOrders.itemRecords.quoteItemType=[{}];
        $scope.AddOrUpdateRepairOrders=function(taskId){
            if($scope.RepairOrders.orderType==undefined)
            {
                $scope.RepairOrders.orderState = 1;
                $scope.RepairOrders.orderType = 22;
            }

            if(($scope.RepairOrders.remarks==undefined)||($scope.RepairOrders.remarks.length==0)){
                layer.alert('处理说明不能为空！',{icon : 0});
                return;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.RepairOrders.taskId=$scope.Tasks.taskId;
                console.log($scope.RepairOrders);
                $http.post(url+'/RepairOrders/insertRepairOrders',{RepairOrders:$scope.RepairOrders}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$scope.RepairOrders.taskId= $stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.RepairOrders.taskId).search({taskDetailsId:$scope.RepairOrders.taskId});
                    $scope.load();


                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });

            }else{
                alert("任务不存在！");
            }
            $scope.RepairOrders={};
        };

        //关闭维修单
        $scope.CloseRepairOrders=function(){
            if( $scope.RepairOrders.orderState ==0){
                layer.alert('维修单已经是关闭状态！',{icon : 0});
                $scope.aa.RepairOrders.closeRemarks='';
                return;
            }
            if(($scope.aa.RepairOrders.closeRemarks==undefined)||($scope.aa.RepairOrders.closeRemarks.length==0)){
                layer.alert('失效原因不能为空！',{icon : 0});
                return;
            }
            if(($scope.aa.RepairOrders.closePersonId==undefined)||($scope.aa.RepairOrders.closePersonId=='')){
                layer.alert('失效操作人不能为空！',{icon : 0});
                return;
            }

            $scope.repairorder = {};
            $scope.repairorder = $scope.aa.repairOrders;
            $http.put(url+"/RepairOrders/closeConsultationOrders",{RepairOrders: $scope.aa.repairOrders}).success(function(data){
                layer.alert('关闭成功！',{icon : 1});
                $scope.repairorder.creOrderType = $scope.repairorder.orderType;
                $scope.repairorder.operationTime = $scope.repairorder.finishTime;
                $scope.item1($scope.repairorder);
                $scope.RepairOrders.orderState =0;
            }).error(function(data,status,headers,config){
                alert("关闭失败！");
            });
            $scope.aa.repairOrders.closeRemarks={};
        };

        //维修单上传
        $scope.repairOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="15";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
        //移除图片
        $scope.delPic15 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.RepairOrders.annexs;
            $scope.RepairOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.RepairOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

        $scope.personFifteen={};
        $scope.RepairOrders.signatory1={};
        $scope.choicePerson15=function(person){
            $scope.index='';
            $scope.personFifteen=person;
            $scope.index=person.custId;
            $scope.RepairOrders.signatory1= $scope.personFifteen.name;
        };




        //添加行
        $scope.ServiceOrderss = [{}];
        $scope.addService=function(){
            if($scope.ServiceOrderss.length==0){
                document.getElementById('allChoose1').checked = false;
            }
            var item={};
            item.id=app.get('tyjUtil').uuid();
            //console.log(item);
            $scope.ServiceOrderss.push(item);
        };
        //删除行

        $scope.deleteService=function(){
            var count = 0;
            angular.forEach($scope.ServiceOrderss,function(item){
                if(document.getElementById(item.id).checked){
                    count++;
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.ServiceOrderss;
                $scope.ServiceOrderss = [];
                for(var i = 0;i<temp.length;i++){
                    console.log(document.getElementById(temp[i].id).checked);
                    if(!document.getElementById(temp[i].id).checked){
                        $scope.ServiceOrderss.push(temp[i]);
                    }
                }
                $scope.$apply(function(){
                    $scope.ServiceOrderss;
                });
                layer.msg('删除成功！',{icon :1,time : 1000});
            },function(){

            });
        };


        $scope.personSix={};
        $scope.RepairOrders.signatory1={};
        $scope.choicePersonSix=function(person){
            $scope.index='';
            $scope.personSix=person;
            $scope.index=person.custId;
            $scope.RepairOrders.signatory1= $scope.personSix.name;
        };


        /*****************  维修单方法    *********************/


        /*****************  失效单方法    *********************/

            //新建失效单
        $scope.ClosedOrders={orderState:1,orderType:24,serviceRequestId:$scope.Tasks.serverId};
        //$scope.ClosedOrders.tasksId=$stateParams.taskDetailsIds;
        $scope.updateClosed=function(taskId){
            if ($scope.ClosedOrders.remarks == null || $scope.ClosedOrders.remarks.length == 0){
                layer.alert('请填写失效说明!',{icon:0});
                return;
            }
            $scope.Tasks.taskState=0;
            $scope.Tasks.remarks =  $scope.ClosedOrders.remarks;

            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.Tasks}).success(function(data){
                if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                    $scope.ClosedOrders={orderState:1,orderType:24,serviceRequestId:$scope.Tasks.serverId};
                    //$scope.ClosedOrders.tasksId=$stateParams.taskDetailsIds;
                    $http.post(url+'/ClosedOrders/insertClosedOrders',{ClosedOrders:$scope.ClosedOrders}).success(function(){
                        $scope.taskShow = false;
                        localStorage.setItem('item',JSON.stringify({taskId:localStorageItem.taskId,personId:localStorageItem.personId,taskState:4}))
                        layer.msg('提交成功',{icon : 1,time : 2000});
                        //$scope.ClosedOrders.tasksId= $stateParams.taskDetailsIds;
                        //$location.path("/index/serviceRequest/repairOrder/"+$scope.ClosedOrders.tasksId).search({taskDetailsIds:$scope.ClosedOrders.tasksId});
                        $scope.load();

                    }).error(function(data,status,headers,config){
                        layer.msg("提交失败",{icon : 3,time : 2000});
                    });

                }else{
                    layer.msg("提交失败",{icon : 3,time : 2000});
                }
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });

            $scope.ClosedOrders={};
        };



        //关闭失效单
        $scope.CloseClosedOrders=function(){
            if( $scope.aa.closedOrders.orderState==0){
                layer.alert('失效单已经是关闭状态！',{icon : 2});
                $scope.aa.closedOrders.closeRemarks='';
                return;
            }
            $scope.closedOrder= {};
            $scope.closedOrder = $scope.aa.closedOrders;
            $http.put(url+"/ClosedOrders/changeClosedOrders",{ClosedOrders: $scope.aa.closedOrders}).success(function(data){

                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.closedOrder.creOrderType = $scope.closedOrder.orderType;
                $scope.closedOrder.operationTime = $scope.closedOrder.finishTime;
                $scope.item1($scope.closedOrder);
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.closedOrders.closeRemarks={};
        };
        /*****************  失效单方法    *********************/



        /*****************  报价单方法    *********************/

        $scope.quoteItem = {};
        $scope.products=[];
        $scope.quoteChange=function(index){
            $http.get(url+'/ProductCommonservice/getProductCommonListByType/'+index).success(function(data){
                $scope.products=data;
                console.log($scope.products)
            }).error(function(){
            });
        }

        $scope.products2=[];
        $scope.maintainChange=function(index){
            $http.get(url+'/ProductCommonservice/getProductCommonListByType/'+index).success(function(data){
                $scope.products2=data;
                console.log($scope.products2)
            }).error(function(){
            });
        }

            //新建报价单
        $scope.annexs=[];
        $scope.QuoteOrders={orderState:1,orderType:0,serviceRequestId:$scope.Tasks.serverId};
        $scope.QuoteOrders.annexs =  $scope.annexs;
        $scope.QuoteOrders.itemRecords=[];
        //$scope.QuoteOrders.taskId=$stateParams.taskDetailsIds;
        $scope.QuoteOrders.itemRecords.quoteItemType=[{}];
        //报价单提交
        $scope.AddOrUpdateQuoteOrders=function(taskId){
            $scope.itemRecord = {
                quoteItemType:"1",
                quoteItemName: "",
                quoteItemNum: "",
                quoteItemTotal: "",
                finalPrice:"",
                discount:""
            };

            if($scope.itemRecords==null || $scope.itemRecords.length==0){
                layer.alert('请选择报价类型！',{icon:0});
                return;
            }
            for(var i=0; i<$scope.itemRecords.length; i++){
                if($scope.itemRecords[i].quoteItemType==null || $scope.itemRecords[i].quoteItemType==''){
                    layer.alert('请选择类型！',{icon:0});
                    return;
                }
                if($scope.itemRecords[i].quoteItemName==null || $scope.itemRecords[i].quoteItemName==''){
                    layer.alert('请选择名称！',{icon:0});
                    return;
                }
                var univalent = app.get("valueCheck").isOnlyNumberAndNotNull($scope.itemRecords[i].quoteItemPrice);
                if(!univalent.state){
                    layer.alert('单价'+univalent.info,{icon:0});
                    return;
                }
                var number = app.get("valueCheck").isOnlyNumberAndNotNull($scope.itemRecords[i].quoteItemNum);
                if(!number.state){
                    layer.alert('数量'+number.info,{icon:0});
                    return;
                }
                $scope.itemRecords[i].quoteItemTotal = $scope.itemRecords[i].quoteItemPrice * $scope.itemRecords[i].quoteItemNum;
                /*if($scope.itemRecords[i].quoteItemTotal==null || $scope.itemRecords[i].quoteItemTotal==''){
                 $scope.itemRecords[i].quoteItemTotal = 0;
                 }*/
            }
            $scope.QuoteOrders.itemRecords=[];
            $scope.QuoteOrders.itemRecords.push($scope.itemRecords);

            var finalPrice = app.get("valueCheck").isOnlyNumberAndNotNull($scope.QuoteOrders.finalPrice);
            if(!finalPrice.state){
                layer.alert('最终价格'+finalPrice.info,{icon:0});
                return;
            }
            if ($scope.QuoteOrders.signature == null || $scope.QuoteOrders.signature == 0){
                layer.alert('请填写签字人！',{icon:0});
                return;
            }
            if($scope.QuoteOrders.discount==null || $scope.QuoteOrders.discount==''){
                $scope.QuoteOrders.discount = '无';
            }
            console.log($scope.QuoteOrders);
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.QuoteOrders.taskId=$scope.Tasks.taskId;
                $http.post(url+'/QuoteOrders/insertQuoteOrders',{  QuoteOrders:$scope.QuoteOrders}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    //$scope.QuoteOrders.taskId= $stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.QuoteOrders.taskId).search({taskDetailsIds:$scope.QuoteOrders.taskId});
                    $scope.load();
                    $scope.itemRecords = [];
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});

                });

            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.QuoteOrders={}
        };
        //计算总计 zhuqi 2016.06.14
        $scope.SumOrUpdateQuoteOrders = function(){
            $scope.QuoteOrders.allTotal = 0.00;
            for(var i=0; i<$scope.itemRecords.length; i++){
                if(!isNaN($scope.itemRecords[i].quoteItemPrice) && !isNaN($scope.itemRecords[i].quoteItemNum)){
                    $scope.QuoteOrders.allTotal += $scope.itemRecords[i].quoteItemPrice * $scope.itemRecords[i].quoteItemNum;
                }
            }
        };
        //计算折扣后的总额 zhuqi 2016.06.14
        $scope.itemRecordsDiscount = 0.00;
        $scope.discountOrUpdateQuoteOrders=function(){
            if($scope.QuoteOrders.allTotal!=null&&$scope.QuoteOrders.allTotal!=0){
                $scope.QuoteOrders.finalPrice = $scope.QuoteOrders.allTotal*$scope.QuoteOrders.discount;
            }
        }

        //关闭报价单
        $scope.CloseQuoteOrders=function(){
            if( $scope.aa.quoteOrders.orderState==0){
                layer.msg("报价单已经是关闭状态!");
                $scope.aa.quoteOrders.closeRemarks='';
                return;
            }
            console.log($scope.loginUser);
            $scope.quoteOrder = {};
            $scope.aa.quoteOrders.closePerson=$scope.loginUser.companyId;
            // $scope.quoteOrders = $scope.aa.quoteOrders;


            $http.put(url+"/QuoteOrders/changeOrderState",{QuoteOrders: $scope.aa.quoteOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.quoteOrders.orderState=0;
                $scope.quoteOrders.creOrderType = $scope.quoteOrder.orderType;
                $scope.quoteOrders.operationTime = $scope.quoteOrder.finishTime;
                $scope.item1($scope.quoteOrder);

            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.quoteOrders.closeRemarks={}
        };
        //添加行
        $scope.itemRecords = [];
        $scope.addbao=function(){
            if($scope.itemRecords.length==0){
                document.getElementById('allChoose2').checked = false;
            }
            var item={};
            item.id=app.get('tyjUtil').uuid();
            //console.log(item);
            $scope.itemRecords.push(item);
        };
        //删除行

        $scope.deleteQuotation=function(){
            var count = 0;
            angular.forEach($scope.itemRecords,function(item){
                if(document.getElementById(item.id).checked){
                    count++;
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.itemRecords;
                $scope.itemRecords = [];
                for(var i = 0;i<temp.length;i++){
                    console.log(document.getElementById(temp[i].id).checked);
                    if(!document.getElementById(temp[i].id).checked){
                        $scope.itemRecords.push(temp[i]);
                    }
                }
                $scope.$apply(function(){
                    $scope.itemRecords;
                    $scope.SumOrUpdateQuoteOrders();
                    $scope.discountOrUpdateQuoteOrders();
                });
                layer.msg('删除成功！',{icon :1,time : 1000});


            },function(){

            });
        };
        //报价单附件上传
        $scope.quoteOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="1";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
        //移除图片
        $scope.delPic1 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.QuoteOrders.annexs;
            $scope.QuoteOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.QuoteOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

        //根据条件搜索人员信息
        $scope.searchone={page:{}};

        var parent = function (page, callback) {
            $scope.searchone.page = page;
            $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
        };
        $scope.currentPaginator = app.get('Paginator').list(parent,6);

        $scope.personOne={};
        $scope.QuoteOrders.signature1={};
        $scope.choicePerson1=function(person){
            $scope.index='';
            $scope.personOne=person;
            $scope.index=person.custId;
            $scope.QuoteOrders.signature1= $scope.personOne.name;
        };
        /*****************  报价单方法    *********************/



        /*****************  申诉单方法 start   *********************/
        /**
         * 新增申诉单
         */
        $scope.AppealOrders={orderState:1,orderType:8};
        //$scope.AppealOrders.tasksId=$stateParams.taskDetailsIds;
        $scope.AppealOrders.annexs=[];    //申诉单上传
        $scope.Tasks.taskId=localStorageItem.taskId;
        $scope.AddOrUpdateAppealOrders=function(){
            if($scope.AppealOrders.orderType==undefined)
            {
                $scope.AppealOrders.orderState = 1;
                $scope.AppealOrders.orderType =8 ;
            }
            if($scope.AppealOrders.remarks==null||$scope.AppealOrders.remarks.length==0){
                layer.alert('申述说明不能为空！',{icon:0});
                return;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.AppealOrders.tasksId=$scope.Tasks.taskId;

                $http.post(url+'/AppealOrders/insertAppealOrders',{AppealOrders:$scope.AppealOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.AppealOrders={}
        };
        //关闭申诉
        $scope.CloseAppealOrders=function(){
            $scope.appealOrder={};
            $scope.aa.appealOrders.closePerson = $scope.loginUser.userId;
            $scope.appealOrder=$scope.aa.appealOrders;

            if($scope.aa.appealOrders.closeRemarks==''||$scope.aa.appealOrders.closeRemarks==null){
                layer.alert('失效原因不能为空!',{icon:0});
                return;
            }
            if( $scope.aa.appealOrders.orderState==0){
                layer.alert('申诉单已经是失效状态！',{icon : 2});
                $scope.aa.appealOrders.closeRemarks='';
                return;
            }
            $http.put(url+"/AppealOrders/changeAppealOrders",{AppealOrders: $scope.aa.appealOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.appealOrder.creOrderType = $scope.appealOrder.orderType;
                $scope.appealOrder.operationTime = $scope.appealOrder.finishTime;
                $scope.item1($scope.appealOrder);
                $scope.aa.praiseOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.appealOrders.closeRemarks={}
        };


        //申诉单上传
        $scope.AppealOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="11";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic11 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.AppealOrders.annexs;
            $scope.AppealOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.AppealOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

       /* $scope.personEleven={};
        $scope.AppealOrders.signatory1={};
        $scope.choicePersonOne=function(person){
            $scope.index='';
            $scope.personEleven=person;
            $scope.index=person.custId;
            $scope.AppealOrders.signatory1= $scope.personEleven.name;
        };
*/
        /*****************  申诉单方法    *********************/

        /*****************  投诉单方法 start   *********************/
        /**
         * 新增投诉单
         */
        $scope.ComplainOrders={orderState:1,orderType:11};
        //$scope.ComplainOrders.taskId=$stateParams.taskDetailsIds;
        $scope.ComplainOrders.annexs=[];    //投诉单上传
        $scope.Tasks.taskId=localStorageItem.taskId;
        $scope.AddOrUpdateComplainOrders = function(taskId){
            if($scope.ComplainOrders.orderType==undefined)
            {
                $scope.ComplainOrders.orderState = 1;
                $scope.ComplainOrders.orderType = 11;
            }
            if($scope.ComplainOrders.complaintObjectName==''||$scope.ComplainOrders.complaintObjectName==null){
                layer.alert('投诉对象不能为空!',{icon:0});
                return;
            }
            if($scope.ComplainOrders.remarks==null||$scope.ComplainOrders.remarks.length==0){
                layer.alert('投诉说明不能为空!',{icon:0});
                return;
            }

            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.ComplainOrders.taskId=$scope.Tasks.taskId;
                $http.post(url+'/ComplaintOrders/insertComplaintOrders',{ComplaintOrders:$scope.ComplainOrders}).success(function(){
                    //$scope.ComplainOrders.taskId=$stateParams.taskDetailsIds;
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.ComplainOrders.taskId).search({taskDetailsId:$scope.ComplainOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.ComplainOrders={}
        };
        /* //初始化投诉单失效原因  bug1988 xuwenguang 2016/6/2
         $scope.complaintOrders=function(){
         $scope.aa.complaintOrders.closeRemarks='';
         }*/
        //关闭投诉
        $scope.CloseComplaintOrders=function(){
            if( $scope.aa.complaintOrders.orderState==0){

                layer.alert('投诉单已经是是失效状态！',{icon : 2});
                $scope.aa.complaintOrders.closeRemarks='';
                return;
            }
            if($scope.aa.complaintOrders.closeRemarks==''|| $scope.aa.complaintOrders.closeRemarks==null){
                layer.alert('失效原因不能为空!',{icon:0});
                return;
            }
            $scope.aa.complaintOrders.closePersonId=$scope.loginUser.userId;

            $http.put(url+"/ComplaintOrders/closeComplaintOrders",{ComplaintOrders: $scope.aa.complaintOrders}).success(function(){
                layer.msg('提交成功',{icon : 1,time : 2000});
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.complaintOrders.closeRemarks={}
        };

        //投诉单上传
        $scope.ComplainOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="12";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
        //移除图片
        $scope.delPic12 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.ComplainOrders.annexs;
            $scope.ComplainOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.ComplainOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.personTwelve={};
        $scope.ComplainOrders.complaintObjectName1={};
        $scope.choicePerson12=function(person){
            $scope.index='';
            $scope.personTwelve=person;
            $scope.index=person.custId;
            $scope.ComplainOrders.complaintObjectName1= $scope.personTwelve.name;
        };
        /*****************  投诉单方法    *********************/

        /*****************  表扬单方法 start   *********************/
        /**
         * 新增表扬单
         */
        $scope.PraiseOrders={orderState:1,orderType:17,serviceRequestId:"17",operatorId:"1",praiseObjectId:"1",praiseObjectName:""};
        //$scope.PraiseOrders.taskId=$stateParams.taskDetailsIds;
        $scope.PraiseOrders.taskId=localStorageItem.taskId;
        $scope.PraiseOrders.annexs=[];          //表扬单上传
        $scope.AddOrUpdatePraiseOrders=function(taskId){
            if($scope.PraiseOrders.orderType==undefined)
            {
                $scope.PraiseOrders.orderState = 1;
                $scope.PraiseOrders.orderType = 17;
            }
            /*if(($scope.PraiseOrders.praiseObjectName==undefined)||($scope.PraiseOrders.praiseObjectName=='')){
                layer.alert('表扬对象不能为空！',{icon : 0});
                return;
            }*/
            if(($scope.insertStaff.staffs==null)||($scope.insertStaff.staffs.length==0)){
                layer.alert('表扬对象不能为空！',{icon : 0});
                return;
            }
            if(($scope.PraiseOrders.remarks==undefined)||($scope.PraiseOrders.remarks=='')){
                layer.alert('表扬说明不能为空！',{icon : 0});
                return;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){

                $scope.PraiseOrders.taskId=localStorageItem.taskId;
                $scope.PraiseOrders.staffList = $scope.insertStaff.staffs;
                console.log($scope.PraiseOrders);
                $http.post(url+'/PraiseOrders/addPraiseOrder',{PraiseOrders:$scope.PraiseOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $("#zyuploadPraiseOrdersfile").hide();
                    $scope.index='';
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.PraiseOrders={orderState:1,orderType:17,serviceRequestId:"17",operatorId:"1",praiseObjectId:"1",praiseObjectName:""};
            $scope.PraiseOrders.taskId=$stateParams.taskDetailsIds;
            $scope.PraiseOrders.annexs=[];          //表扬单上传
        };
        //关闭表扬单
        $scope.ClosePraiseOrders=function(){

            if( $scope.aa.praiseOrders.orderState==0){
                layer.alert('表扬单已经是失效状态！',{icon : 2});
                $scope.aa.praiseOrders.closeRemarks='';
                return;
            }
            if(($scope.aa.praiseOrders.closeRemarks==undefined)||($scope.aa.praiseOrders.closeRemarks=='')){
                layer.alert('失效原因不能为空！',{icon : 0});
                return;
            }
            $scope.aa.praiseOrders.closePersonId=$scope.user.employId
            $http.put(url+"/PraiseOrders/closePraiseOrders",{PraiseOrders: $scope.aa.praiseOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.praiseOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.PraiseOrders={orderState:1,orderType:17,serviceRequestId:"17",operatorId:"1",praiseObjectId:"1",praiseObjectName:""};
            $scope.PraiseOrders.taskId=$stateParams.taskDetailsIds;
            $scope.PraiseOrders.annexs=[];          //表扬单上传
            $scope.aa.praiseOrders.closeRemarks='';
        };
        //表扬单上传
        $scope.PraiseOrdersfile=function(){

            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="6";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
//移除图片
        $scope.delPic6 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.PraiseOrders.annexs;
            $scope.PraiseOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.PraiseOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

       /* $scope.personSix={};
        $scope.PraiseOrders.signatory1={};
        $scope.choicePersonOne=function(person){
            $scope.index='';
            $scope.personSix=person;
            $scope.index=person.custId;
            $scope.PraiseOrders.signatory1= $scope.personSix.name;
        };*/


        //$scope.selectPerson1=function (item){
        //    $scope.index=item.custId;
        //}
        /*****************  表扬单方法    *********************/

        /*****************  固定车位单方法 start   *********************/
        /**
         * 新增固定车位
         */
        $scope.FixedParkingOrders={orderState:1,orderType:13,parkingOperation:'0'};
        //$scope.FixedParkingOrders.taskId=$stateParams.taskDetailsIds;
        $scope.FixedParkingOrders.annexs=[];    //固定车位单上传
        $scope.AddOrUpdateFixedParkingOrders = function(taskId){
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                if($scope.FixedParkingOrders.orderType==undefined)
                {
                    $scope.FixedParkingOrders.orderState = 1;
                    $scope.FixedParkingOrders.orderType = 13;
                }
                if($scope.FixedParkingOrders.parkingOperation!=0 && $scope.FixedParkingOrders.parkingOperation!=1){
                    layer.alert('操作不能为空',{icon:0})
                    return;
                }
                if($scope.FixedParkingOrders.remarks==null || $scope.FixedParkingOrders.remarks.length==0){
                    layer.alert('请填写备注说明',{icon:0});
                    return;
                }

                $scope.FixedParkingOrders.taskId = $scope.Tasks.taskId;
                $scope.FixedParkingOrders.operatorId = $scope.loginUser.userId;
                $http.post(url+'/FixedParkingOrders/insertFixedParkingOrders',{FixedParkingOrders:$scope.FixedParkingOrders}).success(function(){
                    //$scope.FixedParkingOrders.taskId=$stateParams.taskDetailsIds;
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.FixedParkingOrders.taskId).search({taskDetailsId:$scope.FixedParkingOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.FixedParkingOrders={orderState:1,orderType:13,parkingOperation:'0'};
        };
        ////初始化固定车位失效原因  bug1988 xuwenguang 2016/6/2
        /*$scope.fixedParkingOrders=function(){
         $scope.aa.fixedParkingOrders.closeRemarks='';
         }*/
        //关闭固定车位工单
        $scope.CloseFixedParkingOrders=function(){
            if ($scope.aa.fixedParkingOrders.closeRemarks=='' || $scope.aa.fixedParkingOrders.closeRemarks==null){
                layer.alert('失效原因不能为空！',{icon:0});
                return;
            }
            /* if($scope.aa.fixedParkingOrders.closePersonId=='' || $scope.aa.fixedParkingOrders.closePersonId==null){
             layer.alert('请填写失效操作人！',{icon:0});
             return;
             }*/
            if( $scope.aa.fixedParkingOrders.orderState==0){
                layer.alert('固定车位单已经是关闭状态！',{icon : 2});
                return;

                layer.alert('固定车位单已经是关闭状态！',{icon : 2});
                $scope.aa.fixedParkingOrders.closeRemarks='';
                $scope.aa.fixedParkingOrders.closePersonId='';
                return;
            }
            $scope.aa.fixedParkingOrders.closePersonId=14;
            $http.put(url+"/FixedParkingOrders/closeFixedParkingOrders",{FixedParkingOrders: $scope.aa.fixedParkingOrders}).success(function(){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.closed=false;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.fixedParkingOrders.closeRemarks='';
            $scope.aa.fixedParkingOrders.closePersonId='';

        };
        //固定车位上传
        $scope.FixedParkingOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="14";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic14 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.FixedParkingOrders.annexs;
            $scope.FixedParkingOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.FixedParkingOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

        $scope.personForteen={};
        $scope.FixedParkingOrders.signatory1={};
        $scope.choicePerson14=function(person){
            $scope.index='';
            $scope.personForteen=person;
            $scope.index=person.custId;
            $scope.FixedParkingOrders.signatory1= $scope.personForteen.name;
        };
        /*****************  固定车位单方法    *********************/

        /*****************  检测单方法 start   *********************/
        /**
         * 新增检测单
         */
        $scope.CheckOrdersService={orderState:1,orderType:3,serviceRequestId:$scope.Tasks.serverId};
        $scope.CheckOrdersService.annexs=[];    //检测单

        /**
         *
         * 全选功能
         */
        $scope.allChoose = function(all,single){
            var allChoose = document.getElementById(all);
            var oName = document.getElementsByName(single);
            var info = false;
            if(allChoose.checked == true){
                allChoose.checked = true;
                info = true;
            }else{
                allChoose.checked = false;
                info = false;
            }
            for(var i=0;i<oName.length;i++){
                oName[i].checked = info;
            }
        };

        /**
         *
         * 单选功能
         */
        $scope.getChoose = function(id,event,all,single){
            var allChoose = document.getElementById(all);
            var oId = document.getElementById(id);
            var oName = document.getElementsByName(single);
            var num = oName.length;
            var count = 0;
            if(oId.checked){
                oId.checked = true;
            }else{
                oId.checked = false;
            }
            for(var i=0;i<oName.length;i++){
                if(oName[i].checked){
                    count++;
                }
            }
            if(count==num){
                allChoose.checked = true;
                $scope.allChoose(all,single);
            }else{
                allChoose.checked = false;
            }
            event.stopPropagation();
        };

        //添加行
        $scope.CheckOrdersService.checkItemRecords=[];
        $scope.addJian=function(){
            if($scope.CheckOrdersService.checkItemRecords.length==0){
                document.getElementById('allChoose').checked = false;
            }
            var item={};
            item.id=app.get('tyjUtil').uuid();
            $scope.CheckOrdersService.checkItemRecords.push(item);
        };
        //删除行
        $scope.deleteSonArea=function(id){
            var count = 0;
            angular.forEach($scope.CheckOrdersService.checkItemRecords,function(item){
                if(document.getElementById(item.id).checked){
                    count++;
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.CheckOrdersService.checkItemRecords;
                $scope.CheckOrdersService.checkItemRecords = [];
                $scope.CheckOrdersService.checkItemRecords.checkItemType= [{}];
                for(var i = 0;i<temp.length;i++){
                    console.log(document.getElementById(temp[i].id).checked);
                    if(!document.getElementById(temp[i].id).checked){
                        $scope.CheckOrdersService.checkItemRecords.push(temp[i]);
                    }
                }
                $scope.$apply(function(){
                    $scope.CheckOrdersService.checkItemRecords;
                });
                layer.msg('删除成功！',{icon :1,time : 1000});
            },function(){

            });
        };

        //$scope.CheckOrdersService.taskId=$stateParams.taskDetailsIds;
        $scope.AddOrUpdateCheckOrdersService=function(taskId){
            var item={};
            $scope.itemRecord = {
                checkItemName:"",  //检测项
                isAbnormal: "",   //检测结果
                isThroughInsurance: "", //是否过保
                isAftermarket: "",//是否
                checkItemResult: "", //检测说明
            };
            if(($scope.CheckOrdersService.checkItemRecords==null)||($scope.CheckOrdersService.checkItemRecords.length==0)){
                layer.msg('请新建检测项！',{icon:0});
                return;
            }
            for(var i=0; i<$scope.CheckOrdersService.checkItemRecords.length; i++){
                if($scope.CheckOrdersService.checkItemRecords[i].checkItemName==null || $scope.CheckOrdersService.checkItemRecords[i].checkItemName==''){
                    layer.msg('请选择选择检测项！',{icon:0});
                    return;
                }
                if($scope.CheckOrdersService.checkItemRecords[i].isThroughInsurance==null || $scope.CheckOrdersService.checkItemRecords[i].isThroughInsurance==''){
                    layer.msg('请选择是否过保！',{icon:0});
                    return;
                }
                if($scope.CheckOrdersService.checkItemRecords[i].checkItemResult==null || $scope.CheckOrdersService.checkItemRecords[i].checkItemResult==''){
                    layer.msg('检测说明不能为空！',{icon:0});
                    return;
                }

            }
            //$scope.CheckOrdersService.checkItemRecords.push($scope.CheckOrdersService.checkItemRecords);

            if(($scope.CheckOrdersService.remarks==null) || ($scope.CheckOrdersService.remarks.length==0)){
                layer.msg('请填写备注！',{icon:0});
                return;
            }
            if($scope.CheckOrdersService.signatory==undefined || $scope.CheckOrdersService.signatory==''){
                layer.msg('请填写签字人！',{icon:0});
                return;
            }



            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.CheckOrdersService.taskId=$scope.Tasks.taskId;
                //$scope.CheckOrdersService.checkItemRecords.push(item);
                $http.post(url+'/CheckOrdersService/insertCheckOrders',{CheckOrders:$scope.CheckOrdersService}).success(function(data){
                    //$scope.CheckOrdersService.taskId= $stateParams.taskDetailsIds;
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.CheckOrdersService.taskId).search({taskDetailsId:$scope.CheckOrdersService.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});

                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.CheckOrdersService={}
        };
        //关闭检测单
        $scope.CloseCheckOrders=function(){

            if( $scope.aa.checkOrders.orderState==0){
                layer.alert('检测单已经是关闭状态！',{icon : 2});
                $scope.aa.checkOrders.closeRemarks='';
                return;
            }
            $http.put(url+"/CheckOrdersService/changeCheckOrders",{CheckOrders: $scope.aa.checkOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.index='';
                $scope.aa.checkOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.checkOrders.closeRemarks='';
        };
        //检测单上传
        $scope.CheckOrdersServicefile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="2";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
        //移除图片
        $scope.delPic2 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.CheckOrdersService.annexs;
            $scope.CheckOrdersService.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.CheckOrdersService.annexs.push($scope.picItem[i]);
                }
            }
        };

        $scope.personTwo={};
        $scope.CheckOrdersService.signatory1='';
        $scope.choicePerson2=function(person){
            $scope.index='';
            $scope.personTwo=person;
            $scope.index=person.custId;
            $scope.CheckOrdersService.signatory1= person.name;
            //$scope.CheckOrdersService.signatory1= $scope.personTwo.name;
        };
        /*****************  检测单方法    *********************/

        /*****************  处理单方法 开始   *********************/
        /**
         *
         * 初始化处理单
         */
        $scope.processService={orderState:1,orderType:23,serviceRequestId:$scope.Tasks.serverId};
        $scope.processService.annexs=[];    //检测单

        //处理单上传
        $scope.processServicefile=function(){
            if($scope.processService.annexs==undefined)
            {
                $scope.processService.annexs = [];
            }
            localStorage.setItem('orderType',$scope.processService.orderType);
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="12";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.$apply(function()
                        {
                            $scope.annex.annexAddress=filePath;
                            $scope.annex.annexName=file.name;

                            $scope.processService.annexs.push($scope.annex);
                            $scope.annex={};
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });

        };
        //移除图片
        $scope.delPic23 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.processService.annexs;
            $scope.processService.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.processService.annexs.push($scope.picItem[i]);
                }
            }
        };

        /**
         * 新增处理单
         */
        $scope.addOrUpdateProcess = function(){
            var processName = app.get('valueCheck').isNull($scope.processService.checkItemName);
            var remarks = app.get('valueCheck').isNull($scope.processService.checkItemResult);
            if(!processName.state){
                layer.msg('处理项不能为空!',{icon:0,time:2000});
                return;
            }else if(!remarks.state){
                layer.msg('处理说明不能为空!',{icon:0,time:2000});
                return;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.processService.taskId=$scope.Tasks.taskId;
                $scope.processService.operatorId = localStorageItem.taskId;//操作人ID
                $scope.processService.serviceRequestId = $scope.Tasks.serverId;
                var informationRecords = {};
                informationRecords.checkItemName=$scope.processService.checkItemName;
                informationRecords.checkItemResult=$scope.processService.checkItemResult;
                $scope.processService.informationRecords=[];
                $scope.processService.informationRecords.push(informationRecords);
                $http.post(url+'/DisposeOrder/insertDisposeOrder',{DisposeOrder:$scope.processService}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    $scope.load();
                    $scope.processService={orderState:1,orderType:23,serviceRequestId:$scope.Tasks.serverId};
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
        }

        //关闭投诉
        $scope.CloseDisposeOrder=function(){
            if( $scope.aa.disposeOrder.orderState==0){
                layer.alert('投诉单已经是是失效状态！',{icon : 0});
                $scope.aa.disposeOrder.closeRemarks='';
                return;
            }
            if($scope.aa.disposeOrder.closeRemarks==''|| $scope.aa.disposeOrder.closeRemarks==null){
                layer.alert('失效原因不能为空!',{icon:0});
                return;
            }
            $scope.aa.disposeOrder.orderState = 0;//失效状态
            $scope.aa.disposeOrder.closePersonId=$scope.loginUser.userId;
            $http.put(url+"/DisposeOrder/closeDisposeOrder",{DisposeOrder: $scope.aa.disposeOrder}).success(function(){
                layer.msg('提交成功',{icon : 1,time : 2000});
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.complaintOrders.closeRemarks={}
        }

        /*****************  处理单方法 结束   *********************/

        /*****************  完成确认单方法 start   *********************/
        /**
         * 新增完成确认单
         */
        $scope.starCount = 0;
        $scope.ItemResult = true; //checked默认选中
        $scope.getStarNum = function(num){
            var starNum = num+1;
            $("#star>span:lt("+starNum+")").css("color","red");
            $("#star>span:gt("+num+")").css("color","black");
            $scope.starCount = starNum;
        };
        //修改或新增完成确认工单
        $scope.AcceptanceOrders={orderState:1,orderType:2,acceptanceItemResult:'0',serviceRequestId:$scope.Tasks.serverId};
        //$scope.AcceptanceOrders.taskId=$stateParams.taskDetailsIds;
        $scope.AcceptanceOrders.satisfaction = $scope.starCount;
        $scope.AcceptanceOrders.annexs=[];  //完成确认单
        $scope.AddOrUpdateAcceptanceOrders=function(taskId){
            var count = 0;
            console.log($scope.AcceptanceOrders);
            if($scope.AcceptanceOrders.orderType==undefined)
            {
                $scope.AcceptanceOrders.orderState = 2;//完成状态
                $scope.AcceptanceOrders.orderType = 2;
                $scope.AcceptanceOrders.acceptanceItemResult = '0';
            }
            if($scope.AcceptanceOrders.acceptanceItemResult!=0 && $scope.AcceptanceOrders.acceptanceItemResult!=1){
                layer.alert('完成确认结果不能为空',{icon:0})
                return;
            }
            if($scope.AcceptanceOrders.remarks==null || $scope.AcceptanceOrders.remarks==0){
                layer.alert('请填写完成确认说明',{icon:0});
                return;
            }
           /*if($scope.AcceptanceOrders.signatory==null || $scope.AcceptanceOrders.signatory==0){
                layer.alert('请填写签字人',{icon:0});
                return;
            }*/
            //console.log($('#star').find('span').css('color'))
            $('#star').find('span').each(function(key){
                console.log($(this).css('color'));
                if($(this).css('color')=='rgb(255, 0, 0)'){
                    count++;
                }
            });

            //满意度
            $scope.AcceptanceOrders.satisfaction = count;

            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.AcceptanceOrders.taskId=$scope.Tasks.taskId;
                $scope.AcceptanceOrders.serviceRequestId = $scope.serviceRequestId;
                $http.post(url+'/AcceptanceOrders/insertAcceptanceOrders',{AcceptanceOrders:$scope.AcceptanceOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    //$scope.AcceptanceOrders.taskId=$stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.AcceptanceOrders.taskId).search({taskDetailsId:$scope.AcceptanceOrders.taskId});
                    $scope.load();
                    $scope.AcceptanceOrders={orderState:1,orderType:2,acceptanceItemResult:'0',serviceRequestId:$scope.Tasks.serverId};
                    $('#star').find('span').css('color','black');
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            //$scope.AcceptanceOrders={}
        };

        //关闭完成确认单
        $scope.CloseAcceptanceOrders=function(){
            if( $scope.aa.acceptanceOrders.orderState==0){
                layer.alert('只能申诉一次！',{icon : 2});
                return;
            }
            if ($scope.aa.acceptanceOrders.closeRemarks == null || $scope.aa.acceptanceOrders.closeRemarks == 0){
                layer.alert('请填写申诉说明!',{icon:0});
                return;
            }
            $scope.AppealOrders.orderState= $scope.aa.acceptanceOrders.orderState = 0;
            $scope.AppealOrders.orderType =8 ;
            $scope.AppealOrders.remarks = $scope.aa.acceptanceOrders.closeRemarks;
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.AppealOrders.tasksId=$scope.Tasks.taskId;
                $http.post(url+'/AppealOrders/insertAppealOrders',{AppealOrders:$scope.AppealOrders}).success(function(data){
                    //layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.serviceRequest = {listTasks:{}};//服务请求
                    $scope.serviceRequest.requestSource = '自动创建';
                    $scope.serviceRequest.serviceRequestState = 0;
                    $scope.serviceRequest.serviceRequestName = '申诉'
                  //  $scope.serviceRequest.customerId = $scope.loginName;
                    $scope.serviceRequest.customerId= $rootScope.user.custId;//客户id
                    $scope.serviceRequest.serviceRequestType = '11'//申诉
                    $scope.serviceRequest.writerId = $rootScope.user.custId;//创建人id
                    $scope.serviceRequest.remarks = '申诉自动创建';//备注
                    $scope.serviceRequest.directionType = 0;//内部服务请求
                    $scope.serviceRequest.listTasks.customerId =  $scope.loginName;//客户id
                    $scope.serviceRequest.listTasks.taskType = 23;//任务类型
                    $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                    $scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
                    $scope.serviceRequest.listTasks.addressId = $scope.addressId;//地址id
                    $scope.serviceRequest.listTasks.taskDescription = '申诉';//任务描述
                    $scope.serviceRequest.listTasks.principal = ''//负责人
                    //创建服务请求
                    $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function (data) {
                        layer.msg('提交成功',{icon : 1,time : 2000});
                        $scope.load();
                    }).error(function (data, status, headers, config) {
                        layer.msg("提交失败",{icon : 2,time : 2000});
                    });

                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.AppealOrders={}
            $scopeaa.acceptanceOrders.closeRemarks='';
        };
        //完成确认单上传
        $scope.AcceptanceOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="4";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic4 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.AcceptanceOrders.annexs;
            $scope.AcceptanceOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.AcceptanceOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.personFour={};
        $scope.AcceptanceOrders.signatory1='';
        $scope.choicePerson4=function(person){
            $scope.index='';
            $scope.personFour=person;
            $scope.index=person.custId;
            console.log(person);
            console.log($scope.personFour.name);
            $scope.AcceptanceOrders.signatory1= $scope.personFour.name;
        };
        /*****************  完成确认单方法    *********************/



        /*****************  结算单方法    *********************/
            //新增结算工单
        $scope.SettleAccountsOrders={orderState:1,orderType:4,serviceRequestId:$scope.Tasks.serverId};

        $scope.SettleAccountsOrders.saiRecords=[];
        //$scope.SettleAccountsOrders.taskId=$stateParams.taskDetailsIds;
        $scope.AddOrUpdateSettleAccountsOrders=function(taskId){
            if($scope.SettleAccountsOrders.orderType==undefined)
            {
                $scope.SettleAccountsOrders.orderState = 1;
                $scope.SettleAccountsOrders.orderType =4;
            }

            if(($scope.SettleAccountsOrders.allTotal==undefined)||($scope.SettleAccountsOrders.allTotal=='')){
                layer.msg('最终价格不能为空！',{icon : 0});
                return;
            } if(($scope.SettleAccountsOrders.signature==undefined)||($scope.SettleAccountsOrders.signature=='')){
                layer.msg('签字人不能为空！',{icon : 0});
                return;
            }
            var saiRecords = {};
            $scope.SettleAccountsOrders.saiRecords=[];
            for(var i=0; i<$scope.quoteItemRecordsList.length; i++){
                saiRecords.itemType =  $scope.quoteItemRecordsList[i].quoteItemType;
                saiRecords.itemName = $scope.quoteItemRecordsList[i].quoteItemName;
                saiRecords.itemNum = $scope.quoteItemRecordsList[i].quoteItemNum;
                saiRecords.itemTotal = $scope.quoteItemRecordsList[i].quoteItemTotal;
                saiRecords.quoteItemRecordsId = $scope.quoteItemRecordsList[i].recordId;
                $scope.SettleAccountsOrders.saiRecords.push(angular.copy(saiRecords));
            }
            console.log($scope.quoteItemRecordsList);
            console.log($scope.SettleAccountsOrders.saiRecords);
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.SettleAccountsOrders.taskId = $scope.Tasks.taskId;
                $scope.SettleAccountsOrders.personCustNew = {};
                $scope.SettleAccountsOrders.personCustNew.cardNum = $scope.users.cardNum;//客户证件号
                $scope.SettleAccountsOrders.buildingStructureId = $scope.addressId;//建筑结构id
                $http.post(url+'/SettleAccountsOrders/insertSettleAccountsOrders',{SettleAccountsOrders:$scope.SettleAccountsOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.index='';
                    $scope.orderChange('结算');
                    //$scope.SettleAccountsOrders.taskId= $stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.SettleAccountsOrders.taskId).search({taskDetailsIds:$scope.SettleAccountsOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.SettleAccountsOrders={}
        };
        //关闭结算单
        $scope.CloseSettleAccountsOrders=function(){
            if( $scope.aa.SettleAccountsOrders.orderState==0){
                layer.msg('结算单已经是关闭状态！',{icon : 2});
                return;
            }
            $scope.SettleAccountsOrders = {};
            $scope.SettleAccountsOrders = $scope.aa.settleAccountsOrders;
            $http.put(url+"/SettleAccountsOrders/closeSettleAccountsOrdersState",{SettleAccountsOrders: $scope.aa.settleAccountsOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.SettleAccountsOrders.creOrderType = $scope.SettleAccountsOrders.orderType;
                $scope.SettleAccountsOrders.operationTime = $scope.SettleAccountsOrders.finishTime;
                $scope.item1($scope.SettleAccountsOrders);
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.settleAccountsOrders={}
        };
        $scope.SettleAccountsOrders.annexs=[];
        //结算单附件上传
        $scope.settleAccountsOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="7";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic7= function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.SettleAccountsOrders.annexs;
            $scope.SettleAccountsOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.SettleAccountsOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.personSeven={};
        $scope.SettleAccountsOrders.signature1={};
        $scope.choicePerson7=function(person){
            $scope.index='';
            $scope.personSeven=person;
            $scope.index=person.custId;
            $scope.SettleAccountsOrders.signature1= $scope.personSeven.name;
        };
        /*****************  结算单方法    *********************/

        /*****************  向业主索赔    *********************/
        //根据条件搜索人员信息

        /**
         * 根据条件搜索人员信息
         * @type {{page: {}}}
         */
        $scope.searchone={page:{}};
        $scope.selectPerson=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginator1 = app.get('Paginator').list(parent,4);
        };

        //选中人员
        $scope.personone={};
        $scope.choicePerson=function(person){
            $scope.index='';
            $scope.personone=person;
            $scope.index=person.custId;
            $scope.ctcOrder.customerObjectId = $scope.personone.custId;
            $scope.ctcOrder.customerObjectName1 = $scope.personone.name;
            $scope.ctcOrder.signature1 = $scope.personone.name;
        };

        /**
         * 新建向业主索赔工单（ClaimToCustomerOrders)
         *
         */

        $scope.ctcOrder={orderState:1,orderType:23,serviceRequestId: $scope.Tasks.serverId,annexs:[]};
        $scope.ctcOrder.annexs = $scope.annexs;
        $scope.ctcOrder.claimToCustomerRethods={};
        //$scope.ctcOrder.taskId=$stateParams.taskDetailsIds;

        $scope.AddOrUpdateCTCO=function(taskId){
            if($scope.ctcOrder.orderType==undefined)
            {
                $scope.ctcOrder.orderState = 1;
                $scope.ctcOrder.orderType = 23;
            }
            if(($scope.ctcOrder.customerObjectName==undefined)||($scope.ctcOrder.customerObjectName=='')){
                layer.alert('赔偿对象不能为空！',{icon : 0});
                return;
            }
            if(($scope.ctcOrder.claimToCustomerRethods.claimMoney==undefined)||($scope.ctcOrder.claimToCustomerRethods.claimMoney=='')){
                layer.alert('赔偿金额不能为空！',{icon : 0});
                return;
            }
            if(($scope.ctcOrder.remarks==undefined)||($scope.ctcOrder.remarks=='')){
                layer.alert('赔偿说明不能为空！',{icon : 0});
                return;
            }
            if(($scope.ctcOrder.signature==undefined)||($scope.ctcOrder.signature=='')){
                layer.alert('签字人不能为空！',{icon : 0});
                return;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.ctcOrder.taskId = $scope.Tasks.taskId;
                $http.post(url +'/ClaimToCustomerOrders/insertClaimToCustomerOrders',{ClaimToCustomerOrders:$scope.ctcOrder}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.annexs = [];
                    $scope.index='';
                    //$scope.ctcOrder.taskId=$stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+ $scope.ctcOrder.taskId).search({taskDetailsId:$scope.ctcOrder.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });
            }else{
                layer.msg('提交失败',{icon : 2,time : 2000});
            }
            $scope.ctcOrder={};
        };

        $scope.cancelCTCO = function(){
            //$scope.load();
            $("#div18").hide();
        }
        $scope.ClosePraiseOrders66=function(){

            if( $scope.aa.claimToCustomerOrders.orderState==0){
                layer.alert('向业主索赔单已经是失效状态！',{icon : 0});
                return;
            }
            if(($scope.aa.ClaimToCustomerOrders.closeRemark==undefined)||($scope.aa.ClaimToCustomerOrders.closeRemark.length==0)){
                layer.alert('失效原因不能为空！',{icon : 0});
                return;
            }
            $http.put(url+"/ClaimToCustomerOrders/closeClaimToCustomerOrders",{ClaimToCustomerOrders: $scope.aa.claimToCustomerOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.claimToCustomerOrders.closeRemarks=$scope.aa.claimToCustomerOrders.closeRemark;
                $scope.aa.claimToCustomerOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
        };


        //向业主索赔附件上传
        $scope.ctcOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="18";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };



        //移除图片
        $scope.delPic18 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.ctcOrder.annexs;
            $scope.ctcOrder.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.ctcOrder.annexs.push($scope.picItem[i]);
                }
            }
        };

        /*$scope.personOne={};
        $scope.ctcOrder.signatory1={};
        $scope.choicePersonOne=function(person){
            $scope.index='';
            $scope.personOne=person;
            $scope.index=person.custId;
            $scope.ctcOrder.signatory1= $scope.personOne.name;
        };*/



        /*****************  向业主索赔 end    *********************/






        /*****************  赔偿给业主 *********************/

        $scope.compensateOwner={orderState:1,orderType:5,serviceRequestId: $scope.Tasks.serverId,annexs:[]};
        $scope.compensateOwner.annexs = $scope.annexs;
        $scope.compensateOwner.compensateMethods=[];
        //$scope.compensateOwner.taskId=$stateParams.taskDetailsIds;

        $scope.AddOrUpdateCTCC=function(taskId) {

            if ($scope.compensateOwner.orderType == undefined) {
                $scope.compensateOwner.orderState = 1;
                $scope.compensateOwner.orderType = 5;
            }

            if(($scope.compensateOwner.compensateObjectName==null)||($scope.compensateOwner.compensateObjectName=='')){
                layer.alert('赔偿对象不能为空！',{icon : 0});
                return;
            }
            /*if(($scope.CompensateOrderss ==null)||($scope.CompensateOrderss.length==0)){
             layer.alert('请新建赔偿总额！',{icon : 0});
             return;
             }*/
            if(($scope.compensateOwner.money==undefined)||($scope.compensateOwner.money=='')){
             layer.alert('赔偿金额不能为空！',{icon : 0});
             return;
             }
            if(($scope.compensateOwner.remarks==null)||($scope.compensateOwner.remarks=='')){
                layer.alert('赔偿说明不能为空！',{icon : 0});
                return;
            }
            if(($scope.compensateOwner.compensatename==null)||($scope.compensateOwner.compensatename=='')){
                layer.alert('签字人不能为空！',{icon : 0});
                return;
            }
            console.log($scope.compensateOwner);
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $scope.compensateOwner.taskId=$scope.Tasks.taskId;
                $http.post(url +'/CompensateOwnerService/insertCompensateOwner',{CompensateOwner:$scope.compensateOwner}).success(function(){

                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.annexs = [];
                    $scope.index='';
                    //$scope.ctcOrder.taskId=$stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+ $scope.ctcOrder.taskId).search({taskDetailsId:$scope.ctcOrder.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });
            }else{
                layer.msg('提交失败',{icon : 2,time : 2000});
            }
            $scope.compensateOwner={};
        };

        //赔偿给业主附件上传
        $scope.CompensateOrdersfile1=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="5";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic5 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.compensateOwner.annexs;
            $scope.compensateOwner.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.compensateOwner.annexs.push($scope.picItem[i]);
                }
            }
        };



        $scope.ClosePraiseOrders55=function(){

            if( $scope.aa.compensateOwner.orderState==0){
                layer.alert('赔偿给业主单已经是失效状态！',{icon : 0});
                return;
            }
            if(($scope.aa.compensateOwner.closeRemark==undefined)||($scope.aa.compensateOwner.closeRemark.length==0)){
                layer.alert('失效原因不能为空！',{icon : 0});
                return;
            }
            console.log($scope.aa.compensateOwner);
            $http.put(url+"/CompensateOwnerService/closeCompensateOwner",{CompensateOwner: $scope.aa.compensateOwner}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.compensateOwner.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
        };


        $scope.person00=[];
        $scope.compensateOwner.compensatename1={};
        $scope.choicePerson55=function(person){
            $scope.index='';
            $scope.person00=person;
            $scope.index=person.custId;
            $scope.compensateOwner.compensatename1= $scope.person00.name;
        };
        $scope.person000=[];
        $scope.compensateOwner.compensatename11={};
        $scope.choicePerson555=function(person){
            $scope.index='';
            $scope.person000=person;
            $scope.index=person.custId;
            $scope.compensateOwner.compensatename11= $scope.person000.name;
        };


        /*var itemId = app.get('tyjUtil').uuid();*/
        $scope.CompensateOrderss = [];
        $scope.addCompensate=function(){
            var item={};
            item.id=app.get('tyjUtil').uuid();
            //console.log(item);
            $scope.CompensateOrderss.push(item);

        };
        //删除行

        $scope.deleteCompensate=function(){
            var count = 0;
            angular.forEach($scope.CompensateOrderss,function(item){
                if(document.getElementById(item.id).checked){
                    count++;
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.CompensateOrderss;
                $scope.CompensateOrderss = [];
                for(var i = 0;i<temp.length;i++){
                    console.log(document.getElementById(temp[i].id).checked);
                    if(!document.getElementById(temp[i].id).checked){
                        $scope.CompensateOrderss.push(temp[i]);
                    }
                }

                $scope.$apply(function(){
                    $scope.CompensateOrderss;
                });
                layer.msg('删除成功！',{icon :1,time : 1000});
            },function(){

            });
        };

        /*****************  赔偿给业主 end    *********************/


        $scope.personFive={};
        $scope.compensateOwner.signatory1={};
        $scope.choicePerson5=function(person){
            $scope.index='';
            $scope.personFive=person;
            $scope.index=person.custId;
            $scope.compensateOwner.signatory1= $scope.personFive.name;

        };
        /***************查抄水表单******************************************/

        $scope.waterMeterOrders={orderState:1,orderType:9,serviceRequestId:$scope.Tasks.serverId,waterMeterOrderRecords:{},annexs:[]};
        $scope.waterMeterOrders.annexs = $scope.annexs;
        //console.log($scope.annexs);
        //$scope.waterMeterOrders.taskId=$stateParams.taskDetailsIds;
        $scope.waterMeterOrders.taskId=localStorageItem.taskId;


        /**
         * 查抄历史读数记录及表编号（水表）
         */

        $scope.loadWaters= function (address) {
            if($scope.waterMeterOrders.taskId!=null){
                var WaterMeter = {};
                //查询表编号
                /*WaterMeter.buildingStructureId = address;*/
                /*WaterMeter.buildingStructureId = address;
                $http.post(url+'/WaterMeter/getWaterMeterByBuildingStructureId',{WaterMeter:WaterMeter}).success(function(data){
                    $scope.waterMaster = data.WaterMeter[0];
                });*/
                //查询历史读数记录
                /* $http.get(url+'/MeterReadingData/getMeterReadingsByBuildingId/'+address).success(function (data) {
                 $scope.readingData = data.MeterReadingData;
                 }).error(function () {
                 layer.msg('历史读数读取失败')
                 })*/
                /*$scope.searchWater={page:{}};
                var parent = function (page, callback) {
                    $scope.searchWater.page = page;
                    $scope.searchWater.buildingStructureId = address;
                    $http.post(url+ '/MeterReadingData/listPageMeterReadingData',{MeterReadingData:$scope.searchWater}).success(callback);
                };
                $scope.WaterPaginator = app.get('Paginator').list(parent,6);*/

                console.log($scope.WaterPaginator);
            }
        };

        $scope.watersRecordId = null;
        $scope.WaterMeterOrderRecords = {};
        $scope.watersUpdate= function (item) {
            var readOnly = {};
            if(item!=null){
                readOnly = document.getElementById(item.recordId).readOnly;
            }else{
                readOnly = false;
            }
            if(readOnly==true){
                document.getElementById(item.recordId).readOnly=false;
                //document.getElementById($scope.waterItem.recordId).readOnly=false;
                $scope.watersRecordId = item.recordId;
            }else{
                if(item!=null){
                    document.getElementById(item.recordId).readOnly=true;
                    $scope.WaterMeterOrderRecords = item;
                }else{
                    $scope.WaterMeterOrderRecordsWaterMeterOrderRecords = $scope.waterItem;
                    //document.getElementById($scope.waterItem.recordId).readOnly=true;
                }
                $scope.watersRecordId = null;
                $http.post(url+'/WaterMeterOrderRecords/updataWaterMeterOrderRecordsById',{WaterMeterOrderRecords:$scope.WaterMeterOrderRecords}).success(function () {
                    layer.msg('修改完成！',{icon:1,time:2000});
                }).error(function () {
                    layer.msg('操作失败！',{icon:2,time:2000});
                });
            }
        };

        /**
         * 水表详情
         */
        $scope.waterItem = {};
        $scope.waterInfo = {};
        $scope.waterClick= function (item) {
            $scope.waterItem = item;
            console.log(item);
            //水表信息
            $http.get(url+'/WaterMeterRecords/getWaterMeterRecordsbyBuildigId/'+ item.buildingStructureId).success(function (data) {
                $scope.waterInfo = data.WaterMeterRecords;
                console.log($scope.waterInfo);
            }).error(function () {
                layer.msg('获取数据失败！',{icon:2,time:2000});
            });
        };
        /**
         * 点击房屋弹窗
         */
        $scope.modalState=1;
        $scope.modalPageOne= function () {
            $scope.modalState = 1;
        }
        $scope.modalPageTwo= function () {
            $scope.modalState = 2;
        }
        $scope.modalPageThree= function () {
            $scope.modalState = 3;
            //抄表历史
            $scope.myDate = new Date();   // 获取当前时间
            $scope.year;
            $scope.year = $scope.myDate.getYear() + 1900;
            $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + $scope.waterInfo.waterMeterId + '/' + $scope.year).success(function (date) {
                console.log(date);
                $scope.listWaterMeterRecords = date.WaterMeterRecords;
            }).error(function (data, status, headers, config) {
                layer.msg('失败', {icon: 2});
            });
            $scope.left = function (index) {
                $scope.year = index - 1;
                $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + $scope.waterInfo.waterMeterId + '/' + $scope.year).success(function (date) {
                    console.log(date);
                    $scope.listWaterMeterRecords = date.WaterMeterRecords;
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                });
            };
            $scope.right = function (index) {
                // alert($scope.myDate.getYear());
                if (index < $scope.myDate.getYear() + 1900) {
                    $scope.year = index + 1;
                } else {
                    layer.msg("无法查询明年信息", {icon: 0});
                }
                $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + $scope.waterInfo.waterMeterId + '/' + $scope.year).success(function (date) {
                    console.log(date);
                    $scope.listWaterMeterRecords = date.WaterMeterRecords;
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                });
            };
        }
        $scope.modalPageFour= function () {
            $scope.modalState = 4;
            //换表历史
            $scope.waterMeterReading = {};
            $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByIds/' + $scope.waterItem.buildingStructureNew.id).success(function (date) {
                console.log(date);
                $scope.waterMeterReading = date.WaterMeterRecords;
            }).error(function (data, status, headers, config) {
                layer.msg('失败', {icon: 2});
            });
        }

        $scope.watersSubmit=function(){
            if($scope.watersRecordId!=null){
                layer.msg('还有未修改完的任务！',{icon:0,time:2000});
                return;
            }
            for(var i=0; i<$scope.aa.waterMeterOrders.waterMeterOrderRecordsList.length; i++){
                if($scope.aa.waterMeterOrders.waterMeterOrderRecordsList[i].orderId!=null&&$scope.aa.waterMeterOrders.waterMeterOrderRecordsList[i].waterMeterReading==null){
                    layer.msg('本次抄表读数不能为空！',{icon:0,time:2000});
                    return;
                }
            }
            $scope.aa.waterMeterOrders.principal = $scope.user.employId;
            $http.post(url+'/WaterMeterOrders/submitWaterMeterOrders',{WaterMeterOrders:$scope.aa.waterMeterOrders}).success(function () {
                layer.msg('提交成功！',{icon:1,time:2000});
            }).error(function () {
                layer.msg('提交失败！',{icon:2,time:2000});
            });
        }

        //新增保存
        $scope.AddOrUpdateWaterMeterOrders = function(){
            //$scope.WaterMeterOrderRecords = {};
            /*console.log($scope.WaterMeterOrderRecords);
             $scope.WaterMeterOrderRecords.waterMeterId = $scope.WaterMeterRecords.waterMeter.waterMeterNum;
             $scope.WaterMeterOrderRecords.waterLastReading = $scope.WaterMeterRecords.lastTimeReading;*/

            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){

                if($scope.waterMaster.waterMeterNum == null||$scope.waterMaster.waterMeterNum==''){
                    layer.msg('未查询到水表',{icon:2,time:2000});
                    return;
                }else{
                    $scope.waterMeterOrders.waterMeterOrderRecords.waterMeterId = $scope.waterMaster.waterMeterId;
                }
                if($scope.waterMeterOrders.waterMeterOrderRecords.waterMeterReading==''||$scope.waterMeterOrders.waterMeterOrderRecords.waterMeterReading==null){
                    layer.msg('水表读数不能为空',{icon:0,time:2000});
                    return;
                }
                if($scope.waterMeterOrders.waterMeterOrderRecords.waterMeterReading<0){
                    layer.msg('电表读数不能为负数！',{icon:0,time:2000});
                    $scope.waterMeterOrders.waterMeterOrderRecords.waterMeterReading=null;
                    return;
                }

                $http.post(url +'/WaterMeterOrders/insertWaterMeterOrders',{WaterMeterOrders:$scope.waterMeterOrders}).success(function(){
                    layer.msg('新增成功!',{icon:1,time:2000});
                    //初始化数据
                    $scope.waterMeterOrders={orderState:1,orderType:9,serviceRequestId:$scope.Tasks.serverId,waterMeterOrderRecords:{},annexs:[]};
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("新增失败！",{icon:2});
                });
            }else{
                layer.msg("任务不存在！",{icon:2});
            }
        }

        //关闭水表单
        $scope.closewaterMeterOrders=function(){
            if( $scope.aa.waterMeterOrders.orderState==0){
                layer.msg("水表单已经是关闭状态!",{icon:0});
                $scope.aa.waterMeterOrders.closeRemarks='';
                return;
            }
            $scope.waterMeterOrder = {};
            $scope.waterMeterOrder = $scope.aa.waterMeterOrders;
            $http.put(url+"/WaterMeterOrders/closeWaterMeterOrders",{WaterMeterOrders: $scope.aa.waterMeterOrders}).success(function(data){

                layer.msg("关闭成功！",{icon:1});
                $scope.waterMeterOrder.creOrderType = $scope.waterMeterOrder.orderType;
                $scope.waterMeterOrder.operationTime = $scope.waterMeterOrder.finishTime;
                $scope.item1($scope.waterMeterOrder);
            }).error(function(data,status,headers,config){
                layer.msg("关闭失败！",{icon:1});
            });
            $scope.aa.waterMeterOrders.closeRemarks={};

        };

        /**
         * 关闭工单弹窗和提示
         */
        $scope.closeTip= function (id) {
            if( $scope.aa.waterMeterOrders!=null&&$scope.aa.waterMeterOrders.orderState==0){
                layer.msg("水表单已经是关闭状态!",{icon:0});
                return;
            }else if( $scope.aa.meterReadingOrders!=null&&$scope.aa.meterReadingOrders.orderState==0){
                layer.msg("电表单已经是关闭状态!",{icon:0});
                return;
            }
            $('#'+id).modal({backdrop:'static',keyboard:false});
        };
        //水表单上传
        $scope.waterMeterOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="10";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic10= function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.waterMeterOrders.annexs;
            $scope.waterMeterOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.waterMeterOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

        $scope.personTen={};
        $scope.waterMeterOrders.signatory1={};
        $scope.choicePerson10=function(person){
            $scope.index='';
            $scope.personTen=person;
            $scope.index=person.custId;
            $scope.waterMeterOrders.signatory1= $scope.personTen.name;
        };

        //根据条件搜索建筑信息
        $scope.buildSearch = function(){
            $scope.buildinfo={page:{}};
            var builds = function (page, callback) {
                $scope.buildinfo.page = page;
                $scope.buildinfo.custId = $rootScope.user.custId;
                $http.post(url+'/ElectricityMeter/listPageElectricityMeterByCustId',{ElectricityMeter:$scope.buildinfo}).success(callback);
            };
            $scope.buildPaginator = app.get('Paginator').list(builds,6);
            console.log($scope.buildPaginator);
        }
        //$scope.buildSearch();

        $scope.buildok={};
        $scope.choiceBuild = function(build){
            $scope.buildok = build;1
            $scope.index=build.custId;
            $scope.waterMeterOrders.waterMeterNum= $scope.buildok.fullName;
        };

        /***************查抄水表单 end******************************************/


        /***************查抄电表单******************************************/

        $scope.meterReadingOrders={orderState:1,orderType:10,serviceRequestId:
        $scope.Tasks.serverId,meterReadingOrdersRecords:{},annexs:[]};
        $scope.annexs=[];
        $scope.meterReadingOrders.annexs = $scope.annexs;
        //$scope.meterReadingOrders.taskId=$stateParams.taskDetailsIds;
        $scope.meterReadingOrders.taskId=localStorageItem.taskId;

        /**
         *
         * 查抄历史读数记录及表编号（电表）
         */
        $scope.loadElectrics= function (address) {
            if($scope.meterReadingOrders.taskId!=null){
                //查询表编号
                var ElectricityMeter = {};
                ElectricityMeter.buildingStructureId = address;
                $http.post(url+'/ElectricityMeter/getElectricityMeterByBuildingStructureId',{ElectricityMeter:ElectricityMeter}).success(function(data){
                    console.log(data);
                    $scope.ammeter = data.ElectricityMeter[0];
                });
                //查询历史读数记录
                $scope.searchEle={page:{}};
                var parent = function (page, callback) {
                    $scope.searchEle.page = page;
                    $scope.searchEle.buildingStructureId = address;
                    $http.post(url+'/ElectricityMeterReadingData/listPageElectricityMeterReadingData',{ElectricityMeterReadingData:$scope.searchEle}).success(callback);
                };
                $scope.ElectricityPaginator = app.get('Paginator').list(parent,6);
                console.log($scope.ElectricityPaginator);
            }
        };

        //新增保存
        $scope.saveMeterReadingOrders=function(){
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                if($scope.ammeter.electricityMeterNum == null||$scope.ammeter.electricityMeterNum==''){
                    layer.msg('未查询到电表',{icon:2,time:2000});
                    return;
                }else{
                    $scope.meterReadingOrders.meterReadingRecords.meterId = $scope.ammeter.electricityMeterId;
                }
                if($scope.meterReadingOrders.meterReadingRecords.waterMeterReading==''||$scope.meterReadingOrders.meterReadingRecords.waterMeterReading==null){
                    layer.msg('电表读数不能为空',{icon:2});
                    return;
                }
                if($scope.meterReadingOrders.meterReadingRecords.waterMeterReading<0){
                    layer.msg('电表读数不能为负数！',{icon:0});
                    $scope.meterReadingOrders.meterReadingRecords.waterMeterReading=null;
                    return;
                }

                $scope.meterReadingOrders.annexs = $scope.annexs;
                $http.post(url +'/MeterReadingOrders/insertMeterReadingOrders',{MeterReadingOrders:$scope.meterReadingOrders}).success(function(data){
                    //$scope.meterReadingOrders.taskId=$stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+
                    //$scope.meterReadingOrders.taskId).search({taskDetailsId:$scope.meterReadingOrders.taskId});
                    $scope.load();
                    //layer.msg(data.Info.$);
                    $scope.annexs=[];
                }).error(function(data,status,headers,config){
                    layer.msg("新增失败！",{icon:0});
                });
            }else{
                layer.msg("任务不存在！",{icon:2});
                return;
            }


            $scope.meterReadingOrders={};
        }

        //关闭电表单
        $scope.closeMeterReadingOrders=function(){

            if( $scope.aa.meterReadingOrders.orderState==0){
                layer.msg("电表单已经是关闭状态!",{icon:0});
                $scope.aa.meterReadingOrders.closeRemarks='';
                return;
            }
            $scope.meterReadingOrder = {};
            $scope.meterReadingOrder = $scope.aa.meterReadingOrders;
            $http.put(url+"/MeterReadingOrders/closeMeterReadingOrders",{MeterReadingOrders: $scope.aa.meterReadingOrders}).success(function(data){
                layer.msg("关闭成功!",{icon:1});
                $scope.meterReadingOrder.creOrderType = $scope.meterReadingOrder.orderType;
                $scope.meterReadingOrder.operationTime = $scope.meterReadingOrder.finishTime;
                $scope.item1($scope.meterReadingOrders);
            }).error(function(data,status,headers,config){
                layer.msg("关闭失败!",{icon:1});
            });
            $scopeaa.meterReadingOrders.closeRemarks={};
        };


        /**
         * 对象中转函数
         * @param obj
         * @returns {{}}
         */
        $scope.tempFunction= function (obj) {
            var temp ={};
            for(var i in obj){
                temp[i] = obj[i];
            }
            return temp;
        }

        $scope.meterReadingOrdersfile=function(){
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="9";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({

                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;

                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };
        //移除图片
        $scope.delPic9 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.meterReadingOrders.annexs;
            $scope.meterReadingOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.meterReadingOrders.annexs.push($scope.picItem[i]);
                }
            }
        };

        $scope.personNine={};
        $scope.meterReadingOrders.signatory1={};
        $scope.choicePerson9=function(person){
            $scope.index='';
            $scope.personNine=person;
            $scope.index=person.custId;
            $scope.meterReadingOrders.signatory1= $scope.personNine.name;
        };

        /***************查抄电表单end******************************************/

        /**
         *
         * 按钮取消
         */
        $scope.delPic = function()
        {
            $scope.tempObj = {annexs:[]};
            var item = localStorage.getItem('orderType');
            switch(item)
            {
                case '8':
                    $scope.AppealOrders.annexs=[];
                    break;
                case '11':
                    $scope.ComplainOrders.annexs=[];
                    break;

            }

        };

        /**
         *  提交添加图片
         * @param temp  type Array
         * @param obj   type Array
         * @returns temp type Array
         */
        $scope.changeAddress = function(temp,obj){
            if(temp.length==0){
                for(var i=0;i<obj.length;i++){
                    temp[i] = obj[i];
                }
            }else{
                for(var i=0;i<obj.length;i++){
                    temp.push(obj[i]);
                }
            }
            return temp;
        };

        /**
         * 提交图片
         */

        $scope.picSub = function()
        {

            $('#ddd').modal('hide');
            switch($scope.fileState){
                case "1":
                    $scope.changeAddress($scope.QuoteOrders.annexs,$scope.tempObj.annexs);//报价单
                    $scope.fileState="";
                    break;
                case "2":
                    $scope.changeAddress($scope.CheckOrdersService.annexs,$scope.tempObj.annexs); //检测工单
                    $scope.fileState="";
                    break;
                case "4":
                    $scope.changeAddress($scope.AcceptanceOrders.annexs,$scope.tempObj.annexs);//完成确认单
                    $scope.fileState="";
                    break;
                case "5":
                    $scope.changeAddress($scope.compensateOwner.annexs,$scope.tempObj.annexs);//赔偿给业主
                    $scope.fileState="";
                    break;
                case "6":
                    $scope.changeAddress($scope.PraiseOrders.annexs,$scope.tempObj.annexs);//表扬单
                    $scope.fileState="";
                    break;
                case "7":
                    $scope.changeAddress($scope.SettleAccountsOrders.annexs,$scope.tempObj.annexs);//结算单
                    $scope.fileState="";
                    break;
                case "10":
                    $scope.changeAddress($scope.waterMeterOrders.annexs,$scope.tempObj.annexs);//查抄水表
                    $scope.fileState="";
                    break;
                case "9":
                    $scope.changeAddress($scope.meterReadingOrders.annexs,$scope.tempObj.annexs);//查抄电表
                    $scope.fileState="";
                    break;
                case "11":
                    $scope.changeAddress($scope.AppealOrders.annexs,$scope.tempObj.annexs);//申诉单
                    $scope.fileState="";
                    break;
                case "12":
                    $scope.changeAddress($scope.ComplainOrders.annexs,$scope.tempObj.annexs);//投诉单
                    $scope.fileState="";
                    break;
                case "14":
                    $scope.changeAddress($scope.FixedParkingOrders.annexs,$scope.tempObj.annexs);//固定车位
                    $scope.fileState="";
                    break;
                case "15":
                    $scope.changeAddress($scope.RepairOrders.annexs,$scope.tempObj.annexs);//维修单
                    $scope.fileState="";
                    break;
                case "18":
                    $scope.changeAddress($scope.ctcOrder.annexs,$scope.tempObj.annexs);//向业主索赔
                    $scope.fileState="";
                    break;


            }
            //$scope.changeAddress($scope.CheckOrdersService.annexs,$scope.tempObj.annexs); //检测工单
            //$scope.changeAddress($scope.QuoteOrders.annexs,$scope.tempObj.annexs);//报价单
            // $scope.changeAddress($scope.AcceptanceOrders.annexs,$scope.tempObj.annexs);//完成确认单
            // $scope.changeAddress($scope.SettleAccountsOrders.annexs,$scope.tempObj.annexs);//结算单
            // $scope.changeAddress($scope.claimToCustomerOrders.annexs,$scope.tempObj.annexs);//赔偿给业主
            //$scope.changeAddress($scope.waterMeterOrders.annexs,$scope.tempObj.annexs);//查抄水表
            //$scope.changeAddress($scope.meterReadingOrders.annexs,$scope.tempObj.annexs);//查抄电表
            // $scope.changeAddress($scope.AppealOrders.annexs,$scope.tempObj.annexs);//申诉单

        };

        /**
         * 提交清空
         *
         */

        $scope.CloseNew=function(index){
            if(index==1) {
                $scope.consultationOrders.closeRemarks = '';//清空咨询单
            }else if(index==2) {
                $scope.aa.repairOrders.closeRemarks = '';//清空维修单
            }else if(index==3) {
                $scope.aa.closedOrders.closeRemarks = '';//失效单
            }else if(index==4) {
                $scope.aa.quoteOrders.closeRemarks = '';//报价单
            }else if(index==5) {
                $scope.aa.appealOrders.closeRemarks = '';//申诉单
            }else if(index==6) {
                $scope.aa.complaintOrders.closeRemarks = '';//投诉单
            }else if(index==7) {
                $scope.aa.praiseOrders.closeRemarks = '';//清空表扬单
            }else if(index==8) {
                $scope.aa.fixedParkingOrders.closeRemarks = '';//固定车位
                $scope.aa.fixedParkingOrders.closePersonId = '';//固定车位
            }else if(index==9) {
                $scope.aa.checkOrders.closeRemarks = '';//检测单
            }else if(index==10) {
                $scope.aa.acceptanceOrders.closeRemarks = '';//完成确认单
                $scope.aa.acceptanceOrders.closePerson='';
            }else if(index==11) {
                $scope.aa.ClaimToCustomerOrders.closeRemark = ''; //向业主索赔
            }else if(index==55){
                $scope.aa.compensateOwner.closeRemark='';
            }else if(index==12){
                $scope.aa.checkOrders.closeRemarks = '';//结算单
            }
        }

        //清空选人框

        $scope.Closeperson=function(index){
         if(index==1){

         if($scope.QuoteOrders.signature==null||$scope.QuoteOrders.signature==''){
         $scope.index = '';
         $scope.QuoteOrders.signature = '';
         }else {
         if ($scope.QuoteOrders.signature == $scope.QuoteOrders.signature1) {
         return;
         } else {
         $scope.QuoteOrders.signature2=$scope.QuoteOrders.signature;
         $scope.index = '';
         $scope.QuoteOrders.signature = '';  //报价单
         }
         }
         }else if(index==2){
         if($scope.CheckOrdersService.signatory==$scope.CheckOrdersService.signatory1){
         return;
         }else{
         $scope.index='';
         $scope.CheckOrdersService.signatory='';//检测单
         }

         }else if(index==3){
         if($scope.AcceptanceOrders.signatory==$scope.AcceptanceOrders.signatory1){
         return;
         }else{
         $scope.index='';
         $scope.AcceptanceOrders.signatory='';//完成确认单
         }

         }else if(index==4){
         if($scope.compensateOwner.compensatename==$scope.compensateOwner.sss){
         return;
         }else{
         $scope.index='';
         $scope.compensateOwner.compensatename='';//赔偿给业主
         }

         }else if(index==5){
             $scope.insertStaff.staffs=[];
         if($scope.PraiseOrders.praiseObjectName==$scope.PraiseOrders.praiseObjectName1){
         return;
         }else{
         $scope.index='';
         $scope.PraiseOrders.praiseObjectName='';//表扬
         }

         }else if(index==6){
         if($scope.PraiseOrders.praiseObjectName==$scope.PraiseOrders.praiseObjectName1){
         return;
         }else{
         $scope.index='';
         $scope.SettleAccountsOrders.signature='';//结算
         }

         }else if(index==7){
         if($scope.ComplainOrders.complaintObjectName==$scope.ComplainOrders.complaintObjectName1){
         return;
         }else{
         $scope.index='';
         $scope.ComplainOrders.complaintObjectName='';//投诉
         }

         }else if(index==8){

         $scope.index='';
         $scope.ctcOrder.customerObjectName='';//向业主索赔
         $scope.ctcOrder.signature='';//向业主索赔
         }
         }

        $scope.Okperson=function(index){
            if(index==1){
                $scope.QuoteOrders.signature=$scope.QuoteOrders.signature1;
            }else if(index==2){
                $scope.CheckOrdersService.signatory=$scope.CheckOrdersService.signatory1;
            }else if(index==3){

                $scope.AcceptanceOrders.signatory=$scope.AcceptanceOrders.signatory1;//完成确认单
            }else if(index==4){
                $scope.compensateOwner.compensateObjectName=$scope.compensateOwner.compensatename11;
                $scope.compensateOwner.compensatename=$scope.compensateOwner.compensatename1;//赔偿给业主
            }else if(index==5){
                $scope.insertStaff.staffs=[];
                $scope.PraiseOrders.praiseObjectName=$scope.PraiseOrders.praiseObjectName1;//表扬
            }else if(index==6){

                $scope.SettleAccountsOrders.signature=$scope.SettleAccountsOrders.signature1;//结算
            }else if(index==7){

                $scope.ComplainOrders.complaintObjectName=$scope.ComplainOrders.complaintObjectName1;//投诉
            }else if(index==8){

                $scope.ctcOrder.customerObjectName=$scope.ctcOrder.customerObjectName1;//向业主索赔
                $scope.ctcOrder.signature= $scope.ctcOrder.signature1;//向业主索赔
            }else if(index==9){
                $scope.RepairOrders.signature= $scope.RepairOrders.signatory1;
            }
        }

        /**
         * 增加团队人员
         * 修改功能，选择成员时不将成员放入team的成员数组，而是直接在页面上显示存放添加成员的数组  王洲   2016.1.27
         */
        $scope.insertStaff = {staffs: []};
        $scope.staffIds = [];
        $scope.staffToAdd = [];
        $scope.nowAddress = [];
        $scope.checkIt = function (items) {
            if ($scope.staffToAdd.length == 0) {
                $scope.staffToAdd.push(items);
            } else {
                var j = 0;
                for (var i = 0; i < $scope.staffToAdd.length; i++) {
                    if ($scope.staffToAdd[i].staffId == items.staffId) {
                        $scope.staffToAdd.splice(i, 1);
                        j++;
                    }
                }
                if (j == 0) {
                    $scope.staffToAdd.push(items);
                }
            }
            for (var i in $scope.staffToAdd) {
                $scope.nowAddress[i] = $scope.staffToAdd[i];
            }
        };

        /**
         * 表扬工单表扬对象的选择--模态框人员信息
         */
        $scope.staffInfo = [];
        $scope.getStaff = function () {
            //增加条件，根据团队id查询非团队内成员的所有员工
            $http.get(url + '/staff/listAllStaffRestful/').success(function (data) {
                $scope.staffsone = [];
                $scope.staffs = data.Staff;
                console.log($scope.staffs);
                if (angular.isArray($scope.staffs)) {
                    $scope.staffsone = $scope.staffs;
                } else {
                    $scope.staffsone.push($scope.staffs);
                }
            }).error(function (data, status, headers, config) {
                layer.alert('未获取到有效的员工信息！', {icon: 2});
            });
        };

        /**
         * 点击确定按钮重新获取所有团员
         * 添加成员时，点击保存人员未在成员列表处展示 朱琪 2016.03.01
         */
        $scope.addTeamNumber = function () {
            if ($scope.insertStaff.staffs.length == 0) {
                $scope.insertStaff.staffs = $scope.nowAddress;
            } else {
                var temp = [];
                var tag = 0;
                temp = $scope.insertStaff.staffs;
                //$scope.insertStaff.staffs = [];
                //$scope.insertStaff.staffs = $scope.nowAddress.concat($scope.insertStaff.staffs);
                for(var i=0;i<$scope.nowAddress.length;i++){
                    tag=0;
                    for(var j=0;j<temp.length;j++){
                        if($scope.nowAddress[i].staffId == temp[j].staffId){
                            tag=1;
                        }
                    }
                    if(tag==0) $scope.insertStaff.staffs.push($scope.nowAddress[i]);
                }
                //$scope.insertStaff.staffs = $scope.nowAddress.concat($scope.insertStaff.staffs); //数组相加
            }
           // $scope.insertStaff.staffs = $scope.staffToAdd;
            $scope.nowAddress = [];
            $scope.staffToAdd = [];
            $('.choose').css('background', '');
            console.log("测试："+$scope.insertStaff.staffs);
        };

        $scope.removelist = function (index) {
            $scope.insertStaff.staffs.splice(index, 1);
        };

        $scope.css = function () {
            $('.choose').css('background', '');
            $scope.nowAddress = [];
            $scope.staffToAdd = [];
        };


        /****************************************************x巡检 start 杨升权 **************************************************************/

        /**
         * 巡检详情  2016.7.26
         * */
        $scope.InspectionId={};
        $http.get(url+'/Tasks/getInspectionTasksbyId/'+$scope.Tasks.taskId).success(function(data){
            $scope.InspectionTasks= data.Tasks;
            $scope.InspectionId.state =$scope.InspectionTasks[0].state;
            console.log($scope.InspectionTasks);
        }).error(function(data,status,headers,config){
        });


        /**
         * 巡检结果的保存与修改 2016/7/28
         * */
        $scope.InspectionRecordId = null;
        $scope.InspectionRecords = {};
        $scope.InspectionUpdate= function (item) {

            var readOnly = {};
            if(item!=null){
                readOnly = document.getElementById(item.recordId).readOnly;
            }else{
                readOnly = false;
            }
            if(readOnly==true){
                document.getElementById(item.recordId).readOnly=false;
                document.getElementById($scope.inspectionItem.recordId).readOnly=false;
                $scope.InspectionRecordId = item.recordId;
            }else{
                if(item!=null){
                    document.getElementById(item.recordId).readOnly=true;
                    $scope.InspectionRecords = item;
                }else{
                    if ($scope.InspectionRecords.inspectionResult == null || $scope.InspectionRecords.inspectionResult == '') {
                        layer.msg("巡检结果不能为空！",{icon:0});
                        return;
                    }
                    $scope.InspectionRecords.checkItemName = $scope.inspectionItem.checkItemName;
                    $scope.InspectionRecords.checkItemUnit = $scope.inspectionItem.checkItemUnit;
                    $scope.InspectionRecords.fullName = $scope.inspectionItem.fullName;
                    $scope.InspectionRecords.recordId = $scope.inspectionItem.recordId;
                    document.getElementById($scope.inspectionItem.recordId).readOnly=true;
                }
                $scope.InspectionRecordId = null;
                $http.post(url+'/InspectionRecordsService/updateInspectionRecords',{InspectionRecords:$scope.InspectionRecords}).success(function () {
                    $scope.$apply(function(){
                            $scope.InspectionTasks;
                    })
                    layer.msg('修改完成！',{icon:1,time:1000});
                    angular.element('#inspectionInfo').modal('hide');
                }).error(function () {
                    layer.msg('操作失败！',{icon:2,time:2000});
                });
            }
        };


        /**
         * 巡检详情
         */
        $scope.inspectionItem = {};
        $scope.inspectionInfo = {};
        $scope.inspectionClick= function (item) {
            $scope.inspectionItem = item;
            console.log($scope.inspectionItem);
           /* //资产信息
            $http.get(url+'///'+ ).success(function (data) {
                $scope.inspectionInfo = data.;
                console.log($scope.waterInfo);
            }).error(function () {
                layer.msg('获取数据失败！',{icon:2,time:2000});
            })*/;
        };

    /**
     * 点击巡检目标
     *
     * */
        $scope.modalState2=1;
        $scope.modalPageOne2= function () {
            $scope.modalState2 = 1;
        }
        $scope.modalPageTwo2= function () {
            $scope.modalState2 = 2;
        }

        /**
         * 巡检提交 2016/7/28
         * */
        $scope.InspectionSubmit=function(){
            if($scope.InspectionRecordId!=null){
                layer.msg('还有未修改完的任务！',{icon:0,time:2000});
                return;
            }
            for(var i=0; i<$scope.InspectionTasks.length; i++){
                if($scope.InspectionTasks[i].inspectionResult==null){
                    layer.msg('巡检结果不能为空！',{icon:0,time:2000});
                    return;
                }
            }
            $http.get(url+'/InspectionOrderService/submitInspectionOrder/'+$scope.InspectionTasks[0].orderId).success(function () {
                $scope.$apply(function(){
                    $scope.InspectionTasks;
                })
                layer.msg('提交成功！',{icon:1,time:2000});
            }).error(function () {
                layer.msg('提交失败！',{icon:2,time:2000});
            });
        }
        /*****************************************************巡检 End*************************************************************/
    }]);
});