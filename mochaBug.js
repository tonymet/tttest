
var Q = require("kew");

console.log("\nThis demonstrates a bug dealing with Promise chaining and the Mocha executable. ");
console.log("The behavior shouldn't change, regardless whether this script is invoked with `node` or `mocha`. \n-------\n");

var firstPromise = Q.resolve("Test1");

var secondPromiseWithThenFunctionBody = firstPromise.then(function(val){
	console.log("######  The first promise has resolved with a value of: " + val + "\n");

	// Extend the Promise chain and pipe this string into the following THEN constructor. 
	return "Test2";
}).end();


// For some reason the 'secondPromiseWithThenFunctionBody' promise does not resolve when with  ...
// `mocha mochaBug.js` 
// ... but it does resolve with ... 
// `node mochaBug.js`

secondPromiseWithThenFunctionBody.then(function(val){
	console.log("&&&&&&& The second promise in the chain has resolved with a value of: " + val + "\n");
}).end();



// The mocha bug is somehow related to function chaining.
// It is possible to get the 2nd Promise to resolve but only if the THEN constructor does inject a function body.
// For example, even adding the following inside of "then()" will cause the 2nd promise to remain unresolved.
// ...then(function(){})...
var secondPromiseWithoutThenFunctionBody = firstPromise.then().end();

secondPromiseWithoutThenFunctionBody.then(function(val){
	console.log("^^^^^^^ The second promise has resolved without a function body in the first promise. Value from first: " + val + "\n");
}).end();


// The Object descriptions are identical regardless if 'mochaBug.js' is invoked with `node` or `mocha`.
/*
console.dir(firstPromise);
console.dir(secondPromiseWithThenFunctionBody);
console.dir(secondPromiseWithoutThenFunctionBody);
*/

