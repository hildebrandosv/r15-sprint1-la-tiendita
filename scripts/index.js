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
const idBtnSaveAddress = document.getElementById('idBtnSaveAddress');         // Button to save the shipping address chosen
const idBtnCancelAddress = document.getElementById('idBtnCancelAddress')      // Button to cancel the shipping address selection
const idBtnModAddressSh = document.getElementById('idBtnModAddressSh');       // Button that activates the read modal of the shipping address
const idBtnModAddProdOffer = document.getElementById('idBtnModAddProdOffer'); // Button of modal to read the "SELECTED PRODUCT TO ADD TO CART". 
const idMsgItemAdded = document.getElementById('idMsgItemAdded');             // Message item added when a product is added to cart
const idAreaCartStatus = document.getElementById('idAreaCartStatus');         // Status cart area that contains image and text with amount items
const idImgCartStatus = document.getElementById('idImgCartStatus');           // Image in te status cart container
const idTxtCartStatus = document.getElementById('idTxtCartStatus');           // Texto in te status cart container with te amount of items in the cart
const idBtnAddToCart_ModalProdOfferToCart = document.getElementById('idBtnAddToCart_ModalProdOfferToCart'); // Btn. to add product to cart
const idBtnModalCartEmpty = document.getElementById('idBtnModalCartEmpty')    // Botton that activates the modal of empty cart
const idBtnAddProdModCartEmpty = document.getElementById('idBtnAddProdModCartEmpty')  // Go to add more products in modal window when the cart is empty
const idBtnModalCartDetail = document.getElementById('idBtnModalCartDetail');      // Button that activates the detail modal with all product in the cart
const idUlItemsCartList = document.getElementById('idUlItemsCartList');            // UL container to paint all products in the cart
const idBtnToEmptyCartDetail = document.getElementById('idBtnToEmptyCartDetail');  // Button to emty all items in the cart
const idTotalToPayCartDetail = document.getElementById('idTotalToPayCartDetail');  // SPAN that shows the total to pay in the main button
const idDeliveryAddressCartDetail = document.getElementById('idDeliveryAddressCartDetail');
const idDeliveryAddressCartEmpty = document.getElementById('idDeliveryAddressCartEmpty');

const idBtnGoToPayCartDetail = document.getElementById('idBtnGoToPayCartDetail');   // Button to go to pay when the cart deatil is displayed
const idContainerForm01 = document.getElementById('idContainerForm01');             // Container of the pay form
const idReturnToPay = document.getElementById('idReturnToPay');                     // Link to return to watch the cart detail
const idForm01 = document.getElementById('idForm01');                               // The pay form
const idTotalToPayForm = document.getElementById('idTotalToPayForm');               // SPAN tag in button to definitive pay fron pay form that contains the total to pay

const idBtnToPayForm = document.getElementById('idBtnToPayForm'); // Button to go to pay in the pay form
const idVisaCard = document.getElementById('idVisaCard'); // Image this credit card to go to pay in the pay form
const idMasterCard = document.getElementById('idMasterCard'); // Image this credit card to go to pay in the pay form
const idAmexCard = document.getElementById('idAmexCard'); // Image this credit card to go to pay in the pay form
const idDinersCard = document.getElementById('idDinersCard'); // Image this credit card to go to pay in the pay form
const idBtnModalMsgPurchaseOk = document.getElementById('idBtnModalMsgPurchaseOk'); // Button that ends the purchase
const idBtnEndsPurchase = document.getElementById('idBtnEndsPurchase'); // Button to continue buying after to pay te purchase with success

// CRUD
const ul = document.querySelector('.clCrud');

const idCrudProducts = document.getElementById('idCrudProducts');
idCrudProducts.addEventListener('click', e => {
   // fnLoadProducts();
})

// End: CRUD


//
// *** VARIABLES definition ***
let addressShipping = ""      // Shhiping Adress (string): Global variable to have always this data in memory
let cartContent = []          // Content of the cart (array): Global variable to have always this data in memory
let itemToAddToCart = {}      // Object to save the actual item to add to cart
let sCardSrcImage = ""        // Storages the URL ("src" property) of card selected

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
   //TODO:(habilitar esta lín)TODO: fnLoadCities() // Puts the Cities to select the shipping address and creates the key "sAddressShipping" in LS if not exists.

   fnLoadProducts();
})

