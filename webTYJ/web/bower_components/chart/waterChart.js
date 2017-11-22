/**
 * Created by 倪明 on 2015/7/16.
 * 水表查询图表控件js
 * 修改人：倪明   时间：2015/7/16.
 */
var chartWaterApp = angular.module('chartWaterApp',[]);
chartWaterApp.controller("waterChartCtrl",function($scope) {
    $scope.pageInfo={
        url:'http://localhost:8080/webTYJ/cxfws/rest/WaterMeterRecords/listWaterMeterRecords',
        args:function(){
            return {SearchMeter:{page:{
                currentPage:this.pageStatus.currentPage,
                showCount:this.pageStatus.showCount
            }}};
        },
        getPageItems:function(data){
            return data['PageRestful']['waterMeterRecords'];
        },
        pageStatus:{
            currentPage:1,
            showCount:3,
            totalPage:0,
            totalResult:0
        },
        pageItems:[]
    };
    /**
     * 选中一条数据
     * @param items  一条数据
     */
    $scope.currentWater = {};
    $scope.waterCheck = function(items){
        $scope.btnIndex = items;
        $scope.currentWater = items;
        console.log($scope.currentWater['initialReading']);
        $scope.currentReading = $scope.currentWater['stopReading'] - $scope.currentWater['initialReading'];
        var data1 = [[$scope.currentReading],[40]];
        var data2 = [[70],[50]];
        var data3 = [[65],[45]];
        var data_max = 100; //Y轴最大刻度
        var line_title1 = ['总表读数','子表总和']; //曲线名称
        var line_title2 = ['总表读数','去年读数']; //曲线名称
        var line_title3 = ['总表读数','上月读数']; //曲线名称
        var y_label = ""; //Y轴标题
        var x_label = ""; //X轴标题
        var x1 = ['水损']; //定义X轴刻度值
        var x2 = ['同比']; //定义X轴刻度值
        var x3 = ['环比']; //定义X轴刻度值
        var title1 = "水损统计"; //统计图标标题
        var title2 = "同比统计"; //统计图标标题
        var title3 = "环比统计"; //统计图标标题
        j.jqplot.diagram.base("chart1", data1, line_title1, title1, x1, x_label, y_label, data_max, 2);
        j.jqplot.diagram.base("chart2", data2, line_title2, title2, x2, x_label, y_label, data_max, 2);
        j.jqplot.diagram.base("chart3", data3, line_title3, title3, x3, x_label, y_label, data_max, 2);
    };
}).directive('pageBase', function($http) {
    return {
        restrict:'AE',
        scope: {
            page: '=config'
        },
        templateUrl:'page.html',
        link:function(scope){
            var load=function(){
                var url=scope.page.url;
                var args=scope.page.args();
                $http.post(url,args).success(function(data){
                    console.log(data);
                    scope.page.pageItems=scope.page.getPageItems(data);
                    scope.page.pageStatus=data['PageRestful']['page'];
                });
            };
            scope.goNext=function(){
                if(scope.page.pageStatus.currentPage<scope.page.pageStatus.totalPage){
                    scope.page.pageStatus.currentPage+=1;
                }
                load();
            };
            scope.goPrev=function(){
                if(scope.page.pageStatus.currentPage>1){
                    scope.page.pageStatus.currentPage-=1;
                }
                load();
            };
            scope.go=function(currentPage) {
                if(currentPage>=1 && currentPage<=scope.page.pageStatus.totalPage) {
                    scope.page.pageStatus.currentPage=currentPage;
                }
                load();
            };
            load();
        }
    };
});