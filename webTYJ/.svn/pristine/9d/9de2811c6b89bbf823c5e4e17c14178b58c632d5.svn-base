/**
 * 物业服务route路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //物业服务start
            .state('index.propertyService', {
                url: '/propertyService',
                views: {
                    'main@index': {
                        templateUrl: 'main/propertyService/index.html',
                        controllerUrl: 'main/propertyService/propertyService',
                        controller: 'psCtrl'
                    }
                }
            })
            //物业服务end
            //人员信息start
            .state('index.propertyService.staffHome', {
                url: '/staffHome',
                views: {
                    'main@index': {
                        templateUrl: 'main/propertyService/staffHome/staffHome.html',
                        controllerUrl: 'main/propertyService/staffHome/staffHome',
                        controller: 'staffCtrl'
                    }
                }
            })
            //人员信息end
            //常用start
            .state('index.propertyService.staffHome.commonUser', {
                url: '/commonUser',
                templateUrl: 'main/propertyService/staffHome/commonUser/commonUser.html',
                controllerUrl: 'main/propertyService/staffHome/commonUser/commonUser',
                controller: 'commonUserCtrl'
            })
            //常用end
            //授权管理start
            .state('index.propertyService.staffHome.empowerManagement', {
                url: '/empowerManagement',
                templateUrl: 'main/propertyService/staffHome/empowerManagement/empowerManagement.html',
                controllerUrl: 'main/propertyService/staffHome/empowerManagement/empowerManagement',
                controller: 'empowerManagementCtrl'
            })
            .state('index.propertyService.staffHome.empowerManagement.empower', {
                url: '/empower',
                templateUrl: 'main/propertyService/staffHome/empowerManagement/empower/empower.html',
                controllerUrl: 'main/propertyService/staffHome/empowerManagement/empower/empower',
                controller: 'empowerCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            .state('index.propertyService.staffHome.empowerManagement.history', {
                url: '/history',
                templateUrl: 'main/propertyService/staffHome/empowerManagement/history/history.html',
                controllerUrl: 'main/propertyService/staffHome/empowerManagement/history/history',
                controller: 'empowerHistoryCtrl',
                dependencies: ['services/PageServices']
            })
            //授权管理end
            //入伙start
            .state('index.propertyService.staffHome.joinGang', {
                url: '/joinGang',
                templateUrl: 'main/propertyService/staffHome/joinGang/joinGang.html',
                controllerUrl: 'main/propertyService/staffHome/joinGang/joinGang',
                controller: 'joinGangCtrl',
                dependencies: ['services/PageServices']
            })
            //入伙end
            //装修start
            .state('index.propertyService.staffHome.newDecorate', {
                url: '/newDecorate',
                templateUrl: 'main/propertyService/staffHome/newDecorate/newDecorate.html',
                controllerUrl: 'main/propertyService/staffHome/newDecorate/newDecorate',
                controller: 'newDecorateCtrl'
            })
            .state('index.propertyService.staffHome.decorateShow', {
                url: '/decorateShow',
                templateUrl: 'main/propertyService/staffHome/decorateShow/decorateShow.html',
                controllerUrl: 'main/propertyService/staffHome/decorateShow/decorateShow',
                controller: 'decorateShowCtrl'
            })
            .state('index.propertyService.staffHome.decorate', {
                url: '/decorate/:CustSerId',
                templateUrl: 'main/propertyService/staffHome/decorate/decorate.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decorate',
                controller: 'decorateCtrl'
            })
            //办理装修start
            .state('index.propertyService.staffHome.decorate.decoration', {
                url: '/decoration',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/decoration.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/decoration',
                controller: 'decorationCtrl'
            })
            //选择房屋开始
            .state('index.propertyService.staffHome.decorate.decoration.chooseHouse', {
                url: '/chooseHouse',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/chooseHouse/chooseHouse.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/chooseHouse/chooseHouse',
                controller: 'chooseHouseCtrl'
            })
            //选择房屋结束
            //申请资料开始
            .state('index.propertyService.staffHome.decorate.decoration.applicationData', {
                url: '/applicationData',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/applicationData/applicationData.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/applicationData/applicationData',
                controller: 'applicationDataCtrl'
            })
            //申请资料结束
            //现场核查开始
            .state('index.propertyService.staffHome.decorate.decoration.verification', {
                url: '/verification',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/verification/verification.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/verification/verification',
                controller: 'verificationCtrl'
            })
            .state('index.propertyService.staffHome.decorate.decoration.verification.check', {
                url: '/check',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/verification/check/check.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/verification/check/check',
                controller: 'checkVerificationCtrl'
            })
            .state('index.propertyService.staffHome.decorate.decoration.verification.checkFinish', {
                url: '/checkFinish',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/verification/checkFinish/checkFinish.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/verification/checkFinish/checkFinish',
                controller: 'checkFinishCtrl'
            })
            //现场核查结束
            //缴纳押金开始
            .state('index.propertyService.staffHome.decorate.decoration.payDeposit', {
                url: '/payDeposit',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/payDeposit/payDeposit.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/payDeposit/payDeposit',
                controller: 'payDepositCtrl'
            })
            //缴纳押金结束
            //发放许可证开始
            .state('index.propertyService.staffHome.decorate.decoration.Alicence', {
                url: '/Alicence',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/Alicence/Alicence.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/Alicence/Alicence',
                controller: 'AlicenceCtrl'
            })
            //发放许可证结束
            //施工过程start
            .state('index.propertyService.staffHome.decorate.decoration.workProgress', {
                url: '/workProgress',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/workProgress/workProgress.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/workProgress/workProgress',
                controller: 'workProgressCtrl'
            })
            //施工过程end
            //验收开始
            .state('index.propertyService.staffHome.decorate.decoration.acceptance', {
                url: '/acceptance',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/acceptance/acceptance.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/acceptance/acceptance',
                controller: 'acceptanceCtrl'
            })
            //验收结束
            //费用结算开始
            .state('index.propertyService.staffHome.decorate.decoration.costClearing', {
                url: '/costClearing',
                templateUrl: 'main/propertyService/staffHome/decorate/decoration/costClearing/costClearing.html',
                controllerUrl: 'main/propertyService/staffHome/decorate/decoration/costClearing/costClearing',
                controller: 'costClearingCtrl'
            })
            //费用结算结束
            //办理装修end
            .state('index.propertyService.staffHome.decorate.history', {
                url: '/history',
                templateUrl: 'page/propertyService/staffHome/decorate/history/history.html',
                controllerUrl: 'page/propertyService/staffHome/decorate/history/history',
                controller: 'historyDecorateCtrl'
            })
            //装修end
            //车辆管理start
            .state('index.propertyService.staffHome.vehicleManagement', {
                url: '/vehicleManagement',
                templateUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagement.html',
                controllerUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagement',
                controller: 'vehicleManagementCtrl'
            })
            .state('index.propertyService.staffHome.vehicleManagement.vehicleManagementAdd', {
                url: '/vehicleManagementAdd',
                templateUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementAdd/vehicleManagementAdd.html',
                controllerUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementAdd/vehicleManagementAdd',
                controller: 'vehicleManagementAddCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            .state('index.propertyService.staffHome.vehicleManagement.vehicleManagementCheck', {
                url: '/vehicleManagementCheck',
                templateUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementCheck/vehicleManagementCheck.html',
                controllerUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementCheck/vehicleManagementCheck',
                controller: 'vehicleManagementCheckCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.vehicleManagement.vehicleManagementHistory', {
                url: '/vehicleManagementHistory',
                templateUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementHistory/vehicleManagementHistory.html',
                controllerUrl: 'main/propertyService/staffHome/vehicleManagement/vehicleManagementHistory/vehicleManagementHistory',
                controller: 'vehicleManagementHistoryCtrl'
            })
            //车辆管理end
            //停车卡start
            .state('index.propertyService.staffHome.parkingCard', {
                url: '/parkingCard',
                templateUrl: 'main/propertyService/staffHome/parkingCard/parkingCard.html',
                controllerUrl: 'main/propertyService/staffHome/parkingCard/parkingCard',
                controller: 'parkingCardCtrl'
            })
            .state('index.propertyService.staffHome.parkingCard.historyRecord', {
                url: '/historyRecord',
                templateUrl: 'main/propertyService/staffHome/parkingCard/historyRecord/historyRecord.html',
                controllerUrl: 'main/propertyService/staffHome/parkingCard/historyRecord/historyRecord',
                controller: 'historyRecordCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.parkingCard.newCard', {
                url: '/newCard',
                templateUrl: 'main/propertyService/staffHome/parkingCard/newCard/newCard.html',
                controllerUrl: 'main/propertyService/staffHome/parkingCard/newCard/newCard',
                controller: 'newCardCtrl',
                dependencies: ['services/PageServices']
            })
            //停车卡end
            //门禁卡start
            .state('index.propertyService.staffHome.entranceGuard', {
                url: '/entranceGuard',
                templateUrl: 'main/propertyService/staffHome/entranceGuard/entranceGuard.html',
                controllerUrl: 'main/propertyService/staffHome/entranceGuard/entranceGuard',
                controller: 'entranceGuardCtrl'
            })
            .state('index.propertyService.staffHome.entranceGuard.addEntranceGuard', {
                url: '/addEntranceGuard',
                templateUrl: 'main/propertyService/staffHome/entranceGuard/addEntranceGuard/addEntranceGuard.html',
                controllerUrl: 'main/propertyService/staffHome/entranceGuard/addEntranceGuard/addEntranceGuard',
                controller: 'addEntranceGuardCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.entranceGuard.checkEntranceGuard', {
                url: '/checkEntranceGuard',
                templateUrl: 'main/propertyService/staffHome/entranceGuard/checkEntranceGuard/checkEntranceGuard.html',
                controllerUrl: 'main/propertyService/staffHome/entranceGuard/checkEntranceGuard/checkEntranceGuard',
                controller: 'checkEntranceGuardCtrl',
                dependencies: ['services/PageServices']
            })
            //门禁卡end
            //产权变更start
            .state('index.propertyService.staffHome.changeTitle', {
                url: '/changeTitle',
                templateUrl: 'main/propertyService/staffHome/changeTitle/changeTitle.html',
                controllerUrl: 'main/propertyService/staffHome/changeTitle/changeTitle',
                controller: 'changeTitleCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.changeTitle.addHousingInformation', {
                url: '/addHousingInformation',
                templateUrl: 'main/propertyService/staffHome/changeTitle/addHousingInformation/addHousingInformation.html',
                controllerUrl: 'main/propertyService/staffHome/changeTitle/addHousingInformation/addHousingInformation',
                controller: 'addHousingInformationCtrl'
            })
            //产权变更end
            //宠物登记start
            .state('index.propertyService.staffHome.petRegistration', {
                url: '/petRegistration',
                templateUrl: 'main/propertyService/staffHome/petRegistration/petRegistration.html',
                controllerUrl: 'main/propertyService/staffHome/petRegistration/petRegistration',
                controller: 'petCtrl'
            })
            .state('index.propertyService.staffHome.petRegistration.history', {
                url: '/history',
                templateUrl: 'main/propertyService/staffHome/petRegistration/history/history.html',
                controllerUrl: 'main/propertyService/staffHome/petRegistration/history/history',
                controller: 'historyPetCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.petRegistration.newPet', {
                url: '/newPet',
                templateUrl: 'main/propertyService/staffHome/petRegistration/newPet/newPet.html',
                controllerUrl: 'main/propertyService/staffHome/petRegistration/newPet/newPet',
                controller: 'newPetCtrl'
            })
            //宠物登记end
            //租赁start
            .state('index.propertyService.staffHome.lease', {
                url: '/lease',
                templateUrl: 'main/propertyService/staffHome/lease/lease.html',
                controllerUrl: 'main/propertyService/staffHome/lease/lease',
                controller: 'leaseCtrl'
            })
            .state('index.propertyService.staffHome.lease.leaseAdd', {
                url: '/leaseAdd',
                templateUrl: 'main/propertyService/staffHome/lease/leaseAdd/leaseAdd.html',
                controllerUrl: 'main/propertyService/staffHome/lease/leaseAdd/leaseAdd',
                controller: 'leaseAddCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.lease.leaseHistory', {
                url: '/leaseHistory',
                templateUrl: 'main/propertyService/staffHome/lease/leaseHistory/leaseHistory.html',
                controllerUrl: 'main/propertyService/staffHome/lease/leaseHistory/leaseHistory',
                controller: 'leaseHistoryCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            //租赁end
            //放行条start
            .state('index.propertyService.staffHome.releasePass', {
                url: '/releasePass',
                templateUrl: 'main/propertyService/staffHome/releasePass/releasePass.html',
                controllerUrl: 'main/propertyService/staffHome/releasePass/releasePass',
                controller: 'releasePassCtrl'
            })
            .state('index.propertyService.staffHome.releasePass.addCompanyPass', {
                url: '/addCompanyPass',
                templateUrl: 'main/propertyService/staffHome/releasePass/addCompanyPass/addCompanyPass.html',
                controllerUrl: 'main/propertyService/staffHome/releasePass/addCompanyPass/addCompanyPass',
                controller: 'addCompanyPassCtrl'
            })
            .state('index.propertyService.staffHome.releasePass.addReleasePass', {
                url: '/addReleasePass',
                templateUrl: 'main/propertyService/staffHome/releasePass/addReleasePass/addReleasePass.html',
                controllerUrl: 'main/propertyService/staffHome/releasePass/addReleasePass/addReleasePass',
                controller: 'addReleasePassCtrl',
                dependencies: ['services/valueCheck']
            })
            .state('index.propertyService.staffHome.releasePass.historicRecords', {
                url: '/historicRecords',
                templateUrl: 'main/propertyService/staffHome/releasePass/historicRecords/historicRecords.html',
                controllerUrl: 'main/propertyService/staffHome/releasePass/historicRecords/historicRecords',
                controller: 'historicRecordsCtrl',
                dependencies: ['services/PageServices']
            })
            //放行条end
            //亲属关系绑定start
            .state('index.propertyService.staffHome.relationshipChain', {
                url: '/relationshipChain',
                templateUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChain.html',
                controllerUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChain',
                controller: 'relationshipChainCtrl'
            })
            .state('index.propertyService.staffHome.relationshipChain.relationshipChainAdd', {
                url: '/relationshipChainAdd',
                templateUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChainAdd/relationshipChainAdd.html',
                controllerUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChainAdd/relationshipChainAdd',
                controller: 'relationshipChainAddCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.propertyService.staffHome.relationshipChain.relationshipChainHistory', {
                url: '/relationshipChainHistory',
                templateUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChainHistory/relationshipChainHistory.html',
                controllerUrl: 'main/propertyService/staffHome/relationshipChain/relationshipChainHistory/relationshipChainHistory',
                controller: 'relationshipChainHistoryCtrl'
            })
            //亲属关系绑定end
            //银行托收办理start
            .state('index.propertyService.staffHome.bankCollection', {
                url: '/bankCollection',
                templateUrl: 'main/propertyService/staffHome/bankCollection/bankCollection.html',
                controllerUrl: 'main/propertyService/staffHome/bankCollection/bankCollection',
                controller: 'bankCollectionCtrl',
                dependencies: ['services/PageServices']
            })
            //银行托收办理end
            //账号管理start
            .state('index.propertyService.staffHome.accountManagement', {
                url: '/accountManagement',
                templateUrl: 'main/propertyService/staffHome/accountManagement/accountManagement.html',
                controllerUrl: 'main/propertyService/staffHome/accountManagement/accountManagement',
                controller: 'accountManagementCtrl',
                dependencies: ['services/PageServices']
            })
            //账号管理end
            //重点客户申请start
            .state('index.propertyService.staffHome.importantClients', {
                url: '/importantClients',
                templateUrl: 'main/propertyService/staffHome/importantClients/importantClients.html',
                controllerUrl: 'main/propertyService/staffHome/importantClients/importantClients',
                controller: 'importantClientsCtrl'
            })
            .state('index.propertyService.staffHome.importantClients.failRequest', {
                url: '/failRequest',
                templateUrl: 'main/propertyService/staffHome/importantClients/failRequest/failRequest.html',
                controllerUrl: 'main/propertyService/staffHome/importantClients/failRequest/failRequest',
                controller: 'failRequestCtrl'
            })
            .state('index.propertyService.staffHome.importantClients.request', {
                url: '/request',
                templateUrl: 'main/propertyService/staffHome/importantClients/request/request.html',
                controllerUrl: 'main/propertyService/staffHome/importantClients/request/request',
                controller: 'requestCtrl'
            })
            //重点客户申请end
            //VIP客户申请start
            .state('index.propertyService.staffHome.vipApplys', {
                url: '/vipApplys',
                templateUrl: 'main/propertyService/staffHome/vipApplys/vipApplys.html',
                controllerUrl: 'main/propertyService/staffHome/vipApplys/vipApplys',
                controller: 'vipApplysCtrl'
            })
            .state('index.propertyService.staffHome.vipApplys.vipFailRequest', {
                url: '/vipFailRequest',
                templateUrl: 'main/propertyService/staffHome/vipApplys/vipFailRequest/vipFailRequest.html',
                controllerUrl: 'main/propertyService/staffHome/vipApplys/vipFailRequest/vipFailRequest',
                controller: 'vipFailRequestCtrl'
            })
            .state('index.propertyService.staffHome.vipApplys.vipRequest', {
                url: '/vipRequest',
                templateUrl: 'main/propertyService/staffHome/vipApplys/vipRequest/vipRequest.html',
                controllerUrl: 'main/propertyService/staffHome/vipApplys/vipRequest/vipRequest',
                controller: 'vipRequestCtrl',
                dependencies: ['services/PageServices']
            })
            //VIP客户申请end
            //服务请求start
            .state('index.propertyService.staffHome.serviceRequestNew', {
                url: '/serviceRequestNew:cuIds',
                templateUrl: 'main/propertyService/staffHome/serviceRequestNew/serviceRequestNew.html',
                controllerUrl: 'main/propertyService/staffHome/serviceRequestNew/serviceRequestNew',
                controller: 'serviceRequestNewCtrl',
                dependencies: ['services/PageServices','services/valueCheck']
            })
            //服务请求end

    }]);
});
