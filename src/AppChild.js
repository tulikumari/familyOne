import React, { Component } from "react";
import { Platform, AsyncStorage, NetInfo } from "react-native";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { connectionState } from "./action";
import Home from "./components/home";
import BasicContactDetails from "./components/basicContactDetails";
import Address from "./components/address";
import PhoneNumber from "./components/phoneNumber";
 import ExpectingChild from "./components/expectingChild";
import Others from "./components/expectingChild/others";
import Parent from "./components/expectingChild/parent";
import Family from "./components/expectingChild/family";
import FamilyAddChildren from "./components/expectingChild/familyAddChildren";
import GrandParent from "./components/expectingChild/grandParent";
import ButtonSelect from "./components/expectingChild/buttonSelect";
import Contest from "./components/contest";
import FamilyMember from "./components/familyMember";
import SkillTestQuestion from "./components/skillTestQuestion";
import Share from "./components/share";
import SocialShare from "./components/socialShare";
import FamilyDeclareRelation from './components/familyDeclareRelation';
const AppNavigator = createStackNavigator(
  
  {
    Home: { screen: Home },
    BasicContactDetails: { screen: BasicContactDetails },
    Address: { screen: Address },
    PhoneNumber: { screen: PhoneNumber },
    ExpectingChild: { screen: ExpectingChild },
    Others: { screen: Others },
    Parent: { screen: Parent },
    GrandParent: { screen: GrandParent },
    ButtonSelect: { screen: ButtonSelect },
    Contest: {screen: Contest},
    Family: {screen: Family},
    FamilyAddChildren: {screen: FamilyAddChildren},
    FamilyMember: {screen: FamilyMember},
    SkillTestQuestion:{screen:SkillTestQuestion},
    Share:{screen:Share},
    SocialShare:{screen:SocialShare},
    FamilyDeclareRelation:{screen:FamilyDeclareRelation}
  },
  {
    initialRouteName: "GrandParent",
    headerMode: "none",
  }
);

class AppChild extends Component {
// static router = AuthenticationNavigator.router;
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  /*
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    }
    */
  _handleConnectionChange = isConnected => {
    this.props.connectionState(isConnected);
  };

  //export default () =>
  render() {
    return <AppNavigator />;
  }
}







const mapStateToProps = state => {
  const { internetStatus } = state.globalReducer;
  return {
    internetStatus
  };
};
export default connect(mapStateToProps, { connectionState })(AppChild);
