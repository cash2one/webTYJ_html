/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('releaseBarInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(3);
        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };


        $scope.articleRelease = {page:{}};
        var url=$rootScope.url;
        $scope.load = function(){
            var fetchFunction = function (page, callback) {
                $scope.articleRelease.page = page;
                $http.post(url + '/ArticleRelease/listPageArticleReleaseByContion',{ArticleRelease:$scope.articleRelease}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };
        $scope.load();

        //查看详情
        $scope.lishi={};
        $scope.datil=function(history){
            $('#modifyPet').modal({backdrop: 'static', keyboard: false});
            $scope.Contain_arr_y = [];
            $scope.Contain_arr_n = [];
            var count = 0;
            var _noContain = $scope.noContain = history.item;
            $scope.lishi=history;
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

    }]);
});