/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('entranceGuardCardInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(2);

        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };

        var url = $rootScope.url;
        $scope.Entrance={page:{}};
        $scope.load=function(){
            var fetchFunction = function(page,callback){
                $scope.Entrance.page = page;
                $http.post(url + '/Entrance/listPageEntranceByContion',{Entrance : $scope.Entrance}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        };
        $scope.load();

        //选择门禁卡
        $scope.entranceone={};//选择的门禁卡对象

        $scope.selected=function(entrance){
            $('table tr').css('background','#fff');
            var id=this.entrance.cardId;
            document.getElementById(id).style.background='#f6f8fa'
            $scope.selectEntrance=entrance;
        }
        //网格更换功能
        $scope.choiceEntrance=function(entrance){
            $scope.entranceone = entrance;
            $scope.entranceone.cardDate = new Date($scope.entranceone.cardDate);
            $scope.entranceone.startDate = new Date($scope.entranceone.startDate);
            $scope.entranceone.endDate = new Date($scope.entranceone.endDate);
        };
        //列表更换功能
        $scope.choiceEntrances=function(){
            var entrance=$scope.selectEntrance;
            if(entrance==null){
                layer.alert('请选中一项再操作',{icon:2});
                return;
            }
            $('#free').modal({backdrop: 'static', keyboard: false});
            $scope.choiceEntrance(entrance);
        };

        //显示停车卡信息
        $scope.showInfo=function(){
            $scope.choiceEntrance($scope.selectEntrance);
            $('#modifyPete').modal({backdrop: 'static', keyboard: false});
        }
        //更换门禁卡 newCarNum为新卡的卡号
        $scope.changeEntrance=function() {
            $('#file').modal({backdrop: 'static', keyboard: false});
            if ($scope.newCardNum) {
                $scope.err="";
                $http.get(url + '/Entrance/getEntrance/' + $scope.entranceone.cardId).success(function (data) {

                    $scope.changeEntranceone = data.Entrance;
                    $scope.changeEntranceone.newCardNum = $scope.newCardNum;
                    $http.put(url + '/Entrance/updateEntranceByIdRest', {Entrance: $scope.changeEntranceone}).success(function (data) {

                        layer.msg('更换门禁卡成功',{icon : 1, time : 2000});
                        $scope.newCardNum=null;
                        $("#free").modal("hide");
                        $scope.searchPaginator._load();
                    }).error(function (data, status, headers, config) {
                        layer.alert('更换门禁卡失败',{icon : 2});
                    });

                }).error(function (data, status, headers, config) {
                    layer.msg('门禁卡获取失败',{icon : 0, time : 2000});
                });
            } else{
                $scope.err="请您输入正确的新卡卡号！";
                layer.alert('请您输入正确的新卡卡号',{icon : 0});
            }

        }

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
                $scope.searchPaginator._load();
            }).error(function(data, status, headers, config){
                layer.alert('退卡失败',{icon : 2});
            });
        };

        //网格退卡
        $scope.openreturnEntrance = function(entrance){
            $scope.Entrances = {};
            $scope.Entrances = entrance;
            $scope.Entrances.cardDate = new Date($scope.Entrances.cardDate);
            $scope.Entrances.startDate = new Date($scope.Entrances.startDate);
            $scope.Entrances.endDate = new Date($scope.Entrances.endDate);
            $('#freedom').modal({backdrop: 'static', keyboard: false});
        };
        //列表退卡
        $scope.openreturnEntrances=function(){
            var entrance=$scope.selectEntrance;
            if(entrance==null){
                layer.alert('请选中一项再操作',{icon:2});
                return;
            }
            $('#freedom').modal({backdrop: 'static', keyboard: false});
            $scope.openreturnEntrance(entrance);
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
                $scope.searchPaginator._load();
            }).error(function(data, status, headers, config){
                layer.alert('挂失门禁卡失败',{icon : 2});
            });
        };

        //网格挂失
        $scope.openloseeEntrance = function(entrance){
            $scope.entranceone = entrance;
            $scope.entranceone.cardDate = new Date($scope.entranceone.cardDate);
            $scope.entranceone.startDate = new Date($scope.entranceone.startDate);
            $scope.entranceone.endDate = new Date($scope.entranceone.endDate);
        };

        //列表挂失
        $scope.openloseeEntrances=function(){
            var entrance=$scope.selectEntrance;
            if(entrance==null){
                layer.alert('请选中一项再操作',{icon:2});
                return;
            }
            $('#file').modal({backdrop: 'static', keyboard: false});
            $scope.openloseeEntrance(entrance);
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

    }]);
});
