// *** Import GLOBAL DATA VARIABLES from JS file ***
import { urlProducts } from '../data/data.js';
console.log(urlProducts)
import { urlCities } from '../data/data.js';
//
// *** Import FUNCTIONS from JS file ***
import { fnGetTableOfDb } from '../scripts/ctrlAllData.js';

window.addEventListener('DOMContentLoaded', e => {
   fnLoadCities() // Puts the Cities to select the shipping address
})
async function fnLoadCities() {
   const aCities = await fnGetTableOfDb("http://localhost:4001/tbProducts");
   console.log("---------------------")
   console.log (aCities);

}