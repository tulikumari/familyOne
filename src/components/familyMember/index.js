import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  View,
  Modal,
  TextInput,
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

// import { connectionStateError, modalHandler } from './../../action';

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import Loader from "./../loader";
import variable from "./../../themes/variables";
import { familyAddinfo, insertUser, deleteEditlist } from "./actions";
import RNPickerSelect from "react-native-picker-select";

import { Dimensions } from "react-native";

import * as Animatable from "react-native-animatable";

export class FamilyMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favColor: "",
      contactfirstName: "",
      contactlastName: "",
      error: {},
      editerror: {},
      contactEmail: "",
      email: "",
      editData: false,
      name: "",
      member_email: "",
      firstName: "",
      lastName: "",
      open: false,
      alertmsg: "",
      enterData: true,
      familymemberdata: [],
      firstname_complete: false,
      lastname_complete: false,
      email_complete: false,
      items: [
        {
          label: "Offspring",
          value: "offspring"
        },
        {
          label: "Radiohead",
          value: "radiohead"
        },
        {
          label: "Muse",
          value: "muse"
        },
        {
          label: "R.E.M",
          value: "rem"
        },
        {
          label: "The Killers",
          value: "killers"
        },
        {
          label: "Social Distortion",
          value: "socialdistortion"
        }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitLast = this.handleSubmitLast.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleinputEdit = this.handleinputEdit.bind(this);
    this.submiteditting = this.submiteditting.bind(this);
  }
  componentDidMount() {
    // this.props.modalHandler(true)
    let user_id = "email|5b06fefda6803a9191497f88";
    console.log("Challo");
    this.props.familyAddinfo(user_id, data => {
      if (typeof data.user_metadata.relation !== "undefined") {
        if (data.user_metadata.relation.length > 0) {
          this.setState({
            enterData: false,
            familymemberdata: data.user_metadata.relation
          });
        }
      }
    });
  }

  handleSubmitLast = value => {
    console.log("validateas", value);

    this.setState({
      favColor: value,
      enterData: false
    });
    let cfname = this.state.contactfirstName;
    let clname = this.state.contactlastName;

    let cemail = this.state.contactEmail;
    let errorList = {};
    if (
      this.state.contactfirstName === undefined ||
      this.state.contactfirstName === ""
    ) {
      errorList.contactfirstNameError = "* Required";
      cfname = "";
    }
    if (cemail.length < 8 && cemail !== "") {
      errorList.contactEmailError = "too short";
      cemail = "";
    }
    if (
      this.state.contactEmail === undefined ||
      this.state.contactEmail === ""
    ) {
      errorList.contactEmailError = "* Required";
      cemail = "";
    }

    if (!cemail.includes(".") && cemail !== "") {
      errorList.contactEmailError = ". not included";
      cemail = "";
    }
    if (!cemail.includes("@") && cemail !== "") {
      errorList.contactEmailError = "@ not included";
    }

    if (Object.keys(errorList).length != 0) {
      this.setState({ error: errorList });
    } else {
      let tempfamilymemberdata = {};
      let familymemberdata = this.state.familymemberdata;
      tempfamilymemberdata.firstName = this.state.contactfirstName;
      tempfamilymemberdata.lastName = this.state.contactlastName;
      tempfamilymemberdata.relationship = value;
      tempfamilymemberdata.member_email = this.state.contactEmail;
      familymemberdata.push(tempfamilymemberdata);
      this.setState({
        enterData: false,
        contactfirstName: "",
        contactlastName: "",
        contactEmail: "",
        name: "",
        member_email: "",
        firstname_complete: false,
        lastname_complete: false,
        email_complete: false,
        focusfirstNameInput: false,
        focuslastNameInput: false,
        focusEmailInput: false,
        familymemberdata: familymemberdata
      });
      let user_id = "email|5b06fefda6803a9191497f88";
      this.props.insertUser(
        tempfamilymemberdata,
        familymemberdata,
        user_id,
        (data) => { }
      );
      console.log("sdffffffffasdfrasdf", this.state.familymemberdata);
    }
  };

  handleSubmit = () => {
    console.log("handle sinp up", this.state.contactfirstName);
    if (this.state.contactfirstName && !this.state.firstname_complete) {
      if (this.state.contactfirstName.length > 0)
        this.setState({
          firstname_complete: true,
          focuslastNameInput: true,
          name: this.state.contactfirstName
        });
    }
    if (
      this.state.contactlastName &&
      this.state.firstname_complete &&
      !this.state.lastname_complete
    ) {
      let tempname = this.state.name;
      tempname = tempname + " " + this.state.contactlastName;
      if (this.state.contactlastName.length > 0)
        this.setState({
          lastname_complete: true,
          name: tempname,
          focusEmailInput: true
        });
    }
    if (this.state.contactEmail && this.state.lastname_complete) {
      let errorList = {};
      let cemail = this.state.contactEmail;
      if (cemail.length < 8 && cemail !== "") {
        errorList.contactEmailError = "too short";
        cemail = "";
      }
      if (
        this.state.contactEmail === undefined ||
        this.state.contactEmail === ""
      ) {
        errorList.contactEmailError = "* Required";
        cemail = "";
      }

      if (!cemail.includes(".") && cemail !== "") {
        errorList.contactEmailError = ". not included";
        cemail = "";
      }
      if (!cemail.includes("@") && cemail !== "") {
        errorList.contactEmailError = "@ not included";
      }

      if (Object.keys(errorList).length != 0) {
        this.setState({ error: errorList });
      } else {
        this.setState({
          member_email: this.state.contactEmail,
          email_complete: true
        });
      }

      //return this.state.error;
    }
  };

  handleDelete(value) {
    //console.log('questiom of mine', value);
    let item = this.state.familymemberdata;
    console.log("questiom of item", item);
    let currentLength = item.length - 1;
    console.log("prev", item[value.indexs]);
    // item[value.indexs].splice(currentLength, 1);

    // item[value.index].pop();
    // let answerindexing = "Answer_" + (value.index) + "_" + currentAnswerLength;
    // let correctanswerindexing = "correctAnswer_" + (value.index);

    delete item[value.indexs];
    console.log("now item", item);
    let familymemberdata = [];
    item.forEach((value, index) => {
      if (typeof value.member_email !== 'undefined') {
        familymemberdata.push(item[index])
      }
    });
    this.setState({ familymemberdata: familymemberdata });
    let user_id = "email|5b06fefda6803a9191497f88";
    this.props.deleteEditlist(

      familymemberdata,
      user_id,
      (data) => {
        console.log(data); this.setState(item);
      }
    );
    // delete challangeData[correctanswerindexing];

    // challangeData.correctAnswer_[value.index].splice(currentAnswerLength,1);

  }

  handleEdit(value) {
    //console.log('questiom of mine', value);
    let item = this.state.familymemberdata[value.indexs];
    console.log("now item", item);
    this.setState({
      editcontactfirstName: item.firstName + " " + item.lastName,
      editData: true,
      indexEdit: value.indexs,
      relationship: item.relationship,
      editcontactEmail: item.member_email
    });
  }
  handleinputEdit(fieldname) {
    let errorList = {};

    let cemail = this.state.editcontactEmail;
    let cname = [];
    let tempname = this.state.editcontactfirstName.trim();
    cname = (tempname).split(' ');

    let cfname = cname.slice(0, -1).join(' ');
    let clname = cname.slice(-1).join(' ');

    if (cfname.length === 0) {
      errorList.contactlastNameError = "* First Name Required";
    }
    if (
      cfname.length !== 0 &&
      (typeof clname === "undefined" || clname.length === 0)
    ) {
      errorList.contactlastNameError = "* Last Name Required";
    }

    if (cemail.length === 0) {
      errorList.contactEmailError = "* Required";
    } else if (cemail.length < 8 && cemail !== "") {
      errorList.contactEmailError = "too short";
      cemail = "";
    }
    if (!cemail.includes(".") && cemail !== "") {
      errorList.contactEmailError = ". not included";
    }
    if (!cemail.includes("@") && cemail !== "") {
      errorList.contactEmailError = "@ not included";
    }

    if (Object.keys(errorList).length != 0) {
      this.setState({ editerror: errorList });
    } else {
      this.setState({ editerror: {} });
    }
  }

  handleSubmitEdit = value => {
    console.log(value);

    this.setState({
      relationship: value
    });
  };
  submiteditting = () => {
    let index = this.state.indexEdit;
    console.log(
      "typeof this.state.editerror.contactEmailError",
      typeof this.state.editerror.contactEmailError
    );
    if (
      typeof this.state.editerror.contactEmailError == "undefined" ||
      typeof this.state.editerror.contactlastNameError == "undefined"
    ) {
      let tempfamilymemberdata = {};
      let cname = [];
      let tempname = this.state.editcontactfirstName.trim();
      cname = (tempname).split(' ');

      let cfname = cname.slice(0, -1).join(' ');
      let clname = cname.slice(-1).join(' ');
      let familymemberdata = this.state.familymemberdata;
      tempfamilymemberdata.firstName = cfname;
      tempfamilymemberdata.lastName = clname;
      tempfamilymemberdata.relationship = this.state.relationship;
      tempfamilymemberdata.member_email = this.state.editcontactEmail;
      familymemberdata[index] = tempfamilymemberdata;
      this.setState({
        editData: false,

        familymemberdata: familymemberdata
      });
      let user_id = "email|5b06fefda6803a9191497f88";
      this.props.deleteEditlist(

        familymemberdata,
        user_id,
        (data) => { }
      );

      console.log("sdffffffffasdfrasdf", this.state.familymemberdata);
    }
  };
  // updateContact(index) {
  //     // this.setState(
  //     //     {
  //     //         isUpdate: true,
  //     //         contactfirstName: this.props.contactList[index].contact_first_name,
  //     //         contactlastName: this.props.contactList[index].contact_last_name,
  //     //         contactPhone: this.props.contactList[index].contact_mobile,
  //     //         contactEmail: this.props.contactList[index].contact_email,
  //     //         contactUserId: this.props.contactList[index]._id,
  //     //         updateContactIndex: index
  //     //     }
  //     // );
  //     this._toggleModal();

  // }
  // _toggleModal = () => { this.props.modalHandler(true) }
  // closeModal = () => { this.props.modalHandler(false) };

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    return (
      <View style={styles.container}>
        {/* <Modal
                        transparent={true}
                        animationType={'none'}
                        visible={this.props.isModalVisible}
                        onRequestClose={() => { console.log('close modal') }}>
                        </Modal> */}
        <View>
          <Loader loading={this.props.loadingIndicator} />
          {this.props.familyRelation_info && (
            <View>
              {!this.state.editData && (
                <View style={styles.contant_second}>
                  <View style={styles.contant}>
                    <Text style={styles.text}>Family Share</Text>
                    <Text style={styles.text1}>
                      Share with family members. For each family member that
                      enters, you'll get 2 extra point.
                    </Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    {this.state.enterData &&
                      this.state.firstname_complete && (
                        <Text style={styles.textName}>{this.state.name}</Text>
                      )}
                    {this.state.enterData &&
                      this.state.email_complete && (
                        <Text style={styles.textEmail}>
                          {this.state.member_email}
                        </Text>
                      )}
                    {this.state.enterData &&
                      !this.state.firstname_complete &&
                      !this.state.lastname_complete && (
                        <Item
                          error={
                            this.state.error.contactfirstNameError !== undefined
                          }
                        >
                          <Input
                            name="contactfirstName"
                            ref={"firstname"}
                            value={this.state.contactfirstName}
                            underlineColorAndroid="transparent"
                            onSubmitEditing={() => {
                              this.handleSubmit();
                            }}
                            placeholder="First Name"
                            placeholderTextColor={"#ccc"}
                            style={{
                              color: "#ccc",
                              height: variable.deviceHeight / 10,
                              fontSize: variable.deviceHeight / 18
                            }}
                            onChangeText={value => {
                              this.setState({ contactfirstName: value });
                            }}
                          />
                          {this.state.error.contactfirstNameError !==
                            undefined ? (
                              <Text
                                style={{
                                  paddingLeft: 3,
                                  paddingRight: 3,
                                  color: variable.backgroundColor
                                }}
                              >
                                {this.state.error.contactfirstNameError}
                              </Text>
                            ) : (
                              <Text />
                            )}
                        </Item>
                      )}
                    {this.state.enterData &&
                      this.state.firstname_complete &&
                      !this.state.lastname_complete && (
                        <Item
                          error={
                            this.state.error.contactlastNameError !== undefined
                          }
                        >
                          <Input
                            name="contactlastName"
                            autoFocus={this.state.focuslastNameInput}
                            value={this.state.contactlastName}
                            placeholder="Last Name"
                            onSubmitEditing={() => {
                              this.handleSubmit();
                            }}
                            placeholderTextColor={"#ccc"}
                            style={{
                              color: "#ccc",
                              height: variable.deviceHeight / 10,
                              fontSize: variable.deviceHeight / 18
                            }}
                            onChangeText={value => {
                              this.setState({ contactlastName: value });
                            }}
                          />
                          {this.state.error.contactlastNameError !==
                            undefined ? (
                              <Text
                                style={{
                                  paddingLeft: 3,
                                  paddingRight: 3,
                                  color: variable.backgroundColor
                                }}
                              >
                                {this.state.error.contactlastNameError}
                              </Text>
                            ) : (
                              <Text />
                            )}
                        </Item>
                      )}
                    {this.state.enterData &&
                      this.state.firstname_complete &&
                      this.state.lastname_complete &&
                      !this.state.email_complete && (
                        <Item
                          error={
                            this.state.error.contactEmailError !== undefined
                          }
                        >
                          <Input
                            name="contactEmail"
                            autoFocus={this.state.focusEmailInput}
                            value={this.state.contactEmail}
                            placeholder="Email"
                            onSubmitEditing={() => {
                              this.handleSubmit();
                            }}
                            placeholderTextColor={"#ccc"}
                            style={{
                              color: "#ccc",
                              height: variable.deviceHeight / 10,
                              fontSize: variable.deviceHeight / 18
                            }}
                            onChangeText={value => {
                              this.setState({ contactEmail: value });
                            }}
                          />
                          {this.state.error.contactEmailError !== undefined ? (
                            <Text
                              style={{
                                paddingLeft: 3,
                                paddingRight: 3,
                                color: variable.backgroundColor
                              }}
                            >
                              {this.state.error.contactEmailError}
                            </Text>
                          ) : (
                              <Text />
                            )}
                        </Item>
                      )}
                    {this.state.enterData && (
                      <View style={{ paddingTop: variable.deviceHeight / 7 }}>
                        {this.state.firstname_complete &&
                          this.state.lastname_complete &&
                          this.state.email_complete && (
                            <RNPickerSelect
                              items={this.state.items}
                              placeholder={{}}
                              onValueChange={value => {
                                this.handleSubmitLast(value);
                              }}
                            >
                              <Text
                                style={{
                                  color: "#8037a3",
                                  fontSize: variable.deviceHeight / 18
                                }}
                              >
                                {this.state.contactfirstName} is my:
                              </Text>
                            </RNPickerSelect>
                          )}
                      </View>
                    )}
                  </View>
                  {!this.state.enterData &&
                    !this.state.editData && (
                      <View style={styles.bottom_view}>
                        <ScrollView>
                          {this.state.familymemberdata &&
                            this.state.familymemberdata
                              .map((members, indexs) => (
                                <View
                                  key={members.firstName + members.lastName + "" + indexs}
                                  style={styles.list_view}
                                >
                                  <SwipeRow
                                    /* leftOpenValue={75} */
                                    rightOpenValue={-150}
                                    /* left={
                                                              <Button success onPress={() => alert("Add")}>
                                                                <Icon active name="add" />
                                                              </Button>
                                                            } */
                                    body={
                                      <View
                                        style={{
                                          width: variable.deviceWidth - 20
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: "#b58dce",
                                            width: variable.deviceWidth / 5,
                                            height: variable.deviceHeight / 8
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              justifyContent: "center",
                                              alignSelf: "center",
                                              marginTop:
                                                variable.deviceWidth / 15,
                                              color: "#fff"
                                            }}
                                          >
                                            {members.relationship}
                                          </Text>
                                        </View>
                                        <View>
                                          <View
                                            style={{
                                              width:
                                                variable.deviceWidth / 2 +
                                                variable.deviceWidth / 5,
                                              height: variable.deviceHeight,
                                              marginLeft:
                                                variable.deviceWidth / 50
                                            }}
                                          >
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                justifyContent: "center",
                                                alignSelf: "flex-start",
                                                marginLeft:
                                                  variable.deviceWidth / 4,
                                                marginTop: -70
                                              }}
                                            >
                                              {members.firstName +
                                                " " +
                                                members.lastName}
                                            </Text>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                justifyContent: "center",
                                                alignSelf: "flex-start",
                                                marginLeft:
                                                  variable.deviceWidth / 4,

                                              }}
                                            >
                                              {members.member_email}
                                            </Text>
                                          </View>
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
                                          onPress={this.handleEdit.bind(this, {
                                            indexs
                                          })}
                                        >
                                          <Icon
                                            style={{
                                              color: "#fff",
                                              fontSize:
                                                variable.deviceHeight / 20
                                            }}
                                            active
                                            name="edit"
                                          />
                                        </Button>
                                        <Button
                                          danger
                                          style={{
                                            height: variable.deviceHeight / 7
                                          }}
                                          onPress={this.handleDelete.bind(
                                            this,
                                            { indexs }
                                          )}
                                        >
                                          <Icon
                                            style={{
                                              color: "#fff",
                                              fontSize:
                                                variable.deviceHeight / 20
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
                        <View style={{ alignSelf: "center" }}>
                          <Button
                            style={{
                              backgroundColor: "#8037a3",
                              position: "relative",
                              height: variable.deviceHeight / 7,
                              width: variable.deviceWidth / 2.8
                            }}
                            onPress={() => this.setState({ enterData: true })}
                          >
                            <Text
                              style={{
                                fontSize: variable.deviceHeight / 20,
                                fontWeight: "bold",
                                color: "#fff"
                              }}
                            >
                              {" "}
                              + Family
                            </Text>
                          </Button>
                        </View>
                      </View>
                    )}
                </View>
              )}
              {!this.state.enterData &&
                this.state.editData && (
                  <View style={styles.contant_third}>
                  <View></View>
                    <View style={{ paddingTop: 10,flexDirection: "column" }}>
                      <Item
                        error={
                          this.state.editerror.contactlastNameError !==
                          undefined
                        }
                      >
                        <Input
                          name="contactlastName"
                          value={this.state.editcontactfirstName}
                          placeholder="Name"
                          onSubmitEditing={() => {
                            this.handleinputEdit("name");
                          }}
                          placeholderTextColor={"#ccc"}
                          style={{
                            color: "#ccc",
                            height: variable.deviceHeight / 10,
                            fontSize: variable.deviceHeight / 18
                          }}
                          onChangeText={value => {
                            this.setState({ editcontactfirstName: value });
                          }}
                        />
                        {this.state.editerror.contactlastNameError !==
                          undefined ? (
                            <Text
                              style={{
                                paddingLeft: 3,
                                paddingRight: 3,
                                color: variable.backgroundColor
                              }}
                            >
                              {this.state.editerror.contactlastNameError}
                            </Text>
                          ) : (
                            <Text />
                          )}
                      </Item>

                      <Item
                        error={
                          this.state.editerror.contactEmailError !== undefined
                        }
                      >
                        <Input
                          name="contactEmail"
                          value={this.state.editcontactEmail}
                          placeholder="Email"
                          onSubmitEditing={() => {
                            this.handleinputEdit("email");
                          }}
                          placeholderTextColor={"#ccc"}
                          style={{
                            color: "#ccc",
                            height: variable.deviceHeight / 10,
                            fontSize: variable.deviceHeight / 18
                          }}
                          onChangeText={value => {
                            this.setState({ editcontactEmail: value });
                          }}
                        />
                        {this.state.editerror.contactEmailError !==
                          undefined ? (
                            <Text
                              style={{
                                paddingLeft: 3,
                                paddingRight: 3,
                                color: variable.backgroundColor
                              }}
                            >
                              {this.state.editerror.contactEmailError}
                            </Text>
                          ) : (
                            <Text />
                          )}
                      </Item>
                      <View style={{ paddingTop: variable.deviceHeight / 7 }}>
                        <RNPickerSelect
                          items={this.state.items}
                          placeholder={{}}
                          onValueChange={value => {
                            this.handleSubmitEdit(value);
                          }}
                        >
                          <Text
                            style={{
                              color: "#8037a3",
                              fontSize: variable.deviceHeight / 18
                            }}
                          >
                            {this.state.contactfirstName} is my:{
                              this.state.relationship
                            }
                          </Text>
                        </RNPickerSelect>
                      </View>
                    </View>


                  </View>
                )}
            </View>
          )}
        </View>
        {!this.state.enterData &&
                this.state.editData && ( <View style={styles.icon_btn}>

          <View style={{  }}>
            <Button
              style={{
                bottom: 3,
                backgroundColor: "#DCDCDC",
                width: variable.deviceWidth,
                height: variable.deviceHeight / 12
              }}
              onPress={() => this.submiteditting()}
            >
              <Text style={styles.button_text}>Done </Text>
            </Button>
          </View>

        </View>)}
      </View>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  //signupReducer
  // const { internetStatus, isModalVisible } = state.globalReducer;

  const { isLogin, logged_in_user_id } = state.checkLoginReducer;
  const { familyRelation_info, loadingIndicator } = state.familyAddReducer;

  return {
    familyRelation_info,
    loadingIndicator,
    isLogin,
    logged_in_user_id
  };
};

export default connect(mapStateToProps, { familyAddinfo, insertUser, deleteEditlist })(
  FamilyMember
);

var { height, width } = Dimensions.get("window");
var textFontSize = height / 20;

var textFontSizeSharemsg = height / 40;
var textFontSize1 = width * 0.09;
var buttonwidth = width / 4;
const styles = {
  container: {
    flex:1,
    backgroundColor: "#fff"
  },
  contant: {
    width: "100%",
    height: height / 5
  },
  text: {
    paddingTop: 20,
    textAlign: "center",
    color: "black",
    fontSize: textFontSize
  },
  textName: {
    textAlign: "left",
    color: "#ccc",
    fontSize: height / 18
  },
  textEmail: {
    textAlign: "left",
    color: "#000",
    fontSize: height / 34
  },
  text1: {
    textAlign: "center",
    fontSize: textFontSizeSharemsg,
    color: "#999"
  },
  contant_second: {
    marginLeft: "5%",
    marginRight: "5%"
  },
  contant_third: {
    marginLeft: "5%",
    marginRight: "5%",
    flexDirection:"column",
    justifyContent:"center"
  },
  textNocode: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    color: "black"
  },
  contant2: {
    paddingTop: 90
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
    height: variable.deviceHeight / 7,
    paddingHorizontal: variable.deviceWidth / 20
  },
  swipe_icon: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: variable.deviceWidth / 3 + variable.deviceWidth / 20,
    height: variable.deviceHeight
  }, icon_btn: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
   
    height: variable.deviceHeight / 12,
    bottom: 0
  },

  button_text: {
    fontSize: variable.deviceHeight / 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: variable.deviceWidth / 3 + variable.deviceWidth / 20
  }
};
