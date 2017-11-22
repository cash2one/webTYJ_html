/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('workProgressCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.test="核查信息";
        $scope.Inspections={};
// 		    var url = $rootScope.url;
// 			$http.get(url + '/Inspection/AllInspection').success(function(data) {
// 				console.log(data);
// 		        $scope.Inspection = data.Inspection;
// 		        $scope.myitem = data.Inspection[0];
// 	            console.log($scope.myitem);
// 			});
        //$scope.PersonCusts={};

        $http.get(url + '/Inspection/AllInspection').success(function(data) {
            console.log(data);
            $scope.Inspection = data.Inspection;
        });

    }]);
});
