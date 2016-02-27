app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, $interval, $window, $rootScope, Motion) {
	var options = {timeout: 10000, enableHighAccuracy: true};

	$scope.location = {};
	var updateInterval;

	var updateLocation = function(cb){
		console.log("LOCATION UPDATING");
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
			$scope.location = position.coords;
			if(cb) cb(position.coords);
		}, function(error){
	      alert("Could not get location");
	    });
	};

	var initTripData = function(pos){
		$rootScope.tripData = {
			initialPos: {
				lat: pos.latitude,
				long: pos.longitude,
				datetime: (new Date())
			},
			currentPos: {
				lat: pos.latitude,
				long: pos.longitude,
				datetime: (new Date())
			},
			calculated: {

			}
		};
	};

	var updateTripData = function(){
		$rootScope.tripData.currentPos = {
			lat: $scope.location.latitude,
			long: $scope.location.longitude,
			datetime: (new Date())
		};

		var dObj = {
			lat1: $rootScope.tripData.initialPos.lat,
			long1: $rootScope.tripData.initialPos.long,
			lat2: $rootScope.tripData.currentPos.lat,
			long2: $rootScope.tripData.currentPos.long,
		}

		$rootScope.tripData.calculated = {
			miles: Motion.getMiles(dObj)
		};
	};

	$scope.$on('initDrive', function(){
		$scope.$emit('loadingEvent', { action: 'start' });

		updateLocation(function(position){

			$scope.map = { 
	    		center: { latitude: $scope.location.latitude, longitude: $scope.location.longitude }, 
	    		zoom: 18,
	    		disableDefaultUI: true,
	    		control: {}
	    	};

	    	//initiate trip data
	    	initTripData($scope.location);

	    	updateInterval = $interval(function() {
	    	        updateLocation();
	    	        //update trip data
	    	        updateTripData();
	    	        console.log("TRIPDATA", JSON.stringify($rootScope.tripData));
	    	}, 1000);

	    	$scope.$emit('loadingEvent', { action: 'end' });
		});
	});

	$scope.$on('endDriving', function(){
		$interval.cancel(updateInterval);
	});


});