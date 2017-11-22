/**
 * Created by NM on 2018/1/18.
 * 人员信息js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('staffCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.shownum = 0;
        $scope.personCust={};
        $rootScope.user=JSON.parse(sessionStorage.getItem('person_property'));
        $scope.id=JSON.parse(sessionStorage.getItem("person_property")).custId;
        $scope.personVip={};
        $scope.personEmphasis={};
        $scope.btnIndex = 1;
        console.log($scope.id);
        //重点客户
        $http.get(url + '/PersonEmphasis/getPersonEmphasisState/'+$scope.id).success(function(data) {
            console.log(data);
            $scope.personEmphasis = data.PersonEmphasis;
        });
        //VIP客户
        $http.get(url + '/PersonVip/getPersonVipState/'+$scope.id).success(function(data) {
            console.log(data);
            $scope.personVip = data.PersonVip;
        });
        $scope.personCust=$rootScope.user;
        var date=new Date($scope.personCust.birthday);
        var a=new Date();
        $scope.age = a.getFullYear()-date.getFullYear();
        $scope.sums=0;

        //鼠标点击选中
        $scope.doClick = function(index){
            $scope.btnIndex = index;
            $scope.personVip={};
            $scope.personEmphasis={};

            //重点客户
            $http.get(url + '/PersonEmphasis/getPersonEmphasisState/'+$scope.id).success(function(data) {
                console.log(data);
                $scope.personEmphasis = data.PersonEmphasis;
                //VIP客户
                $http.get(url + '/PersonVip/getPersonVipState/'+$scope.id).success(function(data) {
                    console.log(data);
                    $scope.personVip = data.PersonVip;
                    if($scope.btnIndex ==17){
                        if($scope.personVip!=null&&$scope.personEmphasis!=null){
                            if($scope.personVip.vipEnd>$scope.personEmphasis.applyeddate){
                                $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                                return;
                            }else{
                                $location.path("/index/propertyService/staffHome/importantClients/request");
                                return;
                            }
                        }else if($scope.personVip==null&&$scope.personEmphasis==null){
                            $location.path("/index/propertyService/staffHome/importantClients/request");
                            return;
                        }else  if($scope.personVip!=null&&$scope.personEmphasis==null){
                            layer.alert('该客户已提交vip客户申请！',{icon : 0});
                            $location.path("/index/propertyService/staffHome");
                            return;
                        }else if($scope.personVip==null&&$scope.personEmphasis!=null){
                            $location.path("/index/propertyService/staffHome/importantClients/request");
                            return;
                        }
                    }else if($scope.btnIndex ==18)
                    {
                        if($scope.personVip!=null&&$scope.personEmphasis!=null){
                            if($scope.personVip.vipEnd>$scope.personEmphasis.applyeddate){
                                $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                                return;
                            }else{
                                $location.path("/index/propertyService/staffHome/importantClients/request");
                                return;
                            }
                        }else if($scope.personVip==null&&$scope.personEmphasis==null){
                            $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                            return;
                        }else  if($scope.personVip!=null&&$scope.personEmphasis==null){
                            $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                            return;
                        }else if($scope.personVip==null&&$scope.personEmphasis!=null){
                            layer.alert('该客户已提交重点客户申请！',{icon : 0});
                            $location.path("/index/propertyService/staffHome");
                            return;
                        }
                    }
                });
            });
        };

        /**
         * 左右切换
         *
         */
        $scope.change = function(item){
            if(item == 0){
                if($scope.shownum > 0)
                {
                    $scope.shownum--;
                }
            }else if(item == 1){
                if($scope.shownum < 2)
                {
                    $scope.shownum++;
                }
            }
        };

        /**
         * 更改显示的导航页
         * @type {{number}}
         */
        $scope.changeShowNum=function(showNum){
            $scope.shownum=showNum;
        };

        //查询停车卡数量
        $scope.search={};
        $scope.search.custId=$scope.personCust.custId;

        /**
         * 查询资产数量
         */
        $scope.load_BuildingStructureNew = function(){
            $http.get(url+'/BuildingStructureNew/getCountByCustId/'+$scope.personCust.custId).success(function(data)
            {
                $scope.countAllBuilding=data.allCount_building;  //资产总数
                $scope.storeSum=data.count_cap;
                $scope.countStall=data.count_stall;
                $scope.houseSum=data.count_house;
            }).error(function(data, status, headers, config){
                layer.msg("获取商铺数量失败",{icon:2});
            }) ;
        };
        //资产数量初始化
        $scope.load_BuildingStructureNew();
        //查询最近的服务请求
        $http.get(url+'/ServiceRequest/getCount/'+$scope.personCust.custId).success(function(data)
        {
            $scope.comsum1=data.allCount.count1;
            $scope.comsum2=data.allCount.count2;
            $scope.comsum3=data.allCount.count3;
            $scope.comsum=$scope.comsum1+$scope.comsum2+$scope.comsum2;
        }).error(function(data, status, headers, config){
            layer.msg("获取商铺数量失败",{icon:2});
        }) ;
        //查询最近一个月内的服务请求
        $scope.search.custId=$scope.personCust.custId;
        $http.get(url+'/ServiceRequest/getCount/'+$scope.personCust.custId).success(function(data)
        {
            $scope.count1=data.count1;
            $scope.count2=data.count2;
            $scope.count3=data.count3;
        }).error(function(data, status, headers, config){
            layer.msg("获取服务请求数量失败",{icon:2});
        }) ;

        $scope.GetUser=function(customerId){
            $scope.btnIndex = 2;
            if(customerId!=0){
                $http.get(url+'/ServiceRequest/getServiceRequestbyCustomerId/'+customerId).success(function(data){
                    $scope.ServiceRequest = data.ServiceRequest;
                    $location.path("/index/propertyService/staffHome/serviceRequestNew/"+customerId);
                }).error(function(data,status,headers,config){
                    layer.alert('查询失败！',{icon : 2});
                });
            }
        };
    }]);
});
