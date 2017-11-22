/**
 * Created by NM on 2018/1/18.
 * 服务请求
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('serviceRequestNewCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$rootScope.url;
        $scope.show1=true;
        $scope.show2=false;
        $scope.show3=false;
        $scope.show4=false;
        $scope.show5=false;
        $scope.impro=false;
        //$rootScope.user.custId
        $scope.datils1=false;
        $scope.tasks1=false;
        $scope.addService1=false;
        $scope.addDatils1=false;
        $scope.ServiceRequest = {page:{},tasks:{},listTasks:[]};
        $scope.person = {staff:{}};
        $scope.ServiceRequest.customerId= $rootScope.user.custId;

        //任务操作

        $scope.grid=true;  //默认列表显示
        $scope.grid1=false;  //默认网格显示
        $scope.doClick(2);//刷新页面时高亮显示tab
        var user = {employId: ''};
        $scope.staffId = {};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie ? userCookie : user;
        console.log($scope.user);
        console.log($rootScope.user);
        if($scope.user.staff != null){
            $scope.staffId = $scope.user.staff.staffId;
        }else{
            $scope.userId = $scope.user.userId;
        }
        var inpMark = false;
        /**
         * 服务请求页面网格列表切换
         */
        $scope.list=function(){
            $scope.grid=true;
            //$scope.show1 = false;
            //$scope.show2 = true;
        }
        $scope.gridChange=function(){
            $scope.grid=false;
            //$scope.show1 = true;
            //$scope.show2 = false;
        }

        /**
         * 任务页面网格列表切换
         */
        $scope.list1=function(){
            $scope.grid1=true;
            //$scope.show1 = false;
            //$scope.show2 = true;
        }
        $scope.gridChange1=function(){
            $scope.grid1=false;
            //$scope.show1 = true;
            //$scope.show2 = false;
        }

        /**
         * 显示新建方案 服务请求
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

        //新建任务
        $scope.mark2 = true;
        $scope.detail12 = function(){
            $scope.AddTasks.tasks= {};
            $scope.mark2 = true;
            $scope.btnIndex2 = null;
        };
        $scope.detail22 = function(index){
            $scope.mark2 = false;
            $scope.AddTasks.tasks= $scope.AddTasksList[index];
            $scope.btnIndex2=index;
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
            var addressId = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.addressId);
            if(addressId.state == false){
                layer.msg('请选择一个地址！',{icon : 0,time : 2000});
                return;
            }
            //负责人
            /*var staffName = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.staff.staffName);
            if(staffName.state == false){
                layer.msg('请选择负责人！',{icon : 0,time : 2000});
                return;
            }*/
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
            for(var i=0; i<$scope.temps.length; i++){
                document.getElementById($scope.temps[i].buildingStructureId).checked = false;
            }
            var checked = document.getElementsByName('aaa');
            for(var i=0; i<checked.length; i++){
                checked[i].checked=false;
                checked[i].parentNode.parentNode.style.background = '';
            }
            if(showTmp=2) {
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
            }
            $scope.listTasks.push($scope.ServiceRequest.tasks);
            $scope.ServiceRequestList.push($scope.ServiceRequest.tasks);
            console.log($scope.ServiceRequestList);

            $scope.ServiceRequest.tasks={};
            $scope.addWaterCheck = {};
            $scope.person.staff = {};
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
         * 进入模块初始化，查询请求信息（用户id）
         */
        $scope.load = function(){
            $scope.grid=true;  //默认列表显示
            var fetchFunction = function (page, callback) {
                $scope.chooseData = {datas: []};
                document.getElementById("allchose").checked = false;
                $scope.chosestate = '0';
                $scope.ServiceRequest.page = page;
                $http.post(url + '/ServiceRequest/listPageServiceRequestbyCustomerId',{ServiceRequest:$scope.ServiceRequest}).success(callback)

            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);
        };
        $scope.load();

        /**
         * 根据请求id查看任务
         */
        $scope.Tasks={page:{}};
        $scope.selectTasks = function (serviceRequest) {
            //console.log(serviceRequest);
            $scope.Tasks.serverId=serviceRequest.serviceRequestId;

            $http.get(url+'/ServiceRequest/getServiceRequestbyId/'+serviceRequest.serviceRequestId).success(function(data){
                if(data){
                    $scope.Service= data.ServiceRequest;
                    console.log(data);
                }else{
                    alert("没有任务！")
                }
            }).error(function(data,status,headers,config){
                alert("服务器请求失败！");
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
         * 根据请求id查询任务列表
         */
        $scope.loadTask=function() {
            var fetchFunction1 = function (page, callback) {
                $scope.Tasks.page = page;
                $http.post(url + '/Tasks/listPageTasksbyServiceRequestId', {Tasks: $scope.Tasks}).success(callback)
            };
            $scope.searchPaginator1 = app.get('Paginator').list(fetchFunction1, 6);
            console.log($scope.searchPaginator1);
        };

        /**
         * 显示请求列表页面
         */
        $scope.btnIndex = 1;  //默认显示服务请求
        $scope.service=function(index){
            $scope.btnIndex = index;
            $scope.show1=true;
            $scope.show2=false;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
            $scope.load();
        };

        /**
         * 显示查看的详细信息页面
         */
        $scope.datils=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            $scope.show4=false;
            $scope.show5=false;
        };

        /**
         * 显示任务页面
         */
        $scope.tasks=function(index){
            $scope.btnIndex = index;
            $scope.show1=false;
            $scope.show2=false;
            $scope.show3=true;
            $scope.show4=false;
            $scope.show5=false;
        };

        /**
         * 显示添加服务请求的页面
         */
        var showTmp=1;
        $scope.addService=function(index){
            $scope.ServiceRequest.tasks={};
            $scope.ServiceRequestList=[];
            $scope.AddTasks.tasks={};
            $scope.AddTasksList=[];
            for(var i=0; i<$scope.temps.length; i++){
                document.getElementById($scope.temps[i].buildingStructureId).checked = false;
            }
            var checked = document.getElementsByName('aaa');
            for(var i=0; i<checked.length; i++){
                checked[i].checked=false;
                checked[i].parentNode.parentNode.style.background = '';
            }
            if(showTmp=2){
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
            }
            $scope.btnIndex = index;
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
        $scope.addDatils=function(index){
            $scope.btnIndex = index;
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
            //console.log($scope.currentMeterReadingSR);
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
            console.log($scope.forChangeSR.serviceRequestIds);
        };
        /*****************************************新建服务请求*********************************************************/
        $scope.tasks={};
        $scope.ServiceRequest = {page:{},tasks:{}};
        $scope.ServiceRequest.customerId=$rootScope.user.custId;
        $scope.ServiceRequest.writerId=$scope.user.employId;
        $scope.ServiceRequest.reviewId=$rootScope.user.custId;
        $scope.userCust = $rootScope.user;
        $scope.Datil={
            /**任务类型**/
            taskType: [
                { id:'1',name:'维修' },
                { id:'21',name:'通用' }



                /*{ id:'0',name:'园林' },
                { id:'1',name:'维修' },
                { id:'2',name:'护管' },
                { id:'11',name:'清洁' },
                { id:'12',name:'回访'},
                { id:'13',name:'投诉'},
                { id:'16',name:'抄水表'},
                { id:'17',name:'抄电表'},
                { id:'10',name:'向业主索赔'},
                { id:'9',name:'赔偿给业主'},
                { id:'19',name:'固定车位'},*/
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
         * 描述失去焦点时候触发
         */
        $scope.textBlur = function(){
            var taskDescription = app.get("valueCheck").isNull($scope.ServiceRequest.tasks.taskDescription);
            if(!taskDescription.state){
                $scope.ServiceRequest.tasks.taskDescription = $scope.ServiceRequest.remarks;
            }
        };

        /**
         * 服务请求增加时赋 用户id和地址id
         * @param customerId
         */
        $scope.addReqService=function(customerId){
            //联系电话
            var phoneNum = app.get("valueCheck").isPhoneOrTelAndNotNull($scope.userCust.registerPhone);
            if(phoneNum.state == false){
                layer.msg('联系电话'+phoneNum.info,{icon : 0,time : 2000});
                return;
            }
            if($scope.ServiceRequestList.length ==0){
                layer.msg('任务不能为空！',{icon : 0,time : 2000});
                return;
            }
            $scope.ServiceRequest.listTasks = $scope.listTasks;

            if($rootScope.addressId != null){
                $scope.ServiceRequest.tasks.addressId=$rootScope.addressId;
            }
            if($rootScope.user.custId != null){
                $scope.ServiceRequest.customerId=$rootScope.user.custId;
            }

            //判断加急状态
            var anxious = document.getElementsByName("anxious");
            for(var i = 0;i<anxious.length;i++){
                if(anxious[i].checked == true){
                    $scope.ServiceRequest.anxious = 1;
                } else{
                    $scope.ServiceRequest.anxious = 0;
                }
            }
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
            $scope.ServiceRequest.serviceRequestType = 0;//业主报事
           // $scope.ServiceRequest.principal = $scope.ServiceRequest.tasks.staff.staffName;
            console.log($scope.ServiceRequestList);
            if(customerId!=null) {
                if($scope.ServiceRequest.listTasks[0].taskType!= 1 && $scope.ServiceRequest.listTasks[0].taskType!=21){
                   $scope.ServiceRequest.importantEventTypeId =$scope.ServiceRequest.listTasks[0].taskType;
                    $scope.ServiceRequest.listTasks[0].taskType=22; //重大事项22
                    $http.post(url + '/ServiceRequest/insertImportantEvent'
                        , {ServiceRequest: $scope.ServiceRequest}).success(function (data) {
                        if ($scope.ServiceRequest.tasks != null) {
                            var addressId = $scope.ServiceRequest.tasks.addressId;
                        }
                        $scope.ServiceRequestList=[];
                        $scope.listTasks = [];
                        $scope.show1 = true;
                        $scope.show2 = false;
                        $scope.show3 = false;
                        $scope.show4 = false;
                        $scope.show5 = false;
                        $scope.load();
                        //$location.path("/index/propertyService/staffHome/serviceRequest/");
                    }).error(function (data) {
                        alert("服务器请求失败！");
                    });
                }else {
                    $http.post(url + '/ServiceRequest/insertServiceRequestRestful'
                        , {ServiceRequest: $scope.ServiceRequest}).success(function (data) {
                        if ($scope.ServiceRequest.tasks != null) {
                            var addressId = $scope.ServiceRequest.tasks.addressId;
                        }
                        $scope.ServiceRequestList=[];
                        $scope.listTasks = [];
                        $scope.show1 = true;
                        $scope.show2 = false;
                        $scope.show3 = false;
                        $scope.show4 = false;
                        $scope.show5 = false;
                        $scope.load();
                        //$location.path("/index/propertyService/staffHome/serviceRequest/");
                    }).error(function (data) {
                        alert("服务器请求失败！");
                    });
                }
            }
        };

        $scope.journal = {};//服务请求参数状态改变所传递的参数对象
        $scope.bbb = {};  //选中的服务请求对象
        $scope.chooseData = {datas: []};
        //选中要改变的服务请求对象
        $scope.servicechange = function(serviceRequest){
            if(serviceRequest==-1)
            {
                if($scope.chooseData.datas.length==0)
                {
                    layer.msg('请选择数据！',{icon:0});
                    return;
                }else if($scope.chooseData.datas.length==1)
                {
                    $('#serviceClosedAll').modal('show');
                    $scope.bbb = $scope.chooseData.datas[0];
                }else if($scope.chooseData.datas.length>1)
                {
                    layer.msg('请选择一条数据！',{icon:0});
                    return;
                }
            }else if(serviceRequest==0)
            {
                if($scope.chooseData.datas.length==0)
                {
                    layer.msg('请选择数据！',{icon:0});
                    return;
                }else if($scope.chooseData.datas.length==1)
                {
                    $('#serviceFinishAll').modal('show');
                    $scope.bbb = $scope.chooseData.datas[0];
                }else if($scope.chooseData.datas.length>1)
                {
                    layer.msg('请选择一条数据！',{icon:0});
                    return;
                }
            }else
            {
                $scope.bbb = serviceRequest;
            }
        };

        /**
         * 点击选中  2016/2/25 By yeshengqiang 开始
         */

        $scope.getData = function(item)
        {
            var allData = $scope.searchPaginator.object.serviceRequests.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.serviceRequestId == allData[i].serviceRequestId)
                {
                    if(document.getElementById(item.serviceRequestId).checked)
                    {
                        document.getElementById(item.serviceRequestId).checked = false;
                        document.getElementById(item.serviceRequestId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].serviceRequestId != item.serviceRequestId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.serviceRequestId).checked = true;
                        document.getElementById(item.serviceRequestId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].serviceRequestId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };


        $scope.PersonBuildingNew = {};
        $scope.PersonBuildingNew.custId = $scope.personCust.custId;
        $scope.temps = [];
        var mark = false;
        $scope.openHouse = function(){
            if(mark==false){
                $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                    console.log(data);
                    $scope.buildingStructure = data.PersonBuildingNew;
                    mark = true;
                    for(var i=0;i<$scope.buildingStructure.length;i++){
                        if(!angular.isUndefined($scope.buildingStructure[i].houseNew)){
                            $scope.temps.push($scope.buildingStructure[i].houseNew);

                        }
                    }
                    $("#file").modal("show");
                }).error(function(data){
                    mark = false;
                    layer.msg("没有关联的建筑",{icon : 3,time : 2000});
                });
            }

        };

        /**
         *
         */
        $scope.addressIdCust = '';
        $scope.fullNameCust='';
        $scope.custBuilding=function(index,fullName){
            var check = document.getElementById(index).checked;
            if(check == true){
                for(var i=0; i<$scope.temps.length; i++){
                    if($scope.temps[i].buildingStructureId!=index){
                        document.getElementById($scope.temps[i].buildingStructureId).checked=false;
                    }
                }
                $scope.addressIdCust = index;
                $scope.fullNameCust = fullName;
            }else {
                document.getElementById(index).checked=false;
                $scope.addressIdCust = '';
                $scope.fullNameCust = '';
            }
        }

        /**
         * 点击全选
         */

        $scope.allchose = function(item)
        {
            var datastaffList=item.slice(1);
            allcheck(datastaffList);
        };
        //全选
        function allcheck(datastaffList)
        {
            if( $scope.chosestate=='0'){
                $scope.chooseData= {datas:[]};
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].serviceRequestId).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].serviceRequestId).parentNode.parentNode.style.background = '#f6f8fa';
                }
                document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].serviceRequestId).checked = false;
                    document.getElementById(datastaffList[i].serviceRequestId).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                document.getElementById("allchose").checked = false;
            }
        };
        /**
         * 点击选中  2016/2/25 By yeshengqiang 结束
         */


        /**
         * 服务请求全部失效
         */
        $scope.serviceClosedAll=function(){
            $scope.journal.changeState = 0;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.staffId != null){
                $scope.journal.operatorId = $scope.staffId;
            }else{
                $scope.journal.userId = $scope.userId;
            }
            if($scope.isAllChecked) {//全选
                $scope.forChangeSR.serviceRequestState = 0;
                $scope.forChangeSR.serviceRequestJournal = $scope.journal;
                $http.post(url + '/ServiceRequest/changeServiceRequestStateByIds', {ServiceRequest: $scope.forChangeSR})
                    .success(function (data) {
                        console.log(data);
                        alert(data.Info.info.$);

                    })
                    .error(function () {
                        alert("失效操作失败，请稍后重试!");
                    });
                $scope.isAllChecked = false;//全选失效
                $scope.journal = {};         //传递参数初始化
            }
        };

        /**
         * 服务请求失效
         */
        $scope.serviceClosed = function(){
            if($scope.bbb.serviceRequestState == 0){//单个选中的服务请求关闭
                alert("服务请求已经是关闭状态!");
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 0;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c";  //操作人id
            if($scope.staffId != null){
                $scope.journal.operatorId = $scope.staffId;
            }else{
                $scope.journal.userId = $scope.userId;
            }
                $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";  //备注初始化
                alert(data.Info.info.$);
                $scope.load();
            }).error(function(){
                alert("关闭操作失败，请稍后重试!");
                $scope.journal.remarks = "";
            });
        };
        /**
         * 服务请求全部完成
         */
        $scope.serviceFinishAll = function(){
            $scope.journal.changeState = 3;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c" ; //操作人id
            if($scope.staffId != null){
                $scope.journal.operatorId = $scope.staffId;
            }else{
                $scope.journal.userId = $scope.userId;
            }
            if($scope.isAllChecked){//全选
                $scope.forChangeSR.serviceRequestState = 3;
                $scope.forChangeSR.serviceRequestJournal=$scope.journal;
                $http.post(url+'/ServiceRequest/changeServiceRequestStateByIds',{ServiceRequest:$scope.forChangeSR})
                    .success(function(data){
                        console.log(data);
                        $scope.chooseData = {datas: []};
                        alert(data.Info.info.$);
                    })
                    .error(function(){
                        alert("完成操作失败，请稍后重试!");
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
                alert("服务请求已经是完成状态!");
                return;
            }
            $scope.journal.serviceRequestId = $scope.bbb.serviceRequestId;
            $scope.journal.changeState = 3;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            if($scope.staffId != null){
                $scope.journal.operatorId = $scope.staffId;
            }else{
                $scope.journal.userId = $scope.userId;
            }
                $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                alert(data.Info.info.$);
                $scope.load();
            }).error(function(){
                alert("完成操作失败，请稍后重试!")
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
            for(var i in $scope.important){
                $scope.important[i].name = $scope.important[i].eventTypeName;
                $scope.important[i].id = $scope.important[i].eventTypeId;
                $scope.Datil.taskType.push($scope.important[i])
            }
            console.log($scope.Datil.taskType);
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
                    /*  $scope.taskList=false;
                     $scope.addReqService=function(customerId){
                     if(customerId!=null) {
                     $http.post(url + '/ServiceRequest/insertImportantEvent', {
                     ServiceRequest: $scope.ServiceRequest
                     }).success(function (data) {
                     console.log($scope.ServiceRequest);
                     // alert("添加服务成功！");
                     // $location.path("/index/serviceRequest/majorIssuesSet");
                     }).error(function (data) {
                     alert("服务器请求失败！");
                     });
                     }
                     };*/
                }else{
                    $scope.impro=false;
                    /*   $scope.taskList=true;
                     $scope.addReqService=function(customerId){
                     //$scope.ServiceRequest.tasks.addressId=$rootScope.addressIdT;
                     if($rootScope.addressId != null){
                     $scope.ServiceRequest.tasks.addressId=$rootScope.addressId;
                     }
                     //$scope.ServiceRequest.tasks.customerId=$rootScope.user.custId;
                     if($rootScope.user.custId != null){
                     $scope.ServiceRequest.customerId=$rootScope.user.custId;
                     }

                     //$scope.ServiceRequest.tasks.annexs=$scope.annexs;
                     var anxious = document.getElementsByName("anxious");
                     for(var i = 0;i<anxious.length;i++){
                     if(anxious[i].checked == true){
                     $scope.ServiceRequest.anxious = 1;
                     } else{
                     $scope.ServiceRequest.anxious = 0;
                     }
                     }
                     $scope.ServiceRequest.importantEvent = 0;
                     $scope.ServiceRequest.requestSource = "前台";
                     $scope.ServiceRequest.directionType = 0;//外部服务
                     $scope.ServiceRequest.serviceRequestType = 0;//业主报事
                     if(customerId!=null) {
                     $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {
                     ServiceRequest: $scope.ServiceRequest
                     }).success(function (data) {
                     //var addressId = '';
                     if($scope.ServiceRequest.tasks != null){var addressId = $scope.ServiceRequest.tasks.addressId;}
                     //var addressId = $scope.ServiceRequest.tasks.addressId;
                     console.log($scope.ServiceRequest);
                     $scope.service();
                     $scope.load();
                     // alert("添加服务成功！");
                     // $location.path("/index/propertyService/staffHome/serviceRequest/");
                     }).error(function (data) {
                     alert("服务器请求失败！");
                     });
                     }
                     };*/
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
                showTmp = 2;
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
            if($scope.clientele){
                $scope.ServiceRequest.tasks.fullname = $scope.fullNameCust;
                $scope.ServiceRequest.tasks.addressId = $scope.addressIdCust
                $scope.AddTasks.tasks.fullname = $scope.fullNameCust;
                $scope.AddTasks.tasks.addressId = $scope.addressIdCust
            }else if($scope.commonality){
                if($scope.treeResult.treeList.length > 1){
                    layer.msg('只能选择一个地址！',{icon : 0,time : 2000});
                    return;
                }
                $scope.addWaterCheck = $scope.treeResult.treeList;
                $scope.ServiceRequest.tasks.addressId = $scope.treeResult.treeList[0].id;
                $scope.ServiceRequest.tasks.fullname = $scope.treeResult.treeList[0].fullname;
                $scope.AddTasks.tasks.addressId = $scope.treeResult.treeList[0].id;
                $scope.AddTasks.tasks.fullname = $scope.treeResult.treeList[0].fullname;
            }

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
            console.log($scope.forChangeTasks.tasksIds);
        };

        $scope.CustomerAddr=function(){
            $scope.clientele=true;
            $scope.CustomerAddr1=true;
            $scope.commonality=false;
            $scope.commonality1=false;

        }
        $scope.CustomerAddr();
        $scope.PublicArea=function(){
            $scope.commonality=true;
            $scope.clientele=false;
            $scope.commonality1=true;
            $scope.clientele1=false;
        }

        /**
         *  传任务ID给工单页面
         */
        $scope.taskDetailsIds=function(taskId,taskState,buildingStructureNew,serviceRequestId){
            //$location.path("/index/serviceRequest/repairOrder/"+taskId).search({taskDetailsIds:taskId});
            localStorage.setItem('item',JSON.stringify({taskId:taskId,personId:$scope.ServiceRequest.customerId,taskState:taskState,buildingStructureNew:buildingStructureNew,serviceRequestId:serviceRequestId}))
            $location.path("/index/serviceRequest/repairOrder");
        };

        /**
         * 回访列表
         */


        $scope.visitList = {};
        $scope.serviceRequestId = '';
        $scope.visitClick=function(item){
            $scope.serviceRequestId = item.serviceRequestId
            if(item.serviceRequestState ==0 || item.serviceRequestState ==2){

                layer.msg('无需回访！',{icon : 0,time : 2000});
                $("#revisit").hide();
                return;
            }else if(item.serviceRequestState ==3){
                layer.msg('已回访！',{icon : 0,time : 2000});
                $("#revisit").hide();
                return;
            }
            $("#revisit").modal('show');
            $http.get(url + "/AcceptanceOrders/getAcceptanceOrdersbyServiceRequestId/"+item.serviceRequestId).success(function(data){
                $scope.visitList = data;
                $scope.visitInfo(0);
                console.log($scope.visitList)
            }).error(function(data,status,headers,config){
                console.log ("获取信息失败,请稍后重试!");
            });
        }

        /**
         * 回访信息
         * @type {{}}
         */
        $scope.visit = {};
        $scope.visitInfo=function(index){
            visitOf();
            $scope.visit = $scope.visitList.AcceptanceOrders[index];
            $scope.getStarNum($scope.visit.satisfaction);
            console.log($scope.visit);
        }

        //保存修改
        var visitOf=function(){
            if($scope.starCount!=null&&$scope.starCount!=0){
                for(var i=0; $scope.visitList.AcceptanceOrders.length; i++){
                    if($scope.visit.orderId==$scope.visitList.AcceptanceOrders[i].orderId){
                        $scope.visitList.AcceptanceOrders[i].satisfaction = $scope.visit.satisfaction;
                        break;
                    }
                }
            }
        }

        /**
         * 回访
         */
        $scope.serviceRequest = {acceptanceOrdersList:{}};
        $scope.visitCompletion=function(){
            if($scope.starCount2==null || $scope.starCount2==0){
                layer.msg('请填写回访满意度!',{icon:0,time:2000});
                return;
            }
            $scope.serviceRequest.satisfaction = $scope.starCount2;
            if($scope.serviceRequest.feedback == null || $scope.serviceRequest.feedback==''){
                layer.msg('请填写反馈记录!',{icon:0,time:2000});
                return;
            }
            visitOf();
            $scope.serviceRequest.acceptanceOrdersList = $scope.visitList.AcceptanceOrders;
            $scope.serviceRequest.serviceRequestId = $scope.serviceRequestId;
            $http.post(url+'/ServiceRequest/updateFeedback',{ServiceRequest:$scope.serviceRequest}).success(function(data){
                if(data==1){
                    $('#revisit').hide();
                    layer.msg('提交成功',{icon:1,time:2000});
                    $scope.load();
                }
            }).error(function(){
                layer.msg('提交失败！',{icon:2,time:2000});
            });
        }

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
            $scope.visit.satisfaction = $scope.starCount;
        };

        $scope.starCount2 = 0;
        $scope.ItemResult2 = true; //checked默认选中
        $scope.getStarNum2 = function(num){
            var starNum2 = num+1;
            $("#star2>span:lt("+starNum2+")").css("color","red");
            $("#star2>span:gt("+num+")").css("color","black");
            $scope.starCount2 = starNum2;
        };

        /**
         * 重新处理任务
         */
        $scope.anewTasks=function(){
            layer.confirm('重新处理后任务会开启是否继续？', {
                btn: ['是','否']
            }, function(){
                $http.get(url+'/Tasks/changeTasksStateById/'+ $scope.visit.taskId + '/' + '7' + '/' + 'visit').success(function(data){
                    layer.msg('任务开启成功！',{icon : 1,time : 2000});
                }).error(function(){
                    layer.msg('任务开启失败！',{icon : 0,time : 2000});
                });
            }, function(){
            });
        }

        /**
         *  新增任务
         */
        $scope.Tasks={};
        $scope.addTasks=function(serviceRequest){
            $scope.ServiceRequest.tasks={};
            $scope.ServiceRequestList=[];
            $scope.AddTasks.tasks={};
            $scope.AddTasksList=[];
            for(var i=0; i<$scope.temps.length; i++){
                document.getElementById($scope.temps[i].buildingStructureId).checked = false;
            }
            var checked = document.getElementsByName('aaa');
            for(var i=0; i<checked.length; i++){
                checked[i].checked=false;
                checked[i].parentNode.parentNode.style.background = '';
            }
            if(showTmp=2) {
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
            }
            $scope.Tasks.serverId=serviceRequest;
            $scope.Tasks.customerId=$rootScope.user.custId;
            $scope.addDatils();
            $scope.addTask=function(serviceRequest){
                if($scope.AddTasksList.length ==0){
                    layer.msg('任务不能为空！',{icon : 0,time : 2000});
                    return;
                }
                if(serviceRequest!=null){
                    var tasksList = {tasks:{}};
                    tasksList.tasks = $scope.AddTasksList;
                    tasksList.serverId = serviceRequest;
                    tasksList.customerId = $scope.userCust.custId;
                    $http.post(url +'/Tasks/insertTasksList',{Tasks:tasksList}).success(function(data) {
                        $scope.datils();
                        $scope.loadTask();
                        //$scope.selectTasks(serviceRequest);
                        //   $location.path("/index/serviceRequest/serviceRequestDatil/allWorkOrders/");
                    }).error(function(data){
                        alert("请求失败！");
                    })
                }else{
                    alert("服务ID不存在！不允许新建任务!");
                }
            };
        };

        $scope.showNum2 = 0;
        var num2=0;
        var num12=0;
        $scope.titleChange2 = function(index)
        {
            if(index==1)
            {
                if((num12==0)&&(num2!=0))
                {
                    $scope.showNum2+=10;
                    $scope.maxTitleNum2 = true;
                    $scope.maxTitleNum12=true;
                    num12++;
                    num2--;
                    if((num12!=0)&&(num2==0))
                    {
                        $scope.maxTitleNum2 = true;
                        $scope.maxTitleNum12=false;
                    }
                } else if((num2!=0)&&(num12!=0))
                {
                    $scope.showNum2+=10;
                    $scope.maxTitleNum2 = true;
                    $scope.maxTitleNum12=true;
                    num21++;
                    num2--;
                    if((num12!=0)&&(num2==0))
                    {
                        $scope.maxTitleNum2 = true;
                        $scope.maxTitleNum12=false;
                    }
                }
                else
                {
                    return;
                }
            }
            if(index==0)
            {
                if((num2==0)&&(num12!=0))
                {
                    $scope.showNum2-=10;
                    $scope.maxTitleNum2 = true;
                    $scope.maxTitleNum12=true;
                    num2++;
                    num12--;
                    if((num2!=0)&&(num12==0))
                    {
                        $scope.maxTitleNum2 = false;
                        $scope.maxTitleNum12=true;
                    }
                } else if((num2!=0)&&(num12!=0))
                {
                    $scope.showNum2-=10;
                    $scope.maxTitleNum2 = true;
                    $scope.maxTitleNum12=true;
                    num2++;
                    num12--;
                    if((num2!=0)&&(num12==0))
                    {
                        $scope.maxTitleNum2 = false;
                        $scope.maxTitleNum12=true;
                    }
                }else
                {
                    return;
                }
            }
        };

        $scope.AddTasksList=[];
        $scope.listAddTasks = [];
        $scope.AddTasks={tasks:{}};
        $scope.saveTasks=function(){
            //联系电话
            /* var phoneNum = app.get("valueCheck").isPhoneOrTelAndNotNull($scope.user.phoneNum);
             if(phoneNum.state == false){
             layer.msg('联系电话'+phoneNum.info,{icon : 0,time : 2000});
             return;
             }*/
            //任务类型
            var tasks = app.get("valueCheck").isNull($scope.AddTasks.tasks.taskType);
            if(tasks.state == false){
                layer.msg('请选择任务类型！',{icon : 0,time : 2000});
                return;
            }
            //地址
            var addressId = app.get("valueCheck").isNull($scope.AddTasks.tasks.addressId);
            if(addressId.state == false){
                layer.msg('请选择一个地址！',{icon : 0,time : 2000});
                return;
            }
            //负责人
            /*var staffName = app.get("valueCheck").isNull($scope.AddTasks.tasks.staff.staffName);
             if(staffName.state == false){
             layer.msg('请选择负责人！',{icon : 0,time : 2000});
             return;
             }*/
            //完成时间
            var estimatedTime = app.get("valueCheck").isNull($scope.AddTasks.tasks.estimatedTime);
            if(estimatedTime.state == false){
                layer.msg('请选择完成时间！',{icon : 0,time : 2000});
                return;
            }
            //任务描述
            var taskDescription = app.get("valueCheck").isNull($scope.AddTasks.tasks.taskDescription);
            if(taskDescription.state == false){
                layer.msg('请输入任务描述！',{icon : 0,time : 2000});
                return;
            }
            for(var i=0; i<$scope.temps.length; i++){
                document.getElementById($scope.temps[i].buildingStructureId).checked = false;
            }
            var checked = document.getElementsByName('aaa');
            for(var i=0; i<checked.length; i++){
                checked[i].checked=false;
                checked[i].parentNode.parentNode.style.background = '';
            }
            if(showTmp=2) {
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
            }
            $scope.listAddTasks.push($scope.AddTasks.tasks);
            $scope.AddTasksList.push($scope.AddTasks.tasks);

            $scope.AddTasks.tasks={};
            $scope.addWaterCheck = {};
            $scope.person.staff = {};
            /**
             * bug 45修复  2016/3/8 by yeshengqiang 开始
             */
            if($scope.AddTasks.length%10==0)
            {
                $scope.showNum2+=10;
                $scope.maxTitleNum12=false;
                $scope.maxTitleNum2=true;
                num2=0;
                num12++;
            }
            /**
             * bug 45修复  2016/3/8 by yeshengqiang 结束
             */
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
            console.log($scope.searchPaginator2);
        };
        $scope.load1();

        //判断checkbx是否选中
        $scope.d=false;
        $scope.btnIndex1 = 1;
        $scope.getdata=function(item){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.chargeName = item.staffName;
                    $scope.aaa.staff = item;
                    $scope.accountRecord=item;
                    $scope.d=true;
                    $scope.btnIndex1 = item;
                    return;
                }else{
                    $scope.d=false;
                    $scope.aaa.staff = {};
                    $scope.btnIndex1 = '';
                    $scope.chargeName = '';
                }
            }
        };



        /**
         * 选中人员信息
         */
        $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
            $scope.ServiceRequest.tasks.principal = $scope.accountRecord.staff.staffId;
            $scope.ServiceRequest.tasks.staff = $scope.accountRecord.staff;
        };

        //----------------------------------------
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
            if ($scope.personArray.length > 1) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                if(index==1){
                    $scope.ServiceRequest.tasks.staff = {};
                    $scope.ServiceRequest.tasks.staff.staffName= $scope.accountRecord.staffName;
                    $scope.ServiceRequest.tasks.principal = $scope.accountRecord.staffId;
                    $scope.AddTasks.tasks.staff = {};
                    $scope.AddTasks.tasks.staff.staffName= $scope.accountRecord.staffName;
                    $scope.AddTasks.tasks.principal = $scope.accountRecord.staffId;
                }else if(index==2){
                    $scope.chargeName= $scope.accountRecord.staffName;
                }else if(index==3){
                    $scope.person.staff = {};
                    $scope.person.staff.staffName= $scope.accountRecord.staffName;
                }else if(index==4){
                    $scope.aaa.staff = {};
                    $scope.aaa.staff.staffName= $scope.accountRecord.staffName;
                }

            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }

        //==========








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
        $scope.change = function(maintain){
            $scope.aaa=maintain;
        };

        /**
         *  集中处理
         */
        $scope.updateTasks=function(){
            if($scope.aaa.taskState == 10){
                alert("任务已经是集中处理状态!");
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写说明!',{icon:0});
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

        /**
         * 转专项处理
         */
        $scope.updateSpecial=function(){
            if($scope.aaa.taskState == 9){
                alert("任务已经是转专项状态!");
                return;
            }
            if($scope.aaa.turnSpecialRecordsId==null || $scope.aaa.turnSpecialRecordsId==0){
                layer.alert('请选择转入专项资金维修项目！',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写说明!',{icon:0});
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
            $scope.aaa.principal=$scope.aaa.staff.staffName;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                console.log($scope.aaa.taskId);
                layer.msg("任务成功转出!",{icon:1});
                $scope.aaa.remarks = "";
                $scope.aaa.staff.staffName='';
                $scope.aaa.type='';
            }).error(function(data,status,headers,config){
                layer.msg("任务转出操作失败,请稍后重试!",{icon:2});
            })
        };

        /**
         * 接受
         */
        $scope.updateAccept=function(maintain){
            if(maintain.taskState == 3){
               // alert("任务已经是接受状态！");
                layer.alert('任务已经是接受状态！',{icon : 0});
                return;
            }
            /*if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写转出说明!',{icon:0});
                return;
            }*/
            $scope.aaa =maintain;
            $scope.aaa.taskState = 3;
            $http.put(url+'/Tasks/changeTasksState',{Tasks:$scope.aaa}).success(function(data){
                //alert("任务已经接受");
                $scope.aaa.remarks = "";
            }).error(function(data,status,headers,config){
                alert("任务接受失败，请稍后重试!");
            })
        };

        /**
         *  失效
         */
        $scope.updateClosed=function(){
            if($scope.aaa.taskState == 0){
                alert("任务已经是关闭状态!");
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写失效说明!',{icon:0});
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

        /**
         *  指派
         */
        $scope.updateAssign=function(){
            if($scope.aaa.taskState == 11){
                alert("任务已经是指派状态!");
                return;
            }
            if($scope.chargeName==null || $scope.chargeName==0){
                layer.alert('请选择指派负责人!',{icon:0});
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写指派说明!',{icon:0});
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

        /**
         * 完成操作
         */
        $scope.updateFinish=function(){
            if($scope.aaa.taskState == 2){
                alert("任务已经是完成状态!");
                return;
            }
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写完成说明!',{icon:0});
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

        /**
         * 催促操作
         */
        $scope.UrgeTaskRecords={};
        $scope.urgeTask=function(){
            if($scope.aaa.remarks==null || $scope.aaa.remarks==0){
                layer.alert('请填写催促说明!',{icon:0});
                return;
            }
            $scope.UrgeTaskRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.UrgeTaskRecords.urgeRemarks = $scope.aaa.remarks;
            $http.post(url+'/UrgeTaskRecords/insertUrgeTaskRecords',{UrgeTaskRecords:$scope.UrgeTaskRecords}).success(function(data){
                //alert("催促操作成功");
                $scope.aaa.remarks = "";
                $scope.loadTask();
            }).error(function(data,status,headers,config){
                alert("催促操作失败,请稍后重试!");
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
            $scope.ApplicationDelayRecords.taskId = $scope.aaa.taskId; //关联任务
            //$scope.UrgeTaskRecords.operatorId = ""  //预留操作人
            $scope.ApplicationDelayRecords.remarks = $scope.aaa.remarks;
            console.log($scope.ApplicationDelayRecords)
            $http.post(url+'/ApplicationDelayRecords/insertApplicationDelayRecords',{ApplicationDelayRecords:$scope.ApplicationDelayRecords}).success(function(data){
                layer.msg("延时操作成功",{icon : 1,time : 2000});
                $scope.ApplicationDelayRecords.delayTime="";
                $scope.aaa.remarks = "";
                console.log(data)
                $scope.loadTask();
            }).error(function(data,status,headers,config){
                alert("延时操作失败,请稍后重试!");
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
                        alert("操作失败，请稍后重试!")
                    });
                $scope.loadTask();
                $scope.isAllTasksChecked = false;
            }else{
                var item = $scope.ts;
                if(item.taskState == state){
                    alert("任务已经是"+name+"状态!");
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
                        alert("操作失败，请稍后重试!")
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
                        alert("操作失败，请稍后重试!")
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
                        alert("操作失败，请稍后重试!")
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
                        alert("操作失败，请稍后重试!")
                    });
                $scope.isAllTasksChecked = false;

            }
        };

        /**
         * 列表任务选中  2016/7/12 yangshengquan
         */
        $scope.x=false;             //用于绑定checkbox
        $scope.mergeLists=[];  //checkbox选择的关系对象集合
        $scope.mergeListIds=[]; //checkbox选择的关系对象主键集合
        $scope.getTaskData=function(item){

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
         * 取消跳转
         */
        $scope.relaseReqService = function()
        {
                $scope.show1=true;
                $scope.show2=false;
                $scope.show3=false;
                $scope.show4=false;
                $scope.show5=false;
                $scope.ServiceRequest.remarks=null;
                $scope.load();
        };
    }]);
});