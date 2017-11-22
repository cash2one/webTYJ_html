/**
 * 服务请求route路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //服务请求start
            .state('index.serviceRequest', {
                url: '/serviceRequest',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/index.html',
                        controllerUrl: 'main/serviceRequest/serviceRequest',
                        controller: 'serviceRequestCtrl'
                    }
                }
            })
            //服务请求end
            //FAQStart
            .state('index.serviceRequest.FAQ', {
                url: '/FAQ',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/FAQ/FAQ.html',
                        controllerUrl: 'main/serviceRequest/FAQ/FAQ',
                        controller: 'faqCtrl'
                    }
                }
            })
            //常见FAQ
            .state('index.serviceRequest.FAQ.commonFaq',{
                url: '/commonFaq',
                templateUrl: 'main/serviceRequest/FAQ/commonFaq/commonFaq.html',
                controllerUrl: 'main/serviceRequest/FAQ/commonFaq/commonFaq',
                controller: 'commonFaqCtrl',
                dependencies: ['services/PageServices']
            })
            //待办FAQ
            .state('index.serviceRequest.FAQ.upcomingFaq',{
                url: '/upcomingFaq',
                templateUrl: 'main/serviceRequest/FAQ/upcomingFaq/upcomingFaq.html',
                controllerUrl: 'main/serviceRequest/FAQ/upcomingFaq/upcomingFaq',
                controller: 'upcomingFaqCtrl',
                dependencies: ['services/PageServices']
            })
            //FAQEnd
            //电表抄表服务请求管理开始
            .state('index.serviceRequest.electricMeterReadingServiceRequestManage',{
                url:'/electricMeterReadingServiceRequestManage',
                views: {
                    'main@index': {
                        templateUrl:'main/serviceRequest/electricMeterReadingServiceRequestManage/electricMeterReadingServiceRequestManage.html',
                        controllerUrl:'main/serviceRequest/electricMeterReadingServiceRequestManage/electricMeterReadingServiceRequestManage',
                        controller:'eleMeterReadingSRCtrl',
                        dependencies: ['services/PageServices','services/valueCheck']
                    }
                }
            })
            //电表抄表服务请求管理结束
            //水表抄表服务请求管理开始
            .state('index.serviceRequest.meterReadingServiceRequestManage',{
                url:'/meterReadingServiceRequestManage',
                views: {
                    'main@index': {
                        templateUrl:'main/serviceRequest/meterReadingServiceRequestManage/meterReadingServiceRequestManage.html',
                        controllerUrl:'main/serviceRequest/meterReadingServiceRequestManage/meterReadingServiceRequestManage',
                        controller:'meterReadingSRCtrl',
                        dependencies: ['services/PageServices','services/valueCheck']
                    }
                }
            })
            //水表抄表服务请求管理结束
            //工单start
            .state('index.serviceRequest.repairOrder', {
                //url: '/repairOrder/:taskDetailsIds',
                url: '/repairOrder',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/repairOrder/repairOrder.html',
                        controllerUrl: 'main/serviceRequest/repairOrder/repairOrder',
                        controller: 'repairOrderCtrl',
                        dependencies: ['services/PageServices','services/tyjUtil','services/valueCheck']
                    }
                }
            })
            //工单end
            //向业主索赔服务请求管理开始
            .state('index.serviceRequest.claimsToOwnersServiceRequestManage',{
                url:'/claimsToOwnersServiceRequestManage',
                views: {
                    'main@index': {
                        templateUrl:'main/serviceRequest/claimsToOwnersServiceRequestManage/claimsToOwnersServiceRequestManage.html',
                        controllerUrl:'main/serviceRequest/claimsToOwnersServiceRequestManage/claimsToOwnersServiceRequestManage',
                        controller:'claimToOwnerSRCtrl',
                        dependencies: ['services/PageServices','services/valueCheck']
                    }
                }
            })
            //向业主索赔服务请求管理结束
            //巡检管理start
            .state('index.serviceRequest.patrolManagement', {
                url:'/patrolManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/patrolManagement/patrolManagement.html',
                        controllerUrl: 'main/serviceRequest/patrolManagement/patrolManagement',
                        controller: 'patrolManagementCtrl'
                    }
                }
            })
            .state('index.serviceRequest.patrolManagement.plans', {
                url: '/plans',
                templateUrl: 'main/serviceRequest/patrolManagement/plans/plans.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/plans/plans',
                controller: 'plansCtrl'
            })
            .state('index.serviceRequest.patrolManagement.serviceRequests', {
                url: '/serviceRequests',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceRequests/serviceRequests.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceRequests/serviceRequests',
                controller: 'serviceRequestsCtrl'
            })
            .state('index.serviceRequest.patrolManagement.serviceRequests.isGoingServiceRequest', {
                url: '/isGoingServiceRequest',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceRequests/isGoingServiceRequest/isGoingServiceRequest.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceRequests/isGoingServiceRequest/isGoingServiceRequest',
                controller: 'isGoingServiceRequestCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.serviceRequests.historyServiceRequest', {
                url: '/historyServiceRequest',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceRequests/historyServiceRequest/historyServiceRequest.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceRequests/historyServiceRequest/historyServiceRequest',
                controller: 'historyServiceRequestCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.serviceRequests.newPatrolServiceRequest', {
                url: '/newPatrolServiceRequest',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceRequests/newPatrolServiceRequest/newPatrolServiceRequest.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceRequests/newPatrolServiceRequest/newPatrolServiceRequest',
                controller: 'newPatrolServiceRequestCtrl',
                dependencies: ['services/PageServices','services/centerChange','services/valueCheck']
            })
            .state('index.serviceRequest.patrolManagement.plans.newPlans', {
                url: '/newPlans',
                templateUrl: 'main/serviceRequest/patrolManagement/plans/newPlans/newPlans.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/plans/newPlans/newPlans',
                controller: 'newPlanCtrl',
                dependencies: ['services/valueCheck']
            })
            .state('index.serviceRequest.patrolManagement.plans.validPlans', {
                url: '/validPlans',
                templateUrl: 'main/serviceRequest/patrolManagement/plans/validPlans/validPlans.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/plans/validPlans/validPlans',
                controller: 'validPlansCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.plans.historyPlans', {
                url: '/validPlans',
                templateUrl: 'main/serviceRequest/patrolManagement/plans/historyPlans/historyPlans.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/plans/historyPlans/historyPlans',
                controller: 'historyPlansCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.serviceTasks', {
                url: '/serviceTasks',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceTasks/serviceTasks.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceTasks/serviceTasks',
                controller: 'serviceTasksCtrl'
            })
            .state('index.serviceRequest.patrolManagement.serviceTasks.isGoingTasks', {
                url: '/isGoingTasks',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceTasks/isGoingTasks/isGoingTasks.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceTasks/isGoingTasks/isGoingTasks',
                controller: 'isGoingTasksCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.serviceTasks.historyServiceTasks', {
                url: '/historyServiceTasks',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceTasks/historyServiceTasks/historyServiceTasks.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceTasks/historyServiceTasks/historyServiceTasks',
                controller: 'historyServiceTasksCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.patrolManagement.serviceTasks.newServiceTasks', {
                url: '/newServiceTasks',
                templateUrl: 'main/serviceRequest/patrolManagement/serviceTasks/newServiceTasks/newServiceTasks.html',
                controllerUrl: 'main/serviceRequest/patrolManagement/serviceTasks/newServiceTasks/newServiceTasks',
                controller: 'newServiceTasksCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            //巡检管理end
            //验房服务请求管理start
            .state('index.serviceRequest.homeInspectionServiceRequestManage',{
                url:'/homeInspectionServiceRequestManage',
                views: {
                    'main@index': {
                        templateUrl:'main/serviceRequest/homeInspectionServiceRequestManage/homeInspectionServiceRequestManage.html',
                        controllerUrl:'main/serviceRequest/homeInspectionServiceRequestManage/homeInspectionServiceRequestManage',
                        controller:'homeInspectionSRCtrl',
                        dependencies: ['services/PageServices','services/centerChange','services/valueCheck']
                    }
                }
            })
            //验房服务请求管理start
            //重大事项管理start
            .state('index.serviceRequest.majorIssuesManagement', {
                url:'/majorIssuesManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesManagement.html',
                        controllerUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesManagement',
                        controller: 'majorIssuesManagementCtrl',
                        dependencies: ['services/valueCheck']
                    }
                }
            })
            .state('index.serviceRequest.majorIssuesManagement.majorIssuesList', {
                url:'/majorIssuesList',
                templateUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesList/majorIssuesList.html',
                controllerUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesList/majorIssuesList',
                controller: 'majorIssuesListsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.majorIssuesManagement.handleMechanism', {
                url: '/handleMechanism',
                templateUrl: 'main/serviceRequest/majorIssuesManagement/handleMechanism/handleMechanism.html',
                controllerUrl: 'main/serviceRequest/majorIssuesManagement/handleMechanism/handleMechanism',
                controller: 'handleMechanismsCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            .state('index.serviceRequest.majorIssuesManagement.majorIssuesTasks', {
                url:'/majorIssuesTasks',
                templateUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/majorIssuesTasks.html',
                controllerUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/majorIssuesTasks',
                controller: 'majorIssuesTasksCtrl'
            })
            .state('index.serviceRequest.majorIssuesManagement.majorIssuesTasks.newTasks', {
                url:'/newTasks',
                templateUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/newTasks/newTasks.html',
                controllerUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/newTasks/newTasks',
                controller: 'newTasksCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.majorIssuesManagement.majorIssuesTasks.isGoingTasks', {
                url: '/isGoingTasks',
                templateUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/isGoingTasks/isGoingTasks.html',
                controllerUrl: 'main/serviceRequest/majorIssuesManagement/majorIssuesTasks/isGoingTasks/isGoingTasks',
                controller: 'isGoingTaskCtrl',
                dependencies: ['services/PageServices']
            })
            //重大事项管理end
            //装修管理模块start
            .state('index.serviceRequest.newDecorateManagement', {
                url: '/newDecorateManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/newDecorateManagement/newDecorateManagement.html',
                        controllerUrl: 'main/serviceRequest/newDecorateManagement/newDecorateManagement',
                        controller: 'newDecorateManagementCtrl'
                    }
                }
            })
            .state('index.serviceRequest.newDecorateManagement.newDecorateServiceManagement', {
                url: '/newDecorateServiceManagement',
                templateUrl: 'main/serviceRequest/newDecorateManagement/newDecorateServiceManagement/newDecorateServiceManagement.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/newDecorateServiceManagement/newDecorateServiceManagement',
                controller: 'newDecorateServiceManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.newDecorateManagement.newDecorateServiceRequestManagement', {
                url: '/newDecorateServiceRequestManagement',
                templateUrl: 'main/serviceRequest/newDecorateManagement/newDecorateServiceRequestManagement/newDecorateServiceRequestManagement.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/newDecorateServiceRequestManagement/newDecorateServiceRequestManagement',
                controller: 'newDecorateServiceRequestManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.newDecorateManagement.newAcceptanceTask', {
                url: '/newAcceptanceTask',
                templateUrl: 'main/serviceRequest/newDecorateManagement/newAcceptanceTask/newAcceptanceTask.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/newAcceptanceTask/newAcceptanceTask',
                controller: 'newAcceptanceTaskCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.serviceRequest.newDecorateManagement.newInspectionTasks', {
                url: '/newInspectionTasks',
                templateUrl: 'main/serviceRequest/newDecorateManagement/newInspectionTasks/newInspectionTasks.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/newInspectionTasks/newInspectionTasks',
                controller: 'newInspectionTasksCtrl'
            })
            .state('index.serviceRequest.newDecorateManagement.verificationTasks', {
                url: '/verificationTasks',
                templateUrl: 'main/serviceRequest/newDecorateManagement/verificationTasks/verificationTasks.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/verificationTasks/verificationTasks',
                controller: 'verificationTasksCtrl'
            })
            .state('index.serviceRequest.newDecorateManagement.newOwnerDecorateService', {
                url: '/newOwnerDecorateService',
                templateUrl: 'main/serviceRequest/newDecorateManagement/newOwnerDecorateService/newOwnerDecorateService.html',
                controllerUrl: 'main/serviceRequest/newDecorateManagement/newOwnerDecorateService/newOwnerDecorateService',
                controller: 'newOwnerDecorateServiceCtrl'
            })
            //装修管理模块start
            //装修管理开始
            .state('index.serviceRequest.decorationManagement', {
                url: '/decorationManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/decorationManagement.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/decorationManagement',
                        controller: 'decorationManagementCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.serviceRequest.decorationManagement.decorationInspectionManagement', {
                url: '/decorationInspectionManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/decorationInspectionManagement/decorationInspectionManagement.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/decorationInspectionManagement/decorationInspectionManagement',
                        controller: 'decorationInspectionManagementCtrl'
                    }
                }
            })
            .state('index.serviceRequest.decorationManagement.addDecorationTask', {
                url: '/addDecorationTask/:taskSerId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/addDecorationTask/addDecorationTask.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/addDecorationTask/addDecorationTask',
                        controller: 'addDecorationTaskCtrl'
                    }
                }
            })
            .state('index.serviceRequest.decorationManagement.decorationWork', {
                url: '/decorationWork/:decorationWorkId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/decorationWork/decorationWork.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/decorationWork/decorationWork',
                        controller: 'decorationWorkCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.serviceRequest.decorationManagement.acceptanceOrders', {
                url: '/acceptanceOrders/:decorationWorkId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/acceptanceOrders/acceptanceOrders.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/acceptanceOrders/acceptanceOrders',
                        controller: 'acceptanceOrdersCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.serviceRequest.decorationManagement.inspectionOrders', {
                url: '/inspectionOrders/:decorationWorkId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/decorationManagement/inspectionOrders/inspectionOrders.html',
                        controllerUrl: 'main/serviceRequest/decorationManagement/inspectionOrders/inspectionOrders',
                        controller: 'inspectionOrdersCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //装修管理结束
            //质检管理tart
            .state('index.serviceRequest.departmentOfQualityManagement', {
                url: '/departmentOfQualityManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityManagement.html',
                        controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityManagement',
                        controller: 'departmentOfQMCtrl'
                    }
                }
            })
            .state('index.serviceRequest.departmentOfQualityManagement.allDepartmentsInspectionServiceRequests', {
                url: '/allDepartmentsInspectionServiceRequests',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/allDepartmentsInspectionServiceRequests/allDepartmentsInspectionServiceRequests.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/allDepartmentsInspectionServiceRequests/allDepartmentsInspectionServiceRequests',
                controller: 'allDepartmentsISRCtrl'
            })
            .state('index.serviceRequest.departmentOfQualityManagement.departmentOfQualityInspectionCriteria', {
                url: '/departmentOfQualityInspectionCriteria',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/departmentOfQualityInspectionCriteria.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/departmentOfQualityInspectionCriteria',
                controller: 'departmentOfQICCtrl'
            })
            .state('index.serviceRequest.departmentOfQualityManagement.createDepartmentInspectionServiceRequests', {
                url: '/createDepartmentInspectionServiceRequests',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/createDepartmentInspectionServiceRequests/createDepartmentInspectionServiceRequests.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/createDepartmentInspectionServiceRequests/createDepartmentInspectionServiceRequests',
                controller: 'createDISRCtrl',
                dependencies: ['services/PageServices']
            })
            //【评分标准类型导航开始】
            //【评分标准类型设置】清洁
            .state('index.serviceRequest.departmentOfQualityManagement.departmentOfQualityInspectionCriteria.clean', {
                url: '/clean',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/clean/clean.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/clean/clean',
                controller: 'qualityCleanCtrl'
            })
            //【评分标准类型设置】end
            //【评分标准类型设置】园林
            .state('index.serviceRequest.departmentOfQualityManagement.departmentOfQualityInspectionCriteria.gardens', {
                url: '/gardens',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/gardens/gardens.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/gardens/gardens',
                controller: 'qualityGardensCtrl'
            })
            //【评分标准类型设置】end
            //【评分标准类型设置】维修
            .state('index.serviceRequest.departmentOfQualityManagement.departmentOfQualityInspectionCriteria.service', {
                url: '/repair',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/service/service.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/service/service',
                controller: 'qualityServiceCtrl'
            })
            //【评分标准类型设置】end
            //【评分标准类型设置】保安
            .state('index.serviceRequest.departmentOfQualityManagement.departmentOfQualityInspectionCriteria.security', {
                url: '/security',
                templateUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/security/security.html',
                controllerUrl: 'main/serviceRequest/departmentOfQualityManagement/departmentOfQualityInspectionCriteria/security/security',
                controller: 'qualitySecurityCtrl'
            })
            //【评分标准类型设置】end
            //质检管理end
            //部门之间服务请求详情start
            .state('index.serviceRequest.departmentServiceRequestForDetails', {
                url: '/departmentServiceRequestForDetails/:depart',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/departmentServiceRequestForDetails/departmentServiceRequestForDetails.html',
                        controllerUrl: 'main/serviceRequest/departmentServiceRequestForDetails/departmentServiceRequestForDetails',
                        controller: 'departmentSRFDCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //部门之间服务请求详情start
            //模板详情开始
            .state('index.serviceRequest.templateDetails', {
                url: '/templateDetails/:criId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/templateDetails/templateDetails.html',
                        controllerUrl: 'main/serviceRequest/templateDetails/templateDetails',
                        controller: 'templateDetailsCtrl'
                    }
                }
            })
            // 模板详情结束
            //任务详情开始
            .state('index.serviceRequest.taskDetails', {
                url: '/taskDetails/:taskDetailsId',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/taskDetails/taskDetails.html',
                        controllerUrl: 'main/serviceRequest/taskDetails/taskDetails',
                        controller: 'taskDetailCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //工单列表开始
            .state('index.serviceRequest.ordersList', {
                url: '/ordersList',
                views: {
                    'main@index': {
                        templateUrl: 'main/serviceRequest/ordersList/ordersList.html',
                        controllerUrl: 'main/serviceRequest/ordersList/ordersList',
                        controller: 'ordersListCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })

    }]);
});
