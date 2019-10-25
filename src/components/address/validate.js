export const validate = values => {
  const error = {};
  error.street = "";
  
  error.city = "";
  
  
  
  let city = values.city;
  let street = values.streetaddress;
  

  
  if (values.city === undefined) {
    lnm = "";
  }
  if (values.streetaddress === undefined) {
    lnm = "";
  }
  

  

//   if (fnm.length > 10) {
//     error.firstName = "max 10 characters";
//   }
//   if (lnm.length > 10) {
//     error.lastName = "max 10 characters";
//   }

  return error;
};
