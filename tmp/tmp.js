// *** Import FUNCTIONS from JS file ***
import {
  fnGetDataFromLocalStorage,
  fnNumberFormat
} from '../scripts/ctrlAllData.js';
let addressShipping = ""       // Shhiping Adress (string): Global variable to have always this data in memory
let cartContent = []          // Content of the cart (array): Global variable to have always this data in memory
localStorage.setItem('sAddressShipping', "MEDELLÍN (Antioquia)");
cartContent = fnGetDataFromLocalStorage("aCartPrevious", true); // If the key is not in LS, it is created, else it gets its content
localStorage.setItem('aCartContent', JSON.stringify(cartContent))
const clDeliveryAddress = document.querySelector('.clDeliveryAddress');
// Antes de aquí no se necesita nada en el INDEX principal


const idBtnModalCartDetail = document.getElementById('idBtnModalCartDetail');      // Button that activates the detail modal with all product in the cart
const idUlItemsCartList = document.getElementById('idUlItemsCartList');            // UL container to paint all products in the cart
const idBtnToEmptyCartDetail  =document.getElementById('idBtnToEmptyCartDetail');  // Button to emty all items in the cart

idBtnModalCartDetail.click()

// Load the address shippment to show it
addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
clDeliveryAddress.innerHTML = addressShipping; // Puts the shippment address
//Load the content cart to show the list of items in the cart
cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
fnPaintCart(cartContent);

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


  console.log(fnGetDataFromLocalStorage("aCartContent", true))
  // idImgCartStatus.src = "images/cart-empty01.png";

  })
//
// Show all products that contains the cart and show  the options to empty to cart or to go to pay.
function fnPaintCart(oneList) {
  oneList.forEach(element => {
    const { id, name, url_image, unit } = element;
    idUlItemsCartList.innerHTML += `           
                    <li class="list-group-item">
                      <div id=${id} class="container-fluid row justify-content-center align-items-center">
                        <div class="col-12 col-sm-4 col-md-3 col-lg-3 p-0 m-0">
                          <img src="images/cart-empty03.png" width="50px"></img>
                        </div>
                        <div class="col-12 col-sm-4 col-md-3 col-lg-3 p-0 m-0">
                          <span class="lead">${name}</span>
                          <p class="h5">$99,999</p>
                        </div>
                        <div class="col-12 col-sm-4 col-md-2 col-lg-2 p-0 m-0">
                          <span class="lead">x 3 Lts.</span>
                        </div>
                        <div class="col-12 col-sm-4 col-md-1 col-lg-1">
                          <span id="" class="bg-transparent btn-dark">
                            <img class="mx-4 clBtnAddOneLess" src="./images/substract01.png" width="35" height="35">
                          </span>
                        </div>
                        <div class="col-12 col-sm-4 col-md-1 col-lg-1">
                          <p class="fs-4 fw-bold ms-3 text-center pt-3 clTheSpanWithAmountItems">1</p>
                        </div>
                        <div class="col-12 col-sm-4 col-md-1 col-lg-1">
                          <span id="" class="bg-transparent btn-dark">
                            <img class="mx-4 clBtnAddOneMore" src="./images/add01.png" width="35" height="35">
                          </span>
                        </div>
                      </div>
                    </li>
                  `
  });
}
