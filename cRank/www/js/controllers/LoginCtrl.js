app.controller('LoginCtrl', function($scope, $http, $state) {

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
			console.log("data", data);
			if (data) {
				$state.go('main.drive');
			} else {
			   $scope.message = "Username or password is incorrect";
			}
		});
	};
});