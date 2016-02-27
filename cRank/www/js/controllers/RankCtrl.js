app.controller('RankCtrl', function($scope, $http) {
	$http({
	    method: 'GET',
	    url: '/api/user/sorted',
	}).success(function (result) {
	    $scope.rankedUsers = result;
	});

	var randomNumber = function(){
		// return Math.floor(Math.random() * 100);

		return Math.floor(Math.random() * 50);
	};

	$scope.randomImage = function(){
		var str = "";
		str += "http://api.randomuser.me/portraits/men/" + randomNumber() + ".jpg";

		return str;
	};
  

});