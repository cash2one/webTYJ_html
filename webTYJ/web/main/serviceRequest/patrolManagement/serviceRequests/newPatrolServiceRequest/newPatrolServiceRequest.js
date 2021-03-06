/**
 * Created by NM on 2018/1/18.
 * 巡检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('newPatrolServiceRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;

        $scope.frequencyRecordOne=false;
        $scope.frequencyRecordTow=true;
        $scope.frequencyRecordThree=true;
        $scope.frequencyRecordFour=true;
        $scope.frequencyRecordFive=true;
        $scope.frequencyRecordSix=true;
        $scope.frequencyRecordSeven=true;


        /*$scope.serviceRequest={
            inspectionConfiguration:[], //方案
            frequencyRecord:{},//执行频率
            ExecutionTimeRecords:[]  //执行次数和时间
        };*/
        $scope.serviceRequest={};
        $scope.serviceRequest.inspectionConfiguration=[];
        $scope.serviceRequest.frequencyRecord={};
        $scope.serviceRequest.executionTimeRecords=[];

    $scope.ExecutionTimeRecordss=[];
        $scope.currentEditIndex=null;      //当前编辑框(初始为空)
        $scope.currentEditArea = {};

        //新增银行存单表
        $scope.newConfiguration={Configuration:[]};

        $scope.demand={
            /**任务类型**/
            frequency:[
                { id: '0',name:'日检' },
                { id: '1',name:'周检' },
                { id: '2',name:'半月检' },
                { id: '3',name:'月检' }
            ]
        };

        //负责人信息
        $scope.Teamworkstaff = {page:{}};

        $scope.load= function(){
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);
            console.log($scope.searchPaginator2);
        };
        $scope.load();

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

        $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
            console.log($scope.person)
        };


        //全选
        $scope.selectAll=function(name)
        {
            var el=document.getElementsByName("checkb");
            var s="";
            for (var i=0;i<el.length;i++) {
                if(el[i].type=="checkbox"&&el[i].name==name) {
                    el[i].checked=true;
                }
                if(el[i].checked) s+=el[i].value+',';  //如果选中，将value添加到变量s中
            };
        };
        //取消
        $scope.clearAll=function (name)
        {
            var el=document.getElementsByName("checkb");
            for (var i=0;i<el.length;i++)
            {
                if(el[i].type=="checkbox"&&el[i].name==name)
                {
                    el[i].checked=false;
                }
            }
        };

        /**
         * 当天执行次数与时间 添加行
         */
        $scope.editIndex = null;
        $scope.editItem = false;
        $scope.ExecutionTimeRecord={};
        $scope.add=function(){
            if($scope.editItem){
                layer.msg('请先保存正在填写的数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editItem = true;
            $scope.editIndex = null;


        };
        /**
         * 当天执行次数与时间 新增取消
         */
        $scope.addCancel1=function(){
            $scope.editItem=false;
            $scope.ExecutionTimeRecord={};
        };
        /**
         * 当天执行次数与时间 新增保存
         */;

        $scope.addSave1=function($index){
            if($scope.ExecutionTimeRecord.executiveNumTime==undefined || $scope.ExecutionTimeRecord.executiveNumTime==''){
                layer.msg('执行时间不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.editIndex!=null){
                $scope.ExecutionTimeRecordss[$scope.editIndex]={
                    executiveNum: $scope.ExecutionTimeRecordss.length,
                    executiveNumTime: $scope.ExecutionTimeRecord.executiveNumTime
                }
            }else {
                $scope.ExecutionTimeRecordss.push({
                    executiveNum:($scope.ExecutionTimeRecordss.length)+1,
                    executiveNumTime: $scope.ExecutionTimeRecord.executiveNumTime
                })
            }

            $scope.editItem=false;
            $scope.ExecutionTimeRecord.executiveNumTime='';
        }
        //修改新增行
        $scope.updateItem2 = function(index){
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editIndex = index;
            var current2 = $scope.ExecutionTimeRecordss[index];
            $scope.ExecutionTimeRecord = {
                executiveNum:current2.executiveNum,
                executiveNumTime: current2.executiveNumTime
            };
            $scope.editItem=true;
        };
        $scope.deleteItem2=function(index){


            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                $scope.ExecutionTimeRecordss.splice(index,1);
                layer.msg('删除成功！',{icon : 1,time : 1000});
            },function(){});
        };


        /**新增开始**/
        /**
         *  修改按钮点击事件
         * @param index  行下标
         */
        $scope.updateItem=function(index){

            $scope.currentEditIndex=index;
            var current = $scope.serviceRequest.inspectionConfiguration[index]
            //var current = $scope.inspectionConfiguration.object[index]
            $scope.currentEditArea={
                inspectionPropertyId:current.inspectionPropertyId,
                inspectionPlanId:current.inspectionPlanId
            };

            if($scope.editArea){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editArea=true;

        };
        /**
         * 修改保存
         * @param index 行下标
         */
        $scope.updateSave=function(index){
            $scope.currentEditArea[index].editing=false;
        };
        /**
         * 取消
         * @param index 行
         * 下标
         */
        $scope.updateCancel=function(index){
            $scope.currentEditArea[index]=$scope.cloneItem;
            $scope.currentEditArea[index].editing=false;
        };
        /**
         * 删除数据
         * @param index 行下标
         */
        $scope.deleteItem=function(index){
            //$scope.serviceRequest.inspectionConfiguration.splice(index,1);
            //增加判断是否有数据未保存的判断  杨升权  2016.07.25
            if($scope.editArea){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                $scope.serviceRequest.inspectionConfiguration.splice(index,1);
                //$scope.inspectionConfiguration.object.splice(index,1);
                layer.msg('删除成功！',{icon : 1,time : 1000});
                $scope.$apply($scope.serviceRequest.inspectionConfiguration);
            },function(){});
        };
        /**
         * 新增按钮事件
         */
        $scope.addItem=function(){
            if($scope.editArea){
                layer.msg('请先保存正在填写的数据！',{icon : 0,time : 1000});
                return;
            }

            $scope.editArea=true;
            $scope.currentEditIndex=null;
            $scope.currentEditArea = {};
        };
        /**
         *
         */
        $scope.PinspectionPlanId='';
        $scope.addSave=function(){
            $scope.currentEditArea.inspectionPlanName='';
            if($scope.currentEditArea.fullname==undefined || $scope.currentEditArea.fullname==''){
                layer.msg('巡检目标不能为空！',{icon : 0,time : 1000});
                return;
            }
            if($scope.currentEditArea.inspectionPlanId==null || $scope.currentEditArea.inspectionPlanId==''){
                layer.msg('巡检方案不能为空！',{icon : 0,time : 1000});
                return;
            }
            $scope.PinspectionPlanId=$scope.currentEditArea.inspectionPlanId
            $http.get(url + '/InspectionPlan/getInspectionPlan1/'+  $scope.PinspectionPlanId).success(function(data) {
                $scope.currentEditArea.inspectionPlanName =data.InspectionPlan.inspectionPlanName;
                console.log( $scope.currentEditArea.inspectionPlanName);


                if($scope.currentEditIndex!=null){
                    $scope.serviceRequest.inspectionConfiguration[$scope.currentEditIndex]={
                        //$scope.inspectionConfiguration.object[$scope.currentEditIndex]={
                        inspectionPropertyId:$scope.currentEditArea.inspectionPropertyId,
                        fullname:$scope.currentEditArea.fullname,
                        inspectionPlanName: $scope.currentEditArea.inspectionPlanName,
                        inspectionPlanId:$scope.currentEditArea.inspectionPlanId
                    };
                    // $scope.serviceRequest.frequencyRecord=$scope.serviceRequest.frequencyRecord.frequencyType;
                }
                else{
                    $scope.serviceRequest.inspectionConfiguration.push({
                        inspectionPropertyId:$scope.currentEditArea.inspectionPropertyId,
                        fullname:$scope.currentEditArea.fullname,
                        inspectionPlanName:$scope.currentEditArea.inspectionPlanName,
                        inspectionPlanId:$scope.currentEditArea.inspectionPlanId
                    });
                }
                //$scope.currentEditArea={};
                $scope.editArea=false;
                $scope.PinspectionPlanId='';
                console.log( $scope.serviceRequest);
            });



        };
        /*
         * 新增取消
         */
        $scope.addCancel=function(){
            $scope.editArea=false;
            $scope.currentEditArea={};
        };
        /**新增结束**/

            //查询所有的巡检方案
        $http.get(url + '/InspectionPlan/listAllInspectionPlan1/' + '1').success(function(data) {
            $scope.inspectionPlans=[];
            $scope.inspectionPlans= data.InspectionPlan;
            for(var i in $scope.inspectionPlans){
                $scope.inspectionPlans[i].name = $scope.inspectionPlans[i].inspectionPlanName;
                $scope.inspectionPlans[i].id = $scope.inspectionPlans[i].inspectionPlanId;
                $scope.Datil1.taskType.push($scope.inspectionPlans[i])
            }

            console.log($scope.inspectionPlans);
        });
        $scope.Datil1= {

            taskType: [
            ]
        }


        //新建巡检服务请求
        $scope.tasks={};
        $scope.serviceRequest.tasks={};
        $scope.saveServiceRequest=function(){
            $scope.serviceRequest.importantEvent = 0;
            //$scope.serviceRequest.requestSource = "前台";
            $scope.serviceRequest.directionType = 0;//内部服务
            $scope.serviceRequest.serviceRequestType=9;//巡检
            $scope.serviceRequest.executionTimeRecords=$scope.ExecutionTimeRecordss;
            if($scope.serviceRequest.serviceRequestName==undefined || $scope.serviceRequest.serviceRequestName=='' || $scope.serviceRequest.serviceRequestName==null){
                layer.msg('巡检名称不能为空！',{icon : 0});
                return;
            }
            if($scope.person.staff.staffName==undefined ||$scope.person.staff.staffName.replace(/\s+/g,"")=="" ||$scope.person.staff.staffName == null){
                layer.msg('负责人不能为空！',{icon : 0});
                return;
            }
            if($scope.serviceRequest.remarks==undefined ||$scope.serviceRequest.remarks=="" ||$scope.serviceRequest.remarks == null){
                layer.msg('描述不能为空！',{icon : 0});
                return;
            }if($scope.serviceRequest.frequencyRecord.frequencyType==undefined ||$scope.serviceRequest.frequencyRecord.frequencyType=="" ||$scope.serviceRequest.frequencyRecord.frequencyType == null){
                layer.msg('频率类型不能为空！',{icon : 0});
                return;
            }
            if($scope.serviceRequest.frequencyRecord.frequencyType !=0 && $scope.frequencyRecordChecked.length==0) {
                layer.msg('执行频率不能为空！',{icon : 0});
                return;
            }
            $scope.serviceRequest.frequencyRecord.executionFrequencys=$scope.frequencyRecordChecked;
            $scope.serviceRequest.frequencyRecord.executionFrequencyNum=$scope.ExecutionTimeRecordss.length;

            $scope.serviceRequest.staff=$scope.person.staff;

            $http.post(url+'/ServiceRequest/insertInspectionPlan',{ServiceRequest:$scope.serviceRequest}).success(function(data) {
                layer.msg('添加成功',{icon : 1,time : 2000});
                $location.path("/index/serviceRequest/patrolManagement/serviceRequests/isGoingServiceRequest");

            }).error(function(data, status, headers, config){
                layer.msg("添加失败",{icon : 2,time : 2000});
            }) ;
        };

        $scope.Datil= {

            taskType: [
                { id:'9',name:'巡检' }
             ]
        }

        /********************************************************************************************************************/
        //查询所有建筑结构信息. 杨升权 2016/7/19
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
            if($scope.treeResult.treeList.length > 1){
                layer.msg('只能选择一个地址！',{icon : 0,time : 2000});
                return;
            }
            $scope.currentEditArea = $scope.treeResult.treeList;
            $scope.currentEditArea.fullname = $scope.treeResult.treeList[0].fullname;
            $scope.currentEditArea.inspectionPropertyId = $scope.treeResult.treeList[0].id;

            $('#tree').modal('hide');
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



        //根据条件搜索人员信息
        $scope.searchone={page:{}};

        var parent = function (page, callback) {
            $scope.searchone.page = page;
            $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
        };
        $scope.currentPaginator = app.get('Paginator').list(parent,4);
        //    console.log($scope.currentPaginator);
        $scope.person={};
        $scope.name;
        $scope.tnpObj = {};
        var tempMark = false;                   //此状态是标记是否选定该用户，并且提交，如果没有提交则回到之前提交锁定的人员;
        $scope.choicePerson1=function(person){
            $scope.person=person;
            /*  console.log($scope.person);*/
            tempMark = false;
            $scope.btnIndex=$scope.person.custId;
            $scope.tnpObj = app.get('centerChange').centerChange(person);
        };

        /**
         * 去除绑定
         */

        $scope.subSave = function(){
            $scope.name=$scope.tnpObj.name;
            //$scope.accessPhone=$scope.tnpObj.registerPhone;
            $scope.btnIndex=$scope.tnpObj.custId;
            $scope.serviceRequest.customerId= $scope.tnpObj.custId;
            $scope.serviceRequest.accessPhone=$scope.tnpObj.registerPhone;
            $scope.serviceRequest.reviewId= $scope.tnpObj.custId;
            tempMark = true;
        };

        /**
         * 选取客户取消
         */
        $scope.subCancel = function(){
            if(!tempMark){
                var customerId = app.get('valueCheck').isNull($scope.serviceRequest.customerId);
                if(!customerId.state){
                    $scope.btnIndex = '';
                }else{
                    var allData = $scope.currentPaginator.object.personCustNew.slice(1);
                    angular.forEach(allData,function(item){
                        if(item.custId == $scope.serviceRequest.customerId){
                            $scope.btnIndex = item.custId;
                        }
                    });
                }
            }
        };



        $scope.frequencyRecordChecked=[];
        $scope.doCheck=function() {
            TempChecked();
        }

        function TempChecked() {
            var temp = document.getElementsByName('checkb');
            $scope.frequencyRecordChecked=[];
            for (var i = 0; i < temp.length; i++) {

                if (temp[i].checked == true) {

                     $scope.frequencyRecordChecked.push(temp[i].value);
                }else{
                    if (temp[i].checked == true) {

                        $scope.frequencyRecordChecked.push(temp[i].value);
                    }
                }
            }
            console.log( $scope.frequencyRecordChecked);
        }

        $scope.changeFre=function() {
            var temp = document.getElementsByName('checkb');
            $scope.frequencyRecordChecked=[];
            for (var i = 0; i < temp.length; i++) {

                if (temp[i].checked == true) {
                    temp[i].checked=false;
                }

            }
            $scope.frequencyRecordChecked=[];

            if ($scope.serviceRequest.frequencyRecord.frequencyType == 0) {//日检
                $scope.frequencyRecordOne = true;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = false;
                $scope.frequencyRecordFour = false;
                $scope.frequencyRecordFive = false;
                $scope.frequencyRecordSix = false;
                $scope.frequencyRecordSeven = false;
            } else if ($scope.serviceRequest.frequencyRecord.frequencyType == 1) {//周检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = true;
                $scope.frequencyRecordThree = false;
                $scope.frequencyRecordFour = false;
                $scope.frequencyRecordFive = false;
                $scope.frequencyRecordSix = false;
                $scope.frequencyRecordSeven = false;
            } else if ($scope.serviceRequest.frequencyRecord.frequencyType == 2) {//半月检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = true;
                $scope.frequencyRecordFour = true;
                $scope.frequencyRecordFive = true;
                $scope.frequencyRecordSix = true;
                $scope.frequencyRecordSeven = true;
            } else if ($scope.serviceRequest.frequencyRecord.frequencyType == 3) {//月检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = true;
                $scope.frequencyRecordFour = true;
                $scope.frequencyRecordFive = true;
                $scope.frequencyRecordSix = true;
                $scope.frequencyRecordSeven = true;
            }
        }

    }]);
});