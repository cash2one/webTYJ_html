/**
 * Created by NM on 2018/1/18.
 * 产品初始化--建筑租赁js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('buildLeaseCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        /*****************************  变量定义start  ********************************************/

        var url = $rootScope.url;                                       //定义路径
        $scope.Product = {increasingRent : 0};                          //定义一个product对象
        $scope.AreaDivision = {};                                       //定义一个面积划分对象
        $scope.AreaDivisionList = [];                                   //定义一个面积划分对象集合
        $scope.editIndex = null;                                        //新增行序列号
        $scope.editItem = false;                                        //新增AreaDivision行
        var filePath='';
        var fileUrl=$rootScope.fileUrl;                                 //上传的文件路径
        $scope.annexs = [];
        $scope.Product.annexs = $scope.annexs;
        $scope.addWaterCheck = [];

        var productid = '';
        var productid = JSON.parse(localStorage.getItem("product_id"));

        /*****************************  变量定义end    ********************************************/

        /*****************************  载入时执行方法start  ***************************************/

        //如果传入的产品id不为空，根据id查询对象
        if(productid != ''){
            $http.post(url + '/Product/getProductByProductId/' + productid).success(function(data){
                $scope.Product = data.Product;
                //判断预付时间是否为空
                if(angular.isDefined($scope.Product)){

                    //将产品属性、押金、支付方式、递增类型等数据由数字转为字符串  王洲  2016.4.5
                    $scope.Product.productAttributes = $scope.Product.productAttributes.toString();
                    $scope.Product.depositWay = $scope.Product.depositWay.toString();
                    $scope.Product.payWay = $scope.Product.payWay.toString();
                    $scope.Product.isRentFree = $scope.Product.isRentFree.toString();
                    if($scope.Product.isRentFree == 1){
                        document.getElementById('freeTime').disabled = 'disabled';
                    }
                    $scope.Product.increasingRent = $scope.Product.increasingRent.toString();
                    if($scope.Product.increasingRent == 1){
                        document.getElementById('rentProportion').disabled = 'disabled';
                        document.getElementById('rentType').disabled = 'disabled';
                    }
                    if(angular.isDefined($scope.Product.rentType)){
                        $scope.Product.rentType = $scope.Product.rentType.toString();
                    }

                    //判断面积划分数据是对象还是数组
                    if(angular.isObject($scope.Product.areadivisionlist)){
                        $scope.AreaDivision = $scope.Product.areadivisionlist;
                        $scope.AreaDivisionList.push($scope.AreaDivision);
                    }
                    if(angular.isArray($scope.Product.areadivisionlist)){
                        $scope.AreaDivisionList = $scope.Product.areadivisionlist;
                    }

                    //判断产品对象的附件是否存在，存在是赋值给annexs,是否是对象还是数组
                    if(angular.isDefined($scope.Product.annexs)){
                        if(angular.isObject($scope.Product.annexs)){
                            $scope.annex = {annexAddress:$scope.Product.annexs.annexAddress,annexName:$scope.Product.annexs.annexName,isMain:$scope.annexs.isMain};
                            $scope.annexs.push($scope.annex);
                        }if(angular.isArray($scope.Product.annexs)){
                            $scope.annexs = $scope.Product.annexs;
                        }
                        for(var i = 0,len = $scope.annexs.length; i < len; i ++){
                            if($scope.annexs[i].isMain == 0){
                                hasMain = true;
                            }
                        }
                    }

                    //判断产品关联的建筑是否存在，并判断是否为对象，如果是对象则转成数组
                    if(angular.isDefined($scope.Product.buildingstructruenewlist)){
                        if(angular.isArray($scope.Product.buildingstructruenewlist)){
                            $scope.addWaterCheck = $scope.Product.buildingstructruenewlist;
                        }else{
                            $scope.addWaterCheck.push($scope.Product.buildingstructruenewlist);
                        }
                    }
                }
            }).error(function(data){
                layer.alert('没有对应的产品信息！',{icon : 2});
            });
        }


        /*****************************  载入时执行方法end    ***************************************/


        /*****************************  方法start  ***********************************************/

            //显示新增行
        $scope.addItem = function(){
            if($scope.editItem){
                layer.msg('请先保存正在填写的数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editItem = true;
            $scope.editIndex = null;
            $scope.AreaDivision = {};
        };
        //隐藏新增行
        $scope.addCancel = function(){
            $scope.editItem = false;
        };

        //修改新增行
        $scope.updateItem = function(index){
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            $scope.editIndex = index;
            var current=$scope.AreaDivisionList[index];
            $scope.AreaDivision = {
                areaDivisionNum:current.areaDivisionNum,
                areaDivisionName:current.areaDivisionName,
                areas:current.areas,
                unitPrice:current.unitPrice,
                sum:current.sum
            };
            $scope.editItem=true;
        };

        //删除新增行
        //删除行时进行提示  王洲  2016.04.22
        $scope.deleteItem = function(index){
            //增加判断是否有数据未保存的判断  王洲  2016.04.22
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }
            layer.confirm('是否删除此行？',{
                btn : ['确定','取消']
            },function(){
                $scope.AreaDivisionList.splice(index,1);
                $scope.changeProductPrice();
                layer.msg('删除成功！',{icon : 0,time : 1000});
                $scope.$apply($scope.AreaDivisionList);
            },function(){});
        };

        //面积或者单价改变时，修改总价  王洲  2016.04.08
        $scope.changeSum = function(){
            if(app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.areas).state && app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.unitPrice).state){
                $scope.AreaDivision.sum = ($scope.AreaDivision.areas * $scope.AreaDivision.unitPrice).toFixed(2);
            }
        };

        //总价改变时，调整单价  王洲  2016.04.08
        $scope.changePrice = function(){
            if(app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.areas).state && app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.sum).state){
                $scope.AreaDivision.unitPrice = ($scope.AreaDivision.sum / $scope.AreaDivision.areas).toFixed(2);
            }
        };

        //使产品的租赁价格、均价为不可输入，当行数据发生改变时通过行数据自动统计出租赁价格和均价  王洲  2016.04.08
        $scope.changeProductPrice = function(){
            if($scope.AreaDivisionList.length >= 0){
                var listarea = 0,listprice = 0,listsum = 0;
                for(var i = 0,len = $scope.AreaDivisionList.length; i < len; i ++){
                    listarea = listarea + Number($scope.AreaDivisionList[i].areas);
                    listprice = listprice + Number($scope.AreaDivisionList[i].unitPrice);
                    listsum = listsum + Number($scope.AreaDivisionList[i].sum);
                }
                $scope.Product.price = Number(listsum).toFixed(2);
                $scope.Product.averagePrice = (listsum / listarea).toFixed(2) != "NaN" ? (listsum / listarea).toFixed(2) : "0.0000";
            }
        };

        //将新增行的数据保存到集合中
        //增加判断 王洲 2015.12.25
        $scope.addSave = function(){
            var areanum = '';
            areanum = app.get('valueCheck').isNull($scope.AreaDivision.areaDivisionNum);
            if(areanum.state == false){
                layer.msg('序号' + areanum.info, {icon : 0,time : 1000});
                return;
            }
            var areaname = '';
            areaname = app.get('valueCheck').isNull($scope.AreaDivision.areaDivisionName);
            if(areaname.state == false){
                layer.msg('名称' + areaname.info, {icon : 0,time : 1000});
                return;
            }
            var areaareas = '';
            areaareas = app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.areas);
            if(areaareas.state == false){
                layer.msg('面积' + areaareas.info, {icon : 0,time : 1000});
                return;
            }
            var areaunit = '';
            areaunit = app.get('valueCheck').isNumberAndNotNull($scope.AreaDivision.unitPrice);
            if(areaunit.state == false){
                layer.msg('单价'+ areaunit.info,{icon : 0,time : 1000});
                return;
            }
            //当总价被置空后增加计算方法  王洲  2016.04.22
            if(app.get('valueCheck').isNull($scope.AreaDivision.sum).state == false){
                $scope.AreaDivision.sum = ($scope.AreaDivision.areas * $scope.AreaDivision.unitPrice).toFixed(2);
            }

            //总价取消手动输入，由面积和单价相乘，保留4位小数  王洲  2016.4.5
            //取消该方法，修改为总价由单价和面积相乘，修改总价时单价自动修改  王洲  2016.04.08
            //$scope.AreaDivision.sum = ($scope.AreaDivision.areas * $scope.AreaDivision.unitPrice).toFixed(2);
            //增加保存行数据时的重复验证，验证序号和名称不能重复  王洲  2016.4.5
            if($scope.editIndex!=null){
                var numcount = 0,namecount = 0;
                for(var i = 0, len = $scope.AreaDivisionList.length; i <len; i++){
                    if($scope.AreaDivision.areaDivisionNum == $scope.AreaDivisionList[i].areaDivisionNum && i != $scope.editIndex){
                        numcount++;
                    }
                    if($scope.AreaDivision.areaDivisionName == $scope.AreaDivisionList[i].areaDivisionName && i != $scope.editIndex){
                        namecount++;
                    }
                }
                if(numcount > 0){
                    layer.msg('序号不能重复！',{icon : 0,time : 1000});
                    return;
                }
                if(namecount > 0){
                    layer.msg('名称不能重复！',{icon : 0,time : 1000});
                    return;
                }
                $scope.AreaDivisionList[$scope.editIndex]={
                    areaDivisionNum:$scope.AreaDivision.areaDivisionNum,
                    areaDivisionName:$scope.AreaDivision.areaDivisionName,
                    areas:$scope.AreaDivision.areas,
                    unitPrice:$scope.AreaDivision.unitPrice,
                    sum:$scope.AreaDivision.sum
                };
            }else {
                var numcount = 0,namecount = 0;
                for(var i = 0, len = $scope.AreaDivisionList.length; i <len; i++){
                    if($scope.AreaDivision.areaDivisionNum == $scope.AreaDivisionList[i].areaDivisionNum){
                        numcount++;
                    }
                    if($scope.AreaDivision.areaDivisionName == $scope.AreaDivisionList[i].areaDivisionName){
                        namecount++;
                    }
                }
                if(numcount > 0){
                    layer.msg('序号不能重复！',{icon : 0,time : 1000});
                    return;
                }
                if(namecount > 0){
                    layer.msg('名称不能重复！',{icon : 0,time : 1000});
                    return;
                }
                $scope.AreaDivisionList.push($scope.AreaDivision);
            }
            $scope.editItem = false;
            $scope.AreaDivision = {};
            $scope.changeProductPrice();
        };

        //新增产品--建筑租赁
        $scope.addProduct = function (){

            //增加当有行数据未保存时的提示  王洲  2016.04.22
            if($scope.editItem){
                layer.msg('请先保存行数据！',{icon : 0,time : 1000});
                return;
            }

            if(angular.isUndefined($scope.Product)){
                layer.msg('不能提交空产品！',{icon : 0,time : 1000});
                return;
            }
            var pEffect = app.get('valueCheck').isNull($scope.BuildLease.productBeginDate);
            if(!pEffect.state){
                layer.msg('请选择启用时间',{icon : 0,time : 1000});
                return;
            }
            var bdate=$scope.BuildLease.productBeginDate;
            var edate=$scope.BuildLease.productBeginDate;
            var nowdate=new Date();
            var strb= new Array();
            strb=bdate.split("-");
            var y=nowdate.getFullYear();//年份
            if(strb[0]<y)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            var m=nowdate.getMonth()+1;   //月份
            if(strb[0]<=y&&strb[1]<m)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            var d=nowdate.getDate();    //日
            if(strb[0]<=y&&strb[1]<=m&&strb[2]<d)
            {
                layer.alert("启用时间不能为现在之前！",{icon:1,time:2000});
                return;
            }
            if(bdate>edate)
            {
                layer.alert("请注意启用时间与失效时间的顺序！",{icon:1,time:2000});
                return;
            }
            var pName = app.get('valueCheck').isNull($scope.Product.productName);
            if(pName.state == false){
                layer.msg('产品名称' + pName.info, {icon : 0,time : 1000});
                return;
            }
            $scope.checkName();
            var pAttri = app.get('valueCheck').isNull($scope.Product.productAttributes);
            if(pAttri.state == false){
                layer.msg('产品属性' + pAttri.info, {icon : 0,time : 1000});
                return;
            }
            if($scope.AreaDivisionList.length == 0){
                layer.msg('产品属性关联信息不能为空！',{icon : 0,time : 1000});
                return;
            }
            var pPrice = app.get('valueCheck').isNumberAndNotNull($scope.Product.price);
            if(pPrice.state == false){
                layer.msg('租赁价格' + pPrice.info,{icon : 0,time : 1000});
                return;
            }
            var pAver = app.get('valueCheck').isNumberAndNotNull($scope.Product.averagePrice);
            if(pAver.state == false){
                layer.msg('均价' + pAver.info, {icon : 0,time : 1000});
                return;
            }
            var pDeposit = app.get('valueCheck').isNull($scope.Product.depositWay);
            if(pDeposit.state == false){
                layer.msg('押金方式' + pDeposit.info, {icon : 0,time : 1000});
                return;
            }
            var pPayway = app.get('valueCheck').isNull($scope.Product.payWay);
            if(pPayway.state == false){
                layer.msg('支付方式' + pPayway.info, {icon : 0,time : 1000});
                return;
            }
            var pRent = app.get('valueCheck').isNull($scope.Product.isRentFree);
            if(pRent.state == false){
                layer.msg('请选择是否有免租期', {icon : 0,time : 1000});
                return;
            }
            if(document.getElementById('freeTime').disabled == ''){
                var pFree = app.get('valueCheck').isOnlyNumberAndNotNull($scope.Product.freeTime);
                if(pFree.state == false){
                    layer.msg('免租期天数' + pFree.info, {icon : 0, time : 1000});
                    return;
                }
            }
            var pIncreasing = app.get('valueCheck').isNull($scope.Product.increasingRent.toString());
            console.log(pIncreasing);
            if(pIncreasing.state == false){
                layer.msg('租金递增比例' + pIncreasing.info, {icon : 0,time : 1000});
                return;
            }
            if(document.getElementById('rentProportion').disabled == ''){
                var pRentpro = app.get('valueCheck').isNumberAndNotNull($scope.Product.rentProportion);
                if(pRentpro.state == false){
                    layer.msg('递增比例额度' + pRentpro.info, {icon : 0,time : 1000});
                    return;
                }
            }
            if(document.getElementById('rentType').disabled == ''){
                var pRenttype = app.get('valueCheck').isNull($scope.Product.rentType);
                if(pRenttype.state == false){
                    layer.msg('递增类型' + pRenttype.info, {icon : 0,time : 1000});
                    return;
                }
            }

            $scope.Product.productType = 0;
            $scope.Product.areadivisionlist = $scope.AreaDivisionList;
            $scope.Product.annexs = $scope.annexs;
            if($scope.Product.annexs.length == 0){
                layer.msg('必须上传产品图片！',{icon : 0,time : 1000});
                return;
            }
            //修改是否有主图的判断  王洲  2016.4.6
            if(!hasMain){
                layer.msg('必须有主图！',{icon : 0,time : 1000});
                return;
            }
            $scope.Product.buildingstructruenewlist = $scope.addWaterCheck;
            if($scope.Product.buildingstructruenewlist.length == 0){
                layer.confirm('该产品尚未关联建筑，是否保存？',{
                    btn : ['确认','取消']
                },function(){
                    if(angular.isUndefined($scope.Product.productId) || $scope.Product.productId == null){
                        $http.post(url + '/Product/addProduct',{Product : $scope.Product}).success(function(){
                            layer.msg('新增成功！',{icon : 1,time : 1000});
                            localStorage.setItem("product_id",JSON.stringify(''));
                            $location.path("/index/accountManagement/productAndProperty/product");
                        }).error(function(){
                            layer.msg('新增失败！',{icon : 2,time : 2000});
                        });
                    }else{
                        $http.post(url + '/Product/updateProduct',{Product : $scope.Product}).success(function(){
                            layer.alert('修改成功！',{icon : 1, time : 1000});
                            localStorage.setItem("product_id",JSON.stringify(''));
                            $location.path("/index/accountManagement/productAndProperty/product");
                        }).error(function(){
                            layer.alert('修改失败！',{icon : 2,time : 2000});
                        });
                    }
                },function(){
                })
            }else{
                if(angular.isUndefined($scope.Product.productId) || $scope.Product.productId == null){
                    $http.post(url + '/Product/addProduct',{Product : $scope.Product}).success(function(){
                        layer.msg('新增成功！',{icon : 1,time : 1000});
                        localStorage.setItem("product_id",JSON.stringify(''));
                        $location.path("/index/accountManagement/productAndProperty/product");
                    }).error(function(){
                        layer.msg('新增失败！',{icon : 2,time : 2000});
                    });
                }else{
                    $http.post(url + '/Product/updateProduct',{Product : $scope.Product}).success(function(){
                        layer.alert('修改成功！',{icon : 1, time : 1000});
                        localStorage.setItem("product_id",JSON.stringify(''));
                        $location.path("/index/accountManagement/productAndProperty/product");
                    }).error(function(){
                        layer.alert('修改失败！',{icon : 2,time : 2000});
                    });
                }
            }
        };


        //取消新增，返回产品列表
        $scope.backToProduct = function(){
            $location.path("/index/accountManagement/productAndProperty/product");
        };

        /**
         * 确定时将图片数据存到数据里面，并刷新页面数据
         */
        $scope.applyAnnexs = function(){
            $scope.annexs.push($scope.annex);
            setTimeout(function() {
                $scope.$apply(function()
                {
                    $scope.annexs;
                });
            },100);

            $("#pics").modal("hide");
        };

        //图片上传
        $scope.annex = {annexAddress:'',annexName:'',isMain:''};

        var hasMain = false;
        //上传主图方法
        $scope.uploadMainPic=function(){
            //增加已有主图时的判断  王洲  2016.4.6
            if(hasMain){
                layer.msg('主图只能保存一张，请先移除需替换图片',{icon : 0,time : 1000});
                return;
            }
            $("#pics").modal("show");
            $scope.annex = {annexAddress:'',annexName:'',isMain:''};
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="zyupload" class="zyupload"></div>');
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        if($scope.annex.isMain != 1){
                            $scope.annex.isMain = 0;
                        }
                        hasMain = true;
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //上传辅图方法
        $scope.uploadPic=function(){
            $("#pics").modal("show");
            $scope.annex = {annexAddress:'',annexName:'',isMain:''};
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="zyupload" class="zyupload"></div>');
                // 初始化插件
                $("#zyupload").zyUpload({
                    //width            :   "900px",                 // 宽度
                    //height           :   "400px",                 // 宽度
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        if($scope.annex.isMain == ""){
                            $scope.annex.isMain = 1;
                        }
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //移除图片
        $scope.delPic = function(item){
            $scope.picItem = [];
            $scope.picItem = $scope.annexs;
            $scope.annexs = [];
            for(var i = 0; i <$scope.picItem.length; i ++){
                if(item.annexAddress != $scope.picItem[i].annexAddress){
                    $scope.annexs.push($scope.picItem[i]);
                }
            }
            if(item.isMain == 0){
                hasMain = false;
            }
        };

        /**
         * 打开选择建筑模态框
         * 王洲
         * 2015.12.25
         */
        $scope.openBuilding = function(){
            $("#chooseBuild").modal("show");
        };

        //查询所有建筑结构信息.
        $http.get(url+'/BuildingStructureNew/listAllBuildingStructureNewByAllIdOptimize/'+$scope.id).success(function(data){
            $scope.zNodes =[{}];
            //获取json数据
            $scope.buildingStructureNews = data.BuildingStructureNew;
            var tasks =  $scope.buildingStructureNews;
            if(tasks!=null){
                for(var i=0;i<tasks.length;i++){
                    $scope.zNode ={ id:tasks[i].id, pId:tasks[i].parentId, name:tasks[i].nodeName,fullName:tasks[i].fullName,checked:tasks[i].checked};
                    $scope.zNodes.push($scope.zNode);
                }
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);

                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "建筑信息";
                zTree.updateNode(nodes[0]);
                if($scope.addWaterCheck.length > 0){
                    for(var j = 0; j < $scope.addWaterCheck.length; j++){
                        var node = zTree.getNodeByParam("id",$scope.addWaterCheck[j].id);
                        zTree.checkNode(node);
                        zTree.selectNode(node);
                    }
                }
            }
        }).error(function(data,status,headers,config){
            layer.alert('建筑信息查询失败！',{icon : 0,time : 1000});
        });

        var zTreeOnCheck=function(event, treeId, treeNode) {
            var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
            var nodes=treeObj.getCheckedNodes(true);
            $scope.treeResult={treeList:[]};
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].isParent==false) {
                    $scope.treeResult.treeList.push(nodes[i]);
                }
                if(nodes[i].check_Child_State == -1)
                {
                    $rootScope.addressIdT=nodes[i].id;
                }
            }
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            $scope.addWaterCheck = $scope.treeResult.treeList;
        };

        $scope.Product.BuildingList=[];
        var reslute = [];
        $scope.addBuildingToProduct = function(){
            //$scope.Product.BuildingList=[];
            //angular.forEach($scope.addWaterCheck,function(item,key)
            //{
            //
            //});
            //console.log($scope.addWaterCheck);
            //$scope.Product.BuildingList = $scope.addWaterCheck;
            //reslute = $scope.addWaterCheck;
        };

        var setting = {
            check:{
                enable:true
            },
            view: {
                selectedMulti: false
            },
            edit: {
                enable: false,
                editNameSelectAll: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onCheck:zTreeOnCheck
            }
        };

        function selectAll() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
        }

        $(document).ready(function(){
            $("#selectAll").bind("click", selectAll);
        });

        /**
         * 判断产品名称是否重复
         * 王洲
         * 2016.04.22
         */
        $scope.checkNames = false;
        $scope.checkName = function(){
            if(app.get('valueCheck').isNull($scope.Product.productName).state){
                $scope.check = {productId : '',productName : ''};
                $scope.check.productId = productid;
                $scope.check.productName = $scope.Product.productName;
                $http.post(url + '/Product/checkProductName',{Product : $scope.check}).success(function(data){
                    $scope.checkNames = data.Info.state;
                    if(!$scope.checkNames){
                        layer.msg('此产品名称已存在，请重试！',{icon : 0,time : 1000});
                    }
                }).error(function(data){
                    layer.msg('数据查询异常，请重试！',{icon : 0,time : 1000});
                });
            }
        };


        /*****************************  方法end    ***********************************************/

    }]);
});
