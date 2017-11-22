/**
 * Created by NM on 2018/1/18.
 * 车辆管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('vehicleManagementCheckCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {

        var url = $rootScope.url;
        var fileUrl = $rootScope.fileUrl;
        var filePath = '';
        $scope.show1 = false;
        $scope.show2 = true;
        $scope.searchCar = {};//查询车辆条件对象
        //查询车辆信息
        $scope.search = {};
        $scope.search.custId = $rootScope.user.custId;
        $scope.CarInfo = {page: {}};

        $scope.list = function () {
            $scope.show1 = false;
            $scope.show2 = true;
        }
        $scope.grid = function () {
            $scope.show1 = true;
            $scope.show2 = false;
        }

        $scope.load = function () {
            $scope.CarInfo.owner = $rootScope.user.custId;
            var fetchFunction1 = function (page, callback) {
                $scope.CarInfo.page = page;
                $http.post(url + '/CarInfo/listPageCarInfoByTransactor', {CarInfo: $scope.CarInfo}).success(callback)

            };

            $scope.searchPaginator = app.get('Paginator').list(fetchFunction1, 6);
        };
        $scope.load();

        /**
         * 显示隐藏
         */

        angular.element('#collapseExample1').hide();
        angular.element('#collapseExample').hide();
        $scope.toggle1=function(){
            angular.element('#collapseExample1').slideToggle();
        };
        $scope.toggle=function(){
            angular.element('#collapseExample').slideToggle();
        };

        /**
         *  零时中转函数
         */
        $scope.centerChange = function(item)
        {
            $scope.newDate = {};
            for(var i in item)
            {
                $scope.newDate[i] = item[i];
            };
            return $scope.newDate;
        };

        //选中车辆
        $scope.carInfoone = {};
        $scope.choiceCar = function (carInfo) {
            //$scope.carInfoone = $scope.centerChange(carInfo);
            $scope.carInfoone = $scope.centerChange($scope.chooseData.datas[0]);
            //列表
            if(carInfo == null){
                if($scope.chooseData.datas.length > 1){
                    layer.alert("只能选择一条数据进行编辑", {icon: 0});
                } else if($scope.chooseData.datas.length < 1) {
                    layer.alert("请选择需要编辑的数据", {icon: 0});
                } else {
                    $scope.carInfoone = $scope.centerChange($scope.chooseData.datas[0]);
                    angular.element("#modal_change").modal({backdrop: 'static', keyboard: false});
                    //console.log($scope.carInfoone);
                    //console.log($scope.chooseData.datas);
                }
            }
        };

        /**
         * 显示车辆信息详情
         * @type {{datas: Array}}
         */
        $scope.showCarInfo=function(carInfo){
            $scope.carInfoone = carInfo;
            angular.element('#modifyPet').modal({backdrop: 'static', keyboard: false})
        }


        $scope.chooseData = {datas: []};
        $scope.getData = function (item) {
            console.log(item);
            if (document.getElementById(item.carId).checked) {
                document.getElementById(item.carId).checked = false;
                document.getElementById(item.carId).parentNode.parentNode.style.background='';
                for (var i = 0; i < $scope.chooseData.datas.length; i++) {
                    if ($scope.chooseData.datas[i].carId == item.carId) {
                        $scope.chooseData.datas.splice(i,1);
                    }
                }
            }else{
                document.getElementById(item.carId).checked = true;
                document.getElementById(item.carId).parentNode.parentNode.style.background='#F6F8FA';
                $scope.chooseData.datas.push(item);
            }
            //console.log($scope.chooseData.datas+"----all--");
        }

        //编辑车辆信息
        $scope.carde;
        $http.get(url + '/CarInfo/getCarInfo/' + $scope.search.custId).success(function (data) {
            //  console.log(data);
            $scope.carde = data.CarInfo;
        }).error(function (data, status, headers, config) {
            layer.alert("查询车辆信息出错,请重试！", {icon: 2});
        });
        $scope.updateCarInfo = function () {
            /**
             * BUG  231 陶勇超 2016年1月13日 17:30:52
             */
            if ($scope.carde.length > 0) {
                for (var i = 0; i < $scope.carde.length; i++) {
                    if ($scope.carInfoone.carId != $scope.carde[i].carId) {
                        if ($scope.carInfoone.carNum == $scope.carde[i].carNum) {
                            layer.alert('车牌号码已存在！', {icon: 0});
                            return;
                        }
                    }
                }
            }
            if ($scope.carInfoone.carNum == undefined || $scope.carInfoone.carNum == "" || $scope.carInfoone.carNum == null) {
                layer.alert("车牌号码不能为空", {icon: 0});
                return;
            } else if ($scope.carInfoone.carColor == undefined || $scope.carInfoone.carColor == "" || $scope.carInfoone.carColor == null) {
                layer.alert("车辆颜色不能为空", {icon: 0});
                return;
            } else if ($scope.carInfoone.carStyle == undefined || $scope.carInfoone.carStyle == "" || $scope.carInfoone.carStyle == null) {
                layer.alert("车辆型号不能为空", {icon: 0});
                return;
            } else if ($scope.carInfoone.carType == undefined || $scope.carInfoone.carType == "" || $scope.carInfoone.carType == null) {
                layer.alert("车辆类型不能为空", {icon: 0});
                return;
            } else if ($scope.carInfoone.drivingLicense == undefined || $scope.carInfoone.drivingLicense == "" || $scope.carInfoone.drivingLicense == null) {
                layer.alert("行驶证号不能为空", {icon: 0});
                return;
            } else if($scope.annexs == null || $scope.annexs.length == 0) {
                layer.alert("附件不能为空", {icon: 0});
                return;
            }
            //$scope.carInfoone.annexs = $scope.annexs;
            $http.put(url + '/CarInfo/UpdateCarInfo', {CarInfo: $scope.carInfoone}).success(function () {
                layer.msg('编辑成功!', {icon: 1});
                angular.element("#modal_change").modal("hide");
                $scope.chooseData = {datas: []};
                $scope.load();
            }).error(function (data, status, headers, config) {
                layer.alert('修改失败', {icon: 2});
            });


        };
        //移除图片
        $scope.delPic = function (item) {
            $scope.picItem = [];
            $scope.picItem = $scope.carInfoone.annexs;
            $scope.carInfoone.annexs = [];
            for (var i = 0; i < $scope.picItem.length; i++) {
                if (item.annexAddress != $scope.picItem[i].annexAddress) {
                    $scope.carInfoone.annexs.push($scope.picItem[i]);
                }
            }
        };
        $scope.quxiao = function () {
            //$scope.chooseData = {datas: []};
            //$scope.load();
        };


        $scope.carsArray= [];//选中项
        var getAllCheckedCars = function() {
            $scope.carsArray = [];//清空
            var ids = document.getElementsByName("carId");
            for ( var i = 0; i < ids.length; i++) {
                if (ids[i].checked ==true) {
                    $scope.carsArray.push(ids[i].value);
                }
            }
            //console.log($scope.carsArray.length);
        };


        $scope.deleteCarInfo = function () {
            getAllCheckedCars();
                if($scope.carsArray!= null && $scope.carsArray.length>0){
                    layer.confirm("您确定要删除选中的车辆记录？",
                        {btn : ['是','否']},function(){
                            $scope.remove();
                        }
                    );
                }else{
                    layer.msg('还没有选中任何车辆记录!',{icon : 0});
                }
         };

        /**
         * 网格删除车辆记录  宋佳  2016-03-18 16:36
         * */
        $scope.deleteCar=function(item){
            layer.confirm("您确定要删除选中的车辆记录？",
                {btn : ['是','否']},function(){
                    $http.put(url + '/CarInfo/deleteCarInfoById/'+item.carId).success(
                        function() {
                            layer.msg('删除车辆记录成功!',{icon : 1});
                            $scope.load();//刷新
                        }).error(function(data, status, headers, config) {
                            layer.msg('删除车辆记录失败!',{icon : 2});
                        });
                }
            );
        }


        /**
         * 批量删除选中的车辆记录 宋佳 2016-03-18 16:56
         * **/
        $scope.remove=function(){
            if($scope.carsArray != null && $scope.carsArray.length>0){
                for(var i=0;i<$scope.carsArray.length;i++){
                    var id = $scope.carsArray[i];
                    console.log(id);
                    if(id != null && id != ''){
                        $http.get(url + '/CarInfo/deleteCarInfoById/'+id).success(
                            function() {
                                layer.msg('删除车辆记录成功!',{icon : 1});
                                $scope.load();//
                               }).error(function(data, status, headers, config) {
                                layer.msg('删除车辆记录失败!',{icon : 2});
                            });
                    }
                }
            }
        };

        //重新获取车辆信息
        $scope.repeatCarInfo = function () {
            $scope.search = {};
            $scope.search.custId = $rootScope.user.custId;
            $http.post(url + '/CarInfo/listSearchCarInfoAu', {Search: $scope.search}).success(function (data) {
                //    console.log("获取车辆成功");
                //    console.log(data);
                $scope.carInfos = data.CarInfo;
                //     console.log($scope.carInfos);

            }).error(function (data, status, headers, config) {
                //      console.log("获取车辆失败");
            });
        };


        //去重车辆信息
        $scope.notrepeat = function (entrances) {
            for (var i = 0; i < entrances.length; i++) {
                for (var j = entrances.length - 1; j > i; j--) {
                    if (entrances[i].carId == entrances[j].carId) {
                        entrances[j] = {};
                    }
                }
                //     console.log(entrances);
            }
            return entrances;

        };

        $scope.annexs = [];
        angular.element("#zyupload").remove();
        angular.element("#remove").append("<div id='zyupload' class='zyupload'></div>");
        $(function () {
            // 初始化插件
            angular.element("#remove").html('');
            angular.element("#remove").append('<div id="zyupload" class="zyupload"></div>');
            angular.element("#zyupload").zyUpload({
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: fileUrl + "/FileService",  // 上传文件的路径
                fileType: ["jpg", "png", "jpeg", "gif", "xls", "docx", "xlsx", "pdf", "txt", "doc", "ppt"],// 上传文件的类型
                fileSize: 51200000,                // 上传文件的大小
                multiple: true,                    // 是否可以多个文件上传
                dragDrop: true,                    // 是否可以拖动上传文件
                tailor: true,                    // 是否可以裁剪图片
                del: true,                    // 是否可以删除文件
                finishDel: false,  				  // 是否在上传文件完成后删除预览
                //外部获得的回调接口
                onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件

                },
                onDelete: function (file, files) {
                },
                onSuccess: function (file, response) {          // 文件上传成功的回调方法
                    filePath = response;
                    $scope.annex = {annexAddress: '', annexName: ''};
                    $scope.annex.annexName = file.name;
                    $scope.annex.annexAddress = filePath;
                    $scope.annexs.push($scope.annex);
                    layer.msg("上传成功", {icon: 1, time: 2000});
                },
                onFailure: function (file, response) {          // 文件上传失败的回调方法
                    layer.msg("上传失败", {icon: 1, time: 2000});
                },
                onComplete: function (response) {           	  // 上传完成的回调方法

                }
            });

        });

    }]);
});