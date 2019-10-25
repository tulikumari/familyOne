import React , { Component } from 'react';
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

//import { StackNavigator } from 'react-navigation';

export const attendanceApi = (formData, navigation) =>
{
   fetch('http://innorade.in/seller/location/markAttendance', {
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
          //console.log(response);
          if(json.status==200)
          {
               
             if(Object.keys(json.responseData).length !=0)
                {
                    let present_id = json.present_id;
                    let present_date = json.present_date;
                    let today_attendance = {
                        'present_id': present_id,
                        'present_date': present_date
                    }
                    AsyncStorage.setItem("today_attendance", JSON.stringify(today_attendance));
                    //AsyncStorage.setItem("user_info",JSON.stringify(user_info));
                    //this.props.navigation.navigate('Dashboard');
                    // alert(json.message);
                    Toast.show({
                        text: json.message,
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger'
                    });
                    //navigation("Dashboard")

                }
                else{
                    alert('Login credential is not valid');
                }
                
          }
          else{

          }
          
      })
      
      .catch(function(error) {
        console.log(error.message);
      })
      
     // return 0;
}
