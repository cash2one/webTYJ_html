/**
 * Created by Administrator on 2016/07/22
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('electricMeterReadingProgramCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.doClick(2);
        $scope.searchMeter = {page: {}};       //电表抄表计划分页和多功能查询
        $scope.fileUrl = $rootScope.fileUrl;
        $scope.electricAddSave = {};         //新增电表抄表保存,通过绑定ng-model来获取页面的值作为参数传递给后台
        $rootScope.MeterReadingProgramId = ''; //全局变量抄表计划id
        $rootScope.tree = true;             //树形显示状态
        $scope.bslist = {};                 //建筑结构id集合
        $scope.currentObject = [];         //所有项目
        $scope.currentStaff = [];          //所有审核人员
        $scope.currentPeople = [];        //所有抄表人
        var ids = [];                       //建筑结构主键集合
        var url = $rootScope.url;          //后台url地址
        var user = {employId: ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        $scope.addWaterCheck = [];
        /**
         * 分页显示电表信息和根据计划名称和时间模糊查询所有电表抄表
         */
        $scope.load = function () {
            var waterCheckFunction = function (page, callback) {
                $scope.searchMeter.page = page;
                $http.post(url + '/ElectricityMeterReadingProgram/listElectricityMeterReadingProgram',
                    {SearchMeter: $scope.searchMeter}).success(callback);
            };
            $scope.electricChecks = app.get('Paginator').list(waterCheckFunction, 6);
            console.log("电表分页");
            console.log($scope.electricChecks);
            console.log("电表分页");
        };
        $scope.load();

        /*
         * 选中一条记录,更改选中记录的颜色
         * @param index  电表抄表计划数组中的单个对象
         */
        $scope.check = function (index) {
            var checkbox = $('#'+index.electricityMeterReadingProgramId)[0];
            var tr = $(checkbox).parent().parent()[0];
            $(tr).toggleClass('this_info');
            checkbox.checked = $(tr).hasClass('this_info');
            $scope.item2 = index;
        };

        /**
         * 全选所有记录，更改选中记录的颜色
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

         $http.post(url+"/ElectricityMeterReadingProgram/implementProgram",JSON.stringify(meterReadingProgramIds)).success(function(data){
         if(data.info=='执行成功'){
         layer.msg('执行成功',{time:1500,icon:1});
         $scope.electricChecks._load();
         }else{
         layer.msg('执行出错',{time:1500,icon:2});
         }
         })
         };
        /**
         * 新建抄表计划
         */
        $scope.newPlan = function(){
            $scope.addOrEdit = true;
            $scope.electricAddSave={};
            $scope.addelEctricCheck=[];
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
         * 获取选中树
         * @type {Array}
         */
        $scope.getChecked = function(){
            var houses = $('#houses').find('input[type=checkbox]');
            var checks = [];
            ids=[];
            for(var i =0;i<houses.length;i++){
                if(houses[i].checked){
                    var obj = {id:houses[i].id,waterMeterNum:houses[i].labels[0].innerHTML,fullName:houses[i].labels[1].innerHTML};
                    checks.push(obj);
                    ids.push(houses[i].id);
                }
            }
            console.log("建筑结构主键");
            console.log(ids);
            console.log("建筑结构主键");
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
            console.log("选中的树状数据");
            console.log($scope.addWaterCheck);
            console.log("选中的树状数据");
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
            console.log("删除已选中的树数据");
            console.log($scope.addWaterCheck);
            console.log("删除已选中的树数据");
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

        function buildingTreeOnSelect (event, treeId, treeNode){
            console.log("treeNode的值");
            console.log(treeNode);
            console.log("treeNode的值");
            if(!treeNode.isLastNode){
                return ;
            }
            $http.get(url+'/ElectricityMeter/getWaterMeterAndFullNameByParentId/'+treeNode.id).success(function(data){
                console.log("查询到的房屋信息");
                console.log(data);
                console.log("查询到的房屋信息");
                if(data.info.length!=null && data.info!='未查询到数据！'){
                    $scope.houses = data.info;
                    console.log("具体房屋信息");
                    console.log($scope.houses);
                    console.log("具体房屋信息");
                    $scope.housesTemp = data.info;
                }
            })
        }

        /**
         * 获取审核人员
         */
        $http.get(url + '/staff/listAllStaffRestful/').success(function (data) {
            console.log(data);
            // console.log(data.Staff);
            $scope.temp = data.Staff;
            $scope.currentStaff= $scope.temp;
            //$scope.waterAddSave.currentExecutor =  angular.copy($scope.staffNames);
            // $scope.currentPeople=data.Staff;
            $scope.currentPeople=angular.copy($scope.temp);
           /* console.log("审核人员");
            $scope.currentStaff = data.Staff;
            $scope.currentStaff= $scope.temp;
            //$scope.waterAddSave.currentExecutor =  angular.copy($scope.staffNames);
            // $scope.currentPeople=data.Staff;
            $scope.currentPeople=angular.copy($scope.temp);*/
        }).error(function () {
            layer.alert('获取抄表计划审核人员失败', {icon: 2});
        });

        $scope.getStaffName = function(staffId){
            layer.msg("选择了审核人员");
            console.log(staffId);
        };

        /**
         * 获取抄表计划项目
         */
         $http.get(url + '/Project/listAllProject/'+$scope.user.companyId).success(function (data) {
         console.log("测试");
         console.log(data);
         console.log($scope.user.companyId);
         console.log("测试");
         $scope.currentObject = data.Project;
         }).error(function () {
         layer.alert('获取抄表计划项目失败', {icon: 2});
         });

        /**
         * 根据项目id获取建筑信息
         * @param projectId
         */
         $scope.getBuildingList = function(projectId){
         $http.get(url+'/BuildingStructureNew/listBuildingByProjectId/'+projectId).success(function(data){
         console.log("建筑信息");
         console.log(data);
         console.log("建筑信息");
         var buildingList = data.BuildingStructureNew;
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
         $("#myModal_electric").modal("show");
         $rootScope.tree = false;
         $scope.item3 = index;
         $scope.electricAddSave = $scope.item3;
         $scope.electricAddSave.startTime = new Date($scope.electricAddSave.startTime);
         $scope.electricAddSave.endTime = new Date($scope.electricAddSave.endTime);
         $scope.electricAddSave.settlementDay = $scope.electricAddSave.settlementDay+'';
         $scope.electricAddSave.auditTime = $scope.electricAddSave.auditTime+'';
         $scope.electricAddSave.executionFrequency = $scope.electricAddSave.executionFrequency+'';

         $scope.getBuildingList($scope.electricAddSave.project.projectId);
             console.log("抄表计划id");
        console.log($scope.electricAddSave.electricityMeterReadingProgramId);
             console.log("抄表计划id");
             $http.get(url + '/ElectricityMeterReadingProgram/editData/' + $scope.electricAddSave.electricityMeterReadingProgramId).success(function (data) {
                 console.log("编辑电表");
                 console.log(data);
                 console.log("编辑电表");
                    if(data.ElectricityMeterReadingProgram.electricityMeterList.length==null){
                         data.ElectricityMeterReadingProgram.electricityMeterList = [data.ElectricityMeterReadingProgram.electricityMeterList];
                  }
                  var ElectricityMeterReadingProgram = data.ElectricityMeterReadingProgram;
                  if(ElectricityMeterReadingProgram!=null&&ElectricityMeterReadingProgram.electricityMeterList!=null){
                  for(var i =0;i<ElectricityMeterReadingProgram.electricityMeterList.length;i++){
                      ElectricityMeterReadingProgram.electricityMeterList[i].id = ElectricityMeterReadingProgram.electricityMeterList[i].electricityMeterRecordsId;
                  }
                  }
                  $scope.addElectricCheck = ElectricityMeterReadingProgram.electricityMeterList;
                 console.log("addElectricCheck的值");
                 console.log($scope.addElectricCheck);
                 console.log("addElectricCheck的值");
             }).error(function () {
             });
         }
         };

        /**
         * 对审核时间的限制
         * @returns {boolean}
         */
        $scope.checkTime = function(){
            console.log(typeof ($scope.electricAddSave.startTime));
            if($scope.electricAddSave.executionFrequency==1){
                $scope.electricAddSave.endTime = new Date($scope.electricAddSave.endTime);
                var date =new Date(new Date($scope.electricAddSave.endTime.getTime()));
                var time = new Date(date.setDate($scope.electricAddSave.endTime.getDate()+Number($scope.electricAddSave.auditTime)));
                $scope.electricAddSave.startTime = new Date($scope.electricAddSave.startTime);
                console.log($scope.electricAddSave.startTime);
                if(time.getMonth()>$scope.electricAddSave.startTime.getMonth() && time.getDate() >$scope.electricAddSave.startTime.getDate()){
                    layer.msg('审核时长不能大于下一次审核的开始时间！',{icon:2});
                    return false;
                }else{
                    return true;
                }
            }
        };

        /**
         * 确定新建/编辑电表抄表计划
         */
         $scope.submitWater = function () {
         /*layer.msg("确定抄表计划");
         return;*/
         console.log("打印新建确定按钮的ids");
         console.log(ids);
         console.log("打印新建确定按钮的ids");
         $scope.electricAddSave.ids = ids;
         console.log($scope.electricAddSave.ids);
         if ($scope.electricAddSave.projectName == undefined || $scope.electricAddSave.projectName == "" || $scope.electricAddSave.projectName == null) {
             layer.alert('计划名称不能为空！', {icon: 0});
             return;
         } else if ($scope.electricAddSave.projectId == undefined || $scope.electricAddSave.projectId == "" || $scope.electricAddSave.projectId == null) {
            layer.alert('项目名称不能为空！', {icon: 0});
             return;
         }else if ($scope.electricAddSave.startTime == undefined || $scope.electricAddSave.startTime == "" || $scope.electricAddSave.startTime == null) {
         layer.alert('开始时间不能为空！', {icon: 0});
         return;
         } else if ($scope.electricAddSave.endTime == undefined || $scope.electricAddSave.endTime == "" || $scope.electricAddSave.endTime == null) {
         layer.alert('结束时间不能为空！', {icon: 0});
         return;
         } else if(new Date($scope.electricAddSave.startTime)-new Date($scope.electricAddSave.endTime )>0){
         layer.msg('开始时间不能超过结束时间！',{icon:0});
         return;
         } else if ($scope.electricAddSave.executionFrequency == undefined || $scope.electricAddSave.executionFrequency == "" || $scope.electricAddSave.executionFrequency == null) {
         layer.alert('执行频率不能为空！', {icon: 0});
         return;
         } else if ($scope.electricAddSave.auditTime == undefined || $scope.electricAddSave.auditTime == "" || $scope.electricAddSave.auditTime == null) {
         layer.alert('审核时长不能为空！', {icon: 0});
         return;
         }
         if(!$scope.checkTime()){

         }

         if($scope.addOrEdit){
             if ($scope.electricAddSave.ids == undefined || $scope.electricAddSave.ids == "" || $scope.electricAddSave.ids == null) {
             layer.alert('建筑不能为空！', {icon: 0});
             return;
             }

            /* $scope.serviceRequest={listTasks:{}};*/
             $http.post(url + '/ElectricityMeterReadingProgram/insertElectricityMeterReadingProgram',
             {ElectricityMeterReadingProgram: $scope.electricAddSave}).success(function () {
            /* $scope.serviceRequest.requestSource = '自动创建';
             //$scope.serviceRequest.customerId = $scope.serviceRequest.custCode;//客户id
             $scope.serviceRequest.serviceRequestState = 0;//不需回访
             $scope.serviceRequest.serviceRequestName = '电表抄表计划服务请求';
             $scope.serviceRequest.serviceRequestType = '5';//水表
             //$scope.serviceRequest.writerId = $scope.caraccesscards.creater;//创建人id
             $scope.serviceRequest.remarks = '电表抄表自动创建';//备注
             $scope.serviceRequest.directionType = 0;//外部服务请求
             //$scope.serviceRequest.listTasks.customerId =  $scope.caraccesscards.custCode;//客户id
             $scope.serviceRequest.listTasks.taskType = 16;//任务类型
             $scope.serviceRequest.listTasks.taskState = '4';//任务状态
             //$scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
             $scope.serviceRequest.listTasks.addressIds=[];
             $scope.serviceRequest.listTasks.addressIds.push($scope.node.id);//地址id
             $scope.serviceRequest.listTasks.taskDescription = '电表抄表计划服务请求';//任务描述
             //$scope.serviceRequest.listTasks.principal = '';//负责人
             $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function (data) {
             layer.alert('添加电表抄表成功', {icon: 1});
             $scope.load();
             $('#myModal').hide();
             }).error(function (data) {
             layer.msg("添加电表抄表失败",{icon : 2,time : 2000});
             });*/

                     /*$scope.serviceRequest.requestSource = '自动创建';
                     $scope.serviceRequest.source=1;//周期性抄表
                     $scope.serviceRequest.serviceRequestState = 0;//不需回访
                     $scope.serviceRequest.serviceRequestName = '电表抄表计划服务请求';
                     $scope.serviceRequest.serviceRequestType = '5';//电表
                     $scope.serviceRequest.remarks = '电表抄表自动创建';//备注
                     $scope.serviceRequest.directionType = 0;//外部服务请求
                     $scope.serviceRequest.listTasks.taskType = 16;//任务类型
                     $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                     $scope.serviceRequest.listTasks.addressIds=[];
                     $scope.serviceRequest.listTasks.addressIds.push(buildingStructureIds);//地址id
                     $scope.serviceRequest.listTasks.taskDescription = '水电表抄表计划服务请求';//任务描述
                     //$scope.serviceRequest.listTasks.principal = '';//负责人
                     $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function (data) {
                         layer.msg('添加电表抄表成功', {icon: 1});
                         $scope.load();
                         $('#myModal').hide();
                     }).error(function (data) {
                         layer.msg("添加电表抄表失败",{icon : 2,time : 2000});
                     });
             */
             layer.alert('添加电表抄表成功', {icon: 1});
             $scope.load();
             $('#myModal_electric').hide();
             }).error(function () {
             layer.msg('添加电表抄表失败', {icon: 2});
             });
             }
         else{
             ids = [];
             var array = $("#selected").find('input[type=checkbox]');
             for(var i=0; i<array.length;i++){
             ids.push(array[i].value);
             }
             $scope.electricAddSave.ids = ids;
             console.log("打印编辑确定按钮的ids");
             console.log(ids);
             console.log( $scope.electricAddSave.ids);
             console.log("打印编辑确定按钮的ids");
             if ($scope.electricAddSave.ids == undefined || $scope.electricAddSave.ids == "" || $scope.electricAddSave.ids == null) {
             layer.alert('建筑不能为空！', {icon: 0});
             return;
             }
             $http.post(url + '/ElectricityMeterReadingProgram/updateElectricityMeterReadingProgram',
             {ElectricityMeterReadingProgram: $scope.electricAddSave}).success(function () {
             layer.msg('编辑电表抄表成功', {icon: 1});
             $scope.load();
             $('#myModal_electric').hide();
             }).error(function () {
             layer.alert('编辑电表抄表失败', {icon: 2});
             });
             //layer.alert('编辑电表抄表失败', {icon: 2});
             }
                 $scope.load();
         };

        /**
         * 取消电表抄表
         */
         $scope.cancelWater = function () {
         $scope.load();
         };

        function getSelect1(){
         var executeInput = $('#executeInput').find('input[type=checkbox]');
         var meterReadingProgramIds = [];
         for(var i= 0;i<executeInput.length;i++){
         if(executeInput[i].checked){
         var meterReadingProgram = $scope.electricChecks.object.electricityMeterReadingProgram;
         for(var n in meterReadingProgram){
         if(meterReadingProgram[n].electricityMeterReadingProgramId==executeInput[i].id){
         meterReadingProgramIds.push({id:executeInput[i].id,projectName:meterReadingProgram[n].projectName});
         }
         }
         }
         }
         return meterReadingProgramIds;
         }

        /**
         * 导出抄表计划
         */

        $scope.exportExcelHouse = function() {
        /*layer.msg("导出抄表计划成功");
        return;*/
         var i = 0;
         var meterReadingProgramList = getSelect1();
        console.log("导出");
        console.log(meterReadingProgramList);
        console.log("导出");
         if(getSelect()==0){
         layer.msg('您未选择导出项',{icon:0});
         return;
         }
         var time = setInterval(function () {
         $('#click').remove();
         var a = '<a id="click" href="' + $scope.fileUrl + '/info/outElectricityReadingProgramExcel.do?fileName=' + meterReadingProgramList[i].projectName + '&meterReadingProgramId=' + meterReadingProgramList[i].id + '"></a>';
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