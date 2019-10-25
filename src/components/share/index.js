import React, { Component } from "react";
import {
  
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  animation,
} from "react-native";

import { Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "react-native-button";
import variable from "../../themes/variables";
import TimerCountdown from 'react-native-timer-countdown'
let navigate;
export default class Share extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    // this._onPressButton=this._onPressButton.bind();
  }

//   _onPressButton(){
//       navigate("FamilyMember")
//   }

  render() {
    let windowWidth = variable.deviceWidth;
    let widthChannge = windowWidth / 1200;

    let newWidth = windowWidth;
    let newHeight = 701 * widthChannge + 150;
    return (
      <Animatable.View animation="slideInRight">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Ends in:</Text>
            <TimerCountdown
            initialSecondsRemaining={43200000}
            onTick={() => console.log('tick')}
            onTimeElapsed={() => console.log('complete')}
            allowFontScaling={true}
            style={styles.headerText1}
        />
          </View>
          <View>
            <Image
              source={require("./../../public/images/contest.png")}
              style={{ width: variable.deviceWidth, height: (variable.deviceHeight/2)+(variable.deviceHeight/30) }}
            />

            <View style={styles.afterimages}>
              <Text style={{ fontSize: 24, color: "black" }}>
                Increase your chances
              </Text>
            </View>
            <View style={styles.button}>
              
                <Button onPress={() => navigate("FamilyMember")}>
                  <Text
                    style={{
                      fontSize: textFontSize,
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "#7F37A3",
                      height: 70,
                      width: buttonwidth,
                      borderRadius: 12,
                      paddingTop: 15
                    }}
                    /* onPress={this._onPressButton()} */
                  >
                    Family Share
                  </Text>
                </Button>
                {/* <Text>+2 Point/Entry</Text> */}
             
              
              <Button onPress={() => navigate("SocialShare")}>
                  <Text
                    style={{
                      fontSize: textFontSize,
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "#415B95",
                      height: 70,
                      width: buttonwidth,
                      borderRadius: 12,
                      marginLeft: 8,
                      paddingTop: 15
                    }}
                  >
                    Social Share
                  </Text>
                </Button>
                {/* <Text style={{ paddingLeft: 9 }}>+1 Point/Entry</Text> */}
              
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              width: variable.deviceWidth,
              bottom: 0,
              backgroundColor: "gray"
            }}
          >
            
              <Button onPress={() => navigate("Contest")}>
                <Text
                  style={{
                    fontSize: textFontSize,
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "grey",
                    height: variable.deviceHeight/8,
                    width: variable.deviceWidth
                  }}
                >
                  Done
                </Text>
              </Button>
          </View>
        </View>
      </Animatable.View>
    );
  }
}

var { height, width } = Dimensions.get("window");
var textFontSize = width * 0.06;
var textFontSize1 = width * 0.09;
var buttonwidth = width / 4;
const styles = {
  container: {
    height: variable.deviceHeight,
    width: variable.deviceWidth
  },
  header: {
    height: "5%",
    backgroundColor: "white",
    flexDirection: "row"
  },
  headerText: {
    fontSize: 25,
    color: "gray",
    width: "50%"
  },
  headerText1: {
    fontSize: 25,
    color: "black",
    textAlign: "right",
    width: "50%"
  },

  afterimages: {
    alignItems: "center"
  },
  button: {
    marginLeft: "23%",
    flexDirection: "row"
  }
};
