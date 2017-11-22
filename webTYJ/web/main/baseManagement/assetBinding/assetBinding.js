/**
 * Created by NM on 2016/1/22.
 * 资产绑定js
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('assetBindingCtrl', ['$scope', '$http','$rootScope','$location','$filter', function ($scope,$http,$rootScope,$location,$filter) {

        $scope.doClick(6);//增加tab高亮显示   王洲   2016.2.2

        var projectid = '';//获取项目id  王洲  2016.2.17
        var projectids = JSON.parse(localStorage.getItem("project_id"));
        $scope.projectIds = projectids?projectids:projectid;
        $scope.delPersonNum=[];;//存放要删除的业主
        var url = $rootScope.url;
        $scope.buildingStructureNew={};
        $scope.addPersonBuildingNew={};
        $scope.eCust=false;
        $scope.pCust=false;
        $scope.enterperise={enterpriseId:'',buildingStructureId:'',custType:''};
        $scope.personBuildingNew={};
        $scope.currentProject={projectId:'',name:'',enterpriseName:'',isBindingAssets:'',fullName:''};
        $scope.currentProject.isBindingAssets=3;
        $scope.data = [];
        $scope.buildingStructureId='';
        $("#div2").hide();
        //$scope.show1=true;
        //$scope.show2=false;
        $scope.currentProject.projectId = $scope.projectIds;//将项目id赋予查询条件中的项目id  王洲  2016.2.17


        /**
         * 用于选中后的切换界面
         */
        $scope.changeShow2=function(){
            $("#div0").hide();
            $("#div1").hide();
            $("#div9").hide();
            $("#div2").show();
        };

        /**
         * 返回首页,并重置某些参数
         */
        $scope.changeShow1=function(boolen){
            $("#div0").show();
            $("#div9").show();
            $("#div1").show();
            $("#div2").hide();
            $scope.paramReset();
            if(boolen==true){
                $scope.delPersonNum=[];
                return;
            }
            $scope.searchs(1);
        };


        /**
         * 查询项目
         */
        //屏蔽查询所有项目接口  王洲  2016.2.17
        /*var FindprojectID;
         var currentURI = url + '/Project/listAllProject';
         $http.get(currentURI).success( function (data) {
         $scope.projectssss= data.Project;
         FindprojectID = data.Project[0].projectId;
         });*/
        //var projectId = "333128a4-1fbc-11e5-b513-02004c4f4f50";
        var rownum = 0;
        $scope.s = "";
        var ss="";
        var fileUrl=$rootScope.fileUrl;    //上传的文件路径
        $scope.daochushuju=function(num){
            $scope.isBindingAssets='';
            if( $scope.currentProject.isBindingAssets==3){
                $scope.isBindingAssets=0;
            }else if($scope.currentProject.isBindingAssets==1){
                $scope.isBindingAssets=1;
            }else if($scope.currentProject.isBindingAssets==0){
                $scope.isBindingAssets=2;
            }

            if(($scope.currentProject.projectId==null||$scope.currentProject.projectId=="")&&($scope.currentProject.name==null||$scope.currentProject.name=="")&&($scope.currentProject.fullName==null||$scope.currentProject.fullName=="")){
                layer.alert('请选择查询条件',{icon : 0});
            }else{
                if(num==1){

                    window.location.href=fileUrl +"/info/listBuildingStructureSearchMB.do?projectId="+$scope.currentProject.projectId+"&fullName="+$scope.currentProject.fullName+"&name="+$scope.currentProject.name+"&isBindingAssets="+ $scope.isBindingAssets+"&num="+num;
                }
                if(num==2){
              
                

                    window.location.href=fileUrl +"/info/listBuildingStructureSearchMB.do?projectId="+$scope.currentProject.projectId+"&fullName="+$scope.currentProject.fullName+"&name="+$scope.currentProject.name+"&isBindingAssets="+ $scope.isBindingAssets+"&num="+num;
                    //window.location.href=fileUrl +"/info/importExcelTempletForBuil.do";
                }

            }
            //window.location.href=fileUrl +"/info/listBuildingStructureSearchMB.do?projectId="+$scope.currentProject.projectId+"&fullName="+$scope.currentProject.fullName+"&name="+$scope.currentProject.name+"&isBindingAssets="+$scope.currentProject.isBindingAssets;
        };

        $scope.daochumoban=function(){

        };

        /**
         * 按照条件查询建筑信息及建筑下的业主信息
         */
        $scope.searchs=function(num){

            $scope.s = "";
            $scope.sss = "";

            document.getElementById("div1").innerHTML = "";
            if(($scope.currentProject.projectId==null||$scope.currentProject.projectId=="")&&($scope.currentProject.name==null||$scope.currentProject.name=="")&&($scope.currentProject.fullName==null||$scope.currentProject.fullName=="")&&($scope.currentProject.enterpriseName==null||$scope.currentProject.enterpriseName=="")){
                layer.alert('请选择查询条件',{icon : 0});
            }else{
                //console.log($scope.currentProject);
                $scope.projectId =$scope.currentProject.projectId;
                $scope.currentProject.parentId= $scope.projectId;
                $scope.parentId =$scope.currentProject.projectId;
                $http.post(url + '/BuildingStructureNew/findListByProAndParentId', {BuildingStructureNew: $scope.currentProject}).success(function (data1) {
                    //获取json数据
                   // console.log(data1.Node.length);
                    if(data1.Node.length==0){
                       // layer.alert('暂无数据',{icon : 0});
                        $scope.s = "<div align='center' style='font-size: 14px;'>暂无数据</div>";
                        $('#div1').html($scope.s);
                    }else {
                        var config = {};
                        config = {

                            id: "tg1",
                            width: "100%",
                            renderTo: "div1",
                            headerAlign: "left",
                            headerHeight: "30",
                            dataAlign: "left",
                            indentation: "20",
                            folderOpenIcon: "images/icon/mn/folder.png",
                            folderCloseIcon: "images/icon/mn/folder-closed.png",
                            defaultLeafIcon: "images/icon/mn/file.png",
                            hoverRowBackground: "false",
                            folderColumnIndex: "0",
                            itemClick: "itemClickEvent",
                            columns: [
                                //{ headerText: "复选框", headerAlign: "center", dataAlign: "center", width: "20", handler: "chechbox" },
                                //{headerText: "操作", dataField: "id", headerAlign: "center", handler: "checkbox"},
                                {headerText: "", headerAlign: "center", dataAlign: "center", width: "15"},
                                {headerText: "房屋名称", dataField: "nodeName", headerAlign: "center", handler: "text"},
                                {headerText: "业主信息", dataField: "names", headerAlign: "center", handler: "text"},
                                {headerText: "房产证号", dataField: "buildingCertificate", headerAlign: "center", handler: "text"},
                                {headerText: "建筑面积", dataField: "buildingArea", headerAlign: "center", handler: "text"},
                                {headerText: "建筑类型", dataField: "buildingType", headerAlign: "center", handler: "text"}
                                //{headerText: "操作", dataField: "id", headerAlign: "center", handler: "checkbox"}
                            ],
                            data: []
                        };
                        /* for(var i ;i<data1.Node.length;i++){
                         config.data.push(data1.Node[i]) ;
                         }*/
                        config.data = data1.Node;
                        //console.log(config.data);
                        $scope.bsId="";           //建筑结构id
                        var __root;
                        if(!document.getElementById(config.id))
                        {
                            $scope.s += "<table id='" + config.id + "' style='border:1px solid  #999999'  cellspacing=0 cellpadding=0 width='" + config.width + "'>";
                            //显示表头行
                            $scope.s += "<tr height='" + config.headerHeight + "'>";
                            var cols = config.columns;
                            for (var i = 0; i < cols.length; i++) {
                                var col = cols[i];
                                $scope.s += "<td class='user_tdItem' align='" + (col.headerAlign || config.headerAlign || "center") + "' width='" + (col.width || "") + "'>" + (col.headerText || "") + "</td>";
                            }
                            $scope.s += "</tr><tbody id='dataROWS'>";
                            var rows = config.data; //数据
                           // console.log(rows);
                            var cols = config.columns;  //表头
                            $scope.orderChild(rows);
                            drowRowData(rows, cols, config);
                            $scope.s += "</tbody></table>";
                            __root = jQuery("#div1");
                            __root.append($scope.s);       //将$scope.s的字符串插入到页面指定的元素后面
                            if(num!='1') {
                                __root.on('click', '.image_hand', function (event) {   //为属性结构的图片添加点击事件，折叠和展开
                                    // __root.find("img[data-folder='Y']").on("click", function (event) {   //为属性结构的图片添加点击事件，折叠和展开
                                    $scope.parentId = $(this).attr('id');
                                    $scope.id = $(this).attr('data-obj');
                                    var trid = this.getAttribute("data-trid");
                                    //console.log(trClass);
                                    var isOpen = __root.find("#" + trid).attr("data-open");
                                    isOpen = (isOpen == "Y") ? "N" : "Y";
                                    __root.find("#" + trid).attr("data-open", isOpen);
                                    if (isOpen == "N") { //隐藏子节点
                                        __root.find("#" + trid).find("img[data-folder='Y']").attr("src", config.folderCloseIcon);
                                        __root.find("." + $scope.parentId).css("display", "none");
                                        var arr = __root.find("." + $scope.parentId);
                                        for(var i =0 ;i<arr.length;i++){
                                            //alert($(arr[i]).attr('id'));
                                            $("."+$(arr[i]).attr('data-obj')).css('display','none');
                                            __root.find("#" + $(arr[i]).attr('id')).find("img[data-folder='Y']").attr("src", config.folderCloseIcon);
                                        }
                                        //__root.find("."+$scope.id).css("display", "none");
                                        console.log(__root.find("." + $scope.id).size());
                                    }
                                    else { //显示子节点
                                        console.log("." + $scope.parentId);

                                        if (!__root.find("." + $scope.parentId).size()) {
                                            $scope.currentProject.parentId = $scope.parentId;
                                            $http.post(url + '/BuildingStructureNew/findListByProAndParentId', {BuildingStructureNew: $scope.currentProject}).success(function (data2) {
                                                var nodes = data2.Node;
                                                $scope.orderChild(nodes);//排序
                                                drowRowData1(nodes, cols, config);
                                                $('#' + trid).after($scope.sss);
                                                $scope.sss = '';
                                            });
                                        }


                                        __root.find("#" + trid).find("img[data-folder='Y']").attr("src", config.folderOpenIcon);
                                        __root.find("." + $scope.parentId).css("display", "table-row");
                                        event.stopPropagation();//阻止冒泡事件

                                    }
                                    event.stopPropagation();//阻止冒泡事件
                                });
                                __root.find("a").keypress(function (event) {
                                    var currentevent = event.charCode || event.keyCode;
                                    if (currentevent == 13)currentevent = 9;
                                    var tr = this.parentElement.parentElement;
                                    tr.children[2].children.value = this.value;
                                });
                                __root.on("click","tr", function (){  //为追加业主信息触发事件，获取当前建筑结构id和显示模态框
                                    $scope.parent = $(this).attr('data-parent');
                                    $scope.child = $(this).attr('data-child');
                                    var trarray=__root.find(".this_info");
                                    //for(var i=0;i<trarray.length;i++){
                                    __root.find(".this_info").removeClass("this_info")
                                    //}
                                    var tr = this;
                                    var td = this.parentElement;
                                    //tr.setAttribute("class","this_info");
                                    $(this).addClass("this_info");
                                    var rowindex = tr.rowIndex + 1;
                                    var pid = tr.getAttribute("id");
                                    var level = tr.getAttribute("data-level");
                                    var pid = tr.getAttribute("id");
                                    $scope.buildingStructureId=this.children[2].children[0].getAttribute("data-bsId");
                                    if($scope.parent=='1'||$scope.parent=='2')
                                    {
                                        layer.msg('该建筑结构为整体建筑，无法追加业主',{icon:0});
                                        return;
                                    }else
                                    {
                                        $scope.getBuildingStructure($scope.buildingStructureId);
                                        $scope.personBuildingNew.buildingStructureId=this.getAttribute("data-bsId");
                                        $scope.enterperise.buildingStructureId=this.getAttribute("data-bsId");
                                        $scope.changeShow2();
                                        var x = __root.find("#" + config.id).insertRow(rowindex);
                                        //var trHtml = addchildnode(pid, 1, level, config.columns, tr);
                                    }
                                });
                            }
                        }
                    }
                });

            }

        };

        $scope.searchs();//载入页面时执行查询方法  王洲  2016.2.17

        function showSubs(_trid, obj) {
            if(obj==undefined)
            {
                obj = jQuery("#div1");
            }
            var isOpen = obj.find("#" + _trid).attr("data-open");
            if (isOpen == "Y") {
                var trs = obj.find("tr[data-pid=" + _trid + "]");
                trs.css("display", "");

                for (var i = 0; i < trs.length; i++) {
                    showSubs(trs[i].id);
                }
            }
        }

        /**
         * 添加子节点
         * @param _pid
         * @param i
         * @param _level
         * @param _cols
         * @param tr
         */
        function addchildnode(_pid, i, _level, _cols, tr) {
            tr.createAttribute("data-level");
            tr.setAttribute("data-level", _level);
            tr.createAttribute("data-pid");
            tr.setAttribute("data-pid", ((_pid == "") ? "0" : ("TR" + _pid)));
            tr.createAttribute("data-open");
            tr.setAttribute("data-open", 'N');
            tr.className = "user_dgItem";
            var parentId = _rows[i].id;
            var _pid=parentId;
            var id = _pid + "_" + i; //行id
            tr.setAttribute("id", 'TR' + id);
            var row = _rows[i];
            for (var j = 0; j < _cols.length; j++) {
                var newTd = tr.insertCell();
                var parentId = _rows[i].id;
                var col = _cols[j];
                ss += "<td class='user_tdItem'";
                //层次缩进
                if (j == 0) {
                    ss += " align='left' style='text-indent:" + (10 * (_level - 1)) + "px;'> ";
                } else {
                    ss += " align='center'>";
                }
                //节点图标
                if (j == 0) {
                    if (row.hasChildren) { //有下级数据
                        $scope.s += "<img data-folder='Y' id='"+parentId+"' data-trid='TR" + id + "' src='images/icon/mn/folder-closed.png' class='image_hand'>";
                    }
                    else {
                        $scope. s += "<img src='images/icon/mn/file.png' class='image_nohand'>";
                    }
                }
                //单元格内容
                if (col.handler) {
                    ss += (eval(col.handler + ".call(new Object(), row, col)") || "") + "</td>";
                }
                else {
                    ss += (row[col.dataField] || "") + "</td>";
                }
            }
            ss += "</tr>";
            return;
        }

        /**
         * 判断是否存在子节点，不存在则追加业主元素
         * @param row
         * @param col
         * @returns {string}
         */
        function checkbox(row, col) {
            var innerHtml = "";
            if (!row.children) {
                innerHtml = "<input id='inp' name='inp' type='checkbox' class='user_dgTxt btn btn-default btn-primary' value='追加业主' data-bsId='"+row[col.dataField]+"'/>";
            }
            return innerHtml;
        }

        /**
         * 数据展示
         * @param row
         * @param col
         * @returns {string}
         */
        function text(row, col) {
            var innerHtml = "";
            if (row[col.handler] == "text") {
                innerHtml = row[col.dataField] || "";
            }
            else {
                var zhi = row[col.dataField] || "";
                innerHtml = "<a id='inp'  name='inp'  class='user_dgTxt' value='" + zhi + "' data-bsId='"+row.id+"'>"+zhi+"</a>";
            }
            return innerHtml;
        }

        function json2str(obj) {
            var arr = [];
            var fmt = function (s) {
                if (typeof  s == 'object' && s != null) {
                    if (s.length) {
                        var _substr = "";
                        for (var x = 0; x < s.length; x++) {
                            if (x > 0) _substr += ", ";
                            _substr += json2str(s[x]);
                        }
                        return "[" + _substr + "]";
                    } else {
                        return json2str(s);
                    }
                }
                return /^(string|number)$/.test(typeof  s) ? "'" + s + "'" : s;
            }

            for (var i in obj) {
                if (typeof obj[i] != 'object') { //暂时不包括子数据
                    arr.push(i + ":" + fmt(obj[i]));
                }
            }
            return '{' + arr.join(', ') + '}';
        }

        function str2json(s) {
            var json = null;
            if (jQuery.browser.msie) {
                json = eval("(" + s + ")");
            } else {
                json = new Function("return " + s)();
            }
            return json;
        }

        /**
         * 循环数据
         * */
        function drowRowData(_rows, _cols) {
            for (var i = 0; i < _rows.length; i++) {
                var _level = _rows[i].nodeLevel;
                var parentId = _rows[i].id;
                var _pid=parentId;
                var id = _pid + "_"; //行id
                var row = _rows[i];
                $scope.s += "<tr class='user_dgItem "+((_rows[i].parentId == undefined) ? "" : _rows[i].parentId)+"' id='TR" + id + "' data-level='" + _level + "' data-pid='" + ((_pid == "") ? "0" : ("TR" + _pid)) + "' data-open='N' data-bsId='' data-obj='" + (_rows[i].id) + "' data-parent='" + (_rows[i].nodeLevel) + "' data-child='" + (_rows[i].hasChildren) + "'>";
                for (var j = 0; j < _cols.length; j++) {
                    var col = _cols[j];
                    $scope.s += "<td class='user_tdItem'";
                    //层次缩进
                    if (j == 0) {
                        $scope.s += " align='left' style='text-indent:" + (10 * (_level-1)) + "px;text-align:left;'> ";
                    } else {
                        $scope.s += "align='center'>";
                    }

                    //节点图标
                    if (j == 0) {
                        if (row.hasChildren||row.nodeLevel==1||row.nodeLevel==2) { //有下级数据
                            $scope.s += "<img data-folder='Y' id='"+parentId+"' data-trid='TR" + id +"' src='images/icon/mn/folder-closed.png' class='image_hand'>";
                        }else {
                            $scope. s += "<img src='images/icon/mn/file.png' class='image_nohand'>";
                        }
                    }
                    //单元格内容
                    if (col.handler) {
                        $scope. s += (eval(col.handler + ".call(new Object(), row, col)") || "") ;
                        if(col.handler=="checkbox"){
                            "data-bsId = "+ row[col.dataField] +"</td>";
                        }        else{
                            "</td>"
                        }
                    }
                    else {
                        $scope. s += (row[col.dataField] || "") + "</td>";
                    }
                }
                $scope.s += "</tr>";
            }
        }

        //返回上一步
        $scope.cancle=function(){
            $scope.doClick(1);
            $location.path("/index/baseManagement/projectManagement");
        };

        function drowRowData1(_rows, _cols) {
            for (var i = 0; i < _rows.length; i++) {
                var _level = _rows[i].nodeLevel;
                console.log(_level);
                var parentId = _rows[i].id;
                var _pid=parentId;
                var id = parentId + "_"; //行id
                var row = _rows[i];
                var dataShow = $scope.parentId;
                $scope.sss += "<tr class='user_dgItem "+((_rows[i].parentId == undefined) ? "" : _rows[i].parentId)+"' id='TR" + id + "' data-show='" + dataShow + "' data-level='" + _level + "' data-pid='" + ((_pid == "") ? "0" : ("TR" + _pid)) + "' data-open='N' data-bsId='' data-obj='" + (_rows[i].id) + "' data-parent='" + (_rows[i].nodeLevel) + "' data-child='" + (_rows[i].hasChildren) + "'>";
                for (var j = 0; j < _cols.length; j++) {
                    var col = _cols[j];
                    $scope.sss += "<td class='user_tdItem'";
                    //层次缩进
                    if (j == 0) {
                        $scope.sss += " align='left' style='text-indent:" + (10 * (_level-1)) + "px;text-align:left;'> ";
                    } else {
                        $scope.sss += "align='center'>";
                    }

                    //节点图标
                    if (j == 0) {
                        if (row.hasChildren||row.nodeLevel==1||row.nodeLevel==2) { //有下级数据
                            $scope.sss += "<img data-folder='Y' id='"+parentId+"' data-trid='TR" + id + "' src='images/icon/mn/folder-closed.png' class='image_hand'>";
                        }
                        else {
                            $scope. sss += "<img src='images/icon/mn/file.png' class='image_nohand'>";
                        }
                    }
                    //单元格内容
                    if (col.handler) {
                        $scope.sss += (eval(col.handler + ".call(new Object(), row, col)") || "") ;
                        if(col.handler=="checkbox"){
                            "data-bsId = "+ row[col.dataField] +"</td>";
                        }        else{
                            "</td>"
                        }
                    }
                    else {
                        $scope.sss += (row[col.dataField] || "") + "</td>";
                    }
                }
                $scope.sss += "</tr>";
            }
        }


        $scope.selectdata=function(){
            $("#add").modal("show");
            $scope.change=function(num){
                if (num == 1) {
                    if(angular.isDefined($scope.buildingStructure_get.enterpriseCustNews)){
                        layer.msg('该建筑已与企业客户绑定，无法绑定个人客户',{icon:0});
                        return ;
                    }
                    $scope.eCust=false;
                    $scope.pCust=true;
                    //根据条件查询客户信息
                    $scope.searcha={page:{}};//搜索对象
                    //通过姓名,证件号,电话号码等条件搜索查询
                    var fetchFunction = function(page,callback) {
                        $scope.searcha.page=page;
                        $http.post(url + '/PersonCustNew/listPageSearchPersonCust',{Search:$scope.searcha}).success(callback);
                    };
                    $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);

                    //得到所选业主
                    $scope.personBuildingNew={};
                    $scope.choice=function(items){
                        $scope.personBuildingNew.custId=items.custId;
                        $scope.btnIndex= items.custId;
                        $scope.person_choice=items;
                    };

                    /**
                     * 确定所选的新的业主
                     */
                        //      $scope.personsAdd=[];
                    $scope.qdnewperson=function(){
                        if(angular.isDefined($scope.person_choice.custId)){
                            if(angular.isUndefined($scope.buildingStructure_get.personCusts)){
                                $scope.buildingStructure_get.personCusts=[];
                            }
                            for(var i=0;i<$scope.buildingStructure_get.personCusts.length;i++){
                                if($scope.buildingStructure_get.personCusts[i].custId==$scope.person_choice.custId){
                                    layer.msg('该客户已经是该建筑业主了，请重新选择',{icon:0});
                                    $scope.person_choice={};
                                    $scope.btnIndex='';
                                    return;
                                }
                            }
                            $scope.personsAdd.push($scope.person_choice);
                            //$scope.buildingStructure_get.personCusts.push($scope.person_choice);
                            $scope.personBuildingNew.custType="业主";
                            $scope.personBuildingNew.buildingStructureId= $scope.buildingStructure_get.id;
                            // $scope.person_panduan=$scope.person_choice;//用于删除上一个添加的户主的判断
                            $("#add").modal("hide");
                        }else{
                            layer.msg('请选择要追加的业主',{icon:0});
                        }
                    };
                    //关闭模态框
                    $scope.closeModal=function(){
                        $scope.searcha={};
                        $scope.personBuildingNew={};
                        $scope.person_choice={};
                        $scope.btnIndex='';
                    };
                    //资产绑定
                    $scope.insertPersonBuilding=function(){
                        if( $scope.personBuildingNew.buildingStructureId==undefined|| $scope.personBuildingNew.buildingStructureId==''){
                            layer.alert('请选择建筑信息',{icon : 0});
                            return;
                        }
                        if( $scope.personBuildingNew.custId==undefined|| $scope.personBuildingNew.custId==''){
                            layer.alert('请选择追加业主信息',{icon : 0});
                            return;
                        }
                        $http.post(url+'/PersonBuildingNew/addPersonBuildingNewRestful',{PersonBuildingNew:$scope.personBuildingNew}).success(function(a){
                            $scope.buildingStructureId='';
                            document.getElementById("div1").innerHTML = "";
                            if(a==true){
                                layer.alert('绑定成功',{icon : 1});
                                $scope.searcha={}; //清空搜索业主的输入框
                                $scope.searchs(1);    //刷新页面数据
                                $scope.personBuildingNew={};
                            }else{
                                layer.alert('该用户已为业主',{icon : 2});
                                $scope.changeShow1();
                                $scope.searchs(1);    //刷新页面数据
                            }
                            // $scope.deleteYezhu();
                        }).error(function(data, status, headers, config){
                            layer.alert('绑定失败',{icon : 2});
                            document.getElementById("div1").innerHTML = "";
                        }) ;
                    };

                } else if(num == 2){
                    if(angular.isDefined($scope.buildingStructure_get.personCusts)){
                        layer.msg('该建筑已与个人客户绑定，无法绑定企业客户',{icon:0});
                        return ;
                    }
                    $scope.eCust=true;
                    $scope.pCust=false;
                    //根据条件查询客户信息
                    $scope.searchb={page:{}};//搜索对象
                    //通过姓名,证件号,电话号码等条件搜索查询
                    var fetchFunction = function(page,callback) {
                        $scope.searchb.page=page;
                        $http.post(url + '/EnterpriseCustNew/listPageEnterpriseCustNewRestful',{EnterpriseCustNew:$scope.searchb}).success(callback);
                    };
                    $scope.searchPaginator=app.get('Paginator').list(fetchFunction,6);

                    //得到所选企业客户
                    $scope.choice=function(ite){
                        $scope.enterperise.enterpriseId=ite.enterpriseId;
                        $scope.btnIndex= ite.enterpriseId;
                        $scope.person_choice=ite;
                    };

                    /**
                     * 确定所选的新的企业业主
                     */
                    $scope.entersAdd=[];
                    $scope.qdnewperson=function(){
                        if(angular.isDefined($scope.person_choice.enterpriseId)){
                            if(angular.isUndefined($scope.buildingStructure_get.enterpriseCustNews)){
                                $scope.buildingStructure_get.enterpriseCustNews=[];
                            }
                            for(var i=0;i<$scope.buildingStructure_get.enterpriseCustNews.length;i++){
                                if($scope.buildingStructure_get.enterpriseCustNews[i].enterpriseId==$scope.person_choice.enterpriseId){
                                    layer.msg('该公司已经是该建筑业主了，请重新选择',{icon:0});
                                    return;
                                }
                            }
                            $scope.entersAdd.push($scope.person_choice);
                            $scope.enterperise.custType="业主";
                            $scope.enterperise.buildingStructureId= $scope.buildingStructure_get.id;
                            $("#add").modal("hide");
                        }else{
                            layer.msg('请选择要追加的业主',{icon:0});
                        }
                    };

                    //关闭模态框
                    $scope.closeModal=function(){
                        $scope.searchb={};
                        $scope.enterperise={};
                        $scope.person_choice={};
                    };
                    //资产绑定
                    $scope.insertPersonBuilding=function(){
                        if( $scope.personBuildingNew.buildingStructureId==undefined|| $scope.personBuildingNew.buildingStructureId==''){
                            layer.alert('请选择建筑信息',{icon : 0});
                            return;
                        }
                        if( $scope.enterperise.enterpriseId==undefined|| $scope.enterperise.enterpriseId==''){
                            layer.alert('请选择追加公司信息',{icon : 0});
                            return;
                        }
                        $http.post(url+'/PersonBuildingNew/addPersonBuildingEnterpriseNewRestful',{PersonBuildingNew:$scope.enterperise}).success(function(a){
                            document.getElementById("div1").innerHTML = "";
                            if(a==true){
                                $scope.buildingStructureId='';
                                layer.alert('绑定成功',{icon : 1});
                                $scope.searchb={}; //清空搜索业主的输入框
                                $scope.searchs(1);    //刷新页面数据
                                $scope.enterperise={};
                            }else{
                                layer.alert('该企业已为业主',{icon : 2});
                                $scope.searchs(1);    //刷新页面数据
                                $scope.changeShow1();
                            }
                        }).error(function(data, status, headers, config){
                            layer.alert('绑定失败',{icon : 2});
                            document.getElementById("div1").innerHTML = "";
                        }) ;
                    };

                }
            };
            $scope.change(1);

        };


        /**
         * 为查询到的节点排序
         */
        $scope.orderChild=function(array){
            for(var i=0;i<array.length;i++){
                //如果多个业主信息，进行分割，以逗号的形式展现
                if(array[i].names!=''||array[i].names!=null){
                    var childrenNames=array[i].names.split(",");
                    if(childrenNames.length>3){
                        var a ='....';
                        childrenNames.splice(3,childrenNames.length);
                        childrenNames.push(a);
                        array[i].names=childrenNames;
                    }
                }
                if(array[i].children){
                    //排序子节点
                    if(!angular.isArray(array[i].children)){
                        var arrayChild=array[i].children;
                        var arrayChild_array=[];
                        arrayChild_array.push(arrayChild);
                        array[i].children=arrayChild_array;
                    }
                    array[i].children = $filter('orderBy')(array[i].children,'nodeName',false);
                    $scope.orderChild(array[i].children);
                }
            }
        };

        /**
         * 重新排组数据结构
         */
        $scope.newDate=function(array){
            for(var i=0;i<array.length;i++){
                if(array[i].children){
                    if(!isArray(array[i].children)){
                        var children_copy=array[i].children;
                        var childArray=[];
                        childArray.push(children_copy);
                        array[i].children=childArray;
                    }
                    //添加新的属性，用于表示最后一项
                    array[i].isLastNode=false;
                    $scope.newDate(array[i].children);
                }else{
                    //return array;
                    array[i].isLastNode=true;
                    if(array[i].names.indexOf(',')==-1){

                    }else{
                        //分割数组
                        array[i].children=[];//当字符串中包含2个以上的名字的时候，为此对象添加children属性
                        var childrenNames=array[i].names.split(",");
                        var childrenCardTypes=array[i].cardTypes.split(",");
                        var childrenCardNums=array[i].cardNums.split(",");
                        array[i].names=childrenNames[0];
                        array[i].cardTypes=childrenCardTypes[0];
                        array[i].cardNums=childrenCardNums[0];
                        for(var j=1;j<childrenNames.length;j++){
                            var node_change={};
                            node_change.names=childrenNames[j];
                            node_change.cardTypes=childrenCardTypes[j];
                            node_change.cardNums=childrenCardNums[j];
                            node_change.fullName=array[i].fullName;
                            node_change.nodeName=array[i].nodeName;
                            //node_change.nodeName='';
                            node_change.parentId=array[i].parentId;
                            node_change.id=array[i].id;
                            node_change.isLastNode=true;
                            node_change.buildingType=array[i].buildingType;
                            array[i].children.push(node_change);
                        }
                    }
                    //return array;
                }
            }
        };

        /**
         * 去重复名字
         */
        $scope.repeatNames=function(arrayNames){
            var result = [], hash = {};
            for (var i = 0, elem; (elem = arrayNames[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            };
            return result;
        };

        /**
         * 判断childnode是否为数组对象
         * @param obj
         * @returns {boolean}
         */
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        /**
         * 根据建筑结构id查询建筑结构信息（包好详细建筑信息和人员信息以及相关的）
         */
        $scope.getBuildingStructure=function(buildingStructureId){
            $scope.paramReset();
            $http.get(url+'/BuildingStructureNew/getBuildingStructurebyId/'+buildingStructureId).success(function(data){
                if(data.BuildingStructureNew!=null&&data.BuildingStructureNew!=''){
                    $scope.buildingStructure_get= data.BuildingStructureNew;
                    if(angular.isDefined($scope.buildingStructure_get.personCusts)){
                        if(!angular.isArray($scope.buildingStructure_get.personCusts)){
                            var person_object=$scope.buildingStructure_get.personCusts;
                            var person_array=[];
                            person_array.push(person_object);
                            $scope.buildingStructure_get.personCusts=person_array;
                        }
                    }

                    if(angular.isDefined($scope.buildingStructure_get.personBuildings)){
                        if(!angular.isArray($scope.buildingStructure_get.personBuildings)){
                            var personBuildings_object=$scope.buildingStructure_get.personBuildings;
                            var personBuildings_array=[];
                            personBuildings_array.push(personBuildings_object);
                            $scope.buildingStructure_get.personBuildings=personBuildings_array;
                        }
                    }

                    if(angular.isDefined($scope.buildingStructure_get.enterpriseCustNews)){
                        if(!angular.isArray($scope.buildingStructure_get.enterpriseCustNews)){
                            var enter_object=$scope.buildingStructure_get.enterpriseCustNews;
                            var enter_array=[];
                            enter_array.push(enter_object);
                            $scope.buildingStructure_get.enterpriseCustNews=enter_array;
                        }
                    }

                    if(angular.isDefined($scope.buildingStructure_get.house)){
                        $scope.buildingStructure_get.buildingCertificate=$scope.buildingStructure_get.house.buildingCertificate;
                        $scope.buildingStructure_get.buildingNum=$scope.buildingStructure_get.house.houseNum;
                        $scope.buildingStructure_get.area=$scope.buildingStructure_get.house.houseArea;
                    }
                    else if(angular.isDefined($scope.buildingStructure_get.stall)){
                        $scope.buildingStructure_get.buildingCertificate=$scope.buildingStructure_get.stall.buildingCertificate;
                        $scope.buildingStructure_get.buildingNum=$scope.buildingStructure_get.stall.stallNumber;
                        $scope.buildingStructure_get.area=$scope.buildingStructure_get.stall.usableArea;
                    }
                    else if(angular.isDefined($scope.buildingStructure_get.store)){
                        $scope.buildingStructure_get.buildingCertificate=$scope.buildingStructure_get.store.buildingCertificate;
                        $scope.buildingStructure_get.buildingNum=$scope.buildingStructure_get.store.storeNumber;
                        $scope.buildingStructure_get.area=$scope.buildingStructure_get.store.buildingArea;
                    }

                    if(angular.isUndefined($scope.buildingStructure_get.insideArea)){
                        $scope.buildingStructure_get.insideArea='/';
                    }
                    if(angular.isUndefined($scope.buildingStructure_get.buildingNum)){
                        $scope.buildingStructure_get.buildingNum='/';
                    }
                    if(angular.isUndefined($scope.buildingStructure_get.fullName)){
                        $scope.buildingStructure_get.fullName='/';
                    }
                    if(angular.isUndefined($scope.buildingStructure_get.buildingCertificate)){
                        $scope.buildingStructure_get.buildingCertificate='/';
                    }
                    if(angular.isUndefined($scope.buildingStructure_get.buildingType)){
                        $scope.buildingStructure_get.buildingType='/';
                    }
                }else{
                    layer.msg('该建筑结构为整体建筑，无法追加业主',{icon:0});
                    $scope.changeShow1(true);
                }
            }).error(function(data, status, headers, config){
                layer.alert('失败',{icon : 2});
            }) ;
        };

        /** ****************************进入第二阶段操作  */
        /**
         * 选择相关业主
         */
        $scope.delIndex = [];

        $scope.choiceYezhu=function(person,index){
            if( $scope.delPersonNum.length==0){
                $scope.delPersonNum.push(person);
            }else{
                var j=0;
                for(var i=0;i< $scope.delPersonNum.length;i++){
                    if( $scope.delPersonNum[i].custId==person.custId){
                        $scope.delPersonNum.splice(i,1);
                        j++;
                        break;
                    }
                }
                if(j==0)
                {
                    $scope.delPersonNum.push(person);
                }
            }
            $scope.notrepeat($scope.persons, person);
/*          if($scope.delIndex.length==0){
                $scope.delIndex.push(index);
            }else {
                var j = 0;
                for (var i = 0; i < $scope.delIndex.length; i++) {
                    if (index == $scope.delIndex[i]) {
                        $scope.delIndex.splice(i, 1);
                        j++;
                    }
                }
                if (j == 0) {
                    $scope.delIndex.push(index);
                }
            }*/
        };
        //判断人员选择是否重复
        $scope.persons=[];//用于存放选中的人员
        $scope.notrepeat=function(persons,person){
            if($scope.personsAdd.length>0){
                for(var i=0;i<$scope.personsAdd.length;i++){
                    if(person.custId==$scope.personsAdd[i].custId){
                        layer.confirm('是否移除该需要追加的业主？',function(index){

                            layer.close(index);
                            $scope.personsAdd.splice(i,1);
                            return;
                        });
                    }

                }

            }
            var j=0;
            for (var i = 0; i < $scope.persons.length; i++) {
                if ($scope.persons[i].custId == person.custId) {
                    //j = 1;
                    $scope.persons.splice(i, 1);
                    j = 1;
                }
            }
            if (j == 0) {
                $scope.persons.push(person);
            }
        };

        /**
         * 选中样式
         */
        $scope.chocieCss=function(custId){
            if($scope.persons.length==0){
                return false;
            }
            var j=0;
            for(var i=0;i<$scope.persons.length;i++){
                if($scope.persons[i].custId==custId){
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
         * 选择相关业主
         */
        $scope.enters=[];
        $scope.choiceYezhuqiye=function(enter){
            $scope.notrepeatqiye($scope.enters, enter);
        };

        //判断人员选择是否重复
        $scope.persons=[];//用于存放选中的人员
        $scope.notrepeatqiye=function(enters,enter){
            if($scope.entersAdd.length>0){
                for(var i=0;i<$scope.entersAdd.length;i++){
                    layer.confirm('是否移除该需要追加的业主？',function(index) {
                        layer.close(index);
                        $scope.entersAdd.splice(i, 1);
                        $("#"+person.enterpriseId).remove();
                        //layer.msg("移除需追加的业主成功");
                        return;
                    })
                }
            }
            if(enter.enterpriseId==$scope.person_choice.enterpriseId){

            }
            var j=0;
            for ( var i = 0; i < $scope.enters.length; i++) {
                if ($scope.enters[i].enterpriseId == enter.enterpriseId) {
                    //j = 1;
                    $scope.enters.splice(i, 1);
                    j=1;
                }
            }
            if(j==0){
                $scope.enters.push(enter);
            }
        };

        /**
         * 选中样式
         */
        $scope.chocieCssqiye=function(enterpriseId){
            if($scope.enters.length==0){
                return false;
            }
            var j=0;
            for(var i=0;i<$scope.enters.length;i++){
                if($scope.enters[i].enterpriseId==enterpriseId){
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
         * 人员建筑关系失效
         * @param person
         */
        $scope.deleteYezhu=function(){
            var personBuildingIds=[];
            if($scope.persons.length==0&&$scope.enters.length==0){
                layer.msg('未选择解除业主信息，请确定解除业主信息',{icon:0});
                return;
            }else{
                    layer.confirm("是否选中这些业主，解除业主关系？",
                        function (index) {

                           // var index = [];
                            $scope.delId=[];
                            layer.close(index,{icon:1});
                            /**
                             * bug1401 陈秋旭
                             * @param val
                             */
                            console.log($scope.buildingStructure_get.personCusts);
                            console.log($scope.delPersonNum);
                            //angular.forEach($scope.buildingStructure_get.personCusts, function (item, key) {
                            //    for (var i = 0; i < $scope.delPersonNum.length; i++) {
                            //        if (item.custId == $scope.delPersonNum[i].custId) {
                            //            //index.push(key);
                            //            $scope.buildingStructure_get.personCusts.splice()
                            //           // $scope.delId.push(item);
                            //        }
                            //    }
                            //});
                            //efg:
                            //angular.forEach($scope.delPersonNum, function (item, key) {
                            //   abc:
                            //    angular.forEach($scope.delPersonNum, function (item1, key1) {
                            //                   $scope.buildingStructure_get.personCusts.splice(i);
                            //                    // $scope.delId.push(item);
                            //                    continue efg;
                            //                }
                            //    });
                            //});
                            /*out:
                            for(var i=0;i<$scope.delPersonNum.length;i++){
                                iner:
                                for(var j=0;j<$scope.buildingStructure_get.personCusts.length;j++){
                                    if($scope.delPersonNum[i].custId==$scope.buildingStructure_get.personCusts[j].custId){
                                        $scope.buildingStructure_get.personCusts.splice(j);
                                        continue out;
                                    }
                                }
                            }*/

                            for(var j=0;j<$scope.buildingStructure_get.personCusts.length;j++){
                                for(var i=0;i<$scope.delPersonNum.length;i++){
                                    if($scope.delPersonNum[i].custId==$scope.buildingStructure_get.personCusts[j].custId){
                                        $scope.buildingStructure_get.personCusts.splice(j,1);
                                    }
                                }
                            }


                            //for (var i = 0; i < $scope.buildingStructure_get.personCusts.length; i++) {
                            //    if (item.custId == $scope.buildingStructure_get.personCusts[i].custId) {
                            //        //index.push(key);
                            //        $scope.buildingStructure_get.personCusts.splice(i);
                            //        continue;
                            //        // $scope.delId.push(item);
                            //    }
                            //}
                            console.log( $scope.buildingStructure_get.personCusts);
                            //    for (var i = 0; i < $scope.delId.length; i++) {
                            //          $scope.buildingStructure_get.personCusts.remove($scope.delId[i]);
                            //    }
                            //console.log($scope.buildingStructure_get.personCusts);
                            //if (index.length > 0) {
                            //    for (var i = 0; i < index.length; i++) {
                            //        $scope.buildingStructure_get.personCusts.splice(index[i], 1);
                            //    }
                            //    index = [];
                            //}
                            $scope.$apply($scope.buildingStructure_get.personCusts);
                            $scope.delIndex = [];

                            //如果persons不为空将现有业主数组中的persons移除
                            if ($scope.persons.length > 0) {
                                for (var j = 0; j < $scope.persons.length; j++) {
                                    for (var i = 0; i < $scope.buildingStructure_get.personBuildings.length; i++) {
                                        if ($scope.persons[j].custId == $scope.buildingStructure_get.personBuildings[i].custId) {
                                            personBuildingIds.push($scope.buildingStructure_get.personBuildings[i].personBuildingId);
                                        }
                                    }
                                }
                                $scope.personBuildingNew.personBuildingIds = personBuildingIds;
                            } else if ($scope.enters.length > 0) {
                                for (var j = 0; j < $scope.enters.length; j++) {
                                    for (var i = 0; i < $scope.buildingStructure_get.personBuildings.length; i++) {
                                        if ($scope.enters[j].enterpriseId == $scope.buildingStructure_get.personBuildings[i].enterpriseId) {
                                            personBuildingIds.push($scope.buildingStructure_get.personBuildings[i].personBuildingId);
                                        }
                                    }
                                }
                                $scope.enterperise.personBuildingIds = personBuildingIds;
                            }
                        });
            }


            return;
            if($scope.persons.length==0){
                layer.msg('请选择需要失效的业主',{icon:0});
                return;
            }
            layer.confirm("是否失效业主？",
                {btn : ['是','否']},function(){
                    var personBuilding={};
                    personBuilding.personBuildingIds=personBuildingIds;
                    $http.post(url+'/PersonBuildingNew/deletePersonBuilding',{PersonBuildingNew:personBuilding}).success(function(data){
                        if(data=="200"){
                            $scope.delPersonNum=[];
                            layer.msg("失效成功 ",{icon:1});
                            $scope.persons=[];
                            $scope.getBuildingStructure($scope.buildingStructureId);
                        }
                        if(data=="3001"){
                            layer.alert('参数不全',{icon : 0});
                        }
                    }).error(function(data, status, headers, config){
                        layer.alert('失效失败',{icon : 2});
                    }) ;
                })
        };

        /**
         * 弹出输入房产证号的模态框
         */
        $scope.fczhModel=function() {
            <!-- 修改bug520  修改人陈秋旭 修改时间:2016/4/13-->
            if ($scope.buildingStructure_get.buildingCertificate == '/') {
                $('#fangchanzheng1').val('');
            } else {
                $('#fangchanzheng1').val($scope.buildingStructure_get.buildingCertificate);
                }
            $("#addorupdate").modal("show");
        };

        /**
         * 房产证号确定
         */
        $scope.fangchanzhenghao='';
        $scope.fczhtj=function(){
            if($scope.fangchanzhenghao!=null&&$scope.fangchanzhenghao!=''){
                $scope.buildingStructure_get.buildingCertificate=$scope.fangchanzhenghao;
                $("#addorupdate").modal("hide");
            }else{
                layer.msg('请输入房产证号',{icon:0});
                //document.getElementById('show').style.display='block';
                //return;
            }
        };

        /**
         * bug 718 by yeshengqiang 2016/2/24
         */
        $scope.value_change = function()
        {
            if($scope.fangchanzhenghao!=null&&$scope.fangchanzhenghao!=''){
                document.getElementById('show').style.display='none';
                return;
            }else
            {
                document.getElementById('show').style.display='block';
            }
        };

        /**
         * 保存输入的房产证号
         */
        $scope.savefczh=function(){
            var personBuilding={};
            if(!angular.equals($scope.buildingStructure_get.buildingCertificate,'/')){
                personBuilding.buildingCertificate=$scope.buildingStructure_get.buildingCertificate;
            }
            personBuilding.buildingType=$scope.buildingStructure_get.buildingType;
            personBuilding.id=$scope.buildingStructure_get.id;
            if(angular.isUndefined(personBuilding.buildingCertificate)&&personBuilding.buildingCertificate==''){
                layer.msg('房产证号参数不全',{icon:0});
                $scope.insertPersonBuilding();
            }else{
                $http.post(url+'/BuildingStructureNew/savaZichanbangding',{BuildingStructureNew:personBuilding}).success(function(data){
                    if(data=="200"){
                        layer.msg("保存成功 ",{icon:1});
                        if(angular.isDefined($scope.insertPersonBuilding)){
                            $scope.insertPersonBuilding();
                        }
                        //$scope.getBuildingStructure($scope.buildingStructureId);
                    }
                    if(data=="3001"){
                        layer.alert('参数不全',{icon : 0});
                    }
                }).error(function(data, status, headers, config){
                    layer.alert('保存失败',{icon : 2});
                }) ;
            }
        };

        /**
         * 提交操作，包含 修改房产证号，解除绑定，新增绑定
         */
        $scope.saveAll=function(){
            var personBuilding={};
            personBuilding.custIds=custIds;
            personBuilding.buildingCertificate=$scope.buildingStructure_get.buildingCertificate;
            personBuilding.buildingType=$scope.buildingStructure_get.buildingType;
            personBuilding.id=$scope.buildingStructure_get.id;
            if($scope.eCust==true||$scope.enters.length>0){
                personBuilding.personBuildingNew=$scope.enterperise;
                var enterIds=[];
                if($scope.entersAdd.length>0){
                    for(var i=0;i<$scope.entersAdd.length;i++){
                        enterIds.push($scope.entersAdd[i].enterpriseId);
                    }
                    personBuilding.enterIds=enterIds;
                }
            }else if($scope.pCust==true||$scope.persons.length>0){
                personBuilding.personBuildingNew=$scope.personBuildingNew;
                var custIds=[];
                if($scope.personsAdd.length>0){
                    for(var i=0;i<$scope.personsAdd.length;i++){
                        custIds.push($scope.personsAdd[i].custId);
                    }
                    personBuilding.custIds=custIds;
                }
            }
            $http.post(url+'/BuildingStructureNew/savaZichanbangding',{BuildingStructureNew:personBuilding}).success(function(data){
                //$scope.getBuildingStructure($scope.buildingStructureId);
                layer.alert('保存成功',{icon : 1});
                $scope.changeShow1();
            }).error(function(data, status, headers, config){
                layer.alert('保存失败',{icon : 2});
            }) ;
        };

        /**
         * 参数重置
         */
        $scope.paramReset=function(){
            $scope.person_choice={};
            $scope.fangchanzhenghao='';
            $scope.persons=[];
            $scope.enters=[];
            $scope.buildingStructure_get={};
            $scope.eCust=false;
            $scope.pCust=false;
            $scope.personBuildingNew={};
            $scope.enterperise={};
            $scope.personsAdd=[];
            $scope.entersAdd=[];
        };

        /**
         * 判断显示个人客户还是企业客户
         */
        $scope.showgerenorqiye=function(string){
            if(angular.equals(string,'person')){
                return true;
            }
            if(angular.equals(string,'enter')){
                return true;
            }
            return false;
        };


        var filePath='';
        $scope.annex={};
        $scope.inportExcel = function(){
            $scope.fileState="1";
            $(function(){
                $("#remove").html('');
                $("#remove").append('<div id="excelupload" class="zyupload"></div>');
                // 初始化插件
                $("#excelupload").zyUpload({
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
                        //console.info(selectFiles);
                    },
                    onDelete: function(file, files){
                        //console.info(file.name);
                    },
                    onSuccess: function(file, response){          // 文件上传成功的回调方法
                        filePath=response;
                        $scope.annex.annexAddress=filePath;
                        $scope.annex.annexName=file.name;
                        $scope.annex.projectId=$scope.projectId;
                        $http.post(url + "/PersonBuildingNew/importFile",{Annex:$scope.annex}).success(function(data){
                            if(data.Info.state){
                                //layer.alert(data.Info.info.$,{icon : 0});
                                //layer.alert(data.Info.info.$,{icon : 0});
                                layer.alert(data.Info.info.$,{icon : 0,time : 2000});
                                $('#ddd').modal('hide');
                            }else{
                                layer.msg('导入失败',{icon : 1,time : 2000});
                                $('#ddd').modal('hide');
                            }
                            $("#fileImage").val("");
                            $("#uploadList_" + file.index).fadeOut();
                            $scope.searchs(1);    //刷新页面数据
                        });
                    },
                    onFailure: function(file, response){          // 文件上传失败的回调方法
                        alert("此文件上传失败：");
                        //console.info(file.name);
                    },
                    onComplete: function(response){           	  // 上传完成的回调方法
                        //console.info("文件上传完成");
                        //console.info(response);
                    }
                });

            });
        };

        $scope.finishAssetBinding = function(){
            layer.confirm('是否完成客户资产绑定？',
                {btn : ['确定','取消']},
                function(){
                    $http.post(url + '/projectCompletion/changeStateByProjectIdAndParamTypes/' + $scope.projectIds + '/' + 'assetBinding').success(function(data){
                        if(data.Info.state == 'success'){
                            layer.msg('操作成功！',{icon : 1,time : 1000});
                            $scope.searchs(1);
                        }else {
                            layer.msg('操作异常，请重试！',{icon : 0,time : 1000});
                        }
                    }).error(function(data){
                        layer.msg('操作异常，请重试！',{icon : 0,time : 1000});
                    });
                },function(){});
        };

    }]);
});
/**
 * bug1401 陈秋旭
 * @param val
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};