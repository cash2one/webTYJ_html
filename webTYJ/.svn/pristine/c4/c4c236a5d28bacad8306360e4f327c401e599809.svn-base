/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('parkingCardInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.doClick(1);

        //列表和网格显示
        $scope.showStatus=1;
        
        $scope.showList=function(){
            $scope.showStatus=0;
        };
        
        $scope.showTable=function(){
            $scope.showStatus=1;
        };
        
        var url = $rootScope.url;
        //查询客户停车卡信息
        $scope.Caraccesscard={page:{}};
        $scope.load=function(){
            var fetchFunction = function (page, callback) {
                $scope.Caraccesscard.page = page;
                $http.post(url + '/Caraccesscard/listPageCaraccesscardByContion',{Caraccesscard: $scope.Caraccesscard}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };
        $scope.load();

        //选择停车卡
        $scope.getCaraccesscardbycard=function(caraccesscard){
            $scope.caraccesscardone=caraccesscard;
            $scope.caraccesscard2=caraccesscard;
            /****************************退款**********************************************/
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            //两个日期
            var date1=new Date( $scope.caraccesscardone.startDate).Format("yyyy-MM-dd");
            var date2=new Date($scope.caraccesscardone.endDate).Format("yyyy-MM-dd");
            // 拆分年月日
            date1 =  date1.split('-');
            // 得到月数
            date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
            // 拆分年月日
            date2 =  date2.split('-');
            // 得到月数
            date2 = parseInt( date2[0]) * 12 + parseInt( date2[1]);
            var   mon1 = parseInt( date2[1])+mon;

            var year =parseInt( date2[0])
            var m= Math.abs(date2 -  date1);
            $scope.monthMoney=m*parseInt( $scope.Product.price)
            $scope.dayMoney=m*30
            $scope.yearMoney=m*parseInt( $scope.ProductFour.price)
            /****************************退款**********************************************/

            /****************************缴费计算**********************************************/
            var mon= $("input#mony").val();
            $scope.payC= mon*parseInt( $scope.Product.price)
            $scope.payB= mon*30
            $scope.payA= mon*parseInt( $scope.ProductFour.price)
            /*
             *   功能:实现VBScript的DateAdd功能.
             *   参数:interval,字符串表达式，表示要添加的时间间隔.
             *   参数:number,数值表达式，表示要添加的时间间隔的个数.
             *   参数:date,时间对象.
             *   返回:新的时间对象.
             *   var now = new Date();
             *   var newDate = DateAdd( "d", 5, now);
             *---------------   DateAdd(interval,number,date)   -----------------
             */
            function DateAdd(interval, number, date) {
                switch (interval) {
                    case "y ": {
                        date.setFullYear(date.getFullYear() + number);
                        return date;
                        break;
                    }
                    case "q ": {
                        date.setMonth(date.getMonth() + number * 3);
                        return date;
                        break;
                    }
                    case "m ": {
                        date.setMonth(date.getMonth() + number);
                        return date;
                        break;
                    }
                    case "w ": {
                        date.setDate(date.getDate() + number * 7);
                        return date;
                        break;
                    }
                    case "d ": {
                        date.setDate(date.getDate() + number);
                        return date;
                        break;
                    }
                    case "h ": {
                        date.setHours(date.getHours() + number);
                        return date;
                        break;
                    }
                    case "m ": {
                        date.setMinutes(date.getMinutes() + number);
                        return date;
                        break;
                    }
                    case "s ": {
                        date.setSeconds(date.getSeconds() + number);
                        return date;
                        break;
                    }
                    default: {
                        date.setDate(d.getDate() + number);
                        return date;
                        break;
                    }
                }
            }
            $scope.saveDat=function(){
                $scope.newDat=$scope.caraccesscardone.endDate;
                var now = new Date($scope.caraccesscardone.endDate);
                var mm=parseInt($scope.caraccesscard2.mony)
                now = DateAdd("m ",mm, now);
                $scope.newDatt=now
                $scope.caraccesscardone.endDate=$scope.newDatt
            }

        };


        //更换停车卡
        $scope.newcardId;
        $scope.updateCaraccessBycardId=function(){
            $scope.caraccesscardone.newcardId= $scope.newcardId;
            $http.put(url + '/Caraccesscard/updateCaraccessBycardId',{Caraccesscard:$scope.caraccesscardone}).success(function(data) {
                layer.msg('更换停车卡成功',{icon : 1, time : 2000});
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.alert('更换停车卡失败',{icon : 2});
            }) ;
        };

        //停车卡挂失
        $scope.LossCaraccesscardById=function(cardId){
            //卡状态修改为挂失
            $scope.caraccesscardone.cardId=cardId
            $http.put(url + '/Caraccesscard/LossCaraccessBycardId/'+$scope.caraccesscardone.cardId).success(function(data) {
                layer.msg('挂失停车卡成功!',{icon : 1});
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.alert('挂失停车卡失败',{icon : 2});
            }) ;
        };
        //模态框取消
        $scope.quxiao=function(){
            $scope.load();
        };
        //停车卡退卡
        $scope.RefundCaraccessBycardId=function(cardId){
            //卡状态修改为禁用
            $scope.caraccesscardone.cardId=cardId
            $http.put(url + '/Caraccesscard/RefundCaraccessBycardId/'+$scope.caraccesscardone.cardId).success(function(data) {
                layer.msg('退卡成功',{icon : 1});
                $scope.load();
            }).error(function(data, status, headers, config){
                layer.alert('退卡失败',{icon : 2});
            }) ;


        };

        //重新获取停车卡信息
        $scope.repeatCaraccesscard=function(){
            $http.post(url+'/Caraccesscard/listSearchCaraccesscardAu',{Search:$scope.search}).success(function(data)
            {
                $scope.caraccesscards=data.Caraccesscard;

            }).error(function(error){
                layer.alert('搜索失败',{icon : 3});
            });
        };

        //取消模态框
        $scope.clearModel=function(){
            $scope.newcardId=null;
            $scope.load()
        };
        //停车卡缴费
        $scope.caraccesscard2={};
        $scope.starDate;
        $scope.PayCaraccessBycardId=function(caraccesscard){
            ////每天的金额
            layer.msg('缴费成功',{icon : 1});
            $scope.starDate=(new Date( $scope.caraccesscard2.startDate)).getTime();
            $scope.endDate=(new Date( $scope.caraccesscard2.endDate)).getTime();
            $scope.starTime= $scope.starDate;
            $scope.endTime=$scope.endDate;
            $scope.sumDay=($scope.endTime-$scope.starTime)/(24*60*60*1000);
            $scope.load();
        };

        //查询产品初始化停车月卡，获取办理金额
        $http.get(url + '/Product/getProductByType/' + '1').success(function(data){
            $scope.Product = data.Product;
        }).error(function(data){
            layer.alert('查询不到有效的门禁卡初始化信息',{icon : 2});
        });

        //查询产品初始化固定车位，获取办理金额
        $http.get(url + '/Product/getProductByType/' + '4').success(function(data){
            $scope.ProductFour = data.Product;
        }).error(function(data){
            layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });
        //查询产品初始化工本费，获取工本费
        $http.get(url + '/Product/getProductByType/' + '2').success(function(data){
            $scope.ProductFiv = data.Product;
        }).error(function(data){
            layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });


        //挂失模糊框
        $scope.lossCard=function(){
            if($scope.caraccesscardone==null){
                layer.alert('请选中一项再操作',{icon:2})
                return;
            }
            $('#free').modal({backdrop: 'static', keyboard: false});
        }

        //换卡模糊框
        $scope.changeCard=function(){
            if($scope.caraccesscardone==null){
                layer.alert('请选中一项再操作',{icon:2})
                return;
            }
            $('#freed').modal({backdrop: 'static', keyboard: false});
        }

        //退卡模糊框
        $scope.returnCard=function(){
            if($scope.caraccesscardone==null){
                layer.alert('请选中一项再操作',{icon:2})
                return;
            }
            $('#file').modal({backdrop: 'static', keyboard: false});
        }

        //缴费模糊框
        $scope.payCard=function(){
            if($scope.caraccesscardone==null){
                layer.alert('请选中一项再操作',{icon:2})
                return;
            }
            $('#freedom').modal({backdrop: 'static', keyboard: false});
        }
        //信息展示
        $scope.showInfo=function(){
            $('#show').modal({backdrop: 'static', keyboard: false});
        }

    }]);
});
function selected(This){
    $('table tr').css('background','#fff');
    $(This).css('background','#f6f8fa');
}