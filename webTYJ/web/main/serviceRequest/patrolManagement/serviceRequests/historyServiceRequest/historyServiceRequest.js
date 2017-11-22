/**
 * Created by 杨升权 on 2016/7/29.
 * 巡检服务请求 历史请求
 */

define(function (require) {
    var app = require('../../../../../app');

    app.controller('historyServiceRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.serviceRequests={serviceRequestType:'',page:{}};
        $scope.load=function(){
            $scope.serviceRequests.serviceRequestType=9;
            var fetchFunction = function (page, callback) {
                $scope.serviceRequests.page = page;
                $http.post(url + '/ServiceRequest/listPageInspectionServiceRequestbyStateAndType1', {ServiceRequest: $scope.serviceRequests}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        };
        $scope.load();
        //得到操作的对象
        $scope.object1={};

        //查看任务
        $scope.selectTasks=function(item){
            if(item!=null){
                //将值传递到任务页面
                $scope.id=item.serviceRequestId;//服务请求id
                sessionStorage.setItem("data1",$scope.id);
                $location.path("/index/serviceRequest/patrolManagement/serviceTasks/isGoingTasks");

            }else{
                alert("无效的服务ID！");
            }
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
         * 点击选中
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

    }]);
});