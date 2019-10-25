export const validate = values => {
  const error = {};
  error.email = "";
  let ema = values.email;

  if (values.email === undefined) {
    ema = "";
  }

  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes('.') && ema !== '') {
    error.email = '. not included';
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  

  //return this.setState({error:error});
  return error;
};
