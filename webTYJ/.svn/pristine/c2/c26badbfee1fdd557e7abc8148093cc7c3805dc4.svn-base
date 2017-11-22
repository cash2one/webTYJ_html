/**
 * Created by NM on 2018/1/18.
 * 巡检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('newServiceTasksCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //定义全局变量url,访问数据库接口路径
        var url = $rootScope.url;
        $scope.Tasks={};//新增任务对象

        $scope.id=sessionStorage.getItem("data1");

        //负责人信息
        $scope.Teamworkstaff = {page:{}};

        $scope.load = function(){
            var fetchFunction = function (page, callback) {
                $scope.Teamworkstaff.page = page;
                $http.post(url + '/Teamworkstaff/listPageTeamworkStaff',{Teamworkstaff:$scope.Teamworkstaff}).success(callback)

            };
            $scope.searchPaginator2 = app.get('Paginator').list(fetchFunction,5);
            console.log($scope.searchPaginator2);
        };
        $scope.load();

       /* //判断checkbx是否选中
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
         };*/

        $scope.personArray=[];
        var getChosedPets=function(){
            $scope.personArray = [];//清空
            var ids = document.getElementsByName("aaa");
            for ( var i = 0; i < ids.length; i++) {
                if (ids[i].checked ==true) {
                    $scope.personArray.push(ids[i].value);
                }
            }
        }

        $scope.accountRecord='';
        $scope.getdata = function(item){
            var checked = document.getElementById(item.id);
            if(checked.checked == true){
                checked.checked = false;
                checked.parentNode.parentNode.style.background = '';
                if($scope.personArray.length>0){
                    for(var i=0;i<$scope.personArray.length;i++){
                        if(item.id==$scope.personArray[i]){
                            $scope.personArray.splice(i,1) ;
                        }
                    }
                }
            }else {

                checked.checked = true;
                checked.parentNode.parentNode.style.background = '#f6f8fa';
                $scope.personArray = [];//清空
                $scope.personArray.push(item);
                $scope.accountRecord=item;

            }
        }
        // 负责人 只能选择一个

        $scope.addPerson = function() {
            getChosedPets();
            if ($scope.personArray.length > 1) {
                layer.msg('只能选择一位负责人', {icon: 0});
                return;
            } else if ($scope.personArray.length == 1) {
                    $scope.person= $scope.accountRecord;
                    $scope.person.staff = {};
                    $scope.person.staff.staffName= $scope.accountRecord.staffName;
                     $scope.person.staff.staffId= $scope.accountRecord.staffId;
            } else {
                layer.msg('请选择负责人！!', {icon: 0});
                return;
            }
        }


        //获取专业线
        $http.get(url + "/SpecialtyInfo/listAllSpecialtyInfoRestful").success(function(data){
            $scope.SpecialtyInfo = data.SpecialtyInfo;
            console.log($scope.SpecialtyInfo)
        }).error(function(data,status,headers,config){
            console.log ("获取信息失败,请稍后重试!");
        });

        $scope.Datil={
            /**任务类型**/
            /*园林0 维修1 护管2 部门质检3 装修巡检4 装修验收5 施工巡检6 施工核查7 施工验收8
             赔偿给业主9 向业主索赔10 清洁11 回访12 投诉13 验房 14 咨询15 抄水表16 抄电表17 装修核查18固定车位19巡检20*/
            taskType: [
                //{ id: '0',name:'园林' },
                //{ id: '1',name:'维修' },
                //{ id: '2',name:'护管' },
                //{ id: '4',name:'部门质检' },
                //{ id: '5',name:'装修巡检' },
                //{ id: '7',name:'装修验收' },
                //{ id: '8',name:'施工巡检' },
                //{ id: '9',name:'施工核查' },
                //{ id: '10',name:'施工验收' },
                //{ id: '9',name:'赔偿给业主' },
                //{ id: '11',name:'清洁' },
                //{ id: '10',name:'向业主索赔' },
                //{ id: '12',name:'回访'},
                //{ id: '13',name:'投诉'},
                { id: '20',name:'巡检'}
            ]
        };

        $scope.addTask=function(){
            $scope.Tasks.serverId=$scope.id;//关联服务请求id
            var tasks = app.get("valueCheck").isNull($scope.Tasks.taskType);
            if(tasks.state == false){
                layer.msg('请选择任务类型！',{icon : 0,time : 2000});
                return;
            }
            //负责人
            var staffName = app.get("valueCheck").isNull($scope.person.staff.staffName);
            if(staffName.state == false){
                layer.msg('请选择负责人！',{icon : 0,time : 2000});
                return;
            }
            //完成时间
            var estimatedTime = app.get("valueCheck").isNull($scope.Tasks.estimatedTime);
            if(estimatedTime.state == false){
                layer.msg('请选择完成时间！',{icon : 0,time : 2000});
                return;
            }
            //任务描述
            var taskDescription = app.get("valueCheck").isNull($scope.Tasks.taskDescription);
            if(taskDescription.state == false){
                layer.msg('请输入任务描述！',{icon : 0,time : 2000});
                return;
            }
            $scope.Tasks.principal = $scope.person.staff.staffId;

            $http.post(url+'/Tasks/insertTasksRes',{Tasks:$scope.Tasks}).success(function(){
                layer.msg('添加成功',{icon : 1,time : 2000});
                console.log($scope.Tasks);
                $location.path("/index/serviceRequest/patrolManagement/serviceTasks/isGoingTasks");

            }).error(function(data, status, headers, config){
                layer.msg('添加失败！',{icon : 2,time : 2000});

            }) ;
        };

    }]);
});


