/**
 * Created by NM on 2018/1/18.
 * 新增停车卡js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('newCardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(2);
        $scope.caraccesscards={idcardNum:'',carNum:'',startDate:'',endDate:'',stallCoding:'',stallNum:'',stallState:'',custCode:$rootScope.user.custId};
        //停车卡集合初始化
        /*$scope.caraccesscards.carId =1;*/
        //车辆卡id初始化
        /*$scope.carInfos={};*/
        //车辆信息初始化
        /*$scope.stalls={};*/
        //车位信息初始化
        $scope.stallss=[{id:1,stallType:'私人车位'},{id:2,stallType:'固定车位'},{id:3,stallType:'流动车位'}];
        var url = $rootScope.url;
        //新增停车卡信息
        $scope.name=$rootScope.user.name;//产权人姓名
        $scope.caraccesscards.custCode = $rootScope.user.custId;
        $scope.Carac=[];
        $http.get(url + '/Caraccesscard/listAllCaraccesscard' ).success(function(data){
            $scope.Carac = data.Caraccesscard;
        }).error(function(data){
            layer.alert('查询失败',{icon : 2});
        });
        $scope.checkDates =  function(){
            var date1 =$scope.caraccesscards.startDate;
            var date2 =$scope.caraccesscards.endDate;
            if(date1 != null && date1 != ''&& date2 != null && date2 != ''){
                if(date2 < date1){
                    layer.alert('缴费到期日不得早于生效日期！',{icon : 0});
                    $scope.caraccesscards.endDate = '';
                }
            }
        };

        $scope.serviceRequest = {listTasks:{}};//服务请求
        $scope.AddCaraccesscard=function() {
            /**
             * BUG  318  323  338 陶勇超 2016年1月13日 10:13:59
             */

            if ($scope.caraccesscards.idcardNum == undefined || $scope.caraccesscards.idcardNum == "" || $scope.caraccesscards.idcardNum == null) {
                layer.msg('停车卡号不能为空！', {icon: 0});
                return;
            }
            if ($scope.Carac.length > 0) {
                for (var i = 0; i < $scope.Carac.length; i++) {
                    if ($scope.caraccesscards.idcardNum == $scope.Carac[i].idcardNum) {
                        layer.msg('停车卡号已存在！', {icon: 0});
                        return;
                    }
                }
            }
            if ($scope.carInfoone.carNum == undefined || $scope.carInfoone.carNum == "" || $scope.carInfoone.carNum == null) {
                layer.msg('车牌号不能为空！', {icon: 0});
                return;
            } else if ($scope.caraccesscards.startDate == undefined || $scope.caraccesscards.startDate == "" || $scope.caraccesscards.startDate == null) {
                layer.msg('生效日期不能为空！', {icon: 0});
                return;
            } else if ($scope.caraccesscards.endDate == undefined || $scope.caraccesscards.endDate == "" || $scope.caraccesscards.endDate == null) {
                layer.msg('缴费到期日不能为空！', {icon: 0});
                return;
            } else if ($scope.stallss.id == undefined || $scope.stallss.id == "" || $scope.stallss.id == null) {
                layer.msg('车位类型不能为空！', {icon: 0});
                return;
            } else if ($scope.ProductFiv.productName == undefined || $scope.ProductFiv.productName == "" || $scope.ProductFiv.productName == null) {
                layer.msg('停车卡产品不能为空！', {icon: 0});
                return;
            }
            if($scope.stallss.id==1) {
                $scope.caraccesscards.productId=$scope.LproductFiv.productId; //产品Id
                $scope.caraccesscards.paymentAmount= $scope.LproductFiv.price;
                $scope.caraccesscards.parkId = $scope.stallone.buildingId;
                $scope.caraccesscards.carType=1;
            }else if($scope.stallss.id==2){//固定车位
                    $scope.caraccesscards.productId=$scope.ProductFiv.productId; //产品Id
                $scope.caraccesscards.paymentAmount=parseInt($scope.stallone.productPrice) +  $scope.LproductFiv.price;
                $scope.caraccesscards.price=$scope.stallone.productPrice;//管理费
                $scope.caraccesscards.carType=2;
                $scope.caraccesscards.parkId = $scope.stallone.stallId;
            }else if($scope.stallss.id==3){//流动车位
                if($scope.Product.productName==undefined || $scope.Product.productName==''){
                    layer.msg('优惠卡不能为空！',{icon : 0});
                    return;
                }
                    $scope.caraccesscards.productId=$scope.Product.productId; //产品Id
                    $scope.caraccesscards.paymentAmount=$scope.Lproducts. price+$scope.LproductFiv.price;
                    $scope.caraccesscards.carType=3;

            }
            /**
             * BUG 361 陶勇超2016年1月13日 13:47:46
             * @type {Date}
             */
            var d1 = new Date($scope.caraccesscards.startDate);
            var d2 = new Date( $scope.caraccesscards.endDate);

            if($scope.caraccesscards.startDate!=""&& $scope.caraccesscards.endDate!=""&&d1 >=d2)
            {
                layer.alert("开始时间不能大于结束时间！",{icon:0});
                return;
            }
            $scope.caraccesscards.custCode = $rootScope.user.custId;
            if($scope.stallss.id==1){
                $scope.caraccesscards.parkingLocation = $scope.stallone.fullName;
            }else {
                $scope.caraccesscards.parkingLocation = $scope.stallone.codeName;
            }
            $scope.caraccesscards.nominalFee=$scope.LproductFiv.price;//工本费

            if ($scope.caraccesscards.idcardNum && $scope.caraccesscards.startDate && $scope.caraccesscards.endDate) {
                $http.post(url + '/Caraccesscard/insertCaraccesscard', {Caraccesscard: $scope.caraccesscards}).success(function (data) {
                    $scope.serviceRequest.requestSource = '自动创建';
                    $scope.serviceRequest.serviceRequestState = 1;
                    $scope.serviceRequest.serviceRequestName = '固定车位服务请求'
                    $scope.serviceRequest.customerId = $scope.caraccesscards.custCode;//客户id
                    $scope.serviceRequest.serviceRequestType = '10'//固定车位
                    $scope.serviceRequest.writerId = $scope.caraccesscards.creater;//创建人id
                    $scope.serviceRequest.remarks = '停车卡固定车位自动创建';//备注
                    $scope.serviceRequest.directionType = 1;//外部服务请求
                    $scope.serviceRequest.listTasks.customerId =  $scope.caraccesscards.custCode;//客户id
                    $scope.serviceRequest.listTasks.taskType = 19;//任务类型
                    $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                    $scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
                    $scope.serviceRequest.listTasks.addressId = $scope.stallone.nodeName;//地址id
                    $scope.serviceRequest.listTasks.taskDescription = '创建固定车位'+ $scope.stallone.stallCoding;//任务描述
                    $scope.serviceRequest.listTasks.principal = ''//负责人
                    //创建服务请求
                    $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function (data) {
                        layer.msg('提交成功',{icon : 1,time : 2000});
                        $location.path("/index/propertyService/staffHome/parkingCard/historyRecord");
                    }).error(function (data, status, headers, config) {
                        layer.msg("提交失败",{icon : 2,time : 2000});
                    });

                }).error(function (data, status, headers, config) {
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });
            }
            else {
                layer.alert("您有带星号的信息未填写！",{icon : 0});
            }

        };
        //查询户主车辆信息
        $scope.getCarInfo=function(){
            $http.get(url + '/CarInfo/getCarInfo/'+$rootScope.user.custId).success(function(data) {

                $scope.carInfos=data.CarInfo;
                console.log( $scope.carInfo);
            }).error(function(err){
                layer.msg("查询户主车辆信息失败");
            });
        };


        // 录入户主车辆信息
        $scope.carInfoone={};
        $scope.inCarInfo=function(items){
            $scope.btnIndex = items;
            $scope.carInfoone.carNum=items.carNum;
            $scope.caraccesscards.carId=items.carId;
        };
        $scope.quxiao=function(){
            $scope.carInfoone.carNum=null
            $scope.caraccesscards.carId=null
        };
        /**
         * 获取所有固定车位 杨升权
         * */

        $scope.productFixedparkingc = {page:{}};
        $scope.load=function() {
            var listPage = function (page, callback) {
                $scope.productFixedparkingc.page = page;
                $http.post(url + '/ProductFixedparkingspace/getAllPfc', {ProductFixedparkingspaceChild: $scope.productFixedparkingc}).success(callback);
            }
            $scope.searchPaginator1 = app.get('Paginator').list(listPage,6);
            console.log( $scope.searchPaginator1);
        }

        //查询户主车位信息
        $scope.feiyong1=false;
        $scope.feiyong2=false;
        //$scope.personCusts={};
        $scope.custId='';
        $scope.month='';
        $scope.sata=[];
        /**
         * 查询所有流动车位
         * BUG 151
         * 修改人 陶勇超
         * 2016年1月12日 16:49:50
         */
       /* $http.get(url + '/StallNew/ /' +'流动').success(function(data){
            $scope.sata = data.StallNew;
        }).error(function(data){
            //layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });*/
        $scope.getStall=function(stallsId,bool){
            if($scope.caraccesscards.startDate!=''&& $scope.caraccesscards.startDate!=null
            &&$scope.caraccesscards.endDate!=null && $scope.caraccesscards.endDate!=''){
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
                var date1=new Date( $scope.caraccesscards.startDate).Format("yyyy-MM-dd");
                var date2=new Date($scope.caraccesscards.endDate).Format("yyyy-MM-dd");
                // 拆分年月日
                date1 =  date1.split('-');
                // 得到月数
                $scope.datt=date1
                $scope.datt=parseInt(date1[2]);
                date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
                // 拆分年月日
                date2 =  date2.split('-');
                $scope.dadd=date2

                $scope.dadd=parseInt(date2[2]);
                date2 = parseInt( date2[0]) * 12 + parseInt( date2[1]);
                $scope.date5=parseInt(   $scope.dadd -  $scope.datt);
                if(  $scope.date5>0){
                    $scope.month= Math.abs(date2 -  date1+1);
                }else{
                    $scope.month= Math.abs(date2 -  date1);
                }
            }
            if(stallsId==1){
                if(bool){
                    $scope.showStall1=true;
                    $scope.showStall2=false;
                    $scope.feiyong=true;
                    $scope.feiyong1=false;
                    $scope.feiyong2=false;
                    $scope.custId=$rootScope.user.custId;
                    /*$scope.personCusts.stallType='私人';
                    $http.post(url+'/StallNew/listSearchStall',{Search:$scope.personCusts}).success(function(data)
                    {
                        $scope.stalls=data.StallNew;
                        console.log($scope.stalls);
                        $("#myModal").modal("show");
                    }).error(function(error){
                        layer.alert("搜索失败，请手动填充数据",{icon:2});
                    });*/
                    $http.post(url+'/BuildingStructureNew/listPrivateStall/'+ $scope.custId).success(function(data)
                    {
                        $scope.BuildingStructureNew=data.BuildingStructureNew;
                        console.log(data);
                        $("#myModal").modal("show");
                    }).error(function(error){
                        layer.alert("搜索失败，请手动填充数据",{icon:2});
                    });

                    angular.element("#myModal").modal("show");
                }
                $scope.caraccesscards.paymentAmount=$scope.ProductFiv.price;
            }
            if(stallsId==2)
            {
                if(bool){
                    $scope.showStall1=false;
                    $scope.showStall2=true;
                    $scope.feiyong=false;
                    $scope.feiyong1=false;
                    $scope.feiyong2=true;
                    /*$scope.personCusts.custId=$rootScope.user.custId;
                    $scope.personCusts.custType='固定';
                    $scope.personCusts={page:{}};

                    var fetchFunction = function (page, callback) {
                        $scope.personCusts.page = page;
                        $http.post(url + '/StallNew/listPageStallNewByType', {StallNew:$scope.personCusts}).success(callback)
                    };
                    $("#myModal1").modal("show");
                    $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
                    console.log($scope.searchPaginator);*/

                    $scope.load();
                    angular.element("#myModal1").modal("show");
                }

                if($scope.month!=''&& $scope.month != null){
                    $scope.caraccesscards.paymentAmount=$scope.ProductFour.price * $scope.month + $scope.ProductFiv.price;
                }
            }
            if(stallsId==3)
            {
                if(bool){
                    $scope.showStall2=false;
                    $scope.showStall1=false;
                    $scope.feiyong=false;
                    $scope.feiyong1=true;
                    $scope.feiyong2=false;
                    /*$scope.personCusts.custId=$rootScope.user.custId;
                    $scope.personCusts.custType='流动';*/
                    /*if($scope.sata!=null){
                        $scope.caraccesscards.parkId=$scope.sata[0].stallId
                    }*/
                }

                /*if($scope.month!=''&& $scope.month != null) {
                    $scope.caraccesscards.paymentAmount = $scope.Product.price * $scope.month + $scope.ProductFiv.price;
                }*/
                $scope.caraccesscards.paymentAmount=$scope. Lproducts.Product. price + $scope.ProductFiv.price;
            }
            if(stallsId==''||stallsId==undefined||stallsId==null){
                layer.alert("请选择车位类型",{icon:0});
            }
            /*else
            {
                $scope.showStall2=false;
                $scope.showStall1=true;
            }*/
            /*$scope.personCusts={};
             $scope.personCusts.custId=$rootScope.user.custId;
             $http.post(url+'/StallNew/listSearchStall',{Search:$scope.personCusts}).success(function(data)
             {
             console.log("搜索成功");
             $scope.stalls=data.StallNew;
             console.log($scope.stalls);

             }).error(function(error){
             alert("搜索失败，自己填充数据")

             });*/
        };
        //录入户主车位信息
        $scope.stallone={};
        $scope.inStall=function(item){
            //$scope.caraccesscards.stallCoding=item.stallCoding;
            $scope.btnIndex = item;
            $scope.caraccesscards.parkId=item.stallId;
            $scope.stallone=item;
            if($scope.stallone.id!=''){
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
                var date1=new Date( $scope.caraccesscards.startDate).Format("yyyy-MM-dd");
                var date2=new Date($scope.caraccesscards.endDate).Format("yyyy-MM-dd");
                // 拆分年月日
                date1 =  date1.split('-');
                // 得到月数
                date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
                // 拆分年月日
                date2 =  date2.split('-');
                // 得到月数
                var  date3=parseInt(date1[2])
                var date4=parseInt(date2[2])
                date2 = parseInt( date2[0]) * 12 + parseInt( date2[1]);
                $scope.date5=Math.abs(date4 -  date3);
                $scope.month= Math.abs(date2 -  date1+1);
            }
        };

        $scope.quxiao1=function(){
            $scope.caraccesscards.parkId=null
            $scope.stallone=null
        };
        $scope.cencle=function(){
            /**
             * BUG  317 陶勇超 2016年1月13日 11:19:12
             * @type {null}
             */
            $scope.caraccesscards.idcardNum=null ;
            $scope.caraccesscards.startDate=null ;
            $scope.caraccesscards.endDate=null ;
            $scope.carInfoone.carNum =null;
            $scope.stallss.id=null;
            $scope.stallss.id='';
            $scope.caraccesscards.parkId=null;
            $scope.stallone=null;
            $scope.carInfoone.carNum=null;
            $scope.caraccesscards.carId=null;
            $scope.showStall1=false;
            $scope.showStall2=false;
            $scope.feiyong=false;
            $scope.feiyong1=false;
            $scope.feiyong2=false;
            $scope.doClick(1);
        }

        //查询产品初始化停车月卡，获取办理金额
        /*$http.get(url + '/Product/getProductByType/' + '1').success(function(data){
            $scope.Product = data.Product;
            console.log( $scope.Product);
        }).error(function(data){
           layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });*/
        //查询产品停车月卡
        $http.get(url + '/Product/listgetProductByType/' + '1').success(function(data){
            $scope.Products=[];
            $scope.Products = data.Product;
            for(var i in $scope.Products){
                $scope.Products[i].name = $scope.Products[i].productName;
                $scope.Products[i].id = $scope.Products[i].productId;
                $scope.Datil.taskType.push($scope.Products[i])
            }
            console.log( $scope.Products);
        }).error(function(data){
            layer.alert('查询不到有效的优惠卡初始化信息',{icon : 2});
        });
        //查询产品初始化固定车位，获取办理金额
        $http.get(url + '/Product/getProductByType/' + '4').success(function(data){
            $scope.ProductFour = data.Product;
            console.log($scope.ProductFour);
        }).error(function(data){
            layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });

        //查询产品初始化工本费，获取工本费
        $scope.ProductFiv={};
        $http.get(url + '/Product/getProductByType/' + '2').success(function(data){
            $scope.ProductFiv = data.Product;
            console.log($scope.ProductFiv);
        }).error(function(data){
            layer.alert('查询不到有效的停车卡初始化信息',{icon : 2});
        });

        //查询产品门禁卡
        $scope.ProductFiv=[];
        $http.get(url + '/Product/listgetProductByType/' + '2').success(function(data){

            $scope.ProductFiv = data.Product;
            for(var i in $scope.ProductFiv){
                $scope.ProductFiv[i].name = $scope.ProductFiv[i].productName;
                $scope.ProductFiv[i].id = $scope.ProductFiv[i].productId;
                $scope.Datils.taskType.push($scope.ProductFiv[i])
            }
            console.log( data);
            }).error(function(data){
            layer.alert('查询不到有效的优惠卡初始化信息',{icon : 2});
        });



        $scope.Datils= {
            taskType: [
                {id:$scope.ProductFiv.productId ,
                    name:$scope.ProductFiv.productName
                }

            ]
        }

        /**
         * 根据启用时间和月数推算缴费到期时间
         * yangshengquan 2016/7/18
         * */
        $scope.GetAnddate=function(){
            Date.prototype.Format = function (fmt) {
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

            //获取日期
            if($scope.caraccesscards.startDate==undefined || $scope.caraccesscards.startDate==''){
                layer.msg('请先填写启用时间',{icon : 0});
            }
            var dateArray = new Date($scope.caraccesscards.startDate);
            var mony=$scope.caraccesscard.mony;
            dateArray.setMonth(Number(dateArray.getMonth())+Number(mony));
            var endDate=dateArray.Format('yyyy-MM-dd');
            $scope.caraccesscards.endDate = endDate;
            $scope.caraccesscard.paymentAmount= ProductFour.price *$scope.caraccesscard.mony + ProductFiv.price

        }

        $scope.Datil= {
            /**产品类型**/
            taskType: [
                /*{id:'1',name:'停车优惠卡'},
                {id:'4',name:'固定车位'}*/
            ]
        }

        /**
         * 流动车位优惠卡
         * */
        $scope.Lproducts='';

        $scope.ProductChange=function(id){
            $http.get(url+'/Product/getProductById1/'+id).success(function(data){
                $scope.Lproducts=data.Product;
                $scope.caraccesscard.mony=$scope.Lproducts.month;
                console.log($scope.Lproducts);
            }).error(function(){
            });

        }
        $scope.LproductFiv='';
        $scope.ProductFivChange=function(id){
            $http.get(url+'/Product/getProductFivById/'+id).success(function(data){
                $scope.LproductFiv=data.Product;

                console.log($scope.LproductFiv);
            }).error(function(){
            });

        }
        }]);
});