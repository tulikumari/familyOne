export const validate = values => {
    const error = {};
    error.phone_number = "";
    let phn = values.phone_number;
  
    if (values.phone_number === undefined) {
        phn = "";
    }
  
    if (phn.length !== 10 || phn == "") {
      console.log('error',);
      error.phone_number = "Invalid";
    }
    
    
    
  
    //return this.setState({error:error});
    return error;
  };
  