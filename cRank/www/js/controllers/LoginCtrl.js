app.controller('LoginCtrl', function($scope, $http, $state, UserService) {

	$scope.message = "";
	$scope.logData = {};

	$scope.goReg = function(){
		$state.go('userInfo');
	}

	$scope.processLoginForm = function() {
		$http({
			method  : 'POST',
			url     : '/api/user/login',
			data    : $scope.logData  // pass in data as strings
		})
		.success(function(data) {
			console.log("LOGIN DATA", data);
			if (data) {
				$state.go('main.drive');
				UserService.setUser(data);
			} else {
			   $scope.message = "Username or password is incorrect";
			}
		});
	};
});