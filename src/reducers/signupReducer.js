
import { SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_DATE, SIGNUP_USER_FAIL } from '../actionTypes';

const INITIAL_STATE = {
    firstName: '',
    lastName:'',
    email: '',
    
    
    userInfo: null,
    loadingIndicator: false,
    signuperror:''
};


const signupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            return { ...state, loadingIndicator: true };
        case SIGNUP_USER_SUCCESS:
            return { ...state, loadingIndicator: false, userInfo: action.payload }
        case SIGNUP_USER_FAIL:
            return { ...state,loadingIndicator: false, signuperror: action.payload }
        default:
            return state;
    }
}

export default signupReducer;