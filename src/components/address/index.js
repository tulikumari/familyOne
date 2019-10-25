import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Linking,
  Animated,
  AppRegistry,
  TouchableOpacity,
  ActivityIndicator
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
import { updateUser } from "./actions";
import {
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  IS_LOGIN
} from "./../../actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";

import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//import GooglePlaceAutocomplete from "react-native-google-place-autocomplete";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AsyncStorage } from "react-native";

let navigate;
let address_auto = {};
export class Address extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      address: "",
      city: "",
      addressline2: "",
      streetaddress: "",
      addressLine2Enable: false,
      address_form: false,
      zip: "",
      state: "",
      addressHint: true,
      user_id: "",
      token: "",
      open: false,
      alertmsg: "",
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.complete = this.complete.bind(this);
    // this.handleAddress.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("user_id")
      .then(value => {
        console.log("user_id", value);
        this.setState({ user_id: value });
      })
      .done();
  }

  // openSearchModal() {
  //   RNGooglePlaces.openAutocompleteModal()
  //     .then(place => {
  //       console.log(place);
  //       // place represents user's selection from the
  //       // suggestions and it is a simplified Google Place object.
  //     })
  //     .catch(error => console.log(error.message)); // error is a Javascript Error object
  // }

  handleSubmit() {
    console.log("handle addressdata", updateData);

    let submitError = {};
    if (this.state.streetaddress === undefined) {
      submitError.streetaddress = "* Required";
    }
    if (this.state.state === undefined) {
      // error.email = '* Required';
      submitError.state = "* Required";
    }

    //return this.state.error;
    if (Object.keys(submitError).length != 0) {
      throw new SubmissionError(submitError);
    } else {
      address_auto.streetaddress = this.state.streetaddress;
      address_auto.city = this.state.city;
      address_auto.addressline2 = this.state.addressline2;
      address_auto.state = this.state.state;
      address_auto.zip = this.state.zip;

      console.log("else address_auto", address_auto);

      this.props.updateUser(address_auto, this.state.user_id, function(
        userInfo
      ) {
        console.log("else updateData", userInfo);
        if (userInfo) {
          navigate("ExpectingChild");
        }
      });
    }
  }

  complete = event => {
    console.log("event", event.terms);
    let place = new Array();
    this.setState({ address_form: true });
    if (event.terms.length == 3) {
      this.setState({
        streetaddress: event.terms[0].value,
        state: event.terms[1].value
      });
    }
    if (event.terms.length == 4) {
      console.log('events',event.terms);
      this.setState({
        streetaddress: event.terms[0].value,
        city: event.terms[1].value,
        state: event.terms[2].value
      });
      console.log("this.staet",this.state.city);
    }
    if (event.terms.length == 5) {
      this.setState({
        streetaddress: event.terms[0].value,
        addressline2: event.terms[1].value,
        city: event.terms[2].value,
        state: event.terms[3].value
      });
    }
    // this.setState({ addressHint: false });
  };

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    return (
      <View style={styles.container}>
        <Container style={styles.btn}>
          <Loader loading={this.props.loadingIndicator} />
          <KeyboardAwareScrollView>
            <View style={styles.subconatiner}>
            <Animatable.View animation="slideInRight">
              {/*} <GooglePlaceAutocomplete
                googleAPIKey="AIzaSyDc4QX8E3MvQtrN2xnOD9txHoD4MyRKUsU"
                onResult={result => console.log(result)}
                componentRestrictions={"country: ca"}
                placeholder="Type to search..."
              /> */}
              {!this.state.address_form && (
                <GooglePlacesAutocomplete
                  placeholder="Your address here"
                  minLength={2}
                  name="response"
                  autoFocus={true}
                  returnKeyType={"default"}
                  fetchDetails={true}
                  onPress={event => this.complete(event)}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: "AIzaSyDc4QX8E3MvQtrN2xnOD9txHoD4MyRKUsU",
                    language: "en",
                    components: "country:ca"
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: "rgba(0,0,0,0)",
                      borderTopWidth: 0,
                      borderBottomWidth: 0
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: variable.deviceHeight / 13,
                      color: "#5d5d5d",
                      fontSize: variable.deviceHeight / 20
                    },
                    predefinedPlacesDescription: {
                      color: "#1faadb"
                    }
                  }}
                  currentLocation={false}
                />
              )}
              {this.state.address_form && (
                <Form>
                  <Input
                    name="streetaddress"
                    autoFocus={this.state.focuslastNameInput}
                    value={this.state.streetaddress}
                    placeholder=""
                    placeholderTextColor={"#ccc"}
                    style={{
                      color: "rgb(55,211,246)",
                      height: variable.deviceHeight / 10,
                      fontSize: variable.deviceHeight / 18
                    }}
                    onChangeText={value => {
                      this.setState({ streetaddress: value });
                    }}
                  />
                  

                  {this.state.addressLine2Enable && (
                    <Input
                      name="addressline2"
                      autoFocus={this.state.focuslastNameInput}
                      value={this.state.addressline2}
                      placeholder="address line 2"
                      placeholderTextColor={"#ccc"}
                      style={{
                        color: "#808080",
                        height: variable.deviceHeight / 10,
                        fontSize: variable.deviceHeight / 18
                      }}
                      onChangeText={value => {
                        this.setState({ addressline2: value });
                      }}
                    />
                  )}
                  {!this.state.addressLine2Enable && (
                    <Label
                      onPress={event => {
                        this.setState({ addressLine2Enable: true });
                      }}
                      style={styles.add_address}
                    >
                      Add line 2
                    </Label>
                  )}
                  <Input
                    name="city"
                    autoFocus={this.state.focuslastNameInput}
                    value={this.state.city}
                    placeholder=""
                    placeholderTextColor={"#ccc"}
                    style={{
                      color: "#808080",
                      height: variable.deviceHeight / 10,
                      fontSize: variable.deviceHeight / 18
                    }}
                    onChangeText={value => {
                      this.setState({ city: value });
                    }}
                  />
                  <Input
                    name="state"
                    autoFocus={this.state.focuslastNameInput}
                    value={this.state.state}
                    placeholder=""
                    placeholderTextColor={"#ccc"}
                    style={{
                      color: "#ff0080",
                      height: variable.deviceHeight / 10,
                      fontSize: variable.deviceHeight / 18
                    }}
                    onChangeText={value => {
                      this.setState({ state: value });
                    }}
                  />

                  <Input
                    name="zip"
                    autoFocus={this.state.focuslastNameInput}
                    value={this.state.zip}
                    placeholder=""
                    placeholderTextColor={"#ccc"}
                    style={{
                      color: "#ccc",
                      height: variable.deviceHeight / 10,
                      fontSize: variable.deviceHeight / 18
                    }}
                    onChangeText={value => {
                      this.setState({ zip: value });
                    }}
                  />
                </Form>
              )}
            </Animatable.View>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.icon_btn}>
            <Animatable.View animation="slideInRight">
              <View style={{ marginTop: 5, marginLeft: 10 }}>
                <TouchableOpacity>
                  <Icon
                    name="chevron-circle-left"
                    size={50}
                    color={"#EAECEE"}
                    marginRight={10}
                    //onPress={() => this.props.navigation.goBack()}
                    style={styles.icons_left}
                  />
                </TouchableOpacity>
              </View>
            </Animatable.View>
            <Animatable.View animation="slideInRight">
              <View style={{ marginTop: 5, marginRight: 10 }}>
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
        </Container>
      </View>
    );
  }
}

