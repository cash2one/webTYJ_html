/**
 * Created by NM on 2018/1/18.
 * 账单js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('recordsCtrl', ['$scope', '$http','$rootScope','$location','$filter', function ($scope,$http,$rootScope,$location,$filter) {

        var url = $rootScope.url;
        //项目
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        //项目ID
        var projectId =  $scope.project.projectId;

        /**
         * maogaofei 20160713
         * 判断日期格式
         */
        $scope.isTimerRightBilling=function(item){
            var result = {state: '', info: ''};
            if (angular.isDefined(item) && item != '' && item != null) {
                item = $filter('date')(item, 'yyyy-MM-dd');
                var reg1 = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/;
                if (!reg1.test(item)) {
                    result.state = false;
                    result.info = '输入的时间格式不正确！';

                } else {
                    result.state = true;
                    result.info = '输入时间正确！';
                }
            } else {
                result.state = true;
                result.info = '可以为空！';
            }
            return result;
        }

        /**
         * 根据条件分页查询
         */
        $scope.billingRecord={page:{}};
        var fetchFunction=function(page,callback){
            var minDate=$filter('date')($scope.billingRecord.billingStartTime,'yyyy-MM-dd');
            var maxDate=$filter('date')($scope.billingRecord.billingEndTime,'yyyy-MM-dd');
            var minStaTime = $scope.isTimerRightBilling(minDate);
            var maxStaTime = $scope.isTimerRightBilling(maxDate);
            if(minStaTime.state == false){
                layer.msg(minStaTime.info,{icon:0,time:1000});
                return;
            }
            if(maxStaTime.state == false){
                layer.msg(maxStaTime.info,{icon:0,time:1000});
                return;
            }
            if(Date.parse($scope.billingRecord.billingStartTime)>Date.parse($scope.billingRecord.billingEndTime)){
                layer.msg('开始时间不能大于结束时间',{icon:0,time:1000});
                return;
            }
            $scope.billingRecord.page=page;
            $scope.billingRecord.projectId=projectId;
            $http.post(
                url + '/BillingRecord/listPageBillingRecord', {BillingRecord:$scope.billingRecord}).success(callback);
        };
        $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);
    }]);
});