/**
 * Created by NM on 2018/1/18.
 * 宠物登记js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historyPetCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var filePath = '';
        var fileUrl = $rootScope.fileUrl;
        $scope.fileUrl = $rootScope.fileUrl;
        var url = $rootScope.url;
        //根据条件查询宠物信息
        $scope.PetRegistrations={};
        $scope.PetRegistrations.custId=$scope.personCust.custId;
        $scope.x=false;             //用于绑定checkbox

        var currentFunction = function (page, callback){
            $scope.PetRegistrations.page = page;
            $http.post(url + '/PetRegistration/listPagePetRegistration', {PetRegistration : $scope.PetRegistrations}).success(callback);
        };
        $scope.searchPet = app.get('Paginator').list(currentFunction,6);
        console.log($scope.searchPet);

        $scope.showStatus=1;

        //网格切换
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }

        var projectId = null;
        $http.get(url + '/Project/getProjectByState').success(function(data) {
            $scope.Project = data.Project;
            projectId = data.Project.projectId;

            //得到在属性配置中的属性
            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/pet_sex/' +projectId).success(function(data){
                $scope.petSexList= data.DataDictionarySlave;
            });
        });

        //移除图片
        $scope.delPic = function (item) {
            $scope.picItem = [];
            $scope.picItem = $scope.pet.annexs;
            $scope.pet.annexs = [];
            for (var i = 0; i < $scope.picItem.length; i++) {
                if (item.annexAddress != $scope.picItem[i].annexAddress) {
                    $scope.pet.annexs.push($scope.picItem[i]);
                }
            }
        };

        /**
         * <p>修改宠物信息</p>
         * @param petRegistration
         */
        $scope.view=function(petId)
        {
            $http.get(url + '/PetRegistration/getPetRegistrationbyId/' + petId).success(function(data){
                var temp = data.PetRegistration;
                //$scope.pet=data.PetRegistration;
                temp.registrationTime = new Date(temp.registrationTime);
                $scope.personParam.buildingStructureId = temp.buildingStructureNew.id;
                //$scope.personParam.projectType = "56ede32b-7fe0-434c-95c1-0051bc5cf44e";
                $scope.personParam.custId = $rootScope.user.custId;
                $http.post(url + '/PersonCustNew/getPersonCustNew',{Search:$scope.personParam}).success(function(data){
                    //$scope.$apply(function () {
                   /*  bug1914
                   更改加载数据后确认
                   徐文广  2016/5/24
                   * */
                    $scope.PersonCustNewList = data.PersonCustNew;
                    setTimeout(function () {
                        $scope.$apply(function(){
                            $scope.pet = temp;
                        })
                    },100);

                    //});
                    console.log($scope.PersonCustNewList);
                });
            }).error(function(data){
                layer.alert('没有对应的宠物信息，请重试',{icon : 2, time : 2000});
            });
        };

        $scope.update=function()
        {
            if(angular.isUndefined($scope.pet.petName)||angular.equals($scope.pet.petName,'')){
                layer.alert('请输入宠物名称！',{icon : 0});
                return;
            }else if(angular.isUndefined($scope.pet.petType)||angular.equals($scope.pet.petType,'')){
                layer.alert('请输入宠物类型！',{icon : 0});
                return;
            }else if(angular.isUndefined($scope.pet.personBuildingId)||angular.equals($scope.pet.personBuildingId,'')){
                layer.alert('请关联房屋！',{icon : 0});
                return;
            }else if(angular.isUndefined($scope.pet.custId)||angular.equals($scope.pet.custId,'')){
                layer.alert('请选择登记人！',{icon : 0});
                return;
            }/*else if(angular.isUndefined($scope.pet.petSex)||angular.equals($scope.pet.petSex,'')){
                layer.alert('请选择宠物性别！',{icon : 0});
                return;
            }*/
            $http.put(url+'/PetRegistration/updatePetRegistration',{PetRegistration:$scope.pet}).success(function()
            {
                layer.alert('修改成功！',{icon : 1});
                $("#editModal").modal("hide");
                $scope.searchPet._load();
            }).error(function(data, status, headers, config){
                layer.alert('修改失败！',{icon : 2});
            }) ;
        };




        /**
         * 获取选中的宠物信息对象
         * @param id
         */
        $scope.petArray=[];
        var getChosedPets=function(){
            $scope.petArray = [];//清空
            var ids = document.getElementsByName("petId");
            for ( var i = 0; i < ids.length; i++) {
                if (ids[i].checked ==true) {
                    $scope.petArray.push(ids[i].value);
                }
            }
        }

        /**
         * 宠物记录删除（逻辑删除，修改状态为0）
         * @param petId
         */
        $scope.deletePet=function() {
            getChosedPets();
            if($scope.petArray!= null && $scope.petArray.length>0){
                layer.confirm('确定要删除该记录？',{
                    btn : ['是','否']
                },function(){
                    $scope.remove();
                },function(){

                })
            }else{
                layer.msg('还没有选中任何宠物记录!',{icon : 0});
            }

        };


        $scope.remove=function(){
            if($scope.petArray != null && $scope.petArray.length>0){
                for(var i=0;i<$scope.petArray.length;i++){
                    var id = $scope.petArray[i];
                    if(id != null && id != ''){
                        $http.put(url + '/PetRegistration/deletePetRegistration/' + id).success(
                            function() {
                                layer.msg('删除宠物记录成功!',{icon : 1});
                                $scope.searchPet._load();
                            }).error(function(data, status, headers, config) {
                                layer.msg('删除宠物记录失败!',{icon : 2});
                            });
                    }
                }
            }
        };


        $scope.toDeletePet = function(petId){
            layer.confirm('确定要删除该记录？',{
                btn : ['是','否']
            },function(){
                $http.put(url + '/PetRegistration/deletePetRegistration/' + petId).success(function(data){
                    layer.msg('删除成功',{icon : 1, time : 2000});
                    $scope.searchPet._load();
                });
            },function(){

            })

        };


        /**修改bug567
         * 修改点击效果为整行点击有效
         *杨升权  2016/5/27
         */
        $scope.changeItme = function(itme){
            var checked = document.getElementById(itme.petId);
            if(checked.checked == true){
                checked.checked = false;
                checked.parentNode.parentNode.style.background = '';
                if($scope.petArray.length>0){
                    for(var i=0;i<$scope.petArray.length;i++){
                        if(itme.petId==$scope.petArray[i]){
                            $scope.petArray.splice(i,1) ;
                        }
                    }
                }
            }else {

                checked.checked = true;
                checked.parentNode.parentNode.style.background = '#f6f8fa';
               $scope.petArray = [];//清空
                $scope.petArray.push(itme);


            }
        }


        $scope.pet={annexs:[]};
        $scope.getModifyPet = function() {
            getChosedPets();
            if ($scope.petArray.length > 1) {
                layer.msg('修改时只能选择一项', {icon: 0});
                $scope.pet= {};
            } else if ($scope.petArray.length == 1) {
                $scope.pet=$scope.view($scope.petArray[0]);
                console.log($scope.pet);
                $("#editModal").modal("show");
            }else{
                layer.msg('还没有选中任何宠物记录!',{icon : 0});
            }

            $scope.annexs = [];
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function () {
                // 初始化插件
                $("#remove").html('');
                $("#remove").append('<div id="zyupload" class="zyupload"></div>');
                $("#zyupload").zyUpload({
                    itemWidth: "140px",                 // 文件项的宽度
                    itemHeight: "115px",                 // 文件项的高度
                    url: fileUrl + "/FileService",  // 上传文件的路径
                    fileType: ["jpg", "png", "jpeg", "gif", "xls", "docx", "xlsx", "pdf", "txt", "doc", "ppt"],// 上传文件的类型
                    fileSize: 51200000,                // 上传文件的大小
                    multiple: true,                    // 是否可以多个文件上传
                    dragDrop: true,                    // 是否可以拖动上传文件
                    tailor: true,                    // 是否可以裁剪图片
                    del: true,                    // 是否可以删除文件
                    finishDel: false,  				  // 是否在上传文件完成后删除预览
                    //外部获得的回调接口
                    onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                    },
                    onDelete: function (file, files) {
                    },
                    onSuccess: function (file, response) {          // 文件上传成功的回调方法
                        filePath = response;
                        $scope.annex = {annexAddress: '', annexName: ''};
                        $scope.annex.annexName = file.name;
                        $scope.annex.annexAddress = filePath;
                        $scope.annexs.push($scope.annex);
                        $scope.pet.annexs = $scope.annexs;
                        layer.msg("上传成功", {icon: 1, time: 2000});
                    },
                    onFailure: function (file, response) {          // 文件上传失败的回调方法
                        layer.msg("上传失败", {icon: 1, time: 2000});
                    },
                    onComplete: function (response) {           	  // 上传完成的回调方法

                    }
                });

            });
        }
        /**
         * <p>关联房屋信息查询</p>
         * @Time 9:30
         */
        $scope.searchPersonBuilding = function(){
            /*var custId = $scope.personCust.custId;
             $http.get(url + '/PersonBuildingNew/listPersonBuildingNewByCustId/'+custId).success(function(data){
             $scope.PersonBuildingNewList = data.PersonBuildingNew;
             }).error(function(data, status,headers, config){

             });*/
            console.log($scope.pet.personBuildingId);
            $scope.btnIndex =  $scope.pet.personBuildingId;
            $scope.PersonBuildingNew = {};
            $scope.PersonBuildingNew.custId = $scope.personCust.custId;
            $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                $scope.PersonBuildingNewList = data.PersonBuildingNew;
            }).error(function(data){
                layer.alert('没有关联的建筑',{icon : 0});
            });
        };


        /**
         * <p>将房屋信息放入输入框</P>
         * @Time 10:30
         */
        $scope.personParam = {};//根据房屋id获取关联的人员
        $scope.buildingInfo={};
        var pbn = {};
        $scope.queding=function(pbnTmp){
            $scope.btnIndex = pbnTmp.buildingStructureId;
           pbn=pbnTmp;
        }
        $scope.addHouseName=function(){
            $scope._buildingStructureId = pbn.buildingStructureId;
            $scope.pet.personBuildingId = pbn.buildingStructureId;
            if(pbn.houseNew != null){
                $scope.buildingInfo.fullName = pbn.houseNew.fullName;
                $scope.buildingInfo.id = pbn.houseNew.buildingStructureId;
                $scope.personParam.houseId = pbn.houseNew.id;
            }else if(pbn.stallNew != null){
                $scope.buildingInfo.id = pbn.stallNew.buildingStructureId;
                $scope.buildingInfo.fullName = pbn.stallNew.fullName;
                $scope.personParam.houseId = pbn.stallNew.stallId;
            }else if(pbn.storeNew != null){
                $scope.buildingInfo.id = pbn.storeNew.buildingStructureId;
                $scope.buildingInfo.fullName = pbn.storeNew.fullName;
                $scope.personParam.houseId = pbn.storeNew.storeId;
            }
            $scope.personParam.buildingStructureId = pbn.buildingStructureId;
            $scope.personParam.projectType = "56ede32b-7fe0-434c-95c1-0051bc5cf44e";
            $scope.personParam.custId = $rootScope.user.custId;
            $http.post(url + '/PersonCustNew/getPersonCustNew',{Search:$scope.personParam}).success(function(data){
                $scope.PersonCustNewList = data.PersonCustNew;
            });

            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlave/pet_sex/' + $scope._buildingStructureId).success(function(data){
                $scope.petSexList = data.DataDictionarySlave;
            });
            console.log(pbn)
            $scope.pet.buildingStructureNew.fullName = pbn.buildingStructureNew.fullName;
            console.log($scope.pet.buildingStructureNew.fullName);
        };

        /**
         * 查看详情
         * @param items
         */
        $scope.showItem = function(items){
            console.log(items)
            $scope.pet = items;
            $scope.pets = {};
            //查询宠物信息以及关联的房屋信息
            $http.get(url + '/PetRegistration/getPetRegistrationbyId/' + items.petId).success(function(data){
                $scope.pets = data.PetRegistration;
                $("#showModal").modal("show");
            }).error(function(data){
                layer.alert('宠物信息查询失败！',{icon : 2});
            });
        };

    }]);
});