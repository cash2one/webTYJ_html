/**
 * Created by NM on 2018/1/18.
 * 装修服务
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('decorationServicesCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;                               //定义路径
        //$scope.productId = $rootScope.productId;              //获取传入的产品id
        $scope.Product = {};                                    //定义一个product对象
        $scope.ServiceProject = {onsiteVerification : 1};       //定义一个装修服务对象
        $scope.ServiceProjectList = [];                         //定义一个装修服务对象集合
        $scope.editIndex = null;                                //新增行序列号
        $scope.editItem = false;                                //新增ServiceProject行
        var productid = '';//
        productid = JSON.parse(localStorage.getItem("product_id"));

        //如果传入的产品id不为空，根据id查询对象
        if(productid != ''){
            $http.post(url + '/Product/getProductByProductId/' + productid).success(function(data) {
                $scope.Product = data.Product;
                if(angular.isDefined($scope.Product)) {
                    $scope.Product.effectDate = new Date($scope.Product.effectDate);

                    //判断装修服务表数据是对象还是数组
                    if (angular.isObject($scope.Product.serviceprojectlist)) {
                        $scope.ServiceProject = $scope.Product.serviceprojectlist;
                        $scope.ServiceProjectList.push($scope.ServiceProject);
                    }
                    if (angular.isArray($scope.Product.serviceprojectlist)) {

                        $scope.ServiceProjectList = $scope.Product.serviceprojectlist;
                    }
                }
            }).error(function(data){
                layer.alert('没有对应的产品信息！',{icon : 2});
            });
        }


        //显示新增行
        $scope.addItem = function(){
            if($scope.editItem){
                layer.msg('请先保存服务项目！',{icon : 0,time : 1000});
                return;
            }
            $scope.editItem= true;
            $scope.editIndex = null;
            $scope.ServiceProject = {onsiteVerification : 1};
        };
        //隐藏新增行
        $scope.addCance = function(){
            $scope.editItem = false;
        };
        //修改新增行
        $scope.updateItem = function(index){
            //增加判断，修改前判断是否有装修项目在保存  王洲  2016.04.20
            if($scope.editItem){
                layer.msg('请先保存服务项目！',{icon : 0,time : 1000});
                return;
            }
            $scope.editItem =true;
            $scope.editIndex = index;
            var current=$scope.ServiceProjectList[index];
            $scope.ServiceProject = {
                serviceProjectName:current.serviceProjectName,
                unitPrice:current.unitPrice,
                unit:current.unit,
                onsiteVerification:current.onsiteVerification

            };
        };
        //删除新增行
        $scope.deleteItem = function(index){
            //删除前增加是否有待保存数据的判断  王洲  2016.04.20
            if($scope.editItem){
                layer.msg('请先保存服务项目！',{icon : 0,time : 1000});
                return;
            }
            //增加删除前的验证  王洲  2016.04.20
            layer.confirm('是否删除此服务项目？',{
                btn : ['确定','取消']
            },function(){
                $scope.ServiceProjectList.splice(index,1);
                layer.msg('删除成功！',{icon : 1,time : 1000});
                $scope.$apply($scope.ServiceProjectList);
            },function(){
                //取消删除操作
            });
        };

        //将新增行的数据保存到集合中
        /**
         * 增加保存时的验证判断  王洲  2015.12.28
         */
        $scope.addSave = function(){
            var sName = app.get('valueCheck').isNull($scope.ServiceProject.serviceProjectName);
            if(!sName.state){
                layer.msg('服务项目名称' + sName.info, {icon : 0,time : 1000});
                return;
            }
            var uPrice = app.get('valueCheck').isNumberAndNotNull($scope.ServiceProject.unitPrice);
            if(!uPrice.state){
                layer.msg('单价' + uPrice.info, {icon : 0,time : 1000});
                return;
            }
            var uUnit = app.get('valueCheck').isNull($scope.ServiceProject.unit);
            if(!uUnit.state){
                layer.msg('单位' + uUnit.info, {icon : 0,time : 1000});
                return;
            }
            if($scope.ServiceProject.onsiteVerification != '0'){
                $scope.ServiceProject.onsiteVerification = '1';
            }
            if($scope.editIndex!=null){
                $scope.ServiceProjectList[$scope.editIndex]={
                    serviceProjectName:$scope.ServiceProject.serviceProjectName,
                    unitPrice:$scope.ServiceProject.unitPrice,
                    unit:$scope.ServiceProject.unit,
                    onsiteVerification:$scope.ServiceProject.onsiteVerification
                };
            }
            else {
                $scope.ServiceProjectList.push($scope.ServiceProject);
            }
            $scope.editItem = false;
            $scope.ServiceProject = {onsiteVerification : 1};
        };
        /**
         * 新增装修服务
         *
         * 增加提交时的验证判断   王洲   2015.12.28
         */
        $scope.addProduct = function (){
            if(angular.isUndefined($scope.Product)){
                layer.msg('不能提交空装修服务产品！',{icon : 0,time : 1000});
                return;
            }
            var pName = app.get('valueCheck').isNull($scope.Product.productName);
            if(!pName.state){
                layer.msg('产品名称' + pName.info,{icon : 0,time : 1000});
                return;
            }
            $scope.checkName();
            var pNum = app.get('valueCheck').isNull($scope.Product.productNum);
            if(!pNum.state){
                layer.msg('产品编号' + pNum.info,{icon : 0,time : 1000});
                return;
            }
          /*  var pEffect = app.get('valueCheck').isNull($scope.Product.effectDate);
            if(!pEffect.state){
                layer.msg('生效日期' + pEffect.info,{icon : 0,time : 1000});
                return;
            }*/
            var pEffect = app.get('valueCheck').isNull($scope.DecorationServices.productBeginDate);
            if(!pEffect.state){
                layer.msg('请选择启用时间',{icon : 0,time : 1000});
                return;
            }
            var bdate=$scope.DecorationServices.productBeginDate;
            var edate=$scope.DecorationServices.productEndDate;
            var nowdate=new Date();
            var strb= new Array();
            strb=bdate.split("-");
            var y=nowdate.getFullYear();//年份
            if(strb[0]<y)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            var m=nowdate.getMonth()+1;   //月份
            if(strb[0]<=y&&strb[1]<m)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            var d=nowdate.getDate();    //日
            if(strb[0]<=y&&strb[1]<=m&&strb[2]<d)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            if(bdate>edate)
            {
                layer.alert("请注意启用时间与失效时间的顺序！",{icon:1,time:2000});
                return;
            }
            var pPrice = app.get('valueCheck').isNumberAndNotNull($scope.Product.price);
            if(!pPrice.state){
                layer.msg('产品金额' + pPrice.info,{icon : 0,time : 1000});
                return;
            }
            if($scope.editItem){
                layer.msg('请先保存服务项目！',{icon : 0,time : 1000});
                return;
            }
            $scope.Product.productType = 3;
            $scope.Product.serviceprojectlist = $scope.ServiceProjectList;
            if($scope.Product.serviceprojectlist.length == 0){
                layer.msg('服务项目不能为空！', {icon : 0,time : 1000});
                return;
            }
            if(angular.isUndefined($scope.Product.productId) || $scope.Product.productId == null){
                $http.post(url + '/Product/addProduct',{Product : $scope.Product}).success(function(){
                    layer.msg('新增成功！',{icon : 1,time : 1000});
                    $location.path("/index/accountManagement/productAndProperty/product");
                }).error(function(){
                    layer.msg('新增失败！',{icon : 2,time : 1000});
                });
            }else{
                $http.post(url + '/Product/updateProduct',{Product : $scope.Product}).success(function(){
                    layer.msg('修改成功！',{icon : 1,time : 1000});
                    $location.path("/index/accountManagement/productAndProperty/product");
                }).error(function(){
                    layer.msg('修改失败！',{icon : 2,time : 1000});
                });
            }
        };


        //新增取消
        $scope.cancle=function(){
            $location.path("/index/accountManagement/productAndProperty/product");
        };

        /**
         * 判断产品名称是否重复
         * 王洲
         * 2016.04.22
         */
        $scope.checkNames = false;
        $scope.checkName = function(){
            if(app.get('valueCheck').isNull($scope.Product.productName).state){
                $scope.check = {productId : '',productName : ''};
                $scope.check.productId = productid;
                $scope.check.productName = $scope.Product.productName;
                $http.post(url + '/Product/checkProductName',{Product : $scope.check}).success(function(data){
                    $scope.checkNames = data.Info.state;
                    if(!$scope.checkNames){
                        layer.msg('此产品名称已存在，请重试！',{icon : 0,time : 1000});
                    }
                }).error(function(data){
                    layer.msg('数据查询异常，请重试！',{icon : 0,time : 1000});
                });
            }
        };

    }]);
});
