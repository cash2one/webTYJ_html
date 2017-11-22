/**
 * Created by 尹霞 on 2015/9/25.
 * 名称：银行托收办理js
 */

/**
 * Created by NM on 2018/1/18.
 * 银行托收办理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('bankNumberCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.userller={};
        var url = $rootScope.url;
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        var bool = angular.equals($scope.project,'')||angular.isUndefined($scope.project)||$scope.project == null;
        if(bool){
            $scope.projectName="";
        }else{
            $scope.projectName=$scope.project.projectName;
        }
        $scope.show4 = true;   //金融联行别列表
        $scope.show5 = false;   //修改金融联行别
        $scope.show6 = false;   //新增金融联行别
        /*******银行行别分页查询*************/
        $scope.bankNun={page:{}};
        $scope.initBankNunList=function(){
            $scope.btnIndex=3;
            $scope.btn_choice='';
            var fetchFunction=function(page,callback){
                $scope.bankNun.page=page;
                $http.post(
                    url + '/FinancialBankNum/listPageFinancialBankNum',{FinancialBankNum:$scope.bankNun}).success(callback);
            };
            $scope.searchPaginatorBankNum=app.get('Paginator').list(fetchFunction,6);
        };
        $scope.initBankNunList();
        /**
         * 提交银行行别的新建
         */
        $scope.saveFinanBankNumAll=function(){
            var bool = angular.equals($scope.finanBankNum.bankNum,'')||angular.isUndefined($scope.finanBankNum.bankNum);
            var bl = angular.equals($scope.finanBankNum.unionpayBankNum,'')||angular.isUndefined($scope.finanBankNum.unionpayBankNum);
            if(bool && bl){
                layer.msg('银行行别和银联银行行号应至少填写一个',{icon:0});
                return;
            }else{
                if(!bool){
                    if(/^[0-9]*$/.test($scope.finanBankNum.bankNum)==false){
                        layer.msg('行别必须为数字',{icon:0});
                        return;
                    }
                    if($scope.finanBankNum.bankNum.length != 2){
                        layer.msg('行别长度必须为2位',{icon:0});
                        return;
                    }
                }
                if(!bl){
                    if(/^[0-9]*$/.test($scope.finanBankNum.unionpayBankNum)==false){
                        layer.msg('银联银行行号必须为数字',{icon:0});
                        return;
                    }
                    if($scope.finanBankNum.unionpayBankNum.length != 4){
                        layer.msg('银联银行行号长度必须为4位',{icon:0});
                        return;
                    }
                }
            }
            if(angular.equals($scope.finanBankNum.bankName,'')||angular.isUndefined($scope.finanBankNum.bankName)){
                layer.msg('银行名称未填写',{icon:0});
                return;
            }
            if(angular.equals($scope.finanBankNum.bankNameSeq,'')||angular.isUndefined($scope.finanBankNum.bankNameSeq)){
                layer.msg('简称序列未填写',{icon:0});
                return;
            }else{
                if($scope.finanBankNum.bankNameSeq.length < 3){
                    layer.msg('简称序列必须大于等于3位',{icon:0});
                    return;
                }
                if( /^[a-zA-Z]*$/.test($scope.finanBankNum.bankNameSeq)==false){
                    layer.msg('简称序列必须为字母',{icon:0});
                    return;
                }
            }
            $http.post(url+'/FinancialBankNum/insertFinancialBankNum',{FinancialBankNum:$scope.finanBankNum}).success(function(data){
                if(angular.equals(data.code,'200')){
                    layer.msg(data.information,{icon:0});
                    $scope.showBankNum();
                }else if(angular.equals(data.code,'3001')){
                    layer.msg(data.information,{icon:0});
                }

            }).error(function(data, status, headers, config){
                layer.msg("添加失败",{icon:2});
            }) ;
        };
        /**
         * hulili 2016-06-23
         * 查询金融联银行行别详细信息
         */
        $scope.financialBankNum={};
        var bankNumId = '';
        $scope.editBankNum=function(){
            if($("input[name='financialBank']:checkbox:checked").length == 0){
                layer.msg('请选择一条信息', {icon: 0});
                return;
            }
            if($("input[name='financialBank']:checkbox:checked").length > 1){
                layer.msg('每次只能编辑一条信息',{icon:0});
                return;
            }
            $("input[name='financialBank']:checkbox:checked").each(function(){
                bankNumId = $(this).val();
            })
            $http.get(url + '/FinancialBankNum/getFinancialBankNumById/'+bankNumId).success(function(data){
                $scope.financialBankNum=data.FinancialBankNum;
                $scope.btnIndex=3;
                $scope.show4 = false;
                $scope.show5 = true;
                $scope.show6 = false;
            }).error(function(data, status, headers, config){
                layer.msg("查询失败，请重新选择",{icon:2});
            });
        };
        /**
         * maogaofei 2016-06-14
         * 修改保存银行行别
         */
        $scope.saveBankNumUpdate=function(){

            var bool = angular.equals($scope.financialBankNum.bankNum,'')||angular.isUndefined($scope.financialBankNum.bankNum);
            var bl = angular.equals($scope.financialBankNum.unionpayBankNum,'')||angular.isUndefined($scope.financialBankNum.unionpayBankNum);
            if(bool && bl){
                layer.msg('银行行别和银联银行行号应至少填写一个',{icon:0});
                return;
            }
            if(angular.equals($scope.financialBankNum.bankName,'')||angular.isUndefined($scope.financialBankNum.bankName)){
                layer.msg('银行名称未填写',{icon:0});
                return;
            }
            if(angular.equals($scope.financialBankNum.bankNameSeq,'')||angular.isUndefined($scope.financialBankNum.bankNameSeq)){
                layer.msg('简称序列未填写',{icon:0});
                return;
            }else{
                if( /^[a-zA-Z]*$/.test($scope.financialBankNum.bankNameSeq)==false){
                    layer.msg('简称序列必须为字母',{icon:0});
                    return;
                }
            }

            $http.post(url+'/FinancialBankNum/updateFinancialBankNum',{FinancialBankNum:$scope.financialBankNum}).success(function(data){
                if(angular.equals(data.code,'200')){
                    layer.msg(data.information,{icon:1});
                    $scope.searchPaginatorBankNum._load();
                    $scope.show4 = true;
                    $scope.show5 = false;
                    $scope.show6 = false;
                    $scope.d = false;
                }else if(angular.equals(data.code,'3001')){
                    layer.msg(data.information,{icon:0});
                }

            }).error(function(data, status, headers, config){
                layer.msg("修改失败",{icon:2});
            }) ;

        };
        /**
         * hulili 2016-6-23
         * 删除银行行别列表数据
         */
        $scope.deleteBankNum=function(){
            bankNumId="";
            if($("input[name='financialBank']:checkbox:checked").length == 0){
                layer.msg('请选择一条信息', {icon: 0});
                return;
            }
            $("input[name='financialBank']:checkbox:checked").each(function(){
                bankNumId += $(this).val()+",";
            })
            $http.get(url + '/FinancialBankNum/deleteFinancialBankNum/'+bankNumId).success(function(data){
                if(angular.equals(data.code,'200')){
                    layer.msg(data.information,{icon:0});
                    $scope.searchPaginatorBankNum._load();
                    $scope.d = false;
                }else if(angular.equals(data.code,'3001')){
                    layer.msg(data.information,{icon:0});
                }
            }).error(function(data, status, headers, config){
                layer.msg("删除失败，请重新选择",{icon:2});
            });
        };
        $scope.choiceRel=function(Relation){
            if(document.getElementById(Relation.financialBankNumId).checked==true){
                document.getElementById(Relation.financialBankNumId).checked = false;
                document.getElementById(Relation.financialBankNumId).parentNode.parentNode.style.background = '';
            }else{
                document.getElementById(Relation.financialBankNumId).checked = true;
                document.getElementById(Relation.financialBankNumId).parentNode.parentNode.style.background = '#f6f8fa';
            }
        };

        /**
         * 新增行别
         */
        $scope.addBankNum=function(){
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.show6 = true;
            $scope.finanBankNum={
                bankNum:'',
                bankName:'',
                bankNameSeq:''
            };
        };


        $scope.showBankNum=function(){
            $scope.show4 = true;
            $scope.show5 = false;
            $scope.show6 = false;
            $scope.d = false;
            $scope.initBankNunList();
        };
    }]);
});
