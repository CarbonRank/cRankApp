app.controller('MapControlCtrl', function($scope) {
	$scope.endDrive = function(){
		$scope.$emit('tripStopButtonClicked');
	}
});