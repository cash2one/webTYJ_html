/**
 * Created by NM on 2016/1/22.
 * 企业客户管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.directive('setFocus', function(){
        return function(scope, element){
            element[0].focus();
        };
    });
    app.controller('enterpriseCustomCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(5);//增加tab高亮显示   王洲   2016.2.2
        var companyId ;
        var user = {employId : ''};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        var url = $rootScope.url;

        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.enterpriseCustNews = {page: {},manageType:"",buildingStructureId:"",enterpriseName:"",unitNumber:""};  //企业信息
        $scope.enterprise={};
        $scope.enterpriseDatil=true;
        $scope.showEnterpriseCustomer=false;
        $scope.enterpriseCustomerUpdate=false;

        /**
         * 经营类型
         * @type {Array}
         */
        $scope.manageType=[
            {businessTypeId:'1',businessTypeName:'餐饮类'},
            {businessTypeId:'2',businessTypeName:'零售类'},
            {businessTypeId:'3',businessTypeName:'服务类'},
            {businessTypeId:'4',businessTypeName:'娱乐类'}
        ];
        /**
         * 企业类型（企业属性）
         * @type{Array}
         */
        $scope.enterpriseProperty=[
            {enterprisePropertyId:'1',enterprisePropertyName:'个人独资'},
            {enterprisePropertyId:'2',enterprisePropertyName:'合资企业'},
            {enterprisePropertyId:'3',enterprisePropertyName:'公司'}
        ];

        /**
         * 根据条件搜索
         */
        $http.get(url+'/Project/listAllProject/'+companyId).success(function(data){
            $scope.projects=data.Project;
        });


        $scope.showStatus=1;

        //网格切换
        $scope.tabview=function(){
            $scope.showStatus=0;
        }

        $scope.listview=function(){
            $scope.showStatus=1;
        }

        $scope.search=0;
        $scope.changeState=function(){
            if($scope.search==0){
                $scope.search=1;
            }else{
                $scope.search=0;
            }
        }

        //分页条件查询
        $scope.load=function(){
            var parent = function (page, callback) {
                $scope.enterpriseCustNews.page = page;
                $scope.enterpriseCustNews.companyId=companyId;
                $http.post(url + '/EnterpriseCustNew/listPageEnterpriseCustNewByCondition',{EnterpriseCustNew:$scope.enterpriseCustNews}).success(callback);
            };
            $scope.currentEnterpriseCustomer = app.get('Paginator').list(parent, 6);

        };
        $scope.load();
        //判断checkbx是否选中
        $scope.d=false;
        $scope.enterpriseId='';
        $scope.getdata=function(enterpriseId){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.enterpriseId=enterpriseId;
                    $scope.d=true;
                    $scope.btnIndex = enterpriseId;
                    $scope.enterprise.registerDate = new Date();
                    return;
                }else{
                    $scope.d=false;
                    $scope.btnIndex ='';
                }
            }
        };
        //修改
        $scope.enterprise.annexs=[];
        $scope.update=function(){
            if($scope.d==false){
                layer.alert('请先选择修改项！！',{icon : 0});
            }else if($scope.d==true){
                $scope.enterpriseDatil=false;
                $scope.showEnterpriseCustomer=false;
                $scope.enterpriseCustomerUpdate=true;

                $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+$scope.enterpriseId).success(function(data) {

                    $scope.enterprise=data.EnterpriseCustNew;
                    if($scope.enterprise!=null){
                        $scope.enterprise.registerDate = new Date($scope.enterprise.registerDate );
                        if ($scope.enterprise.annexs != null) {
                            if (angular.isArray($scope.enterprise.annexs)) {
                            } else {
                                $scope.annexList = [];
                                $scope.annexList.push($scope.enterprise.annexs);
                                $scope.enterprise.annexs = $scope.annexList;
                            }
                        }else if($scope.enterprise.annexs ==undefined){
                            $scope.enterprise.annexs=[];
                        }
                    }

                    $("#zyupload").remove();
                    $("#remove1").append("<div id='zyupload' class='zyupload'></div>");
                    $(function(){
                        // 初始化插件
                        $("#remove1").html('');
                        $("#remove1").append('<div id="zyupload" class="zyupload"></div>');
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
                                filePath=response;
                                $scope.annex = {annexAddress:'',annexName:''};
                                $scope.annex.annexName = file.name;
                                $scope.annex.annexAddress = filePath;
                                $scope.enterprise.annexs.push($scope.annex);
                                layer.msg("上传成功",{icon : 1,time : 2000});

                            },
                            onFailure: function(file, response){          // 文件上传失败的回调方法

                            },
                            onComplete: function(response){           	  // 上传完成的回调方法

                            }
                        });

                    });

                });
            }

        };

        //修改取消
        $scope.cancle1=function(){
            $scope.d=false;
            $scope.btnIndex ='';
            $scope.showEnterpriseCustomer=false;
            $scope.enterpriseCustomerUpdate=false;
            $scope.enterpriseDatil=true;
            $scope.load();

        };

        /**
         * 返回
         */
        $scope.backTo = function()
        {
            $scope.doClick(1);
            $location.path('/index/baseManagement/projectManagement');
        };

        //查看企业客户
        $scope.show=function(enterpriseId){
            $scope.enterpriseDatil = false;
            $scope.showEnterpriseCustomer = true;
            $scope.enterpriseCustomerUpdate = false;
            $http.get(url + '/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/' + enterpriseId).success(function (data) {
                $scope.enterprise = data.EnterpriseCustNew;
                if($scope.enterprise.annexs!=null){
                    if(angular.isArray($scope.enterprise.annexs)){
                    }else{
                        $scope.annexList = [];
                        $scope.annexList.push($scope.enterprise.annexs);
                        $scope.enterprise.annexs= $scope.annexList;
                    }
                }
            });

        };

        $scope.personCustNews={page:{}};     //人员信息
        $scope.load1=function(){
            var fetchFunction = function(page,callback) {
                $scope.personCustNews.page=page;
                $http.post(url + '/PersonCustNew/listPagePersonCustNewByAllSearch',{PersonCustNew:$scope.personCustNews}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,5);
        };
        $scope.load1();
        $scope.persontwo={};
        $scope.getPersonBycustId=function(person){
            $scope.btnIndex=person.custId;
            $scope.persontwo=person;
            $scope.enterprise.representative= $scope.persontwo.name;

        };
        $scope.personone={};
        $scope.getPersonBycust=function(person){
            $scope.btnIndex=person.custId;
            $scope.personone=person;
            $scope.enterprise.principal=$scope.personone.name;
        };

        //查询所有的企业客户列表
        $scope.enterpriseList={};
        $http.get(url+'/EnterpriseCustNew/listAllEnterpriseCustNewRestful').success(function(data){

            $scope.enterpriseList=data.EnterpriseCustNew;
        });

        /**
         修改个人客户信息  bug编号：081 修改人：彭婷婷 2016/1/5
         */
        var flag=0;
        $scope.checkValue=function(item){
            flag=0;
            if( item.enterpriseName ==null){
                layer.alert('企业名称不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.manageType ==null ){
                layer.alert('经营类型不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.address ==null){
                layer.alert('注册地址不能为空！',{icon : 0});
                flag=1;
                return;
            }else  if(item.representative == null ){
                layer.alert('法人代表不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.officePhone ==null){
                layer.alert('企业办公电话不能为空！',{icon : 0});
                flag=1;
                return;
            }else{
                if($scope.enterpriseList.length>0){
                    for(var i=0;i<$scope.enterpriseList.length;i++){
                        if(item.enterpriseId!=$scope.enterpriseList[i].enterpriseId){
                            if(item.enterpriseName==$scope.enterpriseList[i].enterpriseName){
                                layer.alert('企业名称已存在！',{icon : 0});
                                flag=1;
                                break;
                            }
                        }

                    }
                }
            }
        };


        $scope.checkPhone=function(phone){
            var pattern=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var patt=/^0\d{2,3}-?\d{7,8}$/;

            if(phone==null||phone.length==0||phone==undefined){
                layer.alert('号码不能为空！',{icon : 0});
                flag=1;
                return;
            }else{
                if(pattern.test(phone)||patt.test(phone)){

                }else{
                    layer.alert('请输入正确的企业办公电话！',{icon : 0});
                    flag=1;
                    return;
                }
            }


        };

        $scope.checkPhone2=function(phone){
            var pattern=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var patt=/^0\d{2,3}-?\d{7,8}$/;

            if(phone==null||phone.length==0||phone==undefined){

            }else{
                if(pattern.test(phone)||patt.test(phone)){

                }else{
                    layer.alert('请输入正确的电话号码！',{icon : 0});
                    flag=1;
                    return;
                }
            }


        };


        $scope.checkNum = false;
        $scope.numchange = function(){
            $scope.checkupdatePersonCustNewNum = true;
        };

        $scope.updateEnterpriseCustomer=function(){
            $scope.enterpriseDatil=false;
            $scope.enterpriseCustomerUpdate=true;
            $scope.checkValue($scope.enterprise);
            if(flag!=0)
                return;
            $http.put(url+'/EnterpriseCustNew/updateEnterpriseCustNewRestful',{EnterpriseCustNew:$scope.enterprise}).success(function(){
                layer.msg("修改成功！",{icon : 1,time : 2000});
                $scope.load();
                $scope.enterpriseDatil=true;
                $scope.enterpriseCustomerUpdate=false;
            }).error(function(data, status, headers, config){
                layer.msg("修改失败！",{icon : 1,time : 2000});
            }) ;

        };

        //移除图片
        $scope.delPic = function(item){
            $scope.picItem = [];
            $scope.picItem =$scope.enterprise.annexs ;
            $scope.enterprise.annexs  = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.enterprise.annexs.push($scope.picItem[i]);
                }
            }
        };


        /**
         * 导入Excel数据文档
         */       //上传文件的路径
        $scope.annex={
            annexAddress:'',
            annexName:''
        };
        $scope.showExcel=function(){
            $('#addExcel').modal({backdrop: 'static', keyboard: false});
            $("#excelupload").remove();
            $("#remove").append("<div id='excelupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');

                $("#excelupload").zyUpload({
                    width            :   "550px",                 // 宽度
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
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                        //console.info(selectFiles);
                    },
                    onDelete: function(file, files){
                        //console.info(file.name);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.fileState="1";
                        $http.post(url+"/EnterpriseCustNew/importExcelFiles",{Annex:$scope.annex}).success(function(){
                            layer.msg("导入成功",{icon : 1,time : 2000});
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });

        };

        //导入Excel
        $scope.saveFile=function(){
            $('#addExcel').modal('hide');
            $scope.load();
        }
    }]);
});