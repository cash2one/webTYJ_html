/**
 * Created by NM on 2018/1/18.
 * 物业合同管理的新增合同
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('contractNewCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.addTenementPact={annexs:[]};  //最终保存的对象

        //获取乙方公司
        $scope.company = {};
        $scope.projectId = sessionStorage.getItem("projectId");
        $http.get(url + '/Company/getCompanyByprojectId/' + $scope.projectId).success(function(data){
            $scope.company = data.Company;
        }).error(function(data){
            layer.alert('公司信息查询失败！',{icon : 2});
        });

        //比较时间
        $scope.checkDate = function(){
            var bool=true;
            var start = document.getElementById('staTime').value;
            var end = document.getElementById('endTime').value;
            if(end <= start){
                layer.msg('结束时间不能早于开始时间！',{icon : 0,time : 1000});
                $scope.addTenementPact.endTime = '';
                bool=false;
                return  bool;
            }else{
                return bool=true;
            }
        };

4
        /**
         * 全部保存
         */
        $scope.saveAll=function(){
            /*if($scope.addTenementPact.pactCode == null || $scope.addTenementPact.pactName == null || $scope.addTenementPact.propertyProject == null
                || $scope.addTenementPact.staTime == null || $scope.addTenementPact.endTime == null){
                layer.msg('请填写合同编号！',{icon : 0,time : 1000});
                return;
            }*/
            if($scope.addTenementPact.pactCode == null||$scope.addTenementPact.pactCode == ''){
                layer.msg('请填写合同编号！',{icon : 0,time : 1000});
                return;
            }else if($scope.addTenementPact.pactName == null||$scope.addTenementPact.pactName == ''){
                layer.msg('请填写合同名称！',{icon : 0,time : 1000});
                return;
            }else if($scope.addTenementPact.propertyProject == null||$scope.addTenementPact.propertyProject == ''){
                layer.msg('请填写物业项目！',{icon : 0,time : 1000});
                return;
            }else if($scope.addTenementPact.staTime == null||$scope.addTenementPact.staTime == ''){
                layer.msg('请填写开始日期！',{icon : 0,time : 1000});
                return;
            }else if($scope.addTenementPact.endTime == null||$scope.addTenementPact.endTime == ''){
                layer.msg('请填写结束日期！',{icon : 0,time : 1000});
                return;
            }else if($scope.checkDate()){

            }

            if(isNaN($scope.addTenementPact.totalPrice)&&$scope.addTenementPact.totalPrice!=null){
                layer.msg('金额必须只为数字！',{icon : 0,time : 1000});
                $scope.addTenementPact.totalPrice = '';
                return;
            }
            $scope.addTenementPact.state = 3;
            $scope.addTenementPact.aftEnterprise = document.getElementById('aftEnterprise').value;
            $http.post(url+'/TenementPact/insertTenementPact',{TenementPact:$scope.addTenementPact}).success(function(data) {
                layer.msg('添加成功',{icon : 1,time : 2000});
                $scope.addTenementPact = {annexs : []};
                $location.path("index/businessManagement/propertyManagementContract/contractList");
            }).error(function(data, status, headers, config){
                layer.alert('添加失败',{icon : 2});
            });
        };
        $scope.updateTenementPact = {};
        $scope.cleanAll = function(){
            $scope.addTenementPact = {annex : []};
            $scope.doClick(2);
        };

        /**
         * 上传文件
         * @type {{annexAddress: string, annexName: string}}
         */
        $scope.annex = {annexAddress:'',annexName:''};
        $(function(){
            // 初始化插件
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
                /* 外部获得的回调接口 */
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    console.log(selectFiles);
                },
                onDelete: function(file, files){
                    console.log(file.name);
                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    filePath=response;
                    $scope.annex.annexName = file.name;
                    $scope.annex.annexAddress = filePath;
                    $scope.addTenementPact.annexs.push($scope.annex);
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                },
                onComplete: function(response){           	  // 上传完成的回调方法
                    console.log(response);
                }
            });

        });

    }]);
});