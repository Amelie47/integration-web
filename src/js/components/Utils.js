export default class Utils {
	getPos(el) {
		for (var lx = 0, ly = 0;
			el != null;
			lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
		return { x: lx, y: ly };
	}

	setWidthItems(tab) {
		tab.children.forEach(function (item) {
			item.style.width = ((1 / 5) * tab.parentNode.offsetWidth - 6) + 'px';
		});
	}

	getMaxHeight(tab) {
		let h = 0;
		let t = [];
		tab.children.forEach(function (item) {
			if (item.offsetHeight > h) {
				h = item.offsetHeight;
			}
			t.push(item.offsetHeight);
		});
		return h;
	}

	setHeightItems(tab) {
		tab.children.forEach((item) => {
			item.style.height = this.getMaxHeight(tab) + "px";
		});
	}

	getArticle(item) {
		let item_div = this.createDivWithClass('item');
		let item_body = this.createDivWithClass('item__body');
		let item_img = this.createDivWithClass('item__img');
		let img = this.createImgWithSrc(item.images.small);
		let item_content = this.createDivWithClass('item__content');
		if (item.stock <= 1) {
			item_content.classList.add('stock-danger');
		}
		let title = document.createElement('h2');
		title.classList.add('content__title');
		let description = document.createElement('p');
		description.classList.add('content__desc');
		let stock = document.createElement('p');
		stock.classList.add('content__stock');

		title.innerHTML = item.title;
		description.innerHTML = item.specs.engine + ' - ' + item.specs.color;
		stock.innerHTML = item.stock + ' en stock';

		item_img.appendChild(img);
		item_content.appendChild(title);
		item_content.appendChild(description);
		item_content.appendChild(stock);
		item_body.appendChild(item_img);
		item_body.appendChild(item_content);
		item_div.appendChild(item_body);

		return item_div;
	}

	createDivWithClass(classname) {
		let div = document.createElement('div');
		div.classList.add(classname);
		return div;
	}

	getProduct(item, section_entete) {
		let container = document.createElement('div');
		container.classList.add('div-product');
		container.setAttribute('data-color', item.specs.color);

		let article = document.createElement('article');
		article.classList.add('product');

		let div_wrapper = document.createElement('div');
		div_wrapper.classList.add('wrapper');

		let div2 = document.createElement('div');

		let title = document.createElement('h1');
		title.classList.add('product-title');
		title.classList.add('ft-14');

		let size_engine = document.createElement('p');
		size_engine.classList.add('product-content');

		let color = document.createElement('p');
		color.classList.add('product-content');

		let img = this.createImgWithSrc(item.images.big);
		img.classList.add('img-entete');

		container.appendChild(img);
		container.appendChild(article);
		article.appendChild(div_wrapper);
		div_wrapper.appendChild(div2);
		div2.appendChild(title);
		div2.appendChild(size_engine);
		div2.appendChild(color);
		div2.appendChild(this.getButtonCommander());

		title.innerHTML = item.title;
		size_engine.innerHTML = 'Taille ' + item.specs.size + ' - ' + item.specs.engine;
		color.innerHTML = item.specs.color;

		return container;
	}

	getVisibleArticles(slider) {
		let tab = [];
		slider.children.forEach(function (item, index, array) {
			if (index <= 4) {
				tab.push(item);
			}
		});
		return tab;
	}

	getAllArticles(slider) {
		let tab = [];
		slider.children.forEach(function (item, index, array) {
			tab.push(item);
		});
		return tab;
	}

	createImgWithSrc(src) {
		let img = document.createElement('img');
		img.setAttribute('src', src);
		return img;
	}

	getButtonCommander() {
		let div_button = document.createElement('div');

		let button = document.createElement('button');
		button.classList.add('button');
		button.classList.add('button-commander');

		let span = document.createElement('span');
		span.classList.add('arrow-button');

		let arrow = document.createElement('img');
		arrow.setAttribute('src', '/src/assets/images/Fleche-right-ligth.png');

		button.innerHTML = "Commander";
		span.appendChild(arrow);
		button.appendChild(span);
		div_button.appendChild(button);

		return div_button;
	}

	getColor(color) {
		switch (color) {
			case 'Rouge Feu': return '#e73025';
			case 'Vert Gazon': return '#009f55';
			case 'Bleu Nuit': return '#231F6A';
			case 'Blanc': return '#CCCCCC';
			case 'Gris Souris': return '#CCCCCC';
			case 'Jaune Poussin': return '#FFBE00';
		}
	}

	displayProducts(container, datas) {
		for (let item of datas) {
			if (item.best == true) {
				container.appendChild(this.getArticle(item));
			}
		}
	}

	displayAllProducts(container, datas) {
		for (let item of datas) {
			container.appendChild(this.getArticle(item));
		}
	}
}