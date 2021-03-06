/**
 * Created by NM on 2018/1/18.
 * 授权管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('empowerCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var filePath='';          //上传文件的路径
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        $scope.doClick(1);
        //添加授权信息
        $scope.addAuthorization={
            ids:[],//房屋id集合
            authorizationProjectTypes:[],//授权项目类型表
            annexs:[]//附件
        };
        $scope.addAuthorization.authorizedPersonid=$rootScope.user.custId;//被授权人id

        //getPiakDate('datepicker');

        //新增授权人
        $scope.addPerson=function(){
            $scope.chooseData={ids:[],datas:[]};
            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $scope.loadData();

        };

        $scope.loadData=function(){
            //根据条件搜索
            $scope.housez={page:{}};
            $scope.housez.custId = $scope.addAuthorization.authorizedPersonid;
            //加载数据
            var fetchFunction = function(page,callback) {
                $scope.housez.page=page;
                $http.post(url + '/HouseNew/listPageByContionRestful',{HouseNew:$scope.housez}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);
            console.log($scope.searchPaginator);
        };


        //查询所有的资产类型
        $scope.areaTypeNew={};
        $http.get(url + '/AreaTypeNew/listAllAreaTypeNew').success(function(data) {
            $scope.areaTypeNew= data.AreaTypeNew;
        });

        //查询所有的授权项目
        $scope.authorizationProjectType={};
        $http.get(url + '/AuthorizationProjectType/listAllData').success(function(data) {
            $scope.authorizationProjectType= data.AuthorizationProjectType;
        });

        //全选
        $scope.allIds = {authorizationProjectIds:[]};
        $scope.allChecked = function(){
            $scope.allIds.authorizationProjectIds=[];
            var items = document.getElementsByName("child");
            if(document.getElementById("checkAll").checked==true){
                if(items!=null && items.length>0){
                    for(var i=0;i<items.length;i++){
                        $scope.allIds.authorizationProjectIds.push(items[i].id);
                        items[i].checked=true;
                        nums=items.length;
                    }
                }
            }else{
                for(var i=0;i<items.length;i++){
                    $scope.allIds.authorizationProjectIds=[];
                    items[i].checked=false;
                    nums=0;
                }
            }
            $scope.addAuthorization.authorizationProjectTypes=$scope.allIds.authorizationProjectIds;
        }
        var nums = 0;
        $scope.getItem=function(data){
            var id=data.authorizationProjectId;
            var chk = document.getElementById(id);
            $scope.items = {};
            $scope.items = id;
            if(chk.checked == true){
                $scope.allIds.authorizationProjectIds.push($scope.items);
                $scope.addAuthorization.authorizationProjectTypes=$scope.allIds.authorizationProjectIds;
                ++nums;
            }else {
                $scope.temp = [];
                $scope.temp = $scope.allIds.authorizationProjectIds;
                $scope.tem=[];
                $scope.tem=$scope.addAuthorization.authorizationProjectTypes;
                $scope.allIds = {authorizationProjectIds:[]};
                $scope.addAuthorization={authorizationProjectTypes:[]};
                for (var i = 0; i < $scope.temp.length; i++) {
                    if ($scope.temp[i] != id) {
                        $scope.allIds.authorizationProjectIds.push($scope.temp[i]);
                        $scope.addAuthorization.authorizationProjectTypes=$scope.allIds.authorizationProjectIds;

                    }
                }
                --nums;
            }
            var checkBox_b = document.getElementsByName('child');
            if(nums == checkBox_b.length)   //数据库里面注释了一条数据
            {
                document.getElementById("checkAll").checked = true;
            }else
            {
                document.getElementById("checkAll").checked = false;
            }
        };

        //得到选中的房屋id集合与选中对象集合
        $scope.chooseData={ids:[],datas:[]};
        $scope.getData=function(item){
            var id=item.id+item.custId;
            var chk= document.getElementById(id);
            $scope.id = {};
            $scope.id = item.buildingStructureId;
            $scope.dataa={};
            $scope.dataa=item;
            if(chk.checked == true){
                //$scope.btnIndex=id;
                $scope.chooseData.ids.push($scope.id);
                $scope.chooseData.datas.push($scope.dataa);
            }else{
                $scope.temp = [];
                $scope.tem=[];
                $scope.temp =$scope.chooseData.ids;
                $scope.tem= $scope.chooseData.datas;
                $scope.chooseData={ids:[],datas:[]};
                for(var i = 0; i < $scope.tem.length; i ++){
                    if($scope.tem[i].personBuildingId != id){
                        //$scope.btnIndex='';
                        $scope.chooseData.ids.push($scope.id);
                        $scope.chooseData.datas.push($scope.tem[i]);
                    }
                }
            }
        };
        $scope.inputClick = function(item)   //利用冒泡事件
        {
            var id=item.id+item.custId;
            var chk = document.getElementById(id);
            if(chk.parentNode.parentNode.style.background=="")
            {
                chk.checked = true;
                $scope.getData(item);
                chk.parentNode.parentNode.style.background="#f6f8fa";
            }else
            {
                chk.checked = false;
                $scope.getData(item);
                document.getElementById(id).parentNode.parentNode.style.background="";
            };

        };

        //取消
        $scope.resetData=function(){
            $scope.chooseData={ids:[],datas:[]};
            $("#myModal").modal("hide");
        };

        //判断选择的业主信息
        var num=0;//统计相同的个数
        $scope.checkRight=function(checkData){
            if(checkData.length>0){
                var compareData=checkData[0].custId;
                for(var i=0;i<checkData.length;i++){
                    if(checkData[i].custId==compareData){
                        num+=1;
                    }
                }
            }else if(checkData.length==0){
                layer.alert('请选择业主',{icon : 0});
                return;
            }
        }

        //确定;
        $scope.das={};
        $scope.saveData=function(){
            $scope.checkRight($scope.chooseData.datas);
            //每个值都相同
            if($scope.chooseData.datas.length==num){
                $scope.addAuthorization.ids= $scope.chooseData.ids;
                $scope.addAuthorization.authorizerPersonid=$scope.chooseData.datas[0].custId;//授权人id
                $scope.das=$scope.chooseData.datas[0];
                console.log($scope.das);
                $("#myModal").modal("hide");
                num=0;
            }else{
                layer.alert('只能选择一个业主',{icon : 0});
                num=0;
                $scope.chooseData={ids:[],datas:[]};
                $scope.loadData();
                return;
            }
        };


        //新增授权
        $scope.addAuthorizationone=function(){
            if($scope.addAuthorization.ids.length == 0){
                layer.msg('必须选择授权人！',{icon : 0,time : 1000});
                return;
            }

            if($scope.addAuthorization.authorizationProjectTypes.length == 0){
                layer.msg('必须选择至少一个授权项目！', {icon : 0,time : 1000});
                return;
            }
            console.log($scope.addAuthorization.authorizationType);
            if(!$scope.addAuthorization.authorizationType || angular.isUndefined($scope.addAuthorization.authorizationType)){
                layer.msg('必须选择授权类型！',{icon : 0,time : 1000});
                return;
            }
            var stateDate = app.get('valueCheck').isTimerRightAndNotNull($scope.addAuthorization.staDate);
            if(!stateDate.state){
                layer.msg('开始日期' + stateDate.info,{icon : 0,time : 1000});
                return;
            }
            var endDate = app.get('valueCheck').isTimerRightAndNotNull($scope.addAuthorization.endDate);
            if(!endDate.state){
                layer.msg('截止日期' + endDate.info,{icon : 0,time : 1000});
                return;
            }
            if(Date.parse($scope.addAuthorization.endDate)<=Date.parse($scope.addAuthorization.staDate)){
                layer.msg('截止日期必须大于开始日期！',{icon : 0,time : 2000});
                return;
            }
            $http.post(url+'/Authorization/insertAuthorization',{Authorization:$scope.addAuthorization}).success(function()
            {
                layer.msg('添加授权成功',{icon : 1,time : 2000});
                $scope.doClick(2);
                $location.path("index/propertyService/staffHome/empowerManagement/history");
            }).error(function(data, status, headers, config){
                layer.msg('添加授权失败！！',{icon : 0,time : 1000});
            }) ;

        };

        //新增授权取消
        $scope.clearData=function(){
            $scope.doClick(2);
            $location.path("index/propertyService/staffHome/empowerManagement/history");
            $scope.addAuthorization={
                ids:[],//房屋id集合
                authorizationProjectTypes:[],//授权项目类型表
                annexs:[]//附件
            };
            $scope.das={};
            $scope.allIds = {authorizationProjectIds:[]};
            var chks = document.getElementsByName("child");
            var checkv=document.getElementById("checkAll");
            for(var i=0;i<chks.length;i++){
                $scope.allIds.authorizationProjectIds=[];
                chks[i].checked=false;
            }
            if(checkv.checked==true){
                checkv.checked=false;
            }
            $scope.annex=[{annexAddress:''}];
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                $("#remove").html('');
                $("#remove").append('<div id="zyupload" class="zyupload"></div>');
                $("#zyupload").zyUpload({
                    width            :   "100%",                 // 宽度
                    height           :   "auto",                 // 宽度
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FileService",  // 上传文件的路径
                    fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                    },
                    onDelete: function(file, files){

                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.addAuthorization.annexs.push($scope.annex);
                        $scope.addAuthorization.accessoryAddress=filePath;
                        layer.msg("上传成功",{icon : 1,time : 2000});
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("上传失败",{icon : 1,time : 2000});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
        };


        //上传文件
        $scope.annex=[{annexAddress:''}];
        $("#zyupload").remove();
        $("#remove").append("<div id='zyupload' class='zyupload'></div>");
        $(function(){
            // 初始化插件
            $("#remove").html('');
            $("#remove").append('<div id="zyupload" class="zyupload"></div>');
            $("#zyupload").zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "auto",                 // 宽度
                itemWidth        :   "140px",                 // 文件项的宽度
                itemHeight       :   "115px",                 // 文件项的高度
                url              :   fileUrl+"/FileService",  // 上传文件的路径
                fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
                fileSize         :   51200000,                // 上传文件的大小
                multiple         :   true,                    // 是否可以多个文件上传
                dragDrop         :   true,                    // 是否可以拖动上传文件
                tailor           :   true,                    // 是否可以裁剪图片
                del              :   true,                    // 是否可以删除文件
                finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                },
                onDelete: function(file, files){

                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    filePath=response;
                    $scope.annex.annexAddress=filePath;
                    $scope.addAuthorization.annexs.push($scope.annex);
                    $scope.addAuthorization.accessoryAddress=filePath;
                    layer.msg("上传成功",{icon : 1,time : 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    layer.msg("上传失败",{icon : 1,time : 2000});
                },
                onComplete: function(response){           	  // 上传完成的回调方法

                }
            });
        });
    }]);
});




