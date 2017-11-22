/**
 * Created by NM on 2018/1/18.
 * 金融联银行托收js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('financeCollectionCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.show1 = true;//银行托收页面
        $scope.show6 = true;//银行托收页面
        $scope.show4 = false;//新建托收页面

        $scope.show2 = false;//回盘导入确认页面
        $scope.show3 = false;//托收回盘成功历史记录
        $scope.show5 = true;//托收中列表

        $scope.btnIndex0=1;
        $scope.financialGroupTotal=[];//新建托收总结文件
        $scope.fcTotal={page:{}};//回盘总结
        $scope.financialCounterofferTotal={page:{}};//回盘总结
        $scope.financialCounterofferDetail={page:{}};//回盘明细
        $scope.fgtId="";//托收总结ID
        $scope.batchNumber="";//批次号
        var project = sessionStorage.getItem("_project");
        $scope.project = JSON.parse(project);
        var projectId = $scope.project.projectId;
        $scope.projectName=$scope.project.projectName;

        //陈雪修改之后的时间判断
      $scope.dateCheck= function (tobankDate,deductionsDate) {
            if(tobankDate!=null&&tobankDate!=''
                &&deductionsDate!=null&&deductionsDate!=''){
                if(tobankDate>deductionsDate){
                    //layer.msg('开始时间不能大于结束时间',{icon:0});
                    //陈雪修改之后的弹出框
                    layer.msg('开始时间不能大于结束时间',{icon:0,time:1000});
                    return false;
                }
            }
            return true;
        }

        /**
         * 根据条件分页查询托收总结文件
         */
        $scope.financial={page:{}};
        $scope.getTotals=function(collectionType){
            if(!$scope.dateCheck($scope.financial.tobankDate, $scope.financial.deductionsDate )){
                return;
            }
            var fetchFunction=function(page,callback){
                $scope.financial.page=page;
                $scope.financial.projectId = projectId;
                $http.post(url + '/FinancialGroupTotal/listPageFinancial', {FinancialGroupTotal:$scope.financial}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);

            $http.post(url + '/FinancialGroupTotal/listPageFinancial', {FinancialGroupTotal:$scope.financial}).success(function(data){
                var fgt = data.PageRestful.financialGroupTotals[1];
                if(fgt != null){
                    $scope.getDatils(data.PageRestful.financialGroupTotals[1].financialGroupTotalId);
                }else{
                    $scope.getDatils("0");
                }
            });
        };

        $scope.getTotals(0);

        //根据总结文件查询明细文件
        $scope.getDatils=function(id){
            $scope.financialDetail={page:{}};//托收明细
            $scope.btnIndex=id;
            var fetchDetail=function(page,callback){
                $scope.financialDetail.page=page;
                $scope.financialDetail.financialGroupTotalId=id;
                $http.post(url + '/FinancialGroupDetail/listPageFinancialGroupDetail', {FinancialGroupDetail:$scope.financialDetail}).success(callback);
            };
            $scope.searchPaginatorDetail=app.get('Paginator').list(fetchDetail,6);
        };
        //判断checkbx是否选中
        $scope.d=false;
        $scope.getAllChecks=function(item){
            var chk = document.getElementsByName("addDatas");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.accountRecord=item;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                }
            }
        };

        /**
         * 根据条件分页查询已回盘总结文件
         */
        $scope.getOfferFinancialTotals=function(collectionType){
            if(!$scope.dateCheck($scope.fcTotal.tobankDate,$scope.fcTotal.deductionsDate )){
                return;
            }
            $scope.fcTotal.offerState=1;
            var fetchFunction=function(page,callback){
                $scope.fcTotal.page=page;
                $scope.fcTotal.projectId = projectId;
                $http.post(url + '/FinancialCounterofferTotal/listPageFinancialCounterofferTotal', {FinancialCounterofferTotal:$scope.fcTotal}).success(callback);
            };
            $scope.searchOfferPaginator=app.get('Paginator').list(fetchFunction,6);

            $http.post(url + '/FinancialCounterofferTotal/listPageFinancialCounterofferTotal', {FinancialCounterofferTotal:$scope.fcTotal}).success(function(data){
                var fgt = data.PageRestful.financialCounterofferTotals[1];
                if(fgt != null){
                    $scope.getDatilsOffer(data.PageRestful.financialCounterofferTotals[1].financialCounterofferTotalId);
                }else{
                    $scope.getDatilsOffer("0");
                }
            });
        };

        //根据总结文件查询明细文件
        $scope.offerfinancialDetail={page:{}};
        $scope.getDatilsOffer=function(id){
            $scope.btnIndex=id;
            var fetchDetail=function(page,callback){
                $scope.offerfinancialDetail.page=page;
                $scope.offerfinancialDetail.financialCounterofferTotalId=id;
                $http.post( url + '/FinancialCounterofferDetail/listPageFinancialCounterofferDetail', {FinancialCounterofferDetail:$scope.offerfinancialDetail}).success(callback);
            };
            $scope.searchOfferPaginatorDetail=app.get('Paginator').list(fetchDetail,6);
        };

        /**
         * 导出数据到txt文件
         * */
        $scope.exportToTxt=function(){
            if($scope.d==false){
                layer.msg("请先选择导出项 ",{icon:0,time:1000});
            }else if($scope.d==true) {
                layer.confirm("是否导出总结文件？",
                    {btn : ['是','否']},function(){
                        if(angular.isUndefined($scope.accountRecord)){
                            layer.msg("请选择要导出的文件 ",{icon:0,time:1000});
                            return;
                        }
                        window.location.href=fileUrl +"/info/exportFTotalFileTxt.do?financialGroupTotalId="+$scope.accountRecord.financialGroupTotalId;
                        layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                        layer.confirm("是否导出明细文件？",
                            {btn : ['是','否']},function(){
                                window.location.href=fileUrl +"/info/exportFDetailFileTxt.do?financialGroupTotalId="+$scope.accountRecord.financialGroupTotalId;
                                layer.msg("导出明细文件成功 ",{icon:1,time:1000});
                            })
                    })
            }
        };
        /**
         * 新建托收生成提出文件
         * 毛高飞
         * 2016-6-03
         */
        $scope.exportToNewTxt=function(){
            if(angular.isUndefined($scope.fgtId)||$scope.fgtId == null){
                layer.msg("未生成托收记录 ",{icon:0,time:1000});
                return;
            }
            layer.confirm("是否导出总结文件？",
                {btn : ['是','否']},function(){
                    window.location.href=fileUrl +"/info/exportTotalFileTxt.do?financialGroupTotalId="+$scope.fgtId;
                    layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                    layer.confirm("是否导出明细文件？",
                        {btn : ['是','否']},function(){
                            window.location.href=fileUrl +"/info/exportDetailFileTxt.do?financialGroupTotalId="+$scope.fgtId;
                            layer.msg("导出明细文件成功 ",{icon:1,time:1000});
                            $scope.finance();
                        })
                })
        };
        /**
         * maogaofei
         * 2016-06-06
         * 根据总结文件查询明细
         * @param id
         */
        $scope.getDatilsByTotalId=function(id){
            $scope.flDetail={};
            if(id != null){
                $scope.btnIndex=id;
                var fetchDetail=function(page,callback){
                    $scope.flDetail.page=page;
                    $scope.flDetail.financialGroupTotalId=id;
                    $http.post( url + '/FinancialGroupDetail/listPageFinancialGroupDetail', {FinancialGroupDetail:$scope.flDetail}).success(callback);
                };
                $scope.searchPaginatorDetailNew=app.get('Paginator').list(fetchDetail,6);
            }
        };
        /**
         * 新建托收
         * 毛高飞
         * 2016-5-30
         */
        $scope.createCollection = function(){
            $http.get(url + '/FinancialGroupTotal/createCollection/'+projectId).success(function(data) {
                $scope.financialGroupTotal=data;
                $scope.fgtId = data.FinancialGroupTotal.financialGroupTotalId;
                if($scope.fgtId == null){
                   layer.msg(data.FinancialGroupTotal.fileNames,{icon:0,time:1000});
                }else{
                   $scope.searchPaginatorDetailNew=[];
                   $scope.getDatilsByTotalId($scope.fgtId);
                   $scope.show4=true;
                   $scope.show5=false;
                   $scope.show6=false;
                }
            });
        };
        /**
         * 取消托收
         * 毛高飞
         * 2016-5-30
         */
        $scope.cancelCollection = function(){
            $http.get(url + '/FinancialGroupTotal/deleteFinancialGroupTotal/'+$scope.fgtId).success(function(data) {});
            $scope.show4=false;
            $scope.show5=true;
            $scope.show6=true;
        };

        /**
         * 导入总结文件
         */
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var fileTotalPath='';          //上传文件的路径
        $scope.filePath="";
        $scope.fTotal={page:{}};
        $scope.importTxt = function(){
            $scope.show3=false;
            $scope.show2=true;
            $scope.filePath="";
            $scope.fileState="1";
            $scope.totalFCTotal={};
            $scope.searchPaginatorOffer = {};
            $scope.searchPaginatorDetailOffer={};
            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload").zyUpload({
                    width            :   "550px",                 // 宽度
                    height           :   "auto",                 // 宽度
                    itemWidth        :   "140px",                 // 文件项的宽度
                    itemHeight       :   "115px",                 // 文件项的高度
                    url              :   fileUrl+"/FinancialFileService",  // 上传文件的路径
                    fileType         :   ["T10","T20"],// 上传文件的类型
                    fileSize         :   51200000,                // 上传文件的大小
                    multiple         :   true,                    // 是否可以多个文件上传
                    dragDrop         :   true,                    // 是否可以拖动上传文件
                    tailor           :   true,                    // 是否可以裁剪图片
                    del              :   true,                    // 是否可以删除文件
                    finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                    /* 外部获得的回调接口 */
                    onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                        //console.info(selectFiles);
                    },
                    onDelete: function(file, files){
                        //console.info(file.name);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        $scope.filePath = $scope.filePath+response+",";
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        layer.msg("此文件上传失败!",{icon:0});
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });

            });
        };
        /**
         *确认导入
         */
        $scope.leading = function(){
            layer.confirm('是否确认导入？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                $scope.leadingFinancial={page:{}};
                $scope.leadingFinancial.batchNumber = $scope.batchNumber;
                $scope.leadingFinancial.projectId = projectId;
                $http.post( url + '/FinancialGroupTotal/confirmImport', {FinancialGroupTotal: $scope.leadingFinancial}).success(function(data){
                    layer.msg(data.Info.info.$,{icon:1,time:1000});
                    $scope.show1 = false;
                    $scope.show2 = false;
                    $scope.show3= true;
                    $scope.searchPaginatorOffer=[];
                    $scope.searchPaginatorDetailOffer=[];
                    $scope.unionPay();
                    $scope.getOfferFinancialTotals(0);//从新查询总文件
                }).error(function(){
                    layer.msg("操作失败!",{icon:2,time:1000});
                });
            }, function(){

            });
        };
        /**
         * 根据条件分页查询回盘总结文件
         */
        $scope.getOfferTotals=function(batchNumber){
            $scope.financialCounterofferTotal={};
            $scope.financialCounterofferTotal.batchNumber=batchNumber;
            var fetchFunction=function(page,callback){
                $scope.financialCounterofferTotal.page=page;
                $scope.financialCounterofferTotal.offerState=0;
                $http.post(url + '/FinancialCounterofferTotal/listPageFinancialCounterofferTotal', {FinancialCounterofferTotal:$scope.financialCounterofferTotal}).success(callback);
            };
            $scope.searchPaginatorOffer=app.get('Paginator').list(fetchFunction,6);

            $http.post(url + '/FinancialCounterofferTotal/getTotalFinancialCounterofferTotals', {FinancialCounterofferTotal:$scope.financialCounterofferTotal}).success(function(data){
                $scope.totalFCTotal = data.FinancialCounterofferTotal;
            });

            $http.post(url + '/FinancialCounterofferTotal/listPageFinancialCounterofferTotal', {FinancialCounterofferTotal:$scope.financialCounterofferTotal}).success(function(data){
                var fgt = data.PageRestful.financialCounterofferTotals[1];
                if(fgt != null){
                    $scope.getOfferDatils(data.PageRestful.financialCounterofferTotals[1].financialCounterofferTotalId);
                }
            });
        };
        /**
         * maogaofei 2016-06-08
         * 根据回盘总结文件ID查询回盘明细文件
         * @param id
         */
        $scope.getOfferDatils=function(id){
            $scope.financialCounterofferDetail = {};
            $scope.btnIndex=id;
            var fetchDetail=function(page,callback){
                $scope.financialCounterofferDetail.page=page;
                $scope.financialCounterofferDetail.financialCounterofferTotalId=id;
                $http.post( url + '/FinancialCounterofferDetail/listPageFinancialCounterofferDetail', {FinancialCounterofferDetail:$scope.financialCounterofferDetail}).success(callback);
            };
            $scope.searchPaginatorDetailOffer=app.get('Paginator').list(fetchDetail,6);
        };

        /**
         * maogaofei
         * 2016-06-06
         * 导入确认
         */
        $scope.confirmImport = function(){
            $scope.confirmImportFinancial = {};
            $scope.confirmImportFinancial.fileNames = $scope.filePath;
            $scope.confirmImportFinancial.projectId = projectId;
            $http.post( url + '/FinancialGroupTotal/importFinancialFile', {FinancialGroupTotal: $scope.confirmImportFinancial}).success(function(data){
                if(angular.equals(data.Info.state,201)){
                    layer.alert(data.Info.info.$,{icon:0});
                    $scope.unionPay();
                }else{
                    layer.alert(data.Info.info.$,{icon:1,time:1000});
                    $scope.batchNumber=data.Info.code;
                    if(!angular.isUndefined($scope.batchNumber)){
                        $scope.getOfferTotals($scope.batchNumber);
                    }
                }
            });
        }
        //取消导入
        $scope.cancel=function(){
            $scope.show2=false;
            $scope.show3=true;
            $scope.clearAll();
        }


        /**
         * 显示新建方案
         */
        $scope.finance=function(){
            $scope.btnIndex='';
            $scope.btnIndex0=1;
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.show4=false;
            $scope.show5=true;
            $scope.show6=true;
            $scope.getTotals(0);
        };

        $scope.unionPay=function(){
            $scope.btnIndex='';
            $scope.btnIndex0=2;
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            /*$scope.clearAll();*/
            $scope.getOfferFinancialTotals(0);
        };

        //清空数据
        $scope.clearAll=function(){
            $scope.financialGroupTotal=[];
            $scope.searchPaginatorOffer=[];//回盘导入总结文件
            $scope.searchPaginatorDetailOffer=[];//回盘导入明细
            $scope.searchPaginatorDetailNew=[];//新建托收明细
            $scope.searchPaginator=[];//托收总结;
            $scope.searchPaginatorDetail=[];//托收明细
        }
    }]);
});

