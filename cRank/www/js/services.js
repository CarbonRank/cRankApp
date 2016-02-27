angular.module('cRank.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
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
