app.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading) {
	var options = {timeout: 10000, enableHighAccuracy: true};
	 

	$scope.$on('initMap', function(){
		console.log("map rec driv");
		$scope.$emit('loadingEvent', { action: 'start' });

		ionic.Platform.ready(function(){
	        console.log("ready??");

	        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

	        	$scope.map = { 
	        		center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, 
	        		zoom: 18,
	        		disableDefaultUI: true
	        	};

	        	$scope.$emit('loadingEvent', { action: 'end' });
	        
	        }, function(error){
	          alert("Could not get location");
	        });
	    });
	});

	
});