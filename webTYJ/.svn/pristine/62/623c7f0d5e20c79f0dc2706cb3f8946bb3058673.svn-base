/**
 * Created by NM on 2018/1/18.
 * 人员信息入伙js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('joinGangCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /***********************   参数start   *************************/

        $scope.doClick(4);
        var url = $rootScope.url;
        $scope.show1=true;
        $scope.show2=false;
        $scope.show3=false;
        $scope.show4=false;
        $scope.show5=false;

        //定义12各月份的下拉类表，数据前台填充
        $scope.selects=['3','4','5','6','7','8','9','10','11','12'];

        $scope.plans=[{name:'1',problem:'1'},{name:'1',problem:'1'},{name:'1',problem:'1'}];

        $scope.items=[{date:''}];

        //获取房子所有数据
        $scope.personCusts=$rootScope.user;
        $scope.search.custId=$scope.personCusts.custId;
        $scope.search.projectType='cd81b4df-7eda-47c8-a84c-c9d47578c78b';//授权项目类型ID

        /***********************   参数end     *************************/

        /***********************   方法start   *************************/

        /**
         * 查询所有加载房屋信息
         */
         //分页查询 zhuqi 201606.03
        $scope.houseNew = {page : {}};
        $scope.houseNew.custId=$scope.personCusts.custId;
        $scope.houseNew.projectType='cd81b4df-7eda-47c8-a84c-c9d47578c78b';//授权项目类型ID
        $scope.load = function(){
            var houseNewIntake = function(page, callback){
                $scope.houseNew.page = page;
                //$scope.houseNew.projectId = $scope.projectIds;
                $http.post(url + '/HouseNew/listPageHouseNewByHouseNew',{HouseNew : $scope.houseNew}).success(callback);
            };
            $scope.houseNewIntake=app.get('Paginator').list(houseNewIntake,6);
            console.log($scope.houseNewIntake);
        }
        $scope.load();

        $http.post(url+'/HouseNew/listHouseByPersonCustId/',{Search:$scope.search}).success(function(data)
        {
            $scope.checked=[];
            $scope.homeInspectionChecked=[];
            for(var i=0;i<data.HouseNew.length;i++){
                $scope.checked.push(false);
                $scope.homeInspectionChecked.push(false);
            }
            $scope.houses=data.HouseNew;
            for(var i=0;i<$scope.houses.length;i++){
                $scope.houses[i].checked = false;
            }
            $scope.loadPages($scope.houses);
        }).error(function(error){
            layer.msg('搜索失败！', {icon: 2});
        });

        //选择房屋
        $scope.check=function(index){
            /*for(var i=0;i<$scope.checked.length;i++){
                if(i===index){
                    if($scope.checked[i]===true){
                        $scope.checked[i]=false;
                    }else if($scope.checked[i]===false){
                        $scope.checked[i]=true;
                    }
                }
            }*/

        };

        $scope.checkedItem = {};
        $scope.checkShow=function(item){
            var intakeCheck = document.getElementById(item.id).style.background;
            if(intakeCheck == ''){
                $('.checkShow').attr('style','');
                document.getElementById(item.id).style.background = '#F8F6FA';
                $scope.checkedItem = item;
                console.log($scope.checkedItem);
            }else{
                document.getElementById(item.id).style.background = '';
                $scope.checkedItem = {};
            }
        };

        //选择验房房屋
        $scope.homeInspectionCheck=function(index){
            for(var i=0;i<$scope.homeInspectionChecked.length;i++){
                if(i===index){
                    if($scope.homeInspectionChecked[i]===true){
                        $scope.homeInspectionChecked[i]=false;
                    }else if($scope.homeInspectionChecked[i]===false){
                        $scope.homeInspectionChecked[i]=true;
                    }
                }
            }
        };

        $scope.btnIndex = 1;  //默认显示第一个
        $scope.nextShow=function(show){
            $scope.btnIndex = show;
            if(show===5){
                $scope.show5=true;
                return;
            }
            $scope.housesone=[];
            $scope.intakes=[];
            $scope.date=[];
            $scope.countIntakeAmount=0;//管理费总额
            console.log($scope.checked);
           //for(var i=0;i<$scope.checked.length;i++){
                if($scope.checkedItem!=null && $scope.checkedItem!=''){
                    if($scope.checkedItem.managementUnitPrice == undefined){
                        $scope.checkedItem.managementUnitPrice = 0;
                    }
                    if($scope.checkedItem.completionArea == undefined){
                        $scope.checkedItem.completionArea = 0;
                    }
                    $scope.housesone.push($scope.checkedItem);
                    $scope.date[0]='3';
                    var startDate = new Date();
                    var month = startDate.getMonth();
                    var endDate=startDate;
                    endDate.setMonth(parseInt(month+parseInt($scope.date[0])));
                    var intakeAmount=($scope.checkedItem.managementUnitPrice*1)* ($scope.checkedItem.completionArea*1) * ((+$scope.date[0])*1);
                    if($scope.checkedItem.managementUnitPrice != undefined){
                        $scope.intakes.push({houseId:$scope.checkedItem.id,startDate:startDate,endDate:endDate,intakeState:1,intakeAmount:intakeAmount,staffId:$scope.personCusts.custId,intakePrice:$scope.checkedItem.managementUnitPrice});

                        $scope.countIntakeAmount=($scope.countIntakeAmount*1)+(intakeAmount*1);
                    }else {
                        $scope.checkedItem.managementUnitPrice = 0;
                    }
                }
            //}
            if(show!=1){
                if($scope.checkedItem.id!=null){
                    $scope.show1=false;
                    $scope.show2=false;
                    $scope.show3=false;
                    $scope.show4=false;
                    switch (show){
                        case 1 :{
                            $scope.show1=true;
                            return
                        }
                        case 2 :{
                            $scope.show2=true;
                            return
                        }
                        case 3 :{
                            $scope.show3=true;
                            return
                        }
                        case 4 :{
                            $scope.show4=true;
                            return
                        }
                    }
                }else{
                    $scope.btnIndex = 1;  //默认显示第一个
                    layer.msg('请选择房屋！', {icon: 0});
                }
            }else{
                $scope.show1=true;
                $scope.show2=false;
                $scope.show3=false;
                $scope.show4=false;
            }
        };

        //日期监控事件
        $scope.watchDate=function(index){
            if($scope.checkedItem.managementUnitPrice == undefined){
                $scope.checkedItem.managementUnitPrice = 0;
            }
            if($scope.checkedItem.completionArea == undefined){
                $scope.checkedItem.completionArea = 0;
            }
            var endDate=new Date();
            var month=endDate.getMonth();
            endDate.setMonth(parseInt(month)+parseInt($scope.date[index]));
            var intakeAmount=($scope.checkedItem.managementUnitPrice*1) * ($scope.checkedItem.completionArea*1) * ($scope.date[index]*1);
            $scope.intakes[index].intakeAmount=intakeAmount;
            $scope.intakes[index].endDate=endDate;
            $scope.countIntakeAmount=0;//管理费总额
            for(var i=0;i<$scope.intakes.length;i++){
                $scope.countIntakeAmount=($scope.countIntakeAmount*1)+($scope.intakes[i].intakeAmount*1);
            }
        };

        /**
         * 物品领取入伙
         */
        $scope.save=function(){
            var intakeResult={intakes:$scope.intakes,houses:$scope.housesone};
            $http.post(url+'/Intake/insertIntakesRestful',{IntakeResult:intakeResult}).success(function(data)
            {
                layer.msg('物品领取成功！', {icon: 1});
            }).error(function(error){
                layer.msg('物品领取失败！', {icon: 2});
            });
        };

        /**
         * 提交收管理费
         */
        $scope.saveManagement = function(){
            $location.path("/index/externalProfession/cashier/cashierUI/billInquiry");
        };

        /**
         *入伙完成
         */
        $scope.houseId = {};
        $scope.homeInspection=function(){
            if($scope.checkedItem.joinState==1){
                layer.msg('已经是入伙状态！', {icon: 0});
                return;
            }
            $scope.houseId = $scope.checkedItem.id;
          layer.confirm("是否完成入伙！",{btn : ['是','否']},function(){
              $http.get(url+'/HouseNew/updataJoinStateByHouseId/'+ $scope.houseId).success(function(data){
                    if(data!=0){
                        layer.msg('入伙成功！', {icon: 1});
                    }else{
                        layer.msg('入伙失败！', {icon: 0});
                    }
              }).error(function(error){
                  layer.msg('操作失败！', {icon: 2});
              });
          });
        };

        /**
         * 验证验房服务请求
         */
        $scope.homeInspectionServiceRequest=function(){
            if($scope.checkedItem.joinState==1){
                layer.msg('已经是入伙状态无法验房！', {icon: 0});
                return;
            }
            layer.confirm("是否创建验房服务请求！",{btn : ['是','否']},function(){
                $scope.serviceRequest={requestTime:new Date(),requestSource:'前台',serviceRequestName:"入伙服务请求",customerId:$scope.personCusts.custId,directionType:0,listTasks:[]};
                //for(var i=0;i<$scope.housesone.length;i++){
                    $scope.task={customerId:$scope.personCusts.custId,taskType:14,addressId:$scope.checkedItem.houseAddress,createTime:new Date()};
                    $scope.serviceRequest.listTasks.push($scope.task);
                //}
                $http.post(url+'/ServiceRequest/HomeInspectionServiceRequest',{ServiceRequest:$scope.serviceRequest}).success(function(data)
                {
                    $scope.taskCheck = data.Tasks;
                    if(data != ''){
                        for(var i=0;i<$scope.taskCheck.length;i++){
                            $http.get(url+'/InspectorOrder/getInspectorOrderBytaskId/'+$scope.taskCheck[i].taskId).success(function(data) {
                                layer.msg('已发出验房请求！', {icon: 1});
                                $scope.orderCheck = data;
                            }).error(function(error){
                                layer.msg('查询失败！', {icon: 2});
                            });
                        }
                    }else{
                        layer.msg('请选择验房房屋！', {icon: 2});
                    }
                }).error(function(error){
                    layer.msg('发送验房请求失败！', {icon: 2});
                });
            });
        };

        $scope.modalShow = function(items){
            $scope.houseItem = items;
            /**
             * 根据建筑结构id获取业主信息
             */
            $http.get(url+'/PersonCustNew/getSelectPersonNew/'+$scope.houseItem.buildingStructureId).success(function(data){
                $scope.personItem = data.PersonCustNew;
                console.log(data);
            });
            /**
             * 根据项目id获取项目信息
             */
            $http.get(url+'/Project/getProjectbyId/'+$scope.houseItem.projectId).success(function(data){
                $scope.cuttentHouseProject = data.Project;
                console.log(data);
            });
        };

        /****************************   方法end   ******************************/

        /****************************   分页start   ******************************/

        $scope.currentPage = 1;             //分页相关参数
        $scope.totalPage = 1;
        $scope.pageSize = 5;
        $scope.pages = [];
        $scope.endPage = 1;

        /**
         * 实现分页
         */
        $scope.listPages=function(currentPage,pageSize,array){
            var dataArray=[];
            if(currentPage*pageSize>array.length){
                for(var i=(currentPage-1)*pageSize;i<array.length;i++) {
                    dataArray.push(array[i]);
                }
            }else{
                for(var i=(currentPage-1)*pageSize;i<currentPage*pageSize;i++){
                    dataArray.push(array[i]);
                }
            }
            return dataArray;
        };

        /**
         * 实现分页及参数改变
         */
        $scope.currentHouse = [];
        $scope.loadPages = function (array) {
            for(var i=0;i<$scope.checked.length;i++){
                $scope.checked[i]=false;
            }
            $scope.currentHouse = $scope.listPages($scope.currentPage,$scope.pageSize,array);
            $scope.totalPage = Math.ceil(array.length / $scope.pageSize);
            $scope.endPage = $scope.totalPage;
            //生成数字链接
            if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage,
                    $scope.currentPage + 1
                ];
            } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                $scope.pages = [
                    $scope.currentPage - 1,
                    $scope.currentPage
                ];
            }else if($scope.currentPage == 1 && $scope.totalPage == 1){
                $scope.pages = [
                    $scope.currentPage
                ];
            }
        };

        /**
         *查询下一页
         */
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
            }
            $scope.loadPages($scope.houses);
        };

        /**
         *  查询前一页
         */
        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
            }
            $scope.loadPages($scope.houses);
        };

        /**
         * 查询当前页
         */
        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.loadPages($scope.houses);
        };

        /****************************   分页end   ******************************/

    }]);
});