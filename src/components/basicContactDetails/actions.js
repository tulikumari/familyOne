import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  GET_USER_INFORMATION,
  SIGNUP_USER_FAIL
} from "../../actionTypes";
import api from "./../../config/api";
import { AsyncStorage } from "react-native";
import { ToastActionsCreators } from "react-native-redux-toast";
import qs from "qs";
import Alert from "react-native";
const signupUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });
};
const signupUserFailed = (dispatch, error) => {
  dispatch({
    type: SIGNUP_USER_FAIL,
    payload: error
  });
};
export const signupUser = (signupData, callback) => {
  console.log("hello");
  let finalJson = {
    action: "signup",
    connection: "email",
    name: signupData.firstName + " " + signupData.lastName,
    nickname: signupData.firstName + " " + signupData.lastName,
    email: signupData.email,
    user_metadata: {
      first_name: signupData.firstName,
      last_name: signupData.lastName
    }
  };

  let getfinaljson = {
    action: "search",
    email: signupData.email
  };

  return dispatch => {
    dispatch({ type: GET_USER_INFORMATION });
    fetch("https://family.one/oauthstaging2/searchbymail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(getfinaljson)
    })
      .then(response => response.json())
      .then(function(json) {
        console.log("json", json);
        if (json.length !== 0) {
          
          dispatch(ToastActionsCreators.displayError("Already Registered"));
          signupUserFailed(dispatch, json);
          // callback(json.identities[0].user_id);
        } else {
          dispatch({ type: SIGNUP_USER });
          fetch("https://family.one/oauthstaging2/reactrequest/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(finalJson)
          })
            .then(response => response.json())
            .then(function(json) {
              console.log("json", json);

              if (json.identities && json.identities[0].user_id) {
                let user_id = json.identities[0].user_id;

                AsyncStorage.setItem("user_id", user_id);
                signupUserSuccess(dispatch, json.identities[0].user_id);
                callback(json.identities[0].user_id);
              } else if (json.statusCode == 400) {
                console.log("error", json.error);
                signupUserFailed(dispatch, json.error);
                dispatch(ToastActionsCreators.displayError("Invalid Email"));
              } else {
                console.log("error", error.message);
                signupUserFailed(dispatch, error.message);
              }
            })

            .catch(function(error) {
              console.log("error", error.message);
              signupUserFailed(dispatch, error.message);
            });
        }
      })

      .catch(function(error) {
        console.log("error", error.message);
        signupUserFailed(dispatch, error.message);
      });
  };
};
