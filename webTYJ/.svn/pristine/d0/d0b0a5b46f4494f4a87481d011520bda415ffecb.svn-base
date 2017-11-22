/**
 * Created by LM on 2015/3/11.
 * 工作台js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('approvalPendingCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url = $rootScope.url;
        $scope.pendingApproval={page:{},theme:'',types:''};
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        $scope.personVipProject={vipId:'',projectIds:''};//VIP客户项目关系表


        //加载数据
        $scope.personData={};
        $scope.loading=function(){
            var fetchFunction = function(page,callback) {
                $scope.pendingApproval.page=page;
                $http.post(url + '/PendingApproval/listPagePendingApprovalRestful',{PendingApproval:$scope.pendingApproval}).success(callback);
            };
            $scope.searchPaginator=app.get('Paginator').list(fetchFunction,5);
            console.log( $scope.searchPaginator);

            //查询所有的代办申请
            $http.get(url + '/PendingApproval/selectAllPendingApproval').success(function(data) {
                $scope.PendingApprovals= data.PendingApproval;
            });
        }
        $scope.loading();


        //重新分配
        $scope.restart=function(){
            $('#restart').modal({backdrop: 'static', keyboard: false});

        };

        //得到申请的类型
        $scope.pendingApproval={
            type: [
                { id: '0',name:'vip申请' },
                { id: '1',name:'vip失效申请' },
                { id: '2',name:'重点申请' },
                { id: '3',name:'重点失效申请' }
            ]
        };


        $scope.d=false;
        $scope.accountRecord={};
        $scope.getdata=function(item,name,event){
            var temp;
            var aNames = document.getElementsByName(name);
            for(var i=0;i<aNames.length;i++){
                aNames[i].checked = false;
                aNames[i].parentNode.parentNode.style.background = '';
            }

            if(item.personVip==undefined||item.personVip=="") {

                    var oIds = document.getElementById(item.personEmphasis.emphasisId);
                    oIds.checked = true;
                    $scope.accountRecord = item;
                    $scope.d = true;
                    oIds.parentNode.parentNode.style.background = '#f6f8fa';

            }else{
                var oId = document.getElementById(item.personVip.vipId);
                oId.checked = true;
                $scope.accountRecord = item;
                $scope.d = true;
                oId.parentNode.parentNode.style.background = '#f6f8fa';
            }

            //阻止默认事件
            event.stopPropagation();
        }
        $scope.Info={};
        $scope.showP=function(item){
            $scope.Info=item;
            $scope.staffId= $scope.Info.personVip.staffId;
            $scope.Staffs();
            angular.element('#show2').modal('show');
            console.log( $scope.Info);

        }


        //得到选中的数据
       /* $scope.getData1=function(item){
            $scope.checkAll=false;
            if(item.personVip!=null){
                var vipId=item.personVip.vipId;
                var chk = document.getElementById(vipId);
            }else if(item.personEmphasis!=null){
                var emphasisId=item.personEmphasis.emphasisId;
                var chk1= document.getElementById(emphasisId);
            }
            $scope.items = {};
            $scope.items = item;
            if(vipId!=null){
                if(chk.checked == true){
                    if($scope.items.personVip.reviewState!=0){
                        layer.alert('该用户已审核！！',{icon : 0});
                        $scope.loading();
                        return;
                    }else{
                        $scope.data.datas.push($scope.items);
                    }
                }else{
                    $scope.temp = [];
                    $scope.temp=$scope.data.datas;
                    $scope.data={datas:[]};
                    for(var i = 0; i < $scope.temp.length; i ++){
                        console.log($scope.temp[i].personVip.vipId);
                        if($scope.temp[i].personVip.vipId != vipId){
                            $scope.data.datas.push($scope.temp[i]);
                        }
                    }
                }
            }else if(emphasisId!=null){
                if(chk1.checked == true){
                    if($scope.items.personEmphasis.applystatus!=0){
                        layer.alert('该用户已审核！！',{icon : 0});
                        $scope.loading();
                        return;
                    }else{
                        $scope.data.datas.push($scope.items);
                    }
                }else{
                    $scope.temp = [];
                    $scope.temp=$scope.data.datas;
                    $scope.data={datas:[]};
                    for(var i = 0; i < $scope.temp.length; i ++){
                        if($scope.temp[i].personEmphasis.emphasisId != emphasisId){
                            $scope.data.datas.push($scope.temp[i]);
                        }
                    }
                }
            }
            $scope.checkAll=false;
        };*/

        $scope.showPicture=function(){
            if($scope.showData.vipList!=null){
                if(angular.isArray($scope.showData.vipList)){
                }else{
                    $scope.annexList = [];
                    $scope.annexList.push($scope.showData.vipList);
                    $scope.showData.vipList = $scope.annexList;
                }
            }
            if($scope.showData.emphasisList!=null){
                if(angular.isArray($scope.showData.emphasisList)){
                }else{
                    $scope.annexList = [];
                    $scope.annexList.push($scope.showData.emphasisList);
                    $scope.showData.emphasisList = $scope.annexList;
                }
            }

        };
        //打开
        $scope.data={datas:[]};
        $scope.showData={};
        $scope.total='0';//总条数
        $scope.num=0;
        $scope.checkAll=true;//全选
        $scope.PendingApprovals={};
        $scope.Pending={};
        $scope.butUp=true;//上一条
        $scope.butNet=true;//下一条
        $scope.openPending=function(){
            console.log($scope.searchPaginator.object.pendingApprovals);
            if($scope.PendingApprovals.length==0){
                layer.msg('暂无待办审核！！',{icon : 0});
                angular.element('#show').modal('hide');
                return;
            }else{
                if($scope.checkAll){
                    $('#show').modal({backdrop: 'static', keyboard: false});
                    $scope.data={datas:[]};
                    if($scope.PendingApprovals.length>0){
                        $scope.num=1;
                        $scope.butNet=false;
                        $scope.butUp=false;
                    }else{
                        $scope.num=0;
                    }

                    for(var i=0;i<$scope.PendingApprovals.length;i++){
                        if( $scope.PendingApprovals[i].personVip!=null||$scope.PendingApprovals[i].personEmphasis!=null){
                            $scope.Pending=$scope.PendingApprovals[i];
                            if($scope.Pending.personEmphasis.emphasisId!=null||$scope.Pending.personVip.vipId!=null){
                                $scope.data.datas.push($scope.Pending);
                                $scope.showData=$scope.data.datas[0];

                            }
                            $scope.total=$scope.data.datas.length;
                        }
                    }
                    $scope.showPicture();
                    console.log($scope.showData);
                }else{
                    $('#show').modal({backdrop: 'static', keyboard: false});
                }
            }


        }

        //上一条
        $scope.up=function(){
            $scope.butNet=true;
            for(var x=0;x<$scope.data.datas.length;x++){
                $scope.num= $scope.num-1;
                $scope.total=$scope.data.datas.length * 1;
                $scope.showData=$scope.data.datas[$scope.num-1];
                $scope.showPicture();
                if($scope.num== 1){

                    $scope.butUp=false;
                    layer.msg('已是第一条数据！！',{icon : 0});
                    break;
                }else{
                    return;
                }

            }
        };
        //下一条
        $scope.annexList = [];

        $scope.next=function(){
            $scope.butUp=true;
            for(var x=0;x<$scope.data.datas.length;x++){
                $scope.num= $scope.num+1;
                $scope.total=$scope.data.datas.length * 1;
                $scope.showData=$scope.data.datas[$scope.num-1];
                $scope.showPicture();
                if($scope.num== $scope.total){

                    $scope.butNet=false;
                    layer.msg('已是最后一条数据！！',{icon : 0});
                    break;
                }else{
                    return;
                }

            }
        };

        //$scope.back=function(){
        //    $("#show").modal("hide");
        //    $scope.loading();
        //    $scope.data={datas:[]};
        //    $scope.num=1;
        //    $scope.checkAll=true;//全选
        //
        //};

        $scope.cancle1=function(){
            $("#show").modal("hide");
            $scope.loading();
            $scope.data={datas:[]};
            $scope.num=0;
            $scope.checkAll=true;//全选
        }
        $scope.cancle11=function(){
            $("#show2").modal("hide");
        }

        $scope.cancle2=function(){
            $("#show").modal("hide");
            $scope.loading();
            $scope.data={datas:[]};
            $scope.num=1;
            $scope.checkAll=true;//全选
        }

        $scope.cancle3=function(){
            $("#show").modal("hide");
            $scope.loading();
            $scope.data={datas:[]};
            $scope.num=1;
            $scope.checkAll=true;//全选
        }
        //审批
        $scope.personEmphasis={};
        $scope.personVip={};
        $scope.getPass=function(){
            if($scope.showData.personEmphasis.emphasisId!=null){
                $scope.personEmphasis=$scope.showData.personEmphasis;
                //重点客户审核
                //通过
                if($scope.personEmphasis.applystatus!=0){
                    layer.alert('该用户已审核！！',{icon : 0});
                }else{
                    $scope.personEmphasis.applystatus=1;
                    $scope.updatePerson();
                }

            }else if($scope.showData.personVip.vipId!=null){
                $scope.personVip=$scope.showData.personVip;
                if($scope.personVip.reviewState!=0){
                    layer.alert('该用户已审核！！',{icon : 0});
                }else{
                    $scope.personVip.reviewState=1;
                    $scope.update();
                }

            }
        };
        $scope.getPass1=function(Info) {
            $scope.personEmphasis = $scope.Info.personEmphasis;
            //重点客户审核
            //通过
            $scope.personEmphasis.applystatus = 1;
            $scope.updatePerson();
        }
        $scope.getPass2=function(Info) {
            $scope.personVip = $scope.Info.personVip;
            //vip客户审核
            //通过
            $scope.personVip.reviewState=1;
            $scope.update();
        }

        $scope.getNoPass1=function(Info){
            $scope.personEmphasis=$scope.Info.personEmphasis;
            //重点客户审核不通过
            $('#inputReason').modal({backdrop: 'static', keyboard: false});
            $scope.personEmphasis.applystatus=2;
        }
        $scope.getNoPass2=function(Info){
            $scope.personVip=$scope.Info.personVip;
            //Vip客户审核不通过
            $scope.personVip.reviewState=2;
            $('#Reason').modal({backdrop: 'static', keyboard: false});
        }

        //拒绝
        $scope.getNoPass=function(){
            if($scope.showData.personEmphasis.emphasisId!=null){
                $scope.personEmphasis=$scope.showData.personEmphasis;
                //重点客户审核
                if($scope.personEmphasis.applystatus!=0){
                    layer.alert('该用户已审核！！',{icon : 0});
                }else{
                    $('#inputReason').modal({backdrop: 'static', keyboard: false});
                    $scope.personEmphasis.applystatus=2;
                }

            }else if($scope.showData.personVip.vipId!=null){
                $scope.personVip=$scope.showData.personVip;
                if($scope.personVip.reviewState!=0){
                    layer.alert('该用户已审核！！',{icon : 0});
                }else{
                    $scope.personVip.reviewState=2;
                    $('#Reason').modal({backdrop: 'static', keyboard: false});
                }

            }
        };

        //VIP客户申请审核
        $scope.update=function(){
            $http.put(url+'/PersonVip/UpdatePersonVipReview',{PersonVip:$scope.personVip}).success(function(){
                layer.msg('审核成功',{icon : 1,time : 2000});
                if($scope.personVip.reviewState!=2){
                    $scope.show( $scope.personVip);
                }

            }).error(function(data, status, headers, config){
                layer.msg("审核失败",{icon : 3,time : 2000});
            }) ;
        };

        //重点客户申请审核
        $scope.updatePerson=function(){
            $http.put(url+'/PersonEmphasis/UpdatePersonEmphasis',{PersonEmphasis: $scope.personEmphasis}).success(function(){
                layer.msg('审核成功',{icon : 1,time : 2000});
                $scope.searchPaginator._load();
            }).error(function(data, status, headers, config){
                layer.msg("审核失败",{icon : 3,time : 2000});
            }) ;
        };

        //vip设置专员
        var reviewState=1;
        $http.get(url+'/PersonVip/selectPersonVipbyState/'+reviewState).success(function(data)
        {
            $scope.personVips=data.PersonVip;
        });

        //打开模态框，操作VIP用户和项目专员的关联
        $scope.per={};
        $scope.show=function(item){
            $http.get(url + '/VipProjectStaff/selectVipProStaffByVipid/' + item.vipId).success(function(data){
                console.log(data.VipProjectStaff);
                if(data.VipProjectStaff != ""){
                    layer.alert('该用户已关联，请至详情查看！！！',{icon : 0});
                } else {
                    $('#personDatil').modal({backdrop: 'static', keyboard: false});
                    $scope.per=item;
                    $scope.projectlist();
                    $scope.stafflist();
                }
            }).error(function(data){console.log(data);alert("failed!");})
        };

        //查询所有项目
        $scope.projectlist = function(){
            $scope.Project={};
            $http.get(url + '/Project/selectAllProject').success(function(data){
                $scope.Project = data.Project;
            }).error(function(data){
                layer.alert('查询出错！！',{icon : 0});
            })
        };

        //查询所有专员
        $scope.stafflist = function(){
            $scope.Staff = {};
            $http.get(url + '/staff/listAllStaffRestful').success(function(data){
                $scope.Staff = data.Staff;
            }).error(function(data){
                layer.alert('查询出错！！',{icon : 0});
            })
        };
        //
        $scope.staffs={};
        $scope.Staffs = function(){
            $http.get(url + '/staff/getStaffById/'+ $scope.staffId).success(function(data){
                console.log(data);
                $scope.Staff = data.Staff;
            }).error(function(data){
                layer.alert('查询出错！！',{icon : 0});
            })
        };


        //将客户与项目，专员的关联信息插入数据库
        //定义一个表类型对象
        $scope.VipProjectStaff = {
            vipId:"",
            staffId:"",
            projectIds:[]
        };
        $scope.staffid = '';
        $scope.addVipProStaff = function(vipid){
            $scope.VipProjectStaff.vipId = vipid;
            $scope.VipProjectStaff.staffId = $scope.staffid;
            //循环遍历将多选框的值传给数组
            var temp = document.getElementsByName('checkbox');
            for(var i=0;i<temp.length;i++){
                if(temp[i].checked==true){
                    $scope.VipProjectStaff.projectIds.push(temp[i].id);
                }
            };
            console.log($scope.VipProjectStaff);
            $http.post(url + '/VipProjectStaff/insertVipProjectStaff',{VipProjectStaff:$scope.VipProjectStaff}).success(function(data){
                layer.msg('设置成功',{icon : 1,time : 2000});
                $("#personDatil").modal("hide");
                $("#show").modal("hide");
                $scope.loading();
                $scope.pendingApproval.types='';
            }).error(function(data){
                layer.msg("设置失败",{icon : 3,time : 2000});
            })
        };

        $('#myModal').modal({backdrop: 'static', keyboard: false});

    }]);
});