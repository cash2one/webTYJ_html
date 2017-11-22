/**
 * Created by NM on 2018/1/18.
 * 租赁管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('leaseContractAddCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.projects=[];      //项目列表
        $scope.param={page:{}};          //查询参数
        //$scope.buildings=[];      //产品建筑列表
        $scope.store=false;     //商铺勾选状态
        $scope.house=false;     //住宅勾选状态
        $scope.pageNum=0;      //页面块显示 0显示建筑产品查询，1显示建筑产品详情块，2显示新增操作块
        $scope.selectProjects=[{id:0,name:'请选择项目'}];      //项目列表
        $scope.selectProjects.id = 0;
        $scope.addLeaseContract={annexs:[]};//新增对象
        $scope.areas=[{id:0,name:'请选择面积'},{id:5,name:'40㎡以下',areaA:0,areaB:40},{id:1,name:'40㎡~60㎡',areaA:40,areaB:60},{id:2,name:'60㎡~80㎡',areaA:60,areaB:80},{id:3,name:'80㎡~100㎡',areaA:80,areaB:100},{id:4,name:'100㎡~120㎡',areaA:100,areaB:120}];
        $scope.areas.id=0;
        $scope.prices=[{id:0,name:'请选择价格'},{id:5,name:'3000元/月以下',priceA:0,priceB:3000},{id:1,name:'3000~5000元/月',priceA:3000,priceB:5000},{id:2,name:'5000~7000元/月',priceA:5000,priceB:7000},{id:3,name:'7000~9000元/月',priceA:7000,priceB:9000},{id:4,name:'9000~11000元/月',priceA:9000,priceB:11000}];
        $scope.prices.id=0;

        /**
         * 获取面积区间
         */
        $scope.getAreas=function(id){
            for(var i=0;i<$scope.areas.length;i++){
                if(id>0&&id==$scope.areas[i].id){
                    $scope.param.buildingAreaA=$scope.areas[i].areaA;
                    $scope.param.buildingAreaB=$scope.areas[i].areaB;
                }
            }
        };

        /**
         * 获取价格区间
         */
        $scope.getPrices=function(id){
            for(var i=0;i<$scope.prices.length;i++){
                if(id>0&&id==$scope.prices[i].id){
                    $scope.param.averagePriceA=$scope.prices[i].priceA;
                    $scope.param.averagePriceB=$scope.prices[i].priceB;
                }
            }
        };
        /**
         * 显示页面块
         * @param page
         * @returns {boolean}
         */
        $scope.showPage=function(page){
            if(page==$scope.pageNum){
                return true;
            }
            return false;
        };

        /**
         * 显示要展示的页面块
         */
        $scope.toPage=function(page){
            if(page==0){

            }
            if(page==1){

            }
            if(page==2){

            }
            $scope.pageNum=page;
        };


        /**
         * 查询项目列表
         */
        var companyId ;
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;
        companyId= $scope.user.companyId;
        $scope.checkProjects=function(){
            $http.get(url + '/Project/listAllProject/'+companyId).success(function (data) {
                $scope.projects=data.Project;
                for(var i=0;i< $scope.projects.length;i++){
                    var selectProject={};
                    selectProject.id=$scope.projects[i].projectId;
                    selectProject.name=$scope.projects[i].projectName;
                    $scope.selectProjects.push(selectProject);
                }
            }).error(function (data, status, headers, config) {
                layer.msg('查询项目列表失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 获取项目id
         */
        $scope.getProject=function(projectId){
            $scope.param.projectId=projectId;
        };

        /**
         * 勾选事件，单选效果
         */
        $scope.clickCheckbox=function(buildingType){
            if(buildingType=='house'){
                $scope.store=false;
                $scope.param.buildingTypes='住宅';
            }
            if(buildingType=='store'){
                $scope.house=false;
                $scope.param.buildingTypes='商铺';
            }
            if( $scope.store==false && $scope.house==false){
                $scope.param.buildingTypes='';
            }
        };

        /**
         * 查询建筑产品列表
         */
        $scope.checkBuildings=function(){
            if($scope.param.averagePriceA==0&&$scope.param.averagePriceB==0){
                $scope.param.averagePriceA=null;
                $scope.param.averagePriceB=null;
            }

            if($scope.param.averagePriceB==0&&$scope.param.averagePriceA>0){
                layer.msg('请将价格区间填完整',{icon : 2,time : 2000});
            }
            if($scope.param.buildingAreaA==0&&$scope.param.buildingAreaA==0){
                $scope.param.buildingAreaA=null;
                $scope.param.buildingAreaB=null;
            }

            if($scope.param.buildingAreaB==0&&$scope.param.buildingAreaA>0){
                layer.msg('请将面积区间填完整',{icon : 2,time : 2000});
            }
            var parent = function (page, callback) {
                $scope.param.page = page;
                // $scope.param.buildingTypes='住宅';
                $http.post(url+'/ProductBsService/listPageProductBs',{ProductBs:$scope.param}).success(callback);
            };
            $scope.buildingProducts = app.get('Paginator').list(parent,10);
        };

        /**
         * 初始化方法
         */
        $scope.load=function(){
            $scope.checkBuildings();
            $scope.checkProjects();
        };

        $scope.load();

        /**
         * 选择建筑产品，并跳转到页面 1
         */
        $scope.annexList=[];//副图列表
        $scope.choiceBuilding=function(object){
            if(object==undefined){
                layer.msg("请选择有效产品",{icon : 0,time : 2000});
                return ;
            }
            $scope.buildingProduct_choice=object;
            if($scope.buildingProduct_choice.annexs!=null){
                if($scope.buildingProduct_choice.annexs.length>1){
                    $scope.annexList=[];
                    for(var i=1;i<$scope.buildingProduct_choice.annexs.length;i++){
                        $scope.annexList.push($scope.buildingProduct_choice.annexs[i]);
                    }
                }
            }

            $scope.toPage(1);
        };

        /**
         * 提交租赁合同
         */
        $scope.addLeaseContracts=function(){
            console.log($scope.addLeaseContract);
            console.log($scope.buildingProduct_choice);
            if($scope.addLeaseContract.custId==null||$scope.addLeaseContract.custId==''){
                layer.msg('未选择承租人',{icon : 0,time : 2000});
                return;
            }
            if($scope.addLeaseContract.leaseStartDate==null||$scope.addLeaseContract.leaseStartDate==''||$scope.addLeaseContract.leaseEndDate==null||$scope.addLeaseContract.leaseEndDate==''){
                layer.msg('租赁时间参数不完整',{icon : 0,time : 2000});
                return;
            }
            if($scope.buildingProduct_choice.productBsId==null||$scope.buildingProduct_choice.productBsId==''){
                layer.msg('未选择产品',{icon : 0,time : 2000});
                return;
            }
            $scope.addLeaseContract.productBsId=$scope.buildingProduct_choice.productBsId;
            $http.post(url+'/LeaseContractService/insertLeaseContract',{LeaseContract:$scope.addLeaseContract}).success(function(data)
            {
                layer.msg('提交成功',{icon : 1,time : 2000});
            }).error(function (data, status, headers, config) {
                layer.msg('提交失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 根据条件搜索人员信息
         * @type {{page: {}}}
         */
        $scope.searchone={page:{}};
        $scope.selectPersons=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginator1 = app.get('Paginator').list(parent,4);
        };

        /**
         * 选中人员
         */
        $scope.person={};
        $scope.choicePerson=function(person){
            $scope.person = person;
            $scope.btnIndex=person.custId;
        };

        /**
         * 确定选择人员
         */
        $scope.sureChoice=function(){
            $scope.addLeaseContract.custId=$scope.person.custId;
        };

        /**
         * 取消选中人员
         */
        $scope.clearPeson=function(){
            $scope.person={};
        };

        /**
         * 取消提交租赁合同
         */
        $scope.clearLease=function(){
            $scope.person={};
            $scope.addLeaseContract={};
            $scope.buildingProduct_choice={};
        };

        /**
         * 上传文件
         * @type {{annexAddress: string, annexName: string}}
         */
        var filePath='';
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        $scope.annex = {annexAddress:'',annexName:''};
        $(function(){
            // 初始化插件
            $("#zyupload").zyUpload({
                width            :   "90%",                 // 宽度
                height           :   "auto",                 // 宽度
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
                //外部获得的回调接口
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                },
                onDelete: function(file, files){
                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    $scope.annex = {annexAddress:'',annexName:''};
                    filePath=response;
                    $scope.annex.annexName = file.name;
                    $scope.annex.annexAddress = filePath;
                    $scope.addLeaseContract.annexs.push($scope.annex);
                    layer.msg("上传成功",{icon : 1,time : 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    layer.msg("上传失败",{icon : 1,time : 2000});
                },
                onComplete: function(response){           	  // 上传完成的回调方法

                }
            });

        });

        /**
         * 移除图片
         * @param item
         */
        $scope.delPic = function(item){
            $scope.picItem = [];
            $scope.picItem =$scope.enterprise.annexs ;
            $scope.addLeaseContract.annexs  = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.addLeaseContract.annexs.push($scope.picItem[i]);
                }
            }
        };

    }]);
});