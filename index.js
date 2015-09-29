var server;
if (process.env.NODE_ENV === 'production') {
  server = require('./build/server');
  server.start();
} else {
  // Development
  require('babel/register');
  server = require('./server');
  console.log("Starting server")
  server.start();
}

