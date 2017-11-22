/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../../app');

    app.controller('checkVerificationCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.test="核查信息";
        $scope.Inspections={};
        $http.get(url + '/Inspection/AllInspection').success(function(data) {
            console.log(data);
            $scope.Inspection = data.Inspection;
            $scope.myitem = data.Inspection[0];
            console.log($scope.myitem);
        });


        $scope.test='新增现场核查事件';
        $scope.Verifications={};
        $scope.addVerification={};

        $http.get(url + '/Verification/listAllVerification').success(function(data) {
            console.log(data);
            $scope.Verification = data.Verification;
        });

        $scope.AddVerification=function(){
            console.log($scope.Verification);
            if($scope.Verification.id==0 || $scope.Verification.id==null)
            {

                $http.post(url + '/Verification/insertVerification',{Verification:$scope.addVerification}).success(function(data) {
                    $http.get(url + '/Verification/listAllVerification').success(function(data) {
                        alert("添加成功！");
                        $scope.searchPaginator._load();
                        console.log(data);
                        $scope.Verification = data.Verification;
                        $scope.searchPaginator._load();

                    });
                }).error(function(data, status, headers, config){
                    alert("添加失败");
                    alert("error"+status);
                }) ;
            }
        };

    }]);
});
