// ===== Login ===== //
app.controller('loginController', ['$scope', '$location', 'authService', 'growl', function ($scope, $location, authService, growl) {
    $scope.loginData = {
        email: "",
        password: ""
    };
    $scope.message = "";
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
                growl.success("You have been logged in!");
                $location.path('/');
            },
            function (err) {
                $scope.message = err.error_description;
                growl.error("You have enterd a bad username or password.", {
                    title: 'Login Failure!'
                });
            });
    };
}]);
// ===== signup ===== //
/* app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', 'growl', function ($scope, $location, $timeout, authService, growl) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        email: "",
        password: ""
    };

    $scope.signUp = function () {
        authService.saveRegistration($scope.registration).then(function (response) {
                $scope.savedSuccessfully = true;
                growl.success("User Added! You will be redirected.");
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                growl.warning("The User was not added...");
                growl.warning(errors.join(' '));
                $scope.message = "Failed to register user due to:" + errors.join(' ');
            });
    };
    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2500);
    }
}]);
*/
app.controller('UserController', function ($scope, MedicationFactory, DoctorFactory, FamilyFactory, UserFactory, CompanyFactory, CCUFactory, ngProgressFactory, $timeout, growl) {
    function init() {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#64a0c6');
        $scope.progressbar.start();
        UserFactory.getUsers().success(function (data) {
            $scope.users = data.result;
        });
        $timeout(function () {
            $scope.progressbar.complete()
        }, 400);
    }
    init();
    //demos of progressbar interaction
    $scope.progress = function (type) {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#636363');
        $scope.progressbar.start();
        switch (type) {
        case "success":
            $timeout(function () {
                $scope.progressbar.setColor('#79c664');
            }, 800);
            $timeout(function () {
                $scope.progressbar.complete()
            }, 1000);
            $timeout(function () {
                growl.success("Changes Saved")
            }, 1500);
            break;
        case "err":
            $timeout(function () {
                $scope.progressbar.setColor('#cd4f4f');
            }, 800);
            $timeout(function () {
                growl.error("Error! Changes were not saved!", {
                    disableCloseButton: true,
                    disableCountDown: true,
                    ttl: -1
                })
            }, 3000);
            $timeout(function () {
                growl.error("You should refresh your browser window, all changes on this page will be lost. If the problem persists, please call technical support and tell them you have recieved <b>Error Number {err}</b> while saving changes on the <b>User Info Screen</b>", {
                    disableCloseButton: true,
                    disableCountDown: true,
                    ttl: -1
                })
            }, 3500);
            break;
        default:
            $timeout(function () {
                $scope.progressbar.setColor('#e8ba1a');
            }, 800);
            $timeout(function () {
                $scope.progressbar.setColor('#79c664');
            }, 19500);
            $timeout(function () {
                $scope.progressbar.complete()
            }, 20000);
            $timeout(function () {
                growl.warning("This seems to be taking a while...")
            }, 1500);
            $timeout(function () {
                growl.success("Changes have been saved!")
            }, 20000);
        }
    }
});
app.controller('NewUserController', ['$scope', '$routeParams', '$location', '$timeout', 'authService', 'growl', 'UserFactory', function ($scope, $routeParams, $location, $timeout, authService, growl, UserFactory) {
    $scope.savedSuccessfully = false;
    $scope.message = "not saved";

    // $scope.registration = {
    //     email: "",
    //     password: ""
    // };
    if($routeParams.id)  //  check if create or view employee
    {
      UserFactory.getUser($routeParams.id).success(function (data) {
        $scope.employee = data.result;
        if($scope.employee.family.length == 0){  // if no member in family
          $scope.employee.family = [{}];
        }
      });
    }
    else {
      $scope.employee = {};
      $scope.employee.family = [{}];
    }
    $scope.addMember = function (index) {  // add another family member
      console.log('add member');
      $scope.employee.family.push({});
    }

    $scope.wizardOptions = {
        onCompleted: function () {
          if($scope.employee._id)   // if id already exit update employee
          {
            console.log('updatePersonal');
            // personalJSON._id =  $scope.employee._id;
            // delete $scope.employee.family;
            UserFactory.updateUser($scope.employee).success(function (data) {
              console.log(data);
              $scope.employee = data.result;
              if($scope.employee.family.length == 0)
                $scope.employee.family = [{}];
            });
          }
          else{
            console.log('create');
            // delete $scope.employee.family;
            UserFactory.postUser($scope.employee).success(function (data) {
              console.log(data);
              $scope.employee = data.result;
              if($scope.employee.family.length == 0)
                $scope.employee.family = [{}];
            });
          }
            // authService.saveRegistration($scope.registration).then(function (response) {
            //         $scope.savedSuccessfully = true;
            //         growl.success("User Added! You will be redirected.");
            //         console.log("Done & Added");
            //         startTimer();
            //
            //     },
            //     function (response) {
            //         var errors = [];
            //         for (var key in response.data.modelState) {
            //             for (var i = 0; i < response.data.modelState[key].length; i++) {
            //                 errors.push(response.data.modelState[key][i]);
            //             }
            //         }
            //         growl.warning("The User was not added...");
            //         growl.warning(errors.join(' '));
            //         $scope.message = "Failed to register user due to:" + errors.join(' ');
            //     });
        }
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/');
        }, 1500);
    }
}]);
