define(function (require, exports, module) {

    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('angularAnimate');
    require('angularResource');
    require('angularSanitize');
    require('angularCookies');
    require('uiBootStrap');
    require('ueditor');

    var app = angular.module('app', ['ui.router',
        'ngAnimate','ngResource', 'ngSanitize',
        'ui.bootstrap','ngCookies','ng.ueditor'
    ]);

    asyncLoader.configure(app);

    module.exports = app;
});
