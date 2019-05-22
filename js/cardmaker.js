/*jshint esversion: 6 */
/*jshint browser: true */

class SACard {
	constructor(entry, cardNumber, base) {
		if (cardNumber === null || (typeof cardNumber !== "number") ) throw new Error (`SACard constructor: got wrong card's number: ${cardNumber}`);
		let source;
		
		function makeCategoryIcons( ) {
			let result = "", categories = entry.category.source;
			base.category.forEach(	function(category) {
				result += `<div ${categories.some( el => category.name === el ) ? `class="enabled"` : "" } title="${ category.name }">	<img class="icon" src="${ category.url }" >	</div>	`;
			});
			
			return result;
		}
		
		function makeSegmentIcons( ) {
			let result = "";
			base.segment.forEach(	(segment) => {
				result += `<div ${ entry.segment.value.some( (e) => e.name === segment.name ) ? `class="enabled"` : "" } title="${ segment.name }">	                <img class="icon" src="${ segment.url }">			</div>	`;
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
		
		function makeDescriptionTabs( ) {
			if (!entry.price.split) entry.price = "" + entry.price;
			let result = "", prices = entry.price.split(";"), names = entry.priceName.split(";");
			
			prices.forEach( (e, i, arr) => {
				result += `<input id="descinput${ i }-${ cardNumber }" type="radio" name="desc-${ cardNumber }" class="tabpad-${ i }" ${ (i === 1 || arr.length === 1) ? "checked" : "" }> <label ${arr.length > 1 ? "" : 'class="leftit"'} for="descinput${ i }-${ cardNumber }">${ names[i] }</label>`;
			} );
			
			return result;
		}
		function makeDescriptions( ) {
			let result = "", prices = entry.price.split(";"), names = entry.priceName.split(";");
			
			prices.forEach( (e, i) => {
				result += `
					<div class="description tabpad-${ i }">
						<div class="value">Цена: ${ e } ${ entry["value" + (i + 1)] }</div>

						${ entry.description }
					</div>
				`;
			} );
			return result;
		}
		
		function makeCompanyTabs( ) {
			let result = "", names = entry.company.value;
			
			entry.company.value.forEach( (e, i, arr) => {
				result += `<input id="companyinput${ i }-${ cardNumber }" type="radio" name="company-${ cardNumber }" class="tabpad-${ i }" ${ i === 0 ? "checked" : "" }>			<label ${arr.length > 1 ? "" : 'class="leftit"'} for="companyinput${ i }-${ cardNumber }">${ e.shortname }</label>`;
			} );
			
			return result;
		}
		function makeCompanyDescriptions( ) {
			let result = "", names = entry.company.value, polices = entry.policyurl ? entry.policyurl.split(";") : "" ;
			
			entry.company.value.forEach( (e, i) => {
				let policy = polices ? polices[i] : "";
				policy = policy !== undefined ? policy : "";
				result += `
					<div class="description tabpad-${ i }">
						<img src="${ e.logo }" class="companyimg">
						<a class="policy ${ policy ? "" : "hidden" }" href="${ policy ? policy : "" }">ПОЛИС</a>
						<a class="policy ${ e.instructionurl ? "" : "hidden" } ${entry.type === "SA" ? "" : "hidden"}" href="${ e.instructionurl }">ИНСТРУКЦИЯ</a>
						<a class="policy ${entry.type === "SA" ? "" : "hidden"}" href="${ e.war }" target="blank">ОФОРМЛЕНИЕ</a>
					</div>	
				`;
			} );
			
			return result;
		}
		
		source = `
			<div class="cardHeader ${entry.type}" data-key="header">
				<div class="type">${entry.type}</div>

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
					
					${ makeDescriptionTabs( ) }
					
					<div class="breaker"></div>

					${ makeDescriptions( ) }
				</div>
			</section>	

			<section class="companyClicker">
				<hr>
				<div class="tabCaption">
					${ makeCompanyTabs( ) }
					<div class="breaker"></div>
					${ makeCompanyDescriptions( ) }
		

				</div>
			</section>
		`;
		
		entry.html = this;
		this.html = document.createElement('article');
		this.html.className = entry.type;
		this.html.innerHTML = source;
		
	}
	
	show( ){
		this.html.classList.remove("hidden");
	}
	
	hide( ) {
		this.html.classList.add("hidden");		
	}
}

