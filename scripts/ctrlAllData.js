// Function to get data from table for any table
export const fnGetTableOfDb = async(urlData) => {
   const res = await fetch(urlData);
   const data = res.json()
   return data
}