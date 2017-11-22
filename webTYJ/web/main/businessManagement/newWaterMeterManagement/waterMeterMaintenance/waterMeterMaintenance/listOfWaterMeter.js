/**
 * Created by Administrator on 2015/12/15.
 */
'use strict';
define(function (require) {
    var app = require('../../../../../app');
    app.controller('listOfWaterMeterCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        console.log($scope.user);
        $scope.test = '水表列表';
        var url = $rootScope.url;
        $scope.bsList = ''; //房屋全名
        $scope.asList = ''; //建筑结构id
        $scope.myDate = new Date();   // 获取当前时间
        $scope.show1 = false;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.show4 = false;
        $scope.show5 = false;
        $scope.show6 = false;
        $scope.show7 = false;
        $scope.show8 = true;
        $scope.show9 = true;

        $scope.currentPeople = [];                    //所有操作人
        var user = {employId : ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息

        $scope.companyId = JSON.parse(sessionStorage.getItem("USER_LOGIN")).companyId;

        //**********************显示水表列表**************************//
        $scope.searchMeter = {page: {}};
        $scope.load = function () {
            var checkWater = function (page, callback) {
                $scope.searchMeter.page = page;
                $http.post(url + '/WaterMeter/listPageWaterMeter', {WaterMeter: $scope.searchMeter}).success(callback);
            };
            $scope.currentWater = app.get('Paginator').list(checkWater, 5);
            console.log($scope.currentWater);
        };
        $scope.load();
        $scope.checkCurrentWater = function (item) {
            $scope.btnIndex = item;
            $scope.item2 = item;
        };

        //**********************新建水表******************************//

        $scope.currentAddWater = {};              //新增水表
        $scope.saveAddWater = function () {
            /*if($scope.currentAddWater.property.propertyName ==undefined ||$scope.currentAddWater.property.propertyName.replace(/\s+/g,"")=="" ||$scope.currentAddWater.property.propertyName== null){
             layer.alert('资产名不能为空！',{icon : 0});
             return;
             }else    if($scope.currentAddWater.property.propertyNumber==undefined ||$scope.currentAddWater.property.propertyNumber=="" ||$scope.currentAddWater.property.propertyNumber== null){
             layer.alert('资产编号不能为空！',{icon : 0});
             return;
             }else    */
            if ($scope.currentAddWater.waterMeterNum == undefined || $scope.currentAddWater.waterMeterNum == "" || $scope.currentAddWater.waterMeterNum == null) {
                layer.msg('表编号不能为空！', {icon: 0});
                return;
            }
            /*else    if($scope.currentAddWater.property.expirationDate==undefined ||$scope.currentAddWater.property.expirationDate=="" ||$scope.currentAddWater.property.expirationDate== null){
             layer.alert('资产保质期不能为空！',{icon : 0});
             return;
             }*/
            if ($scope.currentAddWater.property == undefined || $scope.currentAddWater.property== "" || $scope.currentAddWater.property == null) {
                layer.msg('资产编号不能为空！', {icon: 0});
                return;
            }
            if($scope.currentAddWater.ratio==''|| $scope.currentAddWater.ratio==null){
                layer.msg('倍率不能为空！',{icon:0});
                return;
            }
            if($scope.currentAddWater.min==''||$scope.currentAddWater.min==null){
                layer.msg('最小值不能为空！',{icon:0});
                return;
            }
            if($scope.currentAddWater.max==''||$scope.currentAddWater.max==null){
                layer.msg('最大值不能为空！',{icon:0});
                return;
            }
            $scope.currentAddWater.operator = $scope.user.userId;
            $http.post(url + '/WaterMeter/insertWaterMeter', {WaterMeter: $scope.currentAddWater}).success(function (data) {
                //layer.alert('新增水表成功！', {icon: 1});
                if(data.Info.info.$=="新建失败，水表编号已存在！"){layer.msg(data.Info.info.$,{icon:2});}
                else{layer.msg(data.Info.info.$,{icon:1});}

                console.log($scope.currentAddWater);
                $scope.load();
                $("#new").modal("hide");
            }).error(function (data, status, headers, config) {
                layer.alert('新增水表失败！', {icon: 2});
            });
            $scope.currentAddWater = {};
        };
       /* $http.post(url + "/WaterMeter/importExcelFileWater", {Annex: $scope.annex}).success(function (data) {
            //   console.log(data);
            layer.msg(data.Info.info.$, {icon: 1});
        });*/
        //取消新建
        $scope.cancelWater = function () {
            $scope.load();
            $scope.currentAddWater = {};
        };

        //查询所有员工信息
        $http.get(url + '/staff/listAllStaffRestful/').success(function (data) {
            console.log(data);
            // console.log(data.Staff);
            $scope.temp = data.Staff;
            $scope.currentPeople= $scope.temp;
        }).error(function () {
        });

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
            return url+"/BuildingStructureNew/listBuildingStructureById/" + treeNode.id;
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
                layer.msg("请选择水表", {icon: 0});
                return;
            } else if (item.state == 2) {
                layer.msg("水表正在使用中请选择其它水表", {icon: 0});
                return;
            } else if (item.state == 3) {
                layer.msg("水表已停用请选择其它水表", {icon: 0});
                return;
            } else {
                $scope.show1 = true;
                $scope.show8 = false;
                $scope.show9 = false;

                $scope.currentLinkWater = item;
                $http.get(url + '/Property/getPropertyByIdRest/' + item.assetsId).success(function (date) {
                    //  console.log(date);
                    $scope.currentLinkWater.property = date.Property;
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
                    if(tasks!=null){
                        for(var i=0;i<tasks.length;i++){
                            $scope.zNode ={ id:tasks[i].projectId, name:tasks[i].projectName,checked:tasks[i].checked,isParent:true,nocheck:true};
                            $scope.zNodes.push($scope.zNode);
                        }
                        $.fn.zTree.init($("#treeDemo1"), setting, $scope.zNodes);

                        var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                        var nodes = zTree.getNodes();
                        nodes[0].name = "建筑信息";
                        zTree.updateNode(nodes[0]);
                    }
                }).error(function(data,status,headers,config){
                    layer.msg("建筑信息查询失败！",{icon:2})
                });
            }
        };
        //取消
        $scope.cenceLink = function () {
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
        $scope.waterMeterRecords = {};
        $scope.saveLinkMeter = function () {
            //console.log($scope.waterMeterRecords.state);
            if($scope.waterMeterRecords.state==null || $scope.waterMeterRecords.state==""){
                layer.msg('未选择表状态', {icon: 0});
                return;
            }
            if($scope.waterMeterRecords.publicWater==0&&$scope.waterMeterRecords.isBilling==0){
                layer.msg('该表不能同时既为公共用表又为计费表', {icon: 0});
                return;
            }
           /* if(waterMeterRecords.isBilling.value==0 && waterMeterRecords.publicWater.value==0){
                layer.msg('不能既是公用用水又是计费表！',{icon:0});
                return;
            }*/
            $scope.waterMeterRecords.buildingStructureId = document.getElementById("buildingStructureId").value;
            $scope.waterMeterRecords.waterMeterId = $scope.item2.waterMeterId;
            $http.post(url + '/WaterMeterRecords/insertWaterMeterRecordsLink', {WaterMeterRecords: $scope.waterMeterRecords}).success(function () {
                layer.msg('关联水表成功！', {icon: 1});

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
                layer.msg('关联水表失败！', {icon: 2});
            });
        };
        //**************显示编辑****************//

        $scope.updateWater = function (item) {
            if (item == null) {
                layer.msg("请选择水表", {icon: 0})
                return;
            } else {
                $scope.currentUpdateWater = item;
                $http.get(url + '/Property/getPropertyByIdRest/' + item.assetsId).success(function (date) {
                    //  console.log(date);
                    $scope.currentUpdateWater.property = date.Property;
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                });
                $("#new1").modal("show");
            }
        };
        $scope.saveUpdateWater = function () {
            if ($scope.currentUpdateWater.waterMeterNum == undefined || $scope.currentUpdateWater.waterMeterNum == "" || $scope.currentUpdateWater.waterMeterNum == null) {
                layer.msg('表编号不能为空！', {icon: 0});
                return;
            }
            if($scope.currentUpdateWater.ratio==''|| $scope.currentUpdateWater.ratio==null){
                layer.msg('倍率不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateWater.min==''||$scope.currentUpdateWater.min==null){
                layer.msg('最小值不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateWater.max==''||$scope.currentUpdateWater.max==null){
                layer.msg('最大值不能为空！',{icon:0});
                return;
            }
            if($scope.currentUpdateWater.property.propertyNumber==''||$scope.currentUpdateWater.property.propertyNumber==null){
                layer.msg('资产编号不能为空！',{icon:0});
                return;
            }

            $http.put(url + '/WaterMeter/updateWaterMeter',
                {WaterMeter: $scope.currentUpdateWater}).success(function (data) {
                    //layer.msg('保存修改成功', {icon: 1});
                    if(data.Info.info.$=="编辑失败，水表编号已存在！"){layer.msg(data.Info.info.$,{icon:2});}
                    else{layer.msg(data.Info.info.$,{icon:1});}
                    $scope.load();
                }).error(function (data, status, headers, config) {
                    layer.msg('保存修改失败', {icon: 2});
                    $scope.load();
                });
        };
        //*********************显示停用****************************//
        $scope.disableWater = function (item) {
            if (item == null) {
                layer.msg("请选择水表", {icon: 0})
                return;
            } else if (item.state == 3) {
                layer.msg("水表已停用请选择其它水表", {icon: 0})
                return;
            } else if (item.state == 1) {
                layer.msg("水表未使用请选择其它水表", {icon: 0})
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
                        $http.get(url + '/MeterReadingData/listMeterReadingDatabyId/' + item.waterMeterRecordsId).success(function (data) {
                            //console.log("停用水表");
                            console.log(data);
                            //console.log("停用水表");
                            $scope.disableMeter = data.MeterReadingData;
                            //console.log($scope.disableMeter);
                            //console.log($scope.disableMeter[0].reading);
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
            $scope.updateWaterMeter = item;
            if($scope.user.userName!=undefined&&$scope.user.userName!=null&&$scope.user.userName!="") {
                $scope.updateWaterMeter.meterReadingPeople =$scope.user.userName;
            }
            else{
                $scope.updateWaterMeter.meterReadingPeople =$scope.user.loginName;
            }
            $scope.meterReadingData = {};
            $scope.meterReadingData.waterMeterRecordId = item.waterMeterRecordsId
            $scope.meterReadingData.buildingStructureId = item.buildingStructureId
            $scope.saveDisbleMeterDate = function () {[]
                if($scope.meterReadingData.meterReadingPeople==undefined) {
                    layer.msg('抄表人不能为空！',{icon : 0});
                    return;}
                else if($scope.meterReadingData.meterReadingDate==undefined) {
                    layer.msg('抄表年月不能为空！',{icon : 0});
                    return;}
                else if($scope.meterReadingData.reading==undefined) {
                    layer.msg('停用读数不能为空！',{icon : 0});
                    return;}
                $scope.updateWaterMeter.reading =$scope.meterReadingData.reading;
                $scope.updateWaterMeter.meterReadingDate =$scope.meterReadingData.meterReadingDate;
                $http.put(url + '/WaterMeterRecords/updateWaterMeterRecordsrestbyNum',
                    {WaterMeterRecords: $scope.updateWaterMeter}).success(function () {
                        layer.msg('停用成功', {icon: 1});
                        $scope.load();
                    }).error(function (data, status, headers, config) {
                        layer.msg('停用失败', {icon: 2});
                    });

                $scope.meterReadingData.lastMonthReading = $scope.disTime
                $http.post(url + '/MeterReadingData/insertMeterReadingData', {MeterReadingData: $scope.meterReadingData}).success(function () {
                    //layer.alert('新增水表成功！',{icon:1});

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
            $scope.loadWater();
        };
        //提交
        //$scope.waterMeterRecords = {};
        $scope.saveLinkMeter1 = function () {
            if($scope.waterMeterList.waterMeterRecords.state==null || $scope.waterMeterList.waterMeterRecords.state==""||$scope.waterMeterList.waterMeterRecords.state=="请选择"){
                layer.msg('未选择表状态', {icon: 0});
                return;
            }
            if($scope.waterMeterList.publicWater==0&&$scope.waterMeterList.waterMeterRecords.isBilling==0){
                layer.msg('该表不能同时既为公共用表又为计费表', {icon: 0});
                return;
            }
            /* if(waterMeterRecords.isBilling.value==0 && waterMeterRecords.publicWater.value==0){
             layer.msg('不能既是公用用水又是计费表！',{icon:0});
             return;
             }*/
            //$scope.waterMeterRecords.buildingStructureId = document.getElementById("buildingStructureId").value;
            $scope.waterMeterList.waterMeterRecords.waterMeterId = $scope.item2.waterMeterId;
            $scope.waterMeterList.waterMeterRecords.publicWater = $scope.waterMeterList.publicWater;
            $http.put(url + '/WaterMeterRecords/updateWaterMeterRecords', {WaterMeterRecords: $scope.waterMeterList.waterMeterRecords}).success(function () {
                layer.msg('编辑关联水表信息成功！', {icon: 1});

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
                $scope.loadWater();
            }).error(function () {
                layer.msg('编辑关联水表信息失败！', {icon: 2});
            });
        }


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


        //显示水表详情 水表编辑页面
        $scope.showList = function (item) {
            if (item.state == 1) {
                layer.msg("请选择使用过的水表！！！", {icon: 0})
                return;
            }
            ;
            $scope.fullNAme = item.fullName;
            $scope.numB = item.waterMeterNum;
            $scope.btnIndex = 1;
            $scope.show2 = true;
            $scope.show3 = true;
            $scope.show7 = false;
            $scope.show6 = false;
            $scope.show5 = false;
            $scope.show4 = false;
            $scope.show8 = false;
            $scope.show9 = false;

            $scope.waterMeterList;
            $scope.loadWater = function () {
                //查询水表信息
                $http.get(url + '/WaterMeter/getWaterMeterbyWaterMeterId/' + item.waterMeterId).success(function (date) {
                   //console.log(date);
                    date.WaterMeter.waterMeterRecords.state = date.WaterMeter.waterMeterRecords.state + '';
                    date.WaterMeter.waterMeterRecords.readingWay = date.WaterMeter.waterMeterRecords.readingWay + '';
                    date.WaterMeter.waterMeterRecords.usingNature = date.WaterMeter.waterMeterRecords.usingNature + '';
                    date.WaterMeter.waterMeterRecords.isBilling = date.WaterMeter.waterMeterRecords.isBilling + '';
                    $scope.waterMeterList = date.WaterMeter;
                    $scope.waterMeterList.waterMeterRecords.installationTime = new Date($scope.waterMeterList.waterMeterRecords.installationTime)
                    //console.log($scope.waterMeterList.waterMeterRecords);
                    //})
                }).error(function (data, status, headers, config) {
                    layer.msg('失败', {icon: 2});
                    return;
                });
            };
            $scope.loadWater();
            $scope.listWaterMeterRecords;
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
                    $scope.waterMeterList;
                    $scope.loadWater();

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
                    $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                       // console.log(date);
                        $scope.listWaterMeterRecords = date.WaterMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                    $scope.left = function (index) {
                        $scope.year = index - 1;
                        $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                           //console.log(date);
                            $scope.listWaterMeterRecords = date.WaterMeterRecords;
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
                        $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                           // console.log(date);
                            $scope.listWaterMeterRecords = date.WaterMeterRecords;
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
                    $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                       // console.log(date);
                        $scope.listWaterMeterRecords = date.WaterMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                    $scope.left = function (index) {
                        $scope.year = index - 1;
                        $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                            //console.log(date);
                            $scope.listWaterMeterRecords = date.WaterMeterRecords;
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
                        $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                            console.log(date);
                            $scope.listWaterMeterRecords = date.WaterMeterRecords;
                        }).error(function (data, status, headers, config) {
                            layer.msg('失败', {icon: 2});
                        });
                    };


                    $scope.checkMeter = function (itt) {
                        $scope.btnIndex = itt;
                        $scope.correctedReading = {};
                        $scope.correctedReading.meterReadingDataId = itt.meterReadingDataId;
                        $scope.correctedReading.waterMeterId = itt.waterMeterId;
                        //$scope.correctedReading.returnPremium = itt.returnPremium;
                        $scope.correctedReading.annexs = [];
                        $scope.inestCorrected = function () {
                            if (itt == null) {
                                layer.msg("请选择修正数据", {icon: 0});
                                return;
                            }
                            $http.post(url + '/CorrectedReading/addCorrectRead', {CorrectedReading: $scope.correctedReading}).success(function () {
                                layer.msg('修改成功！', {icon: 1});
                                $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByWaterMeterId/' + item.waterMeterId + '/' + $scope.year).success(function (date) {
                                    console.log(date);
                                    $scope.listWaterMeterRecords = date.WaterMeterRecords;
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
                    $scope.waterMeterReading;
                    $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsByIds/' + item.buildingStructureId).success(function (date) {
                       //console.log(date);
                        $scope.waterMeterReading = date.WaterMeterRecords;
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
                    $scope.waterMeterState;
                    $http.get(url + '/WaterMeterRecords/listWaterMeterRecordsBybuildigIds/' + item.buildingStructureId).success(function (date) {
                        //console.log(date);
                        $scope.waterMeterState = date.WaterMeterRecords;
                    }).error(function (data, status, headers, config) {
                        layer.msg('失败', {icon: 2});
                    });
                }

            };
        }


        /**
         * 导入Excel数据文档
         */
        $scope.fileUrl = $rootScope.fileUrl;    //上传的文件路径
        var filePath = '';          //上传文件的路径
        $scope.annex = {
            annexAddress: '',
            annexName: '',
            relationId: ''
        };
        $scope.inportExcel = function () {
            $scope.fileState = "1";

            $(function () {
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload").zyUpload({
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
                        $scope.annex.companyId = $scope.user.companyId;
                        $scope.annex.operatorId = $scope.user.userId;
                        $http.post(url + "/WaterMeter/importExcelFileWater", {Annex: $scope.annex}).success(function (data) {
                            //   console.log(data);
                            //layer.msg(data.Info.info.$, {icon: 1});
                            if(data.Info.info.$=="数据导入失败!"){layer.msg(data.Info.info.$,{icon:2});}
                            else{layer.msg(data.Info.info.$,{icon:1});}
                        });
                        //  console.info(filePath);
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
   // console.log(bsList);
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
    var buildingStructureNews = JSON.parse(msg).BuildingStructureNew;
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


  /*  $scope.public=function(index){
        if(index==1){
            if($scope.waterMeterRecords.publicWater==0){
                docment.getElementById(isBilling).disabled=true;
            }
        }
        if(index==2){
            if($scope.waterMeterRecords.isBilling==0){
                docment.getElementById(publicWater).disabled=true;
            }
        }
    }*/

}