/*jshint esversion: 6 */
/*jshint browser: true */

/*class CardMaker {
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
}*/

class SACard {
	constructor(entry, cardNumber, base) {
		if (cardNumber === null || (typeof cardNumber !== "number") ) throw new Error (`SACard constructor: got wrong card's number: ${cardNumber}`);
		let source;
		
		function makeCategoryIcons( ) {
			let result = "";
			base.category.forEach(	function(category) {
				result += `<div ${category.name === entry.category.source ? `class="enabled"` : "" }>	<img class="icon" src="${ category.url }">	<div class="mask"></div>	</div>`;
			});
			
			return result;
		}
		
		function makeSegmentIcons( ) {
			let result = "";
			base.segment.forEach(	(segment) => {
				result += `<div ${ entry.segment.value.some( (e) => e.name === segment.name ) ? `class="enabled"` : "" }>	                <img class="icon" src="${ segment.url }">			<div class="mask"></div>	</div>`;
			});
			
			return result;
		}
		
		function makeRC( ) {
			let result = "";
			entry.geography.source.forEach( (rc) => {
				result += `<div class="RC">${ rc }</div>`;
			} );
			return result;
		}
		
		source = `
			<div class="cardHeader SA" data-key="header">
				<div class="type">SA</div>

				<div class="categories icons">
					${ makeCategoryIcons() }
				</div>

			</div>

			<div class="name">${ entry.name }</div>

			<div class="segments icons">
					${ makeSegmentIcons() }
			</div>

			<img class="cover"	src="${ entry.pictureurl }">

			<div class="map">
				${ makeRC() }
			</div>

			<section class="descClicker">
				<hr>
				<div class="tabCaption">
					<input id="descinput1-${ cardNumber }" type="radio" name="desc-${ cardNumber }" class="tabpad-1">				<label for="descinput1-${ cardNumber }">ЭКОНОМ</label>
					<input id="descinput2-${ cardNumber }" type="radio" name="desc-${ cardNumber }" class="tabpad-2" checked>		<label for="descinput2-${ cardNumber }">СТАНДАРТ</label>		
					<input id="descinput3-${ cardNumber }" type="radio" name="desc-${ cardNumber }" class="tabpad-3">				<label for="descinput3-${ cardNumber }">ПРЕМИУМ</label>
					<div class="breaker"></div>

					<div class="description tabpad-1"	>
						<div>Цена: 800 рублей. Покрытие: 400 000 рублей. 10 консультаций</div>
						Устная и письменная консультация из любой точки мира в любой момент, позволит защитить свои права и сэкономить.
					</div>			
					<div class="description tabpad-2"	>Здесь, значицца, описание Стандарт</div>
					<div class="description tabpad-3"	>Здесь, значицца, описание Премиум</div>
				</div>
			</section>	

			<section class="companyClicker">
				<hr>
				<div class="tabCaption">
					<input id="companyinput1-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-1">			<label for="companyinput1-${ cardNumber }">АЛЬФА</label>
					<input id="companyinput2-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-2" checked>	<label for="companyinput2-${ cardNumber }">РОСГОССТРАХ</label>		
					<input id="companyinput3-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-3">			<label for="companyinput3-${ cardNumber }">Ренессанс</label>
					<input id="companyinput4-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-4">			<label for="companyinput4-${ cardNumber }">ЗЕТТА</label>
					<input id="companyinput5-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-5">			<label for="companyinput5-${ cardNumber }">ЕЮС</label>
					<input id="companyinput5-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-6">			<label for="companyinput5-${ cardNumber }">ВСК</label>
					<div class="breaker"></div>

					<div class="description tabpad-1">
						<img src="img/companies/alpha.png" class="companyimg">
						<a class="policy" href="https://webtutor.otpbank.ru/download_file.html?file_id=6668274844734395514">ПОЛИС</a>
						<a class="policy" href="https://webtutor.otpbank.ru/download_file.html?file_id=6668274844734395514">ИНСТРУКЦИЯ</a>
						<a class="policy" href="https://webtutor.otpbank.ru/download_file.html?file_id=6668274844734395514">ОФОРМЛЕНИЕ</a>
					</div>			
					<div class="description tabpad-2"	>РГС</div>
					<div class="description tabpad-3"	>Про РЕНЕССАНС</div>
					<div class="description tabpad-4"	>Про зетту</div>
					<div class="description tabpad-5"	>Это вымышленная СК</div>
				</div>
			</section>`;
		entry.html = this;
		this.html = document.createElement('article');
		this.html.innerHTML = source;
		
	}
	
	show( ){
		this.html.classList.remove("hidden");
	}
	
	hide( ) {
		this.html.classList.add("hidden");		
	}
}

