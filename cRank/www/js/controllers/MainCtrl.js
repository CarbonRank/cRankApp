app.controller('MainCtrl', function($scope, $ionicLoading) {
	$scope.$on('loadingEvent', function(ev, args){
		console.log("ev", ev);
		console.log("args", args);

		switch(args.action){
			case "start":
				$ionicLoading.show({ template: 'Loading...' });
				break;
			case "end":
				$ionicLoading.hide();
				break;
		}
	});
});