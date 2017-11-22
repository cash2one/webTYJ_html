/**
 * Created by NM on 2018/1/18.
 * 专业线管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('professionalLineManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.specialtyInfos=[];
        $scope.specialtys={page:{}};
        $scope.projectId = JSON.parse(localStorage.getItem("project_id"));    //获取项目id

        $scope.doClick(10);
        $scope.itemIndex = 0; //初始化显示
        //专业线信息初始化
        $scope.load=function(){
            /* 删除分页显示改为列表 朱琪 2016-2-4 start */
            $scope.specialtyList = [];
            $http.get(url + '/SpecialtyInfoProject/listSpecialtyInfoProjectByProjectId/'+$scope.projectId).success(function(data){
                if (!angular.isArray(data.SpecialtyInfoProject)){
                    $scope.specialtyList.push(data.SpecialtyInfoProject);
                } else {
                    $scope.specialtyList = data.SpecialtyInfoProject;
                }

                if ($scope.specialtyList.length != 0){
                    $scope.details($scope.specialtyList[$scope.itemIndex]);
                }
                //layer.msg('SEARCH successfully!',{icon:1,time:2000});
            }).error(function(){
            });
        };
        $scope.load();
        /* 删除分页显示改为列表 朱琪 2016-2-4 end */
        //修改状态保存

        var companyId=null;
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        //取消
        $scope.cancle=function(){
            $scope.btnIndexs='';
            $scope.load();
            $scope.datas={};
        };

        //查看描述
        $scope.datas={};
        $scope.details=function(data){
            $scope.btnIndexs=data.specialtyId;
            $scope.datas=data;
        };

        $scope.chazhao=function(item){
            var index = -1;
            angular.forEach($scope.specialtyList,function(items,key)
            {
                if(items.specialtyId == item.specialtyId)
                {
                    index=key;
                }
            });
            if(index!=-1)
            {
                $scope.itemIndex = index;
            }
            console.log('专业线名：'+item.specialtyName);
            $http.get(url+'/SpecialtyInfoProject/listSpecialtyInfoProjectByCompanyId/'+companyId+"/"+item.specialtyId).success(function(data){
                if(data.SpecialtyInfo!=undefined&&data.SpecialtyInfo.length>0){
                    if(item.state=='0'){
                        layer.confirm('该模块下已有编制,是否关闭此模块？',{
                            btn : ['是','否']
                        },function(){
                            $scope.insert(item);
                        },function(){
                            $scope.cancle();
                        })
                    }else {
                        $scope.insert(item);
                    }
                }else{

                   // if(item.state=='0'){
                            $scope.insert(item);
                    //}else{
                    //        $scope.insert();
                    //}
                }
                //event.stopPropagation();
            }) ;
         };

        $scope.insert=function(item){
            //for(var i=0;i<$scope.specialtyList.length;i++)
            //{
            //    $scope.specialtyList[i].state = $scope.specialtyList[i].state;
            //}
            //var specialtyInfoResult={specialtyInfos:$scope.specialtyList};
            $http.put(url+'/SpecialtyInfoProject/updateListSpecialtyInfoProject',{SpecialtyInfoProject:item}).success(function(){
                layer.msg('操作成功',{icon : 1,time : 2000});
                $scope.cancle();
            }).error(function(data, status, headers, config){
                layer.msg('操作失败',{icon : 3,time : 2000});
                $scope.cancle();
            }) ;
        };


        $scope.initProfessionalLine = function () {
            $http.post(url+'/SpecialtyInfoProject/initExistedProjectProfessionalLine').success(function () {
                layer.msg('插入成功！',{icon:1,time:2000});
            }).error(function () {
                layer.msg('插入失败！',{icon:2,time:2000});
            });
        }
    }]);
});