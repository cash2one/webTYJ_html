/**
 * Created by NM on 2016/1/22.
 * 【建筑组件初始化】组件列表
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('buildingListCheckCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(8);//增加tab高亮显示   王洲   2016.2.2

        $scope.buildingComponent = {page:{}};
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        //获取登录的用户用户添加修改人
        var user = {};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie?userCookie:user;

        //查询所有组件列表方法.

        var parent = function (page, callback) {
            $scope.buildingComponent.page = page;
            $http.post(url + '/BuildingComponent/listPageBuildingComponent', {BuildingComponent: $scope.buildingComponent}).success(callback);
        };
        $scope.currentBuildingComponent = app.get('Paginator').list(parent, 6);

        //查询所有面积类型
        $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
            $scope.areatypenews = data.AreaTypeNew;
        }).error(function(data,status,headers,config){
            layer.alert('面积类型数据查询失败,请重试！',{icon : 2});
        });

        //初始化网格
        $scope.grid =false;
        //网格
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(items){
            var chk = document.getElementsByName("cid");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.person=items;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;

                }
            }
        };

        /**
         * 返回
         */
        $scope.back = function()
        {
            $scope.doClick(1);
            $location.path('/index/baseManagement/projectManagement');
        };

        //组件删除方法
        $scope.deleteBuildingComponent = function(componentId){
            if($scope.d==false){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else
            { layer.confirm("您确定要删除选中的组件？",
                {btn : ['是','否']},function(){
                    $http.get(url + '/BuildingComponent/DeleteBuildingComponentById/'+$scope.person.componentId).success(function(data) {
                        layer.alert("组件删除成功",{icon : 1});
                        $scope.currentBuildingComponent._load();
                    }).error(function(data,status,headers,config){
                        layer.alert('组件删除出错,请重试！',{icon : 2});
                    });
                })}
        };
        $scope.checkShow = function(items){
            $scope.buildingComponent = null;
            $scope.componentpropertys = null;
            $scope.buildingComponentEdit = true;
            $http.get(url + '/BuildingComponent/getBuildingComponentByIdRest/'+ items.componentId).success(function(data) {
                $scope.buildingComponent = data.BuildingComponent;
                $http.get(url + '/ComponentProperty/getComponentPropertyByComponentIdRest/'+ items.componentId).success(function(data) {
                    $scope.componentpropertys = data.ComponentProperty;
                    $("#chooseBuildingComponent").modal({backdrop: 'static', keyboard: false});
                }).error(function(data,status,headers,config){
                    layer.alert('查询组件资产出错,请重试！',{icon : 2});
                });
            }).error(function(data,status,headers,config){
                layer.alert('查询组件列表出错,请重试！',{icon : 2});
            });
            $scope.btnIndex = items.componentId;
        };
        //组件修改
        $scope.updateBuildingComponent = function(){
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
                        //显示修改的数据时将现有类型放入文本框中  王洲  2016.1.16
                        document.getElementById("componentType1").value = $scope.buildingComponent.componentType;
                        $("#showBuildingComponent").modal({backdrop: 'static', keyboard: false});
                    }).error(function(data,status,headers,config){
                        layer.alert('查询组件资产出错,请重试！',{icon : 2});
                    });
                }).error(function(data,status,headers,config){
                    layer.alert('查询组件列表出错,请重试！',{icon : 2});
                });
            }else{
                layer.alert('请先选择一条数据！',{icon : 0});
            }

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
                        layer.alert('查询组件资产出错,请重试！',{icon : 2});
                    });
                }).error(function(data,status,headers,config){
                    layer.alert('查询组件列表出错,请重试！',{icon : 2});
                });
            }else{
                layer.alert('请先选择一条数据！',{icon : 0});
            }
        };

        //获取组件类型select选中的值
        $scope.getAreaTypeId = function(){
            var areaTypeId = $("#areaType option:selected").val();
            document.getElementById("componentType1").value = areaTypeId;
        };

        $scope.saveBuildingComponent = function(){
            $scope.buildingComponents = {};
            $scope.buildingComponents.componentId = $("#componentid").val();
            $scope.buildingComponents.componentNum = $("#cpmponentnum").val();
            $scope.buildingComponents.componentName = $("#componentname").val();
            $scope.buildingComponents.componentType = document.getElementById("componentType1").value;
            $scope.buildingComponents.updateId = $scope.user.userId;
            if($scope.buildingComponents.componentNum != "" && $scope.buildingComponents.componentName != "" && $scope.buildingComponents.componentType != ""){
                $http.put(url + '/BuildingComponent/UpdateBuildingComponent',{BuildingComponent: $scope.buildingComponents}).success(function(data){
                    layer.alert('修改成功！',{icon : 1});
                    $scope.buildingComponentEdit = false;
                    $("#showBuildingComponent").modal("hide");
                    $scope.currentBuildingComponent._load();
                }).error(function(data){
                    layer.alert('修改失败，请重新修改！',{icon : 2});
                })
            }else{
                layer.alert('请先完善必填项数据！',{icon : 0});
            }

        };

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
                        $http.post(url + "/BuildingComponent/importExcelFile",{Annex:$scope.annex}).success(function(data){
                            if(data.Info.state == 'success'){
                                layer.alert('导入成功！',{icon : 1});
                                $("#importExcel").modal("hide");
                                $scope.currentBuildingComponent._load();
                            }else{
                                layer.alert('导入失败！',{icon : 2});
                            }
                        }).error(function(data){
                            layer.alert('导入失败！',{icon : 2});
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.alert("此文件上传失败：",{icon:2});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        }
    }]);
});