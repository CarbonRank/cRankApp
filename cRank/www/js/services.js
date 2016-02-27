angular.module('cRank.services', [])

.factory('UserService', function() {
  var user = {};

  return {
    setUserInfo: function(username, firstName, lastName, pass) {
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = pass;
    },
    setUserVehicleId: function(id) {
      user.vehicleid = id;
    },
    getUser: function() {
      return user;
    }
  };
})

.service("Motion", function(){
  var d2r = function(deg){
    return deg * (Math.PI/180);
  };
  var getMiles = function(pos){
    var miles, MILES_PER_KM = 0.621371;

    var lat1 = pos.lat1, long1 = pos.long1, lat2 = pos.lat2, long2 = pos.long2;

    var RAD = 6371;
    var dLat = d2r(lat2 - lat1), dLong = d2r(long2 - long1);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(d2r(lat1)) * Math.cos(d2r(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var km = RAD * c;

    miles = km * MILES_PER_KM;

    return miles;
  };

  return {
    getMiles: getMiles
  }
});
