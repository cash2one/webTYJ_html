/**
 * Created by NM on 2018/1/18.
 * 巡检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('isGoingServiceRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var user = {};
        var companyId ;//设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        $scope.loginName = '';
        if($scope.user.staff != null){
            $scope.loginName = $scope.user.staff.staffName;
            $scope.operatorId = $scope.user.staff.staffId;//操作人id
        }else{
            $scope.loginName = '超级管理员';
            $scope.operatorId= '超级管理员';
        }

        companyId= $scope.user.companyId;



        $scope.serviceRequests={serviceRequestType:'',page:{}};
        $scope.load=function(){
            $scope.serviceRequests.serviceRequestType=9;
            $scope.serviceRequests.serviceRequestState=2;
            var fetchFunction = function (page, callback) {
                $scope.serviceRequests.page = page;
                $http.post(url + '/ServiceRequest/listPageInspectionServiceRequestbyStateAndType', {ServiceRequest: $scope.serviceRequests}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log( $scope.searchPaginator);
        };
        $scope.load();
        //得到操作的对象
        $scope.object1={};
        //完成
        $scope.open=function(data){
            $scope.object1=data;
            if($scope.object1.serviceRequestState == 3){
                alert("服务请求已经是完成状态!");
                return;
            }
            //完成
            $scope.journal.serviceRequestId = $scope.object1.serviceRequestId;
            $scope.journal.changeState = 3;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                $scope.load();
            }).error(function(){
                alert("完成操作失败，请稍后重试!")
                $scope.journal.remarks = "";
            });
        };
        //查看
        $scope.show=function(data){
            $scope.object1=data;
            $("#detail").modal("show");
        };
        //失效
        $scope.close=function(data){
            $scope.object1=data;
            if($scope.object1.serviceRequestState==0){
                alert("该方案已是失效状态");
            }else{
                $("#novail").modal("show");
            }
        };

        //关闭
        $scope.saveUpdate = function(){
            $scope.journal.serviceRequestId = $scope.object1.serviceRequestId;
            $scope.journal.changeState = 0;
            //$scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            $http.put(url + "/ServiceRequest/changeServiceState",{
                ServiceRequestJournal : $scope.journal
            }).success(function(data){
                $scope.journal.remarks = "";
                alert(data.Info.info.$);
                $scope.load();
            }).error(function(){
                alert("关闭操作失败，请稍后重试!")
                $scope.journal.remarks = "";
            });
        }

        //查看任务
        $scope.selectTasks=function(item){
            if(item!=null){
                //将值传递到任务页面
                $scope.id=item.serviceRequestId;//服务请求id
                /* var dataa=JSON.stringify($scope.id);*/
                sessionStorage.setItem("data1",$scope.id);
                $location.path("/index/serviceRequest/patrolManagement/serviceTasks/isGoingTasks");

            }else{
                alert("无效的服务ID！");
            }
        }



        /****按钮操作开始************************/
            //全选
        $scope.isAllChecked=false;//判断是否全选,默认否
        $scope.allIds = {serviceRequestIds:[]};
        $scope.allChecked = function(){
            $scope.allIds.serviceRequestIds=[];
            $scope.isAllChecked = true;
            var items = $scope.searchPaginator.object.serviceRequests;
            if(items!=null && items.length>0){
                for(var i=0;i<items.length;i++){
                    if(items[i].serviceRequestId != null){
                        $scope.allIds.serviceRequestIds.push(items[i].serviceRequestId);
                    }
                }
            }
            console.log($scope.allIds.serviceRequestIds);
        }

        $scope.sr = {};
        $scope.getService = function(data){
            $scope.sr = data;
        }

        /**
         * 服务请求页面网格列表切换
         */
        $scope.grids=false;
        $scope.list=function(){
            $scope.grids=true;

        }
        $scope.gridChange=function(){
            $scope.grids=false;
        }

        /**
         * 点击选中  2016/7/25  yangshengquan
         */

        $scope.getData = function(item){
            var allData = $scope.searchPaginator.object.serviceRequests.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.serviceRequestId == allData[i].serviceRequestId)
                {
                    if(document.getElementById(item.serviceRequestId).checked)
                    {
                        document.getElementById(item.serviceRequestId).checked = false;
                        document.getElementById(item.serviceRequestId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].serviceRequestId != item.serviceRequestId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.serviceRequestId).checked = true;
                        document.getElementById(item.serviceRequestId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].serviceRequestId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };


       // 完成
        $scope.finish=function(data){
            $scope.object1=data;
            if($scope.object1.serviceRequestState==4){
                layer.msg("服务请求已经是完成状态",{icon : 0});
            }else{
                angular.element("#serviceFinish1").modal("show");
            }

        };


        //失效
        $scope.close=function(data){
            $scope.object2=data;
            if($scope.object2.serviceRequestState==5){
                layer.msg("服务请求已经是失效状态",{icon : 0});
            }else{
                angular.element("#serviceClosed1").modal("show");
            }

        };


        /**
         * 使选择的服务请求失效
         */
        $scope.journal = {};//单个服务请求使用
        $scope.allClose=function(){
            if($scope.isAllChecked){
                $("#serviceClosed1").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };

        $scope.serviceClosed = function(){
            $scope.journal.changeState = 5;
            $scope.journal.operatorId = $scope.operatorId;  //操作人id
            if($scope.journal.remarks==null||$scope.journal.remarks==''||$scope.journal.remarks==undefined){
                layer.msg('失效原因不能为空！',{icon : 0,time : 2000});
                return;
            }
                var item = $scope.sr;
                if(item.serviceRequestState == 0){
                    alert("服务请求已经是失效状态!");
                    return;
                }
                $scope.journal.serviceRequestId = item.serviceRequestId;
                $http.put(url + "/ServiceRequest/changeServiceState",{
                    ServiceRequestJournal : $scope.journal
                }).success(function(data){
                    $scope.journal.remarks = "";
                    alert(data.Info.info.$);
                    $scope.load();
                }).error(function(){
                    alert("关闭操作失败，请稍后重试!")
                    $scope.journal.remarks = "";
                });


        }
        /**
         * 使选择的服务请求完成
         */
        $scope.allFinish=function(){
            if($scope.isAllChecked){
                $("#serviceFinish1").modal("show");
            }else{
                alert("请先全选！！！");
            }
        };
        $scope.serviceFinish = function(){
            $scope.journal.changeState = 4;
            $scope.journal.operatorId = $scope.operatorId;  //操作人id
            if($scope.journal.remarks==null||$scope.journal.remarks==''||$scope.journal.remarks==undefined){
                layer.msg('备注不能为空！',{icon : 0,time : 2000});
                return;
            }
                var item = $scope.sr;
                if(item.serviceRequestState == 4){
                    alert("服务请求已经是完成状态!");
                    return;
                }
                $scope.journal.serviceRequestId = item.serviceRequestId;
                $http.put(url + "/ServiceRequest/changeServiceState",{
                    ServiceRequestJournal : $scope.journal
                }).success(function(data){
                    $scope.journal.remarks = "";
                    alert(data.Info.info.$);
                    $scope.load();
                }).error(function(){
                    alert("完成操作失败，请稍后重试!")
                    $scope.journal.remarks = "";
                });

            $scope.load();//刷新页面
        }


        /****按钮操作结束************************/

    }]);
});