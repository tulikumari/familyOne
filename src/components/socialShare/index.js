import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  animation
 } from 'react-native';
 import {Icon} from 'native-base';
import { Dimensions } from 'react-native';
import * as Animatable from "react-native-animatable";
import Button from 'react-native-button';
import variables from '../../themes/variables';
let navigate;
export default class SocialShare extends Component {
   constructor(props) {
       
    super(props);
    navigate= this.props.navigation.navigate
     }
   
    render() {
        let windowWidth=variables.deviceWidth
    let widthChannge=(windowWidth)/1200
    
    let newWidth=windowWidth
    let newHeight=701*widthChannge+150
      return (  
       <Animatable.View animation="slideInRight"> 
        <View style={styles.container}>
         <View style={styles.header}>
           <Text style={styles.headerText}>Ends in:</Text>
           <Text style={styles.headerText1}>12:35:20</Text>
         </View>
         <View>
         <Image source={require('./../../public/images/contest.png')} style={{width:variables.deviceWidth, height:variables.deviceHeight/2 + variables.deviceHeight/10}}  />
         
           <View style={styles.afterimages}>
            <Text style={{fontSize:16,color:'grey'}}>Social Share.for each person that enters,you'll get an</Text>
            <Text style={{fontSize:16,color:'grey'}}>extra entry point</Text>
          </View>
          <View style={styles.button}>
              <View>
              <Image
              source={require("../../public/images/fb.png")}
              style={{width:variables.deviceWidth*.2, height:variables.deviceHeight/10 ,borderRadius:15,marginLeft:5}}
            />
              </View>
              <View>
              <Image
              source={require("../../public/images/twiter.png")}
              style={{width:variables.deviceWidth*.2, height:variables.deviceHeight/10 ,borderRadius:15,marginLeft:5}}
            />
              </View>
              <View>
              <Image
              source={require("../../public/images/instagram.jpg")}
              style={{width:variables.deviceWidth*.2, height:variables.deviceHeight/10 ,borderRadius:15,marginLeft:5}}
            />
              </View>
         </View>
          </View>
         <View style={{position: 'absolute', width:'100%', bottom: 0, backgroundColor:'gray'}}>
           <TouchableOpacity>
             <Button onPress={() => navigate("Contest")}>  
              <Text style={{fontSize:textFontSize,textAlign:'center',color:'white',backgroundColor:'grey',height:40,width:'100%'}}>Done</Text>
              </Button>
          </TouchableOpacity>
         </View>
       </View>
      </Animatable.View>
      );
    };
};

var {height, width} = Dimensions.get('window'); 
var textFontSize = width * 0.06;
var textFontSize1 = width * 0.09;
var buttonwidth = width/4 
const styles = StyleSheet.create({
   container:{
     height:'100%',
     width:'100%'
   },
   header:{height:'8%',
   backgroundColor:'white',
   flexDirection: 'row',
   },
   headerText:{
     fontSize:35,
     color:'gray',
     width:'50%',
   },
   headerText1:{
    fontSize:35,
    color:'black',
    textAlign:'right',
    width:'50%',
  },
  images:{
   width:'100%',
   height:'auto',
  },
  afterimages:{
    alignItems: 'center'
  },
  button:{
    marginLeft:'20%',
    flexDirection:'row',
    
  }
});
