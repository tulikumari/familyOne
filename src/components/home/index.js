import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Animated,
  AppRegistry,
  TouchableOpacity
} from "react-native";

import { Container, Header, Content, Form, Item, Input } from "native-base";

import {
  Field,
  reduxForm,
  formValueSelector,
  getFormValues,
  isValid,
  SubmissionError
} from "redux-form";
import { connect } from "react-redux";
import variable from "./../../themes/variables";
import { loginApi } from "./../../api/outh";
import Loader from "./../loader";

import { loginUser } from "./actions";
import { LOGIN_USER, IS_LOGIN } from "./../../actionTypes";
import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";

//import Auth0 from "react-native-auth0";

// const auth0 = new Auth0({
//   domain: "family-one.auth0.com",
//   clientId: "770LzyJ5T-UzxwDL3MaQqYq_yGpSW38O"
// });

let navigate;

export class Home extends Component {
  constructor(props) {
    super(props);

    navigate = props.navigation.navigate;
    //const { goBack } = this.props.navigation;
    //console.log("navigate", this.props);

    this.state = {
      email: "",
      open: false,
      alertmsg: "",
      is_login: false,
      login: ""
    };
    let { dispatch } = this.props;

    this.handleSignup.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.complete.bind(this);
  }

  handleSubmit() {
    let submitError = {};

    if (loginData === undefined) {
      submitError.email = "* Required";
    }
    // if(loginData.match(/^([a-zA-Z0-9_.-]+@([\w-]+\.)+[\w-]{2,4})?$/) )
    // {
    //   console.log('error');
    //   submitError.email = "* Invalid";
    // }
    //return this.state.error;
    if (Object.keys(submitError).length != 0) {
      throw new SubmissionError(submitError);
    } else {
      //loginApi(this.loginData, navigation);
      console.log("loginData function", loginData);
      //navigate("BasicContactDetails");
      // this.props.loginUser(loginData, function(userInfo) {
      //   if (Object.keys(userInfo).length != 0) {
      //     navigate("Contest");
      //   }
      // });
      // auth0.webAuth
      //   .authorize({
      //     scope: "openid email",
      //     audience: "https://family-one.auth0.com/userinfo"
      //   })
      //   .then(
      //     credentials => console.log(credentials)
      //     // Successfully authenticated
      //     // Store the accessToken
          
      //   )
      //   .catch(error => console.log(error));
    }
  }

  handleSignup = () => {
    let redirect = this.props.history;
    this.setState({ is_login: false });
    redirect.push("/signup/step-1");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // complete = () => {
  //   let redirect = this.props.history;
  //   navigate("contest");
  // };

  renderInput({
    input,
    label,
    type,
    placeholder,
    password,
    parse,
    placeholderTextColor,
    meta: { touched, error, warning }
  }) {
    var hasError = false;

    if (error !== undefined) {
      hasError = true;
    }

    return (
      <Item error={hasError}>
        <Input
          {...input}
          value={input.value}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          placeholderTextColor={"#9e9e9e"}
          onSubmitEditing={this.handleSubmit.bind()}
          style={{ color: "#000" }}
          autoCapitalize="none"
        />
        {hasError ? (
          <Text
            style={{
              paddingLeft: 3,
              paddingRight: 3,
              backgroundColor: "#fff",
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
  }

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;
    return (
      <View style={styles.container}>
        {!this.state.is_login && (
          <Container style={styles.btn}>
            <View
            style={{
                width: variable.deviceWidth / 3,
                height: variable.deviceHeight / 3,
                paddingVertical: 80
              }}
            >
              <Button
              style={{
                  width: variable.deviceWidth,
                  height: variable.deviceHeight,
                  fontSize: 40
                }}
                onPress={() => this.setState({ is_login: true })}
                title="Login"
                accessibilityLabel="Login"
              />
            </View>
            <View
              style={{
                width: variable.deviceWidth / 3,
                height: variable.deviceHeight / 3,
                paddingVertical: 80
              }}
            >
              <Button
                style={{
                  width: variable.deviceWidth,
                  height: variable.deviceHeight,
                  fontSize: 40
                }}
                onPress={() => navigate("BasicContactDetails")} 
                title="Signup"
                accessibilityLabel="Signup"
              />
            </View>
          </Container>
        )}

        {this.state.is_login && (
          <Animatable.View animation="slideInRight">
            <View
              style={{
                width: variable.deviceWidth,
                height: variable.deviceHeight / 2
              }}
            >
              <Loader loading={this.props.loadingIndicator} />
              <Form>
                <Field
                  name="email"
                  component={this.renderInput}
                  type="text"
                  placeholder="Enter Your Email"
                />

                <View style={styles.icon_btn}>
                  <View style={{ marginTop: 100, marginLeft: 10 }} />
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
              </Form>
            </View>
          </Animatable.View>
        )}
      </View>
    );
  }
}

const selector = formValueSelector("Login"); // <-- same as form name

const mapStateToProps = state => {
  // console.log(state);
  //signupReducer
  const { userinfo, loadingIndicator, signinerror } = state.loginReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  this.loginData = selector(state, "email");
  console.log("logindata_last", this.loginData);
  return {
    loginData,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

Home = connect(mapStateToProps, { loginUser })(Home);

export default reduxForm({
  form: "Login",
  validate
})(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    width: variable.deviceWidth,
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icons_right: {
    alignSelf: "flex-end",
    position: "relative",
    bottom: 0
  }
});
