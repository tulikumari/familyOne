import {
    GET_USER_INFORMATION,
    GET_USER_INFORMATION_SUCCESS,
    GET_USER_INFORMATION_FAIL,
    IS_VALIDATING_LOGIN
  } from "../../actionTypes";
  import { ToastActionsCreators } from "react-native-redux-toast";
  import { AsyncStorage } from "react-native";
  
  const getUserInfoSuccess = (dispatch, phone) => {
    console.log("phone", phone);
    dispatch({
      type: GET_USER_INFORMATION_SUCCESS,
      payload: phone
    });
    // let validateLoginStatus = {
    //   isValidateLogin: false,
    //   logged_in_user_id: user
    // };
    // dispatch({
    //   type: IS_VALIDATING_LOGIN,
    //   payload: validateLoginStatus
    // });
    //return true;
  };
  const getUserInfoFailed = (dispatch, error) => {
    dispatch({
      type: GET_USER_INFORMATION_FAIL,
      payload: error
    });
    //return true;
  };
  
  export const check_info = (user_id, callback) => {
    return dispatch => {
      dispatch({ type: GET_USER_INFORMATION });
      let finalJson;
      
      
        finalJson = {
          action: "get_information",
          user_id: "email|"+user_id,
        };
      
      console.log("finalJson", finalJson);
  
      fetch("https://family.one/oauthstaging2/reactrequest/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(finalJson)
      })
        .then(response => response.json())
        .then(function(json) {
          console.log("json",json);
          if (json.identities ) {
            console.log("json", json);
            getUserInfoSuccess(dispatch, json);
            callback(json);
          } else {
            getUserInfoFailed(dispatch, json.message);
            dispatch(ToastActionsCreators.displayError(json.message));
  
            callback({});
          }
        })
        .catch(function(error) {
          console.log(error.message);
          dispatch(ToastActionsCreators.displayError(error.message));
          getUserInfoFailed(dispatch, error.message);
        });
    };
  };
  