/**
 * Created by NM on 2018/1/18.
 * 亲属关系绑定js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('relationshipChainAddCtrl', ['$scope', '$http','$rootScope','$cookieStore','$location', function ($scope,$http,$rootScope,$cookieStore,$location) {

        var url = $rootScope.url;
        $scope.personType=[];   //客户类型
        $scope.individual=false;
        $scope.enterperise=false;
        //$rootScope.user=JSON.parse(sessionStorage.getItem('person_property'));
        $scope.custId=$rootScope.user.custId;//得到登录人的id
        $scope.personBuildingNew={};
        $scope.enterpriseCustNew={};
        /**
         * checkbox的值
         */
        $scope.change=function(){
            $scope.houseone={};
            var userName = $cookieStore.get("user");
            var temp = document.getElementsByName("relation");
            for(var i=0;i<temp.length;i++){
                if(temp[i].checked==true) {
                    if(temp[i].value==1){
                        $scope.individual=true;
                        $scope.enterperise=false;
                    }else if(temp[i].value==2){
                        $scope.individual=false;
                        $scope.enterperise=true;
                    }
                }
            }
        };

        /**
         *  零时中转函数
         */
        $scope.centerChange = function(item)
        {
            $scope.newDate = {};
            for(var i in item)
            {
                $scope.newDate[i] = item[i];
            };
            return $scope.newDate;
        };

        /**
         * 根据条件搜索出房屋信息
         * @type {{page: {}}}
         */
        $scope.search={page:{}};//搜索对象
        $scope.search.personBuildingState=0;
        $scope.selectHouse=function(){
            var parent = function (page, callback) {
                $scope.search.page = page;
                $http.post(url+'/HouseNew/listPageAllHouseNewBySearch',{Search:$scope.search}).success(callback);
            };
            $scope.currentPaginator = app.get('Paginator').list(parent,4);
        };

        /**
         * 选中房屋
         * @type {{}}
         */
        $scope.houseone={};
        var resuleA = {};
        $scope.choiceHouse = function(items){
            $scope.btnIndex = items.id;
            resuleA = items;
            $scope.personBuildingNew.buildingStructureId=$scope.houseone.buildingStructureId;
        };

        /**
         * 保存
         */
        $scope.btnCheck = function()
        {
            $scope.houseone = $scope.centerChange(resuleA);
        };

        /**
         * 选中企业房屋
         * @type {{}}
         */
        $scope.houseone={};
        $scope.choiceHouseEnter = function(items){
            $scope.btnIndex = items.personBuildingId;
            $scope.houseone = items;
            $scope.personBuildingNew.buildingStructureId=$scope.houseone.buildingStructureId;
        };


        /**
         *  获取与该栋房屋相关的人员建筑关系信息
         */
        $scope.selectPersonBuilding=function(){
            $http.get(url+'/PersonBuildingNew/listAllPersonAndHouseByHouseId/'+$scope.houseone.id).success(function(data)
            {
                $scope.personBuilding=data.PersonBuildingNew;
                for(var i=0;i<$scope.personBuilding.length;i++)
                {
                    if($scope.personBuilding[i].custType=="业主"){
                        $scope.personone=$scope.personBuilding[i].personCustNew;
                        $scope.ageone= $scope.getAge($scope.personone.birthday);
                    }
                }
            }).error(function(data, status, headers, config){
                layer.msg('获取人员房屋关系失败',{icon : 2});
            }) ;
        };

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
            $scope.currentPaginator1 = app.get('Paginator').list(parent,4);
        };


        /**
         * 选中人员
         */
        $scope.personone={};
        var reslueP = {};
        $scope.choicePerson=function(person){
            reslueP = person;
            $scope.btnIndex=person.custId;
        };

        /**
         * 确定
         */
        $scope.btnClick = function()
        {
            $scope.personone = $scope.centerChange(reslueP);
        };

        /**
         *  取消建筑信息模态框
         */
        $scope.clearModel=function()
        {
            $scope.houseone={};

        };


        /**
         * 保存个人关系链
         */
        $scope.insertAll=function(){
            // 1790 $scope.personone.custId 判断关系人的选择
            if( $scope.personone.custId == '' ||  $scope.personone.custId == null){
                layer.msg('请选择被关系人',{icon : 0});
                return ;
            }
            if(angular.isUndefined($scope.houseone.id)){
                layer.msg('请选择房屋',{icon : 0});
                return ;
            }
            var temp1 = document.getElementsByName("relationship");
            for(var k=0;k<temp1.length;k++) {
                if (temp1[k].checked==true) {
                    if (temp1[k].value == 1) {
                        $scope.personBuildingNew.custType = "亲属";
                    } else {
                        $scope.personBuildingNew.custType = "朋友";
                    }
                }
            }
            if($scope.personBuildingNew.custType!='亲属'&&$scope.personBuildingNew.custType!='朋友'){
                layer.msg('请选择关系',{icon : 2});
                return ;
            }
            $scope.personBuildingNew.custId=$scope.personone.custId;//被关系人
            $scope.personBuildingNew.buildingStructureId=$scope.houseone.buildingStructureId;//关系的建筑结构id
            if($scope.personBuilding_stoge!=null){
                //执行修改关系操作
                if( $scope.personBuildingNew.buildingStructureId==""||$scope.personBuildingNew.buildingStructureId==undefined){
                    layer.msg('请选择房屋',{icon : 2});

                }else{
                    $http.put(url+'/PersonBuildingNew/updataPersonBuildingById',{PersonBuildingNew:$scope.personBuildingNew}).success(function(data)
                    {
                        layer.msg('修改关系成功',{icon : 1, time : 2000});
                        $scope.houseone={};
                        $scope.personone={};
                        $location.path("index/propertyService/staffHome/relationshipChain/relationshipChainHistory");
                    }).error(function(data, status, headers, config){
                        layer.msg('修改关系链失败',{icon : 2});
                    }) ;
                }

            }else{
                //执行添加操作
                if( $scope.personBuildingNew.buildingStructureId==""){
                    layer.msg('请选择房屋',{icon : 2});
                }else{
                    $http.post(url+'/PersonBuildingNew/addPersonBuildingNewRestful',{PersonBuildingNew:$scope.personBuildingNew}).success(function(data)
                    {
                        if(data==''){
                            layer.msg('该客户已与该建筑关联',{icon : 2});
                        }else{
                            layer.msg('添加关系成功',{icon : 1, time : 2000});
                            $scope.houseone={};
                            $scope.personone={};
                            $location.path("index/propertyService/staffHome/relationshipChain/relationshipChainHistory");
                        }
                    }).error(function(data, status, headers, config){
                        layer.msg('添加关系链失败',{icon : 2});
                    }) ;
                }
            }

            //$scope.houseone = {};
            //$scope.personone={};
        };


        /**
         * 根据条件查询企业
         */
        $scope.enterpriseName = '';
        $scope.selectHouseAndEnterprise=function(){
            var enterpriseCustNew={};
            enterpriseCustNew.enterpriseName=$scope.enterpriseName;
            enterpriseCustNew.representative=$scope.custId;
            $http.post(url + '/EnterpriseCustNew/findEnterpriseCustNewRestful',{EnterpriseCustNew:enterpriseCustNew})
                .success(function(data) {
                    if(data.EnterpriseCustNew.length>0){
                        $scope.enterpriseCustNews = data.EnterpriseCustNew;
                    }else{
                        layer.msg('没有找到该企业',{icon : 2});
                    }
                }).error(
                function(data, status, headers, config) {
                    layer.msg('获取企业失败',{icon : 2});
                });
        };
        $scope.selectHouseAndEnterprise();
        /**
         * 选中企业
         * @param items
         */
        $scope.choiceEnterpriseCust=function(items){
            $scope.btnIndex = items.enterpriseId;
            $scope.enterpriserone=items;
            $scope.personBuildingNew.enterpriseId=$scope.enterpriserone.enterpriseId;
            $scope.isFaren($scope.personBuildingNew.enterpriseId);
            $scope.houseone={};
            $scope.houses=[];
        };

        /**
         * 根据选中的企业id查询与企业相关联的房屋信息
         */
        $scope.buildingStructure_check={page:{}};
        $scope.selectHouseOfEnterpriser=function(){
            //var enterpriserId='';    //查询条件
            // enterpriserId=$scope.enterpriserone.enterpriseId;
            // $http.get(url + '/HouseNew/listHouseByenterpriseId/'+enterpriserId)
            //     .success(function(data) {
            //         if(data.HouseNew.length>1){
            //             $scope.houses=data.HouseNew;
            //         }else{
            //             layer.msg('该企业未绑定建筑',{icon : 2});
            //         }
            //
            //     }).error(
            //     function(data, status, headers, config) {
            //
            //     });


            var parent = function (page, callback) {
                $scope.buildingStructure_check.page = page;
                $scope.buildingStructure_check.enterpriseId=$scope.enterpriserone.enterpriseId;
                $http.post(url+'/PersonBuildingNew/listPageHouseByenterpriseId',{PersonBuildingNew: $scope.buildingStructure_check}).success(callback);
            };
            $scope.currentPaginatorEnter = app.get('Paginator').list(parent,4);
        };

        /**
         *  保存关系链
         */
        $scope.insert=function(){
            if($scope.faren){
                layer.msg('该公司法人，无法添加为员工',{icon : 2});
                return;
            }
            if(angular.isUndefined($scope.houseone)){
                layer.msg('请选择房屋',{icon : 2});
                return ;
            }
            var tem = document.getElementsByName("yuangong");
            for(var k=0;k<tem.length;k++) {
                if (tem[k].checked==true) {
                    $scope.personBuildingNew.custType = "员工";
                }
            }
            if($scope.personBuildingNew.custType!='员工'){
                layer.msg('请选择关系',{icon : 2});
                return ;
            }
            $scope.personBuildingNew.custId= $scope.custId;//登录人id
            $scope.personBuildingNew.buildingStructureId=$scope.houseone.buildingStructureId;//关系的建筑结构id
            if($scope.personBuilding_stoge!=null){
                //执行修改关系操作
                if($scope.personBuildingNew.buildingStructureId==""){
                    layer.msg('请选择企业',{icon : 2});
                }else{
                    $http.put(url+'/PersonBuildingNew/updataPersonBuildingById',{PersonBuildingNew:$scope.personBuildingNew}).success(function(data)
                    {
                        layer.msg('修改企业关系成功',{icon : 1, time : 2000});
                        $location.path("index/propertyService/staffHome/relationshipChain/relationshipChainHistory");
                    }).error(function(data, status, headers, config){
                        layer.msg("修改企业关系失败",{icon : 2});
                    }) ;
                }
            }else{
                //执行添加关系操作
                if($scope.personBuildingNew.buildingStructureId==""){
                    layer.msg('请选择企业',{icon : 2});
                }else{

                    $http.post(url+'/PersonBuildingNew/addPersonBuildingNewRestful',{PersonBuildingNew:$scope.personBuildingNew}).success(function(data)
                    {
                        if(data==''){
                            layer.msg('该客户已与该建筑关联',{icon : 2});
                        }else{
                            layer.msg('添加关系成功',{icon : 1, time : 2000});
                            $scope.enterpriserone={};
                            $scope.houseone={};
                            $location.path("index/propertyService/staffHome/relationshipChain/relationshipChainHistory");
                        }
                    }).error(function(data, status, headers, config){
                        layer.msg('添加关系链失败',{icon : 2});
                    }) ;
                }
            }

            //$scope.houseone = {};
            //$scope.enterpriserone = {};
        };

        /**
         * 根据生日算年龄
         * @param str
         * @returns {*}
         */

        function   getAges(str)
        {
            var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if(r==null)return   false;
            var   d=   new   Date(r[1],   r[3]-1,   r[4]);
            if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
            {
                var   Y   =   new   Date().getFullYear();
                return  (Y-r[1]) ;
            }
            return("输入的日期格式错误！");
        }

        /**
         * 根据企业id查询企业信息
         */
        $scope.getEnterPrice_id=function(enterpriseId){
            $http.get(url+'/EnterpriseCustNew/getEnterpriseCustNewByIdRestful/'+enterpriseId).success(function(data)
            {
                $scope.enterpriserone=data.EnterpriseCustNew;
                if($scope.enterpriserone==undefined){
                    $scope.enterpriserone={};
                }
            }).error(function(data, status, headers, config){
                layer.msg('获取企业失败',{icon : 2});
            }) ;
        };

        /**
         * 根据cust id查询个人信息
         */
        $scope.getPerson_id=function(custId){
            $http.get(url+'/PersonCustNew/getPersonCustNewByIdRestful/'+custId).success(function(data)
            {
                $scope.personone= data.PersonCustNew;
                if($scope.personone==undefined){
                    $scope.personone={};
                }
            }).error(function(data, status, headers, config){
                layer.msg('获取个人信息失败',{icon : 2});
            }) ;
        };

        /**
         * 据建筑结构id查询房屋信息
         */
        $scope.getHouse_id=function(buildingStructId){
            $http.get(url+'/HouseNew/listHouseByBuildingStructureId/'+buildingStructId).success(function(data)
            {
                $scope.houseone=data.HouseNew;
                if($scope.houseone==undefined){
                    $scope.houseone={};
                }
            }).error(function(data, status, headers, config){
                layer.msg('获取建筑信息失败',{icon : 2});
            });
        };

        /**
         * 模块启动入口
         */
        $scope.load=function(){
            var personBuilding_stoge=JSON.parse(sessionStorage.getItem('editPersonBuilding'));
            $scope.individual=true;
            if(personBuilding_stoge!=null){
                $scope.personBuilding_stoge=personBuilding_stoge;
                $scope.personBuildingNew=personBuilding_stoge.personBuilding;
                sessionStorage.removeItem('editPersonBuilding');
                if(personBuilding_stoge.edit=='企业'){
                    $scope.individual=false;
                    $scope.enterperise=true;        //企业界面显示
                    //根据企业id查询企业信息
                    $scope.getEnterPrice_id(personBuilding_stoge.personBuilding.enterpriseId);
                }else{
                    $scope.individual=true;             //个人界面显示
                    $scope.enterperise=false;
                    //根据cust id查询个人信息
                    $scope.getPerson_id(personBuilding_stoge.personBuilding.personId);
                }
                //根据建筑结构id查询房屋信息
                $scope.getHouse_id(personBuilding_stoge.personBuilding.buildingStructureId);
            }else{

            }
        };

        /**
         * 判断该客户是否为企业法人
         */
        $scope.isFaren=function(enterpriseId){
            var enterpriseCustNew={};
            enterpriseCustNew.representative=$rootScope.user.name;
            $http.post(url+'/EnterpriseCustNew/findEnterpriseCustNewRestful',{EnterpriseCustNew:enterpriseCustNew}).success(function(data)
            {
                var enterprises=[];
                enterprises=data.EnterpriseCustNew;
                if(enterprises.length>0){
                    for(var i=0;i<enterprises.length;i++){
                        if(enterprises[i].enterpriseId==enterpriseId){
                            $scope.faren=true;
                            return ;
                        }
                    }

                }else{
                    //layer.msg('不是企业法人',{icon : 2});
                    $scope.faren=false;
                    return ;
                }
            }).error(function(data, status, headers, config){
                layer.msg('查询企业法人失败',{icon : 2});
            }) ;
        };
        $scope.load();

        /**
         * 点击查看详情
         *
         */
        $scope.showDial = function(num)
        {
            if(num==1)
            {
                $scope.selectPerson();
            }else if(num==2)
            {
                $scope.selectHouse();
            }
        };
    }]);
});