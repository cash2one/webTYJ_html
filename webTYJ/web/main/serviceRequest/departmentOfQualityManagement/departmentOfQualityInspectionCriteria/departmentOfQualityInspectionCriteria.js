/**
 * Created by NM on 2018/1/18.
 * 部门质检管理
 */

'use strict';

define(function (require) {
    var app = require('../../../../app');

    app.controller('departmentOfQICCtrl', ['$scope', '$http','$rootScope','$location', function ($scope,$http,$rootScope,$location) {

        var url=$scope.url;
        $scope.gardens=false;                    //园林
        $scope.cleans=true;                    //清洁
        $scope.securities=false;                 //安保
        $scope.maintenances=false;              //维修

        $scope.test='departmentOfQIC';
        $scope.btnIndex=1;

        $scope.doClick=function(index){
            $scope.btnIndex=index;
        };

        $scope.showClean=function(index) {
            $scope.gardens = false;               //园林
            $scope.cleans = true;                 //清洁
            $scope.securities = false;             //安保
            $scope.maintenances = false;          //维修

            $scope.btnIndex=index;

            $scope.cleanServiceRequest = [];
            $scope.cleanDayCheck = [];
            $scope.cleanWeekCheck = [];
            $scope.cleanHalfMonthCheck = [];
            $scope.cleanMonthCheck = [];

            $http.get(url+'/ScoreCriteria/getScoreCriteriabyType/1').success(function(data){
                if(data){
                    $scope.ScoreCriteria = data.ScoreCriteria;
                    //遍历所有评分标准按照周期分组
                    for(var i=0;i<$scope.ScoreCriteria.length;i++){
                        if($scope.ScoreCriteria[i].cycle==0){
                            $scope.cleanDayCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==1){
                            $scope.cleanWeekCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==2){
                            $scope.cleanHalfMonthCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==3){
                            $scope.cleanMonthCheck.push($scope.ScoreCriteria[i]);
                        }
                    }
                }else{
                    alert("没有找到清洁标准！")
                }
            }).error(function(data,status,headers,config){
                alert("服务器请求失败！");
            });

            $scope.checkGrade=function(criteriaId){
                $http.get(url+'/ScoreCriteria/getScoreCriteriabyId/'+criteriaId).success(function(data){
                    if(criteriaId!=null){
                        $location.path("/index/serviceRequest/templateDetails/"+criteriaId).search({criId:criteriaId});
                    }else{
                        alert("无效的评分标准！")
                    }
                }).error(function(data,status,headers,config){
                    alert("服务器请求失败！");
                });
            }
        }

        $scope.selectGarden=function(index){
            $scope.gardens = true;               //园林
            $scope.cleans = false;                 //清洁
            $scope.securities = false;             //安保
            $scope.maintenances = false;          //维修

            $scope.btnIndex=index;

            $scope.gardenServiceRequest=[];
            $scope.gardenDayCheck=[];
            $scope.gardenWeekCheck=[];
            $scope.gardenHalfMonthCheck=[];
            $scope.gardenMonthCheck=[];

            $http.get(url+'/ScoreCriteria/getScoreCriteriabyType/0').success(function(data){
                if(data){
                    $scope.ScoreCriteria = data.ScoreCriteria;
                    //遍历所有评分标准按照周期分组
                    for(var i=0;i<$scope.ScoreCriteria.length;i++){

                        if($scope.ScoreCriteria[i].cycle==0){
                            $scope.gardenDayCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==1){
                            $scope.gardenWeekCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==2){
                            $scope.gardenHalfMonthCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==3){
                            $scope.gardenMonthCheck.push($scope.ScoreCriteria[i]);
                        }
                    }
                }else{
                    alert("没有找到园林标准！")
                }
            }).error(function(data,status,headers,config){
                alert("服务器请求失败！");
            });

            $scope.checkGrade=function(criteriaId){

                if(criteriaId!=null && criteriaId != undefined){
                    $location.path("/index/serviceRequest/templateDetails/"+criteriaId).search({criId:criteriaId});
                }else{
                    alert("信息错误!")
                }
            }
        }

        $scope.showSecurity=function(index) {
            $scope.gardens = false;               //园林
            $scope.cleans = false;                //清洁
            $scope.securities = true;              //安保
            $scope.maintenances = false;          //维修

            $scope.btnIndex=index;

            $scope.securityServiceRequest = [];
            $scope.securityDayCheck = [];
            $scope.securityWeekCheck = [];
            $scope.securityHalfMonthCheck = [];
            $scope.securityMonthCheck = [];

            $http.get(url+'/ScoreCriteria/getScoreCriteriabyType/2').success(function(data){
                if(data){
                    $scope.ScoreCriteria = data.ScoreCriteria;
                    //遍历所有评分标准按照周期分组
                    for(var i=0;i<$scope.ScoreCriteria.length;i++){
                        if($scope.ScoreCriteria[i].cycle==0){
                            $scope.securityDayCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==1){
                            $scope.securityWeekCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==2){
                            $scope.securityHalfMonthCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==3){
                            $scope.securityMonthCheck.push($scope.ScoreCriteria[i]);
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
        }

        $scope.showMaintenance=function(index){
            $scope.gardens=false;               //园林
            $scope.cleans=false;                //清洁
            $scope.securities=false;             //安保
            $scope.maintenances=true;           //维修

            $scope.btnIndex=index;

            $scope.maintenanceServiceRequest=[];
            $scope.maintenanceDayCheck=[];
            $scope.maintenanceWeekCheck=[];
            $scope.maintenanceHalfMonthCheck=[];
            $scope.maintenanceMonthCheck=[];

            $http.get(url+'/ScoreCriteria/getScoreCriteriabyType/3').success(function(data){
                if(data){
                    $scope.ScoreCriteria = data.ScoreCriteria;
                    //遍历所有评分标准按照周期分组
                    for(var i=0;i<$scope.ScoreCriteria.length;i++){
                        if($scope.ScoreCriteria[i].cycle==0){
                            $scope.maintenanceDayCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==1){
                            $scope.maintenanceWeekCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==2){
                            $scope.maintenanceHalfMonthCheck.push($scope.ScoreCriteria[i]);
                        }else if($scope.ScoreCriteria[i].cycle==3){
                            $scope.maintenanceMonthCheck.push($scope.ScoreCriteria[i]);
                        }
                    }
                }else{
                    alert("没有找到维修标准！")
                }
            }).error(function(data,status,headers,config){
                alert("服务器请求失败！");
            });

            $scope.checkGrade=function(criteriaId){
                $http.get(url+'/ScoreCriteria/getScoreCriteriabyId/'+criteriaId).success(function(data){
                    if(criteriaId!=null){
                        $location.path("/index/serviceRequest/templateDetails/"+criteriaId);
                    }else{
                        alert("无效的评分标准！");
                    }
                }).error(function(data,status,headers,config){
                    alert("服务器请求失败！");
                });
            }
        }

    }]);
});