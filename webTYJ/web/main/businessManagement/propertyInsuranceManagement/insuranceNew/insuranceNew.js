/**
 * Created by 彭婷婷 on 2015/7/13.
 * 名称：新增合同
 * 修改人：倪明    修改时间：2015/8/5
 */

/**
 * Created by NM on 2018/1/18.
 * 新增合同
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('insuranceNewCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var fileUrl = $rootScope.fileUrl;    //上传的文件路径
        var filePath = '';          //上传文件的路径
        var user = {};
        var companyId;//设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        companyId = $scope.user.companyId;

        $scope.tenementInsurance = {annexs: []};   //保存的对象

        //$scope.tenementInsurance.enterpriseId={"中国人寿":["其它"],"中国平安":["其它"],"太平洋保险":["其它"],"中国人保":["其它"],"中国太平":["其它"],"友邦保险":["其它"],"新华保险":["其它"],"泰康保险":["其它"],"阳光保险":["其它"],"大地保险":["其它"],"其他":["其它"]}

        /**$scope.tenementInsurance.enterprise={
            "enterpriseList": [
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "01000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0100",
                    "name": "中国人寿"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "02000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0200",
                    "name": "中国平安"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "03000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0300",
                    "name": "太平洋保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "04000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0400",
                    "name": "中国人保"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "05000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0500",
                    "name": "中国太平"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "06000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0600",
                    "name": "友邦保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "07000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0700",
                    "name": "新华保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "08000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0800",
                    "name": "泰康保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "09000001",
                            "name": "其他"
                        }
                    ],
                    "id": "0900",
                    "name": "阳光保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "10000001",
                            "name": "其他"
                        }
                    ],
                    "id": "1000",
                    "name": "大地保险"
                },
                {
                    "enterprise": [
                        {
                            "enterprise": [],
                            "id": "11000001",
                            "name": "其他"
                        }
                    ],
                    "id": "1100",
                    "name": "其他"
                }
            ]
        };
         **/
        $scope.showEntry = function () {
            angular.element('#enterprise').modal("show");


            $scope.insurance = {page: {}};
            $scope.insuranceCompanies = {};
            //分页查询保险公司
            var fetchCompanies = function (page, callback) {
                $scope.insurance.page = page;
                //console.log($scope.insurance);
                $http.post(url + '/InsuranceService/listPageInsuranceCompanyRecord', {Insurance: $scope.insurance}).success(callback);
            };
            $scope.insuranceCompanies = app.get('Paginator').list(fetchCompanies, 6);
            console.log($scope.insuranceCompanies);
        }
        //$scope.insuranceCompanies._load();
        /**
        //查询所有保险公司信息
        $http.get(url + '/InsuranceService/listAllInsuranceCompanyRecord' ).success(function(data){
            $scope.tenementInsurance.enterprise = data.Insurance;
            console.log($scope.tenementInsurance.enterprise);
        }).error(function(data){
            layer.alert('保险公司信息查询失败！',{icon : 2});
        });
         **/

        //查询项目
        $scope.Project={page:{}};
        $scope.selectProjectList=function(){
            angular.element('#project').modal({backdrop: 'static', keyboard: false});
            //分页查询项目数据
            var getProject = function(page, callback){
                $scope.Project.page = page;
                $scope.Project.company= companyId ;
                $http.post(url + '/Project/listPageProject', {Project : $scope.Project}).success(callback);
            };
            $scope.projects = app.get('Paginator').list(getProject, 6);
        };

        //所有项目复选框勾选或取消
        $scope.projectIds = []; //存放项目id数据
        $scope.project = {};
        var historyCheck;
        $scope.addOrDeleteProjectId = function(item){
            var id=item.projectId;

            var selected = $("#selected").find('input[type=checkbox]');
            if(selected.length>=0) {
                $(selected).each(function (historyCheck, element) {
                    element.checked = false;
                }).parent().parent().each(function () {
                    $(this).removeClass('this_info');
                });

            }
                var checkbox = $('#'+item.projectId)[0];
                var tr = $(checkbox).parent().parent()[0];
                $(tr).toggleClass('this_info');
                checkbox.checked = $(tr).hasClass('this_info');
                historyCheck=item.projectId;


            var checks = document.getElementById(id);
            if(checks.checked == true){
                for(var i = 0; i < $scope.projectIds.length; i ++){
                    if(document.getElementById($scope.projectIds[i]) != null){
                        document.getElementById($scope.projectIds[i]).checked = false;
                    }
                }
                $scope.projectIds = [];
                $scope.projectIds.push(id);
                $scope.btnIndex=id;
            }else{
                document.getElementById(id).checked = false;
                $scope.projectIds = [];
                $scope.btnIndex='';
            }
            $scope.project=item;
        };
        $scope.tenementInsurance.insuranceCompanys={};
        //所有项目复选框勾选或取消
        $scope.erps = []; //存放保险公司id数据
        $scope.erp = {};
        var historyChecks;
        $scope.addOrDeleteErpId = function(item){
            var id=item.insuranceCompanyId;

            var selecteds = $("#selecteds").find('input[type=checkbox]');
            if(selecteds.length>=0) {
                $(selecteds).each(function (historyChecks, element) {
                    element.checked = false;
                }).parent().parent().each(function () {
                    $(this).removeClass('this_info');
                });

            }
            var checkbox = $('#'+item.insuranceCompanyId)[0];
            var tr = $(checkbox).parent().parent()[0];
            $(tr).toggleClass('this_info');
            checkbox.checked = $(tr).hasClass('this_info');
            historyChecks=item.insuranceCompanyId;

            var checks = document.getElementById(id);
            if(checks.checked == true){
                $scope.tenementInsurance.insuranceCompanys={};
                for(var i = 0; i < $scope.erps.length; i ++){
                    if(document.getElementById($scope.erps[i]) != null){
                        document.getElementById($scope.erps[i]).checked = false;
                    }
                }
                $scope.erps = [];
                $scope.erps.push(id);
                $scope.btnIndex=id;
                $scope.erp=item;
               /* $scope.tenementInsurance.enterpriseId=item.insuranceCompanyId;
                $scope.tenementInsurance.insuranceCompanyName=item.insuranceCompanyName;*/
                //$scope.tenementInsurance.areaInsuranceCompanyId=item.areaCompanyId;
                //$scope.tenementInsurance.areaCompanyName=item.areaCompanyName;
                //angular.element('#enterprise').modal('hide');
            }else{
                document.getElementById(id).checked = false;
                $scope.erps = [];
                $scope.btnIndex='';
                //$$scope.erp=[];
            }
        };

        //关闭项目模态框
        $scope.close=function(){
            angular.element('#project').modal('hide');
            $scope.projectIds = []; //存放项目id数据
            $scope.project = {projectId:''};
        };

        //得到选中的项目
        $scope.saveProject=function(){
            $scope.tenementInsurance.projectId=$scope.project.projectId;
            angular.element('#project').modal('hide');
        };

        //关闭项目模态框
        $scope.closeEntry=function(){
            angular.element('#enterprise').modal('hide');
            $scope.erps = []; //存放项目id数据
            $scope.erp = {id:''};
        };

        //得到选中的项目
        $scope.saveEntry=function(){
            $scope.tenementInsurance.enterpriseId=$scope.erp.id;
            angular.element('#enterprise').modal('hide');
        };

        //查询责任人
        //搜索推荐人信息
        $scope.selectPerson=function(){
            $scope.d=false;
            $scope.btnIndex='';
            angular.element('#person').modal({backdrop: 'static', keyboard: false});
            //负责人信息
            $scope.Teamworkstaff = {page:{}};
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);

            //判断checkbx是否选中
            $scope.d=false;
            $scope.getdata=function(item){
                var chk = document.getElementsByName("aaa");
                for(var i=0;i<chk.length;i++){
                    if( chk[i].checked==true){
                        $scope.accountRecord=item;
                        $scope.d=true;
                        $scope.btnIndex=item.id;
                        return;
                    }else{
                        $scope.d=false;
                        $scope.btnIndex='';
                    }
                }
            };
            //得到选中的推荐人
            $scope.addPerson=function(){
                $scope.person= $scope.accountRecord;
                $scope.tenementInsurance.staffId=$scope.person.staffId;//得到负责人id
                angular.element('#person').modal('hide');
            };
            //取消选中的推荐人
            $scope.canclePerson=function(){
                $scope.d=false;
                angular.element('#person').modal('hide');
            };

            //获取专业线
            $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
                $scope.SpecialtyInfo = data.SpecialtyInfo;
            }).error(function(data,status,headers,config){
                layer.alert('获取信息失败,请稍后重试！！',{icon : 0});
            });
        }

        //新增取消
        $scope.cancle=function(){
            $scope.doClick(2);
            $scope.tenementInsurance={};
            $scope.person={};
            $scope.project={};
            //上传文件

            angular.element("#zyupload").remove();
            angular.element("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                angular.element("#remove").html('');
                angular.element("#remove").append('<div id="zyupload" class="zyupload"></div>');
                angular.element("#zyupload").zyUpload({
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
                    //* 外部获得的回调接口 *//*
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                    },
                    onDelete: function(file, files){

                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法

                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });


        };

        //查询所有的索赔金额
        $http.get(url + '/ClaimToCustomerOrders/getClaimToCustomerOrders').success( function (data) {
            $scope.totalMoney=0.0;
            for(var i=0;i< data.ClaimToCustomerOrders.length;i++){
                $scope.totalMoney=$scope.totalMoney+data.ClaimToCustomerOrders[i].claimToCustomerRethods.claimMoney;
            }
            $scope.tenementInsurance.settlingFeeSum=$scope.totalMoney;
        }).error(function(data, status, headers, config){
            layer.alert('获取累计金额失败',{icon : 0});
        });

        /**
         * 新增
         */
        $scope.saveAll=function(){
            if($scope.tenementInsurance.insuranceNum==null||$scope.tenementInsurance.insuranceNum==''){
                layer.alert('保险单号不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.startTime==null||$scope.tenementInsurance.startTime==''){
                layer.alert('开始时间不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.endTime==null||$scope.tenementInsurance.endTime==''){
                layer.alert('结束时间不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.enterpriseMoney==null||$scope.tenementInsurance.enterpriseMoney==''){
                layer.alert('保险金额不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.areaInsuranceCompanyId==null||$scope.tenementInsurance.areaInsuranceCompanyId==''){
                layer.alert('区域保险公司不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.settlingFee==null||$scope.tenementInsurance.settlingFee==''){
                layer.alert('理赔金额不能为空！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.insuranceType==null||$scope.tenementInsurance.insuranceType==''){
                layer.alert('请选择保费类型！！',{icon : 0});
                return;
            }else if($scope.tenementInsurance.premiumMoney==null||$scope.tenementInsurance.premiumMoney===''){
                layer.alert('保费金额不能为空！！',{icon : 0});
                return;
            }
            //if($scope.tenementInsurance.projectId==null&& $scope.tenementInsurance.enterpriseMoney==null && $scope.tenementInsurance.startTime==null
            //    && $scope.tenementInsurance.endTime==null && $scope.tenementInsurance.insuranceType==null && $scope.tenementInsurance.premiumMoney==null
            //    && $scope.tenementInsurance.settlingFee==null && $scope.tenementInsurance.staffId==null && $scope.tenementInsurance.premiumMoney==null){
            //    layer.alert('请将信息填写完整！！',{icon : 0})
            //}else{
                if($scope.tenementInsurance.endTime>=$scope.tenementInsurance.startTime){
                    //tenementInsurance.areaInsuranceCompanyId
                    $http.post(url+'/TenementInsurance/insertTenementInsurance',{TenementInsurance:$scope.tenementInsurance}).success(function(){
                        layer.msg("新增保险成功", {icon: 1, time: 2000});
                        $location.path("/index/businessManagement/propertyInsuranceManagement/insuranceList")
                    }).error(function(data, status, headers, config){
                        layer.msg("新增保险失败", {icon: 3, time: 2000});
                    }) ;
                }else{
                    layer.alert('结束时间必须大于开始时间！！',{icon : 0});
                    return;
                }
            //}

            $scope.doClick(2);
        };

        $scope.tenementInsurance.annexs=[];
        $scope.annex={
            annexAddress:'',
            annexName:''
        };
        //上传文件
        angular.element("#zyupload").remove();
        angular.element("#remove").append("<div id='zyupload' class='zyupload'></div>");
        $(function(){
            // 初始化插件
            angular.element("#remove").html('');
            angular.element("#remove").append('<div id="zyupload" class="zyupload"></div>');
            angular.element("#zyupload").zyUpload({
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
                //* 外部获得的回调接口 *//*
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                },
                onDelete: function(file, files){

                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    filePath=response;
                    $scope.annex.annexAddress=filePath;
                    $scope.annex.annexName=file.name;
                    $scope.tenementInsurance.annexs.push($scope.annex);
                    layer.msg("上传成功", {icon: 1, time: 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法

                },
                onComplete: function(response){           	  // 上传完成的回调方法

                }
            });

        });


    }]);
});