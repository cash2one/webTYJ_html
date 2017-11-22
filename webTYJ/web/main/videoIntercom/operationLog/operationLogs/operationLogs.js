/**
 * Created by Hardy on 2016/2/2.
 * 名称：系统操作日志
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('operationLogsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        //获取可视对讲服务资源URL
        var videoUrl = $scope.videoUrl;
        var videosUrl = $scope.videosUrl;

        //从cook中获取用户信息
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCook?userCook:user;
        //从用户信息中获取公司id
        var  companyId= $scope.user.companyId;
        //硬件设备日志对象
        $scope.operationLog = {page:{},
            companyId:companyId,
            projectId:'',
            operationUser:'',
            operationDesc:'',
            startTime:'',
            endTime:''};

        //获取硬件设备日志列表
        //加载数据
        $scope.load = function () {
            var fetchFunction = function (page, callback) {
                $scope.operationLog.page = page;
                $http.post(videoUrl + '/operationLog/listPageSearchOperationLog', {OperationLog:$scope.operationLog}).success(callback);
            };
            $scope.currentOperationLog=app.get('Paginator').list(fetchFunction,5);
        };
        //加载
        $scope.load();

        /**
         * 导出开门日志
         */
        $scope.exportOperationLog = function(){
            window.location.href=videosUrl +"/export/exportOperationLog.do?operationUser="+encodeURI(encodeURI($scope.operationLog.operationUser))
            +"&operationDesc="+encodeURI(encodeURI($scope.operationLog.operationDesc))+"&companyId="+$scope.operationLog.companyId+"&projectId="+$scope.operationLog.projectId
            +"&startTime="+$scope.operationLog.startTime+"&endTime="+$scope.operationLog.endTime;
        };

    }]);
});
