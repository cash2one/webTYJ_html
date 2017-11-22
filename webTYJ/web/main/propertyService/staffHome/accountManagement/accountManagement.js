/**
 * Created by NM on 2018/1/18.
 * 账户管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('accountManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.changeShowNum(2);
        $scope.doClick(16);
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.advancePaymentsDetails={page:{},assetAccuontNum:''};//支付明细分页
        $scope.bill={page:{},electronicBillingId:'',billDate:''};//电子账单下信息
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;
        $scope.show4 = false;
        $scope.show5 = false;
        /**
         * 显示新建方案
         */
        $scope.btnIndex = 1;
        $scope.showCheck1=function(index){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.btnIndex = index;
        };

        $scope.showCheck2=function(index){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.btnIndex = index;
        };
        $scope.showCheck3=function(index){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.show4 = false;
            $scope.show5 = false;
            $scope.btnIndex = index;
        };
        $scope.showCheck4=function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = true;
            $scope.show5 = false;

        };
        $scope.showCheck5=function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show5 = true;
        };
        /*账单详情开始*/
        //获取账户信息
        $scope.custId=1;
        $http.get(url+'/Account/getAccountByCustId/'+$scope.custId).success(function(data){
            $scope.account=data.Account;
            console.log($scope.account);
            $scope.assetAccounts=data.Account.accountRelations;
            console.log($scope.assetAccounts);
        }).error(function(data,status,headers,config){
            alert("查询账户信息失败！");
        });
        //根据账户编号获取收支明细
        $scope.showDetails=function(assetAccuontNum){
            /*
             $http.get(url+'/Account/getAdvancePaymentDetailsCustId/'+assetAccuontNum).success(function(data){
             console.log(data);
             $scope.advancePaymentsDetails=data.AdvancePaymentsDetails;
             }).error(function(data,status,headers,config){
             alert("查询收支明细信息失败！");
             });*/
            console.log(assetAccuontNum);
            var parent = function(page, callback){
                $scope.advancePaymentsDetails.page=page;
                $scope.advancePaymentsDetails.assetAccountNum=assetAccuontNum;
                $http.post(url+'/AdvancePaymentsDetails/listPageAdvancePaymentDetailByAssetAccuontNum',{AdvancePaymentsDetails:$scope.advancePaymentsDetails}).success(callback);
            }
            $scope.currentAdvancePaymentDetails=app.get('Paginator').list(parent,5);
            console.log($scope.currentAdvancePaymentDetails);
        };
        /*账单详情结束*/

        /*计费账单模块开始*/
        //获取电子账单信息
        $http.get(url+'/ElectronicBilling/getElectronicBillingsByCustId/'+$scope.custId).success(function(data){
            console.log(data);
            $scope.electronicBilling=data.ElectronicBilling;
        }).error(function(data,status,headers,config){
            alert("查询电子账单失败！");
        });
        $scope.info={billNum:'',oweSum:''};//用于电子账单表下账单编号和欠款
        $scope.item={electronicBillingId:'',billDate:''};
        //获取电子账单下的应付款账单
        $scope.showBills=function(item){

            $http.get(url+'/ElectronicBilling/getBillsThisMonth/'+item.electronicBillingId+'/'+item.billDate).success(function(data){
                console.log(data);
                $scope.item=item;
                $scope.bills=data.Bill;
                $scope.info.billNum=item.electronicBillingNum;
                $scope.info.oweSum=item.currentOweSum;
            }).error(function(data,status,headers,config){
                alert("查询账单失败！");
            });
            //分页
            /*
             var parent1 = function(page, callback){
             $scope.bill.page=page;
             $scope.bill.electronicBillingId=item.electronicBillingId;//电子账单id
             $scope.bill.billDate=item.billDate;//账单日期
             $http.post(url+'/Bill/listPageBillsByelectronicBillingIdThisMonth',{Bill:$scope.bill}).success(callback);
             }
             $scope.currentBills=app.get('Paginator').list(parent1,5);
             console.log($scope.currentBills);
             */
        }
        //查询历史账单
        $scope.showHistory=function(){

            $http.get(url+'/ElectronicBilling/getBillsLastMonth/'+$scope.item.electronicBillingId+'/'+$scope.item.billDate).success(function(data){
                console.log(data);
                $scope.bills=data.Bill;
            }).error(function(data,status,headers,config){
                alert("查询历史账单失败！");
            });

            //分页
            /*
             var parent2 = function(page, callback){
             $scope.bill.page=page;
             $scope.bill.electronicBillingId=$scope.item.electronicBillingId;//电子账单id
             $scope.bill.billDate=$scope.item.billDate;//账单日期
             $http.post(url+'/Bill/listPageBillsByelectronicBillingIdLastMonth',{Bill:$scope.bill}).success(callback);
             }
             $scope.currentBills=app.get('Paginator').list(parent2,5);
             console.log($scope.currentBills);
             */
        }
        //条件查询电子账单
        $scope.electronicBillingQuery={}; //条件查询（账单时间，账单编号，收费对象，必须包含客户id）
        $scope.queryElectronicBills=function(){
            $scope.electronicBillingQuery.custId=$scope.custId;
            console.log($scope.electronicBillingQuery);
            $http.post(url+'/ElectronicBilling/QueryResultElectronicBillings',{ElectronicBilling:$scope.electronicBillingQuery}).success(function(data){
                console.log(data);
                $scope.electronicBilling=data.ElectronicBilling;
            }).error(function(data,status,headers,config){
                alert("条件查询账单失败！");
            });
        }
        /*计费账单模块结束*/

        /*押金模块开始*/
        //查询账户信息
        $http.get(url+'/AssetAccount/getAssetAccountByCustId/'+$scope.custId).success(function(data){
            console.log(data);
            $scope.assetAccountForDeposit=data.AssetAccount;
        }).error(function(data,status,headers,config){
            alert("查询押金账单失败！");
        });
        //查询押金明细
        $scope.advancePaymentsDetailsPage = {page:{}}
        $scope.showDepositDetail=function(item){

            var parent1 = function(page, callback){
                $scope.advancePaymentsDetailsPage.page=page;
                $scope.advancePaymentsDetailsPage.assetAccountId = item.assetAccountId;
                $http.post(url+'/AdvancePaymentsDetails/listPageAdvancePaymentDetailByAssetAccountId',{AdvancePaymentsDetails:$scope.advancePaymentsDetailsPage}).success(callback);
            }
            $scope.currentDetail=app.get('Paginator').list(parent1,5);
            $scope.chargeObject=item.buildingStructureNew.fullName;//收费对象
            $scope.chargeItemName=item.chargeItem.ciName;//收费项目名
            console.log($scope.currentDetail);

            /*$http.get(url+'/AssetAccount/getAdvancePaymentsDetailsByAssetAccountId/'+item.assetAccountId).success(function(data){
             console.log(data);
             $scope.chargeObject=item.buildingStructureNew.fullName;//收费对象
             $scope.chargeItemName=item.chargeItem.ciName;//收费项目名
             $scope.advancePaymentsDetailsOfDeposit=data.AdvancePaymentsDetails;
             }).error(function(data,status,headers,config){
             alert("查询押金明细失败！");
             });*/
        }
        //查询押金付款信息
        $scope.showDepositDeduct=function(advancePaymentDetailId){
            $http.get(url+'/AssetAccount/getDepositDeductsByAdvancePaymentId/'+advancePaymentDetailId).success(function(data){
                console.log(data);
                $scope.depositDeducts=data.DepositDeduct;
            }).error(function(data,status,headers,config){
                alert("查询押金付款信息失败！");
            });
        }
        /*押金模块结束*/

    }]);
});
