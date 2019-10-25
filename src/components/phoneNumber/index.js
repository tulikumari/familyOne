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
  TextInput,
  Alert,
  AsyncStorage
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
  Toast
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
import { phone , phone_update} from "./actions";

import Icon from "react-native-vector-icons/FontAwesome";

import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import { TextMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SmsListener from "react-native-android-sms-listener";
import Button from "react-native-button";
import TimerCountdown from "react-native-timer-countdown";
let navigate;

export class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      phone_number: "",
      is_verify: false,
      phone_number_complete: false,
      user_id:"",
      verification_code: "",
      is_verified:""
    };

    this.SMSReadSubscription = {};
    this.renderInput = this.renderInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }
 

componentDidMount(){
  AsyncStorage.getItem("user_id")
  .then(value => {
    console.log("user_id", value);
    this.setState({ user_id: value });
  })
  .done();
}

  handlePhone() {
    if (phoneData.phone_number) {
      if (phoneData.phone_number.length == 10) {
        this.setState({ phone_number_complete: true });
        this.setState({ phone_number: phoneData.phone_number });
      }
      else{
        Alert.alert(
          'Error',
          'Invalid Number',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    }
  }
  handleNo() {
    console.log('no phone data',phoneData);
    if (phoneData.phone_number) {
      if (phoneData.phone_number.length > 0) {
        this.setState({ phone_number_complete: false });
        this.setState({ phone_number: "" });
        phoneData.phone_number = "";
        console.log('no after phone data',phoneData);
        // SmsListener.addListener(message => {
        //   console.info(message);
        // });
      }
    }
  }


  handleSubmit=()=> {
    console.log("handle phone up", phoneData);
    console.log("verification code", this.state.verification_code);
   
  if (phoneData.phone_number) {
    if (phoneData.phone_number.length > 0) {
      let submitError = {};
      if (phoneData.phone_number === undefined) {
        submitError.phone_number = "* Required";
      }
      if (phoneData.phone_number.length > 10) {
        submitError.phone_number = "* Not Valid";
      }
      if (this.state.is_verify) {
        if (this.state.verification_code.length == 4) {
          submitError.verification_code = "* Not Valid";
        }
      }
      //return this.state.error;
      if (Object.keys(submitError).length != 0) {
        throw new SubmissionError(submitError);
      } else {
        console.log("else phoneData", phoneData);
        if (this.state.verification_code) {
          this.props.phone(phoneData, this.state.verification_code, function (phone_success) {
            console.log("verify phone_success", phone_success);
            if (phone_success.success == true) {
              navigate("SkillTestQuestion");  

            }
          });
          console.log('user_id',this.state.user_id);
              this.props.phone_update(phoneData,this.state.user_id, (response) =>{
                if (response.length > 0) {
                  
                }
              })
        } else {
          this.props.phone(phoneData, this.state.verification_code,  (phone_success)=> {
            if (phone_success.is_cellphone) {
              console.log("else phone_success", phone_success);
              this.setState({ is_verify: true });
              this._registerSmsListener();
              
            }

          });

        }
      }
    }
  }
}


_registerSmsListener=()=> {

  console.log("_registerSmsListener is called")
  
  let subscription = SmsListener.addListener((message) => {
    console.log("Message",message)
    let verificationCodeRegex = /Your Familyone Phone verification code is: ([\d]{6})/

    if (verificationCodeRegex.test(message.body)) {
      let verificationCode = message.body.match(verificationCodeRegex)[1]
      Alert.alert(verificationCode);
     this.setState({verification_code:verificationCode})
          subscription.remove()
          return
        

        if (__DEV__) {
          console.info(
            'Failed to verify phone `%s` using code `%s`',
            message.originatingAddress,
            verificationCode
          )
        }
      
    }
  })
}
  renderInput = ({
    input,
    label,
    type,
    placeholder,
    password,
    parse,
    placeholderTextColor,
    meta: { touched, error, warning }
  }) => {
    var hasError = false;
    //console.log(this.props);
    if (error !== undefined) {
      hasError = true;
    }

    return (
      <Item error={hasError} style={{ marginLeft: 0 }}>
        <Input
          {...input}
          value={input.value}
          placeholder={placeholder}
          keyboardType="numeric"
          secureTextEntry={password}
          parse={parse}
          autoFocus={true}
          onSubmitEditing={this.handlePhone.bind()}
          /* underlineColorAndroid="transparent" */
          style={{
            fontSize: textFontSize1,
            color: "grey",
            width: variable.deviceWidth -20,
            height: variable.deviceHeight / 10,
          }}
          placeholderTextColor={"#9e9e9e"}
          underlineColorAndroid={"#fff"}
          /* style={{ color: "#17202A", fontSize: 26 }} */
          autoCapitalize="none"
        />
        {hasError ? (
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: variable.backgroundColor
            }}
          >
            {error}
          </Text>
        ) : (
          <Text />
        )}
      </Item>
    );
  };

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    return (
      <View style={styles.container}>
        <Loader loading={this.props.loadingIndicator} />

        <Form>
          {!this.state.is_verify && (
            <Animatable.View animation="slideInRight">
              <View style={styles.subcontainer}>
                <View>
                  <Text style={styles.text}>
                    Please enter your mobile number
                  </Text>
                  {!this.state.phone_number_complete && (
                    <Field
                      name="phone_number"
                      component={this.renderInput}
                      type="text"
                      placeholder="Your number here"
                      password={false}
                      
                      placeholderTextColor="#eee"
                    />
                  )}
                  {this.state.phone_number_complete && (
                    <Text
                      style={{
                        fontSize: textFontSize1,
                        color: "grey",
                        width:
                          variable.deviceWidth / 2 + variable.deviceWidth / 5,
                        marginLeft: variable.deviceWidth / 20,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center"
                      }}
                    >
                      {" "}
                      {this.state.phone_number}{" "}
                    </Text>
                  )}
                </View>
                {this.state.phone_number_complete && (
                  <View>
                    <Text style={styles.iscorrect}>Is this correct ?</Text>
                  </View>
                )}
                {this.state.phone_number_complete && (
                  <View style={styles.buttonyesno}>
                    <TouchableOpacity>
                      <Button onPress={this.handleNo.bind()}>
                        <Text
                          style={{
                            fontSize: textFontSize,
                            textAlign: "center",
                            color: "white",
                            backgroundColor: "#C1262C",
                            height: 90,
                            width: buttonwidth,
                            borderRadius: 12,
                            paddingTop: 27
                          }}
                        >
                          No
                        </Text>
                      </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Button onPress={this.handleSubmit.bind()}>
                        <Text
                          style={{
                            fontSize: textFontSize,
                            textAlign: "center",
                            color: "white",
                            backgroundColor: "#136837",
                            height: 90,
                            width: buttonwidth,
                            borderRadius: 12,
                            marginLeft: 8,
                            paddingTop: 27
                          }}
                        >
                          Yes
                        </Text>
                      </Button>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Animatable.View>
          )}
          {this.state.is_verify && (
            <Animatable.View animation="slideInRight">
              <View style={styles.subcontainer}>
                <View style={styles.contant}>
                  <Text style={styles.text_code}>A code has been send to</Text>
                  <Text style={styles.text1}>{this.state.phone_number}</Text>
                </View> 
                <View style={styles.contant_second}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    value={this.state.verification_code}
                    style={{
                      fontSize: textFontSize1,
                      color: "grey",
                      width: "80%"
                    }}
                    keyboardType="numeric"
                    placeholder="Enter code"
                    onChangeText={value=>{this.setState({verification_code:value})}}
                    onSubmitEditing={this.handleSubmit.bind()}
                  />
                  
                </View>
                <View style={styles.contant2}>
                  <Text style={styles.textNocode}>
                    ──── No code?{" "}
                    <TimerCountdown
                      initialSecondsRemaining={60000}
                     
                      onTimeElapsed={() => this.handleSubmit.bind()}
                      allowFontScaling={true}
                      style={styles.headerText1}
                    />{" "}
                    ────
                  </Text>
                  <Text style={styles.textNocode}>
                    <Text onPress={this.handleSubmit.bind()}>Resend </Text>|
                    Call
                  </Text>
                </View>
              </View>
            </Animatable.View>
          )}
        </Form>

        <View style={styles.icon_btn}>
          <Animatable.View animation="slideInRight">
            <View style={{ marginTop: 100, marginLeft: 10 }}>
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
          </Animatable.View>
          <Animatable.View animation="slideInRight">
            <View style={{ marginTop: 100, marginRight: 10 }}>
              <TouchableOpacity>
                <Icon
                  name="chevron-circle-right"
                  size={50}
                  color={"#9e9e9e"}
                  onPress={this.props.handleSubmit(
                    this.handleSubmit.bind(onSubmit)
                  )}
                  style={styles.icons_right}
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </View>
    );
  }
}

