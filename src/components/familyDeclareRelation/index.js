import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,

    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { Button } from 'native-base'
// import {ResponsiveComponent,ResponsiveStyleSheet} from "react-native-responsive-ui";
import { connect } from "react-redux";
import Loader from "./../loader";
import variable from "./../../themes/variables";


import Icon from "react-native-vector-icons/FontAwesome";
let navigate;
export class familyDeclareRelation extends Component {
    constructor(props) {
        super(props);
        console.log("PSDfasdfasdfrrrrooops", props.navigation.state.params.familychildren);
        navigate = this.props.navigation.navigate;
        const { goBack } = this.props.navigation;
        this.state = {
            familychildren: props.navigation.state.params.familychildren
        };

    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <ScrollView>

                    <View style={{}}>
                        {this.state.familychildren &&
                            this.state.familychildren.map((answerList, indexs) => (
                                <View style={{ width: width, height: 'auto', flexDirection: 'row', marginLeft: '5%', marginRight: '5%' }}>
                                    <View style={styles.girl}><Text style={styles.girltext}>{answerList.gender}</Text></View>
                                    <View style={styles.birthdate}><Text style={styles.birthdate1}>Birth Date</Text><Text style={styles.birthdate1}>{answerList.date}</Text></View>
                                </View>
                            ))}


                    </View>
                    <View style={{ width: width, height: 'auto', marginLeft: '5%', marginRight: '5%' }}>
                        <Text style={styles.Contant}>Are you the</Text>
                        <Text style={styles.Contant}>parent/guardian</Text>
                    </View>

                    <View style={{ width: width, height: 'auto', marginLeft: '5%', marginRight: '5%' }}>
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
                                Yes To All
                            </Text>
                        </Button>
                    </View>
                    <View style={{ width: width, height: 'auto', marginLeft: '5%', marginRight: '5%' }}>
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
                                Yes to some of them
                            </Text>
                        </Button>
                    </View>

                    <View style={{ width: width, height: 'auto', marginLeft: '5%', marginRight: '5%' }}>
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
                                No
                            </Text>
                        </Button>
                    </View>

                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => {
    //console.log(state);
    //signupReducer

    const { isLogin, logged_in_user_id } = state.checkLoginReducer;


    // console.log("signup_data", signupData);
    return {

        isLogin,
        logged_in_user_id
    };
};

export default connect(mapStateToProps)(
    familyDeclareRelation
);



var { height, width } = Dimensions.get('window');
var textFontSize = width * 0.06;
var textFontSize1 = width * 0.09;
var dividewidth = width / 4 - 20;
var bdate = dividewidth - '5%';
const styles = StyleSheet.create({
    girl: {
        width: dividewidth,
        height: 80,
        backgroundColor: '#FCB0D4',
        paddingTop: 20,
        paddingLeft: 15,
        marginLeft: 4,
        marginTop: 10,
    },
    girltext: {
        color: 'black',
        fontSize: 25,
    },
    boy: {
        width: dividewidth,
        height: 80,
        backgroundColor: '#9BF1FE',
        paddingTop: 20,
        paddingLeft: 15,
        marginLeft: 4,
        marginTop: 10,
    },
    boytext: {
        color: 'black',
        fontSize: 25,
    },
    birthdate: {
        width: bdate,
        marginTop: 10,
    },
    birthdate1: {
        color: 'black',
        fontSize: variable.tabFontSize,
        paddingLeft: 10
    },
    Contant: {
        fontSize: variable.tabFontSize + 20,
        color: 'black'
    }
});
