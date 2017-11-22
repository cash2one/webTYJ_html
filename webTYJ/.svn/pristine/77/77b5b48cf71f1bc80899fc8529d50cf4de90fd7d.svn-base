/**
 * Created by NM on 2018/1/18.
 * 消息公告管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('internalNoticeCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(1);
        var url=$rootScope.url;
        //获取user对象信息
        $scope.USER_LOGIN = JSON.parse(sessionStorage.getItem('USER_LOGIN'));
        //判断是否登录
        if($scope.USER_LOGIN == null){
            $location.path("/login");
            return;
        }
        //判断用户是否已经登陆
        var user = {employId : '',userId:""};
        var userSession = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userSession?userSession:user;
        console.log("user的公司id为："+$scope.user.companyId);
        /**
         * 初始化富文本编辑器
         */
        var ue1 = UE.getEditor('container3',{
            elementPathEnabled:false
        });
        var ue2 = UE.getEditor('container4',{
            elementPathEnabled:false
        });

        /**
         * 点击发布
         */
        $scope.Inform={};
        $scope.Inform.inform="";
        $scope.Inform.writer="";
        $scope.Inform.department="";
        $scope.Inform.abstracts="";
        $scope.Inform.project="";
        $scope.Inform.content="";
        $scope.insertInternalNotice=function(){
            /**
             * 调用API获取编辑器html内容
             */
            ue1.ready(function() {
                var html = ue1.getContent();
                console.log("编辑器的内容为："+html);
                $scope.Inform.content=html;
            });
            console.log("Inform的内容："+$scope.Inform);
            console.log("Inform的inform内容："+$scope.Inform.inform);
            if(($scope.Inform.inform=="")||($scope.Inform.inform==undefined)){
                layer.msg('请填写标题信息！',{icon:0,time:2000});
                return;
            }
            if(($scope.Inform.project=="")||($scope.Inform.project==undefined)){
                layer.msg('发布项目不能为空！',{icon:0,time:2000});
                return;
            }
            $http.post(url+'/Inform/insertInforms',{Inform:$scope.Inform}).success(function(){
                layer.msg('发布成功',{icon : 1,time : 2000});
                //$scope.load();
                $scope.searchPaginator._load();
            }).error(function(data,status,headers,config){
                alert("新增失败！");
            });

            //清空内容
            $scope.Inform={};
            ue1.ready(function() {
                ue1.setContent("");
            });
        };

        /**
         * 显示标题信息
         */
        $scope.Informs={};
        $http.get(url + '/Inform/listAllsinform').success(function(data) {
            $scope.Informs = data.Inform;
        });

        /**
         * 删除内部公告
         */
        $scope.deleteInternalNotice=function(){
            var count = 0;
            angular.forEach($scope.searchPaginator.object.informs,function(item){
                if(item.id!=null) {
                    console.log("item.id的值为：" + item.id);
                    if (document.getElementById(item.id).checked) {
                        count++;
                    }
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.searchPaginator.object.informs;
                $scope.searchPaginator.object.informs = [];
                for(var i = 0;i<temp.length;i++){
                    if(temp[i].id!=null) {
                        console.log(document.getElementById(temp[i].id).checked);
                        if (!document.getElementById(temp[i].id).checked) {
                            $scope.searchPaginator.object.informs.push(temp[i]);
                        }
                        else {
                            $http.delete(url + '/Inform/deleteInform/' + temp[i].id).success(function () {
                                $scope.searchPaginator._load();
                            });
                        }
                    }
                }
                $scope.$apply(function(){
                    /*$scope.SumOrUpdateQuoteOrders();
                     $scope.discountOrUpdateQuoteOrders();*/
                });
                layer.msg('删除成功！',{icon :1,time : 1000});


            },function(){

            });
        };

        $scope.newState=0;
        $scope.changeNewState=function(){
            $scope.newState=1;
        };

        /**
         *内部公告分页
         */
        $scope.informPage={page:{}};
        var fetchFunction = function (page, callback) {
            $scope.informPage.page = page;
            $http.post(url + '/Inform/listPageinform',{Inform:$scope.informPage}).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log("$scope.searchPaginator的内容为:"+$scope.searchPaginator);

        /**
         * 更新编辑公告的内容
         */
        $scope.updateInternalNotice=function(){
            if(($scope.itemInternal.inform=="")||($scope.itemInternal.inform==undefined)){
                layer.msg('请填写标题信息！',{icon:0,time:2000});
                return;
            }
            if(($scope.itemInternal.project=="")||($scope.itemInternal.project==undefined)){
                layer.msg('发布项目不能为空！',{icon:0,time:2000});
                return;
            }
            ue2.ready(function() {
                var html = ue2.getContent();
                $scope.itemInternal.content=html;
            });
            $http.put(url + '/Inform/UpdateInform',{Inform:$scope.itemInternal}).success(function(){
                layer.msg('发布成功',{icon : 1,time : 2000});

            }).error(function(data,status,headers,config){
                alert("发布失败！");
            });

            //清空内容
            /*$scope.itemInternal={};
            ue2.ready(function() {
                ue2.setContent("");
            });*/
        };

        /**
         *编辑小区公告
         */
        $scope.itemInternal="";
        $scope.editState=0;
        $scope.editInternalNotice=function(){
            $scope.editState=0;
            /**
             * 清空编辑器的内容
             */
            ue2.ready(function() {
                ue2.setContent("");
            });
            var count = 0;
            angular.forEach($scope.searchPaginator.object.informs,function(item){
                if(item.id!=null) {
                    console.log("item.id的值为：" + item.id);
                    if (document.getElementById(item.id).checked) {
                        count++;
                        $scope.itemInternal=item;
                    }
                }
            });
            if(count==0){
                layer.msg('请选择需要编辑的行！',{icon:0,time:2000});
                return;
            }
            if(count>1){
                layer.msg('最多只能编辑一个公告！',{icon:0,time:2000});
                return;
            }
            //$('#container2').html($scope.itemCommunity.briefContent);
            /**
             * set编辑器的内容
             */
            ue2.ready(function() {
                var str=$scope.itemInternal.content;
                if(str!=null) {
                    ue2.setContent(str);
                }
            });
            $scope.editState=1;
            $scope.newState=0;
        };

        $scope.newState=0;
        $scope.changeNewState=function(){
            $scope.newState=1;
            $scope.editState=0;
        };

        /**
         * 预览点击事件
         */
        $scope.showPreview=function(item,i){
            $scope.preview=item;
            $scope.preview.time=new Date();
            if(i==1) {
                ue1.ready(function () {
                    item.content = ue1.getContent();
                });
            }
            if(i==2) {
                ue2.ready(function () {
                    item.content = ue2.getContent();
                });
            }
            $('#editorPreview').html(item.content);
        };

        //查询所有项目
        $scope.projects = {page:{}};
        $scope.projects.company = $scope.user.companyId;
       /* $scope.listprojectname = function(){
            $http.get(url + '/AfterSale/listprojectname').success(function(data){
                $scope.Project = data.Project;
            }).error(function(data){
                layer.msg('查询项目失败', {icon: 2});
            })
        };
        $scope.listprojectname();*/
        var fetchFunction = function (page, callback) {
            $scope.projects.page = page;
            $http.post(url + '/Project/listPageProjectByCompany',{Project:$scope.projects}).success(callback)
        };
        $scope.projectPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log("$scope.searchPaginator的内容为:"+$scope.searchPaginator);

        $scope.openProject = function () {
            //$('#chooseProject').model('show');
        };

        $scope.btnIndex = 0;
        $scope.chooseProjectList = function (item) {
            $scope.btnIndex = item.projectId;
            document.getElementById(item.projectId).checked=document.getElementById(item.projectId).checked?false:true;
            var temp=$scope.projectPaginator.object.project;
            for(var i=0;i<temp.length;i++){
                if(temp[i].projectId!=null){
                    if(temp[i].projectId!=item.projectId) {
                        document.getElementById(temp[i].projectId).checked = false;
                    }
                }
            }
        };

        $scope.submitProjectForEdit = function () {
            var temp = $scope.projectPaginator.object.project;
            var tag=0;
            for(var i=0;i<temp.length;i++){
                if(temp[i].projectId!=null){
                    if(document.getElementById(temp[i].projectId).checked) {
                        if($scope.editState==1) {
                            $scope.itemInternal.project = temp[i].projectId;
                            $scope.itemInternal.projects.projectName = temp[i].projectName;
                        }
                        if($scope.newState==1){
                            $scope.Inform.project = temp[i].projectId;
                            $scope.Inform.projectName = temp[i].projectName;
                        }
                        tag=1;
                    }
                }
            }
            if(tag==0){
                $scope.Inform.project="";
                $scope.itemInternal.project="";
            }
        }
    }]);
});