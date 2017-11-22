/**
 * Created by Administrator on 2015/4/17.
 *developer
 */

'use strict';

define(['treeApp'],function(module){
    module.controller("newContractCtrl",function($scope,$http,$rootScope){
    	var url=$rootScope.url;
    	$http.get(url+'/Propertycontract/getTree').success(function(data) {
	    	$scope.treedata = data.Tree;
	    });
    	
    	$http.get(url+'/Brand/listAllBrandRestful').success(function(data) {
	    	$scope.brands = data.Brand;
	    	$scope.brands.unshift({brandId:0,brandName:"请选择"});
	    });
    	
    	$http.get(url+'/Supplier/listAllSupplier').success(function(data) {
	    	$scope.suppliers = data.Supplier;
	    	$scope.suppliers.unshift({supplierId:0,supplierSimplename:"请选择"});
	    });

	    $scope.options=function(id)
	    {
	    	if (typeof(id) != "undefined") {
	    		$http.get(url+"/PropertyMaintenance/listPropertyMaintenanceByRoomIdRestful/"+id).success(function(data) {
	    	    	$scope.propertyMaintenances = data.PropertyMaintenance;
	    	    	$('#biaoqianye1').show();  //打开模态框
	    	    });
	    	};   
	    };
	    
	    $scope.details=function(object)
	    {
	    	$scope.propertyMaintenance=object;
	    	$('#biaoqianye2').show();  //打开模态框
	    };
	    
	    $scope.queryBargain=function()
	    {
	    	$http.get(url+"/Bargain/listBargainBysupplierId/"+$scope.supplier.supplierId).success(function(data) {
    	    	$scope.bargains = data.Bargain;
    	    	$('#biaoqianye3').show();  //打开模态框
    	    });
	    };
	    
	    $scope.select=function(bargain)
	    {
	    	$scope.bargain=bargain;
	    };
	   
	    $scope.submit=function()
	    {
	    	$scope.propertyMaintenance.pactId=$scope.bargain.pactId;
	    	$scope.propertyMaintenance.brandId=$scope.brand.brandId;
	    	$scope.propertyMaintenance.brandName=$scope.brand.brandName;
	    	$scope.propertyMaintenance.supplierId=$scope.supplier.supplierId;
	    	$scope.propertyMaintenance.supplierName=$scope.supplier.supplierName;
	    	$http.put(url+"/PropertyMaintenance/UpdatePropertyMaintenance",{PropertyMaintenance:$scope.propertyMaintenance}).success(function(data) {
    	    	alert("保存成功！");
    	    }).error(function(data, status, headers, config){
		        alert("保存失败！");
		    }) ;
	    };
    });
});
