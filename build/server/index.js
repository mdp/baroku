'use strict';

require('babel/polyfill');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express['static']('dist/client'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hello from babel' });
});

exports.start = function () {
  return new Promise(function (resolve, reject) {
    var port = process.env.PORT || 4000;
    app.listen(port, function (err) {
      if (err) {
        return reject(err);
      }
      console.log('Listening on ' + port);
      return resolve(port);
    });
  });
};