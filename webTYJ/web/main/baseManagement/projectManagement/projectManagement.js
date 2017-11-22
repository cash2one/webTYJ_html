/**
 * Created by taoyongchao on 2015/10/26.
 * projectManagement
 */
/*define(['tyjApp','tyjUtil','pageServices'],function(module,tyjUtil){
 module.directive('setFocus', function(){
 return function(scope, element){
 element[0].focus();
 };
 });
 module.controller("projectManagementController",function($scope,$http,Paginator,$cookieStore,$rootScope){*/

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('projectManagementCtrl', ['$scope', '$http','$rootScope','$location',
        function ($scope,$http,$rootScope,$location) {

            var companyId ;
            var user = {employId : ''};                                             //设置默认用户信息为空
            var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
            $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
            companyId= $scope.user.companyId;
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.show6 = false;
            var url = $rootScope.url;   //url地址

            var saasurl = $rootScope.saasUrl;
            var payurl = $rootScope.payUrl;

            $scope.projectList={page:{}};
            $scope.addProject={};       //添加项目的基本信息
            $scope.prepare={};
            $scope.projectResult={
                project:{},
                prepares:[],
                parcels:[]
            };
            var inpMark = false;
            //初始化网格
            $scope.grid = false;
            /**
             * 网格与列表切换
             **/
            $scope.showGrid = function(item){
                if(item == 1){
                    $scope.grid = true;
                } else if(item == 2){
                    $scope.grid = false;
                }
            }

            /**
             * 显示新建方案
             */
            $scope.mark = true;
            $scope.detail = function(){
                if($scope.user.userId != null || angular.isDefined($scope.user.userId)){
                    if($scope.user.employId != ''){
                        layer.msg('此功能只有操作管理员可以操作！',{icon : 0,time : 1000});
                        return;
                    }
                    $scope.show1 = false;
                    $scope.show2 = true;
                    $scope.show3 = true;
                    $scope.show4 = false;
                    $scope.show6 = false;
                }
            };
            $scope.detail1 = function(){
                $scope.show1 = false;
                $scope.show2 = true;
                $scope.show3 = true;
                $scope.show4 = false;
                $scope.show6 = false;
                $scope.mark = true;
                $scope.btnIndex = null;
            };
            $scope.detail3 = function(){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = true;
                $scope.show4 = false;
                $scope.show6 = true;
                $scope.mark = true;
                $scope.btnIndex = null;
            };
            $scope.detail2 = function(index){
                $scope.show1 = false;
                $scope.show2 = true;
                $scope.show3 = false;
                $scope.show4 = true;
                $scope.show6 = false;
                $scope.mark = false;
                $scope.pars= $scope.parcelList[index]
                $scope.btnIndex=index;
            };
            $scope.detail4 = function(index){
                $scope.show1 = false;
                $scope.show2 = false;
                $scope.show3 = false;
                $scope.show4 = true;
                $scope.show6 = true;
                $scope.mark = false;
                $scope.pars= $scope.parcelList[index]
                $scope.btnIndex=index;
            };
            $scope.checkShow=function(item){
                $scope.btnIndex=item;
                $scope.projectCheck(item.projectId);
            };

            /**
             * bug 45修复  2016/3/8 by yeshengqiang 开始
             */
            $scope.showNum = 0;
            var num=0;
            var num1=0;
            $scope.titleChange = function(index)
            {
                if(index==1)
                {
                    if((num1==0)&&(num!=0))
                    {
                        $scope.showNum+=10;
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=true;
                        num1++;
                        num--;
                        if((num1!=0)&&(num==0))
                        {
                            $scope.maxTitleNum = true;
                            $scope.maxTitleNum1=false;
                        }
                    } else if((num!=0)&&(num1!=0))
                    {
                        $scope.showNum+=10;
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=true;
                        num1++;
                        num--;
                        if((num1!=0)&&(num==0))
                        {
                            $scope.maxTitleNum = true;
                            $scope.maxTitleNum1=false;
                        }
                    }
                    else
                    {
                        return;
                    }
                }
                if(index==0)
                {
                    if((num==0)&&(num1!=0))
                    {
                        $scope.showNum-=10;
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=true;
                        num++;
                        num1--;
                        if((num!=0)&&(num1==0))
                        {
                            $scope.maxTitleNum = false;
                            $scope.maxTitleNum1=true;
                        }
                    } else if((num!=0)&&(num1!=0))
                    {
                        $scope.showNum-=10;
                        $scope.maxTitleNum = true;
                        $scope.maxTitleNum1=true;
                        num++;
                        num1--;
                        if((num!=0)&&(num1==0))
                        {
                            $scope.maxTitleNum = false;
                            $scope.maxTitleNum1=true;
                        }
                    }else
                    {
                        return;
                    }
                }
            };

            /**
             * bug 45修复  2016/3/8 by yeshengqiang 结束
             */

            /**
             * 阻止默认事件 2016/3/2 by yeshengqiang
             */
                //$scope.inputCheck = function($event)
                //{
                //    $event.stopPropagation();
                //};


            $scope.load = function(){

                /**
                 * 查询所有的公司信息
                 */
                $scope.company = {};
                if(angular.isDefined($scope.user.companyId)){
                    if($scope.user.companyId != ''){
                        $http.get(url + '/Company/getCompanyInformation/' + $scope.user.companyId).success(function(data){
                            $scope.company = data.Company;
                            $scope.company.projectArea = data.Company.projectArea;
                            $scope.company.projectList = data.Company.projectList;
                            $scope.company.projectNum = data.Company.projectNum;
                            $scope.company.staffNum = data.Company.staffNum;
                        }).error(function(data){
                            layer.msg('没有有效的公司信息！',{icon : 0,time : 1000});
                        });
                    }
                }
                /**
                 * 查询所有记录
                 */
                var currentCheck = function(page,callback){
                    //var cont=0;
                    //var subCompanyId = document.getElementsByName("scId");
                    document.getElementById("allchose").checked = false;
                    inpMark = false;
                    abSave();
                    //for(var i=0;i<subCompanyId.length;i++)
                    //{
                    //    if(subCompanyId[i].checked == true)
                    //    {
                    //        cont++;
                    //    }
                    //}
                    //if(cont==subCompanyId.length)
                    //{
                    //    document.getElementById("allchose").checked = true;
                    //    inpMark = true;
                    //}
                    $scope.projectList.page = page;
                    $scope.projectList.company=companyId;
                    $http.post(url+'/Project/listPageProjectAll',{Project:$scope.projectList}).success(callback);
                };
                $scope.projectItem = app.get('Paginator').list(currentCheck,6);
                /**
                 * 查询专业线和岗位
                 */
                $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoAndPostOpen').success(function(data) {
                    for(var i=0;i<data.SpecialtyInfo.length;i++){
                        if(app.get('tyjUtil').isArray(data.SpecialtyInfo[i].posts)==false){
                            var obj=data.SpecialtyInfo[i].posts;
                            data.SpecialtyInfo[i].posts=[obj];
                        }
                    }
                    $scope.specialtyInfo=data.SpecialtyInfo;
                    for(var i = 0,specialtyInfolength = $scope.specialtyInfo.length; i < specialtyInfolength; i ++){
                        $scope.specialtyInfo[i].count = 0;
                        for(var j = 0; j < $scope.specialtyInfo[i].posts.length; j ++){
                            $scope.specialtyInfo[i].count++;
                        }
                    }
                }).error(function(data, status, headers, config){
                    layer.alert('查询专业线和岗位失败',{icon:2});
                });

                /**
                 * 查询项目经理信息
                 */
                $http.get(url + '/CorePosition/listCorePostbyState').success(function(data) {
                    $scope.corePosition = data.CorePosition;
                }).error(function(data, status, headers, config){
                    layer.alert('查询项目经理信息失败',{icon:2});
                });
                document.getElementById('allchose').checked = false;
                inpMark = false;
            };

            /**
             * 加载所有信息
             */
            $scope.load();

            /**
             * 获取选中的项目信息
             */
            $scope.projectUpdat;//编辑项目信息
            $scope.parper;//编辑编制信息
            $scope.parce;//宗地信息
           $scope.UpdatProjectName={};//获取点击编辑按钮是的项目名称
            $scope.getSubCompany=function(item){
                if($scope.user.userId == null || angular.isUndefined($scope.user.userId)){
                    layer.msg('请先登录！',{icon : 0,time : 1000});
                    return;
                }
                if($scope.user.employId != ''){
                    layer.msg('此功能只有操作管理员可以操作！',{icon : 0,time : 1000});
                    return;
                }
                /* 增加网格显示 朱琪 2016-2-3 11:53:44 start */
                if (item == -1){
                    if ($scope.grid == true){
                        layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                        return;
                    }
                    var subCompanyId = document.getElementsByName("scId");
                    var count = 0;
                    for(var i = 0 ; i < subCompanyId.length ; i ++){
                        if(subCompanyId[i].checked == true){
                            count++;
                            $scope.subCompanyId = subCompanyId[i].id;
                        }
                    }
                } else {
                    $scope.subCompanyId = item;
                    var count = 1;
                }
                /* 增加网格显示 朱琪 2016-2-3 11:53:50 end */

                if(count==1){
                    $scope.show6=true;
                    $scope.show1 = false;
                    $scope.show2 = false;
                    $scope.show3 = true;
                    $scope.show4 = false;
                    //获取项目信息
                    $http.get(url + '/Project/getProjectbyId/'+ $scope.subCompanyId).success(function(data) {
                        $scope.projectUpdat=data.Project;
                        //保存项目名称在session
                        sessionStorage.setItem('projectName',$scope.projectUpdat.projectName);
                        //获取宗地信息
                        $scope.UpdatProjectName=$scope.projectUpdat.projectName;//获取到的项目名称
                        var AreaNum = 0;
                        var mentArea = 0;
                        $http.get(url + '/Parcel/getParcelByprojectId/'+ $scope.subCompanyId).success(function(data) {
                            $scope.parce=data.Parcel;
                            $scope.parcelList=$scope.parce;
                            /**
                             * 2016/3/3 bug 791 修复  by yeshengqiang  开始
                             */
                            console.log($scope.parcelList.length);
                            if($scope.parcelList.length != 0)
                            {
                                for(var i=0;i<$scope.parcelList.length;i++)
                                {
                                    AreaNum += parseInt($scope.parcelList[i].civilAirDefenceArea);
                                    mentArea += parseInt($scope.parcelList[i].basementArea);
                                }
                                if(!$scope.projectUpdat)
                                {
                                    if(AreaNum != 0)
                                    {
                                        $scope.addProject.civilAirDefenceArea = AreaNum;
                                    }
                                    if(mentArea != 0)
                                    {
                                        $scope.addProject.basementArea = mentArea;
                                    }
                                }else
                                {
                                    if(AreaNum != 0)
                                    {
                                        $scope.projectUpdat.civilAirDefenceArea = AreaNum;
                                    }
                                    if(mentArea != 0)
                                    {
                                        $scope.projectUpdat.basementArea = mentArea;
                                    }
                                }
                            }

                            /**
                             * 2016/3/3 bug 791 修复  by yeshengqiang  结束
                             */

                        }).error(function(data, status, headers, config){
                            layer.alert('查询失败',{icon:2});
                        });
                    }).error(function(data, status, headers, config){
                        layer.alert('查询失败',{icon:2});
                    });

                    //获取编制信息
                    $http.get(url + '/Prepare/getPreparebyprojectId/'+ $scope.subCompanyId).success(function(data) {
                        $scope.parper=data.Prepare;

                        /*      console.log(  $scope.parper)*/
                        /*         for(var i=0;i<$scope.specialtyInfo.length;i++){

                         for(var j=0;j<$scope.specialtyInfo[i].posts.length;j++){
                         console.log($scope.specialtyInfo[i].posts[j].postId)
                         for(var g=0;g<$scope.parper.length;g++){
                         if($scope.specialtyInfo[i].posts[j].postId==$scope.parper[g].postId){
                         $scope.specialtyInfo[i].posts[j].postId=$scope.parper[g].postId
                         }else{

                         }
                         }
                         }
                         }*/
                        //console.log($scope.parper);
                        /**
                         *  添加编制 by yeshengqiang 2016/3/2 开始
                         */
                        for(var i=0;i<$scope.parper.length;i++)
                        {
                            $scope.inputData = {
                                postId: "",
                                nameOfCustom: "",
                                prepareNumber:"",
                                prepareId:""
                            };
                            $scope.inputData.postId = $scope.parper[i].postId;
                            $scope.inputData.prepareId = $scope.parper[i].prepareId;
                            $scope.inputData.nameOfCustom = $scope.parper[i].post.nameOfCustom;
                            $scope.inputData.prepareNumber = $scope.parper[i].prepareNumber;
                            //prepareNumber;
                            $scope.dataList.push($scope.inputData);
                        }
                        /**
                         *  添加编制 by yeshengqiang 2016/3/2 结束
                         */
                        //console.log($scope.dataList);
                    }).error(function(data, status, headers, config){
                        layer.alert('查询失败',{icon:2});
                    });
                }else if(count>1){
                    layer.alert("每次编辑只能选择一个项目",{icon:0});

                    //$scope.load();
                    $('#close').trigger("click");
                }else{
                    layer.msg('您未选择编辑项！',{icon : 0});
                }

            };
            /**
             * 添加编制 by yeshengqiang 2016/3/2  开始
             */
            $scope.showDeil = function()
            {
                $('#detail').modal('show');
                for(var i=0;i<$scope.specialtyInfo.length;i++)
                {
                    if($scope.specialtyInfo[i].posts.length != 0)
                    {
                        for(var j=0;j<$scope.specialtyInfo[i].posts.length;j++)
                        {
                            if($scope.specialtyInfo[i].posts[j] != undefined)
                            {
                                //document.getElementById($scope.specialtyInfo[i].posts[j].postId).checked = false;
                                //console.log($scope.specialtyInfo[i].posts[j].postId);
                                for(var f=0;f<$scope.parper.length;f++)
                                {
                                    if($scope.parper[f].postId == $scope.specialtyInfo[i].posts[j].postId)
                                    {
                                        for(var a = 0;a<$scope.dataList.length;a++)
                                        {
                                            //document.getElementById($scope.parper[f].postId).checked = false;
                                            if($scope.dataList[a].postId == $scope.parper[f].postId)
                                            {
                                                document.getElementById($scope.parper[f].postId).checked = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            /**
             * 添加编制 by yeshengqiang 2016/3/2  结束
             */

            /**
             * 编辑项目
             */
            $scope.updateProject=function(){
                $scope.prepares=[];
                var rowsLength = $('.tabes').size();
                for (var i = 0; i < rowsLength; i++) {
                    $scope.prepare={postId:'',prepareNumber:''};
                    var bsh = $('.tabes').eq(i).find('.tab').val();
                    var ids = $scope.dataList[i].postId;
                    $scope.prepare.postId=ids;
                    $scope.prepare.prepareNumber=bsh;
                    $scope.prepare.prepareId=$scope.dataList[i].prepareId;
                    $scope.prepares.push($scope.prepare);
                    $scope.projectResult.prepares = $scope.prepares;
                }
                $scope.projectUpdat.company=companyId;
                $scope.projectResult.parcels=$scope.parcelList;
                $scope.projectResult.project=$scope.projectUpdat;
                console.log($scope.projectResult.project);
                //判断是否项目名称重复

               if($scope.projectUpdat.projectName!=$scope.UpdatProjectName) {
                    if ($scope.pro.length > 0) {
                        for (var i = 0; i < $scope.pro.length; i++) {
                            if ($scope.projectUpdat.projectName == $scope.pro[i].projectName) {
                                layer.alert('项目名称已存在！', {icon: 0});
                                return;
                            }
                        }
                    }
                }

                /*      if($scope.addProject.company==undefined ||$scope.addProject.company=="" ||$scope.addProject.company == null){
                 layer.alert('所属公司不能为空！',{icon : 0});
                 return;
                 }else*/
                if($scope.projectUpdat.projectName==undefined ||$scope.projectUpdat.projectName.toString().replace(/\s+/g,"")=="" ||$scope.projectUpdat.projectName == null){
                    layer.alert('项目名称不能为空！',{icon : 0});
                    return;
                } else if($scope.projectUpdat.address==undefined ||$scope.projectUpdat.address.toString().replace(/\s+/g,"")=="" ||$scope.projectUpdat.address == null){
                    layer.alert('项目地址不能为空！',{icon : 0});
                    return;
                }

                /**
                 禅道BUG 019  294
                 修改人：陶勇超
                 2016年1月5日
                 **/
                else  if($scope.parcelList==undefined || $scope.parcelList=="" || $scope.parcelList== null){
                    layer.alert('宗地不能为空！',{icon : 0});
                    if($scope.parcel.parcelNum!=undefined  ||$scope.parcel.parcelNum!= null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    }else if($scope.parcel.parcelArea!=undefined ||$scope.parcel.parcelArea != null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    } else if($scope.parcel.floorArea!=undefined  ||$scope.parcel.floorArea != null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    }
                    else if($scope.parcel.roadArea!=undefined  ||$scope.parcel.roadArea != null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    }else if($scope.parcel.civilAirDefenceArea!=undefined  ||$scope.parcel.civilAirDefenceArea != null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    }else if($scope.parcel.greeningArea!=undefined ||$scope.parcel.greeningArea != null){
                        layer.alert('宗地未保存！',{icon : 0});
                        return;
                    }
                    else  if($scope.projectUpdat.staffId==undefined ||$scope.projectUpdat.staffId=="" ||$scope.projectUpdat.staffId== null){
                        layer.alert('项目经理不能为空！',{icon : 0});
                        return;
                    }
                }
                /**
                 禅道BUG 022
                 修改人：陶勇超
                 2016年1月5日
                 **/

                    //else  if($scope.projectUpdat.staffId==undefined ||$scope.projectUpdat.staffId=="" ||$scope.projectUpdat.staffId== null){
                    //    layer.alert('编制不能为空！',{icon : 0});
                    //    return;
                    //} else  if($scope.prepare.prepareNumber==undefined ||$scope.prepare.prepareNumber=="" ||$scope.prepare.prepareNumber== null){
                    //    layer.alert('编制人数不能为空！',{icon : 0});
                    //    return;
                    //}
                    //$scope.projectResult.project.projectId = app.get('tyjUtil').uuid();
                    $http.post(saasurl + "/updateProject?projectId="+$scope.projectResult.project.projectId+"&projectName=" + encodeURI($scope.projectResult.project.projectName)).success(function(data){
                        if(data.msg == "success"){
                            var projectInfo = {};
                            projectInfo.projectId = $scope.projectResult.project.projectId;
                            projectInfo.projectName = encodeURI($scope.projectResult.project.projectName);
                            projectInfo.company = companyId;
                            /*支付系统修改接口 zhuqi 2016.05.03*/
                            $http.post(payurl + "/updateProject?projectInfo="+JSON.stringify(projectInfo)).success(function(data1){
                              if(data1.msg == "1"){
                                    $http.put(url+'/Project/updateProjectNew',{ProjectResult:$scope.projectResult}).success(function(){
                                        layer.msg("修改成功",{icon:1,time:2000});
                                        $scope.show1 = true;
                                        $scope.show6 = false;
                                        $scope.load();
                                        /**
                                         禅道BUG 036  019
                                         修改人：陶勇超
                                         2016年1月5日
                                         **/
                                        $scope.addProject={};       //添加项目的基本信息
                                        $scope.prepare={};
                                        $scope.projectResult={};
                                        $scope.parcelList=[];
                                        $scope.dataList=[];
                                        $scope.parcel={};
                                        if(sessionStorage.getItem('dataList'))
                                        {
                                            sessionStorage.removeItem('dataList');

                                        }
                                        sessionStorage.removeItem('projectName');
                                    }).error(function(data, status, headers, config){
                                        layer.alert("添加失败",{icon:2});
                                    })
                                }else{
                                    layer.msg('提交失败，请联系管理员！',{icon : 0});
                                }
                           });
               }else{
                        layer.msg('提交失败，请联系管理员！',{icon : 0});
                    }
                });
            };
            /**
             * 删除项目
             */
            $scope.delSubCompanyIds=[];
            $scope.deleteSubCompany=function(item,state) {
                if($scope.user.userId == null || angular.isUndefined($scope.user.userId)){
                    layer.msg('请先登录！',{icon : 0,time : 1000});
                    return;
                }
                if($scope.user.employId != ''){
                    layer.msg('此功能只有操作管理员可以操作！',{icon : 0,time : 1000});
                    return;
                }

                /* 增加网格显示 朱琪 2016-2-3 11:53:44 start */
                if (item == -1){
                    if ($scope.grid == true){
                        layer.msg('网格时从数据处进行操作！', {icon: 0, time: 2000});
                        return;
                    }
                    $scope.delSubCompanyIds = [];
                    var subCompanyId = document.getElementsByName("scId");
                    var count = 0;
                    for (var i = 0; i < subCompanyId.length; i++) {

                        if (subCompanyId[i].checked == true) {
                            count++;
                            $scope.delSubCompanyIds.push(subCompanyId[i].id);
                        }
                    }
                } else {
                    $scope.delSubCompanyIds.push(item);
                    var count = 1;
                }
                /* 增加网格显示 朱琪 2016-2-3 11:53:50 end */
                if (count == 0) {
                    if(state==1)
                    {
                        layer.msg('您未选择停用项！', {icon: 0});
                    }else if(state==0)
                    {
                        layer.msg('您未选择启用项！', {icon: 0});
                    }
                } else if(count==1){
                    $http.get(url + '/Project/getProjectbyId/'+ $scope.delSubCompanyIds[0]).success(function(data1) {
                        if(data1.Project.state==state)
                        {
                            if(state==1)
                            {
                                layer.msg('该项目已停用，请选择未停用项目！', {icon: 1, time: 2000});
                                return;
                            }else if(state==0)
                            {
                                layer.msg('该项目已启用，请选择未启用项目！', {icon: 1, time: 2000});
                                return;
                            }
                        }
                        if(state==1)
                        {
                            $scope.chouseName='停用';
                        }else if(state==0)
                        {
                            $scope.chouseName='启用';
                        }
                        layer.confirm("您确定要"+ $scope.chouseName+"该项目吗？", {btn: ['是', '否']}, function () {
                            $scope.subCompanyToDel = {subProjectIds: $scope.delSubCompanyIds,state:state}
                            $http.post(url + '/Project/deleteSubProject', {Project: $scope.subCompanyToDel}).success(function (data) {
                                layer.msg($scope.chouseName+"项目成功！", {icon: 1, time: 2000});
                                $scope.load();//刷新
                            })
                        });
                    });
                }else
                {
                    if(state==1)
                    {
                        $scope.chouseName='停用';
                    }else if(state==0)
                    {
                        $scope.chouseName='启用';
                    }
                    layer.confirm("您确定要"+ $scope.chouseName+"该项目吗？", {btn: ['是', '否']}, function () {
                        $scope.subCompanyToDel = {subProjectIds: $scope.delSubCompanyIds,state:state}
                        $http.post(url + '/Project/deleteSubProject', {Project: $scope.subCompanyToDel}).success(function (data) {
                            layer.msg($scope.chouseName+"项目成功！", {icon: 1, time: 2000});
                            $scope.load();//刷新
                        })
                    });
                }
            }

            /**
             * 加载所有信息
             */

            /**
             *  搜索框enter 键跳转到其他页面（加了个事件enter 搜索） by yeshengqiang 2016/3/3  开始
             */
            $scope.clickSearch = function(ev)
            {
                var ev = ev||event;
                //var cont=0;
                //var subCompanyId = document.getElementsByName("scId");
                if(ev.keyCode == 13)
                {
                    document.getElementById("allchose").checked = false;
                    inpMark = false;
                    abSave();
                    $scope.projectItem._load();
                    //for(var i=0;i<subCompanyId.length;i++)
                    //{
                    //    if(subCompanyId[i].checked == true)
                    //    {
                    //        cont++;
                    //    }
                    //}
                    //if(cont==subCompanyId.length)
                    //{
                    //    document.getElementById("allchose").checked = true;
                    //    inpMark = true;
                    //}
                }
            };

            /**
             *  搜索框enter 键跳转到其他页面（加了个事件enter 搜索） by yeshengqiang 2016/3/3  结束
             */

            /**
             * 宗地信息
             */
            $scope.parcelList=[

            ];
            $scope.parcel={
                parcelId:'',
                projectId:'',
                parcelNum:'',
                stallMatching:'',
                parcelArea:'',
                civilAirDefenceArea:'',
                floorArea:'',
                buildArea:'',
                roadArea:'',
                greeningArea:'',
                groundParkingSpace:'',
                undergroundParkingSpace:'',
                plotRatio:'',
                basementArea:''
            };
            $scope.save=function(){
                if($scope.parcel.parcelNum==undefined ||$scope.parcel.parcelNum.replace(/\s+/g,"")=="" ||$scope.parcel.parcelNum == null){
                    layer.alert('宗地号不能为空！',{icon : 0});
                    return;
                }
                else if($scope.parcel.parcelArea==undefined ||$scope.parcel.parcelArea.replace(/\s+/g,"")=="" ||$scope.parcel.parcelArea == null){
                    layer.alert('宗地面积不能为空！',{icon : 0});
                    return;
                }

                //else  if($scope.parcel.civilAirDefenceArea==undefined ||$scope.parcel.civilAirDefenceArea.replace(/\s+/g,"")=="" ||$scope.parcel.civilAirDefenceArea == null){
                //    layer.alert('人防面积不能为空！',{icon : 0});
                //    return;
                //}else    if($scope.parcel.roadArea==undefined ||$scope.parcel.roadArea.replace(/\s+/g,"")=="" ||$scope.parcel.roadArea == null){
                //    layer.alert('道路面积不能为空！',{icon : 0});
                //    return;
                //}else if($scope.parcel.greeningArea==undefined ||$scope.parcel.greeningArea.replace(/\s+/g,"")=="" ||$scope.parcel.greeningArea == null){
                //    layer.alert('绿化面积不能为空！',{icon : 0});
                //    return;
                //}

                /**
                 * bug 791 修复 by yeshengqiang 2016/3/3  开始
                 */
                $scope.parcelList.push($scope.parcel);
                if($scope.parcelList.length != 0)
                {
                    if($scope.parcelList[$scope.parcelList.length-1].civilAirDefenceArea == '' || $scope.parcelList[$scope.parcelList.length-1].civilAirDefenceArea == null)
                    {
                        mentArea = 0;
                        if(!$scope.projectUpdat)
                        {
                            if($scope.addProject.civilAirDefenceArea == '' ||$scope.addProject.civilAirDefenceArea == null)
                            {
                                mentArea = '';
                            }
                        }else
                        {
                            if($scope.projectUpdat.civilAirDefenceArea == '' ||$scope.projectUpdat.civilAirDefenceArea == null)
                            {
                                mentArea = '';
                            }
                        }
                    }else
                    {
                        var AreaNum = parseInt($scope.parcelList[$scope.parcelList.length-1].civilAirDefenceArea);
                    }
                    if($scope.parcelList[$scope.parcelList.length-1].basementArea == '' || $scope.parcelList[$scope.parcelList.length-1].basementArea == null)
                    {
                        mentArea = 0;
                        if(!$scope.projectUpdat)
                        {
                            if($scope.addProject.basementArea == '' ||$scope.addProject.basementArea == null)
                            {
                                mentArea = '';
                            }
                        }
                        else
                        {
                            if($scope.projectUpdat.basementArea == '' ||$scope.projectUpdat.basementArea == null)
                            {
                                mentArea = '';
                            }
                        }
                    }else
                    {
                        var mentArea = parseInt($scope.parcelList[$scope.parcelList.length-1].basementArea);
                    }
                    if(!$scope.projectUpdat)
                    {
                        if($scope.addProject.civilAirDefenceArea !=undefined)
                        {
                            $scope.addProject.civilAirDefenceArea = AreaNum + parseInt($scope.addProject.civilAirDefenceArea);
                        }else
                        {
                            $scope.addProject.civilAirDefenceArea = AreaNum;
                        }
                        if($scope.addProject.basementArea !=undefined)
                        {
                            if($scope.addProject.basementArea == '')
                            {
                                $scope.addProject.basementArea = mentArea;
                            }else
                            {
                                $scope.addProject.basementArea = mentArea + parseInt($scope.addProject.basementArea);
                            }
                        }else
                        {
                            $scope.addProject.basementArea = mentArea;
                        }
                    }else
                    {
                        if($scope.projectUpdat.civilAirDefenceArea !=undefined)
                        {
                            $scope.projectUpdat.civilAirDefenceArea = AreaNum + parseInt($scope.projectUpdat.civilAirDefenceArea);
                        }else
                        {
                            $scope.projectUpdat.civilAirDefenceArea = AreaNum;
                        }
                        if($scope.projectUpdat.basementArea !=undefined)
                        {
                            if($scope.projectUpdat.basementArea == '')
                            {
                                $scope.projectUpdat.basementArea = mentArea;
                            }else
                            {
                                $scope.projectUpdat.basementArea = mentArea + parseInt($scope.projectUpdat.basementArea);
                            }
                        }else
                        {
                            $scope.projectUpdat.basementArea = mentArea;
                        }
                    }
                }
                if($scope.parcelList.length == 0)
                {
                    if($scope.parcel.basementArea == '' || $scope.parcel.basementArea == null)
                    {
                        $scope.projectUpdat.basementArea = $scope.projectUpdat.basementArea;
                    }
                }
                /**
                 * bug 791 修复 by yeshengqiang 2016/3/3  结束
                 */
                /*      var fla=0; var pal=0;
                 var stm=0; var roa=0;
                 var udg=0;
                 var gps=0;
                 var  tbd=0; var cad=0; var bsa=0; var cia=0; var gra=0;
                 for(var g=0;g<  $scope.parcelList.length;g++){
                 //    console.log($scope.parcelList[g]);
                 pal+=parseFloat($scope.parcelList[g].parcelArea);
                 fla+=parseFloat($scope.parcelList[g].floorArea);
                 stm+=parseFloat($scope.parcelList[g].stallMatching);
                 udg+=parseFloat($scope.parcelList[g].undergroundParkingSpace);
                 gps+=parseFloat($scope.parcelList[g].groundParkingSpace);
                 tbd+=parseFloat($scope.parcelList[g].buildArea);
                 cad+= parseFloat($scope.parcelList[g].civilAirDefenceArea);
                 bsa+= parseFloat($scope.parcelList[g].basementArea);
                 cia+= parseFloat($scope.parcelList[g].plotRatio);
                 gra=parseFloat($scope.parcelList[g].greeningArea)/pal;
                 roa+= parseFloat($scope.parcelList[g].roadArea);
                 $scope.addProject.projectTotalarea= fla;
                 $scope.addProject.stallMatching= stm;
                 $scope.addProject.undergroundParkingspacestotal= udg;
                 $scope.addProject.groundParkingspacetotal=gps;
                 $scope.addProject.totalBuildarea= tbd;
                 $scope.addProject.civilAirDefenceArea= cad;
                 $scope.addProject.basementArea= bsa;
                 $scope.addProject.capacitanceArea= cia;
                 $scope.addProject.greeningRate= cia;
                 }*/
                $scope.parcel={};
                document.getElementById('ceshi').focus();
                document.getElementById('ceshi1').focus();
                /**
                 * bug 45修复  2016/3/8 by yeshengqiang 开始
                 */
                if($scope.parcelList.length%10==0)
                {
                    $scope.showNum+=10;
                    $scope.maxTitleNum1=false;
                    $scope.maxTitleNum=true;
                    num=0;
                    num1++;
                }
                /**
                 * bug 45修复  2016/3/8 by yeshengqiang 结束
                 */
            };

            /**
             * 查询所有项目
             */

            $scope.pro;
            $http.get(url + '/Project/listAllProject'+'/'+companyId).success(function(data) {
                $scope.pro = data.Project;
                //   console.log(data)
            }).error(function(data, status, headers, config){
                layer.alert('查询项目信息失败',{icon:2});
            });

            /**
             * 添加项目
             */
            $scope.insert=function(){

                //得到输入框的值 BUG 258 2016年1月21日 17:03:02
                $scope.prepares=[];
                var rowsLength = $('.tabe').size();
                for (var i = 0; i < rowsLength; i++) {
                    $scope.prepare={postId:'',prepareNumber:''};
                    var bsh = $('.tabe').eq(i).find('.tab').val();
                    var ids=$scope.dataList[i].postId;
                    $scope.prepare.postId=ids;
                    $scope.prepare.prepareNumber=bsh;
                    $scope.prepares.push($scope.prepare);
                    $scope.projectResult.prepares = $scope.prepares;
                }
                $scope.addProject.company=companyId;
                $scope.projectResult.parcels=$scope.parcelList;
                $scope.projectResult.project=$scope.addProject;
                /**
                 * BUG 266  271陶勇超 2016年1月13日 15:52:13
                 */

                if($scope.pro.length>0){
                    for(var i=0;i<$scope.pro.length;i++){
                        if($scope.addProject.projectName==$scope.pro[i].projectName){
                            layer.alert('项目名称已存在！',{icon : 0});
                            return;
                        }
                    }
                }
                /*      if($scope.addProject.company==undefined ||$scope.addProject.company=="" ||$scope.addProject.company == null){
                 layer.alert('所属公司不能为空！',{icon : 0});
                 return;
                 }else*/
                if($scope.addProject.projectName==undefined ||$scope.addProject.projectName.replace(/\s+/g,"")=="" ||$scope.addProject.projectName == null){
                    layer.alert('项目名称不能为空！',{icon : 0});
                    return;
                } else if($scope.addProject.address==undefined ||$scope.addProject.address.replace(/\s+/g,"")=="" ||$scope.addProject.address == null){
                    layer.alert('项目地址不能为空！',{icon : 0});
                    return;
                }/**
                 禅道BUG 019  294
                 修改人：陶勇超
                 2016年1月5日
                 **/
                else  if($scope.parcelList==undefined || $scope.parcelList=="" || $scope.parcelList== null){
                    layer.alert('宗地不能为空！',{icon : 0});
                    return;
                } else  if($scope.parcel.parcelNum!=undefined  ||$scope.parcel.parcelNum!= null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                }else if($scope.parcel.parcelArea!=undefined ||$scope.parcel.parcelArea != null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                } else if($scope.parcel.floorArea!=undefined  ||$scope.parcel.floorArea != null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                }
                else if($scope.parcel.roadArea!=undefined  ||$scope.parcel.roadArea != null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                }else if($scope.parcel.civilAirDefenceArea!=undefined  ||$scope.parcel.civilAirDefenceArea != null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                }else if($scope.parcel.greeningArea!=undefined ||$scope.parcel.greeningArea != null){
                    layer.alert('宗地未保存！',{icon : 0});
                    return;
                }else  if($scope.addProject.staffId==undefined ||$scope.addProject.staffId=="" ||$scope.addProject.staffId== null){
                    layer.alert('项目经理不能为空！',{icon : 0});
                    return;
                }/**
                 禅道BUG 022
                 修改人：陶勇超
                 2016年1月5日
                 **/
                else  if($scope.prepares==undefined ||$scope.prepares=="" ||$scope.prepares== null){
                    layer.alert('编制不能为空！',{icon : 0});
                    return;
                } else  if($scope.prepare.prepareNumber==undefined ||$scope.prepare.prepareNumber=="" ||$scope.prepare.prepareNumber== null) {
                    layer.alert('编制人数不能为空！', {icon: 0});
                    return;
                }
                $scope.specialtyInfoProject = {};
                $scope.projectResult.project.projectId = app.get('tyjUtil').uuid();
                var projectIdTemp = $scope.projectResult.project.projectId;
                $http.post(saasurl + "/addProject?companyId="+$scope.user.companyId+"&projectId="+$scope.projectResult.project.projectId+"&projectName=" + encodeURI($scope.projectResult.project.projectName)).success(function(data){
                    if(data.msg == "success"){
                        var projectInfo = {};
                        projectInfo.projectId = $scope.projectResult.project.projectId;
                        projectInfo.projectName = encodeURI($scope.projectResult.project.projectName);
                        projectInfo.company = companyId;
                        $http.post(payurl + "/addProject?projectInfo="+JSON.stringify(projectInfo)).success(function(data1) {
                            if (data1.msg == "1") {
                               $http.post(url+'/Project/ProjectInitialization',{ProjectResult:$scope.projectResult}).success(function(){
                                    layer.msg("添加成功",{icon:1,time:2000});
                                    $scope.show1 = true;
                                    $scope.show2 = false;
                                    $scope.load();
                                    /**
                                     禅道BUG 036  019
                                     修改人：陶勇超
                                     2016年1月5日
                                     **/
                                    $scope.addProject={};       //添加项目的基本信息
                                    $scope.prepare={};
                                    $scope.projectResult={};
                                    $scope.parcelList=[];
                                    $scope.dataList=[];
                                    $scope.parcel={};
                                    if(sessionStorage.getItem('dataList'))
                                    {
                                        sessionStorage.removeItem('dataList');
                                    }
                                   $scope.specialtyInfo = [];
                                   $http.get(url+'/SpecialtyInfo/listAllSpecialtyInfoAndPostRestful').success(function (data) {
                                       //layer.msg('查找成功！',{icon:1,time:2000});
                                       $scope.specialtyInfo = data.SpecialtyInfo;
                                       console.log('专业线查询的信息为:'+$scope.specialtyInfo);
                                       for(var i=0;i<$scope.specialtyInfo.length;i++){
                                           $scope.specialtyInfoProject = $scope.specialtyInfo[i];
                                           $scope.specialtyInfoProject.projectId = projectIdTemp;
                                           console.log('专业线项目的信息为:'+$scope.specialtyInfoProject);
                                           $http.post(url+'/SpecialtyInfoProject/insertSpecialtyInfoProjectRestful',{SpecialtyInfoProject:$scope.specialtyInfoProject}).success(function () {
                                               //layer.msg('INSERT successfully!',{icon:1,time:2000});
                                           });
                                       }
                                   });
                                }).error(function(data, status, headers, config){
                                    layer.alert("添加失败",{icon:2});
                                });
                            }else{
                                layer.msg('提交失败，请联系管理员！',{icon : 0});
                            }
                        });
                    }else{
                        layer.msg('提交失败，请联系管理员！',{icon : 0});
                    }
                });

            };

            /**
             * 点击选中  2016/3/3 By yeshengqiang 开始
             */


            $scope.getData = function($event,item)
            {
                var subCompanyId = document.getElementsByName("scId");
                var num = [];
                var componentId =[];
                for(var i=0;i<subCompanyId.length;i++)
                {
                    if(subCompanyId[i].checked)
                    {
                        num.push(i);
                        componentId.push(subCompanyId[i].id);
                        if(num.length == subCompanyId.length)   //数据库里面注释了一条数据
                        {
                            document.getElementById("allchose").checked = true;
                            inpMark = true;
                        }else
                        {
                            document.getElementById("allchose").checked = false;
                            inpMark = false;
                        }
                    }
                }
                if(componentId.length)
                {
                    sessionStorage.setItem('componentId',JSON.stringify(componentId));
                }else
                {
                    sessionStorage.removeItem('componentId');
                    if(itemId)
                    {
                        itemId=null;
                    }
                }
                $event.stopPropagation();//阻止事件冒泡到tr 上面去
            };

            /**
             * 点击全选
             */
            $scope.allchose = function()
            {
                var componentId =[];
                var subCompanyId = document.getElementsByName("scId");
                if(inpMark)
                {
                    for(var i=0;i<subCompanyId.length;i++)
                    {
                        subCompanyId[i].checked = false;
                        componentId=null;
                    }
                    inpMark = false;
                }else
                {
                    for(var i=0;i<subCompanyId.length;i++)
                    {
                        subCompanyId[i].checked = true;
                        componentId.push(subCompanyId[i].id);
                    }
                    inpMark = true;
                }
                if(componentId)
                {
                    sessionStorage.setItem('componentId',JSON.stringify(componentId));
                }else
                {
                    sessionStorage.removeItem('componentId');
                    if(itemId)
                    {
                        itemId=null;
                    }
                }
            };
            /**
             * 点击选中  2016/3/3 By yeshengqiang 结束
             */

            /**
             * 点击上一页 下一页 bug修复 2016/3/5  by yeshengqiang  开始
             */
            var mark = 1;
            var itemId =[];
            function abSave()
            {
                $(function()
                {
                    if(sessionStorage.getItem('componentId'))
                    {
                        var componentId = JSON.parse(sessionStorage.getItem('componentId'));
                        if(componentId.length !=0)
                        {
                            itemId = componentId;
                        }
                    }else
                    {
                        var compId = itemId;
                    }
                    if(mark == 1 || componentId)
                    {
                        btnClick1(componentId,compId);
                        mark++;
                    }else
                    {
                        btnClick(componentId,compId);
                    }
                });
            };

            function btnClick(componentId,compId)
            {
                var timer = setInterval(function()
                {
                    if(compId !=undefined)
                    {
                        for(var i =0; i<compId.length;i++)
                        {
                            if(componentId)
                            {
                                document.getElementById(componentId[i]).checked = true;
                                sessionStorage.removeItem('componentId');
                                clearInterval(timer);
                            }else if(document.getElementById(compId[i]) && compId)
                            {
                                document.getElementById(compId[i]).checked = true;
                                clearInterval(timer);
                            }
                        }
                    }
                },30);
            };

            function btnClick1(componentId,compId)
            {
                var timer = setInterval(function()
                {
                    if(componentId !=undefined)
                    {
                        for(var i =0;i<componentId.length;i++)
                        {
                            if(document.getElementById(componentId[i]) && componentId)
                            {
                                document.getElementById(componentId[i]).checked = true;
                                sessionStorage.removeItem('componentId');
                                clearInterval(timer);
                            }
                            if(!componentId)
                            {
                                clearInterval(timer);
                            }
                        }
                    }
                },30);
            };

            /**
             * 点击上一页 下一页 bug修复 2016/3/5  by yeshengqiang  结束
             */

            /**
             * 点击取消按钮
             */
            $scope.cancel = function(){
                $scope.show1 = true;
                $scope.show2 = false;
                $scope.show6 = false;
                /**
                 禅道BUG 036
                 修改人：陶勇超
                 2016年1月5日
                 **/
                $scope.addProject={};       //添加项目的基本信息
                $scope.prepare={};
                $scope.projectResult={};
                $scope.parcelList=[];
                $scope.dataList=[];
                $scope.parcel={};
            };

            $scope.dataList=[];
            /**
             * 编制关闭按钮
             */
            $scope.close=function(){
                $scope.prepare={};
                var temp=document.getElementsByName('checkbox');
                var dataList = JSON.parse(sessionStorage.getItem('dataList'));
                //for(var i=0;i<temp.length;i++) {
                //    $scope.itemData = {
                //        postId: "",
                //        nameOfCustom: ""
                //    };
                //    for(var z=0;z<$scope.specialtyInfo.length;z++)
                //    {
                //        for(var j=0;j<JSON.parse(sessionStorage.getItem('dataList')).length;j++)
                //        {
                //            temp[i].checked =false;
                //            $scope.dataList=[];
                //        }
                //    }
                //}
                if(dataList==null)
                {
                    return;
                }
                for(var i=0;i<$scope.specialtyInfo.length;i++)
                {
                    if($scope.specialtyInfo[i].posts.length != 0)
                    {
                        for(var j=0;j<$scope.specialtyInfo[i].posts.length;j++)
                        {
                            document.getElementById($scope.specialtyInfo[i].posts[j].postId).checked = false;
                            if($scope.specialtyInfo[i].posts[j] != undefined)
                            {
                                if(dataList!=null)
                                {
                                    for(var f=0;f<dataList.length;f++)
                                    {
                                        if(dataList[f].postId == $scope.specialtyInfo[i].posts[j].postId)
                                        {
                                            document.getElementById(dataList[f].postId).checked = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            /**
             * 保存编制信息前选择信息
             * BUG 261 2016年1月21日 16:34:55
             */
                //$scope.dataList=[];
            $scope.temp=function(){
                var temp=document.getElementsByName('checkbox');
                for(var i=0;i<temp.length;i++)
                {
                    $scope.itemData={
                        postId:"",
                        nameOfCustom:""
                    };
                    //if(temp[i].checked==true){
                    //    $scope.itemData.postId = temp[i].id;
                    //    $scope.itemData.nameOfCustom = temp[i].value;
                    //    $scope.dataList.push($scope.itemData);
                    //}
                    if(temp[i].checked == true){
                        var temps = false;
                        //目的是为了不重复添加
                        for(var j = 0, len = $scope.dataList.length; j < len; j ++){
                            if($scope.dataList[j].postId == temp[i].id){
                                temps = true;
                            }
                        }
                        if(!temps){
                            $scope.itemData.postId = temp[i].id;
                            $scope.itemData.nameOfCustom = temp[i].value;
                            $scope.dataList.push($scope.itemData);
                        }
                    }else{
                        var dalist=[];
                        dalist=$scope.dataList;
                        $scope.dataList=[];
                        for(var k = 0, lens = dalist.length ; k < lens; k ++){
                            if(dalist[k].postId != temp[i].id){
                                $scope.dataList.push(dalist[k]);
                            }
                        }

                    }
                }

                //把dataList保存在session里面
                sessionStorage.setItem('dataList',JSON.stringify($scope.dataList));
            };

            /**
             * 项目详情
             */
            $scope.projectCheck = function(projectId){
                localStorage.setItem("project_id",JSON.stringify(projectId));          //存储项目idid
                $location.path("/index/baseManagement/project/historyActivity");

            }

            /**
             * 合并
             */
            $scope.merge = function()
            {
                layer.msg('此功能尚未开通，敬请期待！',{icon : 0});
            };
        }]);
});