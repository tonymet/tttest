/* jshint undef: true, unused: true,camelcase:false,quotmark:false,strict:false */
var redis = require('redis');
var client =  redis.createClient();
var uuid = require('node-uuid');
var async = require('async');

var num_convos = 1e3;
//var convo_size = 5 * 1e2;
var convo_size = 2

function createData(){
  client.lset("test_roster", function(err, data){
    for(var i = 0 ; i < num_convos; ++i ){
      var convo = [];
      for(var j = 0; j < convo_size; ++j){
         convo.push(j);
         convo.push(uuid());
      }
      var convo_id = uuid();
      convo.unshift("convo." + convo_id);
      client.zadd(convo, function(err, data){
        client.rpush("test_roster", "convo." + convo_id);
      });
    }
  });
};

//createData();

function asyncTest(){
  client.lrange("test_roster", 0, num_convos - 1, function(err,data){
    //console.log("data:");
    //console.log(data);
    console.time("bulk zrevrange");
    async.map(data, function(e, cb){
      console.log
      client.zrevrange(e, 1, convo_size - 1, function(err, convo){
        //console.log("convo:" + convo);
        cb(null, convo);
      })
    },
    function(err, results){
      console.log("all convos");
      console.log('#results:' + results.length);
      //console.log(results);
      console.log("DONE");
      console.timeEnd("bulk zrevrange");
      process.exit(0);
    });
  })
}

function multiTest(){
  client.lrange("test_roster", 0, num_convos - 1, function(err, data){
    console.time("multi bulk zrevrange");
    var redisCmds = data.map(function(e){
      return ['zrevrange', e, 1, convo_size - 1];
    });
    console.log("# cmds: ", redisCmds.length);
    client.batch(redisCmds).exec(function(e,results){
      console.log("all convos");
      console.log('#results:' + results.length);
      //console.log(results);
      console.log("DONE");
      console.timeEnd("multi bulk zrevrange");
      process.exit(0);
    });
  });
}


if (process.argv.length > 2) {
    var arg = process.argv[2];
    switch (arg) {
        case "async":
          asyncTest();
          break;
        case "multi": 
          multiTest();
          break;
        case "create":
          createData();
          break;
        default:
            console.log("Huh?");
            process.exit(1);
            break;
    }
}