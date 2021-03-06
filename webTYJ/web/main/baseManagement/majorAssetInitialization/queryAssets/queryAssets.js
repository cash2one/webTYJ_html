/**
 * Created by NM on 2018/1/18.
 * 【专业资产初始化】查询资产
 */

'use strict';

define(function (require) {

    var app = require('../../../../app');

    app.controller('queryAssetsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.checkPropertyTypes=[];
        $scope.doClick(3);
        var fileUrl = $rootScope.fileUrl;

        //获取公司id
        var companyId ;
        var user = {employId : ''};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        //查询所有专业列表方法.
       /* $http.get(url + '/PropertyType/listParentPropertyType/'+companyId).success(function(data) {
            $scope.propertyTypes = data.PropertyType;
            for(var i=0;i<$scope.propertyTypes.length;i++){
                $scope.checkPropertyTypes.push(false);
            }
        }).error(function(data,status,headers,config){
            layer.alert("专业资产初始化专业查询失败！",{icon : 2})
        });*/

        $scope.PropertyTypeResult={propertyTypes:[],property:{companyId:companyId}};
        $scope.listPropertys=[];

        /*
        * 分页查询资产信息
        * 朱琪
        * 2016.02.22
         */
        var parent = function (page, callback) {
            $scope.PropertyTypeResult.property.page = page;
            $http.post(url + '/Property/listPageProperty', {Property:$scope.PropertyTypeResult.property}).success(callback);
        };
        $scope.listPropertys = app.get('Paginator').list(parent, 6);


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
            /**
             * Bug826  陈浪  2016.3.4
             */
            $("#excelupload").remove();
            $("#remove1").append("<div id='excelupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#excelupload").zyUpload({
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    /**
                     * Bug823 陈浪 2016.3.4
                     */
                    fileType         :   ["xls","xlsx"],// 上传文件的类型
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
                        console.info(file.name);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.annex.isMain=companyId;
                        $http.post(url + "/Property/importExcelFileProperty",{Annex:$scope.annex}).success(function(data){
                            //   console.log(data);
                            layer.msg(data.Info.info.$,{icon : 0,time : 2000});
                            $scope.fileState=0;
                            $("#ddd").modal("hide");
                            $scope.listPropertys._load();
                        });
                        //  console.info(filePath);
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.alert("此文件上传失败：",{icon : 2});
                        //console.info(file.name);
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                        //console.info("文件上传完成");
                        //console.info(response);
                    }
                });

            });
        };

        $scope.inportExcel();
        /**
         * Bug826 陈浪 2016.3.4
         */
        $scope.cancleExcel=function(){
            if($scope.fileState==0){
                layer.confirm("您确定要取消已上传的文件吗？", {btn : ['是','否']},
                    function(){
                        $('#ddd').modal('hide');
                        $scope.listPropertys = app.get('Paginator').list(parent, 6);
                        layer.msg({time:1});
                })
            }else{
                $('#ddd').modal('hide');
                $scope.listPropertys = app.get('Paginator').list(parent, 6);
            }
        }
    }]);

});

//查询导出 朱琪 2016.02.23
function exportPropertyExcel(){
    var url = document.getElementById("fileUrl").value;
    var propertytypename = document.getElementById("propertytypename").value;
    var propertytypenames = document.getElementById("propertytypenames").value;
    var propertyName = document.getElementById("propertyName").value;
    var producingArea = document.getElementById("producingArea").value;
    var brand = document.getElementById("brand").value;
    var manufacturer = document.getElementById("manufacturer").value;
    /*window.location.href=url +"/info/outPropertyExcel.do?propertytypename="+propertytypename
    +"&propertytypenames="+propertytypenames+"&propertyName="+propertyName+"&producingArea="+producingArea
    +"&brand="+brand+"&manufacturer="+manufacturer;*/
    $.ajax({
        url: url + "/info/outPropertyExcel.do",
        type: 'POST',
        data: {
            propertytypename: propertytypename,
            propertytypenames: propertytypenames,
            propertyName: propertyName,
            producingArea: producingArea,
            brand: brand,
            manufacturer: manufacturer
        },
        dataType: "json",
        success: function (data) {
            if (data.msg == "success") {
                window.location.href = url + "/info/outPropertyExcel.do";
            }
        }
    });
}
