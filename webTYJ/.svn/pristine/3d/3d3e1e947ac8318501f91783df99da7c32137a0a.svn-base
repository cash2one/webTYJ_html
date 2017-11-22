/**
 * 徐文广
 * 2016/6/3
 * 任务详情
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('taskDetailCtrl', ['$scope', '$http','$rootScope','$stateParams','$window','$location', function ($scope,$http,$rootScope,$stateParams,$window,$location) {

        $scope.taskShow = false;//关闭失效按钮
        var localStorageItem=JSON.parse(localStorage.getItem('item'));
        var url=$rootScope.url;
        var filePath='';

        //获取登录人的信息
        var loginUser = {employId : ''};
        var loginUserCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.loginUser = loginUserCookie?loginUserCookie:loginUser;

        if($rootScope.user!=undefined)
        {
            localStorage.setItem('setUser',JSON.stringify($rootScope.user));
        }else
        {
            $rootScope.user = JSON.parse(localStorage.getItem('setUser'));
        };

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
        $scope.order=true;
        $scope.order1=false;       //显示新建工单
        $scope.closed=false;      //显示工单关闭原因
        $scope.addTask1=function(){
            $scope.isActive = 1;
            $scope.typeShow=0;
            $scope.order=true;
            $scope.order1=true;
            $('#zyuploadPraiseOrdersfile').show();
        };
        //显示隐藏新建工单
        var map = {"报价单":"div1", "检测":"div2", "处理":"div3","验收":"div4","赔偿给业主":"div5","表扬":"div6",
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
                $scope.loadWaters($scope.Tasks.addressId);
            }
            $("#"+divId).show().siblings().hide();
        });

        $scope.Tasks={};
        //绑定任务ID
        //$scope.Tasks.taskId=$stateParams.taskDetailsIds;
        $scope.Tasks.taskId=localStorageItem.taskId;
        //查询任务信息
        $http.get(url+'/Tasks/getTasksbyId/'+$scope.Tasks.taskId).success(function(data){
            $scope.Tasks= data.Tasks;
            if($scope.Tasks.addressId!=null){
                $scope.loadWaters($scope.Tasks.addressId)
            }
        }).error(function(data,status,headers,config){
            layer.alert("失败！");
        });


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

            //$scope.TasksJournal.taskId=$stateParams.taskDetailsIds;
            $scope.TasksJournal.taskId=localStorageItem.taskId;
            $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                //alert("查询成功！");
                //$location.path("/index/serviceRequest/repairOrder/"+$scope.TasksJournal.taskId).search({taskDetailsId:$scope.TasksJournal.taskId});
                $scope.TasksJournal = data.TasksJournal;
            }).error(function(data,status,headers,config){
            });
            $scope.order1=false;
        };

        $scope.item1=function(item){

            //$scope.btnIndex=item;
            $scope.isActive = item.tasksJournalId
            $http.get(url +'/TasksJournal/getTasksJournalbyDateandType/'+ item.creOrderType+"/"+item.operationTime).success(function(data) {
                $scope.aa=data.TasksJournal;
                //赔偿给业主关闭先显示
                /*             if($scope.aa.compensateOwner!=null){
                 if($scope.aa.compensateOwner.orderState==0){
                 $scope.closed=true;
                 }else{
                 $scope.closed=false;
                 }
                 }
                 //if($scope.aa.compensateOwner!=null){
                 //
                 //    $scope.imgList =  $scope.aa.compensateOwner.annexs;
                 //}
                 */
                //赔偿给业主关闭显示
                if($scope.aa.claimToCustomerOrders!=null){
                    if($scope.aa.claimToCustomerOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                }

                //表扬单关闭显示

                if($scope.aa.praiseOrders!=null){
                    if($scope.aa.praiseOrders.orderState==0){
                        $scope.closed=true;
                    }else{
                        $scope.closed=false;
                    }
                    if(angular.isArray($scope.aa.praiseOrders.annexs)) {
                    }else{
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

                //验收单关闭显示
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
                        alert($scope.aa.disposeOrder.orderState);
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
                if($scope.aa.repairOrders!=null){
                    if($scope.aa.repairOrders.orderState==0){
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
                    $scope.loadWaters($scope.Tasks.addressId);
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
            $scope.order=false;
            $scope.order1=false;
            if(item.creOrderType==1){
                $scope.typeShow=3;
            }else if(item.creOrderType==2){
                $scope.typeShow=4;
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
            else if(item.creOrderType==22){
                //维修单
                $scope.typeShow=22;
            }else if(item.creOrderType==23){
                //向业主索赔
                $scope.typeShow=23;
            }else if(item.creOrderType==24){
                //失效单
                $scope.typeShow=24;
            }
            else{
                layer.msg('工单类型不存在!',{icon : 2});
            }
        };


        //打开选择工单类型下拉框
        $scope.addTask=function(){
            $scope.typeShow=0;
            $scope.order=true;
            $scope.order1=true;
        };


        //修改或新增报价工单
        $scope.editPrice=false;      //物料费修改
        $scope.editPrice1=false;   //工具费修改
        $scope.editPrice2=false;    //人工费修改
        //添加人工费行
        $scope.itemRecord0=[{}];
        $scope.addRow=function(){
            var item1={};
            $scope.itemRecord0.push(item1)
        };
        //删除人工行
        $scope.deleteArea1=function(index){
            $scope.itemRecord0 .splice(index,1);

        };
        //添加物料费行
        $scope.itemRecord1=[{}];
        $scope.addRow1=function(){
            var item2={};

            $scope.itemRecord1.push(item2)
        };

        //删除物料行
        $scope.deleteArea2=function(index){
            $scope.itemRecord1 .splice(index,1);

        };
        //添加工具费行
        $scope.itemRecord2=[{}];
        $scope.add1=function(){
            var item3={};
            $scope.itemRecord2.push(item3)

        };

        //删除工具行
        $scope.deleteArea3=function(index){
            $scope.itemRecord2 .splice(index,1);

        };
        //取消
        $scope.colseConsultation = function(){
            $scope.Faqs = {};
            $scope.FaqsList = [];
            $scope.ConsultationOrders = {};
            document.getElementById("faqId").value = "";
            $scope.order1=false;
        };
        //计算总价
        $scope.calculation=function(){
            var total=0;         //人工总价
            var total1=0;      //物料总价
            var total2=0;       //工具总价
            var allTotal1=0;   //总价
            var getTd = document.getElementById("artificial");
            var rowsLength = getTd.rows.length;

            //console.log( getTd.rows.length);
            for (var i = 1; i < rowsLength; i++) {
                var bsh2 = getTd.rows[i].cells[1].getElementsByTagName("INPUT")[0].value;
                var bsh3 = getTd.rows[i].cells[2].getElementsByTagName("INPUT")[0].value;
                total +=parseFloat(bsh2)*parseFloat(bsh3);
            }
            //console.log(total);
            var getTd1 = document.getElementById("addIte");
            var rowsLength1= getTd1.rows.length;
            //console.log( getTd1.rows.length);
            for (var j= 1; j < rowsLength1;  j++) {
                var bsh5 = getTd1.rows[j].cells[1].getElementsByTagName("INPUT")[0].value;
                var bsh6 = getTd1.rows[j].cells[2].getElementsByTagName("INPUT")[0].value;
                total1 +=parseFloat(bsh5)*parseFloat(bsh6);
            }
            //console.log(total1);
            var getTd2 = document.getElementById("tool");
            var rowsLength2= getTd2.rows.length;
            //console.log( getTd2.rows.length);
            for (var g= 1; g< rowsLength2;  g++) {
                var bsh8 = getTd2.rows[g].cells[1].getElementsByTagName("INPUT")[0].value;
                var bsh9 = getTd2.rows[g].cells[2].getElementsByTagName("INPUT")[0].value;
                total2 +=parseFloat(bsh8)*parseFloat(bsh9);
            }
            //console.log(total2);
            allTotal1=total+total1+total2;
            $scope.QuoteOrders.allTotal=allTotal1;
            if($scope.QuoteOrders.discount==null){
                $scope.QuoteOrders.finalPrice=allTotal1
            }else {
                $scope.QuoteOrders.finalPrice=allTotal1*parseFloat(  $scope.QuoteOrders.discount/10)}
            //$scope.QuoteOrders.itemRecords.push($scope.QuoteOrders.itemRecords.finalPrice);
            //$scope.QuoteOrders.itemRecords.push($scope.QuoteOrders.itemRecords.discount)
        };
        $scope.reloadRoute = function() {
            $window.location.reload();
        };
        /*****************  报价单方法    *********************/
            //新建报价单
        $scope.annexs=[];
        $scope.QuoteOrders={orderState:1,orderType:0,serviceRequestId:$scope.Tasks.serverId};
        $scope.QuoteOrders.annexs =  $scope.annexs;
        $scope.QuoteOrders.itemRecords=[];
        //$scope.QuoteOrders.taskId=$stateParams.taskDetailsIds;
        $scope.QuoteOrders.itemRecords.quoteItemType=[{}];
        $scope.AddOrUpdateQuoteOrders=function(taskId){
            $scope.itemRecord = {
                quoteItemType:"1",
                quoteItemName: "",
                quoteItemNum: "",
                quoteItemTotal: "",
                finalPrice:"",
                discount:""
            };
            $scope.QuoteOrders.itemRecords.push($scope.itemRecord);
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/QuoteOrders/insertQuoteOrders',{  QuoteOrders:$scope.QuoteOrders}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$scope.QuoteOrders.taskId= $stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.QuoteOrders.taskId).search({taskDetailsIds:$scope.QuoteOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });

            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.QuoteOrders={}
        };

        //关闭报价单
        $scope.CloseQuoteOrders=function(){
            if( $scope.aa.quoteOrders.orderState=0){
                alert("报价单已经是失效状态!");
                return;
            }
            $scope.quoteOrder = {};
            $scope.quoteOrder = $scope.aa.quoteOrders;
            $http.put(url+"/QuoteOrders/changeOrderState",{QuoteOrders: $scope.aa.quoteOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.quoteOrders.orderState=0;
                $scope.quoteOrder.creOrderType = $scope.quoteOrder.orderType;
                $scope.quoteOrder.operationTime = $scope.quoteOrder.finishTime;
                $scope.item1($scope.quoteOrder);
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.quoteOrders={}
        };
        //根据条件搜索人员信息
        $scope.searchone={page:{}};

        var parent = function (page, callback) {
            $scope.searchone.page = page;
            $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
        };
        $scope.currentPaginator = app.get('Paginator').list(parent,6);
        $scope.person={};
        $scope.choicePerson1=function(person){
            $scope.person=person;
            $scope.index=person.custId;
            $scope.QuoteOrders.signature= $scope.person.name;
        };

        $scope.quoteOrdersfile=function(){
            $scope.annex = {annexAddress:'',annexName:'',relationId:''};
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
                            $scope.annexs.push($scope.annex);
                            $scope.annex={}
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
        /*****************  报价单方法    *********************/


        /*****************  检测单方法 start   *********************/
        /**
         * 新增检测单
         */
        $scope.CheckOrdersService={orderState:1,orderType:3,serviceRequestId:$scope.Tasks.serverId};
        $scope.CheckOrdersService.checkItemRecords=[{}];
        $scope.CheckOrdersService.annexs=[];    //检测单
        //添加行
        $scope.addJian=function(){
            var item={};
            $scope.CheckOrdersService.checkItemRecords.push(item);
        };
        //删除
        $scope.deleteSonArea=function(index){
            $scope.CheckOrdersService.checkItemRecords.splice(index,1);
        };
        //$scope.CheckOrdersService.taskId=$stateParams.taskDetailsIds;
        $scope.AddOrUpdateCheckOrdersService=function(taskId){
            var item={};
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                //$scope.CheckOrdersService.checkItemRecords.push(item);
                $http.post(url+'/CheckOrdersService/insertCheckOrders',{CheckOrders:$scope.CheckOrdersService}).success(function(data){
                    //$scope.CheckOrdersService.taskId= $stateParams.taskDetailsIds;
                    layer.msg('提交成功',{icon : 1,time : 2000});
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

            if( $scope.aa.checkOrders.orderState=0){
                layer.alert('检测单已经是失效状态！',{icon : 2});
                return;
            }
            $http.put(url+"/CheckOrdersService/changeCheckOrders",{CheckOrders: $scope.aa.checkOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.checkOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.checkOrders={};
        };
        //检测单上传
        $scope.CheckOrdersServicefile=function(){
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
                        $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.annex={}
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

        $scope.personOne={};
        $scope.choicePersonOne=function(person){
            $scope.personOne=person;
            $scope.index=person.custId;
            $scope.CheckOrdersService.signatory= $scope.personOne.name;
        };
        /*****************  检测单方法    *********************/

        /*****************  结算单方法    *********************/
            //新增结算工单
        $scope.SettleAccountsOrders={orderState:1,orderType:4,serviceRequestId:$scope.Tasks.serverId};

        $scope.SettleAccountsOrders.saiRecords=[{}];
        //$scope.SettleAccountsOrders.taskId=$stateParams.taskDetailsIds;
        $scope.AddOrUpdateSettleAccountsOrders=function(taskId){
            if($scope.SettleAccountsOrders.orderType==undefined)
            {
                $scope.SettleAccountsOrders.orderState = 1;
                $scope.SettleAccountsOrders.orderType =14;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/SettleAccountsOrders/insertSettleAccountsOrders',{SettleAccountsOrders:$scope.SettleAccountsOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
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
            if( $scope.aa.SettleAccountsOrders.orderState=0){
                layer.alert('结算单已经是失效状态！',{icon : 2});
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

        $scope.settleAccountsOrdersfile=function(){
            $scope.annex = {annexAddress:'',annexName:''};
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
                        $scope.SettleAccountsOrders.annexs.push($scope.annex);
                        $scope.annex={}
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        };

        //移除图片
        $scope.delPic8= function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.SettleAccountsOrders.annexs;
            $scope.SettleAccountsOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.SettleAccountsOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.person={};
        $scope.choicePersonSettle=function(person){
            $scope.person=person;
            $scope.index=person.custId;
            $scope.SettleAccountsOrders.signature= $scope.person.name;
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
            $scope.personone=person;
            $scope.ctcOrder.customerObjectId = $scope.personone.custId;
            $scope.ctcOrder.customerObjectName = $scope.personone.name;
            $scope.ctcOrder.signature = $scope.personone.name;
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
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url +'/ClaimToCustomerOrders/insertClaimToCustomerOrders',{ClaimToCustomerOrders:$scope.ctcOrder}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.annexs = [];
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
        //向业主索赔附件上传
        $scope.ctcOrdersfile=function(){
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="1";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    width            :   "550px",                 // 宽度
                    height           :   "400px",                 // 宽度
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         : ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  //是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        };


        /*****************  向业主索赔 end    *********************/
        $scope.compensateOwner={orderState:1,orderType:5,serviceRequestId: $scope.Tasks.serverId,annexs:[]};
        $scope.compensateOwner.annexs = $scope.annexs;
        $scope.compensateOwner.compensateMethods={};
        //$scope.compensateOwner.taskId=$stateParams.taskDetailsIds;


        //修改或新增处理工单
        //删除
        $scope.deleteArea=function(index){

            $scope.DisposeOrder.informationRecords.splice(index,1);
        };
        $scope.addChu=function(){
            var item={};
            $scope.DisposeOrder.informationRecords.push(item);
        };
        $scope.DisposeOrder={orderState:1,orderType:1,serviceRequestId:$scope.Tasks.serverId};
        $scope.DisposeOrder.informationRecords=[{}];
        $scope.DisposeOrder.taskId=$stateParams.taskDetailsId;
        $scope.AddOrUpdateDisposeOrder=function(taskId){
            //console.log($scope.DisposeOrder.taskId);
            var item={};
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                //$scope.DisposeOrder.informationRecords.push(item);
                //$scope.DisposeOrder.informationRecords.push( $scope.informationRecord);
                $http.post(url+'/DisposeOrder/insertDisposeOrder',{DisposeOrder:$scope.DisposeOrder}).success(function(data){
                    //console.log($scope.DisposeOrder);

                    //alert("新增成功！",
                    //    $scope.order1=false,
                    //    $scope.TasksJournal={},
                    //    $scope.TasksJournal.taskId=$stateParams.taskDetailsId,
                    //    $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                    //        alert("查询成功！");
                    //        console.log(data);
                    //        $location.path("/index/serviceRequest/taskDetails/"+$scope.TasksJournal.taskId).search({taskDetailsId:$scope.TasksJournal.taskId});
                    //        $scope.TasksJournal = data.TasksJournal;
                    //        $scope.DisposeOrder=null;
                    //    }).error(function(data,status,headers,config){
                    //        alert("查询失败！");
                    //    })
                    //);
                    $scope.DisposeOrder.taskId=$stateParams.taskDetailsId;

                    $location.path("/index/serviceRequest/taskDetails/"+$scope.DisposeOrder.taskId).search({taskDetailsId:$scope.DisposeOrder.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });
            }else{
                alert("任务不存在！");
            }
            $scope.DisposeOrder={}
        };
        /*****************  验收单方法 start   *********************/
        /**
         * 新增验收单
         */
        $scope.starCount = 0;
        $scope.getStarNum = function(num){
            var starNum = num+1;
            $("#star>span:lt("+starNum+")").css("color","red");
            $("#star>span:gt("+num+")").css("color","black");
            $scope.starCount = starNum;
        };
        //修改或新增验收工单
        $scope.AcceptanceOrders={orderState:1,orderType:2,serviceRequestId:$scope.Tasks.serverId};
        //$scope.AcceptanceOrders.taskId=$stateParams.taskDetailsIds;
        $scope.AcceptanceOrders.satisfaction = $scope.starCount;
        $scope.AcceptanceOrders.annexs=[];  //验收单
        $scope.AddOrUpdateAcceptanceOrders=function(taskId){
            if($scope.AcceptanceOrders.orderType==undefined)
            {
                $scope.AcceptanceOrders.orderState = 1;
                $scope.AcceptanceOrders.orderType =2;
            }
            if($scope.AcceptanceOrders.acceptanceItemResult=='' || $scope.AcceptanceOrders.acceptanceItemResult==null){
                layer.alert('请选择验收结果！',{icon:0});
                return;
            }
            if($scope.AcceptanceOrders.remarks==''||$scope.AcceptanceOrders.remarks==null){
                layer.alert('请填写验收说明！',{icon:0});
                return;
            }
            if($scope.AcceptanceOrders.signatory==''||$scope.AcceptanceOrders.signatory==null){
                layer.alert('请填写签字人！',{icon:0});
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/AcceptanceOrders/insertAcceptanceOrders',{AcceptanceOrders:$scope.AcceptanceOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$scope.AcceptanceOrders.taskId=$stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.AcceptanceOrders.taskId).search({taskDetailsId:$scope.AcceptanceOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.AcceptanceOrders={}
        };

        //关闭验收单
        $scope.CloseAcceptanceOrders=function(){
            if( $scope.aa.acceptanceOrders.orderState=0){
                layer.alert('验收单已经是失效状态！',{icon : 2});
                $scopeaa.acceptanceOrders.closeRemarks='';
                return;
            }
            $http.put(url+"/AcceptanceOrders/changeAcceptanceOrders",{AcceptanceOrders: $scope.aa.acceptanceOrders}).success(function(data){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.aa.acceptanceOrders.orderState=0;
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scopeaa.acceptanceOrders.closeRemarks='';
        };
        $scope.personTwo={};
        $scope.choicePerson2=function(person){
            $scope.personTwo=person;
            $scope.index=person.custId;
            $scope.AcceptanceOrders.signatory= $scope.personTwo.name;
        };
        /*****************  验收单方法    *********************/

            //赔偿给业主
        $scope.CompensateOwnerService={orderState:1,orderType:5,serviceRequestId:$scope.Tasks.serverId};
        $scope.CompensateOwnerService.compensateMethods={};
        $scope.CompensateOwnerService.taskId=$stateParams.taskDetailsId;
        $scope.AddOrUpdateCompensateOwner=function(taskId){
            //console.log($scope.CompensateOwnerService.taskId);
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/CompensateOwnerService/insertCompensateOwner',{CompensateOwner:$scope.CompensateOwnerService}).success(function(data){
                    //console.log($scope.CompensateOwnerService);
                    //alert("新增成功！",
                    //    $scope.order1=false,
                    //    $scope.TasksJournal={},
                    //    $scope.TasksJournal.taskId=$stateParams.taskDetailsId,
                    //    $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                    //        alert("查询成功！");
                    //        console.log(data);
                    //        $location.path("/index/serviceRequest/taskDetails/"+$scope.TasksJournal.taskId).search({taskDetailsId:$scope.TasksJournal.taskId});
                    //        $scope.TasksJournal = data.TasksJournal;
                    //
                    //    }).error(function(data,status,headers,config){
                    //        alert("查询失败！");
                    //    })
                    //);
                    $scope.CompensateOwnerService.taskId=$stateParams.taskDetailsId;

                    $location.path("/index/serviceRequest/taskDetails/"+$scope.CompensateOwnerService.taskId).search({taskDetailsId:$scope.CompensateOwnerService.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });
            }else{
                alert("任务不存在！");
            }
            $scope.CompensateOwnerService={};
        };
        //赔偿给业主单上传
        $scope.CompensateOwnerServicefile=function(){
            //$scope.fileState="5";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            //$scope.fileState="5";
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
                        if($scope.fileState="5"){
                            $scope.CompensateOwnerService.annexs.push($scope.annex);
                        }
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

        /*****************  表扬单方法 start   *********************/
        /**
         * 新增表扬单
         */
        $scope.PraiseOrders={orderState:1,orderType:17,serviceRequestId:"17",operatorId:"1",praiseObjectId:"1",praiseObjectName:""};
        $scope.PraiseOrders.taskId=$stateParams.taskDetailsIds;
        //$scope.PraiseOrders.taskId=localStorageItem.taskId;
        $scope.PraiseOrders.annexs=[];          //表扬单上传
        $scope.AddOrUpdatePraiseOrders=function(taskId){
            if($scope.PraiseOrders.orderType==undefined)
            {
                $scope.PraiseOrders.orderState = 1;
                $scope.PraiseOrders.orderType = 17;
            }
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                if(($scope.PraiseOrders.praiseObjectName==undefined)||($scope.PraiseOrders.praiseObjectName=='')){
                    layer.alert('表扬对象不能为空！',{icon : 0});
                    return;
                }
                if(($scope.PraiseOrders.remarks==undefined)||($scope.PraiseOrders.remarks=='')){
                    layer.alert('表扬说明不能为空！',{icon : 0});
                    return;
                }
                $scope.PraiseOrders.taskId=localStorageItem.taskId;
                $http.post(url+'/PraiseOrders/addPraiseOrder',{PraiseOrders:$scope.PraiseOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $("#zyuploadPraiseOrdersfile").hide();

                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.PraiseOrders.taskId).search({taskDetailsIds:$scope.PraiseOrders.taskId});
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
        $scope.PraiseOrdersfile1=function(){

            $scope.fileState="6";
            /*            $("#zyupload").remove();
             $("#remove").append("<div id='zyupload' class='zyupload'></div>");*/
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
                    finishDel        :   true,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                        console.log(file);
                        console.log(files);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        $scope.annex = {annexAddress:'',annexName:''};
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.$apply(function (){$scope.PraiseOrders.annexs.push($scope.annex)});

                        $scope.annex={}
                        layer.msg("上传成功",{icon : 1,time : 2000});
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("上传失败",{icon : 1,time : 2000});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        };

        $scope.PraiseOrdersfile1();
        //移除图片
        $scope.delPic5 = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.PraiseOrders.annexs;
            $scope.PraiseOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.PraiseOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.personTree={};
        $scope.choicePerson4=function(person){
            $scope.personTree=person;
            $scope.index=person.custId;

            $scope.PraiseOrders.praiseObjectName= $scope.personTree.name;
            $scope.PraiseOrders.praiseObjectId= $scope.personTree.custId;
        };
        /*****************  表扬单方法    *********************/


            //回访工单
        $scope.ReturnVisitOrders={orderState:1,orderType:7,attitude:"",completion:"",processing:""};
        $scope.ReturnVisitOrders.taskId=$stateParams.taskDetailsId;

        /********************************回访评分********************************************/
        $(document).ready(function(e) {
            $(".formItemDiff").hover(function() {
                $(this).css("background-position", "0px -555px");
                $(this).prevAll().css("background-position", "0px -555px");
                $(this).nextAll().css("background-position", "0px -575px");

                $("#pointP").html($(this).prevAll().length+1+"分");

                $scope.ReturnVisitOrders.processing=parseInt(  $(this).prevAll().length+1);
                //console.log($scope.ReturnVisitOrders.processing)

            });
        });
        $(document).ready(function(e) {
            $(".formItemDiff1").hover(function() {
                $(this).css("background-position", "0px -555px");
                $(this).prevAll().css("background-position", "0px -555px");
                $(this).nextAll().css("background-position", "0px -575px");
                $("#pointB").html($(this).prevAll().length+1+"分");
                $scope.ReturnVisitOrders.completion=parseInt( $(this).prevAll().length+1);
            });
        });
        $(document).ready(function(e) {
            $(".formItemDiff2").hover(function() {
                $(this).css("background-position", "0px -555px");
                $(this).prevAll().css("background-position", "0px -555px");
                $(this).nextAll().css("background-position", "0px -575px");
                $("#pointA").html($(this).prevAll().length+1+"分");
                $scope.ReturnVisitOrders.attitude=parseInt($(this).prevAll().length+1);
            });
        });
        /***************************************************************************************/
        $scope.AddOrUpdateReturnVisitOrders=function(taskId){
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/ReturnVisitOrders/insertReturnVisitOrders',{ReturnVisitOrders:$scope.ReturnVisitOrders}).success(function(data){
                    //console.log($scope.ReturnVisitOrders);
                    //alert("新增成功！",
                    //    $scope.order1=false,
                    //    $scope.TasksJournal={},
                    //    $scope.TasksJournal.taskId=$stateParams.taskDetailsId,
                    //    $http.get(url +'/TasksJournal/getTasksJournalbyTasksId/'+$scope.TasksJournal.taskId).success(function(data) {
                    //        alert("查询成功！");
                    //        console.log(data);
                    //        $location.path("/index/serviceRequest/taskDetails/"+$scope.TasksJournal.taskId).search({taskDetailsId:$scope.TasksJournal.taskId});
                    //        $scope.TasksJournal = data.TasksJournal;
                    //    }).error(function(data,status,headers,config){
                    //        alert("查询失败！");
                    //    })
                    //);
                    $scope.ReturnVisitOrders.taskId=$stateParams.taskDetailsId;

                    $location.path("/index/serviceRequest/taskDetails/"+$scope.ReturnVisitOrders.taskId).search({taskDetailsId:$scope.ReturnVisitOrders.taskId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });
            }else{
                alert("任务不存在！");
            }
            $scope.ReturnVisitOrders={};
        };
        //申诉单
        $scope.AppealOrders={orderState:1,orderType:8};
        $scope.AppealOrders.tasksId=$stateParams.taskDetailsId;
        $scope.AppealOrders.annexs=[];    //申诉单上传
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
               // $scope.AppealOrders.tasksId=$scope.Tasks.taskId;
                $http.post(url+'/AppealOrders/insertAppealOrders',{AppealOrders:$scope.AppealOrders}).success(function(data){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$scope.AppealOrders.tasksId=$stateParams.taskDetailsIds;

                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.AppealOrders.tasksId).search({taskDetailsId:$scope.AppealOrders.tasksId});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.AppealOrders={}
        };
        //关闭申述
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


        //新增抄电表工单
        $scope.MeterReadingOrders = {orderState:1,orderType:10};
        $scope.MeterReadingOrders.taskId=$stateParams.taskDetailsId;
        $scope.MeterReadingRecords = {};
        $scope.loadElectrics= function (address) {
            if($scope.waterMeterOrders.taskId!=null){
                $http.get(url+'/ElectricityMeterReadingData/listElectricityMeterReadingDatabyBuildingId/'+address).success(function (data) {
                    $scope.readingData = data.ElectricityMeterReadingData;
                }).error(function () {
                    layer.msg('历史读数读取失败')
                })
            }
        };
        $scope.saveMeterReadingOrders=function(){
            if($scope.Tasks.taskId==0 || $scope.Tasks.taskId==null){
                layer.msg("任务不存在！",{icon:2});
                return;
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

            if($scope.readingData[0]==null){
                layer.msg('未查询到电表',{icon:2});
                return;
            }else{
                $scope.meterReadingOrders.meterReadingRecords.meterId=$scope.readingData[0].electricityMeterId;
            }

            $scope.meterReadingOrders.annexs = $scope.annexs;
            $http.post(url
                +'/MeterReadingOrders/insertMeterReadingOrders',{MeterReadingOrders:$scope.meterReadingOrders}).success(function(data){
                //$scope.meterReadingOrders.taskId=$stateParams.taskDetailsIds;
                //$location.path("/index/serviceRequest/repairOrder/"+
                //$scope.meterReadingOrders.taskId).search({taskDetailsId:$scope.meterReadingOrders.taskId});
                $scope.load();
                layer.msg(data.Info.$);
                $scope.annexs=[];
            }).error(function(data,status,headers,config){
                layer.msg("新增失败！",{icon:0});
            });
            $scope.meterReadingOrders={};
        }
        //关闭电表单
        $scope.closeMeterReadingOrders=function(){
            if( $scope.aa.meterReadingOrders.orderState==0){
                layer.msg("电表单已经是失效状态!",{icon:0});
                $scopeaa.meterReadingOrders.closeRemarks='';
                return;
            }
            $scope.meterReadingOrder = {};
            $scope.meterReadingOrder = $scope.aa.meterReadingOrders;
            $http.put(url+"/MeterReadingOrders/closeMeterReadingOrders",{MeterReadingOrders: $scope.aa.meterReadingOrders}).success(function(data){
                layer.msg("关闭成功!",{icon:1});
                $scope.meterReadingOrder.creOrderType = $scope.meterReadingOrder.orderType;
                $scope.meterReadingOrder.operationTime = $scope.meterReadingOrder.finishTime;
                $scope.item1($scope.waterMeterOrder);
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
        //抄电表单上传
        $scope.MeterReadingOrdersFiles=function(){
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="zyupload" class="zyupload"></div>');
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

                        $scope.MeterReadingOrders.annexs.push($scope.annex);

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
        /***************查抄电表单end******************************************/

            //新增抄水表工单
        $scope.waterMeterOrders={orderState:1,orderType:9,serviceRequestId:
        $scope.Tasks.serverId,waterMeterOrderRecords:{},annexs:[]};
        $scope.waterMeterOrders.annexs = $scope.annexs;
        $scope.waterMeterOrders.taskId=$stateParams.taskDetailsIds;
        //$scope.waterMeterOrders.taskId=localStorageItem.taskId;
        $scope.loadWaters= function (address) {
            if($scope.waterMeterOrders.taskId!=null){
                $http.get(url+'/MeterReadingData/getMeterReadingsByBuildingId/'+address).success(function (data) {
                    $scope.readingData = data.MeterReadingData;
                }).error(function () {
                    layer.msg('历史读数读取失败')
                })
            }
        };
        $scope.AddOrUpdateWaterMeterOrders = function(){
            $scope.WaterMeterOrderRecords.waterMeterId = $scope.WaterMeterRecords.waterMeter.waterMeterNum;
            $scope.WaterMeterOrderRecords.waterLastReading = $scope.WaterMeterRecords.lastTimeReading;
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                if($scope.readingData[0].waterMeterId==null){
                    layer.msg('未查询到水表',{icon:2});
                    return;
                }else {
                    $scope.waterMeterOrders.waterMeterOrderRecords.waterMeterId = $scope.readingData[0].waterMeterId;
                }
                $http.post(url+'/WaterMeterOrders/insertWaterMeterOrders',{WaterMeterOrders:$scope.waterMeterOrders}).success(function(data){
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("新增失败！",{icon:2});
                });
            }else{
                layer.msg("任务不存在！",{icon:2});
            }
            $scope.waterMeterOrders={};
        }
        //关闭水表单
        $scope.closewaterMeterOrders=function(){
            if( $scope.aa.waterMeterOrders.orderState==0){
                layer.msg("水表单已经是失效状态!",{icon:0});
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
                layer.msg("水表单已经是失效状态!",{icon:0});
                return;
            }else if( $scope.aa.meterReadingOrders!=null&&$scope.aa.meterReadingOrders.orderState==0){
                layer.msg("电表单已经是失效状态!",{icon:0});
                return;
            }
            $('#'+id).modal({backdrop:'static',keyboard:false});
        };
        /***************查抄水表单 end******************************************/

        /*****************  投诉单方法 start   *********************/
        /**
         * 新增投诉单
         */
        $scope.ComplainOrders={orderState:1,orderType:11};
        $scope.ComplainOrders.taskId=$stateParams.taskDetailsIds;
        $scope.ComplainOrders.annexs=[];    //投诉单上传
        //$scope.Tasks.taskId=localStorageItem.taskId;
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
                $scope.ComplainOrders.taskId=$scope.Tasks.taskId;
                $http.post(url+'/ComplaintOrders/insertComplaintOrders',{ComplaintOrders:$scope.ComplainOrders}).success(function(){
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.msg("提交失败",{icon : 3,time : 2000});
                });
            }else{
                layer.msg("提交失败",{icon : 3,time : 2000});
            }
            $scope.ComplainOrders={}
        };
        //关闭投诉
        $scope.CloseComplaintOrders=function(){
            if($scope.aa.complaintOrders.closeRemarks==''|| $scope.aa.complaintOrders.closeRemarks==null){
                layer.alert('失效原因不能为空!',{icon:0});
                return;
            }
            if( $scope.aa.complaintOrders.orderState==0){

                layer.alert('投诉单已经是是失效状态！',{icon : 2});
                $scope.aa.complaintOrders.closeRemarks='';
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
        $scope.personFive={};
        $scope.choicePerson5=function(person){
            $scope.personFive=person;
            $scope.index=person.custId;
            $scope.ComplainOrders.complaintObjectName= $scope.personFive.name;
        };
        /*****************  投诉单方法    *********************/

        /*****************  咨询工单方法  *********************/
            //输入客户问题时改变faq检索处的值
        $scope.Faqs = {};
        $scope.changeFaqs = function(){
            var item = document.getElementById("faqquestion").value;
            $scope.Faqs = {};
            $scope.Faqs.faqQuestionName = item;
        };

        //根据客户提问查询FAQS中的数据
        $scope.getFaqs = function(){
            if($scope.Faqs.faqQuestionName == "" || angular.isUndefined($scope.Faqs.faqQuestionName)){
                $scope.FaqsList = [];
                layer.alert('请输入问题！',{icon : 0});
            }else{
                $http.post(url + '/Faqs/getFaqsByQuestionName/' + $scope.Faqs.faqQuestionName).success(function(data){
                    $scope.FaqsList = data.Faqs;
                    if( $scope.FaqsList.length==0){
                        layer.msg('查无数据！',{icon:0});
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
            }
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
        //取消新增咨询工单并关闭新增页面
        $scope.colseConsultation = function(){
            $scope.Faqs = {};
            $scope.FaqsList = [];
            $scope.ConsultationOrders = {};
            document.getElementById("faqId").value = "";
            $scope.order1=false;
        };


        //新增咨询单
        $scope.ConsultationOrders={orderState:1,orderType:12};
        $scope.ConsultationOrders.taskId=$stateParams.taskDetailsIds;
        //$scope.ConsultationOrders.operatorId = $rootScope.user.custId;
        //$scope.ConsultationOrders.taskId=localStorageItem.taskId;
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
                if(($scope.ConsultationOrders.remarks==undefined)||($scope.ConsultationOrders.remarks=='')){
                    layer.alert('处理说明不能为空！',{icon : 0});
                    return;
                }
                /* if(($scope.ConsultationOrders.remarks==undefined)||($scope.ConsultationOrders.remarks=='')){
                 layer.alert('处理说明不能为空！',{icon : 0});
                 return;
                 }*/
                $scope.ConsultationOrders.personId = localStorageItem.personId;
                $scope.ConsultationOrders.taskId=localStorageItem.taskId;
                $http.post(url+'/ConsultationOrders/insertConsultationOrders',{ConsultationOrders:$scope.ConsultationOrders}).success(function(){
                    layer.msg('新增咨询工单成功！',{icon : 1});
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.alert('新增咨询工单失败！',{icon : 2});
                });
            }else{
                layer.alert('新增咨询工单失败！',{icon : 2});
            }
            $scope.colseConsultation();
        };
        /*****************  固定车位单方法 start   *********************/
        /**
         * 新增固定车位
         */
        $scope.FixedParkingOrders={orderState:1,orderType:13};
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
            $scope.FixedParkingOrders={}
        };
        //关闭咨询
        $scope.CloseConsultationOrders=function(){

            if($scope.aa.consultationOrders.closeRemarks==''||$scope.aa.consultationOrders.closeRemarks==null){
                layer.alert('失效原因不能为空',{icon:0})
                return;
            }
            if( $scope.aa.consultationOrders.orderState==0){
                layer.alert('咨询单已经是失效状态！',{icon : 2});
                $scope.aa.consultationOrders.closeRemarks='';
                return;
            }
            $scope.consultorder = {};
            $scope.consultorder = $scope.aa.consultationOrders;
            // $scope.aa.consultationOrders.closePersonId=14;
            $scope.aa.consultationOrders.closePersonId=$scope.user.employId
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
        /*****************  固定车位单方法 start   *********************/
        /**
         * 新增固定车位
         */
        $scope.FixedParkingOrders={orderState:1,orderType:13};
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
            $scope.FixedParkingOrders={}
        };
        //关闭固定车位工单
        $scope.CloseFixedParkingOrders=function(){
            if ($scope.aa.fixedParkingOrders.closeRemarks=='' || $scope.aa.fixedParkingOrders.closeRemarks==null){
                layer.alert('失效原因不能为空！',{icon:0});
                return;
            }
            if($scope.aa.fixedParkingOrders.closePersonId=='' || $scope.aa.fixedParkingOrders.closePersonId==null){
                layer.alert('请填写失效操作人！',{icon:0});
                return;
            }
            if( $scope.aa.fixedParkingOrders.orderState==0){
                layer.alert('固定车位单已经是失效状态！',{icon : 2});
                return;
                $scope.aa.fixedParkingOrders.closeRemarks='';
                $scope.aa.fixedParkingOrders.closePersonId='';
                return;
            }
            $scope.aa.fixedParkingOrders.closePersonId=14;
            $http.put(url+"/FixedParkingOrders/closeFixedParkingOrders",{FixedParkingOrders: $scope.aa.fixedParkingOrders}).success(function(){
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.closed=true;
            }).error(function(data,status,headers,config){
                layer.msg("提交失败",{icon : 3,time : 2000});
            });
            $scope.aa.fixedParkingOrders.closeRemarks='';
            $scope.aa.fixedParkingOrders.closePersonId='';

        };
        //固定车位上传
        $scope.FixedParkingOrdersfile=function(){
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="14";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#zyupload").zyUpload({
                    /*       width            :   "900px",                 // 宽度
                     height           :   "400px",                 // 宽度*/
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
                        //BUG1901 zhuqi 2016.05.20
                        if($scope.FixedParkingOrders.annexs==null){
                            $scope.FixedParkingOrders.annexs=[];
                        }
                        $scope.$apply(function(){
                            $scope.FixedParkingOrders.annexs.push($scope.annex);
                        });
                        $scope.annex={}
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
            $scope.picItem = $scope.FixedParkingOrders.annexs;
            $scope.FixedParkingOrders.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.FixedParkingOrders.annexs.push($scope.picItem[i]);
                }
            }
        };
        /*****************  固定车位单方法    *********************/

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
            if($scope.Tasks.taskId!=0 || $scope.Tasks.taskId!=null){
                $http.post(url+'/RepairOrders/insertRepairOrders',{RepairOrders:$scope.RepairOrders}).success(function(){
                    //$scope.RepairOrders.taskId= $stateParams.taskDetailsIds;
                    //$location.path("/index/serviceRequest/repairOrder/"+$scope.RepairOrders.taskId).search({taskDetailsId:$scope.RepairOrders.taskId});
                    $scope.load();
                    $scope.annexs = [];

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
            if( $scope.aa.repairOrders.orderState==0){
                alert("维修单已经是失效状态!");
                $scope.aa.repairOrders.closeRemarks='';
                return;
            }
            $scope.repairorder = {};
            $scope.repairorder = $scope.aa.repairOrders;
            $http.put(url+"/RepairOrders/closeConsultationOrders",{RepairOrders: $scope.aa.repairOrders}).success(function(data){

                alert("关闭成功！");
                $scope.repairorder.creOrderType = $scope.repairorder.orderType;
                $scope.repairorder.operationTime = $scope.repairorder.finishTime;
                $scope.item1($scope.repairorder);
            }).error(function(data,status,headers,config){
                alert("关闭失败！");
            });
            $scope.aa.repairOrders.closeRemarks={};
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



        //新建部门质检单
        $scope.DepartmentOrders={orderState:1,orderType:6,serviceRequestId:$scope.Tasks.serverId,tasksId:$stateParams.taskDetailsId};
        $scope.addDepartmentOrders=function(){
            if($scope.Tasks.tasksId!=0 || $scope.Tasks.tasksId!=null){
                $http.post(url+'/DepartmentOrders/insertDepartmentOrders',{DepartmentOrders:$scope.DepartmentOrders}).success(function(data) {
                    alert("新增成功！");
                    console.log($scope.DepartmentOrders);
                    $scope.DepartmentOrders.tasksId=$stateParams.taskDetailsId;
                    $location.path("/index/serviceRequest/taskDetails/"+$scope.DepartmentOrders.tasksId).search({taskDetailsId:$scope.DepartmentOrders.tasksId});

                    $scope.load();
                }).error(function(data,status,headers,config){
                    alert("新增失败！");
                });
            }
        };

        //查询所有的员工
        $http.get(url + '/staff/listAllStaffRestful').success(function(data) {
            console.log(data);
            $scope.staffs = data.Staff;
        });

        $(document).ready(function(e) {
            $(".formItemDiff2").hover(function() {
                $(this).css("background-position", "0px -555px");
                $(this).prevAll().css("background-position", "0px -555px");
                $(this).nextAll().css("background-position", "0px -575px");
                $("#pointP").html($(this).prevAll().length+1+"分");
                $scope.DepartmentOrders.attitude=parseInt($(this).prevAll().length+1);
            });
        });
        $scope.CloseNew=function(index){
            if(index==1) {
                $scope.aa.consultationOrders.closeRemarks = '';//清空咨询单
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
                $scopeaa.acceptanceOrders.closeRemarks = '';//验收单
            }
        }

        //$scope.showUrgeTask = function(){
        //    $http.get(url +"/UrgeTaskRecords/getUrgeTaskRecordsbyTaskId/" + $scope.Tasks.taskId).success(function(data){
        //        $scope.UrgeTaskRecords = data.UrgeTaskRecords;
        //    }).error(function(){
        //        console.log("催促任务查询失败!");
        //    });
        //
        //}

        $scope.UrgeTask = {page:{}};
        $scope.UrgeTask.taskId = $stateParams.taskDetailsId;
        var showUrgeTask = function(page,callback) {
            $scope.UrgeTask.page=page;
            $http.post(url + '/UrgeTaskRecords/listPageUrgeTaskRecordsRestful',{UrgeTaskRecords:$scope.UrgeTask}).success(callback);
        };
        $scope.searchPaginator2=app.get('Paginator').list(showUrgeTask,10);

        $scope.ApplicationDelay = {page:{}};
        $scope.ApplicationDelay.taskId = $stateParams.taskDetailsId;
        var showApplicationDelay = function(page,callback) {
            $scope.ApplicationDelay.page=page;
            $http.post(url + '/ApplicationDelayRecords/listPageApplicationDelayRecordsRestful',{ApplicationDelayRecords:$scope.ApplicationDelay}).success(callback);
        };
        $scope.searchPaginator1=app.get('Paginator').list(showApplicationDelay,10);

        //输入客户问题时改变faq检索处的值
        $scope.Faqs = {};
        $scope.changeFaqs = function(){
            var item = document.getElementById("faqquestion").value;
            $scope.Faqs = {};
            $scope.Faqs.faqQuestionName = item;
            console.log($scope.Faqs);
        };

        //根据客户提问查询FAQS中的数据
        $scope.getFaqs = function(){
            if($scope.Faqs.faqQuestionName == "" || angular.isUndefined($scope.Faqs.faqQuestionName)){
                alert("请输入问题！");
            }else{
                $http.post(url + '/Faqs/getFaqsByQuestionName/' + $scope.Faqs.faqQuestionName).success(function(data){
                    $scope.FaqsList = data.Faqs;
                    console.log($scope.FaqsList);
                }).error(function(data){
                    console.log("error");
                });
            }
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
            console.log($scope.ConsultationOrders);
        };

        //将选中的FAQS引用进咨询单引用显示
        $scope.addFaqToConsultationOrders = function(){
            var faqidList = document.getElementsByName("faqQuestionId");
            if(faqidList.length == 0){
                alert("请先查询出FAQ后再进行引用");
            }else{
                var num = 0;
                for(var i = 0; i < faqidList.length; i ++){
                    if(document.getElementById(faqidList[i].id).checked == true){
                        for(var j = 0; j < $scope.FaqsList.length; j ++){
                            if(faqidList[i].id == $scope.FaqsList[j].faqQuestionId){
                                //console.log($scope.FaqsList[j]);
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

        //测试
        $scope.test=function(){
            var CheckOrdersService={};
            CheckOrdersService.checkItemRecords=[{checkItemName:"tao"}];
            $http.post(url+'/CheckOrdersService/insertCheckOrders',{CheckOrders:CheckOrdersService}).success(function(){
                alert("新增！");
            }).error(function(data,status,headers,config){
                alert("新增失败！");
            });
        }

    }]);
});