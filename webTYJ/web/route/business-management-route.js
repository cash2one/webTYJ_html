/**
 * 业务管理route路由
 */

define(function (require) {
    var app = require('../app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            //业务管理start
            .state('index.businessManagement', {
                url: '/businessManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/index.html',
                        controllerUrl: 'main/businessManagement/businessManagement',
                        controller: 'businessManagementCtrl'
                    }
                }
            })
            //业务管理end
            //车辆管理start
            .state('index.businessManagement.allVehicles', {
                url: '/allVehicles',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/allVehicles/allVehicles.html',
                        controllerUrl: 'main/businessManagement/allVehicles/allVehicles',
                        controller: 'allVehiclesCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //车辆管理end
            //房屋初验start
            .state('index.businessManagement.housingManagement', {
                url: '/housingManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/housingManagement/housingManagement.html',
                        controllerUrl: 'main/businessManagement/housingManagement/housingManagement',
                        controller: 'housingManagementCtrl'
                    }
                }
            })
            .state('index.businessManagement.housingManagement.houseList', {
                url: '/houseList',
                templateUrl: 'main/businessManagement/housingManagement/houseList/houseList.html',
                controllerUrl: 'main/businessManagement/housingManagement/houseList/houseList',
                controller: 'houseListCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.housingManagement.houseNew', {
                url: '/houseNew',
                templateUrl: 'main/businessManagement/housingManagement/houseNew/houseNew.html',
                controllerUrl: 'main/businessManagement/housingManagement/houseNew/houseNew',
                controller: 'houseNewCtrl',
                dependencies: ['services/PageServices']
            })
            //房屋初验end
            //放行条查询start
            .state('index.businessManagement.allarticleRelease', {
                url: '/allarticleRelease',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/allarticleRelease/allarticleRelease.html',
                        controllerUrl: 'main/businessManagement/allarticleRelease/allarticleRelease',
                        controller: 'allReleaseCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //放行条查询end
            //门禁卡查询start
            .state('index.businessManagement.allentraceCard', {
                url: '/allentraceCard',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/allentraceCard/allentraceCard.html',
                        controllerUrl: 'main/businessManagement/allentraceCard/allentraceCard',
                        controller: 'allCardCtrl'
                    }
                }
            })
            //门禁卡查询end
            //租赁管理start
            .state('index.businessManagement.leaseManagement', {
                url: '/leaseManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/leaseManagement/leaseManagement.html',
                        controllerUrl: 'main/businessManagement/leaseManagement/leaseManagement',
                        controller: 'leaseManagementCtrl'
                    }
                }
            })
            .state('index.businessManagement.leaseManagement.leaseContractAdd', {
                url: '/leaseContractAdd',
                templateUrl: 'main/businessManagement/leaseManagement/leaseContractAdd/leaseContractAdd.html',
                controllerUrl: 'main/businessManagement/leaseManagement/leaseContractAdd/leaseContractAdd',
                controller: 'leaseContractAddCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.leaseManagement.leaseContractList', {
                url: '/leaseContractList',
                templateUrl: 'main/businessManagement/leaseManagement/leaseContractList/leaseContractList.html',
                controllerUrl: 'main/businessManagement/leaseManagement/leaseContractList/leaseContractList',
                controller: 'leaseContractListCtrl',
                dependencies: ['services/PageServices']
            })
            //租赁管理end
            //售后管理start
            .state('index.businessManagement.customerManagement', {
                url: '/customerManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/customerManagement/customerManagement.html',
                        controllerUrl: 'main/businessManagement/customerManagement/customerManagement',
                        controller: 'customerCtrl',
                        dependencies: ['services/PageServices','services/tyjUtil']
                    }
                }
            })
            //售后管理end
            //水表管理
            .state('index.businessManagement.newWaterMeterManagement', {
                url: '/newWaterMeterManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/newWaterMeterManagement/newWaterMeterManagement.html',
                        controllerUrl: 'main/businessManagement/newWaterMeterManagement/newWaterMeterManagement',
                        controller: 'newWaterMeterManagementCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.businessManagement.newWaterMeterManagement.meterReadingProgram', {
                url: '/meterReadingProgram',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/meterReadingProgram/meterReadingProgram.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/meterReadingProgram/meterReadingProgram',
                controller: 'meterReadingProgramCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.meteringResults', {
                url: '/meteringResults',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/meteringResults/meteringResults.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/meteringResults/meteringResults',
                controller: 'meteringResultsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.audit', {
                url: '/audit',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/audit/audit.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/audit/audit',
                controller: 'auditCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance', {
                url: '/waterMeterMaintenance',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance',
                controller: 'waterMeterMaintenanceCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance.listOfWaterMeter', {
                url: '/listOfWaterMeter',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/listOfWaterMeter.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/listOfWaterMeter',
                controller: 'listOfWaterMeterCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance.analysisOfWaterDamage', {
                url: '/analysisOfWaterDamage',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/analysisOfWaterDamage.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/analysisOfWaterDamage',
                controller: 'analysisOfWaterDamageCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance.logStatements', {
                url: '/logStatements',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/logStatements.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/logStatements',
                controller: 'logStatementsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance.meterReadingReport', {
                url: '/meterReadingReport',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/meterReadingReport.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/meterReadingReport',
                controller: 'meterReadingReportCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newWaterMeterManagement.waterMeterMaintenance.waterMeterDataReport', {
                url: '/waterMeterDataReport',
                templateUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/waterMeterDataReport.html',
                controllerUrl: 'main/businessManagement/newWaterMeterManagement/waterMeterMaintenance/waterMeterMaintenance/waterMeterDataReport',
                controller: 'waterMeterDataReportCtrl',
                dependencies: ['services/PageServices']
            })
            //水表管理end
            //电表管理start
            .state('index.businessManagement.newElectricMeterManagement',{
                url:'/newElectricMeterManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/newElectricMeterManagement/newElectricMeterManagement.html',
                        controllerUrl: 'main/businessManagement/newElectricMeterManagement/newElectricMeterManagement',
                        controller: 'newElectricMeterManagementCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance',{
                url: '/instrumentMaintenance',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/instrumentMaintenance.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/instrumentMaintenance',
                controller: 'instrumentMaintenanceCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance.electricalLossAnalysis',{
                url: '/electricalLossAnalysis',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricalLossAnalysis/electricalLossAnalysis.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricalLossAnalysis/electricalLossAnalysis',
                controller: 'electricalLossAnalysisCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance.electricMeterList',{
                url: '/electricMeterList',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList/electricMeterList.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/electricMeterList/electricMeterList',
                controller: 'electricMeterListCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance.metersStatements',{
                url: '/metersStatements',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/metersStatements/metersStatements.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/metersStatements/metersStatements',
                controller: 'metersStatementsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance.meterDataReport',{
                url: '/meterDataReport',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/meterDataReport/meterDataReport.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/meterDataReport/meterDataReport',
                controller: 'meterDataReportCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.instrumentMaintenance.meterLogStatements',{
                url: '/meterLogStatements',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/meterLogStatements/meterLogStatements.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/instrumentMaintenance/meterLogStatements/meterLogStatements',
                controller: 'meterLogStatementsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.electricMeterReadingProgram',{
                url: '/electricMeterReadingProgram',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterReadingProgram/electricMeterReadingProgram.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterReadingProgram/electricMeterReadingProgram',
                controller: 'electricMeterReadingProgramCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.electricMeterReadingResults',{
                url: '/electricMeterReadingResults',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterReadingResults/electricMeterReadingResults.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterReadingResults/electricMeterReadingResults',
                controller: 'electricMeterReadingResultsCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newElectricMeterManagement.electricMeterAudit',{
                url: '/electricMeterAudit',
                templateUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterAudit/electricMeterAudit.html',
                controllerUrl: 'main/businessManagement/newElectricMeterManagement/electricMeterAudit/electricMeterAudit',
                controller: 'electricMeterAuditCtrl',
                dependencies: ['services/PageServices']
            })
            //电表管理end
            //物业合同管理start
            .state('index.businessManagement.propertyManagementContract', {
                url: '/propertyManagementContract',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/propertyManagementContract/propertyManagementContract.html',
                        controllerUrl: 'main/businessManagement/propertyManagementContract/propertyManagementContract',
                        controller: 'propertyManagementContractCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            .state('index.businessManagement.propertyManagementContract.contractList',{
                url: '/contractList',
                templateUrl: 'main/businessManagement/propertyManagementContract/contractList/contractList.html',
                controllerUrl: 'main/businessManagement/propertyManagementContract/contractList/contractList',
                controller: 'contractListCtrl'
            })
            .state('index.businessManagement.propertyManagementContract.contractNew',{
                url: '/contractNew',
                templateUrl: 'main/businessManagement/propertyManagementContract/contractNew/contractNew.html',
                controllerUrl: 'main/businessManagement/propertyManagementContract/contractNew/contractNew',
                controller: 'contractNewCtrl'
            })
            //物业合同管理end
            //物业保险管理start
            .state('index.businessManagement.propertyInsuranceManagement', {
                url: '/propertyInsuranceManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/propertyInsuranceManagement/propertyInsuranceManagement.html',
                        controllerUrl: 'main/businessManagement/propertyInsuranceManagement/propertyInsuranceManagement',
                        controller: 'propertyInsuranceManagementCtrl'
                    }
                }
            })
            .state('index.businessManagement.propertyInsuranceManagement.insuranceList',{
                url: '/insuranceList',
                templateUrl: 'main/businessManagement/propertyInsuranceManagement/insuranceList/insuranceList.html',
                controllerUrl: 'main/businessManagement/propertyInsuranceManagement/insuranceList/insuranceList',
                controller: 'insuranceListCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.propertyInsuranceManagement.insuranceNew',{
                url: '/insuranceNew',
                templateUrl: 'main/businessManagement/propertyInsuranceManagement/insuranceNew/insuranceNew.html',
                controllerUrl: 'main/businessManagement/propertyInsuranceManagement/insuranceNew/insuranceNew',
                controller: 'insuranceNewCtrl',
                dependencies: ['services/PageServices']
            })
            //物业保险管理end
            //消息公告管理start
            .state('index.businessManagement.newsNoticeManagement', {
                url: '/newsNoticeManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/newsNoticeManagement/newsNoticeManagement.html',
                        controllerUrl: 'main/businessManagement/newsNoticeManagement/newsNoticeManagement',
                        controller: 'newsNoticeManagementCtrl'
                    }
                }
            })
            .state('index.businessManagement.newsNoticeManagement.internalNotice',{
                url: '/internalNotice',
                templateUrl: 'main/businessManagement/newsNoticeManagement/internalNotice/internalNotice.html',
                controllerUrl: 'main/businessManagement/newsNoticeManagement/internalNotice/internalNotice',
                controller: 'internalNoticeCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newsNoticeManagement.villageNotice',{
                url: '/villageNotice',
                templateUrl: 'main/businessManagement/newsNoticeManagement/villageNotice/villageNotice.html',
                controllerUrl: 'main/businessManagement/newsNoticeManagement/villageNotice/villageNotice',
                controller: 'villageNoticeCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.newsNoticeManagement.corporateNews',{
                url: '/corporateNews',
                templateUrl: 'main/businessManagement/newsNoticeManagement/corporateNews/corporateNews.html',
                controllerUrl: 'main/businessManagement/newsNoticeManagement/corporateNews/corporateNews',
                controller: 'corporateNewsCtrl',
                dependencies: ['services/PageServices']
            })
            //消息公告管理end
            //遗失物品start
            .state('index.businessManagement.lostArticles', {
                url: '/lostArticles',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/lostArticles/lostArticles.html',
                        controllerUrl: 'main/businessManagement/lostArticles/lostArticles',
                        controller: 'lostArticlesCtrl',
                        dependencies: ['services/PageServices']
                    }
                }
            })
            //遗失物品end
            //全部业务查询start
            .state('index.businessManagement.allProfessionInquiry', {
                url: '/allProfessionInquiry',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/allProfessionInquiry/allProfessionInquiry.html',
                        controllerUrl: 'main/businessManagement/allProfessionInquiry/allProfessionInquiry',
                        controller: 'allProfessionInquiryCtrl'
                    }
                }
            })
            .state('index.businessManagement.allProfessionInquiry.carsInquiry',{
                url: '/carsInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/carsInquiry/carsInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/carsInquiry/carsInquiry',
                controller: 'carsInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.allProfessionInquiry.entranceGuardCardInquiry',{
                url: '/entranceGuardCardInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/entranceGuardCardInquiry/entranceGuardCardInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/entranceGuardCardInquiry/entranceGuardCardInquiry',
                controller: 'entranceGuardCardInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.allProfessionInquiry.landlordLeaseInquiry',{
                url: '/landlordLeaseInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/landlordLeaseInquiry/landlordLeaseInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/landlordLeaseInquiry/landlordLeaseInquiry',
                controller: 'landlordLeaseInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.allProfessionInquiry.parkingCardInquiry',{
                url: '/parkingCardInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/parkingCardInquiry/parkingCardInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/parkingCardInquiry/parkingCardInquiry',
                controller: 'parkingCardInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.allProfessionInquiry.petsInquiry',{
                url: '/petsInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/petsInquiry/petsInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/petsInquiry/petsInquiry',
                controller: 'petsInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.allProfessionInquiry.releaseBarInquiry',{
                url: '/releaseBarInquiry',
                templateUrl: 'main/businessManagement/allProfessionInquiry/releaseBarInquiry/releaseBarInquiry.html',
                controllerUrl: 'main/businessManagement/allProfessionInquiry/releaseBarInquiry/releaseBarInquiry',
                controller: 'releaseBarInquiryCtrl',
                dependencies: ['services/PageServices']
            })
            //全部业务查询end
            //公众号管理start
            .state('index.businessManagement.publicNumberManagement', {
                url: '/publicNumberManagement',
                views: {
                    'main@index': {
                        templateUrl: 'main/businessManagement/publicNumberManagement/publicNumberManagement.html',
                        controllerUrl: 'main/businessManagement/publicNumberManagement/publicNumberManagement',
                        controller: 'publicNumberManagementCtrl'
                    }
                }
            })
            .state('index.businessManagement.publicNumberManagement.massInformation',{
                url: '/massInformation',
                templateUrl: 'main/businessManagement/publicNumberManagement/massInformation/massInformation.html',
                controllerUrl: 'main/businessManagement/publicNumberManagement/massInformation/massInformation',
                controller: 'massInformationCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.publicNumberManagement.informationManagement',{
                url: '/informationManagement',
                templateUrl: 'main/businessManagement/publicNumberManagement/informationManagement/informationManagement.html',
                controllerUrl: 'main/businessManagement/publicNumberManagement/informationManagement/informationManagement',
                controller: 'informationManagementCtrl',
                dependencies: ['services/PageServices']
            })
            .state('index.businessManagement.publicNumberManagement.addInformation',{
                url: '/addInformation',
                templateUrl: 'main/businessManagement/publicNumberManagement/addInformation/addInformation.html',
                controllerUrl: 'main/businessManagement/publicNumberManagement/addInformation/addInformation',
                controller: 'addInformationCtrl',
                dependencies: ['services/PageServices']
            })
            //公众号管理end
    }]);
});
