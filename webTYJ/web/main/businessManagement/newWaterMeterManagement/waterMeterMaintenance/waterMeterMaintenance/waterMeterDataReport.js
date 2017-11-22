/**
 * Created by Administrator on 2015/12/15.
 */

        'use strict';

        define(function (require) {
            var app = require('../../../../../app');
            app.controller('waterMeterDataReportCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test='水表数据报表';
        var url=$rootScope.url;
        $scope.myDate = new Date();   // 获取当前时间
        $scope.month=$scope.myDate.getMonth()+1;
        $scope.fileurl=$rootScope.fileUrl;
        $scope.MeterReadingData={page:{}};
        var presentTime =  new Date();

        $scope.load=function(){
                 var waterCheckFunction = function(page,callback){
                 $scope.MeterReadingData.page=page;
                     $scope.MeterReadingData.specifiedDate = new Date();
                 $http.post(url + '/MeterReadingData/listPageWaterMeterRecordAll',
                 {MeterReadingData:$scope.MeterReadingData}).success(callback);
                 };
                 $scope.waterChecks = app.get('Paginator').list(waterCheckFunction,6);
                 console.log($scope.MeterReadingData);
                 console.log($scope.waterChecks);
                 };
                 $scope.load();

                /**
                 * 选中一条数据事件
                 * @param index  水表抄表计划数据id
                 */
                $scope.check = function (index) {
                    console.log(index);
                    var checkbox = $('#'+index.meterReadingDataId)[0];
                    var tr = $(checkbox).parent().parent()[0];
                    $(tr).toggleClass('this_info');
                    checkbox.checked = $(tr).hasClass('this_info');
                    $scope.item2 = index;
                };

                /**
                 * 获取选中数据
                 */
                function getSelect (){
                    var selectInput = $('#selectInput').find('input[type=checkbox]');
                    var meterReadingDataIds = [];
                    for(var i= 0;i<selectInput.length;i++){
                        if(selectInput[i].checked){
                            meterReadingDataIds.push(selectInput[i].id);
                        }
                    }
                    return meterReadingDataIds;
                }

                /**
                 * 全选
                 */
                $scope.selectAll = function(){
                    var inputs = $('#selectInput').find('input[type=checkbox]');
                    if(inputs.length>getSelect().length){
                        $(inputs).each(function(index,element){
                            element.checked = true;
                        }).parent().parent().each(function(){
                            $(this).addClass('this_info');
                        });
                        $('#selectAll')[0].checked = true ;
                    }else if((inputs.length=getSelect().length)){
                        $(inputs).each(function(index,element){
                            element.checked = false;
                        }).parent().parent().each(function(){
                            $(this).removeClass('this_info');
                        });
                        $('#selectAll')[0].checked = false ;
                    }
                };

                /**
                 * 导出水表数据报表
                 */
                $scope.outWaterDataReportExcel = function(){
                    window.location.href=$rootScope.fileUrl +"/info/outWaterDataReportExcel.do?";
                };

    }]);
});