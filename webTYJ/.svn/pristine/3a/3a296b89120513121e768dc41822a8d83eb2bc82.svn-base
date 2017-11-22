/**
 * Created by Administrator on 2016/8/10.
 */
'use strict';

define(function (require) {
    var app=require('../../../../app');

    app.controller('subCompanyProjectCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var subCompanyId = sessionStorage.getItem("_subCompanyId");
        var subCompanyName = sessionStorage.getItem("_subCompanyName");
        $scope.subCompanyName = subCompanyName;
        $scope.searchSubCompanyProject = {page:{}};

        //分页显示子公司项目
        var subCompanyProjectFunction = function(page,callback){
            $scope.searchSubCompanyProject.page = page;
            $scope.searchSubCompanyProject.subCompanyId=subCompanyId;
            $http.post(url+"/Project/listPageAllsubCompanyProject",{SubCompany:$scope.searchSubCompanyProject}).success(callback);
        }
        $scope.currentSubCompanyProject = app.get('Paginator').list(subCompanyProjectFunction,6);

        //
        $scope.gotoWorkflow = function(data){
            //var _subCompanyId = data.subCompanyId;
            sessionStorage.setItem("_projectId",data.projectId);
            sessionStorage.setItem("_projectName",data.projectName);

            $location.path("/index/systemSettings/workflow");
        }

    }]);
});