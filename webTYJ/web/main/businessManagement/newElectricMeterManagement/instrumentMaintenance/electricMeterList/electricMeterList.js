/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('electricMeterListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        $scope.test = '电表列表';
        var url = $rootScope.url;
        $scope.bsList = ''; //房屋全名
        $scope.asList = ''; //建筑结构id
        $scope.myDate = new Date();   // 获取当前时间

        $scope.show1=false;
        $scope.show2=false;
        $scope.show3=false;
        $scope.show4=false;
        $scope.show5=false;
        $scope.show6=false;
        $scope.show7=false;
        $scope.show8=true;
        $scope.show9=true;

        var user = {employId : ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息

        $scope.companyId = JSON.parse(sessionStorage.getItem("USER_LOGIN")).companyId;

        //显示电表列表
        $scope.searchMeter = {page: {}};
        $scope.load=function(){
            var checkElectricity = function (page, callback) {
                $scope.searchMeter.page = page;
                $http.post(url + '/ElectricityMeter/listPageElectricityMeter', {ElectricityMeter: $scope.searchMeter}).success(callback);
            };

            $scope.currentElectricity = app.get('Paginator').list(checkElectricity, 5);
            console.log($scope.currentElectricity);
        };
        $scope.load();

        $scope.checkCurrentElectricity=function(item){
            $scope.btnIndex=item;
            $scope.item2=item;
        };

   /*     *//**
         * 查询所有电表
         *//*
        $scope.compey;
        $http.get(url+'/ElectricityMeter/listAllElectricityMeter').success(function(data){
            $scope.compey=data.ElectricityMeter
            console.log(data.ElectricityMeter)
        }).error(function(data,status,headers,config){
            layer.alert("获取所有电表出错,请重试！",{icon:2});
        });
        $scope.proper;
        $http.get(url+'/Property/listPropertyAll').success(function(data){
            $scope.proper=data.Property
            //console.log(data.SubCompany)
        }).error(function(data,status,headers,config){
            layer.alert("获取所有资产出错,请重试！",{icon:2});
        });*/

        //新建电表

        //**********************新建电表******************************//
        $scope.electricty = {};              //新增电表
        $scope.addElectrictyMeter=function(){


         /*   if($scope.electricty.property.propertyName ==undefined ||$scope.electricty.property.propertyName.replace(/\s+/g,"")=="" ||$scope.electricty.property.propertyName== null){
                layer.alert('资产名不能为空！',{icon : 0});
                return;
            }else    if($scope.electricty.property.propertyNumber==undefined ||$scope.electricty.property.propertyNumber=="" ||$scope.electricty.property.propertyNumber== null){
                layer.alert('资产编号不能为空！',{icon : 0});
                return;
            }*/
         /*   if(   $scope.proper.length>0){
                for(var i=0;i<$scope.proper.length;i++) {
                    if ($scope.electricty.property.propertyNumber == $scope.proper[i].propertyNumber) {
                        layer.alert('资产编号已存在！', {icon: 0});
                        return;
                    }
                }
            }*/
            if($scope.electricty.electricityMeterNum==undefined ||$scope.electricty.electricityMeterNum=="" ||$scope.electricty.electricityMeterNum== null){
                layer.alert('表编号不能为空！',{icon : 0});
                return;
            }
            if($scope.electricty.property==undefined ||$scope.electricty.property=="" ||$scope.electricty.property== null){
                layer.alert('资产编号不能为空！',{icon : 0});
                return;
            }
            if($scope.electricty.ratio==''|| $scope.electricty.ratio==null){
                layer.msg('倍率不能为空！',{icon:0});
                return;
            }
            if($scope.electricty.min==''||$scope.electricty.min==null){
                layer.msg('最小值不能为空！',{icon:0});
                return;
            }
            if($scope.electricty.max==''||$scope.electricty.max==null){
                layer.msg('最大值不能为空！',{icon:0});
                return;
            }
           // $scope.electricty.operator = $scope.user.userId;
            $http.post(url + '/ElectricityMeter/insertElectricityMeter',{ElectricityMeter:$scope.electricty}).success(function(data){
                //layer.alert('新增电表成功！',{icon:1});
                if(data.Info.info.$=="新建失败，电表编号已存在！"){layer.msg(data.Info.info.$,{icon:2});}
                else{layer.msg(data.Info.info.$,{icon:1});}
                $scope.load();
                $("#new").modal("hide");
            }).error(function(data,status,headers,config){
                layer.alert('新增电表失败！',{icon:2});
            });
            $scope.electricty =  {};
        }
        //取消新建
        $scope.cancelElectricity=function(){
            $scope.load();
            $scope.electricty =  {};
        };
        //**********************新建电表结束******************************//

        var setting = {
            async: {
                enable: true,
                url: getUrl
            },
            check:{
                enable:true,
                chkStyle: "radio",
                chkboxType: {"Y": "p", "N": "s"},
                autoCheckTrigger: true,
                radioType: "all"
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
                onCheck:zTreeOnCheck,
                onAsyncSuccess: onAsyncSuccess,
                onAsyncError: onAsyncError
            }
        };
        function selectAll() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
        }

        function getUrl(treeId, treeNode) {
            if(treeNode!=null){
                return url+"/BuildingStructureNew/listBuildingStructureById/" + treeNode.id;
            }
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            alert("异步获取数据出现异常。");
            treeNode.icon = "";
            zTree.updateNode(treeNode);
        }
        $(document).ready(function(){
            $("#selectAll").bind("click", selectAll);
        });


        //**************显示关联****************//
        $scope.showLink = function (item) {
            if (item == null) {
                layer.msg("请选择电表", {icon: 0});
                return;
            } else if (item.state == 2) {
                layer.msg("电表正在使用中请选择其它电表", {icon: 0});
                return;
            }  else if (item.state == 3) {
                layer.msg("电表已停用请选择其它电表", {icon: 0});
                return;
            }
            else {
                $scope.show1 = true;
                $scope.show8 = false;
                $scope.show9 = false;

                $scope.currentLinkElectricity = item;
                $http.get(url + '/Property/getPropertyByIdRest/' + item.assetsId).success(function (date) {
                    //  console.log(date);
                    $scope.currentLinkElectricity.property = date.Property;
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                });
                //之前的同步加载建筑信息
                /*$http.get(url+'/BuildingStructureNew/listAllBuildingStructureNewByAllId/'+$scope.meterReadingProgramId).success(function(data){
                 $scope.zNodes =[{}];
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
                 $.fn.zTree.init($("#treeDemo1"), setting, $scope.zNodes);

                 var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                 var nodes = zTree.getNodes();
                 nodes[0].name = "建筑信息";
                 zTree.updateNode(nodes[0]);
                 }
                 }).error(function (data, status, headers, config) {
                 layer.alert("建筑信息查询失败！", {icon: 2})
                 });*/
                $http.get(url + '/Company/getCompanyInformation/' + $scope.companyId).success(function (data) {
                    $scope.zNodes = [];
                    //获取json数据
                    $scope.projectList = data.Company.projectList;
                    var tasks = $scope.projectList;
                    if(tasks!=null&&tasks.length!=null){
                        for(var i=0;i<tasks.length;i++){
                            $scope.zNode ={ id:tasks[i].projectId, name:tasks[i].projectName,checked:tasks[i].checked,isParent:true,nocheck:true};
                            $scope.zNodes.push($scope.zNode);
                        }
                        $.fn.zTree.init($("#treeDemo1"), setting, $scope.zNodes);

                        var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                        var nodes = zTree.getNodes();
                        if(nodes.length!=0){
                            nodes[0].name = "建筑信息";
                            zTree.updateNode(nodes[0]);
                        }else{
                            nodes[0]={name:'暂无数据'}
                            zTree.updateNode(nodes[0]);
                        }

                    }
                }).error(function(data,status,headers,config){
                    layer.msg("建筑信息查询失败！",{icon:2})
                });
            }
        };
        //取消
        $scope.cancelLink = function () {
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = true;
            $scope.show9 = true;
        };
        //提交
        $scope.electricityMeterRecords = {};
        $scope.saveLinkMeter = function () {
            //console.log($scope.electricityMeterRecords.state);
            if($scope.electricityMeterRecords.state==null || $scope.electricityMeterRecords.state==""){
                layer.msg('未选择表状态', {icon: 0});
                return;
            }
            if($scope.electricityMeterRecords.publicElectricity==0&&$scope.electricityMeterRecords.isBilling==0){
                layer.msg('该表不能同时既为公共用表又为计费表', {icon: 0});
                return;
            }
            $scope.electricityMeterRecords.buildingStructureId = document.getElementById("buildingStructureId").value;
            $scope.electricityMeterRecords.electricityMeterId = $scope.item2.electricityMeterId;
            $http.post(url + '/ElectricityMeterRecords/insertElectricityMeterRecords', {ElectricityMeterRecords: $scope.electricityMeterRecords}).success(function () {
                layer.msg('关联电表成功！', {icon: 1});

                $scope.load();
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = false;
                $scope.show5 = false;
                $scope.show6 = false;
                $scope.show7 = false;
                $scope.show8 = true;
                $scope.show9 = true;
            }).error(function (data, status, headers, config) {
                layer.msg('关联电表失败！', {icon: 2});
            });
        };
        //**************显示编辑****************//
        $scope.updateElectricity=function(item){
            if(item==null){
                layer.alert("请选择电表",{icon:0})
                return;
            }else {
                $scope.currentUpdateElectricity = item;
                $http.get(url+'/Property/getPropertyByIdRest/'+ item.assetsId).success(function(date){
                    //  console.log(date);
                    $scope.currentUpdateElectricity.property=date.Property;
                }).error(function(data,status,headers,config){
                    layer.alert('失败',{icon:2});
                });
                $("#new1").modal("show");
            }
        };
        $scope.saveUpdateElectricity=function(){
            if ($scope.currentUpdateElectricity.electricityMeterNum == undefined || $scope.currentUpdateElectricity.electricityMeterNum == "" || $scope.currentUpdateElectricity.electricityMeterNum == null) {
                layer.msg('表编号不能为空！', {icon: 0});
                return;
            }
            if($scope.currentUpdateElectricity.ratio==''|| $scope.currentUpdateElectricity.ratio==null){
                layer.msg('倍率不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateElectricity.min==''||$scope.currentUpdateElectricity.min==null){
                layer.msg('最小值不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateElectricity.max==''||$scope.currentUpdateElectricity.max==null){
                layer.msg('最大值不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateElectricity.property.propertyNumber==''||$scope.currentUpdateElectricity.property.propertyNumber==null){
                layer.msg('资产编号不能为空！',{icon:0});
                return;
            }
            $http.put(url+'/ElectricityMeter/updateElectricityMeter',
                {ElectricityMeter:$scope.currentUpdateElectricity}).success(function(data){
                    //layer.alert('保存修改成功',{icon:1});
                    if(data.Info.info.$=="编辑失败，电表编号已存在！"){layer.msg(data.Info.info.$,{icon:2});}
                    else{layer.msg(data.Info.info.$,{icon:1});}
                    $scope.load();
                }).error(function(data,status,headers,config){
                    layer.alert('保存修改失败',{icon:2});
                    $scope.load();
                });
        };

        //*********************显示停用****************************//
        $scope.disableElectricity = function (item) {
            if (item == null) {
                layer.msg("请选择电表", {icon: 0})
                return;
            } else if (item.state == 3) {
                layer.msg("电表已停用请选择其它电表", {icon: 0})
                return;
            } else if (item.state == 1) {
                layer.msg("电表未使用请选择其它电表", {icon: 0})
                return;
            } else {
                layer.prompt({
                    formType: 0,
                    value: '',
                    title: '请输入登入密码'

                }, function (value, index) {
                    if (value != $scope.user.passwordToSaas) {
                        layer.msg('密码错误请重新输入', {icon: 0});
                    }
                    else {
                        $scope.disMi = value;
                        $scope.disTime = null;
                        //当前月读数
                        $http.get(url + '/ElectricityMeterReadingData/listElectricityMeterReadingDatabyId/' + item.electricityMeterRecordsId).success(function (data) {
                            console.log("电表记录表的id");
                            console.log(item.electricityMeterRecordsId);
                            console.log("停用电表");
                            console.log(data);
                            console.log("停用电表");
                            $scope.disableMeter = data.ElectricityMeterReadingData;
                            console.log($scope.disableMeter);
                            console.log($scope.disableMeter[0].reading);
                            var dm = $scope.disableMeter;
                            var dar = new Date();
                            var now = dar.toLocaleDateString();
                            //now = now.replace("年","-").replace("月","-").replace("日","");
                            now = now.split('/');
                            var startDateTemp = now[0] + "-" + now[1] + "-" + now[2];
                            //time = new Date(time.replace(/-/g,"/"));
                            for (var i = 0; i < dm.length; i++) {
                                var time = new Date(dm[i].meterReadingDate).toLocaleDateString();
                                time = time.split('/')
                                var endDateTemp = time[0] + "-" + time[1] + "-" + time[2];
                                if (startDateTemp > endDateTemp & Date.parse(now[1]) - Date.parse(time[1]) == 0) {
                                    $scope.disTime = dm[i].reading;
                                    return
                                } else if (startDateTemp > endDateTemp & Date.parse(now[1]) - Date.parse(time[1]) == 1) {
                                    $scope.disTime = dm[i].reading;
                                    return
                                } else {
                                    $scope.disTime = dm[i].reading;
                                }
                            }

                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                        layer.close(index);//关闭layer弹出窗口
                        $("#disable").modal("show");
                    }
                })
            }

            //停用保存
            $scope.updateElectricityMeter = item;
            if($scope.user.userName!=undefined&&$scope.user.userName!=null&&$scope.user.userName!="") {
                $scope.updateWaterMeter.meterReadingPeople =$scope.user.userName;
            }
            else{
                $scope.updateWaterMeter.meterReadingPeople =$scope.user.loginName;
            }
           // $scope.updateElectricityMeter.meterReadingPeople = $scope.user.loginName;
            $scope.electricityMeterReadingData = {};
            $scope.electricityMeterReadingData.electricityMeterRecordId = item.electricityMeterRecordsId
            $scope.electricityMeterReadingData.buildingStructureId = item.buildingStructureId
            $scope.saveDisbleElectricityMeterDate = function () {[]
                if($scope.electricityMeterReadingData.meterReadingPeople==undefined) {
                    layer.msg('抄表人不能为空！',{icon : 0});
                    return;}
                else if($scope.electricityMeterReadingData.meterReadingDate==undefined) {
                    layer.msg('抄表年月不能为空！',{icon : 0});
                    return;}
                else if($scope.electricityMeterReadingData.reading==undefined) {
                    layer.msg('停用读数不能为空！',{icon : 0});
                    return;}
                $scope.updateElectricityMeter.reading =$scope.electricityMeterReadingData.reading;
                $scope.updateElectricityMeter.meterReadingDate =$scope.electricityMeterReadingData.meterReadingDate;
                $http.put(url + '/ElectricityMeterRecords/updateElectricityMeterRecordsrestbyNum',
                    {ElectricityMeterRecords: $scope.updateElectricityMeter}).success(function () {
                        layer.msg('停用成功', {icon: 1});
                        $scope.load();
                    }).error(function (data, status, headers, config) {
                        layer.msg('停用失败', {icon: 2});
                    });

                $scope.electricityMeterReadingData.lastMonthReading = $scope.disTime
                $http.post(url + '/ElectricityMeterReadingData/insertElectricityMeterReadingData', {ElectricityMeterReadingData: $scope.electricityMeterReadingData}).success(function () {
                    //layer.alert('新增电表成功！',{icon:1});

                    $scope.load();
                    $scope.show1 = false;
                    $scope.show2 = false;
                    $scope.show3 = false;
                    $scope.show4 = false;
                    $scope.show5 = false;
                    $scope.show6 = false;
                    $scope.show7 = false;
                    $scope.show8 = true;
                    $scope.show9 = true;
                }).error(function (data, status, headers, config) {
                    layer.alert('失败！', {icon: 2});
                });
            };
        };


        /*  关联之后对关联信息进行编辑   */
        $scope.cenceLink1 = function () {
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = true;
            $scope.show7 = false;
            $scope.show6 = false;
            $scope.show5 = false;
            $scope.show4 = false;
            $scope.show8 = false;
            $scope.show9 = false;
            $scope.loadElectricity();
        };
        //提交
        //$scope.waterMeterRecords = {};
        $scope.saveLinkMeter1 = function () {
            //console.log($scope.electricityMeterRecords.state);
            if($scope.electricityMeterList.electricityMeterRecords.state==null || $scope.electricityMeterList.electricityMeterRecords.state==""||$scope.electricityMeterList.electricityMeterRecords.state=="请选择"){
                layer.msg('未选择表状态', {icon: 0});
                return;
            }
            if($scope.electricityMeterList.publicElectricity==0&&$scope.electricityMeterList.electricityMeterRecords.isBilling==0){
                layer.msg('该表不能同时既为公共用表又为计费表', {icon: 0});
                return;
            }
            //$scope.electricityMeterList.electricityMeterRecords.buildingStructureId = document.getElementById("buildingStructureId").value;
            //$scope.electricityMeterList.electricityMeterRecords.electricityMeterId = $scope.item2.electricityMeterId;
            $scope.electricityMeterList.electricityMeterRecords.publicElectricity = $scope.electricityMeterList.publicElectricity;
            $http.put(url + '/ElectricityMeterRecords/updateElectricityMeterRecords', {ElectricityMeterRecords: $scope.electricityMeterList.electricityMeterRecords}).success(function () {
                layer.msg('编辑关联电表信息成功！', {icon: 1});

                $scope.load();
                $scope.show1 = false;
                $scope.show2 = true;
                $scope.show3 = true;
                $scope.show7 = false;
                $scope.show6 = false;
                $scope.show5 = false;
                $scope.show4 = false;
                $scope.show8 = false;
                $scope.show9 = false;
                $scope.loadElectricity();
            }).error(function () {
                layer.msg('编辑关联电表信息失败！', {icon: 2});
            });
        };

        //**************显示表数据****************//
        $scope.returnList = function () {
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.show7 = false;
            $scope.show8 = true;
            $scope.show9 = true;
        };
        $scope.btnIndex = 1;


        //显示电表详情
        $scope.showList = function (item) {
            if (item.state == 1) {
                layer.msg("请选择使用过的电表！！！", {icon: 0})
                return;
            }

            $scope.fullNAme = item.fullName;
            $scope.numB = item.electricityMeterNum;
            $scope.btnIndex = 1;
            $scope.show2 = true;
            $scope.show3 = true;
            $scope.show7 = false;
            $scope.show6 = false;
            $scope.show5 = false;
            $scope.show4 = false;
            $scope.show8 = false;
            $scope.show9 = false;

            $scope.electricityMeterList;
            $scope.loadElectricity = function () {
                //查询电表信息
                $http.get(url + '/ElectricityMeter/getElectricityMeterbyElectricityMeterId/' + item.electricityMeterId).success(function (date) {
                    console.log(date);
                    date.ElectricityMeter.electricityMeterRecords.state = date.ElectricityMeter.electricityMeterRecords.state + '';
                    date.ElectricityMeter.electricityMeterRecords.readingWay = date.ElectricityMeter.electricityMeterRecords.readingWay + '';
                    date.ElectricityMeter.electricityMeterRecords.usingNature = date.ElectricityMeter.electricityMeterRecords.usingNature + '';
                    date.ElectricityMeter.electricityMeterRecords.isBilling = date.ElectricityMeter.electricityMeterRecords.isBilling + '';
                    $scope.electricityMeterList = date.ElectricityMeter;
                    $scope.electricityMeterList.electricityMeterRecords.installationTime = new Date($scope.electricityMeterList.electricityMeterRecords.installationTime)
                    //console.log($scope.electricityMeterList.electricityMeterRecords);
                    //})
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                });
            };
            $scope.loadElectricity();
            $scope.listElectricityMeterRecords;
            $scope.doClick = function (index) {
                $scope.btnIndex = index;
                if (index == 1) { //表数据
                    $scope.show2 = true;
                    $scope.show3 = true;
                    $scope.show7 = false;
                    $scope.show6 = false;
                    $scope.show5 = false;
                    $scope.show4 = false;
                    $scope.show8 = false;
                    $scope.show9 = false;
                    $scope.electricityMeterList;
                    $scope.loadElectricity();

                } else if (index == 2) { //抄表历史
                    $scope.show2 = true;
                    $scope.show4 = true;
                    $scope.show3 = false;
                    $scope.show5 = false;
                    $scope.show6 = false;
                    $scope.show7 = false;
                    $scope.show8 = false;
                    $scope.show9 = false;

                    $scope.year;
                    $scope.year = $scope.myDate.getYear() + 1900;
                    $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                        console.log(date);
                        $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                    $scope.left = function (index) {
                        $scope.year = index - 1;
                        $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                            console.log(date);
                            $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                    };
                    $scope.right = function (index) {
                        // alert($scope.myDate.getYear());
                        if (index < $scope.myDate.getYear() + 1900) {
                            $scope.year = index + 1;
                        } else {
                            layer.msg("无法查询明年信息", {icon: 0});
                        }
                        $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                            console.log(date);
                            $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                    };
                } else if (index == 3) {//修正数据
                    $scope.show2 = true;
                    $scope.show5 = true;
                    $scope.show4 = false;
                    $scope.show3 = false;
                    $scope.show6 = false;
                    $scope.show7 = false;
                    $scope.show8 = false;
                    $scope.show9 = false;
                    $scope.year;
                    $scope.year = $scope.myDate.getYear() + 1900;
                    $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                        console.log(date);
                        $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                    $scope.left = function (index) {
                        $scope.year = index - 1;
                        $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                            console.log(date);
                            $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                    };
                    $scope.right = function (index) {
                        // alert($scope.myDate.getYear());
                        if (index < $scope.myDate.getYear() + 1900) {
                            $scope.year = index + 1;
                        } else {
                            layer.msg("无法查询明年信息", {icon: 0});
                        }
                        $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                            console.log(date);
                            $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                    };


                    $scope.checkMeter = function (itt) {
                        $scope.btnIndex = itt;
                        $scope.correctedReading = {};
                        $scope.correctedReading.electricityMeterReadingDataId = itt.electricityMeterReadingDataId;
                        $scope.correctedReading.electricityMeterId = itt.electricityMeterId;
                        $scope.correctedReading.annexs = [];
                        $scope.inestCorrected = function () {
                            if (itt == null) {
                                layer.msg("请选择修正数据", {icon: 0});
                                return;
                            }
                            $http.post(url + '/CorrectedReading/addElectricityMeterCorrectRead', {CorrectedReading: $scope.correctedReading}).success(function () {
                                layer.msg('修改成功！', {icon: 1});

                                $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByElectricityMeterId/' + item.electricityMeterId + '/' + $scope.year).success(function (date) {
                                    console.log(date);
                                    $scope.listElectricityMeterRecords = date.ElectricityMeterRecords;
                                }).error(function (data, status, headers, config) {
                                    layer.msg('失败', {icon: 2});
                                });
                            }).error(function (data, status, headers, config) {
                                layer.msg('失败！', {icon: 2});
                            });
                        }

                        $scope.fileUrl = $rootScope.fileUrl;    //上传的文件路径
                        var filePath = '';          //上传文件的路径
                        $scope.annex = {
                            annexAddress: '',
                            annexName: '',
                            relationId: ''
                        };
                        $scope.upCorrected = function () {


                            $(function () {
                                $("#remove1").html('');
                                $("#remove1").append('<div id="excelupload1" class="zyupload"></div>');
                                // 初始化插件
                                $("#excelupload1").zyUpload({
                                    itemWidth: "140px",                 // 文件项的宽度
                                    itemHeight: "115px",                 // 文件项的高度
                                    url: $scope.fileUrl + "/FileService",  // 上传文件的路径
                                    fileType: ["xls", "docx", "xlsx", "pdf", "txt", "doc", "ppt"],// 上传文件的类型
                                    fileSize: 51200000,                // 上传文件的大小
                                    multiple: true,                    // 是否可以多个文件上传
                                    dragDrop: true,                    // 是否可以拖动上传文件
                                    tailor: true,                    // 是否可以裁剪图片
                                    del: true,                    // 是否可以删除文件
                                    finishDel: false,  				  // 是否在上传文件完成后删除预览
                                    /* 外部获得的回调接口 */
                                    onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                                        //console.info(selectFiles);
                                    },
                                    onDelete: function (file, files) {
                                        //console.info(file.name);
                                    },
                                    onSuccess: function (file, response) {          // 文件上传成功的回调方法
                                        filePath = response;
                                        $scope.annex.annexAddress = filePath;
                                        $scope.annex.annexName = file.name;
                                        $scope.correctedReading.annexs.push($scope.annex);
                                        //  console.info(filePath);
                                        $scope.annex = {}
                                    },
                                    onFailure: function (file, response) {          // 文件上传失败的回调方法
                                        layer.msg("此文件上传失败：", {icon: 2});
                                        //console.info(file.name);
                                    },
                                    onComplete: function (response) {           	  // 上传完成的回调方法
                                        //console.info("文件上传完成");
                                        //console.info(response);
                                    }
                                });

                            });
                        };
                    };
                }
                else if (index == 4) {//水表的换表记录
                    $scope.show2 = true;
                    $scope.show6 = true;
                    $scope.show7 = false;
                    $scope.show5 = false;
                    $scope.show4 = false;
                    $scope.show3 = false;
                    $scope.show8 = false;
                    $scope.show9 = false;
                    $scope.electricityMeterReading;
                    $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsByIds/' + item.buildingStructureId).success(function (date) {
                        console.log(date);
                        $scope.electricityMeterReading = date.ElectricityMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                } else if (index == 5) {//历史用表
                    $scope.show2 = true;
                    $scope.show7 = true;
                    $scope.show6 = false;
                    $scope.show5 = false;
                    $scope.show4 = false;
                    $scope.show3 = false;
                    $scope.show8 = false;
                    $scope.show9 = false;
                    $scope.electricityMeterState;
                    $http.get(url + '/ElectricityMeterRecords/listElectricityMeterRecordsbybuildigId/' + item.buildingStructureId).success(function (date) {
                        console.log(date);
                        $scope.electricityMeterState = date.ElectricityMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                }

            };
        }


        /**
         * 导入Excel数据文档
         */
        $scope.fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.annex={
            annexAddress:'',
            annexName:'',
            relationId:''
        };
        $scope.inportExcel = function(){
            $scope.fileState="1";

            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload").zyUpload({
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :    $scope.fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                        //console.info(selectFiles);
                    },
                    onDelete: function(file, files){
                        //console.info(file.name);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.annex.companyId = $scope.user.companyId;
                        $http.post(url + "/ElectricityMeter/importExcelFileElectricityMeter",{Annex:$scope.annex}).success(function(data){
                            //   console.log(data);
                           // layer.alert(data.Info.info.$,{icon:1});
                            if(data.Info.info.$=="数据导入失败!"){layer.msg(data.Info.info.$,{icon:2});}
                            else{layer.msg(data.Info.info.$,{icon:1});}
                            $scope.load();
                        });
                        //  console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.alert("此文件上传失败：",{icon : 1});
                        //console.info(file.name);
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                        //console.info("文件上传完成");
                        //console.info(response);
                    }
                });

            });
        };

    }]);
});
function zTreeOnCheck() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo1");
    var nodes = treeObj.getCheckedNodes(true);
    var treeResult = {treeList: []};
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isParent == false) {
            treeResult.treeList.push(nodes[i]);
        }
    }
    var bsList = treeResult.treeList[0].fullname;
    var asList = treeResult.treeList[0].id;
    console.log(bsList);
    document.getElementById("classifyName").value = bsList;
    document.getElementById("buildingStructureId").value = asList;
}
/**
 *
 * 异步加载成功的函数
 * @param event
 * @param treeId
 * @param treeNode
 * @param msg
 */
function onAsyncSuccess(event, treeId, treeNode, msg) {
    if (!msg || msg.length == 0) {
        return;
    }
    try{
        var buildingStructureNews = JSON.parse(msg).BuildingStructureNew;
    }catch (err){
        return;
    }
    var childrenNode = [];
    if (buildingStructureNews != null) {
        for (var i = 0; i < buildingStructureNews.length; i++) {
            var zNode = {
                id: buildingStructureNews[i].id,
                pId: buildingStructureNews[i].projectId,
                name: buildingStructureNews[i].nodeName,
                fullname: buildingStructureNews[i].fullName,
                //checked: buildingStructureNews[i].checked,
                isParent: buildingStructureNews[i].checked
            };
            if(buildingStructureNews[i].checked){
                zNode.nocheck = true;
            }
            childrenNode.push(zNode);
        }
    }
    var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
    zTree.removeNode(treeNode.children[0]);
    zTree.addNodes(treeNode, childrenNode);
    zTree.updateNode(treeNode);

}