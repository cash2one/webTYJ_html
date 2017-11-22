/**
 * Created by Administrator on 2015/12/15.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('meteringResultsCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.doClick(3);
        var url = $rootScope.url;
        $scope.fileUrl = $rootScope.fileUrl;
        $scope.searchMeter = {page: {}};
        $scope.showDetalis = false;
        $scope.showList = true;
        //返回到抄表结果列表
        $scope.getBack = function () {
            $scope.showDetalis = false;
            $scope.showList = true;
            $scope.load();
        };
        //******************抄表结果列表查询显示*********************************//
        $scope.load = function () {
            var waterCheckFunction = function (page, callback) {
                $scope.searchMeter.page = page;
                //$http.post(url + '/MeterReadingResults/listPageMeterReadingResults',
                $http.post(url + '/MeterReadingProgram/listMeterReadingResult',
                    {SearchMeter: $scope.searchMeter}).success(callback);
            };
            $scope.waterChecks = app.get('Paginator').list(waterCheckFunction, 10);
            //console.log($scope.waterChecks);
        };
        $scope.load();
        $scope.check = function (item) {
            $scope.btnIndex = item;
        };
        //********************抄表结果详情***************************//
        $scope.waterMeterRecords = {page: {}};
        $scope.showDetails = function (item) {
            $scope.meterReadingProgramTemp = item;
            $scope.showDetalis = true;
            $scope.showList = false;
            $scope.load1 = function () {
                var waterMeterCheckFunction = function (page, callback) {
                    $scope.waterMeterRecords.page = page;
                    $scope.waterMeterRecords.meterReadingProgramId = item.meterReadingProgramId;
                    //$scope.waterMeterRecords.fullName ='';
                    //$scope.waterMeterRecords.waterMeterNum='';
                    /*$http.post(url + '/WaterMeterRecords/listPageWaterMeterRecordsById',
                     {WaterMeterRecords:$scope.waterMeterRecords}).success(callback);*/
                    //$scope.waterMeterRecords = {meterReadingProgramId:item.meterReadingProgramId};
                    $http.post(url + '/MeterReadingData/listPageMeterRecoedDateList',
                        {MeterReadingData: $scope.waterMeterRecords}).success(callback);
                };
                $scope.waterMeterChecks = app.get('Paginator').list(waterMeterCheckFunction, 10);
            };
            $scope.load1();
            $scope.annex = {
                annexAddress: '',
                annexName: '',
                relationId: item.meterReadingProgramId
            };
        };

        $scope.exportExcelHouse = function() {
            $('body').append('<a id="click" href="' + $scope.fileUrl + '/info/outReadingProgramExcel.do?fileName=' + $scope.meterReadingProgramTemp.projectName + '&meterReadingProgramId=' + $scope.meterReadingProgramTemp.meterReadingProgramId + '"></a>');
            document.getElementById('click').click();
        };
        $scope.inportMeterExcel = function () {
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
                        $scope.annex.relationId = $scope.meterReadingProgramTemp.meterReadingProgramId;
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


        $scope.readingChange = function (item) {
            $http.post(url + '/MeterReadingData/setMeterReadingData', {MeterReadingData: item}).success(function (data) {
            })
        };


        var filePath = '';          //上传文件的路径
        $scope.annex = {
            annexAddress: '',
            annexName: '',
            relationId: ''
        };
        $scope.inportExcel = function () {
            $scope.fileState = "1";

            $(function () {
                $("#remove").html('').append('<div id="excelupload" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload").zyUpload({
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
                        $http.post(url + "/MeterReadingData/importExcelFileMeterReadingData", {Annex: $scope.annex}).success(function (data) {
                            $scope.load();
                            layer.alert(data.Info.info.$, {icon: 1});
                        });
                    },
                    onFailure: function (file, response) {          // 文件上传失败的回调方法
                        layer.alert("此文件上传失败：", {icon: 2});
                    },
                    onComplete: function (response) {           	  // 上传完成的回调方法
                    }
                });

            });
        };
    }]);
});