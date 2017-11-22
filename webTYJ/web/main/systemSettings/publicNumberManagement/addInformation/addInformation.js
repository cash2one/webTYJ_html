/**
 * Created by wuying on 16/1/29.
 */
define(function (require) {
    var app = require('../../../../app');

    app.controller('addInformationCtrl', ['$scope', '$http','$rootScope','$location','fileUpload', function ($scope,$http,$rootScope,$location,fileUpload) {
        var url = $rootScope.jiajiaUrl;
        var fileUrl=$rootScope.jiajiaFileUrl;    //上传的文件路径
        var filePath='';

        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息

        console.dir($scope.user);
        $scope.massInformation = {informationList:[]};
        $scope.massInformation.userId = $scope.user.userId;
        $scope.massInformation.companyId = $scope.user.companyId;
        $scope.massInformation.companyName = $scope.user.companyName;

        var info = {informationId:'',title:'',author:'',coverPath:'',summary:'',content:'',meterialId:'',index:0};
        $scope.massInformation.informationList.push(info);
        $scope.information = $scope.massInformation.informationList[0];


        var flag = 0;
        $scope.checkValue = function(item){
            flag = 0;
            for(var i=0;i<$scope.massInformation.informationList.length;i++){
                if($scope.massInformation.informationList[i].title == null || $scope.massInformation.informationList[i].title == ""){
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('标题不能为空！',{icon : 0});
                    flag=1;
                    return;
                } else if($scope.massInformation.informationList[i].title.length>30){
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('标题长度不能超过30！',{icon : 0});
                    flag=1;
                    return;
                } else if($scope.massInformation.informationList[i].author.length>10){
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('作者长度不能超过10！',{icon : 0});
                    flag=1;
                    return;
                } else if ($scope.massInformation.informationList[i].content == null || $scope.massInformation.informationList[i].content == "") {
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('正文不能为空！',{icon : 0});
                    flag=1;
                    return;
                } else if($scope.massInformation.informationList[i].content.length>20000){
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('正文长度不能超过20000！',{icon : 0});
                    flag=1;
                    return;
                } else if ($scope.massInformation.informationList[i].summary == null || $scope.massInformation.informationList[i].summary == "") {
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('摘要不能为空！',{icon : 0});
                    flag=1;
                    return;
                } else if ($scope.massInformation.informationList[i].summary.length>50) {
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('摘要长度不能超过50字！',{icon : 0});
                    flag=1;
                    return;
                } else if ($scope.massInformation.informationList[i].coverPath == null || $scope.massInformation.informationList[i].coverPath == "") {
                    $scope.information = $scope.massInformation.informationList[i];
                    layer.alert('封面不能为空！',{icon : 0});
                    flag=1;
                    return;
                }
            }
        };

        /**
         * 上传图文消息
         */
        $scope.upload=function(){
            $scope.checkValue($scope.massInformation);
            if(flag!=0){
                return;
            } else {
                $scope.massInformation.releaseTime = new Date();//设置图文消息上传时间
                $http.post(url+'/massinformation/insertMassInformation',{MassInformation:$scope.massInformation}).success(function(){
                    layer.msg('添加成功！',{icon : 1,time : 1000});
                    $location.path("index/systemSettings/publicNumberManagement/massInformation");
                }).error(function(data, status, headers, config){
                    layer.msg('添加失败！',{icon : 2,time : 1000});
                });
            }
        };

        /**
         * 上传图片
         */
        $scope.test = function(){
            setTimeout(function(){
                if($scope.myFile==null || $scope.myFile==''){
                    return;
                }
                var file = $scope.myFile;
                var uploadUrl = fileUrl+"/FileService";
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                    .success(function(response){
                        $scope.information.coverPath = response;
                        layer.msg("上传成功",{icon : 1,time : 2000});
                    })
                    .error(function(){
                        layer.msg("上传失败",{icon : 2,time : 2000});
                    });
            },"100");
        }
        /**
         * 上传图片
         */
        $scope.uploadFile = function(){
            var file = $scope.myFile;
            console.dir(file);
            var uploadUrl = fileUrl+"/FileService";
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(response){
                    $scope.information.coverPath = response;
                    layer.msg("上传成功",{icon : 1,time : 2000});
                })
                .error(function(){
                    layer.msg("上传失败",{icon : 2,time : 2000});
                });
        };



        /**
         * 上传文件
         * @type {{annexAddress: string, annexName: string}}
         */
        $scope.annex = {annexAddress:'',annexName:''};
    /*    $(function(){
            // 初始化插件
            $("#zyupload").zyUpload({
                width            :   "67%",                 // 宽度
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
                //外部获得的回调接口
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                },
                onDelete: function(file, files){
                },
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    $scope.annex = {annexAddress:'',annexName:''};
                    filePath=response;
                    $scope.annex.annexName = file.name;
                    $scope.annex.annexAddress = filePath;
                    $scope.information.coverPath = filePath;
                    $scope.addStaff.annexs.push($scope.annex);
                    layer.msg("上传成功",{icon : 1,time : 2000});
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    layer.msg("上传失败",{icon : 2,time : 2000});
                },
                onComplete: function(response){           	  // 上传完成的回调方法

                }
            });

        });*/

        $scope.addInformation = function(){
            var index = $scope.massInformation.informationList[$scope.massInformation.informationList.length-1].index+1;
            var info = {informationId:'',title:'',author:'',coverPath:'',summary:'',content:'',meterialId:'',index:index};
            $("#file").val("");
            $scope.information = info;
            $scope.massInformation.informationList.push(info);
        };

        $scope.delInformation=function(index){
            layer.confirm("您确定要删除选定的图文吗?", function (qwer) {
                $scope.massInformation.informationList.splice(index,1);
                $scope.information = $scope.massInformation.informationList[index-1];
                layer.close(qwer);
                $scope.$apply($scope.massInformation.informationList);
            });

        };
        $scope.select = function(index){
            $("#file").val("");
            $scope.information = $scope.massInformation.informationList[index];
        };

        //预览的显示与关闭
        $scope.phoneShow = false;
        $scope.closePhone = function ($event) {
            console.dir($event.target);
            if($event.target.className != "phone_panel ng-scope" && $event.target.className != "phone_box"){
                return;
            } else {
                $scope.phoneShow = false;
            }
        };
        $scope.openPhone = function () {
            $scope.checkValue($scope.massInformation);
            if(flag!=0){
                return;
            } else {
                $scope.phoneShow = true;
                $scope.showDate = new Date();
            }
        };

    }]);

    app.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function ($scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        $scope.$apply(function () {
                            $scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);

    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function(response){
                    $scope.information.coverPath = response;
                    layer.msg("上传成功",{icon : 1,time : 2000});
                })
                .error(function(){
                    layer.msg("上传失败",{icon : 2,time : 2000});
                });
        }
    }]);

});