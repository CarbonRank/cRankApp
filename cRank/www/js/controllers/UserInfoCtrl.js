
app.controller('UserInfoCtrl', function($scope, $http, $state, UserService) {

	console.log("userinfo scope", $scope);
	// process the form
	$scope.processForm = function() {
		console.log("adgsf");
		UserService.setUserInfo($scope.username, $scope.firstName, $scope.lastName, $scope.password);
		$state.go('registration');
	};

});