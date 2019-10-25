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
  ScrollView
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
  Button
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
import Loader from "./../../loader";
import variable from "./../../../themes/variables";
// import { phone } from "./actions";
// import {
//   SIGNUP_USER,
//   SIGNUP_USER_SUCCESS,
//   IS_LOGIN
// } from "./../../actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";

// import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import { TextMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let navigate;
export default class Others extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      open: false,
      phone_number: "",
      is_verify: false,
      alertmsg: "",
      firstname_complete: false,
      lastname_complete: false,
      text: "4567123409871234",
      verification_code: ""
    };
    // this.renderInput = this.renderInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    //this.completeName.bind(this);
  }

  
  //   handleSubmit() {
  //     console.log("handle phone up", phoneData);
  //     if (phoneData.phone_number) {
  //       if (phoneData.phone_number.length > 0) {
  //         this.setState({ is_verify: true });
  //       }
  //     }

  //     if (phoneData.phone_number) {
  //       if (phoneData.phone_number.length > 0) {
  //         let submitError = {};
  //         if (phoneData.phone_number === undefined) {
  //           submitError.firstName = "* Required";
  //         }
  //         if (phoneData.phone_number.length > 10) {
  //             submitError.firstName = "* Not Valid";
  //           }

  //         //return this.state.error;
  //         if (Object.keys(submitError).length != 0) {
  //           throw new SubmissionError(submitError);
  //         } else {
  //           console.log("else phoneData", phoneData);

  //             this.props.phone(phoneData, function(userInfo) {
  //               console.log("else phoneData", userInfo);
  //               if (Object.keys(userInfo).length != 0) {
  //                 navigate("Lobby");
  //               }
  //             });
  //         }
  //       }
  //     }
  //     navigate("Lobby");
  //   }

  render() {
    // const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    // const content = <ActivityIndicator size="large" />;
    return (
        
      <View style={styles.container}>
      <Animatable.View animation="slideInRight">
        {/* <Loader loading={this.props.loadingIndicator} /> */}
        <KeyboardAwareScrollView>
          
            <Text style={styles.text}>I'm a...</Text>
            <View style={styles.btn}>
              <Button
                style={{
                  backgroundColor: "#EB7FB0",
                  width: variable.deviceWidth / 3,
                  height: variable.deviceHeight / 5,
                  borderRadius: 20,
                  top: variable.deviceWidth / 20
                }}
                onPress={() => navigate("Family")}
              >
                <Text style={styles.button_text}>Family Friend </Text>
              </Button>
              <Button
                style={{
                  backgroundColor: "#9B74C3",
                  width: variable.deviceWidth / 3,
                  height: variable.deviceHeight / 5,
                  borderRadius: 20,
                  top: variable.deviceWidth / 20
                }}
                onPress={() => navigate("Family")}
              >
                <Text style={styles.button_text}>Surro-gate </Text>
              </Button>
            </View>
            <View style={styles.btn}>
            <Button
                style={{
                  backgroundColor: "#CD75CC",
                  width: variable.deviceWidth / 3,
                  height: variable.deviceHeight / 5,
                  borderRadius: 20,
                  top: variable.deviceWidth / 20
                }}
                onPress={() => navigate("Family")}
              >
                <Text style={styles.button_text}>Step-Parent </Text>
              </Button>
              <Button
                style={{
                  backgroundColor: "#B99AD3",
                  width: variable.deviceWidth / 3,
                  height: variable.deviceHeight / 5,
                  borderRadius: 20,
                  top: variable.deviceWidth / 20
                }}
                onPress={() => navigate("Family")}
              >
                <Text style={styles.button_text}>Siblings </Text>
              </Button>
            </View>
            <View style={styles.btn}>
            <Button
                style={{
                  backgroundColor: "#4D4D4D",
                  width: variable.deviceWidth / 3,
                  height: variable.deviceHeight / 5,
                  borderRadius: 20,
                  top: variable.deviceWidth / 20
                }}
                onPress={() => navigate("Family")}
              >
                <Text style={styles.button_text}>Other </Text>
              </Button>
            </View>
          
        </KeyboardAwareScrollView>
        <View style={styles.icon_btn}>
          {/* <Animatable.View animation="slideInRight"> */}
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity>
                <Icon
                  name="chevron-circle-left"
                  size={50}
                  color={"#EAECEE"}
                  marginRight={10}
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.icons_left}
                />
              </TouchableOpacity>
            </View>
          {/* </Animatable.View> */}
          {/* <Animatable.View animation="slideInRight"> */}
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity>
                <Icon
                  name="chevron-circle-right"
                  size={50}
                  color={"#9e9e9e"}
                  style={styles.icons_right}
                />
              </TouchableOpacity>
            </View>
          {/* </Animatable.View> */}
        </View>
        </Animatable.View>
      </View>
      
    );
  }
}

// const selector = formValueSelector("expecting"); // <-- same as form name

// // This is the state of global app and not state of your Component
// const mapStateToProps = state => {
//   //console.log(state);
//   //signupReducer
//   const { loadingIndicator } = state.signupReducer;
//   const { isLogin, logged_in_user_id } = state.checkLoginReducer;
//   this.phoneData = selector(state, "phone_number", "verification_code");

//   console.log("phoneData", phoneData);
//   return {
//     phoneData,
//     loadingIndicator,
//     isLogin,
//     logged_in_user_id
//   };
// };

// ExpectingChild = connect(mapStateToProps, { phone })(ExpectingChild);

// export default reduxForm({
//   form: "expecting",
//   validate
// })(ExpectingChild);

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    width: variable.deviceWidth,
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  btn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 4,
    paddingHorizontal: variable.deviceWidth / 7
  },
  text: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    left: variable.deviceWidth / 15,
    justifyContent: "space-between",
    marginTop: variable.deviceHeight / 17,
    fontSize: variable.deviceHeight / 25,
    bottom: variable.deviceWidth / 20
  },
  icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: variable.deviceWidth,
    height: variable.deviceHeight /11,
  },
  icons_right: {
    alignSelf: "flex-end",
    position: "relative"
  },
  icons_left: {
    alignSelf: "flex-start",
    position: "relative"
  },

  button_text: {
    fontSize: variable.deviceHeight / 30,
    justifyContent: "center"
  },
  button: {
    width: variable.deviceWidth / 3,
    height: variable.deviceHeight / 5,
    borderRadius: 20,
    top: variable.deviceWidth / 20
  },

  root: {
    textAlign: "center"
  },
  inputField: {
    width: 500,
    marginLeft: 10,
    marginRight: 10,
    color: "#f1eaea",
    flex: 1,
    characterWidth: 13,
    fontSize: 30,
    paddingTop: 10
  },
  underlineStyle: {
    borderColor: "#fff"
  },
  floatingLabelStyle: {
    color: "#fff",
    fontSize: 30
  },
  floatingLabelFocusStyle: {
    color: "#fff",
    fontSize: 14
  },
  labelStyle: {
    color: "rgba(224, 214, 214, 0.87)",
    fontSize: 14
  }
};

