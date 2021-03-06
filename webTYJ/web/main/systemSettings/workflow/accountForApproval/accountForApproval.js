/**
 * Created by Zms on 2016/7/14.
 */
'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('accountForApprovalCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        var url = $rootScope.url;
        $scope.staff = {page: {}};
        $scope.staff2 = {page: {}};
        //$scope.chooseData = {datas: []};
        var postId = '119eb584-7d71-4352-a778-5222d6b6aea0';
        var identity = '1';
        var projectId=sessionStorage.getItem("_projectId");
        var subCompanyName = sessionStorage.getItem("_subCompanyName");
        var projectName = sessionStorage.getItem("_projectName");
        $scope.subCompanyName = subCompanyName;
        $scope.projectName = projectName;

        /*$scope.select = function () {

         }*/
        $scope.load = function () {
            var staffFunction = function (page, callback) {
                $scope.staff2 = {page: {}};
                $scope.staff2.page = page;
                switch (identity) {
                    case "1":
                        $scope.staff2.cashierStatus = '0';
                        break;
                    case "2":
                        $scope.staff2.cashierLeaderStatus = '0';
                        break;
                    case "3":
                        $scope.staff2.tellerStatus = '0';
                        break;
                    case "4":
                        $scope.staff2.accountantStatus = '0';
                        break;
                }
                $scope.staff2.postId = postId;
                $scope.staff2.projectId=projectId;
                $http.post(url + '/Admin/listPageFindUserByPost', {Staff: $scope.staff2}).success(callback);
            }
            $scope.searchPaginators = app.get('Paginator').list(staffFunction, 6);
            //$scope.select();

            var staffFunction2 = function (page, callback) {
                $scope.staff = {page: {}};
                $scope.staff.page = page;
                switch (identity) {
                    case "1":
                        $scope.staff.cashierStatus = '1';
                        break;
                    case "2":
                        $scope.staff.cashierLeaderStatus = '1';
                        break;
                    case "3":
                        $scope.staff.tellerStatus = '1';
                        break;
                    case "4":
                        $scope.staff.accountantStatus = '1';
                        break;
                }

                $scope.staff.postId = postId;
                $scope.staff.projectId = projectId;
                $http.post(url + '/Admin/listPageFindUserByPost', {Staff: $scope.staff}).success(callback);
            }
            $scope.searchPaginator = app.get('Paginator').list(staffFunction2, 4);
        }

        $scope.LUser = [];
        $scope.LUser2 = [];
        $scope.LUserId = [];
        /**
         * 单个选中功能
         * zhoumingsheng
         * @param temp
         */
        $scope.getdata = function (temp) {
            //点击行内任意地方勾选或取消勾选功能
            if (document.getElementById(temp.staffNo).checked) {
                document.getElementById(temp.staffNo).checked = false;
            } else {
                document.getElementById(temp.staffNo).checked = true;
            }

            var staffNo = document.getElementById(temp.staffNo).checked;
            if (staffNo) {
                $scope.LUser.push(temp);
            } else {
                $scope.LUser2 = [];
                for (var i = 0; i < $scope.LUser.length; i++) {
                    if ($scope.LUser[i].staffNo != temp.staffNo) {
                        $scope.LUser2.push($scope.LUser[i]);
                    }
                }
                $scope.LUser = $scope.LUser2;
            }
            $scope.LUserId = [];
            for (var i = 0; i < $scope.LUser.length; i++) {
                $scope.LUserId.push($scope.LUser[i].userId);
            }
        }

        //全选功能
        $scope.allchose = function (temp) {
            $scope.LUserId = [];
            if (document.getElementById("allchose").checked) {
                for (var i in temp) {
                    if (i > 0) {
                        document.getElementById(temp[i].staffNo).checked = true;
                        $scope.LUser.push(temp[i]);
                        $scope.LUserId.push(temp[i].userId);
                    }
                }
            } else {
                for (var i in temp) {
                    if (i > 0) {
                        document.getElementById(temp[i].staffNo).checked = false;
                        $scope.LUser = [];
                        $scope.LUserId = [];
                    }
                }
            }
        }

        /**
         * 删除当前岗位所有人的权限
         * 2016/7/25 zhoumingsheng
         * @param temp
         */
        $scope.deleteAll = function (temp) {
            if (temp.length > 0) {
                for (var i in temp) {
                    if (i > 0) {
                        $scope.delete(temp[i]);
                    }
                }
            } else {
                layer.msg('操作人员已清空！', {icon: 0, time: 2000});
            }
        }

        $scope.syy = function () {
            postId = '119eb584-7d71-4352-a778-5222d6b6aea0';
            $scope.initialization();
            identity = "1";
            $scope.load();
        }

        $scope.syzz = function () {
            postId = '1fc8844d-7e26-4c46-a7aa-7486f7a450af';
            $scope.initialization();
            identity = "2";
            $scope.load();
        }

        $scope.cn = function () {
            postId = '4d26d5c1-6c17-4754-aea9-a77603560a9d';
            $scope.initialization();
            identity = "3";
            $scope.load();
        }

        $scope.kj = function () {
            postId = 'f720af54-629b-4c15-8741-d2672afe86cc';
            $scope.initialization();
            identity = "4";
            $scope.load();
        }

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $(".btn-default").click(function () {
                $(".btn-default").css("background-color", "#fff");
                $(".btn-default").css("color", "#333");
                $(this).css("background-color", "#029ff0");
                $(this).css("color", "#fff");
            });
            $scope.load();
        });

        $scope.add = function () {
            if ($scope.LUser.length > 0) {
                $scope.newTUser = {};
                $scope.newTUser.listUserId = $scope.LUserId;
                switch (identity) {
                    case "1":
                        $scope.newTUser.cashierStatus = '1';
                        break;
                    case "2":
                        $scope.newTUser.cashierLeaderStatus = '1';
                        break;
                    case "3":
                        $scope.newTUser.tellerStatus = '1';
                        break;
                    case "4":
                        $scope.newTUser.accountantStatus = '1';
                        break;
                    default:
                        break;
                }
                $http.post(url + '/Admin/updateAccountForStatus', {TUser: $scope.newTUser}).success(function (data) {
                    $scope.load();
                    document.getElementById("allchose").checked = false;
                });
                $scope.LUser = [];
            } else {
                layer.msg('请勾选操作人员！', {icon: 0, time: 2000});
            }
        }


        $scope.delete = function (item) {
            $scope.newTUser = {};
            $scope.newTUser.listUserId = item.userId;
            switch (identity) {
                case "1":
                    $scope.newTUser.cashierStatus = '0';
                    break;
                case "2":
                    $scope.newTUser.cashierLeaderStatus = '0';
                    break;
                case "3":
                    $scope.newTUser.tellerStatus = '0';
                    break;
                case "4":
                    $scope.newTUser.accountantStatus = '0';
                    break;
                default:
                    break;
            }
            //document.getElementById(item).checked = false;
            $http.post(url + '/Admin/updateAccountForStatus', {TUser: $scope.newTUser}).success(function () {
                $scope.load();
            });
            $scope.LUser = [];
        }


        $scope.initialization = function () {
            $scope.LUser = [];
            $scope.LUser2 = [];
            $scope.LUserId = [];
            $scope.staff2.staffName='';
            $scope.staff2.staffNo='';
        }
    }]);
});