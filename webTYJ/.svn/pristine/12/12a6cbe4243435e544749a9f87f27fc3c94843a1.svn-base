/**
 * Created by NM on 2018/1/18.
 * 岗位设置js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('postsSettingsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;  //全局访问路径
        $scope.specialtyInfo=[];
        $scope.post={};
        $scope.posts= [];
        //查询所选专业线的岗位信息
        $scope.load=function(){
            $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoAndPostRestful',{SpecialtyInfo:$scope.SpecialtyInfo})
                .success(function(data) {
                    for(var i=0;i<data.SpecialtyInfo.length;i++){
                        if(app.get('tyjUtil').isArray(data.SpecialtyInfo[i].posts)==false){
                            var obj=data.SpecialtyInfo[i].posts;
                            data.SpecialtyInfo[i].posts=[obj];
                        }
                    }

                    $scope.specialtyInfo=data.SpecialtyInfo;
                    //console.log($scope.specialtyInfo);

                }).error(
                function(data, status, headers, config) {
                    layer.msg('获取信息失败',{icon : 3,time : 2000});
                });
        }
        $scope.load();


        //$scope.fuzhi=function(){
        //    for(var j in $scope.specialtyInfo){
        //        for(var i in $scope.specialtyInfo[j].posts){
        //            console.log(document.getElementById($scope.specialtyInfo[j].posts[i].postId));
        //            var postIdinput = document.getElementById($scope.specialtyInfo[j].posts[i].postId);
        //            if($scope.specialtyInfo[j].posts[i].state== '1' && postIdinput != null){
        //                document.getElementById($scope.specialtyInfo[j].posts[i].postId).checked =true;
        //            }else if($scope.specialtyInfo[j].posts[i].state== '0' && postIdinput != null){
        //                document.getElementById($scope.specialtyInfo[j].posts[i].postId).checked =false;
        //            }
        //
        //        }
        //    }
        //}

        //$scope.fuzhi();
        //将修改的信息保存
        $scope.update=function(item){
                $scope.post.state=item.state;
                $scope.post.postId=item.postId;
                $http.put(url + '/Post/updatePost',{Post: $scope.post}).success(function () {
                    if(item.state=='1'){
                        layer.msg('开启岗位成功', {icon: 1, time: 2000});
                    }else{
                        layer.msg('关闭岗位成功', {icon: 1, time: 2000});
                    }
                    $scope.load();
                }).error(function (data, status, headers, config) {
                    if(item.state=='1'){
                        layer.msg('开启岗位失败', {icon: 3, time: 2000});
                    }else{
                        layer.msg('关闭岗位失败', {icon: 3, time: 2000});
                    }

                });
        };

        //取消
        $scope.cancle=function(){
            $scope.load();
        }


        $scope.chose=function(id){
          if(id!=null||id!=""){
              layer.msg('此岗位无法更改',{icon : 3,time : 2000});
               var t=document.getElementById(id);
               t.checked="true";
          }
        }

    }]);

});

