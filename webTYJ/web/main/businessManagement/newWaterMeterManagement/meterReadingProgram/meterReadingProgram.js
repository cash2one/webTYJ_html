/**
 * Created by Administrator on 2015/12/15.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('meterReadingProgramCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.doClick(2);
        var url = $rootScope.url;                     //url地址
        $scope.searchMeter = {page: {}};         //水表抄表计划分页
        $scope.fileUrl = $rootScope.fileUrl;
        $scope.waterAddSave = {currentExecutor:null};         //新增水表抄表保存

        $rootScope.MeterReadingProgramId = ''; //全局变量抄表计划id
        $rootScope.tree = true;   //树形显示状态
        $scope.bslist = {};       //建筑结构id集合

        var user = {employId: ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        //$scope.loginName = $scope.user.staff.staffName;
        console.log($scope.user);
        $scope.addWaterCheck = [];
        /**
         * 分页查询所有水表抄表
         */
        $scope.load = function () {
            var waterCheckFunction = function (page, callback) {
                $scope.searchMeter.page = page;
                $http.post(url + '/MeterReadingProgram/listMeterReadingProgram',
                    {SearchMeter: $scope.searchMeter}).success(callback);
            };
            $scope.waterChecks = app.get('Paginator').list(waterCheckFunction, 6);
            console.log($scope.waterChecks);
        };
        $scope.load();
        /**
         * 选中一条数据事件
         * @param index  水表抄表计划数据id
         */
        $scope.check = function (index) {
            var checkbox = $('#'+index.meterReadingProgramId)[0];
            var tr = $(checkbox).parent().parent()[0];
            $(tr).toggleClass('this_info');
            checkbox.checked = $(tr).hasClass('this_info');
            $scope.item2 = index;
        };

        function buildingTreeOnSelect (event, treeId, treeNode){
            if(treeNode.children!=null){
                return ;
            }
            $http.get(url+'/WaterMeter/getWaterMeterAndFullNameByParentId/'+treeNode.id).success(function(data){
                if(data.info.length!=null && data.info!='未查询到数据！'){
                    $scope.houses = data.info;
                    $scope.housesTemp = data.info;
                }else{
                    $scope.houses = [];
                    $scope.housesTemp = [];
                }
            })
        }


        $scope.newPlan = function(){
            $scope.staffNames = [];
            $scope.waterAddSave={};
           // $scope.staffNames = [];
            //查询所有员工信息
            $http.get(url + '/staff/listAllStaffRestful/').success(function (data) {
                //console.log(data);
               // console.log(data.Staff);
                var staffArr=data.Staff;
                for(var i=0;i<staffArr.length;i++){
                   // $scope.staffNames.push(staffArr[i].staffName);
                    $scope.staffNames.push(staffArr[i]);
                }
                //存放所有的抄表人
                $scope.waterAddSave.currentExecutor =  angular.copy($scope.staffNames);
                //存放所有审核人员
                $scope.waterAddSave.reviewers =  $scope.staffNames;
                //console.log($scope.waterAddSave.currentExecutor);
                //console.log($scope.waterAddSave.reviewers);
            }).error(function () {
            });


            //$scope.waterAddSave.currentExecutor = $scope.user.staff.staffName;
           // $scope.waterAddSave.currentExecutor =  $scope.staffNames;
           // $scope.waterAddSave.modifiedPerson = $scope.user.staff.staffName;
            $scope.addOrEdit = true;
            $scope.addWaterCheck=[];
            $scope.houses= {};
            var buildingTree = $.fn.zTree.getZTreeObj('buildingTree');
            buildingTree.removeNode(buildingTree.getNodes()[0]);
            buildingTree.updateNode(buildingTree.getNodes()[0]);
        };
        var zTreeSetting ={
            check: {
                enable: true
            },
            view: {
                selectedMulti: false
            },
            edit: {
                enable: false,
                editNameSelectAll: false
                //showRemoveBtn: showRemoveBtn,
                //showRenameBtn: showRenameBtn
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: buildingTreeOnSelect
            }
        };
        $.fn.zTree.init($('#buildingTree'),zTreeSetting,[]);
        /**
         * 根据项目id获取建筑信息
         * @param projectId
         */
        $scope.getBuildingList = function(projectId){
            $http.get(url+'/BuildingStructureNew/listBuildingByProjectId/'+projectId).success(function(data){
                //console.log(data);
                var buildingList = data.BuildingStructureNew;
                //console.log(buildingList);
                $scope.nodes = [];
                for(var i =0;i<buildingList.length;i++){
                    $scope.node = {id:buildingList[i].id,name:buildingList[i].nodeName,fullName:buildingList[i].fullName,nocheck:true,pId:buildingList[i].parentId};
                    $scope.nodes.push($scope.node);
                }
                $.fn.zTree.init($('#buildingTree'),zTreeSetting,$scope.nodes);
            }).error(function(){

            })
        };
        /**
         * 获取选中树
         * @type {Array}
         */
        var ids = [];
        var buildingStructureIds = [];//选中建筑
        $scope.getChecked = function(){
            var houses = $('#houses').find('input[type=checkbox]');
            var checks = [];
            ids=[];
            for(var i =0;i<houses.length;i++){
                if(houses[i].checked){
                    for(var j = 0; j<$scope.houses.length; j++){
                        if(houses[i].id==$scope.houses[j].waterMeterRecordsId){
                            buildingStructureIds.push($scope.houses[j].id);
                        }
                    }
                    var obj = {id:houses[i].id,waterMeterNum:houses[i].labels[0].innerHTML,fullName:houses[i].labels[1].innerHTML};
                    checks.push(obj);
                    ids.push(houses[i].id);
                }
            }
            return checks;
        };

        /**
         * 搜索树
         */
        var TO = $.fn.zTree.getZTreeObj('buildingTree');
        $scope.searchTree1 = function(){
            if($scope.region==''){
                return;
            }
            $.fn.zTree.init($('#buildingTree'),zTreeSetting,$scope.nodes);
            var nodes = TO.getNodes();
            for(var i = 0;i<nodes.length;i++){
                if(nodes[i].fullName.indexOf($scope.region)==-1){
                    var children = nodes[i].children;
                    if(children.length!=null&&children.length!=0){
                        for(var n = 0;n<children.length;n++){
                            if(children[i].fullName.indexOf($scope.region)==-1){
                                TO.removeNode(children[i]);
                            }
                        }
                    }
                    if(children.length==0){
                        TO.removeNode(nodes[i]);
                    }
                }
            }
            TO.updateNode(nodes[0]);
        };
        /**
         * 搜索列表
         * @type {string}
         */
        $scope.tableNumber1='';
        $scope.tableName1='';
        $scope.searchTree2 = function(){
            $scope.houses = $scope.housesTemp;
            if($scope.tableNumber1!=''&&$scope.tableName1!=''){
                var tempArray1 = [];
                for(var i =0;i<$scope.houses.length;i++){
                    if($scope.houses[i].waterMeterNum.indexOf($scope.tableNumber1)!=-1&&
                        $scope.houses[i].fullName.indexOf($scope.tableName1)!=-1){
                        tempArray1.push($scope.houses[i]);
                    }
                }
                $scope.houses = tempArray1;
            }else{
                var tempArray2 = [];
                for(var n =0;n<$scope.houses.length;n++){
                    if($scope.tableNumber1!=''){
                        if($scope.houses[n].waterMeterNum.indexOf($scope.tableNumber1)!=-1){
                            tempArray2.push($scope.houses[n]);
                        }
                    }else if($scope.fullName!=''){
                        if($scope.houses[n].fullName.indexOf($scope.tableName1)!=-1){
                            tempArray2.push($scope.houses[n]);
                        }
                    }
                }
                $scope.houses = tempArray2;
            }
        };
        /**
         * 搜索列表
         * @type {string}
         */
        $scope.tableNumber2='';
        $scope.tableName2='';
        $scope.searchTree3 = function(){
            $scope.addWaterCheck = $scope.addWaterCheckTemp;
            if($scope.tableNumber2!=''&&$scope.tableName2!=''){
                var tempArray1 = [];
                for(var i =0;i<$scope.addWaterCheck.length;i++){
                    if($scope.addWaterCheck[i].waterMeterNum.indexOf($scope.tableNumber2)!=-1&&
                        $scope.addWaterCheck[i].fullName.indexOf($scope.tableName2)!=-1){
                        tempArray1.push($scope.addWaterCheck[i]);
                    }
                }
                $scope.addWaterCheck = tempArray1;
            }else{
                var tempArray2 = [];
                for(var n =0;n<$scope.addWaterCheck.length;n++){
                    if($scope.tableNumber2!=''){
                        if($scope.addWaterCheck[n].waterMeterNum.indexOf($scope.tableNumber2)!=-1){
                            tempArray2.push($scope.addWaterCheck[n]);
                        }
                    }else if($scope.fullName!=''){
                        if($scope.addWaterCheck[n].fullName.indexOf($scope.tableName2)!=-1){
                            tempArray2.push($scope.addWaterCheck[n]);
                        }
                    }
                }
                $scope.addWaterCheck = tempArray2;
            }
        };

        $scope.checkTime = function(){
            //console.log(typeof ($scope.waterAddSave.startTime));
            if($scope.waterAddSave.executionFrequency==1){
                // $scope.waterAddSave.endTime = new Date(($scope.waterAddSave.endTime).replace(/-/,'/'));
                $scope.waterAddSave.endTime = new Date($scope.waterAddSave.endTime);
                //console.log($scope.waterAddSave.endTime);
                var date =new Date(new Date($scope.waterAddSave.endTime.getTime()));
                var time = new Date(date.setDate($scope.waterAddSave.endTime.getDate()+Number($scope.waterAddSave.auditTime)));
                /* $scope.waterAddSave.startTime = new Date(($scope.waterAddSave.startTime).replace(/-/,'/'));*/
                //console.log($scope.waterAddSave.startTime);
                $scope.waterAddSave.startTime = new Date($scope.waterAddSave.startTime);
                //console.log($scope.waterAddSave.startTime);
                if(time.getMonth()>$scope.waterAddSave.startTime.getMonth() && time.getDate() >$scope.waterAddSave.startTime.getDate()){
                    layer.msg('审核时长不能大于下一次审核的开始时间！',{icon:2});
                    return false;
                }else{
                    return true;
                }
            }
        };

        /**
         * 新建水表抄表
         */
        $scope.submitWater = function () {
            $scope.waterAddSave.ids = ids;
            console.log($scope.waterAddSave.ids);
            if ($scope.waterAddSave.projectName == undefined || $scope.waterAddSave.projectName == "" || $scope.waterAddSave.projectName == null) {
                layer.alert('计划名称不能为空！', {icon: 0});
                return;
            } else if ($scope.waterAddSave.projectId == undefined || $scope.waterAddSave.projectId == "" || $scope.waterAddSave.projectId == null) {
                layer.alert('项目名称不能为空！', {icon: 0});
                return;
            }/* else if ($scope.waterAddSave.settlementDay == undefined || $scope.waterAddSave.settlementDay == "" || $scope.waterAddSave.settlementDay == null) {
             layer.alert('月结日不能为空！', {icon: 0});
             return;
             }*/ else if ($scope.waterAddSave.startTime == undefined || $scope.waterAddSave.startTime == "" || $scope.waterAddSave.startTime == null) {
                layer.alert('开始时间不能为空！', {icon: 0});
                return;
            } else if ($scope.waterAddSave.endTime == undefined || $scope.waterAddSave.endTime == "" || $scope.waterAddSave.endTime == null) {
                layer.alert('结束时间不能为空！', {icon: 0});
                return;
            } else if(new Date($scope.waterAddSave.startTime)-new Date($scope.waterAddSave.endTime )>0){
                layer.msg('开始时间不能超过结束时间！',{icon:0});
                return;
            } else if ($scope.waterAddSave.executionFrequency == undefined || $scope.waterAddSave.executionFrequency == "" || $scope.waterAddSave.executionFrequency == null) {
                layer.alert('审核频率不能为空！', {icon: 0});
                return;
            } else if ($scope.waterAddSave.auditTime == undefined || $scope.waterAddSave.auditTime == "" || $scope.waterAddSave.auditTime == null) {
                layer.alert('审核时长不能为空！', {icon: 0});
                return;
            }
            if(!$scope.checkTime()){
            }

            if($scope.addOrEdit){
                if ($scope.waterAddSave.ids == undefined || $scope.waterAddSave.ids == "" || $scope.waterAddSave.ids == null) {
                    layer.alert('建筑不能为空！', {icon: 0});
                    return;
                }

                //添加抄表人
                //$scope.waterAddSave.currentExecutor = $scope.user.staff.staffName;
                //添加修改人
               // $scope.waterAddSave.modifiedPerson = $scope.user.staff.staffName;

                $scope.serviceRequest={listTasks:{}};

                $http.post(url + '/MeterReadingProgram/insertMeterReadingProgram',
                    {MeterReadingProgram: $scope.waterAddSave}).success(function () {
                    $scope.serviceRequest.requestSource = '自动创建';
                    $scope.serviceRequest.source=1;//周期性抄表
                    $scope.serviceRequest.serviceRequestState = 0;//不需回访
                    $scope.serviceRequest.serviceRequestName = '水表抄表计划服务请求';
                    $scope.serviceRequest.serviceRequestType = '5';//水表
                    $scope.serviceRequest.remarks = '水表抄表自动创建';//备注
                    $scope.serviceRequest.directionType = 0;//外部服务请求
                    $scope.serviceRequest.listTasks.taskType = 16;//任务类型
                    $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                    $scope.serviceRequest.listTasks.addressIds=[];
                    $scope.serviceRequest.listTasks.addressIds.push(buildingStructureIds);//地址id
                    $scope.serviceRequest.listTasks.taskDescription = '水表抄表计划服务请求';//任务描述
                    //$scope.serviceRequest.listTasks.principal = '';//负责人
                    $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function (data) {
                        layer.msg('添加水表抄表成功', {icon: 1});
                        $scope.load();
                        $('#myModal').hide();
                    }).error(function (data) {
                        layer.msg("添加水表抄表失败",{icon : 2,time : 2000});
                    });
                }).error(function () {
                    layer.msg('添加水表抄表失败', {icon: 2});
                });
            }else{
                ids = [];
                var array = $("#selected").find('input[type=checkbox]');
                for(var i=0; i<array.length;i++){
                    ids.push(array[i].value);
                }
                $scope.waterAddSave.ids = ids;
                if ($scope.waterAddSave.ids == undefined || $scope.waterAddSave.ids == "" || $scope.waterAddSave.ids == null) {
                    layer.msg('建筑不能为空！', {icon: 0});
                    return;
                }

                //$scope.waterAddSave.modifiedPerson=$scope.user.staff.staffName;
                $http.post(url + '/MeterReadingProgram/updateMeterReadingProgram',
                    {MeterReadingProgram: $scope.waterAddSave}).success(function () {
                        //console.log()
                    layer.msg('编辑水表抄表成功', {icon: 1});
                    $scope.load();
                    $('#myModal').hide();
                }).error(function () {
                    layer.msg('编辑水表抄表失败', {icon: 2});
                });
            }

        };
        /**
         * 获取抄表计划项目
         */
            //$scope.user.companyId = '8b084280-9310-4052-a715-eb7bb2c23c91';
        $http.get(url + '/Project/listAllProject/'+$scope.user.companyId).success(function (data) {
            $scope.currentObject = data.Project;
        }).error(function () {
            layer.msg('获取抄表计划项目失败', {icon: 2});
        });

        //查询所有员工信息
        $http.get(url + '/staff/listAllStaffRestful/').success(function (data) {
            console.log(data);
            // console.log(data.Staff);
            $scope.temp = data.Staff;
            $scope.currentStaff= $scope.temp;
            //$scope.waterAddSave.currentExecutor =  angular.copy($scope.staffNames);
           // $scope.currentPeople=data.Staff;
            $scope.currentPeople=angular.copy($scope.temp);
        }).error(function () {
        });

        /**
         * 取消水表抄表
         */
        $scope.cancelWater = function () {
            $scope.load();
        };
        /**
         * 计划修改(按钮)
         */
        $scope.currentObject = [];                   //所有项目
        $scope.currentStaff = [];                    //所有审核人员
        $scope.currentPeople = [];                    //所有抄表人

        /**
         * 抄表计划编辑
         * @param index
         */
        $scope.updatePlans = function (index) {
            $scope.addOrEdit = false;
            if(getSelect().length==0){
                layer.msg("请选择抄表计划", {icon: 0});
                return ;
            }else if(getSelect().length>1){
                layer.msg("只能选择一项抄表计划进行编辑", {icon: 0});
                return;
            }
            if (index == null) {
                layer.msg("请选择抄表计划", {icon: 0});
            } else {
                $('#myModal').modal('show');
                $rootScope.tree = false;
                $scope.item3 = index;
                $scope.waterAddSave = $scope.item3;
                $scope.waterAddSave.startTime = new Date($scope.waterAddSave.startTime);
                $scope.waterAddSave.endTime = new Date($scope.waterAddSave.endTime);
                $scope.waterAddSave.settlementDay = $scope.waterAddSave.settlementDay+'';
                $scope.waterAddSave.auditTime = $scope.waterAddSave.auditTime+'';
                $scope.waterAddSave.executionFrequency = $scope.waterAddSave.executionFrequency+'';

                $scope.getBuildingList($scope.waterAddSave.project.projectId);

                $http.get(url+'/MeterReadingProgram/editData/'+$scope.waterAddSave.meterReadingProgramId).success(function(data){
                    if(data.MeterReadingProgram.waterMeterList.length==null){
                        data.MeterReadingProgram.waterMeterList = [data.MeterReadingProgram.waterMeterList];
                    }
                    var MeterReadingProgram = data.MeterReadingProgram;
                    //编辑抄表人
                    //$scope.user.staff.staffName=MeterReadingProgram.currentExecutor;
                    if(MeterReadingProgram!=null&&MeterReadingProgram.waterMeterList!=null){
                        for(var i =0;i<MeterReadingProgram.waterMeterList.length;i++){
                            MeterReadingProgram.waterMeterList[i].id = MeterReadingProgram.waterMeterList[i].waterMeterRecordsId;
                        }
                    }
                    $scope.addWaterCheck = MeterReadingProgram.waterMeterList;
                })
            }

        };
        /**
         * 获取选中数据
         */
        function getSelect (){
            var executeInput = $('#executeInput').find('input[type=checkbox]');
            var meterReadingProgramIds = [];
            for(var i= 0;i<executeInput.length;i++){
                if(executeInput[i].checked){
                    meterReadingProgramIds.push(executeInput[i].id);
                }
            }
            return meterReadingProgramIds;
        }

        /**
         * 执行
         */
        $scope.execute = function(){
            var meterReadingProgramIds = getSelect();
            if(getSelect()==0){
                layer.msg('您未选中执行项！',{icon:0});
                return;
            }
            $http.post(url+"/MeterReadingProgram/implementProgram",JSON.stringify(meterReadingProgramIds)).success(function(data){
                if(data.info=='执行成功'){
                    layer.msg('执行成功',{time:1500,icon:1});
                    $scope.waterChecks._load();
                }else{
                    layer.msg('执行出错',{time:1500,icon:2});
                }
            })
        };
        /**
         * 全选
         */
        $scope.executeAll = function(){
            var inputs = $('#executeInput').find('input[type=checkbox]');
            if(inputs.length>getSelect().length){
                $(inputs).each(function(index,element){
                    element.checked = true;
                }).parent().parent().each(function(){
                    $(this).addClass('this_info');
                });
                $('#executeAll')[0].checked = true ;
            }else if((inputs.length=getSelect().length)){
                $(inputs).each(function(index,element){
                    element.checked = false;
                }).parent().parent().each(function(){
                    $(this).removeClass('this_info');
                });
                $('#executeAll')[0].checked = false ;
            }
        };
        /**
         * 保存计划修改
         */
        $scope.submitUpdatePlan = function (index) {
            //alert(index);
            if ($scope.currentProjectPlan.projectName == undefined || $scope.currentProjectPlan.projectName == "" || $scope.currentProjectPlan.projectName == null) {
                layer.alert('计划名称不能为空！', {icon: 0});
                $scope.load();
                return;
            } else if ($scope.currentProjectPlan.projectId == undefined || $scope.currentProjectPlan.projectId == "" || $scope.currentProjectPlan.projectId == null) {
                layer.alert('项目名称不能为空！', {icon: 0});
                $scope.load();
                return;
            } /*else if ($scope.currentProjectPlan.settlementDay == undefined || $scope.currentProjectPlan.settlementDay == "" || $scope.currentProjectPlan.settlementDay == null) {
             layer.alert('月结日不能为空！', {icon: 0});
             $scope.load();
             return;
             }*/
            else if ($scope.currentProjectPlan.startTime == undefined || $scope.currentProjectPlan.startTime == "" || $scope.currentProjectPlan.startTime == null) {
                layer.alert('开始时间不能为空！', {icon: 0});
                $scope.load();
                return;
            } else if ($scope.currentProjectPlan.endTime == undefined || $scope.currentProjectPlan.endTime == "" || $scope.currentProjectPlan.endTime == null) {
                layer.alert('结束时间不能为空！', {icon: 0});
                $scope.load();
                return;
            } else if ($scope.currentProjectPlan.currentExecutor == undefined || $scope.currentProjectPlan.currentExecutor == "" || $scope.currentProjectPlan.currentExecutor == null) {
                layer.alert('抄表人不能为空！', {icon: 0});
                $scope.load();
                return;
            }
            $scope.currentProjectPlan.meterReadingProgramId = index;
            $scope.currentProjectPlan.buildingStructureNew = $scope.bslist;
            $http.put(url + '/MeterReadingProgram/updateMeterReadingProgram',
                {MeterReadingProgram: $scope.currentProjectPlan}).success(function () {
                layer.alert('保存计划修改成功', {icon: 1});
                $scope.load();
            }).error(function (data, status, headers, config) {
                layer.alert('保存计划修改失败', {icon: 2});
            });
        };
        /**
         * 取消计划修改
         */
        $scope.cancelUpdatePlan = function () {
            $scope.item2 = null;
            $scope.load();
        };

        /**
         * 显示添加页面树状菜单
         */
        //查询所有建筑结构信息.
        /*$http.get(url + '/BuildingStructureNew/listAllBuildingStructureNewByAllId/' + $scope.id).success(function (data) {
         $scope.zNodes = [{}];
         //获取json数据
         $scope.buildingStructureNews = data.BuildingStructureNew;
         var tasks = $scope.buildingStructureNews;
         if (tasks != null) {
         for (var i = 0; i < tasks.length; i++) {
         $scope.zNode = {
         id: tasks[i].id,
         pId: tasks[i].parentId,
         name: tasks[i].nodeName,
         fullname: tasks[i].fullName,
         checked: tasks[i].checked
         };
         $scope.zNodes.push($scope.zNode);
         }
         $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);

         var zTree = $.fn.zTree.getZTreeObj("treeDemo");
         var nodes = zTree.getNodes();
         nodes[0].name = "建筑信息";
         zTree.updateNode(nodes[0]);
         }
         }).error(function (data, status, headers, config) {
         layer.alert("建筑信息查询失败！", {icon: 2})
         });*/

        var zTreeOnCheck = function (event, treeId, treeNode) {
            var treeObj = null;
            if ($rootScope.tree == true) {
                treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            } else {
                treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
            }

            var nodes = treeObj.getCheckedNodes(true);
            $scope.treeResult = {treeList: []};
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].isParent == false) {
                    $scope.treeResult.treeList.push(nodes[i]);
                }
            }
            $scope.bslist = $scope.treeResult.treeList;

        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function () {
            var temp = $scope.getChecked();
            var array = angular.copy($scope.addWaterCheck);
            for(var i=0;i<temp.length;i++){
                var bool = true;
                for(var n = 0;n<$scope.addWaterCheck.length;n++){
                    if(temp[i].id==$scope.addWaterCheck[n].id){
                        bool=false;

                    }
                }
                if(bool){
                    array.push(temp[i]);
                }
            }
            $scope.addWaterCheck = array;
            console.log($scope.addWaterCheck);
            $scope.addWaterCheckTemp = $scope.addWaterCheck;
        };

        /**
         * 删除已选中的树数据
         */
        $scope.removeWaterReading = function(){
            var selected = $("#selected").find('input[type=checkbox]:checked');
            var array = [];
            for(var i = 0;i<$scope.addWaterCheck.length;i++){
                var bool=true;
                for(var n = 0;n<selected.length;n++) {
                    if($scope.addWaterCheck[i].id==$(selected[n]).val()){
                        bool=false;
                    }
                }
                if(bool){
                    array.push($scope.addWaterCheck[i]);
                }
            }
            $scope.addWaterCheck = array;
        };

        var setting = {
            check: {
                enable: true
            },
            view: {
                selectedMulti: false
            },
            edit: {
                enable: false,
                editNameSelectAll: false
                //showRemoveBtn: showRemoveBtn,
                //showRenameBtn: showRenameBtn
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onCheck: zTreeOnCheck,
                onClick: updateWaterReading
            }
        };


        var updateWaterReading = function () {
            $scope.updateWaterCheck = $scope.treeResult.treeList;
        };

        function selectAll() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
        }

        $(document).ready(function () {
            $("#selectAll").bind("click", selectAll);
        });

        $scope.updateWaterReading = function () {
            $scope.updateWaterCheck = $scope.treeResult.treeList;
        };

        function getSelect1(){
            var executeInput = $('#executeInput').find('input[type=checkbox]');
            var meterReadingProgramIds = [];
            for(var i= 0;i<executeInput.length;i++){
                if(executeInput[i].checked){
                    var meterReadingProgram = $scope.waterChecks.object.meterReadingProgram;
                    for(var n in meterReadingProgram){
                        if(meterReadingProgram[n].meterReadingProgramId==executeInput[i].id){
                            meterReadingProgramIds.push({id:executeInput[i].id,projectName:meterReadingProgram[n].projectName});
                        }
                    }
                }
            }
            return meterReadingProgramIds;
        }

        $scope.exportExcelHouse = function() {
            var i = 0;
            var meterReadingProgramList = getSelect1();
            if(getSelect()==0){
                layer.msg('您未选择导出项',{icon:0});
                return;
            }
            var time = setInterval(function () {
                $('#click').remove();
                var a = '<a id="click" href="' + $scope.fileUrl + '/info/outReadingProgramExcel.do?fileName=' + meterReadingProgramList[i].projectName + '&meterReadingProgramId=' + meterReadingProgramList[i].id + '"></a>';
                $('body').append(a);
                document.getElementById('click').click();
                i++;
                if (i == meterReadingProgramList.length) {
                    clearInterval(time);
                }
            }, 500);
        };
    }]);
});