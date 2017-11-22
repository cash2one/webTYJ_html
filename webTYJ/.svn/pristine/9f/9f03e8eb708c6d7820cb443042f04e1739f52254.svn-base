/**
 * Created by wuying on 16/5/4.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('orderListCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.videoUrl;
        $scope.show = true;
        $scope.show1 = true;
        $scope.invoiceLogShow = false;//收货单列表隐藏
        $scope.invoiceLogDetailsShow = false;//设备订单详情隐藏
        $scope.invoiceLogDetailsListShow = false;//收货单详情隐藏
        var saasUrl = $rootScope.saasUrl;//云平台路径
        //获取登录人员的公司Id
        var companyId ;
        var user = {employId : ''};
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        /**
         * 设备订单分页组件
         * 2016年5月25日 陈浪
         */
        $scope.page = {
            pageNo:1,//当前页
            pageSize:6,//每页条数
            start:0,//
            total:0,//总条数
            pageTotal:0,//总页数
            pages:[],
            load:null,
            prev:function(){
                if(this.pageNo>1){
                    this.pageNo-=1;
                    //$scope.load(this.pageNo,this.pageSize);
                    this.load(this.pageNo,this.pageSize);
                }
            },
            next:function(){
                if(this.pageNo<this.pageTotal){
                    this.pageNo+=1;
                    //$scope.load(this.pageNo,this.pageSize);
                    this.load(this.pageNo,this.pageSize);
                }},
            getPages:function(){
                if(this.pageTotal>5){
                    for(var i = 1 ;i<=5;i++){
                        this.pages.push(i)
                    }
                }else{
                    for(var n = 1 ;n<=this.pageTotal;n++){
                        this.pages.push(n)
                    }
                }
            },
            go: function (pageNo) {
                this.pageNo = pageNo;
                //$scope.load(this.pageNo,this.pageSize);
                this.load(this.pageNo,this.pageSize);
            },
            getList:function(data){
                var self = this;
                self.pageNo = data.pageNo;
                self.pageSize = data.pageSize;
                self.total = data.total;
                if (self.total > self.pageSize) {
                    if (self.total % self.pageSize > 0) {
                        self.pageTotal = Math.floor(self.total / self.pageSize) + 1;
                    } else {
                        self.pageTotal = self.total / self.pageSize;
                    }
                } else {
                    self.pageTotal = 1;
                }
                self.pages = [];
                self.getPages();
                return data.rows
            }
        };

        /**
         * 去除两边空格
         */
        function removeTrim(attr)
        {
            if(attr!=undefined)
            {
                return attr.replace(/(^\s*)|(\s*$)/g,'');
            }
        }

        //设备订单列表搜索条件
        $scope.order = {orderNum:'',number:'',custName:''};
        /**
         * 加载设备订单列表
         * @param pageNo 当前页
         * @param pageSize 每页条数
         * 2016年5月25日 陈浪
         */
        $scope.load = function(pageNo,pageSize) {
            $http.get(saasUrl+'/eqOrder/order_propertyLoad?page='+pageNo+
                '&rows='+pageSize+
                '&companyId='+$scope.user.companyId+
                '&orderNum='+removeTrim($scope.order.orderNum)+
                '&number='+removeTrim($scope.order.number)+
                '&custName='+removeTrim($scope.order.custName)
            ).success(function (data) {
                $scope.orders = $scope.page.getList(data);
                });
        };
        //页面加载完时加载数据
        $scope.load(1,6);
        //给分页请求函数赋值
        $scope.page.load = $scope.load;


        /**
         * 创建收货单分页
         * 2016年5月25日 陈浪
         */
        $scope.invoiceLogPage = $.extend({},{},$scope.page,true);

        var invoiceLogId = '';//保存查询条件
        /**
         * 加载收货单列表
         * @param pageNo
         * @param pageSize
         */
        $scope.loadInvoiceLog = function(pageNo,pageSize){
            $http.get(saasUrl+'/eqInvoiceLog/invoiceLogList?page='+pageNo+
                '&rows='+pageSize+
                '&orderId='+invoiceLogId
            ).success(function (data) {
                    $scope.invoiceLogs = $scope.invoiceLogPage.getList(data);
            });
        };
        //给收货单分页请求函数赋值
        $scope.invoiceLogPage.load = $scope.loadInvoiceLog;

        /**
         * 加载收货单列表
         * 2016年5月25日 陈浪
         */
        $scope.loadInvoiceLogDetailed = function () {
            $http.get(saasUrl+'/eqInvoice/detailed?'+
                'orderId='+invoiceLogId
            ).success(function (data) {
                    $scope.invoiceLogDetaileds = data.eqInvoiceLogList;

                });
        };


        $scope.eqContract={};

        /**
         * 设备订单列表选中
         */
        $scope.selected = function(item){
            $scope.eqContract = item.eqContract;
            $scope.btnIndex  = item.id;//选中样式
            invoiceLogId = item.id;//选中时赋值查询条件
            $scope.invoiceLogShow = true;
            $scope.invoiceLogDetailsShow = true;

            $scope.loadInvoiceLog(1,6);
            $scope.loadInvoiceLogDetailed();
        };

        /**
         * 创建收货单详情分页
         */
        $scope.invoiceLogDetailsPage = $.extend({},{},$scope.page,true);

        /**
         * 加载收货单详情
         * @param pageNo
         * @param pageSize
         */
        $scope.loadInvoiceLogDetailsList = function (pageNo, pageSize) {
            $http.get(saasUrl+'/eqInvoiceLog/invoiceLogDetailsList?'+
                'page='+pageNo+
                '&rows='+pageSize+
                '&outgoingBath='+outgoingBath+
                '&invoiceId='+invoiceId
            ).success(function (data) {
                    $scope.invoiceLogDetailsList = $scope.invoiceLogDetailsPage.getList(data);
                });
        }

        /**
         * 收货单列表选中
         */
        var outgoingBath = '',invoiceId = '';//查询条件
        $scope.invoiceLogDetailSelected = function (item) {
            $scope.btnIndex1 = item.id;
            $scope.invoiceLogDetailsListShow = true;
            outgoingBath = item.outgoingBath;
            invoiceId = item.invoiceId;
            $scope.loadInvoiceLogDetailsList(1,6);
        };

        //全选
        $scope.allChoose = function(){
            var choose = document.getElementsByName('choose');
            var chooseed = document.getElementById('chooseed');
            if(chooseed.checked==true){
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = true;
                }
            }else{
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = false;
                }
            }

        };

        //单选

        $scope.getChecked = function(id){
            var ids = document.getElementById(id);
            var num = 0;
            if(ids.checked==true){
                ids.checked = true;
            }else{
                ids.checked = false;
            }
            for(var i=0;i<$scope.invoiceLogs.length;i++){
                if(document.getElementById($scope.invoiceLogs[i].id).checked==true){
                    num++;
                }
            }
            if(num==$scope.invoiceLogs.length){
                document.getElementById('chooseed').checked = true;
                $scope.allChoose();
            }else{
                document.getElementById('chooseed').checked = false;
            }
        };


        $scope.confirm = function () {
            $scope.chooseDataId = '';
            var data = '';
            for(var i=0; i<$scope.invoiceLogs.length; i++){
                if(document.getElementById($scope.invoiceLogs[i].id).checked==true){
                    if(i==0){
                        data += $scope.invoiceLogs[i].outgoingBath;
                    } else {
                        data += "," + $scope.invoiceLogs[i].outgoingBath;
                    }
                }
            }
            if(data==''){
                layer.msg('请选择数据！',{icon:0,time:2000});
                return
            }

            var fd = new FormData();
            fd.append("outgoingBath", data);
            $http.post($rootScope.saasUrl+'/eqInvoiceLog/confirm', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function(data){
                if(data.state == 'error'){
                    layer.alert(data.info,{icon : 0});
                    return;
                } else {
                    var gatingNewList=[];
                    for(var i = 0; i < data.info.length; i++){
                        var item = {companyId : companyId,
                            equipmentName : data.info[i].eqName,
                            equipmentModel : data.info[i].eqModel,
                            equipmentSn : data.info[i].eqSn,
                            qualityTimeStart : new Date(data.info[i].startDate),
                            qualityTerm : data.info[i].dateLife};
                        gatingNewList.push(item)
                    }
                    $http.post(url + "/Gating/addNewGating/", {Gating:gatingNewList}).success(function(data){
                        if(data.state == 'success'){
                            layer.msg('保存成功！',{icon : 1,time : 1000});
                            var chooseed = document.getElementById('chooseed');
                            chooseed.checked = false;
                            $scope.loadInvoiceLog(1,6);
                        } else {
                            layer.msg('保存失败！',{icon : 2,time : 1000});
                        }
                    }).error(function(data,status,headers,config){
                        layer.msg('保存失败！',{icon : 2,time : 1000});
                    });
                }
            }).error(function(data, status, headers, config){
                layer.alert('确认收货失败！',{icon : 0});
                return;
            });
        };
    }]);
});

