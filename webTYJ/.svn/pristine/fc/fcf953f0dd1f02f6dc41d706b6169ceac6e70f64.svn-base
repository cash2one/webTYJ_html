/**
 * Created by NM on 2018/1/18.
 * 重大事项管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('majorIssuesListsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.serviceRequestPage={page:{}};//分页显示重大事项

        /********分页显示 start***********************/
        $scope.load=function(){
            var parent = function (page, callback) {
                $scope.serviceRequestPage.page = page;
                $http.post(url + '/ServiceRequest/listPageAllServiceRequestsbyEventType',{ServiceRequest:$scope.serviceRequestPage}).success(callback);
            };
            $scope.currentServiceRequest = app.get('Paginator').list(parent,18);
            console.log($scope.currentServiceRequest);
        }
        $scope.load();
        /********分页显示 end***********************/

        /**********新增重大事项start********************/
            //新增重大事项
        $scope.serviceRequest={};
        $scope.addImportantEvent=function(){
            $('#new').modal({backdrop: 'static', keyboard: false});
            $scope.serviceRequest={};
        };
        var flag=0;
        $scope.checkValue=function(item){
            if(item.importantEventTypeId==null){
                layer.alert('重大事项类型不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.serviceRequestName==null){
                layer.alert('重大事项名称不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.remarks==null){
                layer.alert('重大事项描述不能为空！',{icon : 0});
                flag=1;
                return;
            }
        }
        //新增重大事项保存
        $scope.saveImprotant=function(){
            var itemids = app.get('valueCheck').isNull($scope.serviceRequest.importantEventTypeId);
            if(!itemids.state){
                layer.msg('重大事项类型' + itemids.info,{icon : 0,time : 1000});
                return;
            }
            var itemname = app.get('valueCheck').isNull($scope.serviceRequest.serviceRequestName);
            if(!itemname.state){
                layer.msg('重大事项名称' + itemname.info,{icon : 0,time : 1000});
                return;
            }
            var itemremarks = app.get('valueCheck').isNull($scope.serviceRequest.remarks);
            if(!itemremarks.state){
                layer.msg('备注' + itemremarks.info,{icon : 0,time : 1000});
                return;
            }
            $http.post(url+'/ServiceRequest/insertImportantEvent',{ServiceRequest:$scope.serviceRequest}).success(function()
            {
                layer.msg('新增重大事项成功',{icon : 1,time : 2000});
                $("#new").modal("hide");
                $scope.serviceRequest={};
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.msg('新增重大事项失败',{icon : 3,time : 2000});
            }) ;
        };
        //取消新增重大事项
        $scope.cancleImprotant=function(){
            $("#new").modal("hide");
            $scope.serviceRequest={};
        };
        //查询所有的重大事项处理机制
        $http.get(url + '/ImportantEventType/getAllImportantEventType').success(function(data) {
            $scope.importantEvent= data.ImportantEventType;
        });
        /**********新增重大事项end************************/

        /*******操作start********/
            //查询所有的重大事项
        $scope.getAllImportantItems=function(){
            $http.get(url+'/ServiceRequest/getAllServiceRequestsbyEventType').success(function(data){
                $scope.service=[];
                $scope.service=data.ServiceRequest;
                console.log(data );
            }).error(function(data,status,headers,config){
                layer.alert('查询出错！！',{icon : 0});
            });
        };
        //关闭重大事项
        $scope.closeImportant=function(service){
            service.serviceRequestState=0;
            console.log(service);
            $http.put(url+'/ServiceRequest/updateServiceRequest',{ServiceRequest:service}).success(function(){
                layer.msg('关闭服务请求成功',{icon : 1,time : 2000});
            }).error(function(data, status, headers, config){
                layer.msg('关闭服务请求失败',{icon : 3,time : 2000});
            });
            $scope.getAllImportantItems();
        };

        //完成重大事项
        $scope.finishImportant=function(service){
            service.serviceRequestState=3;
            console.log(service);
            $http.put(url+'/ServiceRequest/updateServiceRequest',{ServiceRequest:service}).success(function(){
                layer.msg('完成服务请求成功',{icon : 1,time : 2000});
            }).error(function(data, status, headers, config){
                layer.msg('完成服务请求失败',{icon : 3,time : 2000});
            });
            $scope.getAllImportantItems();
        };

        //查看
        $scope.datas={};
        $scope.showDatil=function(data){
            $scope.datas=data;
            $("#show").modal("show");
        };
        /*******操作end********/

        /******传值到任务*****************/
        $scope.selectTasks=function(item){
            if(item!=null){
                //将值传递到任务页面
                $scope.id=item.serviceRequestId;//服务请求id
                sessionStorage.setItem("data1",$scope.id);
                $location.path("/index/serviceRequest/majorIssuesManagement/majorIssuesTasks/isGoingTasks");

            }else{
                layer.alert('无效的值',{icon : 0});
            }
        }

        /****************************/

        /****按钮操作开始************************/
            //全选
        $scope.isAllChecked=false;//判断是否全选,默认否
        $scope.allIds = {serviceRequestIds:[]};
        $scope.clickNum=0;//记载点击次数
        $scope.currentPage=$scope.currentServiceRequest.page.currentPage;

        $scope.allChecked = function(){
            $scope.allIds.serviceRequestIds=[];
            $scope.isAllChecked = true;
            var items = $scope.currentServiceRequest.object.serviceRequests;
            $scope.clickNum=$scope.clickNum+1;
            //得到当前的页码
            $scope.currentPage=$scope.currentServiceRequest.page.currentPage;
            var li_index = ($("#bill_paging ul li").index($("#bill_paging ul li.active")[0]))-1;
            console.log($scope.currentPage);
            if(($scope.clickNum%2 !=0)){
                if(items!=null && items.length>0){
                    for(var i=0;i<items.length;i++){
                        if(items[i].serviceRequestId != null){
                            $scope.allIds.serviceRequestIds.push(items[i].serviceRequestId)
                        }
                    }
                }
            }else{
                $scope.isAllChecked=false;//判断是否全选,默认否
                $scope.allIds = {serviceRequestIds:[]};
            }
        }

        $scope.sr = {};
        $scope.getService = function(data){
            $scope.sr = data;
        }

        /**
         * 使选择的服务请求失效
         */
        $scope.journal = {};//单个服务请求使用
        $scope.allClose=function(){
            if($scope.isAllChecked){
                $("#serviceClosed1").modal("show");
            }else{
                layer.alert('请先全选',{icon : 0});
            }
        };
        $scope.serviceClosed = function(){
            $scope.journal.changeState = 0;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c";  //操作人id
            if($scope.isAllChecked){//全选
                $scope.allIds.serviceRequestState = 0;
                $scope.allIds.serviceRequestJournal=$scope.journal;
                $http.post(url+'/ServiceRequest/changeServiceRequestStateByIds',{ServiceRequest:$scope.allIds})
                    .success(function(data){
                        console.log(data);
                        layer.alert(data.Info.info.$);
                        $scope.journal.remarks = "";
                    })
                    .error(function(){
                        layer.alert('失效操作失败',{icon : 0});
                    });
                $scope.isAllChecked=false;//全选失效
            }else{//单选
                var item = $scope.sr;
                if(item.serviceRequestState == 0){
                    layer.alert('服务请求已经是失效状态',{icon : 0});
                    return;
                }
                $scope.journal.serviceRequestId = item.serviceRequestId;
                $http.put(url + "/ServiceRequest/changeServiceState",{
                    ServiceRequestJournal : $scope.journal
                }).success(function(data){
                    $scope.journal.remarks = "";
                    layer.alert(data.Info.info.$);
                    $scope.load();
                }).error(function(){
                    layer.alert('关闭操作失败，请稍后重试',{icon : 0});
                    $scope.journal.remarks = "";
                });
            }

        }
        /**
         * 使选择的服务请求完成
         */
        $scope.allFinish=function(){
            if($scope.isAllChecked){
                $("#serviceFinish1").modal("show");
            }else{
                layer.alert('请先全选',{icon : 0});
            }
        };
        $scope.serviceFinish = function(){
            $scope.journal.changeState = 3;
            $scope.journal.operatorId = "d96ef6e0-548a-11e5-9e04-74d4359b657c"  //操作人id
            if($scope.isAllChecked){//全选
                $scope.allIds.serviceRequestState = 3;
                $scope.allIds.serviceRequestJournal=$scope.journal;
                $http.post(url+'/ServiceRequest/changeServiceRequestStateByIds',{ServiceRequest:$scope.allIds})
                    .success(function(data){
                        console.log(data);
                        layer.msg('完成操作成功',{icon : 1,time : 2000});
                        $scope.journal.remarks = "";
                    })
                    .error(function(){
                        layer.msg('完成操作失败，请稍后重试',{icon : 3,time : 2000});
                    });
                $scope.isAllChecked=false;//全选失效
            }else{//单选
                var item = $scope.sr;
                if(item.serviceRequestState == 3){
                    layer.alert('服务请求已经是完成状态',{icon : 0});
                    return;
                }
                $scope.journal.serviceRequestId = item.serviceRequestId;
                $http.put(url + "/ServiceRequest/changeServiceState",{
                    ServiceRequestJournal : $scope.journal
                }).success(function(data){
                    $scope.journal.remarks = "";
                    layer.alert(data.Info.info.$);
                    $scope.load();
                }).error(function(){
                    layer.alert('完成操作失败，请稍后重试',{icon : 0});
                    $scope.journal.remarks = "";
                });

            }
            $scope.load();//刷新页面
        }


        /****按钮操作结束************************/

    }]);
});
