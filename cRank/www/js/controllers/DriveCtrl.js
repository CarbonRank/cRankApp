app.controller('DriveCtrl', function($scope, $state, $ionicModal) {
	$scope.drive_state = 0;

	$ionicModal.fromTemplateUrl('templates/post-drive.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.$on('startDriving', function(){
		$scope.drive_state = 1;
		$scope.$broadcast('initMap');
	});

	$scope.$on('endDriving', function(){
		$scope.drive_state = 0;
		$scope.modal.show();


		  // $scope.openModal = function() {
		  //   $scope.modal.show();
		  // };
		  // $scope.closeModal = function() {
		  //   $scope.modal.hide();
		  // };
		  // //Cleanup the modal when we're done with it!
		  // $scope.$on('$destroy', function() {
		  //   $scope.modal.remove();
		  // });
		  // // Execute action on hide modal
		  // $scope.$on('modal.hidden', function() {
		  //   console.log("bye modal")
		  // });
		  // // Execute action on remove modal
		  // $scope.$on('modal.removed', function() {
		  //   // Execute action
		  // });


	});
});