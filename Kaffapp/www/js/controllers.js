
angular.module('starter.controllers', ['ionic', 'ionic-pullup'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
    // Form data for the login modal
    $scope.loginData = {};

    $scope.Registration = function () {
        $state.go("app.register");
    };
})


.controller('LoginCtrl', function ($scope, $timeout, $ionicModal, $rootScope, $state, $localStorage,
    $ionicPopup, $ionicSideMenuDelegate, $ionicNavBarDelegate) {
    $scope.loginData = {};
    var txtEmail;
    var txtPassword;

    $ionicNavBarDelegate.showBackButton(false);
    $ionicNavBarDelegate.showBar(false);
    $ionicSideMenuDelegate.canDragContent(false);

    // Check mewple login detail and redirect user directly to dashboard if user is registered
    $scope.RedirectRegisteredMewple = function () {
        if ($localStorage.MewRegDetail !== '' && typeof ($localStorage.MewRegDetail) !== 'undefined') {
            debugger
            var arrMewDetail = getMewDecDetail();

            if (NotNullOrEmpty(arrMewDetail[0]) && NotNullOrEmpty(arrMewDetail[1]) && NotNullOrEmpty(arrMewDetail[2]))
            {
                // Send user reg detail to server for logging and audit
                $localStorage.MewSessionDisplayName = arrMewDetail[1];

                $state.go("app.dashboard");
            }            
        }

        var codePushUpdateDialog = {
            updateTitle: "New update available!",
            optionalIgnoreButtonLabel: "Nope..",
            optionalinstallButtonLabel: "Yep.."
        }
        debugger
        //console.log(codePush.checkForUpdate());
        //codePush.sync(null, { updateDialog: codePushUpdateDialog });
        codePush.sync({ updateDialog: codePushUpdateDialog });
        codePush.checkForUpdate(codePushSuccessupdate(), codePushErrorupdate(), "DFpfKmHk6yh2AQx_3d462HHtG0KWEkw9wOV4z");
    };

    

    function codePushSuccessupdate()
    {
        //alert("CodePush Success");
        var SuccessLoginPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'OK'
        });
    };

    function codePushErrorupdate() {
        //alert("CodePush Error");
        var SuccessLoginPopup = $ionicPopup.alert({
            title: 'Failed',
            template: 'Error'
        });
    };

    $scope.doLogin = function () {
        txtEmail = $scope.loginData.username;
        txtPassword = $scope.loginData.password;

        var codePushUpdateDialog = {
            updateTitle: "New update available!",
            optionalIgnoreButtonLabel: "Nope..",
            optionalinstallButtonLabel: "Yep.."
        }
        debugger
        
        // Silent mode: Pass in 0 param to code-push app without user concious
        //codePush.sync();
        // Active mode: Ask user permission to update the app
        //codePush.sync(null, { updateDialog: codePushUpdateDialog, installMode: InstallMode.IMMEDIATE });
        
        // 
        //codePush.checkForUpdate(codePushSuccessupdate(), codePushErrorupdate(), "DFpfKmHk6yh2AQx_3d462HHtG0KWEkw9wOV4z");

        if (KSJSValidator.NotNullOrEmpty(txtEmail) && KSJSValidator.NotNullOrEmpty(txtPassword)) {
            // Check if user exist
            // if user exists, construct $localStorage.MewRegDetail
            var blnExist = true;
            debugger
            if (blnExist) {
                // Get user reg detail
                var MewDetail = $localStorage.MewRegDetail;

                if (KSJSValidator.NotNullOrEmpty(MewDetail)) {
                    var mewUser = getMewDecDetail();

                    if (mewUser[0] == txtEmail && mewUser[2] == txtPassword) {
                        // Send user reg detail to server for logging and audit if device is online. Else, store audit data to
                        // localstorage
                        //if (window.Connection) {
                        //    if (navigator.connection.type !== Connection.NONE) {

                        //    }
                        //}
                        $localStorage.MewSessionDisplayName = mewUser[1];

                        $state.go("app.dashboard");
                    }
                    else { // Mew e-mail and password not match
                        var WrongLoginPopup = $ionicPopup.alert({
                            title: 'Mewple Not Valid',
                            template: 'Something wrong with your login detail. Please try again. '
                        });
                    }
                }
                    // If localstorage detail is null or undefined
                else {
                    var LocalstorageErrorPopup = $ionicPopup.alert({
                        title: 'Application Error',
                        template: 'Something wrong with the device storage. Please close the app and login again.'
                    });
                }
            }
            else {
                // If user e-mail is not found
                //var unknownUserPopup = $ionicPopup.alert({
                //    title: 'Who are you?',
                //    template: 'We can\'t find your existence in Mewple world. Please try again. '
                //});
            }
        }
        else {
            var LoginMissingPopup = $ionicPopup.alert({
                title: 'No Login Info',
                template: 'Please make sure all fields are filled in, mew!'
            });
        }
    };

    /* Navigation Function - Start */
    $scope.Registration = function () {
        //$state.go("app.dashboard");
        $state.go("app.register");
    };

    $scope.GuestLogin = function () {
        debugger
        $scope.modal.hide();
        $state.go("app.dashboard");
    };
    /* Navigation Function - End */

    /* Modal Function - Start */
    $ionicModal.fromTemplateUrl('guestlogin.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) { $scope.modal = modal; });
    /* Modal Function - End */
    
    /* Private Function - Start */
    function getMewDecDetail() {
        var decMewDetail = CryptoJS.AES.decrypt($localStorage.MewRegDetail, $rootScope.aesValidateFace).toString(CryptoJS.enc.Utf8);
        var arrMewDetail = decMewDetail.split($rootScope.normalMewSeparator);

        return arrMewDetail;
    }
    /* Navigation Function - End */
})

