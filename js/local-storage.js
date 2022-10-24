const getInputValueById = (id) => {
	const inputField = document.getElementById(id);
	const inputValue = inputField.value;
	inputField.value = "";
	return inputValue;
};

const addProduct = () => {
	const productName = getInputValueById("productName");
	const productQuantity = getInputValueById("productQuantity");
	displayProduct(productName, productQuantity);

	//set to local storage
	saveProductToLocalStorage(productName, productQuantity);
};

//Get shopping cart from local storage if exists
const getShoppingCartFromLocalStorage = () => {
	//get the cart from local storage if exists
	let saveCart = localStorage.getItem("cart");
	//return empty object if not exists
	let cart = {};
	//check if cart exists and parse into javascript object
	if (saveCart) {
		cart = JSON.parse(saveCart);
	}
	return cart;
};

//Save item to local storage
const saveProductToLocalStorage = (productName, productQuantity) => {
	//get the cart from local storage
	const cart = getShoppingCartFromLocalStorage();
	//Add product to object as property
	cart[productName] = productQuantity;
	localStorage.setItem("cart", JSON.stringify(cart));
};

const displayProduct = (productName, productQuantity) => {
	const allProduct = document.getElementById("all-product");
	console.log(allProduct);
	const li = document.createElement("li");
	li.classList.add("list-group-item");
	li.innerText = `${productName} : ${productQuantity}`;
	allProduct.appendChild(li);
};

const displayLocalStorageProduct = () => {
	//get the cart from local storage first, which will an object
	const cart = getShoppingCartFromLocalStorage();
	//loop through the cart and get the value by key and displayProduct to UI
	for (const product in cart) {
		const quantity = cart[product];
		displayProduct(product, quantity);
	}
};

displayLocalStorageProduct();
