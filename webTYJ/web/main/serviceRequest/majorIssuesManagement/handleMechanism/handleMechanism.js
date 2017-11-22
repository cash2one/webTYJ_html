/**
 * Created by NM on 2018/1/18.
 * 重大事项管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    });
    app.controller('handleMechanismsCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.doClick(2);
        $scope.importantEvent={page:{}};
        $scope.mylist=true;
        $scope.addmajortreatment=false;
        $scope.showAddTask=false;
        $scope.showTask=false;

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //下面是在table render完成后执行的js
            for(var i=0;i<$scope.searchPaginator.object.importantEventTypes.length;i++){
                $scope.x=$scope.searchPaginator.object.importantEventTypes[i];
                if(angular.isArray($scope.x.handleMechanismArr)){
                }else{
                    $scope.dataList = [];
                    $scope.dataList.push($scope.x.handleMechanismArr);
                    $scope.x.handleMechanismArr = $scope.dataList;
                }
            }
        });

        //得到登录人信息
        var user = {userId : ''};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        if($scope.user.userId == '' || angular.isUndefined($scope.user.userId)){
            layer.msg('无有效登录信息，请重新登录！',{icon : 0,time : 1000});
            $location.path('/login');
        };

        /*************重大事项处理机制分页显示******************/
            //查询所有的重大事项处理机制
        $scope.init=function(){
            var fetchFunction = function (page, callback) {
                $scope.importantEvent.page = page;
                $http.post(url + '/ImportantEventType/listPageImportantEventTypeRes',{ImportantEventType:$scope.importantEvent}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,18);
        };
        $scope.init();

        /*******重大事项处理机制分页显示************************/

        /*******新增重大事项及处理机制开始*************/
        /**
         * 新增重大事项类型按钮,初始化对象
         * 王洲
         * 2016.05.06
         */
        $scope.newmajortreatment=function(){
            $scope.mylist=false;
            $scope.addmajortreatment=true;
            $scope.showAddTask=false;
            $scope.showTask=false;
            $scope.newHandleMechanism={}; //新增处理机制
            $scope.newMajortreatment={         //新增重大事项及处理机制
                eventTypeName:'',
                createPersonId:'',
                handleMechanismArr:[]
            };
        };
        /**
         * 打开新增重大事项处理机制
         * 王洲
         * 2016.05.06
         */
        $scope.addItem=function(){
            if($scope.showAddTask){
                layer.msg('请先保存当前重大事项处理机制！',{icon : 0,time : 1000});
                return;
            }
            $scope.mylist=false;
            $scope.addmajortreatment=true;
            $scope.showAddTask=true;
            $scope.showTask=true;
        };

        /**
         * 保存重大事项处理机制，修改属性验证方式  王洲  2016.05.06
         */
        $scope.addSave = function(){
            $scope.newHandleMechanism.establishId = $scope.user.userId;
            var _handleType = app.get('valueCheck').isNull($scope.newHandleMechanism.handleType);
            if(!_handleType.state){
                layer.msg('处理机制类型' + _handleType.info, {icon : 0,time : 1000});
                return;
            }
            var _principal = app.get('valueCheck').isNull($scope.newHandleMechanism.principal);
            if(!_principal.state){
                layer.msg('处理机制负责人' + _principal.info, {icon : 0,time : 1000});
                return;
            }
            var _remarks = app.get('valueCheck').isNull($scope.newHandleMechanism.remarks);
            if(!_remarks.state){
                layer.msg('处理说明' + _remarks.info, {icon : 0,time : 1000});
                return;
            }
            $scope.newMajortreatment.handleMechanismArr.push({
                handleType:$scope.newHandleMechanism.handleType,
                principal: $scope.newHandleMechanism.principal,
                remarks: $scope.newHandleMechanism.remarks,
                staffName:$scope.newHandleMechanism.staffName,
                createPersonId:$scope.newHandleMechanism.createPersonId

            });
            $scope.mylist=false;
            $scope.addmajortreatment=true;
            $scope.showAddTask=false;
            $scope.showTask=true;
            $scope.newHandleMechanism={}; //新增处理机制
        };

        /**
         * 删除处理机制，增加判断 王洲 2016.05.06
         * @param index
         */
        $scope.deleteArea=function(index){
            if($scope.showAddTask){
                layer.msg('请先保存当前重大事项处理机制！',{icon : 0,time : 1000});
                return;
            }
            $scope.newMajortreatment.handleMechanismArr.splice(index,1);
        };
        /**
         * 取消新增任务
         */
        $scope.addCancel = function(){
            $scope.newHandleMechanism={}; //新增处理机制
            $scope.mylist=false;
            $scope.addmajortreatment=true;
            $scope.showAddTask=false;
            $scope.showTask=true;
        }
        // 添加重大事类型及重大事项机制
        $scope.newTasks=function(){
            $scope.newMajortreatment.createPersonId= $scope.user.userId;//创建人id
            var _addName = app.get('valueCheck').isNull($scope.newMajortreatment.eventTypeName);
            if(!_addName.state){
                layer.msg('重大事项类型名称' + _addName.info, {icon : 0,time : 1000});
                return;
            }
            if($scope.newMajortreatment.handleMechanismArr.length == 0){
                layer.msg('重大事项处理机制不能为空！', {icon : 0,time : 1000});
                return;
            }

            $http.post(url+'/ImportantEventType/insertImportantEventType',{ImportantEventType:$scope.newMajortreatment}).success(function(){
                layer.msg('新建成功！',{icon : 1, time : 1000});
                $scope.toBack();
            }).error(function(data, status, headers, config){
                layer.msg('新建失败！',{icon : 3, time : 1000});
            }) ;

        };

        //返回
        $scope.toBack=function(){
            $scope.newHandleMechanism={}; //新增处理机制
            $scope.newMajortreatment={         //新增重大事项及处理机制
                eventTypeName:'',
                handleMechanismArr:[]
            };
            $scope.mylist=true;
            $scope.addmajortreatment=false;
            $scope.showAddTask=false;
            $scope.showTask=false;
            $scope.init();
        }
        /*******新增重大事项及处理机制结束*************/

        /*******新增处理机制开始*************/
        var flag=0;
        $scope.checkValue=function(item){
            flag=0;
            if(item.handleType ==null){
                layer.alert('处理机制不能为空！',{icon : 0});
                flag=1;
                return;
            }else if(item.principal ==null ){
                layer.alert('负责人不能为空！',{icon : 0});
                flag=1;
                return;
            }
        };

        $scope.addHandles={importantEventTypeJournal:{},staff:{}};//新增机制
        var addOrUpdate=false;

        $scope.addOrUpdateHandle=function(items){
            console.log(items);
            if(items.handleId!=null){
                $scope.addHandles=items;
                $scope.addHandles.handleType = $scope.addHandles.handleType.toString();
                addOrUpdate=true;
            }else{
                addOrUpdate = false;
            }
            $('#new').modal({backdrop: 'static', keyboard: false});
            $scope.addHandles.eventTypeId=items.eventTypeId;
        };
        // 添加重大事项机制
        /**
         * 修改新增、修改方法，使用新的验证
         * 王洲
         * 2016.05.06
         */
        $scope.saveAll=function(){

            var _htype = app.get('valueCheck').isNull($scope.addHandles.handleType);
            if(!_htype.state){
                layer.msg('处理机制类型' + _htype.info, {icon : 0,time : 1000});
                return;
            }
            var _prin = app.get('valueCheck').isNull($scope.addHandles.principal);
            if(!_prin.state){
                layer.msg('负责人' + _prin.info, {icon : 0,time : 1000});
                return;
            }
            var _rem = app.get('valueCheck').isNull($scope.addHandles.remarks);
            if(!_rem.state){
                layer.msg('处理说明' + _rem.info, {icon : 0,time : 1000});
                return;
            }
            if(addOrUpdate==true){
                $http.put(url+'/HandleMechanism/updateHandleMechanism',{HandleMechanism: $scope.addHandles}).success(function(data){
                    layer.msg('编辑成功！',{icon : 1,time : 1000});
                    $('#new').modal('hide');
                    $scope.init();
                }).error(function(data,status,headers,config){
                    layer.msg('编辑失败，请重试！',{icon : 3,time : 1000});
                })

            }else{
                $scope.addHandles.createPersonId= $scope.user.userId;//创建人id
                if($scope.user.staff != null && angular.isDefined($scope.user.staff)){
                    $scope.remarks = $scope.user.staff.staffName + '创建了处理机制';
                }else{
                    $scope.remarks = '超级管理员创建了处理机制';
                }
                $scope.addHandles.importantEventTypeJournal.remarks=$scope.remarks;
                $http.post(url+'/HandleMechanism/insertHandleMechanism',{HandleMechanism:$scope.addHandles}).success(function()
                {
                    layer.msg('新增成功！',{icon : 1,time : 1000});
                    $scope.addHandles={};
                    $('#new').modal('hide');
                    $scope.init();

                }).error(function(data, status, headers, config){
                    layer.msg('新增失败，请重试！',{icon : 3,time : 1000});
                }) ;
            }

        };
        //取消新增机制
        $scope.cancleAll=function(){
            $scope.addHandles={};
        }
        /*******新增处理机制结束*************/

        /*****失效开始********/
        $scope.finish=function(data){
            $scope.handle1=data;
            $http.put(url+'/HandleMechanism/updateHandleState',{HandleMechanism: $scope.handle1}).success(function(data){
                layer.msg('失效成功',{icon : 1,time : 2000});
                $scope.init();
            }).error(function(data,status,headers,config){
                layer.msg('失效失败',{icon : 3,time : 2000});
            })
        };
        /*****失效结束********/
        /*****查看日志开始********/
        $scope.shows=function(data1){
            $("#datails").modal("show");
            $http.get(url + '/ImportantEventTypeJournal/getDataByReordId/' +data1.handleId).success(function(data){
                $scope.importantEventTypeJournal = data.ImportantEventTypeJournal;
            });
        };
        /*****查看日志结束********/
        /******查看有效的处理机制开始*******/
        $scope.id='';
        $scope.showHandleMechanism1=function(da){
            $scope.id=da.eventTypeId;
            $("#vaild").modal("show");
            $scope.loadData();
        };

        $scope.handleMechanisms={data:[]};
        $scope.loadData=function(){
            $http.get(url + '/HandleMechanism/getHandleMechanismbyEventTypeId/'+$scope.id).success(function(data){
                $scope.dataz=data.HandleMechanism;
                $scope.handleMechanisms={data:[]};
                for(var i=0;i<$scope.dataz.length;i++){
                    $scope.handleMechanisms.data.push($scope.dataz[i]);
                }
            }).error(function(data, status, headers, config) {
                alert("查询失败");
            });
        };
        /******查看有效的处理机制结束*******/
        /******查看无效的处理机制开始*******/
        $scope.showHandleMechanism2=function(da){
            $scope.id=da.eventTypeId;
            $("#novaild").modal("show");
            $scope.loadData();
        };
        /******查看无效的处理机制结束*******/

        $scope.Datil={
            /**任务类型**/
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


        /******人员********/
            //负责人信息
        $scope.Teamworkstaff = {page:{}};
        $scope.toPerson=function(){
            $("#newPerson").modal("show");
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
        $scope.person={};
        $scope.addPerson=function(){
            if($scope.mylist==true){
                if($scope.chooseData!=null){
                    $scope.addHandles.principal=$scope.chooseData.staffId;
                    $scope.addHandles.staff.staffName=$scope.chooseData.staff.staffName;
                }
            }else{
                if($scope.chooseData!=null){
                    $scope.newHandleMechanism.principal=$scope.chooseData.staffId;
                    $scope.newHandleMechanism.staffName=$scope.chooseData.staff.staffName;
                }
            }
        };
        //将负责人信息取消
        $scope.canclePerson=function(){
            $scope.chooseData={};
        };
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