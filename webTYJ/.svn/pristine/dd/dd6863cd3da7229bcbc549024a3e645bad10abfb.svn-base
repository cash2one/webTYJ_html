/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('landlordLeaseInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(6);
        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';

        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };


        var url = $rootScope.url;
        //查询户主的房屋中的租赁信息
        $scope.search={page:{}};
        $scope.load = function(){
            var parent = function (page, callback) {
                $scope.search.page = page;
                $http.post(url+'/NewLease/listPageNewLeaseByContion',{NewLease:$scope.search}).success(callback);
            };
            $scope.currentPaginator = app.get('Paginator').list(parent,6);
            console.log( $scope.currentPaginator );

        }
        $scope.load();//加载

        /**
         * 获取选中的租赁对象
         * @param id
         */
        $scope.deletenewLease = function(item) {
            layer.confirm("您确定要删除选中的租赁对象？",
                {btn : ['是','否']},function(){
                    $http.put(url + '/NewLease/deleteNewLeaseRestful/' + item.id).success(
                        function() {
                            layer.msg('删除成功!',{icon : 1});
                            $scope.load();//刷新
                        }).error(function(data, status, headers, config) {
                            layer.msg('删除失败!',{icon : 3});
                        });
                }
            );
        };

        $scope.deletenewLeaseForList= function () {
            if($scope.selectItem==null||$scope.selectItem==""){
                layer.alert('请选一项后再操作',{icon:2})
                return;
            }

            $scope.deletenewLease($scope.selectItem);
        }


        /**
         * 修改租赁信息
         * @type {{}}
         */
        $scope.leasesToModify ={};
        $scope.getModifyLease = function(item){
            //初始化上传插件
            $("#zyupload").remove();
            $("#remove").append('<div id="zyupload" class="zyupload"></div>');
                //上传文件
            $scope.annex = {annexAddress:'',annexName:''};
            $(function(){
                // 初始化插件
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
                        $scope.annex = {annexAddress:'',annexName:''};
                        filePath=response;
                        $scope.annex.annexName = file.name;
                        $scope.annex.annexAddress = filePath;
                        $scope.leasesToModify.annexs=[];
                        $scope.leasesToModify.annexs.push($scope.annex);
                        console.log($scope.leasesToModify)
                        layer.msg("上传成功",{icon : 1,time : 2000});
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("上传失败",{icon : 1,time : 2000});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法

                    }
                });

            });


            $("#modifyLeases").modal({backdrop:'static',keyboard:false});
            $scope.leasesToModify = item;
            var startTime = $scope.leasesToModify.hireStartDate;
            var finishTime = $scope.leasesToModify.hireFinishDate;
            $scope.leasesToModify.hireStartDate = new Date(startTime);
            $scope.leasesToModify.hireFinishDate = new Date(finishTime);
        }

        $scope.getModifyLeaseForList= function () {
            if($scope.selectItem==null||$scope.selectItem==""){
                layer.alert('请选一项后再操作',{icon:2})
                return;
            }
            $scope.getModifyLease($scope.selectItem);
        }

        /**
         * 修改租赁信息
         * @type {{}}
         */
        $scope.modifyLease = function(){
            if($scope.leasesToModify.hireStartDate==null||$scope.leasesToModify.hireStartDate==''){
                layer.alert('您还没有选择租赁开始时间',{icon:2});
                return;
            }else if($scope.leasesToModify.hireFinishDate==null||$scope.leasesToModify.hireFinishDate==''){
                layer.alert('您还没有选择租赁开始时间',{icon:2});
                return;
            }
            console.log($scope.leasesToModify)
            $http.put(url+'/NewLease/updateNewLeaseRestful',{NewLease:$scope.leasesToModify}).success(function(){
                layer.msg('修改租赁信息成功！',{icon : 1});
            }).error(function(){
                layer.msg('修改租赁信息失败！',{icon : 3});
            });
            $scope.load();//刷新
            $("#modifyLeases").modal('hide');
        }

        /**
         * 将输入数字保留两位小数
         */
        $scope.formatRent = function(){
            var num = $("input[name=rent]").val();
            var val = $filter('number')(num,2);
            var val1 = val.replace(/,/g, "");
            //console.log(val1);
            $("input[name=rent]").val(val1);
        }

        //查看租赁信息
        $scope.showLeases= function (item) {
            $scope.leasesToModify=item;
            $('#showLeases').modal({backdrop:'static',keyboard:false});
        };
        //选中
        $scope.selected=function(item){
            $('table tr').css('background','#fff');
            var id=this.item.id;
            document.getElementById(id).style.background='#f6f8fa'
            $scope.selectItem=item;
        }


    }]);
});