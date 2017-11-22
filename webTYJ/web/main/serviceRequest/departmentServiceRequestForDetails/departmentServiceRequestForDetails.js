/**
 * Created by NM on 2018/1/18.
 * 评分详情
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('departmentSRFDCtrl', ['$scope', '$http','$rootScope','$stateParams','$location', function ($scope,$http,$rootScope,$stateParams,$location) {

        var url=$rootScope.url;

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
        $scope.department={
            Details:[{ id:"4",name:"质检任务"}]
        };




        $scope.ServiceRequest={};
        $scope.ServiceRequest.frequencyRecord={};
        $scope.show1=true;
        $scope.show2=false;
        $scope.decorate1=function(){
            $scope.show1=true;
            $scope.show2=false;
            $scope.load();
        };
        $scope.addDecorate1=function(){
            $scope.show1=false;
            $scope.show2=true
        };
        //查看任务
        $scope.Tasks={page:{}};

        $scope.Tasks.serverId=$stateParams.depart;
        $scope.load=function(){
            var fetchFunction1 = function (page, callback) {
                $scope.Tasks.page = page;
                $http.post(url + '/Tasks/listPageTasksbyServiceRequestId', {Tasks: $scope.Tasks}).success(callback)

            };

            $scope.searchPaginator = app.get('Paginator').list(fetchFunction1,6);
            console.log($scope.searchPaginator);
        }
        $scope.load();
        $http.get(url+'/ServiceRequest/getServiceRequestbyId/'+$scope.Tasks.serverId).success(function(data){

            $scope.ServiceRequest=data.ServiceRequest;
            console.log(      $scope.ServiceRequest);
        });

        /*    $http.get(url+'/Tasks/getDepartTasksbyServiceRequestId/'+$scope.Tasks.serverId).success(function(data){

         $scope.Task=data.Tasks;
         console.log(data);
         });*/

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
        //传任务ID给工单页面
        $scope.taskDetailsIds=function(taskId){
            console.log(taskId);
            $location.path("/index/serviceRequest/repairOrder/"+taskId).search({taskDetailsIds:taskId});
        };



        $scope.addTasks=function(serviceRequest){
            $scope.Tasks.serverId=serviceRequest;
            $scope.addDecorate1();

            $scope.addTask=function(serviceRequest){

                $scope.Tasks.addressId=$rootScope.addressId;

                if(serviceRequest!=null){
                    $http.post(url +'/Tasks/insertTasks',{Tasks:$scope.Tasks}).success(function(data) {

                        console.log($scope.Tasks);
                        $scope.decorate1();

                        //$scope.selectTasks(serviceRequest);
                        //   $location.path("/index/externalProfession/serviceRequestDatil/allWorkOrders/");
                    }).error(function(data){
                        alert("请求失败！");
                    })
                }else{
                    alert("服务ID不存在！不允许新建任务!");
                }
            };
        };

        /**
         *树形
         */
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
            alert("建筑信息查询失败！")
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
                    console.log($scope.addressId);
                }
            }
            console.log($scope.treeResult.treeList);
            $scope.bslist=$scope.treeResult.treeList;
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            $scope.addWaterCheck = $scope.treeResult.treeList;
            console.log($scope.addWaterCheck);
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

        /*   $scope.addTaskDetails=function(){
         console.log($scope.task.serverId);
         $http.post(url + '/Tasks/insertTasks', {Tasks: $scope.task}).success(function (data) {
         $scope.task=data.Tasks;
         alert("添加任务成功！");
         console.log($scope.task);
         $http.get(url+'/Tasks/getDepartTasksbyServiceRequestId/'+$scope.Tasks.serverId).success(function(data){

         $scope.Task=data.Tasks;
         console.log(data);
         });

         $scope.creTasks=false;
         $scope.newTasks=true;
         $scope.topTasks=true;
         }).error(function (data) {
         alert("服务器请求失败！");
         });
         };*/

        /**********************************模态框事件处理***********************************************/

            //获取专项信息
        $http.get(url + "/SpecialRepairProject/getAllSpecialRepairProject").success(function(data){
            $scope.specialRepairProjects = data.SpecialRepairProject;
        }).error(function(data,status,headers,config){
            alert("获取专项信息失败,请稍后重试!");
        });

        //获取集中处理项信息
        $http.get(url + "/CentralizedTreatmentProjects/getAllCentralizedTreatmentProjects").success(function(data){
            $scope.centralizedTreatmentProjects = data.CentralizedTreatmentProjects;
        }).error(function(data,status,headers,config){
            alert("获取集中处理信息失败,请稍后重试!");
        });

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
        }).error(function(data,status,headers,config){
            alert("获取人员信息失败,请稍后重试!");
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
                //alert("任务转集中处理成功!");
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
                //alert("任务转专项成功!");
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
                //alert("任务成功转出!");
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
                //alert("任务已经接受");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务接受失败，请稍后重试!");
            })
        };
        //失效
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                alert("任务已经是关闭状态!");
                return;
            }
            $scope.aaa.taskState=0;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务关闭操作成功");
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
                //alert("任务指派成功!");
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
                //alert("任务完成操作成功");
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
                //alert("催促操作成功");
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
                //alert("延时操作成功");
                $scope.aaa.remarks = "";
                console.log(data)
            }).error(function(data,status,headers,config){
                alert("延时操作失败,请稍后重试!");
                $scope.aaa.remarks = "";
            })
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
        };
        //任务全部完成
        $scope.updateFinishs=function(){
            if($scope.isAllTasksChecked){
                $scope.forChangeTasks.taskState = 2;
                $scope.forChangeTasks.remarks = $scope.aaa.remarks;
                $http.post(url+'/Tasks/changeTasksStateByIds',{Tasks:$scope.forChangeTasks})
                    .success(function(data){
                        $scope.aaa.remarks = "";
                    })
                    .error(function(){
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;
            }
        }
        /**********************************模态框事件处理END***********************************************/

        /*        function click_a(divDisplay)
         {
         if(document.getElementById(divDisplay).style.display != "block")
         {
         document.getElementById(divDisplay).style.display = "block";
         }
         else
         {
         document.getElementById(divDisplay).style.display = "none";
         }
         }

         function addEvent(el,name,fn){
         if(el.addEventListener) return el.addEventListener(name,fn,false);
         return el.attachEvent('on'+name,fn);
         }
         function nextnode(node){
         if(!node)return ;
         if(node.nodeType == 1)
         return node;
         if(node.nextSibling)
         return nextnode(node.nextSibling);
         }
         addEvent(document.getElementById('root'),'click',function(e){
         e = e||window.event;
         var target = e.target||e.srcElement;
         var tp = nextnode(target.parentNode.nextSibling);
         switch(target.nodeName){
         case 'A':
         if(tp&&tp.nodeName == 'UL'){
         if(tp.style.display != 'block' ){
         tp.style.display = 'block';
         (target.parentNode.previousSibling).className = 'ren'
         }else{
         tp.style.display = 'none';
         (target.parentNode.previousSibling).className = 'add'
         }
         }
         break;
         }
         });*/

    }]);
});