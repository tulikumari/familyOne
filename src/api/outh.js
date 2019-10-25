import React , { Component } from 'react';
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

//import { StackNavigator } from 'react-navigation';
export const loginApi = (formData,navigation) =>
{
    fetch('http://innorade.in/seller/location/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData: formData,
            store_id: '2'
        })
      })
      .then((response) => response.json())
      .then(function(json){
        
          if(json.status==200)
          {
                if(Object.keys(json.responseData).length !=0)
                {
                    let user_id = json.responseData.admin_user_id;
                    let user_info = json.responseData;
                    AsyncStorage.setItem("user_id", user_id);
                    AsyncStorage.setItem("user_info",JSON.stringify(user_info));
                    //this.props.navigation.navigate('Dashboard');
                    navigation("Dashboard")

                }
                else{
                    
                        alert(json.message);
                   
                   
                }
          }
          else{

          }
          let userInfo = json.responseData;
      })
      .catch(function(error) {
        console.log(error.message);
      })
      
     // return 0;
}
export const signupApi = (formData,state) =>
{
    state.setState({loading : true});
    //console.log(formDthis.state);
    
    
    fetch('http://innorade.in/seller/location/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData: formData,
            store_id: '2'
        })
      })
      /*
      .then(function(response) {
        console.log(response);
      })
      */
      
      .then((response) => response.json())
      .then(function(json){
          
          if(json.status==200)
          {
                if(Object.keys(json.responseData).length !=0)
                {
                    let user_id = json.responseData.admin_user_id;
                    let user_info = json.responseData;
                    AsyncStorage.setItem("user_id", user_id);
                    AsyncStorage.setItem("user_info",JSON.stringify(user_info));
                    //this.props.navigation.navigate('Dashboard');
                    navigation("Dashboard")

                }
                else{

                   // alert(json.message);
                    Toast.show({
                        text: json.message,
                        position: 'top',
                        buttonText: 'Okay',
                        type: 'danger'
                    })
                }
          }
          else{

          }
          //let userInfo = json.responseData;
      })
     
      .catch(function(error) {
        console.log(error.message);
      })
      
     // return 0;
}