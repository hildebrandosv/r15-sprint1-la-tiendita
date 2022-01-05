//╔════════════════════════════════════════════════╗
//║             MAIN JAVASCRIPT SCRIPT             ║
//╚════════════════════════════════════════════════╝
// *** Import DATA from JS file ***
//
// *** Import FUNCTIONS from JS file ***
import { fnGetTableOfDb } from './ctrlAllData.js';
//
// *** CONSTANT definition ***
import { urlProducts } from '../data/data.js';
//
// *** VARIABLES definition ***
//
// *********************************************
// ***           BEGIN MAIN MODULE           ***
// *********************************************
const aProducts= await fnGetTableOfDb(urlProducts)

console.log(aProducts)
//
// *********************************************
// ***            END MAIN MODULE            ***
// *********************************************
function al(aa) { alert("Aquí voy... ", aa); }
function cl(aa) { console.log("Aquí voy... ", aa); }
//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
