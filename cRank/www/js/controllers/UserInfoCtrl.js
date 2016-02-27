app.controller('UserInfoCtrl', function($scope, $http, $state, UserService) {

	console.log("userinfo scope", $scope);
	// process the form
	$scope.processForm = function() {
		console.log($scope.username, $scope.firstName, $scope.lastName, $scope.password);
		UserService.setUserInfo($scope.formData.username, $scope.formData.firstName, $scope.formData.lastName, $scope.formData.password);
		$state.go('registration');
	};
});