let getTextFromUrl = function (url, handler, options = {method: "GET"}) {
	fetch(url, options).then( function(answer) {
		if(answer.ok) {
			return answer.text();
		}
		throw new Error(`getTextFromUrl: there are some problems with fetch. status:"${answer.status}"`)
		
	} )
	.then( function(answer) {handler(answer)} ).catch(function(error) {console.error(error)});
}