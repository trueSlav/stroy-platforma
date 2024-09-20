'use strict'

const cardsList = document.querySelector('.product__list');
let productsData = [];

getProducts();
// получить данные с сервера

async function getProducts() {
	try {
		if(!productsData.length) {
			const res = await fetch('./data/product.json');
			if(!res.ok) {
				throw new Error(res.statusText);
			}
			productsData = await res.json();
		}
		console.log(productsData);
		renderStartPage(productsData);
		
	} catch (error) {
		console.log(`error, oh no :_( = "${error}"`);	
	}
}

function renderStartPage(data) {
	if(!data.length || !data){
		console.log('error data is false');
		return
	}
	createCard(data);
}

// создаем карточку
function createCard(data) {
	data.forEach(card => {
		const { id, img, title, price, discount } = card;
		const cardItem = 
				`
					<li class="product__item" data-product-id="${id}">
						<a href="/card.html?id=${id}">
							<div class="product-image-wrapper">
								<img src="./images/other/${img}"
									alt="квадратные бревна сложенны друг на друга" class="product__card-image">
							</div>
							<p class="product__card-description">${title}</p>
							<p class="product__next">Подробнее </p>
						</a>
					</li>
				`
		cardsList.insertAdjacentHTML('beforeend', cardItem);
	});
}