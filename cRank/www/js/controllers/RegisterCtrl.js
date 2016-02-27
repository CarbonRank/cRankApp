app.controller('RegisterCtrl', function($scope, $http) {
    	$scope.vehicleYear = null;
    	$scope.vehicleMake = null;
    	$scope.vehicleModel = null;
    	$scope.vehicleYearSelection = [];
    	$scope.vehicleMakeSelection = [];
    	$scope.vehicleModelSelection = [];

    	$http({
            method: 'GET',
            url: '/api/vehicle/year',
    	}).success(function (result) {
        	$scope.vehicleYearSelection = result.results;
    	});

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
        		console.log("result",result);
    		});
		}
	}
);
