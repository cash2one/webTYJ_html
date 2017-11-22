
require.config({
    //baseUrl: '/',
    paths: {
        'angular': 'bower_components/angular/angular.min',
        'angular-ui-router': 'bower_components/angular/angular-ui-router',
        'angular-async-loader': 'dist/angular-async-loader',
        'jquery': 'bower_components/jquery/jquery-1.11.2.min',
        'bootstrap': 'bower_components/bootstrap/bootstrap.min',
        'angularAnimate':'bower_components/angular/angular-animate',
        'angularResource':'bower_components/angular/angular-resource',
        'angularSanitize':'bower_components/angular/angular-sanitize',
        'angularCookies':'bower_components/angular/angular-cookies',
        'uiBootStrap':'bower_components/bootstrap/ui-bootstrap-tpls-0.12.1',
        'layer':'bower_components/layer-v2.1/layer/layer',
        'layerext':'bower_components/layer-v2.1/layer/extend/layer.ext',
        'zyupload':'bower_components/zyupload-1.0.0.min',
        'ueditor':'bower_components/ueditor/angular-ueditor',
        'WdatePicker':'bower_components/date/My97DatePicker/WdatePicker',
        'qrcode':'bower_components/jquery.qrcode.min'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']},
        'angular-async-loader': {deps: ['angular']},
        'angularAnimate': {deps: ['angular']},
        'angularResource': {deps: ['angular']},
        'angularSanitize': {deps: ['angular']},
        'angularCookies': {deps: ['angular']},
        'uiBootStrap': {deps: ['angular']},
        'ueditor': {deps: ['angular']},
        'bootstrap': {deps: ['jquery']},
        'zyupload': {deps: ['jquery']},
        'layer':['jquery'],
        'layerext':['layer'],
        'qrcode':['jquery']

    }
});

require([
    'angular','jquery','bootstrap','zyupload','main/main','layer','layerext','WdatePicker','qrcode',
    'route/app-routes',
    'route/base-management-route',
    'route/property-service-route',
    'route/personnel-management-route',
    'route/system-settings-route',
    'route/business-management-route',
    'route/account-management-route',
    'route/service-request-route',
    'route/video-intercom-route',
    'route/payment-system-route'
], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});

