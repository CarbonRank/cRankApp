app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, $interval, $window, $rootScope, Motion, $http, UserService) {
	var options = {timeout: 10000, enableHighAccuracy: true};

	$scope.location = {};
	$scope.map_active = false;

	var updateInterval;

	var updateLocation = function(cb){
		// console.log("LOCATION UPDATING");
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
			$scope.location = position.coords;

			//add location point to data set
			$rootScope.tripData.positionData.push({
				lat: position.coords.latitude,
				long: position.coords.longitude,
				datetime: (new Date())
			});

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
			positionData: [],
			calculated: {

			}
		};
	};

	var calcTripData = function(){
		$rootScope.rawData = Motion.calculate($rootScope.tripData);
		console.log("rawData", $rootScope.rowData);

		/*
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

		var data = Motion.calcData(dObj);

		$rootScope.tripData.calculated = {
			miles: data.miles,
			carbon: data.carbon
		};
		*/
	};

	$scope.$on('initDrive', function(){
		$scope.$emit('loadingEvent', { action: 'start' });

		$rootScope.tripData = { positionData: [] };

		updateLocation(function(position){

			// //add initial location point to data set
			// $rootScope.tripData.positionData.push({
			// 	lat: position.coords.latitude,
			// 	long: position.coords.longitude,
			// 	datetime: (new Date())
			// });

			$scope.map = { 
	    		center: { latitude: $scope.location.latitude, longitude: $scope.location.longitude }, 
	    		zoom: 21,
	    		disableDefaultUI: true,
	    		control: {}
	    	};

	    	$scope.map_active = true;


	    	//initiate trip data
	    	// initTripData($scope.location);

	    	updateInterval = $interval(function() {
	    	        updateLocation();
	    	        //update trip data
	    	        // updateTripData();
	    	        // console.log("TRIPDATA", JSON.stringify($rootScope.tripData));
	    	}, 300);

	    	$scope.$emit('loadingEvent', { action: 'end' });
		});
	});

	$scope.$on('tripStopButtonClicked', function(ev){
		ev.stopPropagation();

		$scope.$emit('loadingEvent', { action: 'start', message: 'Crunching Data Set...' });

		calcTripData();

		$interval.cancel(updateInterval);

		$scope.$emit('loadingEvent', { action: 'end' });

		//save trip to DB

		/*
		userid: String,
    startTime: Number, 
    endTime: Number,
    totalTripC: Number
    */

    	var tripObj = {
    		userid: UserService.getUser()["_id"],
    		startTime: (new Date($rootScope.tripData.positionData[0].datetime)).getTime(),
    		endTime: (new Date($rootScope.tripData.positionData[$rootScope.tripData.positionData.length - 1].datetime)).getTime(),
    		totalTripC: Math.floor($rootScope.rawData.carbon)
    	};

    	$http({
    		method: 'POST',
    		url: 'http://crank-server.herokuapp.com/api/trip',
    		data: tripObj
    	})
    	.success(function(data) {
    		if (data) {
    			$scope.$emit('endDriving');
    		} else {
    		 	console.log("COULD NOT POST TRIP");
    		}
    	});

		
	});


});