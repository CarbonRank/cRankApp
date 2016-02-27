app.controller('MainCtrl', function($scope, $ionicLoading) {
	$scope.$on('loadingEvent', function(ev, args){
		switch(args.action){
			case "start":
				$ionicLoading.show({ template: args.message || 'Loading...' });
				break;
			case "end":
				$ionicLoading.hide();
				break;
		}
	});
});