const selector = formValueSelector("UpdateData"); // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = state => {
  //signupReducer
  const { loadingIndicator } = state.signupReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  this.updateData = selector(
    state,
    "response",
    "streetaddress",
    "city",
    "addressline2",
    "state",
    "zip"
  );

  console.log("update_data", updateData);
  return {
    updateData,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

Address = connect(mapStateToProps, { updateUser })(Address);

export default reduxForm({
  form: "UpdateData",
  validate
})(Address);

const styles = {
  container: {
    flex: 1,
    // justifyContent: "center",
    //alignItems: "stretch",
    width: variable.deviceWidth,
    height:variable.deviceHeight,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  // btn: {
  //   alignSelf: "stretch",
  //   backgroundColor: "red",
  //   flexDirection: "column",
  //   justifyContent: "space-between"
  // },
  btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 2 + variable.deviceHeight / 20,
    paddingVertical: 5,
    marginTop: 50
  },
  icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 10
  },
  icons_right: {
    alignSelf: "flex-end",
    position: "relative"
  },
  icons_left: {
    alignSelf: "flex-start",
    position: "relative"
  },
  button: {
    margin: 12
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
  },
  add_address: {
    color: "red",
    fontSize: 18,
    alignSelf: "flex-end"
  },
  subcontainer: {
    // paddingLeft: '10%',
    // paddingRight: "10%",
    alignSelf: 'center'
  }
};
