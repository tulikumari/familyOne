
export const validate = values => {
    const error = {};
    error.email = '';
    error.firstName = '';
    error.lastName = '';
    let ema = values.email;
    let fnm = values.firstName;
    let lnm = values.lastName;
  
    
  
    if (values.email === undefined) {
      ema = '';
    }
    if (values.firstName === undefined) {
      fnm = '';
  
    }
  
    if (values.lastName === undefined) {
      lnm = '';
  
    }
    
  
    if (ema.length < 8 || !ema.includes('.') || !ema.includes('@') || ema == '') {
      error.email = 'Invalid';
    }
    
    
    if (fnm == '') {
      error.firstName = 'Invalid';
    }
    if (lnm =='') {
        error.lastName = 'Invalid';
      }
    
    return error;
  };
  
  



