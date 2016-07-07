'use strict';

var express = require('express');
var app = express();
var sleep = require('sleep');
var async = require('async');

app.get('/', function (req, res) {
  setTimeout(function(){
    console.log('do some redis shit');
  },3000);
  async.map([1,2,3], function(i,cb){
    setTimeout(function(){
      console.log('call zrevrange a bunch');
    },1000);
    cb(null,i);
  },
  function(c){
    res.send(200, {'data': 'Hello World!', c: JSON.stringify(c)});
  });
});
// hello

app.listen(3000);