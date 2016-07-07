process = require('process');
console.log('start');
process.nextTick(f() => {
  console.log('nextTick callback');
  f();
});
console.log('scheduled');
// Output:
// start
// scheduled
// nextTick callback