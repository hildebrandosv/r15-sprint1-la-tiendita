// *** Import FUNCTIONS from JS file ***
import {
   fnGetDataFromLocalStorage,
   fnNumberFormat
} from '../scripts/ctrlAllData.js';
let addressShipping = ""       // Shhiping Adress (string): Global variable to have always this data in memory
let cartContent = []          // Content of the cart (array): Global variable to have always this data in memory
localStorage.setItem('sAddressShipping',"MEDELLÍN (Antioquia)");
cartContent = fnGetDataFromLocalStorage("aCartPrevious", true); // If the key is not in LS, it is created, else it gets its content
localStorage.setItem('aCartContent',JSON.stringify(cartContent))
const clDeliveryAddress= document.querySelector('.clDeliveryAddress');
// Antes de aquí no se necesita nada en el INDEX principal


const idBtnModalCartDetail = document.getElementById('idBtnModalCartDetail');  // Button that activates the detail modal with all product in the cart
const idUlItemsCartList = document.getElementById('idUlItemsCartList');        // UL container to paint all products in the cart

idBtnModalCartDetail.click()

// Load the address shippment to show in te detail cart
addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
clDeliveryAddress.innerHTML= addressShipping; // Puts the shippment address
//Load the content cart to show the list of items in the cart
cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content
fnPaintCart(cartContent);

idUlItemsCartList.addEventListener('click', async (e) => {
   const btnEliminar = e.target.classList.contains('list-group-item');
       const id = e.target.id;
      //  console.log('btnEliminar: [' + btnEliminar +']')
      //  console.log(e)
      //  console.log(e.target)
      //  console.log(e.target)
       
})


function fnPaintCart(oneList) {
   oneList.forEach(element => {
      const { id, name, url_image, unit } = element;
      idUlItemsCartList.innerHTML += `
      <li id=${id}  class="list-group-item">
        <div class="container-fluid row justify-content-center align-items-center">
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
            <button id=${id} class="bg-transparent btn-dark">
              <img class="mx-4" src="./images/substract01.png" width="25" height="25">
            </button>
          </div>
          <div class="col-12 col-sm-4 col-md-1 col-lg-1">
            <p id="idAmountToCart" class="fs-4 fw-bold ms-3 text-center pt-3">1</p>
          </div>
          <div class="col-12 col-sm-4 col-md-1 col-lg-1">
            <button class="bg-transparent">
              <img class="mx-4" src="./images/add01.png" width="25" height="25">
            </button>
          </div>
        </div>
      </li>
                      `
  });


   console.log(oneList)

}




