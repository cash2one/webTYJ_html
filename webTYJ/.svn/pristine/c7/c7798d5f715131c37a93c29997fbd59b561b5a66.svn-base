/**
 * Created by Zms on 2016/7/12.
 */

'use strict';

define(function (require) {
    var app=require('../../../app');

    app.controller('subCompanyCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.searchSubCompany = {page:{}};
        //分页显示子公司信息
        var subCompanyFunction = function(page,callback){
            $scope.searchSubCompany.page = page;
            $http.post(url+"/SubCompany/listPageAllSubCompanys",{SubCompany:$scope.searchSubCompany}).success(callback);
        }
        $scope.currentSubCompany = app.get('Paginator').list(subCompanyFunction,6);

        $scope.showProject = function(data){
            //var _subCompanyId = data.subCompanyId;
            sessionStorage.setItem("_subCompanyId",data.subCompanyId);
            sessionStorage.setItem("_subCompanyName",data.subCompanyName);
            $location.path("/index/systemSettings/subCompany/subCompanyProject");
        }


    }]);
});