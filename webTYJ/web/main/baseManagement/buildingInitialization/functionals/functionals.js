/**
 * Created by NM on 2016/1/22.
 * 【建筑组件初始化】功能区间
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('functionalSCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        /****************************  参数设置开始  ***********************************/

        //设置后台路径
        var url = $rootScope.url;
        //分页查询functional
        $scope.Functional = {page:{}};
        //新增或修改functional
        $scope.functional = {};
        //查询时存放functionalId
        $scope.funcId = '';
        //修改functional时存放修改前的functional
        $scope.functionalOld = {};
        //修改functional时用于当参数
        $scope.functionalForCheck = {};
        //创建空登录对象用于判断
        var user = {};
        //获取登录之后的cookie对象
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
        //获取用户信息
        $scope.user = userCook?userCook:user;
        //设置打开模态框时判断显示的类型
        $scope.showType = '';
        $scope.doClick(2);
        //初始化列表
        $scope.grid =false;

        /****************************  参数设置结束  ***********************************/

        /****************************  载入方法开始  ***********************************/

        //分页显示功能区间信息
        var searchFunctional = function(page,callback){
            $scope.funcId = '';
            $scope.Functional.page = page;
            $http.post(url + '/Functional/listPageFunctional',{Functional : $scope.Functional}).success(callback);
        };
        $scope.currentFunctional = app.get('Paginator').list(searchFunctional, 6);

        /****************************  载入方法结束  ***********************************/

        /****************************  执行方法开始  ***********************************/

        //网格
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }


            //操作多选框，实现单选及传值
        $scope.checkItems = function(item){
            var id = item.functionalId;
            $scope.btnIndex = id;
            $scope.functionalOld = item;
            //var functionalIds = document.getElementsByName("functionalname");
            if(document.getElementById(id).checked == false){
                document.getElementById(id).checked = true;
            }
            if(document.getElementById(id).checked == true){
                if($scope.funcId != ''){
                    document.getElementById($scope.funcId).checked = false;
                }
                $scope.funcId = id;
            }else{
                $scope.funcId = '';
            }
        };
        $scope.checkShow = function(items){
            $scope.btnIndex = items.functionalId;
        };
        //打开新增或修改功能区间模态框
        $scope.openModals = function(ids,funcId){
            if(ids == 1){
                $scope.showType = '1';
                $scope.functional = {};
                $("#addFunctional").modal({backdrop: 'static', keyboard: false});
            }else if(ids == 2){
                if($scope.grid){
                    layer.msg('网格时从数据处进行操作！',{icon : 0,time : 1000});
                    return;
                }

                $scope.showType = '2';
                if($scope.funcId != ''){
                    $http.get(url + '/Functional/getFunctionalByIdRest/' + $scope.funcId).success(function(data){
                        $scope.functional = data.Functional;
                        $("#addFunctional").modal({backdrop: 'static', keyboard: false});
                    }).error(function(data){
                        layer.alert('没有符合的数据',{icon : 2});
                    });
                }else{
                    /*Bug510
                    修改人：陈浪
                    2016年2月19号*/
                    layer.alert('请先选择一条数据！',{icon : 0});
                }
            }else{
                //
                $scope.showType = '2';
                $scope.funcId = funcId;
                if($scope.funcId != ''){
                    $http.get(url + '/Functional/getFunctionalByIdRest/' + $scope.funcId).success(function(data){
                        $scope.functional = data.Functional;
                        $("#addFunctional").modal({backdrop: 'static', keyboard: false});
                    }).error(function(data){
                        layer.alert('没有符合的数据',{icon : 2});
                    });
                }
            }
        };

        //新增或修改功能区间
        $scope.insertOrupdateFunctional = function(){
            //判断编号及名称是否有值
            if($scope.functional.functionalName != null && $scope.functional.functionalName != ''){

                //有数据时给出提示，无数据时新增或修改

                //将创建人id放入functional，如果是修改，保持createId不变 王洲 2016.1.6
                if($scope.functional.createId != null){
                }else{
                    $scope.functional.createId = $scope.user.userId;
                }
                var names = $("#funcname").val();
                //获取编号、名称文本框的值并判断输入字符的长度  王洲  2016.1.8
    //            var no = $("#funcno").val();var names = $("#funcname").val();
   //             if(no.length > 20){
   //                 layer.msg('编号不能多于20个字符！',{icon : 0,time : 1000});
    //                return;
    //            }
                if(names.length > 30){
                    layer.msg('名称不能多于30个字符！',{icon : 0,time : 1000});
                    return;
                }
                if($scope.functional.functionalId != null){
                    //将修改人id放入functional，没有登录功能，先使用静态数据
                    $scope.functional.updateId = $scope.user.userId;

                    //当functional有修改时，查询新数据在数据库中是否已存在
                    //分为只修改了一个值以及两个值都有修改3种情况,根据不同情况赋不同个数的值
                    $scope.functionalForCheck = {};
                    if($scope.functional.functionalNo != $scope.functionalOld.functionalNo || $scope.functional.functionalName != $scope.functionalOld.functionalName){
                        if($scope.functional.functionalNo != $scope.functionalOld.functionalNo && $scope.functional.functionalName != $scope.functionalOld.functionalName){
                            $scope.functionalForCheck = $scope.functional;
                        }else if(
                            $scope.functional.functionalNo != $scope.functionalOld.functionalNo && $scope.functional.functionalName == $scope.functionalOld.functionalName
                        ){
                            $scope.functionalForCheck.functionalNo = $scope.functional.functionalNo;
                        }else{
                            $scope.functionalForCheck.functionalName = $scope.functional.functionalName;
                        }
                        console.log($scope.functionalForCheck);
                        $http.post(url + '/Functional/getCountByNoOrName', {Functional : $scope.functionalForCheck}).success(function(data){
                            console.log(data);
                            if(data > 0){
                                layer.alert('不能修改为已存在的数据，请检查输入',{icon : 0});
                            }else{
                                $http.put(url + '/Functional/UpdateFunctional', {Functional : $scope.functional}).success(function(data){
                                    /*Bug510
                                     修改人：陈浪
                                     2016年2月19号*/
                                    layer.msg('编辑成功！',{icon : 1, time : 2000});
                                    $("#addFunctional").modal("hide");
                                    $scope.currentFunctional._load();
                                }).error(function(data){
                                    layer.alert('修改失败，请重新操作！',{icon : 2});
                                });
                            }
                        }).error(function(data){
                            layer.alert('服务器出现异常，请稍后再试！',{icon : 2});
                        });
                    }else{
                        $http.put(url + '/Functional/UpdateFunctional', {Functional : $scope.functional}).success(function(data){
                            /*Bug510
                             修改人：陈浪
                             2016年2月19号*/
                            layer.msg('编辑成功！',{icon : 1, time : 2000});
                            $("#addFunctional").modal("hide");
                            $scope.currentFunctional._load();
                        }).error(function(data){
                            layer.alert('修改失败，请重新操作！',{icon : 2});
                        });
                    }
                }else{
                    $http.post(url + '/Functional/getCountByNoOrName', {Functional : $scope.functional}).success(function(data){
                        //有数据时给出提示，无数据时新增或修改
                        if(data > 0){
                            layer.alert('已有相关数据，请检查输入！',{icon : 0});
                        }else{
                            $http.post(url + '/Functional/AddFunctional', {Functional : $scope.functional}).success(function(data){
                                layer.msg('添加成功！',{icon : 1,time : 2000});
                                $("#addFunctional").modal("hide");
                                $scope.currentFunctional._load();
                            }).error(function(data){
                                layer.alert('添加失败，请重新操作！',{icon : 2});
                            });
                        }
                    }).error(function(data){
                        layer.alert('服务器出现异常，请稍后再试！',{icon : 0});
                    });

                }
            }else{
                layer.alert('名称不能为空！',{icon : 0});
            }

        };

        //关闭新增模态框
        $scope.closeModal = function(){
            $scope.showType = '';
            $("#addFunctional").modal("hide");
            $scope.functional = {};
        };

        /****************************  执行方法结束  ***********************************/
    }]);
});