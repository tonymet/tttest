var DEBUG = 0;
function debug(cb){
  if(DEBUG){
    cb();
  }
}
function processData(input) {
    var len = input[0][0], shiftCount = input[0][1];
    var arr = input[1];
    debug(function(){
      console.log("shiftCount", shiftCount);
      console.log(arr);
    });
    for(var i = shiftCount, ii = arr.length; i < ii;++i){
      process.stdout.write(arr[i]);
      process.stdout.write(" ");
    }
    //breakpoint();
    for(i = 0; i < shiftCount; ++i ){
      process.stdout.write(arr[i]);
      process.stdout.write(" ");
    }
    process.stdout.write( "\n");
    /*
    // slow version here
    for (var i = 0;  i < shiftCount; i++) {
      var cur = arr.shift();
      arr.push(cur);
    }
    console.log(arr);
    process.stdout.write(arr.join(" ") + "\n");
    */
    //Enter your code here
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   // convert input to 2d arr
   _input = _input.split("\n").map(function(l){return l.split(" ")});
   processData(_input);
});
