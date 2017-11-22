/**
 * Created by Administrator on 2015/4/17.
 *developer
 */

'use strict';

define(['tyjApp','pageServices'],function(module){
    module.controller("contractInquiryCtrl",function($scope,$http,Paginator,$rootScope){
    	var url=$rootScope.url;
    	$scope.Propertycontract={page:{}};
    	var fetchFunction = function(page,callback) {
    		$scope.Propertycontract.page=page;
            $http.post(url + '/Propertycontract/listPagePropertycontract',{Propertycontract:$scope.Propertycontract}).success(callback);
        };
        $scope.searchPaginator=Paginator(fetchFunction,8);
    });
});