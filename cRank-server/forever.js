var forever = require('forever');

var child = new (forever.Monitor)('server.js', {
  max: 15,
  silent: false
});

//child.on('exit', this.callback);
child.start();

forever.startServer(child);