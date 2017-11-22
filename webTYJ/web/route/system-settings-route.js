/**
 * 系统设置route路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //系统设置start
            .state('index.systemSettings', {
                url: '/systemSettings',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/index.html',
                        controllerUrl: 'main/systemSettings/systemSettings',
                        controller: 'systemSettingsCtrl'
                    }
                }
            })
            //系统设置end
            //属性设置start
            .state('index.systemSettings.attributesSettings', {
                url: '/attributesSettings',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/attributesSettings/attributesSettings.html',
                        controllerUrl: 'main/systemSettings/attributesSettings/attributesSettings',
                        controller: 'attributesSettingsCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //属性设置end
            //管理员设置start
            .state('index.systemSettings.administratorSettings', {
                url: '/administratorSettings',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/administratorSettings/administratorSettings.html',
                        controllerUrl: 'main/systemSettings/administratorSettings/administratorSettings',
                        controller: 'administratorSettingsCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //系统
            .state('index.systemSettings.administratorSettings.systemAdministrator', {
                url: '/systemAdministrator',
                templateUrl: 'main/systemSettings/administratorSettings/systemAdministrator/systemAdministrator.html',
                controllerUrl: 'main/systemSettings/administratorSettings/systemAdministrator/systemAdministrator',
                controller: 'systemAdministratorCtrl',
                dependencies: ['services/PageServices']
            })
            //HR
            .state('index.systemSettings.administratorSettings.hRAdminSettings', {
                url: '/hRAdminSettings',
                templateUrl: 'main/systemSettings/administratorSettings/hRAdminSettings/hRAdminSettings.html',
                controllerUrl: 'main/systemSettings/administratorSettings/hRAdminSettings/hRAdminSettings',
                controller: 'hRAdminSettingsCtrl',
                dependencies: ['services/PageServices']
            })
            //管理员设置end
            //岗位设置start
            .state('index.systemSettings.postsSetting', {
                url: '/postsSetting',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/postsSetting/postsSetting.html',
                        controllerUrl: 'main/systemSettings/postsSetting/postsSetting',
                        controller: 'postsSettingCtrl'
                    }
                }
            })
            .state('index.systemSettings.postsSetting.postsJurisdiction', {
                url: '/queryAssets',
                templateUrl: 'main/systemSettings/postsSetting/postsJurisdiction/postsJurisdiction.html',
                controllerUrl: 'main/systemSettings/postsSetting/postsJurisdiction/postsJurisdiction',
                controller: 'postsJurisdictionCtrl',
                dependencies: ['services/tyjUtil']

            })
            .state('index.systemSettings.postsSetting.postsSettings', {
                url: '/postsSettings',
                templateUrl: 'main/systemSettings/postsSetting/postsSettings/postsSettings.html',
                controllerUrl: 'main/systemSettings/postsSetting/postsSettings/postsSettings',
                controller: 'postsSettingsCtrl',
                dependencies: ['services/tyjUtil']

            })
            //岗位设置end
            //规章制度start
            .state('index.systemSettings.institution', {
                url: '/institution',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/institution/institution.html',
                        controllerUrl: 'main/systemSettings/institution/institution',
                        controller: 'institutionCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //规章制度end
            //专业线管理start
            .state('index.systemSettings.professionallinemanagement', {
                url: '/professionallinemanagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/professionallinemanagement/professionallinemanagement.html',
                        controllerUrl: 'main/systemSettings/professionallinemanagement/professionallinemanagement',
                        controller: 'professionalLineCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //专业线管理end
            //公众号管理start
            .state('index.systemSettings.publicNumberManagement', {
                url: '/publicNumberManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/systemSettings/publicNumberManagement/publicNumberManagement.html',
                        controllerUrl: 'main/systemSettings/publicNumberManagement/publicNumberManagement',
                        controller: 'publicNumberManagementCtrl'
                    }
                }
            })
            .state('index.systemSettings.publicNumberManagement.massInformation',{
                url: '/massInformation',
                templateUrl: 'main/systemSettings/publicNumberManagement/massInformation/massInformation.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/massInformation/massInformation',
                controller: 'massInformationCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.systemSettings.publicNumberManagement.informationManagement',{
                url: '/informationManagement',
                templateUrl: 'main/systemSettings/publicNumberManagement/informationManagement/informationManagement.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/informationManagement/informationManagement',
                controller: 'informationManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.systemSettings.publicNumberManagement.addInformation',{
                url: '/addInformation',
                templateUrl: 'main/systemSettings/publicNumberManagement/addInformation/addInformation.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/addInformation/addInformation',
                controller: 'addInformationCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.systemSettings.publicNumberManagement.userManagement',{
                url: '/userManagement',
                templateUrl: 'main/systemSettings/publicNumberManagement/userManagement/userManagement.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/userManagement/userManagement',
                controller: 'userManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.systemSettings.publicNumberManagement.informationHistory',{
                url: '/informationHistory/:sendUserId',
                templateUrl: 'main/systemSettings/publicNumberManagement/informationHistory/informationHistory.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/informationHistory/informationHistory',
                controller: 'informationHistoryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.systemSettings.publicNumberManagement.homeManagement',{
                url: '/homeManagement',
                templateUrl: 'main/systemSettings/publicNumberManagement/homeManagement/homeManagement.html',
                controllerUrl: 'main/systemSettings/publicNumberManagement/homeManagement/homeManagement',
                controller: 'homeManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //公众号管理end
            //工作流
            .state('index.systemSettings.workflow',{
                url:'/workflow',
                views: {
                    'main@index':{
                        templateUrl: 'main/systemSettings/workflow/workflow.html',
                        controllerUrl: 'main/systemSettings/workflow/workflow',
                        controller: 'workflowCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //交账审批
            .state('index.systemSettings.workflow.accountForApproval',{
                url:'/accountForApproval',
                views: {
                    'main@index':{
                        templateUrl: 'main/systemSettings/workflow/accountForApproval/accountForApproval.html',
                        controllerUrl: 'main/systemSettings/workflow/accountForApproval/accountForApproval',
                        controller: 'accountForApprovalCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //子公司
            .state('index.systemSettings.subCompany',{
                url:'/subCompany',
                views: {
                    'main@index':{
                        templateUrl: 'main/systemSettings/subCompany/subCompany.html',
                        controllerUrl: 'main/systemSettings/subCompany/subCompany',
                        controller: 'subCompanyCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })

            //子公司项目
            .state('index.systemSettings.subCompany.subCompanyProject',{
                url:'/subCompanyProject',
                views: {
                    'main@index':{
                        templateUrl: 'main/systemSettings/subCompany/subCompanyProject/subCompanyProject.html',
                        controllerUrl: 'main/systemSettings/subCompany/subCompanyProject/subCompanyProject',
                        controller: 'subCompanyProjectCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })

    }]);
});
