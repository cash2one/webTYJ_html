/**
 * Created by NM on 2018/1/18.
 * 电表管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');
    //electricMeterAuditCtrl
    app.controller('electricMeterAuditCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.test='表';
        var url = $rootScope.url;
        var fileUrl = $rootScope.fileUrl;
        $scope.doClick(4);
        $scope.show1 = false;
        $scope.show2 = false;
        $scope.show3 = true;
        $scope.show4 = true;
        $scope.item2 = {};  //显示详情

        /**
         * 审核计划列表
         * @type {{page: {}}}
         */
        $scope.searchMeter = {page: {}};
        $scope.load = function () {
            var checkElectric= function (page, callback) {
                $scope.searchMeter.page = page;
                $http.post(url + '/ElectricityMeterReadingProgram/listMeterReadingResult',
                    {SearchMeter:$scope.searchMeter}).success(callback);
            };
            $scope.currentWater = app.get('Paginator').list(checkElectric, 5);
           /* var time = setInterval(function(){
                if($scope.currentWater.object!=null){
                    console.log($scope.currentWater.object.meterReadingProgram);
                    clearInterval(time)
                }
            },500);*/
            console.log("---审核计划列表-----");
            console.log($scope.currentWater);
            console.log("----审核计划列表----");
        };
        $scope.load();

        /**
         *双击显示审核计划列表详细
         * @param item 当前点击的行
         */
        $scope.showList = function (item) {
            $scope.show1 = true;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.item2 = item;
            //显示计划下抄表数据
            $scope.searchMeter1 = {page: {}};
            $scope.load1 = function () {
                var checkElectricitys = function (page, callback) {
                    $scope.searchMeter1.page = page;
                    $scope.searchMeter1.electricityMeterReadingProgramId = item.electricityMeterReadingProgramId;
                    $http.post(url + '/ElectricityMeterReadingData/listPageMeterRecoedDateList',
                        {ElectricityMeterReadingData: $scope.searchMeter1}).success(callback);
                };
                $scope.currentWaters = app.get('Paginator').list(checkElectricitys, 10);
                console.log("审核计划列表详细");
                console.log($scope.currentWaters);
                console.log("审核计划列表详细");
                var time1 = setInterval(function(){
                    if($scope.currentWaters.object!=null){
                        clearInterval(time1)
                    }
                },500);
            };
            $scope.load1();
        };

        /**
         * 返回按钮
         */
        $scope.back = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            $scope.show4 = true;
            $scope.load();
        };

        /**
         * 获取选中的对象
         * @param id
         */
        $scope.leasesArray = '';//选中项id集合
        var getAllChechedLeases = function () {
            $scope.leasesArray = '';//清空
            $("input[name='things']:checked").each(function () {
                $scope.leasesArray+=$(this).val()+',';
            });
            $scope.leasesArray=$scope.leasesArray.substr(0,$scope.leasesArray.length-1);
            console.log($scope.leasesArray);
        };

        /**
         * 里层的核实
         */
        $scope.addLeases = function () {
        getAllChechedLeases();
        if ($scope.leasesArray.length > 0) {
        layer.confirm("您确定审核通过吗？",
        {btn: ['确定', '取消']}, function () {
        $scope.check();
        $scope.load1();
        }
        );
        $("input[name='things']:checked").each(function () {//取消选中项
        $(this).attr("checked", false);
        })
        } else {
        layer.msg('您未选择核实项！', {icon: 0});
        }
        };

        /**
         * 核实的方法
         */
        $scope.check = function () {
            $http.post(url + '/ElectricityMeterReadingData/updateMeterChecked',$scope.leasesArray).success(function () {
                layer.msg('核实成功！', {icon: 1});
                $scope.load1();
            }).error(function () {
                layer.msg('核实失败！', {icon: 2});
            });
        };


        /**
         * 添加到重抄任务
         */
         $scope.addLeases1 = function () {
         getAllChechedLeases();
         if ($scope.leasesArray.length > 0) {
         layer.confirm("您确定添加到重抄任务？",
         {btn: ['确定', '取消']}, function () {
         $scope.addVerification();
         $scope.load1();
         }
         );
         $("input[name='things']:checked").each(function () {//取消选中项
         $(this).attr("checked", false);
         })
         } else {
         layer.msg('您未选择重抄项！', {icon: 0});
         }
         };

        /**
         * 添加重抄
         */
        $scope.addVerification = function () {
            $http.post(url + '/ElectricityMeterReadingData/updateMeterRecoed', $scope.leasesArray).success(function () {
                layer.msg('添加重抄成功！', {icon: 1});
                $scope.load1();
            }).error(function () {
                $scope.load1();
                layer.msg('添加重抄失败！', {icon: 2});
            });
        };

        /**
         * 修改读数
         * @type {{}}
         */
        $scope.leasesToModify = {};
        $scope.annex = {annexAddress:{},annexName:''}
        $scope.annexs = [];
        $scope.getModifyLease = function () {
            var filePath ='';
            getAllChechedLeases();
            if ($scope.leasesArray.split(',').length > 1) {
                layer.msg('修改时只能选择一项', {icon: 0});
                $scope.leasesToModify = {};
                $("input[name='things']:checked").each(function () {//取消选中项
                    $(this).attr("checked", false);
                });
            } else if ($scope.leasesArray.split(',').length == 1 && $scope.leasesArray.split(',')[0]!='') {
                $scope.changeReading = '1';
                $('#changeReading2').find('input[type=text]').attr('disabled','disabled');
                $('#changeReading3').find('input[type=text],textarea').attr('disabled','disabled');
                $scope.correct ={};

                $('#myModalEle').modal('show');
                $scope.leasesToModify = $scope.leasesArray;

                $("#zyupload").remove();
                $("#remove").append("<div id='zyupload' class='zyupload'></div>");
                $(function(){
                    // 初始化插件
                    $("#zyupload").zyUpload({
                        //width            :   "900px",                 // 宽度
                        //height           :   "400px",                 // 宽度
                        itemWidth        :   "140px",                 // 文件项的宽度
                        itemHeight       :   "115px",                 // 文件项的高度
                        url              :   fileUrl+"/FileService",  // 上传文件的路径
                        fileType         :   ["jpg","png","jpeg","gif"],// 上传文件的类型
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
                            $scope.annex.annexAddress=response;
                            $scope.annex.annexName=file.name;
                            $scope.annexs.push($.extend({},{},$scope.annex));
                        },
                        onFailure: function(file, response){          // 文件上传失败的回调方法
                        },
                        onComplete: function(response){           	  // 上传完成的回调方法
                        }
                    });
                });
            } else {
                layer.msg('您未选择修改项！', {icon: 0});
            }
        };

        /**
         * 修改读数 循环修正 修正读数 三者状态的切换
         */
        $scope.changeState = function(){
            if ($scope.changeReading=='1'){
                $('#changeReading1').find('input[type=text]').removeAttr('disabled');
                $('#changeReading2').find('input[type=text]').attr('disabled','disabled');
                $('#changeReading3').find('input[type=text],textarea').attr('disabled','disabled');
            }else if ($scope.changeReading=='2'){
                $('#changeReading2').find('input[type=text]').removeAttr('disabled');
                $('#changeReading1').find('input[type=text]').attr('disabled','disabled');
                $('#changeReading3').find('input[type=text],textarea').attr('disabled','disabled');

                var array=$scope.currentWaters.object.electricityMeterReadingData;
                if(array.length!=null){
                    for(var i = 0 ; i<array.length;i++){
                        if(array[i].electricityMeterReadingDataId == $scope.leasesToModify){
                            $http.get(url+'/ElectricityMeter/getElectricityMeterbyMeterRecordId/'+array[i].electricityMeterRecordId).success(function(data){
                                console.log("电表的信息");
                                console.log(data);
                                console.log("电表的信息");
                                $scope.loopNum = data.ElectricityMeter.max;
                            })
                        }
                    }
                }
            }else if ($scope.changeReading=='3'){
                $('#changeReading1').find('input[type=text]').attr('disabled','disabled');
                $('#changeReading2').find('input[type=text]').attr('disabled','disabled');
                $('#changeReading3').find('input[type=text],textarea').removeAttr('disabled');

                var array=$scope.currentWaters.object.electricityMeterReadingData;
                if(array.length!=null){
                    for(var i = 0 ; i<array.length;i++){
                        if(array[i].electricityMeterReadingDataId == $scope.leasesToModify){
                            $scope.correct = array[i];
                        }
                    }
                }
            }
        };

        /**
         *点击修正读数的确定按钮,进行读数的修改
         */
        $scope.updateWaterRead = function () {
            if($scope.changeReading==1) {
                var item ={electricityMeterReadingDataId:$scope.leasesToModify,reading:$scope.reading};
                $http.post(url + '/ElectricityMeterReadingData/setMeterReadingData', {ElectricityMeterReadingData: item}).success(function (data) {
                    $scope.load1()
                })
            }else if($scope.changeReading==2){
                var item ={electricityMeterReadingDataId:$scope.leasesToModify,loopNum:$scope.loopNum};
                $http.post(url + '/ElectricityMeterReadingData/setLoopNum', {ElectricityMeterReadingData: item}).success(function (data) {
                    $scope.load1()
                })
            }else if($scope.changeReading==3){
                $scope.correct.annexs=$scope.annexs;
                $http.post(url+'/CorrectedReading/addElectricityMeterCorrectRead',{CorrectedReading:$scope.correct}).success(function(data){
                    $scope.load1()
                })
            }
        };

        /**
         * 显示重抄任务下抄表数据
         */
        $scope.getModifyLease1 = function () {
            $scope.searchMeter2 = {page: {}};

            $scope.load2 = function () {
                var checkWaterss = function (page, callback) {
                    $scope.searchMeter2.page = page;
                    $http.post(url + '/ElectricityMeterReadingData/listPageMeterRecoedDateList2',
                        {ElectricityMeterReadingData: $scope.searchMeter2}).success(callback);
                };
                $scope.currentWaterss = app.get('Paginator').list(checkWaterss, 5);
                var time2 = setInterval(function(){
                    if($scope.currentWaterss.object!=null){
                        clearInterval(time2)
                    }
                },500);
                console.log("重抄任务列表");
                console.log($scope.currentWaterss);
                console.log("重抄任务列表");
            };
            $scope.load2();
        };

        /**
         * 全选
         */
        $scope.executeAll = function(){
            var inputs = $('#executeInput').find('input[type=checkbox]');
            if(inputs.length>getSelect().length){
                $(inputs).each(function(index,element){
                    element.checked = true;
                }).parent().parent().each(function(){
                    $(this).addClass('this_info');
                });
                $('#executeAll')[0].checked = true ;
            }else if((inputs.length=getSelect().length)){
                $(inputs).each(function(index,element){
                    element.checked = false;
                }).parent().parent().each(function(){
                    $(this).removeClass('this_info');
                });
                $('#executeAll')[0].checked = false ;
            }
        };

        /**
         *  获取选中数据
         * @returns {Array}
         */
        function getSelect (){
            var executeInput = $('#executeInput').find('input[type=checkbox]');
            var meterReadingDataIds = [];
            for(var i= 0;i<executeInput.length;i++){
                if(executeInput[i].checked){
                    meterReadingDataIds.push(executeInput[i].id);
                }
            }
            return meterReadingDataIds;
        }

        /**
         * 重抄任务模态框选中项的id
         * @type {string}
         */
        $scope.leasesArrayReject = '';
        var getAllCheckedLeasesReject= function () {
            $scope.leasesArrayReject = '';//清空
            $("input[name='things2']:checked").each(function () {
                $scope.leasesArrayReject+=$(this).val()+',';
            });
            $scope.leasesArrayReject=$scope.leasesArrayReject.substr(0,$scope.leasesArrayReject.length-1);
            console.log("选中的id");
            console.log($scope.leasesArrayReject);
            console.log("选中的id");
        };

        /**
         * 确定重抄任务
         * @constructor
         */
        $scope.Verification = function () {
            getAllCheckedLeasesReject();
            if ($scope.leasesArrayReject.length > 0) {
                layer.confirm("您确定要重抄该任务吗？",
                    {btn: ['确定', '取消']}, function () {
                        $scope.Verification1();
                        $scope.load1();
                    }
                );
                $("input[name='things2']:checked").each(function () {//取消选中项
                    $(this).attr("checked", false);
                })
            } else {
                layer.msg('您未选择重抄任务项！', {icon: 0});
            }
        };


        //服务请求测试
        $scope.searchElectricityMeters = {};
        $scope.serviceRequest = {listTasks:{}};
        //服务请求
        $scope.Verification1 = function () {
            $scope.searchElectricityMeters.listleasesArray = $scope.leasesArrayReject.split(",");
            $scope.searchElectricityMeters.listleasesArray1= [];
            $scope.searchElectricityMeters.listleasesArray2= [];
            for(var i=0;i<$scope.searchElectricityMeters.listleasesArray.length;i++) {
                $scope.searchElectricityMeters.listleasesArray1[i] = $scope.searchElectricityMeters.listleasesArray[i].substr(0, 36);
                $scope.searchElectricityMeters.listleasesArray2[i] = $scope.searchElectricityMeters.listleasesArray[i].substr(36);
            }
            $http.post(url + '/ElectricityMeterReadingData/updateVerification',{ElectricityMeterReadingData:$scope.searchElectricityMeters}).success(function () {
               /* $scope.serviceRequest.requestSource = '自动创建';
                $scope.serviceRequest.serviceRequestState = 0;//不需回访
                $scope.serviceRequest.serviceRequestName = '电表重抄任务服务请求';
                $scope.serviceRequest.serviceRequestType = '5'//电表
                $scope.serviceRequest.remarks = '电表重抄任务自动创建';//备注
                $scope.serviceRequest.directionType = 0;//外部服务请求
                $scope.serviceRequest.listTasks.taskType = 16;//任务类型
                $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                $scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
                $scope.serviceRequest.listTasks.addressIds = $scope.searchElectricityMeters.listleasesArray2;//地址id数组
                $scope.serviceRequest.listTasks.taskDescription = '创建电表重抄任务';//任务描述
                $scope.serviceRequest.listTasks.principal = '张三';//重抄任务抄表人
                //创建服务请求
                $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function () {
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$location.path("/index/serviceRequest/meterReadingServiceRequestManage");
                }).error(function (data, status, headers, config) {
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });*/


                /*$scope.serviceRequest.requestSource = '自动创建';
                $scope.serviceRequest.serviceRequestState = 0;//不需回访
                $scope.serviceRequest.serviceRequestName = '电表重抄任务服务请求';
                $scope.serviceRequest.serviceRequestType = '5'//电表
                $scope.serviceRequest.remarks = '电表重抄任务自动创建';//备注
                $scope.serviceRequest.directionType = 0;//外部服务请求
                $scope.serviceRequest.listTasks.taskType = 16;//任务类型
                $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                $scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
                $scope.serviceRequest.listTasks.addressIds = $scope.searchElectricityMeters.listleasesArray2;//地址id数组
                $scope.serviceRequest.listTasks.taskDescription = '创建电表重抄任务';//任务描述
                $scope.serviceRequest.listTasks.principal = '张三';//重抄任务抄表人
                //创建服务请求
                $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function () {
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$location.path("/index/serviceRequest/meterReadingServiceRequestManage");
                }).error(function (data, status, headers, config) {
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });*/
                layer.msg('重抄成功！', {icon: 1});
                $('#executeAll')[0].checked = false ;
                $scope.load1();
                $scope.load2();
            }).error(function () {
                layer.msg('重抄失败！', {icon: 2});
                $('#executeAll')[0].checked = false ;
                $scope.load1();
                $scope.load2();
            })
        };


        //驳回
        $scope.reject = function () {
            getAllCheckedLeasesReject();
            if ($scope.leasesArrayReject.length > 0) {
                layer.confirm("您确定要驳回该任务吗？",
                    {btn: ['确定', '取消']}, function () {
                        $scope.reject1();
                        $scope.load1();
                    }
                );
                $("input[name='things2']:checked").each(function () {//取消选中项
                    $(this).attr("checked", false);
                })
            } else {
                layer.msg('您未选择驳回项！', {icon: 0});
            }
        };
        $scope.reject1 = function () {
            $scope.searchMeters.listleasesArray = $scope.leasesArrayReject.split(",");
            $scope.searchMeters.listleasesArray1= [];
            $scope.searchMeters.listleasesArray2= [];
            for(var i=0;i<$scope.searchMeters.listleasesArray.length;i++) {
                $scope.searchMeters.listleasesArray1[i] = $scope.searchMeters.listleasesArray[i].substr(0, 36);
                $scope.searchMeters.listleasesArray2[i] = $scope.searchMeters.listleasesArray[i].substr(36);
            }
            $http.post(url + '/ElectricityMeterReadingData/updateMeterReject',{ElectricityMeterReadingData:$scope.searchMeters}).success(function () {
                $('#executeAll')[0].checked = false ;
                layer.msg('驳回成功！', {icon: 1});
                $scope.load2();
                $scope.load1();
            }).error(function () {
                $('#executeAll')[0].checked = false ;
                $scope.load2();
                $scope.load1();
                layer.msg('驳回失败！', {icon: 2});
            })
        };

        //外层选中项的id
        $scope.leasesArrayTop = '';
        var getAllChechedLeasesTop = function () {
            $scope.leasesArrayTop = '';//清空
            $("input[name='things1']:checked").each(function () {
                $scope.leasesArrayTop+=$(this).val()+',';
            });
            $scope.leasesArrayTop=$scope.leasesArrayTop.substr(0,$scope.leasesArrayTop.length-1);
            console.log("选中的数据");
            console.log($scope.leasesArrayTop);
            console.log("选中的数据");
        };

        /**
         * 最外层的核实按钮
         */
        $scope.addLeasesTop = function(){
            getAllChechedLeasesTop();
            if ($scope.leasesArrayTop.length > 0) {
                layer.confirm("您确定审核通过吗？",
                    {btn: ['确定', '取消']}, function () {
                        $scope.check1();
                        $scope.load();
                    }
                );
                $("input[name='things1']:checked").each(function () {//取消选中项
                    $(this).attr("checked", false);
                })
            } else {
                layer.msg('您未选择核实项！', {icon: 0});
            }
        };

        //最外层的核实
        $scope.check1 = function () {
            //var meterReadingProgramArray = $scope.currentWater.object.meterReadingProgram;
            $http.post(url + '/ElectricityMeterReadingProgram/selectMeterChecked',$scope.leasesArrayTop).success(function (data) {
                console.log("根据id查询出电表计划");
                $scope.meterReadingProgramArray = [];
                console.log(data);
                $scope.meterReadingProgramArray = data.ElectricityMeterReadingProgram
                console.log("-----");
                console.log( $scope.meterReadingProgramArray);
                console.log("根据id查询出电表计划");
                // var meterReadingProgramArray = $scope.currentWater.object.meterReadingProgram;
                for(var i=0;i< $scope.meterReadingProgramArray.length;i++){
                    console.log("错误表数"+ $scope.meterReadingProgramArray[i].meterReadingErrorNum);
                    console.log("异常表数"+ $scope.meterReadingProgramArray[i].meterReadingWarningNum);
                    console.log("未抄表数"+( $scope.meterReadingProgramArray[i].allNum- $scope.meterReadingProgramArray[i].meterReadingNum));
                    $scope.undoWaterNum = ( $scope.meterReadingProgramArray[i].allNum- $scope.meterReadingProgramArray[i].meterReadingNum);
                    //条件:未抄表数	,异常表数,错误表数都为0
                    if( $scope.meterReadingProgramArray[i].meterReadingErrorNum==0 &&  $scope.meterReadingProgramArray[i].meterReadingErrorNum==0 && $scope.undoWaterNum==0){
                        //把审核记录的状态修改为已核实
                        var arr = $scope.meterReadingProgramArray;
                        $scope.leasesArrayTop = '';//清空
                        for(i=0;i<arr.length;i++){
                            //console.log(arr[i].meterReadingDataId);
                            $scope.leasesArrayTop+=arr[i].electricityMeterReadingDataId+',';
                        }
                        $scope.leasesArrayTop=$scope.leasesArrayTop.substr(0,$scope.leasesArrayTop.length-1);
                        $http.post(url + '/ElectricityMeterReadingData/updateMeterChecked',$scope.leasesArrayTop).success(function () {
                            layer.msg('核实成功！', {icon: 1});
                        }).error(function () {
                            layer.msg('核实失败！', {icon: 2});
                        });
                        console.log("电表数据编号");
                        console.log($scope.leasesArrayTop);
                        console.log("电表数据编号");
                    }else{
                        layer.msg('核实失败！', {icon: 2});
                    }
                }

            }).error(function () {
            });
        };



        /**
         * 选中一条数据事件
         * @param index  电表抄表计划数据id
         */
       /*  $scope.checks = function (index) {
         var checkbox = $('#'+index.electricityMeterReadingDataId)[0];
         var tr = $(checkbox).parent().parent()[0];
         $(tr).toggleClass('this_info');
         checkbox.checked = $(tr).hasClass('this_info');
         $scope.item2 = index;
         };*/
    }]);
});