/**
 * Created by Administrator on 2015/10/29.
 * newContractCheck
 */

        'use strict';

        define(function (require) {
            var app = require('../../../../app');
            app.controller('newContractCheckCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;  //全局访问路径
        $scope.showBuilding=false;
        $scope.contract = {page:{}};
        $scope.showBuilding=false;

        $scope.load = function(){
            /**
             * 查询所有合同
             */
            var checkFunction = function(page,callback){
                $scope.contract.page = page;
                /**
                 * BUG 393 陶勇超 2016年1月15日 15:18:43
                 * @type {Date}
                 */
                var d1 = new Date($scope.contract.startTime);
                var d2 = new Date( $scope.contract.endTime);

                if($scope.contract.startTime!=""&& $scope.contract.endTime!=""&&d1 >=d2)
                {
                    layer.alert("查询开始时间不能大于查询结束时间！",{icon:0});
                    return false;
                }
                $http.post(url+'/Contract/listPageContract',{Contract:$scope.contract}).success(callback);
            };

            $scope.checkItem = app.get('Paginator').list(checkFunction,5);
         console.log($scope.checkItem);
        };
        //加载数据
        $scope.load();
        /**
         *  禅道BUG 249
         修改人：陶勇超
         2016年1月8日 16:28:56
         */
        //获取所有项目信息
        $scope.allProjects;
        $http.get(url+'/Project/listAllProject').success(function(data){
            $scope.allProjects=data.Project;
        });
        $scope.dele=function(){
            if($scope.d==false){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else
            /**
             * 禅道BUG 247
             * 修改人：陶勇超
             * 2016年1月8日 14:34:29
             */
            { layer.confirm("您确定要删除选中的合同？",
                {btn : ['是','否']},function(){
                    $http.delete(url + '/Contract/deleteContract/'+ $scope.accountRecord.id).success(function(data) {
                        layer.msg("删除成功",{icon:1,time:2000})
                        $scope.load();
                    }).error(function(data,status,headers,config){
                        layer.alert('删除出错,请重试！',{icon : 2});
                    });
                })}

        };
        $scope.showCheck=function(item){
            $scope.btnIndex=item
        }
        $scope.addContra=function(){
            $location.path("/index/baseManagement/newContractInitialization/newAddContract");
            $scope.doClick(1)
        }
        $scope.datas=[]
        $scope.search={contractId:'',propertyId:''};
        $scope.findContract=function(item){
            $scope.btnIndex=item;
            $scope.showBuilding=false;
            $("#neworlostModal").modal("show");
            $scope.dds=item;
            console.log(   $scope.dds );
            $http.get(url + '/ContractPropertyStructure/getContractPropertyStructureById/'+item.id).success(function(data) {

                $scope.datas = data.ContractPropertyStructure;
                //console.log(   $scope.datas );
                /**
                 * 禅道BUG  103
                 * 修改人：陶勇超
                 * 2016年1月7日 17:55:15
                 * @type {string|$scope.search.contractId|$scope.datab.contractId|$scope.CassetRepository.contractId}
                 */
                $scope.search.contractId=    $scope.datas[0].contractId;
                $scope.search.propertyId=    $scope.datas[0].propertyId;
                $http.post(url+'/ContractPropertyStructure/selectBuildingById',{ContractPropertyStructure:$scope.search}).success(function(data)
                {
                    $scope.builds=data.ContractPropertyStructure;
                    //  console.log($scope.builds);
                    $scope.showBuilding=true;
                }).error(function(data, status, headers, config){
                    layer.alert("添加失败",{icon:2});
                });
            });
        };

        $scope.getBuilding=function(aaa){
            $scope.search.contractId=aaa.contractId;
            $scope.search.propertyId=aaa.propertyId;
            $http.post(url+'/ContractPropertyStructure/selectBuildingById',{ContractPropertyStructure:$scope.search}).success(function(data)
            {
                $scope.builds=data.ContractPropertyStructure;
              //  console.log($scope.builds);
                $scope.showBuilding=true;
            }).error(function(data, status, headers, config){
               layer.alert("添加失败",{icon:2});
            });


        };
        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.accountRecord=item;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };
    }])
});