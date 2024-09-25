'use strict'

const page = document.body;
const mobileBtn = document.querySelector('.nav-mobile');
const mobileMenu = document.querySelector('.movie-block')
const mobileMenuLink = document.querySelectorAll('.active-list-item');

mobileBtn.addEventListener('click', (e) => {
	mobileMenu.classList.toggle('active-mob');
	if(mobileMenu.classList.contains('active-mob')){
		page.style.overflow = 'hidden';
	} else {
		page.style.overflow = 'auto';
	}
});

mobileMenuLink.forEach(item => {
	item.addEventListener('click', (e) => {
		mobileMenu.classList.remove('active-mob');
		page.style.overflow = 'auto';
	})
})


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
		const { id, img, title, descr} = card;
		const cardItem = 
				`
					<li class="product__item" data-product-id="${id}">
						<a href="./card.html?id=${id}">
							<div class="product-image-wrapper">
								<img src="./images/other/${img}"
									alt="${descr}" class="product__card-image">
							</div>
							<p class="product__card-description">${title}</p>
							<p class="product__next"><span>Подробнее</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></p>
						</a>
					</li>
				`
		cardsList.insertAdjacentHTML('beforeend', cardItem);
	});
}