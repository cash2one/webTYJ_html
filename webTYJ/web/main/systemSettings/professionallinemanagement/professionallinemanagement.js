/**
 * Created by NM on 2018/1/18.
 * 专业线管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('professionalLineCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.specialtyInfos=[];
        $scope.specialtys={page:{}};

        $scope.itemIndex = 0; //初始化显示
        //专业线信息初始化
        $scope.load=function(){
            /* 删除分页显示改为列表 朱琪 2016-2-4 start */
            $scope.specialtyList = [];
            $http.get(url + '/SpecialtyInfo/listAllSpecialtyInfoRestfulList').success(function(data){
                if (!angular.isArray(data.SpecialtyInfo)){
                    $scope.specialtyList.push(data.SpecialtyInfo);
                } else {
                    $scope.specialtyList = data.SpecialtyInfo;
                }

                if ($scope.specialtyList.length != 0){
                    $scope.details($scope.specialtyList[$scope.itemIndex]);
                }
            }).error(function(){
            });
        };
        $scope.load();
        /* 删除分页显示改为列表 朱琪 2016-2-4 end */
        //修改状态保存

        var companyId=null;
        var user = {};                                             //设置默认用户信息为空
        var userCook = JSON.parse(sessionStorage.getItem("USER_LOGIN"));   //从cook中获取用户信息
        $scope.user = userCook?userCook:user;                      //三目运算获取用户信息
        companyId= $scope.user.companyId;

        //取消
        $scope.cancle=function(){
            $scope.btnIndex='';
            $scope.load();
            $scope.datas={};
        };

        //查看描述
        $scope.datas={};
        $scope.details=function(data){
            $scope.btnIndex=data.specialtyId;
            $scope.datas=data;
        };

        $scope.companyBankInfo={ownerName:"",bankAccount:"",bankbookNum:"",bankName:"",province:"",city:"",startTime:""};
        $scope.companyBankInfo.ownerName="";
        $scope.chazhao=function(item){
            var index = -1;
            angular.forEach($scope.specialtyList,function(items,key)
            {
                if(items.specialtyId == item.specialtyId)
                {
                    index=key;
                }
            });
            if(index!=-1)
            {
                $scope.itemIndex = index;
            }
            console.log('专业线名：'+item.specialtyName);
            if(item.specialtyName=="产品管理"&&item.state==1){
                $http.get(url+'/CompanyBankInfo/listCompanyBankInfo').success(function (data) {
                    $scope.companyBankInfo = data.CompanyBankInfo;
                    //console.log('公司银行信息为:'+$scope.companyBankInfo.id);
                    //layer.msg('SEARCH success！',{icon:1,time:2000});
                }).error(function () {
                    layer.msg('SEARCH failure！',{icon:2,time:2000});
                });
                angular.element('#loadBankInfoModal').modal('show');

                $http.post(url+'/SpecialtyInfo/updateListSpecialtyInfoTest',{SpecialtyInfo:item}).success(function(){
                    //layer.msg('操作成功',{icon : 1,time : 2000});
                }).error(function(data, status, headers, config){
                    layer.msg('操作失败',{icon : 3,time : 2000});
                }) ;

                return;
            }
            $http.get(url+'/SpecialtyInfo/listSpecialtyInfoByCompanyId/'+companyId+"/"+item.specialtyId).success(function(data){
                if(data.SpecialtyInfo.length>0){
                    if(item.state=='0'){
                        layer.confirm('该模块下已有编制,是否关闭此模块？',{
                            btn : ['是','否']
                        },function(){
                            $scope.insert(item);
                        },function(){
                            $scope.cancle();
                        })
                    }else {
                        $scope.insert(item);
                    }
                }else{

                   // if(item.state=='0'){
                            $scope.insert(item);
                    //}else{
                    //        $scope.insert();
                    //}
                }
                //event.stopPropagation();
            }) ;
         };

        $scope.insert=function(item){
            //for(var i=0;i<$scope.specialtyList.length;i++)
            //{
            //    $scope.specialtyList[i].state = $scope.specialtyList[i].state;
            //}
            //var specialtyInfoResult={specialtyInfos:$scope.specialtyList};
            $http.post(url+'/SpecialtyInfo/updateListSpecialtyInfoTest',{SpecialtyInfo:item}).success(function(){
                layer.msg('操作成功',{icon : 1,time : 2000});
                $scope.cancle();
            }).error(function(data, status, headers, config){
                layer.msg('操作失败',{icon : 3,time : 2000});
                $scope.cancle();
            }) ;
        };

        /*************省市信息**************************/
        $http.get("data/cityselect.json").success(function(data){
            $scope.division=data;
        }).error(function(data, status, headers, config){
        });

        $scope.insertCompanyBankInfo = function () {
            if(angular.isUndefined($scope.companyBankInfo)){
                layer.msg('请先填写内容再提交！');
                return;
            }
            if(angular.isUndefined($scope.companyBankInfo.ownerName)||angular.equals($scope.companyBankInfo.ownerName,'')){
                layer.msg('户主姓名未填写',{icon:0});
                return;
            }else{
                if($scope.companyBankInfo.ownerName.length>20){
                    layer.msg('户主姓名长度大于20位',{icon:0});
                    return;
                }
            }
            if(angular.equals($scope.companyBankInfo.bankAccount,'')||angular.isUndefined($scope.companyBankInfo.bankAccount)){
                layer.msg('账户未填写',{icon:0});
                return;
            }else{
                if($scope.companyBankInfo.bankAccount.length>19){
                    layer.msg('银行账户长度超过19位',{icon:0});
                    return;
                }
                if(/^[0-9]*$/.test($scope.companyBankInfo.bankAccount)==false){
                    layer.msg('银行帐号非纯数字',{icon:0});
                    return;
                }
            }
            if(angular.equals($scope.companyBankInfo.startTime,'')||angular.isUndefined($scope.companyBankInfo.startTime)){
                layer.msg('启用时间未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.bankName,'')||angular.isUndefined($scope.companyBankInfo.bankName)){
                layer.msg('银行未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.province,'')||angular.isUndefined($scope.companyBankInfo.province)){
                layer.msg('开户省未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.city,'')||angular.isUndefined($scope.companyBankInfo.city)){
                layer.msg('开户市未选择',{icon:0});
                return;
            }
            $scope.companyBankInfo.userId = $scope.user.userId;
          $http.post(url+'/CompanyBankInfo/insertCompanyBankInfo',{CompanyBankInfo:$scope.companyBankInfo}).success(function () {
              //layer.msg('insert successfully!',{icon:1,time:2000});
              angular.element('#loadBankInfoModal').modal('hide');
              $scope.cancle();
              layer.msg('操作成功',{icon : 1,time : 2000});
          }).error(function () {
              layer.msg('insert unsuccessfully!',{icon:2,time:2000});
          })
        };

        $scope.updateCompanyBankInfo = function () {
            if(angular.equals($scope.companyBankInfo.ownerName,'')||angular.isUndefined($scope.companyBankInfo.ownerName)){
                layer.msg('户主姓名未填写',{icon:0});
                return;
            }else{
                if($scope.companyBankInfo.ownerName.length>20){
                    layer.msg('户主姓名长度大于20位',{icon:0});
                    return;
                }
            }
            if(angular.equals($scope.companyBankInfo.bankAccount,'')||angular.isUndefined($scope.companyBankInfo.bankAccount)){
                layer.msg('账户未填写',{icon:0});
                return;
            }else{
                if($scope.companyBankInfo.bankAccount.length>19){
                    layer.msg('银行账户长度超过19位',{icon:0});
                    return;
                }
                if(/^[0-9]*$/.test($scope.companyBankInfo.bankAccount)==false){
                    layer.msg('银行帐号非纯数字',{icon:0});
                    return;
                }
            }
            if(angular.equals($scope.companyBankInfo.startTime,'')||angular.isUndefined($scope.companyBankInfo.startTime)){
                layer.msg('启用时间未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.bankName,'')||angular.isUndefined($scope.companyBankInfo.bankName)){
                layer.msg('银行未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.province,'')||angular.isUndefined($scope.companyBankInfo.province)){
                layer.msg('开户省未选择',{icon:0});
                return;
            }
            if(angular.equals($scope.companyBankInfo.city,'')||angular.isUndefined($scope.companyBankInfo.city)){
                layer.msg('开户市未选择',{icon:0});
                return;
            }
            $scope.companyBankInfo.userId = $scope.user.userId;
          $http.put(url+'/CompanyBankInfo/updateCompanyBankInfo',{CompanyBankInfo:$scope.companyBankInfo}).success(function () {
              //layer.msg('update successfully!',{icon:1,time:2000});
              angular.element('#loadBankInfoModal').modal('hide');
              $scope.cancle();
              layer.msg('操作成功',{icon : 1,time : 2000});
          }).error(function () {
              layer.msg('update unsuccessfully!',{icon:2,time:2000});
          })
        };
    }]);
});