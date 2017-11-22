'use strict';

define(function (require) {
    var app = require('../../../../../app');
    app.controller('fixedParkingSpaceCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var _beginDate=0;
        var _productId="";
        $scope.ProductFixedparkingspace={};
        $scope.productIds = [];
        //获取车位信息
        $scope.getFp=function(){
            $http.post(url + "/Product/getBuildingListByType",{ProductCommonservice:$scope.ProductCommonservice}).success(function(data){
                $scope.zNodes =[{}];
                $scope.buildingStructureNews = data.BuildingStructureNew;
                var tasks =  $scope.buildingStructureNews;
                if(tasks!=null){
                    for(var i=0;i<tasks.length;i++){
                        $scope.zNode ={ id:tasks[i].id, pId:tasks[i].parentId, name:tasks[i].nodeName,fullname:tasks[i].fullName,checked:tasks[i].checked};
                        $scope.zNodes.push($scope.zNode);
                    }
                    $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = zTree.getNodes();
                    nodes[0].name = "车位信息";
                    zTree.updateNode(nodes[0]);
                }
            }).error(function(){
                layer.msg("获取车位信息失败!!",{icon:0});
            });
        }
        //分页BEGIN==============================================================================================================
        $scope.productFixedparking = {page:{}};
        $scope.load=function() {
            var listPage = function (page, callback) {
                $scope.productFixedparking.page = page;
                $http.post(url + '/ProductFixedparkingspace/listPageWithPf', {ProductFixedparkingspace: $scope.productFixedparking}).success(callback);
            }
            $scope.searchPaginator1 = app.get('Paginator').list(listPage,3);
        }
        $scope.load();
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
                    console.log($rootScope.addressIdT);
                }
            }
            console.log("treeList:" + $scope.treeResult.treeList);
        };
        /**
         * 显示选中的树状数据
         */
        $scope.addWaterReading = function(){
            $scope.addWaterCheck = $scope.treeResult.treeList;
        };
        $scope.cancelChargeType=function(){//
            $scope.remove_all();
            $scope.ProductFixedparkingspace={};
            if($scope.treeResult !=undefined)
            {$scope.treeResult.treeList={};}
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

        $scope.toAdd=function(){//展示新增页面
            document.getElementById("d4311").disabled = false;
            $scope.getFp();
            _productId="";
            angular.element('#newWindow').modal('show');
        };
        $scope.btnSubmit=function(){//提交表单BEGIN
            var pBd = app.get('valueCheck').isNull($scope.ProductFixedparkingspace.beginDate);
            if(!pBd.state){
                layer.msg("生效日期不能为空!",{icon:0});
                return;
            }
            var pPp = app.get('valueCheck').isNull($scope.ProductFixedparkingspace.productPrice);
            if(!pPp.state){
                layer.msg("金额不能为空!",{icon:0});
                return;
            }
            if (IsNum($scope.ProductFixedparkingspace.productPrice)){
                return;
            }
            if($scope.addWaterCheck==null){
                layer.msg("请选择车库!",{icon:0});
                return;
            }
            var bdate=$scope.ProductFixedparkingspace.beginDate;
            var edate=$scope.ProductFixedparkingspace.endDate;
            var nowdate=new Date();
            var strb= new Array();
            strb=bdate.split("-");
            var y=nowdate.getFullYear();//年份
            if(_beginDate!=1){
            if(strb[0]<y)
            {
                layer.msg("生效日期必须大于或等于当前日期！",{icon:0});
                return;
            }
            var m=nowdate.getMonth()+1;   //月份
            if(strb[0]<=y&&strb[1]<m)
            {
                layer.msg("生效日期必须大于或等于当前日期！",{icon:0});
                return;
            }
            var d=nowdate.getDate();    //日
            if(strb[0]<=y&&strb[1]<=m&&strb[2]<d)
            {
                layer.msg("生效日期必须大于或等于当前日期！",{icon:0});
                return;
            }
            }
            if(edate!="") {
                if (bdate >= edate) {
                    layer.msg("失效日期必须大于生效日期！",{icon:0});
                    return;
                }
            }
            if(edate==''){
                $scope.ProductFixedparkingspace.endDate=undefined;
            }
            $scope.ProductFixedparkingspace.buildingStructureNewList=$scope.addWaterCheck;
            $scope.str=$scope.ProductFixedparkingspace.buildingStructureNewList[0].id;
            if($scope.str==undefined){
                layer.msg("车库不存在!",{icon:0});
                return;
            }
            if(_productId!=""){//编辑功能
                $http.post(url + '/ProductFixedparkingspace/updatePf',{ProductFixedparkingspace:$scope.ProductFixedparkingspace}).success(function(data){
                    layer.alert("修改成功",{icon:1,time:1000});
                    angular.element('#newWindow').modal('hide');
                    $scope.searchPaginator1._load();
                    $scope.getFp();
                    $scope.cancelChargeType();
                    $scope.productIds=[];
                }).error(function(data){
                    layer.msg("修改失败!",{icon:0});
                });
            }
            if(_productId==""){//新增功能
            $http.post(url + '/ProductFixedparkingspace/addPf',{ProductFixedparkingspace:$scope.ProductFixedparkingspace}).success(function(data){
                if(data.code='1'){
                    layer.alert("新增成功",{icon:1,time:1000});
                    angular.element('#newWindow').modal('hide');
                    $scope.searchPaginator1._load();
                    $scope.getFp();
                    $scope.cancelChargeType();
                    $scope.productIds=[];
                }
                else
                {
                    layer.msg("新增失败!",{icon:0});
                }
            }).error(function(data){
            });}
        };//提交表单END
        //显示子表内容
        $scope.showChild=function(id){
            $scope.productFixedparkingc = {page:{},fixedparkingspaceId:id};
            $scope.load=function() {
                var listPage = function (page, callback) {
                    $scope.productFixedparkingc.page = page;
                    $http.post(url + '/ProductFixedparkingspace/listPageWithPfc', {ProductFixedparkingspaceChild: $scope.productFixedparkingc}).success(callback);
                }
                $scope.searchPaginator2 = app.get('Paginator').list(listPage,3);
            }
            $scope.load();
            if(document.getElementById(id).checked == true){
                document.getElementById(id).checked = false;
                $scope.temp = [];
                $scope.temp = $scope.productIds;
                $scope.productIds = [];
                for(var i = 0; i < $scope.temp.length; i ++){
                    if($scope.temp[i] != id){
                        $scope.productIds.push($scope.temp[i]);
                    }
                }
            }else{
                document.getElementById(id).checked = true;
                $scope.productIds.push(id);
            }
        };
        $scope.toUpdate=function(){//编辑
            document.getElementById("d4311").disabled = false;
            $scope.ServiceProjectList = [];
            $scope.BuildingStructureNewList = [];
            //查看前判断是否产品是否选中，是否只选择了一条记录
            if($scope.productIds.length == 0){
                layer.msg("请选择需要修改的产品!",{icon:0});
                return;
            }
            if($scope.productIds.length > 1){
                layer.msg("只能修改一条信息!",{icon:0});
                return;
            }
             _productId=$scope.productIds[0];
            $http.post(url + '/ProductFixedparkingspace/getPf/'+_productId).success(function(data){
                $scope.ProductFixedparkingspace=data.ProductFixedparkingspace;
                var formatDate = function (date) {
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    return y + '-' + m + '-' + d;
                };
                var date = formatDate(new Date());
                if(date>=$scope.ProductFixedparkingspace.beginDate){
                    document.getElementById("d4311").disabled = true;
                    _beginDate=1;
                }
            }).error(function(data){
            });
            $http.post(url + '/ProductFixedparkingspace/getBuildingListByTypeOrId/'+_productId).success(function(data){
                $scope.zNodes =[{}];
                $scope.buildingStructureNews = data.BuildingStructureNew;
                var tasks =  $scope.buildingStructureNews;
                for(var i=0;i<tasks.length;i++){
                    $scope.zNode ={ id:tasks[i].id, pId:tasks[i].parentId, name:tasks[i].nodeName,fullname:tasks[i].fullName,checked:tasks[i].checked,ss:tasks[i].stallState};
                    $scope.zNodes.push($scope.zNode);
                }
                $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var nodes = zTree.getNodes();
                nodes[0].name = "车位信息";
                zTree.updateNode(nodes[0]);
                zTree.checkNode(nodes[0])
                $scope.atemp=zTree.getNodesByParam("ss",1);
                for(var i=0;i<$scope.atemp.length;i++){
                    var p=$scope.atemp[i].pId;
                    var pnode=zTree.getNodeByParam("id",p);
                    if(pnode.checked==false){
                        zTree.checkNode(pnode);
                       // zTree.selectNode(pnode);
                        var pp=pnode.pId;
                        var ppnode=zTree.getNodeByParam("id",pp);
                        if(ppnode.checked==false){
                        zTree.checkNode(ppnode);
                        //  zTree.selectNode(ppnode);
                        }
                    }
                    zTree.checkNode($scope.atemp[i]);
                    //zTree.selectNode($scope.atemp[i]);
                }
                $scope.addWaterCheck=$scope.atemp;
            }).error(function(){
                layer.msg("获取车位信息失败!!",{icon:0});
            });
            angular.element('#newWindow').modal('show');
        };
        //删除方法
        $scope.toUpdatePfDate=function(){
            $scope.ProductFixedparkingspace.ids=$scope.productIds;
            $http.post(url + '/ProductFixedparkingspace/updatePfDate',{ProductFixedparkingspace:$scope.ProductFixedparkingspace}).success(function(data){
                $scope.load();
                $scope.productIds=[];//清空选中id  list
                $scope.searchPaginator1._load();//重新加载页面
                layer.alert('已删除'+data.result+'条信息和'+data.results+'个车位!',{icon :0});
            }).error(function(data){
            });
        }
        $scope.removeItem=function(index,item){
            var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
            var node ={id:item.id, pId:item.pId, name:item.nodeName,fullName:item.fullName,checked:false};
            var parentNode=treeObj.getNodeByParam("id",item.id,null);
            treeObj.checkNode(parentNode, false, true);
            $scope.addWaterCheck.splice(index,1);
        };
        $scope.remove_all = function()
        {
            console.log($scope.zNodes);
            var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
            $scope.addWaterCheck = null;
            treeObj.checkAllNodes(false);
        };
        //取消
        $scope.btnClose=function(){
            angular.element('#newWindow').modal('hide');
            $scope.cancelChargeType();
        }
        $scope.btnCloseAll=function(){
            $location.path("/index/accountManagement/productAndProperty/product");
        }
        $scope.btnSubmitAll=function(){

            $scope.getFp();
           if($scope.buildingStructureNews.length!=0){
               layer.msg("请将车库设置好之后再提交!",{icon:0});
           }
            else{
               $http.get(url + '/ProductFixedparkingspace/updateAndSubmit').success(function(data){
                   layer.msg("保存成功!",{icon:0});
                   $location.path("/index/accountManagement/productAndProperty/product");
               }).error(function(){
                   layer.alert('保存失败，请重试！',{icon : 2});
               });
           }
        }
        function IsNum(num) {
            var reNum = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
            if (num == 0) {
                layer.alert('金额不能为0！', {icon: 0});
                return true;
            }
            else {
                if (reNum.test(num)) {
                    return false;
                }
                else {
                    if (num < 0) {
                        layer.alert('金额不能为负数！', {icon: 0});
                        return true;
                    } else {
                        layer.alert('请输入有效金额！', {icon: 0});
                        return true;
                    }
                }
            }
        }
    }]);
});
