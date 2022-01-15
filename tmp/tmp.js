// *** Import FUNCTIONS from JS file ***
import {
   fnGetDataFromLocalStorage,
   fnNumberFormat
} from '../scripts/ctrlAllData.js';
localStorage.setItem('sAddressShipping',"MEDELLÍN (Antioquia)");
let addressShipping = ""       // Shhiping Adress (string): Global variable to have always this data in memory
let cartContent = []          // Content of the cart (array): Global variable to have always this data in memory

const idBtnModalCartDetail = document.getElementById('idBtnModalCartDetail');  // // Button that activates the detail modal with all product in the cart

idBtnModalCartDetail.click()

const clDeliveryAddress= document.querySelector('.clDeliveryAddress');

// Load the address shippment to show in te detail cart
addressShipping = fnGetDataFromLocalStorage("sAddressShipping"); // If the key is not in LS, it is created, else it gets its content
clDeliveryAddress.innerHTML= addressShipping; // Puts the shippment address
//Load the content cart to show the list of items in the cart
cartContent = fnGetDataFromLocalStorage("aCartContent", true); // If the key is not in LS, it is created, else it gets its content