.controller('RegisterCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup, $rootScope, $state, $localStorage) {
    $scope.registerData = {};    

    var txtEmail;
    var txtPassword;
    var txtDisplayName;    

    $scope.RegisterMewple = function () {        
        if ($scope.registerData.email !== '' && $scope.registerData.password !== '' &&
            $scope.registerData.displayname !== '') {
            //validateEmail($scope.registerData.email)KSValidateEmail
            //validatePassword($scope.registerData.password)
            if (KSJSValidator.KSValidateEmail($scope.registerData.email)) {
                if (KSJSValidator.KSValidateNormalStrictPassword($scope.registerData.password)) {
                    // Check if e-mail & display name existed. Register on the server

                    // Pass the token key and concat symbol to app js
                    var encEmailData = $scope.registerData.email;
                    var encPasswordData = $scope.registerData.password;
                    var encDisplayNameData = $scope.registerData.displayname;
                    
                    // Use other enc method
                    //var strEncRegData = CryptoJS.AES.encrypt(encEmailData + $rootScope.normalMewSeparator + encDisplayNameData +
                    //    $rootScope.normalMewSeparator + encPasswordData, $rootScope.aesValidateFace);
                    var strEncRegData = KSJSCrypto.KSAESEncrypt(encEmailData + $rootScope.normalMewSeparator + encDisplayNameData +
                       $rootScope.normalMewSeparator + encPasswordData, $rootScope.aesValidateFace);

                    // Store into localstorage
                    $localStorage.MewRegDetail = strEncRegData;

                    var successRegPopup = $ionicPopup.alert({
                        title: 'Registration Completed!',
                        template: 'Congratulation! You are now a Mewple! Let\'s begin our adventure!'
                    });

                    successRegPopup.then(function (res) {
                        $state.go("app.dashboard");
                        //$state.go("app.login");
                    });
                }
                    // if password format invalid
                else {
                    var PasswordInvalidPopup = $ionicPopup.alert({
                        title: 'Password is not valid',
                        template: 'Password must be the following:\n- 7 to 20 characters\n'
                    });
                }

            }
                // if e-mail format invalid
            else {
                var EmailInvalidPopup = $ionicPopup.alert({
                    title: 'E-mail is not valid',
                    template: 'E-mail format is not acceptable. Acceptable format: mew@hotmail.com'
                });
            }
        }
        else {
            var displayPopup = $ionicPopup.alert({
                title: 'Registration Error',
                template: 'Please key in all fields details, mew!'
            });
        }
    }
    
    /* Modal Function - Start */
    $ionicModal.fromTemplateUrl('guestlogin.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) { $scope.modal = modal; });
    /* Modal Function - Start */

    /* Navigation Function - Start */
    $scope.BackLoginPage = function () {
        txtEmail = $scope.registerData.email;
        txtPassword = $scope.registerData.password;
        txtDisplayName = $scope.registerData.displayname;

        if ((txtEmail !== '' && typeof (txtEmail) !== 'undefined') ||
            (txtPassword !== '' && typeof (txtPassword) !== 'undefined') ||
            (txtPassword !== '' && typeof (txtPassword) !== 'undefined')) {
            var confirmLeaving = $ionicPopup.confirm({
                title: 'Back to Login',
                template: 'Try to login again?'
            })

            confirmLeaving.then(function (res) {
                if (res) {
                    $state.go("app.login");
                }
            })
        }
        else if ((txtEmail === '' || typeof (txtEmail) === 'undefined') &&
            (txtPassword === '' || typeof (txtPassword) === 'undefined') &&
            (txtDisplayName === '' || typeof (txtDisplayName) === 'undefined')) {
            $state.go("app.login");
        }
    }

    $scope.GuestLogin = function () {
        debugger
        //$ionicModal.fromTemplateUrl('modal.html', {
        //    scope: $scope,
        //    animation: 'slide-in-up'
        //}).then(function (modal) { $scope.modal = modal; });
        $scope.modal.hide();

        $state.go("app.dashboard");
    };
    /* Navigation Function - End */

    /* Private Function - Start */
    $scope.ToggleDisplayPwMode = function () {
        console.log($scope.registerData);
        console.log($scope.registerData.password);

        var toggleDisplayPw = $('#icnDisplayPw');

        console.log(toggleDisplayPw);
        if (toggleDisplayPw.hasClass("active")) {
            toggleDisplayPw.removeClass("active");
            $("#txtPassword").prop("type", "password");
            $("#icnDisplayPw").prop("style", "color: inherit");
            return;
        }
        else {
            toggleDisplayPw.addClass("active");

            $("#txtPassword").prop("type", "text");
            $("#icnDisplayPw").prop("style", "color: #4F8EF7");
            return;
        }
    };
    /* Private Function - End */
})

