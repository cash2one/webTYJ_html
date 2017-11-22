/**
 * Created by Administrator on 2015/10/29.
 */

        'use strict';

        define(function (require) {
            var app = require('../../../../app');
            app.controller('newAddContractCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
                var url = $rootScope.url;  //全局访问路径
                var fileUrl=$rootScope.fileUrl;    //上传的文件路径
                $scope.PropertyResult={propertys:[],buildingStructureNews:[],functionals:[],startTimes:[]};
                var filePath='';
                $scope.doClick(1)
                $scope.contract={
                    contractOddNum:'',
                    contractNum:'',//合同编号
                    contractType:'',
                    contractProject:'',//合同项目
                    firstParty:'',//合同甲方
                    econdParty:'',//合同乙方
                    thirdParty:'',//合同丙方
                    fourParty:'',//合同丁方
                    operator:'',//操作人
                    contractPropertyStructures:[],    //人和建筑关系
                    annexs:[]
                };
                $scope.chooseDatass={  //房子和资产对应关系
                    propertyId:'',
                    buildingStructureId:'',
                    functionalId:'',
                    startTime:''
                };
                $scope.allProjects=[];              //所有项目信息
                $scope.currentProject={};           //当前所选项目
                $scope.currentArmour={};           //当前所选甲方客户信息
                $scope.currentSecond={};           //当前所选乙方客户信息
                $scope.cassetRepositorys=[];      //资产库对象列表信息
                $scope.currentThird={};           //当前所选维护方客户信息

                /**
                 * 初始化方法
                 */
                var init =function(){
                    //加载项目信息
                    $scope.loadProject();
                    //监测项目下拉框的变化
                    $scope.$watch('currentProject',function(){
                        $scope.loadBuilding();
                    });
                };

                $scope.loadProject=function(){
                    //获取所有项目信息
                    $http.get(url+'/Project/listAllProject').success(function(data){
                        $scope.allProjects=data.Project;
                    });
                    //获取所有甲方客户信息
                    $http.get(url+'/EnterpriseCustNew/listAllEnterpriseCustNewRestful').success(function(data){
                        $scope.armourEnterpriseCusts=data.EnterpriseCustNew;  //甲方客户信息
                    });
                };

                //根据所选项目信息查询项目下的建筑信息

                $scope.loadBuilding=function(){
                    if($scope.currentProject.projectId!=null) {
                        // alert($scope.currentProject.projectId);
                        $("#buildingNewtreeDemo").remove();
                        $("#remo").append("<ul id='buildingNewtreeDemo' class='ztree'></ul>");
                        $http.get(url + '/BuildingNew/BuildingNewprojectIdAll/' + $scope.currentProject.projectId).success(function (data) {

                            //获取json数据
                            $scope.trees = data.Tree;

                            $.fn.zTree.init($("#buildingNewtreeDemo"), setting,  $scope.trees);

                        }).error(function (data, status, headers, config) {
                            layer.alert("建筑信息查询失败！",{icon:2})
                        });

                    }

                };

                $scope.chooseData=[];
                var propertyIds=new Array();
                $scope.propertyData={};
                $scope.componentProperty=[];
                //根据选择的建筑查询该建筑的资产信息
                $scope.onNextStep = function() {
                    if($scope.currentProject.projectName==undefined ||$scope.currentProject.projectName=="" ||$scope.currentProject.projectName == null){
                        layer.alert('项目不能为空！',{icon : 0});
                        return;
                    }
                    $scope.contract.contractProject=$scope.currentProject.projectName ;//添加选择项目名称

                    //获取选择节点的建筑id和
                    if($.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true).length>0){
                        var nodes = $.fn.zTree.getZTreeObj("buildingNewtreeDemo").getCheckedNodes(true);
                        console.log(nodes);
                        var tmpNode;
                        for(var i=0; i<nodes.length; i++){
                            tmpNode = nodes[i];
                            if(tmpNode.check_Child_State<0){
                                $scope.chooseData.push(tmpNode.id);
                            }
                        }
                        // console.log(  $scope.chooseData)
                    }else{
                        layer.alert("请先选择施工范围！！！",{icon:2});

                    }

                    if( $scope.chooseData.length>0){
                        for(var i=0;i< $scope.chooseData.length;i++){
                            $http.get(url+'/ComponentProperty/getComponentPropertyByBSId/'+ $scope.chooseData[i]).success(function(data){
                                //console.log(  data)
                                $scope.componentProperty=data.ComponentProperty;
                                $scope.propertyData=$scope.componentProperty;

                                console.log(  $scope.propertyData)

                            });
                        }
                    }

                };


                //得到房子和建筑对应关系
                $scope.chooseDataa=function(item,index){
                    console.log(index);
                    //console.log(item)
                    var aa=document.getElementsByName('chkSon');
                    for(var i=0;i<aa.length;i++){
                        if(aa[i].checked==true){
                            $scope.chooseDatass={  //房子和资产对应关系
                                propertyId:'',
                                buildingStructureId:'',
                                functionalId:'',
                                startTime:''
                            };
                            $scope.chooseDatass.propertyId=item.propertyId;
                            $scope.chooseDatass.buildingStructureId=item.buildingStructureId;
                            $scope.chooseDatass.functionalId=item.functionalId;
                            /**
                             * 新增合同
                             * 版本 001
                             * BUG 371 陶勇超 2016年1月18日 16:07:23
                             */
                            $scope.chooseDatass.startTime=document.getElementById(index).value;
                            console.log( $scope.chooseDatass.startTime)
                            $scope.contract.contractPropertyStructures.push($scope.chooseDatass);
                            $scope.PropertyResult.propertys.push($scope.chooseDatass.propertyId);
                            $scope.PropertyResult.buildingStructureNews.push($scope.chooseDatass.buildingStructureId)
                            $scope.PropertyResult.functionals.push($scope.chooseDatass.functionalId)
                            $scope.PropertyResult.startTimes.push(  $scope.chooseDatass.startTime)
                        }
                    }
                };

                /**
                 * 查询所有合同信息
                 */
                $scope.contra;
                $http.get(url+'/Contract/listAllContract').success(function(data){
                    $scope.contra=data.Contract

                }).error(function (data, status, headers, config) {
                    layer.alert("查询失败！",{icon:2})
                });
                /**
                 * 新增合同
                 */
                $scope.onSaveContract = function() {

                    $scope.contract.firstParty=$scope.currentArmour.enterpriseName ;//添加选择甲方客户
                    $scope.contract.secondParty=$scope.currentSecond.enterpriseName ;  //添加选乙方客户
                    $scope.contract.thirdParty=$scope.currentThird.enterpriseName;
                    /**
                     * 禅道BUG 252  254  255
                     * 修改人：陶勇超
                     * 2016年1月8日 14:27:17
                     */
                    if(   $scope.contra.length>0){
                        for(var i=0;i<$scope.contra.length;i++){
                            if($scope.contract.contractOddNum==$scope.contra[i].contractOddNum){
                                layer.alert('合同单号已存在！',{icon : 0});
                                return;
                            }
                        }
                    }
                    if(   $scope.contra.length>0){
                        for(var i=0;i<$scope.contra.length;i++){
                            if($scope.contract.contractNum==$scope.contra[i].contractNum){
                                layer.alert('合同编号已存在！',{icon : 0});
                                return;
                            }
                        }
                    }
                    if($scope.contract.contractOddNum==undefined ||$scope.contract.contractOddNum=="" ||$scope.contract.contractOddNum == null){
                        layer.alert('合同单号不能为空！',{icon : 0});
                        return;
                    }else if($scope.contract.contractNum==undefined ||$scope.contract.contractNum=="" ||$scope.contract.contractNum == null){
                        layer.alert('合同编号不能为空！',{icon : 0});
                        return;
                    }else
                    if($scope.contract.contractType==undefined ||$scope.contract.contractType=="" ||$scope.contract.contractType == null){
                        layer.alert('合同类型不能为空！',{icon : 0});
                        return;
                    }else
                    if($scope.contract.contractProject==undefined ||$scope.contract.contractProject=="" ||$scope.contract.contractProject == null){
                        layer.alert('项目不能为空！',{icon : 0});
                        return;
                    }else  if($scope.contract.firstParty==undefined ||$scope.contract.firstParty=="" ||$scope.contract.firstParty == null){
                        layer.alert('建设方不能为空！',{icon : 0});
                        return;
                    }
                    else if($scope.contract.secondParty==undefined ||$scope.contract.secondParty=="" ||$scope.contract.secondParty == null){
                        layer.alert('施工方不能为空！',{icon : 0});
                        return;
                    }
                    else if($scope.contract.thirdParty==undefined ||$scope.contract.thirdParty=="" ||$scope.contract.thirdParty == null){
                        layer.alert('维保方不能为空！',{icon : 0});
                        return;
                    } else if($scope.contract.startUsingDate==undefined ||$scope.contract.startUsingDate=="" ||$scope.contract.startUsingDate == null){
                        layer.alert('启动日期不能为空！',{icon : 0});
                        return;
                    }else if($scope.contract.contractPropertyStructures==undefined ||$scope.contract.contractPropertyStructures=="" ||$scope.contract.contractPropertyStructures == null){
                        layer.alert('资产不能为空！',{icon : 0});
                        return;
                    }
                    // console.log($scope.contract);


                    $scope.PropertyResult.contract=$scope.contract;
                    /**
                     * 新增合同
                     * 版本 001
                     * BUG 371 陶勇超 2016年1月18日 16:07:23
                     */
                    $http.post(url + '/Contract/insertContractRest',{Contract:$scope.contract}).success(function(){
                        layer.msg('新增合同成功！',{icon:1,time:2000});
                        $location.path("/index/baseManagement/newContractInitialization/newContractCheck");

                    }).error(function(){
                        layer.alert('新增合同失败！',{icon:2});
                    });

                };
                /**
                 * 取消按钮
                 * 禅道BUG 039 024
                 * 修改人：陶勇超
                 * 2016年1月5日 15:48:54
                 */
                $scope.cence=function(){

                    $scope.currentProject={};           //当前所选项目
                    $scope.currentArmour={};           //当前所选甲方客户信息
                    $scope.currentSecond={};           //当前所选乙方客户信息
                    $scope.cassetRepositorys=[];      //资产库对象列表信息
                    $scope.currentThird={};           //当前所选维护方客户信息
                    $scope.contract={};
                    $scope.chooseData=[];
                    $scope.propertyData={};
                    $("#buildingNewtreeDemo").remove();
                    $("#remo").append("<ul id='buildingNewtreeDemo' class='ztree'></ul>");
                };
                init();
                /**
                 * 上传文件
                 * @type {{annexAddress: string, annexName: string}}
                 */
                $scope.annex = {annexAddress:'',annexName:''};
                $scope.addAnnex=function(){
                    $("#zyupload").remove();
                    $("#remove").append("<div id='zyupload' class='zyupload'></div>");
                    $(function(){
                        // 初始化插件

                        $("#zyupload").zyUpload({
                            width            :   "550px",                 // 宽度
                            height           :   "auto",                 // 宽度
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
                                console.info(selectFiles);
                            },
                            onDelete: function(file, files){
                                console.log(file.name);
                            },
                            onSuccess: function(file, response){          // 文件上传成功的回调方法
                                filePath=response;
                                $scope.annex.annexName = file.name;
                                $scope.annex.annexAddress = filePath;
                                $scope.contract.annexs.push($scope.annex);
                                console.log($scope.contract.annexs);
                                $scope.annex={};
                                layer.msg("上传成功",{icon:1,time:2000})
                                /*
                                 BUG 250
                                 陶勇超
                                 2016年1月12日 18:19:12
                                 */
                                $("#uploadInf").append("<p>上传成功，文件名是：" + file.name + "</p>");
                            },
                            onFailure: function(file, response){          // 文件上传失败的回调方法
                                layer.alert("上传失败",{icon:2})
                            },
                            onComplete: function(response){           	  // 上传完成的回调方法
                                console.log(response);
                            }
                        });

                    });
                };
    }])
});