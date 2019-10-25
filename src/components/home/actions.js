import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  IS_VALIDATING_LOGIN
} from "../../actionTypes";
import api from "./../../config/api";
import { ToastActionsCreators } from "react-native-redux-toast";
import { AsyncStorage } from "react-native";
import qs from "qs";

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  let validateLoginStatus = {
    isValidateLogin: false,
    logged_in_user_id: user.user_id
  };
  dispatch({
    type: IS_VALIDATING_LOGIN,
    payload: validateLoginStatus
  });
  //return true;
};
const loginUserFailed = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
  //return true;
};

export const loginUser = (loginData, callback) => {
  return dispatch => {
    console.log(loginData);
    dispatch({ type: LOGIN_USER });

    let finalJson = {
      client_id: "3yru5w4ONQ5IOKtpCk6KekXKse5dyqMp",
      connection: "email",
      email: loginData,
      send: "link", //if left null defaults to link
      authParams: {
        // any authentication parameters that you would like to add
        scope: "openid"
      }
    };
    fetch(api.login, {
      
      method: "post",
      url: "https://family-one.auth0.com/passwordless/start",
      data: JSON.stringify(finalJson)
    })
      .then(response => {
        console.log("response", response);
        if (response.status != 200) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(function(json) {
        if (json.status == 200 && json.success == true) {
          console.log("json", json);
          if (Object.keys(json.userInfo).length != 0) {
            let user_id = json.userInfo.user_id;
            let user_name = json.userInfo.user_name;
            AsyncStorage.setItem("user_id", user_id);
            AsyncStorage.setItem("userInfo", JSON.stringify(json.userInfo));
            //this.props.navigation.navigate('Dashboard');

            //navigate("Dashboard")
            loginUserSuccess(dispatch, json.userInfo);
            callback(json.userInfo);
          } else {
            loginUserFailed(dispatch, json.message);
            // alert(json.message);
            dispatch(ToastActionsCreators.displayError(json.message));

            callback({});
          }
        } else {
          loginUserFailed(dispatch, json.message);
          dispatch(ToastActionsCreators.displayError(json.message));

          callback({});
        }
      })

      .catch(function(error) {
        //console.log(error.message);
        dispatch(ToastActionsCreators.displayError(error.message));
        loginUserFailed(dispatch, error.message);
      });
  };
};
