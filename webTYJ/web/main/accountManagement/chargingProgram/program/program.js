/**
 * Created by NM on 2018/1/18.
 * 账单js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('programsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //url
        var url = $rootScope.url;
        //项目
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        //项目ID
        var projectId =  $scope.project.projectId;

        var user = {employId : ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        var companyId= $scope.user.companyId; //获取登录人员的公司Id

        $scope.doClick(1);
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.chargeItemBilling={chargeItemBillingId:'',projectBillingId:'',buildingBillingId:''};

        /**
         * maogaofei 20160711
         * 根据条件查询项目计费列表
         */
        $scope.projectBilling={page:{}};
        $scope.getProjectBillingList = function(){
            $scope.projectBilling={page:{}};
            var fetchFunction=function(page,callback){
                $scope.projectBilling.page=page;
                $scope.projectBilling.projectId=projectId;
                $http.post(
                    url + '/ProjectBilling/listPageProjectBilling',{ProjectBilling:$scope.projectBilling}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);
            $scope.schemeMapp=[];
            $scope.projectBillingMap=[];
            $scope.chargeTypeProjectBillingMap=[];
        }
        $scope.getProjectBillingList();

        /**
         * maogaofei 20160712
         * 得到选中的项目计费记录
         */
        $scope.projectBillingMap=[];
        $scope.getProjectBillCheck=function(item){
            var chk = document.getElementById(item.projectBillingId);
            if(chk.checked == true){
                $scope.projectBillingMap.push(item);
                $(chk).parent().parent().css('background','#f6f8fa')
            }else{
                for(var i=0;i<$scope.projectBillingMap.length;i++){
                    if($scope.projectBillingMap[i].projectBillingId == item.projectBillingId){
                        $scope.projectBillingMap.splice(i,1);
                        $(chk).parent().parent().css('background','#fff')
                    }
                }
            }
        };

        /**
         * maogaofei 20160711
         * 获取当前可用的手动计费方案列表
         */
        $scope.showScheme=function(){
            $scope.newShowScheme={};
            $scope.newShowScheme.projectId=projectId;
            $http.post(url + "/Scheme/getManualSchemeList",{Scheme:$scope.newShowScheme}).success(function(data){
                $scope.schemeList = data.Scheme;
                if($scope.schemeList.length == 0){
                    layer.msg("没有可用的计费方案或者上月已经手动计费过!",{icon:0,time:1000});
                }else{
                    angular.element("#new2").modal({backdrop: 'static', keyboard: false});
                }
            }).error(function(){
                layer.msg("查询方案失败!",{icon:2,time:1000});
            });
        };
        /**
         * maogaofei 20160711
         * 计费方案的选择
         */
        $scope.schemeMapp=[];
        $scope.getSchemeCheck=function(item){
            var che = document.getElementById(item.schemeId);
            if(che.checked == true){
                $scope.schemeMapp.push(item);
            }else{
                for(var i = 0; i < $scope.schemeMapp.length; i ++){
                    if($scope.schemeMapp[i].schemeId== item.schemeId){
                        $scope.schemeMapp.splice(i,1);
                    }
                }
            }
        };

        /**
         * maogaofei 20160711
         * 确定手动计费
         */
        $scope.manualBilling=function(){
            if($scope.schemeMapp.length>0){
                $scope.arr=[];
                for(var i = 0; i < $scope.schemeMapp.length; i ++){
                    $scope.arr.push($scope.schemeMapp[i].schemeId);
                }
                angular.element("#handleIng_show").modal("show");
                $http.get(url + "/ChargeTypeDetailsBuildingBilling/manualBilling/"+projectId+"/"+$scope.arr.join(",")).success(function(data){
                    $scope.getProjectBillingList();
                    $scope.arr = [];
                    angular.element("#handleIng_show").modal("hide");
                    layer.msg("操作成功!",{icon:1,time:1000});
                }).error(function(){
                    angular.element("#handleIng_show").modal("hide");
                    layer.msg("操作失败!",{icon:2,time:1000});
                });
            }else{
                layer.msg('请先选择计费方案！',{icon:0,time:1000});
            }

        };

        /**
         * maogaofei 20160712
         * 根据选中的项目计费记录重新计费
         */
        $scope.reatartAccounting=function(){
            if($scope.projectBillingMap.length>0){
                layer.confirm('确认重新计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.projectBillingIds=[];
                    for(var i = 0; i < $scope.projectBillingMap.length; i ++){
                        $scope.projectBillingIds.push($scope.projectBillingMap[i].projectBillingId);
                    }
                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/reBilling/"+$scope.projectBillingIds.join(",")).success(function(data){
                        $scope.getProjectBillingList();
                        $scope.projectBillingIds = [];
                        $scope.projectBillingMap=[];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择项目计费记录！',{icon:0,time:1000});
            }
        };
        /**
         * maogaofei 20160714
         * 根据选中的项目计费记录确认计费
         */
        $scope.verifyAccounting=function(){
            if($scope.projectBillingMap.length>0){
                layer.confirm('确定确认计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.confirmProjectBillingIds=[];
                    for(var i = 0; i < $scope.projectBillingMap.length; i ++){
                        $scope.confirmProjectBillingIds.push($scope.projectBillingMap[i].projectBillingId);
                    }
                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/confirmProjectBilling/"+$scope.confirmProjectBillingIds.join(",")).success(function(data){
                        $scope.getProjectBillingList();
                        $scope.confirmProjectBillingIds = [];
                        $scope.projectBillingMap = [];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择项目计费记录！',{icon:0,time:1000});
            }
        };

        /**
         * maogaofei 20160711
         * 根据条件查询收费类型项目计费列表
         */
        $scope.getChargeTypeProjectBillings = function(id){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.chargeTypeProjectBilling={page:{},projectBillingId:''};
            $scope.schemeMapp=[];
            var fetchFunction=function(page,callback) {
                $scope.chargeTypeProjectBilling.projectBillingId = id;
                $scope.chargeTypeProjectBilling.page = page;
                $http.post(
                    url + '/ChargeTypeProjectBilling/listPageChargeTypeProjectBilling', {ChargeTypeProjectBilling: $scope.chargeTypeProjectBilling}).success(callback);
            }
            $scope.searchPaginator1=app.get('Paginator').list(fetchFunction,6);
        };

        /**
         * maogaofei 20160714
         * 得到选中的收费类型项目计费记录
         */
        $scope.chargeTypeProjectBillingMap=[];
        $scope.getChargeTypeProjectBillCheck=function(item){
            var chk = document.getElementById(item.chargeTypeProjectBillingId);
            if(chk.checked == true){
                $scope.chargeTypeProjectBillingMap.push(item);
                $(chk).parent().parent().css('background','#f6f8fa')
            }else{
                for(var i=0;i<$scope.chargeTypeProjectBillingMap.length;i++){
                    if($scope.chargeTypeProjectBillingMap[i].chargeTypeProjectBillingId == item.chargeTypeProjectBillingId){
                        $scope.chargeTypeProjectBillingMap.splice(i,1);
                        $(chk).parent().parent().css('background','#fff')
                    }
                }
            }
        };

        /**
         * maogaofei 20160714
         * 根据选中的收费类型项目计费记录确认计费
         */
        $scope.verifyAccounting1=function(){
            if($scope.chargeTypeProjectBillingMap.length>0){
                layer.confirm('确定确认计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.confirmChargeTypeProjectBillingIds=[];
                    for(var i = 0; i < $scope.chargeTypeProjectBillingMap.length; i ++){
                        $scope.confirmChargeTypeProjectBillingIds.push($scope.chargeTypeProjectBillingMap[i].chargeTypeProjectBillingId);
                    }
                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/confirmChargeTypeProjectBilling/"+$scope.confirmChargeTypeProjectBillingIds.join(",")).success(function(data){
                        $scope.searchPaginator1._load();
                        $scope.confirmChargeTypeProjectBillingIds = [];
                        $scope.chargeTypeProjectBillingMap=[];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择收费类型项目计费记录！',{icon:0,time:1000});
            }
        }

        /**
         * maogaofei 20160714
         * 根据选中的收费类型项目计费记录重新计费
         */
        $scope.reatartAccounting1=function(){
            if($scope.chargeTypeProjectBillingMap.length>0){
                layer.confirm('确认重新计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.chargeTypeProjectBillingIds=[];
                    for(var i = 0; i < $scope.chargeTypeProjectBillingMap.length; i ++){
                        $scope.chargeTypeProjectBillingIds.push($scope.chargeTypeProjectBillingMap[i].chargeTypeProjectBillingId);
                    }

                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/reChargeTypeProjectBilling/"+$scope.chargeTypeProjectBillingIds.join(",")).success(function(data){
                        $scope.searchPaginator1._load();
                        $scope.chargeTypeProjectBillingIds = [];
                        $scope.chargeTypeProjectBillingMap=[];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择收费类型项目计费记录！',{icon:0,time:1000});
            }
        };

        /**
         * maogaofei 20160711
         * 返回项目计费列表
         */
        $scope.back=function(){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.getProjectBillingList();
        };
        /**
         * maogaofei 20160712
         * 获取收费类型建筑计费列表
         */
        $scope.getChargeTypeBuildingBillings = function(id){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.chargeTypeProjectBillingMap=[];
            $scope.chargeTypeBuildingBilling={page:{},chargeTypeProjectBillingId:'',fullName:''};
            //**********根据项目计费id查询详情 **************/
            var fetchFunction=function(page,callback) {
                $scope.chargeTypeBuildingBilling.chargeTypeProjectBillingId = id;
                $scope.chargeTypeBuildingBilling.page = page;
                $http.post(
                    url + '/ChargeTypeBuildingBilling/listPageChargeTypeBuildingBilling', {ChargeTypeBuildingBilling: $scope.chargeTypeBuildingBilling}).success(callback);
            };
            $scope.searchPaginator2=app.get('Paginator').list(fetchFunction,6);
        };
        /**
         * maogaofei 20160714
         * 得到选中的收费类型建筑计费记录
         */
        $scope.chargeTypeBuildingBillingMap=[];
        $scope.getChargeTypeBuildingBillCheck=function(item){
            var chk = document.getElementById(item.chargeTypeBuildingBillingId);
            if(chk.checked == true){
                $scope.chargeTypeBuildingBillingMap.push(item);
                $(chk).parent().parent().css('background','#f6f8fa')
            }else{
                for(var i=0;i<$scope.chargeTypeBuildingBillingMap.length;i++){
                    if($scope.chargeTypeBuildingBillingMap[i].chargeTypeBuildingBillingId == item.chargeTypeBuildingBillingId){
                        $scope.chargeTypeBuildingBillingMap.splice(i,1);
                        $(chk).parent().parent().css('background','#fff')
                    }
                }
            }
        };
        /**
         * maogaofei 20160714
         * 根据选中的收费类型建筑计费记录确认计费
         */
        $scope.verifyAccounting2=function(){
            if($scope.chargeTypeBuildingBillingMap.length>0){
                layer.confirm('确定确认计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.confirmChargeTypeBuildingBillingIds=[];
                    for(var i = 0; i < $scope.chargeTypeBuildingBillingMap.length; i++){
                        $scope.confirmChargeTypeBuildingBillingIds.push($scope.chargeTypeBuildingBillingMap[i].chargeTypeBuildingBillingId);
                    }
                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/confirmChargeTypeBuildingBilling/"+$scope.confirmChargeTypeBuildingBillingIds.join(",")).success(function(data){
                        $scope.searchPaginator2._load();
                        $scope.confirmChargeTypeBuildingBillingIds = [];
                        $scope.chargeTypeBuildingBillingMap=[];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择收费类型建筑计费记录！',{icon:0,time:1000});
            }
        };
        /**
         * maogaofei 20160714
         * 根据选中的收费类型建筑计费记录重新计费
         */
        $scope.reatartAccounting2=function(){
            if($scope.chargeTypeBuildingBillingMap.length>0){
                layer.confirm('确认重新计费？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    angular.element("#handleIng_show").modal("show");
                    $scope.chargeTypeBuildingBillingIds=[];
                    for(var i = 0; i < $scope.chargeTypeBuildingBillingMap.length; i ++){
                        $scope.chargeTypeBuildingBillingIds.push($scope.chargeTypeBuildingBillingMap[i].chargeTypeBuildingBillingId);
                    }
                    $http.get(url + "/ChargeTypeDetailsBuildingBilling/reChargeTypeBuildingBilling/"+$scope.chargeTypeBuildingBillingIds.join(",")).success(function(data){
                        $scope.searchPaginator2._load();
                        $scope.chargeTypeBuildingBillingIds = [];
                        $scope.chargeTypeBuildingBillingMap=[];
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作成功!",{icon:1,time:1000});
                    }).error(function(){
                        angular.element("#handleIng_show").modal("hide");
                        layer.msg("操作失败!",{icon:2,time:1000});
                    });
                }, function(){
                });
            }else{
                layer.msg('请先选择收费类型建筑计费记录！',{icon:0,time:1000});
            }
        };

        /**
         * maogaofei 20160714
         * 返回收费类型项目计费列表
         */
        $scope.back1=function(){
            $scope.searchPaginator1._load();
            $scope.chargeTypeProjectBillingMap=[];
            $scope.chargeTypeBuildingBillingMap=[];
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
        };
        /**
         * maogaofei 20160711
         * 查看收费类型详情建筑计费列表
         */
        $scope.chargeTypeDetailsBuildingBillingList={};
        $scope.ctdBuildingBill=function(id){
            angular.element("#detail1").modal({backdrop: 'static', keyboard: false});
            $scope.newChargeTypeDetailsBuildingBilling = {};
            $scope.newChargeTypeDetailsBuildingBilling.chargeTypeBuildingBillingId = id;
            $http.post(url+'/ChargeTypeDetailsBuildingBilling/listAllChargeTypeDetailsBuildingBilling',
                {ChargeTypeDetailsBuildingBilling:$scope.newChargeTypeDetailsBuildingBilling}).success(function(data){
                $scope.chargeTypeDetailsBuildingBillingList=data.ChargeTypeDetailsBuildingBilling;
            });
        };
    }]);
});
