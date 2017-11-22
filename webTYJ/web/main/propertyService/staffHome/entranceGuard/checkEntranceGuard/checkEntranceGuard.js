/**
 * Created by Administrator on 2015/5/19.
 */

/**
 * Created by NM on 2018/1/18.
 * 人员信息门禁卡js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('checkEntranceGuardCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        //通过条件查询门禁卡信息
        var url = $rootScope.url;
        $scope.search={};
        $scope.search.custId=$rootScope.user.custId;//根据门禁卡持有人查询门禁卡（也是当前办理人的）
        $scope.Entrance = {page:{}};
        $scope.Entrance.userId = $rootScope.user.custId;
        $scope.gard = true;
        var inpMark = false;
        $scope.chooseData = {datas: []};
        /**
         * 网格列表切换
         */
        $scope.list=function(){
            $scope.gard=true;
        }
        $scope.gridChange=function(){
            $scope.gard=false;
        }

        var fetchFunction = function(page,callback){
            $scope.chooseData = {datas: []};
            //document.getElementById("allchose").checked = false;
            $scope.chosestate = '0';
            $scope.Entrance.page = page;
            $http.post(url + '/Entrance/listPageEntranceByEntrance',{Entrance : $scope.Entrance}).success(callback);
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log($scope.searchPaginator);

        //选择门禁卡
        $scope.entranceone={};//选择的门禁卡对象
        $scope.choiceEntrance=function(entrance){
            $scope.entranceone = {};
            if(entrance==-1)
            {
                if($scope.chooseData.datas.length==0)
                {
                    layer.msg('请选择数据！',{icon:0});
                    return;
                }else if($scope.chooseData.datas.length==1)
                {
                    $scope.entranceone = $scope.chooseData.datas[0];
                }else if($scope.chooseData.datas.length>1)
                {
                    layer.msg('请选择一条数据！',{icon:0});
                    return;
                }
            }else {
                $scope.entranceone = entrance;
            }
            $scope.entranceone.cardDate = new Date($scope.entranceone.cardDate);
            $scope.entranceone.startDate = new Date($scope.entranceone.startDate);
            if(angular.isDefined($scope.entranceone.endDate)){//修改判断，当截至日期存在时才改变格式  王洲   2016.1.14
                $scope.entranceone.endDate = new Date($scope.entranceone.endDate);
            }
            $('#free').modal({backdrop: 'static', keyboard: false});
        };

        //更换门禁卡 newCarNum为新卡的卡号

        $scope.changeEntrance=function() {
            //修改新门禁卡号格式验证  王洲  2016.1.14
            var no = $scope.newCardNum;
            if(no == '' || angular.isUndefined(no)){
                layer.msg('门禁卡号不能为空！',{icon : 0,time : 1000});
                return;
            }
            if(no.length > 30){
                layer.msg('门禁卡号不能多于30个字符！',{icon : 0,time : 1000});
                return;
            }

            $http.get(url + '/Entrance/getEntrance/' + $scope.entranceone.cardId).success(function (data) {

                $scope.changeEntranceone = data.Entrance;
                $scope.changeEntranceone.newCardNum = $scope.newCardNum;

                //查询修改后的门禁卡号在数据库中是否已经存在  王洲  2016.1.14
                $http.get(url + '/Entrance/getEntranceBycardNum/' + $scope.changeEntranceone.newCardNum).success(function(data){
                    if(data.Info.state != false){
                        $http.put(url + '/Entrance/updateEntranceByIdRest', {Entrance: $scope.changeEntranceone}).success(function (data) {
                            layer.msg('更换门禁卡成功',{icon : 1, time : 2000});
                            $scope.newCardNum=null;
                            $("#free").modal("hide");
                            $scope.chooseData = {datas: []};
                            $scope.searchPaginator._load();
                        }).error(function (data, status, headers, config) {
                            layer.alert('更换门禁卡失败',{icon : 2});
                        });
                    }else{
                        layer.msg('此门禁卡号已存在，请重新输入！',{icon : 0,time : 1000});
                    }
                }).error(function(data){
                    layer.msg('门禁卡号查询出错，请重试！',{icon : 0,time : 1000});
                });
            }).error(function (data, status, headers, config) {
                layer.msg('门禁卡获取失败',{icon : 0, time : 2000});
            });
        };

        //门禁卡退卡
        $scope.returnEntrance=function(entrance){
            var flag = false;
            layer.confirm('确认将此门禁卡退卡？',{
                btn : ['是','否']
            },function(){
                $scope.returnCard(entrance);
            },function(){
                flag = false;
            });
        };

        $scope.returnCard = function(entrance){
            $http.put(url+'/Entrance/updateEntranceByIdAndReturn/'+entrance.cardId).success(function()
            {

                layer.msg('退卡成功',{icon : 1});
                $("#freedom").modal("hide");
                $scope.chooseData = {datas: []};
                $scope.searchPaginator._load();
            }).error(function(data, status, headers, config){
                layer.alert('退卡失败',{icon : 2});
            });
        };

        $scope.openreturnEntrance = function(entrance){
            $scope.Entrances = {};
            if(entrance==-1)
            {
                if($scope.chooseData.datas.length==0)
                {
                    layer.msg('请选择数据！',{icon:0});
                    return;
                }else if($scope.chooseData.datas.length==1)
                {
                    $scope.Entrances = $scope.chooseData.datas[0];
                }else if($scope.chooseData.datas.length>1)
                {
                    layer.msg('请选择一条数据！',{icon:0});
                    return;
                }
            }else {
                $scope.Entrances = entrance;
            }
            $scope.Entrances.cardDate = new Date($scope.Entrances.cardDate);
            $scope.Entrances.startDate = new Date($scope.Entrances.startDate);
            if (angular.isDefined($scope.Entrances.endDate)) {//修改判断，当截至日期存在时才改变格式  王洲   2016.1.14
                $scope.Entrances.endDate = new Date($scope.Entrances.endDate);
            }

            $('#freedom').modal({backdrop: 'static', keyboard: false});
        };
        $scope.closereturnEntrance = function(){
            $scope.Entrances = {};
            $("#freedom").modal("hide");
        };


        //门禁卡挂失
        $scope.loseeEntrance=function(entrance){

            layer.confirm('确定挂失门禁卡？',{
                btn : ['是','否']
            },function(){
                $scope.loseCard(entrance);
            },function(){
            });
        };

        $scope.loseCard = function(entrance){
            $http.put(url+'/Entrance/updateEntranceByIdAndLost/'+entrance.cardId).success(function()
            {
                layer.msg('挂失门禁卡成功!',{icon : 1});
                $("#file").modal("hide");
                $scope.chooseData = {datas: []};
                $scope.searchPaginator._load();
            }).error(function(data, status, headers, config){
                layer.alert('挂失门禁卡失败',{icon : 2});
            });
        };

        $scope.openloseeEntrance = function(entrance){
            $scope.entranceone = {};
            if(entrance==-1)
            {
                if($scope.chooseData.datas.length==0)
                {
                    layer.msg('请选择数据！',{icon:0});
                    return;
                }else if($scope.chooseData.datas.length==1)
                {
                    $scope.entranceone = $scope.chooseData.datas[0];
                }else if($scope.chooseData.datas.length>1)
                {
                    layer.msg('请选择一条数据！',{icon:0});
                    return;
                }
            }else {
                $scope.Entrances = entrance;
            }
            $scope.entranceone.cardDate = new Date($scope.entranceone.cardDate);
            $scope.entranceone.startDate = new Date($scope.entranceone.startDate);
            if(angular.isDefined($scope.entranceone.endDate)){//修改判断，当截至日期存在时才改变格式  王洲   2016.1.14
                $scope.entranceone.endDate = new Date($scope.entranceone.endDate);
            }
            $('#file').modal({backdrop: 'static', keyboard: false});
        };

        $scope.closeloseeEntrance = function(){
            $("#file").modal("hide");
            $scope.entranceone = {};
        };


        //取消模态框(新卡数据)
        $scope.clearModel=function(){
            $scope.newCardNum=null;
        };

        //查询产品初始化门禁卡，获取办理金额
        $http.get(url + '/Product/getProductByType/' + '2').success(function(data){
            $scope.Product = data.Product;
        }).error(function(data){
            layer.alert('查询不到有效的门禁卡初始化信息',{icon : 2});
        });

        /**
         * 点击选中  2016/2/25 By yeshengqiang 开始
         */

        $scope.getData = function(item)
        {
            var allData = $scope.searchPaginator.object.entrances.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.cardId == allData[i].cardId)
                {
                    if(document.getElementById(item.cardId).checked)
                    {
                        document.getElementById(item.cardId).checked = false;
                        document.getElementById(item.cardId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].cardId != item.cardId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.cardId).checked = true;
                        document.getElementById(item.cardId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].cardId).checked)
                {
                    num.push(i);
                    if(num.length == allData.length)
                    {
                        var datastaffList = allData;
                        allcheck(datastaffList);
                    }else
                    {
                        $scope.chosestate = '0';
                        //document.getElementById("allchose").checked = false;
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
                    document.getElementById(datastaffList[i].cardId).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].cardId).parentNode.parentNode.style.background = '#f6f8fa';
                }
                //document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].cardId).checked = false;
                    document.getElementById(datastaffList[i].cardId).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                //document.getElementById("allchose").checked = false;
            }
        };
        /**
         * 点击选中  2016/2/25 By yeshengqiang 结束
         */


    }]);
});