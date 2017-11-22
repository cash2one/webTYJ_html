/**
 * Created by NM on 2018/1/18.
 * 重点客户申请js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('failRequestCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径

        $scope.id={};//得到登录人信息
        $scope.id=JSON.parse(sessionStorage.getItem("person_property")).custId;

        $scope.personVip={};
        $scope.personEmphasisx={};
        $http.get(url + '/PersonEmphasis/getPersonEmphasisState/'+$scope.id).success(function(data) {
            $scope.personEmphasisx = data.PersonEmphasis;
        });
        $http.get(url + '/PersonVip/getPersonVipState/'+$scope.id).success(function(data) {
            $scope.personVip = data.PersonVip;
        });

        $scope.personEmphasis={
            custId:'',
            username:'',
            applystatus:'',
            applydate:'',
            idcard:'',
            applyreason:'',
            applyfilepath:[]
        };
        $scope.cancleAll=function(){
            $scope.personEmphasis={
                custId:'',
                username:'',
                applystatus:'',
                applydate:'',
                idcard:'',
                applyreason:'',
                applyfilepath:[]
            };
            //上传文件
            $scope.applyfilepath=[];
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
                    onSuccess: function(file, response){
                        // 文件上传成功的回调方法
                        $scope.annex={annexAddress:'',annexName:""};
                        filePath=response;
                        $scope.annex.annexName=file.name;
                        $scope.annex.annexAddress=filePath;
                        $scope.applyfilepath.push($scope.annex);
                        layer.msg("上传成功",{icon : 1,time : 2000});
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("上传失败",{icon : 1,time : 2000});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });
            });
        }

        $scope.checkVIP=function(personVip){
            if(personVip.applystype==0){
                if(personVip.reviewState==0){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    return;
                }else if(personVip.reviewState==1){
                    layer.alert('该客户已经是VIP客户！',{icon : 0});
                    return;
                }
            }else if(personVip.applystype==1){
                if(personVip.reviewState==0){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    return;
                }else if(personVip.reviewState==2){
                    layer.alert('该客户已经是VIP客户！',{icon : 0});
                    return;
                }
            }
        };
        $scope.checkPersonEmphasis=function(personEmphasis){
            if(personEmphasis.applystype==2){
                if(personEmphasis.applystatus==0){
                    layer.alert('该客户已提交重点客户申请！',{icon : 0});
                    return;
                }else if(personEmphasis.applystatus==1){
                    layer.alert('该客户已经是重点客户！',{icon : 0});
                    return;
                }
            }else if(personEmphasis.applystype==3){
                if(personEmphasis.applystatus!=2){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    return;
                }else{
                    layer.alert('该客户已经是重点客户！',{icon : 0});
                    return;
                }
            }
        };

        $scope.checkPersonEmphasisFailApply=function(personEmphasis){
            if(personEmphasis.applystype==2){
                if(personEmphasis.applystatus!=1){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    return;
                }
            }else if(personEmphasis.applystype==3){
                if(personEmphasis.applystatus==0){
                    layer.alert('该客户已提交申请！',{icon : 0});
                    return;
                }else if(personEmphasis.applystatus==1){
                    layer.alert('该客户不符合申请条件！',{icon : 0});
                    return;
                }
            }
        };

        //提交申请
        $scope.saveAll=function(){

           /* if($scope.personVip!=null&&$scope.personEmphasisx!=null){
                if($scope.personVip.vipEnd>$scope.personEmphasisx.applyeddate){
                    $scope.checkVIP($scope.personVip);
                    return;
                }else{
                    $scope.checkPersonEmphasis($scope.personEmphasisx);
                    return;
                }
            }else  if($scope.personVip!=null&&$scope.personEmphasisx==null){
                $scope.checkVIP($scope.personVip);
                return;
            }else if($scope.personVip==null&&$scope.personEmphasisx!=null){
                $scope.checkPersonEmphasis($scope.personEmphasisx);
                return;
            }*/

            $scope.personEmphasis.custId=JSON.parse(sessionStorage.getItem("person_property")).custId;//申请人id
            $scope.personEmphasis.theme="重点失效客户申请";
            $scope.personEmphasis.idcard=JSON.parse(sessionStorage.getItem("person_property")).cardNum;
            $scope.personEmphasis.phonenum=JSON.parse(sessionStorage.getItem("person_property")).registerPhone;
            $scope.personEmphasis.username=JSON.parse(sessionStorage.getItem("person_property")).name;
            $scope.personEmphasis.applystype=3;//申请
            $scope.personEmphasis.applystatus=0;//审核状态
            $scope.personEmphasis.applyfilepath=$scope.applyfilepath;
            if($scope.personEmphasis.applyreason!=""||$scope.personEmphasis.applyreason!=null){
                $http.post(url+'/PersonEmphasis/AddPersonEmphasis',{PersonEmphasis:$scope.personEmphasis}).success(function()
                {
                    layer.msg('申请成功',{icon : 1,time : 2000});
                    $scope.cancleAll();

                }).error(function(data, status, headers, config){
                    layer.msg('申请失败',{icon : 3,time : 2000});
                });
            }else{
                layer.alert('请输入申请理由！',{icon : 0});
            }

        };
        //上传文件
        $scope.applyfilepath=[];
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
                onSuccess: function(file, response){
                    // 文件上传成功的回调方法
                    $scope.annex={annexAddress:'',annexName:""};
                    filePath=response;
                    $scope.annex.annexName=file.name;
                    $scope.annex.annexAddress=filePath;
                    $scope.applyfilepath.push($scope.annex);
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