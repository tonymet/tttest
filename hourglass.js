process.stdin.resume();
process.stdin.setEncoding('ascii');

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
    var arr = [];
    var cur = 0, max = 0,arr_i=0;
    for(arr_i = 0; arr_i < 6; arr_i++){
       arr[arr_i] = readLine().split(' ').map(Number);
    }
    for(var i = 1; i < 5; ++i){
      for(var j = 1 ; j < 5; ++j){
        cur = (arr[i][j] +
          arr[i-1][j-1] + arr[i-1][j] + arr[i-1][j+1] +
          arr[i+1][j-1] + arr[i+1][j] + arr[i+1][j+1] );
        // console.log(cur);
        if ( (i == 1 && j == 1) || cur > max){
          max = cur;
        }
      }
    }
    // console.log(arr);
    process.stdout.write(String(max) + "\n");
}
