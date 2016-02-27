app.controller('RankCtrl', function($scope, $http) {
	$http({
	    method: 'GET',
	    url: 'http://crank-server.herokuapp.com/api/user/sorted',
	}).success(function (result) {
	    $scope.rankedUsers = result;
	});

});