const selector = formValueSelector("phone"); // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = state => {
  //signupReducer
  const { phone_number, loadingIndicator } = state.phoneReducer;
  // const {  loadingIndicator } = state.updateReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  this.phoneData = selector(state, "phone_number", "verification_code");

  console.log("phoneData", phoneData);
  return {
    phoneData,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

PhoneNumber = connect(mapStateToProps, { phone,phone_update })(PhoneNumber);

export default reduxForm({
  form: "phone",
  validate
})(PhoneNumber);
var textFontSize = variable.deviceWidth * 0.06;
var textFontSize1 = variable.deviceWidth * 0.09;
var buttonwidth = variable.deviceWidth / 4;
const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: 'space-between'
  },
  text: {
    paddingTop: variable.deviceHeight / 10,
    textAlign: "center",
    height: variable.deviceHeight / 4,
    color: "black",
    fontSize: textFontSize
  },
  iscorrect: {
    textAlign: "center",
    color: "black",
    fontSize: textFontSize,
    paddingBottom: 40
  },
  buttonyesno: {
    marginLeft: "22%",
    flex: 1,
    flexDirection: "row"
  },

  contant: {
    width: variable.deviceWidth,
    height: variable.deviceWidth / 2
  },
  text_code: {
    paddingTop: variable.deviceHeight / 15,
    textAlign: "center",
    color: "black",
    fontSize: textFontSize
  },
  text1: {
    textAlign: "center",
    fontSize: textFontSize,
    color: "grey"
  },
  contant_second: {
    marginLeft: "15%"
  },
  textNocode: {
    textAlign: "center",
    fontSize: variable.deviceWidth / 22,
    color: "black"
  },
  contant2: {
    paddingTop: variable.deviceWidth / 15,
    width: variable.deviceWidth,
    height: variable.deviceHeight / 2
  },
  icon_btn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subcontainer: {
    // paddingLeft: '10%',
    // paddingRight: "10%",
    alignSelf: 'center'
  }
};
