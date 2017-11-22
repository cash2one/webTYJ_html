/**
 * Created by NM on 2018/1/18.
 * 全部业务查询
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('carsInquiryCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        $scope.doClick(5);

        //列表和网格显示
        $scope.showStatus=1;

        $scope.showList=function(){
            $scope.showStatus=0;
        };

        $scope.showTable=function(){
            $scope.showStatus=1;
        };

        $scope.selected=function(carInfo){
            $('table tr').css('background','#fff');
            var id=this.carInfo.carId;
            document.getElementById(id).style.background='#f6f8fa'
            $scope.selectCarInfo=carInfo;
        }



        var url = $rootScope.url;
        $scope.CarInfo={page:{}};
        //分页查询
        $scope.load=function(){
            var fetchFunction1 = function (page, callback) {
                $scope.CarInfo.page = page;
                $http.post(url + '/CarInfo/listPageCarInfoByContion', {CarInfo: $scope.CarInfo}).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction1,6);
        };
        $scope.load();

        //选中车辆
        $scope.carInfoone={};
        $scope.choiceCar=function(carInfo){
            $scope.carInfoone=carInfo;
        };

        $scope.choiceCarForList=function(){
            if($scope.selectCarInfo==null){
                layer.alert('请选中一项后再操作',{icon:2});
                return ;
            }
            $scope.choiceCar($scope.selectCarInfo);
            $('#modal_change').modal({backdrop: 'static', keyboard: false})
        }

        $scope.showCar=function(carInfo){
            $scope.choiceCar(carInfo);
            $('#datil').modal({backdrop: 'static', keyboard: false})
        }
        //编辑车辆信息
        $scope.updateCarInfo=function(){
            if($scope.carInfoone.carNum==null||$scope.carInfoone.carNum==""){
                layer.alert('车牌号码不能为空',{icon:2});
                return;
            }else if($scope.carInfoone.passengers==null||$scope.carInfoone.passengers==""){
                layer.alert('核定载客不能为空',{icon:2});
                return;
            }else if($scope.carInfoone.carStyle==null||$scope.carInfoone.carStyle==""){
                layer.alert('车辆型号不能为空',{icon:2});
                return;
            }else if($scope.carInfoone.discriminateCode==null||$scope.carInfoone.discriminateCode==""){
                layer.alert('车辆识别号不能为空',{icon:2});
                return;
            }else if($scope.carInfoone.carType==null||$scope.carInfoone.carType==""){
                layer.alert('车辆类型不能为空',{icon:2});
                return;
            }
            $http.put(url+'/CarInfo/UpdateCarInfo',{CarInfo:$scope.carInfoone}).success(function()
            {
                layer.msg('编辑成功!',{icon : 1});
                $scope.load();
                $('#modal_change').modal('hide')
            }).error(function(data, status, headers, config){
                layer.alert('修改失败',{icon : 2});
            }) ;

        };

        $scope.deleteCarInfosForList=function(){
            if($scope.selectCarInfo==null){
                layer.alert('请选中一项后再操作',{icon:2});
                return ;
            }
            $scope.deleteCarInfo($scope.selectCarInfo);
        }
        $scope.quxiao=function(){
            $scope.load();
        };
        //删除车辆信息
        $scope.deleteCar ={carInfos:[]};
        $scope.deleteCarInfo=function(carInfo)
        {
            layer.confirm('是否要删除此车辆信息？',{
                btn : ['是','否']
            },function(){
                //$http.put(url + '/CarInfo/deleteCarInfo/'+ carInfo.carId).success(function()
                $scope.deleteCar.carInfos[0]=carInfo;
                console.log($scope.deleteCar)
                $http.put(url + '/CarInfo/deleteCarInfo',{CarInfo:$scope.deleteCar}).success(function()
                {layer.msg('删除成功!',{icon : 1});
                    $scope.load();
                }).error(function(data, status, headers, config){
                    layer.alert('删除失败',{icon : 2});
                }) ;
            })


        };

        //重新获取车辆信息
        $scope.repeatCarInfo=function(){
            $scope.search={};
            $scope.search.custId=$rootScope.user.custId;
            $http.post(url+'/CarInfo/listSearchCarInfoAu',{Search:$scope.search}).success(function(data)
            {
                $scope.carInfos=data.CarInfo;

            }).error(function(data, status, headers, config){
                //      console.log("获取车辆失败");
            }) ;
        };

        //去重车辆信息
        $scope.notrepeat=function(entrances){
            for ( var i = 0; i < entrances.length; i++) {
                for(var j = entrances.length-1 ; j > i; j--){
                    if (entrances[i].carId == entrances[j].carId) {
                        entrances[j]={};
                    }
                }
            }
            return entrances;
        };

    }]);
});