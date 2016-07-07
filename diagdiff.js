process.stdin.resume();
process.stdin.setEncoding('ascii');
//var math = require('math');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
    var n = parseInt(readLine());
    var a = [];
    var sum = 0;
    for(a_i = 0; a_i < n; a_i++){
       a[a_i] = readLine().split(' ');
       a[a_i] = a[a_i].map(Number);
    }
    for (var i = 0;i < n; i++){
      for (var j = 0; j <n ; j++) {
        if(i == j ){
          sum += a[i][j];
        }
        if(n - j - 1 == i){
          sum -= a[i][j];
        }
      }
    }
    process.stdout.write(String(Math.abs(sum)) + "\n");
}
