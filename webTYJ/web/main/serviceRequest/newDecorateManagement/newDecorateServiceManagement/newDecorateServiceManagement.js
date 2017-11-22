/**
 * Created by NM on 2018/1/18.
 * 装修管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newDecorateServiceManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1=true;
        $scope.show2=false;
        $scope.show3=false;

        $scope.frequencyRecordOne=false;
        $scope.frequencyRecordTow=true;
        $scope.frequencyRecordThree=true;
        $scope.frequencyRecordFour=true;
        $scope.frequencyRecordFive=true;
        $scope.frequencyRecordSix=true;
        $scope.frequencyRecordSeven=true;




        $scope.test='newDecorateServiceManagement';
        $scope.btnIndex1=1;

        $scope.decorate1=function(index){
            if(index==1){
                $scope.show1=true;
                $scope.show2=false;
                $scope.show3=false;
                $scope.btnIndex1=index;
            }else if(index==2){
                $scope.show1=false;
                $scope.show2=false;
                $scope.show3=true;
                $scope.btnIndex1=index;
            }

        }
        $scope.addDecorate1=function(index){
            $scope.show1=false;
            $scope.show2=true;
            $scope.show3=false;
            $scope.btnIndex1=index;
        }
        var url=$rootScope.url;
        $scope.DecorationInspectionPlans = {page:{}};
        $scope.load = function(){

            var fetchFunction = function (page, callback) {
                $scope.DecorationInspectionPlans.page = page;
                $scope.DecorationInspectionPlans.state='1';
                $http.post(url + '/DecorationInspectionPlans/listPageDecorationInspectionPlans', {DecorationInspectionPlans:$scope.DecorationInspectionPlans}).success(callback)

            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);

        };
        $scope.load();

        //历史
        $scope.load2 = function(){
            $scope.DecorationInspectionPlans2 = {page:{}};
            var fetchFunction = function (page, callback) {
                $scope.DecorationInspectionPlans2.page = page;
                $scope.DecorationInspectionPlans2.state='0';
                $http.post(url + '/DecorationInspectionPlans/listPageDecorationInspectionPlans', {DecorationInspectionPlans:$scope.DecorationInspectionPlans2}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator2);

        };
        $scope.load2();
        $scope.demand={
            /**任务类型**/
            frequency:[
                { id: '0',name:'日检' },
                { id: '1',name:'周检' },
                { id: '2',name:'半月检' },
                { id: '3',name:'月检' }
            ]
        };
        $scope.grids=true;
        $scope.list=function(){
            $scope.grids=true;

        }
        $scope.gridChange=function(){
            $scope.grids=false;
        }

        $scope.getData = function(item){
            var allData = $scope.searchPaginator2.object.decorationInspectionPlan.slice(1);
            var num = [];
            $scope.chooseData = {datas: []};
            for(var i=0;i<allData.length;i++)
            {
                if(item.decorationInspectionPlanId == allData[i].decorationInspectionPlanId)
                {
                    if(document.getElementById(item.decorationInspectionPlanId).checked)
                    {
                        document.getElementById(item.decorationInspectionPlanId).checked = false;
                        document.getElementById(item.decorationInspectionPlanId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;

                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].decorationInspectionPlanId != item.decorationInspectionPlanId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.decorationInspectionPlanId).checked = true;
                        document.getElementById(item.decorationInspectionPlanId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].decorationInspectionPlanId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        //allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };
        $scope.getData1 = function(item){
            var allData = $scope.searchPaginator.object.decorationInspectionPlan.slice(1);
            var num = [];
            $scope.chooseData = {datas: []};
            for(var i=0;i<allData.length;i++)
            {
                if(item.decorationInspectionPlanId == allData[i].decorationInspectionPlanId)
                {
                    if(document.getElementById(item.decorationInspectionPlanId).checked)
                    {
                        document.getElementById(item.decorationInspectionPlanId).checked = false;
                        document.getElementById(item.decorationInspectionPlanId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;

                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].decorationInspectionPlanId != item.decorationInspectionPlanId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.decorationInspectionPlanId).checked = true;
                        document.getElementById(item.decorationInspectionPlanId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].decorationInspectionPlanId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        //allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };
        /*********************************新建方案 杨升权2016/8/10**********************************************/
        $scope.DecorationInspectionPlan={};
        $scope.DecorationInspectionPlan.frequencyRecord={};
        $scope.DecorationInspectionPlan.executionTimeRecords=[];//executiveNumTime:'',executiveNum:''
        /**
         * 添加行
         */
        $scope.editIndex = null;
        $scope.editItem = false;

        $scope.add=function(){
            if($scope.editItem){
                layer.msg('请先保存正在填写的数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editItem = true;
            $scope.editIndex = null;
            //$scope.itemExecutive = {};

        };
        //删除
        $scope.deleteItem=function(index){

            //增加判断是否有数据未保存的判断
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                $scope.DecorationInspectionPlan.executionTimeRecords.splice(index,1);
                layer.msg('删除成功！',{icon : 1,time : 1000});
                $scope.$apply($scope.DecorationInspectionPlan.executionTimeRecords);
            },function(){});
        };

        /**
         * 执行时间保存
         * */

        $scope.executionTimeRecord={};
        $scope.addSave1=function() {
            var index=0;
            if ($scope.executionTimeRecord.executiveNumTime == undefined || $scope.executionTimeRecord.executiveNumTime == '') {
                layer.msg('执行时间不能为空！', {icon: 0, time: 1000});
                return;
            }
            if($scope.editIndex!=null){
                $scope.DecorationInspectionPlan.executionTimeRecords[$scope.editIndex]={
                    executiveNum:  $scope.DecorationInspectionPlan.executionTimeRecords.length,
                    executiveNumTime: $scope.executionTimeRecord.executiveNumTime
                }
            }else {
                $scope.DecorationInspectionPlan.executionTimeRecords.push({
                    executiveNum:  ($scope.DecorationInspectionPlan.executionTimeRecords.length)+1,
                    executiveNumTime: $scope.executionTimeRecord.executiveNumTime
                })
            }
            $scope.editItem=false;
            $scope.executionTimeRecord.executiveNumTime='';


        }
        $scope.addCancel1=function(){
            $scope.editItem=false;
            $scope.executionTimeRecord={};
        };
        //修改新增行
        $scope.updateItem = function(index){
            $scope.editIndex = index;
            var current2 = $scope.DecorationInspectionPlan.executionTimeRecords[index];
            $scope.executionTimeRecord = {
                executiveNum:current2.executiveNum,
                executiveNumTime: current2.executiveNumTime
            };
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }


            $scope.editItem=true;


        };

        $scope.changeFre=function() {
            var temp = document.getElementsByName('checkb');
            $scope.frequencyRecordChecked=[];
            for (var i = 0; i < temp.length; i++) {

                if (temp[i].checked == true) {
                    temp[i].checked=false;
                }

            }
            $scope.frequencyRecordChecked=[];

            if ($scope.DecorationInspectionPlan.frequencyRecord.frequencyType == 0) {//日检
                $scope.frequencyRecordOne = true;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = false;
                $scope.frequencyRecordFour = false;
                $scope.frequencyRecordFive = false;
                $scope.frequencyRecordSix = false;
                $scope.frequencyRecordSeven = false;
            } else if ($scope.DecorationInspectionPlan.frequencyRecord.frequencyType == 1) {//周检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = true;
                $scope.frequencyRecordThree = false;
                $scope.frequencyRecordFour = false;
                $scope.frequencyRecordFive = false;
                $scope.frequencyRecordSix = false;
                $scope.frequencyRecordSeven = false;
            } else if ($scope.DecorationInspectionPlan.frequencyRecord.frequencyType == 2) {//半月检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = true;
                $scope.frequencyRecordFour = true;
                $scope.frequencyRecordFive = true;
                $scope.frequencyRecordSix = true;
                $scope.frequencyRecordSeven = true;
            } else if ($scope.DecorationInspectionPlan.frequencyRecord.frequencyType == 3) {//月检
                $scope.frequencyRecordOne = false;
                $scope.frequencyRecordTow = false;
                $scope.frequencyRecordThree = true;
                $scope.frequencyRecordFour = true;
                $scope.frequencyRecordFive = true;
                $scope.frequencyRecordSix = true;
                $scope.frequencyRecordSeven = true;
            }
        }
        $scope.addDecoration=function(){
            console.log( $scope.DecorationInspectionPlan.executionTimeRecords);
            if($scope.DecorationInspectionPlan.decorationInspectionPlanName==undefined || $scope.DecorationInspectionPlan.decorationInspectionPlanName==''){
                layer.msg('巡检方案名称不能为空！',{icon : 0,time : 2000});
                return;
            }
            if($scope.DecorationInspectionPlan.decorationInspectionPlanRemarks==undefined || $scope.DecorationInspectionPlan.decorationInspectionPlanRemarks==''){
                layer.msg('巡检方案说明不能为空！',{icon : 0,time : 2000});
                return;
            }
            if($scope.DecorationInspectionPlan.effectiveTime==null || $scope.DecorationInspectionPlan.effectiveTime==''){
                layer.msg('生效时间不能为空！',{icon : 0,time : 2000});
                return;
            }
            if($scope.DecorationInspectionPlan.failureTime==null || $scope.DecorationInspectionPlan.failureTime==''){
                layer.msg('失效时间不能为空！',{icon : 0,time : 2000});
                return;
            }
            if($scope.DecorationInspectionPlan.frequencyRecord.frequencyType=="" ||$scope.DecorationInspectionPlan.frequencyRecord.frequencyType == null){
                layer.msg('频率类型不能为空！',{icon : 0});
                return;
            }
            if($scope.DecorationInspectionPlan.frequencyRecord.frequencyType !=0 && $scope.frequencyRecordChecked.length==0) {
                layer.msg('执行频率不能为空！',{icon : 0});
                return;
            }

            $scope.DecorationInspectionPlan.frequencyRecord.executionFrequencys=$scope.frequencyRecordChecked;
            $scope.DecorationInspectionPlan.frequencyRecord.executionFrequencyNum=$scope.DecorationInspectionPlan.executionTimeRecords.length;
            $http.post(url + '/DecorationInspectionPlans/AddDecorationInspectionPlans', {
                DecorationInspectionPlans: $scope.DecorationInspectionPlan
            }).success(function (data) {
                $scope.show1=true;
                $scope.show2=false;
                $scope.DecorationInspectionPlan={};
                $scope.DecorationInspectionPlan.frequencyRecord={};
                $scope.DecorationInspectionPlan.executionTimeRecords=[];
                $scope.load();
                $scope.load2();
            }).error(function (data) {
                alert("服务器请求失败！");
            });
        }

        /**
         * 方案全选按钮功能
         */
       /* $scope.isAllChecked=false;//判断是否全选,默认否
        $scope.forChangeSR = {decorationInspectionPlanIds:[]};
        $scope.allChecked = function(){
            //console.log($scope.currentMeterReadingSR);
            $scope.forChangeSR.decorationInspectionPlanIds=[];
            $scope.isAllChecked = true;
            var items = $scope.searchPaginator.object.decorationInspectionPlan;
            if(items!=null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].decorationInspectionPlanId != null){
                        $scope.forChangeSR.decorationInspectionPlanIds.push(items[i].decorationInspectionPlanId);
                    }
                }
            }
            console.log($scope.forChangeSR.decorationInspectionPlanIds);
        }*/



        $scope.frequencyRecordChecked=[];
        $scope.doCheck=function() {
            TempChecked();
        }

        function TempChecked() {
            var temp = document.getElementsByName('checkb');
            $scope.frequencyRecordChecked=[];
            for (var i = 0; i < temp.length; i++) {

                if (temp[i].checked == true) {

                    $scope.frequencyRecordChecked.push(temp[i].value);
                }else{
                    if (temp[i].checked == true) {

                        $scope.frequencyRecordChecked.push(temp[i].value);
                    }
                }
            }
            console.log( $scope.frequencyRecordChecked);
        }

        //当前日期
        var d = new Date();
        var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();



        $scope.object1={};
        //启用
        $scope.open=function(data){
            $scope.object1=data;
            layer.confirm('是将方案改为有效？',{
                btn : ['确定','取消']
            },function(){
                if(new Date($scope.object1.failureTime) > new Date(str)){
                    $scope.object1.state=1;
                    $http.put(url+'/DecorationInspectionPlans/UpdateDecorationInspectionPlans',{DecorationInspectionPlans:$scope.object1}).success(function(){
                        layer.msg("修改成功",{icon : 1});
                        $scope.load();
                        $scope.load2();
                    }).error(function(data, status, headers, config){
                        layer.msg("修改失败",{icon : 2});
                    }) ;
                }else {
                    layer.msg("此方案已过有效期",{icon : 0});
                    return;
                }




            },function(){});

        };
        //失效
        $scope.close=function(data){
            $scope.object1=data;
            if($scope.object1.state==0){
                layer.msg("该方案已是失效状态",{icon : 0});
            }else{
                $("#novail").modal("show");
            }

        };
        /*失效保存*/
        $scope.saveUpdate=function(){
            layer.confirm('是将有效期内的方案改为失效？',{
                btn : ['确定','取消']
            },function(){
                $scope.object1.state=0;
                $http.put(url+'/DecorationInspectionPlans/UpdateDecorationInspectionPlans',{DecorationInspectionPlans:$scope.object1}).success(function(){
                    layer.msg("修改成功",{icon : 1});
                    $scope.load();
                    $scope.load2();
                    $scope.object1='';
                }).error(function(data, status, headers, config){
                    layer.msg("修改失败",{icon : 2});
                }) ;
            },function(){});
        };
        //失效取消清空
        $scope.closed=function(){
            $scope.object1.closeRemarks='';
        }

        //查看
        $scope.show=function(data){
            $scope.object1=data;
            console.log($scope.object1);
            $http.get(url + '/DecorationInspectionPlans/getDecorationFrequencyRecord/'+ $scope.object1.decorationInspectionPlanId).success(function(data) {
                console.log(data);
                    $scope.FrequencyRecord = data.FrequencyRecord;
            }).error(function(err){

            });

            $scope.ExecutionTimeRecords={page:{}};
            var currentCheck = function(page,callback){
                $scope.ExecutionTimeRecords.page = page;
                $scope.ExecutionTimeRecords.serviceRequestId =$scope.object1.decorationInspectionPlanId;
                $http.post(url+'/ExecutionTimeRecords/listPageDecorationsExecutionTime',{ExecutionTimeRecords:$scope.ExecutionTimeRecords}).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck,4);
            console.log($scope.projectItem);
            $("#detail").modal("show");
        };

    }]);
});
