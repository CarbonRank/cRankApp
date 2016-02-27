app.controller('LoginCtrl', function($scope, $http, $state, UserService) {

	if(window.localStorage['cRank_user']){
		// console.log("have a user!");
		UserService.setUser(JSON.parse(window.localStorage['cRank_user']));
		$state.go('main.drive');
	}


	$scope.message = "";
	$scope.logData = {};

	$scope.goReg = function(){
		$state.go('userInfo');
	}

	$scope.processLoginForm = function() {
		$http({
			method  : 'POST',
			url     : 'http://crank-server.herokuapp.com/api/user/login',
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