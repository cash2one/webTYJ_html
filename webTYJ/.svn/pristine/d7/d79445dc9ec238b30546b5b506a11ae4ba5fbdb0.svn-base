/**
 * Created by XC on 2018/1/18.
 * 房屋信息里的租赁
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');
    app.directive('setFocus', function(){
        return function(scope, element){
            element[0].focus();
        };
    });

    app.controller('leaseAddCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(2);
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        var url = $rootScope.url;
        $scope.search={page:{}};


        //查询房屋
        $scope.PersonBuildingNew = {};
        $scope.PersonBuildingNew.custId = $scope.personCust.custId;
        $scope.PersonBuildingNew.projectType='20cdcd6e-69b6-4178-9e2f-44078c899507';
        $scope.selectHouse=function(){
            $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                $scope.buildingStructure = data.PersonBuildingNew;
                //    console.log($scope.buildingStructure);
                $('#myModale').modal({backdrop: 'static', keyboard: false});
            }).error(function(data){
                layer.msg("没有关联的建筑",{icon : 3,time : 2000});
            });
        };

        /**
         * 选中房屋
         * 将houseId更改为实际存buildingStructureId
         */

        $scope.houseone={};

        $scope.choiceHouse=function(house){
            $scope.btnIndex = house.buildingStructureId;
            $scope.addLease.honseId=house.buildingStructureId;
            $scope.addLease.houseAddress= house.buildingStructureNew.fullName;
            $scope.addLease.houseIdType= house.buildingStructureNew.buildingType;

        };

        //获取选择房屋的业主（人员建筑关系信息）
        $scope.selectPersonBuilding=function(){
            /*$http.get(url + '/PersonBuildingNew/listPersonBuildingNewone/'+$scope.houseone.buildingStructureId).success(function(data) {
                $scope.personsnew=data.PersonBuildingNew;
                for(var i=0;i<$scope.personsnew.length;i++){
                    if($scope.personsnew[i].custType=="业主" && $scope.personsnew[i].state==0){
                        $scope.addLease.custId=$scope.personsnew[i].personCustNew.custId;
                    }
                }
            }).error(function(){
            });*/
            $scope.addLease.custId=JSON.parse(sessionStorage.getItem('person_property')).custId;
        };

        /**
         * 人员搜索信息重置
         * @type {{page: {}}}
         */
        $scope.ryssqc=function(){
            $scope.currentPaginator={};
            $scope.selectPerson();

       }
        //根据条件搜索人员信息
        $scope.searchone={page:{}};
        $scope.selectPerson=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginator = app.get('Paginator').list(parent,4);
            //       console.log($scope.currentPaginator);

            /* $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(function(data)
             {
             console.log("搜索成功");
             $scope.person=data.PersonCustNew;
             console.log($scope.person);

             });*/
        };

        /**
         *  零时中转函数
         */
        $scope.centerChange = function(item)
        {
            $scope.newDate = [];
            for(var i in item)
            {
                $scope.newDate[i] = item[i];
            };
            return $scope.newDate;
        };

        //选中人员
        /*$scope.personone={};*/
        $scope.persons=[];
        var resule = [];
        $scope.choicePerson=function(person) {
            // $scope.btnIndex = person;
            // if ($scope.notrepeat($scope.persons, person)) {
            //     $scope.persons.push(person);
            // }
            // else {
            //     layer.alert('人员重复，请重新选择人员',{icon : 0});
            //     console.log($scope.persons);
            // }

            $scope.notrepeat(resule, person);
            //$scope.centerChange()
        };
        var getNames = function(){
            if($scope.persons != null && $scope.persons.length>0){//获取租客名称
                var custs = '';
                for(var i=0;i<$scope.persons.length;i++){
                    custs+=$scope.persons[i].name+',';
                }
                var names = custs.substring(0,custs.length-1);
                //       console.log(names);
            }
            return names;
        }


        //添加租赁
        $scope.addLease={annexs:[]};//新增租赁对象
        $scope.addLease.personBuildingNew=[];
        $scope.insertLease=function() {
            $scope.addLease.custId = $rootScope.user.custId;
            if(angular.isUndefined($scope.addLease.rent)){
                $scope.addLease.rent=0;
            }
            if(angular.isUndefined($scope.addLease.honseId)||angular.equals($scope.addLease.honseId,'')){
                layer.msg('租赁房屋未选择',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.addLease.hireStartDate)){
                layer.msg('租赁开始日期未输入',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.addLease.hireFinishDate)){
                layer.msg('租赁结束日期未输入',{icon:0});
                return;
            }
            if(new Date($scope.addLease.hireFinishDate)- new Date($scope.addLease.hireStartDate)< 0){
                layer.msg('租赁结束日期不能在租赁开始日期之前',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.addLease.rent)){
                layer.msg('租金未输入',{icon:0});
                return;
            }

            if($scope.persons==null||$scope.persons.length<1){
                layer.msg('请选择租户信息',{icon:0});
                return;
            }else if($scope.persons!=null&&$scope.persons.length==null) {
                var addPersonBuildingNew = {};//新增人员建筑关系
                addPersonBuildingNew.buildingStructureId = $scope.addLease.honseId;
                addPersonBuildingNew.custType = "租客";
                addPersonBuildingNew.state = 0;
                addPersonBuildingNew.custId = $scope.persons.custId;
                addPersonBuildingNew.name = $scope.persons.name;
                $scope.addLease.personBuildingNew.push(addPersonBuildingNew);
            }else {
                for (var i = 0; i < $scope.persons.length; i++) {
                    var addPersonBuildingNew = {};//新增人员建筑关系
                    addPersonBuildingNew.buildingStructureId = $scope.addLease.honseId;
                    addPersonBuildingNew.custType = "租客";
                    addPersonBuildingNew.state = 0;
                    addPersonBuildingNew.custId = $scope.persons[i].custId;
                    addPersonBuildingNew.name = $scope.persons[i].name;
                    $scope.addLease.personBuildingNew.push(addPersonBuildingNew);
                }
            }
            if($scope.addLease.houseIdType=='住宅'){
                $scope.addLease.houseIdType=0;
            }else if($scope.addLease.houseIdType=='商铺'){
                $scope.addLease.houseIdType=1;
            }

            $http.post(url + '/NewLease/insertNewLeaseRestful', {NewLease: $scope.addLease}).success(function () {
                layer.msg('提交成功',{icon : 1,time : 2000});
                $scope.doClick(1);
                $location.path("/index/propertyService/staffHome/lease/leaseHistory");
            }).error(function (data, status, headers, config) {
                layer.msg("提交失败",{icon : 3,time : 2000});
            });

        }
        /**
         * 将输入数字保留两位小数
         */
        $scope.formatRent = function(){
            var num = $("input[name=rent]").val();
            $("input[name=rent]").val(Number(num).toFixed(2));
        }

        //取消数据增加
        $scope.resetAddEntrance=function(){
            $scope.doClick(1);
            $scope.addEntrance={};
            $scope.search={};
            $scope.houseone={};
            $scope.personBuildingNew={};
            $scope.house=[];
            $scope.err="";
            //      console.log("重置成功");
            $scope.addLease={annexs:[]};
            $scope.persons = [];
            $scope.addLease.rent=null;
            $scope.addLease.hireStartDate=null;
            $scope.addLease.hireFinishDate=null;
            $location.path("/index/propertyService/staffHome/lease/leaseHistory");
        };

        /**
         * 存放选中的信息
         * @param persons
         * @param person
         */
        $scope.notrepeat=function(persons,person){
            if(person.custId==$rootScope.user.custId){
                layer.msg('该选中的用户是业主，无法成为租客');
                return;
            }
            //$scope.centerChange();
            var j=0;

            for ( var i = 0; i < persons.length; i++) {
                if (persons[i].custId == person.custId) {
                    persons.splice(i, 1);
                    j=1;
                }
            }
            if(j==0){
                persons.push(person);
            }

        };


        /**
         * 确定
         */
        $scope.btnClick = function()
        {
            console.log(resule);
            $scope.persons = $scope.centerChange(resule);
        };

        /**
         * 选中样式
         */
        $scope.chocieCss=function(custId){
            if(resule.length==0){
                return false;
            }
            var j=0;
            for(var i=0;i<resule.length;i++){
                if(resule[i].custId==custId){
                    j=1;
                }
            }
            if(j==1){
                return true;
            }else{
                return false;
            }
        };

        //打印
        $scope.printNewLease=function(){

        };


        //上传文件
        $scope.annex = {annexAddress:'',annexName:''};
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
                    $scope.annex = {annexAddress:'',annexName:''};
                    filePath=response;
                    $scope.annex.annexName = file.name;
                    $scope.annex.annexAddress = filePath;
                    $scope.addLease.annexs.push($scope.annex);
                    layer.msg("上传成功",{icon : 1,time : 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    layer.msg("上传失败",{icon : 1,time : 2000});
                },
                onComplete: function(response){           	  // 上传完成的回调方法

                }
            });

        });

    }]);
});