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
const ul = document.querySelector('.list-group');

//=================*****************=======================
// Antes de aquí no se necesita nada en el INDEX principal


const idBtnModalCartDetail = document.getElementById('idBtnModalCartDetail');  // Button that activates the detail modal with all product in the cart
const idUlItemsCartList = document.getElementById('idUlItemsCartList');        // UL container to paint all products in the cart

idBtnModalCartDetail.click()

// Load the address shippment to show in te detail cart
addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
clDeliveryAddress.innerHTML = addressShipping; // Puts the shippment address
//Load the content cart to show the list of items in the cart
cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
fnPaintCart(cartContent);



idUlItemsCartList.addEventListener('click', async (e) => {
  const btnSubstract = e.target.classList.contains('clBtnAddOneLess');
  const btnAdd = e.target.classList.contains('clBtnAddOneMore');
  if (btnSubstract === true || btnAdd === true) {
    const containerOfLiItem = e.target.parentNode.parentNode.parentNode;
    const clAmountItemsInCart = containerOfLiItem.querySelector('.clTheSpanWithAmountItems');  // TODO: cambiar el nom,bre de esta clase
    let nAmountItems = Number(clAmountItemsInCart.innerHTML);
    if (btnSubstract) {
      nAmountItems > 0 ? nAmountItems -= 1 : 0;
    }
    else
      nAmountItems += 1;
    clAmountItemsInCart.innerHTML = nAmountItems;
  }
})

function fnPaintCart(oneList) {
  oneList.forEach(element => {
    const { id, name, url_image, unit } = element;
    ul.innerHTML += `

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
        <img class="mx-4 clBtnAddOneLess" src="./images/substract01.png" width="25" height="25">
      </span>
      </div>
      <div class="col-12 col-sm-4 col-md-1 col-lg-1">
        <p class="fs-4 fw-bold ms-3 text-center pt-3 clTheSpanWithAmountItems">1</p>
      </div>
      <div class="col-12 col-sm-4 col-md-1 col-lg-1">
      <span id="" class="bg-transparent btn-dark">
        <img class="mx-4 clBtnAddOneMore" src="./images/add01.png" width="25" height="25">
      </span>
      </div>
    </div>
  </li>

    `

    const nn = `
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
      <!-- <button id=${id} class="btn btn-dark fs-5 btm-sm float-end clBtnAddSubstractCart">Borrar</button> -->
      <button id="" class="bg-transparent btn-dark clBtnAddOneLess">
        <img class="mx-4" src="./images/substract01.png" width="25" height="25">
      </button>
    </div>
    <div class="col-12 col-sm-4 col-md-1 col-lg-1">
      <p id="idAmountToCart" class="fs-4 fw-bold ms-3 text-center pt-3 clTheSpanWithAmountItems">1</p>
    </div>
    <div class="col-12 col-sm-4 col-md-1 col-lg-1">
      <button id="" class="bg-transparent clBtnAddOneMore">
        <img class="mx-4" src="./images/add01.png" width="25" height="25">
      </button>
    </div>
  </div>
</li>
`



  });

  console.log(oneList)

}




