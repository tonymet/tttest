/**
 * random functions for google analytics
 *
 */
function tga(){
	var trackers = ga.getAll();
	for(var i = 0 ; i < trackers.length; ++i){
	   var args = Array.prototype.slice.call(arguments);
	   var method = args.shift();
	   if(typeof trackers[i][method] === "undefined"){
	   		throw arguments.callee.name.toString() + " error: " + method + "is not defined";
	   }
	   trackers[i][method].apply(trackers[i],args);
	}
}
