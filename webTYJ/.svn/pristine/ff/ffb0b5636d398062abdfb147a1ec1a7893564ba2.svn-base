/**
 * Created by NM on 2018/1/18.
 * 宠物登记-新增宠物js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('newPetCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.personCusts={};
        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';
        $scope.doClick(1);//增加刷新时tab高亮保持不变的方法  王洲  2016.1.13

        $scope.addPetRegistration={};
        var nowTime=new Date();
        $scope.addPetRegistration.registrationTime= nowTime;


        var projectId = null;
        $http.get(url + '/Project/getProjectByState').success(function(data) {
            $scope.Project = data.Project;
            projectId = data.Project.projectId;

            //得到在属性配置中的属性
            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/pet_sex/' +projectId).success(function(data){
                $scope.petSexList= data.DataDictionarySlave;
            });
        });

        $scope.annexs=[];
        /**
         * <p>宠物信息新增</p>
         * @constructor
         */
        $scope.AddPetRegistration=function(){
            if($scope.addPetRegistration.petName == null){
                layer.alert('请输入宠物名称！',{icon : 0});
                return;
            }else if($scope.addPetRegistration.petType == null){
                layer.alert('请输入宠物类型！',{icon : 0});
                return;
            }else if($scope.addPetRegistration.personBuildingId == null){
                layer.alert('请关联房屋！',{icon : 0});
                return;
            }else if($scope.addPetRegistration.custId == null){
                layer.alert('请选择登记人！',{icon : 0});
                return;
            }/*else if($scope.addPetRegistration.petSex == null){
                layer.alert('请选择宠物性别！',{icon : 0});
                return;
            }*/
            $http.post(url + '/PetRegistration/insertPetRegistration', {PetRegistration: $scope.addPetRegistration}).success(function () {
                layer.alert('添加成功！',{icon : 1});
                $location.path("index/propertyService/staffHome/petRegistration/history");
                $scope.doClick(2);//添加跳转后tab高亮显示  王洲  2016.1.13
            }).error(function (data, status, headers, config) {
                layer.alert('添加失败！',{icon : 2});
            });
        };

        /**
         * <p>关联房屋信息查询</p>
         * @Time 9:30
         */

        $scope.PersonBuildingNew = {};
        $scope.tmpIndex = {};
        $scope.searchPersonBuilding = function(){
            if($scope.tmpIndex!=null){
                $scope.btnIndex = $scope.tmpIndex;
            }else{
                $scope.btnIndex = null;
            }
            $scope.PersonBuildingNew.custId = $scope.personCust.custId;
            //$scope.PersonBuildingNew.projectType='58b0f99a-6845-4c6e-8761-42ae671aa858';
            $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                $scope.PersonBuildingNewList = data.PersonBuildingNew;
                console.log($scope.PersonBuildingNewList);
                $('#file').modal({backdrop: 'static', keyboard: false});
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
        $scope.phn = {};
        $scope.addIndex = {};
        $scope.addHouseName=function(pbn,index){
            $scope.pbn = pbn;
            $scope.addIndex = index;
            $scope.btnIndex = pbn.buildingStructureId;
            //$scope._buildingStructureId = pbn.buildingStructureId;
            if($scope.pbn.houseNew != null && $scope.addIndex==1){
                $scope.btnIndex = $scope.pbn.houseNew.id;
            }else if($scope.pbn.stallNew != null && $scope.addIndex==2){
                $scope.btnIndex =  $scope.pbn.stallNew.stallId;
            }else if($scope.pbn.storeNew != null && $scope.addIndex==3){
                $scope.btnIndex = $scope.pbn.storeNew.storeId;
            }
        };
        $scope.addHouse=function(){

            $scope.addPetRegistration.personBuildingId = $scope.pbn.buildingStructureId;
            if($scope.pbn.houseNew != null && $scope.addIndex==1){
                $scope.buildingInfo.fullName = $scope.pbn.houseNew.fullName;
                $scope.buildingInfo.id = $scope.pbn.houseNew.buildingStructureId;
                $scope.personParam.houseId = $scope.pbn.houseNew.id;
                $scope.btnIndex = $scope.pbn.houseNew.id;
            }else if($scope.pbn.stallNew != null && $scope.addIndex==2){
                $scope.buildingInfo.id = $scope.pbn.stallNew.buildingStructureId;
                $scope.buildingInfo.fullName = $scope.pbn.stallNew.fullName;
                $scope.personParam.houseId = $scope.pbn.stallNew.stallId;
                $scope.btnIndex =  $scope.pbn.stallNew.stallId;
            }else if($scope.pbn.storeNew != null && $scope.addIndex==3){
                $scope.buildingInfo.id = $scope.pbn.storeNew.buildingStructureId;
                $scope.buildingInfo.fullName = $scope.pbn.storeNew.fullName;
                $scope.personParam.houseId = $scope.pbn.storeNew.storeId;
                $scope.btnIndex = $scope.pbn.storeNew.storeId;
            }
            $scope.personParam.buildingStructureId = $scope.pbn.buildingStructureId;
            //$scope.personParam.projectType = "56ede32b-7fe0-434c-95c1-0051bc5cf44e";
            $scope.personParam.custId = $rootScope.user.custId;
            $http.post(url + '/PersonCustNew/getPersonCustNew',{Search:$scope.personParam}).success(function(data){
                $scope.PersonCustNewList = data.PersonCustNew;
            });
            $scope.tmpIndex = $scope.btnIndex;
        };


        //根据条件搜索人员信息
        $scope.search={};

        $scope.selectPerson=function(){

            $http.post(url+'/PersonCustNew/listAllPersonBySearch',{Search:$scope.search}).success(function(data)
            {
                $scope.person=data.PersonCustNew;

            });
        };
        //选中人员
        $scope.personone={};
        $scope.choicePerson=function(person){
            $scope.personone=person;
            $scope.addPetRegistration.registrant=$scope.personone.custId;
        };

        //取消增加宠物的信息
        $scope.resetPet=function(){
            $scope.addPetRegistration={};
            $scope.buildingInfo = {};
            var nowTime=new Date();
            $scope.addPetRegistration.registrationTime= nowTime;
            $location.path("index/propertyService/staffHome/petRegistration/history");
            $scope.doClick(2);
        };
        //取消宠物主人
        $scope.resetHost=function(){
            $scope.personone={};
        };


        /**
         * 上传文件
         * @type
         */
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.annex = {annexAddress:'',annexName:'',relationId:''};
            //$scope.annex = {annexAddress:'',annexName:''};
        $(function(){
            // 初始化插件
            $("#zyupload").zyUpload({
                itemWidth        :   "140px",                 // 文件项的宽度
                itemHeight       :   "115px",                 // 文件项的高度
                url              :   fileUrl+"/FileService",  // 上传文件的路径
                fileType         :   ["jpg","png","jpeg","gif"],// 上传文件的类型
                fileSize         :   23474836480,                  // 上传文件的大小
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
                    $scope.annexs.push($scope.annex);
                    $scope.addPetRegistration.annexs = $scope.annexs;
                    $scope.annex={};
                    layer.msg("上传成功",{icon : 1,time : 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    $("#uploadInf").append("<p style='color: red'>上传失败</p>");
                },
                onComplete: function(response){           	  // 上传完成的回调方法
                }
            });

        });

    }]);
});

