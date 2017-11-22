/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('petsInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(4);

        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';
        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };
        $scope.selected=function(items){
            $('table tr').css('background','#fff');
            var id=this.items.petId;
            document.getElementById(id).style.background='#f6f8fa'
            $scope.selectItems=items;
        }

        var url = $rootScope.url;
        //根据条件查询宠物信息
        $scope.PetRegistrations={};
        $scope.load=function(){
            var currentFunction = function (page, callback){
                $scope.PetRegistrations.page = page;
                $http.post(url + '/PetRegistration/listPagePetsByContion', {PetRegistration : $scope.PetRegistrations}).success(callback);
            };
            $scope.searchPet = app.get('Paginator').list(currentFunction, 6);
        }
        $scope.load();

        /**
         * 查看详情
         * @param items
         */
        $scope.pets={};
        $scope.showItem = function(items){
            $scope.pets = items;
            $('#showModal').modal({backdrop: 'static', keyboard: false});
        };

        /**
         * <p>修改宠物信息</p>
         * @param petRegistration
         */
        $scope.custId='';
        $scope.PersonCustNewList=[];
        $scope.view=function(items)
        {
            //初始化上传插件
            $("#zyupload").remove();
            $("#remove").append('<div id="zyupload" class="zyupload"></div>');

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
                        $scope.pet.petPic = filePath;
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        $("#uploadInf").append("<p style='color: red'>上传失败</p>");
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });

            $scope.buildingInfo={};
            $('#editModal').show().modal({backdrop: 'static', keyboard: false});
            $scope.petId=items.petId;
            $scope.custId=items.custId;
            $http.get(url + '/PetRegistration/getPetRegistrationbyId/' + $scope.petId).success(function(data){
                $scope.pet=data.PetRegistration;
                $scope.pet.registrationTime = new Date($scope.pet.registrationTime);
                $scope.PersonCustNewList[0] = data.PetRegistration.personCustNew;
                $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlave/pet_sex/' + data.PetRegistration.personBuildingId).success(function(data){
                    $scope.petSexList = data.DataDictionarySlave;
                });
            }).error(function(data){
                layer.alert('没有对应的宠物信息，请重试',{icon : 2, time : 2000});
            });
        };

        $scope.views=function() {
            if($scope.selectItems==null){
                layer.alert('请选中一项后再操作！',{icon:2})
                return;
            }
            $scope.view($scope.selectItems);
        };

        $scope.update=function()
        {
            if($scope.pet.petName==null||$scope.pet.petName==""){
                layer.alert('请输入宠物姓名',{icon:2})
                return ;
            }else if($scope.pet.petType==null||$scope.pet.petType==""){
                layer.alert('请输入宠物类型',{icon:2})
                return ;
            }else if($scope.pet.petNo==null||$scope.pet.petNo==""){
                layer.alert('请输入宠物编号',{icon:2})
                return ;
            }else if($scope.pet.buildingStructureNew==null||$scope.pet.buildingStructureNew==""){
                layer.alert('请选择关联房屋',{icon:2})
                return ;
            }else if($scope.pet.custId==null||$scope.pet.custId==""){
                layer.alert('请输入登记人',{icon:2})
                return ;
            }
            $http.put(url+'/PetRegistration/updatePetRegistration',{PetRegistration:$scope.pet}).success(function()
            {
                layer.alert('修改成功！',{icon : 1});
                $scope.searchPet._load();
            }).error(function(data, status, headers, config){
                layer.alert('修改失败！',{icon : 2});
            }) ;
            $('#editModal').hide();
        };

        /**
         * <p>关联房屋信息查询</p>
         * @Time 9:30
         */
        $scope.searchPersonBuilding = function(){
            $scope.PersonBuildingNew = {};
            $scope.PersonBuildingNew.custId = $scope.custId;
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
        $scope.addHouseName=function(pbn){
            $scope.btnIndex = pbn.buildingStructureId;
            $scope._buildingStructureId = pbn.buildingStructureId;
            $scope.pet.personBuildingId = pbn.buildingStructureId;
            if(pbn.houseNew != null){
                $scope.buildingInfo.fullName = pbn.houseNew.fullName;
                $scope.buildingInfo.id = pbn.houseNew.buildingStructureId;
                $scope.personParam.houseId = pbn.houseNew.id;
                $scope.pet.buildingStructureNew=$scope.buildingInfo;
            }else if(pbn.stallNew != null){
                $scope.buildingInfo.id = pbn.stallNew.buildingStructureId;
                $scope.buildingInfo.fullName = pbn.stallNew.fullName;
                $scope.personParam.houseId = pbn.stallNew.stallId;
                $scope.pet.buildingStructureNew=$scope.buildingInfo;
            }else if(pbn.storeNew != null){
                $scope.buildingInfo.id = pbn.storeNew.buildingStructureId;
                $scope.buildingInfo.fullName = pbn.storeNew.fullName;
                $scope.personParam.houseId = pbn.storeNew.storeId;
                $scope.pet.buildingStructureNew=$scope.buildingInfo;
            }
            $scope.personParam.buildingStructureId = pbn.buildingStructureId;
            $scope.personParam.projectType = "56ede32b-7fe0-434c-95c1-0051bc5cf44e";
            $scope.personParam.custId = $scope.custId;
            $http.post(url + '/PersonCustNew/getPersonCustNew',{Search:$scope.personParam}).success(function(data){
                $scope.PersonCustNewList = data.PersonCustNew;
            });


        };

        /**
         * 宠物记录删除（逻辑删除，修改状态为0）
         * @param petId
         */
        $scope.deletePet=function(petId) {
            layer.confirm('确定要删除该记录？',{
                btn : ['是','否']
            },function(){
                $scope.toDeletePet(petId);
            },function(){
            })
        };
        $scope.deletePets=function() {
            if($scope.selectItems==null){
                layer.alert('请选中一项后再操作！',{icon:2})
            }
            $scope.deletePet($scope.selectItems.petId);
        };

        $scope.toDeletePet = function(petId){
            $http.put(url + '/PetRegistration/deletePetRegistration/' + petId).success(function(data){
                layer.msg('删除成功',{icon : 1, time : 2000});
                $scope.searchPet._load();
            });
        };

        /**
         * 上传文件
         * @type
         */
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
                    $scope.pet.petPic = filePath;
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