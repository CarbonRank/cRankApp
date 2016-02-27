app.controller('ActivityCtrl', function($scope, $http) {
	
	$http({
	    method: 'GET',
	    url: 'http://crank-server.herokuapp.com/api/trip',
	}).success(function (result) {
	    $scope.usersTrips = result;
	});
  

});