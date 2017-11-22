/**
 * Created by NM on 2018/1/18.
 * 重大事项管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('newTasksCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$rootScope.url;
        $scope.doClick(1);
        $scope.Tasks={};//新增任务对象
        $scope.id=sessionStorage.getItem("data1");//得到服务请求id
        //负责人模态框
        $scope.addPerson=function(){
            $('#newPerson').modal('show');
            //负责人信息
            $scope.Teamworkstaff = {page:{}};
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)
            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);

            //获取专业线
            $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
                $scope.SpecialtyInfo = data.SpecialtyInfo;
            }).error(function(data,status,headers,config){
                layer.alert('获取信息失败,请稍后重试',{icon : 0});
            });
        }


        //判断checkbx是否选中
        $scope.d=false;
        $scope.getdata=function(item){
            $scope.chooseData={};//得到选择的人员
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.chooseData=item;
                    $scope.d=true;
                    $scope.btnIndex=item.staffId;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };
        //保存负责人到页面
        $scope.savePerson=function(){
            if($scope.chooseData!=null){
                $scope.Tasks.principal= $scope.chooseData.staffId;
            }
        };
        //将负责人信息取消
        $scope.canclePerson=function(){
            $scope.chooseData={};
        };
        var flag=0;
        $scope.checkValue=function(item){
            flag=0;
            if(item.taskType ==null){
                layer.alert('任务类型不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.principal ==null ){
                layer.alert('负责人不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.taskDescription ==null){
                layer.alert('任务描述不能为空！',{icon : 0});
                flag=1;
                return;
            }
        };
        $scope.addTask=function(){
            $scope.Tasks.serverId=$scope.id;//关联服务请求id
            $scope.checkValue($scope.Tasks);
            if(flag!=0)
                return;
            $http.post(url+'/Tasks/insertTasksRes',{Tasks:$scope.Tasks}).success(function(){
                layer.msg('新建任务成功',{icon : 1,time : 2000});
                $location.path("/index/serviceRequest/majorIssuesManagement/majorIssuesTasks/isGoingTasks");

            }).error(function(data, status, headers, config){
                layer.msg('新建任务失败',{icon : 3,time : 2000});
            }) ;
        };

        $scope.cancleTask=function(){
            $scope.Tasks={};
        }

        $scope.Datil={
            /**任务类型**/
            /*园林0 维修1 护管2 部门质检3 装修巡检4 装修验收5 施工巡检6 施工核查7 施工验收8
             赔偿给业主9 向业主索赔10 清洁11 回访12 投诉13 验房 14 咨询15 抄水表16 抄电表17 装修核查18固定车位19巡检20*/
            taskType: [
                { id: '0',name:'园林' },
                { id: '1',name:'维修' },
                { id: '2',name:'护管' },
                //{ id: '4',name:'部门质检' },
                //{ id: '5',name:'装修巡检' },
                //{ id: '7',name:'装修验收' },
                //{ id: '8',name:'施工巡检' },
                //{ id: '9',name:'施工核查' },
                //{ id: '10',name:'施工验收' },
                { id: '9',name:'赔偿给业主' },
                { id: '11',name:'清洁' },
                { id: '10',name:'向业主索赔' },
                { id: '12',name:'回访'},
                { id: '13',name:'投诉'}
            ]
        };

    }]);
});