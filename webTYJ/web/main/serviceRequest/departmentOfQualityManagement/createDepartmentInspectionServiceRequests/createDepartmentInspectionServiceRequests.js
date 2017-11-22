/**
 * Created by NM on 2018/1/18.
 * 部门质检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('createDISRCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url= $rootScope.url;

        $scope.task={};
        $scope.ServiceRequest={requestSource:"前台"};
        $scope.ServiceRequest.frequencyRecord={};

        $scope.ServiceRequest.serviceObjectRecords=[{serviceObjectType:"1"}];
        //全选

        $scope.selectAll=function(name)
        {
            var el=document.getElementsByName("checkb");
            var s="";
            for (var i=0;i<el.length;i++) {
                if(el[i].type=="checkbox"&&el[i].name==name) {
                    el[i].checked=true;
                }
                if(el[i].checked) s+=el[i].value+',';  //如果选中，将value添加到变量s中
            }


            //那么现在来检测s的值就知道选中的复选框的值了
            //alert(s==''?'你还没有选择任何内容0000！':s);
        };
        //取消
        $scope.clearAll=function (name)
        {
            var el=document.getElementsByName("checkb");
            for (var i=0;i<el.length;i++)
            {
                if(el[i].type=="checkbox"&&el[i].name==name)
                {
                    el[i].checked=false;
                }
            }
        };


        /**
         * 添加行
         */
        $scope.itemRecord2=[{}];
        $scope.add=function(){
            var item1={};
            $scope.itemRecord2.push(item1)
        };

        //负责人信息
        $scope.Teamworkstaff = {page:{}};

        $scope.load1 = function(){
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);
            console.log($scope.searchPaginator2);
        };
        $scope.load1();

        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.accountRecord=item;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };

        $scope.addPerson=function(){
            $scope.person= $scope.accountRecord;
            console.log($scope.person)
        };


        $scope.load = function(){
            $http.get(url + "/Project/getStaffTree").success(function(data){
                console.log(data.OrgTree);
                $scope.zNodes = [];
                $scope.staffTree = data.OrgTree;
                var tasks = $scope.staffTree;
                if (tasks != null) {
                    for (var i = 0; i < tasks.length; i++) {
                        $scope.zNode = {id: tasks[i].id, pId: tasks[i].pId, name: tasks[i].name};
                        $scope.zNodes.push($scope.zNode);
                    }
                    $.fn.zTree.init($("#treeDemo"), setting, $scope.zNodes);

                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = zTree.getNodes();
                    nodes[0].name = "员工信息";
                    zTree.updateNode(nodes[0]);
                }
            }).error(function (data, status, headers, config){
                alert("信息查询失败！")
            });
        };
        $scope.load();

        var zTreeOnCheck=function(event, treeId, treeNode) {
            alert(treeNode.tId + ", " + treeNode.name);
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
            console.log($scope.treeResult.treeList);
        }

        //获取选择的接受检查的对象
        $scope.addStaffToCheck=function(){
            $scope.staffsToCheck = $scope.treeResult.treeList;
            console.log( $scope.staffsToCheck);
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
                editNameSelectAll: false,
                showRemoveBtn: showRemoveBtn,
                showRenameBtn: showRenameBtn
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




        function showRemoveBtn(treeId, treeNode) {
            return !treeNode.isFirstNode;
        }
        function showRenameBtn(treeId, treeNode) {
            return !treeNode.isLastNode;
        }



        $scope.change1=function(qualityCompanyType){
            $http.get(url + '/ScoreCriteria/getScoreCriteriabyType/'+qualityCompanyType).success(function(data) {
                $scope.ScoreCriteria = data.ScoreCriteria;
                console.log($scope.ScoreCriteria);
            }).error(function(data, status, headers, config) {
                //alert("人员信息获取失败");
            });
        };


//全选
        $scope.ServiceRequest.frequencyRecord.executionFrequency="";
        $scope.selectAll=function(name)
        {
            var el=document.getElementsByName("checkb");
            var s="";
            for (var i=0;i<el.length;i++) {
                if(el[i].type=="checkbox"&&el[i].name==name) {
                    el[i].checked=true;
                }
                if(el[i].checked) s+=el[i].value+',';  //如果选中，将value添加到变量s中
            }


            //那么现在来检测s的值就知道选中的复选框的值了
            alert(s==''?'你还没有选择任何内容0000！':s);
        };
        //function jqchk(){  //jquery获取复选框值
        //    var chk_value =[];
        //    $('input[name="test"]:checked').each(function(){
        //        chk_value.push($(this).val());
        //    });
        //    alert(chk_value.length==0 ?'你还没有选择任何内容！':chk_value);
        //}

        $scope.clearAll=function (name)
        {
            var el=document.getElementsByName("checkb");
            for (var i=0;i<el.length;i++)
            {
                if(el[i].type=="checkbox"&&el[i].name==name)
                {
                    el[i].checked=false;
                }
            }
        };
        $("#all").click(function(){
            if(this.checked){
                $("#list :checkbox").attr("checked", true);
            }else{
                $("#list :checkbox").attr("checked", false);
            }
        });

//新增部门质检服务请求
        $scope.submitDepartmentQuality=function(){

            //var chk_value =[];
            //$('input[name="test"]:checked').each(function(){
            //    chk_value.push($(this).val());
            //});
            //$scope.ServiceRequest.frequencyRecord.executionFrequency =JSON.stringify(chk_value);


            var   text = $("input:checkbox[name='checkb']:checked").map(function(index,elem) {
                return $(elem).val();
            }).get().join(',');
            alert("选中的checkbox的值为："+text);
            $scope.ServiceRequest.frequencyRecord.executionFrequency =text;





            //if(customerId!=null) {
            $http.post(url + '/ServiceRequest/insertDeptServiceRequest', {
                ServiceRequest: $scope.ServiceRequest
            }).success(function (data) {
                $location.path("/index/serviceRequest/departmentOfQualityManagement/allDepartmentsInspectionServiceRequests");
            }).error(function (data) {
                alert("服务器请求失败！");
            });
            //}
        };

        $scope.showTask=false;
        $scope.showTask1=true;
        $scope.showT=function(){
            $scope.showTask=true;
            $scope.showTask1=false;
        };
        $scope.demand={
            /**任务类型**/
            frequency:[
                { id: '0',name:'日检' },
                { id: '1',name:'周检' },
                { id: '2',name:'半月检' },
                { id: '3',name:'月检' }
            ],
            cycle:[
                { id: '0',name:'日检' },
                { id: '1',name:'周检' },
                { id: '2',name:'半月检' },
                { id: '3',name:'月检' }
            ],
            department:[
                { id: '4',name:'部门质检' }
            ],
            ScoreCriteria:[
                { id: '0',name:'园林' },
                { id: '1',name:'清洁' },
                { id: '3',name:'维修' },
                { id: '2',name:'安保' }
            ]

        };

    }]);
});