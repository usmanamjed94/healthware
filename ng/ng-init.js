// ============ Declare Application =========== //
var app = angular.module('HomeCare', ['ngRoute', 'LocalStorageModule', 'ngAnimate', 'ngProgress', 'angular-growl', 'ByGiro.wizard']);
// ============ Growl Provider  =============== //
app.config(['growlProvider',
    function (growlProvider) {
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalTimeToLive({
            success: 3000,
            error: 10000,
            warning: 10000,
            info: 10000
        });
    }
]);
// ============ Route Providers =============== //
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'DashController',
        templateUrl: './ng/views/dash.html'
    }).when('/login', {
        controller: 'loginController',
        templateUrl: './ng/views/login.html'
    }).when('/wlogout', {
        controller: 'logoutController',
        templateUrl: './ng/views/login.html'
    }).when('/signup', {
        templateUrl: './error/404.html'
    })

    /* ================= Client Section ================= */
    .when('/new_client', {
            controller: 'ClientViewController',
            templateUrl: './ng/views/client/client_view.html'
        }).when('/client_list', {
            controller: 'ClientController',
            templateUrl: './ng/views/client/client_list.html'
        }).when('/client_view/:id', {
            controller: 'ClientViewController',
            templateUrl: './ng/views/client/client_view.html'
        }).when('/ccuadd', {
            controller: 'ClientController',
            templateUrl: './views/ccuadd.html'
        })
        /* ================ Schedule Section ================ */
        .when('/schedule_daily', {
            controller: 'ScheduleController',
            templateUrl: './ng/views/schedule/schedule_daily.html'
        }).when('/schedule_weekly', {
            controller: 'ScheduleController',
            templateUrl: './ng/views/schedule/schedule_weekly.html'
        }).when('/schedule_router', {
            controller: 'ScheduleController',
            templateUrl: './ng/views/schedule/schedule_router.html'
        }).when('/schedule_router_daily', {
            controller: 'ScheduleController',
            templateUrl: './ng/views/schedule/schedule_router_daily.html'
        })
        /* ================== Misc Section ================== */
        .when('/about', {
            templateUrl: './ng/views/misc/about.html'
        }).when('/help', {
            templateUrl: './ng/views/misc/help.html'
        }).when('/myaccount', {
            templateUrl: './ng/views/misc/myaccount.html'
        })
        /* ============== Administration Section ============== */
        .when('/mycompany', {
            controller: 'CompanyController',
            templateUrl: './ng/views/administration/mycompany.html'
        })
        // User System //
        .when('/user_list', {
            controller: 'UserController',
            templateUrl: './ng/views/administration/user_list.html'
        }).when('/new_user', {
            controller: 'NewUserController',
            templateUrl: './ng/views/administration/users_new.html'
        }).when('/user_view/:id', {
            controller: 'NewUserController',
            templateUrl: './ng/views/administration/users_new.html'
        })
});
//CONTROLLERS IN /CONTROLLERS

// ============ Factories ===================== //
app.factory('ClientFactory', function ($http) {
    var factory = {};
    var serviceBase = 'http://127.0.0.1:9561/';
    factory.getClients = function () {
        return $http.get(serviceBase + 'client');
    };
    factory.getClient = function (cli_id) {
      console.log(cli_id);
        return  $http.get(serviceBase + 'client/' + cli_id);
    };
    factory.postClient = function (clientJSON) {
      console.log(clientJSON);
        return  $http.post(serviceBase + 'client',clientJSON);
    };
    factory.updateClient = function (clientJSON) {
      console.log(clientJSON);
        return  $http.put(serviceBase + 'client/' + clientJSON._id,clientJSON);
    };
    factory.postClientFamily = function (cli_id,familyJSON) {
      console.log(familyJSON);
        return  $http.post(serviceBase + 'client/' + cli_id +'/family',familyJSON);
    };
    factory.updateClientFamily = function (cli_id,familyJSON) {
      console.log(familyJSON);
        return  $http.put(serviceBase + 'client/' + cli_id +'/family/' + familyJSON._id,familyJSON);
    };
    return factory;
});
app.factory('UserFactory', function ($http) {
    var factory = {};
    var serviceBase = 'http://127.0.0.1:9561/';
    factory.getUsers = function () {
        return $http.get(serviceBase + 'user');
    };
    factory.getUser = function (usr_id) {
      console.log(usr_id);
        return  $http.get(serviceBase + 'user/' + usr_id);
    };
    factory.postUser = function (userJSON) {
      console.log(userJSON);
        return  $http.post(serviceBase + 'user',userJSON);
    };
    factory.updateUser = function (userJSON) {
      console.log(userJSON);
        return  $http.put(serviceBase + 'user/' + userJSON._id,userJSON);
    };
    factory.postUserFamily = function (usr_id,familyJSON) {
      console.log(familyJSON);
        return  $http.post(serviceBase + 'user/' + usr_id +'/family',familyJSON);
    };
    factory.updateUserFamily = function (usr_id,familyJSON) {
      console.log(familyJSON);
        return  $http.put(serviceBase + 'user/' + usr_id +'/family/' + familyJSON._id,familyJSON);
    };
    return factory;
});
app.factory('CompanyFactory', function ($http) {
    var factory = {};
    factory.getCompanys = function () {
        return $http.get('./ng/api/dummy/company.json');
    };
    return factory;
});
app.factory('FamilyFactory', function ($http) {
    var factory = {};
    factory.getFamilys = function () {
        return $http.get('./ng/api/dummy/family.json');
    };
    return factory;
});
app.factory('DoctorFactory', function ($http) {
    var factory = {};
    factory.getDoctors = function () {
        return $http.get('./ng/api/dummy/doctors.json');
    };
    return factory;
});
app.factory('MedicationFactory', function ($http) {
    var factory = {};
    factory.getMedications = function () {
        return $http.get('./ng/api/dummy/medication.json');
    };
    return factory;
});
app.factory('CCUFactory', function ($http) {
    var factory = {};
    factory.getCCUs = function () {
        return $http.get('./ng/api/dummy/ccu.json');
    };
    return factory;
});
