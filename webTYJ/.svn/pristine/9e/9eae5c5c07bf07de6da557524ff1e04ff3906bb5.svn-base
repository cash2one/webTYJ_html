/**
* Created by 陶勇超 on 2015/5/27.
* 评分详情
* 修改时间：2015/7/15
* 修改人：杨雨琪
*/

/**
 * Created by NM on 2018/1/18.
 * 评分详情
 */

'use strict';

define(function (require) {
    var app = require('../../../app');

    app.controller('templateDetailsCtrl', ['$scope', '$http','$rootScope','$stateParams','$location', function ($scope,$http,$rootScope,$stateParams,$location) {

        var url = $rootScope.url;           //定义当前的路径

        $scope.ScoreCriteria={};               //评分标准
        var criteriaId=$stateParams.criId;

        //根据id查询评分标准
        $http.get(url+'/ScoreCriteria/getScoreCriteriaDetailedbyId/'+criteriaId).success(function(data){
            $scope.ScoreCriteria= data.ScoreCriteria;
            console.log($scope.ScoreCriteria);
        });

    }]);
});
