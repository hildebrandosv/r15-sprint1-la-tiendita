// https://rosolutions.com.mx/blog/index.php/2018/10/29/manejo-de-errores-al-utilizar-fetch/

// Function HTTP-GET to get ALL DATA (all registers) from table for any table
export const fnGetTableOfDb = async(urlData) => {
   const res = await fetch(urlData);
   const data = res.json()
   return data
}

// Function HTTP-GET to get ALL DATA (all registers) from table for any table
export const fnGetRecordOfTable = async(urlData, idKey) => {
   const res = await fetch(urlData + "/" + idKey);
   const data = res.json()
   return data
}

// Load a data from local storage, but validates if not  exists and in this case, then the key is created
export const fnGetDataFromLocalStorage = (sKeyData) => {
   // Documentation Local Storage: https://www.acontracorrientech.com/local-storage-en-javascript-guia-completa/
   let valueKeyInLocalStorage = localStorage.getItem(sKeyData);
   if (valueKeyInLocalStorage === null) {
      localStorage.setItem(sKeyData,'');
   }
   valueKeyInLocalStorage = localStorage.getItem(sKeyData);
   return ((valueKeyInLocalStorage))
}