/**
 * Created by NM on 2016/1/21.
 *
 */
'use strict';

define(function (require) {
    var app = require('../app');

    app.controller('indexCtrl', ['$scope','$cookieStore','$http','$rootScope','$cookies', function ($scope,$cookieStore,$http,$rootScope,$cookies) {
        var filePath='';          //上传文件的路径
        var fileUrl = $rootScope.fileUrl;           //获取请求路径
        var url = $rootScope.url;//后台路径
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        var user={};
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        //$scope.cookieTipModal = $cookieStore.get("TIP");      //获取cookies中的TIP对象
        $scope.cookieTipModal = $cookies.getObject("TIP");     //获取cookies中的TIP对象
        var checkB = true;
        if($scope.cookieTipModal != undefined){
            document.getElementById("showNextTime").checked = $scope.cookieTipModal.checkbox;
            if($scope.cookieTipModal.checkbox){
                checkB = false;
            }
        }
        if(($rootScope.loginState==1)&&checkB) {
            angular.element('#tipModal1').css('display','block');
        }
        $rootScope.loginState=0;
        //屏幕适配
        $scope.loadDefault=function(){

            var wWidth = $(window).width();
            var wHeight = $(window).height();
            $(".left").height(wHeight-70);
            $(".content").height(wHeight-100);
            //angular.element('#tipModal1').modal('show');
            //$('#tipModal1').modal('show');
        };
        $scope.loadDefault();
      //  alert("我要修改logo");
        console.log($scope.user.userId);
        //
        var userId = $scope.user.userId;
        var companyId = $scope.user.companyId;
        $http.get(url + '/PersonCustNew/getLogoByIdRestful/' + companyId).success(function (date) {
            //console.log(date.Annex[0].annexAddress);
            //取出截取好路径filePath:/upload\20160708\20160708144051_301.jpg
            //filePath=date.Annex[0].annexAddress;
            if(date.Annex.length!=0||date.annex!=undefined) {
                filePath=date.Annex[0].annexAddress;
                var path = filePath.substring(filePath.lastIndexOf('\\') + 1);
                //修改logo样式
                filePath = filePath.replace(/\\/g, '/');
                $(".logo").css({
                    "background": "url(" + fileUrl + filePath + ")",
                    'background-size': '126px 47px'
                }).css("height", "47px");
            }
        }).error(function (data, status, headers, config) {
            layer.msg('查询出错！',{icon:0,time:1000});
        });
        /**
         * 提示框部分
         */
        $scope.showTipModal1=1;
        $scope.showTipModal2=0;
        $scope.showTipModal3=0;
        //angular.element('tipModal').modal('show');
        //下一步操作
        $scope.nextStep= function () {
            /*if(($scope.showTipModal1==1)&&($scope.showTipModal2==0)&&($scope.showTipModal3==0)) {
                $scope.showTipModal1 = 0;
                $scope.showTipModal2 = 1;
                $scope.showTipModal3 = 0;
            }
            else if(($scope.showTipModal1==0)&&($scope.showTipModal2==1)&&($scope.showTipModal3==0)) {
                $scope.showTipModal1 = 0;
                $scope.showTipModal2 = 0;
                $scope.showTipModal3 = 1;
            }*/
            $scope.showTipModal1+=1;
        };
        //上一步操作
        $scope.lastStep= function () {
            /*if(($scope.showTipModal1==0)&&($scope.showTipModal2==1)&&($scope.showTipModal3==0)) {
                $scope.showTipModal1 = 1;
                $scope.showTipModal2 = 0;
                $scope.showTipModal3 = 0;
            }
            else if(($scope.showTipModal1==0)&&($scope.showTipModal2==0)&&($scope.showTipModal3==1)) {
                $scope.showTipModal1 = 0;
                $scope.showTipModal2 = 1;
                $scope.showTipModal3 = 0;
            }*/
            $scope.showTipModal1-=1;
        };

        $scope.closeTipModal= function () {
            angular.element('#tipModal1').css('display','none');
        };

        $scope.setCheckBoxState = function () {
            var checked = $("input[type='checkbox']").is(':checked');
            if(checked){
               /* $cookieStore.put("TIP",{
                    checkbox:checked
                },{'expires':expireDate.toUTCString()});*/
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 30);//设置cookie保存30天
                $cookies.putObject("TIP", {checkbox:checked}, {'expires': expireDate});
            }else{
                //$cookieStore.remove("USER");
                /*$cookieStore.put("TIP",{
                    checkbox:unchecked
                },{'expires':expireDate.toUTCString()});*/
                $cookies.remove("TIP");
            }
        }
    }]);
});

