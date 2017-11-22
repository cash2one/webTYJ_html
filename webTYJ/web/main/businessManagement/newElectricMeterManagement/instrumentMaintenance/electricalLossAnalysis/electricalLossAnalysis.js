/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');
    app.controller('electricalLossAnalysisCtrl', ['$scope', '$http','$rootScope','$filter','$location', function ($scope,$http,$rootScope,$filter,$location){
        $scope.doClick(2);//tab刷新高亮
        //显示隐藏控制
        $scope.showState1 = true;
        $scope.showState2 = false;
        $scope.name = '';//tab高亮控制
        $scope.tabs = [{electricityMeterRecordsId:'aaa',electricityMeterDescribed:'总表'}];
        $scope.ElectricityMeterRecords = {page:{}};
        $scope.month = new Date();
        $scope.id = 'aaa';
        var url = $rootScope.url;
        /**
         * 总表数据分页
         */
        $scope.load = function () {
            var checkElectricity = function (page, callback) {
                $scope.ElectricityMeterRecords.page = page;
                $scope.ElectricityMeterRecords.queryDate = new Date();
                $http.post(url + '/ElectricityMeterRecords/getElectricityDamage', {ElectricityMeterRecords: $scope.ElectricityMeterRecords}).success(callback);
            };
            $scope.total = app.get('Paginator').list(checkElectricity, 6);
        };
        $scope.load();

        /**
         * 获取子表数据分页
         */
        $scope.loadChildren = function (parentNumList) {
            var checkElectricity = function (page, callback) {
                $scope.ElectricityMeterRecords.page = page;
                $scope.ElectricityMeterRecords.queryDate = new Date();
                $scope.ElectricityMeterRecords.parentNumList = (parentNumList+'').split(',');
                $scope.ElectricityMeterRecords.parentNumOne = $scope.ElectricityMeterRecords.parentNumList[0];
                $scope.ElectricityMeterRecords.parentNumTwo = $scope.ElectricityMeterRecords.parentNumList[1]||'';

                $http.post(url + '/ElectricityMeterRecords/getElectricityDamageTwo', {ElectricityMeterRecords: $scope.ElectricityMeterRecords}).success(callback);
            };
            $scope.total = app.get('Paginator').list(checkElectricity, 6);
            var time = setInterval(function(){
                if($scope.total.object.electricityMeterRecords==null){
                    return ;
                }
                clearInterval(time);
                var array = $scope.total.object.electricityMeterRecords;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].reading != null && array[i].childMeterReading != null) {
                        array[i].readingAbs = (array[i].reading - array[i].childMeterReading) / Math.abs(array[i].reading);
                    }
                }
                $scope.total.object.electricityMeterRecords = array;
            },100);

        };

        /**
         * 根据总表类型显示详情列表
         * @param item
         */
        $scope.showDetail = function(item){
            if(item.hasChird==0){
                layer.msg('没有下一级数据了!',{icon:0,time:1500});
                return
            }
            $scope.addTab(item);
            $scope.loadChildren(item.electricityMeterNum);
        };
        /**
         *
         */
        $scope.back = function(){
            $scope.tabChecked($scope.tabs[$scope.tabs.length-2]);
            $scope.addTab($scope.tabs[$scope.tabs.length-1]);
        };
        /**
         * 新增tab选项卡
         * @param item
         */
        $scope.addTab = function(item){
            var bool = false;
            for(var i = 0;i<$scope.tabs.length;i++){
                if(item.electricityMeterRecordsId==$scope.tabs[i].electricityMeterRecordsId){
                    bool = true;
                }
            }
            if(bool){
                $('#'+item.electricityMeterRecordsId).addClass('this_info').siblings().removeClass('this_info');
            }else{
                $scope.tabs.push(item);
                setTimeout(function(){
                    $('#'+item.electricityMeterRecordsId).siblings().removeClass('this_info');
                },10);
            }
            $scope.id = item.electricityMeterRecordsId;
        };

        /**
         *  根据选中的id获取数据后赋值到列表
         */
        $scope.tabChecked = function(item){
            if(item.electricityMeterRecordsId == $scope.id){
                return ;
            }
            var index = $scope.tabs.indexOf(item);
            $scope.tabs = $scope.tabs.slice(0,index+1);
            if(item.electricityMeterRecordsId == 'aaa'){
                $scope.load();
            }else{
                $scope.loadChildren(item.electricityMeterNum);
            }
        };
        $scope.detail = [{},{}];

        /**
         * 导出
         */
        $scope.outElectricityLossExcel = function(){
            var month = $scope.month.getFullYear()+'-'+($scope.month.getMonth()<10?('0'+($scope.month.getMonth()+1)):$scope.month.getMonth()+1)+'-01';
            window.location.href = $rootScope.fileUrl+'/info/outElectricityLossExcel.do?queryDate='+month;
        };

        /**
         * 刷新电损数据接口
         */
        $scope.getElectricityDamage = function(){
            $http.get(url + '/ElectricityMeterRecords/qweqwe').success(function(){
                layer.msg("刷新成功",{icon:1});
                $scope.load();
            }).error(function(){
                layer.msg("刷新失败",{icon:2});
                $scope.load();
            });
        };

    }]);
});