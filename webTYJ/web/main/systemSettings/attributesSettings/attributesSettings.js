/**
 * Created by NM on 2018/1/18.
 * 属性设置js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('attributesSettingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /*改动备注：
        1、将所有父类属性归纳到物业公司项目下，并设置好每个父类属性对应的子类属性
        2、选择公司下的项目以及父类属性后，可以选择新增各项目对应父类属性独立的子类属性
        3、其他引用属性设置功能的模块，如果没有新增独立的子类属性，使用预设的数据，如果有独立的子类属性，使用独立的属性
        王洲   2016.02.16*/

        /***********************   参数start   *************************/

        var url = $rootScope.url;                                  //路径
        $scope.DataDictionaryMaster = {page:{}};                   //数据字典主表对象
        $scope.DataDictionarySlave = {page:{}};                    //数据字典从表对象
        $scope.DataDictionaryMasterList = [];                      //数据字典主表数组
        $scope.DataDictionarySlaveList = [];                       //数据字典从表数组
        $scope.DataDictionaryMasters = {};                         //查询从表时存放主表数据
        $scope.DataDictionarySlaveProject = {page:{}};             //存放从表id关联的项目
        $scope.Project = {projectId:'',page:{}};                   //查询所有项目
        $scope.projectIds = [];                                    //存放项目id数据
        $scope.sPIds = [];                                         //存放项目关联表id
        $scope.DataDictionaryMasterProject = {page:{}};            //数据字典主表及项目关联对象
        $scope.project = {projectId:'',projectName:''};            //查询主表时使用的项目对象
        $scope.allMasters = [];                                    //所有默认的字典数据
        var user = {};
        var companyId ;//设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.typeShow = '';                                      //获取type值



        companyId= $scope.user.companyId;
        /***********************   参数end     *************************/

        /***********************   方法start   *************************/

            //打开新增数据字典主表模态框
        $scope.openaddMaster = function(){
            $scope.typeShow = '0';
            document.getElementById("types").value = 0;
            document.getElementById("ids").value = '';
            document.getElementById("name").value = '';
            document.getElementById("description").value = '';
            document.getElementById("name").disabled = false;
            $("#new").modal("show");
        };

        //打开修改数据字典主表模态框
        $scope.openupdateMaster = function(){
            $scope.typeShow = '2';
            if($scope.DataDictionaryMasterList.length == 0){
                layer.msg('请选择需要修改的数据！', {icon: 0});
            }else if($scope.DataDictionaryMasterList.length > 1){
                layer.msg('一次只能修改一条数据！', {icon: 5});
            }else{
                $scope.DataDictionaryMaster = $scope.DataDictionaryMasterList[0];

                document.getElementById("ids").value = $scope.DataDictionaryMaster.masterId;
                document.getElementById("types").value = 0;
                document.getElementById("createtime").value = $scope.DataDictionaryMaster.createTime;
                document.getElementById("createid").value = $scope.DataDictionaryMaster.createId;
                document.getElementById("name").value = $scope.DataDictionaryMaster.masterName;
                document.getElementById("description").value = $scope.DataDictionaryMaster.description;
                document.getElementById("status").value = $scope.DataDictionaryMaster.status;
                document.getElementById("name").disabled = true;
                $("#new").modal("show");
            }
        };

        //限制输入长度
