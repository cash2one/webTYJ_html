/**
 * Created by NM on 2018/1/18.
 * 遗失物品
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('lostArticlesCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.btnIndexTop = 0;
        $scope.buttonShow = true;//按钮高亮显示
        var url = $rootScope.url; //url地址
        $scope.searchone={page:{}};
        $scope.pageNum=0;//初始化显示第一个页面块，0：拾到物品记录且未领取，1遗失物品记录且未领取，2领取物品记录，3登记领取，4登记拾取，5登记遗失
        $scope.btnIndex='';

        $scope.currentDate = new Date();
        //$scope.articleStateLost.time = $scope.currentDate;
        /**
         * 查询人员信息
         */
        $scope.selectPerson=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginator1 = app.get('Paginator').list(parent,5);
        };

        /**
         * 选中人员
         */
        $scope.person_choice={};
        $scope.choicePerson=function(person){
            $scope.person_choice = person;
            $scope.btnIndex=person.custId;
        };

        /**
         * 取消模态框
         */
        $scope.outPerson=function(){
            $scope.person_choice={};
            $scope.btnIndex='';
        };

        /**
         * 显示页面块
         * @param page
         * @returns {boolean}
         */
        $scope.showPage=function(page){
            if(page==$scope.pageNum){
                return true;
            }
            return false;
        };

        //初始化网格
        $scope.grid = false;
        /**
         * 网格与列表切换 zhuqi 2016.03.18
         **/
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        //取消
        $scope.toOff = function(item){
            //登记拾到物品
            if(item == 'receive'){
                //$('#receive').modal('hide');
                angular.element('#receive').modal('hide');
            }

        };

        /**
         * 显示要展示的页面块
         */
        $scope.toPage=function(page,item){
            //网格时选中
            if(item != null){
                if(item == 0 || item == 1 || item == 2){
                    //导航条
                    $scope.btnIndexTop = item;
                    //console.log($scope.btnIndexTop);
                }else {
                    $scope.articleList = item;
                    //console.log($scope.articleList);
                }
            }
            if(page==0){
                //$('#receive').modal('hide');
                angular.element('#receive').modal('hide');
                //参数还原
                $scope.resetParams();
                $scope.listAllLostPick(0,0);
                $scope.countLost();
            }
            if(page==1){
                $scope.resetParams();
                $scope.listAllLostPick(0,1);
                $scope.countLost();
            }
            if(page==2){
                $scope.resetParams();
                $scope.listAllClaims();
                $scope.countLost();
            }
            if(page==3){
                if($scope.articleList.articleId==undefined){
                    layer.msg('请选择要领取的物品',{icon : 0,time : 2000});
                    return;
                }
                if( $scope.articleList.article.state == 1) {
                    layer.msg('请选择拾取的物品作为领取物品',{icon : 0,time : 2000});
                    return;
                }
                $scope.articleClaim.articleId= $scope.articleList.articleId;
                $scope.ys.time = $scope.currentDate;
                angular.element('#receives').modal('show');
                //$('#receives').modal('show');
                //$scope.resetParams();

            }
            if(page==4){
                $scope.articleStateLost.time = $scope.currentDate;
                angular.element('#receive').modal('show');
                //$('#receive').modal('show');
                //$scope.resetParams();
            }
            if(page==5){
                $scope.losty.lostTime = $scope.currentDate;
                angular.element('#loss').modal('show');
                //$('#loss').modal('show');
                //$scope.resetParams();
            }
            if(page<3){
                $scope.pageNum=page;
                $scope.showPage(page);
            }


        };
        $scope.tcArticleState={};
        /**
         * 获取所有拾到物品（或者遗失的物品）,并且未分配的物品
         */
        $scope.listAllLostPick=function(state,lostState)
        {
            var listLostPick = function(page, callback){
                $scope.tcArticleState.page=page;
                $scope.tcArticleState.lostState=lostState;
                $scope.tcArticleState.state=state;
                $http.post(url + '/TcArticleStateService/listPageTcArticleStates',{TcArticleState:$scope.tcArticleState}).success(callback);
            };
            $scope.listLostPicks = app.get('Paginator').list(listLostPick, 6);
        };

        /**
         * 查询所有被领取的物品
         */
        $scope.listAllClaims=function()
        {
            var listLostPick = function(page, callback){
                $scope.tcArticleState.page=page;
                $http.post(url + '/TcArticleStateService/listPageTcArticleGets',{TcArticleState:$scope.tcArticleState}).success(callback);
            };
            $scope.listLostPicks = app.get('Paginator').list(listLostPick, 6);
        };



        /**
         * 查询物品遗失的相关数量
         */
        $scope.lostPick=0;
        $scope.lostWait=0;
        $scope.countLost=function(){
            $http.get(url + '/TcArticleStateService/listTcArticleStatesCount').success(function (data) {
                $scope.lostPick=data.lostPick;
                $scope.lostWait=data.lostWait;
            }).error(function (data, status, headers, config) {
                layer.msg('获取拾到物品记录失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 登记领取物品
         */
        $scope.articleClaim={};
        $scope.addClaimArticle=function(){
            if($scope.person_choice.custId==undefined){
                layer.msg('请选择领取人',{icon : 0,time : 2000});
                return;
            }
            $scope.articleClaim.articleStateId= $scope.articleList.articleStateId;
            $scope.articleClaim.custId=$scope.person_choice.custId;

            $http.post(url + '/TcArticleStateService/insertTArticleGet',{TcArticleGet:$scope.articleClaim}).success(function (data) {
                layer.msg('登记领取物品成功',{icon : 1,time : 2000});
                $scope.toPage(0);
            }).error(function (data, status, headers, config) {
                layer.msg('登记领取物品失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 登记遗失或者拾取
         */
        $scope.articleStateLost={};
        $scope.articleLost={};
        $scope.addLostArticle=function(state){
            if( $scope.articleLost.articleName==undefined ||  $scope.articleLost.articleName==null){
                layer.msg('请填写物品名称',{icon : 0,time : 2000});
                return;
            }
            if( $scope.articleLost.articleDescribe==undefined ||  $scope.articleLost.articleDescribe==null){
                layer.msg('请填写物品描述',{icon : 0,time : 2000});
                return;
            }
            if($scope.person_choice.custId==undefined){
                layer.msg('请选择联系人',{icon : 0,time : 2000});
                return;
            }
            $scope.articleLost.state=state;
            $scope.articleStateLost.article=$scope.articleLost;
            //$scope.articleStateLost.state=0;
            $scope.articleStateLost.custId=$scope.person_choice.custId;
            $http.post(url + '/TcArticleStateService/insertTArticleLost',{TcArticleState:$scope.articleStateLost}).success(function (data) {
                layer.msg('登记物品成功',{icon : 1,time : 2000});
                $scope.toPage(0);
            }).error(function (data, status, headers, config) {
                layer.msg('登记物品失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 登记遗失物品
         */
        $scope.articleStateLost={};
        $scope.losty={};
        $scope.insert2 = function(state){
            if( $scope.losty.articleName==undefined ||  $scope.losty.articleName==null){
                layer.msg('请填写物品名称',{icon : 0,time : 2000});
                return;
            }
            if( $scope.losty.articleDescribe==undefined ||  $scope.losty.articleDescribe==null){
                layer.msg('请填写物品描述',{icon : 0,time : 2000});
                return;
            }
            if($scope.person_choice.custId==undefined){
                layer.msg('请选择联系人',{icon : 0,time : 2000});
                return;
            }
            $scope.losty.state=state;
            $scope.articleStateLost.article=$scope.losty;
            $scope.articleStateLost.time = $scope.losty.lostTime;
            $scope.articleStateLost.site = $scope.losty.articlePlace;
            $scope.articleStateLost.lostState = state;
            //$scope.articleStateLost.state=0;
            $scope.articleStateLost.custId=$scope.person_choice.custId;
            $http.post(url + '/TcArticleStateService/insertTArticleLost',{TcArticleState:$scope.articleStateLost}).success(function (data) {
                layer.msg('登记物品成功',{icon : 1,time : 2000});
                $scope.toPage(1,1);
                $scope.btnIndexTop=1;
            }).error(function (data, status, headers, config) {
                layer.msg('登记物品失败',{icon : 2,time : 2000});
            });
        };

        /**
         * 登记领取物品
         */
        $scope.articleStateLost = {};
        $scope.ys = {};
        $scope.update2 = function(){

            if($scope.person_choice.custId==undefined){
                layer.msg('请选择领取人',{icon : 0,time : 2000});
                return;
            }
            if($scope.ys.time == undefined || $scope.ys.time == null ){
                layer.msg('请填写领取时间',{icon : 0,time : 2000});
                return;
            }
            $scope.articleStateLost.articleStateId = $scope.articleList.articleStateId;
            $scope.articleStateLost.custId = $scope.person_choice.custId;
            $scope.articleStateLost.time = $scope.ys.time;
            $http.post(url+'/TcArticleStateService/insertTArticleGet',{TcArticleGet:$scope.articleStateLost}).success(function (data) {
                layer.msg('登记领取物品成功',{icon : 1,time : 2000});
                $scope.toPage(0,0);
                $scope.btnIndexTop=1;
            }).error(function (data, status, headers, config) {
                layer.msg('登记领取物品失败',{icon : 2,time : 2000});
            });

        }

        /**
         * 单选时将article存入或移除数组
         */
        $scope.articleList={};
        $scope.getArticleList = function(article){
            if($scope.articleList.articleId==undefined){
                $scope.articleList=article;
                document.getElementById(article.articleId).checked = true;
            }else{//选中时
                if(article.articleId==$scope.articleList.articleId){
                    $scope.articleList={};
                    document.getElementById(article.articleId).checked = false;
                }else{
                    $scope.articleList=article;
                    var listArticle=document.getElementsByName('articleName');
                    for(var i=0;i<listArticle.length;i++){
                        listArticle[i].checked=false;
                    }
                    document.getElementById(article.articleId).checked = true;
                }
            }
        };
     /*   $scope.getArticleList = function(article) {
            if (document.getElementById(article.articleId).checked == true) {
                document.getElementById(article.articleId).checked == false;
                document.getElementById(article.articleId).parentNode.parentNode.style.background = '';
                $scope.temp = [];
                $scope.temp = $scope.listLostPicks;
                for (var i = 0; i < $scope.temp.length; i++) {
                    if ($scope.temp[i] != article.articleId) {
                        $scope.articleList.push($scope.temp[i]);
                    }
                }

            } else {
                document.getElementById(article.articleId).checked = true;
                document.getElementById(article.articleId).parentNode.parentNode.style.background = '#f6f8fa';
                $scope.articleList.push(article.articleId);
            }
        };*/

        /**
         * 样式选择
         */
        $scope.choiceCss=function(articleId){
            if( $scope.articleList.articleId==articleId){
                return true;
            }
            return false;
        };

        /**
         * 参数还原
         */
        $scope.resetParams=function(){
            $scope.lostPick=0;
            $scope.lostWait=0;
            $scope.articleClaim={};
            $scope.articleList={};
            $scope.articleStateLost={};
            $scope.articleLost={};
            $scope.person_choice={};
            $scope.btnIndex='';
        };

        /**
         * 初始化方法
         */
        $scope.load=function(){
            $scope.listAllLostPick(0,0);
            $scope.countLost();

        };

       $scope.load();

    }]);
});