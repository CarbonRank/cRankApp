app.controller('RegisterCtrl', function($scope, $http, $state, UserService) {
    var user;
    $scope.init = function() {
        user = UserService.getUser();
        $http({
            method: 'GET',
            url: '/api/vehicle/year',
        }).success(function (result) {
            $scope.vehicleYearSelection = result.results;
        });
        console.log(user);
    }
    	

	$scope.getMake = function () {
		$http({
        	method: 'GET',
        	url: '/api/vehicle/make?year=' + $scope.vehicleYear,
		}).success(function (result) {
    		$scope.vehicleMakeSelection = result.results;
		});
	}

	$scope.getModel = function () {
		$http({
        	method: 'GET',
        	url: '/api/vehicle/model?year=' + $scope.vehicleYear + '&make=' + $scope.vehicleMake,
		}).success(function (result) {
    		$scope.vehicleModelSelection = result.results;
		});
	}

    $scope.getSpecific = function () {
        $http({
            method: 'GET',
            url: '/api/vehicle/options?year=' + $scope.vehicleYear + '&make=' + $scope.vehicleMake + '&model=' + $scope.vehicleModel,
        }).success(function (result) {
            $scope.vehicleSpecificSelection = result.results;
        });
    }

    $scope.getVehicleId = function () {
        UserService.setUserVehicleId($scope.vehicleSpecific.vehicleid);
    }

     $scope.sendUserData = function(){
        console.log("FINAL: ", UserService.getUser());
        $http({
            method: 'POST',
            url: '/api/user',
            data: UserService.getUser()
        }).success(function (result) {
            console.log(result);
        });
        $state.go('main.drive');
    }

    $scope.init();
});
