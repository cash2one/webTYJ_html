/**
 * Created by NM on 2018/1/18.
 * 产品初始化导航公共页面js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('productBannerCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        //$scope.temp = $rootScope.productId;
        var productid = '';//修改查询条件从localStorage中获取  王洲  2016.4.6
        productid = JSON.parse(localStorage.getItem("product_id"));

        $scope.product = {};
        if(sessionStorage.getItem('itemType')==null)
        {
            $scope.product.producttype = '0';
        }else
        {
            $scope.product.producttype = sessionStorage.getItem('itemType');
        }

        $scope.btnIndex = 1;
        /**
         * 高亮显示
         */

        $scope.doClick = function(item){
            $scope.btnIndex = item;
        };
        //设置下拉框只读
        $scope.selectOnly = function(){
            document.getElementById("productTypes").disabled = true;
        };

        //当修改时根据传入的id查询出对应的产品，根据类型跳转到对应页面并设置下拉框为只读
        $scope.getProduct = function(){
            if(angular.isDefined(productid)){
                if(productid != '') {
                    $http.post(url + '/Product/getProductByProductId/' + productid).success(function (data) {
                        console.log(data);
                        //调整用于设置下拉框显示值的方法  王洲  2016.4.6
                        $scope.ids = data.Product.productType.toString();
                        //点击修改即跳到此方法
                        $scope.selectOnly();
                        if($scope.ids == "0"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/buildLease");
                        }
                        if($scope.ids == "4"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/fixedParkingSpace");
                        }
                        if($scope.ids == "2"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/accessCard");
                        }
                        if($scope.ids == "3"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/decorationServices");
                        }
                        if($scope.ids == "1"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/parkingSpaces");
                        }
                        if($scope.ids == "5"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/AdvertisingLease");
                        }
                        if($scope.ids == "6"){
                            $scope.product.producttype = $scope.ids;
                            $location.path("/index/accountManagement/productAndProperty/product/productBanner/commonServices");
                        }
                        $("#productTypes").val($scope.ids);
                    }).error(function (data) {
                        layer.alert('没有查询到有效数据！',{icon : 2});
                    });
                }
            }
        };
        $scope.getProduct();

        //根据下拉框的值跳转到指定页面
        $scope.toPage = function(){
            $scope.products = $("#productTypes").val();
            if($scope.products == "0"){
                $scope.product.producttype = $scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/buildLease");
            }else if($scope.products == "4"){
                $scope.product.producttype = $scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/fixedParkingSpace");
            }
            if($scope.products == "2"){
                $scope.product.producttype = $scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/accessCard");
            }
            if($scope.products == "3"){
                $scope.product.producttype = $scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/decorationServices");
            }
            if($scope.products == "1"){
                $scope.product.producttype = $scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/parkingSpaces");
            }
            if($scope.products == "5"){
                $scope.product.producttype = $scope.products;
                var i=$scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/AdvertisingLease");
            }
            if($scope.products == "6"){
                $scope.product.producttype = $scope.products;
                var i=$scope.products;
                $location.path("/index/accountManagement/productAndProperty/product/productBanner/commonServices");
            }
            sessionStorage.setItem('itemType',$scope.products);
        };


    }]);

});
