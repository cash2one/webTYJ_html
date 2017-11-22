/**
 * Created by NM on 2018/1/18.
 * 系统报表
 */
'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('systemReportCtrl', ['$scope', '$http','$rootScope','$filter','$location', function ($scope,$http,$rootScope,$filter,$location) {
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        $scope.projectName=$scope.project.projectName;
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.show4 = false;

        var url = $rootScope.url;//目录
        /**
         * 显示新建方案
         */
        $scope.ago = function(){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;

        };
        $scope.now1 = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.show4 = false;
            $scope.Owe();
        };
        $scope.ago1 = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = true;
            $scope.CollectFee()
        };

        /**
         * 获取所有项目对象
         * */
        $http.get(url+'/Project/listAllProject').success(function(data){
            $scope.projects=data.Project;
            console.log(data);
        }).error(function(data, status, headers, config){
            layer.msg("查询项目失败",{icon:2});
        });

        /**
         * 获取项目下管理人数
         */
        var getChargeAccountNum=function(item){
            $http.get(url+'/AssetAccount/countAccountNumByProjectId/'+item).success(function(data){
                console.log(data);
                $scope.chargeAccountNum=data;
            }).error(function(data, status, headers, config){
                layer.msg("获取项目下管理人数失败",{icon:2});
            });
        };

        /**
         * 获取所有收费项目对象
         */
        $scope.bills=[]//收费对象信息
        $scope.bill={};//用于条件查询，默认项目为深圳桃源居，时间为当前时间
        $scope.bill.projectId='1';//深圳桃源居
      /*  $scope.bill.billDate=new Date();//当前时间*/

        //alert($filter('currency')(11.0,'$'));
        /**
         * 应收款报表
         */
        $scope.getInfo=function(){
            console.log($scope.bill);
            getChargeAccountNum($scope.bill.projectId);
            $http.post(url+'/Bill/getBillsByProjectIdAndDate',{Bill:$scope.bill}).success(function(data){
                console.log(data);
                $scope.billsForBillingSum=data.Bill;
                var datas = [];
                for(var i=0;i<$scope.billsForBillingSum.length;i++){
                    var data = [$scope.billsForBillingSum[i].chargeItemType,$scope.billsForBillingSum[i].billingSum];
                    datas.push(data);
                    if("合计"==$scope.billsForBillingSum[i].chargeItemName){
                        $scope.totalBillingSum=$scope.billsForBillingSum[i].billingSum;
                    }
                }
                console.log(datas);
                //绘制饼状图#6633cc,#ff3366,#99ff33,#ffff33
                $.jqplot('pieChart1',[datas],{
                    title:$filter('date')(new Date($scope.bill.billDate),'yyyy年MM月')+'收费项目应收款情况',
                    seriesColors:["#f6ff00","#02c226","#04ccca","#0031fd","#ff00ea","#e60012"],
                    seriesDefaults:{
                        renderer:$.jqplot.PieRenderer,
                        rendererOptions:{
                            showDataLabels:true
                        }
                    },
                    legend:{
                        show:true,
                        location:'e'
                    }
                });
            }).error(function(data, status, headers, config){
                layer.msg("查询应收款对象失败",{icon:2});
            });
        };
        $scope.getInfo();

        /**
         * 收款报表
         */
        $scope.bills1=[]//收费对象信息
        $scope.bill1={};//用于条件查询，默认项目为深圳桃源居，时间为当前时间
        $scope.bill1.projectId='1';//深圳桃源居
        $scope.bill1.billDate=new Date();//当前时间
        $scope.getInfo1=function(){
            console.log($scope.bill1);
            getChargeAccountNum($scope.bill1.projectId);
            $http.post(url+'/Bill/getBillsByProjectIdAndDate',{Bill:$scope.bill1}).success(function(data){
                console.log(data);
                $scope.billsForCollectSum=data.Bill;
                var datas = [];
                for(var i=0;i<$scope.billsForCollectSum.length;i++){
                    var data = [$scope.billsForCollectSum[i].chargeItemType,$scope.billsForCollectSum[i].collectSum];
                    datas.push(data);
                    if("合计"==$scope.billsForCollectSum[i].chargeItemName){
                        $scope.totalCollectSum=$scope.billsForCollectSum[i].collectSum;
                    }
                }
                console.log(datas);
                //绘制饼状图
                $.jqplot('pieChart2',[datas],{
                    title:$filter('date')(new Date($scope.bill1.billDate),'yyyy年MM月')+'收费项目收款情况',
                    seriesColors:["#f6ff00","#02c226","#04ccca","#0031fd","#ff00ea","#e60012"],
                    seriesDefaults:{
                        renderer:$.jqplot.PieRenderer,
                        rendererOptions:{
                            showDataLabels:true
                        }
                    },
                    legend:{
                        show:true,
                        location:'e'
                    }
                });
            }).error(function(data, status, headers, config){
                alert("查询应收款对象失败");
            });
        };
        /**
         * 应收款表
         */
        $scope.now = function(){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.getInfo();
        };
        /**
         *  收款报表 */
        $scope.ago = function(){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.getInfo1();
        };

        /**
         *  根据一级项目数据过去二级详细收费项目信息
         * @param item
         */
        $scope.getSubBills=function(item){
            $http.post(url+'/Bill/getSubBillsForSubChargeItem',{Bill:item}).success(function(data){
                console.log(data);
                $scope.subBills=data.Billing;
            }).error(function(data, status, headers, config){
                alert("查询子收费项目对象失败");
            });
        };
        /* 欠费详情*/
        $scope.detailed=false
        $scope.showDetailed=function(item){
            $scope.detailed=true;
            $http.post(url+'/Bill/getSubBillsForSubChargeItem',{Bill:item}).success(function(data){
                console.log(data);
                $scope.ee=data.Bill;
            }).error(function(data, status, headers, config){
                alert("查询子收费项目对象失败");
            });
        };
        /*
         欠费报表
         */
        $scope.Owe=function(){
            $http.post(url+'/Bill/getOwe',{Bill:$scope.bill}).success(function(data){
                console.log(data);
                $scope.owe=data.Bill;
                var datas = [];
                for(var i=0;i<$scope.owe.length;i++){
                    var data = [$scope.owe[i].chargeItemType,$scope.owe[i].noCollectSum];
                    datas.push(data);
                    if("合计"==$scope.owe[i].chargeItemName){
                        $scope.totalSum1=$scope.owe[i].noCollectSum;
                    }
                }
                console.log(datas);
                //绘制饼状图
                $.jqplot('piChart',[datas],{
                    title:$filter('date')(new Date($scope.bill1.billDate),'yyyy年MM月')+'收费项目欠款情况',
                    seriesDefaults:{
                        renderer:$.jqplot.PieRenderer,
                        rendererOptions:{
                            showDataLabels:true
                        }
                    },
                    legend:{
                        show:true,
                        location:'e'
                    }
                });
            }).error(function(data, status, headers, config){
                alert("查询应收款对象失败");
            });
        };
        /*
         收缴率报表
         */
        $scope.CollectFee=function(){
            $http.post(url+'/Bill/getCollectFee',{Bill:$scope.bill}).success(function(data){
                console.log(data);
                $scope.collectFee=data.Bill;
                var datas = [];
                for(var i=0;i<$scope.collectFee.length;i++){

                    if("合计"==$scope.collectFee[i].chargeItemName){
                        $scope.totalSum1=$scope.collectFee[i].noCollectSum;
                        $scope.totalSum2=$scope.collectFee[i].collectSum;

                        var data = ['未缴费',$scope.totalSum1];
                        datas.push(data);
                        var das =['已缴费',$scope.totalSum2]
                        datas.push(das);
                    }

                }
                console.log(datas);
                //绘制饼状图
                $.jqplot('pChart',[datas],{
                    title:$filter('date')(new Date($scope.bill1.billDate),'yyyy年MM月')+'收费项目收缴率情况',
                    seriesDefaults:{
                        renderer:$.jqplot.PieRenderer,
                        rendererOptions:{
                            showDataLabels:true
                        }
                    },
                    legend:{
                        show:true,
                        location:'e'
                    }
                });
            }).error(function(data, status, headers, config){
                alert("查询应收款对象失败");
            });
        };
        /*导出收缴率 */
        $scope.ExportExcel=function(){
            $http.post(url+'/Bill/getCollectFee',{Bill:$scope.bill}).success(function(data) {
                console.log(data);
                $scope.collectFee = data.Bill;
                var datas = [];
                for (var i = 0; i < $scope.collectFee.length; i++) {

                    if ("合计" == $scope.collectFee[i].chargeItemName) {
                        $scope.totalSum1 = $scope.collectFee[i].noCollectSum;
                        $scope.totalSum2 = $scope.collectFee[i].collectSum;

                        var data = ['未缴费', $scope.totalSum1];
                        datas.push(data);
                        var das = ['已缴费', $scope.totalSum2]
                        datas.push(das);

                        $scope.billExport={};
                        $scope.billExport.notReceive= $scope.totalSum1;
                        $scope.billExport.receive=$scope.totalSum2;
                    }
                }

                $scope.billExport.billDate=$scope.bill1.billDate;
                console.log(datas)
                $http.post(url+'/Bill/exportExcelFile',{BillExport: $scope.billExport}).success(function(data){
                    console.log(data);
                }).error(
                    console.log("ooh ! No no no no ...")
                )
            });

        }

    }]);
});