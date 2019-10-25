import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL
} from "../../actionTypes";
import api from "./../../config/api";
import { AsyncStorage } from "react-native";
import { ToastActionsCreators } from "react-native-redux-toast";

const updateUserSuccess = (dispatch, user) => {
  dispatch({
    type: UPDATE_USER_SUCCESS,
    payload: user
  });
};
const updateUserFailed = (dispatch, error) => {
  dispatch({
    type: UPDATE_USER_FAIL,
    payload: error
  });
};
export const updateUser = (updateData, user_id, callback) => {
  console.log("hello");
    let finalJson = {
      "action": "update",
      "user_id":"email|"+user_id,
      "user_metadata": {
          "address": { 
              "streetAddress": updateData.streetaddress,
              "city": updateData.city,
              "addressLine2": updateData.addressline2,
              "state":updateData.state,
              "zipcode":updateData.zip
           }
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
              //let user_name = json.userInfo.user_name;
              // AsyncStorage.setItem("user_id", user_id);
              // AsyncStorage.setItem("userInfo", JSON.stringify(json.userInfo));
              //this.props.navigation.navigate('Dashboard');
              //navigate("Dashboard")
              updateUserSuccess(dispatch, json.identities[0].user_id);
              callback(json.identities[0].user_id);
              
          
        } else {
          updateUserFailed(dispatch, json.message);
          dispatch(ToastActionsCreators.displayError(json.message));
         
        }
      })

      .catch(function(error) {
          console.log('error',error)
        updateUserFailed(dispatch, error.message);
      });
  };
};
