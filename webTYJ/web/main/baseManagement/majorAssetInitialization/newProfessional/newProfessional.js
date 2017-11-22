/**
 * Created by NM on 2018/1/18.
 * 【专业资产初始化】新增专业
 */

'use strict';
define(function (require) {
    var app = require('../../../../app');

    app.controller('newProfessionalCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.show1 = false;
        //定义全局变量url,访问数据库接口路径
        $scope.propertyType = {page: {}};
        var url = $rootScope.url;
        $scope.doClick(1);
        /**
         * 获取登录人信息
         * 禅道BUG 145
         * 修改人：陶勇超
         * 2016年1月6日 14:12:20
         */
        var userId ;
        var companyId ;
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        userId= $scope.user.loginName;
        companyId= $scope.user.companyId

        $scope.showStatus=1;
        $scope.btnIndex = 0;

        //网格切换
        $scope.tabview=function(){
            $scope.showStatus=0;
        }

        $scope.listview=function(){
            $scope.showStatus=1;
        }


        //查询所有专业列表方法
        $scope.propertyType.companyId=companyId;
        $scope.load1=function(){
            var parent = function (page, callback) {
                if($('#allchose')!=null){
                    $('#allchose')[0].checked=false;
                }
                $scope.propertyType.page = page;
                $http.post(url + '/PropertyType/listPageParentPropertyType', {PropertyType: $scope.propertyType}).success(callback);
            };
            $scope.currentParentProperty = app.get('Paginator').list(parent, 6);
        };
        $scope.load1();



        //获取专业分类
        $scope.currentBuilding = {};    //选中的专业
        $scope.classifyPropertyType={};
        $scope.currentPropertyType = [];   //选中专业中所有的专业分类
        $scope.changeItem=undefined;  //选中的专业
        $scope.changeItem1=undefined;  //选中的专业
        $scope.checkShow = function(items){
            $scope.show1 = true;
            $scope.currentBuilding = items;
            $scope.changeItem=items;
            $scope.changeItem1=items;
            $scope.node=items.propertyTypeName;
            $scope.classifyPropertyType.parentId=items.propertyTypeId;
            $scope.parentPropertyType.propertyTypeId = $scope.currentBuilding.propertyTypeId;

            /**
             * 获取专业里所有专业分类
             */
            /*
             * Bug832 陈浪 2016.3.7
             */
            $scope.propertyTypeOther={}

            $scope.load2=function(){
                var parent = function (page, callback) {
                    if($('#allchose1')!=null){
                        $('#allchose1')[0].checked=false;
                    }
                    $scope.propertyTypeOther.page = page;
                    $scope.propertyTypeOther.propertyTypeId=$scope.currentBuilding.propertyTypeId;
                    $scope.propertyTypeOther.propertyTypeNumber=$scope.propertyTypeSearchNumber
                    $scope.propertyTypeOther.propertyTypeName=$scope.propertyTypeSearchName;
                    $http.post(url + '/PropertyType/listPageClassifyPropertyType', {PropertyType: $scope.propertyTypeOther}).success(callback);
                };
                $scope.currentPropertyType = app.get('Paginator').list(parent, 6)
            };
            $scope.load2();

            $scope.toggle(items);

            //专业编辑取消
            $scope.cancle=function(){
                $("#new3").modal("hide");
                items=null;
                $scope.propertyType.propertyTypeId=undefined;
            };
        };
        //选中样式
        $scope.toggle=function(item) {
            if (item == null || item == '') {
                return;
            }
            var propertyTypeId = "";
            if (item.propertyTypeId == null) {
                propertyTypeId = item;
            } else {
                propertyTypeId = item.propertyTypeId;
            }
            var tr = $('#' + propertyTypeId);
            var trChild = tr.children().children();
            if (trChild[0] != null) {
                if (tr.attr('style') == null || tr.attr('style') == '') {
                    tr.css('background', '#f6f8fa');
                    trChild[0].checked = true;
                } else {
                    tr.attr('style', '');
                    trChild[0].checked = false;
                }
                if ($("#propertyType input:not(:checked)").length == 1) {
                    $('#allchose')[0].checked = true;
                } else if ($("#propertyType input:not(:checked)").length > 1) {
                    $('#allchose')[0].checked = false;
                }
            }
        }


        //专业全选
        $scope.allchose= function () {
            if($("#propertyType input:not(:checked)").length==1){
                var checkbox=$('#propertyType input:checkbox');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.toggle(checkboxId[i]);
                }
            }else{
                var checkbox=$('#propertyType input:not(:checked)');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.toggle(checkboxId[i]);
                }
            }


        }

        /**
         * 添加分类
         */
        $scope.addclassifyPropertyType=function(){
            if($scope.classifyPropertyType.propertyTypeName==null||$scope.classifyPropertyType.propertyTypeName.replace(/\s+/g,"")==""){
                layer.alert("分类名称不能为空",{icon : 0});
                return;
            }else if($scope.currentBuilding.propertyTypeName==undefined||$scope.currentBuilding.propertyTypeName==""){
                layer.alert("所属专业不能为空",{icon : 0});
                return;
            }
            /**
             * 获取登录人信息
             * 禅道BUG 145
             * 修改人：陶勇超
             * 2016年1月6日 14:12:20
             */
            $scope.classifyPropertyType.founder=userId;
            $scope.classifyPropertyType.companyId=companyId;
            $http.post(url + '/PropertyType/AddPropertyType',{PropertyType:$scope.classifyPropertyType}).success(function(){
                layer.alert("添加成功",{icon : 1});
                $http.get(url+'/PropertyType/selectByIds/'+ $scope.currentBuilding.propertyTypeId).success(function(data) {
                    $scope.load2();
                }).error(function(data,status,headers,config){
                    layer.alert("查询专业失败！",{icon : 2})
                });
                $scope.classifyPropertyType.propertyTypeName=null;
                $scope.classifyPropertyType.propertyTypeNumber=null;
            }).error(function(data, status, headers, config){
                layer.alert("新建分类失败",{icon : 2});
            });
        };

        $scope.newClose= function () {
            $scope.classifyPropertyType.propertyTypeName="";
        }
        //分类编辑
        $scope.updatePropertyType=function(){
            if($scope.parent.propertyTypeName==null||$scope.parent.propertyTypeName==""){
                layer.alert("分类名称不能为空",{icon : 0});
                return;
            }
            /**
             * 获取登录人信息
             * 禅道BUG 145
             * 修改人：陶勇超
             * 2016年1月6日 14:12:20
             */
            $scope.parent.modifier=userId;
            $http.put(url+'/PropertyType/UpdatePropertyType',{PropertyType:$scope.parent}).success(function(){
                layer.msg("编辑成功",{icon : 1,time : 2000});
                $scope.load2();
                $("#new2").modal("hide");
                $scope.d=false;
            }).error(function(data, status, headers, config){
                layer.msg("编辑失败",{icon : 2,time : 2000});
            });
        };




        //专业编辑按钮（列表）
        $scope.updateData1=function(){
            var checkbox=$('#propertyType input:checkbox:checked');
            if(checkbox.length>1){
                layer.alert('不能选择多项进行编辑！！',{icon : 0});
                return;
            }else if(checkbox.length<1||checkbox.length==null){
                layer.alert('请先选择编辑项！！',{icon : 0});
                return;
            }
            //
            //if($scope.changeItem==null){
            //    layer.alert('请先选择编辑项！！',{icon : 0});
            //}else if($scope.changeItem !=null){
                $("#new3").modal({backdrop: 'static', keyboard: false});
                /**
                 * 禅道BUG 156
                 * 修改人：陶勇超
                 * 2016年1月7日 15:41:46
                 */
                $scope.propertyType.propertyTypeId=undefined;
                //$http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+$scope.changeItem.propertyTypeId).success(function(data){
                $http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+$(checkbox[0]).attr('id')).success(function(data){
                    $scope.parentPropertyType1=data.PropertyType;
                }).error(function(data,status,headers,config){
                    layer.alert("查询出错,请重试！",{icon:2});
                });
            //}
        };

        //专业编辑按钮（网格）
        $scope.updateData1ForTable=function(item){
            /*var checkbox=$('#propertyType input:checkbox:checked');
            if(checkbox.length>1){
                layer.alert('不能选择多项进行编辑！！',{icon : 0});
                return;
            }else if(checkbox.length<1||checkbox.length==null){
                layer.alert('请先选择编辑项！！',{icon : 0});
                return;
            }*/
            //
            if(item==null){
                layer.alert('请先选择编辑项！！',{icon : 0});
            }else if(item !=null){
                $("#new3").modal({backdrop: 'static', keyboard: false});
                /**
                 * 禅道BUG 156
                 * 修改人：陶勇超
                 * 2016年1月7日 15:41:46
                 */
                $scope.propertyType.propertyTypeId=undefined;
                //$http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+$scope.changeItem.propertyTypeId).success(function(data){
                $http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+item.propertyTypeId).success(function(data){
                    $scope.parentPropertyType1=data.PropertyType;
                }).error(function(data,status,headers,config){
                    layer.alert("查询出错,请重试！",{icon:2});
                });
            }
        };




        /**
         *Bug 840
         * 修改人：陈浪
         * 2016年3月3日
         **/
        //专业批量删除(列表)
        $scope.deleteData1=function(){
            var ids="";
            //获取所有被选中专业的复选框
            var checkbox=$('#propertyType input:checkbox:checked');
            for(var i=0;i<checkbox.length;i++){
                ids=ids+($(checkbox[i]).attr('id')+"split");
            }

            //if($scope.changeItem==null){
            //    layer.alert('请先选择删除项！！',{icon : 0});
            //}else if($scope.changeItem !=null){
            if(ids==''||ids==null){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else{
                layer.confirm("您确定要删除选中专业吗？如果该专业下有分类和资产也会一并删除！", {btn: ['是', '否']}, function () {
                    //$http.delete(url + '/PropertyType/DeletePropertyTypeById/'+$scope.changeItem.propertyTypeId).success(function () {
                    $http.delete(url + '/PropertyType/DeletePropertyTypeById/'+ids).success(function () {
                        layer.msg("删除成功", {icon: 1, time: 2000});
                        $scope.propertyType.propertyTypeId=undefined;
                        $scope.currentParentProperty._load();
                        $scope.show1 = false;
                        $('#allchose')[0].checked=false;
                    }).error(function () {
                        layer.msg("删除失败", {icon: 3, time: 2000});
                    });
                });
            }
            //}
        }

        //专业批量删除(网格)
        $scope.deleteDataForTable=function(item){
            /*var ids="";
            //获取所有被选中专业的复选框
            var checkbox=$('#propertyType input:checkbox:checked');
            for(var i=0;i<checkbox.length;i++){
                ids=ids+($(checkbox[i]).attr('id')+"split");
            }*/

            if(item==null){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else if(item !=null){
            layer.confirm("您确定要删除选中专业吗？如果该专业下有分类和资产也会一并删除！", {btn: ['是', '否']}, function () {
                //$http.delete(url + '/PropertyType/DeletePropertyTypeById/'+$scope.changeItem.propertyTypeId).success(function () {
                $http.delete(url + '/PropertyType/DeletePropertyTypeById/'+item.propertyTypeId).success(function () {
                    layer.msg("删除成功", {icon: 1, time: 2000});
                    $scope.propertyType.propertyTypeId=undefined;
                    $scope.currentParentProperty._load();
                    $scope.show1 = false;
                    $('#allchose')[0].checked=false;
                }).error(function () {
                    layer.msg("删除失败", {icon: 3, time: 2000});
                });
            })
            }
        }

        $scope.deletePropertyType= function (item) {
            if($scope.changeItem==null){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else if($scope.changeItem !=null){
                layer.confirm("您确定要删除选中专业吗？如果该专业下有分类和资产也会一并删除！", {btn: ['是', '否']}, function () {
                    //$http.delete(url + '/PropertyType/DeletePropertyTypeById/'+$scope.changeItem.propertyTypeId).success(function () {
                    $http.delete(url + '/PropertyType/DeletePropertyTypeById/'+item.propertyTypeId+"split").success(function () {
                        layer.msg("删除成功", {icon: 1, time: 2000});
                        $scope.propertyType.propertyTypeId=undefined;
                        $scope.currentParentProperty._load();
                        $scope.show1 = false;
                    }).error(function () {
                        layer.msg("删除失败", {icon: 3, time: 2000});
                    });
                })
            }
        }
        //编辑分类取消
        $scope.cancle1=function(){
            /*$http.get(url+'/PropertyType/selectByIds/'+$scope.currentBuilding.propertyTypeId).success(function(data) {
                $scope.currentPropertyType = data.PropertyType;
            }).error(function(data,status,headers,config){
                layer.alert("查询专业失败！",{icon : 2})
            });*/
            $("#new2").modal("hide");
            //$scope.d=false
        };


        $scope.updateMajor=function(item) {
            $scope.chooseData = {datas: []};
            $scope.chooseData.datas.push(item);
            $scope.showStatus=1;
            $scope.updateData1ForTable(item);
            $scope.showStatus=0;
        };



        //新增专业方法
        $scope.parentPropertyType={};
        $scope.addParentPropertyType=function(){
            $scope.parentPropertyType.companyId=companyId;
            if($scope.parentPropertyType.propertyTypeName==undefined||$scope.parentPropertyType.propertyTypeName==""||$scope.parentPropertyType.propertyTypeName==null){
                layer.alert("专业名称不能为空",{icon : 0});
                return;
            }else if($scope.parentPropertyType.propertyTypeName.length>=30){
                layer.alert("字数不能大于30",{icon : 0});
                return;
            }
            /**
             * 获取登录人信息
             * 禅道BUG 145
             * 修改人：陶勇超
             * 2016年1月6日 14:12:20
             */
            $scope.parentPropertyType.founder=userId;
            $scope.propertyType.propertyTypeId=undefined;
            $http.post(url + '/PropertyType/AddPropertyType',{PropertyType:$scope.parentPropertyType}).success(function(){
                layer.alert("添加成功",{icon : 1});
                /**
                 *
                 * 禅道BUG 173
                 * 修改人：陶勇超
                 * 2016年1月7日 14:12:20
                 */
                $("#new").modal("hide");
                $scope.load1();
                $scope.parentPropertyType={};
            }).error(function(data, status, headers, config){
                layer.alert("新建专业失败！",{icon : 2});
            });
        };

        //专业编辑
        /* 修改bug601
         修改人：陈彪
         时间：2016/2/19*/
        $scope.parentPropertyType1={};
        $scope.updatePropertyType1=function(){

            if($scope.parentPropertyType1.propertyTypeName==undefined||$scope.parentPropertyType1.propertyTypeName==""
                ||$scope.parentPropertyType1.propertyTypeName==null){
                layer.alert("专业名称不能为空",{icon : 0});
                return;
            } else if($scope.parentPropertyType1.propertyTypeName.length>=30){
                layer.alert("字数不能大于30",{icon : 0});
                return;
            }
            /**
             * 获取登录人信息
             * 禅道BUG 145
             * 修改人：陶勇超
             * 2016年1月6日 14:12:20
             */
            $scope.parentPropertyType1.modifier=userId
            $http.put(url+'/PropertyType/UpdatePropertyType',{PropertyType:$scope.parentPropertyType1}).success(function(){
                layer.msg("修改成功",{icon : 1,time : 2000});
                $scope.propertyType.propertyTypeId=undefined;
                $scope.load1();
                $scope.changeItem1.propertyTypeName=$scope.parentPropertyType1.propertyTypeName;
                $scope.checkShow($scope.changeItem1);
                $("#new3").modal("hide");
            }).error(function(data, status, headers, config){
                layer.msg("编辑失败",{icon : 2,time : 2000});
            });
        };

        //关闭新增专业方法，清空专业对象 王洲 2016.1.22
        $scope.closeAddType = function(){
            $scope.parentPropertyType={};
            $("#new").modal("hide");
        };

        $scope.load = function(){
            $http.get(url + '/PropertyType/listClassifyPropertyType').success(function(data) {
                $scope.classifyPropertyTypes = data.PropertyType;
            }).error(function(data,status,headers,config){
                layer.alert("查询分类失败！",{icon : 2});
            });
        };




        //分类编辑修改按钮(列表)
        $scope.updateData=function(){
            var checkbox=$('#propertyTypes input:checkbox:checked');
            if(checkbox.length>1){
                layer.alert('不能选择多项进行编辑！！',{icon : 0});
                return;
            }else if(checkbox.length<1||checkbox.length==null){
                layer.alert('请先选择编辑项！！',{icon : 0});
                return;
            }

            //if($scope.d==false){
            //    layer.alert('请先选择编辑项！！',{icon : 0});
            //}else if($scope.d==true){
                $("#new2").modal({backdrop: 'static', keyboard: false});
                /**
                 * 禅道BUG 156
                 * 修改人：陶勇超
                 * 2016年1月7日 15:41:46
                 */

                $http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+$(checkbox[0]).attr('id')).success(function(data){
                    $scope.parent=data.PropertyType;
                }).error(function(data,status,headers,config){
                    layer.alert("查询出错,请重试！",{icon:2});
                });
            //}
        };

        //分类编辑修改按钮(网格)
        $scope.updateDataForTable=function(item){
            //var checkbox=$('#propertyTypes input:checkbox:checked');
            //if(checkbox.length>1){
            //    layer.alert('不能选择多项进行编辑！！',{icon : 0});
            //    return;
            //}else if(checkbox.length<1||checkbox.length==null){
            //    layer.alert('请先选择编辑项！！',{icon : 0});
            //    return;
            //}

            if(item==null){
                layer.alert('请先选择编辑项！！',{icon : 0});
            }else if(item!=null){
                $("#new2").modal({backdrop: 'static', keyboard: false});
                /**
                 * 禅道BUG 156
                 * 修改人：陶勇超
                 * 2016年1月7日 15:41:46
                 */

                $http.get(url+'/PropertyType/getPropertyTypeByIdRest/'+item.propertyTypeId).success(function(data){
                    $scope.parent=data.PropertyType;
                }).error(function(data,status,headers,config){
                    layer.alert("查询出错,请重试！",{icon:2});
                });
            }
        };



        /**
         *Bug 840
         * 修改人：陈浪
         * 2016年3月3日
         **/
        //分类批量删除
        $scope.deleteData=function(){

            var ids="";
            var checkbox=$('#propertyTypes input:checkbox:checked');
            for(var i=0;i<checkbox.length;i++){
                ids=ids+($(checkbox[i]).attr('id')+"split");
            }

            if(checkbox.length==0){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else {
                layer.confirm("您确定要删除选中分类吗？如果该分类下有资产也会一并删除！", {btn: ['是', '否']}, function () {
                    //$http.delete(url + '/PropertyType/DeletePropertyTypeById/'+$scope.changeItem.propertyTypeId).success(function () {
                    $http.delete(url + '/PropertyType/DeletePropertyTypeById/'+ids).success(function () {
                        layer.msg("删除成功", {icon: 1, time: 2000});
                        $scope.load2();
                        $('#allchose1')[0].checked=false;
                    }).error(function () {
                        layer.msg("删除失败", {icon: 3, time: 2000});
                    });
                })
            }


            /*if($scope.d==false){
                layer.alert('请先选择删除项！！',{icon : 0});
            }else if($scope.d==true){
                layer.confirm("您确定要删除选中分类吗？如果该分类下有资产也会一并删除！", {btn: ['是', '否']}, function () {
                    $http.delete(url + '/PropertyType/DeletePropertyTypeById/'+$scope.person.propertyTypeId).success(function () {
                        layer.msg("删除成功", {icon: 1, time: 2000});
                        $scope.load2();
                    }).error(function () {
                        layer.msg("删除失败", {icon: 3, time: 2000});
                    });
                })
            }*/
        }

        //修改
        $scope.updateMajor1=function(item) {
            //$scope.d = true;
            $scope.chooseData = {datas: []};
            $scope.chooseData.datas.push(item);
            $scope.person=item;
            $scope.updateDataForTable(item);
        };

        //判断checkbx是否选中
        //$scope.d=false;
        $scope.getdata=function(item){
            if(item==null||item==''){
                return;
            }
            var propertyTypeId="";
            if(item.propertyTypeId==null){
                propertyTypeId=item;
            }else{
                propertyTypeId=item.propertyTypeId;
            }
            var tr= $('#'+propertyTypeId);
            if(tr.attr('style')==null||tr.attr('style')==''){
                tr.css('background','#f6f8fa');
                tr.children().children()[0].checked=true;
            }else{
                tr.attr('style','');
                tr.children().children()[0].checked=false;
            }

            if($("#propertyTypes input:not(:checked)").length==0){
                $('#allchose1')[0].checked=true;
            }else if($("#propertyTypes input:not(:checked)").length>0){
                $('#allchose1')[0].checked=false;
            }
        };

        $scope.allchose1= function () {
            if($("#propertyTypes input:not(:checked)").length==0){
                var checkbox=$('#propertyTypes input:checkbox');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.getdata(checkboxId[i]);
                }
            }else{
                var checkbox=$('#propertyTypes input:not(:checked)');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.getdata(checkboxId[i]);
                }
            }
        }
//默认展示第一个数据
        $scope.firstShow= function (index,item) {
            if(index==0){
                $scope.checkShow(item);
                setTimeout(function(){
                    $('#' + item.propertyTypeId).css('background','#f6f8fa').children().children()[0].checked=true;
                    $($('.title')[0]).parent().css('background','#A2A2A2');
                },100)
            }
        }

    }]);
});

function choose (This) {
    $('.title').parent().attr('style','');
    $(This).css('background','#A2A2A2')
}