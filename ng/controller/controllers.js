// ===== Dashboard ==== //
app.controller('DashController', function ($scope, ngProgressFactory, $timeout, authInterceptorService, $http) {
    $scope.getUser = function () {
        var req = {
            method: 'GET',
            url: 'http://io.bsicom.com:9561/requiresAuthentication',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        var token = authInterceptorService.request(req);
        $http(req).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});
//===== Company Info =====//
app.controller('CompanyController', function ($scope, ngProgressFactory, $timeout, CompanyFactory) {
    function init() {
        /* == Progress Bar Settings == */
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#7e7e7e');
        $scope.progressbar.start();
        //isolate this function//
        $timeout(function () {
            $scope.progressbar.complete()
        }, 400);
        /* == Factory Initialization == */
        CompanyFactory.getCompanys().success(function (data) {
            $scope.companys = data;
        });
    }
    init();
});


// delete this section and redesign //
app.controller('ScheduleController', function ($scope, ngProgressFactory, $timeout) {
    function init() {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#79c664');
        $scope.progressbar.start();
        $timeout(function () {
            $scope.progressbar.complete()
        }, 400);
    }
    init();
});
