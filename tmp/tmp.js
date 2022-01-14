// const idModalCartEmpty = document.getElementById('idModalCartEmpty');
let aa= 0

const idBtnAddProdModCartEmpty= document.getElementById('idBtnAddProdModCartEmpty')
idBtnAddProdModCartEmpty.addEventListener('click', e => {
   e.preventDefault();
   aa +=  1
   console.log('Click e incremento: ',aa)

})


// idModalCartEmpty.click();
var myModal = new bootstrap.Modal(document.getElementById('idBtnModalCartEmpty'), {
   keyboard: false
 })

 myModal.toggle()


