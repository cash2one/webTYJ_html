/**
 * Created by NM on 2018/1/18.
 * VIP客户申请js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('vipFailRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        $scope.id=JSON.parse(sessionStorage.getItem("person_property")).custId;//得到申请人id
        $scope.personVvip={};
        $scope.personEmphasis={};

        //重点客户
        $http.get(url + '/PersonEmphasis/getPersonEmphasisState/'+$scope.id).success(function(data) {
            console.log(data);
            $scope.personEmphasis = data.PersonEmphasis;
        });
        //VIP客户
        $http.get(url + '/PersonVip/getPersonVipState/'+$scope.id).success(function(data) {
            console.log(data);
            $scope.personVvip = data.PersonVip;
        });
        $scope.personVip={
            custId:'',
            applyfilePath:'',
            theme:'',
            name:'',
            annexs:[]
        };
        $scope.cancleAll=function(){
            $scope.personVip={
                custId:'',
                applyfilePath:'',
                theme:'',
                name:'',
                annexs:[]
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
                        $scope.personVip.annexs=$scope.annex;
                        $scope.personVip.applyfilePath=filePath;
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法

                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });
        }

        $scope.checkVIP=function(personVip){
            if(personVip.applystype==0){
                if(personVip.reviewState==0){
                    layer.alert('该客户已提交申请！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personVip.reviewState==1){
                    layer.alert('该客户已经是VIP客户！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personVip.reviewState==2){
                    $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                }
            }else if(personVip.applystype==1){
                if(personVip.reviewState==0){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personVip.reviewState==1){
                    $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                }else if(personVip.reviewState==2){
                    layer.alert('该客户已经是VIP客户！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }
            }
        }
        $scope.checkPersonEmphasis=function(personEmphasis){
            if(personEmphasis.applystype==2){
                if(personEmphasis.applystatus==0){
                    layer.alert('该客户已提交重点客户申请！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personEmphasis.applystatus==1){
                    layer.alert('该客户已经是重点客户！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personEmphasis.applystatus==2){
                    $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                }
            }else if(personEmphasis.applystype==3){
                if(personEmphasis.applystatus==0){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personEmphasis.applystatus==1){
                    $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
                }else if(personEmphasis.applystatus==2){
                    layer.alert('该客户已经是重点客户！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }
            }
        }

        $scope.checkVIPFailApply=function(personVip){
            if(personVip.applystype==0){
                if(personVip.reviewState!=1){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else{
                    $location.path("/index/propertyService/staffHome/vipApplys/vipFailRequest");
                }
            }else if(personVip.applystype==1){
                if(personVip.reviewState==0){
                    layer.alert('该客户已提交申请！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personVip.reviewState==1){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    $location.path("/index/propertyService/staffHome/vipApplys");
                    return;
                }else if(personVip.reviewState==2){
                    $location.path("/index/propertyService/staffHome/vipApplys/vipFailRequest");
                }
            }
        }

        //提交申请
        $scope.saveAll=function(){
            /*if($scope.personVvip!=null&&$scope.personEmphasis!=null){
                if($scope.personVvip.vipEnd>$scope.personEmphasis.applyeddate){
                    $scope.checkVIP($scope.personVvip);
                }else{
                    $scope.checkPersonEmphasis($scope.personEmphasis);
                }
            }else if($scope.personVvip==null&&$scope.personEmphasis==null){
                $location.path("/index/propertyService/staffHome/vipApplys/vipRequest");
            }else  if($scope.personVvip!=null&&$scope.personEmphasis==null){
                $scope.checkVIP($scope.personVip);
            }else if($scope.personVvip==null&&$scope.personEmphasis!=null){
                $scope.checkPersonEmphasis($scope.personEmphasis);
            }*/
            $scope.personVip.custId=$scope.id;//申请人id
            $scope.personVip.theme="vip客户失效申请";
            $scope.personVip.applystype=1;//失效申请
            $scope.personVip.reviewState=0;//审核状态
            $scope.personVip.name=JSON.parse(sessionStorage.getItem("person_property")).name;//申请人姓名

            if($scope.personVip.applyReason==null){
                layer.alert('申请理由不能为空！',{icon : 0});                return;
            }else{
                $http.post(url+'/PersonVip/AddPersonVip',{PersonVip:$scope.personVip}).success(function()
                {
                    layer.msg('申请成功',{icon : 1,time : 2000});
                    $scope.cancleAll();
                }).error(function(data, status, headers, config){
                    layer.msg('申请失败',{icon : 3,time : 2000});
                });
            }

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
                    $scope.personVip.annexs=$scope.annex;
                    $scope.personVip.applyfilePath=filePath;
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