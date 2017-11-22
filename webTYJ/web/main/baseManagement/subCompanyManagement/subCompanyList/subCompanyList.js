/**
 * Created by Fansensen on 2015/10/27.
 */
/*'use strict';
 define(['tyjApp','pageServices'],function(module){
 module.controller("subCompanyListController",function($scope,$http,Paginator,$cookieStore,$rootScope,$filter){*/
'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('subCompanyListCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        $scope.subCompany = {page: {}}

        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        /**
         * 获取当前登录人信息
         * 禅道BUG 165
         * 修改人:陶勇超
         * 2016年1月6日 10:17:16
         */

        var userId;
        var user = {};                                             //设置默认用户信息为空
        var companyId;
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook ? userCook : user;                      //三目运算获取用户信息
        userId = $scope.user.loginName;
        companyId = $scope.user.companyId;
        $scope.subCompanyToModify = {modifiedPersonId: userId};//要修改的子公司
        /**
         * 获取所有子公司信息
         */
        var load = function () {
            var parent = function (page, callback) {
                $scope.subCompany.page = page;
                $scope.subCompany.companyId = companyId
                $http.post(url + '/SubCompany/listPageAllSubCompanys', {SubCompany: $scope.subCompany}).success(callback);
            };
            $scope.currentSubCompany = app.get('Paginator').list(parent, 6);
            console.log($scope.currentSubCompany);
        }
        load();
        $scope.checkShow = function (item) {
            $scope.btnIndex = item;

            /**bug 725 叶圣强 2016/2/24*/
            var reslute = $scope.currentSubCompany.object.subCompanies.slice(1);
            for(var i = 0;i<reslute.length;i++)
            {
                if(item.subCompanyId == reslute[i].subCompanyId)
                {
                    document.getElementById(item.subCompanyId).checked = true;
                }else
                {
                    document.getElementById(reslute[i].subCompanyId).checked = false;
                }
            }
            /**bug 725 叶圣强 2016/2/24  end*/
        };

        //初始化网格
        $scope.grid = true;
        //网格
        $scope.showGrid = function(item){
            if(item == 1){
                $scope.grid = true;
            } else if(item == 2){
                $scope.grid = false;
            }
        }

        /**
         * BUG 95 陶勇超 2016年1月19日 16:13:11
         * 子公司详情
         */
        $scope.subcomList;
        $scope.subcomProjectList;
        $scope.checkShowList = function (item) {
            $('#SubCompanyList').modal({backdrop: 'static', keyboard: false});
            $scope.subcomList = item;
            $http.get(url + '/SubCompany/getAllProject/' + item.subCompanyId).success(function (data) {

                $scope.subcomProjectList = data.SubCompanyProjectRelation;

            }).error(function (data, status, headers, config) {
                layer.alert("查询子公司项目信息出错,请刷新页面！", {icon: 2});
            });
        };
        /**
         * 获取选中的子公司信息
         */

        $scope.getSubCompany = function (item) {
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 start */
            if (item == -1){
                var subCompanyId = document.getElementsByName("scId");
                //$scope.subCompanyShow=true;
                var count = 0;
                for (var i = 0; i < subCompanyId.length; i++) {
                    if (subCompanyId[i].checked == true) {
                        count++;
                        $scope.subCompanyId = subCompanyId[i].id;
                    }
                }
                //如果在网格界面
                if ($scope.grid == true) {
                    layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                    return;
                }
            } else {
                var count = 1;
                var subCompanyId = item;
                $scope.subCompanyId = subCompanyId;
            }
            /* 增加网格显示 朱琪 2016-2-2 16:40:30 end */

            if (count == 1) {
                $scope.addWaterCheck = null;
                $('#modifySubCompany').modal({backdrop: 'static', keyboard: false});

                $http.get(url + '/SubCompany/getAllProject/' + $scope.subCompanyId).success(function (data) {

                    $scope.subcomProjectList = data.SubCompanyProjectRelation;
                }).error(function (data, status, headers, config) {
                    layer.alert("查询子公司项目信息出错,请刷新页面！", {icon: 2});
                });

                /**
                 * 获取项目、区结构树
                 */
                $scope.getTree = function () {
                    $http.get(url + '/Project/getAllProjectWithRegion/' + companyId).success(function (data) {
                        $scope.zNodes = [{}];
                        var tasks = data.Project;
                        if (tasks != null) {
                            for (var i = 0; i < tasks.length; i++) {
                                $scope.zNode = {
                                    id: tasks[i].projectId,
                                    name: tasks[i].projectName,
                                    isParent: false,
                                    checked: tasks[i].checked,
                                    company: tasks[i].company
                                };

                                $scope.zNodes.push($scope.zNode);
                            }

                            $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);

                            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                            var nodes = zTree.getNodes();
                            nodes[0].name = "项目列表";
                            nodes[0].id = "-1";
                            //zTree.hideNode(nodes[0]);
                            zTree.updateNode(nodes[0]);
                        }
                    }).error(function (data, status, headers, config) {
                        layer.alert("获取项目及分区出错,请重试！", {icon: 2});
                    });
                }
                $scope.getTree();

                var zTreeOnCheck = function (event, treeId, treeNode) {

                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = treeObj.getCheckedNodes(true);
                    $scope.treeResult = {treeList: []};
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].isParent == false && nodes[i].parentTId != null) {
                            $scope.treeResult.treeList.push(nodes[i]);
                        }
                        if (nodes[i].check_Child_State == -1) {
                            $rootScope.addressIdT = nodes[i].id;
                        }
                    }
                    $scope.bslist = $scope.treeResult.treeList;

                };

                /**
                 * 显示选中的树状数据
                 */
                $scope.addWaterReading = function () {
                    if ($scope.treeResult == null || $scope.treeResult == undefined || $scope.treeResult == "") {
                        layer.alert('请选择项目！', {icon: 0});
                        return;
                    }
                    $scope.addWaterCheck = $scope.treeResult.treeList;
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var node;
                    for (var i = 0; i < $scope.addWaterCheck.length; i++) {
                        node = treeObj.getNodeByParam("id", $scope.addWaterCheck[i].id, null);
                        treeObj.removeNode(node);
                        var project = {
                            projectName: $scope.addWaterCheck[i].name,
                            company: $scope.addWaterCheck[i].company
                        };
                        var subcomProject = {projectId: $scope.addWaterCheck[i].id, project: project};
						//增加重复数据判断  王洲  2016.03.07
                        var count = 0;
                        for(var i = 0,temp = $scope.subcomProjectList.length; i < temp; i ++){
                            if(subcomProject.projectId == $scope.subcomProjectList[i].projectId){
                                count ++;
                            }
                        }
                        if(count == 0){
                            $scope.subcomProjectList.push(subcomProject);
                        }
                    }
                };
                var setting = {
                    check: {
                        enable: true
                    },
                    view: {
                        selectedMulti: false
                    },
                    edit: {
                        enable: false,
                        editNameSelectAll: false
                        //showRemoveBtn: showRemoveBtn,
                        //showRenameBtn: showRenameBtn
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onCheck: zTreeOnCheck
                    },
                    async: {
                        enable: false
                    }
                };


                /**
                 * 删除已选中的项目
                 */
                $scope.removeI = function (index, item) {
                    //增加验证，当子公司下只有一个项目时，不允许删除并给出提示  王洲  2016.02.25
                    if($scope.subcomProjectList.length == 1){
                        layer.msg('子公司下必须关联项目！',{icon : 0,time : 1000});
                        return;
                    }
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var node = {
                        id: item.projectId,
                        name: item.project.projectName,
                        isParent: false,
                        checked: false,
                        company: item.project.company
                    };
                    var parentNode = treeObj.getNodeByParam("id", "-1", null);
                    treeObj.addNodes(parentNode, node, true);
                    $scope.subcomProjectList.splice(index, 1);

                };
                //获取对应的子公司
                $http.get(url + '/SubCompany/getSubCompanyById/' + $scope.subCompanyId).success(function (data) {
                    $scope.subCompanyToModify = data.SubCompany;
                    $scope.subCompanyToModify.createTime = new Date($scope.subCompanyToModify.createTime);
                }).error(function (data, status, headers, config) {
                    layer.alert("查询子公司信息出错,请重试！", {icon: 2});
                });
            } else if (count > 1) {
                layer.alert("每次编辑只能选择一个子公司", {icon: 0});
                $scope.subCompanyShow = false;
                $('#close').trigger("click");
            } else {
                layer.msg('您未选择编辑项！', {icon: 0});
            }

        }

        /**
         * 更新编辑子公司信息
         * 禅道BUG 163 162
         * 修改人;taoyongchao
         * 2016年1月6日 09:39:48
         */
        /**
         * 查询所有子公司
         */
        $scope.compey;
        $http.get(url + '/SubCompany/getAllSubCompany').success(function (data) {
            $scope.compey = data.SubCompany
        }).error(function (data, status, headers, config) {
            layer.alert("获取所有子公司出错,请重试！", {icon: 2});
        });
        /**
         * 修改子公司
         */
        $scope.updateSubCompamy = function () {
            console.log($scope.subcomProjectList);
            console.log($scope.subCompanyToModify);
            $scope.subCompanyToModify.projectIds = [];
            $scope.subCompanyToModify.companyIds = [];
            //获取关联的项目id
            if ($scope.subCompanyToModify.subCompanyName != null && $scope.subCompanyToModify.subCompanyName != '') {
                for (var i = 0; i < $scope.subcomProjectList.length; i++) {
                    var project = $scope.subcomProjectList[i];
                    if (project != null && project.projectId != null) {
                        $scope.subCompanyToModify.projectIds.push(project.projectId);
                    }
                    if (project != null && project.project.company != null) {
                        $scope.subCompanyToModify.companyIds.push(project.project.company);
                    }
                }
            }

            $scope.subCompanyToModify.createTime = new Date($scope.subCompanyToModify.createTime);
            var year = $scope.subCompanyToModify.createTime.getFullYear();
            var month = $scope.subCompanyToModify.createTime.getMonth() + 1;//js从0开始取
            var date = $scope.subCompanyToModify.createTime.getDate();
            var hour = $scope.subCompanyToModify.createTime.getHours();
            var minutes = $scope.subCompanyToModify.createTime.getMinutes();
            var second = $scope.subCompanyToModify.createTime.getSeconds();

            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (second < 10) {
                second = "0" + second;
            }

            $scope.subCompanyToModify.createTime = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second;

            $scope.subCompanyToModify.modifiedPersonId = userId;
            console.log(userId);
            console.log($scope.subCompanyToModify);
            if ($scope.compey.length > 0) {
                for (var i = 0; i < $scope.compey.length; i++) {
                    if ($scope.subCompanyToModify.subCompanyId != $scope.compey[i].subCompanyId)
                        if ($scope.subCompanyToModify.subCompanyName == $scope.compey[i].subCompanyName) {
                            layer.alert('子公司名称已存在！', {icon: 0});
                            return;
                        }
                }
            }
            if ($scope.subCompanyToModify.subCompanyName == undefined || $scope.subCompanyToModify.subCompanyName == "" || $scope.subCompanyToModify.subCompanyName == null) {
                layer.alert('子公司名称不能为空！', {icon: 0});
                return;
            }
            $http.post(url + '/SubCompany/updateSubCompany', {SubCompany: $scope.subCompanyToModify}).success(function (data) {
                //$('input [type=checkbox]').removeAttr("onclick");
                layer.msg("编辑子公司信息成功！", {icon: 1, time: 2000});
                $('#modifySubCompany').modal("hide");
                $scope.subCompanyToModify.createTime = null;
                load();//刷新
            }).error(function (data, status, headers, config) {
                layer.alert("编辑子公司信息出错,请重试！", {icon: 2});

            });
        }

        /**
         * 删除子公司
         */
        $scope.delSubCompanyIds = [];
        $scope.deleteSubCompany = function (item) {
            /**
             * 禅道BUG  168
             * 修改人：陶勇超
             * 2016年1月6日 09:32:53
             * @type {Array}
             */
            $scope.delSubCompanyIds = [];

            /* 网格显示 朱琪 2016-2-2 16:37:50 start */
            if (item == -1){
                var subCompanyId = document.getElementsByName("scId");
                var count = 0;
                for (var i = 0; i < subCompanyId.length; i++) {

                    if (subCompanyId[i].checked == true) {
                        count++;
                        $scope.delSubCompanyIds.push(subCompanyId[i].id);
                    }
                }
                if ($scope.grid == true) {
                    layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                    return;
                }
            } else {
                var count = 1;
                var subCompanyId = item;
                $scope.delSubCompanyIds = subCompanyId;
            }
            /*  网格显示 朱琪 2016-2-2 16:37:50 end */

            if (count == 0) {
                layer.msg('您未选择删除项！', {icon: 0});

            } else {
                layer.confirm("您确定要删除该子公司吗？", {btn: ['是', '否']}, function () {
                    $scope.subCompanyToDel = {subCompanyIds: $scope.delSubCompanyIds}
                    $http.post(url + '/SubCompany/deleteSubCompany', {SubCompany: $scope.subCompanyToDel}).success(function (data) {
                        layer.msg("删除子公司成功！", {icon: 1, time: 2000});
                        load();//刷新
                    })
                })
            }
        }

        /**
         * 回车搜索
         * @param e
         */
        $(document).keyup(function(ev)
        {
            var e = event||ev;
            if(e.keyCode==13)
            {
                $scope.currentSubCompany._load();
            }
        });


    }]);
});