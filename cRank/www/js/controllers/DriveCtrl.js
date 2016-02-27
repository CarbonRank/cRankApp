app.controller('DriveCtrl', function($scope, $state) {
	$scope.drive_state = 0;

	$scope.$on('startDriving', function(){
		$scope.drive_state = 1;
		$scope.$broadcast('initMap');
	});

	$scope.$on('endDriving', function(){
		$scope.drive_state = 0;
	});
});