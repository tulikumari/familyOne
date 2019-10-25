
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
    
  
    if (ema.length < 8 && ema !== '') {
      error.email = 'too short';
    }
    if (!ema.includes('.') && ema !== '') {
        error.email = '. not included';
      }
    if (!ema.includes('@') && ema !== '') {
      error.email = '@ not included';
    }
    
    if (fnm.length > 10) {
      error.firstName = 'max 10 characters';
    }
    if (lnm.length > 10) {
        error.lastName = 'max 10 characters';
      }
    
    return error;
  };
  
  



