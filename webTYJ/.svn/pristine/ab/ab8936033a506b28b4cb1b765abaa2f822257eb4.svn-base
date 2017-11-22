/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('acceptanceCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;

        $scope.test="验收信息的显示";
        $scope.personCusts={};
        $http.get(url + '/PersonCust/listAllPersonCustRestful').success(function(data) {
            console.log(data);

            $scope.PersonCust = data.PersonCust;
            $scope.item = data.PersonCust[0];
            console.log($scope.item);
        });

    }]);
});