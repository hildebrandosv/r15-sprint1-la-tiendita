// git config http.postBuffer 524288000
//╔════════════════════════════════════════════════╗
//║             MAIN JAVASCRIPT SCRIPT             ║
//╚════════════════════════════════════════════════╝
// *** Import GLOBAL DATA VARIABLES from JS file ***
import {
   urlProducts,
   urlCities
} from '../data/data.js';
//
// *** Import FUNCTIONS from JS file ***
import {
   fnGetTableOfDb,
   fnGetRecordOfTable,
   fnGetDataFromLocalStorage,
   fnNumberFormat
} from './ctrlAllData.js';
//
// *** CONSTANT definition ***
//
const idOffers = document.getElementById("idOffers");                         // Container of products in offer to displays the cards of these products
const idCitiesSelect = document.getElementById("idCitiesSelect");             // List (select tag) with cities to choose the shippment address
const idBtnSaveAddress = document.getElementById('idBtnSaveAddress');         // Botton to save the shipping address chosen
const idBtnCancelAddress = document.getElementById('idBtnCancelAddress')      // Botton to cancel the shipping address selection
const idBtnModAddressSh = document.getElementById('idBtnModAddressSh');       // Botton that activates the read modal of the shipping address
const idBtnModAddProdOffer = document.getElementById('idBtnModAddProdOffer'); // Button of modal to read the "SELECTED PRODUCT TO ADD TO CART". 
const idMsgItemAdded = document.getElementById('idMsgItemAdded');             // Message item added when a product is added to cart
const idAreaCartStatus = document.getElementById('idAreaCartStatus');          // Status cart area that contains image and text with amount items
const idImgCartStatus = document.getElementById('idImgCartStatus');            // Image in te status cart container
const idTxtCartStatus = document.getElementById('idTxtCartStatus');            // Texto in te status cart container with te amount of items in the cart
const idBtnAddToCart_ModalProdOfferToCart = document.getElementById('idBtnAddToCart_ModalProdOfferToCart'); // Btn. to add product to cart
const idBtnAddProdModCartEmpty = document.getElementById('idBtnAddProdModCartEmpty')  // Go to add more products in modal window when the cart is empty
//
// *** VARIABLES definition ***
let addressShiping = ""       // Shhiping Adress (string): Global variable to have always this data in memory
let cartContent = []          // Content of the cart (array): Global variable to have always this data in memory
let itemToAddToCart = {}       // Object to save the actual item to add to cart
//
// *********************************************
// ***           BEGIN MAIN MODULE           ***
// *********************************************
//
// Loads  initial data: In offer and most popular products. an improvement is puts the
// product than are not in offer products and neither are the most popular
window.addEventListener('DOMContentLoaded', e => {
   localStorage.setItem('aCartContent', JSON.stringify(cartContent));         // Cart contain initialize. It is a objects array with items object type
   localStorage.setItem('oItemToAddToCart', JSON.stringify(itemToAddToCart)); // Object with the last item selected to add to cart

   fnLoadOffers() // Puts the offer products
   //TODO:(habilitar esta lín)TODO: fnLoadCities() // Puts the Cities to select the shipping address and creates the key "sAddressShiping" in LS if not exists.
})

// Listens te event click in the status cart area
idAreaCartStatus.addEventListener('click', e => {
   e.preventDefault();
   alert()
})
idBtnAddProdModCartEmpty.addEventListener('click', e => {
   e.preventDefault();
   alert()
})

// Listens the event click in te container of the offers
idOffers.addEventListener("submit", async e => {
   e.preventDefault();
   // The TARGET of submit is a FORM, then the unique tag BOTTON is searched to know the ID to add to cart
   const btnSubmit = e.target.getElementsByTagName('button')[0];
   const id = btnSubmit.id; // Gets the ID to add to cart, this ID corresponding to ID of the button
   // If there is not a address to shipping, then this address is read in a modal of Bootstrap
   addressShiping = fnGetDataFromLocalStorage("sAddressShiping");  // To updates the global variable
   if (addressShiping === '') {
      //TODO: idBtnModAddressSh.click();   //TODO: habilitar esto que lle la dirección cuando dan click en agregar y no hay una dirección
   }
   // Open the modal to selected product with the information of these product
   fnLoadOneProduct(urlProducts, id)
})

