/**
 * Created by NM on 2018/1/18.
 * 岗位权限分配js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('postsJurisdictionCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        /**
         * 查询专业线和岗位
         */
        $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoAndPostOpen').success(function(data) {
            for(var i=0;i<data.SpecialtyInfo.length;i++){
                if(app.get('tyjUtil').isArray(data.SpecialtyInfo[i].posts)==false){
                    var obj=data.SpecialtyInfo[i].posts;
                    data.SpecialtyInfo[i].posts=[obj];
                }
            }
            $scope.specialtyInfo=data.SpecialtyInfo;
        }).error(function(data, status, headers, config){
            layer.msg('获取信息失败',{icon : 3,time : 2000});
        });

        /***定义表头****************/
        $scope.list={
            type: [
                { id: '1',name:'企业信息' },
                { id: '2',name:'客户服务' },
                { id: '3',name:'系统设置' },
                { id: '4',name:'人事管理' },
                { id: '5',name:'基础管理' },
                { id: '6',name:'业务管理' }
            ]
        };

        /**查看权限*******/
        $scope.datas={};
        $scope.btnIndex='';
        $scope.toDatils=function(id){
            $scope.btnIndex=id;
            $http.get(url + '/PostAuthority/selectActionPermissions/'+id).success(function(data){
                $scope.datas= data.PostAuthority;
                for(var i=0;i< data.PostAuthority.length;i++){
                    if(angular.isArray( data.PostAuthority[i].actions)){
                    }else{
                        $scope.lists = [];
                        $scope.lists.push(data.PostAuthority[i].actions);
                        data.PostAuthority[i].actions= $scope.lists;
                        $scope.datas= data.PostAuthority;
                    }
                }
                //console.log($scope.datas);

            }).error(function(data, status, headers, config) {
                layer.msg('获取信息失败',{icon : 3,time : 2000});
            });
        };
    }]);

});