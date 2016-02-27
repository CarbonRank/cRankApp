app.controller('ActivityCtrl', function($scope, $http) {
	
	$http({
	    method: 'GET',
	    url: '/api/trip',
	}).success(function (result) {
	    $scope.usersTrips = result;
	});
  

});