/**
 * Created by LM on 2015/3/11.
 * 企业信息
 */
'use strict';

define(function (require) {
    var app = require('../../app');

    // dynamic load services here or add into dependencies of state config
    // require('../services/usersService');

    app.controller('entCtrl', ['$scope', '$http','$cookieStore','$rootScope','$location',
        function ($scope,$http,$cookieStore,$rootScope,$location) {
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

            var url = $rootScope.url;
            var fileUrl=$rootScope.fileUrl;             //上传的文件路径

            $scope.userTag = 0;
            if(($scope.user.userId != '')&&($scope.user.userId!=null)) {
                if ($scope.user.staff != null) {
                    $scope.userTag = 0;//非超级管理员
                } else {
                    $scope.userTag = 1;//超级管理员
                }
            }


            //物业公司管理路径 ui-sref="index.baseManagement.projectManagement"
            $scope.intoCompany = function(){

                if(angular.isUndefined($scope.user.userId)){
                    layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                    $location.path("/login");
                }else{
                    //判断是否是超级管理员，如果是超级管理员直接跳转，如果不是超级管理员进行权限判断
                    $scope.userRole = [];
                    if(angular.isArray($scope.user.tUserRoles)){
                        $scope.userRole = $scope.user.tUserRoles;
                    }else{
                        $scope.userRole.push($scope.user.tUserRoles);
                    }
                    //循环用户角色信息，判断是否有超级管理员角色
                    var tmp = 0;
                    for(var i = 0,len = $scope.userRole.length; i < len; i ++){
                        if($scope.userRole[i].tRole.roleType == 0){
                            tmp ++;
                        }
                    }
                    if(tmp == 0){
                        //如果不是超级管理员，判断是否有对应的权限
                        $scope.perList = [];
                        $scope.perList = $scope.user.tuserPermissions;
                        var checkper = false;
                        for(var i = 0,len = $scope.perList.length; i < len; i++){
                            if($scope.perList[i].permissions.permissionsDescription == 'property'){
                                checkper = true;
                            }
                        }
                        if(checkper){
                            $location.path("/index/baseManagement/projectManagement");
                        }else{
                            layer.msg('没有物业项目管理权限！',{icon : 0,time :1000});
                        }
                    }else{
                        //如果是超级管理员，进入到相关页面
                        $location.path("/index/baseManagement/projectManagement");
                    }
                }
            };
            //根据登录用户的公司id获取公司的相关信息
            $scope.tip = "公司信息";
            $scope.company = {};
            if(angular.isDefined($scope.user.companyId)){
                if($scope.user.companyId != ''){
                    $http.get(url + '/Company/getCompanyInformation/' + $scope.user.companyId).success(function(data){
                        $scope.company = data.Company;
                        $scope.company.projectArea = data.Company.projectArea;
                        $scope.company.projectList = data.Company.projectList;
                        $scope.company.projectNum = data.Company.projectNum;
                        $scope.company.staffNum = data.Company.staffNum;
                    }).error(function(data){
                        layer.msg('没有有效的公司信息！',{icon : 0,time : 1000});
                    });
                }
            }

            //判断人事管理权限，有权限才能进入人事管理模块
            $scope.intoStaff = function(){
                if(angular.isUndefined($scope.user.userId)){
                    layer.msg('无登录信息，请重新登录！',{icon : 0,time : 1000});
                    $location.path("/login");
                }else{
                    //判断是否是超级管理员，如果是超级管理员直接跳转，如果不是超级管理员进行权限判断
                    $scope.userRole = [];
                    if(angular.isArray($scope.user.tUserRoles)){
                        $scope.userRole = $scope.user.tUserRoles;
                    }else{
                        $scope.userRole.push($scope.user.tUserRoles);
                    }
                    //循环用户角色信息，判断是否有超级管理员角色
                    var tmp = 0;
                    for(var i = 0,len = $scope.userRole.length; i < len; i ++){
                        if($scope.userRole[i].tRole.roleType == 0){
                            tmp ++;
                        }
                    }
                    if(tmp == 0){
                        //初始化数组存放登录用户的权限
                        $scope.personList = [];
                        $scope.personList = $scope.user.tuserPermissions;
                        var checkperson = false;    //初始化flag
                        for(var i = 0,len = $scope.personList.length; i < len; i ++){
                            //循环数组，当有匹配的权限时结束循环并跳转到对应的页面，flag为true
                            if($scope.personList[i].permissions.permissionsDescription == 'person'){
                                $location.path("/index/personnelManagement/staffsuperviseIT/staffsuprviseITCheck");
                                checkperson = true;
                                break;
                            }else if($scope.personList[i].permissions.permissionsDescription == 'coreposition'){
                                $location.path("/index/personnelManagement/corePost");
                                checkperson = true;
                                break;
                            }else if($scope.personList[i].permissions.permissionsDescription == 'admins'){
                                $location.path("/index/personnelManagement/personnelManagement");
                                checkperson = true;
                                break;
                            }else if($scope.personList[i].permissions.permissionsDescription == 'project'){
                                $location.path("/index/personnelManagement/projectTeamManagement");
                                checkperson = true;
                                break;
                            }else if($scope.personList[i].permissions.permissionsDescription == 'staff'){
                                $location.path("/index/personnelManagement/postPersonnelConfiguration");
                                checkperson = true;
                                break;
                            }else if($scope.personList[i].permissions.permissionsDescription == 'myteam'){
                                $location.path("/index/personnelManagement/myTeamManagement");
                                checkperson = true;
                                break;
                            }
                        }
                        //判断flag，如果不为true即没有认识管理所有模块的操作权限，给出提示
                        if(!checkperson){
                            layer.msg('此账户没有人事管理模块操作权限！',{icon : 0,time : 1000});
                        }
                    }else{
                        $location.path("/index/personnelManagement/staffsuperviseIT/staffsuperviseITCheck");
                    }
                }
            };

            $scope.tip="内部公告";
            /*$scope.Informs={};
            $http.get(url + '/Inform/listAllinform',{headers:{
                'x-user-session':$scope.USER_LOGIN.sessionId
            }}).success(function(data) {
                isLogin(data);
                $scope.Informs = data.Inform;
                $scope.itemInternalFirst=data.Inform[0];
            });*/

            $scope.Informs={};
            $scope.InformsAll={};
            /**
             * 超级管理员可以看到所有的公告，普通用户只能看到与自己相关的项目中的公告
             */
            if($scope.userTag==1) {
                $http.get(url + '/Inform/listAllsinform', {
                    headers: {
                        'x-user-session': $scope.USER_LOGIN.sessionId
                    }
                }).success(function (data) {
                    isLogin(data);
                    for (var i = 0; i < 5; i++) {
                        $scope.Informs[i] = data.Inform[i];
                    }
                    $scope.itemInternalFirst = data.Inform[0];
                    $scope.InformsAll = data.Inform;
                });
            }else if($scope.userTag==0){
                $http.get(url+'/Inform/listAllsinformByUserId/'+$scope.user.userId).success(function (data) {
                    //layer.msg('查询成功！',{icon:1,time:2000});
                    for (var i = 0; i < 5; i++) {
                        $scope.Informs[i] = data.Inform[i];
                    }
                    $scope.itemInternalFirst = data.Inform[0];
                    $scope.InformsAll = data.Inform;
                }).error(function () {
                    layer.msg('查询失败！',{icon:2,time:2000});
                });
            }
            $scope.tip="企业新闻";
            $scope.corporatenewss={};
            if($scope.userTag==1) {
                $http.get(url + '/Corporatenews/listAllsCorporatenews', {
                    headers: {
                        'x-user-session': $scope.USER_LOGIN.sessionId
                    }
                }).success(function (data) {
                    isLogin(data);
                    $scope.Corporatenews = data.Corporatenews;
                    $scope.itemFirstCorporate = data.Corporatenews[0];
                });
            }else if($scope.userTag==0){
                $http.get(url+'/Corporatenews/listAllsCorporatenewsByUserId/'+$scope.user.userId).success(function (data) {
                    $scope.Corporatenews = data.Corporatenews;
                    $scope.itemFirstCorporate = data.Corporatenews[0];
                }).error(function () {
                    layer.msg('查询失败！',{icon:0,time:2000});
                });
            }
            $scope.tip="规章制度";
            $scope.Rules={};
            $scope.RulesAll={};
            /*$http.get(url + '/Rules/listAllsRules',{headers:{
                'x-user-session':$scope.USER_LOGIN.sessionId
            }}).success(function(data) {
                isLogin(data);
                for(var i=0;i<5;i++){
                    $scope.Rules[i] = data.Rules[i];
                }
                $scope.RulesAll = data.Rules;
            });*/
            //$scope.loadDefault=function(){
            //    console.log("2222");
            //    var wWidth = $(window).width();
            //    var wHeight = $(window).height();
            //    $(".container-fluid .left").height(wHeight-70);
            //    $(".container-fluid .content").height(wHeight-100);
            //};
            $scope.tip="小区公告";
            /*$scope.Communtitnotice={};
            $http.get(url + '/Communtitnotice/listAllCommuntitnotice',{headers:{
                'x-user-session':$scope.USER_LOGIN.sessionId
            }}).success(function(data) {
                isLogin(data);
                $scope.Communtitnotice = data.Communtitnotice;
                $scope.itemFirstCom = data.Communtitnotice[0];
            });*/

            $scope.Communtitnotice={};
            $scope.CommuntitnoticesAll={};
            if($scope.userTag==1) {
                $http.get(url + '/Communtitnotice/listAllsCommuntitnotice', {
                    headers: {
                        'x-user-session': $scope.USER_LOGIN.sessionId
                    }
                }).success(function (data) {
                    isLogin(data);
                    for (var i = 0; i < 5; i++) {
                        $scope.Communtitnotice[i] = data.Communtitnotice[i];
                    }
                    $scope.itemFirstCom = data.Communtitnotice[0];
                    $scope.CommuntitnoticesAll = data.Communtitnotice;
                });
            }else if($scope.userTag==0){
                $http.get(url+'/Communtitnotice/listAllsCommuntitnoticeByUserId/'+$scope.user.userId).success(function (data) {
                    for (var i = 0; i < 5; i++) {
                        $scope.Communtitnotice[i] = data.Communtitnotice[i];
                    }
                    $scope.itemFirstCom = data.Communtitnotice[0];
                    $scope.CommuntitnoticesAll = data.Communtitnotice;
                }).error(function () {
                    layer.msg('查询失败 ！',{icon:0,time:2000});
                });
            }
            //$scope.loadDefault();
            function isLogin (data){
                var code = data.code;
                if(code == '4001'){
                    $location.path("/login");
                    return;
                }
            }


            $scope.state=1;
            $scope.jumpToCorporateNews = function () {
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

                if($scope.itemFirstCorporate.detailedInformation==undefined){
                    $scope.itemFirstCorporate.detailedInformation="";
                }
                $('#textCorporateFirst').html($scope.itemFirstCorporate.detailedInformation);
            };

            $scope.jumpToCommunityNotice=function(){
              //$scope.state=2;
                /**
                 *小区公告分页
                 */
                $scope.communityPage={page:{}};
                var fetchFunction = function (page, callback) {
                    $scope.communityPage.page = page;
                    $http.post(url + '/Communtitnotice/listPageCommuntitnoticeRestful',{Communtitnotice:$scope.communityPage}).success(callback)
                };
                $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
                console.log("$scope.searchPaginator的内容为:"+$scope.searchPaginator);

                if($scope.itemFirstCom.briefContent==undefined){
                    $scope.itemFirstCom.briefContent="";
                }
                $('#textCommunityFirst').html($scope.itemFirstCom.briefContent);
            };
            $scope.jumpToInternalNotice=function(){
              //$scope.state=3;
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

                if($scope.itemInternalFirst.content==undefined){
                    $scope.itemInternalFirst.content="";
                }
                $('#textInternalFirst').html($scope.itemInternalFirst.content);
            };

            $scope.jumpToRules=function(){
                /**
                 *规章制度分页
                 */
                $scope.rulesPage={page:{}};
                var fetchFunction = function (page, callback) {
                    $scope.rulesPage.page = page;
                    $http.post(url + '/Rules/listPageRules',{Rules:$scope.rulesPage}).success(callback)
                };
                $scope.searchPaginatorRules = app.get('Paginator').list(fetchFunction,6);
            };
            //进来后便进行分页
            $scope.jumpToRules();
            //$scope.itemFirstRules=$scope.searchPaginator.object.ruless[1];
            /**
             * 显示小区公告内容
             */
            $scope.itemInfoCommunity="";
            $scope.showCommunityTag=0;
            $scope.showCommunityInfo=function(item){
                $scope.itemInfoCommunity = item;
                $scope.showCommunityTag=1;
                if(item.briefContent==undefined){
                    item.briefContent="";
                }
                $('#textCommunity').html(item.briefContent);
            };
            /**
             * 显示内部公告内容
             */
            $scope.itemInfoInternal="";
            $scope.showInternalTag=0;
            $scope.showInternalInfo=function(item){
                $scope.itemInfoInternal = item;
                $scope.showInternalTag=1;
                if(item.content==undefined){
                    item.content="";
                }
                $('#textInternal').html(item.content);
            };

            /**
             * 显示企业新闻内容
             */
            $scope.itemInfoCorporate="";
            $scope.showCorporateTag=0;
            $scope.showCorporateInfo=function(item){
                $scope.itemInfoCorporate = item;
                $scope.showCorporateTag=1;
                if(item.detailedInformation==undefined){
                    item.detailedInformation="";
                }
                $('#textCorporate').html(item.detailedInformation);
            };

            /**
             * 点击内部公告五个列表，显示详细信息
             */
            $scope.internalDetailInfoInFive="";
            $scope.showInternalDetailInfoInFive=function(item){
                $scope.internalDetailInfoInFive=item;
                if(item.content==undefined){
                    item.content="";
                }
                $('#textInternalFive').html(item.content);
            };

            /**
             * 点击小区公告五个列表，显示详细信息
             */
            $scope.CommunityDetailInfoInFive="";
            $scope.showCommunityDetailInfoInFive=function(item){
                $scope.CommunityDetailInfoInFive=item;
                if(item.briefContent==undefined){
                    item.briefContent="";
                }
                $('#textCommunityFive').html(item.briefContent);
            };

            /**
             * 点击企业新闻五个列表，显示详细信息
             */
            $scope.CorporateDetailInfoInFive="";
            $scope.showCorporateDetailInfoInFive=function(item){
                $scope.CorporateDetailInfoInFive=item;
                if(item.detailedInformation==undefined){
                    item.detailedInformation="";
                }
                $('#textCorporateFive').html(item.detailedInformation);
            };

            /**
             * 点击规章制度五个列表，显示详细信息
             */
            $scope.RulesInFive="";
            $scope.showRulesInfoInFive=function(item){
                $scope.RulesInFive=item;
                if($scope.RulesInFive.annexs!=null) {
                    if (angular.isArray($scope.RulesInFive.annexs)) {
                        console.log("是数组");
                    } else {
                        $scope.annexList = [];
                        $scope.annexList.push($scope.RulesInFive.annexs);
                        $scope.RulesInFive.annexs = $scope.annexList;
                        console.log("不是数组");
                    }
                }
            };

            /**
             * 显示规章制度内容
             */
            $scope.itemInfoRules="";
            $scope.showRulesTag=0;
            $scope.showRulesInfo=function(item){
                $scope.itemInfoRules = item;
                $scope.showRulesTag=1;
                if($scope.itemInfoRules.annexs!=null) {
                    if (angular.isArray($scope.itemInfoRules.annexs)) {
                        console.log("是数组");
                    } else {
                        $scope.annexList = [];
                        $scope.annexList.push($scope.itemInfoRules.annexs);
                        $scope.itemInfoRules.annexs = $scope.annexList;
                        console.log("不是数组");
                    }
                }
            };
        }]);
});
    
