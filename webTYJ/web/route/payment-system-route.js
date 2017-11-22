/**
 * Created by wangzhou on 2016/4/15.
 * Name : 支付系统路由设置
 * Updated by wangzhou on 2016.04.21 调整路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //支付系统start
            .state('index.paymentSystem', {
                url: '/paymentSystem',
                views: {
                    'main@index': {
                        templateUrl: 'main/paymentSystem/index.html',
                        controllerUrl: 'main/paymentSystem/paymentSystem',
                        controller: 'paymentSystemCtrl'
                    }
                }
            })
            //支付系统end

            //增加公司、项目级页面的上级页面
            .state('index.paymentSystem.banner', {
                url : '/banner',
                views : {
                    'main@index' : {
                        templateUrl : 'main/paymentSystem/banner/banner.html',
                        controllerUrl : 'main/paymentSystem/banner/banner',
                        controller : 'bannerCtrl'
                    }
                }
            })

            //物业公司后台start
            .state('index.paymentSystem.banner.company', {
                url: '/company',
                    templateUrl: 'main/paymentSystem/company/company.html',
                    controllerUrl: 'main/paymentSystem/company/company',
                    controller: 'companyCtrl'
            })
            //物业公司后台end

            //物业项目后台start
            .state('index.paymentSystem.banner.project', {
                url: '/project',
                templateUrl: 'main/paymentSystem/project/project.html',
                controllerUrl: 'main/paymentSystem/project/project',
                controller: 'projectCtrl'
            })
            //物业项目后台end
    }]);
});