// Listens the click in the modal to "SAVE" button the address selected to shipping.
idBtnSaveAddress.addEventListener('click', e => {
   e.preventDefault();
   const lCitySelected = (idCitiesSelect.selectedIndex > 0);
   if (lCitySelected) {
      const sAddressShiping = idCitiesSelect.options[idCitiesSelect.selectedIndex].text;
      localStorage.setItem('sAddressShiping', sAddressShiping);
      addressShiping = sAddressShiping;
   } else {
      alert("ℹ Recuerde que debe digitar la dirección de envío.")
   }
})
// Listens the click in the modal to "CANCEL" button the address selected to shipping.
idBtnCancelAddress.addEventListener('click', e => {
   e.preventDefault();
   const lCitySelected = (idCitiesSelect.selectedIndex > 0);
   if (!lCitySelected) {
      alert("ℹ Recuerde que debe digitar la dirección de envío.")
   }
})

//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
// GET promise to load ONE RECORD: Query only a product of the products in offer
async function fnLoadOneProduct(urlData, idKey) {
   // Local variables for the item to be added to the
   let nAmountItem = 1;
   let statusAmountAndUnit = "";
   // Get data and load object in variables. All the object is save in local storage to add it after in tyhe cart
   const element = await fnGetRecordOfTable(urlData, idKey) // Get the data to the selected product
   element.total_items = nAmountItem;                                 // Adds KEY/VALUE property to element with the product information, the acumulator of items by each product (Other form: "element[total_items]")
   localStorage.setItem('oItemToAddToCart', JSON.stringify(element));
   const { id, name, unit, price, url_image, most_popular, discount } = element;
   const price_net = Math.round(price * ((100 - discount) / 100));
   const idImgProdOffer = document.getElementById('idImgProdOffer');
   const idTmpName = document.getElementById('idModalDialogProdOfferToCart');
   const idPriceProdOffer = document.getElementById('idPriceProdOffer');
   // Load the data in each HTML element.
   idImgProdOffer.src = element.url_image;
   idTmpName.innerHTML = element.name;
   idPriceProdOffer.innerHTML = fnNumberFormat(price_net, '$') + ' /' + unit;
   // Open the modal with te info
   idBtnModAddProdOffer.click();
   // Listens CLICK in the add or substract buttons, to increase or decrease the amount needed
   const idSubstractOne = document.getElementById('idSubstractOne');
   const idAddOne = document.getElementById('idAddOne');
   const idAmountToCart = document.getElementById('idAmountToCart');
   statusAmountAndUnit = fnNumberFormat(nAmountItem) + ' /' + unit;
   idAmountToCart.innerHTML = statusAmountAndUnit;
   idSubstractOne.addEventListener('click', e => { // Substract 1 with "-" button
      e.preventDefault();
      nAmountItem += -1;
      nAmountItem <= 0 ? nAmountItem = 1 : nAmountItem
      idAmountToCart.innerHTML = fnNumberFormat(nAmountItem) + ' /' + unit;
      // Save to KEY "total_items" updated in the local storage
      element.total_items = nAmountItem;                                 // Adds KEY/VALUE property to element with the product information, the acumulator of items by each product (Other form: "element[total_items]")
      localStorage.setItem('oItemToAddToCart', JSON.stringify(element));
   })
   idAddOne.addEventListener('click', e => { // Add 1 with "+" button
      e.preventDefault();
      nAmountItem += 1;
      idAmountToCart.innerHTML = fnNumberFormat(nAmountItem) + ' /' + unit;
      // Save to KEY "total_items" updated in the local storage
      element.total_items = nAmountItem;                                 // Adds KEY/VALUE property to element with the product information, the acumulator of items by each product (Other form: "element[total_items]")
      localStorage.setItem('oItemToAddToCart', JSON.stringify(element));
   })
}
//
// The next ADD EVENT LISTENER is to add the actual item to cart in offer products
idBtnAddToCart_ModalProdOfferToCart.addEventListener('click', e => {
   e.preventDefault();
   const oItemToAddToCart = fnGetDataFromLocalStorage("oItemToAddToCart", true); // If the key is not in LS, it is created, else it gets its content

// console.log("cant: ",oItemToAddToCart.total_items)

   fnUpdateCart(oItemToAddToCart);  // Update the cart in Local Storage and te container status in el HTML. An improvment may be to use a table in the DB to storage the cart.
   location.hash = '#idMsgItemAdded';
   idMsgItemAdded.classList.remove('d-none')
   setTimeout(() => {
      idMsgItemAdded.classList.add('d-none')
   }, 3000);
})
//
// Updates the cart with the selected elements
function fnUpdateCart(element) {
   cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
   let indexFound = cartContent.findIndex(item => item.id === element.id)
   if (indexFound < 0) {  // If do not exists, the "total_items" property is created
      cartContent.push(element);
      indexFound = cartContent.length - 1;
      console.log('element(IF) ',element)
   } else {
      const nItemsOfTheProduct= element.total_items;
      cartContent[indexFound].total_items += nItemsOfTheProduct;
   }
   const nAmountItems = cartContent.length;
   localStorage.setItem('aCartContent', JSON.stringify(cartContent));
   idImgCartStatus.src = "images/cart-full01.png";
   idTxtCartStatus.innerHTML = fnNumberFormat(nAmountItems);
}
//
// GET promise to load ALL TABLE data: Content generation of the products in offer
async function fnLoadOffers() {
   // Extracts only elements in offer
   const aProducts = (await fnGetTableOfDb(urlProducts)).filter(element => element.discount > 0)
   aProducts.forEach(element => {
      // Unstructured every data record (an object) to puts in the individual values with te same name of the object "key"
      const { id, name, unit, price, stock, min_stock, max_stock, description, url_image, most_popular, discount } = element;
      const price_net = Math.round(price * ((100 - discount) / 100));
      const price_format = fnNumberFormat(price);
      const price_net_format = fnNumberFormat(price_net);
      // Fills the container with products in offer
      const url_IMAGE = "./images/vegetables01.png";   // TODO: quitar esto y reemplazar la variable del objeto más abajo TODO: 
      idOffers.innerHTML += `
                        <div class="card position-relative fst-italic" style="width: 350px; min-width: 350px;" data-id=${id}>
                           <div id="idDiscount" class="position-absolute rounded-pill m-2 clBg-secondary2">
                              <span id="idOffers-discount-percentage"
                                 class="fs-5 fw-bolder ps-2 pb-3 bg-gradient clCol-txt-discount">${discount}%</span>
                              <span class="h6 me-2 bg-gradient clCol-txt-discount">dcto.</span>
                           </div>
                           <img id="idOffers-img" src="${url_IMAGE}"
                           class="card-img-top" alt="...">
                           <div class="card-body">
                              <div class="d-flex">
                                 <h3 id="idOffers-price-net" class="card-title fw-bold">
                                    $${price_net_format}<span id="idOffers-unit-pn" class="fw-normal">/${unit}</span>
                                 </h3>
                                 <h5 class="card-title text-secondary ms-auto">
                                    <span class="fs-6 fst-italic fw-bolder text-success">Antes: </span>
                                    <span id="idOffers-price-prev" class="fs-4">
                                    $${price_format}<span id="idOffers-unit-pp"></span>
                                    </span>
                                 </h5>
                              </div>
                              <h3 id="idOffers-name" class="text-muted my-2">${name}</h3>
                              <p id="idOffers-det" class="card-text"></p>
                              <form>
                                 <button id="${id}" type="submit" class="btn w-100 fs-4 text-white clCol-btn1">Agregar</button>
                              </form>
                           </div>
                        </div>`
   })
}

// Content generation of the cities to choose to shippment
async function fnLoadCities() {
   // Gets the cities of the DB
   const aCities = await fnGetTableOfDb(urlCities);
   // Verify if the last shipping address selected exits to show it selected in the list. If not exists, then initializates the key in empty.
   const sAddressShiping = fnGetDataFromLocalStorage("sAddressShiping");
   const nIndexCurrentCity = aCities.findIndex(element => element.city.toUpperCase().trim() === sAddressShiping.toUpperCase().trim());
   if (nIndexCurrentCity < 0) {
      localStorage.setItem('sAddressShiping', "");
   }
   addressShiping = sAddressShiping;    // To always charge thr cities, then updates the global variable
   // Fills the list with the cities to select the shipping address
   idCitiesSelect.innerHTML = `<option ${nIndexCurrentCity < 0 ? "selected" : ""}><span>🛃</span>Elija una dirección...</option>`;
   aCities.forEach((element, index) => {
      idCitiesSelect.innerHTML += `<option value="${element.id}" ${index == nIndexCurrentCity ? "selected" : ""}><span>🛃</span>${element.city}</option>`;
   })
}
