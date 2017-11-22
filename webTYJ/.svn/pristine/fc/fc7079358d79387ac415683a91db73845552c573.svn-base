/**
 * Created by NM on 2018/1/18.
 * 专业资产初始化】新增资产
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('newAssetsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.doClick(2);//增加页面刷新时保持tab高亮方法 王洲 2016.1.22

        var companyId ;
        var user = {employId : ''};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        //查询所有专业列表方法.
        $http.get(url + '/PropertyType/treePropertyType').success(function(data) {
            //$scope.zNodes =[{}];
            //获取json数据
            $scope.propertyTypes = data.Tree;

            for(var i=0;i<$scope.propertyTypes.length;i++){
                var nodes=$scope.propertyTypes[i];
                if(nodes.pId==null){
                    nodes.chkDisabled=true;
                }
            }
            $.fn.zTree.init($("#treeDemo"), setting, $scope.propertyTypes);
        }).error(function(data,status,headers,config){
            layer.alert("专业资产初始化专业查询失败！",{icon : 2})
        });

        //新增资产模块----新增资产方法.
        $scope.addNewAsset={companyId:companyId};
        $scope.addAsset=function(){
            $scope.addNewAsset.propertyTypeId =  document.getElementById("majorId").value;
            if( $scope.addNewAsset.propertyTypeId == null|| $scope.addNewAsset.propertyTypeId==""){
                layer.alert("请选择专业类型",{icon : 0});
                return;
            }
            if($scope.addNewAsset.propertyName==undefined || $scope.addNewAsset.propertyName.replace(/\s+/g,"")==""){
                layer.alert("资产名称不能为空",{icon : 0});
                return;
            }else if($scope.addNewAsset.propertySpecification==undefined||$scope.addNewAsset.propertySpecification.replace(/\s+/g,"")==""){
                layer.alert("规格型号不能为空",{icon : 0});
                return;
            }else if($scope.addNewAsset.manufacturerPhone==null||$scope.addNewAsset.manufacturerPhone=='')
            {
                layer.alert("厂商电话不能为空",{icon : 0});
                return;
            }else {
                if(!$scope.checkPhone($scope.addNewAsset.manufacturerPhone)){
                    return;
                };
            }
            $http.post(url+'/Property/AddProperty',{Property:$scope.addNewAsset}).success(function(){
                layer.alert("新增资产成功！",{icon : 1});
                $scope.addNewAsset = {};
                //新增资产后跳转到资产列表页面  王洲  2016.1.22
                $location.path("/index/baseManagement/majorAssetInitialization/queryAssets");
            }).error(function(data,status,headers,config){
                layer.alert("新增资产失败！",{icon : 2})
            })
        };

        /**
         *  验证电话号码
         */
        $scope.checkPhone=function(phone){
            var pattern=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            var patt=/^0\d{2,3}-?\d{7,8}$/;
            if(!pattern.test(phone)&&!patt.test(phone)){
                layer.alert('联系电话格式不正确！',{icon : 0});
                return false;
            }else{
                return true;
            }
        };

        // 定义通过id查询资产.
        $scope.asset={};
        $scope.getAsset=function(id){
            $http.get(url+'/Property/getPropertyByIdRest'+id).success(function(data){
                $scope.asset=data.Property;
            }).error(function(data,status,headers,config){
                layer.alert("获取资产信息失败！",{icon : 2})
            })
        };

        // 定义修改资产方法.
        $scope.updateAsset=function(){
            $http.put(url+'/Property/UpdateProperty',{Property:$scope.asset}).success(function(){
                layer.alert("修改成功",{icon : 1})
            }).error(function(data,status,headers,config){
                layer.alert("修改失败",{icon : 2})
            })
        };
    }]);
});

function zTreeCheck(){
    var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
    var znode=treeObj.getCheckedNodes(true);

    if (znode.length > 0) {
        var node = znode[0].getParentNode();
        if (node == null) {
            layer.alert("请选择专业分类",{icon:0})
            return;
        }else{
            for(var i=0;i<znode.length;i++){
                if(znode[i].id != undefined){
                    var majarName = node.name;
                    var classifyName = znode[i].name;
                    var propertyTypeId =znode[i].id; //获取选中节点的值
                }
            }
        }
    }
    if(majarName != undefined && classifyName != undefined && propertyTypeId != undefined){
    document.getElementById("majorName").value = majarName;
    document.getElementById("classifyName").value = classifyName;
    document.getElementById("majorId").value = propertyTypeId;
    }
}
