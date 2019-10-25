import {
  PHONE_NUMBER,
  PHONE_NUMBER_SUCCESS,
  PHONE_NUMBER_FAIL,
  IS_VALIDATING_LOGIN,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS
} from "../../actionTypes";
import api from "./../../config/api";
import { ToastActionsCreators } from "react-native-redux-toast";
import { AsyncStorage } from "react-native";
import qs from "qs";

const phoneSuccess = (dispatch, phone) => {
  console.log("phone", phone);
  dispatch({
    type: PHONE_NUMBER_SUCCESS,
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
const phoneFailed = (dispatch, error) => {
  dispatch({
    type: PHONE_NUMBER_FAIL,
    payload: error
  });
  //return true;
};

const phone_updateSuccess = (dispatch, user) => {
  dispatch({
    type: UPDATE_USER_SUCCESS,
    payload: user
  });
};
const phone_updateFailed = (dispatch, error) => {
  dispatch({
    type: UPDATE_USER_FAIL,
    payload: error
  });
};

export const phone_update =(phoneData,user_id, callback)=>{
  console.log('phone update',phoneData,user_id);
  let finalJson = {
    "action": "update",
    "user_id":"email|"+user_id,
    "user_metadata": {
        "phone_number": phoneData.phone_number
      }
};
  return dispatch => {
    dispatch({ type: UPDATE_USER });
    fetch("https://family.one/oauthstaging2/reactrequest/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalJson)
    })
      .then(response => response.json())
      .then(function(json) {
        console.log("json", json);
        if (json.user_id ) {
          
              let user_id = json.user_id;
              
              phone_updateSuccess(dispatch, json.identities[0].user_id);
              callback(json.identities[0].user_id);
              
          
        } else {
          phone_updateFailed(dispatch, json.message);
          dispatch(ToastActionsCreators.displayError(json.message));
         
        }
      })

      .catch(function(error) {
          console.log('error',error)
          phone_updateFailed(dispatch, error.message);
      });
  };
}



export const phone = (phoneData,verification_code, callback) => {
  return dispatch => {
    dispatch({ type: PHONE_NUMBER });
    console.log("action phone data", phoneData);
    let finalJson;
    let call_api;
    if (verification_code) {
      finalJson = {
        action: "verify_code",
        verification_code: verification_code,
        phone_number: phoneData.phone_number,
        country_code: "+91"
      };
    } else {
      finalJson = {
        action: "send_code",
        phone_number: phoneData.phone_number,
        country_code: "+91"
      };
    }
    console.log("finalJson", finalJson);

    fetch("https://family.one/oauthstaging2/mobileverify/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(finalJson)
    })
      .then(response => response.json())
      .then(function(json) {
        console.log("json", json);
        if (json.success == true) {
          console.log("json", json);
          phoneSuccess(dispatch, json);
          callback(json);
        } else {
          phoneFailed(dispatch, json.message);
          dispatch(ToastActionsCreators.displayError(json.message));

        
        }
      })
      .catch(function(error) {
        console.log('error message',error.message);
        dispatch(ToastActionsCreators.displayError(error.message));
        phoneFailed(dispatch, error.message);
      });
  };
};
