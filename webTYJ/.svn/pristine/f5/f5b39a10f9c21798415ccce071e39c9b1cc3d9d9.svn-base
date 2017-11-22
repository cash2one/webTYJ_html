/**
 * Created by Administrator on 2015/12/15.
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');
    app.controller('auditCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
        var url = $rootScope.url;
        var fileUrl = $rootScope.fileUrl;
        $scope.doClick(4);
        $scope.show1 = false;
        $scope.show2 = false;
        $scope.show3 = true;
        $scope.show4 = true;
        //显示详情
        $scope.item2 = {};
        $scope.showList = function (item) {
            $scope.show1 = true;
            $scope.show2 = true;
            $scope.show3 = false;
            $scope.show4 = false;
            $scope.item2 = item;
            //显示计划下抄表数据
            $scope.searchMeter1 = {page: {}};
            $scope.load1 = function () {
                var checkWaters = function (page, callback) {
                    $scope.searchMeter1.page = page;
                    $scope.searchMeter1.meterReadingProgramId = item.meterReadingProgramId;
                    //$http.post(url + '/MeterReadingProgram/listPageMeterReadingProgramById', {MeterReadingProgram: $scope.searchMeter1}).success(callback);
                    $http.post(url + '/MeterReadingData/listPageMeterRecoedDateList',
                        {MeterReadingData: $scope.searchMeter1}).success(callback);
                };
                $scope.currentWaters = app.get('Paginator').list(checkWaters, 10);
                var time1 = setInterval(function(){
                    if($scope.currentWaters.object!=null){
                        console.log($scope.currentWaters.object.meterReadingData);
                        clearInterval(time1)
                    }
                },500);
               /* console.log($scope.currentWaters);
                console.log($scope.currentWaters.object.meterReadingData);*/
            };
            $scope.load1();
        };
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
        $scope.addLeases1 = function () {
            //alert("winPhone");
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

                $('#myModal1').modal('show');
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

        $scope.changeState = function(){
          if ($scope.changeReading=='1'){
              $('#changeReading1').find('input[type=text]').removeAttr('disabled');
              $('#changeReading2').find('input[type=text]').attr('disabled','disabled');
              $('#changeReading3').find('input[type=text],textarea').attr('disabled','disabled');
          }else if ($scope.changeReading=='2'){
              $('#changeReading2').find('input[type=text]').removeAttr('disabled');
              $('#changeReading1').find('input[type=text]').attr('disabled','disabled');
              $('#changeReading3').find('input[type=text],textarea').attr('disabled','disabled');

              var array=$scope.currentWaters.object.meterReadingData;
              if(array.length!=null){
                  for(var i = 0 ; i<array.length;i++){
                      if(array[i].meterReadingDataId == $scope.leasesToModify){
                          $http.get(url+'/WaterMeter/getWaterMeterbyWaterMeterRecordId/'+array[i].waterMeterRecordId).success(function(data){
                              $scope.loopNum = data.WaterMeter.max;
                          })
                      }
                  }
              }
          }else if ($scope.changeReading=='3'){
              $('#changeReading1').find('input[type=text]').attr('disabled','disabled');
              $('#changeReading2').find('input[type=text]').attr('disabled','disabled');
              $('#changeReading3').find('input[type=text],textarea').removeAttr('disabled');

              var array=$scope.currentWaters.object.meterReadingData;
              if(array.length!=null){
                  for(var i = 0 ; i<array.length;i++){
                      if(array[i].meterReadingDataId == $scope.leasesToModify){
                          $scope.correct = array[i];
                      }
                  }
              }
          }

        };

        //核实
        $scope.check = function () {
            $http.post(url + '/MeterReadingData/updateMeterChecked',$scope.leasesArray).success(function () {
                layer.msg('核实成功！', {icon: 1});
            }).error(function () {
                layer.msg('核实失败！', {icon: 2});
            });
        };
        //添加重抄
        $scope.addVerification = function () {
           /* var meterReadingDataArray = $scope.currentWaters.object.meterReadingData;
            console.log("111111111111111111111111222222222222");
            console.log(meterReadingDataArray);
            console.log("111111111111111111111111222222222222");
            console.log(meterReadingDataArray[1]);
            console.log("111111111111111111111111222222222222");
            console.log(meterReadingDataArray[1].verificationRecord);
            console.log("111111111111111111111111222222222222");
            for(var i=1;i<meterReadingDataArray.length;i++)
            {
                if (meterReadingDataArray[i].verificationRecord == 3) {
                    layer.msg('不能添加已重抄的任务！', {icon: 0});
                    break;
                }
                else if (meterReadingDataArray[i].verificationRecord == 2) {
                    layer.msg('不能添加待重抄的任务！', {icon: 0});
                    break;
                }
                else {
                       }
                }*/
                $http.post(url + '/MeterReadingData/updateMeterRecoed', $scope.leasesArray).success(function () {
                    layer.msg('添加重抄成功！', {icon: 1});
                    $scope.load1();
                }).error(function () {
                    $scope.load1();
                    layer.msg('添加重抄失败！', {icon: 2});
                });
        };
        //重抄任务

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


     /*   $scope.searchMeters = {};
        $scope.Verification1 = function () {
                   $scope.searchMeters.listleasesArray = $scope.leasesArrayReject.split(",");
        $scope.searchMeters.listleasesArray1= [];
        $scope.searchMeters.listleasesArray2= [];
        for(var i=0;i<$scope.searchMeters.listleasesArray.length;i++) {
        $scope.searchMeters.listleasesArray1[i] = $scope.searchMeters.listleasesArray[i].substr(0, 36);
        $scope.searchMeters.listleasesArray2[i] = $scope.searchMeters.listleasesArray[i].substr(36);
        }
        $http.post(url + '/MeterReadingData/updateVerification',{MeterReadingData:$scope.searchMeters}).success(function () {

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

        };*/

        //服务请求测试
        $scope.searchMeters = {};
        $scope.serviceRequest = {listTasks:{}};
        //服务请求
        $scope.Verification1 = function () {
            $scope.searchMeters.listleasesArray = $scope.leasesArrayReject.split(",");
            $scope.searchMeters.listleasesArray1= [];
            $scope.searchMeters.listleasesArray2= [];
            for(var i=0;i<$scope.searchMeters.listleasesArray.length;i++) {
                $scope.searchMeters.listleasesArray1[i] = $scope.searchMeters.listleasesArray[i].substr(0, 36);
                $scope.searchMeters.listleasesArray2[i] = $scope.searchMeters.listleasesArray[i].substr(36);
            }
            $http.post(url + '/MeterReadingData/updateVerification',{MeterReadingData:$scope.searchMeters}).success(function () {
                $scope.serviceRequest.requestSource = '自动创建';
                $scope.serviceRequest.serviceRequestState = 0;//不需回访
                $scope.serviceRequest.serviceRequestName = '水表重抄任务服务请求';
                $scope.serviceRequest.serviceRequestType = '5'//水表
                $scope.serviceRequest.remarks = '水表重抄任务自动创建';//备注
                $scope.serviceRequest.directionType = 0;//外部服务请求
                $scope.serviceRequest.listTasks.taskType = 16;//任务类型
                $scope.serviceRequest.listTasks.taskState = '4';//任务状态
                $scope.serviceRequest.listTasks.estimatedTime = new Date((new Date()/1000+86400)*1000);//预计完成时间7天以后
                $scope.serviceRequest.listTasks.addressIds = $scope.searchMeters.listleasesArray2;//地址id数组
                $scope.serviceRequest.listTasks.taskDescription = '创建水表重抄任务';//任务描述
                $scope.serviceRequest.listTasks.principal = '张三';//重抄任务抄表人
                //创建服务请求
                $http.post(url + '/ServiceRequest/insertServiceRequestRestful', {ServiceRequest: $scope.serviceRequest}).success(function () {
                    layer.msg('提交成功',{icon : 1,time : 2000});
                    //$location.path("/index/serviceRequest/meterReadingServiceRequestManage");
                }).error(function (data, status, headers, config) {
                    layer.msg("提交失败",{icon : 2,time : 2000});
                });
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

        //显示重抄任务下抄表数据
        $scope.getModifyLease1 = function () {
            $scope.searchMeter2 = {page: {}};

            $scope.load2 = function () {
                var checkWaterss = function (page, callback) {
                    $scope.searchMeter2.page = page;
                    //$http.post(url + '/MeterReadingProgram/listPageMeterReadingProgramById', {MeterReadingProgram: $scope.searchMeter1}).success(callback);
                    $http.post(url + '/MeterReadingData/listPageMeterRecoedDateList2',
                        {MeterReadingData: $scope.searchMeter2}).success(callback);
                };
                $scope.currentWaterss = app.get('Paginator').list(checkWaterss, 5);
                var time2 = setInterval(function(){
                    if($scope.currentWaterss.object!=null){
                        console.log($scope.currentWaterss.object.meterReadingData);
                        clearInterval(time2)
                    }
                },500);
                /*console.log($scope.currentWaters);
                 console.log($scope.currentWaters.object.meterReadingData);*/
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
         * 选中一条数据事件
         * @param index  水表抄表计划数据id
         */
        $scope.checks = function (index) {
            var checkbox = $('#'+index.meterReadingDataId)[0];
            var tr = $(checkbox).parent().parent()[0];
            $(tr).toggleClass('this_info');
            checkbox.checked = $(tr).hasClass('this_info');
            $scope.item2 = index;
        };
        /**
         * 获取选中数据
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
        //重抄任务模态框选中项id集合
        $scope.leasesArrayReject = '';
        var getAllCheckedLeasesReject= function () {
            $scope.leasesArrayReject = '';//清空
            $("input[name='things2']:checked").each(function () {
                $scope.leasesArrayReject+=$(this).val()+',';
            });
            $scope.leasesArrayReject=$scope.leasesArrayReject.substr(0,$scope.leasesArrayReject.length-1);
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
                $http.post(url + '/MeterReadingData/updateMeterReject',{MeterReadingData:$scope.searchMeters}).success(function () {
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
        //修正读数
        $scope.updateWaterRead = function () {
            if($scope.changeReading==1) {
                var item ={meterReadingDataId:$scope.leasesToModify,reading:$scope.reading};
                $http.post(url + '/MeterReadingData/setMeterReadingData', {MeterReadingData: item}).success(function (data) {
                    $scope.load1()
                })
            }else if($scope.changeReading==2){
                var item ={meterReadingDataId:$scope.leasesToModify,loopNum:$scope.loopNum};
                $http.post(url + '/MeterReadingData/setLoopNum', {MeterReadingData: item}).success(function (data) {
                    $scope.load1()
                })
            }else if($scope.changeReading==3){
                $scope.correct.annexs=$scope.annexs;
                $http.post(url+'/CorrectedReading/addCorrectRead',{CorrectedReading:$scope.correct}).success(function(data){
                    $scope.load1()
                })

            }
            /*$http.put(url + '/MeterReadingData/updateMeter/' + $scope.item2.meterReadingDataId).success(function () {
                layer.msg('成功！', {icon: 1});

            }).error(function () {
                layer.msg('失败！', {icon: 2});
            });*/
        };
        $scope.leasesArrayTop = '';//外层选中项id集合
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
        //******************最外层的核实按钮**************************//
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
            $http.post(url + '/MeterReadingProgram/selectMeterChecked',$scope.leasesArrayTop).success(function (data) {
                console.log("根据id查询出水表计划");
                $scope.meterReadingProgramArray =[];
                console.log(data);
                $scope.meterReadingProgramArray = data.MeterReadingProgram
                console.log("-----");
                console.log( $scope.meterReadingProgramArray);
                console.log("根据id查询出水表计划");
                var flag = 0;
                // var meterReadingProgramArray = $scope.currentWater.object.meterReadingProgram;
                for(var j=0;j< $scope.meterReadingProgramArray.length;j++){
                    var z=0;
                    if(($scope.meterReadingProgramArray[j].allNum- $scope.meterReadingProgramArray[j].meterReadingNum)>0 || $scope.meterReadingProgramArray[j].meterReadingErrorNum>0
                       || $scope.meterReadingProgramArray[j].meterReadingWarningNum>0
                    )
                    {
                        flag = 1;
                    }
                }
                if(flag == 1){
                    layer.msg('核实失败！', {icon: 2});
                }
                if(flag == 0){
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
                                $scope.leasesArrayTop+=arr[i].meterReadingDataId+',';
                            }
                            $scope.leasesArrayTop=$scope.leasesArrayTop.substr(0,$scope.leasesArrayTop.length-1);

                            $http.post(url + '/MeterReadingData/updateMeterChecked',$scope.leasesArrayTop).success(function () {
                                layer.msg('核实成功！', {icon: 1});
                            }).error(function () {
                                layer.msg('核实失败！', {icon: 2});
                            });
                            console.log("水表数据编号");
                            console.log($scope.leasesArrayTop);
                            console.log("水表数据编号");
                            /*$http.get(url + '/MeterReadingData/listAllMeterReadingData').success(function (data) {
                             console.log("水表的数据表");
                             console.log(data.MeterReadingData);
                             console.log("水表的数据表");
                             var arr = data.MeterReadingData;
                             $scope.leasesArrayTop = '';//清空
                             for(i=0;i<arr.length;i++){
                             //console.log(arr[i].meterReadingDataId);
                             $scope.leasesArrayTop+=arr[i].meterReadingDataId+',';
                             }
                             $scope.leasesArrayTop=$scope.leasesArrayTop.substr(0,$scope.leasesArrayTop.length-1);

                             $http.post(url + '/MeterReadingData/updateMeterChecked',$scope.leasesArrayTop).success(function () {
                             layer.msg('核实成功！', {icon: 1});
                             }).error(function () {
                             layer.msg('核实失败！', {icon: 2});
                             });
                             console.log($scope.leasesArrayTop);
                             }).error(function () {
                             });*/
                        }else{
                            layer.msg('核实失败！', {icon: 2});
                        }
                    }
                }


            }).error(function () {
            });
           // var meterReadingProgramArray = $scope.currentWater.object.meterReadingProgram;
            console.log("测试");
            console.log( $scope.meterReadingProgramArray);
            console.log("测试");
        };


        //******************审核计划**************************//
        $scope.searchMeter = {page: {}};
        $scope.load = function () {
            var checkWater = function (page, callback) {
                $scope.searchMeter.page = page;
                //$http.post(url + '/MeterReadingProgram/listPageMeterReadingProgramAll', {MeterReadingProgram: $scope.searchMeter}).success(callback);
                $http.post(url + '/MeterReadingProgram/listMeterReadingResult',
                    {SearchMeter:$scope.searchMeter}).success(callback);
            };
            $scope.currentWater = app.get('Paginator').list(checkWater, 5);
            var time = setInterval(function(){
                if($scope.currentWater.object!=null){
                    console.log($scope.currentWater.object.meterReadingProgram);
                    clearInterval(time)
                }
            },500);
            console.log("--------");
           console.log($scope.currentWater);
            console.log("--------");
           //console.log($scope.currentWater.object.meterReadingProgram);
        };
        $scope.load();
    }]);
});