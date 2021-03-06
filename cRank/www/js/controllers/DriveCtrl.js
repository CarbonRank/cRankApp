app.controller('DriveCtrl', function($scope, $state, $ionicModal, UserService) {
	$scope.drive_state = 0;

	console.log("UserService", UserService.getUser());

	$ionicModal.fromTemplateUrl('templates/post-drive.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.$on('startDriving', function(){
		$scope.drive_state = 1;
		$scope.$broadcast('initDrive');
	});

	$scope.$on('endDriving', function(){
		$scope.drive_state = 0;
		$scope.modal.show();
	});
});