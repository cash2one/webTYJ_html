/**
 * Created by wuying on 16/5/4.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('shopCartCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.saasUrl;
        var saasUrl = $rootScope.saasUrl;
        $scope.doClick(2);
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCook?userCook:user;
        $scope.companyId = $scope.user.companyId;

        //新建收货地址
        $scope.markShow = false;
        $scope.newAdd = function(){
            $scope.custAdd = {};
            $scope.markShow = true;
        };

        $http.post(saasUrl + "/findCompany?companyId=" + $scope.companyId).success(function(data){
            $scope.companyName = data.companyName;
        });

        $scope.load = function () {
            $http.get(url + '/custAddress/load/' + $scope.user.userId).success(function(data){
                if(data.state == 'success'){
                    $scope.custAddList = data.info;
                } else {

                }
            }).error(function(data){
            });
        };
        $scope.load();


        $scope.custAdd = {};

        //取消新建地址
        $scope.saveCancel = function(){
            $scope.custAdd = {};
            $scope.markShow = false;
        };


        $scope.saveCust = function(){

            console.log($scope.custAdd.distric);
            var consignee = app.get('valueCheck').isNull($scope.custAdd.consignee); //收货人
            var distric = app.get('valueCheck').isNull($scope.custAdd.distric); //所在地区
            var address = app.get('valueCheck').isNull($scope.custAdd.address); //详细地址
            var phone1 = app.get('valueCheck').isNull($scope.custAdd.phone); //手机号码
            var telPhone1 = app.get('valueCheck').isNull($scope.custAdd.telPhone); //固定号码
            var phone = app.get('valueCheck').isPhoneAndNotNull($scope.custAdd.phone); //手机号码
            var telPhone = app.get('valueCheck').isTelAndNotNull($scope.custAdd.telPhone); //固定号码
            var eMail = app.get('valueCheck').isNull($scope.custAdd.eMail); //邮箱
            if(!consignee.state)
            {
                layer.msg('收货人不能为空！',{icon:0,time:2000});
                return;
            }else if(!distric.state){
                layer.msg('所在地区不能为空！',{icon:0,time:2000});
                return;
            }else if(!address.state){
                layer.msg('详细地址不能为空！',{icon:0,time:2000});
                return;
            }else if(!phone1.state&&!telPhone1.state){
                layer.msg('电话号码不能为空！',{icon:0,time:2000});
                return;
            }else if(phone1.state==true&&telPhone1.state==false){
                if(!phone.state){
                    layer.msg(phone.info+'！',{icon:0,time:2000});
                    return;
                }
            }else if(phone1.state==false&&telPhone1.state==true){
                if(!telPhone.state){
                    layer.msg(telPhone.info+'！',{icon:0,time:2000});
                    return;
                }
            }else if(phone1.state==true&&telPhone1.state==true){
                if(!phone.state){
                    layer.msg(phone.info+'！',{icon:0,time:2000});
                    return;
                }
                if(!telPhone.state){
                    layer.msg(telPhone.info+'！',{icon:0,time:2000});
                    return;
                }
            }
            if(eMail.state){
                var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(!reg.test($scope.custAdd.eMail)){
                    layer.msg('邮箱格式不正确！',{icon:0,time:2000});
                    return;
                }
            }
            $scope.custAdd.userId = $scope.user.userId;
            var fd = new FormData();
            fd.append('jsonStr', JSON.stringify($scope.custAdd));
            $http.post(url+'/custAddress/save', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).success(function(){
                $scope.load();
                $scope.custAdd = {};
                $scope.markShow = false;
                layer.msg('添加成功！',{icon : 1,time : 1000});
            }).error(function(data, status, headers, config){
                layer.msg('添加失败！',{icon : 2,time : 1000});
            });
        };

        $scope.deleteCust = function (id) {
            layer.confirm("您确定要删除选定的收货人?", {btn: ['是', '否']}, function () {
                $http.get(url + '/custAddress/delete/' + id).success(function (data) {
                    if(data.state == 'error'){
                        layer.msg(data.info, {icon: 2, time: 1000});
                    } else {
                        $scope.load();
                        layer.msg('删除成功！', {icon: 1, time: 1000});
                    }

                }).error(function (data) {
                    layer.msg('删除失败！', {icon: 2, time: 1000});
                });
            })
        };


        $scope.edit = function (data) {
            $scope.markShow = true;
            $scope.custAdd = angular.copy(data);
        };

        //继续购物
        $scope.shopGo = function(){
            $location.path('/index/videoIntercom/equipmentPurchase/purchase');
            $scope.doClick(1);
        };
        //$scope.cartList = JSON.parse(sessionStorage.getItem("cart"));

        $scope.loadCart = function () {
            $http.get(url + '/eqCart/load/' + $scope.companyId).success(function(data){
                if(data.state == 'success'){
                    $scope.cartList = data.info;
                } else {
                    $scope.cartList = [];
                }
            }).error(function(data){
            });
        };
        $scope.loadCart();
        
        $scope.addCartNum = function (item) {
            if(typeof item.number == 'string'){
                item.number = +item.number;
            }
            item.number = item.number + 1;
            $http.get(url + '/eqCart/changeNum/' + item.id + '/' +item.number ).success(function (data) {

            }).error(function(data){

            });
        };

        $scope.subCartNum = function (item) {
            if(typeof item.number == 'string'){
                item.number = +item.number;
            }
            if(item.number <= 1){
                return;
            }
            item.number = item.number - 1;
            $http.get(url + '/eqCart/changeNum/' + item.id + '/' +item.number ).success(function (data) {

            }).error(function(data){

            });
        };


        $scope.changeCartNum = function (item) {
            $http.get(url + '/eqCart/changeNum/' + item.id + '/' +item.number ).success(function (data) {

            }).error(function(data){

            });
        };

        $scope.delete = function (item) {
            layer.confirm("您确定要删除选定的物品?", {btn: ['是', '否']}, function () {
                $http.get(url + '/eqCart/delete/' + item.id ).success(function (data) {
                    $scope.loadCart();
                    layer.msg("删除成功", {icon: 1, time: 2000});
                }).error(function(data){
                    layer.msg("删除失败", {icon: 2, time: 2000});
                });
            })

        };

        //全选
        $scope.allChoose = function(){
            var choose = document.getElementsByName('choose');
            var chooseed = document.getElementById('chooseed');
            if(chooseed.checked==true){
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = true;
                }
            }else{
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = false;
                }
            }

        };

        //单选

        $scope.getChecked = function(id){
            var ids = document.getElementById(id);
            console.log(ids);
            var num = 0;
            if(ids.checked==true){
                ids.checked = true;
            }else{
                ids.checked = false;
            }
            for(var i=0;i<$scope.cartList.length;i++){
                if(document.getElementById($scope.cartList[i].id).checked==true){
                    num++;
                }
            }
            if(num==$scope.cartList.length){
                document.getElementById('chooseed').checked = true;
                $scope.allChoose();
            }else{
                document.getElementById('chooseed').checked = false;
            }
        };

        //多选删除
        $scope.chooseDelete = function(){
            $scope.chooseDataId = '';
            var data = '';
            angular.forEach($scope.cartList,function(item,key){
                if(document.getElementById(item.id).checked==true)
                {
                    $scope.chooseDataId += item.id + ',';
                }
            });
            var dataIndex = $scope.chooseDataId.lastIndexOf(',');
            data = $scope.chooseDataId.substring(0,dataIndex);
            if(data==''){
                layer.msg('请选择数据！',{icon:0,time:2000});
                return
            }
            $http.get(url + '/eqCart/delete/' + data).success(function (data) {
                $scope.loadCart();
                document.getElementById('chooseed').checked = false;
                layer.msg("删除成功", {icon: 1, time: 2000});
            }).error(function(data){
                layer.msg("删除失败", {icon: 2, time: 2000});
            });
        };

        $scope.selectCust;

       /*$scope.chooseCust = function () {
            for(var i = 0; i < $scope.custAddList.length; i++){
                var temp = document.getElementById($scope.custAddList[i].id);
                if(temp.checked){
                    $scope.selectCust = $scope.custAddList[i];
                    console.dir($scope.selectCust);
                }
            }
        };*/


        $scope.save = function () {
            for(var i = 0; i < $scope.custAddList.length; i++){
                var temp = document.getElementById($scope.custAddList[i].id);
                if(temp.checked){
                    $scope.selectCust = $scope.custAddList[i];
                    console.dir($scope.selectCust);
                }
            }
            if($scope.selectCust == null){
                layer.alert('请选择收货人！',{icon : 0});
            }else if($scope.cartList.length==0){
                layer.msg('当前购物车为空，请购物之后再提交！',{icon : 0,time:2000});
            }else {
                var fd = new FormData();
                fd.append('custJson', JSON.stringify($scope.selectCust));
                fd.append('cartJson', JSON.stringify($scope.cartList));
                fd.append('companyName', $scope.companyName);
                $http.post(url+'/eqOrder/save', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).success(function(){
                    layer.msg('添加成功！',{icon : 1,time : 1000});
                    $scope.doClick(1);
                    $location.path('/index/videoIntercom/equipmentPurchase/purchase');
                    $scope.loadCart();
                }).error(function(data, status, headers, config){
                    layer.msg('添加失败！',{icon : 2,time : 1000});
                });
            }
        };
    }]);
});