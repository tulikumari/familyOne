import React, { Component } from "react";
//import Expo from 'expo';
import {
  Platform,
  View,
  Button,
  Linking,
  Animated,
  AppRegistry,
  TouchableOpacityView,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Alert
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
import { signupUser } from "./actions";
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  IS_LOGIN
} from "./../../actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";

import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
//import {ResponsiveComponent,ResponsiveStyleSheet} from "react-native-responsive-ui";
let navigate;
export class basicContactDetails extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      firstname_complete: false,
      lastname_complete: false
    };
    this.renderInputFirstName = this.renderInputFirstName.bind(this);
    this.renderInputLastName = this.renderInputLastName.bind(this);
    this.renderInputEmail = this.renderInputEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.completeName.bind(this);
  }

  handleSubmit() {
    console.log("firstname", signupData.firstName);
    if (signupData.firstName) {
      if (signupData.firstName.length > 0) {
        this.setState({ firstname_complete: true });
        if (signupData.lastName) {
          if (signupData.lastName.length > 0) {
            this.setState({ lastname_complete: true });
          }
        }
      }
    }

    if (signupData.email) {
      if (signupData.email.length > 0) {
        let submitError = {};
        if (signupData.firstName === undefined) {
          submitError.firstName = "* Required";
        }
        if (signupData.email === undefined) {
          submitError.email = "* Required";
        }
        if (signupData.lastName === undefined) {
          submitError.lastName = "* Required";
        }

        //return this.state.error;
        if (Object.keys(submitError).length != 0) {
          Alert.alert(
            "Error",
            "Invalid Information Entered",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          // throw new SubmissionError(submitError);
        } else {
          console.log("calling signupData", signupData);

          
          this.props.signupUser(signupData, function(userInfo) {
            
            console.log("after success signupData", userInfo);
            if (userInfo.length != 0) {
              navigate("Address");
            }
          });
        }
      }
    }
  }

  renderInputFirstName = ({
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
    if (error !== undefined) {
      hasError = true;
    }

    return (
      <Item error={hasError} style={{ marginLeft: 0 }}>
        <Input
          {...input}
          value={input.value}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          onSubmitEditing={this.handleSubmit.bind()}
          placeholderTextColor={"#9e9e9e"}
          style={{ color: "#000000",height:variable.deviceHeight / 10, fontSize: variable.deviceHeight / 20 }}
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

  renderInputLastName = ({
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
          secureTextEntry={password}
          onSubmitEditing={this.handleSubmit.bind()}
          parse={parse}
          placeholderTextColor={"#9e9e9e"}
          style={{ color: "#000000", height:variable.deviceHeight / 10,fontSize: variable.deviceHeight / 20 }}
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

  renderInputEmail = ({
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
          secureTextEntry={password}
          onSubmitEditing={this.handleSubmit.bind()}
          parse={parse}
          placeholderTextColor={"#9e9e9e"}
          style={{ color: "#000000", fontSize: variable.deviceHeight / 20 ,height:variable.deviceHeight/8}}
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
        <Animatable.View animation="slideInRight">
          <View style={styles.subcontainer}>
          <View style={styles.form_view}>
            <Form>
              <Animatable.View  animation="slideInUp">
                <Field
                  name="firstName"
                  component={this.renderInputFirstName}
                  type="text"
                  placeholder="Enter First Name"
                  password={false}
                  placeholderTextColor="#eee"
                />
              </Animatable.View>
              <Animatable.View duration={5000} animation="slideInUp">
                {this.state.firstname_complete && (
                  <Field
                    name="lastName"
                    component={this.renderInputLastName}
                    type="text"
                    placeholder="Last Name"
                    password={false}
                    placeholderTextColor="#eee"
                  />
                )}
              </Animatable.View>
              <Animatable.View duration={5000} animation="slideInUp">
                {this.state.lastname_complete && (
                  <Field
                    name="email"
                    component={this.renderInputEmail}
                    type="email"
                    placeholder="Email"
                    password={false}
                    placeholderTextColor="#eee"
                  />
                )}
              </Animatable.View>
            </Form>
          </View>
          </View>
          <View style={styles.icon_btn}>
            <View style={{ marginTop: 100, marginLeft: 10 }}>
              <TouchableOpacity>
                <Icon
                  name="chevron-circle-left"
                  size={50}
                  color={"#9e9e9e"}
                  marginRight={10}
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.icons_left}
                />
              </TouchableOpacity>
            </View>
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
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const selector = formValueSelector("Signup"); // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = state => {
  //console.log(state);
  //signupReducer
  const { loadingIndicator } = state.signupReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  this.signupData = selector(state, "firstName", "lastName", "email");

  // console.log("signup_data", signupData);
  return {
    signupData,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

basicContactDetails = connect(mapStateToProps, { signupUser })(
  basicContactDetails
);

export default reduxForm({
  form: "Signup",
  validate
})(basicContactDetails);

const styles = {
  container: {
    flex: 1,
    height:variable.deviceHeight,
    width:variable.deviceWidth,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#fff",
    

  },
  subcontainer: {
    // paddingLeft: '10%',
    // paddingRight: "10%",
    alignSelf: 'center'
  },
  form_view: {
    marginTop: variable.deviceHeight / 6,
    backgroundColor: "#fff",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 2
  },
  icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icons_right: {
    alignSelf: "flex-end",
    position: "relative"
  },
  icons_left: {
    alignSelf: "flex-start",
    position: "relative"
  }
};
