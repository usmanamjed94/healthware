'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    // var serviceBase = 'http://io.bsicom.com:9561/';
    var serviceBase = 'http://127.0.0.1:9561/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        email: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'createUser', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {
        var data = "email=" + loginData.email + "&password=" + loginData.password;
        var req = {
            method: 'POST',
            url: serviceBase + 'login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }

        var deferred = $q.defer();

        $http(req).success(function (response) {
            localStorageService.set('authorizationData', {
                token: response.data.token,
                email: loginData.email
            });

            _authentication.isAuth = true;
            _authentication.email = loginData.email;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.email = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.email = authData.email;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);
