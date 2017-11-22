/**
 * Created by wuying on 16/5/4.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('purchaseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.saasUrl;

        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        $scope.companyId = $scope.user.companyId;

        $scope.EqProductList=[];
        $scope.searchData = '';
        $scope.load=function(){
            $http({
                method:"post",
                url: url + '/eqProduct/eqProduct_pageList',
                params:{
                    "queryStr":removeTrim($scope.searchData)
                }
            }).success(function (data) {
                if(data.state=="success"){
                    $scope.temp = data.info;
                    console.log($scope.temp);
                    if(!angular.isArray($scope.temp)){
                        $scope.EqProductList.push($scope.temp);
                    }else{
                        $scope.EqProductList = $scope.temp;
                    }
                    for(var i=0; i<$scope.EqProductList.length; i++){
                        $scope.EqProductList[i].count=1;
                    }
                    $scope.loadPages($scope.EqProductList);
                } else if(data.state == "failure"){
                    $scope.EqProductList=[];
                    $scope.loadPages([]);
                }
            }).error(function (data, status, headers, config) {

            });
        };
        $scope.load();

        /**
         * 去除两边空格
         */
        function removeTrim(attr)
        {
            if(attr!=undefined)
            {
                return attr.replace(/(^\s*)|(\s*$)/g,'');
            }
        }



        $scope.eqName= '';
        $scope.orderDetailsList=[];
        $scope.loadOrder=function(){
            $http({
                method:"post",
                url: url + '/eqOrder/list/',
                params:{
                    "companyId":$scope.companyId,
                    "queryStr":removeTrim($scope.eqName)
                }
            }).success(function (data) {
                if(data.state=="success"){
                    $scope.currentPage1 = 1;
                    $scope.temp = data.info;
                    if(!angular.isArray($scope.temp)){
                        $scope.orderDetailsList.push($scope.temp);
                    }else{
                        $scope.orderDetailsList = $scope.temp;
                    }
                    if($scope.eqName != null && $scope.eqName != ''){
                        var temp = [];
                        for(var i=0; i<$scope.orderDetailsList.length; i++){
                            if($scope.orderDetailsList[i].eqName.indexOf($scope.eqName)>=0){
                                temp.push($scope.orderDetailsList[i]);
                            }
                        }
                        $scope.orderDetailsList = temp;
                    }
                    $scope.loadPages1($scope.orderDetailsList);
                } else if(data.state == "failure"){
                    $scope.orderDetailsList=[];
                    $scope.loadPages1([]);
                }
            }).error(function (data, status, headers, config) {

            });
        };
        $scope.loadOrder();


        $scope.subCount = function (item) {
            if(typeof item.count=='string'){
                item.count = +item.count;
            }
            if(item.count > 1){
                item.count = item.count - 1;
            }
        };

        $scope.addCount = function (item) {
            if(typeof item.count=='string'){
                item.count = +item.count;
            }
            item.count = item.count + 1;
        };


        //if(sessionStorage.getItem("cart") != null){
        //    $scope.cartList = JSON.parse(sessionStorage.getItem("cart"));
        //} else {
        //    $scope.cartList = [];
        //}
        //
        //$scope.addCart = function (item) {
        //    var b = true;
        //    if($scope.cartList.length > 0){
        //        for(var i = 0; i < $scope.cartList.length; i++){
        //            if($scope.cartList[i].id == item.id){
        //                $scope.cartList[i].count = $scope.cartList[i].count + item.count;
        //                b = false;
        //                break;
        //            }
        //        }
        //        if(b){
        //            $scope.cartList.push(angular.copy(item));
        //        }
        //    }else {
        //        $scope.cartList.push(angular.copy(item));
        //    }
        //    console.dir($scope.cartList);
        //    sessionStorage.setItem("cart",JSON.stringify($scope.cartList));
        //};

        $scope.addCart = function (item) {
            if(item.state==0){
                layer.msg('此商品已下架，不能购买!',{icon:0,time:2000});
                return
            }
            if(item.count<=0){
                layer.msg('购买数量不能小于1!',{icon:0,time:2000});
                return
            }
            $http.get(url + '/eqCart/add/' + $scope.companyId + '/' + item.id + '/' +item.count ).success(function (data) {
                layer.msg("添加成功", {icon: 1, time: 2000});
            }).error(function (data) {
                layer.msg("添加失败", {icon: 2, time: 2000});
            });
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

        //得到选中的复选框的值(删除时使用)
        /*$scope.deleteData = {datas: []};
        $scope.getDeleteData = function (data) {
            setTimeout(function(){
                var id = data.id;
                var temp = document.getElementById(id);
                var dataa = {};
                dataa = data;
                if (temp.checked == true) {
                    $scope.deleteData.datas.push(dataa);
                } else {
                    $scope.temp = [];
                    $scope.temp = $scope.deleteData.datas;
                    $scope.deleteData = {datas: []};
                    for (var i = 0; i < $scope.temp.length; i++) {
                        if ($scope.temp[i].id != id) {
                            $scope.deleteData.datas.push($scope.temp[i]);
                        }
                    }
                }
                //console.dir($scope.deleteData.datas);
            },"10");
        };*/



        //单选

        $scope.getChecked = function(id){
            var ids = document.getElementById(id);
            var num = 0;
            if(ids.checked==true){
                ids.checked = true;
            }else{
                ids.checked = false;
            }
            for(var i=0;i<$scope.currentOrder.length;i++){
                if(document.getElementById($scope.currentOrder[i].id).checked==true){
                    num++;
                }
            }
            if(num==$scope.currentOrder.length){
                document.getElementById('chooseed').checked = true;
                $scope.allChoose();
            }else{
                document.getElementById('chooseed').checked = false;
            }
        };

        $scope.unsubscribe = function () {
            $scope.chooseDataId = '';
            var data = '';
            angular.forEach($scope.currentOrder,function(item,key){
                if(document.getElementById(item.id).checked==true)
                {
                    $scope.chooseDataId += item.orderId + ',';
                }
            });
            var dataIndex = $scope.chooseDataId.lastIndexOf(',');
            data = $scope.chooseDataId.substring(0,dataIndex);

            if(data==''){
                layer.msg('请选择数据！',{icon:0,time:2000});
                return
            }
            layer.confirm("您确定要退订吗？", {btn: ['是', '否']}, function () {
                $http.get(url + '/eqOrder/unsubscribe/' + data ).success(function (data) {
                    $scope.loadOrder();
                    document.getElementById('chooseed').checked = false;
                    layer.msg('退订成功！',{icon:1,time:2000});
                }).error(function (data, status, headers, config) {
                    layer.msg('退订失败！',{icon:0,time:2000});
                });
            });
        };

        /****************************   分页start   ******************************/

        $scope.currentPage = 1;             //分页相关参数
        $scope.totalPage = 1;
        $scope.pageSize = 4;
        $scope.pages = [];
        $scope.endPage = 1;

        /**
         * 实现分页
         */
        $scope.listPages=function(currentPage,pageSize,array){
            var dataArray=[];
            if(currentPage*pageSize>array.length){
                for(var i=(currentPage-1)*pageSize;i<array.length;i++) {
                    dataArray.push(array[i]);
                }
            }else{
                for(var i=(currentPage-1)*pageSize;i<currentPage*pageSize;i++){
                    dataArray.push(array[i]);
                }
            }
            return dataArray;
        };

        /**
         * 实现分页及参数改变
         */
        $scope.currentHouse = [];
        $scope.loadPages = function (array) {
            //for(var i=0;i<$scope.checked.length;i++){
            //    $scope.checked[i]=false;
            //}

            $scope.currentHouse = $scope.listPages($scope.currentPage,$scope.pageSize,array);
            $scope.totalPage = Math.ceil(array.length / $scope.pageSize);
            $scope.endPage = $scope.totalPage;

            //生成数字链接
            $scope.pages = [];
            if($scope.totalPage<=5){
                for(var i=1; i<=$scope.totalPage; i++){
                    $scope.pages.push(i);
                }
            } else {
                $scope.pages = [
                    $scope.currentPage-1,
                    $scope.currentPage,
                    $scope.currentPage+1,
                    $scope.currentPage+2,
                    $scope.currentPage+3
                ];
                if($scope.pages[0]<1){
                    $scope.pages = [
                        1,2,3,4,5
                    ];
                }
                if($scope.pages[$scope.pages.length-1] > $scope.totalPage){
                    $scope.pages = [
                        $scope.totalPage-4,
                        $scope.totalPage-3,
                        $scope.totalPage-2,
                        $scope.totalPage-1,
                        $scope.totalPage
                    ];
                }
            }
        };

        /**
         *查询下一页
         */
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }
            $scope.loadPages($scope.EqProductList);
        };

        /**
         *  查询前一页
         */
        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
            }
            $scope.loadPages($scope.EqProductList);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.loadPages($scope.EqProductList);
        };

        //购物车跳转
        $scope.cartGo = function()
        {
            $location.path('/index/videoIntercom/equipmentPurchase/shopCart');
            $scope.doClick(2);
        };


        /****************************   分页end   ******************************/

        /****************************   分页start   ******************************/

        $scope.currentPage1 = 1;             //分页相关参数
        $scope.totalPage1 = 1;
        $scope.pagesize1 = 6;
        $scope.pages1 = [];
        $scope.endPage1 = 1;


        /**
         * 实现分页
         */
        $scope.listPages1=function(currentPage1,pagesize1,array){
            var dataArray=[];
            if(currentPage1*pagesize1>array.length){
                for(var i=(currentPage1-1)*pagesize1;i<array.length;i++) {
                    dataArray.push(array[i]);
                }
            }else{
                for(var i=(currentPage1-1)*pagesize1;i<currentPage1*pagesize1;i++){
                    dataArray.push(array[i]);
                }
            }
            return dataArray;
        };

        /**
         * 实现分页及参数改变
         */
        $scope.currentOrder = [];
        $scope.loadPages1 = function (array) {
            //for(var i=0;i<$scope.checked.length;i++){
            //    $scope.checked[i]=false;
            //}
            $scope.currentOrder = $scope.listPages1($scope.currentPage1,$scope.pagesize1,array);
            console.log($scope.currentOrder);
            $scope.totalPage1 = Math.ceil(array.length / $scope.pagesize1);
            $scope.endPage1 = $scope.totalPage1;
            document.getElementById('chooseed').checked = false;
            //生成数字链接
            $scope.pages1 = [];
            if($scope.totalPage1<=6){
                for(var i=1; i<=$scope.totalPage1; i++){
                    $scope.pages1.push(i);
                }
            } else {
                $scope.pages1 = [
                    $scope.currentPage1-1,
                    $scope.currentPage1,
                    $scope.currentPage1+1,
                    $scope.currentPage1+2,
                    $scope.currentPage1+3
                ];
                if($scope.pages1[0]<1){
                    $scope.pages1 = [
                        1,2,3,4,5
                    ];
                }
                if($scope.pages1[$scope.pages1.length-1] > $scope.totalPage1){
                    $scope.pages1 = [
                        $scope.totalPage1-4,
                        $scope.totalPage1-3,
                        $scope.totalPage1-2,
                        $scope.totalPage1-1,
                        $scope.totalPage1
                    ];
                }
            }
        };

        /**
         *查询下一页
         */
        $scope.next1 = function () {
            if ($scope.currentPage1 < $scope.totalPage1) {
                $scope.currentPage1++;
            }
            $scope.loadPages1($scope.orderDetailsList);
        };

        /**
         *  查询前一页
         */
        $scope.prev1 = function () {
            if ($scope.currentPage1 > 1) {
                $scope.currentPage1--;
            }
            $scope.loadPages1($scope.orderDetailsList);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage1 = function (page) {
            $scope.currentPage1 = page;
            $scope.loadPages1($scope.orderDetailsList);
        };

        /****************************   分页end   ******************************/


    }]);
});