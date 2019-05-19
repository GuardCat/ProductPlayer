/*jshint es5: true, esnext: true, browser: true*/


/**
 * @function Фильтрует объект в формате GCBase ProductPlayer, проверяя на совпадение текста в имени и описании
 * @param {GCBase} base
 * @param {string} text for test
 */

function filterByText(base, text) {
	let 
		r = new RegExp( ("" + text).toLowerCase( ) ),
		filtered = base.desc.filter( (el) => {
			return !( r.test(el.name.toLowerCase( )) || r.test(el.description.toLowerCase( )) );
		} )
	;
	
	return filtered;
}

function hide(arr) {
	arr.forEach( (e) => e.html.hide( ) );
}

function show(arr) {
	arr.forEach( (e) => e.html.show( ) );
}


/**
 * @function Clears input value and removes disabled class for other.
 * @param {input element} textElement
 * @param {elementList} hiddenButtonsList 
 */
function clearFilters(textElement, hiddenButtonsList) {
	textElement.value='';
	if (hiddenButtonsList) {
		[ ].forEach.call(hiddenButtonsList, el => el.classList.remove("disabled"));
	}
}

function searchPanelClicked(e) {
	if(e.target.classList.contains("searchButton")) {
		e.target.classList.toggle("disabled");
		//filterBy(e.target.getAttribute("data-searchby"), e.target.innerHTML, e.target.classList.contains("disabled"))
	}
}
	
/**
 * @function filters a GCBase ProductPlayer object by classname
 * @param {GCBase} base
 * @param {elementList} list of html elements 
 */
let filterByButtons = ( ( ) => {
	
	/**
	 * @function Генерирует объект на основании html-блоков со специальными data-свойствами.
	 * @param {elementList} elements static list of elements, which returns querySelectorAll may be an Array.
	 */
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
	
	return (base, list) => {	
		let filtered, buttons = genTemplateFromButtons(list);

		return base.filter( (el) => {
			
		} );
	};
} ) ( );

