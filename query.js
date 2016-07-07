function processData(input) {
    //Enter your code here
} 

process.stdin.resume();
process.stdin.setEncoding('ascii');
var _input = '';
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

function processData(contents){
  var lines = contents.split("\n");
  var words = {} , queries = [];
  for(var i = 1, wordCount = +lines[0]; i <= wordCount; ++i){
    if(!words[lines[i]]){
      words[lines[i]] = 1;
    }
    else{
      ++words[lines[i]];
    }
  }
  for(var  queryCount = +lines[i], j = i+1; j <= queryCount + i; ++j){
    if(words[lines[j]]){
      process.stdout.write(String(words[lines[j]]));
      process.stdout.write("\n");
    }
    else{
      process.stdout.write("0");
      process.stdout.write("\n");
    }
    queries.push(lines[j]);
  }
  //console.log(lines);
  //console.log(words);
  //console.log(queries);
}