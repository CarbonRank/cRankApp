app.controller('UserInfoCtrl', function($scope, $http, $state) {

	$scope.formData = {};

	// process the form
	$scope.processForm = function() {
	  $http({
	  method  : 'POST',
	  url     : '/api/user/newuser',
	  data    : $scope.formData,  // pass in data as strings
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	 })
	  .success(function(data) {
	    console.log("data", data);

	    // if (!data.success) {
	    //   // if not successful, bind errors to error variables
	    //   $scope.errorName = data.errors.name;
	    //   $scope.errorSuperhero = data.errors.superheroAlias;
	    // } else {
	    //   // if successful, bind success message to message
	    //   $scope.message = data.message;
	    // }

	    $state.go('registration');

	  });
	};

});