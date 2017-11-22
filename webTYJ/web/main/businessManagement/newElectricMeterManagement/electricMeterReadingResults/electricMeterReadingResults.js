/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('electricMeterReadingResultsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test='表';
        $scope.doClick(3);
        var url = $rootScope.url;
        $scope.fileUrl = $rootScope.fileUrl;
        $scope.searchMeter = {page: {}};
        $scope.showDetalis = false;
        $scope.showList = true;
        /**
         *抄表结果列表查询显示
         */
         $scope.load = function () {
         var electricCheckFunction = function (page, callback) {
         $scope.searchMeter.page = page;
         $http.post(url + '/ElectricityMeterReadingProgram/listMeterReadingResult',
         {SearchMeter: $scope.searchMeter}).success(callback);
         };
         $scope.waterChecks = app.get('Paginator').list(electricCheckFunction, 10);
         console.log('抄表结果分页');
         console.log($scope.waterChecks);
         console.log('抄表结果分页');
         };
         $scope.load();
         $scope.check = function (item) {
         $scope.btnIndex = item;
         };

        //返回到抄表结果列表
        $scope.getBack = function () {
            $scope.showDetalis = false;
            $scope.showList = true;
            $scope.load();
        };
//********************抄表结果详情***************************//
        $scope.waterMeterRecords = {page: {}};
        $scope.showDetails = function (item) {
            $scope.meterReadingProgramTemp = item;
            $scope.showDetalis = true;
            $scope.showList = false;
            $scope.load1 = function () {
                var electricMeterCheckFunction = function (page, callback) {
                    $scope.waterMeterRecords.page = page;
                    $scope.waterMeterRecords.electricityMeterReadingProgramId = item.electricityMeterReadingProgramId;
                    $http.post(url + '/ElectricityMeterReadingData/listPageMeterRecoedDateList',
                        {ElectricityMeterReadingData: $scope.waterMeterRecords}).success(callback);
                };
                $scope.waterMeterChecks = app.get('Paginator').list(electricMeterCheckFunction, 10);
                console.log("抄表结果的具体详情");
                console.log($scope.waterMeterChecks);
                console.log("抄表结果的具体详情");
            };
            $scope.load1();
            $scope.annex = {
                annexAddress: '',
                annexName: '',
                relationId: item.electricityMeterReadingProgramId
            };
        };

        /**
         * 修改本月读数
         * @param item
         */
        $scope.readingChange = function (item) {
           $http.post(url + '/ElectricityMeterReadingData/setMeterReadingData', {ElectricityMeterReadingData: item}).success(function (data) {
            });
        };

        /**
         * 导入模板下载
         */
        $scope.exportExcelHouse = function() {
            $('body').append('<a id="click" href="' + $scope.fileUrl + '/info/outElectricityReadingProgramExcel.do?fileName=' + $scope.meterReadingProgramTemp.projectName + '&meterReadingProgramId=' + $scope.meterReadingProgramTemp.electricityMeterReadingProgramId + '"></a>');
           document.getElementById('click').click();
        };

        var filePath = '';          //上传文件的路径
        $scope.annex = {
            annexAddress: '',
            annexName: '',
            relationId: ''
        };

        $scope.importMeterExcel = function () {
            $scope.fileState = "1";
            var filePath = '';          //上传文件的路径
            $(function () {
                $("#remove1").html('').append('<div id="excelupload1" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload1").zyUpload({
                    itemWidth: "140px",                 // 文件项的宽度
                    itemHeight: "115px",                 // 文件项的高度
                    url: $scope.fileUrl + "/FileService",  // 上传文件的路径
                    fileType: ["xls", "docx", "xlsx", "pdf", "txt", "doc", "ppt"],// 上传文件的类型
                    fileSize: 51200000,                // 上传文件的大小
                    multiple: true,                    // 是否可以多个文件上传
                    dragDrop: true,                    // 是否可以拖动上传文件
                    tailor: true,                    // 是否可以裁剪图片
                    del: true,                    // 是否可以删除文件
                    finishDel: false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function (file, files) {
                    },
                    onSuccess: function (file, response) {          // 文件上传成功的回调方法
                        filePath = response;
                        $scope.annex.annexAddress = filePath;
                        $scope.annex.annexName = file.name;
                        //  $scope.annex.relationId = item.meterReadingProgramId;
                        $scope.annex.relationId = $scope.meterReadingProgramTemp.electricityMeterReadingProgramId;
                        $http.post(url + "/MeterReadingData/importExcelFileMeterReadingData", {Annex: $scope.annex}).success(function (data) {
                            //   console.log(data);
                            $scope.load1();
                            layer.alert(data.Info.info.$, {icon: 1});
                        });
                    },
                    onFailure: function (file, response) {          // 文件上传失败的回调方法
                        layer.alert("此文件上传失败：", {icon: 2});
                        //console.info(file.name);
                    },
                    onComplete: function (response) {           	  // 上传完成的回调方法
                        //console.info("文件上传完成");
                        //console.info(response);
                    }
                });

            });
        };
    }]);
});
