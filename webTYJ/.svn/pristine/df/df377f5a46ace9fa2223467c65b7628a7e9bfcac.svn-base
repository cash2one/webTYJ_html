'use strict';
define(function (require) {
    var app = require('../../../../../app');

    app.controller('commonServicesCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        //配置属性
        var url = $rootScope.url;
        var _beginDate = 0;//控制修改启用时间判断
        var _productId = JSON.parse(localStorage.getItem("product_id"));
        if (_productId != "") {
            $http.post(url + '/ProductCommonservice/checkProduct/' + _productId).success(function (data) {
                $scope.ProductCommonservice = data;
                var formatDate = function (date) {
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    return y + '-' + m + '-' + d;
                };
                var date = formatDate(new Date());
                if (date >= $scope.ProductCommonservice.productBeginDate) {
                    document.getElementById("d4311").disabled = true;
                    _beginDate = 1;
                }
                document.getElementById("productTypes").disabled = true;
                //document.getElementById("productName").disabled = true;
            }).error(function (data) {
            });
        }
        //获取单位名称   BEGIN---------------------------------
        var projectId = null;
        $scope.ProductCommonservice = {};
        $http.get(url + '/Project/getProjectByState').success(function (data) {
            $scope.Project = data.Project;
            projectId = data.Project.projectId;

            //得到在属性配置中的属性
            $http.get(url + '/DataDictionarySlaveService/getDataDictionarySlaveRes/unit/' + projectId).success(function (data) {
                $scope.unit = data.DataDictionarySlave;
            });
        });
        //调取单位名称，END——————————————————————
        //提交普通服务数据 BEGIN————————————————————
        $scope.btnSubmit = function () {
            var project = sessionStorage.getItem("_project");
            $scope.project = JSON.parse(project);
            var projectId = $scope.project.projectId;
            if (angular.isUndefined($scope.ProductCommonservice)) {
                layer.alert('不能提交空产品', {icon: 0});
                return;
            } else {
                var pNam = app.get('valueCheck').isNull($scope.ProductCommonservice.commonserviceName);
                if (!pNam.state) {
                    layer.msg('产品名称' + pNam.info, {icon: 0, time: 1000});
                    return;
                }
                var pStp = app.get('valueCheck').isNull($scope.ProductCommonservice.productServicetype);
                if (!pStp.state) {
                    layer.msg('请选择服务类别', {icon: 0, time: 1000});
                    return;
                }
                var pUit = app.get('valueCheck').isNull($scope.ProductCommonservice.productUnit);
                if (!pUit.state) {
                    layer.msg('请选择单位', {icon: 0, time: 1000});
                    return;
                }
                var pPrc = app.get('valueCheck').isNull($scope.ProductCommonservice.productPrice);
                if (!pPrc.state) {
                    layer.msg('产品单价' + pPrc.info, {icon: 0, time: 1000});
                    return;
                }
                if (IsNum($scope.ProductCommonservice.productPrice)) {
                    return;
                }
                var pEffect = app.get('valueCheck').isNull($scope.ProductCommonservice.productBeginDate);
                if (!pEffect.state) {
                    layer.msg('请选择启用时间', {icon: 0, time: 1000});
                    return;
                }
                var bdate = $scope.ProductCommonservice.productBeginDate;
                var edate = $scope.ProductCommonservice.productEndDate;
                var nowdate = new Date();
                var strb = new Array();
                strb = bdate.split("-");
                var y = nowdate.getFullYear();//年份
                if (_beginDate != 1) {
                    if (strb[0] < y) {
                        layer.msg("生效日期必须大于或等于当前日期！", {icon: 0});
                        return;
                    }
                    var m = nowdate.getMonth() + 1;   //月份
                    if (strb[0] <= y && strb[1] < m) {
                        layer.msg("生效日期必须大于或等于当前日期！", {icon: 0});
                        return;
                    }
                    var d = nowdate.getDate();    //日
                    if (strb[0] <= y && strb[1] <= m && strb[2] < d) {
                        layer.msg("生效日期必须大于或等于当前日期！", {icon: 0});
                        return;
                    }
                }
                if (edate != "") {
                    if (bdate >= edate) {
                        layer.msg("失效日期必须大于生效日期！", {icon: 0});
                        return;
                    }
                }
                if (edate == '') {
                    $scope.ProductCommonservice.productEndDate = undefined;
                }

            }
            var x = "1";//修改或新增判断用
            $scope.ProductCommonservice.commonserviceId = projectId;
            $scope.ProductCommonservice.productCode = '';
            $http.post(url + "/ProductCommonservice/addProductCommon", {ProductCommonservice: $scope.ProductCommonservice}).success(function (data) {
                if (_productId != "") {
                    $scope.ProductCommonservice.commonserviceId = _productId;
                    $http.post(url + '/ProductCommonservice/updateProduct', {ProductCommonservice: $scope.ProductCommonservice}).success(function (data) {

                            layer.msg('更改成功！', {icon: 1, time: 2000});

                            $location.path("/index/accountManagement/productAndProperty/product");
                        }
                    ).error(function (data) {
                        alert('请重试！' + data.toString());
                    });
                    x = "2";
                }
                if (data.code == "1") {
                    layer.msg('新增成功！', {icon: 1, time: 1000});
                    $location.path("/index/accountManagement/productAndProperty/product");
                }
                if (x == "1") {
                    if (data.code == "0") {

                        layer.alert("名称重复!", {icon: 1, time: 1000});
                    }
                }
            }).error(function () {
                layer.alert("新增失败!", {icon: 1, time: 2000});
            });

        }
        //提交普通服务数据 END——————————————————————
        //取消新增
        $scope.btnCancle = function () {
            $location.path("/index/accountManagement/productAndProperty/product");
        };
        function IsNum(num) {
            var reNum = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
            if (num == 0) {
                layer.alert('单价不能为0！', {icon: 0});
                return true;
            } else {
                if (reNum.test(num)) {
                    return false;
                } else {
                    if (num < 0) {
                        layer.alert('单价不能为负数！', {icon: 0});
                        return true;
                    } else {
                        layer.alert('请输入有效单价！', {icon: 0});
                        return true;
                    }
                }
            }
        }
    }]);

});