/**
 * Created by NM on 2018/1/18.
 * FAQ
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('upcomingFaqCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var user=JSON.parse(sessionStorage.getItem('USER_LOGIN'));
        /*********************** 参数设置 **************************/
        var url = $rootScope.url;
        $scope.FaqTypes = {};                   //查询faqtype
        $scope.Faqs = {page:{}};                //查询faqs
        $scope.faqs = {};                       //新增faqs
        $scope.faqIdList = [];                  //faqid数组
        $scope.operatorId = user.employId;              //暂无登录，默认操作人为main.js中定义的userLogin对象,即用户对象中的员工id号
        /*********************** 参数设置 **************************/

        /*********************** load方法 **************************/

            //获取所有FAQ类型
        $http.post(url + '/FaqTypes/listFaqTypes',{FaqTypes : $scope.FaqTypes}).success(function(data){
            $scope.FaqTypesList = data.FaqTypes;
        }).error(function(data){
            layer.msg('没有符合的问题类型',{icon : 0,time : 2000});
        });

        //分页获取所有FAQ
        var listFaq = function(page, callback){
            $scope.faqIdList = [];
            $scope.Faqs.page = page;
            $http.post(url + '/Faqs/listPageFaqsNoAnswer', {Faqs : $scope.Faqs}).success(callback);
        };
        $scope.searchFaq = app.get('Paginator').list(listFaq, 6);
        console.log($scope.searchFaq);

        /*********************** load方法 **************************/

        /*********************** function **************************/

        //打开新增faq模态框
        /*$scope.openFaq = function(){
         $("#new").modal("show");
         };*/

        //关闭新增faq模态框
        $scope.closeFaq = function(){
            $("#new").modal("hide");
            $scope.faqs = {};
        };

        //新增faqs
        $scope.insertFaqs = function(){
            $scope.faqs.crePersonId = user.employId;
            if($scope.faqs.faqQuestionName != null && $scope.faqs.faqTypeId != null && $scope.faqs.faqQuestionAnswer != null){

                //根据id是否有值来判断执行新增还是修改
                if($scope.faqs.faqQuestionId == null){
                    $http.post(url + '/Faqs/insertFaqs', {Faqs : $scope.faqs}).success(function(){
                        layer.msg('新增成功',{icon : 1,time : 2000});
                        $("#new").modal("hide");
                        $scope.faqs = {};
                        $scope.searchFaq._load();
                    }).error(function(data){
                        layer.alert('新增失败，请重新操作',{icon : 2});
                    });
                }else{
                    $http.post(url + '/Faqs/updateFaqs/'+$scope.operatorId, {Faqs : $scope.faqs}).success(function(){
                        layer.msg('修改成功',{icon : 1, time : 2000});
                        $("#new").modal("hide");
                        $scope.faqs = {};
                        $scope.searchFaq._load();
                    }).error(function(data){
                        layer.alert('修改失败，请重新操作',{icon : 2});
                    });
                }
            }else{
                layer.alert('请完成必填项',{icon : 0});
            }
        };

        //全选
        $scope.getAllId = function(){
            $scope.checkBox = document.getElementsByName('faqquestionid');
            $scope.temp = $scope.checkBox;
            $scope.checkBox = [];
            for(var i = 0; i < $scope.temp.length; i ++){
                if($scope.temp[i].id != ""){
                    $scope.checkBox.push($scope.temp[i].id);
                }
            }
            if($scope.faqIdList.length < $scope.checkBox.length){
                $scope.faqIdList = [];
                for(var i = 0; i < $scope.checkBox.length; i++){
                    if($scope.checkBox[i] != ''){
                        $scope.faqIdList.push($scope.checkBox[i]);
                        document.getElementById($scope.checkBox[i]).checked = true;
                    }
                }
            }else{
                for(var i = 0; i < $scope.faqIdList.length; i ++){
                    document.getElementById($scope.faqIdList[i]).checked = false;
                }
                $scope.faqIdList = [];
            }
        };

        //单选时将id存入或移除数组
        $scope.getFaqId = function(id){
            if(document.getElementById(id).checked == true){
                $scope.faqIdList.push(id);
            }else{
                $scope.temp = [];
                $scope.temp = $scope.faqIdList;
                $scope.faqIdList = [];
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i] != id){
                        $scope.faqIdList.push($scope.temp[i]);
                    }
                }
            }
        };

        //初始化网格
        $scope.grid = true;
        //网格
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        //失效
        $scope.loseFaqs = function(item){
            $scope.faqids = {};
            if(item == -1) {
                //判断是否有选中的faq记录
                if ($scope.faqIdList.length == 0) {
                    layer.alert('至少选择一条数据', {icon: 0});
                    return;
                }
                $scope.faqids = $scope.faqIdList.join(",");
            }else{
                $scope.faqids = item;
            }
                layer.confirm('是否要将选中信息设为失效？',{
                    btn : ['确定','取消']
                },function(){
                    $http.post(url + '/Faqs/failFaqs/'+$scope.faqids + '/' + $scope.operatorId).success(function(){
                        layer.alert('操作成功',{icon : 1});
                        $scope.searchFaq._load();
                    }).error(function(data){
                        layer.alert('操作失败，请重新操作',{icon : 2});
                    });
                },function(){});
        };

        //修改
        $scope.updateFaqs = function(item){
            $scope.faqid = '';
            if(item == -1) {
                //判断是否有选中的faq记录
                if ($scope.faqIdList.length == 0) {
                    layer.alert('请先选择要操作的数据', {icon: 0});
                    return;
                }
                if ($scope.faqIdList.length > 1) {
                    layer.alert('一次只能修改一条数据', {icon: 0});
                    return;
                }
                $scope.faqid = $scope.faqIdList[0];
            }else{
                $scope.faqid = item;
            }
                $http.get(url + '/Faqs/getFaqsById/' + $scope.faqid).success(function(data){
                    $scope.faqs = data.Faqs;
                    $("#new").modal("show");
                }).error(function(data){
                    layer.alert('没有查到对应的数据',{icon : 2});
                });
        };

        //针对单个faq打开模态框
        $scope.editFaq = function(item){
            $scope.faqs = item;
            $("#new").modal("show");
        };

        //针对单个FAQ进行失效操作
        $scope.failFaqAlone = function(id){
            layer.confirm('是否将此记录设为失效？',{
                btn : ['确定','取消']
            },function(){
                $scope.faqids = id;
                $http.post(url + '/Faqs/failFaqs/'+$scope.faqids + '/' + $scope.operatorId).success(function(){
                    layer.alert('操作成功',{icon : 1});
                    $scope.searchFaq._load();
                }).error(function(data){
                    layer.alert('操作失败，请重新操作',{icon : 2});
                });
            },function(){});
        };

        /*********************** function **************************/

        /**
         * 选中样式，通过事件给予样式
         */
        $scope.choiceCss=function(id){
            if(id==undefined){
                if($scope.faqIdList.length!=0){
                    return true;
                }else{
                    return false;
                }
            }
            if( $scope.faqIdList.length!=0){
                for(var i=0;i<$scope.faqIdList.length;i++){
                    if(id==$scope.faqIdList[i]){
                        return true;
                    }
                }
                return false;
            }
            return false;
        };

    }]);
});