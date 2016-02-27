app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, $interval) {
	var options = {timeout: 10000, enableHighAccuracy: true};

	$scope.location = {};

	var updateLocation = function(cb){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
			$scope.location = position.coords;
			if(cb) cb(position.coords);
		}, function(error){
	      alert("Could not get location");
	    });
	};

	$interval(function() {
	        updateLocation();
	}, 1000);


	$scope.$on('initMap', function(){
		$scope.$emit('loadingEvent', { action: 'start' });

		updateLocation(function(position){
			$scope.map = { 
	    		center: { latitude: $scope.location.latitude, longitude: $scope.location.longitude }, 
	    		zoom: 18,
	    		disableDefaultUI: true,
	    		control: {}
	    	};
	    	$scope.$emit('loadingEvent', { action: 'end' });
		});
	});













	/*
	var updateLocation = function(cb){
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
			$scope.map = { 
				center: { latitude: $scope.location.latitude, longitude: $scope.location.longitude }, 
				zoom: 18,
				disableDefaultUI: true,
				control: {}
			};
			cb();
		}, function(error){
	      alert("Could not get location");
	    });
	};

	$scope.$on('initMap', function(){
		console.log("map rec driv");
		$scope.$emit('loadingEvent', { action: 'start' });

		var updateMap = function(){
			updateLocation(function(){
				$scope.$emit('loadingEvent', { action: 'end' });
			});
		    // $cordovaGeolocation.getCurrentPosition(options).then(function(position){

		    // 	$scope.map = { 
		    // 		center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, 
		    // 		zoom: 18,
		    // 		disableDefaultUI: true,
		    // 		control: {}
		    // 	};

		    // 	$scope.$emit('loadingEvent', { action: 'end' });

		    // 	// uiGmapGoogleMapApi.then(function(maps) {
		    // 	// 	maps.event.trigger( $scope.map.control.getGMap(), 'resize');
		    // 	// });
		    
		    // }, function(error){
		    //   alert("Could not get location");
		    // });
			
		};

		ionic.Platform.ready(function(){
			updateMap();
		});
	});*/
});