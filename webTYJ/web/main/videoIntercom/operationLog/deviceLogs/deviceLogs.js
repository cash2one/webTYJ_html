/**
 * Created by Hardy on 2016/1/30.
 * 名称：设备日志管理
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('deviceLogsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        //获取可视对讲服务资源URL
        var videoUrl = $scope.videoUrl;
        var videosUrl = $scope.videosUrl;

        //从cook中获取用户信息
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCook?userCook:user;
        //从用户信息中获取公司id
        var  companyId= $scope.user.companyId;
        //硬件设备日志对象
        $scope.gateUplog = {page:{},
                             companyId:companyId,
                             projectId:'',
                             equipmentcount:'',
                             openstyle:'',
                             startTime:'',
                             endTime:''};

        //获取硬件设备日志列表
        //加载数据
        $scope.load = function () {
            var fetchFunction = function (page, callback) {
                $scope.gateUplog.page = page;
                $http.post(videoUrl + '/GateUplog/listPagelistSearchGateUplog', {GateUplog:$scope.gateUplog}).success(callback);
            };
            $scope.currentGateUplog=app.get('Paginator').list(fetchFunction,5);
        };
        //加载
        $scope.load();

        /**
         * 导出开门日志
         */
        $scope.exportGateUplog = function(){
            window.location.href=videosUrl +"/export/exportGateUplog.do?equipmentcount="+encodeURI(encodeURI($scope.gateUplog.equipmentcount))
            +"&openstyle="+encodeURI(encodeURI($scope.gateUplog.openstyle))+"&companyId="+$scope.gateUplog.companyId+"&projectId="+$scope.gateUplog.projectId
            +"&startTime="+$scope.gateUplog.startTime+"&endTime="+$scope.gateUplog.endTime;
        };

    }]);
});