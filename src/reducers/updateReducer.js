import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL
} from "../actionTypes";

const INITIAL_STATE = {
  update_info: {},
  loadingIndicator: false,
  update_infoError: ""
};

const updateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, loadingIndicator: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loadingIndicator: false, update_info: action.payload };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loadingIndicator: false,
        update_infoError: action.payload
      };
    default:
      return state;
  }
};

export default updateReducer;
