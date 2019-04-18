/*jshint esversion: 6 */
/*jshint browser: true */
class CardMaker {
	constructor(table, container) {
		let result = [], fragment = document.createDocumentFragment();
		table.forEach( el => {
			let card = document.createElement("article"), row, h, text;
			for(let col in el) {
				row = document.createElement("div");
				h = document.createElement("b");
				text = document.createElement("span");
				h.innerHTML = col + ": ";
				if(col === "pictureurl") {
					text = document.createElement("img");
					text.src = el[col];
				} else {
					text.innerHTML = el[col].source ? el[col].source : el[col];
				}
				row.appendChild(h);
				row.appendChild(text);
				card.appendChild(row);
			}
			fragment.appendChild(card);
			result.push(card);
		} );
		this.cards = result;
		container.appendChild(fragment);
	}
}
