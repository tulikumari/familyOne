import { PHONE_NUMBER, PHONE_NUMBER_SUCCESS, PHONE_NUMBER_FAIL } from '../actionTypes';

const INITIAL_STATE = {
    phone_number: {},
    loadingIndicator: false,
    phone_numberError:''
};


const phoneReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case PHONE_NUMBER:
            return { ...state, loadingIndicator: true };
        case PHONE_NUMBER_SUCCESS:
            return { ...state, loadingIndicator: false, success: action.payload.success}
            case PHONE_NUMBER_FAIL:
      return {
        ...state,
        loadingIndicator: false,
        phone_numberError: action.payload
      };
        default:
            return state;
    }
}

export default phoneReducer;