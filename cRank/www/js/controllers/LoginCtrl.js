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

			if (!data.success) {
			  // if not successful, bind errors to error variables
			  // $scope.errorName = data.errors.name;
			  // $scope.errorSuperhero = data.errors.superheroAlias;
			  $scope.message = data;
			  // $scope.error = "NOT VALID INPUT(S). PLEASE TRY AGAIN."
			} else {
			  // if successful, bind success message to message
			  // $scope.message = data.message;
			  $state.go('main');
			}

			
		});
	};
});