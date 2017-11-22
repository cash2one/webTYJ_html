/**
 * Created by 倪明 on 2015/8/14.
 * 名称：计费方案js
 */

/**
 * Created by NM on 2018/1/18.
 * 计费方案js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('chargingSchemeCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.chargeItemNew={page:{},projectName:''};
        /**
         * 根据项目id查询项目收费
         */
        $scope.projectId = 1;
        $scope.load  = function(){
            /*
             $http.get(url+'/ChargeItemNew/listChargeItemNewbyProjectId/'+$scope.projectId).success(function(data){
             $scope.currentCheck = data.ChargeItemNew;
             console.log($scope.currentCheck);
             }).error(function(data, status, headers, config){
             alert("查询失败");
             });*/
            var parent = function(page,callback){
                $scope.chargeItemNew.page=page;
                $http.post(url+'/ChargeItemNew/listPageChargeItemNewbyProjectName',{ChargeItemNew:$scope.chargeItemNew}).success(callback);
            }
            $scope.chargeItemNewPaginator=app.get('Paginator').list(parent,5);
            console.log($scope.chargeItemNewPaginator);
        };

        $scope.load();

    }]);
});
