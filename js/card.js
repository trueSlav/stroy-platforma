'use strict'

const PRODUCT_INFORMATION_NOT_FOUND = `error, oh no :_(`;
const ERROR_SERVER = 'error serv';

const wrapper = document.querySelector('.wrapper');
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

		loadProductDetails(productsData);
		
	} catch (error) {
		console.log(`error, oh no :_( = "${error}"`);	
	}
}

function getParameterFromURL(parameter) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(parameter);
}

function loadProductDetails(data) {

	if (!data || !data.length) {
			showErrorMessage(ERROR_SERVER)
			return;
	}

	const productId = Number(getParameterFromURL('id'));

	if (!productId) {
			showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
			return;
	}

	const findProduct = data.find(card => card.id === productId);

	if(!findProduct) {
			showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
			return;
	}
	renderInfoProduct(findProduct);
}


function renderInfoProduct(product) {
	const { img, title, pdf, descr, inside } = product;
	
	let li = '';
	inside.forEach(element => {
		console.log(element);
		
		li +=
			`
			<a target="_blank" href="./data/catalog/${pdf}">
				<li>
					${element}
				</li>
			</a>
			`
	})

	const productItem = 
			`
			<div class="product">
					<h2 class="product__title">${title}</h2>

					<article>
					<div class="product__image-wrapper">
					<img src="./images/other/${img}" alt="${descr}">
					</div>
					<p class="product__descr">${descr}</p>
					<h1><a href="./data/catalog/${pdf}">ПРАЙС-ЛИСТ</a></h1>
					</article>

					<div class="product__list-wrapper">
						<h2>Каталог</h2>
						<ul class="product__list">
							${li}
						</ul>
					</div>

					
			</div>
			`
			wrapper.insertAdjacentHTML('beforeend', productItem);
}