import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, INTERNET_STATUS, MODAL_VISSIBLE, MODAL_HIDDEN, IS_VALIDATING_LOGIN } from '../actionTypes';
const INITIAL_STATE = {
    internetStatus: false,
    isModalVisible : false,
    isValidateLogin : false,
    logged_in_user_id : null,
    logged_in_user_info : null

};


const globalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INTERNET_STATUS:
            return { ...state, internetStatus: action.internetStatus };
        case MODAL_VISSIBLE:
            return { ...state, isModalVisible: true }
        case MODAL_HIDDEN:
            return { ...state, isModalVisible: false }
        case IS_VALIDATING_LOGIN:
            return { ...state, isValidateLogin: action.payload.isValidateLogin, logged_in_user_id: action.payload.logged_in_user_id }

        default:
            return state;
    }
}

export default globalReducer;