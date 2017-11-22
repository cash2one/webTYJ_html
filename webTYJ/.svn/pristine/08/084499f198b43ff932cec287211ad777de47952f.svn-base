/**
 * Created by NM on 2018/1/18.
 * 装修管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newDecorateServiceRequestManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.Show1=true;//服务请求管理
        $scope.Show2=false;//新建服务请求
        $scope.service1=true; //服务请求
        $scope.service2=false;//任务
        $scope.btnIndex1=1;
        var url = $rootScope.url;

        /**
         * 服务请求页面网格列表切换
         */
        $scope.grid=true;  //默认列表显示
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
         * 进入模块初始化，查询请求信息（用户id）
         */
        $scope.load = function() {
            $scope.chooseData = {datas: []};
            document.getElementById("allchose").checked = false;
            $scope.chosestate = '0';
            $scope.serviceRequests = {page: {}};
            var fetchFunction = function (page, callback) {
                $scope.serviceRequests.page = page;
                $scope.serviceRequests.serviceRequestType = 1;
                $http.post(url + '/ServiceRequest/listPageServiceRequestByType', {ServiceRequest: $scope.serviceRequests}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        }
        $scope.load();
        /***************************请求选中*****************/
        $scope.getData1 = function(item)
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
        /***************************请求选中*****************/
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

            $scope.service1=false;
            $scope.service2=true;

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
         * 取消跳转
         */
        $scope.relaseReqService = function()
        {
            $scope.service1=true; //服务请求
            $scope.service2=false;//任务
            $scope.ServiceRequest.remarks=null;
            $scope.load();
        };
        /**
         * 列表任务选中
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
        /********************************************************新建开始*********************************************************************/

        //获取人员信息
        $http.get(url + "/staff/listAllStaffRestful").success(function(data){
            $scope.staffs = data.Staff;
            console.log( $scope.staffs);
        }).error(function(data,status,headers,config){
            console.log("获取人员信息失败,请稍后重试!");
        });


        $scope.decorate1=function(index){
            $scope.Show1=true;
            $scope.Show2=false;
            $scope.btnIndex1=index;
        };
        $scope.addDecorate1=function(index){
            $scope.Show1=false;
            $scope.Show2=true;
            $scope.btnIndex1=index;
        };

        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.show4 = false;
        $scope.show5 = false;
        $scope.show6 = false;
        $scope.show7 = false;
        $scope.show8 = false;
        $scope.show9 = false;

        $scope.btnIndex = 1;
        /**
         * 显示选择房屋
         */
        $scope.chooseHouse = function(index){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };

        /**
         * 显示申请资料
         */
        $scope.applicationData = function(index){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };
        /**
         * 显示现场查核
         */
        $scope.verification = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };
        /**
         * 显示缴费
         */
        $scope.payDeposit = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = true;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };
        /**
         * 显示发放许可
         */
        $scope.Alicence = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = true;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };
        /**
         * 显示施工过程
         */
        $scope.workProgress = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = true;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };

        /**
         * 显示新建方案
         */
        $scope.acceptance = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = true;
            $scope.show9 = false;
            $scope.btnIndex = index;
        };
        /**
         * 显示费用结算
         */
        $scope.costClearing = function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = true;
            $scope.btnIndex = index;
        };

        var url = $rootScope.url;
        $scope.serviceRequest={
            customerId:'',
            serviceRequestName:"业主装修",
            directionType:1,
            serviceRequestType:1,
            importantEvent:1,
            anxious:0,
            //writerId:$stateParams.CustSerId,
            remarks:"业主装修",

        };



        //客户查询
        $scope.searchone={page:{}};
        var parent = function (page, callback) {
            $scope.searchone.page = page;
            $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
        };
        $scope.currentPaginator = app.get('Paginator').list(parent,4);
        console.log($scope.currentPaginator);
        $scope.person={};
        $scope.name;
        $scope.choicePerson1=function(person){
            $scope.person=person;
            console.log($scope.person);
            $scope.btnIndex=person.custId;
            $scope.name=$scope.person.name;
            $scope.serviceRequest.customerId= $scope.person.custId;
            $scope.serviceRequest.accessPhone=$scope.person.registerPhone;
            $scope.serviceRequest.reviewId= $scope.person.custId;
        };

        //加载房屋信息
        $scope.search={};
        $scope.PersonSubmit =function() {
            $scope.search.custId = $scope.person.custId;
            //$scope.search.projectType = '07a3ec0e-0d22-48b4-9659-68867aab43e6';//授权项目类型ID//
            $http.post(url + '/HouseNew/listAllHouseNewBySearch', {Search: $scope.search}).success(function (data) {
                $scope.HouseNew = data.HouseNew;
                console.log($scope.HouseNew);
            }).error(function (data, status, headers, config) {
                layer.alert('查询失败', {icon: 0});
            });
        }

        $scope.hose={};
        $scope.check = function(item) {
            console.log(item);
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;

            $scope.hose = item;
            console.log($scope.hose);


            $http.get(url + '/BuildingComponent/getBuildingComponentBybuildingStructureId/'+ $scope.hose.buildingStructureId).success(function(data) {
                console.log(data);
               $scope.componentproperty = data.BuildingComponent;
            }).error(function(data,status,headers,config){
                layer.alert("查询组件资产出错",{icon:2});
            });

            $scope.task={
                addressId:$scope.hose.buildingStructureId,
                customerId:$scope.person.custId,
                taskType:18
            };
        };
        $scope.getData = function(item){
            var allData = $scope.componentproperty;
            var num = [];
            $scope.chooseData = {datas: []};
            for(var i=0;i<allData.length;i++) {
                if(item.componentId == allData[i].componentId)
                {
                    if(document.getElementById(item.componentId).checked)
                    {
                        document.getElementById(item.componentId).checked = false;
                        document.getElementById(item.componentId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;

                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].componentId != item.componentId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.componentId).checked = true;
                        document.getElementById(item.componentId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }

            }
            for(var i=0;i<allData.length;i++) {
                if(document.getElementById(allData[i].componentId).checked)
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
            $scope.OwnerRenovationApply.decorateComponentRecordsList=$scope.chooseData.datas;
            console.log( $scope.OwnerRenovationApply.decorateComponentRecordsList);
        };
        /**
         * 点击全选
         */

        $scope.allchose1 = function(item)
        {
            var datastaffList=item;
            allcheck(datastaffList);
        };
        //全选
        function allcheck(datastaffList)
        {
            if( $scope.chosestate=='0'){
                $scope.chooseData= {datas:[]};
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].componentId).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].componentId).parentNode.parentNode.style.background = '#f6f8fa';
                }
                document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].componentId).checked = false;
                    document.getElementById(datastaffList[i].componentId).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                document.getElementById("allchose").checked = false;
            }
        };

        /**
         *  提交添加图片
         *
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
            switch($scope.fileState) {

                case "6":
                    $scope.changeAddress($scope.PraiseOrders.annexs, $scope.tempObj.annexs);//表扬单
                    $scope.fileState = "";
                    break;

            }

            }

        $scope.OwnerRenovationApply={
            serviceRequest:{},
            decorateAnnexList:[],        //装修图纸附件
            decorateComponentRecordsList:[], //装修组件
            decorateAssociatedRecords:{}, //装修单位
            decoratePersonnelAssociatedList:[] ,//装修人员
            decoreateDiscloseInformationList:[], //装修单位提交的文件
        };

        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        //建筑图纸原型
        $scope.OwnerRenovationApplyDrawing=function(){
            $scope.decorateAnnexLists={
                drawingType1:"0",
                drawingType2:"0",
                annexAddress:"",
                annexName:""
            };
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");

            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                    },
                    onDelete: function(file, files){

                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法

                        filePath=response;
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        };
        //水路图纸原型
        $scope.OwnerRenovationApplyDrawing1=function(){
            $scope.decorateAnnexLists={
                drawingType1:"0",
                drawingType2:"1",
                annexAddress:"",
                annexName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                //$("#zyupload").unbind();
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        }
        //电路图纸原型
        $scope.OwnerRenovationApplyDrawing2=function(){
            $scope.decorateAnnexLists={
                drawingType1:"0",
                drawingType2:"2",
                annexAddress:"",
                annexName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                //$("#zyupload").unbind();
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        }

        //建筑图纸设计
        $scope.OwnerRenovationApplyDrawingT=function(){
            $scope.decorateAnnexLists={
                drawingType1:"1",
                drawingType2:"0",
                annexAddress:"",
                annexName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        }
        //水路图纸设计
        $scope.OwnerRenovationApplyDrawingT1=function(){
            $scope.decorateAnnexLists={
                drawingType1:"1",
                drawingType2:"1",
                annexAddress:"",
                annexName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        };
        //电路图纸设计
        $scope.OwnerRenovationApplyDrawingT2=function(){
            $scope.decorateAnnexLists={
                drawingType1:"1",
                drawingType2:"2",
                annexAddress:"",
                annexName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decorateAnnexLists.annexAddress=filePath;
                        $scope.decorateAnnexLists.annexName=file.name;
                        $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexLists);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decorateAnnexLists={};
        }


        $scope.enterpriseCustNew={};
        $scope.enterpriseCustNew.manageType='服务类';//经营类型
        $http.post(url+'/EnterpriseCustNew/findEnterpriseCustNewRestful',{EnterpriseCustNew:$scope.enterpriseCustNew}).success(function(data)
        {
            $scope.enterpriseCustNew = data.EnterpriseCustNew;
            console.log($scope.enterpriseCustNew);
        }).error(function(data, status, headers, config){
            layer.msg("新增失败",{icon : 3,time : 2000});
        });

        /**
         * 选中企业
         * @param items
         */
        $scope.enterpriserone={};
        $scope.btnIndex='';
        $scope.choiceEnterpriseCust=function(items){
            $scope.btnIndex='';
            $scope.enterpriserone=items;
            $scope.btnIndex = $scope.enterpriserone.enterpriseId;


        };
        $scope.personCustNew={};
        $scope.EnterpriseOk=function(){
            if( $scope.enterpriserone.enterpriseName==null || $scope.enterpriserone.enterpriseName==''){
                return;
            }
            $scope.OwnerRenovationApply.decorateAssociatedRecords= $scope.enterpriserone;
            $scope.OwnerRenovationApply.decorateAssociatedRecords.enterpriseName = $scope.enterpriserone.enterpriseName;

            $scope.personCustNew.enterpriseId= $scope.OwnerRenovationApply.decorateAssociatedRecords.enterpriseId;

            $http.get(url+'/PersonCustNew/findEnterpriseCustByIdRestful/'+$scope.personCustNew.enterpriseId).success(function(data) {

                $scope.personCustNew = data.PersonCustNew;
                console.log(data);
            }).error(function(data, status, headers, config){
                layer.msg("查询该员工失败",{icon : 3,time : 2000});
            });


            $scope.btnIndex='';
            $scope.enterpriserone={};
            console.log($scope.OwnerRenovationApply.decorateAssociatedRecords);
        }
        $scope.closeEnterprise=function(){
            $scope.btnIndex='';
            $scope.enterpriserone={};
        }

        $scope.Personpriserone={};
        $scope.decoratePersonnelAssociated={};
        $scope.choicePersonpriseCust=function(items){
            $scope.btnIndex='';
            $scope.Personpriserone=items;
            $scope.btnIndex = $scope.Personpriserone.custId;
            $scope.Personpriserone.name=items.name;
        };
        $scope.PersonrpriseOk=function(index){
            if(index==1){
                $scope.OwnerRenovationApply.decorateAssociatedRecords.PersonName = $scope.Personpriserone.name;
            }else if(index==2){
                $scope.OwnerRenovationApply.decoratePersonnelAssociatedList.push( $scope.Personpriserone);


            }

            $scope.btnIndex='';
            $scope.Personpriserone={};
        }
        $scope.closePersonrprise=function(){
            $scope.btnIndex='';
            $scope.Personpriserone={};
        }


        $scope.Persona=function(){
            if($scope.OwnerRenovationApply.decorateAssociatedRecords.personCustNew==null || $scope.OwnerRenovationApply.decorateAssociatedRecords.personCustNew==''){
                layer.msg("请选择装修单位",{icon : 0,time : 2000});
                return;
            }else {
                $("#PersonModal").modal("show");
            }
        }

        $scope.add=function(){
            if($scope.OwnerRenovationApply.decorateAssociatedRecords.personCustNew==null || $scope.OwnerRenovationApply.decorateAssociatedRecords.personCustNew==''){
                layer.msg("请选择装修单位",{icon : 0,time : 2000});
                return;
            }else {
                $("#ModalPerson").modal("show");
            }
        }
        $scope.deleteItem=function(index){
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                $scope.OwnerRenovationApply.decoratePersonnelAssociatedList.splice(index,1);
                layer.msg('删除成功！',{icon : 1,time : 1000});
                $scope.$apply($scope.OwnerRenovationApply.decoratePersonnelAssociatedList);
            },function(){});
        }

        /**
         * 装修单位提交资料
         *
         * */
            //文件上传
        $scope.FiledApply=function(){
            $scope.decoreateDiscloseInformationList={
                fileType1:"1",
                fileAddress:"",
                fileName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decoreateDiscloseInformationList.fileAddress=filePath;
                        $scope.decoreateDiscloseInformationList.fileName=file.name;
                        $scope.OwnerRenovationApply.decoreateDiscloseInformationList.push($scope.decoreateDiscloseInformationList);
                        console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decoreateDiscloseInformationList={};
            console.log( $scope.OwnerRenovationApply.decoreateDiscloseInformationList);
        }
        $scope.FiledApply1=function(){
            $scope.decoreateDiscloseInformationList={
                fileType1:"2",
                fileAddress:"",
                fileName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decoreateDiscloseInformationList.fileAddress=filePath;
                        $scope.decoreateDiscloseInformationList.fileName=file.name;
                        $scope.OwnerRenovationApply.decoreateDiscloseInformationList.push($scope.decoreateDiscloseInformationList);
                        console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decoreateDiscloseInformationList={};
            console.log( $scope.OwnerRenovationApply.decoreateDiscloseInformationList);
        }
        $scope.FiledApply2=function(){
            $scope.decoreateDiscloseInformationList={
                fileType1:"3",
                fileAddress:"",
                fileName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decoreateDiscloseInformationList.fileAddress=filePath;
                        $scope.decoreateDiscloseInformationList.fileName=file.name;
                        $scope.OwnerRenovationApply.decoreateDiscloseInformationList.push($scope.decoreateDiscloseInformationList);

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decoreateDiscloseInformationList={};
        }
        $scope.FiledApply3=function(){
            $scope.decoreateDiscloseInformationList={
                fileType1:"4",
                fileAddress:"",
                fileName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decoreateDiscloseInformationList.fileAddress=filePath;
                        $scope.decoreateDiscloseInformationList.fileName=file.name;
                        $scope.OwnerRenovationApply.decoreateDiscloseInformationList.push($scope.decoreateDiscloseInformationList);
                        console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decoreateDiscloseInformationList={};
        }
        $scope.FiledApply4=function(){
            $scope.decoreateDiscloseInformationList={
                fileType1:"5",
                fileAddress:"",
                fileName:""
            };
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
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
                        $scope.decoreateDiscloseInformationList.fileAddress=filePath;
                        $scope.decoreateDiscloseInformationList.fileName=file.name;
                        $scope.OwnerRenovationApply.decoreateDiscloseInformationList.push($scope.decoreateDiscloseInformationList);
                        console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
            $scope.decoreateDiscloseInformationList={};
        }


        /**
         * 装修服务请求
         **/
        $scope.addDecorate=function(){
            if($scope.serviceRequest.customerId ==null || $scope.serviceRequest.customerId ==''){
                layer.alert('请选择客户',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.decorateAnnexList.length==0){
                layer.alert('请上传装修图纸',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.decorateComponentRecordsList==0){
                layer.alert('至少选取一项装修对象',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.decorateAssociatedRecords==null || $scope.OwnerRenovationApply.decorateAssociatedRecords==''){
                layer.alert('装修单位不能为空',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.decorateAssociatedRecords.PersonName==null || $scope.OwnerRenovationApply.decorateAssociatedRecords.PersonName==''){
                layer.alert('装修单位负责人不能为空',{icon : 0});
                return;decoratePersonnelAssociatedList
            }
            if( $scope.OwnerRenovationApply.decoratePersonnelAssociatedList==0){
                layer.alert('现场装修人员不能为空',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.decoreateDiscloseInformationList==0){
                layer.alert('装修单位提交资料不能为空',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.estimatedStarTime =='' || $scope.OwnerRenovationApply.estimatedStarTime ==null){

                layer.alert('装修预计开始时间不能为空',{icon : 0});
                return;
            }
            if( $scope.OwnerRenovationApply.estimatedFinishTime =='' || $scope.OwnerRenovationApply.estimatedFinishTime ==null){

                layer.alert('装修预计结束时间不能为空',{icon : 0});
                return;
            }
            $scope.serviceRequest.tasks=$scope.task;
            $scope.OwnerRenovationApply.serviceRequest= $scope.serviceRequest;
            $scope.OwnerRenovationApply.decorateAssociatedRecords.decorateId = $scope.OwnerRenovationApply.decorateAssociatedRecords.enterpriseId; //装修公司id
            $scope.OwnerRenovationApply.decorateAssociatedRecords.headId = $scope.OwnerRenovationApply.decorateAssociatedRecords.personCustNew.custId;
            /*$scope.OwnerRenovationApply.estimatedStarTime = $scope.OwnerRenovationApply.estimatedStarTime;
            $scope.OwnerRenovationApply.estimatedFinishTime= $scope.OwnerRenovationApply.estimatedFinishTime;*/
            $http.post(url+'/OwnerRenovationApply/insertOwnerRenovationApply',{OwnerRenovationApply:$scope.OwnerRenovationApply}).success(function(data){
                $scope.ServiceRequest=data.OwnerRenovationApply.serviceRequest;

                $http.get(url+'/Tasks/getTasksbyTaskTypeAndServiceId/18/'+$scope.ServiceRequest.serviceRequestId).success(function(data){

                    $scope.heCha=data.Tasks;

                    console.log(  $scope.heCha);

                    for(var j in $scope.heCha){

                        /****************************************现场核查*******************************************************/

                        $scope.currentEditIndex=null;      //当前编辑框(初始为空)
                        $scope.editArea=false;
                        $scope.currentBuilding={
                            areaNew:[
                                {inspectName:"拆墙",conduct:0,normal:0},
                                {inspectName:"电路安装、改造",conduct:0,normal:0},
                                {inspectName:"给水管安装、改造",conduct:0,normal:0},
                                {inspectName:"排水管安装、改造",conduct:0,normal:0},
                                {inspectName:"防水处理",conduct:0,normal:0},
                                {inspectName:"泥水施工",conduct:0,normal:0},
                                {inspectName:"阳台封闭施工",conduct:0,normal:0},
                                {inspectName:"竣工泡水情况",conduct:0,normal:0},
                                {inspectName:"木工施工",conduct:0,normal:0}
                            ]
                        };
                        $scope.currentEditArea={};

                        /**
                         *  修改按钮点击事件
                         * @param index  行下标
                         */
                        $scope.updateItem=function(index){
                            $scope.editArea=true;
                            $scope.currentEditIndex=index;
                            var current=$scope.currentBuilding.areaNew[index];
                            $scope.currentEditArea={
                                inspectName:current.inspectName,
                                conduct:current.conduct,
                                normal:current.normal
                            };
                        };
                        /**
                         * 修改保存
                         * @param index 行下标
                         */
                        $scope.updateSave=function(index){
                            $scope.tenementPact[index].editing=false;
                        };
                        /**
                         * 取消
                         * @param index 行下标
                         */
                        $scope.updateCancel=function(index){
                            $scope.tenementPact[index]=$scope.cloneItem;
                            $scope.tenementPact[index].editing=false;
                        };
                        /**
                         * 删除数据
                         * @param index 行下标
                         */
                        $scope.deleteItem=function(index){
                            $scope.currentBuilding.areaNew.splice(index,1);
                        };
                        /**
                         * 新增按钮事件
                         */
                        $scope.addItem=function(){
                            $scope.editArea=true;
                            $scope.currentEditIndex=null;
                        };
                        /**
                         * 新增保存功能
                         */
                        $scope.addSave=function(){
                            if($scope.currentEditIndex!=null){
                                $scope.currentBuilding.areaNew[$scope.currentEditIndex]={
                                    inspectName:$scope.currentEditArea.inspectName,
                                    conduct:$scope.currentEditArea.conduct,
                                    normal:$scope.currentEditArea.normal
                                };
                            }
                            else{
                                $scope.currentBuilding.areaNew.push({
                                    inspectName:$scope.currentEditArea.inspectName,
                                    conduct:$scope.currentEditArea.conduct,
                                    normal:$scope.currentEditArea.normal
                                });
                            }
                            $scope.currentEditArea={};
                            $scope.editArea=false;
                            $scope.RenovationCheckOrders.renovationCheckRecords = $scope.currentBuilding.areaNew;
                        };
                        /**
                         * 新增取消
                         */
                        $scope.addCancel=function(){
                            $scope.editArea=false;
                        };
                        //是否建议发函
                        $scope.currentLetter = [
                            {letterName:"《装修整改通知》",whetherLetter:0},
                            {letterName:"《装修违约通知书》",whetherLetter:0},
                            {letterName:"《装修违约罚款通知》",whetherLetter:0},
                            {letterName:"《装修停工通知》",whetherLetter:0}
                        ];
                        //新增装修核查单
                        $scope.RenovationCheckOrders={orderState:1,orderType:14,architecturalDesign:1,waterPipeDesign:1,circuitDesign:1, renovationCheckRecords:[],letterRecords:[]};
                        $scope.RenovationCheckOrders.letterRecords = $scope.currentLetter;
                        $scope.RenovationCheckOrders.taskId=$scope.heCha[j].taskId;
                        $scope.RenovationCheckOrders.serviceRequestId=$scope.heCha[j].serverId;;
                        $scope.RenovationCheckOrders.renovationCheckRecords = $scope.currentBuilding.areaNew;
                        console.log( $scope.RenovationCheckOrders.taskId);

                        $scope.addHeCha=function(taskId){
                            $http.post(url+'/RenovationCheckOrders/insertRenovationCheckOrders',{RenovationCheckOrders:$scope.RenovationCheckOrders}).success(function(data)
                            {

                                layer.msg("添加成功",{icon : 1,time : 2000});
                                $scope.RenovationCheckOrders=data.RenovationCheckOrders;
                                console.log(data);
                                console.log("***11111111111111111");
                                console.log($scope.RenovationCheckOrders.orderId);
                                console.log("***11111111111111111");
                                $http.get(url+'/RenovationCheckOrders/getRenovationCheckOrdersbyId/'+$scope.RenovationCheckOrders.orderId).success(function(data){
                                    $scope.RenovationCheckOrders=data.RenovationCheckOrders;

                                }).error(function(data,status,headers,config){
                                    layer.alert('搜索失败，自己填充数据',{icon : 0});
                                });
                            }).error(function(data,status,headers,config){
                                layer.alert('搜索失败，自己填充数据',{icon : 0});
                            });
                            $scope.RenovationCheckOrders={};
                            $scope.currentLetter = [
                                {letterName:"《装修整改通知》",whetherLetter:0},
                                {letterName:"《装修违约通知书》",whetherLetter:0},
                                {letterName:"《装修违约罚款通知》",whetherLetter:0},
                                {letterName:"《装修停工通知》",whetherLetter:0}
                            ];
                            $scope.currentBuilding={
                                areaNew:[
                                    {inspectName:"拆墙",conduct:0,normal:0},
                                    {inspectName:"电路安装、改造",conduct:0,normal:0},
                                    {inspectName:"给水管安装、改造",conduct:0,normal:0},
                                    {inspectName:"排水管安装、改造",conduct:0,normal:0},
                                    {inspectName:"防水处理",conduct:0,normal:0},
                                    {inspectName:"泥水施工",conduct:0,normal:0},
                                    {inspectName:"阳台封闭施工",conduct:0,normal:0},
                                    {inspectName:"竣工泡水情况",conduct:0,normal:0},
                                    {inspectName:"木工施工",conduct:0,normal:0}
                                ]
                            };
                        };

                        $scope.SelectHeCha=function(){

                        };
                        //核查附件
                        //$scope.RenovationCheckOrders={};
                        $scope.RenovationCheckOrders.annexs=[];    //核查单上传
                        $scope.annex={
                            annexAddress:'',
                            annexName:'',
                            relationId:''
                        };
                        $scope. constructionAdd=function(){
                            $("#zyupload").remove();
                            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
                            $(function(){
                                // 初始化插件
                                $("#zyupload").zyUpload({
                                    //    width            :   "900px",                 // 宽度
                                    //    height           :   "400px",                 // 宽度
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
                                        $scope.RenovationCheckOrders.annexs.push($scope.annex);

                                    },
                                    onFailure: function(file, response){          // 文件上传失败的回调方法

                                    },
                                    onComplete: function(response){           	  // 上传完成的回调方法

                                    }
                                });
                            });
                        };
                        /****************************************现场核查end***************************************************/




                    }




                }).error(function(data,status,headers,config){

                });

                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = true;
                $scope.show4 = false;
                $scope.show5 = false;
                $scope.show6 = false;
                $scope.show7 = false;
                $scope.show8 = false;
                $scope.show9 = false;



                /*************************************施工备案证****************************************************/

                $scope.way={
                    od:[
                        { id: '1',value:'装修施工' },
                        { id: '2',value:'装饰施工' },
                        { id: '3',value:'临时施工' }

                    ]};
                //获取负责人
                $http.get(url+'/staff/listAllStaffRestful').success(function(data){
                    $scope.dutyPerson=[];
                    $scope.dutyPerson=data.Staff;
                    //console.log($scope.dutyPerson);
                }).error(function(data,status,headers,config){
                    layer.alert('负责人信息查询失败',{icon : 0});
                });
                $scope.onChange=function(propertyId){

                    $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+propertyId).success(function(data) {
                        $scope.EnterpriseCustNew = data.EnterpriseCustNew;
                        console.log($scope.EnterpriseCustNew);
                    }).error(function(data, status, headers, config) {
                        //alert("人员信息获取失败");
                    });

                };
                $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+$scope.OwnerRenovationApply.decorateAssociatedRecords.decorateId).success(function(data) {
                    $scope.enterprise = data.EnterpriseCustNew;
                    console.log($scope.EnterpriseCustNew);
                }).error(function(data, status, headers, config) {
                    //alert("人员信息获取失败");
                });
                $http.get(url + '/PersonCustNew/getPersonCustNewByIdRestful/'+$scope.OwnerRenovationApply.decorateAssociatedRecords.headId).success(function(data) {
                    $scope.personCustNew = data.PersonCustNew;
                    console.log($scope.EnterpriseCustNew);
                }).error(function(data, status, headers, config) {
                    //alert("人员信息获取失败");
                });

                //新增施工备案证
                console.log(data.OwnerRenovationApply);
                console.log("//////////!**********"+$rootScope.user.custId);
                $scope.ConstructionRecordCard={custId:$rootScope.user.custId,
                    applyId:data.OwnerRenovationApply.applyId,
                    decorateId:data.OwnerRenovationApply.decorateAssociatedRecords.decorateId,
                    headId:data.OwnerRenovationApply.decorateAssociatedRecords.headId,
                    constructionStarTime:data.OwnerRenovationApply.estimatedStarTime,
                    constructionFinishTime:data.OwnerRenovationApply.estimatedFinishTime

                };
                $scope.addConstructionRecordCard=function(){
                    $http.post(url+'/ConstructionRecordCard/insertConstructionRecordCard',{ConstructionRecordCard:$scope.ConstructionRecordCard}).success(function(data)
                    {
                        $scope.ConstructionRecordCard=data.ConstructionRecordCard;
                        layer.msg("添加成功",{icon : 1,time : 2000});

                    }).error(function(data,status,headers,config){
                        layer.msg("新增失败",{icon : 3,time : 2000});
                    });

                };

                /*************************************施工备案证end****************************************************/
            }).error(function(data,status,headers,config){
                layer.alert('"搜索失败，自己填充数据"',{icon : 0});
            });

        };




    }]);
});