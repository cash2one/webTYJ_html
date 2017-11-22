/**
 * Created by 彭婷婷 on 2015/6/1.
 * 名称：人员管理新增
 * 修改人：倪明   修改时间：2015/8/26
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('appStaffEmployedCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';
        $scope.addStaff={annexs:[]};
        //$scope.doClick(0);
        var user = {};                                             //设置默认用户信息为空
        var userSession= JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userSession?userSession:user;                      //三目运算获取用户信息
        $scope.wsIsExistsPerson = false;
        var companyId=null;
        companyId= $scope.user.companyId;
        $scope.addStaff.companyId=companyId;
        /**
         * 在职员工页面网格列表切换
         */
        $scope.grid = true;
        $scope.list=function(){
            $scope.grid=true;
        };
        $scope.gridChange=function(){
            $scope.grid=false;
        };

        $scope.loadList = function(){
            $scope.staff = {page: {}};
            var fetchFunction = function (page, callback) {
                $scope.staff.page = page;
                $http.post(url + '/staff/listPageAllStaff_Unckeck', {Staff: $scope.staff}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        };

        $scope.loadList();
        console.log($scope.searchPaginator);
        $scope.getStaffInfo = function (item) {
            $scope.index = item.staffId;
            $scope.staffInfo = item;
        };

        $scope.addUserFromApp_Agree=function(isSingle){
            if(isSingle){

            }else{
                if($scope.chooseData.datas.length==1){
                    $scope.addStaff=$scope.chooseData.datas[0];
                }else{
                    return console.log($scope.chooseData);
                }
            }
            if($scope.addStaff.processStatus < 0){
                return layer.msg('该用户已被拒绝，不能直接入职！',{icon : 0,time : 2000});
            }
            layer.confirm('是否审核通过该员工？',{
                btn : ['是','否']
            },function(){
                $scope.staffNews={};
                $scope.addStaff.companyId=companyId;
                $scope.staffNews=$scope.addStaff;
                $scope.staffNews.processStatus= 3;

                console.log($scope.staffNews);
                $http.post(url+'/LoginService/agree_WelcomeUser',{Staff:$scope.staffNews}).success(function(data){
                    if(data.state == 'success'){
                        console.log( $scope.staffNews);
                        $http.post(url+'/LoginService/sendMsg2UserByLoginName',{Staff:$scope.staffNews}).success(function(data){
                            return layer.msg(data.info,{icon : 1,time : 2000});
                            $scope.searchPaginator._load();
                        });
                    }else{
                        return layer.msg(data.info,{icon : 0,time : 2000});
                    }
                }).error(function(data){
                    return layer.msg(data.info,{icon : 1,time : 2000});
                }) ;

            },function(){

            });

            /**
            var loginId = $scope.addStaff.userAppId;

            if(loginId != undefined && loginId.replace(/(^s*)|(s*$)/g, "").length !==0){
                console.log($scope.addStaff);
                $scope.staffNews={};
                $scope.staffNews.userAppId = $scope.addStaff.userAppId;
                $scope.staffNews.companyId=$scope.addStaff.companyId;
                $scope.staffNews.processStatus= -1;
                $http.post(url+'/staff/findUserInfoByUserAppId',{Staff:$scope.staffNews}).success(function(data){
                    if(data.Staff.length > 0){
                        $scope.isExistsPersonInWY=true;
                        return layer.msg("用户已存在于物业管理平台！请核对后再添加！",{icon : 0,time : 2000});
                    }else{
                        $scope.isExistsPersonInWY=false;
                    }
                }).error(function(data, status, headers, config){
                    layer.msg("查询失败",{icon : 3,time : 2000});
                    return;
                }) ;
            }else{
                layer.msg("请输入APP账户！",{icon : 0,time : 2000});
                $scope.wsIsExistsPerson = false;
            }
            $scope.addStaff.userAppId=loginId;
             **/
        };

        $scope.addUserFromApp_disAgree=function(isSingle){
            if(isSingle){

            }else{
                if($scope.chooseData.datas.length==1){
                    $scope.addStaff=$scope.chooseData.datas[0];
                }else{
                    return console.log($scope.chooseData);
                }


            }
            //checkUserByLoginNameAndSendMsg
            $scope.staffNews={};
            $scope.addStaff.companyId=companyId;
            $scope.staffNews=$scope.addStaff;
            $scope.staffNews.processStatus= -1;
            if($scope.wsIsExistsPerson){
                $http.post(url+'/LoginService/putLoginNameInSystemFromAPP',{Staff:$scope.staffNews}).success(function(data){
                    return layer.msg(data,{icon : 1,time : 2000});
                }).error(function(data){
                    return layer.msg(data,{icon : 1,time : 2000});
                }) ;
                console.log( $scope.staffNews);
                $http.post(url+'/LoginService/sendMsg2UserByLoginName',{Staff:$scope.staffNews}).success(function(data){
                    console.log(data);
                    $scope.searchPaginator._load();
                });
            }

        };

        $scope.putUser = function(){
            if ($scope.wsIsExistsPerson) {
                $scope.staffNews = {};
                $scope.addStaff.companyId=companyId;
                $scope.staffNews=$scope.addStaff;
                $scope.staffNews.processStatus= 1;
                $http.post(url + '/LoginService/putLoginNameInSystemFromAPP', {Staff: $scope.staffNews}).success(function (data) {
                    console.log(data);
                    $http.post(url+'/LoginService/sendMsg2UserByLoginName',{Staff:$scope.staffNews}).success(function(data){
                        console.log(data);
                        $scope.searchPaginator._load();
                    });
                    return layer.msg(data.info, {icon: 1, time: 2000});
                }).error(function (data) {
                    return layer.msg(data.info, {icon: 1, time: 2000});
                });

            }
        };
        $scope.staff1={annexs:[]};
        $scope.toShow = function (data) {
            $scope.staff1 = data;
            if ($scope.staff1.annexs != null) {
                if (angular.isArray($scope.staff1.annexs)) {
                } else {
                    $scope.annexList = [];
                    $scope.annexList.push($scope.staff1.annexs);
                    $scope.staff1.annexs = $scope.annexList;
                }
            }else if($scope.staff1.annexs ==undefined){
                $scope.staff1.annexs=[];
            }
            angular.element('#personDatil').modal({backdrop: 'static', keyboard: false});
        };

        $scope.checkIsExistsPersonByAPPId = function(isSingle){
            if(isSingle){

            }else{
                if($scope.chooseData.datas.length==1){
                    $scope.addStaff=$scope.chooseData.datas[0];
                }else{
                    return console.log($scope.chooseData);
                }


            }
            var loginId = $scope.addStaff.userAppId;
            if(loginId != undefined && loginId.replace(/(^s*)|(s*$)/g, "").length !==0) {
                /**
                 console.log($scope.addStaff);
                 $scope.staffNews={};
                 $scope.staffNews.userAppId = $scope.addStaff.userAppId;
                 $scope.staffNews.companyId=$scope.addStaff.companyId;
                 $http.post(url+'/staff/findUserInfoByUserAppId',{Staff:$scope.staffNews}).success(function(data){
                    if(data.Staff.length > 0){
                        $scope.isExistsPersonInWY=true;
                        return layer.msg("用户已存在于物业管理平台！请核对后再添加！",{icon : 0,time : 2000});
                    }else{
                        $scope.isExistsPersonInWY=false;
                    }
                }).error(function(data, status, headers, config){
                    layer.msg("查询失败",{icon : 3,time : 2000});
                    return;
                }) ;
                 **/

                $scope.staffNews = {};
                $scope.staffNews.userAppId = $scope.addStaff.userAppId;
                $scope.staffNews.companyId = $scope.addStaff.companyId;
                $scope.staffNews.processStatus= 1;
                $http.post(url + '/LoginService/ws_checkUserByAppAccountId', {Staff: $scope.staffNews}).success(function (data) {
                    console.log(data);
                    if (angular.isUndefined(data.Staff)) {
                        layer.msg("用户统一管理平台未查询到用户！", {icon: 3, time: 2000});
                        $scope.wsIsExistsPerson = false;
                        return;
                    }
                    $scope.addStaff = data.Staff;
                    console.log($scope.addStaff);
                    $scope.wsIsExistsPerson = true;
                    $scope.putUser();
                }).error(function (data) {
                    console.log(data);
                    layer.msg("用户统一管理平台未查询到用户！", {icon: 3, time: 2000});
                    $scope.wsIsExistsPerson = false;
                });
            }else{
                layer.msg("请输入APP账户！",{icon : 0,time : 2000});
                $scope.wsIsExistsPerson = false;
            }
            $scope.addStaff.userAppId=loginId;

            //checkUserByLoginNameAndSendMsg
            /**
            if(!$scope.wsIsExistsPerson){
                $http.post(url+'/LoginService/putLoginNameInSystemFromAPP',{Staff:$scope.staffNews}).success(function(data){
                    return layer.msg(data,{icon : 1,time : 2000});
                }).error(function(data){
                    return layer.msg(data,{icon : 1,time : 2000});
                }) ;
                 console.log( $scope.staffNews);
                 $http.post(url+'/LoginService/sendMsg2UserByLoginName',{Staff:$scope.staffNews}).success(function(data){
                    console.log(data);
                });
            }**/
                /**
                $http.post(url+'/LoginService/checkUserByAppAccountId',{Staff:$scope.staffNews}).success(function(data){
                    console.log($scope.data);
                    if(angular.isUndefined(data.Staff)){
                        layer.msg("未查询到用户！",{icon : 3,time : 2000});
                        $scope.wsIsExistsPerson = false;
                        return;
                    }
                    $scope.addStaff = data.Staff;
                    console.log($scope.addStaff);
                    $scope.wsIsExistsPerson = true;
                }).error(function(data){
                    console.log(data);
                    layer.msg("未查询到用户！",{icon : 3,time : 2000});
                    $scope.wsIsExistsPerson = false;
                }) ;**/

                /**
                if($scope.isExistsPersonInWY)
                    return;

                console.log( $scope.staffNews);

                $http.post(url+'/LoginService/sendMsg2UserByLoginName',{Staff:$scope.staffNews}).success(function(data){
                    console.log(data);
                });

                return;
                 **/

        };
        /**
         * 点击选中  2016/2/25 By yeshengqiang 开始
         */
        $scope.chooseData = {datas: []};
        $scope.getData = function(item)
        {
            var allData = $scope.searchPaginator.object.staffs.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.userAppId == allData[i].userAppId)
                {
                    if(document.getElementById(item.userAppId).checked)
                    {
                        document.getElementById(item.userAppId).checked = false;
                        document.getElementById(item.userAppId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].userAppId != item.userAppId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.userAppId).checked = true;
                        document.getElementById(item.userAppId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].userAppId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        document.getElementById("allchose").checked = false;
                    }
                }
            }
        };

        //删除
        $scope.dleteData={staffs:[]};
        $scope.toDelete = function () {
            if($scope.showStatus==0){
                layer.msg("请在网格中操作", {icon: 3, time: 2000});
                return;
            }else {
                if ($scope.chooseData.datas.length >= 1) {
                    layer.confirm("您确定要删除选中员工吗？", {btn: ['是', '否']}, function () {
                        $scope.dleteData.staffs = $scope.chooseData.datas;
                        $http.put(url + '/LoginService/removeStaffStateByStateAndId', {Staff: $scope.dleteData}).success(function () {
                            layer.msg("删除成功", {icon: 1, time: 2000});
                            $scope.chooseData = {datas: []};
                            $scope.searchPaginator._load();
                            document.getElementById("allchose").checked=false;
                        }).error(function () {
                            layer.msg("删除失败", {icon: 3, time: 2000});
                        });
                    })

                } else {
                    layer.alert("请选择需要删除的数据", {icon: 0});
                }
            }
        };

        /**
         * 点击全选
         */

        $scope.allchose = function(item)
        {
            var datastaffList=item.slice(1);
            allcheck(datastaffList);
        };
        //全选
        function allcheck(datastaffList)
        {
            if( $scope.chosestate=='0'){
                $scope.chooseData= {datas:[]};
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].userAppId).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].userAppId).parentNode.parentNode.style.background = '#f6f8fa';
                }
                document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].userAppId).checked = false;
                    document.getElementById(datastaffList[i].userAppId).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                document.getElementById("allchose").checked = false;
            }
        };

        /*
         * Excel文件导入
         */
        $scope.bsnum = 0;//上传成功数
        $scope.totalnum = 0;//总共上传数
        $scope.bfNum ='';//百分比
        $scope.key ="110";
        var flagInterval =null;
        $scope.addExcel=function(){
            angular.element('#addExcel').modal({backdrop: 'static', keyboard: false});
            $scope.annexExcel={
                annexAddress:'',
                annexName:''
            };
            angular.element("#excelupload").remove();
            angular.element("#remove1").append("<div id='excelupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                angular.element("#remove1").html('');
                angular.element("#remove1").append('<div id="excelupload" class="zyupload"></div>');
                angular.element("#excelupload").zyUpload({
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
                        /*if(selectFiles.length > 0){
                         for(var i=0;i<selectFiles.length;i++){
                         var fileName = selectFiles[i].name;
                         var pos = fileName.lastIndexOf(".");
                         var suffix = fileName.substring(pos+1,fileName.length);
                         alert("xls" == suffix || "xlsx" == suffix)
                         if("xls" == suffix || "xlsx" == suffix){
                         alert(i)
                         $("#uploadImage_"+i).attr("src","fileType/xls.png");
                         }
                         if("png" == suffix || "jpg" == suffix || "jpeg" == suffix || "gif" == suffix){
                         $("#uploadImage_"+i).attr("src","fileType/png.png");
                         }
                         if("pdf" == suffix){
                         $("#uploadImage_"+i).attr("src","fileType/pdf.png");
                         }
                         if("doc" == suffix || "doc" == suffix){
                         $("#uploadImage_"+i).attr("src","fileType/doc.png");
                         }
                         if("ppt" == suffix){
                         $("#uploadImage_"+i).attr("src","fileType/ppt.png");
                         }
                         }
                         }*/
                    },
                    onDelete: function(file, files){
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annexExcel.annexAddress=filePath;
                        $scope.annexExcel.annexName=file.name;
                        $scope.annexExcel.companyId= $scope.user.companyId;
                        flagInterval = setInterval(getProcess,1000);
                        $http.post(url + "/LoginService/importDataFromExcelFileNew",{Annex:$scope.annexExcel}).success(function(data){
                            if(data.Info.info.$.length!=0){
                                angular.element('#addExcel').modal('hide');
                                layer.msg(data.Info.info.$,{icon : 0,time : 2000});
                            }
                            else  if(data.Info.state){
                                //  var sarr = data.Info.info.$.split("|");
                                $scope.key = data.Info.info.$;
                                //var s = sarr[0];
                                //var e = sarr[1];
                                //var filepath = sarr[2];
                                //if(e == '0'){
                                //    layer.alert("成功上传"+s+"条员工信息，失败0条",{icon : 0});
                                //}else{
                                //    var index = layer.alert("成功上传"+s+"条员工信息，失败"+e+"条，点击确定下载错误信息", {
                                //        //skin: 'layui-layer-molv' //样式类名
                                //        closeBtn: 0
                                //    }, function(){
                                //        layer.close(index);
                                //        window.location.href=fileUrl+"/"+filepath;
                                //    });
                                //}
                                //layer.alert(data.Info.info.$,{icon : 0});
                                //layer.alert(data.Info.info.$,{icon : 1,time : 2000});
                                angular.element('#addExcel').modal('hide');
                                angular.element('#uploadProcessDialog').modal({backdrop: 'static', keyboard: false});

                            }else{
                                layer.msg('导入失败',{icon : 1,time : 2000});
                                angular.element('#addExcel').modal('hide');
                            }
                            //$("#fileImage").val("");
                            //$("#uploadList_" + file.index).fadeOut();
                            //$scope.load();
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        alert("此文件上传失败：");
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                        clearInterval(flagInterval);
                    }
                });
            });
        };

        $scope.saveExcel=function(){
            angular.element('#addExcel').modal('hide');
            $scope.load();
        }

        function getProcess(){
            $.ajax({
                url:fileUrl + "/info/getImportProcess.do",
                data:{key:$scope.key},
                type:'get',
                cache:false,
                success:function(data){
                    if(data!=null && data!=undefined && data!=''){
                        var uploadArr = data.split("|");
                        $scope.totalnum = parseInt(uploadArr[1]);
                        $scope.bsnum =parseInt(uploadArr[0]);
                        $scope.bfNum = Math.round(($scope.bsnum/$scope.totalnum)*100)+'%';
                        $("#bsnum").html(uploadArr[0]);
                        $("#totalnum2").html(uploadArr[1]);
                        $('#progress').css('width',$scope.bfNum);
                        if((parseInt(uploadArr[0]) > 0 && parseInt(uploadArr[0]) == parseInt(uploadArr[1]))||parseInt(uploadArr[1])==0){
                            $scope.load();
                            layer.msg('导入成功！',{icon:1});
                            $("#uploadProcessDialog").modal('hide');
                            clearInterval(flagInterval);

                        }
                    }
                }
            });
        }

        $scope.cancleExcel=function(){
            angular.element('#addExcel').modal('hide');
            $scope.load();
        };
    }]);
});