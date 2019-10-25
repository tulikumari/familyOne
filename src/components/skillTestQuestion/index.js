import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from "react-redux";
import Button from 'react-native-button';
import { Dimensions } from 'react-native';
import * as Animatable from "react-native-animatable";
import { updateUser} from "./actions";
import variable from "./../../themes/variables";

let navigate;
export class SkillTestQuestion extends Component {
  constructor(props) {
    super(props);
    navigate = this.props.navigation.navigate;
    const { goBack } = this.props.navigation;
    this.state = {
      firstanswer: "",
      secondanswer:"",
      thirdanswer:"",
      child_visible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit=()=>{
    this.props.updateUser( function(response){
        if(response.length != 0){
          navigate("Share");
        }
      })
  }
  render() {
    return (
      <Animatable.View animation="slideInRight">
        <View style={styles.container}>
          <View style={styles.contant}>
            <Text style={{ fontSize: variable.deviceWidth / 10, color: 'black', marginTop: 40, marginLeft: 30 }}>Skill testing offer:</Text>
          </View>
          {this.state.firstanswer === "" &&
            <View>
              <Text style={{ fontSize: variable.deviceWidth / 10, paddingTop: 70, marginLeft: 30 }}><Text style={{ color: 'black' }}>(1+1)</Text>x(2x2)=</Text>
            </View>}
          {this.state.firstanswer !== "" &&this.state.secondanswer==""&&
            <View>
              <Text style={{ fontSize: variable.deviceWidth / 10, paddingTop: 70, marginLeft: 30 }}>  {this.state.firstanswer}  <Text style={{ color: 'black' }}>x (2x2) =</Text></Text>
            </View>}
            {this.state.firstanswer !== "" &&this.state.secondanswer!==""&&
            <View>
              <Text style={{ fontSize: variable.deviceWidth / 10, paddingTop: 70, marginLeft: 30,color: 'black'  }}>  {this.state.firstanswer}  x  {this.state.secondanswer}  =</Text>
            </View>}
          {this.state.firstanswer === "" &&
            <View>
              <Button onPress={() => this.setState({ firstanswer: 2 })}>
                <Text style={{ fontSize: 44, marginLeft: 30, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>2</Text>
              </Button>
            </View>}
          {this.state.firstanswer === "" &&
            <View>
              <Button onPress={() => this.setState({ firstanswer: 4 })}>
                <Text style={{ fontSize: 44, marginLeft: 30, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>4</Text>
              </Button>
            </View>}
          {this.state.firstanswer !== ""  &&this.state.secondanswer==""&&
            <View>
              <Button onPress={() => this.setState({ secondanswer: 4 })}>
                <Text style={{ fontSize: 44, marginLeft: 110, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>4</Text>
              </Button>
            </View>}
          {this.state.firstanswer !== "" &&this.state.secondanswer==""&&
            <View>
              <Button onPress={() => this.setState({ secondanswer: 8 })}>
                <Text style={{ fontSize: 44, marginLeft: 110, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>8</Text>
              </Button>
            </View>}
            {this.state.secondanswer !== ""  &&this.state.thirdanswer==""&&
            <View>
              <Button onPress={() => this.handleSubmit()}>
                <Text style={{ fontSize: 44, marginLeft: 200, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>{(this.state.firstanswer)*(this.state.secondanswer)}</Text>
              </Button>
            </View>}
          {this.state.secondanswer !== "" &&this.state.thirdanswer==""&&
            <View>
              <Button onPress={() => this.handleSubmit()}>
                <Text style={{ fontSize: 44, marginLeft: 200, textAlign: 'center', marginTop: 5, color: 'white', backgroundColor: '#08B9F7', height: 60, width: 100, }}>5</Text>
              </Button>
            </View>}

        </View>
      </Animatable.View>
    );
  };
};

const mapStateToProps = state => {
  const { internetStatus } = state.globalReducer;
  return {
    internetStatus
  };
};
export default connect(mapStateToProps, { updateUser })(SkillTestQuestion);


var { height, width } = Dimensions.get('window');
var textFontSize = width * 0.06;
var textFontSize1 = width * 0.09;
var buttonwidth = width / 4;
const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
}