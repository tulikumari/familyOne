import { IS_LOGIN, IS_NOT_LOGIN, INTERNET_STATUS, MODAL_VISSIBLE, MODAL_HIDDEN,IS_VALIDATING_LOGIN } from './actionTypes';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';
export const isLoggedInUser = (callback) => {
    console.log("it calls");
    return (dispatch) => {
        _loadinitialValue(dispatch);
       // console.log(dispatch);
       

    }
}
_loadinitialValue = async (dispatch) => {
    var value = await AsyncStorage.getItem('user_id')
   
       
        if (value != null) {
            
            dispatch({ type: IS_LOGIN, payload: value });
        }
        else
        {
            dispatch({ type: IS_NOT_LOGIN })
        }       
}
export const connectionState = (status) => {
   
    return (dispatch) => {
       
        dispatch({ type: INTERNET_STATUS, internetStatus: status });
    }
};
export const connectionStateError = () => {
   
    return (dispatch) => {
       
        dispatch(ToastActionsCreators.displayError('Network issue'));
    }
};

export const modalHandler = (currentState)=>{
    return (dispatch) => {
        if(currentState)
        {   
            dispatch({ type: MODAL_VISSIBLE});
        }
        else
        {
            dispatch({ type: MODAL_HIDDEN});
        }
    }
}
export const validateIsLogin = (callback) =>{
    return (dispatch) => {
    let validateLoginStatus = {
        isValidateLogin: true,
        
    };
    dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus});
    AsyncStorage.getItem('user_id')
    .then((value) => {
            if(value)
            {
               
                validateLoginStatus = {
                    isValidateLogin: false,
                    logged_in_user_id: value,
                    
                };
                dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus});
                callback('Lobby');
            }
            else{
                dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus});
                callback('Lobby');
            }
            
    })
    .catch((error) => {
        dispatch({ type: MODAL_VISSIBLE, payload: validateLoginStatus});
    })
    }
}
export const userLogout = (callback)=>{
    return (dispatch) => {
    let validateLoginStatus = {
        isValidateLogin: true,
        
    };
    
    dispatch({ type: IS_VALIDATING_LOGIN, payload: validateLoginStatus});
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('userInfo');
    dispatch({ type: IS_VALIDATING_LOGIN, payload: {isValidateLogin: false }});
    callback();
    }
   
}
