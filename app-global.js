
var express = require('express');
var app = express();

global.i = 0;

app.get('/', function (req, res) {
      res.send('Hello World! ' + global.i);
      global.i += 1;
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});
