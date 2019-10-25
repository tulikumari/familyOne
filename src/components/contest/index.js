import React, { Component } from "react";
//import Expo from 'expo';
import {
  Platform,
  View,
  Linking,
  Animated,
  AppRegistry,
  TouchableOpacityView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import {
  Container,
  Item,
  Input,
  Header,
  Body,
  Content,
  Title,
  Text,
  Label,
  Form,
  Toast,
  Button,
  SwipeRow
} from "native-base";
import {
  Field,
  reduxForm,
  formValueSelector,
  getFormValues,
  isValid,
  SubmissionError
} from "redux-form";
import { connect } from "react-redux";


import Loader from "./../loader";
import variable from "./../../themes/variables";
import { check_info } from "./actions";
// import {
//   SIGNUP_USER,
//   SIGNUP_USER_SUCCESS,
//   IS_LOGIN
// } from "./../../actionTypes";
import { AsyncStorage } from "react-native";

// import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TimerCountdown from "react-native-timer-countdown";

let navigate;
export class Contest extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      user_id: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id").then(value => {
      console.log("user_id", value);
      this.setState({ user_id: value });
      
    });
  }

  handleSubmit=()=>{
    this.props.check_info(this.state.user_id, function(response) {
      console.log("response", response.user_metadata);
      if(response.user_metadata.phone_number){
        if(response.user_metadata.skillTestQuestion == 1){
          navigate("Share");
        }
        else{
          navigate("SkillTestQuestion");
        }
      }
      else{
        navigate("PhoneNumber");
      }
    });
  }

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;
    let windowWidth = variable.deviceWidth;
    let widthChannge = windowWidth / 1200;

    let newWidth = windowWidth;
    let newHeight = 701 * widthChannge + 150;
    // const content = <ActivityIndicator size="large" />;
    return (
      <Animatable.View animation="slideInRight">
        <View style={styles.container}>
        <Loader loading={this.props.loadingIndicator} />
          <View style={styles.header}>
            <Text style={styles.headerText}>Ends in:</Text>
            {/* <Text style={styles.headerText1}>12:35:20</Text> */}
            <TimerCountdown
              initialSecondsRemaining={43200000}
              /* onTick={() => console.log('tick')} */
              onTimeElapsed={() => console.log("complete")}
              allowFontScaling={true}
              style={styles.headerText1}
            />
          </View>
          <View>
            <Image
              source={require("./../../public/images/contest.png")}
              style={{ width: newWidth, height: "70%" }}
            />
            <View style={styles.afterimages}>
              <Text style={{ fontSize: 24, color: "gray" }}>
                Entry to this contest requires
              </Text>
              <Text style={{ fontSize: 17, color: "gray" }}>
                additional information
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity>
                <Button
                  style={{ borderRadius: 30,backgroundColor: "#fff", }}
                  onPress={() => this.handleSubmit()}
                >
                  <Text
                    style={{
                      fontSize: variable.deviceHeight / 20,
                      textAlign: "center",
                      marginTop: variable.deviceHeight / 18,
                      paddingTop: 16,
                      color: "white",
                      backgroundColor: "#08B9F7",
                      height: variable.deviceHeight / 5,
                      width: variable.deviceWidth*0.4,
                      borderRadius: 12
                    }}
                  >
                    Enter
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              width: variable.deviceWidth,
              height:50,
              bottom: 0,
              backgroundColor: "gray"
            }}
          >
            <Text
              style={{ fontSize: variable.deviceHeight / 30, paddingLeft: variable.deviceWidth / 50 }}
            >
              Terms & Conditions
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }
}


const mapStateToProps = state => {
  //signupReducer
  const { loadingIndicator } = state.getInfoReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  const { internetStatus } = state.globalReducer;

  return {
    loadingIndicator,
    isLogin,
    logged_in_user_id,
    internetStatus
  };
};
export default connect(mapStateToProps, { check_info })(Contest);

//const selector = formValueSelector("selectchild"); // <-- same as form name

// This is the state of global app and not state of your Component
// const mapStateToProps = state => {
//   //console.log(state);
//   //signupReducer
//   const { loadingIndicator } = state.signupReducer;
//   const { isLogin, logged_in_user_id } = state.checkLoginReducer;
//   this.selectchildData = selector(state, "existing", "expectant");

//   console.log("selectchildData", selectchildData);
//   return {
//     selectchildData,
//     loadingIndicator,
//     isLogin,
//     logged_in_user_id
//   };
// };

// Contest = connect(mapStateToProps)(Contest);

// export default reduxForm({
//   form: "selectchild"
//   //   validate
// })(Contest);

const styles = {
  container: {
    height:variable.deviceHeight ,
    width: variable.deviceWidth
  },
  header: {
    height: variable.deviceHeight/20,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: variable.deviceHeight / 29
  },
  headerText: {
    fontSize: variable.deviceHeight / 22,
    color: "gray",
    width: variable.deviceWidth/2
  },
  headerText1: {
    fontSize: variable.deviceHeight / 22,
    color: "black",
    textAlign: "right",
    width: variable.deviceWidth/2
  },
  afterimages: {
    alignItems: "center"
  },
  button: {
    marginLeft: variable.deviceWidth*.3
  },
};
