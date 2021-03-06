/**
 * Created by NM on 2018/1/18.
 * 收款台js
 */
'use strict';
define(function (require) {
    var app = require('../../../../../app');
    app.controller('cashiersCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.doClickForAccount(6);
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        var booltemp=0;
        $scope.advancePaymentsDetails = {};
        var user = {employId: ''};
        var userCookie = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        $scope.user = userCookie ? userCookie : user;
        $scope.cashierStatus=$scope.user.cashierStatus;
        $scope.cashierLeaderStatus=$scope.user.cashierLeaderStatus;
        $scope.staffid = $scope.user.staff.staffId;
        $scope.staffNumber = $scope.user.staff.staffNo;
        $scope.collectSum = function () {
            //得到从账单查询 购物车传过来的数据
            $scope.data1 = {list: []};
            var data1 = sessionStorage.getItem("data1");
            $scope.data1 = JSON.parse(data1);
            $scope.totals = 0.0;
            $scope.totalsData = 0.0;
            if ($scope.data1 == null) {
                return;
            }
            $scope.paymentNum=$scope.data1.paymentNum;
            for (var j = 0; j < $scope.data1.list.length; j++) {
                $scope.totals = $scope.totals + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
                $scope.totalsData  =$scope.totalsData + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
            }
            $scope.custId = $scope.data1.custId;
            $scope.assetAccountId = $scope.data1.assetAccountId;
            $scope.assetAccountNum=$scope.data1.assetAccountNum;
        }
        $scope.collectSum();

        //充值
        $scope.assetSum = function(){
            $scope.assetAccount1 = {};
            var assetAccount1 = sessionStorage.getItem("AssetAccount");
            $scope.assetAccount1 = JSON.parse(assetAccount1);
            $scope.totalsAsset= 0.0;
            if ($scope.assetAccount1 == null) {
                return;
            }
            $scope.totals = $scope.totals + $scope.assetAccount1.addPrice;
            $scope.totalsAsset = $scope.totalsAsset + $scope.assetAccount1.addPrice;
            $scope.paymentNum = $scope.assetAccount1.transactionNum;
            if($scope.assetAccount1.chargeTypeId != null){
                $http.get(url+"/ChargeType/getChargeTypeById/"+$scope.assetAccount1.chargeTypeId).success(function(data){
                    $scope.assetAccount1.chargeTypeName=data.ChargeType.chargeTypeName;
                });
            }
        }
        $scope.assetSum();
        //获取当前时间
        $scope.timeDate = new Date();
        //得到收银员信息
        $http.get(url + '/staff/getStaffById/' + $scope.staffid).success(function (data) {
            $scope.financial = data.Staff;
        });
        $scope.chkDataTmp = [];
        $scope.chkData = function (item) {
            var chk = document.getElementById(item.billNum);
            if (chk.checked == true) {
                item.money=item.totalCurrentOweSum + item.totalOverdue + item.totalLastOweSum;
                $scope.chkDataTmp.push(item);
            } else {
                for (var i = 0; i < $scope.chkDataTmp.length; i++) {
                    if ($scope.chkDataTmp[i] == item) {
                        $scope.chkDataTmp.splice(i, 1);
                    }
                }
            }
        };

        $scope.chkAssetTmp = [];
        $scope.chkAsset = function (index) {
            var chk = document.getElementById(index);
            if (chk.checked == true) {
                $scope.chkAssetTmp.push(index);
            } else {
                for (var i = 0; i < $scope.chkAssetTmp.length; i++) {
                    if ($scope.chkAssetTmp[i] == index) {
                        $scope.chkAssetTmp.splice(i, 1);
                    }
                }
            }
        };

        //得到结算的数据
        $scope.toDelete = function () {
            var arrDel = new Array();
            var pos = 0;
            if ($scope.chkDataTmp.length == 0 && $scope.chkAssetTmp.length == 0) {
                layer.msg("请选择需要删除的数据!", {icon: 0});
                return;
            }

            layer.confirm('您确定要删除选中的数据?', {btn: ['是', '否']}, function () {
                $scope.$apply(function(){
                    for (var i = 0; i < $scope.chkDataTmp.length; i++) {
                        for (var j = 0; j < $scope.data1.list.length; j++) {
                            if ($scope.chkDataTmp[i].billNum == $scope.data1.list[j].billNum) {
                                $scope.data1.list.splice(j, 1);
                                $scope.chkDataTmp.splice(i, 1);
                                i--;
                                break;
                            }
                        }
                    }
                });
                layer.msg("删除成功!",{icon:0});
                var data1 = JSON.stringify($scope.data1);
                sessionStorage.setItem("data1", data1);
                if ($scope.assetAccount1 != null && $scope.chkAssetTmp[0] == $scope.assetAccount1.transactionNum) {
                    $scope.$apply(function(){
                        $scope.assetAccount1 = {};
                    });
                }
                var assetAccount2 = JSON.stringify($scope.assetAccount1);
                sessionStorage.setItem("AssetAccount", assetAccount2);
                if($scope.assetAccount1!=null) {
                    if ($scope.assetAccount1.addPrice == null) {
                        $scope.totalsAsset = 0.0;
                    }
                }
                var data1 = sessionStorage.getItem("data1");
                $scope.totalsData = 0.0;
                for (var j = 0; j < $scope.data1.list.length; j++) {
                    $scope.totalsData  =$scope.totalsData + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
                }
                if($scope.data1.list == 0){
                    $scope.totalsData = 0.0;
                }
                $scope.$apply(function() {
                    $scope.totalsData;
                });
            });
        }

        //结算
        $scope.show1 = false;
        $scope.paymentDetails = {};
        $scope.count = function () {
            if($scope.cashierStatus=='1' || $scope.cashierLeaderStatus=='1'){
                if ($scope.chkDataTmp.length == 0 && $scope.chkAssetTmp.length == 0) {
                    layer.msg("未选择结算类型!", {icon: 0});
                    return;
                }
                if ($scope.chkDataTmp.length != 0 && $scope.chkAssetTmp.length != 0) {
                    layer.msg("只能选择一种收费类型!", {icon: 0});
                    return;
                }
                $scope.chkDataSum=0.0;
                if($scope.chkDataTmp !=null){
                    for(var i=0; i<$scope.chkDataTmp.length; i++){
                        $scope.chkDataSum += $scope.chkDataTmp[i].totalCurrentOweSum+$scope.chkDataTmp[i].totalOverdue+$scope.chkDataTmp[i].totalLastOweSum;
                    }
                }
                if($scope.chkAssetTmp.length !=0){
                    $scope.chkDataSum = $scope.assetAccount1.addPrice;
                }

                $scope.paymentDetails.cashSum = null;
                $scope.paymentDetails.creditCardSum = null;
                $scope.paymentDetails.wechatSum = null;
                if ($scope.data1 !=null || $scope.assetAccount1 != null) {
                    $scope.paymentDetails = {};
                    booltemp=0;
                    angular.element('#showAccount').modal({backdrop: 'static', keyboard: false});
                    $scope.$watch('paymentDetails.wechatSum', function () {
                        if ($scope.paymentDetails.wechatSum > 0) {

                            $scope.show1 = true;
                        } else {
                            $scope.show1 = false;
                        }
                    });
                } else {
                    layer.msg("无结算的数据!", {icon: 0});
                }
            }else{
                layer.msg('该操作人员无权限操作!',{icon : 0,time : 1000});
            }

        };

        Date.prototype.format = function (format) {
            var args = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
        };
        //充值点击结算之前打印小票
        var assetAccount1 = sessionStorage.getItem("AssetAccount");
        var data1 = sessionStorage.getItem("data1");
        $scope.print = function () {
            if ($scope.chkDataTmp.length == 0 && $scope.chkAssetTmp.length == 0) {
                layer.msg("未选择结算类型!", {icon: 0});
                return;
            }
            if ($scope.chkDataTmp.length != 0 && $scope.chkAssetTmp.length != 0) {
                layer.msg("只能选择一种收费类型!", {icon: 0});
                return;
            }
            $scope.chkDataSum=0.0;
            if($scope.chkDataTmp !=null){
                for(var i=0; i<$scope.chkDataTmp.length; i++){
                    $scope.chkDataSum += $scope.chkDataTmp[i].totalCurrentOweSum+$scope.chkDataTmp[i].totalOverdue+$scope.chkDataTmp[i].totalLastOweSum;
                }
            }
            if($scope.assetAccount1 != null && $scope.assetAccount1.addMoneyType == "1" &&$scope.chkAssetTmp.length!=0){
                var LODOP = getLodop();
                LODOP.PRINT_INIT("打印单");
                LODOP.SET_PRINT_PAGESIZE(0, 760, 1000, "A4");
                LODOP.SET_PRINT_STYLE("FontSize", 8);
                LODOP.ADD_PRINT_TEXT(5, 5, 740, 25, "打单");
                LODOP.ADD_PRINT_TEXT(25, 85, 740, 25, "深圳桃源居管理处");
                LODOP.ADD_PRINT_TEXT(45, 75, 740, 25, new Date().format("yyyy-MM-dd hh:mm:ss"));
                LODOP.ADD_PRINT_TEXT(65, 10, 740, 25, "收银员:" + $scope.staffNumber);
                LODOP.ADD_PRINT_TEXT(85, 10, 740, 25, "交易单号" + $scope.paymentNum);
                LODOP.ADD_PRINT_TEXT(105,10,740,25,"地址");
                LODOP.ADD_PRINT_TEXT(125, 10, 740, 25, "收费项目");
                LODOP.ADD_PRINT_TEXT(125, 80, 740, 25, "数量");
                LODOP.ADD_PRINT_TEXT(125, 130, 740, 25, "单价");
                LODOP.ADD_PRINT_TEXT(125, 200, 740, 25, "总价");
                LODOP.ADD_PRINT_TEXT(135, 10, 740, 25, "-------------------------------------");
                LODOP.ADD_PRINT_TEXT(145, 10, 740, 25,"充值", 7, 65);
                LODOP.ADD_PRINT_TEXT(145, 80, 740, 25, "1", 47, 65);
                LODOP.ADD_PRINT_TEXT(145, 125, 740, 25,parseFloat(  $scope.assetAccount1.addPrice).toFixed(2));
                LODOP.ADD_PRINT_TEXT(145, 195, 740, 25,parseFloat(  $scope.assetAccount1.addPrice).toFixed(2));
                LODOP.ADD_PRINT_TEXT(155, 10, 740, 25, "-------------------------------------");
                LODOP.ADD_PRINT_TEXT(175, 150, 740, 25, "总计:" + parseFloat($scope.assetAccount1.addPrice).toFixed(2));
                LODOP.ADD_PRINT_TEXT(195, 10, 740, 25, "折扣:0.00");
                LODOP.ADD_PRINT_TEXT(215, 10, 740, 25, "应收金额:" + parseFloat($scope.assetAccount1.addPrice).toFixed(2));

                LODOP.PREVIEW();
            }
            if (data1!= null && $scope.data1.chargeType == "2"&&$scope.chkDataTmp.length!=0) {
                $scope.paymentDetails.financialStaffId = $scope.staffid;//操作人 员工id
                $scope.paymentDetails.financialStaffName = $scope.financial.staffName;//操作人姓名
                $scope.paymentDetails.custId = $scope.custId;//客户id
                $scope.paymentDetails.bills = $scope.chkDataTmp;
                $scope.paymentDetails.assetAccountId = $scope.assetAccountId;
                $scope.paymentDetails.paymentNum = $scope.paymentNum;
                $scope.paymentDetails.staffNumber = $scope.staffNumber;

                /* $http.post(url + '/PaymentDetails/printPaymentBills', {PaymentDetails: $scope.paymentDetails}).success(function () {
                 });*/
                $scope.totalsData = 0.0;
                for (var j = 0; j < $scope.data1.list.length; j++) {
                    $scope.totalsData  =$scope.totalsData + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
                }

                var LODOP = getLodop();
                LODOP.PRINT_INIT("打印单");
                //1---纵向打印，固定纸张；
                //2---横向打印，固定纸张；
                //3---纵向打印，宽度固定，高度按打印内容的高度自适应(见样例18)；
                //0---方向不定，由操作者自行选择或按打印机缺省设置。
                //width
                //height
                //纸张名称
                LODOP.SET_PRINT_PAGESIZE(0, 760, 1000, "A4");
                //字体风格,字体大小
                LODOP.SET_PRINT_STYLE("FontSize", 8);
                //设置坐标top,left,width,height,内容
                LODOP.ADD_PRINT_TEXT(5, 5, 740, 25, "打单");
                LODOP.ADD_PRINT_TEXT(25, 85, 740, 25, "深圳桃源居管理处");
                LODOP.ADD_PRINT_TEXT(45, 75, 740, 25, new Date().format("yyyy-MM-dd hh:mm:ss"));
                LODOP.ADD_PRINT_TEXT(65, 10, 740, 25, "收银员:" + $scope.staffNumber);
                LODOP.ADD_PRINT_TEXT(85, 10, 740, 25, "交易单号" + $scope.paymentNum);

                LODOP.ADD_PRINT_TEXT(105,10,740,25,"地址");
                LODOP.ADD_PRINT_TEXT(125, 10, 740, 25, "收费项目");
                LODOP.ADD_PRINT_TEXT(125, 80, 740, 25, "数量");
                LODOP.ADD_PRINT_TEXT(125, 130, 740, 25, "单价");
                LODOP.ADD_PRINT_TEXT(125, 200, 740, 25, "总价");
                LODOP.ADD_PRINT_TEXT(135, 10, 740, 25, "-------------------------------------");
                for (var j = 0; j < $scope.chkDataTmp.length; j++) {
                    var temp = 20 * j;
                    LODOP.ADD_PRINT_TEXT(temp + 145, 10, 740, 25, $scope.chkDataTmp[j].chargeTypeName, 7, 65);
                    LODOP.ADD_PRINT_TEXT(temp + 145, 80, 740, 25, "1", 47, 65);
                    $scope.sum = $scope.chkDataTmp[j].totalOverdue + $scope.chkDataTmp[j].totalLastOweSum + $scope.chkDataTmp[j].totalCurrentOweSum;
                    $scope.sum = parseFloat($scope.sum).toFixed(2);
                    LODOP.ADD_PRINT_TEXT(temp + 145, 125, 740, 25, $scope.sum);
                    LODOP.ADD_PRINT_TEXT(temp + 145, 195, 740, 25, $scope.sum);
                }
                var length = $scope.chkDataTmp.length;
                LODOP.ADD_PRINT_TEXT(length * 20 + 135, 10, 740, 25, "-------------------------------------");

                LODOP.ADD_PRINT_TEXT(155 + length * 20, 150, 740, 25, "总计:" + parseFloat($scope.chkDataSum).toFixed(2));
                LODOP.ADD_PRINT_TEXT(175 + length * 20, 10, 740, 25, "折扣:0.00");
                LODOP.ADD_PRINT_TEXT(195 + length * 20, 10, 740, 25, "应收金额:" + parseFloat($scope.chkDataSum).toFixed(2));
                //直接打印
                //LODOP.PRINT();
                //打印预览
                LODOP.PREVIEW();

            }
        }
        //确认
        $scope.sum1 = 0.0;
        $scope.insertAccount = function () {
            $scope.s1 = document.getElementById("money").value;
            $scope.s2 = document.getElementById("credit").value;
            $scope.s3 = document.getElementById("wechat").value;

            var s1Tmp = app.get('valueCheck').isNumberOrNull( $scope.s1);
            if(s1Tmp.state == false){
                layer.msg(s1Tmp.info,{icon : 0,time : 2000});
                return;
            }
            var s2Tmp = app.get('valueCheck').isNumberOrNull( $scope.s2);
            if(s2Tmp.state == false){
                layer.msg(s2Tmp.info,{icon : 0,time : 2000});
                return;
            }
            var s3Tmp = app.get('valueCheck').isNumberOrNull( $scope.s3);
            if(s3Tmp.state == false){
                layer.msg(s3Tmp.info,{icon : 0,time : 2000});
                return;
            }
            $scope.toatl = $scope.s1 * 1 + $scope.s2 * 1 + $scope.s3 * 1 ;//得到所有交账金额的值

            if ($scope.s1 == "" && $scope.s2 == "" && $scope.s3 == "") {
                layer.msg("请输入结算金额！", {icon: 0});
                return;
            } else {
                if($scope.s1+$scope.s2+$scope.s3 == 0){
                    layer.msg("结算金额总和不能为0！", {icon: 0});
                    return;
                }
                if($scope.assetAccount1 != null && $scope.assetAccount1.addMoneyType == "1"){
                    if(($scope.s1 != "" && $scope.s2 != "") || ($scope.s1 != "" && $scope.s3 != "") || ($scope.s2 != "" && $scope.s3 != "") || ($scope.s1 != "" && $scope.s2 != "" && $scope.s3 != "")){
                        layer.msg("只能选择一种充值方式！", {icon: 0});
                        return;
                    }
                }

                if($scope.assetAccount1 != null && $scope.assetAccount1.addMoneyType != "1"){
                    if($scope.s1 != "" && $scope.s1 < $scope.assetAccount1.addPrice){
                        layer.msg("结算金额不能小于充值金额！", {icon: 0});
                        return;
                    }
                    if($scope.s2 != "" && $scope.s2 < $scope.assetAccount1.addPrice){
                        layer.msg("结算金额不能小于充值金额！", {icon: 0});
                        return;
                    }
                    if($scope.s3 != "" && $scope.s3 < $scope.assetAccount1.addPrice){
                        layer.msg("结算金额不能小于充值金额！", {icon: 0});
                        return;
                    }
                }

                console.info($scope.totalsData);
                if ($scope.data1.list[0] != null && $scope.data1.chargeType == "2") {
                    if ($scope.s2 != "" && $scope.s3 == "" && ($scope.s2 * 1) > $scope.totalsData) {
                        layer.msg("结算金额有误！", {icon: 0});
                        return;
                    }
                    if ($scope.s2 == "" && $scope.s3 != "" && ($scope.s3 * 1 ) > $scope.totalsData) {
                        layer.msg("结算金额有误！", {icon: 0});
                        return;
                    }
                    if ($scope.s2 != "" && $scope.s3 != "" && ($scope.s2 * 1 + $scope.s3 * 1) > $scope.totalsData) {
                        layer.msg("结算金额有误！", {icon: 0});
                        return;
                    }
                }

                $scope.chkDataSum = 0.0;
                $scope.assetAccountSum = 0.0;
                if($scope.assetAccount1 != null){
                    $scope.assetAccountSum = $scope.assetAccount1.addPrice;
                }
                if($scope.chkDataTmp !=null){
                    for(var i=0; i<$scope.chkDataTmp.length; i++){
                        $scope.chkDataSum += $scope.chkDataTmp[i].totalCurrentOweSum+$scope.chkDataTmp[i].totalOverdue+$scope.chkDataTmp[i].totalLastOweSum;
                    }
                }

                if ($scope.s1 != "" || $scope.s2 != "" || $scope.s3 != "") {
                    if ($scope.chkAssetTmp.length != 0) {
                        var tmp = false;
                        $scope.assetAccount1.paymentType = null;
                        if($scope.s1 != "" || $scope.s1!=0){
                            $scope.assetAccount1.paymentType = 0;
                        }
                        if($scope.s2 != "" || $scope.s2!=0){
                            if($scope.assetAccount1.paymentType != null){
                                tmp = true;
                            }else{
                                $scope.assetAccount1.paymentType = 1;
                            }
                        }
                        if($scope.s3 != ""|| $scope.s3!=0){
                            if($scope.assetAccount1.paymentType != null){
                                tmp = true;
                            }else{
                                $scope.assetAccount1.paymentType = 2;
                            }
                        }
                        if(tmp){
                            $scope.assetAccount1.paymentType = {};
                        }
                        $scope.paymentDetails.financialStaffId = $scope.staffid;//操作人 员工id
                        $scope.paymentDetails.financialStaffName = $scope.financial.staffName;//操作人姓名
                        $scope.paymentDetails.custId = $scope.custId;//客户id
                        $scope.assetAccount1.paymentDetails = $scope.paymentDetails;
                        //充值
                        //充值结算后打印
                        if($scope.paymentDetails.cashSum==null)
                        {
                            $scope.paymentDetails.cashSum=0.00;
                        }
                        if($scope.paymentDetails.wechatSum==null)
                        {
                            $scope.paymentDetails.wechatSum=0.00;
                        }
                        if($scope.paymentDetails.creditCardSum==null)
                        {
                            $scope.paymentDetails.creditCardSum=0.00;
                        }

                        if($scope.assetAccount1 != null && $scope.assetAccount1.addMoneyType == "1" &&$scope.chkAssetTmp.length!=0) {

                            layer.confirm('是否需要打印小票?', {
                                btn: ['确定', '取消']
                            }, function () {
                                    var LODOP = getLodop();
                                    LODOP.PRINT_INIT("打印单");
                                    LODOP.SET_PRINT_PAGESIZE(0, 760, 1000, "A4");
                                    LODOP.SET_PRINT_STYLE("FontSize", 8);
                                    LODOP.ADD_PRINT_TEXT(5, 5, 740, 25, "结算单");
                                    LODOP.ADD_PRINT_TEXT(25, 85, 740, 25, "深圳桃源居管理处");
                                    LODOP.ADD_PRINT_TEXT(45, 75, 740, 25, new Date().format("yyyy-MM-dd hh:mm:ss"));
                                    LODOP.ADD_PRINT_TEXT(65, 10, 740, 25, "收银员:" + $scope.staffNumber);
                                    LODOP.ADD_PRINT_TEXT(85, 10, 740, 25, "交易单号" + $scope.paymentNum);
                                    LODOP.ADD_PRINT_TEXT(105,10,740,25,"地址");
                                    LODOP.ADD_PRINT_TEXT(125, 10, 740, 25, "收费项目");
                                    LODOP.ADD_PRINT_TEXT(125, 80, 740, 25, "数量");
                                    LODOP.ADD_PRINT_TEXT(125, 130, 740, 25, "单价");
                                    LODOP.ADD_PRINT_TEXT(125, 200, 740, 25, "总价");
                                    LODOP.ADD_PRINT_TEXT(135, 10, 740, 25, "-------------------------------------");
                                    LODOP.ADD_PRINT_TEXT(145, 10, 740, 25,"充值", 7, 65);
                                    LODOP.ADD_PRINT_TEXT(145, 80, 740, 25, "1", 47, 65);
                                    LODOP.ADD_PRINT_TEXT(145, 125, 740, 25,parseFloat(  $scope.assetAccount1.addPrice).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(145, 195, 740, 25,parseFloat(  $scope.assetAccount1.addPrice).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(155, 10, 740, 25, "-------------------------------------");
                                    LODOP.ADD_PRINT_TEXT(175, 150, 740, 25, "总计:" + parseFloat($scope.assetAccount1.addPrice).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(195, 10, 740, 25, "折扣:0.00");
                                    LODOP.ADD_PRINT_TEXT(215, 10, 740, 25, "应收金额:" + parseFloat($scope.assetAccount1.addPrice).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(220 + length * 20, 10, 740, 25, "实收金额:" + parseFloat($scope.paymentDetails.cashSum+$scope.paymentDetails.creditCardSum+$scope.paymentDetails.wechatSum).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(240 + length * 20, 30, 740, 25, "现金:" + parseFloat($scope.paymentDetails.cashSum).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(260 + length * 20, 30, 740, 25, "刷卡:" + parseFloat($scope.paymentDetails.creditCardSum).toFixed(2));
                                    LODOP.ADD_PRINT_TEXT(280 + length * 20, 30, 740, 25, "微信:" + parseFloat($scope.paymentDetails.wechatSum).toFixed(2));
                                    if($scope.paymentDetails.cashSum+$scope.paymentDetails.creditCardSum+$scope.paymentDetails.wechatSum-$scope.assetAccount1.addPrice>0) {
                                        LODOP.ADD_PRINT_TEXT(240 + length * 20, 100, 740, 25, "找零:" + parseFloat($scope.paymentDetails.cashSum+$scope.paymentDetails.creditCardSum+$scope.paymentDetails.wechatSum-$scope.assetAccount1.addPrice).toFixed(2));
                                    }else{
                                        LODOP.ADD_PRINT_TEXT(240 + length * 20, 100, 740, 25, "找零:0.00");
                                    }




                                    LODOP.PREVIEW();

                                $http.put(url + '/AssetAccount/topUP', {AssetAccount: $scope.assetAccount1}).success(function (data) {
                                    $scope.assetAccount1 = {};
                                    $scope.totalsAsset = 0.0;
                                    $scope.$apply(function() {
                                        $scope.totalsAsset;
                                    });
                                    var assetAccount1 = JSON.stringify($scope.assetAccount1);
                                    sessionStorage.setItem("AssetAccount", assetAccount1);
                                    $scope.chkAssetTmp = [];
                                    $scope.showChange();
                                }).error(function (data) {
                                    layer.msg('充值失败，请重试！', {icon: 2, time: 1000});
                                });

                            },
                            function(){
                                $http.put(url + '/AssetAccount/topUP', {AssetAccount: $scope.assetAccount1}).success(function (data) {
                                    $scope.assetAccount1 = {};
                                    $scope.totalsAsset = 0.0;
                                    $scope.$apply(function() {
                                        $scope.totalsAsset;
                                    });
                                    var assetAccount1 = JSON.stringify($scope.assetAccount1);
                                    sessionStorage.setItem("AssetAccount", assetAccount1);
                                    $scope.chkAssetTmp = [];
                                    $scope.showChange();
                                }).error(function (data) {
                                    layer.msg('充值失败，请重试！', {icon: 2, time: 1000});
                                });
                            }
                            );
                        }





                    }
                    if ($scope.chkDataTmp.length != 0) {
                        //其他方式付款
                        $scope.chkDataSum = 0;
                        for (var i = 0; i < $scope.chkDataTmp.length; i++) {
                            $scope.chkDataSum += $scope.chkDataTmp[i].totalCurrentOweSum + $scope.chkDataTmp[i].totalOverdue + $scope.chkDataTmp[i].totalLastOweSum;
                        }
                        $scope.paymentDetails.financialStaffId = $scope.staffid;//操作人 员工id
                        $scope.paymentDetails.financialStaffName = $scope.financial.staffName;//操作人姓名
                        $scope.paymentDetails.custId = $scope.custId;//客户id
                        $scope.paymentDetails.bills = $scope.chkDataTmp;
                        $scope.paymentDetails.assetAccountId = $scope.assetAccountId;
                        $scope.paymentDetails.paymentNum = $scope.paymentNum;
                        $scope.paymentDetails.staffNumber = $scope.staffNumber;
                        $scope.paymentDetails.assetAccountNum = $scope.assetAccountNum;
                        //打印小票
                        if($scope.paymentDetails.cashSum==null)
                        {
                            $scope.paymentDetails.cashSum=0.00;
                        }
                        if($scope.paymentDetails.wechatSum==null)
                        {
                            $scope.paymentDetails.wechatSum=0.00;
                        }
                        if($scope.paymentDetails.creditCardSum==null)
                        {
                            $scope.paymentDetails.creditCardSum=0.00;
                        }
                        layer.confirm('是否需要打印小票?', {
                                btn: ['确定', '取消']
                            }, function () {
                                var LODOP = getLodop();
                                LODOP.PRINT_INIT("结算打印单");
                                LODOP.SET_PRINT_PAGESIZE(0, 760, 1000, "A4");
                                LODOP.SET_PRINT_STYLE("FontSize", 8);
                                LODOP.ADD_PRINT_TEXT(5, 5, 740, 25, "结算单");
                                LODOP.ADD_PRINT_TEXT(25, 85, 740, 25, "深圳桃源居管理处");
                                LODOP.ADD_PRINT_TEXT(45, 75, 740, 25, new Date().format("yyyy-MM-dd hh:mm:ss"));
                                LODOP.ADD_PRINT_TEXT(65, 10, 740, 25, "收银员:" + $scope.staffNumber);
                                LODOP.ADD_PRINT_TEXT(85, 10, 740, 25, "交易单号" + $scope.paymentNum);
                                LODOP.ADD_PRINT_TEXT(105,10,740,25,"地址");
                                LODOP.ADD_PRINT_TEXT(125, 10, 740, 25, "收费项目");
                                LODOP.ADD_PRINT_TEXT(125, 80, 740, 25, "数量");
                                LODOP.ADD_PRINT_TEXT(125, 130, 740, 25, "单价");
                                LODOP.ADD_PRINT_TEXT(125, 200, 740, 25, "总价");
                                LODOP.ADD_PRINT_TEXT(135, 10, 740, 25, "-------------------------------------");
                                for (var j = 0; j < $scope.chkDataTmp.length; j++) {
                                    var temp = 20 * j;
                                    LODOP.ADD_PRINT_TEXT(temp + 145, 10, 740, 25, $scope.chkDataTmp[j].chargeTypeName, 7, 65);
                                    LODOP.ADD_PRINT_TEXT(temp + 145, 80, 740, 25, "1", 47, 65);
                                    $scope.sum = $scope.chkDataTmp[j].totalOverdue + $scope.chkDataTmp[j].totalLastOweSum + $scope.chkDataTmp[j].totalCurrentOweSum;
                                    $scope.sum = parseFloat($scope.sum).toFixed(2);
                                    LODOP.ADD_PRINT_TEXT(temp + 145, 125, 740, 25, $scope.sum);
                                    LODOP.ADD_PRINT_TEXT(temp + 145, 195, 740, 25, $scope.sum);
                                }
                                var length = $scope.chkDataTmp.length;
                                LODOP.ADD_PRINT_TEXT(length * 20 + 135, 10, 740, 25, "-------------------------------------");
                                LODOP.ADD_PRINT_TEXT(155 + length * 20, 150, 740, 25, "总计:" + parseFloat($scope.chkDataSum).toFixed(2));
                                LODOP.ADD_PRINT_TEXT(175 + length * 20, 10, 740, 25, "折扣:0.00");
                                LODOP.ADD_PRINT_TEXT(195 + length * 20, 10, 740, 25, "应收金额:" + parseFloat($scope.chkDataSum).toFixed(2));
                                LODOP.ADD_PRINT_TEXT(220 + length * 20, 10, 740, 25, "实收金额:" + parseFloat($scope.paymentDetails.cashSum+$scope.paymentDetails.creditCardSum+$scope.paymentDetails.wechatSum).toFixed(2));
                                LODOP.ADD_PRINT_TEXT(240 + length * 20, 30, 740, 25, "现金:" + parseFloat($scope.paymentDetails.cashSum).toFixed(2));
                                LODOP.ADD_PRINT_TEXT(260 + length * 20, 30, 740, 25, "刷卡:" + parseFloat($scope.paymentDetails.creditCardSum).toFixed(2));
                                LODOP.ADD_PRINT_TEXT(280 + length * 20, 30, 740, 25, "微信:" + parseFloat($scope.paymentDetails.wechatSum).toFixed(2));
                                if($scope.paymentDetails.cashSum+$scope.paymentDetails.creditCardSum+$scope.paymentDetails.wechatSum-$scope.chkDataSum>0) {
                                    LODOP.ADD_PRINT_TEXT(240 + length * 20, 150, 740, 25, "找零:" + parseFloat($scope.paymentDetails.cashSum + $scope.paymentDetails.creditCardSum + $scope.paymentDetails.wechatSum - $scope.chkDataSum).toFixed(2));
                                }else{
                                    LODOP.ADD_PRINT_TEXT(240 + length * 20, 150, 740, 25, "找零:0.00");
                                }
                                LODOP.PREVIEW();
                                $http.post(url + '/PaymentDetails/insertPaymentDetails', {PaymentDetails: $scope.paymentDetails}).success(function () {
                                    for (var i = 0; i < $scope.chkDataTmp.length; i++) {
                                        for (var j = 0; j < $scope.data1.list.length; j++) {
                                            if ($scope.chkDataTmp[i].billNum == $scope.data1.list[j].billNum) {
                                                $scope.data1.list.splice(j, 1);
                                                $scope.chkDataTmp.splice(i, 1);
                                                i--;
                                                break;
                                            }
                                        }
                                    }
                                    $scope.totalsData = 0.0;
                                    for (var j = 0; j < $scope.data1.list.length; j++) {
                                        $scope.totalsData = $scope.totalsData + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
                                    }
                                    if ($scope.data1.list == 0) {
                                        $scope.totalsData = 0.0;
                                    }
                                    $scope.$apply(function () {
                                        $scope.totalsData;
                                    });
                                    var data1 = JSON.stringify($scope.data1);
                                    sessionStorage.setItem("data1", data1);
                                    $scope.showChange();
                                }).error(function (data, status, headers, config) {
                                    layer.msg("付款失败", {icon: 3, time: 1000});
                                });
                            },
                            function () {
                                $http.post(url + '/PaymentDetails/insertPaymentDetails', {PaymentDetails: $scope.paymentDetails}).success(function () {
                                    for (var i = 0; i < $scope.chkDataTmp.length; i++) {
                                        for (var j = 0; j < $scope.data1.list.length; j++) {
                                            if ($scope.chkDataTmp[i].billNum == $scope.data1.list[j].billNum) {
                                                $scope.data1.list.splice(j, 1);
                                                $scope.chkDataTmp.splice(i, 1);
                                                i--;
                                                break;
                                            }
                                        }
                                    }
                                    $scope.totalsData = 0.0;
                                    for (var j = 0; j < $scope.data1.list.length; j++) {
                                        $scope.totalsData = $scope.totalsData + $scope.data1.list[j].totalCurrentOweSum + $scope.data1.list[j].totalOverdue + $scope.data1.list[j].totalLastOweSum;
                                    }
                                    if ($scope.data1.list == 0) {
                                        $scope.totalsData = 0.0;
                                    }
                                    $scope.$apply(function () {
                                        $scope.totalsData;
                                    });
                                    var data1 = JSON.stringify($scope.data1);
                                    sessionStorage.setItem("data1", data1);
                                    $scope.showChange();
                                }).error(function (data, status, headers, config) {
                                    layer.msg("付款失败", {icon: 3, time: 1000});
                                });
                            }
                        );
                    }
                }
            }
        };
        $scope.showChange = function(){
            //将模态框隐藏
            angular.element("#showAccount").modal("hide");

            if($scope.chkDataSum != 0.0){
                $scope.money = $scope.toatl - $scope.chkDataSum ;
            }else{
                $scope.money = $scope.toatl - $scope.assetAccountSum;
            }
            if($scope.money > 0){
                layer.alert("找零金额为" + $scope.money.toFixed(2) + "元", {icon: 1});
            }else{
                layer.alert("支付成功，无需找零！", {icon: 1});
            }
        }

    }]);
    var app = require('../../../../../app');
});
