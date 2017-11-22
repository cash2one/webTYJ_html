/**
 * Created by NM on 2016/1/22.
 * 面积管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('areaManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(2);//增加tab高亮显示   王洲   2016.2.2

        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.areaType={page:{}};
        $scope.addArea={};
        $scope.addArea.areaTypeName='';
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        /**
         * 分页查询
         */
        var fetchFunction = function(page,callback) {
            $scope.areaType.page=page;
            $http.post(url + '/AreaTypeNew/listPageAreaTypeNewRestful',{AreaTypeNew:$scope.areaType}).success(callback);
        };
        $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);

        //初始化网格
        $scope.grid =false;
        //网格  朱琪 2016-2-3
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        /**
         * 添加面积
         */
        $scope.addInfo=function() {
            if($scope.addArea.areaTypeName == null||$scope.addArea.areaTypeName.replace(/\s+/g,"") == ""){
                layer.msg('面积名称不能为空！', {icon: 5});
            }else{
                $http.post(url+'/AreaTypeNew/insertAreaTypeNewRestful',{AreaTypeNew:$scope.addArea}).success(function(data){
                    if(data == -1){
                        layer.msg('面积名称重复，请重新输入！', {icon: 5});
                    }else{
                        layer.msg('添加成功！', {icon: 1});
                        $("#addAreaManagement").modal("hide");
                        $scope.addArea={};
                        $scope.addArea.areaTypeName = '';
                        $scope.searchPaginator._load();
                    }
                }).error(function(data, status, headers, config){
                    layer.msg('添加失败！', {icon: 2});
                });
            }
        };

        /**
         * 关闭
         */
        $scope.close=function(){
            $scope.addArea={};
        };

        /**
         * 返回
         */
        $scope.back = function()
        {
            $scope.doClick(1);
            $location.path('/index/baseManagement/projectManagement');
        };

    }]);
});
