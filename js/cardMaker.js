/*jshint esversion: 6 */
/*jshint browser: true */
class CardMaker {
	constructor(table, container) {
		let result = [];
		table.forEach( el => {
			let card = document.createElement("article"), row, h, text;
			for(let col in el) {
				row = document.createElement("div");
				h = document.createElement("b");
				text = document.createElement("span");
				h.innerHTML = col + ": ";
				text.innerHTML = el[col].source ? el[col].source : el[col];
				
				row.appendChild(h);
				row.appendChild(text);
				card.appendChild(row);
			}
			container.appendChild(card);
			result.push(card);
		} );
	}
}