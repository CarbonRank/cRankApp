app.controller('RegisterCtrl', function($scope, $http, $state, UserService) {
    var user;
    $scope.init = function() {
        user = UserService.getUser();
        $http({
            method: 'GET',
            url: 'http://crank-server.herokuapp.com/api/vehicle/year',
        }).success(function (result) {
            $scope.vehicleYearSelection = result.results;
        });
        console.log(user);
    }
    	

	$scope.getMake = function () {
		$http({
        	method: 'GET',
        	url: 'http://crank-server.herokuapp.com/api/vehicle/make?year=' + $scope.vehicleYear,
		}).success(function (result) {
    		$scope.vehicleMakeSelection = result.results;
		});
	}

	$scope.getModel = function () {
		$http({
        	method: 'GET',
        	url: 'http://crank-server.herokuapp.com/api/vehicle/model?year=' + $scope.vehicleYear + '&make=' + $scope.vehicleMake,
		}).success(function (result) {
    		$scope.vehicleModelSelection = result.results;
		});
	}

    $scope.getSpecific = function () {
        $http({
            method: 'GET',
            url: 'http://crank-server.herokuapp.com/api/vehicle/options?year=' + $scope.vehicleYear + '&make=' + $scope.vehicleMake + '&model=' + $scope.vehicleModel,
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
            url: 'http://crank-server.herokuapp.com/api/user',
            data: UserService.getUser()
        }).success(function (result) {
            console.log(result);
        });
        $state.go('main.drive');
    }

    $scope.init();
});
