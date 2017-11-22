/**
 * Created by 彭婷婷 on 2015/7/23.
 * 页面名称:核心岗位任命
 * 修改人：倪明   修改时间:2015/8/25
 */
'use strict';
define(function (require) {
    var app = require('../../../app');

   app.controller("corePostCtrl",['$scope', '$http','$rootScope',
       function ($scope,$http,$rootScope) {
        var url = $rootScope.url;
        $scope.doClick(2);
        $scope.core={staffId:'',postId:'',state:''};
           var companyId=null;
           var user = {};                                             //设置默认用户信息为空
           var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
           $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
           companyId= $scope.user.companyId;
        //查询所有员工列表
        $scope.Staff={page:{}};
        $scope.CorePosition={page:{}};
        $scope.corePositions={};//核心岗位信息
        $scope.allData = [];
        var m =0;var unId;
        $scope.btnIndex1 =[];
        //查询所有的核心岗位信息
        $scope.load=function(){
            $http.get(url + '/Post/listPostbyState').success(function(data) {
                $scope.post = data.Post;
                console.log($scope.post);
                $http.post(url + '/CorePosition/listAllCorePositionByCore',{CorePosition:$scope.CorePosition}).success(function(data) {

                    $scope.corePositions = data.CorePosition;
                   // console.log($scope.corePositions);
                    <!--  增加当核心岗位人数为空时的提示  王洲  2016.02.29  -->
                    for(var i = 0,postlength = $scope.post.length; i < postlength; i ++){
                        if(unId==undefined){
                            $scope.btnIndex1[$scope.post[i].postId] = 1;
                        }
                        $scope.post[i].count = 0;
                        $scope.post[i].allData = [];
                        $scope.post[i].pageSize = [];
                        $scope.post[i].total = 1;
                        for(var j = 0,corepositionlength = $scope.corePositions.length; j < corepositionlength; j ++){
                            if($scope.post[i].postId == $scope.corePositions[j].postId){
                                $scope.post[i].count ++;
                                $scope.post[i].allData.push($scope.corePositions[j]);
                            }
                        }
                        var pageLength = $scope.post[i].total = Math.ceil($scope.post[i].count/4);
                        if($scope.post[i].count<=4){
                            $scope.post[i].allData = $scope.post[i].allData;
                        }else
                        {
                            if(unId==undefined) {
                                $scope.post[i].allData = $scope.post[i].allData.slice((4 * m), (4 * (m + 1)));
                            }else
                            {
                                var index = -1;
                                for(var z = 0;z<$scope.post[i].allData.length;z++)
                                {
                                    if($scope.post[i].allData[z].postId==unId)
                                    {
                                        index = i;
                                    }
                                }
                                if(index!=-1)
                                {
                                    $scope.post[index].allData = $scope.post[index].allData.slice((4 * m), (4 * (m + 1)));
                                }else
                                {
                                    $scope.post[i].allData = $scope.post[i].allData.slice(0, 4);
                                    $scope.btnIndex1[$scope.post[i].postId] = 1;
                                }
                            }
                        }
                        for(var z = 1;z<=pageLength;z++)
                        {
                            $scope.post[i].pageSize.push(z);
                        }
                    }
                });
            });
        }
        $scope.load();


       /**
        * 分页
        */
        $scope.goTo = function(item,id)
        {
            unId = id;
            for(var i=0;i<$scope.post.length;i++)
            {
                $scope.btnId = $scope.post[i].postId;
                if($scope.post[i].postId==id)
                {
                    m=item-1;
                    $scope.load();
                    $scope.btnIndex1[id] = item;
                }
            }
        };

       /**
        * 条件搜索
        */
       var fetchFunction1 = function(page,callback) {
           $scope.Staff.page=page;
           unId=undefined;
           $scope.load();
           //$http.post(url + '/CorePosition/listPageCorePosition',{CorePosition:$scope.CorePosition}).success(callback);

       };
           $scope.searchPaginator1=app.get('Paginator').list(fetchFunction1,4);

       /**
        * 选择对应的员工
        *
        */
       $scope.moreData = function(item)
       {
           $scope.core.postId='';
           if(item.nameOfCustom=="项目经理"){
               $scope.core.state=0;
           }else{
               $scope.core.state=1;
           }
           $scope.core.postId = item.postId;
           angular.element('#post').modal({backdrop: 'static', keyboard: false});
           //查询员工信息
           var fetchFunction = function(page,callback) {
               $scope.Staff.page=page;
               $scope.Staff.companyId=companyId;
               $http.post(url + '/staff/listPageStaffRestful',{Staff:$scope.Staff}).success(callback);
           };
           $scope.searchPaginator=app.get('Paginator').list(fetchFunction,10);
       };

        //得到员工id
        $scope.addPost=function(id){
            $scope.core.staffId=id;
            $scope.btnIndex=id;
        };
        //查询所有岗位
        /*$http.get(url + '/Post/listPostbyState').success(function(data) {
            $scope.post = data.Post;
        });*/

        //得到岗位id
        $scope.test=function(postId,name){
            $scope.core.postId='';
            $scope.core.postId=postId;
            if(name=="项目经理"){
                $scope.core.state=0;
            }else{
                $scope.core.state=1;
            }
        };

        var flag=0;
        $scope.checkValue=function(item){
            flag=0;
            if(item.staffId ==null || item.staffId ==""){
                layer.alert('请选择员工！',{icon : 0});
                flag=1;
                return;
            }else{
                if($scope.corePositions.length>0){
                    for(var i=0;i<$scope.corePositions.length;i++){
                        if(item.postId==$scope.corePositions[i].postId&&item.staffId==$scope.corePositions[i].staffId){
                            layer.alert('该员工已在该职位',{icon : 0});
                            flag=1;
                            break;
                        }
                    }
                }
            }
        };

        //保存
        $scope.save=function(){
            $scope.checkValue($scope.core);
            if(flag!=0)
                return;
            $http.post(url+'/CorePosition/AddCorePosition',{CorePosition:$scope.core}).success(function(){
                layer.msg('设置岗位成功',{icon : 1,time : 2000});
                $scope.load ();
                angular.element('#post').modal('hide');
                $scope.cancle();
            }).error(function(data, status, headers, config){
                layer.msg('设置岗位失败',{icon : 1,time : 2000});
                angular.element('#post').modal('hide');
                $scope.cancle();
            });
        };

       /**
        * enter 查询
         *
        */
       $scope.clickSearch = function(ev)
       {
           var e = ev||event;
           if(e.keyCode==13)
           {
               $scope.searchPaginator._load();
           }
       };

        $scope.delete=function(coreId,staffId) {
           /* layer.confirm('是否确定要删除该任命？',{
                btn : ['是','否']
            },function(){*/
                $scope.toDeletePet(coreId,staffId);
           /* },function(){

            })*/
        };

        $scope.toDeletePet = function(coreId,staffId){
            $http.get(url + '/Teamworkstaff/getTeamworkstaffbyStaffId/'+staffId+'/'+'null').success(function(data){
                if(data.Teamworkstaff.length>0){
                    layer.msg('此团队中尚有员工，无法删除',{icon : 1, time : 2000});
                }else{
                    layer.confirm('是否确定要删除该任命？',{
                        btn : ['是','否']
                    },function(){
                        $http.put(url + '/CorePosition/deleteCorePositionRes/' + coreId).success(function(data){
                            layer.msg('删除成功',{icon : 1, time : 2000});
                            unId=undefined;
                            m=0;
                            $scope.load();
                        });
                    },function(){

                    })

                }
            });

        };

        //取消
        $scope.cancle=function(){
            angular.element('#post').modal('hide');
            $scope.btnIndex='';
            $scope.core.postId='';
            $scope.core.staffId='';
        }
       }]);
});

//})