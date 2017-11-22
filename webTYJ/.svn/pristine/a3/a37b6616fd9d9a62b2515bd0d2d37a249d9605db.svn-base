/**
 * Created by NM on 2018/1/18.
 * 装修管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('decorationWorkCtrl', ['$scope', '$http','$rootScope','$stateParams','$location', function ($scope,$http,$rootScope,$stateParams,$location) {

        var url=$rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.seleted = '';
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

        //显示隐藏新建工单
        var map = {"装修核查工单":"div1"};
        $("#s").bind("change", function(){
            var divId = map[this.value];
            $("#"+divId).show().siblings().hide();
        });

        $scope.order1=true;       //显示新建工单
        $scope.closed=false;      //显示工单关闭原因

        $scope.Tasks={};
        //绑定任务ID
        $scope.Tasks.taskId=$stateParams.decorationWorkId;
        //console.log($scope.Tasks.taskId);
        //查询任务信息
        $http.get(url+'/Tasks/getTasksbyId/'+$scope.Tasks.taskId).success(function(data){
            $scope.Tasks= data.Tasks;
        }).error(function(data,status,headers,config){
            alert("失败！");
        });
//获取任务催促次数
        $http.get(url +'/UrgeTaskRecords/getUrgeTaskRecordsCount/' + $scope.Tasks.taskId).success(function(data){
            $scope.UrgeTaskRecordsCount = data;
        });
        //获取任务催促次数
        $http.get(url +'/ApplicationDelayRecords/getApplicationDelayRecordsCount/' + $scope.Tasks.taskId).success(function(data){
            $scope.ApplicationDelayRecordsCount = data;
        });

        //任务日志查询
        $scope.TasksJournal={};
        $scope.TasksJournal.taskId=$stateParams.decorationWorkId;
        $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
            //alert("查询成功！");
            //console.log(data);
            $location.path("/index/serviceRequest/decorationManagement/decorationWork/"+$scope.TasksJournal.taskId).search({decorationWorkId:$scope.TasksJournal.taskId});
            $scope.TasksJournal = data.TasksJournal;
        }).error(function(data,status,headers,config){
            alert("查询失败！");
        });
        $scope.load=function(){
            $scope.TasksJournal.taskId=$stateParams.decorationWorkId;
            $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                //alert("查询成功！");
                //console.log(data);
                $location.path("/index/serviceRequest/decorationManagement/decorationWork/"+$scope.TasksJournal.taskId).search({decorationWorkId:$scope.TasksJournal.taskId});
                $scope.TasksJournal = data.TasksJournal;
            }).error(function(data,status,headers,config){
                alert("查询失败！");
            });
            $scope.order1=false
        };
        //循环获取
        $scope.typeShow=0;
        //$scope.personCust =0;
        //$scope.wuLiaoCust =0;
        //$scope.toolCust =0;
        $scope.item1=function(item){
            //$scope.btnIndex=item;
            $http.get(url +'/TasksJournal/getTasksJournalbyDateandType/'+ item.creOrderType+"/"+item.operationTime).success(function(data) {
                $scope.aa=data.TasksJournal;
                //console.log($scope.aa);
                //装修核查单关闭显示
                if($scope.aa.renovationCheckOrders!=null){
                    if($scope.aa.renovationCheckOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }
            }).error(function(data,status,headers,config){
                alert("查询失败！");
            });
            $scope.order=false;
            $scope.order1=false;
            if(item.creOrderType==14){
                //console.log(item.creOrderType);
                $scope.typeShow=1;
            }
            else{
                alert("工单类型不存在")
            }
            //console.log(item);
        };
        $scope.order=false;
        $scope.addTask=function(){
            $scope.typeShow=0;
            $scope.order=true;
            $scope.order1=true;
        };
        /***************************************************************************************/
        //取消
        $scope.cancel=function(){
            $scope.order1=false;
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
        $scope.RenovationCheckOrders.taskId=$stateParams.decorationWorkId;
        $scope.RenovationCheckOrders.renovationCheckRecords = $scope.currentBuilding.areaNew;
        $scope.addCheckOrders = function(taskId){
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/RenovationCheckOrders/insertRenovationCheckOrders',{RenovationCheckOrders:$scope.RenovationCheckOrders}).success(function(){


                    $scope.RenovationCheckOrders.taskId=$stateParams.decorationWorkId;
                    $location.path("/index/serviceRequest/decorationManagement/decorationWork/"+$scope.RenovationCheckOrders.taskId).search({decorationWorkId:$scope.RenovationCheckOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });
                console.log($scope.RenovationCheckOrders);
            }else{
                alert("新增投诉失败！");
            }
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

        //关闭核查
        $scope.CloseComplaintOrders=function(){
            if( $scope.aa.renovationCheckOrders.orderState=0){
                alert("投诉单已经是关闭状态!");
                return;
            }
            $scope.aa.renovationCheckOrders.closePersonId=14;
            $http.put(url+"/RenovationCheckOrders/closeRenovationCheckOrders",{RenovationCheckOrders: $scope.aa.renovationCheckOrders}).success(function(){
                //alert("关闭投诉状态成功！");
                console.log($scope.aa.renovationCheckOrders.orderState);
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                alert("关闭投诉状态失败！");
            });
            $scope.aa.renovationCheckOrders={}
        };

        $scope.fileState="";
        $scope.RenovationCheckOrders.annexs=[];    //核查单上传
        $scope.annex={
            annexAddress:'',
            annexName:'',
            relationId:''
        };
        //核查单上传
        $scope.ComplainFile=function(){
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
                        $scope.RenovationCheckOrders.annexs.push($scope.annex);
                        console.info(filePath);
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
        };

        $scope.UrgeTask = {page:{}};
        $scope.UrgeTask.taskId = $stateParams.decorationWorkId;
        var showUrgeTask = function(page,callback) {
            $scope.UrgeTask.page=page;
            $http.post(url + '/UrgeTaskRecords/listPageUrgeTaskRecordsRestful',{UrgeTaskRecords:$scope.UrgeTask}).success(callback);
        };
        $scope.searchPaginator2=app.get('Paginator').list(showUrgeTask,10);

        $scope.ApplicationDelay = {page:{}};
        $scope.ApplicationDelay.taskId = $stateParams.decorationWorkId;
        var showApplicationDelay = function(page,callback) {
            $scope.ApplicationDelay.page=page;
            $http.post(url + '/ApplicationDelayRecords/listPageApplicationDelayRecordsRestful',{ApplicationDelayRecords:$scope.ApplicationDelay}).success(callback);
        };
        $scope.searchPaginator1=app.get('Paginator').list(showApplicationDelay,10);

    }]);
});