/**
 * 人事管理route路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //人事管理start
            .state('index.personnelManagement', {
                url: '/personnelManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/personnelManagement/index.html',
                        controllerUrl: 'main/personnelManagement/personnelManagement',
                        controller: 'personnelManagementCtrl'
                    }
                }
            })
            //人事管理end
            //项目团队管理start
            .state('index.personnelManagement.projectTeamManagement', {
                url: '/projectTeamManagement',
                templateUrl: 'main/personnelManagement/projectTeamManagement/projectTeamManagement.html',
                controllerUrl: 'main/personnelManagement/projectTeamManagement/projectTeamManagement',
                controller: 'projectTeamManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //项目团队管理end
            //我的团队（专业线）start
            .state('index.personnelManagement.myTeamProfession',{
                url : '/myTeamProfession',
                templateUrl : 'main/personnelManagement/myTeamProfession/myTeamProfession.html',
                controllerUrl : 'main/personnelManagement/myTeamProfession/myTeamProfession',
                controller : 'myTeamManagementCtrl'
            })
            //我的团队（专业线）end
            //我的团队（项目经理）start
            .state('index.personnelManagement.myTeamProjectManager',{
                url : '/myTeamProjectManager',
                templateUrl : 'main/personnelManagement/myTeamProjectManager/myTeamProjectManager.html',
                controllerUrl : 'main/personnelManagement/myTeamProjectManager/myTeamProjectManager',
                controller : 'myTeamProjectManagerCtrl'
            })
            //我的团队（项目经理）end
            //我的团队（合并）start
            .state('index.personnelManagement.myTeamManagement',{
                url : '/myTeamManagement',
                templateUrl : 'main/personnelManagement/myTeamManagement/myTeamManagement.html',
                controllerUrl : 'main/personnelManagement/myTeamManagement/myTeamManagement',
                controller : 'myTeamManagementCtrl'
            })
            //我的团队（合并）end
			//岗位人员配置start
            .state('index.personnelManagement.postPersonnelConfiguration', {
                url: '/postPersonnelConfiguration',
                templateUrl: 'main/personnelManagement/postPersonnelConfiguration/postPersonnelConfiguration.html',
                controllerUrl: 'main/personnelManagement/postPersonnelConfiguration/postPersonnelConfiguration',
                controller: 'postPersonnelConfigurationCtrl',
                dependencies: ['services/PageServices']
            })
        	//岗位人员配置
        	//核心岗位设置start
            .state('index.personnelManagement.corePost', {
                url: '/corePost',
                templateUrl: 'main/personnelManagement/corePost/corePost.html',
                controllerUrl: 'main/personnelManagement/corePost/corePost',
                controller: 'corePostCtrl',
                dependencies: ['services/PageServices']
            })
        	//核心岗位设置end
            //人员管理start
            .state('index.personnelManagement.staffsuperviseIT', {
                url: '/staffsuperviseIT',
                templateUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseIT.html',
                controllerUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseIT',
                controller: 'staffsuperviseITCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.staffsuperviseIT.staffsuperviseITCheck', {
                url: '/staffsuperviseITCheck',
                templateUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseITCheck/staffsuperviseITCheck.html',
                controllerUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseITCheck/staffsuperviseITCheck',
                controller: 'staffsuperviseITCheckCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.staffsuperviseIT.staffsuperviseITAdd', {
                url: '/staffsuperviseITAdd',
                templateUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseITAdd/staffsuperviseITAdd.html',
                controllerUrl: 'main/personnelManagement/staffsuperviseIT/staffsuperviseITAdd/staffsuperviseITAdd',
                controller: 'staffsuperviseITAddCtrl',
                dependencies: ['services/PageServices']
            })
        	//人员设置end


            //人员管理start（添加物业APP人员）
            .state('index.personnelManagement.appPersonManagement', {
                url: '/appPersonManagement',
                templateUrl: 'main/personnelManagement/appPersonManagement/appPersonManagement.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appPersonManagement',
                controller: 'appPersonManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.appPersonManagement.appUserCheck', {
                url: '/appUserCheck',
                templateUrl: 'main/personnelManagement/appPersonManagement/appUserCheck/appUserCheck.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appUserCheck/appUserCheck',
                controller: 'appUserCheckCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.appPersonManagement.appUserAdd', {
                url: '/appUserAdd',
                templateUrl: 'main/personnelManagement/appPersonManagement/appUserAdd/appUserAdd.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appUserAdd/appUserAdd',
                controller: 'appUserAddCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.appPersonManagement.appWorkingStaff', {
                url: '/appWorkingStaff',
                templateUrl: 'main/personnelManagement/appPersonManagement/appWorkingStaff/appWorkingStaff.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appWorkingStaff/appWorkingStaff',
                controller: 'appWorkingStaffCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.appPersonManagement.appStaffEmployed', {
                url: '/appStaffEmployed',
                templateUrl: 'main/personnelManagement/appPersonManagement/appStaffEmployed/appStaffEmployed.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appStaffEmployed/appStaffEmployed',
                controller: 'appStaffEmployedCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.personnelManagement.appPersonManagement.appOffStaff', {
                url: '/appOffStaff',
                templateUrl: 'main/personnelManagement/appPersonManagement/appOffStaff/appOffStaff.html',
                controllerUrl: 'main/personnelManagement/appPersonManagement/appOffStaff/appOffStaff',
                controller: 'appOffStaffCtrl',
                dependencies: ['services/PageServices']
            })
            //人员设置end（添加物业APP人员）

            //人员管理设置start
            .state('index.personnelManagement.personnelManagement', {
                url: '/personnelManagement',
                templateUrl: 'main/personnelManagement/personnelManagement/personnelManagement.html',
                controllerUrl: 'main/personnelManagement/personnelManagement/personnelManagement',
                controller: 'personnelManagementSetCtrl'
            });
            //人员管理设置end
    }]);
});

