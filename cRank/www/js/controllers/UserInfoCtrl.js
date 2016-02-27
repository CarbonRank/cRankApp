app.controller('UserInfoCtrl', function($scope, $http, $state) {

	$scope.formData = {};
	$scope.error = "";

	// process the form
	$scope.processForm = function() {
		$http({
			method  : 'POST',
			url     : '/api/user/',
			data    : $scope.formData  // pass in data as strings
		})
		.success(function(data) {
			console.log("data", data);

			if (!data.success) {
			  // if not successful, bind errors to error variables
			  // $scope.errorName = data.errors.name;
			  // $scope.errorSuperhero = data.errors.superheroAlias;
			  // $scope.error = data.toUpperCase();
			  $scope.error = "NOT VALID INPUT(S). PLEASE TRY AGAIN."
			} else {
			  // if successful, bind success message to message
			  // $scope.message = data.message;
			  $state.go('registration');
			}

			
		});
	};

});