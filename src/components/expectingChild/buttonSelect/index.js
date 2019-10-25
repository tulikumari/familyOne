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
export default class ButtonSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      valueGet: ""
    };
  }
  componentDidMount() {
    let listlength = this.props.radioOption.length;
    let options = [];
    for (let i = 0; i < listlength; i++) {
      options.push(false);
    }
    this.setState({
      questionList: this.props.radioOption,
      optiondisable: options,
      listlength: listlength
    });
  }

  onButtonSelect(selected) {
    cosnole.log('selected',selected);
    this.setState({ selected });
  }
  

  changeColor = (index, value) => {
    console.log('value',value.value);
    this.setState({ valueGet: value.value });
    let optionlist = [];
    console.log('state',this.state)
    for (let i = 0; i < this.state.listlength; i++) {
      if (index === i) {
        optionlist.push(true);
      } else {
        optionlist.push(false);
      }
    }
    this.setState({ optiondisable: optionlist });
    console.log('index',index)
    console.log('value.value',value.value)
    console.log('this.props.fieldname',this.props.fieldname)
    console.log('value.color',value.color)
    console.log('this.props.onButtonSelect',this.props.onButtonSelect)
    if (this.props.onButtonSelect) {
      
      this.props.onButtonSelect(
        index,
        value.value,
        this.props.fieldname,
        value.color
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.questionList.length == 2 &&
        <View style={styles.btn}>
          <View style={styles.leveldesign}>
            {this.state.questionList &&
              this.state.questionList.map((answerList, indexs) => (
                <View key={indexs} >
                  <Button
                    name= {answerList.fieldname}
                    key={answerList.displayValue + "" + indexs}
                    onPress={this.changeColor.bind(this, indexs, answerList)}
                    style={{backgroundColor:answerList.color,
                    width:(variable.deviceWidth/6),
                    height:variable.deviceHeight/10- variable.deviceHeight/80,
                    marginTop:variable.deviceHeight/25,
                    marginLeft:variable.deviceWidth/110,
                    marginRight:variable.deviceWidth/110
                    }} 
                  >
                    <Text style={styles.button_text}>
                      {answerList.displayValue}
                    </Text>
                  </Button>
                </View>
              ))}
          </View>
        </View> 
        }
        {this.state.questionList.length != 2 &&
        <View style={styles.btnscnd}>
          <View style={styles.leveldesignscnd}>
            {this.state.questionList &&
              this.state.questionList.map((answerList, indexs) => (
                <View key={indexs} >
                  <Button
                    name= {answerList.fieldname}
                    key={answerList.displayValue + "" + indexs}
                    onPress={this.changeColor.bind(this, indexs, answerList)}
                    style={{backgroundColor:answerList.color,
                    width:(variable.deviceWidth/6),
                    height:variable.deviceHeight/10- variable.deviceHeight/80,
                    marginTop:variable.deviceHeight/25,
                    marginLeft:variable.deviceWidth/110,
                    marginRight:variable.deviceWidth/110
                    }} 
                  >
                    <Text style={styles.button_text}>
                      {answerList.displayValue}
                    </Text>
                  </Button>
                </View>
              ))}
          </View>
        </View> 
        }
      </View>
    );
  }
}

// const selector = formValueSelector("selectchild"); // <-- same as form name

// // This is the state of global app and not state of your Component
// const mapStateToProps = state => {
//   //console.log(state);
//   //signupReducer
//   const { loadingIndicator } = state.signupReducer;
//   const { isLogin, logged_in_user_id } = state.checkLoginReducer;
//   this.selectchildData = selector(state, "", "verification_code");

//   console.log("buttonselectchildData", selectchildData);
//   return {
//     selectchildData,
//     loadingIndicator,
//     isLogin,
//     logged_in_user_id
//   };
// };

// ButtonSelect = connect(mapStateToProps)(ButtonSelect);


// export default reduxForm({
//     form: "selectchild",
//   //   validate
//   })(ButtonSelect);

const styles = {
  container: {
    flex: 1,
    width: variable.deviceWidth,
    alignSelf: "center",
    justifyContent:"space-evenly",
    backgroundColor: "#fff",
    marginRight:30
  },
  btn: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: variable.deviceWidth/3+30,
    height: variable.deviceHeight /7,
    marginLeft:10
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
    fontSize: variable.deviceHeight/60,
    justifyContent: "space-evenly"
  },
  button: {
    width: variable.deviceWidth / 3,
    height: variable.deviceHeight / 5,
    borderRadius: 20,
    top: variable.deviceWidth / 20
  },

  leveldesign: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: variable.deviceWidth/3+10,
    height: variable.deviceHeight /8,
  },
  leveldesignscnd: {
    backgroundColor: "#fff",
    flexDirection: "row",
    width: variable.deviceWidth-80,
    height: variable.deviceHeight /8,
    marginTop:6
    
  },
  btnscnd: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: variable.deviceWidth-80,
    height: variable.deviceHeight /7  ,
    marginRight:10
  },
};

