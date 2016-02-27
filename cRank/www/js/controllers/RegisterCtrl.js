app.controller('RegisterCtrl', function($scope, $http) {
    $scope.selectedVehicle = null;
    $scope.vehicleSelection = [];

    $http({
            method: 'GET',
            url: '/api/vehicle/year',
            data: { applicationId: 1 }
    }).success(function (result) {
    	console.log("result", result);
        $scope.vehicleSelection = result;
    });
});