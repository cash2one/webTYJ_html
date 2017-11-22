/**
 * 名称：APP在职员工
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('appWorkingStaffCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        var filePath='';
        $scope.addStaff={annexs:[]};
        //$scope.doClick(0);
        var user = {};                                             //设置默认用户信息为空
        var userSession= JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userSession?userSession:user;                      //三目运算获取用户信息

        /**
         * 在职员工页面网格列表切换
         */
        $scope.grid = true;
        $scope.list=function(){
            $scope.grid=true;
        };
        $scope.gridChange=function(){
            $scope.grid=false;
        };

        $scope.staff = {page: {}};
        var fetchFunction = function (page, callback) {
            $scope.staff.processStatus = 3;
            $scope.staff.page = page;
            $http.post(url + '/staff/listPageStaffRestful', {Staff: $scope.staff}).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);

        $scope.getStaffInfo = function (item) {
            $scope.index=item.staffId;
          $scope.staffInfo = item;
        };
        $scope.addStaff={};
        $scope.dleteData={staffs:[]};
        $scope.lee=function(){
            if($scope.chooseData.datas.length==1){
                $scope.addStaff=$scope.chooseData.datas[0];

                layer.confirm("您确定要离职选中员工吗？", {btn: ['是', '否']}, function () {
                    $scope.dleteData.staffs = $scope.chooseData.datas;
                    $http.put(url + '/LoginService/leaveStaffStateByStateAndId', {Staff: $scope.dleteData}).success(function () {
                        layer.msg("离职成功", {icon: 1, time: 2000});
                        $scope.chooseData = {datas: []};
                        $scope.searchPaginator._load();
                        document.getElementById("allchose").checked=false;
                    }).error(function () {
                        layer.msg("离职失败", {icon: 3, time: 2000});
                    });
                });
            }else{
                return console.log($scope.chooseData);
            }
        };

        $scope.staff1={annexs:[]};
        $scope.toShow = function (data) {
            $scope.staff1 = data;
            if ($scope.staff1.annexs != null) {
                if (angular.isArray($scope.staff1.annexs)) {
                } else {
                    $scope.annexList = [];
                    $scope.annexList.push($scope.staff1.annexs);
                    $scope.staff1.annexs = $scope.annexList;
                }
            }else if($scope.staff1.annexs ==undefined){
                $scope.staff1.annexs=[];
            }
            angular.element('#personDatil').modal({backdrop: 'static', keyboard: false});
        };


        $scope.chooseData = {datas: []};
        $scope.getData = function(item)
        {
            var allData = $scope.searchPaginator.object.staffs.slice(1);
            var num = [];
            for(var i=0;i<allData.length;i++)
            {
                if(item.userAppId == allData[i].userAppId)
                {
                    if(document.getElementById(item.userAppId).checked)
                    {
                        document.getElementById(item.userAppId).checked = false;
                        document.getElementById(item.userAppId).parentNode.parentNode.style.background = '';
                        var temp = $scope.chooseData.datas;
                        $scope.chooseData = {datas: []};
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].userAppId != item.userAppId) {
                                $scope.chooseData.datas.push(temp[i]);
                            }
                        }
                        break;
                    }else
                    {
                        document.getElementById(item.userAppId).checked = true;
                        document.getElementById(item.userAppId).parentNode.parentNode.style.background = '#f6f8fa';
                        $scope.chooseData.datas.push(item);
                        break;
                    }
                }
            }
            for(var i=0;i<allData.length;i++)
            {
                if(document.getElementById(allData[i].userAppId).checked)
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
                    document.getElementById(datastaffList[i].userAppId).checked = true;
                    $scope.chooseData.datas.push(datastaffList[i]);
                    document.getElementById(datastaffList[i].userAppId).parentNode.parentNode.style.background = '#f6f8fa';
                }
                document.getElementById("allchose").checked = true;
                $scope.chosestate = '1';
            }else{
                for(var i=0;i<datastaffList.length;i++){
                    document.getElementById(datastaffList[i].userAppId).checked = false;
                    document.getElementById(datastaffList[i].userAppId).parentNode.parentNode.style.background = '';
                }
                $scope.chosestate = '0';
                $scope.chooseData = {datas:[]};
                document.getElementById("allchose").checked = false;
            }
        };
        /**
         * 上传文件
         * @type {{annexAddress: string, annexName: string}}
         */
        //$scope.annex = {annexAddress:'',annexName:''};
        //    $(function(){
        //        // 初始化插件
        //        angular.element("#zyupload").zyUpload({
        //            width            :   "90%",                 // 宽度
        //            height           :   "auto",                 // 宽度
        //            itemWidth        :   "140px",                 // 文件项的宽度
        //            itemHeight       :   "115px",                 // 文件项的高度
        //            url              :   fileUrl+"/FileService",  // 上传文件的路径
        //            fileType         :   ["jpg","png","jpeg","gif","xls","docx","xlsx","pdf","txt","doc","ppt"],// 上传文件的类型
        //            fileSize         :   51200000,                // 上传文件的大小
        //            multiple         :   true,                    // 是否可以多个文件上传
        //            dragDrop         :   true,                    // 是否可以拖动上传文件
        //            tailor           :   true,                    // 是否可以裁剪图片
        //            del              :   true,                    // 是否可以删除文件
        //            finishDel        :   false,  				  // 是否在上传文件完成后删除预览
        //            //外部获得的回调接口
        //            onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
        //
        //            },
        //            onDelete: function(file, files){
        //            },
        //            onSuccess: function(file, response){          // 文件上传成功的回调方法
        //                $scope.annex = {annexAddress:'',annexName:''};
        //                filePath=response;
        //                $scope.annex.annexName = file.name;
        //                $scope.annex.annexAddress = filePath;
        //                $scope.addStaff.annexs.push($scope.annex);
        //                layer.msg("上传成功",{icon : 1,time : 2000});
        //            },
        //            onFailure: function(file, response){          // 文件上传失败的回调方法
        //                layer.msg("上传失败",{icon : 1,time : 2000});
        //            },
        //            onComplete: function(response){           	  // 上传完成的回调方法
        //
        //            }
        //        });
        //
        //    });

    }]);
});