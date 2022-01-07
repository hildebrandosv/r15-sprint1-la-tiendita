// *** Import GLOBAL DATA VARIABLES from JS file ***
import { urlProducts } from '../data/data.js';
console.log(urlProducts)
import { urlCities } from '../data/data.js';
//
// *** Import FUNCTIONS from JS file ***
import { fnGetTableOfDb } from '../scripts/ctrlAllData.js';

window.addEventListener('DOMContentLoaded', e => {
   // fnLoadCities() // Puts the Cities to select the shipping address
})




const idCitiesSelect = document.getElementById('idCitiesSelect');
const idBtnSaveAddress= document.getElementById('idBtnSaveAddress');

idBtnSaveAddress.addEventListener('click', e => {
   e.preventDefault();
   const lCitySelected= (idCitiesSelect.selectedIndex > 0);
   if (lCitySelected) {
      const sAddressShiping = idCitiesSelect.options[idCitiesSelect.selectedIndex].text;
      localStorage.setItem('sAddressShiping', sAddressShiping);   
   } else {
      alert("ℹ Recuerde que debe digitar la dirección de envío.")
   }
})

// Ojo: si la variable en local host existe, cargar el valor y mostrarlo.
// Ojo, preguntar por la dirección, sólo si no hay una dirección válida en localSt
// Ojo; si elige cancelar o "X" y no hay dirección, tambien saca mensaje informativo

function fnGetDataFromLocalStorage (sKeyData, theContentData) {
   // Documentation Local Storage: https://www.acontracorrientech.com/local-storage-en-javascript-guia-completa/

}
async function fnLoadCities() {
   const aCities = await fnGetTableOfDb(urlCities);
   console.log (aCities);

}