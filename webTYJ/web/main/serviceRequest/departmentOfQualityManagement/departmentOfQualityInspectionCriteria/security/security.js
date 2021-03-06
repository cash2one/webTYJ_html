/**
 * Created by NM on 2018/1/18.
 * 部门质检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../../app');

    app.controller('qualitySecurityCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$scope.url;
        $scope.ScoreCriteria=[];
        $scope.DayCheck=[];
        $scope.weekCheck=[];
        $scope.halfMonthCheck=[];
        $scope.monthCheck=[];
        $http.get(url+'/ScoreCriteria/getScoreCriteriabyType/2').success(function(data){
            if(data){
                $scope.ScoreCriteria = data.ScoreCriteria;
                //遍历所有评分标准按照周期分组
                for(var i=0;i<$scope.ScoreCriteria.length;i++){
                    if($scope.ScoreCriteria[i].cycle==0){
                        $scope.DayCheck.push($scope.ScoreCriteria[i]);
                    }else if($scope.ScoreCriteria[i].cycle==1){
                        $scope.weekCheck.push($scope.ScoreCriteria[i]);
                    }else if($scope.ScoreCriteria[i].cycle==2){
                        $scope.halfMonthCheck.push($scope.ScoreCriteria[i]);
                    }else if($scope.ScoreCriteria[i].cycle==3){
                        $scope.monthCheck.push($scope.ScoreCriteria[i]);
                    }
                }
            }else{
                alert("没有找到安保标准！")
            }
        }).error(function(data,status,headers,config){
            alert("服务器请求失败！");
        });

        $scope.checkGrade=function(criteriaId){
            $http.get(url+'/ScoreCriteria/getScoreCriteriabyId/'+criteriaId).success(function(data){
                if(criteriaId!=null){
                    $location.path("/index/serviceRequest/templateDetails/"+criteriaId);
                }else{
                    alert("无效的评分标准！")
                }
            }).error(function(data,status,headers,config){
                alert("服务器请求失败！");
            });
        }

    }]);
});