// Listens te event click in the status cart area
idAreaCartStatus.addEventListener('click', e => {
   e.preventDefault();
   cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
   if (cartContent.length === 0) {
      idImgCartStatus.src = "images/cart-empty01.png";
      idBtnAddProdModCartEmpty.addEventListener('click', e => {
         e.preventDefault();
         window.location.href = '#idProdOfferToCartContainer';
      })
      // Load the address shippment to show it
      addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
      idDeliveryAddressCartEmpty.innerHTML = addressShipping; // Puts the shippment address
      idBtnModalCartEmpty.click();
   }
   else {
      // Activates the button to go to pay becouse before was deactivate when the pay form is shown.
      idBtnGoToPayCartDetail.classList.remove('d-none');
      idBtnToEmptyCartDetail.classList.remove('d-none');
      // Opens to cart detail modal
      idBtnModalCartDetail.click()
      // Load the address shippment to show in te detail cart
      addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
      idDeliveryAddressCartDetail.innerHTML = addressShipping; // Puts the shippment address
      //Load the content cart to show the list of items in the cart
      cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
      fnPaintCart(cartContent);
   }
})
//
// LISTENER to add or substract items when the cart detail is displayed
idUlItemsCartList.addEventListener('click', async (e) => {
   const btnSubstract = e.target.classList.contains('clBtnAddOneLess');
   const btnAdd = e.target.classList.contains('clBtnAddOneMore');
   const containerOfLiItem = e.target.parentNode.parentNode.parentNode; // DIV that contains the LI to an item.
   if (btnSubstract || btnAdd) {
      const clAmountItemsInCart = containerOfLiItem.querySelector('.clTheSpanWithAmountItems'); // SPAN with the amount of items
      let nAmountItems = Number(clAmountItemsInCart.innerHTML);
      if (btnSubstract) {
         nAmountItems > 0 ? nAmountItems -= 1 : 0;
      }
      else {
         nAmountItems += 1;
      }
      clAmountItemsInCart.innerHTML = nAmountItems;
      // Rewrite the cart array in the LS with the modificaión of the item
      const id = containerOfLiItem.id;       // ID to find the item in the cart and updates in the local storage inmediatly
      cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
      const indexFound = cartContent.findIndex(item => item.id === id)
      if (indexFound >= 0) {
         cartContent[indexFound].total_items = nAmountItems;
         localStorage.setItem('aCartContent', JSON.stringify(cartContent))
      }
   } // End: if "btnSubstract" or "btnAdd" are "true"
})
//
// LISTENER to empty the all cart
idBtnToEmptyCartDetail.addEventListener('click', e => {
   cartContent = []; // Cart is initialized in empty
   localStorage.setItem('aCartContent', JSON.stringify(cartContent))
   idImgCartStatus.src = "images/cart-empty01.png";
})
//
// Listens the event click in te container of the offers
idOffers.addEventListener("submit", async e => {
   e.preventDefault();
   // The TARGET of submit is a FORM, then the unique tag BOTTON is searched to know the ID to add to cart
   const btnSubmit = e.target.getElementsByTagName('button')[0];
   const id = btnSubmit.id; // Gets the ID to add to cart, this ID corresponding to ID of the button
   // If there is not a address to shipping, then this address is read in a modal of Bootstrap
   addressShipping = fnGetDataFromLocalStorage("sAddressShipping");  // To updates the global variable
   if (addressShipping === '') {
      //TODO: idBtnModAddressSh.click();   //TODO: habilitar esto que lle la dirección cuando dan click en agregar y no hay una dirección
   }
   // Open the modal to selected product with the information of these product
   fnLoadOneProduct(urlProducts, id)
})
//
// Listens the click in the modal to "SAVE" button the address selected to shipping.
idBtnSaveAddress.addEventListener('click', e => {
   e.preventDefault();
   const lCitySelected = (idCitiesSelect.selectedIndex > 0);
   if (lCitySelected) {
      const sAddressShipping = idCitiesSelect.options[idCitiesSelect.selectedIndex].text;
      localStorage.setItem('sAddressShipping', sAddressShipping);
      addressShipping = sAddressShipping;
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
// The next ADD EVENT LISTENER is to add the actual item to cart in offer products
idBtnAddToCart_ModalProdOfferToCart.addEventListener('click', e => {
   e.preventDefault();
   const oItemToAddToCart = fnGetDataFromLocalStorage("oItemToAddToCart", true); // If the key is not in LS, it is created, else it gets its content
   fnUpdateCart(oItemToAddToCart);  // Update the cart in Local Storage and te container status in el HTML. An improvment may be to use a table in the DB to storage the cart.
   location.hash = '#idMsgItemAdded';
   idMsgItemAdded.classList.remove('d-none')
   setTimeout(() => {
      idMsgItemAdded.classList.add('d-none')
   }, 1000);
})
// The next ADD EVENT LISTENER is to go to pay form
idBtnGoToPayCartDetail.addEventListener('click', e => {
   // Deactivates the boton to go to pay becouse go to pay form
   idBtnGoToPayCartDetail.classList.add('d-none');
   idBtnToEmptyCartDetail.classList.add('d-none');
   // Show pay form
   idContainerForm01.classList.remove('d-none');
   idTotalToPayForm.innerHTML = idTotalToPayCartDetail.innerHTML;  // Puts the total to pay in the pay buton of the form and is the same total that has in the "Ir a pagar"
})
// The next ADD EVENT LISTENER is to return to show the cart detail when the pay form is displayed
idReturnToPay.addEventListener('click', e => {
   // Activates the boton to go to pay becouse return from pay form
   idBtnGoToPayCartDetail.classList.remove('d-none');
   idBtnToEmptyCartDetail.classList.remove('d-none');
   // Hide pay form
   idContainerForm01.classList.add('d-none');
})
// Listener in the all inputs of form of the credit card
idForm01.addEventListener('input', e => {
   const oInputsForm = fnInputsValidate('url_image', sCardSrcImage);  // Creates Key|Value to image URL  of the credit cart selected
   const lThereIsError = Object.keys(oInputsForm).length === 0;
   if (lThereIsError) idBtnToPayForm.disabled = true
   else idBtnToPayForm.disabled = false;
})
// Listener in the all inputs of form of the credit card. This is specificaly to capture the card image
idForm01.addEventListener('mousemove', e => {
   const oInputsForm = fnInputsValidate('url_image', sCardSrcImage);  // Creates Key|Value to image URL  of the credit cart selected
   const lThereIsError = Object.keys(oInputsForm).length === 0;
   if (lThereIsError) idBtnToPayForm.disabled = true
   else idBtnToPayForm.disabled = false;
})
// Listener SUBMIT of form to do the final pay
idForm01.addEventListener('submit', e => {
   e.preventDefault();
   idTxtCartStatus.innerHTML = 0;
   idBtnModalMsgPurchaseOk.click();
})
// Listener CLICK in the button that ends the purchase an reset all data cart
idBtnEndsPurchase.addEventListener('click', e => {
   idContainerForm01.classList.add('d-none');  // Hide pay form
   idForm01.reset();                           // Cleans the inputs form
   cartContent = [];                           // Cart is initialized in empty
   sCardSrcImage= "";                          // Url (src) of the credit card in empty
   localStorage.setItem('aCartContent', JSON.stringify(cartContent))
   idImgCartStatus.src = "images/cart-empty01.png";
   window.location.href = '#idProdOfferToCartContainer';
})
// LISTENER to card credit image selected
idVisaCard.addEventListener('click', e => { fnShowCreditCardSelected(idVisaCard.src, 'VISA') })
idMasterCard.addEventListener('click', e => { fnShowCreditCardSelected(idMasterCard.src, 'MASTER') })
idAmexCard.addEventListener('click', e => { fnShowCreditCardSelected(idAmexCard.src, 'AMEX') })
idDinersCard.addEventListener('click', e => { fnShowCreditCardSelected(idDinersCard.src, 'DINERS') })


//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
//
// Function that load te inputs form in an object. If at least one file is not selected, returns empty, else, 
// return the object with all fields in pair "key:value", where the "key" is the name of the input in the form.
function fnInputsValidate(otherKey_SrcImage, otherVal_SrcImage) {
   let oWithAllInputs = {}  // Data object with the credit card data of to do the pay
   const lstInputs = document.getElementsByClassName("form-control")
   oWithAllInputs[lstInputs[1].name] = lstInputs[1].value; // This case: email
   oWithAllInputs[lstInputs[2].name] = lstInputs[2].value; // This case: tc_number 
   oWithAllInputs[lstInputs[3].name] = lstInputs[3].value; // This case: expires
   oWithAllInputs[lstInputs[4].name] = lstInputs[4].value; // This case: cvv
   oWithAllInputs[lstInputs[5].name] = lstInputs[5].value; // This case: name
   // Adds Key|Value pair to input objects of the form (the pair arrives in the parameter)
   oWithAllInputs[otherKey_SrcImage] = otherVal_SrcImage;
   // Finds any field that is empty
   const aAllValuesOfAllInputs = Object.values(oWithAllInputs);

console.log('oWithAllInputs ',oWithAllInputs)

   let lThereIsAtLeastOneEmpty = (aAllValuesOfAllInputs.indexOf('') >= 0);
   if (lThereIsAtLeastOneEmpty) return {};
   else return (oWithAllInputs);
}
// Function to put the back ground color to credit card image selected
function fnShowCreditCardSelected(sSrc, sFranchiseCard) {
   sCardSrcImage = sSrc;      // Load this variable that is GLOBAL '#fff'
   idVisaCard.style.background = '#fff'
   idMasterCard.style.background = '#fff'
   idAmexCard.style.background = '#fff'
   idDinersCard.style.background = '#fff'
   switch (sFranchiseCard) {
      case 'VISA':
         idVisaCard.style.background = '#e6e6e6'
         break;
      case 'MASTER':
         idMasterCard.style.background = '#e6e6e6'
         break;
      case 'AMEX':
         idAmexCard.style.background = '#e6e6e6'
         break;
      case 'DINERS':
         idDinersCard.style.background = '#e6e6e6'
         break;
   }
}
// Show all products that contains the cart and show  the options to empty to cart or to go to pay.
function fnPaintCart(oneList) {
   let nTotalToPay = 0;
   const nDiferentItemsTotal = oneList.length;
   const idDifferentItemsTotalInCartDetail = document.getElementById('idDifferentItemsTotalInCartDetail');
   idDifferentItemsTotalInCartDetail.innerHTML = nDiferentItemsTotal;
   idUlItemsCartList.innerHTML = "";  // Deletes the container with items and rewrite it
   oneList.forEach(element => {
      const { id, name, url_image, unit, total_items, price, discount } = element;
      // Calculates the totals
      const price_net = Math.round(price * ((100 - discount) / 100));
      nTotalToPay = total_items * price_net;
      idTotalToPayCartDetail.innerHTML = fnNumberFormat(nTotalToPay, '$');
      // Paints each item whit its data line (a LI tag) per line (a LI tag)
      idUlItemsCartList.innerHTML += `
                     <li class="list-group-item">
                       <div id=${id} class="container-fluid row justify-content-center align-items-center">
                         <div class="col-12 col-sm-4 col-md-3 col-lg-3 p-0 m-0">
                           <img src=${url_image} width="50px"></img>
                         </div>
                         <div class="col-12 col-sm-4 col-md-3 col-lg-3 p-0 m-0">
                           <span class="lead">${name}</span>
                           <p class="h5">${fnNumberFormat(price_net, '$')}</p>
                         </div>
                         <div class="col-12 col-sm-4 col-md-2 col-lg-2 p-0 m-0">
                           <span class="lead">x ${unit}</span>
                         </div>
                         <div class="col-12 col-sm-4 col-md-1 col-lg-1">
                           <span id="" class="bg-transparent btn-dark">
                             <img class="mx-2 clBtnAddOneLess" src="./images/substract01.png" width="30" height="30">
                           </span>
                         </div>
                         <div class="col-12 col-sm-4 col-md-1 col-lg-1 text-center">
                           <p class="fs-4 fw-bold ms-3 text-center pt-3 clTheSpanWithAmountItems">1</p>
                         </div>
                         <div class="col-12 col-sm-4 col-md-1 col-lg-1">
                           <span id="" class="bg-transparent btn-dark">
                             <img class="mx-2 clBtnAddOneMore" src="./images/add01.png" width="30" height="30">
                           </span>
                         </div>
                       </div>
                     </li>
                   `
   });
}
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
// Updates the cart with the selected elements
function fnUpdateCart(element) {
   cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
   let indexFound = cartContent.findIndex(item => item.id === element.id)
   if (indexFound < 0) {  // If do not exists, the "total_items" property is created
      cartContent.push(element);
      indexFound = cartContent.length - 1;
   } else {
      const nItemsOfTheProduct = element.total_items;
      cartContent[indexFound].total_items += nItemsOfTheProduct;
   }
   const nAmountItems = cartContent.length;
   localStorage.setItem('aCartContent', JSON.stringify(cartContent));
   localStorage.setItem('aCartPrevious', JSON.stringify(cartContent));
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
      const { id, name, unit, price, url_image, most_popular, discount } = element;
      const price_net = Math.round(price * ((100 - discount) / 100));
      const price_format = fnNumberFormat(price);
      const price_net_format = fnNumberFormat(price_net);
      // Fills the container with products in offer
      idOffers.innerHTML += `
                        <div class="card position-relative fst-italic" style="width: 350px; min-width: 350px;" data-id=${id}>
                           <div id="idDiscount" class="position-absolute rounded-pill m-2 clBg-secondary2">
                              <span id="idOffers-discount-percentage"
                                 class="fs-5 fw-bolder ps-2 pb-3 bg-gradient clCol-txt-discount">${discount}%</span>
                              <span class="h6 me-2 bg-gradient clCol-txt-discount">dcto.</span>
                           </div>
                           <img id="idOffers-img" src="${url_image}" class="card-img-top" width="80" height="300" >
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
   const sAddressShipping = fnGetDataFromLocalStorage("sAddressShipping");
   const nIndexCurrentCity = aCities.findIndex(element => element.city.toUpperCase().trim() === sAddressShipping.toUpperCase().trim());
   if (nIndexCurrentCity < 0) {
      localStorage.setItem('sAddressShipping', "");
   }
   addressShipping = sAddressShipping;    // To always charge thr cities, then updates the global variable
   // Fills the list with the cities to select the shipping address
   idCitiesSelect.innerHTML = `<option ${nIndexCurrentCity < 0 ? "selected" : ""}><span>🛃</span>Elija una dirección...</option>`;
   aCities.forEach((element, index) => {
      idCitiesSelect.innerHTML += `<option value="${element.id}" ${index == nIndexCurrentCity ? "selected" : ""}><span>🛃</span>${element.city}</option>`;
   })
}
//
// CRUD Productos: "GET" promise to load ALL TABLE data to CRUD
async function fnLoadProducts() {
   const aProducts = await fnGetTableOfDb(urlProducts);
   ul.innerHTML= '';
   aProducts.forEach(element => {
      // Unstructured every data record (an object) to puts in the individual values with te same name of the object "key"
      const { id, name, unit, price, url_image, most_popular, discount } = element;
      const price_net = Math.round(price * ((100 - discount) / 100));
      const price_format = fnNumberFormat(price);
      const price_net_format = fnNumberFormat(price_net);
      // Fills the container with products in offer
      ul.innerHTML += `
                      <li class="list-group-item">
                          <div class="container-fluid align-items-center row">
                              <div class= "col-12 col-sm-3 col-md-4 p-0 m-0">
                                  <span class="lead">${name}</span>
                              </div>
                              <div class= "col-12 col-sm-1 col-md-2 p-0 m-0">
                                  <img src=${url_image} width="50px"></img>
                              </div>
                              <div class= "col-12 col-sm-3 col-md-4 p-0 m-0">
                                 <p class="lead text-center">${price_format}</p>
                                 <p class="lead text-center">${unit}</p>
                              </div>

                              <div class= "col-12 col-sm-2 col-md-2">
                                 <button id=${id} 
                                         class="btn btn-dark fs-5 btm-sm float-end clBtnDelete">
                                    Borrar
                                 </button>
                              </div>
                          </div>
                      </li>
                      `
  });

}
// CRUD Products: "DELETE" promise to load ALL TABLE data to CRUD
ul.addEventListener('click', async (e) => {
   const btnEliminar = e.target.classList.contains('clBtnDelete');
   if (btnEliminar === true) {
       const id = e.target.id;
       const responseFetch = await fetch(urlProducts + id, {
           method: 'DELETE'
       })
      //  await fnLoadProducts();
       const dataJson = await responseFetch.json()
       console.log(dataJson)
   }
})
