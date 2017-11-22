/**
 * Created by NM on 2018/1/18.
 * 规章制度
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('institutionCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var filePath='';
        var fileUrl=$rootScope.fileUrl;             //上传的文件路径
        $scope.annex={
            annexAddress:'',
            annexName:'',
            relationId:''
        };
        //临时对象（ps:存储图片）
        $scope.tempObj = {annexs:[]};
        //分页查询规章制度
        //$scope.showDate=new Date();//用于显示当前时间
        //    $scope.Rules.page=page;
        //$http.post(url + '/Rules/listPageRules', {Rules:$scope.Rules}).success(function (data) {
        //    $scope.currentItem2 = data.Lost;
        //    $scope.totalPage2 = Math.ceil($scope.currentItem2.length / $scope.showCount);
        //    $scope.page2();
        //    console.log($scope.currentItem2);
        //}).error(function (data, status, headers, config) {
        //    alert('获取记录失败');
        //});

        //选择规章制度
        $scope.ruleone={};
        $scope.choiceRule=function(rule){
            $scope.ruleone=rule;
            console.log($scope.ruleone);
        };

        //修改选定的规章制度
        $scope.updateRule=function(){
            $http.put(url+'/Rules/UpdateRules',{Rules:$scope.ruleone}).success(function() {
                console.log("修改规章成功");
            }).error(function(data, status, headers, config){
                console.log("修改规章失败");
            }) ;
        };

        //删除选择的规章制度
        //$scope.delrul=function(id){
        //    $http.post(url+'/Rules/DeleteRulesById/'+id).success(function() {
        //        console.log("删除成功");
        //        $("#myModales").modal("show");
        //        $http.get(url + '/Rules/listAllRules').success(function(data) {
        //            console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
        //            console.log(data);
        //            $scope.rulesList=data.Rules;
        //            console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
        //            console.log($scope.rulesList);
        //        }).error(function(data, status, headers, config){
        //            console.log("加载失败");
        //        }) ;
        //    }).error(function(data, status, headers, config){
        //        console.log("删除失败");
        //    }) ;
        //};

        //新增规章制度
        $scope.rul={};
        $scope.rul = {annexs:[]};
        $scope.rul.annexs=[];
        $scope.addRule=function(){
            if($scope.rul.title==""||$scope.rul.title==undefined){
                layer.msg('标题不能为空！',{icon:0,time:2000});
                return;
            }
            $scope.rul.lastModtime = $scope.rul.createTime;
            $http.post(url+'/Rules/AddRules',{Rules:$scope.rul}).success(function() {
                $scope.load();
                layer.msg('添加成功！',{icon :1,time : 1000});
            }).error(function(data, status, headers, config){
                layer.msg('添加失败！',{icon :0,time : 1000});
            });
            $scope.rul={};
            $scope.rul.annexs=[];
        };

        $scope.clearRulesData= function () {
            $scope.rul={};
            $scope.rul.annexs=[];
        };

        //查询所有规章制度
        $scope.rules={};
        $scope.currentItem2 = [];
        $http.get(url + '/Rules/listAllsRules').success(function(data) {
            $scope.currentItem2 = data.Rules;
            console.log($scope.currentItem2);
            //$scope.totalPage2 = Math.ceil($scope.currentItem2.length / $scope.showCount2);
            //$scope.page2();
            console.log($scope.currentItem2);
        }).error(function(data, status, headers, config){
            layer.msg('查询失败！',{icon :0,time : 1000});
        });
        //根据id查询相应的信息
        $scope.rulesA={};
        $scope.getRules=function(id){
            console.log(id);
            $http.get(url + '/Rules/getRulesById/'+id).success(function(data){
                $scope.rulesA=data.Rules;
                console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
                console.log( $scope.rulesA);
            }).error(function(data, status, headers, config){
                layer.msg('查询失败！',{icon :0,time : 1000});
            }) ;
        }

        $scope.addRul=function(){
            $("#myModale").modal("show");
        }
        //
        $scope.ruleLists=function(){
            $("#myModales").modal("show");
            $http.get(url + '/Rules/listAllRules').success(function(data) {
                console.log(data);
                $scope.rulesList=data.Rules;
                console.log($scope.rulesList);
            }).error(function(data, status, headers, config){
                console.log("加载失败");
            }) ;
        }

        /**
         * 页面分页
         */
        $scope.load=function() {
            $scope.rulesPage = {page: {}};
            var fetchFunction = function (page, callback) {
                $scope.chooseData = {datas: []};
                document.getElementById("allchose").checked = false;
                $scope.chosestate = '0';
                $scope.rulesPage.page = page;
                $http.post(url + '/Rules/listPageRules', {Rules: $scope.rulesPage}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log("分页数据为:" + $scope.searchPaginator);
        };
        $scope.load();
        /**
         * 点击选中
         */

        $scope.getData = function(item)
        {
            var allData = $scope.searchPaginator.object.ruless.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.id == allData[i].id)
                {
                    if(document.getElementById(item.id).checked)
                    {
                        document.getElementById(item.id).checked = false;
                        document.getElementById(item.id).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].id != item.id) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.id).checked = true;
                        document.getElementById(item.id).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].id).checked)
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
                    document.getElementById(datastaffList[i].id).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].id).parentNode.parentNode.style.background = '#f6f8fa';
                }
                document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].id).checked = false;
                    document.getElementById(datastaffList[i].id).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                document.getElementById("allchose").checked = false;
            }
        };

        /**
         * 删除小区公告
         */
        $scope.deleteRules=function(){
            var count = 0;
            angular.forEach($scope.searchPaginator.object.ruless,function(item){
                if(item.id!=null) {
                    console.log("item.id的值为：" + item.id);
                    if (document.getElementById(item.id).checked) {
                        count++;
                    }
                }
            });
            if(count==0){
                layer.msg('请选择需要删除的行！',{icon:0,time:2000});
                return;
            }
            layer.confirm('是否删除？',{
                btn : ['确定','取消']
            },function(){
                var temp = [];
                temp = $scope.searchPaginator.object.ruless;
                $scope.searchPaginator.object.ruless = [];
                for(var i = 0;i<temp.length;i++){
                    if(temp[i].id!=null) {
                        console.log(document.getElementById(temp[i].id).checked);
                        if (!document.getElementById(temp[i].id).checked) {
                            $scope.searchPaginator.object.ruless.push(temp[i]);
                        }
                        else {
                            $http.delete(url + '/Rules/DeleteRulesById/' + temp[i].id).success(function () {
                                $scope.load();
                            });
                        }
                    }
                }
                $scope.$apply(function(){
                    /*$scope.SumOrUpdateQuoteOrders();
                     $scope.discountOrUpdateQuoteOrders();*/
                });
                layer.msg('删除成功！',{icon :1,time : 1000});
            },function(){

            });
        };

        $scope.listPerson= function () {
            //根据条件搜索人员信息
            $scope.searchone={page:{}};

            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginator = app.get('Paginator').list(parent,6);

            $scope.personOne={};
            //$scope.QuoteOrders.signature1={};
        };

        $scope.choicePerson=function(person){
            $scope.index='';
            $scope.personOne=person;
            $scope.index=person.custId;
            $scope.recordCreaterTemp= $scope.personOne.name;
        };

        $scope.submitPerson= function () {
            $scope.rul.recordCreater=$scope.recordCreaterTemp;
        };

        //点击取消时清除选择的人员数据
        $scope.clearPersonData= function () {
            $scope.recordCreaterTemp="";
        };

        /**
         * 上传附件
         */
        $scope.uploadFile = function () {
            $scope.tempObj = {annexs:[]};
            $scope.annex = {annexAddress:'',annexName:''};
            $scope.fileState="12";
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
            $(function(){
                // 初始化插件
                angular.element("#zyupload").zyUpload({

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
                        $scope.annex.annexName=file.name;
                        // $scope.CheckOrdersService.annexs.push($scope.annex);
                        $scope.tempObj.annexs.push($scope.annex);
                        $scope.annex={};
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                    }
                });
            });
        };

        //提交附件
        $scope.picSub = function () {
            //$('#ddd').modal('hide');
            $scope.changeAddress($scope.rul.annexs,$scope.tempObj.annexs);
        };

        //清除临时对象的数据
        $scope.clearAnnexData= function () {
            $scope.tempObj = {};
            $scope.tempObj.annexs=[];
        }

        $scope.changeAddress = function(temp,obj){
            if(temp.length==0){
                for(var i=0;i<obj.length;i++){
                    temp[i] = obj[i];
                }
            }else{
                for(var i=0;i<obj.length;i++){
                    temp.push(obj[i]);
                }
            }
            return temp;
        };

        /**
         * 移除附件图片
         */
        $scope.removePic= function (item) {
            var temp = $scope.rul.annexs;
            $scope.rul.annexs = [];
            for(var i=0;i<temp.length;i++){
                if(item.annexAddress != temp[i].annexAddress){
                    $scope.rul.annexs.push(temp[i]);
                }
            }
        };

        /**
         * 编辑规章制度，绑定数据
         */
        $scope.editRules= function (item) {
            $scope.rul=item;
           /* $scope.rul.annexs=[];
            if (angular.isArray(item.annexs)) {
                $scope.rul.annexs = item.annexs;
                console.log("是数组");
                console.log("是数组"+$scope.rul.annexs);
            } else {
                $scope.rul.annexs.push(item.annexs);
                console.log("不是数组");
            }
            */
            if( $scope.rul.annexs!=null) {
                if (angular.isArray($scope.rul.annexs)) {
                    console.log("是数组");
                } else {
                    $scope.annexList = [];
                    $scope.annexList.push($scope.rul.annexs);
                    $scope.rul.annexs = $scope.annexList;
                    console.log("不是数组");
                }
            }
        };

        $scope.submitEditRules= function () {
            $http.put(url + '/Rules/UpdateRules',{Rules:$scope.rul}).success(function(){
                layer.msg('更新成功',{icon : 1,time : 2000});
                $scope.load();
            }).error(function(data,status,headers,config){
                alert("更新失败！");
            });
        };
        /*/!**
        * 领取物品前端分页查询
        * @type {number}
        *!/
        $scope.index2=1;
        $scope.showCount2=5;
        $scope.totalPage2 = 0;
        $scope.page2=function(){
            $scope.data2 = [];
            if($scope.index2!=$scope.totalPage2){
                for(var i=(($scope.index2-1)*$scope.showCount2);i<($scope.index2*$scope.showCount2);i++){
                    $scope.data2.push($scope.currentItem2[i]);
                }
            }else{
                for(var i=(($scope.index2-1)*$scope.showCount2);i<$scope.currentItem2.length;i++){
                    $scope.data2.push($scope.currentItem2[i]);
                }
            }
            console.log($scope.data2)
        };
        /!**
        * 显示下一页
        *!/
        $scope.next2=function(){
            if($scope.index2==$scope.totalPage2){
                alert('已经是末页');
            }else{
                $scope.index2 += 1;
                $scope.page2();
            }
        };
        /!**
        * 显示上一页
        *!/
        $scope.previous2=function(){
            if($scope.index2==1){
                alert('已经是首页');
            }else{
                $scope.index2 -= 1;
                $scope.page2();
            }
        };
        /!**
        * 显示当前页
        *!/
        $scope.go2=function(index2) {
            if(index2>=1 && index2<=$scope.totalPage2) {
                $scope.totalPage2=index2;
            }
            $scope.page2();
        };
*/
    }]);
});

