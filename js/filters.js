/*jshint es5: true, esnext: true, browser: true*/

function hide(arr) {
	arr.forEach( (e) => e.html.hide( ) );
}

function show(arr) {
	arr.forEach( (e) => e.html.show( ) );
}

/**
 * @function Фильтрует объект в формате GCBase ProductPlayer, проверяя на совпадение текста в имени и описании
 * @param {GCBase Table} table
 * @param {string} text for test
 */

function filterByText(table, text) {
	if (!text) return [ ];
	let r = new RegExp( ("" + text).toLowerCase( ) );
	
	return filtered = table.filter( (el) => {
		return !(r.test(el.name.toLowerCase( )) || r.test(el.description.toLowerCase( )));
	} );

}


/**
 * @function Clears input value and removes disabled class for other.
 * @param {input element} textElement
 * @param {elementList} hiddenButtonsList 
 * @param {GCBase Table} table for showing elements
 */
function clearFilters(textElement, hiddenButtonsList, table) {
	textElement.value='';
	if (hiddenButtonsList) {
		[ ].forEach.call(hiddenButtonsList, el => el.classList.remove("disabled"));
	}
	show(table);
}

	
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

/**
 * @function filters a GCBase ProductPlayer object by classname
 * @param {GCBase Table} table
 * @param {elementList} list of html elements 
 * 
 * @requires genTemplateFromButtons function
 */
function filterByButtons(table, list) {	
	let buttons = genTemplateFromButtons(list);

	return table.filter( (el) => {
		let result = false;
		
		for(let f in buttons) {
			if (!el[f]) {console.error("1"); continue;}
			let forTest = el[f].source ? el[f].source : el[f];
			result = forTest.map ? buttons[f].some( ell => forTest.some( elll => ell === elll ) ) : buttons[f].some( ell => ell === forTest );
			if (result) return result;
		}
		
		return result;
	} );
};


function complexFilter(table, input, buttons) {
	let result = filterByText(table, input.value);
	result = result.concat( filterByButtons(table, buttons) );
	
	show(table);
	hide(result);
}
