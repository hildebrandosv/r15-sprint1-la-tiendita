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
   fnGetDataFromLocalStorage
} from './ctrlAllData.js';
//
// *** CONSTANT definition ***
//
const idOffers = document.getElementById("idOffers");                   // Container of products in offer to displays the cards of these products
const idCitiesSelect = document.getElementById("idCitiesSelect");       // List (select tag) with cities to choose the shippment address
const idBtnSaveAddress = document.getElementById('idBtnSaveAddress');   // Botton to save the shipping address chosen
const idBtnModAddressSh =document.getElementById('idBtnModAddressSh');  // Botton that activates the read modal of the shipping address
//
// *** VARIABLES definition ***
let addressShiping = ""          // Shhiping Adress: Global variable to have always this data in memory
//
// *********************************************
// ***           BEGIN MAIN MODULE           ***
// *********************************************
//
// Loads  initial data: In offer and most popular products. an improvement is puts the
// product than are not in offer products and neither are the most popular
window.addEventListener('DOMContentLoaded', e => {
   fnLoadOffers() // Puts the offer products
   fnLoadCities() // Puts the Cities to select the shipping address and creates the key "sAddressShiping" in LS if not exists.
   // TODO: // Puts the most popular products
})

// Listens the event click in te container of the offers
idOffers.addEventListener("submit", e => {
   e.preventDefault();
   // The TARGET of submit is a FORM, then the unique tag BOTTON is searched to know the ID to add to cart
   const btnSubmit = e.target.getElementsByTagName('button')[0];
   const id = btnSubmit.id; // Gets the ID to add to cart, this ID corresponding to ID of the button
   // If there is not a address to shipping, then this address is read in a modal of Bootstrap
   addressShiping= fnGetDataFromLocalStorage("sAddressShiping");  // To updates the global variable
   if (addressShiping === '') {
    idBtnModAddressSh.click();
   }
})

// Listens the click in the modal to save the address selected to shipping.
idBtnSaveAddress.addEventListener('click', e => {
   e.preventDefault();
   const lCitySelected = (idCitiesSelect.selectedIndex > 0);
   if (lCitySelected) {
      const sAddressShiping = idCitiesSelect.options[idCitiesSelect.selectedIndex].text;
      localStorage.setItem('sAddressShiping', sAddressShiping);
   } else {
      alert("ℹ Recuerde que debe digitar la dirección de envío.")
   }
})

//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
//
// Content generation of the products in offer
async function fnLoadOffers() {
   // Extracts only elements in offer
   const aProducts = (await fnGetTableOfDb(urlProducts)).filter(element => element.discount > 0)
   aProducts.forEach(element => {
      // Unstructured every data record (an object) to puts in the individual values with te same name of the object "key"
      const { id, name, unit, price, stock, min_stock, max_stock, description, url_image, most_popular, discount } = element;
      const price_net = Math.round(price * ((100 - discount) / 100));
      const price_format = price.toString().substr(0, price.toString().length - 3) + (price.length > 3 ? "," : "") + price.toString().substr(-3);
      const price_net_format = price_net.toString().substr(0, price_net.toString().length - 3) + (price_net.length > 3 ? "," : "") + price_net.toString().substr(-3);
      // Fills the container with products in offer
      idOffers.innerHTML += `
                        <div class="card position-relative fst-italic" style="width: 350px; min-width: 350px;" data-id=${id}>
                           <div id="idDiscount" class="position-absolute rounded-pill m-2 clBg-secondary2">
                              <span id="idOffers-discount-percentage"
                                 class="fs-5 fw-bolder ps-2 pb-3 bg-gradient clCol-txt-discount">${discount}%</span>
                              <span class="h6 me-2 bg-gradient clCol-txt-discount">dcto.</span>
                           </div>
                           <img id="idOffers-img" src="${url_image}"
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
   const sAddressShiping= fnGetDataFromLocalStorage("sAddressShiping");
   const nIndexCurrentCity=  aCities.findIndex(element => element.city.toUpperCase().trim() === sAddressShiping.toUpperCase().trim());
   if (nIndexCurrentCity < 0) {
      localStorage.setItem('sAddressShiping', "");
   }
   addressShiping= sAddressShiping;    // To always charge thr cities, then updates the global variable
   // Fills the list with the cities to select the shipping address
   idCitiesSelect.innerHTML= `<option ${nIndexCurrentCity < 0 ? "selected" : ""}><span>🛃</span>Elija una dirección...</option>`;
   aCities.forEach( (element, index) => {
      idCitiesSelect.innerHTML += `<option value="${element.id}" ${index == nIndexCurrentCity ? "selected" : ""}><span>🛃</span>${element.city}</option>`;
   })
}
