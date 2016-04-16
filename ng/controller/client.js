app.controller('ClientController', function ($scope, MedicationFactory, DoctorFactory, FamilyFactory, ClientFactory, CompanyFactory, CCUFactory, ngProgressFactory, $timeout, growl) {
    function init() {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#64a0c6');
        $scope.progressbar.start();
        CompanyFactory.getCompanys().success(function (data) {
            $scope.companys = data;
        });
        ClientFactory.getClients().success(function (data) {
            $scope.clients = data.result;
        });
        FamilyFactory.getFamilys().success(function (data) {
            $scope.familys = data;
        });
        DoctorFactory.getDoctors().success(function (data) {
            $scope.doctors = data;
        });
        MedicationFactory.getMedications().success(function (data) {
            $scope.medications = data;
        });
        CCUFactory.getCCUs().success(function (data) {
            $scope.CCUs = data;
            $scope.newCCU = function ($scope) {
                console.log("Firing newCCU");
                $scope.CCUs.push({
                    ccu_id: 7,
                    ccu_name: $scope.newCCU.name2,
                    ccu_address_street: $scope.newCCU.address_street,
                    ccu_address_street2: $scope.newCCU.address_street2,
                    ccu_address_city: $scope.newCCU.address_city,
                    ccu_address_state: $scope.newCCU.address_state,
                    ccu_address_zipcode: $scope.newCCU.address_zipcode,
                    ccu_phone: $scope.newCCU.phone,
                    ccu_contact: "null"
                })
                console.log("Fired newCCU");
            };
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
                growl.error("You should refresh your browser window, all changes on this page will be lost. If the problem persists, please call technical support and tell them you have recieved <b>Error Number {err}</b> while saving changes on the <b>Client Info Screen</b>", {
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
app.controller('ClientViewController', function ($scope,$routeParams, MedicationFactory, DoctorFactory, FamilyFactory, ClientFactory, CompanyFactory, CCUFactory, ngProgressFactory, $timeout, growl) {
    function init() {
        console.log($routeParams.id);
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#64a0c6');
        $scope.progressbar.start();
        if($routeParams.id)  //  check if create or view client
        {
          ClientFactory.getClient($routeParams.id).success(function (data) {
            $scope.client = data.result;
            if($scope.client.family.length == 0){  // if no member in family
              $scope.client.family = [{}];
            }
          });
        }
        else {
          $scope.client = {};
          $scope.client.family = [{}];
        }
        CCUFactory.getCCUs().success(function (data) {
            $scope.CCUs = data;
            $scope.newCCU = function ($scope) {
                console.log("Firing newCCU");
                $scope.CCUs.push({
                    ccu_id: 7,
                    ccu_name: $scope.newCCU.name2,
                    ccu_address_street: $scope.newCCU.address_street,
                    ccu_address_street2: $scope.newCCU.address_street2,
                    ccu_address_city: $scope.newCCU.address_city,
                    ccu_address_state: $scope.newCCU.address_state,
                    ccu_address_zipcode: $scope.newCCU.address_zipcode,
                    ccu_phone: $scope.newCCU.phone,
                    ccu_contact: "null"
                })
                console.log("Fired newCCU");
            };
        });
        $timeout(function () {
            $scope.progressbar.complete()
        }, 400);
    }
    init();
    $scope.savePersonal = function () {
      var personalJSON = {
          cli_fname: $scope.client.cli_fname,
          cli_mname: $scope.client.cli_mname,
          cli_lname: $scope.client.cli_lname,
          cli_prefname: $scope.client.cli_prefname,
          cli_dob: $scope.client.cli_dob,
          cli_sex: $scope.client.cli_sex,
          cli_ssn: $scope.client.cli_ssn,
          cli_address_street: $scope.client.cli_address_street,
          cli_address_street2: $scope.client.cli_address_street2,
          cli_address_city: $scope.client.cli_address_city,
          cli_address_state: $scope.client.cli_address_state,
          cli_address_zip: $scope.client.cli_address_zip,
          cli_phone1: $scope.client.cli_phone1,
          cli_phone2: $scope.client.cli_phone2,
          cli_ccu: $scope.client.cli_ccu,
          cli_startdate: $scope.client.cli_startdate,
          cli_ccu_caseworker: $scope.client.cli_ccu_caseworker,
          cli_photo: $scope.client.cli_photo,
          cli_paymethod: $scope.client.cli_paymethod,
          cli_status: $scope.client.cli_status,
          cli_livingarrangement: $scope.client.cli_livingarrangement,
          cli_notes: $scope.client.cli_notes
      }
      if($scope.client._id)   // if id already exit update client
      {
        console.log('updatePersonal');
        personalJSON._id =  $scope.client._id;
        ClientFactory.updateClient(personalJSON).success(function (data) {
          console.log(data);
        });
      }
      else{
        console.log('create');
        ClientFactory.postClient(personalJSON).success(function (data) {
          console.log(data);
          $scope.client = data.result;
          $scope.client.family = [{}];
        });
      }
    }
    $scope.saveMCO = function () {  //  Save MCO Data
      console.log('updateMCO');
      var mcoJSON = {
          _id: $scope.client._id,
          cli_mconame: $scope.client.cli_mconame,
          cli_mcoprocedurecodes: $scope.client.cli_mcoprocedurecodes,
          cli_medicaidnumber: $scope.client.cli_medicaidnumber,
          cli_mco_casemanager: $scope.client.cli_mco_casemanager,
          cli_mco_diagnosis: $scope.client.cli_mco_diagnosis,
          cli_mco_memberid: $scope.client.cli_mco_memberid,
          cli_mco_medicarenumber: $scope.client.cli_mco_medicarenumber,
          cli_mco_authnumber: $scope.client.cli_mco_authnumber,
          cli_mco_casemanagerphone: $scope.client.cli_mco_casemanagerphone,
          cli_mco_comments: $scope.client.cli_mco_comments
      }
      ClientFactory.updateClient(mcoJSON).success(function (data) {
          console.log(data);
      });
    }
    $scope.saveCP = function () {  //  Save Care Plan
      console.log('updateCP');
      var cpJSON = {
          _id: $scope.client._id,
          cli_cp_eating: $scope.client.cli_cp_eating,
          cli_cp_bathing: $scope.client.cli_cp_bathing,
          cli_cp_address1: $scope.client.cli_cp_address1,
          cli_cp_preparingmeal: $scope.client.cli_cp_preparingmeal,
          cli_cp_laundry: $scope.client.cli_cp_laundry,
          cli_cp_workphone: $scope.client.cli_cp_workphone
      }
      ClientFactory.updateClient(cpJSON).success(function (data) {
          console.log(data);
      });
    }
    $scope.saveSchedule = function () {  //  Save Care Plan
      console.log('update Schedule');
      var scheduleJSON = {
          _id: $scope.client._id,
          cli_sch_mondaystart: $scope.client.cli_sch_mondaystart,
          cli_sch_mondayend: $scope.client.cli_sch_mondayend,
          cli_sch_tuesdaystart: $scope.client.cli_sch_tuesdaystart,
          cli_sch_tuesdayend: $scope.client.cli_sch_tuesdayend,
          cli_sch_wednesdaystart: $scope.client.cli_sch_wednesdaystart,
          cli_sch_wednesdayend: $scope.client.cli_sch_wednesdayend,
          cli_sch_thursdaystart: $scope.client.cli_sch_thursdaystart,
          cli_sch_thursdayend: $scope.client.cli_sch_thursdayend,
          cli_sch_fridaystart: $scope.client.cli_sch_fridaystart,
          cli_sch_fridayend: $scope.client.cli_sch_fridayend,
          cli_sch_saturdaystart: $scope.client.cli_sch_saturdaystart,
          cli_sch_saturdayend: $scope.client.cli_sch_saturdayend,
          cli_sch_sundaystart: $scope.client.cli_sch_sundaystart,
          cli_sch_sundayend: $scope.client.cli_sch_sundayend,
          cli_sch_ccpunitsperday: $scope.client.cli_sch_ccpunitsperday,
          cli_sch_ccpdaysperweek: $scope.client.cli_sch_ccpdaysperweek,
          cli_sch_ccpunitsperweek: $scope.client.cli_sch_ccpunitsperweek,
          cli_sch_unitspermonth: $scope.client.cli_sch_unitspermonth,
          cli_sch_totalincome: $scope.client.cli_sch_totalincome,
          cli_sch_familysize: $scope.client.cli_sch_familysize,
          cli_sch_donscore: $scope.client.cli_sch_donscore,
          cli_sch_feeschedule: $scope.client.cli_sch_feeschedule,
          cli_sch_maximumcopay: $scope.client.cli_sch_maximumcopay,
          cli_sch_otherservicecost: $scope.client.cli_sch_otherservicecost
      }
      ClientFactory.updateClient(scheduleJSON).success(function (data) {
          console.log(data);
      });
    }
    $scope.saveEmergency = function () {  //  Save Care Plan
      console.log('update 911');
      var emergrencyJSON = {
          _id: $scope.client._id,
          cli_911_fname : $scope.client.cli_911_fname,
          cli_911_lname : $scope.client.cli_911_lname,
          cli_911_address1 : $scope.client.cli_911_address1,
          cli_911_company : $scope.client.cli_911_company,
          cli_911_department : $scope.client.cli_911_department,
          cli_911_workphone : $scope.client.cli_911_workphone
      }
      ClientFactory.updateClient(emergrencyJSON).success(function (data) {
          console.log(data);
      });
    }
    $scope.saveFamily = function (index) {
      console.log(index);
      var familyJSON = $scope.client.family[index];
      if($scope.client.family[index]._id)   // if id already exit update family
      {
        console.log('update Family');
        ClientFactory.updateClientFamily($scope.client._id,familyJSON).success(function (data) {
            console.log(data);
            $scope.progress('success');
        }).error(function(err){
          $scope.progress('err');
        });;
      }
      else{
        console.log('create Family');
        ClientFactory.postClientFamily($scope.client._id,familyJSON).success(function (data) {
          console.log(data);
          $scope.client.family[index] = data.result;
          $scope.progress('success');
        }).error(function(err){
          $scope.progress('err');
        });
      }
    }
    $scope.addMember = function (index) {  // add another family member
      $scope.client.family.push({});
    }
    $scope.revert = function () {  // revert all changes
      ClientFactory.getClient($routeParams.id).success(function (data) {
        $scope.client = data.result;
      });
    }
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
                growl.error("You should refresh your browser window, all changes on this page will be lost. If the problem persists, please call technical support and tell them you have recieved <b>Error Number {err}</b> while saving changes on the <b>Client Info Screen</b>", {
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
