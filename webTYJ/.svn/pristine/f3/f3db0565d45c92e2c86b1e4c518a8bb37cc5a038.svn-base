/**
 * Created by NM on 2018/1/18.
 * 产权变更JS
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('changeTitleCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(1);
        $scope.doClick(10);

        $scope.btnIndex = 1;
        $scope.doClick = function(index){
            $scope.btnIndex = index;
            if(index == 1){
                $scope.showAssets=true;
                $scope.showProperty=false;
                $scope.showHouse=true;
                $scope.showStore=false;
                $scope.showStall=false;
                $scope.showHistory=false;
                $scope.showHistoryDetail=false;
            }
            if(index == 3){
                $scope.showAssets=false;
                $scope.showProperty=false;
                $scope.showHouse=false;
                $scope.showStore=false;
                $scope.showStall=false;
                $scope.showHistory=true;
                $scope.showHistoryDetail=false;

                $http.get(url + "/ChangeTitle/getChangeTitleHistoryByCustId/" +$rootScope.user.custId ).success(function(data){
                    $scope._ChangeTitleHistory = data.ChangeTitle;
                });
            }
        }

        $scope.showAssets=true;
        $scope.showProperty=false;
        $scope.showHouse=true;
        $scope.showStore=false;
        $scope.showStall=false;
        $scope.showHistory=false;
        $scope.showHistoryDetail = false;
        $scope.showHistoryHouse = false;
        $scope.showHistoryStore = false;
        $scope.showHistoryStall = false;
        //循环显示房屋信息
        $scope.property={};
        var url = $rootScope.url;
        // $scope.name=$rootScope.user.name
        //通过办理人ID查询出办理人和授权人的房屋信息
        $scope.allHouse={};
        $scope.allHouse.custId=$rootScope.user.custId;//办理人
        $scope.allHouse.personBuildingState=0;
        $scope.allHouse.ropertyChanges=1;//授权了产权变更
        $scope.allHouse.projectType='d9a9a4ae-3b67-46a0-a24a-1d39734af744';//授权项目类型ID
        // $scope.allHouse.carportManage=1;//授权了车位管理
        $http.post(url + '/PersonCustNew/propertyServiceAuSearch',{Search:$scope.allHouse}).success(function(data) {
            $scope.houseInfo = data.propertyService.houses;
            $scope.storeInfo=data.propertyService.stores;
            $scope.stallInfo=data.propertyService.stalls;
        }).error(function(){
            layer.msg('搜索房屋失败', {icon: 5});
        });

        //跳转到房屋产权变更模块
        $scope.switchHouseProperty=function(items){
            $scope.addChange={};
            $scope.btnIndex = 2;
            $scope.property={};
            $scope.houseone=items;
            $scope.showAssets=false;
            $scope.showProperty=true;
            $scope.showHistoryDetail = false;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = false;
            $scope.showHouse=true;
            $scope.showStore=false;
            $scope.showStall=false;
            $scope.postHouse=items;
            $scope.property.housesId=items.id;
            $scope.property.buildingStructureId=items.buildingStructureId;
            $http.get(url + '/PersonBuildingNew/listPersonBuildingNewone/'+items.buildingStructureId).success(function(data) {
                $scope.personsnew=data.PersonBuildingNew;
                if(angular.isArray($scope.personsnew)){
                    for(var i=0;i<$scope.personsnew.length;i++){
                        if($scope.personsnew[i].custType="户主"&&$scope.personsnew[i].state==0){
                            $scope.name=$scope.personsnew[i].name;
                        }
                    }
                }else{
                    $scope.name = $scope.personsnew.name;
                }
            }).error(function(){
                layer.msg('搜索人员建筑关系失败', {icon: 5});
            });
        };

        //跳转到商铺产权变更模块
        $scope.switchStoreProperty=function(items){
            $scope.addChange={};
            $scope.btnIndex = 2;
            $scope.property={};
            $scope.storeone=items;
            $scope.showAssets=false;
            $scope.showProperty=true;
            $scope.showHouse=false;
            $scope.showStore=true;
            $scope.showStall=false;
            $scope.showHistoryDetail = false;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = false;
            $scope.postHouse=items;
            $scope.property.storeId=items.storeId;
            $scope.property.buildingStructureId=items.buildingStructureId;
            $http.get(url + '/PersonBuildingNew/listPersonBuildingNewone/'+items.buildingStructureId).success(function(data) {
                $scope.personsnew=data.PersonBuildingNew;
                if(angular.isArray($scope.personsnew)){
                    for(var i=0;i<$scope.personsnew.length;i++){
                        if($scope.personsnew[i].custType="户主"&&$scope.personsnew[i].state==0){
                            $scope.name=$scope.personsnew[i].name;
                        }
                    }
                }else{
                    $scope.name = $scope.personsnew.name;
                }
            }).error(function(){
                layer.msg("搜索人员建筑关系失败",{icon :5,time:1000});
            });
        };

        //跳转到车位产权变更模块
        $scope.switchStallProperty=function(items){
            $scope.addChange={};
            $scope.btnIndex = 2;
            $scope.property={};
            $scope.stallone=items;
            $scope.showAssets=false;
            $scope.showProperty=true;
            $scope.showHouse=false;
            $scope.showStore=false;
            $scope.showStall=true;
            $scope.showHistoryDetail = false;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = false;
            $scope.property.stallId=items.stallId;
            $scope.property.buildingStructureId=items.buildingStructureId;
            $http.get(url + '/PersonBuildingNew/listPersonBuildingNewone/'+items.buildingStructureId).success(function(data) {
                $scope.personsnew=data.PersonBuildingNew;
                if(angular.isArray($scope.personsnew)){
                    for(var i=0;i<$scope.personsnew.length;i++){
                        if($scope.personsnew[i].custType="户主"&&$scope.personsnew[i].state==0){
                            $scope.name=$scope.personsnew[i].name;
                        }
                    }
                }else{
                    $scope.name = $scope.personsnew.name;
                }
            }).error(function(){
                layer.msg("搜索人员建筑关系失败",{icon :5,time:1000});
            });
        };



        //跳转到房屋历史页面
        $scope.switchHistorHose = function(items){
            $scope.showAssets=false;
            $scope.showProperty=false;
            $scope.showHistoryDetail = true;
            $scope.showHistoryHouse = true;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = false;
            $scope.showHouse=false;
            $scope.showStore=false;
            $scope.showStall=false;
            $scope.showHistory = false;
            $scope.houseHistory = items;
            //console.log(items);
        }
        //跳转到商铺历史页面
        $scope.switchHistorStore = function(items){
            $scope.showAssets=false;
            $scope.showProperty=false;
            $scope.showHistoryDetail = true;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = true;
            $scope.showHistoryStall = false;
            $scope.showHouse=false;
            $scope.showStore=false;
            $scope.showStall=false;
            $scope.showHistory = false;
            $scope.storeHistory = items;
            //console.log(items);
        }
        //跳转到车位历史页面
        $scope.switchHistorStall = function(items){
            $scope.showAssets=false;
            $scope.showProperty=false;
            $scope.showHistoryDetail = true;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = true;
            $scope.showHouse=false;
            $scope.showStore=false;
            $scope.showStall=false;
            $scope.showHistory = false;

            $scope.stallHistory = items;
            //console.log(items);
        }


        /**
         * 根据条件搜索人员信息
         * @type {{page: {}}}
         */
        $scope.searchone={page:{}};
        $scope.selectPerson=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(parent,4);
            //console.log($scope.searchPaginator);
        };
        $scope.arrearagePayAdd=function(){
            $scope.selectPerson();
        }
        //选中人员
        var person11={};//选中人员的第三变量
        $scope.personone={};
        $scope.choicePerson=function(person){
            $scope.btnIndex =person;
            person11=person;
            //console.log($scope.personone);
        };



        //将产权变更数据提交到后台
        $scope.addChange={};
        $scope.addChangeTitle=function(){
            if($scope.addChange.pactId==null||$scope.addChange.pactId==""){
                layer.msg("请输入合同编号",{icon :0,time:1000});
                return;
            }else if($scope.addChange.buyDate==null){
                layer.msg("请选择认购日期",{icon :0,time:1000});
                return;
            }else if($scope.addChange.signContractDate==null){
                layer.msg("请选择签约日期",{icon :0,time:1000});
                return;
                /**BUG 508 陈浪 2016.3.10*/
            }else if( $scope.addChange.buyDate > $scope.addChange.signContractDate){
                layer.msg("签约日期不能小于认购日期！",{icon :0,time:1000});
                return;
            }else if($scope.person2==null){
                layer.msg("请选择新产产权人",{icon :0,time:1000});
                return;
            }else if($scope.property.arrearagePay == null){
                layer.msg("请选择欠费承担人",{icon :0,time:1000});
                return;
            }else if($scope.person2.custId==$rootScope.user.custId){
                layer.msg("旧产权人不能和新产权人为同一人",{icon :0,time:1000});
                return;
            }

            if( $scope.property.housesId!=null){

                $scope.addChange.houseId=$scope.property.housesId;
            }
            if($scope.property.stallId!=null){
                $scope.addChange.stallId=$scope.property.stallId;
            }
            if($scope.property.storeId!=null){
                $scope.addChange.storeId= $scope.property.storeId;
            }

            $scope.addChange.custId= $rootScope.user.custId;//旧产权人id
            $scope.addChange.custName = $rootScope.user.name;
            $scope.addChange.newCustId= $scope.person2.custId;//新产权人id
            $scope.addChange.newCustName = $scope.person2.name;
            $scope.addChange.arrearagePay = $scope.property.arrearagePay;
            $scope.personbuilding={};
            $scope.personbuilding.buildingStructureId=$scope.property.buildingStructureId;
            $scope.personbuilding.custId=$scope.person2.custId;
            $scope.personbuilding.custType="业主";
            $scope.addChange.personBuildingNew= $scope.personbuilding;

            $http.post(url+'/ChangeTitle/changeProperty',{ChangeTitle:$scope.addChange}).success(function()
            {
                layer.msg("提交成功!",{icon :1,time:1000});
                $scope.clearChangeTitle();
                $scope.repeatChangeTitle();
                $scope.load_BuildingStructureNew();
            }).error(function(){
                layer.msg("提交失败!",{icon :2,time:1000});
            });

        };

        //返回产权变更开始页面
        $scope.repeatChangeTitle=function(){
            $scope.showAssets=true;
            $scope.showProperty=false;
            $scope.showHouse=true;
            $scope.showStore=false;
            $scope.showStall=false;

            $scope.showHistoryDetail = false;
            $scope.showHistoryHouse = false;
            $scope.showHistoryStore = false;
            $scope.showHistoryStall = false;
            //循环显示房屋信息
            $scope.property={};
            // $scope.name=$rootScope.user.name
            //通过办理人ID查询出办理人和授权人的房屋信息
            $scope.allHouse={};
            $scope.allHouse.custId=$rootScope.user.custId;//办理人
            $scope.allHouse.personBuildingState=0;
            $scope.allHouse.ropertyChanges=1;//授权了产权变更
            $scope.allHouse.projectType='d9a9a4ae-3b67-46a0-a24a-1d39734af744';//授权项目类型ID
            $http.post(url + '/PersonCustNew/propertyServiceAuSearch',{Search:$scope.allHouse}).success(function(data) {
                $scope.houseInfo = data.propertyService.houses;
                $scope.storeInfo=data.propertyService.stores;
                $scope.stallInfo=data.propertyService.stalls;
            }).error(function(){
                layer.msg("搜索房屋失败",{icon :5,time:1000});
            });
        };

        $scope.$watch('radio',function(){

            //console.log($scope.radio);

        })

        //清除产权变更信息
        $scope.clearChangeTitle=function(){
            $scope.addChange={};
            $scope.person2={};
        };
        $scope.choicePersonok=function(){
            $scope.person2=person11;
        };

    }]);
});