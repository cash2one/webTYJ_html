/**
 * Created by CR.
 * 消息公告管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('corporateNewsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(3);
        var url=$rootScope.url;
        /**
         * 初始化富文本编辑器
         */
        var ue1 = UE.getEditor('container5',{
            elementPathEnabled:false
        });
        var ue2 = UE.getEditor('container6',{
            elementPathEnabled:false
        });

        /**
         * 点击发布
         */
        $scope.corporateNews={};
        $scope.insertCorporateNews=function(){
            /**
             * 调用API获取编辑器html内容
             */
            ue1.ready(function() {
                var html = ue1.getContent();
                console.log("编辑器的内容为："+html);
                $scope.corporateNews.detailedInformation=html;
            });
            if(($scope.corporateNews.title=="")||($scope.corporateNews.title==undefined)){
                layer.msg('请填写标题信息！',{icon:0,time:2000});
                return;
            }
            if(($scope.corporateNews.project=="")||($scope.corporateNews.project==undefined)){
                layer.msg('发布项目不能为空！',{icon:0,time:2000});
                return;
            }
            $http.post(url+'/Corporatenews/AddCorporatenews',{Corporatenews:$scope.corporateNews}).success(function(){
                layer.msg('发布成功',{icon : 1,time : 2000});
                //$scope.load();
                //重新分页
                $scope.searchPaginator._load();
            }).error(function(data,status,headers,config){
                alert("新增失败！");
            });
            //清空内容
            $scope.corporateNews={};
            ue1.ready(function() {
                ue1.setContent("");
            });
        };

        /**
         * 删除企业信息
         */
        $scope.deleteCorporateNews=function(){
            var count = 0;
            angular.forEach($scope.searchPaginator.object.corporatenewss,function(item){
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
                temp = $scope.searchPaginator.object.corporatenewss;
                $scope.searchPaginator.object.corporatenewss = [];
                for(var i = 0;i<temp.length;i++){
                    if(temp[i].id!=null) {
                        console.log(document.getElementById(temp[i].id).checked);
                        if (!document.getElementById(temp[i].id).checked) {
                            $scope.searchPaginator.object.corporatenewss.push(temp[i]);
                        }
                        else {
                            $http.delete(url + '/Corporatenews/DeleteCorporatenewsById/' + temp[i].id).success(function () {
                                //重新分页
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
         *企业新闻分页
         */
        $scope.corporateNewsPage={page:{}};
        var fetchFunction = function (page, callback) {
            $scope.corporateNewsPage.page = page;
            $http.post(url + '/Corporatenews/listPageCorporatenewsRestful',{Corporatenews:$scope.corporateNewsPage}).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log("$scope.searchPaginator的内容为:"+$scope.searchPaginator);

        /**
         * 更新企业新闻的内容
         */
        $scope.updateCorporateNews=function(){
            if(($scope.itemCorporate.title=="")||($scope.itemCorporate.title==undefined)){
                layer.msg('请填写标题信息！',{icon:0,time:2000});
                return;
            }
            if(($scope.itemCorporate.project=="")||($scope.itemCorporate.project==undefined)){
                layer.msg('发布项目不能为空！',{icon:0,time:2000});
                return;
            }
            ue2.ready(function() {
                var html = ue2.getContent();
                $scope.itemCorporate.detailedInformation=html;
            });
            $scope.itemCorporate.lastModificationTime = new Date();
            $http.put(url + '/Corporatenews/UpdateCorporatenews',{Corporatenews:$scope.itemCorporate}).success(function(){
                layer.msg('发布成功',{icon : 1,time : 2000});

            }).error(function(data,status,headers,config){
                alert("发布失败！");
            });

            //清空内容
            /*$scope.itemCorporate={};
            ue2.ready(function() {
                ue2.setContent("");
            });*/
        };

        /**
         *编辑小区公告
         */
        $scope.itemCorporate="";
        $scope.editState=0;
        $scope.editCorporateNews=function(){
            $scope.editState=0;
            /**
             * 清空编辑器的内容
             */
            ue2.ready(function() {
                ue2.setContent("");
            });
            var count = 0;
            angular.forEach($scope.searchPaginator.object.corporatenewss,function(item){
                if(item.id!=null) {
                    console.log("item.id的值为：" + item.id);
                    if (document.getElementById(item.id).checked) {
                        count++;
                        $scope.itemCorporate=item;
                    }
                }
            });
            if(count==0){
                layer.msg('请选择需要编辑的行！',{icon:0,time:2000});
                return;
            }
            if(count>1){
                layer.msg('最多只能编辑一项！',{icon:0,time:2000});
                return;
            }
            //$('#container2').html($scope.itemCommunity.briefContent);
            /**
             * set编辑器的内容
             */
            ue2.ready(function() {
                var str=$scope.itemCorporate.detailedInformation;
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
            $scope.preview.lastModificationTime=new Date();
            if(i==1) {
                ue1.ready(function () {
                    item.detailedInformation = ue1.getContent();
                });
            }
            if(i==2) {
                ue2.ready(function () {
                    item.detailedInformation = ue2.getContent();
                });
            }
            $('#editorPreview').html(item.detailedInformation);
        };

        //查询所有项目
        $scope.projects = {page:{}};
        $scope.projects.company = $scope.user.companyId;
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
                            $scope.itemCorporate.project = temp[i].projectId;
                            $scope.itemCorporate.projects.projectName = temp[i].projectName;
                        }
                        if($scope.newState==1){
                            $scope.corporateNews.project = temp[i].projectId;
                            $scope.corporateNews.projectName = temp[i].projectName;
                        }
                        tag=1;
                    }
                }
            }
            if(tag==0){
                $scope.itemCorporate.project="";
                $scope.corporateNews.project="";
            }
        }
    }]);
});