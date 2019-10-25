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
import Loader from "./../../loader";
import variable from "./../../../themes/variables";
// import { phone } from "./actions";
// import {
//   SIGNUP_USER,
//   SIGNUP_USER_SUCCESS,
//   IS_LOGIN
// } from "./../../actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import ButtonSelect from "./../buttonSelect";
// import { validate } from "./validate";

import * as Animatable from "react-native-animatable";
import { TextMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-datepicker";
import ReversedFlatList from "react-native-reversed-flat-list";

// const rightButtons = [
//   <Icon
//     name="edit"
//     onPress={()=>''}
//     style={{
//       backgroundColor: "#9e9e9e",
//       fontSize: 40,
//       color: "#fff",
//       width: variable.deviceWidth / 5,
//       height: variable.deviceHeight / 5,
//       paddingHorizontal: variable.deviceWidth / 23,
//       paddingVertical: variable.deviceHeight / 23
//     }}
//   />,
//   <Icon
//     name="trash"
//     onPress={()=>''}
//     style={{
//       backgroundColor: "#ff0000",
//       color: "#fff",
//       fontSize: 40,
//       width: variable.deviceWidth / 5,
//       height: variable.deviceHeight / 5,
//       paddingHorizontal: variable.deviceWidth / 20,
//       paddingVertical: variable.deviceHeight / 27
//     }}
//   />
// ];
let navigate;
export class GrandParent extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      date: "",
      isDateTimePickerVisible: false,
      familychildren: [],
      child_visible: false
    };
    this.renderDob = this.renderDob.bind(this);
    this._showDateTimePicker=this._showDateTimePicker.bind(this)
    this._changeDate = this._changeDate.bind(this);
    this._handleDatePicked=this._handleDatePicked.bind(this);
    this._hideDateTimePicker=this._hideDateTimePicker.bind(this);
  }
  onButtonSelect = (index, selectedvalue, fieldname, colorname) => {
    let current_familychidren = {};
    let familychildren = this.state.familychildren;
    current_familychidren.colorname = colorname;
    current_familychidren.gender = selectedvalue;
    current_familychidren.date = "";
    if (fieldname == "Existing") current_familychidren.is_expecting = false;
    else current_familychidren.is_expecting = true;
    familychildren.push(current_familychidren);
    console.log("family prev", this.state.familychildren);

    this.setState({
      familychildren: familychildren
    });
    console.log("family after", this.state.familychildren);
    
  };

  

  handleDelete(value) {
    //console.log('questiom of mine', value);
    let item = this.state.familychildren;
    console.log("questiom of item", item);
    let currentLength = item.length - 1;
    console.log("prev", item[value.indexs]);
    // item[value.indexs].splice(currentLength, 1);

    // item[value.index].pop();
    // let answerindexing = "Answer_" + (value.index) + "_" + currentAnswerLength;
    // let correctanswerindexing = "correctAnswer_" + (value.index);

    delete item[value.indexs];
    console.log("now item", item);
    // delete challangeData[correctanswerindexing];

    // challangeData.correctAnswer_[value.index].splice(currentAnswerLength,1);
    this.setState(item);
  }

  renderDob({
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
    //console.log(this.props);
    if (error !== undefined) {
      hasError = true;
    }
    //input.onChange()
    return (
      <Item error={hasError} style={{ marginLeft: 0 }}>
        <Input
          {...input}
          value={this.state.date}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          /* onChangeText={(date)=>{
                                  input.onChange,
                                  this.updateSignupDate(date);
                                }
                            } */
        />
        <Icon
          name="calendar"
          backgroundColor="#d34836"
          size={20}
          marginLeft={12}
          style={{
            marginTop: 5,
            marginRight: 5,
            marginBottom: 14,
            alignSelf: "flex-end"
          }}
          onPress={this._showDateTimePicker}
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

  _changeDate = (index) => {
    console.log(index);
    this.setState({ changeDateIndex: index })
    this._showDateTimePicker();

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (deadlineDate) => {
    console.log("Mai aaya",deadlineDate)
    this.setState({ isDateTimePickerVisible: false });
    let tempmonth = parseInt(deadlineDate.getMonth()) + 1;
    let month = tempmonth < 10 ? '0' + tempmonth : tempmonth;
    let selectedDate = deadlineDate.getFullYear() + '-' +  month+ '-' + deadlineDate.getDate() ;

    let familychildren = this.state.familychildren;

    familychildren[this.state.changeDateIndex].date = selectedDate;
console.log("fffffffasdfsdfas",familychildren)

    this.setState({
      familychildren: familychildren
    });
    // this.setState({ date: selectedDate });
  };

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    // const content = <ActivityIndicator size="large" />;
    return (
      <View style={styles.container}>
        {/* {console.log("gpstate", this.state)} */}
        <Loader loading={this.props.loadingIndicator} />
        <View style={{}}>
          <DateTimePicker

            date={new Date()}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"

            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />

        </View>
        <KeyboardAwareScrollView>
          <Animatable.View animation="slideInRight">
            <Text style={styles.text}>Tell us about your family</Text>
            <Text style={styles.text_scnd}>Click to add</Text>
            <View style={styles.top_view}>
              <Container style={styles.radio_button}>
                <View style={styles.btn}>
                  <Text
                    style={{
                      width: variable.deviceWidth / 3,
                      color: "#000",
                      alignSelf: "flex-start",
                      justifyContent: "center",
                      fontSize: variable.deviceWidth / 15
                    }}
                  >
                    Existing
                  </Text>
                  <ButtonSelect
                    className="rb"
                    fieldname="Existing"
                    radioOption={[
                      { value: "Boy", displayValue: "+Boy", color: "#07d9fc" },
                      { value: "Girl", displayValue: "+Girl", color: "#f73993" }
                    ]}
                    onButtonSelect={this.onButtonSelect.bind(this)}
                  />
                </View>
              </Container>
              <Container style={styles.radio_button_second}>
                <View style={styles.button}>
                  <Text
                    style={{
                      color: "#000",
                      alignSelf: "flex-start",
                      justifyContent: "center",
                      fontSize: variable.deviceWidth / 15
                    }}
                  >
                    Expectant
                  </Text>
                  <ButtonSelect
                    className="rb"
                    fieldname="Expectant"
                    radioOption={[
                      { value: "Boy", displayValue: "+Boy", color: "#8dd7e0" },
                      {
                        value: "Girl",
                        displayValue: "+Girl",
                        color: "#f79ac9"
                      },
                      {
                        value: "un- known",
                        displayValue: "+Un-   known",
                        color: "#b3b3b3"
                      }
                    ]}
                    onButtonSelect={this.onButtonSelect.bind(this)}
                  />
                </View>
              </Container>
            </View>
            <View style={styles.bottom_view}>
              <ScrollView>
                {this.state.familychildren &&
                  this.state.familychildren

                    .map((answerList, indexs) => (
                      <View
                        key={answerList.gender + "" + indexs}
                        style={styles.list_view}
                      >
                        <SwipeRow
                          rightOpenValue={-150}
                          body={
                            <View style={{ backgroundColor: "#fff",width: variable.deviceWidth - 20, height:variable.deviceHeight/12 }}>
                              <View
                                style={{
                                  backgroundColor: answerList.colorname,
                                  width: variable.deviceWidth / 6,
                                  height:
                                    variable.deviceHeight / 10 -
                                    variable.deviceHeight / 80
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 22,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    marginTop: variable.deviceWidth / 30,
                                    color: "#fff"
                                  }}
                                >
                                  {answerList.gender}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: "#fff",

                                  width:
                                    variable.deviceWidth / 2 ,
                                  height: variable.deviceHeight / 8,
                                  marginLeft: variable.deviceWidth / 4,
                                  marginTop:-(variable.deviceHeight / 10),
                                }}
                              >
                              
                              {!this.state.familychildren[indexs].is_expecting && answerList.date !== "" && (<View><Text
                                    style={{
                                      fontSize: 20,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                      
                                      
                                    }}
                                  >
                                    Birth date:
                                  </Text>
                                  <Text style={{
                                      fontSize: 16,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                      marginTop: 5,
                                      marginLeft: 5,
                                    }}> {answerList.date}
                                    </Text>
                                   
                                  </View>
                                  )}
                                {!this.state.familychildren[indexs].is_expecting && this.state.familychildren[indexs].date === "" && (
                                    <TouchableOpacity
                                      style={{ height: 100 }}
                                      onPress={() => this._changeDate(indexs)}
                                    >

                                      <Text
                                        style={{
                                          fontSize: 20,
                                          justifyContent: "center",
                                          alignSelf: "flex-start",

                                          
                                          marginLeft: 5
                                        }}
                                      >
                                        Birth date:
                                      </Text>
                                      <Text style={{
                                      fontSize: 16,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                      marginTop: 5,
                                      marginLeft: 5
                                    }}> {answerList.date}</Text>
                                    </TouchableOpacity>
                                  )}
                                  {this.state.familychildren[indexs].is_expecting  && this.state.familychildren[indexs].date === "" &&(
                                     <TouchableOpacity
                                     style={{ height: 100 }}
                                     onPress={() => this._changeDate(indexs)}
                                   ><Text style={{
                                      fontSize: 20,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                     
                                      marginLeft: 5
                                    }}>Due date: </Text>
                                    
                                      <Text style={{
                                      fontSize: 16,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",
                                      marginTop: 5,
                                      marginLeft: 5
                                    }}> {answerList.date}</Text>
                                    </TouchableOpacity>
                                  )}
                                  {this.state.familychildren[indexs].is_expecting  && this.state.familychildren[indexs].date !== "" &&(
                                    <View><Text
                                    style={{
                                      fontSize: 20,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                      
                                      marginLeft: 5
                                    }}
                                  >Due date: </Text>
                                   
                                  <Text style={{
                                      fontSize: 16,
                                      justifyContent: "center",
                                      alignSelf: "flex-start",

                                      marginTop: 5,
                                      marginLeft: 5
                                    }}> {answerList.date}
                                    </Text>
                                   
                                  </View>
                                  )}

                                
                              </View>
                            </View>
                          }
                          right={
                            <View style={styles.swipe_icon}>
                              <Button
                                style={{
                                  backgroundColor: "#9e9e9e",
                                  height: variable.deviceHeight / 7
                                }}
                                onPress={() => this._changeDate(indexs)}
                              >
                                <Icon
                                  style={{
                                    color: "#fff",
                                    fontSize: variable.deviceHeight / 20
                                  }}
                                  active
                                  name="edit"
                                />
                              </Button>
                              <Button
                                danger
                                style={{ height: variable.deviceHeight / 7 }}
                                onPress={this.handleDelete.bind(this, {
                                  indexs
                                })}
                              >
                                <Icon
                                  style={{
                                    color: "#fff",
                                    fontSize: variable.deviceHeight / 20
                                  }}
                                  active
                                  name="trash"
                                />
                              </Button>
                            </View>
                          }
                        />
                      </View>
                    ))
                    .reverse()}
              </ScrollView>
            </View>
          </Animatable.View>
        </KeyboardAwareScrollView>
        <View style={styles.icon_btn}>
          <Animatable.View animation="slideInRight">
            <View style={{ marginRight: 10 }}>
              <Button
                style={{
                  bottom: 3,
                  backgroundColor: "#026836",
                  width: variable.deviceWidth,
                  height: variable.deviceHeight / 12
                }}
                onPress={() => navigate("FamilyDeclareRelation",{familychildren:this.state.familychildren})}
              >
                <Text style={styles.button_text}>Done </Text>
              </Button>
            </View>
          </Animatable.View>
        </View>
      </View>
    );
  }
}

