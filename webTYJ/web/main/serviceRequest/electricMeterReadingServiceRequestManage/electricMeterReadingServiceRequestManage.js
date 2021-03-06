/**
 * Created by NM on 2018/1/18.
 * 电表抄表服务请求管理
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('eleMeterReadingSRCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /***********************************初始化开始***********************************/
        //页面显示初始化
        var url=$rootScope.url;
        $scope.show1=true;
        $scope.show2=false;
        $scope.show3=false;
        $scope.show4=false;
        $scope.show5=false;
        $scope.impro=false;
        $scope.datils1=false;
        $scope.tasks1=false;
        $scope.addService1=false;
        $scope.addDatils1=false;
        $scope.ServiceRequest = {page:{}};

        $scope.requestShowStatus=0;//服务请求网格列表开关 默认为列表
        $scope.workShowStatus=0;//任务网格列表开关 默认为列表

        /**
         * 进入模块初始化，查询请求信息（用户id）
         */
        $scope.load = function(){
            var fetchFunction = function (page, callback) {
                $scope.ServiceRequest.page = page;
                $scope.ServiceRequest.serviceRequestType = 6;
                $http.post(url + '/ServiceRequest/listPageServiceRequestByType', {ServiceRequest: $scope.ServiceRequest}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };
        $scope.load();


        /***********************************初始化结束*************************************
        /***********************************公共方法开始***********************************
        /**
         * 网格列表切换
         * @param itemName 参数名
         */
        $scope.viewChange= function (itemName,state) {
            eval('$scope.'+itemName+'='+state)
        };

        /**
         * 列表选中
         * @param item
         */
        $scope.selected= function (id,item) {
            var tr = $('#'+id);
            if(tr.attr('style')==''||tr.attr('style')==null){
                tr.css('background','#f6f8fa');
            }else{
                tr.attr('style','');
            }
        };
        /**
         * 列表全选
         * @param id
         */
        $scope.selectedAll= function (id) {
            var trs=$('#'+id).children();
            var bool=true;//全选全不选开关
            for(var i=1;i<trs.length;i++){
                var tr = $(trs[i]);
                if(tr.attr('style')==''|| tr.attr('style')==null){
                    bool=false;
                }
            }
            if(bool){
                for(var i=0;i<trs.length;i++){
                    var tr = $(trs[i]);
                    tr.attr('style','');
                }

            }else{
                for(var i=0;i<trs.length;i++){
                    var tr = $(trs[i]);
                    tr.css('background','#f6f8fa');
                }
            }

        };
        /***********************************公共方法结束***********************************/
        /***********************************服务请求开始***********************************/
        /**
         * 显示请求列表页面
         */
        $scope.service=function(){
            $scope.show1=true;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
            $scope.btnIndex = 1;
            $scope.load();
        };

        /**
         * 服务请求全部失效
         */
        $scope.serviceClosedAll=function(){
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.isAllChecked) {//全选
                $scope.forChangeSR.serviceRequestState = 0;
                $scope.forChangeSR.serviceRequestJournal = $scope.journal;
                $http.post(url + '/ServiceRequest/changeServiceRequestStateByIds', {ServiceRequest: $scope.forChangeSR})
                    .success(function (data) {
                        if(data.Info.info.$.indexOf('成功'==true)){
                            layer.msg(data.Info.info.$,{icon : 1});
                        }else{
                            layer.msg(data.Info.info.$,{icon : 2});
                        }
                    })
                    .error(function () {
                        layer.msg('失效操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllChecked = false;//全选失效
                $scope.journal = {};         //传递参数初始化
            }
        };


        /**
         * 根据请求id查看任务(查看服务请求详情)
         */
        $scope.Tasks={page:{}};
        $scope.selectTasks = function (serviceRequest) {
            $scope.Tasks.serverId=serviceRequest.serviceRequestId;
            $http.get(url+'/ServiceRequest/getServiceRequestbyId/'+serviceRequest.serviceRequestId).success(function(data){
                if(data){
                    $scope.Service= data.ServiceRequest;
                }else{
                    layer.msg('没有任务',{icon : 2});
                }
            }).error(function(data,status,headers,config){
                layer.msg('服务器请求失败',{icon : 2});
            });
            $scope.loadTask();
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
            $scope.datils1=true;
        };

        /**
         * 根据请求id查询任务列表(加载任务列表)
         */
        $scope.loadTask=function() {
            var fetchFunction1 = function (page, callback) {
                $scope.Tasks.page = page;
                $http.post(url + '/Tasks/listPageTasksbyServiceRequestId', {Tasks: $scope.Tasks}).success(callback)
            };
            $scope.searchPaginator1 = app.get('Paginator').list(fetchFunction1, 6);
        };


        /***********************************服务请求结束*********************************/
        /***********************************任务开始*************************************/
        /**
         * 返回请求页面
         */
        $scope.backToRequest= function () {
            $scope.service();
            $scope.impro=false;
            $scope.datils1=false;
            $scope.tasks1=false;
            $scope.addService1=false;
            $scope.addDatils1=false;
            $scope.ServiceRequest = {page:{}};
        };

        /**
         *  传任务ID给工单页面(任务查看详情)
         */
        $scope.taskDetailsIds=function(taskId){
            //$location.path("/index/serviceRequest/repairOrder/"+taskId).search({taskDetailsIds:taskId});
            localStorage.setItem('item',JSON.stringify({taskId:taskId}));
            $location.path("/index/serviceRequest/repairOrder");
        };

        /***********************************任务结束*************************************/







        /**
         * 显示查看的详细信息页面
         */
        $scope.datils=function(){
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
        };

        /**
         * 显示任务页面
         */
        $scope.tasks=function(){
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=true;
            $scope.show4=false;
            $scope.show5=false;
        };

        /**
         * 显示添加服务请求的页面
         */
        $scope.addService=function(){
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=true;
            $scope.show5=false;
            $scope.addService1=true;
        };

        /**
         * 增加详细信息的页面
         */
        $scope.addDatils=function(){
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=true;
            $scope.addDatils1=true;
        };
        /**************************************************************************************/
        /**
         * 服务请求全选按钮功能
         */
        $scope.isAllChecked=false;//判断是否全选,默认否
        $scope.forChangeSR = {serviceRequestIds:[]};
        $scope.allChecked = function(){
            $scope.forChangeSR.serviceRequestIds=[];
            $scope.isAllChecked = true;
            var items = $scope.searchPaginator.object.serviceRequests;
            if(items!=null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].serviceRequestId != null){
                        $scope.forChangeSR.serviceRequestIds.push(items[i].serviceRequestId);
                    }
                }
            }
        };
        /*****************************************新建服务请求*********************************************************/
        $scope.tasks={};
        $scope.ServiceRequest={};
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
                //{ id: '3',name:'部门质检' },
                //{ id: '4',name:'装修巡检' },
                //{ id: '5',name:'装修验收' },
                //{ id: '6',name:'施工巡检' },
                //{ id: '7',name:'施工核查' },
                //{ id: '8',name:'施工验收' },
                //{id:'14',name:'验房'},
                //{id:'15',name:'咨询'},
            ]
        };

        /**
         * 服务请求增加时赋 用户id和地址id
         * @param customerId
         */
        $scope.ServiceRequest_tasks={};    //定义服务请求下的任务对象为空
        $scope.addReqService=function(customerId){
            var isNullTask= $scope.isNull($scope.ServiceRequest.tasks);
            if(isNullTask==true){//当任务不是空的时候
                $scope.ServiceRequest.tasks=$scope.ServiceRequest_tasks;
                if($scope.choiceUser.custId!=undefined){
                    $scope.ServiceRequest.tasks.customerId=$scope.choiceUser.custId;
                }else{
                    layer.msg('申请人未选择，请选择申请人',{icon : 2});
                };
            }
            //为服务请求创建用户id和地址id
            if($scope.choiceUser.custId!=undefined){
                $scope.ServiceRequest.customerId=$scope.choiceUser.custId;
            }else{
                layer.msg('申请人未选择，请选择申请人',{icon : 2});
            };

            //判断加急状态
            var anxious = document.getElementsByName("anxious");
            for(var i = 0;i<anxious.length;i++){
                if(anxious[i].checked == true){
                    $scope.ServiceRequest.anxious = 1;
                } else{
                    $scope.ServiceRequest.anxious = 0;
                }
            }
            //重要事项相关
            var tt=document.getElementsByName("ims");
            for(var i=0;i<tt.length;i++){
                if(tt[i].checked === true) {
                    $scope.ServiceRequest.importantEvent = 1;
                    $scope.impro=true;
                }else{
                    $scope.ServiceRequest.importantEvent = 0;
                    $scope.impro=false;
                }
            }
            $scope.ServiceRequest.requestSource = "前台";
            $scope.ServiceRequest.directionType = 0;//外部服务
            $scope.ServiceRequest.serviceRequestType=6;   //电2表服务请求类型赋值
            if(customerId!=null) {
                $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {
                    ServiceRequest: $scope.ServiceRequest
                }).success(function (data) {
                    layer.msg('添加服务成功',{icon : 1});
                    $scope.ServiceRequest={};
                    $scope.ServiceRequest.tasks={};
                    $scope.addressId='';
                    $scope.show1=true;
                    $scope.show2=false;
                    $scope.show3=false;
                    $scope.show4=false;
                    $scope.show5=false;
                    $scope.load();
                    //$location.path("/index/propertyService/staffHome/serviceRequest/");
                }).error(function (data) {
                    layer.msg('服务器请求失败',{icon : 2});
                });
            }
        };

        $scope.journal = {};//服务请求参数状态改变所传递的参数对象
        $scope.bbb = {};  //选中的服务请求对象
        //选中要改变的服务请求对象
        $scope.servicechange = function(serviceRequest){
            $scope.bbb = serviceRequest;
        };


        /**
         * 服务请求失效
         */
        $scope.serviceClosed = function(){
            if($scope.bbb.serviceRequestState == 0){//单个选中的服务请求关闭
                layer.msg('服务请求已经是关闭状态',{icon : 1});
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c";  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";  //备注初始化
                if(data.Info.info.$.indexOf('成功'==true)){
                    layer.msg(data.Info.info.$,{icon : 1});
                }else{
                    layer.msg(data.Info.info.$,{icon : 2});
                }
                $scope.load();
            }).error(function(){
                layer.msg('关闭操作失败，请稍后重试',{icon : 2});
                $scope.journal.remarks = "";
            });
        };
        /**
         * 服务请求全部完成
         */
        $scope.serviceFinishAll = function(){
            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.isAllChecked){//全选
                $scope.forChangeSR.serviceRequestState = 3;
                $scope.forChangeSR.serviceRequestJournal=$scope.journal;
                $http.post(url+'/ServiceRequest/changeServiceRequestStateByIds',{ServiceRequest:$scope.forChangeSR})
                    .success(function(data){
                        if(data.Info.info.$.indexOf('成功'==true)){
                            layer.msg(data.Info.info.$,{icon : 1});
                        }else{
                            layer.msg(data.Info.info.$,{icon : 2});
                        }
                    })
                    .error(function(){
                        layer.msg('完成操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllChecked=false;//全选失效
                $scope.journal = {};
            }

        };
        /**
         * 服务请求完成
         */
        $scope.serviceFinish = function(){
            if($scope.bbb.serviceRequestState == 3){
                layer.msg('服务请求已经是完成状态',{icon : 2});
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                if(data.Info.info.$.indexOf('成功'==true)){
                    layer.msg(data.Info.info.$,{icon : 1});
                }else{
                    layer.msg(data.Info.info.$,{icon : 2});
                }
                $scope.load();
            }).error(function(){
                layer.msg('完成操作失败，请稍后重试',{icon : 2});
                $scope.journal.remarks = "";
            });
        };
        /*********************************新建服务请求*********************************************/
        /**
         * 查询重大事项类型
         */
        $http.get(url + '/ImportantEventType/getAllImportantEventType').success(function(data) {
            $scope.important=[];
            $scope.important= data.ImportantEventType;
        });

        /**
         *  获取选中的重大事项
         */
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

        /********************************************************************************************************************/
        //查询所有建筑结构信息.
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
            layer.msg('建筑信息查询失败',{icon : 2});
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
                    sessionStorage.setItem('water_task_addressId',$scope.addressId);
                }
            }
            $scope.bslist=$scope.treeResult.treeList;
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            if($scope.treeResult.treeList.length==0){
                layer.msg('请选择建筑',{icon:0,time:2000});
                return
            }else if($scope.treeResult.treeList.length>1){
                layer.msg('只能选择一条建筑',{icon:0,time:2000});
                return
            }
            $scope.addWaterCheck = $scope.treeResult.treeList;
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
        /***********************************************新建任务*************************************************************************/
        /**
         * 任务全选按钮功能
         */
        $scope.isAllTasksChecked = false;//是否全选，默认否
        $scope.forChangeTasks = {tasksIds:[]};
        $scope.allTasksChecked = function(){
            $scope.forChangeTasks.tasksIds=[];
            $scope.isAllTasksChecked = true;
            var items = $scope.searchPaginator1.object.tasks;
            if(items != null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].taskId != null){
                        $scope.forChangeTasks.tasksIds.push(items[i].taskId);
                    }
                }
            }
        };



        /**
         *  新增任务
         */
        $scope.Tasks_add={};
        $scope.Tasks_add.taskType= 17;
        /**
         * 跳转到新建任务页面并给task参数赋值  请求id和用户id
         * @param serviceRequest
         */
        $scope.addTasks=function(serviceRequest){
            $scope.Tasks_add.serverId=serviceRequest.serviceRequestId;
            $scope.Tasks_add.customerId=serviceRequest.customerId;
            //$scope.Tasks.addressId=$scope.addressId;
            $scope.addDatils();
            /**
             * 新建任务
             * @param serviceRequest
             */
            $scope.addTask=function(serviceRequest){
                if($scope.addressId != null&&$scope.addressId!=''){
                    $scope.Tasks_add.addressId=$scope.addressId;
                }else{
                    layer.msg('地址未选择，请选择地址信息',{icon : 2});
                    return ;
                }
                if($scope.person.staffId!=undefined){
                    $scope.Tasks_add.principal=$scope.person.staffId;
                }else{
                    layer.msg('未选择负责人',{icon : 2});
                    return ;
                };
                if(serviceRequest!=null){
                    $http.post(url +'/Tasks/insertTasks',{Tasks:$scope.Tasks_add}).success(function(data) {
                        $scope.selectTasks($scope.Service);
                        $scope.datils();
                        //   $location.path("/index/serviceRequest/serviceRequestDatil/allWorkOrders/");
                    }).error(function(data){
                        layer.msg('请求失败',{icon : 2});
                    })
                }else{
                    layer.msg('服务ID不存在！不允许新建任务',{icon : 2});
                }
            };
        };


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
        };
        $scope.load1();

        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata = function(Relation,name,event){
            var temp;
            var aNames = document.getElementsByName(name);
            for(var i=0;i<aNames.length;i++){
                aNames[i].checked = false;
                aNames[i].parentNode.parentNode.style.background = '';
            }
            var oId = document.getElementById(Relation.id);
            oId.checked = true;
            $scope.accountRecord=Relation;
            $scope.d=true;
            oId.parentNode.parentNode.style.background = '#f6f8fa';

            //阻止默认事件
            event.stopPropagation();
           // console.log(Relation);
            /*var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.accountRecord=item;
                    $scope.abIndex = item.id;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }*/
        };

        /**
         * 选中人员信息
         */
        $scope.person={};
        $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
        };

        /**
         *  获取专业线
         */
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
        }).error(function(data,status,headers,config){
            layer.msg('获取信息失败,请稍后重试',{icon : 2});
        });

        /**
         * 获取专项信息
         */
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            layer.msg('获取专项信息失败,请稍后重试',{icon : 2});
        });

        /**
         * 获取集中处理项信息
         */
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjectsAlive").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            layer.msg('获取集中处理项信息失败,请稍后重试',{icon : 2});
        });

        /**
         *  获取人员信息
         */
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            layer.msg('获取人员信息失败,请稍后重试',{icon : 2});
        });

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
                layer.msg('任务已经是集中处理状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState=10;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务转集中处理操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务转集中处理失败,请稍后重试',{icon : 2});
            })
        };

        /**
         * 转专项处理
         */
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                layer.msg('任务已经是转专项状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState=9;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务转专项操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务转专项失败,请稍后重试',{icon : 2});
            })
        };

        /**
         * 转出处理
         */
        $scope.updateRollOut=function(){
            if($scope.aaa.taskState == 5){
                layer.msg('任务已经是转出状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState=5;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务成功转出操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务转出操作失败,请稍后重试',{icon : 2});
            })
        };

        /**
         * 接受
         */
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
                layer.msg('任务已经是接受状态',{icon : 2});
                return;
            }
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务已经接受',{icon : 2});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务接受失败，请稍后重试',{icon : 2});
            })
        };

        /**
         *  失效
         */
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                layer.msg('任务已经是关闭状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务关闭操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务关闭失败,请稍后重试',{icon : 2});
            })
        };

        /**
         *  指派
         */
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                layer.msg('任务已经是指派状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState = 11;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务指派成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务指派失败，请稍后重试',{icon : 2});
            })
        };

        /**
         * 完成操作
         */
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                layer.msg('任务已经是完成状态',{icon : 2});
                return;
            }
            $scope.aaa.taskState=2;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                layer.msg('任务完成操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('任务完成失败,请稍后重试',{icon : 2});
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
                layer.msg('催促操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('催促操作失败,请稍后重试',{icon : 2});
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
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                layer.msg('延时操作成功',{icon : 1});
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                layer.msg('延时操作失败,请稍后重试',{icon : 2});
                $scope.aaa.remarks = "";
            })
        };

        /**
         * 工单处理状态处理
         * @param state
         */
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
                        layer.msg('操作失败，请稍后重试',{icon : 2});
                    });
                $scope.loadTask();
                $scope.isAllTasksChecked = false;
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    layer.msg("任务已经是"+name+"状态!",{icon : 2});
                    return;
                }
            }
        };

        /**
         *任务全部完成
         */
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
                        layer.msg('操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllTasksChecked = false;
                $scope.loadTask();
            }
        }

        /**
         * 任务全部转出
         */
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
                        layer.msg('操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllTasksChecked = false;
                $scope.loadTask();
            }
        }

        /**
         *  任务全部转集中处理
         */
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
                        layer.msg('操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllTasksChecked = false;

            }
        }

        /**
         * 任务全部转专项处理
         */
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
                        layer.msg('操作失败，请稍后重试',{icon : 2});
                    });
                $scope.isAllTasksChecked = false;

            }
        }


        /**
         * 根据条件查询人员及房屋信息
         */

            //根据条件搜索
        $scope.housez={page:{}};
        //加载数据
        var fetchFunction_user = function(page,callback) {
            $scope.housez.page=page;
            $http.post(url + '/HouseNew/listPageByContionRestful',{HouseNew:$scope.housez}).success(callback);
        };
        $scope.searchPaginator_user=app.get('Paginator').list(fetchFunction_user,4);
        console.log($scope.searchPaginator_user);

        //查询所有的资产类型
        $scope.areaTypeNew={};
        $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
            $scope.areaTypeNew= data.AreaTypeNew;
        });

        /**
         * 选中人员信息
         */
        $scope.x=false;             //用于绑定checkbox
        $scope.choiceUsers=[];  //checkbox选择的人员集合
        $scope.choiceRelation=function(Relation,status){
            if(status==true){//选中
                $scope.choiceUsers.push(Relation);
            }else{//未选中时
                if($scope.choiceUsers.length>0){
                    for(var i=0;i<$scope.choiceUsers.length;i++){
                        if(Relation.custId==$scope.choiceUsers[i].custId){
                            $scope.choiceUsers.splice(i,1) ;
                        }
                    }
                }
            }
            console.log($scope.choiceUsers);
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
         * bug 45
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
        $scope.ServiceRequestList=[

        ];
        $scope.listTasks = [];

        $scope.save=function(){
            //联系电话
            /* var phoneNum = app.get("valueCheck").isPhoneOrTelAndNotNull($scope.user.phoneNum);
             if(phoneNum.state == false){
             layer.msg('联系电话'+phoneNum.info,{icon : 0,time : 2000});
             return;
             }*/
            //任务类型
            var tasks = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.taskType);
            if(tasks.state == false){
                layer.msg('请选择任务类型！',{icon : 0,time : 2000});
                return;
            }
            //地址
            var fullname = app.get("valueCheck").isNull($scope.addWaterCheck[0].fullname);
            if(fullname.state == false){
                layer.msg('请选择地址！',{icon : 0,time : 2000});
                return;
            }
            //$scope.ServiceRequest.tasks.addressId = $scope.addWaterCheck[0].id;
            //负责人
            var staffName = app.get("valueCheck").isNull($scope.person.staff.staffName);
            if(staffName.state == false){
                layer.msg('请选择负责人！',{icon : 0,time : 2000});
                return;
            }
            //完成时间
            var estimatedTime = app.get("valueCheck").isNull($scope.ServiceRequest_tasks.estimatedTime);
            if(estimatedTime.state == false){
                layer.msg('请选择完成时间！',{icon : 0,time : 2000});
                return;
            }
            //任务描述
            var taskDescription = app.get("valueCheck").isNull($scope.ServiceRequest_tasks.taskDescription);
            if(taskDescription.state == false){
                layer.msg('请输入任务描述！',{icon : 0,time : 2000});
                return;
            }
            $scope.listTasks.push($scope.ServiceRequest.tasks);
            $scope.ServiceRequestList.push($scope.ServiceRequest.tasks);
            console.log($scope.ServiceRequestList);

            $scope.ServiceRequest.tasks={};
            $scope.addWaterCheck = {};
            $scope.person.staff = {};
            $scope.ServiceRequest_tasks = {};
            /**
             * bug 45修复  2016/3/8 by yeshengqiang 开始
             */
            if($scope.ServiceRequestList.length%10==0)
            {
                $scope.showNum+=10;
                $scope.maxTitleNum1=false;
                $scope.maxTitleNum=true;
                num=0;
                num1++;
            }
            /**
             * bug 45修复  2016/3/8 by yeshengqiang 结束
             */
        };



        /**
         * 保存选择的客户信息
         */
        $scope.choiceUser={};
        $scope.saveData=function(){
            if($scope.choiceUsers.length==1){
                $scope.choiceUser=$scope.choiceUsers[0];
                $scope.choiceUsers=[];
                $scope.ServiceRequest.customerId=$scope.choiceUser.custId;
                $scope.ServiceRequest.writerId=$scope.choiceUser.custId;
                $scope.ServiceRequest.reviewId=$scope.choiceUser.custId;
                $("#myModal_user").modal("hide");
            }else{
                layer.msg('请选择一条授权人信息',{icon : 2});
            }
        };

        /**
         * 显示人员查询模态框
         */
        $scope.showPerson=function(){
            $("#myModal_user").modal("show");
        };

        //取消人员模态框
        $scope.resetData=function(){
            $scope.choiceUsers=[];
            $("#myModal_user").modal("hide");
        };

        /**
         * 判断对象为｛｝
         */
        $scope.isNull=function(obj){
            var i=0;
            for(var j in obj){
                i++
            };
            if(i==0){
                return false;
            }else{
                return true;
            }
        }

    }]);
});
