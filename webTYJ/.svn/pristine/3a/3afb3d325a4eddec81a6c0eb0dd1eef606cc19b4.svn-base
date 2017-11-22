/**
 * Created by NM on 2018/1/18.
 * 放行条js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historicRecordsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.articleRelease = {page:{}};
        var url=$rootScope.url;
        console.log($rootScope.user.custId);

        $scope.load = function(){
            var fetchFunction = function (page, callback) {
                $scope.articleRelease.custId = $rootScope.user.custId;
                $scope.articleRelease.page = page;
                $http.post(url + '/ArticleRelease/listPageArticleReleaseByPersonId',{ArticleRelease:$scope.articleRelease}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);
        };
        $scope.load();
        //$http.get(url+'/ArticleRelease/listAllArticleReleaseByPersonId/'+$rootScope.user.custId).success(function(data)
        //{
        //    console.log("搜索放行条成功");
        //    $scope.articleRelease=data.ArticleRelease;
        //    console.log(data.ArticleRelease);
        //}).error(function(){
        //    console.log("搜索放行条失败");
        //});


        $scope.showStatus=1;

        //网格切换
        $scope.tabview=function(){
            $scope.showStatus=0;
        }
        //列表
        $scope.listview=function(){
            $scope.showStatus=1;
        }


        //历史记录
        $scope.showNoContain = false;
        $scope.lishi={};

        $scope.xiang=function(history)
        {
            $scope.Contain_arr_y = [];
            $scope.Contain_arr_n = [];
            var count = 0;
            var _noContain = $scope.noContain = history.item;
            $scope.lishi=history;
            $("#output").empty();
            //二维码
            $("#output").qrcode({
                width: 200,
                height:200,
                text: toUtf8((""+$scope.lishi.releaseCode))
            });
            $scope.lishi.releaseCode=history.releaseCode;
            console.log($scope.lishi);
            if(angular.isArray($scope.lishi.item)){
                $scope.Contain_arr_y = $scope.lishi.item;
                $scope.Contain_arr_n = $scope.lishi.item;
            }else{
                $scope.Contain_arr_y.push($scope.lishi.item);
                $scope.Contain_arr_n.push($scope.lishi.item)
            }
            if(_noContain.length>0){
                for(var j=0;j<_noContain.length;j++ ){
                    if(_noContain[j].contaitState == 0){
                        count++;
                    }
                }
            }
            if(count>0){
                $scope.showNoContain = true;
            }else{
                $scope.showNoContain = false;
            }

        }


        //转换为UTF-8
        function toUtf8(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for(i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                }
            }
            return out;
        }
        /**
         * 新建跳转
         */
        $scope.addRel = function()
        {
            $scope.doClick(2);
        };

    }]);
});