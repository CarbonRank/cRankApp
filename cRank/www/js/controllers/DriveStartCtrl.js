app.controller('DriveStartCtrl', function($scope) {
	$scope.startDriving = function(){
		$scope.$emit('startDriving');
	};
});