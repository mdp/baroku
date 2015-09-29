require('babel/polyfill');
let express = require('express');
let path = require('path')
let app = express();

var staticPath = path.join(__dirname, './../public');
let viewsPath = path.join(__dirname, './views')

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.static(staticPath));

app.get('/', function(req, res){
  res.render('index', {title: 'Hello from babel'});
});

exports.start = function() {
  return new Promise(function(resolve, reject){
    let port = process.env.PORT || 4000
    app.listen(port, function(err){
      if (err) {
        return reject(err)
      }
      console.log(`Listening on ${port}`)
      return resolve(port)
    })
  })
}
