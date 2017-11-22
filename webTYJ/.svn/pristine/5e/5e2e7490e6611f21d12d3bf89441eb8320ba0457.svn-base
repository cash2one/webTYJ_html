/**
 * Created by NM on 2018/1/18.
 * 人员信息门禁卡js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');
    //页面载入时设置焦点至第一个文本框  王洲  2016.1.13
    app.directive('setFocus', function(){
        return function(scope, element){
            element[0].focus();
        };
    });
    app.controller('addEntranceGuardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.doClick(2);

        //查询人员关联的建筑
        $scope.PersonBuildingNew = {};
        $scope.PersonBuildingNew.custId = $scope.personCust.custId;
        $scope.PersonBuildingNew.projectType='56ede32b-7fe0-434c-95c1-0051bc5cf44e';
        $scope.openHouse = function(){
            $http.post(url + '/PersonBuildingNew/selectPersonBuildingNewByCustId',{PersonBuildingNew : $scope.PersonBuildingNew}).success(function(data){
                $scope.buildingStructure = data.PersonBuildingNew;
                console.log($scope.buildingStructure);
                $('#file').modal({backdrop: 'static', keyboard: false});
            }).error(function(data){
                layer.alert('没有关联的房屋！',{icon : 0});
            });
        };

        $scope.personParam = {};
        $scope.openPerson = function(){
            if(angular.isDefined($scope.addEntrance.houseId)){
                $scope.personParam.buildingStructureId = $scope.houseone.buildingStructureId;
                $scope.personParam.houseId = $scope.houseone.id;
                $scope.personParam.projectType = "56ede32b-7fe0-434c-95c1-0051bc5cf44e";
                $scope.personParam.custId = $rootScope.user.custId;
                $http.post(url+'/PersonCustNew/getPersonCustNew',{Search:$scope.personParam}).success(function(data){
                    $scope.personCustNewList = data.PersonCustNew;
                    $('#person').modal({backdrop: 'static', keyboard: false});
                }).error(function(data){
                    layer.msg("获取信息失败！",{icon : 3,time : 1000});
                });
            }else{
                layer.alert('必须先选择房屋！',{icon : 0});
            }
        }


        $scope.personCustNews={page:{}};     //人员信息
        $scope.load=function(){
            var fetchFunction = function(page,callback) {
                $scope.personCustNews.page=page;
                $http.post(url + '/PersonCustNew/listPagePersonCustByCondition',{PersonCustNew:$scope.personCustNews}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,5);
        };
        //$scope.load();

        /**
         * 添加人员
         * @type {{}}
         */
        $scope.personone={};
        $scope.getPersonBycustId=function(person){
            $scope.btnIndex = person.custId;
            $scope.personone=person;
            $scope.addEntrance.custCode=$rootScope.user.custId;//办卡人id
            $scope.addEntrance.userId=$scope.personone.custId;//持卡人id

        };

        //选中房屋
        $scope.houseone={};
        $scope.choiceHouse=function(building,index){
            $scope.btnIndex = building.buildingStructureId;
            if(building.buildingStructureNew != null && index==1){
                $scope.houseone=building.houseNew;
                $scope.addEntrance.houseId=$scope.houseone.id;
                $scope.btnIndex = $scope.houseone.id;
            }else if(building.buildingStructureNew != null && index==2){
                $scope.houseone=building.stallNew;
                $scope.addEntrance.houseId= $scope.houseone.stallId;
                $scope.btnIndex = $scope.houseone.stallId;
            }else if(building.buildingStructureNew != null && index==3){
                $scope.houseone=building.storeNew;
                $scope.addEntrance.houseId=$scope.houseone.storeId;
                $scope.btnIndex = $scope.houseone.storeId;
            }
        };


        //根据条件搜索人员信息
        $scope.searchone={};
        $scope.selectPerson=function(){

            $http.post(url+'/PersonCustNew/listAllPersonBySearch',{Search:$scope.searchone}).success(function(data)
            {
                $scope.person=data.PersonCustNew;
            });
        };

        //选中人员
        $scope.personone={};
        $scope.choicePerson=function(person){
            $scope.personone=person;
            $scope.addEntrance.custCode=$rootScope.user.custId;//办卡人id
            $scope.addEntrance.userId=$scope.personone.custId;//持卡人id
        };

        //添加门禁卡
        $scope.addEntrance={cardNum:"",userName:""};//新增门禁卡对象
        $scope.insertEntrance=function(){
            var paren = /^[1-2]\d{3}\-(0[0-9]|1[0-2])\-(0[0-9]|[1-2][0-9]|3[0-1])/;
            //增加门禁卡号长度验证以及必填项验证  王洲  2016.1.13
            var no = $scope.addEntrance.cardNum;
            if(no == '' || angular.isUndefined(no)){
                layer.msg('门禁卡号不能为空！',{icon : 0,time : 1000});
                return;
            }
            if(no.length > 30){
                layer.msg('门禁卡号不能多于30个字符！',{icon : 0,time : 1000});
                return;
            }
            if(angular.isUndefined($scope.houseone.fullName)){
                layer.msg('关联房屋不能为空！',{icon : 0,time : 1000});
                return;
            }
            if(angular.isUndefined($scope.addEntrance.startDate) || $scope.addEntrance.startDate == null){
                layer.msg('启用日期不能为空！',{icon : 0,time : 1000});
                return;
            }
            if(angular.isUndefined($scope.personone.name)){
                layer.msg('客户姓名不能为空！',{icon : 0,time : 1000});
                return;
            }
/*            if(paren.test($scope.addEntrance.startDate))
            {
                layer.msg('启用日期格式不对！',{icon : 0,time : 1000});
                return;
            }
            if(paren.test($scope.addEntrance.endDate))
            {
                layer.msg('截止日期格式不对！',{icon : 0,time : 1000});
                return;
            }*/
            $scope.addEntrance.cardState = 1;
            //增加门禁卡号判断，如果输入的卡号在数据库中已存在，则给出提示  王洲   2016.1.14
            $http.get(url + '/Entrance/getEntranceBycardNum/' + $scope.addEntrance.cardNum).success(function(data){
                if(data.Info.state != false){
                    $http.post(url + '/Entrance/insertEntrance', {Entrance: $scope.addEntrance}).success(function () {
                        layer.msg('提交成功！',{icon : 1,time : 2000});
                        $location.path("/index/propertyService/staffHome/entranceGuard/checkEntranceGuard");
                        $scope.doClick(1);
                    }).error(function (data, status, headers, config) {
                        layer.msg("提交失败！",{icon : 2,time : 2000});
                    });
                }else{
                    layer.msg('此门禁卡号已存在，请重新输入！',{icon : 0,time : 1000});
                }
            }).error(function(data){
                layer.msg('门禁卡号查询出错，请重试！',{icon : 0,time : 1000});
            });
        };

        //取消数据增加
        $scope.resetAddEntrance=function(){
            $scope.addEntrance={};
            $scope.search={};
            $scope.houseone={};
            $scope.personBuildingNew={};
            $scope.personone = {};
            $scope.err="";
            $location.path('/index/propertyService/staffHome/entranceGuard/checkEntranceGuard');
        };

        //打印
        $scope.printEntrance=function(){

        };

        $scope.checkDates =  function(){
            var date1 = $scope.addEntrance.startDate;
            var date2 = $scope.addEntrance.endDate;
            if(date2 < date1){
                layer.alert('截至日期不得早于启用日期！',{icon : 0});
                $scope.addEntrance.endDate = '';
            }else{
            }
        };


        //查询产品初始化门禁卡，获取办理金额
        $http.get(url + '/Product/getProductByType/' + '2').success(function(data){
            $scope.Product = data.Product;
        }).error(function(data){
            layer.alert('查询不到有效的门禁卡初始化信息！',{icon : 2});
        });

        $scope.checkCardNum = function(cardNum){
            $scope.flag = '';
            $http.get(url + '/Entrance/getEntranceBycardNum/' + cardNum).success(function(data){
                $scope.flag = data.Info.state;
            }).error(function(data){
                layer.msg('门禁卡号查询出错，请重试！',{icon : 0,time : 1000});
            });
            return
        }

    }]);
});