/**
 * Created by XC on 2018/1/18.
 * 房屋信息里的租赁
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('leaseHistoryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        $scope.showStatus=1;
        $scope.listview= function () {
            $scope.showStatus=1
        }

        $scope.tabview= function () {
            $scope.showStatus=0;
        }

        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';          //上传文件的路径
        var url = $rootScope.url;
        $scope.name=$rootScope.user.name;
        //查询户主的房屋中的租赁信息
        $scope.search={page:{}};
        $scope.search.custId=$rootScope.user.custId;
        $scope.load = function(){
            var parent = function (page, callback) {
                $scope.search.page = page;
                $http.post(url+'/NewLease/listPageListSearchLease',{NewLease:$scope.search}).success(callback);
            };
            $scope.currentPaginator = app.get('Paginator').list(parent,5);
            var leases = $scope.currentPaginator;
            $scope.newLeases=leases.object.newLeases;

        }
        $scope.load();//加载

        /**
         * 获取选中的租赁对象
         * @param id
         */
        $scope.leasesArray = [];//选中项
        var getAllChechedLeases = function(item) {
            $scope.leasesArray = [];//清空
            /*$("input[name='leaseId']:checked").each(function(){
                *//*var lease = $(this).val();
                var l = lease.substring(0,lease.length-1);
                $scope.leasesArray.push($.parseJSON(l));*//*
                console.log(this);
            });*/
            $scope.leasesArray.push(item);
        };

        $scope.deleteLeases = function() {
            $scope.ids=''
            if(arguments[0]!=null){
                $scope.ids=arguments[0].id;
            }else{
                var checkbox=$('#propertyTypes input:checkbox:checked');
                if(checkbox.length<1||checkbox.length==null){
                    layer.alert('请先选择删除项！！',{icon : 0});
                    return;
                }else{
                    for (var i = 0; i < checkbox.length; i++) {
                        //$scope.ids.push($(checkbox[i]).attr('id'));
                        $scope.ids = $scope.ids + $(checkbox[i]).attr('id') + ','
                    }
                }
            }
            layer.confirm("您确定要删除选中的租赁记录？",
                {btn : ['是','否']},function(){
                    $http.put(url + '/NewLease/deleteNewLeaseRestful/' + $scope.ids).success(
                        function(){
                            layer.msg('删除租赁记录成功!',{icon : 1});
                            $scope.load();//刷新
                            $('#allchose1')[0].checked=false;
                        }).error(function () {
                            layer.msg('删除租赁记录失败!',{icon : 1});
                        });
                }
            );


        };

        $scope.remoe=function(ids){
            var id='';
            for(var i=0;i<ids.length;i++){
                id=id+ids[i]+'split'
            }
            $http.put(url + '/NewLease/deleteNewLeaseRestful/' + id).success(
                function(){
                    layer.msg('删除租赁记录成功!',{icon : 1});
                    $scope.load();//刷新
                }).error(function () {
                    layer.msg('删除租赁记录失败!',{icon : 1});
                });

            /*if($scope.leasesArray != null && $scope.leasesArray.length>0){
                for(var i=0;i<$scope.leasesArray.length;i++){
                    var id = $scope.leasesArray[i].id;
                    if(id != null && id != ''){

                    }
                }
            }*/
        };
        $scope.check1=function(item){
            $scope.btnIndex=item;
            //getAllChechedLeases(item);
        }


        $scope.getdata=function(item){
            if(item==null||item==''){
                return;
            }
            var id="";
            if(item.id==null){
                id=item;
            }else{
                id=item.id;
            }
            var tr= $('#'+id);
            if(tr.attr('style')==null||tr.attr('style')==''){
                tr.css('background','#f6f8fa');
                tr.children().children()[0].checked=true;
            }else{
                tr.attr('style','');
                tr.children().children()[0].checked=false;
            }

            if($("#propertyTypes input:not(:checked)").length==1){
                $('#allchose1')[0].checked=true;
            }else if($("#propertyTypes input:not(:checked)").length>1){
                $('#allchose1')[0].checked=false;
            }
        };

        //全选
        $scope.allchose1= function () {
            if($("#propertyTypes input:not(:checked)").length==1){
                var checkbox=$('#propertyTypes input:checkbox');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.getdata(checkboxId[i]);
                }
            }else{
                var checkbox=$('#propertyTypes input:not(:checked)');
                var checkboxId=[];
                for(var i=0;i<checkbox.length;i++){
                    checkboxId.push($(checkbox[i]).attr('id'));
                }
                for(var i=0;i<checkboxId.length;i++){
                    $scope.getdata(checkboxId[i]);
                }
            }
        }

        /**
         * 修改租赁信息
         * @type {{}}
         */
        $scope.leasesToModify ={annexs:[]};
        $scope.getModifyLease = function(){
            var id='';
            if(arguments[0]!=null){
                id=arguments[0].id;
            }else{
                var checkbox=$('#propertyTypes input:checkbox:checked');
                if(checkbox.length>1){
                    layer.alert('不能选择多项进行编辑！！',{icon : 0});
                    return;
                }else if(checkbox.length<1||checkbox.length==null){
                    layer.alert('请先选择编辑项！！',{icon : 0});
                    return;
                };
                id=$(checkbox[0]).attr('id');
            }

            $http.get(url+'/NewLease/getNewLeaseByIdRestful/'+id).success(function(data){
                $("#modifyLeases").modal("show");
                $scope.leasesToModify=data.NewLease[0];
                if(!angular.isUndefined($scope.leasesToModify.hireStartDate)){
                    $scope.leasesToModify.hireStartDate = new Date($scope.leasesToModify.hireStartDate);
                }
                if(!angular.isUndefined($scope.leasesToModify.hireFinishDate)){
                    $scope.leasesToModify.hireFinishDate = new Date($scope.leasesToModify.hireFinishDate);
                }
                if($scope.leasesToModify.annexs!=null&&$scope.leasesToModify.annexs.length==null){
                    var annex=$scope.leasesToModify.annexs;
                    $scope.leasesToModify.annexs=[];
                    $scope.leasesToModify.annexs.push(annex);
                }

                var personIds=$scope.leasesToModify.leasepersonId;
                $http.post(url+'/PersonCustNew/getPersonCustNewsByIds',personIds).success(function(data){
                    $scope.persons=data;
                }).error(function(){

                });
            });

            //上传文件
            $scope.annex = {annexAddress:'',annexName:''};
            $("#zyupload").remove();
            $("#remove").append("<div id='zyupload' class='zyupload'></div>");
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
                        //初始化附件
                        if($scope.leasesToModify.annexs==null||$scope.leasesToModify.annex==''){
                            $scope.leasesToModify.annexs=[];
                        }
                        $scope.$apply(function () {
                            $scope.leasesToModify.annexs.push($scope.annex);
                        });
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



        /**
         * 修改租赁信息
         */
        $scope.modifyLease = function(){
            if(angular.isUndefined($scope.leasesToModify.rent)){
                $scope.leasesToModify.rent=0;
            }
            if(angular.isUndefined($scope.leasesToModify.honseId)||angular.equals($scope.leasesToModify.honseId,'')){
                layer.msg('租赁房屋未选择',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.leasesToModify.hireStartDate)||$scope.leasesToModify.hireStartDate==null){
                layer.msg('租赁开始日期未输入',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.leasesToModify.hireFinishDate)||$scope.leasesToModify.hireStartDate==null){
                layer.msg('租赁结束日期未输入',{icon:0});
                return;
            }
            if($scope.leasesToModify.hireFinishDate-$scope.leasesToModify.hireStartDate<0){
                layer.msg('租赁结束日期不能在租赁开始日期之前',{icon:0});
                return;
            }
            if(angular.isUndefined($scope.leasesToModify.rent)){
                layer.msg('租金未输入',{icon:0});
                return;
            }

            $scope.leasesToModify.operateDate=new Date();
            if($scope.persons.length<1){
                layer.msg('必须要有一个租户！');
            }else{
                var custIds="";
                var custNames="";
                for(var i in $scope.persons){
                    custIds+=$scope.persons[i].custId+',';
                }
                for(var i in $scope.persons){
                    custNames+=$scope.persons[i].name+',';
                }
                $scope.leasesToModify.leasepersonId=custIds.substring(0,custIds.length-1);
                $scope.leasesToModify.leasePersonName=custNames.substring(0,custNames.length-1);

                $scope.personBuildingNew=[];
                for (var i = 0; i < $scope.persons.length; i++) {
                    if($scope.persons[i]!=null){
                        var addPersonBuildingNew = {};//新增人员建筑关系
                        addPersonBuildingNew.buildingStructureId = $scope.leasesToModify.honseId;
                        addPersonBuildingNew.custType = "租客";
                        addPersonBuildingNew.state = 0;
                        addPersonBuildingNew.custId = $scope.persons[i].custId;
                        addPersonBuildingNew.name = $scope.persons[i].name;
                        $scope.personBuildingNew.push(addPersonBuildingNew);
                    }
                }
                $scope.leasesToModify.personBuildingNew = $scope.personBuildingNew;
                $http.put(url+'/NewLease/updateNewLeaseRestful',{NewLease:$scope.leasesToModify}).success(function(){
                    layer.msg('修改租赁信息成功！',{icon : 1});
                    $('#modifyLeases').modal('hide');
                    $('#allchose1')[0].checked=false;
                }).error(function(){
                    layer.msg('修改租赁信息失败！',{icon : 2});
                });
                $scope.load();//刷新
                $("input[name='things']:checked").each(function(){//取消选中项
                    $(this).attr("checked",false);
                });
            }

        };

        //选择租赁信息
        $scope.clease={};
        $scope.getLease=function(lease){
            $scope.clease=lease;
        };

        /**
         * 人员搜索信息重置
         * @type {{page: {}}}
         */
        $scope.ryssqc=function(){
            $scope.currentPaginatorPerson={};
            result=[];
            $scope.selectPerson();
        }
        //根据条件搜索人员信息
        $scope.searchone={page:{}};
        $scope.selectPerson=function(){
            var parent = function (page, callback) {
                $scope.searchone.page = page;
                $http.post(url+'/PersonCustNew/listPagelistSearchPersonCust',{PersonCustNew:$scope.searchone}).success(callback);
            };
            $scope.currentPaginatorPerson = app.get('Paginator').list(parent,4);
        };

        //选中人员
        var result = [];
        $scope.choicePerson=function(person) {
            $scope.notrepeat(result, person);
        };

        /**
         * 存放选中的信息
         * @param persons
         * @param person
         */
        $scope.notrepeat=function(persons,person){
            if(person.custId==$rootScope.user.custId){
                layer.msg('该选中的用户是业主，无法成为租客');
                return;
            }
            for(var i in $scope.persons){
                if(person.custId == $scope.persons[i].custId){
                    layer.msg('已经是租客了，无法选中！',{time:2000});
                    return;
                }
            }

            var j=0;
            for ( var i = 0; i < persons.length; i++) {
                if (persons[i].custId == person.custId) {
                    persons.splice(i, 1);
                    j=1;
                }
            }
            if(j==0){
                persons.push(person);
            }
        };

        /**
         *  零时中转函数
         */
        $scope.centerChange = function(item)
        {
            $scope.newDate = [];
            for(var i in item)
            {
                $scope.newDate[i] = item[i];
            };
            return $scope.newDate;
        };

        /**
         * 确定
         */
        $scope.btnClick = function()
        {
            var item = $scope.centerChange(result);
            for(var i in item){
                $scope.persons.push(item[i]);
            }
        };

        /**
         * 选中样式
         */
        $scope.chocieCss=function(custId){
            if(result.length==0){
                return false;
            }
            var j=0;
            for(var i=0;i<result.length;i++){
                if(result[i].custId==custId){
                    j=1;
                }
            }
            if(j==1){
                return true;
            }else{
                return false;
            }
        };

        /**
         * 选中要删除的行
         */
        $scope.ids = [];
        $scope.deleteSelect=function(id){
            var tr = $('#'+id);
            if(tr.attr('style')==null||tr.attr('style')==''){
                tr.css('background','#f6f8fa');
                $scope.ids.push(id);
            }else{
                tr.attr('style','');
                for(var i in $scope.ids){
                    if(id==$scope.ids[i]){
                        $scope.ids.splice(i,1);
                    }
                }
            }
        }

        /**
         * 编辑时删除租客
         */
        $scope.deletePerson=function(){
            if($scope.ids.length==0){
                layer.msg('您还未选择删除项');
                return;
            }
            layer.confirm('你确定要删除选中租客吗？',
                {btn:['是','否']}, function(){
                    for(var i in $scope.persons){
                        if($scope.ids.indexOf($scope.persons[i].custId)>-1){
                            $scope.$apply(function(){
                                delete $scope.persons[i];
                            })
                        };
                    }
                    var temp =[];
                    for(var i in $scope.persons){
                        if($scope.persons[i]!=null){
                            temp.push($scope.persons[i]);
                        }
                    }
                    $scope.persons = temp;
                    $scope.ids=[];//清空选中id
                    $('#tbody tr').attr('style','');//清空样式
                    layer.msg('删除成功')
            })
        }

        /**
         * 删除图片
         */
        $scope.delPic= function (item) {
            $scope.leasesToModify.annexs.splice($scope.leasesToModify.annexs.indexOf(item),1);
        }


        /**
         * 将输入数字保留两位小数
         */
        $scope.formatRent = function(){
            var num = $("input[name=rent]").val();
            var val = Number(num).toFixed(2);
            $("input[name=rent]").val(val);
        }

    }]);
});