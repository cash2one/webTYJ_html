/**
 * Created by NM on 2018/1/18.
 * 放行条js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('addReleasePassCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.items=[{}];
        var url=$rootScope.url;
        /*$scope.PersonCust={};//搜索人员对象*/
        $scope.addrelease={};
        $scope.banli=$scope.user;

        $scope.currentDate = new Date();

        //【物品动态添加行】

        $scope.Contain_y = [];              //包含物品数组
        $scope.Contain_n = [];              //不包含物品数组

        $scope.button = true;
        $scope.addContain_y = function(){   //点击包含物品按钮
            $scope.button = true;
            if($scope.currentBuilding.areaNew.length>0){
                $scope.Contain_n = $scope.currentBuilding.areaNew;
                $scope.currentBuilding.areaNew = [];
            }
            if($scope.Contain_y.length>0){
                $scope.currentBuilding.areaNew = $scope.Contain_y;
            }

        }

        $scope.addContain_n = function(){   //点击不包含物品按钮
            $scope.button = false;
            if($scope.currentBuilding.areaNew.length>0){
                $scope.Contain_y = $scope.currentBuilding.areaNew;
                $scope.currentBuilding.areaNew = [];
            }
            if($scope.Contain_n.length>0){
                $scope.currentBuilding.areaNew = $scope.Contain_n;
            }
        }

        $scope.currentEditIndex = null;
        $scope.currentBuilding={areaNew:[]};
        $scope.editArea=false;
        $scope.currentEditArea={};

        /**
         * 新增按钮事件
         */
        $scope.addRow=function(){
            //bug1750 陈秋旭 2016/5/12
            if($scope.editArea){
                var areaName=$('#currentEditAreaName').val();
                var curentEditAreaSum=$('#curentEditAreaSum').val();
                if(areaName.length!=0){
                    layer.msg("请先保存正在编辑的数据!",{icon:0,time:1000});
                    return;
                }
                else if(curentEditAreaSum.length!=0){
                    layer.msg("请先保存正在编辑的数据!",{icon:0,time:1000});
                    return;
                }else{
                    layer.msg('请先保存正在编辑的数据',{icon:0});
                }

            }else {
                $scope.editArea = true;
                $scope.currentEditIndex = null;
            }
        };

        /**
         * 下一行保存操作
         */
        $scope.addSave=function(){
            if($scope.currentEditIndex!=null){
                if($scope.button){
                    if($scope.currentEditArea.itemName==''||$scope.currentEditArea.itemName==null||$scope.currentEditArea.itemName==undefined)
                    {
                        layer.msg('物品名称不能为空',{icon:0});
                        return;
                    }else if($scope.currentEditArea.amount==''||$scope.currentEditArea.amount==null||$scope.currentEditArea.amount==undefined)
                    {
                        layer.msg('数量不能为空',{icon:0});
                        return;
                    }else if (!IsNum($scope.currentEditArea.amount)){
                        return ;
                    }
                    $scope.currentBuilding.areaNew[$scope.currentEditIndex]={
                        itemName:$scope.currentEditArea.itemName,
                        amount:$scope.currentEditArea.amount,
                        note:$scope.currentEditArea.note,
                        contaitState:1,
                        houseId:$scope.houseone1.buildingStructureId
                    };
                }else{
                    if($scope.currentEditArea.itemName==''||$scope.currentEditArea.itemName==null||$scope.currentEditArea.itemName==undefined)
                    {
                        layer.msg('物品名称不能为空',{icon:0});
                        return;
                    }else if($scope.currentEditArea.amount==''||$scope.currentEditArea.amount==null||$scope.currentEditArea.amount==undefined)
                    {
                        layer.msg('数量不能为空',{icon:0});
                        return;
                    }
                    else if (!IsNum($scope.currentEditArea.amount)){
                        return ;
                    }
                    $scope.currentBuilding.areaNew[$scope.currentEditIndex]={
                        itemName:$scope.currentEditArea.itemName,
                        amount:$scope.currentEditArea.amount,
                        note:$scope.currentEditArea.note,
                        contaitState:0,
                        houseId:$scope.houseone1.buildingStructureId
                    };
                }
            }
            else{
                if($scope.button){
                    if($scope.currentEditArea.itemName==''||$scope.currentEditArea.itemName==null||$scope.currentEditArea.itemName==undefined)
                    {
                        layer.msg('物品名称不能为空',{icon:0});
                        return;
                    }else if($scope.currentEditArea.amount==''||$scope.currentEditArea.amount==null||$scope.currentEditArea.amount==undefined)
                    {
                        layer.msg('数量不能为空',{icon:0});
                        return;
                    }   else if (!IsNum($scope.currentEditArea.amount)){
                        return ;
                    }
                    $scope.currentBuilding.areaNew.push({
                        itemName:$scope.currentEditArea.itemName,
                        amount:$scope.currentEditArea.amount,
                        note:$scope.currentEditArea.note,
                        contaitState:1,
                        houseId:$scope.houseone1.buildingStructureId
                    });
                }else{
                    if($scope.currentEditArea.itemName==''||$scope.currentEditArea.itemName==null||$scope.currentEditArea.itemName==undefined)
                    {
                        layer.msg('物品名称不能为空',{icon:0});
                        return;
                    }else if($scope.currentEditArea.amount==''||$scope.currentEditArea.amount==null||$scope.currentEditArea.amount==undefined)
                    {
                        layer.msg('数量不能为空',{icon:0});
                        return;
                    }
                    else if (!IsNum($scope.currentEditArea.amount)){
                        return ;
                    }
                    $scope.currentBuilding.areaNew.push({
                        itemName:$scope.currentEditArea.itemName,
                        amount:$scope.currentEditArea.amount,
                        note:$scope.currentEditArea.note,
                        contaitState:0,
                        houseId:$scope.houseone1.buildingStructureId
                    });
                }
            }
            $scope.currentEditArea={};
            $scope.editArea=false;
            console.log($scope.currentBuilding.areaNew);
        };

        /**
         *  修改按钮点击事件
         * @param index  行下标
         */
        $scope.updateItem=function(index){
            if( $scope.editArea=true){
            var areaName=$('#currentEditAreaName').val();
            var curentEditAreaSum=$('#curentEditAreaSum').val();
            if(areaName.length!=0){
                layer.msg("请先保存正在编辑的数据!",{icon:0,time:1000});
                return;
            }
            else if(curentEditAreaSum.length!=0){
                layer.msg("请先保存正在编辑的数据!",{icon:0,time:1000});
                return;
            }
            }else
                {
                    $scope.editArea = true;
                    $scope.currentEditIndex = index;
                    var current = $scope.currentBuilding.areaNew[index];
                    $scope.currentEditArea = {
                        itemName: current.itemName,
                        amount: current.amount,
                        note: current.note
                    };
                }
        };

        /**
         * 修改保存
         * @param index 行下标
         */
        $scope.updateSave=function(index){
            $scope.tenementPact[index].editing=false;
        };


        /**
         * 取消
         * @param index 行下标
         */
        $scope.updateCancel=function(index){
            //$scope.tenementPact[index]=$scope.cloneItem;
            $scope.tenementPact[index].editing=false;

        };

        /**
         * 新增取消
         */
        $scope.addCancel=function(){
            $scope.editArea=false;
            $scope.currentEditArea={};
        };

        /**
         * 删除数据
         * @param index 行下标
         */
        var del_arr = [];
        $scope.deleteItem=function(index){

            //if( $scope.editArea=true) {
              var areaName = $('#currentEditAreaName').val();
                var curentEditAreaSum = $('#curentEditAreaSum').val();
                if (areaName.length != 0) {
                    layer.msg("请先保存正在编辑的数据!", {icon: 0, time: 1000});
                    return;
                }
                else if (curentEditAreaSum.length != 0) {
                    layer.msg("请先保存正在编辑的数据!", {icon: 0, time: 1000});
                    return;
                }
                else {
                    layer.confirm('是否确认删除？',
                        {btn : ['确定','取消']},
                        function(){

                            $scope.$apply(function (){
                                $scope._deleteContain = $scope.currentBuilding.areaNew.splice(index, 1);
                            });
                            layer.msg('',{time:1})
                        },function(){});
           }

        };

        //加载房屋信息
        $scope.search.custId=$rootScope.user.custId;
        $http.post(url+'/HouseNew/listAllHouseNewBySearch',{Search:$scope.search}).success(function(data)
        {
            $scope.houses=data.HouseNew;
            console.log($scope.houses);
        }).error(function(error){
            console.log("搜索失败，自己填充数据")

        });


        //人员模态框通过人员条件搜索人员信息
        $scope.searchone={};
        $scope.selectPersonBycustId=function(){
            $http.post(url+'/PersonCustNew/listAllPersonBySearch',{Search:$scope.searchone}).success(function(data)
            {
                console.log("搜索成功");
                $scope.persons=data.PersonCustNew;
                console.log($scope.persons);
            }).error(function(){
                console.log("搜索失败");
            });
        };


        //点击图片将人员信息绑定到前面页面
        $scope.persontwo={};
        $scope.getPersonBycustId=function(person){
            $scope.persontwo=person;
            console.log($scope.persontwo);
        };

        //选择房屋
        $scope.houseone={};
        $scope.choicHouse=function(house){
            console.log(house);
            $scope.houseone=house;
        }

        $scope.addArticleRelease=function(){

            var arr1 = $scope.Contain_y;
            var arr2 = $scope.Contain_n;

            console.log($scope.Contain_y);
            console.log($scope.Contain_n);

            $scope.addrelease.item = arr1.concat(arr2);
           // console.log($scope.addrelease.item+"---ww-");
            $scope.addrelease.houseName = $scope.houseone1.fullName;
            $scope.addrelease.custId = $rootScope.user.custId;//办理人
            $scope.addrelease.personId = $scope.persontwo.custId;//运送人
            $scope.addrelease.customerType = 1;//客户类型
            $scope.addrelease.houseId= $scope.houseone1.buildingStructureIds;
            var areaName=$('#currentEditAreaName').val();
            var curentEditAreaSum=$('#curentEditAreaSum').val();
            if(areaName.length!=0){
                layer.msg("请先保存物品信息!",{icon:0,time:1000});
                return;
            }
            if(curentEditAreaSum.length!=0){
                layer.msg("请先保存物品信息!",{icon:0,time:1000});
                return;
            }
            if($scope.addrelease.releaseTime == null){
                layer.msg("放行开始时间不能为空!",{icon:0,time:1000});
                return;
            } else if($scope.addrelease.releaseTimeEnd == null){
                layer.msg("放行结束时间不能为空!",{icon:0,time:1000});
                return;
            }
           else if($scope.addrelease.houseName==null){
                layer.msg("搬出房屋地址不能为空!",{icon:0,time:1000});
                return;
            }

            else if( $scope.addrelease.applyTime==null){
                layer.msg("申请日期不能为空!",{icon:0,time:1000});
                return;
            }else if(new Date($scope.addrelease.releaseTimeEnd)- new Date($scope.addrelease.releaseTime)<0){
               new Date();
                layer.msg("放行开始时间不能在放行结束时间之后!",{icon:0,time:1000});
                return;
            }else if(new Date($scope.addrelease.releaseTime)-new Date($scope.addrelease.applyTime)<0) {
                new Date();
                layer.msg("申请日期不能在放行开始时间之后!", {icon: 0, time: 1000});
                return;
            }else  if($scope.button){
                if($scope.currentBuilding.areaNew.length>0){
                    $scope.Contain_y = $scope.currentBuilding.areaNew;
                }else{
                    layer.msg("请先填写物品信息!",{icon:0,time:1000});
                    return;
                }
            }else  if($scope.currentBuilding.areaNew.length>0){
                    $scope.Contain_n = $scope.currentBuilding.areaNew;

            }{
                $scope.addrelease.releaseCode=$scope.FXT;
                $http.post(url + '/ArticleRelease/insertArticleRelease', {ArticleRelease: $scope.addrelease}).success(function () {
                    layer.msg("添加放行条成功!",{icon:1,time:1000});
                    $scope.doClick(1);
                    $location.path("index/propertyService/staffHome/releasePass/historicRecords");
                }).error(function (data, status, headers, config) {
                    layer.msg("添加放行条失败!",{icon:2,time:1000});
                });
            }
        }

        //点击人员搜索清空数据
        $scope.clear=function(){
            $scope.persontwo={};
            $scope.houseone={};
            $scope.addrelease={};
        }

        //查询人员关联的建筑
        $scope.PersonBuildingNew = {};
        $scope.PersonBuildingNew.custId = $rootScope.user.custId;
        $scope.PersonBuildingNew.projectType='693697f3-147b-4e67-9c4f-d98e032efecb';
        $scope.selectHouse = function(){
            $scope.makeFXT();//生产单据号
            $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                $scope.house1 = data.PersonBuildingNew;
                console.log($scope.house1);
                angular.element('#myModale').modal({backdrop: 'static', keyboard: false});
            }).error(function(data){
                layer.alert('没有关联的建筑',{icon : 0,time:1000});
            });
        };

        //$scope.house1=[{}];
        //$scope.selectHouse=function(){
        //    //加载房屋信息
        //    $scope.search.custId=$rootScope.user.custId;
        //    $http.post(url+'/HouseNew/listAllHouseNewBySearch',{Search:$scope.search}).success(function(data)
        //    {
        //        //console.log("搜索成功");
        //        console.log(data);
        //        $scope.house1=data.HouseNew;
        //        //console.log($scope.house1);
        //    }).error(function(error){
        //        console.log("搜索失败，自己填充数据")
        //
        //    });
        //};

        $scope.houseone1={};
        $scope.choiceHouse=function(house){
            //console.log($scope.house);
            $scope.btnIndex = house;
            $scope.houseone1=house;
            //console.log($scope.houseone1);
            $scope.houseone1.houseAddress =  $scope.houseone1.fullName;
            $scope.houseone1.buildingStructureIds=$scope.houseone1.buildingStructureId;
        };

        //获取系统当前时间
        $scope.now=new Date();
        $scope.nowtime=$scope.now.toLocaleString();

        $scope.FXT={};
        $scope.makeFXT=function(){
            $scope.FXT=$scope.formatDateHHmmss();
        }


        //打印
        $scope.printClick = function(){

            if($scope.button){
                if($scope.currentBuilding.areaNew.length>0){
                    $scope.Contain_y = $scope.currentBuilding.areaNew;
                }
            }else{
                if($scope.currentBuilding.areaNew.length>0){
                    $scope.Contain_n = $scope.currentBuilding.areaNew;
                }
            }

            angular.element("#output").empty();

            angular.element("#output").qrcode({
                width: 200,
                height:200,
                text: toUtf8(($scope.FXT))
            });
            angular.element("#myModal").modal("show");

        };

        /**
         * 添加放行条取消操作
         */
        $scope.cancel = function(){
            $scope.addrelease = {};
            $scope.houseone1={};
            $scope.currentBuilding.areaNew=[];
            $scope.Contain_y = [];
            $scope.Contain_n = [];
            $scope.doClick(1);
            $location.path('/index/propertyService/staffHome/releasePass/historicRecords');

        };

        function IsNum(num) {
            //var reNum = /^\d*$/;
            //var reNum=/^(([1-9]\d*)|(0))(\.\d{1,})$/;
            var reNum=/\d+.\d+/;
            if(num==0){
                layer.alert('物品数量不能为0', {icon: 0});
            }else {
                var numTmp = app.get("valueCheck").isOnlyNumberAndNotNull(num);
                if(!numTmp.state){
                    layer.alert('物品数量'+numTmp.info, {icon: 0});
                    return false;
                }else{
                    return true;
                }
                /*
                 if (reNum.test(num)) {
                 return true;
                 } else {
                 if (num < 0) {
                 layer.alert('物品数量不能为负数', {icon: 0});
                 return false;
                 } else {
                 layer.alert('物品数量必须为数字', {icon: 0});
                 return false;
                 }
                 }
                 */
            }
        }
        $scope.formatDate=function() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()<9?'0'+(date.getMonth()+1):date.getMonth()+1;
            var day = date.getDay()<9?'0'+(date.getDay()+1):date.getDay()+1;
            return year+"-"+month+"-"+day;
        };
        $scope.formatDateHHmmss=function() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()<9?'0'+(date.getMonth()+1):date.getMonth()+1;
            var day =  date.getDay()<9?'0'+(date.getDay()+1):date.getDay()+1;
            var hh=date.getHours()<9?'0'+(date.getHours()+1):date.getHours()+1;
            var mm=date.getMinutes()<9?'0'+(date.getMinutes()+1):date.getMinutes()+1;
            var ss=date.getSeconds()<9?'0'+(date.getSeconds()+1):date.getSeconds()+1;
            return year+month+day+hh+mm+ss;
        };
        $scope.addrelease.releaseTime=$scope.formatDate();
        $scope.addrelease.applyTime=$scope.formatDate();
        //二维码

        //转换为UTF-8
        function toUtf8(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for(i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                }
            }
            return out;
        }

    }]);
});