.controller('DashboardCtrl', function ($scope, $http, $state, $ionicNavBarDelegate, $ionicSideMenuDelegate) {
    // Zomato keys: 22df009baabd4fd3204b1ddfabb0ad70
    //$ionicNavBarDelegate.showBackButton(false);
    $ionicNavBarDelegate.showBackButton(false);
    $ionicNavBarDelegate.showBar(true);
    $ionicSideMenuDelegate.canDragContent(true);

    $scope.FindCafe = function () {
        debugger
        $state.go('app.nearcafe');
    };
})

.controller('CafeInfoCtrl', function ($scope, $http, $localStorage, $rootScope) {
    $scope.CafeInfo = [];
    
    $scope.DisplayCafeInfo = function () {
        var CafeID = $rootScope.DisplayCafeID;
        debugger
        if (CafeID != '' && typeof (CafeID) != 'undefined' && typeof ($localStorage.AllCafe) != 'undefined') {
            var result = $.grep($localStorage.AllCafe, function (e) { return e.restaurant.id == CafeID; });

            $scope.CafeInfo = result[0];
        }
    }

    $scope.DisplayCafeInfo();
})

.controller('NearCafeCtrl', function ($scope, $http, $state, $localStorage, $rootScope,
    ConstructAllCafeList) {
    $scope.items = [];
    $scope.UserPreferDisplayData = [];    

    $scope.DisplayCafeInfo = function (CafeIDParam) {
        if (CafeIDParam != '' && typeof (CafeIDParam) != 'undefined') {
            $rootScope.DisplayCafeID = CafeIDParam;
            $state.go("app.cafeinfo");
        }
        //, GetCafelistAPI, position
    }	   
    
    $scope.GetNearCafe = function () {
        debugger
        var arrFullCafeList;

        $scope.items = ConstructAllCafeList.GetFullListCafe($scope.items);
       
        var displaySettings = [
           {
               "ShowCuisine": true,
               "ShowLocation": true,
               "ShowCost": true,
               "ShowMenuAvailable": true,
               "ShowRating": false,
               "ShowOpenOnly": false,
               "ShowAverageCostFor2": false,
               "ShowBookingAvailable": false,
               "ShowOnlineDelivery": false
           }
        ];
        
        $scope.UserPreferDisplayData = displaySettings;

        $scope.$broadcast('scroll.infiniteScrollComplete');
    };    

    $scope.GetMoreNearCafe = function () {
        debugger
        $scope.NoMoreNearCafe = false;

        var totalDataReturn;
        var totalDisplayedLength = ($scope.items.length) + 1;
        
        $scope.items = ConstructAllCafeList.GetFullListCafe($scope.items);
        //console.log($scope.items);

        totalDataReturn = 200;     

        if ($scope.items.length == totalDataReturn) {
            $scope.NoMoreNearCafe = true;
        }
        
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.$on('$stateChangeSuccess', function () {
        $scope.GetNearCafe();
    });

    // KIV
    //var GreatCircle = {
    //    validateRadius: function (unit) {
    //        var r = { 'KM': 6371.009, 'MI': 3958.761, 'NM': 3440.070, 'YD': 6967420, 'FT': 20902260 };
    //        if (unit in r) return r[unit];
    //        else return unit;
    //    },
    //    distance: function (lat1, lon1, lat2, lon2, unit) {
    //        //console.log(arguments)
    //        if (unit === undefined) unit = 'KM';
    //        var r = this.validateRadius(unit);
    //        lat1 *= Math.PI / 180;
    //        lon1 *= Math.PI / 180;
    //        lat2 *= Math.PI / 180;
    //        lon2 *= Math.PI / 180;
    //        var lonDelta = lon2 - lon1;
    //        var a = Math.pow(Math.cos(lat2) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta), 2);
    //        var b = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
    //        var angle = Math.atan2(Math.sqrt(a), b);
    //        return angle * r;
    //    },
    //    bearing: function (lat1, lon1, lat2, lon2) {
    //        lat1 *= Math.PI / 180;
    //        lon1 *= Math.PI / 180;
    //        lat2 *= Math.PI / 180;
    //        lon2 *= Math.PI / 180;
    //        var lonDelta = lon2 - lon1;
    //        var y = Math.sin(lonDelta) * Math.cos(lat2);
    //        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
    //        var brng = Math.atan2(y, x);
    //        brng = brng * (180 / Math.PI);
    //        if (brng < 0) { brng += 360; }
    //        return brng;
    //    },
    //    destination: function (lat1, lon1, brng, dt, unit) {
    //        if (unit === undefined) unit = 'KM';
    //        var r = this.validateRadius(unit);
    //        lat1 *= Math.PI / 180;
    //        lon1 *= Math.PI / 180;
    //        var lat3 = Math.asin(Math.sin(lat1) * Math.cos(dt / r) + Math.cos(lat1) * Math.sin(dt / r) * Math.cos(brng * Math.PI / 180));
    //        var lon3 = lon1 + Math.atan2(Math.sin(brng * Math.PI / 180) * Math.sin(dt / r) * Math.cos(lat1), Math.cos(dt / r) - Math.sin(lat1) * Math.sin(lat3));
    //        return {
    //            'LAT': lat3 * 180 / Math.PI,
    //            'LON': lon3 * 180 / Math.PI
    //        };
    //    }
    //};
})

/* Service - Start */
angular.module('starter.controllers').factory('GetCafelistAPI', function ($http, $q, $localStorage, position) {
    var arrCafeList = [];
    var promises = [];
    var postData1 = []; var postData2 = [];

    $localStorage.AllCafe = [];

    var postDataKL = JSON.stringify({
        "entity_id": "88",
        "entity_type": "city",
        "count": "50",        
        "cuisines": "30",
        "lat": position.latitude,
        "lon": position.longitude
    });
    var postDataPJ = JSON.stringify({
        "entity_id": "11080",
        "entity_type": "city",
        "count": "50",
        "cuisines": "30",
        "lat": position.latitude,
        "lon": position.longitude
    });
    //?entity_id=88&entity_type=city&count=100&cuisines=30&lat=3.124204&lon=101.684746
    var requests = [{
        url: 'https://developers.zomato.com/api/v2.1/search',
        postData: postDataKL
    }, {
        url: 'https://developers.zomato.com/api/v2.1/search?',
        postData: postDataPJ
    }];

    function resolveData(data) {       
        if (arrCafeList.length === 0) {
            arrCafeList = data.data;
        } else {
            arrCafeList = arrCafeList.concat(data.data);
        }
    }
    function executeRequest(req) {
       
        var promise = $http({
            url: req.url,
            method: 'GET',
            headers: { 'user-key': '22df009baabd4fd3204b1ddfabb0ad70' },
            data: req.postData
        })
          .then(function (data) {              
              arrCafeList = arrCafeList.concat(data.data.restaurants);              
          });

        promises.push(promise);
    }
    angular.forEach(requests, function (req) {        
        executeRequest(req);
    })    

    return {
        getAPIData: function () {            
            return $q.all(promises).then(function () {            
                return arrCafeList;
            });
        }
    };
});

angular.module('starter.controllers').factory('ConstructAllCafeList', function ($rootScope, $localStorage) {
    //$scope.position = position;

    /* Private Function - Start */
    function SortNearestCafe(CafeArray1, CafeArray2) {
        return CafeArray1.restaurant.distance - CafeArray2.restaurant.distance;
    };

    function addDistanceToList(arr) {
        if (arr.restaurant != null || typeof (arr.restaurant) != 'undefined') {
            var listlat;
            var listlon;
            var distanceCount;
            var distanceDisplay;
            for (var i = 0; i <= arr.length; i++) {
                listlon = arr[i].restaurant.location.longitude;
                listlat = arr[i].restaurant.location.latitude;

                distanceCount = GreatCircle.distance(listlon, listlat, position.longitude, position.latitude, 'KM');

                if (Math.round(distanceCount) < 0) {
                    distanceDisplay = distanceCount.toFixed(3) + " m";
                }
                else {
                    distanceDisplay = distanceCount.toFixed(1) + " km";
                }

                arr[i].restaurant.distance = distanceCount;
                arr[i].restaurant.distanceDisplay = distanceDisplay; // Convert to KM
            }
        }

        return arr;
    }

    function removeArrayDup(arr) {
        if (arr.restaurant != null || typeof (arr.restaurant) != 'undefined') {
            var i, j, cur, found;
            for (i = arr.length - 1; i >= 0; i--) {
                cur = arr[i].restaurant.name;
                found = false;
                for (j = i - 1; !found && j >= 0; j--) {
                    if (cur === arr[j].restaurant.name) {
                        if (i !== j) {
                            arr.splice(i, 1);
                        }
                        found = true;
                    }
                }

                if (arr[i].restaurant.thumb == '') {
                    arr[i].restaurant.thumb = 'img/mochakittycafe_bann3.jpg';
                }
            }
        }

        return arr;
    };
    /* Private Function - End */

    /* Testing Function - Start */
    function LoadMoreCafeListing() {
        var arrCafeList = [
            {
                "results_found": 99,
                "results_start": 0,
                "results_shown": 1,
                "restaurants": [
                  {
                      "restaurant":
                          { "thumb": "../img/mochakittycafe_bann3.jpg", "name": "Cafe 99", "cuisines": "type" }
                  }
                ]
            }
        ];

        return arrCafeList.restaurants;
    }
    function BindCafeBasicDisplayInfo() {
        // Get user selected options from Preference to determine what to show
        debugger
        var displaySettings = [
            {
                "ShowCuisine": 1,
                "ShowLocation": 1,
                "ShowCost": 1,
                "ShowMenuAvailable": 1,
                "ShowRating": 0,
                "ShowOpenOnly": 0,
                "ShowAverageCostFor2": 0,
                "ShowBookingAvailable": 0,
                "ShowOnlineDelivery": 0
            }
        ];
        $scope.UserPreferDisplayData = displaySettings;
    }
    /* Testing Function - End */

    return {
        GetFullListCafe: function (Cafe) {
            var arrayCafe = $localStorage.AllCafe;
            var objCafeList = [];
            debugger
            //KSJSValidator.NotNullOrEmpty(arrayCafe)
            //(arrayCafe.length == 0 || typeof(arrayCafe) === 'undefined')
            if (KSJSValidator.NotNullOrEmpty(arrayCafe)) {
                GetCafelistAPI.getAPIData().then(function (item) {
                    objCafeList = item;
                    objCafeList = removeArrayDup($scope.items);

                    objCafeList = addDistanceToList($scope.items);

                    objCafeList.sort(SortNearestCafe);
                });
            }
            else {
                objCafeList = arrayCafe;
            }

            if (KSJSValidator.NotNullOrEmpty(Cafe)) {
                Cafe = objCafeList;
            }
            else {

            }

            $localStorage.AllCafe = Cafe;

            return Cafe;
        }
    }
});

angular.module('starter.controllers').factory('position', function ($rootScope) {
    var position = {};

    // 1ST / AUTO GEOLOCATION OF USER 
    // displays a popup to indicate current user location - (disabled)
    // onSuccess Callback - This method accepts a Position object, which contains the current GPS coordinates
    var onSuccess = function (position2) {
        console.log(position2.coords.latitude)
        console.log(position2.coords.longitude)

        position.latitude = position2.coords.latitude;
        position.longitude = position2.coords.longitude;

        $rootScope.$digest();
    };

    function onError(error) { // onError Callback receives a PositionError object
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    return position;
});
/* Service - End */