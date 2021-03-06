/**
 * Created by NM on 2016/1/22.
 * 【建筑组件初始化】组件列表
 */

'use strict';
var selectComponent;
var selectComponentProId='';
var addType="";
define(function (require) {
    var app = require('../../../../app');

    app.controller('buildingListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(9);//高亮显示菜单栏
        $scope.buildingComponent = {page:{}};
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        //获取登录的用户用户添加修改人
        var user = {};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        //查询所有组件列表方法.
        $scope.load = function()
        {
            var parentts = function (page, callback) {
                abSave();
                $scope.buildingComponent.page = page;
                $http.post(url + '/BuildingComponent/listPageBuildingComponent', {BuildingComponent: $scope.buildingComponent}).success(callback);

            };
            $scope.currentBuildingComponent = app.get('Paginator').list(parentts, 6);
        };

        $scope.load();

        //查询所有面积类型
        $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
            $scope.areatypenews = data.AreaTypeNew;
        }).error(function(data,status,headers,config){
            layer.msg('面积类型数据查询失败,请重试！',{icon : 2});
        });

        //判断checkbx是否选中
        var selectId="";
        $scope.d=false;
        $scope.getdata=function(items,event){
            var chkId = document.getElementById(items.componentId);
            var chk = document.getElementsByName("cid");
            for(var i = 0;i<chk.length;i++)
            {
                chk[i].checked=false;
                chk[i].parentNode.parentNode.style.backgroundColor='';
            }
            if(chkId.parentNode.parentNode.style.backgroundColor=='#F6F8FA')
            {
                chkId.parentNode.parentNode.style.backgroundColor='';
                chkId.checked = false;
            }else
            {
                chkId.parentNode.parentNode.style.backgroundColor='#F6F8FA';
                chkId.checked = true;
            }
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){

                    $scope.person=items;
                    sessionStorage.setItem('person',JSON.stringify($scope.person));
                    sessionStorage.setItem('componentId',JSON.stringify(items.componentId));


                    $scope.d=true;
                    return;
                }else{
                    sessionStorage.removeItem('person');
                    sessionStorage.removeItem('componentId');
                    if(itemId)
                    {
                        itemId='';
                    }
                    $scope.d=false;
                }

            }

            event.stopPropagation();
        };

        //初始化列表
        $scope.grid = false;
        //网格
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        //组件删除方法
        $scope.deleteBuildingComponent = function(item){
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 start */
            if (item == -1){
                if ($scope.grid == true){
                    layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                    return;
                }
                var subCompanyId = document.getElementsByName("scId");
                var count = 0;
                for(var i = 0 ; i < subCompanyId.length ; i ++){
                    if(subCompanyId[i].checked == true){
                        count++;
                    }
                }
            } else {
                $scope.d = true;
                $scope.person = item;
            }
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 end */

            /*if($scope.d==false){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else */
            if ($scope.d==true && $scope.person != null&&count==1)
            { layer.confirm("您确定要删除选中的组件？",
                {btn : ['是','否']},function(){
                    $http.get(url + '/BuildingComponent/DeleteBuildingComponentById/'+$scope.person.componentId).success(function(data) {
                        layer.msg("组件删除成功",{icon : 1});
                        $scope.person = null;
                        $scope.d==false
                        //$scope.currentBuildingComponent._load();
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        layer.msg('组件删除出错,请重试！',{icon : 2});
                    });
                })} else {
                layer.msg('请先选择一条数据！', {icon: 0});
                return;
            }
        };
        $scope.checkShow = function(items){
            $scope.buildingComponent = null;
            $scope.componentpropertys = null;
            $scope.buildingComponentEdit = true;
            $http.get(url + '/ComponentProperty/selectComponentAndProperty/'+items.componentId).success(function(data) {
                $scope.componentpropertys=data.ComponentProperty;
            }).error(function(data,status,headers,config){
                layer.msg('查询组件资产出错,请重试！',{icon : 2});
            });
            //    layer.alert('查询组件列表出错,请重试！',{icon : 2});
            $http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+items.componentId).success(function(data) {
                $scope.buildingComponent = data.BuildingComponent;
                document.getElementById("componentType1").value = $scope.buildingComponent.componentType;
            }).error(function(data,status,headers,config){
                layer.msg('查询组件列表出错,请重试！',{icon : 2});
            });
            $("#chooseBuildingComponent").modal({backdrop: 'static', keyboard: false});
            //$scope.buildingComponent = null;
            //$scope.componentpropertys = null;
            //$scope.buildingComponentEdit = true;
            //$http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+ items.componentId).success(function(data) {
            //    $scope.buildingComponent = data.BuildingComponent;
            //    $http.get(url + '/ComponentProperty/getComponentPropertyByComponentIdRest/'+ items.componentId).success(function(data) {
            //        $scope.componentpropertys = data.ComponentProperty;
            //        $("#chooseBuildingComponent").modal({backdrop: 'static', keyboard: false});
            //    }).error(function(data,status,headers,config){
            //        layer.alert('查询组件资产出错,请重试！',{icon : 2});
            //    });
            //}).error(function(data,status,headers,config){
            //    layer.alert('查询组件列表出错,请重试！',{icon : 2});
            //});
            var chk = document.getElementsByName("cid");
            var chkId = document.getElementById(items.componentId);
            for(var i = 0;i<chk.length;i++)
            {
                chk[i].checked=false;
                chk[i].parentNode.parentNode.style.backgroundColor='';
            }
            chkId.parentNode.parentNode.style.backgroundColor='#F6F8FA';
            chkId.checked = true;
        };
        //组件修改
        $scope.updateBuildingComponent = function(item){
            $scope.buildingComponent = null;
            $scope.componentpropertys = null;
            $scope.buildingComponentEdit = true;
            $scope.componentId = "";
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 start */
            var count=0;
            if (item == -1){
                var componentid = document.getElementsByName("cid");
                for(var i = 0 ; i < componentid.length ; i ++){
                    if(componentid[i].checked == true){
                        count++;
                        $scope.componentId = componentid[i].id;
                    }
                }
                //如果在网格界面
                if ($scope.grid == true) {
                    layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                    return;
                }
            } else {
                var componentId = item;
                $scope.componentId = componentId;
            }
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 end */

            if($scope.componentId != ""&&count==1){
                $http.get(url + '/ComponentProperty/selectComponentAndProperty/'+$scope.componentId).success(function(data) {
                    $scope.componentpropertys=data.ComponentProperty;
                   // console.log( $scope.componentpropertys );
                    $("#showBuildingComponent").modal({backdrop: 'static', keyboard: false});
                        }).error(function(data,status,headers,config){
                            layer.msg('查询组件资产出错,请重试！',{icon : 2});
                        });
                //    layer.alert('查询组件列表出错,请重试！',{icon : 2});
                $http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+$scope.componentId).success(function(data) {
                   $scope.buildingComponent = data.BuildingComponent;
                //    $http.get(url + '/ComponentProperty/getComponentPropertyByComponentIdRest/'+$scope.componentId).success(function(data) {
                //        $scope.componentpropertys = data.ComponentProperty;
                //        console.log( $scope.componentpropertys );
                //        //显示修改的数据时将现有类型放入文本框中  王洲  2016.1.16
                        document.getElementById("componentType1").value = $scope.buildingComponent.componentType;
                //        $("#showBuildingComponent").modal({backdrop: 'static', keyboard: false});
                //    }).error(function(data,status,headers,config){
                //        layer.alert('查询组件资产出错,请重试！',{icon : 2});
                //    });
                }).error(function(data,status,headers,config){
                    layer.msg('查询组件列表出错,请重试！',{icon : 2});
                });
            }else{
                layer.msg('请先选择一条数据！',{icon : 0});
                return;
            }

        };
        //组件删除
         $scope.delComent=function (comProperId){
             { layer.confirm("您确定要删除选中的组件？",
                 {btn : ['是','否']},function() {
                     $http.get(url + '/ComponentProperty/DeleteComponentPropertyById/'+comProperId).success(function(data) {
                         $("#showBuildingComponent").modal("hide");
                         layer.msg('删除成功',{icon : 1});
                     }).error(function (data, status, headers, config) {
                         layer.msg('组件删除出错,请重试！', {icon: 2});
                     });

                 });
             }
         }

        //组件信息修改弹出框
        $scope.updateCompen=function (componentPropertyId){
            selectComponentProId=componentPropertyId;
            var projectId = null;
            $http.get(url + '/Project/getProjectByState').success(function(data) {
                $scope.Project = data.Project;
                projectId = data.Project.projectId;
                //单位
                $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/unit/' + projectId).success(function (data) {
                    $scope.unitList = data.DataDictionarySlave;
                });
            });
            //查询所有功能区域数据方法.
            $http.get(url + '/Functional/listFunctionalAll').success(function(data) {
                $scope.functionals = data.Functional;
            }).error(function(data,status,headers,config){
                layer.msg('功能区域数据查询失败,请重试！',{icon : 2});
            });
            //查询所有资产数据方法.
            $http.get(url + '/Property/listPropertyAll').success(function(data) {
                $scope.propertys = data.Property;
            }).error(function(data,status,headers,config){
                layer.msg('资产数据查询失败,请重试！',{icon : 2});
            });
            //查询所有专业列表方法.
            $http.get(url + '/PropertyType/treeProperty').success(function(data) {
                //获取json数据
                $scope.propertyTypes = data.Tree;
                $.fn.zTree.init($("#treeDemo"), setting, $scope.propertyTypes);
            }).error(function(data,status,headers,config){
                layer.msg("专业资产树查询失败！",{icon : 2})
            });
            //查询所有单位类型数据方法.
            $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
                $scope.areatypenews = data.AreaTypeNew;
            }).error(function(data,status,headers,config){
                layer.msg('单位类型数据查询失败,请重试！',{icon : 2});
            });
            $scope.componentpropertyss={};
            $scope.FunctionalId={};
            $scope.slaveId={};
            $http.get(url + '/ComponentProperty/selectComProById/' +componentPropertyId).success(function(data) {
                $scope.componentpropertyss=data.ComponentProperty;
                for(var i=0;i< $scope.componentpropertyss.length;i++) {
                    $scope.FunctionalId = $scope.componentpropertyss[i].functionals.functionalId;
                    $scope.SlaveId = $scope.componentpropertyss[i].propertyArea;
                    $("#functionalId").val($scope.componentpropertyss[i].functionals.functionalId);
                    $("#functionalName").val($scope.componentpropertyss[i].functionals.functionalName);
                    $("#citySel").val($scope.componentpropertyss[i].property.propertyName);
                    $("#propertyId").val($scope.componentpropertyss[i].property.propertyId);
                    $("#propertyNumber").val($scope.componentpropertyss[i].propertyNumber);
                    $("#propertyAreaType").val($scope.componentpropertyss[i].propertyArea);
                }

                for(var i = 0; i<$scope.unitList.length; i++){
                    if(  $scope.SlaveId== $scope.unitList[i].slaveId){
                            $("#"+$scope.SlaveId).selected;
                            $('#proSlaveId').val($scope.unitList[i].slaveId);
                        break;
                    }
                }
                $('#comPropertyId').val(selectComponentProId);
                $("#showBuildingComponent").modal({backdrop: 'static', keyboard: false});
                $("#choosePropertyRs").modal("show");
                $scope.propertyRsEdit=true;
            }).error(function(data,status,headers,config){
                layer.msg('查询组件资产出错,请重试！',{icon : 2});
            });

        }
        //选择功能区
        $scope.selectFunctional = function(){
            document.getElementById("functionalName").value = $("#functional option:selected").text();
            document.getElementById("functionalId").value = $scope.FunctionalId;
        };
        //选择单位
        $scope.selectSlave = function(){
            console.log()
            document.getElementById("proSlaveName").value = $("#propertyAreaType option:selected").text();
            document.getElementById("proSlaveId").value = $scope.SlaveId;
        };
        //组件关联资产修改
        $scope.updateComponentProperty=function (){
            var functionalid = $("#functionalId").val();
            var functionalname = $("#functionalName").val();
            var propertyname = $("#citySel").val();
            var propertyid =$("#propertyId").val();
            var propertynumber = $("#propertyNumber").val();
            var propertyareaType = $("#proSlaveId").val();
            //var propertyarea;
            //
            //for(var i = 0; i<$scope.unitList.length; i++){
            //    if(propertyareaType == $scope.unitList[i].description){
            //        propertyarea = $scope.unitList[i].slaveId;
            //        break;
            //    }
            //}

            if(functionalid == ''){
                layer.msg('请选择一个功能区！',{icon : 0,time : 1000});
                return;
            }
            if(propertyid == ''){
                layer.msg('请选择资产信息！',{icon : 0,time : 1000});
                return;
            }
            if(propertynumber == ''){
                layer.msg('数量不能为空！',{icon : 0,time : 1000});
                return;
            }
            if(isNaN(propertynumber)){
                layer.msg('数量必须为数字！',{icon : 0,time : 1000});
                return;
            }
            if(propertyareaType == ''){
                layer.msg('单位不能为空！',{icon : 0,time : 1000});
                return;
            }

                        $scope.componentProperty={};
                        $scope.componentProperty.functionalId = functionalid;
                        $scope.componentProperty.functionalName = functionalname;
                        $scope.componentProperty.propertyName = propertyname;
                        $scope.componentProperty.propertyId = propertyid;
                        $scope.componentProperty.propertyNumber = propertynumber;
                        $scope.componentProperty.propertyArea = propertyareaType;
                     // $scope.componentProperty.propertyAreaType = propertyareaType;
                        $scope.componentProperty.componentId=$scope.componentId;

            if(addType==2){
                            $http.post(url + '/ComponentProperty/AddComponentProperty', {ComponentProperty: $scope.componentProperty}).success(function (data) {
                                addType=1;
                               // $("#showBuildingComponent").modal("hide");
                                $("#choosePropertyRs").modal("hide");
                                layer.msg('添加成功', {icon: 1});
                                $scope.componentpropertys={};
                                $http.get(url + '/ComponentProperty/selectComponentAndProperty/'+$scope.componentId).success(function(data) {
                                    $scope.componentpropertys=data.ComponentProperty;
                                    //$scope.componentpropertys._load;
                                    $("#showBuildingComponent").modal({backdrop: 'static', keyboard: true});
                                }).error(function(data,status,headers,config){
                                    layer.msg('查询组件资产出错,请重试！',{icon : 2});
                                });
                            }).error(function (data, status, headers, config) {
                                layer.msg('添加出错,请重试！', {icon: 2});
                            });
                        }else {
                            $scope.componentProperty.componentPropertyId = selectComponentProId;
                            $http.put(url + '/ComponentProperty/updateComponentPropertyById', {ComponentProperty: $scope.componentProperty}).success(function (data) {
                                layer.msg('修改成功', {icon: 1});
                                $scope.componentpropertys={};
                                $http.get(url + '/ComponentProperty/selectComponentAndProperty/'+$scope.componentId).success(function(data) {
                                    $scope.componentpropertys=data.ComponentProperty;
                                    //$scope.componentpropertys._load;
                                    $("#showBuildingComponent").modal({backdrop: 'static', keyboard: true});
                                }).error(function(data,status,headers,config){
                                    layer.msg('查询组件资产出错,请重试！',{icon : 2});
                                });
                            }).error(function (data, status, headers, config) {
                                layer.msg('修改出错,请重试！', {icon: 2});
                            });
                        }

            //////    layer.alert('查询组件列表出错,请重试！',{icon : 2});
            //$http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+$scope.componentId).success(function(data) {
            //    $scope.buildingComponent = data.BuildingComponent;
            //    document.getElementById("componentType1").value = $scope.buildingComponent.componentType;
            //}).error(function(data,status,headers,config){
            //    layer.alert('查询组件列表出错,请重试！',{icon : 2});
            //});
           // $("#showBuildingComponent").modal("hide");
            $("#choosePropertyRs").modal("hide");
        }
        //新增组件关系
        $scope.addNewComponentPro=function (){
            addType=2;
            $scope.FunctionalId="";
            $("#functionalId").val('');
            $("#functionalName").val('');
            $("#citySel").val('');
            $("#propertyId").val('');
            $("#propertyNumber").val('');
            $("#propertyAreaType").val('');
            var projectId = null;
            $http.get(url + '/Project/getProjectByState').success(function(data) {
                $scope.Project = data.Project;
                projectId = data.Project.projectId;
                //单位
                $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/unit/' + projectId).success(function (data) {
                    $scope.unitList = data.DataDictionarySlave;
                });
            });
            //查询所有功能区域数据方法.
            $http.get(url + '/Functional/listFunctionalAll').success(function(data) {
                $scope.functionals = data.Functional;
            }).error(function(data,status,headers,config){
                layer.msg('功能区域数据查询失败,请重试！',{icon : 2});
            });
            //查询所有资产数据方法.
            $http.get(url + '/Property/listPropertyAll').success(function(data) {
                $scope.propertys = data.Property;
            }).error(function(data,status,headers,config){
                layer.msg('资产数据查询失败,请重试！',{icon : 2});
            });
            //查询所有专业列表方法.
            $http.get(url + '/PropertyType/treeProperty').success(function(data) {
                //获取json数据
                $scope.propertyTypes = data.Tree;
                $.fn.zTree.init($("#treeDemo"), setting, $scope.propertyTypes);
            }).error(function(data,status,headers,config){
                layer.msg("专业资产树查询失败！",{icon : 2})
            });
            //查询所有单位类型数据方法.
            $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
                $scope.areatypenews = data.AreaTypeNew;
            }).error(function(data,status,headers,config){
                layer.msg('单位类型数据查询失败,请重试！',{icon : 2});
            });
            $("#showBuildingComponent").modal({backdrop: 'static', keyboard: false});
            $("#choosePropertyRs").modal("show");
            $scope.propertyRsEdit=true;
        }
        $scope.selectFunctional = function(){
            document.getElementById("functionalName").value = $("#functional option:selected").text();
            document.getElementById("functionalId").value = $scope.FunctionalId;
        };
        //组件详情
        $scope.showBuildingComponent = function(){
            $scope.buildingComponent = null;
            $scope.componentpropertys = null;
            $scope.buildingComponentEdit = true;
            $scope.componentId = "";
            var componentid = document.getElementsByName("cid");
            for(var i = 0 ; i < componentid.length ; i ++){
                if(componentid[i].checked == true){
                    $scope.componentId = componentid[i].id;
                }
            }
            if($scope.componentId != ""){
                $http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+$scope.componentId).success(function(data) {
                    $scope.buildingComponent = data.BuildingComponent;
                    $http.get(url + '/ComponentProperty/getComponentPropertyByComponentIdRest/'+$scope.componentId).success(function(data) {
                        $scope.componentpropertys = data.ComponentProperty;
                        $("#chooseBuildingComponent").modal({backdrop: 'static', keyboard: false});
                    }).error(function(data,status,headers,config){
                        layer.msg('查询组件资产出错,请重试！',{icon : 2});
                    });
                }).error(function(data,status,headers,config){
                    layer.msg('查询组件列表出错,请重试！',{icon : 2});
                });
            }else{
                layer.msg('请先选择一条数据！',{icon : 0});
            }
        };

        //获取组件类型select选中的值
        $scope.getAreaTypeId = function(){
            var areaTypeId = $("#areaType option:selected").val();
            document.getElementById("componentType1").value = areaTypeId;
        };

        $scope.saveBuildingComponent = function(){
            $scope.buildingComponents = {};

            $scope.buildingComponents.componentId = $scope.componentId
            $scope.buildingComponents.componentNum = $("#componentNum").val();

            $scope.buildingComponents.componentName = $("#componentname").val();
            $scope.buildingComponents.componentType = $("#componentType1").val();
            if($scope.user.userName!='admin'){
                $scope.buildingComponents.updateId = $scope.user.userId;
            }

          // alert( $("#componentNum").val());
            if( $scope.buildingComponents.componentName.length > 16){
                layer.msg('组件名称长度输入过长！',{icon : 0});
                return;
            }

            if($scope.buildingComponents.componentNum != "" && $scope.buildingComponents.componentName != "" && $scope.buildingComponents.componentType != ""){
                $http.put(url + '/BuildingComponent/UpdateBuildingComponent',{BuildingComponent: $scope.buildingComponents}).success(function(data){
                    /*Bug510
                     修改人：陈浪
                     2016年2月19号*/
                    //layer.alert('编辑成功！',{icon : 1});
                    layer.msg('编辑成功', {icon: 1, time: 2000});

                    $scope.buildingComponentEdit = false;

                    //$scope.currentBuildingComponent._load();
                    $scope.load();

                    //console.log ($scope.currentBuildingComponent);
                    //for(var i=0;i<$scope.currentBuildingComponent.object.buildingComponents.length;i++){
                    //    var bcs =$scope.currentBuildingComponent.object.buildingComponents[i];
                    //    if(bcs.componentId== $scope.componentId){
                    //        var chk = document.getElementById(bcs.componentId);
                    //            chk.checked = true;
                    //
                    //    }
                    //
                    //
                    //};
                    $("#showBuildingComponent").modal("hide");
                }).error(function(data){
                    layer.msg('修改失败，请重新修改！',{icon : 2});
                })
            }else{
                layer.msg('请先完善必填项数据！',{icon : 0});
            }

        };

        /**
         * 点击上一页 下一页 bug修复 2016/2/23  by yeshengqiang  开始
         */
        /**
         * 点击上一页 下一页 bug修复 2016/3/5  by yeshengqiang  开始
         */
        var mark = 1;
        var itemId =[];
        function abSave()
        {
            $(function()
            {
                if(sessionStorage.getItem('componentId'))
                {
                    var componentId = JSON.parse(sessionStorage.getItem('componentId'));
                    if(componentId.length !=0)
                    {
                        itemId = componentId;
                    }
                }else
                {
                    var compId = itemId;
                }
                if(mark == 1 || componentId)
                {
                    btnClick1(componentId,compId);
                    mark++;
                }else
                {
                    btnClick(componentId,compId);
                }
            });
        };

        function btnClick(componentId,compId)
        {
            var timer = setInterval(function()
            {
                if(compId !=undefined)
                {
                    for(var i =0; i<compId.length;i++)
                    {
                        if(componentId)
                        {
                            document.getElementById(componentId[i]).checked = true;
                            sessionStorage.removeItem('componentId');
                            clearInterval(timer);
                        }else if(document.getElementById(compId[i]) && compId)
                        {
                            document.getElementById(compId[i]).checked = true;
                            clearInterval(timer);
                        }
                    }
                }
            },30);
        };

        function btnClick1(componentId,compId)
        {
            var timer = setInterval(function()
            {
                if(componentId !=undefined)
                {
                    for(var i =0;i<componentId.length;i++)
                    {
                        if(document.getElementById(componentId[i]) && componentId)
                        {
                            document.getElementById(componentId[i]).checked = true;
                            sessionStorage.removeItem('componentId');
                            clearInterval(timer);
                        }
                        if(!componentId)
                        {
                            clearInterval(timer);
                        }
                    }
                }
            },30);
        };

        /**
         * 点击上一页 下一页 bug修复 2016/3/5  by yeshengqiang  结束
         */

        function btnClick(componentId,compId)
        {
            var timer = setInterval(function()
            {
                if(document.getElementById(componentId) && componentId)
                {
                    document.getElementById(componentId).checked = true;
                    $scope.person = JSON.parse(sessionStorage.getItem('person'));
                    sessionStorage.removeItem('person');
                    sessionStorage.removeItem('componentId');
                    $scope.itemData = $scope.person;
                    clearInterval(timer);
                }else if(document.getElementById(compId) && compId)
                {
                    document.getElementById(compId).checked = true;
                    $scope.person = $scope.itemData;
                    console.log($scope.person);
                    clearInterval(timer);
                }else if(!compId)
                {
                    clearInterval(timer);
                }
            },30);
        };

