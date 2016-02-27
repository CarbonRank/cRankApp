app.controller('MainCtrl', function($scope, $ionicLoading, UserService) {
	UserService.setUser(JSON.parse(window.localStorage['cRank_user']));


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