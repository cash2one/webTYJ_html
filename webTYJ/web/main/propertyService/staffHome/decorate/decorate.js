/**
 * Created by NM on 2018/1/18.
 * 装修js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('decorateCtrl', ['$scope', '$http','$rootScope','$location','$stateParams', function ($scope,$http,$rootScope,$location,$stateParams) {

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
         * 显示新建方案
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
         * 显示新建方案
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
         * 显示新建方案
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
         * 显示新建方案
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
         * 显示新建方案
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
         * 显示新建方案
         */
        $scope.workProgress = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = true;
            $scope.show7 = false;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.addCheck = function(taskId){
            $http.get(url+'/RenovationInspectionOrders/getRenovationInspectionOrdersbyTypeAndTaskId/15/'+taskId).success(function(data){

                $scope.RenovationInspectionOrders=data.RenovationInspectionOrders;
                console.log("1111111122222")
                console.log($scope.RenovationInspectionOrders)
                console.log("11111111")
            }).error(function(data,status,headers,config){

            });
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = true;
            $scope.show8 = false;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
         */
        $scope.acceptance = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = true;
            $scope.show9 = false;
        };
        /**
         * 显示新建方案
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

        /*******************************选择房屋************************************************/
            //加载房屋信息
        $scope.search.custId=$rootScope.user.custId;
        $scope.search.projectType='07a3ec0e-0d22-48b4-9659-68867aab43e6';//授权项目类型ID
        $http.post(url+'/HouseNew/listAllHouseNewBySearch',{Search:$scope.search}).success(function(data)
        {
            $scope.HouseNew=data.HouseNew;


        }).error(function(data,status,headers,config){
            layer.alert('查询失败',{icon : 0});
        });

        /**
         * 核实选中一条数据事件
         * @param item 房屋信息
         */
        $scope.hose={};
        $scope.check = function(item){
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

            $scope.hose=item;


            $http.get(url+'/InspectorOrder/getInspectorOrderBySRId/'+$scope.hose.buildingStructureId).success(function(data){
                $scope.zhuJian=data;

                console.log(data)
            }).error(function(data,status,headers,config){
                layer.alert('查询失败',{icon : 0});
            });


            $http.get(url+'/Tasks/getTasksbyAddressIdAndType/4/'+$scope.hose.buildingStructureId).success(function(data){

                $scope.xunJian=data.Tasks;

                console.log(data)
            }).error(function(data,status,headers,config){

            });


            /*************************************申请资料********************************************/
            /**
             * 查询所有的公司信息
             */
            $scope.enterpriseCustNew={};
            $http.get(
                url + '/EnterpriseCustNew/listAllEnterpriseCustNewRestful', {
                    EnterpriseCustNew:$scope.enterpriseCustNew
                }).success(function(data) {
                    $scope.enterpriseCustNew = data.EnterpriseCustNew;

                    //for(var i=0;$scope.enterpriseCustNew.length;i++){
                    //       console.log($scope.enterpriseCustNew[i].enterpriseId);
                    //
                    //    //$scope.selectPersonCustNew($scope.enterpriseCustNew[i].enterpriseId)
                    //
                    //}

                }).error(function(data, status, headers, config) {
                    alert("人员信息获取失败");
                });


            /**
             * 根据企业ID查询企业下员工信息
             */
                //   $scope.OwnerRenovationApply.decorateAssociatedRecords={};

            $scope.change11=function(decorateId){
                // var decorateId=$scope.OwnerRenovationApply.decorateAssociatedRecords.decorateId;
                $http.get(url + '/PersonCustNew/findEnterpriseCustByIdRestful/'+decorateId).success(function(data) {
                    $scope.PersonCustNew = data.PersonCustNew;


                }).error(function(data, status, headers, config) {
                    //alert("人员信息获取失败");
                });

                $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+decorateId).success(function(data) {
                    $scope.EnterpriseCustNew = data.EnterpriseCustNew;
                    console.log($scope.EnterpriseCustNew);
                }).error(function(data, status, headers, config) {
                    //alert("人员信息获取失败");
                });
            };

            //新增员工
            $scope.updateRollOut=function(decorateId){
                $scope.PersonCustNew={};
                $http.post(url+'/PersonCustNew/insertPersonCustNewRestful1/'+decorateId,{PersonCustNew:$scope.PersonCustNew}).success(function(data)
                {
                    layer.msg("添加成功",{icon : 1,time : 2000});
                }).error(function(data, status, headers, config){
                    layer.msg("新增失败",{icon : 3,time : 2000});
                });
                $scope.PersonCustNew={};
            };

            //$scope.selectPersonCustNew =function(args){
            //    $http.get(url + '/PersonCustNew/findEnterpriseCustByIdRestful/'+args).success(function(data) {
            //        $scope.PersonCustNew = data.PersonCustNew;
            //        console.log($scope.PersonCustNew);
            //    }).error(function(data, status, headers, config) {
            //        //alert("人员信息获取失败");
            //    });
            //};

            $scope.Task={
                addressId:$scope.hose.buildingStructureId,
                customerId:$rootScope.user.custId,
                taskType:18
            };
            $scope.ServiceRequest={
                customerId:$rootScope.user.custId,
                serviceRequestName:"业主装修",
                directionType:1,
                serviceRequestType:1,
                importantEvent:1,
                anxious:0,
                writerId:$stateParams.CustSerId,
                remarks:"业主装修",
                tasks:$scope.Task
            };
            $scope.decorateComponentRecordsList={
                componentId:""
            };

            $scope.decoratePersonnelAssociatedList={
                personnelId:66,
                personnelName:"zhangshan",
                personnelPhone:133616534999
            };
            $scope.decoreateDiscloseInformationList={
                fileType1:"1",
                fileAddress:"",
                fileName:""
            };
            //新增申请

            $scope.OwnerRenovationApply={custId:$rootScope.user.custId,applyType:2,serviceRequest:$scope.ServiceRequest,decorateComponentRecordsList: $scope.decorateComponentRecordsList
                ,decoratePersonnelAssociatedList:$scope.decoratePersonnelAssociatedList,decoreateDiscloseInformationList: $scope.decoreateDiscloseInformationList
            };

            //获取人员信息
            $http.get(url + "/staff/listAllStaffRestful").success(function(data){
                $scope.staffs = data.Staff;
            }).error(function(data,status,headers,config){
                layer.alert('获取人员信息失败,请稍后重试',{icon : 0});
            });



            $scope.OwnerRenovationApply.custId=$rootScope.user.custId;
            $scope.addDecorate=function(){
                $http.post(url+'/OwnerRenovationApply/insertOwnerRenovationApply',{OwnerRenovationApply:$scope.OwnerRenovationApply}).success(function(data)
                {
                    $scope.ServiceRequest=data.OwnerRenovationApply.serviceRequest;

                    $http.get(url+'/Tasks/getTasksbyTaskTypeAndServiceId/18/'+$scope.ServiceRequest.serviceRequestId).success(function(data){

                        $scope.heCha=data.Tasks;
                        console.log(  "222222222222222");
                        console.log(  $scope.heCha);
                        console.log(  "222222222222222");
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
                    console.log("********************************");
                    //$scope.Tasks= $scope.ServiceRequest.tasks;
                    console.log( $scope.ServiceRequest);
                    //console.log( $scope.Tasks);
                    console.log("********************************");
                    console.log("**222222");
                    //console.log( $scope.Tasks);
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
                    console.log("//////////**********"+$rootScope.user.custId);
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
            /*************************************申请资料end********************************************/




            /***************************************装修巡检****************************************************/

            $scope.currentEditIndex1=null;      //当前编辑框(初始为空)
            $scope.editArea1=false;
            $scope.currentBuilding1={
                areaNew1:[
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
            $scope.currentEditArea1={};

            /**
             *  修改按钮点击事件
             * @param index  行下标
             */
            $scope.updateItem1=function(index){
                $scope.editArea1=true;
                $scope.currentEditIndex1=index;
                var current=$scope.currentBuilding1.areaNew1[index];
                $scope.currentEditArea1={
                    inspectName:current.inspectName,
                    conduct:current.conduct,
                    normal:current.normal
                };
            };
            /**
             * 修改保存
             * @param index 行下标
             */
            $scope.updateSave1=function(index){
                $scope.tenementPact[index].editing=false;
            };
            /**
             * 取消
             * @param index 行下标
             */
            $scope.updateCancel1=function(index){
                $scope.tenementPact[index]=$scope.cloneItem;
                $scope.tenementPact[index].editing=false;
            };
            /**
             * 删除数据
             * @param index 行下标
             */
            $scope.deleteItem1=function(index){
                $scope.currentBuilding1.areaNew1.splice(index,1);
            };
            /**
             * 新增按钮事件
             */
            $scope.addItem1=function(){
                $scope.editArea1=true;
                $scope.currentEditIndex1=null;
            };
            /**
             * 新增保存功能
             */
            $scope.addSave1=function(){
                if($scope.currentEditIndex1!=null){
                    $scope.currentBuilding1.areaNew1[$scope.currentEditIndex1]={
                        inspectName:$scope.currentEditArea1.inspectName,
                        conduct:$scope.currentEditArea1.conduct,
                        normal:$scope.currentEditArea1.normal
                    };
                }
                else{
                    $scope.currentBuilding1.areaNew1.push({
                        inspectName:$scope.currentEditArea1.inspectName,
                        conduct:$scope.currentEditArea1.conduct,
                        normal:$scope.currentEditArea1.normal
                    });
                }
                $scope.currentEditArea1={};
                $scope.editArea1=false;
                $scope.RenovationInspectionOrders.renovationInspectionRecords = $scope.currentBuilding1.areaNew1;
            };
            /**
             * 新增取消
             */
            $scope.addCancel1=function(){
                $scope.editArea1=false;
            };

            //新增装修巡检工单
            //是否建议发函
            $scope.currentLetter1 = [
                {letterName:"《装修整改通知》",whetherLetter:0},
                {letterName:"《装修违约通知书》",whetherLetter:0},
                {letterName:"《装修违约罚款通知》",whetherLetter:0},
                {letterName:"《装修停工通知》",whetherLetter:0}
            ];
            //新增装修巡检单
            $scope.RenovationInspectionOrders={orderState:1,orderType:15,architecturalDesign:1,waterPipeDesign:1,circuitDesign:1,renovationInspectionRecords:[],letterRecords:[]};
            $scope.RenovationInspectionOrders.letterRecords = $scope.currentLetter1;
            $scope.RenovationInspectionOrders.renovationInspectionRecords = $scope.currentBuilding1.areaNew1;
            $scope.addRenovationInspectionOrders=function(){
                $http.post(url+'/RenovationInspectionOrders/insertRenovationInspectionOrders',{RenovationInspectionOrders:$scope.RenovationInspectionOrders}).success(function(data)
                {
                    $scope.RenovationInspectionOrders=data.RenovationInspectionOrders;
                    layer.msg("新增成功",{icon :1,time : 2000});


                }).error(function(data,status,headers,config){
                    layer.msg("新增失败",{icon :3,time : 2000});
                });
                //查询所有巡检工单
                $http.get(url+'/RenovationInspectionOrders/listAllRenovationInspectionOrders/').success(function(data){
                    $scope.rio=data;
                }).error(function(data,status,headers,config){
                    layer.msg("查询失败",{icon :3,time : 2000});
                });
                $scope.RenovationInspectionOrders={};
                $scope.currentBuilding1={
                    areaNew1:[
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
                $scope.currentLetter1 = [
                    {letterName:"《装修整改通知》",whetherLetter:0},
                    {letterName:"《装修违约通知书》",whetherLetter:0},
                    {letterName:"《装修违约罚款通知》",whetherLetter:0},
                    {letterName:"《装修停工通知》",whetherLetter:0}
                ];
            };



            /***************************************装修巡检end****************************************************/

            /****************************************装修验收*****************************************************/
            $scope.currentEditIndex2=null;      //当前编辑框(初始为空)
            $scope.editArea2=false;
            $scope.currentBuilding2={
                areaNew2:[
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
            $scope.currentEditArea2={};

            /**
             *  修改按钮点击事件
             * @param index  行下标
             */
            $scope.updateItem2=function(index){
                $scope.editArea2=true;
                $scope.currentEditIndex2=index;
                var current=$scope.currentBuilding2.areaNew2[index];
                $scope.currentEditArea2={
                    inspectName:current.inspectName,
                    conduct:current.conduct,
                    normal:current.normal
                };
            };
            /**
             * 修改保存
             * @param index 行下标
             */
            $scope.updateSave2=function(index){
                $scope.tenementPact[index].editing=false;
            };
            /**
             * 取消
             * @param index 行下标
             */
            $scope.updateCancel2=function(index){
                $scope.tenementPact[index]=$scope.cloneItem;
                $scope.tenementPact[index].editing=false;
            };
            /**
             * 删除数据
             * @param index 行下标
             */
            $scope.deleteItem2=function(index){
                $scope.currentBuilding2.areaNew2.splice(index,1);
            };
            /**
             * 新增按钮事件
             */
            $scope.addItem2=function(){
                $scope.editArea2=true;
                $scope.currentEditIndex2=null;
            };
            /**
             * 新增保存功能
             */
            $scope.addSave2=function(){
                if($scope.currentEditIndex2!=null){
                    $scope.currentBuilding2.areaNew2[$scope.currentEditIndex2]={
                        inspectName:$scope.currentEditArea2.inspectName,
                        conduct:$scope.currentEditArea2.conduct,
                        normal:$scope.currentEditArea2.normal
                    };
                }
                else{
                    $scope.currentBuilding2.areaNew2.push({
                        inspectName:$scope.currentEditArea2.inspectName,
                        conduct:$scope.currentEditArea2.conduct,
                        normal:$scope.currentEditArea2.normal
                    });
                }
                $scope.currentEditArea2={};
                $scope.editArea2=false;
                $scope.RenovationAcceptanceOrders.renovationAcceptanceRecords = $scope.currentBuilding2.areaNew2;
            };
            /**
             * 新增取消
             */
            $scope.addCancel2=function(){
                $scope.editArea2=false;
            };

            //是否建议发函
            $scope.currentLetter2 = [
                {letterName:"《装修整改通知》",whetherLetter:0},
                {letterName:"《装修违约通知书》",whetherLetter:0},
                {letterName:"《装修违约罚款通知》",whetherLetter:0},
                {letterName:"《装修停工通知》",whetherLetter:0}
            ];
            //新增装修验收单
            $scope.RenovationAcceptanceOrders={orderState:1,orderType:16,architecturalDesign:1,waterPipeDesign:1,circuitDesign:1, renovationAcceptanceRecords:[],letterRecords:[]};
            $scope.RenovationAcceptanceOrders.letterRecords = $scope.currentLetter2;
            $scope.RenovationAcceptanceOrders.renovationAcceptanceRecords = $scope.currentBuilding2.areaNew2;
            $scope.addRenovationAcceptanceOrders = function(){

                $http.post(url+'/RenovationAcceptanceOrders/insertRenovationAcceptanceOrders',{RenovationAcceptanceOrders:$scope.RenovationAcceptanceOrders}).success(function(data){

                    layer.msg("新增成功",{icon : 1,time : 2000});
                    $scope.RenovationAcceptanceOrders=data.RenovationAcceptanceOrders;

                    $http.get(url+'/RenovationAcceptanceOrders/getRenovationAcceptanceOrdersbyId/'+$scope.RenovationAcceptanceOrders.orderId).success(function(data){
                        $scope.RenovationAcceptanceOrders=data.RenovationAcceptanceOrders;

                    }).error(function(data,status,headers,config){
                        layer.alert('"搜索失败，自己填充数据"',{icon : 0});
                    });


                }).error(function(data,status,headers,config){
                    layer.msg("新增失败",{icon : 3,time : 2000});
                });
                console.log($scope.RenovationAcceptanceOrders);
                $scope.RenovationAcceptanceOrders={};
                $scope.currentBuilding2={
                    areaNew2:[
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
                $scope.currentLetter2 = [
                    {letterName:"《装修整改通知》",whetherLetter:0},
                    {letterName:"《装修违约通知书》",whetherLetter:0},
                    {letterName:"《装修违约罚款通知》",whetherLetter:0},
                    {letterName:"《装修停工通知》",whetherLetter:0}
                ];
            };

            /****************************************装修验收end*************************************************/


            /********************************************附件上传*************************************/

            var fileUrl=$rootScope.fileUrl;    //上传的文件路径
            var filePath='';          //上传文件的路径

            $scope.OwnerRenovationApply.decorateAnnexList=[];
            $scope.decorateAnnexList={
                drawingType1:"0",
                drawingType2:"0",
                annexAddress:"",
                annexName:""
            };
            //$scope.updateRollOut=function(){
            //    $("#zyupload").unbind();
            //}

            //建筑图纸原型
            $scope.OwnerRenovationApplyDrawing=function(){
                $scope.decorateAnnexList={
                    drawingType1:"0",
                    drawingType2:"0",
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
                        /* 外部获得的回调接口 */
                        onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                        },
                        onDelete: function(file, files){

                        },
                        onSuccess: function(file, response){          // 文件上传成功的回调方法

                            filePath=response;
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });

            };
            //水路图纸原型
            $scope.OwnerRenovationApplyDrawing1=function(){
                $scope.decorateAnnexList={
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
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });

            }
            //电路图纸原型
            $scope.OwnerRenovationApplyDrawing2=function(){
                $scope.decorateAnnexList={
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
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });
            }

            //建筑图纸设计
            $scope.OwnerRenovationApplyDrawingT=function(){
                $scope.decorateAnnexList={
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
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);
                            console.info(filePath);
                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });
            }
            //水路图纸设计
            $scope.OwnerRenovationApplyDrawingT1=function(){
                $scope.decorateAnnexList={
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
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });
            };
            //电路图纸设计
            $scope.OwnerRenovationApplyDrawingT2=function(){
                $scope.decorateAnnexList={
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
                            $scope.decorateAnnexList.annexAddress=filePath;
                            $scope.decorateAnnexList.annexName=file.name;
                            $scope.OwnerRenovationApply.decorateAnnexList.push($scope.decorateAnnexList);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });

                });
            }

            $scope.RenovationInspectionOrders={};
            $scope.RenovationInspectionOrders.annexs=[];    //巡检上传
            $scope.annex={
                annexAddress:'',
                annexName:'',
                relationId:''
            };
            //巡检单上传
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

                        },
                        onDelete: function(file, files){

                        },
                        onSuccess: function(file, response){          // 文件上传成功的回调方法

                            filePath=response;
                            $scope.annex.annexAddress=filePath;
                            $scope.annex.annexName=file.name;
                            $scope.RenovationInspectionOrders.annexs.push($scope.annex);
                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });
                });
            };
            $scope.RenovationAcceptanceOrders={};
            $scope.RenovationAcceptanceOrders.annexs=[];    //验收单上传
            $scope.annex={
                annexAddress:'',
                annexName:'',
                relationId:''
            };
            //验收单上传
            $scope.acceptanceAdd=function(){
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
                            $scope.annex.annexAddress=filePath;
                            $scope.annex.annexName=file.name;
                            $scope.RenovationAcceptanceOrders.annexs.push($scope.annex);

                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法

                        },
                        onComplete: function(response){           	  // 上传完成的回调方法

                        }
                    });
                });
            };
            $scope.OwnerRenovationApply.decoreateDiscloseInformationList=[];

            $scope.decoreateDiscloseInformationList={
                fileType1:"1",
                fileAddress:"",
                fileName:""
            };



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
            }

        };

        /*******************************选择房屋end************************************************/

        /********************************************附件上传**********************************************/

    }]);
});