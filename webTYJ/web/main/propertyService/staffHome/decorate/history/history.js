/**
 * Created by NM on 2018/1/18.
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historyDecorateCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.test="装修历史记录";
        $scope.PersonCusts={};

        $http.get(url + '/PersonCust/listAllPersonCustRestful').success(function(data) {
            console.log(data);
            $scope.PersonCust = data.PersonCust;
        });

    }]);
});