/**
 * Created by 倪明 on 2015/8/14.
 * 名称：项目资产库管理
 */

/**
 * Created by NM on 2018/1/18.
 * 项目资产库管理js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('assetPoolManagementCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {
        var url = $rootScope.url;
        $scope.show1 = true;   //资产列表
        $scope.show2 = false;   //新增资产
        $scope.show3=false;//修改资产
        $scope.datils=false; //点击查看详情
        $scope.currentProject={};           //当前所选项目
        $scope.CassetRepository={
            propertyId:'',//资产id
            propertyTypeName:'',//专业名称
            propertyNumber:'', //资产编号
            propertyName:'',  //资产名称
            propertyTypeId:'', //资产分类id
            propertySpecification:'', //资产规格/型号
            expirationDate:'',//保质期
            brand:'',//品牌
            producingArea:'',//产地
            manufacturer:'',//厂商
            manufacturerPhone:'',//厂商电话
            buildingComponentId:'',//组件id
            projectId:'',//项目id
            productionDate:'',//资产生产日期（合同初始化用）
            contractExpirationDate:'',//合同资产质保期（合同初始化用）
            startUsingDate:'',//资产启用日期（合同初始化用）
            assetOperationState:'',
            buildingStructureIds:[]
        };
        /**
         * 显示新建方案
         */
        $scope.btnIndex = 2;
            //资产列表
        $scope.addCheck = function(index){
            $scope.show1 = true;
            $scope.show2 = false ;
            $scope.show3=false;
            $scope.datils=false; //点击查看详情
            $scope.btnIndex = index;
        };
        //新增资产
        $scope.addCheckOne = function(index){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3=false;
            $scope.datils=false; //点击查看详情
            $scope.btnIndex = index;
        };

        /******************新增资产*********************/
            //模态框显示
        $scope.id='';
        $scope.selectAsset=function(){
            $("#select").modal("show");
            //查询所有专业列表方法.
            $http.get(url + '/PropertyType/trees').success(function(data) {
                $scope.zNodes =[{}];
                //获取json数据
                $scope.propertyTypes = data.Tree;

                var tasks =  $scope.propertyTypes;
                if(tasks!=null){
                    for(var i=1;i<tasks.length;i++){
                        $scope.zNode ={ id:tasks[i].propertyTypeId, pId:tasks[i].parentId, name:tasks[i].propertyTypeName};
                        $scope.zNodes.push($scope.zNode);
                    }
                    $.fn.zTree.init($("#treeDemo"), setting, $scope.propertyTypes);
                    console.log(tasks);
                }
            }).error(function(data,status,headers,config){
                alert("专业资产初始化专业查询失败！")
            });
            //获得选择的资产信息
            $scope.saveChoose=function(){
                var treeObj=$.fn.zTree.getZTreeObj("treeDemo");
                if(treeObj.getCheckedNodes(true).length>0){
                    var nodes = treeObj.getCheckedNodes(true);
                    for(var i=0;i<nodes.length;i++){
                        var isNode = nodes[i];
                        console.log(isNode);
                        if($scope.show3 == true){
                            if(isNode.pId==null){
                                $scope.nameaa=isNode.name;//得到专业名称
                            }
                            if(isNode.level==1){ //得到分类信息
                                $scope.datab.propertyTypeId=isNode.id;
                                $scope.datab.propertyTypeName=isNode.name;
                            }
                            if(isNode.level==2){//得到资产信息
                                $scope.datab.propertyId=isNode.id;
                                $scope.datab.propertyName=isNode.name;
                                console.log( $scope.datab);
                            }
                        }else{
                            if(isNode.pId==null){
                                $scope.nameaa=isNode.name;//得到专业名称
                            }
                            if(isNode.level==1){ //得到分类信息
                                $scope.CassetRepository.propertyTypeId=isNode.id;
                                $scope.CassetRepository.propertyTypeName=isNode.name;
                            }
                            if(isNode.level==2){//得到资产信息
                                $scope.CassetRepository.propertyId=isNode.id;
                                $scope.CassetRepository.propertyName=isNode.name;
                                console.log( $scope.CassetRepository);
                            }
                        }

                    }
                    $scope.getData();
                }
            };
        };

        //通过选择的资产id查询资产信息

        $scope.getData=function(){
            // 定义通过id查询资产.
            $scope.asset={};
            $http.get(url+'/Property/getPropertyByIdRest/'+$scope.CassetRepository.propertyId).success(function(data){
                $scope.asset=data.Property;
                if($scope.show3 == true){
                    if($scope.asset!=null){
                        $scope.datab.propertyNumber= $scope.asset.propertyNumber;
                        $scope.datab.propertyName= $scope.asset.propertyName;
                        $scope.datab.propertySpecification= $scope.asset.propertySpecification;
                        $scope.datab.brand= $scope.asset.brand;
                        $scope.datab.producingArea= $scope.asset.producingArea;
                        $scope.datab.manufacturer= $scope.asset.manufacturer;
                        $scope.datab.expirationDate= $scope.asset.expirationDate;//保质期
                        $scope.datab.manufacturerPhone=$scope.asset.manufacturerPhone;
                    }
                }else{
                    if($scope.asset!=null){
                        $scope.CassetRepository.propertyNumber= $scope.asset.propertyNumber;
                        $scope.CassetRepository.propertyName= $scope.asset.propertyName;
                        $scope.CassetRepository.propertySpecification= $scope.asset.propertySpecification;
                        $scope.CassetRepository.brand= $scope.asset.brand;
                        $scope.CassetRepository.producingArea= $scope.asset.producingArea;
                        $scope.CassetRepository.manufacturer= $scope.asset.manufacturer;
                        $scope.CassetRepository.expirationDate= $scope.asset.expirationDate;//保质期
                        $scope.CassetRepository.manufacturerPhone=$scope.asset.manufacturerPhone;
                    }
                }
            }).error(function(data,status,headers,config){
                alert("获取资产信息失败！")
            });
        };

        //根据资产编号查询合同信息
        $scope.searchaa=function(){
            $("#selectContract ").modal("show");
            $http.get(url+'/Contract/getContractDataByIdRest/'+$scope.CassetRepository.propertyId).success(function(data){
                $scope.contract=data.Contract;
            }).error(function(data,status,headers,config){
                alert("获取资产信息失败！")
            });
        };

        $scope.getContract=function(aa){
            if($scope.show3 == true){
                $scope.datab.contractId=aa.id;
                $scope.datab=aa.contractProject;//施工合同
                $scope.datab=aa.secondParty;//施工单位
                $scope.datab.productionDate=aa.productionDate;
                $scope.datab.startUsingDate=aa.startUsingDate;
                $scope.datab.contractExpirationDate=aa.contractExpirationDate;

            }else{
                $scope.CassetRepository.contractId=aa.id;
                $scope.contractProject=aa.contractProject;//施工合同
                $scope.secondParty=aa.secondParty;//施工单位
                $scope.CassetRepository.productionDate=aa.productionDate;
                $scope.CassetRepository.startUsingDate=aa.startUsingDate;
                $scope.CassetRepository.contractExpirationDate=aa.contractExpirationDate;

            }

        };

        var init=function() {
            //加载项目信息
            $scope.loadProject();
            //监测项目下拉框的变化
            $scope.$watch('currentProject', function () {
                $scope.loadBuilding();
            });
        }

        $scope.loadProject=function(){
            //获取所有项目信息
            $http.get(url+'/Project/listAllProject').success(function(data){
                $scope.allProjects=data.Project;
            });
        };
        //根据所选项目信息查询项目下的建筑信息
        $scope.loadBuilding=function() {
            if ($scope.currentProject.projectId != null) {
                $scope.CassetRepository.projectId = $scope.currentProject.projectId;//得到项目的id

                $http.get(url + '/BuildingStructureNew/getBuildingStructureNewAndComponent/' + $scope.currentProject.projectId).success(function (data) {
                    $scope.zNodes = [{}];                    //获取json数据
                    $scope.buildingStructureNews = data.BuildingStructureNew;

                    var tasks = $scope.buildingStructureNews;
                    if (tasks != null) {
                        for (var i = 0; i < tasks.length; i++) {
                            $scope.zNode = {
                                id: tasks[i].id,
                                pId: tasks[i].parentId,
                                name: tasks[i].nodeName,
                                fullName: tasks[i].fullName
                            };
                            $scope.zNodes.push($scope.zNode);
                        }
                        $.fn.zTree.init($("#buildingtreeDemo"), setting, $scope.zNodes);
                        var zTree = $.fn.zTree.getZTreeObj("buildingtreeDemo");
                        var nodes = zTree.getNodes();
                        nodes[0].name = "建筑信息";
                        zTree.updateNode(nodes[0]);
                    }
                }).error(function (data, status, headers, config) {
                    alert("建筑信息查询失败！")
                });
            }
        }
        init();


        //保存
        $scope.saveAll=function(){
            if($.fn.zTree.getZTreeObj("buildingtreeDemo").getCheckedNodes(true).length>0){
                var nodes = $.fn.zTree.getZTreeObj("buildingtreeDemo").getCheckedNodes(true);
                console.log(nodes);
                $scope.treeResult={treeList:[]};
                for(var i=0;i<nodes.length;i++){
                    var isNode = nodes[i];
                    //得到所选节点的全名
                    if(nodes[i].check_Child_State == -1){
                        if($scope.show3==true){
                            $scope.treeResult.treeList.push(nodes[i]);
                            $scope.CassetRepository.buildingStructureIds=$scope.treeResult.treeList;
                            // $scope.datab.buildingStructureIds=$scope.treeResult.treeList;
                        }else{
                            $scope.treeResult.treeList.push(nodes[i]);
                            $scope.CassetRepository.buildingStructureIds=$scope.treeResult.treeList;
                            // $scope.datab.buildingStructureIds=$scope.treeResult.treeList;
                        }
                    }
                    console.log($scope.chooseData);
                }

            }else{
                alert("请选择建筑！！！");
            }
            $http.post(url+'/CassetRepository/AddCassetRepositorys',{CassetRepository:$scope.CassetRepository}).success(function(){
                alert("新增资产成功！");
                console.log($scope.CassetRepository);
                $scope.addCheck();
            }).error(function(data,status,headers,config){
                alert("新增资产失败！");
            });
        };



        /***************新增结束************************/



        /***************查询开始************************/
            //查询所有专业列表方法.
        $http.get(url + '/PropertyType/listParentPropertyType').success(function(data) {
            $scope.propertyTypes = data.PropertyType;
        }).error(function(data,status,headers,config){
            alert("专业资产初始化专业查询失败！")
        });

        //根据条件查询
        $scope.search={};
        $scope.cData = [];
        $scope.getSelected=function(){
            //获得选中的专业
            var temp = document.getElementsByName('checkbox');
            for (var i = 0; i < temp.length; i++) {
                $scope.itemData = {
                    propertyTypeId: ""
                };
                if (temp[i].checked == true) {
                    $scope.itemData.propertyTypeId = temp[i].id;
                    $scope.cData.push($scope.itemData);
                    console.log($scope.cData);
                }

            };
            $scope.initData();   //根据专业查询分类
        };

        //根据专业查询分类
        $scope.dataa={};
        $scope.sea={};
        $scope.initData=function(){
            for(var i=0;i<$scope.cData.length;i++){
                $scope.idss='';
                $scope.idss=$scope.cData[i].propertyTypeId;
                $http.get(url+'/PropertyType/selectByIds/'+  $scope.idss).success(function(data){
                    for(var i=0;i<data.PropertyType.length;i++){
                        if(app.get('tyjUtil').isArray(data.PropertyType[i])==false){
                            var obj=data.PropertyType[i];
                            data.PropertyType[i]=obj;
                        }
                    }
                    $scope.dataa=data.PropertyType;
                    console.log($scope.alls);
                }).error(function(data,status,headers,config){
                    alert("查询失败!")
                });
            }
        };

        $scope.change=function() {
            $http.get(url + '/Property/getPropertyDataByIdRest/'+ $scope.sea.propertyTypeId).success(function(data){
                $scope.dataaa = data.Property;

            }).error(function(data,status,headers,config){
                alert("查询失败!")
            });

        };

        $scope.search={page:{}};//搜索条件
        var fetchFunction = function(page,callback) {
            $scope.search.page=page;
            $http.post(url + '/CassetRepository/listPageSpecialAndClassify',{CassetRepository:$scope.search}).success(callback);
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log($scope.searchPaginator);

        //删除
        $scope.delete=function(id){
            if(confirm("是否删除?"))
            {
                $http({
                    method:'DELETE',
                    url:url + '/CassetRepository/DeleteCassetRepositoryById/'+id
                })
                    .success(function(data, status, headers, config){
                        console.log("删除成功");
                        $scope.searchPaginator._load();//刷新数据
                    });
            }
        };

        //修改保存
        $scope.save=function(){
            console.log($scope.datab);
            $http.put(url+'/CassetRepository/UpdateCassetRepository',{CassetRepository:$scope.datab}).success(function(){
                alert("修改成功");
                $scope.show1 = true;   //资产列表
                $scope.show2 = false;   //新增资产
                $scope.show3=false;//修改资产
            }).error(function(data, status, headers, config){
                alert("修改失败");
            }) ;
        };

        $scope.datils=false;
        $scope.pross={};
        $scope.showDatil=function(sss){
            $http.get(url + '/CassetRepository/getCassetRepositoryDatils/'+ sss.assetRepositoryId).success(function(data){
                $scope.datab = data.CassetRepository;
                $scope.pross=sss;
                $scope.datils=true;
                console.log(data);
            }).error(function(data,status,headers,config){
                alert("查询失败!")
            });


        };

        //判断checkbx是否选中
        $scope.d=false;
        $scope.currentObject={};
        $scope.getdata=function(items){
            var chk = document.getElementsByName("aaa");
            for(var i=0;i<chk.length;i++){
                if( chk[i].checked==true){
                    $scope.currentObject=items;
                    $scope.btnIndex = items.custId;
                    $scope.d=true;
                    return;
                }else{
                    $scope.d=false;
                    $scope.btnIndex = '';
                }
            }
        };

        //修改
        $scope.updateAsset=function(){
            if($scope.d==false){
                layer.alert('请先选择修改项！！',{icon : 0});
            }else if($scope.d==true){
                console.log($scope.currentObject);
                var id = $scope.currentObject.assetRepositoryId;
                $http.get(url + '/CassetRepository/getCassetRepositoryDatils/'+ id).success(function(data){
                    $scope.datab = data.CassetRepository;
                    $scope.datils=false;
                    $scope.show1 = false;
                    $scope.show2 = false ;
                    $scope.show3=true;
                    $scope.datils=false;
                    console.log(data);
                }).error(function(data,status,headers,config){
                    alert("查询失败!")
                });
            }
        };


        /**************查询结束*************************/
    }]);
});



