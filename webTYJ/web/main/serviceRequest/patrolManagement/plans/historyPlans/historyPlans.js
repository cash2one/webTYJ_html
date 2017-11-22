/**
 * Created by 杨升权 on 2016/7/29.
 */
'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historyPlansCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        //分页显示
        $scope.inspectionPlan={page:{}};
        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.inspectionPlan.page = page;
                $scope.inspectionPlan.state='0';
                $http.post(url + '/InspectionPlan/listPageInspectionPlanByState', {InspectionPlan: $scope.inspectionPlan}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log( $scope.searchPaginator);
        };
        $scope.load();

        //得到操作的对象
        $scope.object1={};
        $scope.open=function(data){
            $scope.object1=data;
            /*if($scope.object1.state==0){
             alert("该方案已失效");
             }/!*else if($scope.object1.state==2){
             alert("该方案已启用");
             }*!/else{*/
            layer.confirm('是将方案改为有效？',{
                btn : ['确定','取消']
            },function(){
                $scope.object1.state=1;
                $http.put(url+'/InspectionPlan/updateByPrimary',{InspectionPlan:$scope.object1}).success(function(){
                    layer.msg("修改成功",{icon : 1});
                    $scope.load();
                }).error(function(data, status, headers, config){
                    layer.msg("修改失败",{icon : 0});
                }) ;
            },function(){});



        };


        //查看
        $scope.inspectionPlanId='';
        $scope.show=function(data){
            $scope.inspectionPlanId=data.inspectionPlanId;
            $http.get(url + '/InspectionPropertyCheckItem/selectInspectionPropertyCheckItemById/'+$scope.inspectionPlanId).success(function(data){
                $scope.checkItem=data.InspectionPropertyCheckItem;
            }).error(function(data, status, headers, config) {

            });
            $("#detail").modal("show");
        };
        //失效
        $scope.close=function(data){
            $scope.object1=data;
            if($scope.object1.state==0){
                layer.msg("该方案已是失效状态");
            }else{
                $("#novail").modal("show");
            }

        };

        //失效保存
        $scope.saveUpdate=function(data){
            $scope.object1.state=0;
            $http.put(url+'/InspectionPlan/updateByPrimary',{InspectionPlan:$scope.object1}).success(function(){
                layer.msg("修改成功");
                $scope.load();
                $scope.object1='';
            }).error(function(data, status, headers, config){
                layer.msg("修改失败");
            }) ;
        };

        $scope.grids=false;
        $scope.list=function(){
            $scope.grids=true;

        }
        $scope.gridChange=function(){
            $scope.grids=false;
        }


        $scope.getData = function(item){
            var allData = $scope.searchPaginator.object.inspectionPlan.slice(1);
            var num = [];
            $scope.chooseData = {datas: []};
            for(var i=0;i<allData.length;i++)
            {
                if(item.inspectionPlanId == allData[i].inspectionPlanId)
                {
                    if(document.getElementById(item.inspectionPlanId).checked)
                    {
                        document.getElementById(item.inspectionPlanId).checked = false;
                        document.getElementById(item.inspectionPlanId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;

                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].inspectionPlanId != item.inspectionPlanId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.inspectionPlanId).checked = true;
                        document.getElementById(item.inspectionPlanId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].inspectionPlanId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        //allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };

    }]);
});
