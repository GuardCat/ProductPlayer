/*jshint es5: true, esnext: true, browser: true*/
function genTemplateFromButtons(elements) {
	let result = {};
	
	[].forEach.call(elements, (el) => {
		let 
			searchkey = el.getAttribute("data-searchkey"),
			searchval = el.getAttribute("data-searchval")
		;
		if ( !result[searchkey] ) result[searchkey] = [ ];
		
		if ( el.classList.contains("disabled") ) {
			result[searchkey].push( searchval );
		}
		
	} );
	
	return result;
}