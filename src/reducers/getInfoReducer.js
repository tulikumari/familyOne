import {
  GET_USER_INFORMATION,
  GET_USER_INFORMATION_SUCCESS,
  GET_USER_INFORMATION_FAIL
} from "../actionTypes";

const INITIAL_STATE = {
  get_info: {},
  loadingIndicator: false,
  get_infoError: ""
};

const getInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_INFORMATION:
      return { ...state, loadingIndicator: true };
    case GET_USER_INFORMATION_SUCCESS:
      return { ...state, loadingIndicator: false, get_info: action.payload };
    case GET_USER_INFORMATION_FAIL:
      return { ...state, loadingIndicator: false, get_infoError: action.payload };
    default:
      return state;
  }
};

export default getInfoReducer;