/*        document.getElementById("name").maxLength = 16;
        document.getElementById("description").maxLength = 16;*/

        //新增或修改数据字典两张表数据
        $scope.addorUpdateDatas = function(){
            var types = $("#types").val();
            var ids = $("#ids").val();
            //根据ids的值判断是主表数据还是从表数据，0/主表，1/从表
            if(types == 0){
                $scope.DataDictionaryMaster.masterName = $("#name").val();
                $scope.DataDictionaryMaster.description = $("#description").val();
                //如果id为空，新增

                if(ids == ""){
                    $scope.DataDictionaryMaster.status = 0;
                    $scope.DataDictionaryMaster.createId = $scope.user.userId;
                    if($scope.project.projectId == ''){
                        $scope.DataDictionaryMaster.project = $scope.projects.object.project[1];
                    }else{
                        $scope.DataDictionaryMaster.project = $scope.project;
                    }
                    //属性新增验证
                    if($scope.DataDictionaryMaster.masterName==null||$scope.DataDictionaryMaster.masterName.replace(/\s+/g,"")==""){
                        layer.alert("属性不能为空！",{icon : 0});
                        return;
                    }else if($scope.DataDictionaryMaster.description==null||$scope.DataDictionaryMaster.description.replace(/\s+/g,"")==""){
                        layer.alert("属性描述不能为空！",{icon : 0});
                        return;
                    }
                    if($scope.DataDictionaryMaster.masterName.length>16 || $scope.DataDictionaryMaster.description.length>16){
                        layer.alert("字符长度不能大于16！",{icon : 0});
                        return;
                    }
                    $http.post(url + '/DataDictionary/insertMaster', {DataDictionaryMaster : $scope.DataDictionaryMaster}).success(function(data){
                        if(data == -1){
                            layer.msg('属性名称重复，请重新输入！', {icon: 5});
                        }else{
                            layer.msg('新增成功！', {icon: 1});
                            $scope.DataDictionaryMaster = {};
                            $("#new").modal("hide");
                            $scope.dataDictionaryMasters._load();
                        }
                    }).error(function(data){
                        layer.msg('新增失败，请确认输入的数据！', {icon: 2});
                    });
                    //如果id不为空，修改
                }else{
                    $scope.DataDictionaryMaster.masterId = $("#ids").val();
                    $scope.DataDictionaryMaster.createId = $("#createid").val();
                    $scope.DataDictionaryMaster.createTime = $("#createtime").val();
                    $scope.DataDictionaryMaster.updateId = $scope.user.userId;
                    $scope.DataDictionaryMaster.status = $("#status").val();
                    $scope.DataDictionaryMaster.project = $scope.project;
                    //属性修改验证
                    if($scope.DataDictionaryMaster.masterName==null||$scope.DataDictionaryMaster.masterName.replace(/\s+/g,"")==""){
                        layer.alert("属性不能为空！",{icon : 0});
                        return;
                    }else if($scope.DataDictionaryMaster.description==null||$scope.DataDictionaryMaster.description.replace(/\s+/g,"")==""){
                        layer.alert("属性描述不能为空！",{icon : 0});
                        return;
                    }
                    if($scope.DataDictionaryMaster.masterName.length>16 || $scope.DataDictionaryMaster.description.length>16){
                        layer.alert("字符长度不能大于16！",{icon : 0});
                        return;
                    }
                    $http.post(url + '/DataDictionary/updateMaster', {DataDictionaryMaster : $scope.DataDictionaryMaster}).success(function(data){
                        layer.msg('修改成功！', {icon: 1});
                        $scope.DataDictionaryMaster = {};
                        $("#new").modal("hide");
                        $scope.DataDictionaryMasterList = [];
                        $scope.dataDictionaryMasters._load();
                    }).error(function(data){
                        layer.msg('修改失败，请确认输入的数据！', {icon: 2});
                    });
                }
            }else{  //从表
                $scope.DataDictionarySlave.slaveName = $("#name").val();
                $scope.DataDictionarySlave.description = $("#description").val();
                if(ids == ''){
                    $scope.DataDictionarySlave.status = 0;
                    $scope.DataDictionarySlave.createId = $scope.user.userId;
                    $scope.masid = $scope.DataDictionarySlave.masterId;
                    //类型新增验证
                    if($scope.DataDictionarySlave.slaveName==null||$scope.DataDictionarySlave.slaveName.replace(/\s+/g,"")==""){
                        layer.alert("类型属性不能为空！",{icon : 0});
                        return;
                    }else if($scope.DataDictionarySlave.description==null||$scope.DataDictionarySlave.description.replace(/\s+/g,"")==""){
                        layer.alert("类型显示不能为空！",{icon : 0});
                        return;
                    }
                    if($scope.DataDictionarySlave.slaveName.length>16 || $scope.DataDictionarySlave.description.length>16){
                        layer.alert("字符长度不能大于16！",{icon : 0});
                        return;
                    }
                    $scope.DataDictionarySlave.project = $scope.project;
                    $http.post(url + '/DataDictionary/insertSlave', {DataDictionarySlave : $scope.DataDictionarySlave}).success(function(data){
                        if(data == 2){
                            layer.msg('新增失败，不能新增已存在的类型属性和类型显示');
                            return;
                        }
                        layer.msg('新增成功！', {icon: 1});
                        $scope.DataDictionarySlave = {};
                        $("#new").modal("hide");
                        $scope.DataDictionarySlaveList = [];
                        $scope.DataDictionarySlave.masterId = $scope.masid;
                        $scope.dataDictionarySlaves._load();
                        if(data == 1){
                            $scope.dataDictionaryMasters._load();
                            //$scope.detail(item,1);
                        }
                    }).error(function(data){
                        layer.msg('新增失败，请确认输入的数据！', {icon: 2});
                    });
                }else{
                    $scope.DataDictionarySlave.slaveId = $("#ids").val();
                    $scope.DataDictionarySlave.createId = $("#createid").val();
                    $scope.DataDictionarySlave.createTime = $("#createtime").val();
                    $scope.DataDictionarySlave.status = $("#status").val();
                    $scope.DataDictionarySlave.masterId = $("#mid").val();
                    $scope.DataDictionarySlave.updateId = $scope.user.userId;
                    //类型修改验证
                    if($scope.DataDictionarySlave.slaveName==null||$scope.DataDictionarySlave.slaveName.replace(/\s+/g,"")==""){
                        layer.alert("类型属性不能为空！",{icon : 0});
                        return;
                    }else if($scope.DataDictionarySlave.description==null||$scope.DataDictionarySlave.description.replace(/\s+/g,"")==""){
                        layer.alert("类型显示不能为空！",{icon : 0});
                        return;
                    }
                    if($scope.DataDictionarySlave.slaveName.length>16 || $scope.DataDictionarySlave.description.length>16){
                        layer.alert("字符长度不能大于16！",{icon : 0});
                        return;
                    }
                    $http.post(url + '/DataDictionary/updateSlave', {DataDictionarySlave : $scope.DataDictionarySlave}).success(function(data){
                        if(data == 0){
                            layer.msg('无法修改默认属性！', {icon: 0});
                        } else {
                            layer.msg('修改成功！', {icon: 1});
                        }
                        $scope.DataDictionarySlave = {};
                        $("#new").modal("hide");
                        $scope.DataDictionarySlaveList = [];
                        $scope.DataDictionarySlave.masterId = $("#mid").val();
                        $scope.dataDictionarySlaves._load();

                    }).error(function(data){
                        layer.msg('修改失败，请确认输入的数据！', {icon: 2});
                    });
                }
            }
        };

        //更改数据字典主表状态-失效
        $scope.changeMasterStatusOff = function(){
            if($scope.DataDictionaryMasterList.length == 0){
                layer.msg('请选择至少一条记录！', {icon: 3});
            }else{
                $scope.masterIds = {};
                $scope.masterIdsList = [];
                for(var i = 0; i < $scope.DataDictionaryMasterList.length; i ++){
                    $scope.masterIdsList.push($scope.DataDictionaryMasterList[i].masterId);
                }
                $scope.masterIds = $scope.masterIdsList.join(",");
                $http.post(url + '/DataDictionary/deleteMaster/' + $scope.masterIds).success(function(data){
                    layer.msg('失效成功！', {icon: 1});
                    $scope.DataDictionaryMasterList = [];
                    $scope.dataDictionaryMasters._load();
                    $scope.showSlave = false;
                }).error(function(data){
                    layer.msg('失效失败，请重新操作！', {icon: 2});
                });
            }
        };

        //更改数据字典主表状态-有效
        $scope.changeMasterStatusOn = function(){
            if($scope.DataDictionaryMasterList.length == 0){
                layer.msg('请选择至少一条记录！', {icon: 0});
            }else{
                $scope.masterIds = {};
                $scope.masterIdsList = [];
                for(var i = 0; i < $scope.DataDictionaryMasterList.length; i ++){
                    $scope.masterIdsList.push($scope.DataDictionaryMasterList[i].masterId);
                }
                $scope.masterIds = $scope.masterIdsList.join(",");
                $http.post(url + '/DataDictionary/deleteMasterOn/' + $scope.masterIds).success(function(data){
                    layer.msg('开启成功！', {icon: 1});
                    $scope.DataDictionaryMasterList = [];
                    $scope.dataDictionaryMasters._load();
                    $scope.showSlave = false;
                }).error(function(data){
                    layer.msg('开启失败，请重新操作！', {icon: 2});
                });
            }
        };


        //根据主表id查询从表数据
        $scope.tmpIndex = 1;
        $scope.detail = function(master,index){
            $scope.index=index;
            $scope.dis=false;
            $scope.tmpIndex = index - 1;
            $scope.DataDictionarySlave = {};
            $scope.btnIndex = master.masterId;
            $scope.DataDictionaryMasters = master;
            $scope.DataDictionarySlave.masterId = master.masterId;
            $scope.DataDictionarySlave.dataDictionaryMaster = master;
       //     $scope.DataDictionarySlave.projectId = $scope.project.projectId;
            $scope.DataDictionarySlave.projectId = $scope.DataDictionaryMasterProject.projectId
            var getSlave = function (page, callback) {
                $scope.DataDictionarySlave.page = page;
                $http.post(url + '/DataDictionary/listPageSlave', {DataDictionarySlave : $scope.DataDictionarySlave}).success(callback);
            };
            $scope.dataDictionarySlaves = app.get('Paginator').list(getSlave, 6);
            $scope.DataDictionarySlaveList = [];
            $scope.showSlave = true;
            $scope.showMaster = true;
            $scope.showProject = false;
            for(var i=0;i<$scope.allMasters.length;i++){
                if(master.masterId==$scope.allMasters[i].masterId){
                    $scope.dis=true;
                }
            }
        };

        //打开数据字典从表新增模态框
        $scope.openaddSlave = function(){
            if($scope.project.state == null){
                $scope.project.state = $scope.project.Project.state;
            }
            if($scope.project.state == '5'){
                layer.msg('无法新建默认属性！', {icon: 0});
                return;
            }
            $scope.typeShow = '1';
            document.getElementById("types").value = 1;
            document.getElementById("ids").value = '';
            document.getElementById("name").value = '';
            document.getElementById("description").value = '';
            document.getElementById("mid").value = $scope.DataDictionarySlave.masterId;
            document.getElementById("name").disabled = false;
            $("#new").modal("show");
        };

        //打开修改数据字典主表模态框
        $scope.openupdateSlave = function(){
            if($scope.project.state == null){
                $scope.project.state = $scope.project.Project.state;
            }
            if($scope.project.state == '5'){
                layer.msg('无法编辑默认属性！', {icon: 0});
                return;
            }
            $scope.typeShow = '3';
            if($scope.DataDictionarySlaveList.length == 0){
                layer.msg('请选择需要修改的数据！', {icon: 0});
            }else if($scope.DataDictionarySlaveList.length > 1){
                layer.msg('一次只能修改一条数据！', {icon: 5});
            }else{
                $scope.DataDictionarySlave = $scope.DataDictionarySlaveList[0];

                document.getElementById("ids").value = $scope.DataDictionarySlave.slaveId;
                document.getElementById("types").value = 1;
                document.getElementById("createtime").value = $scope.DataDictionarySlave.createTime;
                document.getElementById("createid").value = $scope.DataDictionarySlave.createId;
                document.getElementById("name").value = $scope.DataDictionarySlave.slaveName;
                document.getElementById("description").value = $scope.DataDictionarySlave.description;
                document.getElementById("status").value = $scope.DataDictionarySlave.status;
                document.getElementById("mid").value = $scope.DataDictionarySlave.masterId;
                document.getElementById("name").disabled = true;
                $("#new").modal("show");
            }
        };

        //更改数据字典从表状态-失效
        $scope.changeSlaveStatusOff = function(){
            if($scope.project.state == null){
                $scope.project.state = $scope.project.Project.state;
            }
            if($scope.project.state == '5'){
                layer.msg('无法修改默认属性状态！', {icon: 0});
                return;
            }
            if($scope.DataDictionarySlaveList.length == 0){
                layer.msg('请选择至少一条记录！', {icon: 5});
            }else{
                $scope.slaveIds = {};
                $scope.slaveIdsList = [];
                for(var i = 0; i < $scope.DataDictionarySlaveList.length; i ++){
                    $scope.slaveIdsList.push($scope.DataDictionarySlaveList[i].slaveId);
                }
                $scope.slaveIds = $scope.slaveIdsList.join(",");
                $http.post(url + '/DataDictionary/deleteSlaveOff/' + $scope.slaveIds + '/' + $scope.DataDictionarySlave.masterId).success(function(data){
                    if(data == 0){
                        layer.msg('无法修改默认属性状态！', {icon: 0});
                    } else {
                        layer.msg('失效成功！', {icon: 1});
                    }
                    $scope.DataDictionarySlave.masterId = $scope.DataDictionarySlaveList[0].masterId;
                    $scope.DataDictionarySlaveList = [];
                    $scope.dataDictionarySlaves._load();
                }).error(function(data){
                    layer.msg('失效失败，请重新操作！', {icon: 2});
                });
            }
        };

        //更改数据字典从表状态-有效
        $scope.changeSlaveStatusOn = function(){
            if($scope.project.state == null){
                $scope.project.state = $scope.project.Project.state;
            }
            if($scope.project.state == '5'){
                layer.msg('无法修改默认属性状态！', {icon: 0});
                return;
            }
            if($scope.DataDictionarySlaveList.length == 0){
                layer.msg('请选择至少一条记录！', {icon: 5});
            }else{
                $scope.slaveIds = {};
                $scope.slaveIdsList = [];
                for(var i = 0; i < $scope.DataDictionarySlaveList.length; i ++){
                    $scope.slaveIdsList.push($scope.DataDictionarySlaveList[i].slaveId);
                }
                $scope.slaveIds = $scope.slaveIdsList.join(",");
                $http.post(url + '/DataDictionary/deleteSlaveOn/' + $scope.slaveIds + '/' + $scope.DataDictionarySlave.masterId).success(function(data){
                    if(data == 0){
                        layer.msg('无法修改默认属性状态！', {icon: 0});
                    } else {
                        layer.msg('开启成功！', {icon: 1});
                    }
                    $scope.DataDictionarySlave.masterId = $scope.DataDictionarySlaveList[0].masterId;
                    $scope.DataDictionarySlaveList = [];
                    $scope.dataDictionarySlaves._load();
                }).error(function(data){
                    layer.msg('开启失败，请重新操作！', {icon: 2});
                });
            }
        };


        //数据字典主表复选框勾选或取消
        $scope.addorUpdateId = function(item){

            var checks = document.getElementById(item.masterId);
            if(checks.checked == true){
                $scope.DataDictionaryMasterList.push(item);

            }else{
                $scope.temp = [];
                $scope.temp = $scope.DataDictionaryMasterList;
                $scope.DataDictionaryMasterList = [];
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i].masterId != item.masterId){
                        $scope.DataDictionaryMasterList.push($scope.temp[i]);
                    }
                }
            }

        };
        //数据字典从表复选框勾选或取消
        $scope.addOrUpdateSlaveId = function(item){
            var checks = document.getElementById(item.slaveId);
            if(checks.checked == true){
                $scope.DataDictionarySlaveList.push(item);
            }else{
                $scope.temp = [];
                $scope.temp = $scope.DataDictionarySlaveList;
                $scope.DataDictionarySlaveList = [];
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i].slaveId != item.slaveId){
                        $scope.DataDictionarySlaveList.push($scope.temp[i]);
                    }
                }
            }
        };

        //所有项目复选框勾选或取消
        $scope.timeShow = {};
        $scope.addOrDeleteProjectId = function(item,index,$event){
            var checks = document.getElementById(item.projectId);
            if(checks.parentNode.parentNode.style.backgroundColor == '' || index!=1){
                for(var i = 0; i < $scope.projectIds.length; i ++){
                    if(document.getElementById($scope.projectIds[i]) != null){
                        document.getElementById($scope.projectIds[i]).checked = false;
                        document.getElementById($scope.projectIds[i]).parentNode.parentNode.style.backgroundColor='';
                    }
                }
                checks.parentNode.parentNode.style.backgroundColor='#f6f8fa';
                checks.checked=true;
                $scope.projectIds = [];
                $scope.projectIds.push(item.projectId);
            }else{
                checks.parentNode.parentNode.style.backgroundColor='';
                document.getElementById(item.projectId).checked = false;
                checks.checked=false;
                $scope.projectIds = [];
            }
            $scope.timeShow = item;
            if(index==1){
                $event.stopPropagation();
            }
        };

        //选择项目，提交
        $scope.submitProject = function(){
            if($scope.projectIds == null || $scope.projectIds == ''){
                layer.msg('请选择至少一条记录！', {icon: 0});
                return;
            }
            var checks = document.getElementById($scope.projectIds);
            if(checks.checked == false){
                layer.msg('请选择至少一条记录！', {icon: 0});
                return;
            }
            $scope.ckdItme = $scope.timeShow;
            $scope.allMaster();
            $scope.dataDictionaryMasters._load();
        }

        //主表搜索
        $scope.selectMaster = function(){
            $scope.dataDictionaryMasters._load();
            $scope.allMaster();
        }

        //选中
        $scope.ckdItme = null;
        $scope.openProject = function(){
            if($scope.ckdItme !=null){
                $scope.addOrDeleteProjectId($scope.ckdItme,0);
            }
            if($scope.project.projectId == null || $scope.project.projectId == ''){
                document.getElementById($scope.projects.object.project[1].projectId).checked = true;
                document.getElementById($scope.projects.object.project[1].projectId).parentNode.parentNode.style.backgroundColor='#f6f8fa';
                $scope.projectIds.push($scope.projects.object.project[1].projectId);
                $scope.project.projectId = $scope.projects.object.project[1].projectId;
                $scope.project.projectName = $scope.projects.object.project[1].projectName;

                $scope.ckdItme = $scope.project;
            }
            $("#new1").modal("show");
        };
        /***********************   方法end     *************************/

        /***********************   载入方法start   *************************/
        $scope.currentCheck = [];
        /**
         * 首次加载load
         */
        $scope.load = function(){
            $scope.showMaster = true;                                   //显示数据字典主表数据div
            $scope.showSlave = false;                                   //显示数据字典从表数据div
            $scope.showProject = false;                                 //显示关联项目div

            //获取默认projectID
            $scope.dufaultProject = {};
            $http.get(url + '/Project/getProjectByState').success(function(data){
                $scope.project = data;
                $scope.dufaultProject = data;
            }).error(function(data){
            });

            //获取所有的主表数据
            $scope.DataDictionaryMasterProject.projectId = $scope.project.projectId;
            $scope.allMaster = function() {
                $http.post(url + '/DataDictionary/listAllMaster', {DataDictionaryMasterProject: $scope.DataDictionaryMasterProject}).success(function (data) {
                    if (data.DataDictionaryMasterProject.length > 0) {
                        $scope.currentCheck = data.DataDictionaryMasterProject;
                        //默认显示第一条主表样式
                        $scope.btnIndex = $scope.currentCheck[0].dataDictionaryMaster.masterId;
                        //默认查询第一条主表从表数据
                        //$scope.detail($scope.currentCheck[0].dataDictionaryMaster, 1);
                    } else {
                        layer.msg('无数据！', {icon: 5});
                    }
                }).error(function (data, status, headers, config) {
                    layer.msg('查询失败！', {icon: 2});
                });
            };
            $scope.allMaster();

            $scope.index=null;
            $scope.firstDetail= function (index,item) {
                if($scope.index!=null){
                    if(index==$scope.index){
                        $scope.detail(item,1);
                        $scope.index=null;
                        console.log(item);
                        return;
                    }
                }else{
                    if(index==1){
                        $scope.detail(item,1);
                    }
                }

            };

            //根据项目id查询项目关联的数据字典主表数据
            var getMaster = function (page, callback) {
                $("#new1").modal("hide");

                 $scope.project =  $scope.timeShow;
                 $scope.project.projectId =   $scope.timeShow.projectId;
                 $scope.project.projectName =   $scope.timeShow.projectName;

                $scope.showSlave = false;
                $scope.DataDictionaryMasterProject.page = page;
                $scope.DataDictionaryMasterProject.projectId = $scope.project.projectId;
                $http.post(url + '/DataDictionary/listPageMaster', {DataDictionaryMasterProject : $scope.DataDictionaryMasterProject}).success(callback);

            };
            $scope.dataDictionaryMasters = app.get('Paginator').list(getMaster, 6);

            //分页查询项目数据
            var getProject = function(page, callback){
                $scope.Project.page = page;
                $scope.Project.company= companyId ;
                $http.post(url + '/Project/listPageProjectByState', {Project : $scope.Project}).success(callback);
            };
            $scope.projects = app.get('Paginator').list(getProject, 6);

        };

        $scope.load();
        //获取所有默认字典数据
        $http.post(url+'/DataDictionary/listAllMasterId').success(function (date) {
            $scope.allMasters = date.DataDictionaryMasterProject;
        })
        /***********************   载入方法end     *************************/

    }]);
});
