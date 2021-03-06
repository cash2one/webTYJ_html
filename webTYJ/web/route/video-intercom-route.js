/**
 * 可视对讲route路由
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
            .state('index.videoIntercom', {
                url: '/videoIntercom',
                views: {
                    'main@index': {
                        templateUrl: 'main/videoIntercom/index.html',
                        controllerUrl: 'main/videoIntercom/videoIntercom',
                        controller: 'videoIntercomCtrl'
                    }
                }
            })
            //人事管理end

             //设备管理start
            .state('index.videoIntercom.equipmentManage',{
                url : '/equipmentManage',
                templateUrl : 'main/videoIntercom/equipmentManage/queryGatings/queryGatings.html',
                controllerUrl : 'main/videoIntercom/equipmentManage/queryGatings/queryGatings',
                controller : 'queryGatingsCtrl',
                dependencies: ['services/PageServices','services/tyjUtil']
            })
            //设备管理end

             //区域管理start
            .state('index.videoIntercom.areaManagement', {
                url: '/areaManagement',
                templateUrl: 'main/videoIntercom/areaManagement/areaManagement.html',
                controllerUrl: 'main/videoIntercom/areaManagement/areaManagement',
                controller: 'areaManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //区管理
            .state('index.videoIntercom.areaManagement.districtManagement', {
                url: '/districtManagement',
                templateUrl: 'main/videoIntercom/areaManagement/districtManagement/districtManagement.html',
                controllerUrl: 'main/videoIntercom/areaManagement/districtManagement/districtManagement',
                controller: 'districtManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //组管理
            .state('index.videoIntercom.areaManagement.teamManagement', {
                url: '/teamManagement',
                templateUrl: 'main/videoIntercom/areaManagement/teamManagement/teamManagement.html',
                controllerUrl: 'main/videoIntercom/areaManagement/teamManagement/teamManagement',
                controller: 'teamManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //区域管理end
            //账号管理start
            .state('index.videoIntercom.accountManagement',{
                url : '/accountManagement',
                templateUrl : 'main/videoIntercom/accountManagement/accountManagement.html',
                controllerUrl : 'main/videoIntercom/accountManagement/accountManagement',
                controller : 'accountManagementCtrl'
            })

            .state('index.videoIntercom.accountManagement.accountNumberManagement', {
                url: '/accountNumberManagement',
                templateUrl: 'main/videoIntercom/accountManagement/accountNumberManagement/accountNumberManagement.html',
                controllerUrl: 'main/videoIntercom/accountManagement/accountNumberManagement/accountNumberManagement',
                controller: 'accountNumberManagementCtrl',
                dependencies: ['services/PageServices','services/tyjUtil']
            })
            .state('index.videoIntercom.accountManagement.homeManagement', {
                url: '/homeManagement',
                templateUrl: 'main/videoIntercom/accountManagement/homeManagement/homeManagement.html',
                controllerUrl: 'main/videoIntercom/accountManagement/homeManagement/homeManagement',
                controller: 'homeManagementCtrl',
                dependencies: ['services/PageServices','services/tyjUtil']
            })
            .state('index.videoIntercom.accountManagement.systemManagement', {
                url: '/systemManagement',
                templateUrl: 'main/videoIntercom/accountManagement/systemManagement/systemManagement.html',
                controllerUrl: 'main/videoIntercom/accountManagement/systemManagement/systemManagement',
                controller: 'systemManagementCtrl',
                dependencies: ['services/PageServices','services/tyjUtil']
            })

            //账号管理end

            //日志start
            .state('index.videoIntercom.operationLog',{
                url : '/operationLog',
                templateUrl : 'main/videoIntercom/operationLog/operationLog.html',
                controllerUrl : 'main/videoIntercom/operationLog/operationLog',
                controller : 'operationLogCtrl',
                dependencies: ['services/PageServices']
            })
            //日志end
            //操作日志start
            .state('index.videoIntercom.operationLog.operationLogs',{
                url : '/operationLogs',
                templateUrl : 'main/videoIntercom/operationLog/operationLogs/operationLogs.html',
                controllerUrl : 'main/videoIntercom/operationLog/operationLogs/operationLogs',
                controller : 'operationLogsCtrl',
                dependencies: ['services/PageServices']
            })
            //操作日志end;
            //硬件日志start
            .state('index.videoIntercom.operationLog.deviceLogs',{
                url : '/deviceLogs',
                templateUrl : 'main/videoIntercom/operationLog/deviceLogs/deviceLogs.html',
                controllerUrl : 'main/videoIntercom/operationLog/deviceLogs/deviceLogs',
                controller : 'deviceLogsCtrl',
                dependencies: ['services/PageServices']
            })
            //硬件日志end


            //设备申购start
            .state('index.videoIntercom.equipmentPurchase',{
                url : '/equipmentPurchase',
                templateUrl : 'main/videoIntercom/equipmentPurchase/equipmentPurchase.html',
                controllerUrl : 'main/videoIntercom/equipmentPurchase/equipmentPurchase',
                controller : 'equipmentPurchaseCtrl',
                dependencies: ['services/PageServices']
            })
            //设备申购end
            //申购start
            .state('index.videoIntercom.equipmentPurchase.purchase',{
                url : '/purchase',
                templateUrl : 'main/videoIntercom/equipmentPurchase/purchase/purchase.html',
                controllerUrl : 'main/videoIntercom/equipmentPurchase/purchase/purchase',
                controller : 'purchaseCtrl',
                dependencies: ['services/PageServices']
            })
            //申购end;
            //购物车start
            .state('index.videoIntercom.equipmentPurchase.shopCart',{
                url : '/shopCart',
                templateUrl : 'main/videoIntercom/equipmentPurchase/shopCart/shopCart.html',
                controllerUrl : 'main/videoIntercom/equipmentPurchase/shopCart/shopCart',
                controller : 'shopCartCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            //购物车end


            //设备列表start
            .state('index.videoIntercom.equipmentList',{
                url : '/equipmentList',
                templateUrl : 'main/videoIntercom/equipmentList/equipmentList.html',
                controllerUrl : 'main/videoIntercom/equipmentList/equipmentList',
                controller : 'equipmentListCtrl',
                dependencies: ['services/PageServices']
            })
            //设备列表end
            //设备订购列表start
            .state('index.videoIntercom.equipmentList.orderList',{
                url : '/orderList',
                templateUrl : 'main/videoIntercom/equipmentList/orderList/orderList.html',
                controllerUrl : 'main/videoIntercom/equipmentList/orderList/orderList',
                controller : 'orderListCtrl',
                dependencies: ['services/PageServices']
            })
            //设备订购列表end;
            //设备申请列表start
            .state('index.videoIntercom.equipmentList.applyList',{
                url : '/applyList',
                templateUrl : 'main/videoIntercom/equipmentList/applyList/applyList.html',
                controllerUrl : 'main/videoIntercom/equipmentList/applyList/applyList',
                controller : 'applyListCtrl',
                dependencies: ['services/PageServices']
            });
            //设备申请列表end

    }]);
});