//导出
        $scope.exportComponent=function() {
            var cId="";
            var componentid = document.getElementsByName("cid");
            for(var i = 0 ; i < componentid.length ; i ++){
                if(componentid[i].checked == true){

                    cId = componentid[i].id;

                }
            }


            if (typeof(cId) == "undefined"||cId.length==0) {
                selectComponent="";
                exportExcelComponent(selectComponent);
            } else {

                selectComponent =  cId;
                exportExcelComponent(selectComponent);
            }
        }
        function btnClick1(componentId,compId)
        {
            var timer = setInterval(function()
            {
                if(document.getElementById(componentId) && componentId)
                {
                    document.getElementById(componentId).checked = true;
                    $scope.person = JSON.parse(sessionStorage.getItem('person'));
                    sessionStorage.removeItem('person');
                    sessionStorage.removeItem('componentId');
                    $scope.itemData = $scope.person;
                    clearInterval(timer);
                }
                if(!componentId)
                {
                    clearInterval(timer);
                }
            },30);
        };
        /**
         * 点击上一页 下一页 bug修复 2016/2/23  by yeshengqiang  结束
         */

        /**
         * 导入Excel数据文档
         */
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.annex={
            annexAddress:'',
            annexName:'',
            relationId:''
        };
        $scope.inportExcel = function(){
            $scope.fileState="1";
            $("#excelupload").remove();
            $("#remove").append("<div id='excelupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');
                $("#excelupload").zyUpload({
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
                        $scope.annex.companyId=$scope.user.userId;
                        $http.post(url + "/BuildingComponent/importExcelFile",{Annex:$scope.annex}).success(function(data){
                            if(data.Info.state == 'success'){
                                var sarr = data.Info.info.$.split("|");
                                var s = sarr[0];
                                var e = sarr[1];
                                var filepath = sarr[2];
                                if(e=='0'){
                                    layer.msg("成功上传"+s+"条信息");
                                }else{
                                    var index = layer.alert("成功上传" + s + "条信息，失败" + e + "条，点击确定下载错误信息", {
                                        closeBtn: 0
                                    }, function () {
                                        layer.close(index);
                                        window.location.href = fileUrl + "/" + filepath;
                                    });
                                }
                                $("#importExcel").modal("hide");
                                //$scope.currentBuildingComponent._load();
                                $scope.load();
                            }else{
                                layer.msg('导入失败！',{icon : 2});
                            }
                        }).error(function(data){
                            layer.msg('导入失败！',{icon : 2});
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("此文件上传失败：",{icon:2});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        }
    }]);
});
function exportExcelComponent(componentname){

        var url = document.getElementById('fileurl').value;

        window.location.href = url + '/info/getexportExcelBuildingComponent.do?componentId='+componentname;
        selectComponent='';
    }