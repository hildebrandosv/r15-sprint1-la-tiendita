

//TODO: cargar objeto de la TC en el LOAD-CONTENT
let oCreditCardPay = {}  // Data object with the credit card data of to do the pay
let sCardSrcImage = ""    // Storages the URL ("src" property) of card selected
const idForm01 = document.getElementById('idForm01'); // The pay form
const idBtnToPayForm = document.getElementById('idBtnToPayForm'); // Button to go to pay in the pay form
const idVisaCard = document.getElementById('idVisaCard'); // Image this credit card to go to pay in the pay form
const idMasterCard = document.getElementById('idMasterCard'); // Image this credit card to go to pay in the pay form
const idAmexCard = document.getElementById('idAmexCard'); // Image this credit card to go to pay in the pay form
const idDinersCard = document.getElementById('idDinersCard'); // Image this credit card to go to pay in the pay form
const idBtnModalMsgPurchaseOk = document.getElementById('idBtnModalMsgPurchaseOk'); // Button that ends the purchase

// TODO: poner el valor a pagar en el botón de pago definitivo
const idTotalToPayForm = document.getElementById('idTotalToPayForm'); // SPAN tag in button to definitive pay fron pay form that contains the total to pay
// TODO: llevar el foco al iD "idMain"
const idBtnEndsPurchase = document.getElementById('idBtnEndsPurchase'); // Button to continue buying after to pay te purchase with success


// Listener in the all inputs of form fof the credit card
idForm01.addEventListener('input', e => {

   const oInputsForm= fnInputsValidate('url_image', sCardSrcImage);  // Creates Key|Value to image URL  of the credit cart selected
   const lThereIsError= Object.keys(oInputsForm).length === 0;
   if (lThereIsError) idBtnToPayForm.disabled= true
   else idBtnToPayForm.disabled= false;
})
// Listener SUBMIT of form to do the final pay
idForm01.addEventListener('submit', e => {
   e.preventDefault();
   idBtnModalMsgPurchaseOk.click();
})
idBtnEndsPurchase.addEventListener('click', e => {
   idForm01.reset();
})
// LISTENER to card credit image selected
idVisaCard.addEventListener('click', e => { fnShowCreditCardSelected(idVisaCard.src, 'VISA') })
idMasterCard.addEventListener('click', e => { fnShowCreditCardSelected(idMasterCard.src, 'MASTER') })
idAmexCard.addEventListener('click', e => { fnShowCreditCardSelected(idAmexCard.src, 'AMEX') })
idDinersCard.addEventListener('click', e => { fnShowCreditCardSelected(idDinersCard.src, 'DINERS') })

// Function that load te inputs form in an object. If at least one file is not selected, returns empty, else, 
// return the object with all fields in pair "key:value", where the "key" is the name of the input in the form.
function fnInputsValidate(otherKey_SrcImage, otherVal_SrcImage) {
   let oWithAllInputs = {}  // Data object with the credit card data of to do the pay
   const lstInputs = document.getElementsByClassName("form-control")

console.log('lstInputs ',lstInputs)

oWithAllInputs[lstInputs[1].name] = lstInputs[1].value; // This case: email
oWithAllInputs[lstInputs[2].name] = lstInputs[2].value; // This case: tc_number 
oWithAllInputs[lstInputs[3].name] = lstInputs[3].value; // This case: expires
oWithAllInputs[lstInputs[4].name] = lstInputs[4].value; // This case: cvv
oWithAllInputs[lstInputs[5].name] = lstInputs[5].value; // This case: name
// Adds Key|Value pair to input objects of the form (the pair arrives in the parameter)
   oWithAllInputs[otherKey_SrcImage] = otherVal_SrcImage;
   // Finds any field that is empty
   const aAllValuesOfAllInputs = Object.values(oWithAllInputs);
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


function cl() {
   console.log('Aquí voy...')
}