const selector = formValueSelector("selectchild"); // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = state => {
  //console.log(state);
  //signupReducer
  const { loadingIndicator } = state.signupReducer;
  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  this.selectchildData = selector(state, "existing", "expectant");

  console.log("selectchildData", selectchildData);
  return {
    selectchildData,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

GrandParent = connect(mapStateToProps)(GrandParent);

export default reduxForm({
  form: "selectchild"
  //   validate
})(GrandParent);

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    width: variable.deviceWidth,
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  radio_button: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 4,
    paddingVertical: variable.deviceWidth / 80
  },
  btn: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 4,
    paddingHorizontal: variable.deviceWidth / 12,
    paddingVertical: variable.deviceWidth / 50
  },

  text: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    color: "#000",
    left: variable.deviceWidth / 15,
    justifyContent: "space-between",
    marginTop: variable.deviceHeight / 13,
    fontSize: variable.deviceHeight / 25,

    bottom: variable.deviceWidth / 20
  },
  text_scnd: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    left: variable.deviceWidth / 15,
    justifyContent: "space-between",
    marginTop: variable.deviceHeight / 105,
    fontSize: variable.deviceHeight / 40,

    bottom: variable.deviceWidth / 20
  },
  icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 12
  },

  button_text: {
    fontSize: variable.deviceHeight / 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: variable.deviceWidth / 3 + variable.deviceWidth / 20
  },
  radio_button_second: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: variable.deviceWidth / 2 + variable.deviceWidth / 10,
    height: variable.deviceHeight / 4,
    paddingVertical: variable.deviceWidth / 80
  },
  button: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 4,
    paddingHorizontal: variable.deviceWidth / 12,
    paddingVertical: variable.deviceWidth / 50
  },
  top_view: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 4
  },
  bottom_view: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: variable.deviceHeight / 40,
    width: variable.deviceWidth,
    height: variable.deviceHeight / 3 + variable.deviceHeight / 10
  },
  list_view: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: variable.deviceWidth,
    height: variable.deviceHeight / 6,
    paddingHorizontal: variable.deviceWidth / 20
  },
  swipe_icon: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: variable.deviceWidth / 3 + variable.deviceWidth / 50,
    height: variable.deviceHeight
  }
};
