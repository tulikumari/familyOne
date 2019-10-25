import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { toastReducer as toast } from 'react-native-redux-toast';
import reducerGlobal from './reducerGlobal';
import signupReducer from './signupReducer';
import checkLoginReducer from './checkLoginReducer';
import loginReducer from './loginReducer';
import familyAddReducer from './familyAddReducer';
import getInfoReducer from './getInfoReducer';
// import profileReducer from './profileReducer';
import globalReducer from './globalReducer';
import phoneReducer from './phoneReducer';
// import contactReducer from './contactReducer';
// import playChallangeReducer from './playChallangeReducer';
// import inboxReducer from './inboxReducer';
// import answerDetailReducer from './answerDetailReducer';
// import editChallangeReducer from './editChallangeReducer';
import updateReducer from './updateReducer';
// import starChallengeReducer from './starChallengeReducer';
// import forgotpasswordReducer from './forgotpasswordReducer';
// import editAnswerReducer from './editAnswerReducer';

const reducers = {
  form: formReducer.plugin({
    Challange: (state, action) => {
      if (action.type === 'redux-form/UNREGISTER_FIELD') {
        //return state.deleteIn(['values', action.payload])
        return state;
      }
      return state
    }
  }),
  toast: toast,
  reducerGlobal: reducerGlobal,
  signupReducer: signupReducer,
  checkLoginReducer: checkLoginReducer,
  loginReducer: loginReducer,
  getInfoReducer: getInfoReducer,
  // lobbyReducer: lobbyReducer,
  // profileReducer: profileReducer,
  globalReducer : globalReducer,
  phoneReducer: phoneReducer,
  familyAddReducer:familyAddReducer,
  // playChallangeReducer: playChallangeReducer,
  // inboxReducer: inboxReducer,
  // answerDetailReducer: answerDetailReducer,
  // editChallangeReducer:editChallangeReducer,
  updateReducer: updateReducer,
  // forgotpasswordReducer:  forgotpasswordReducer,
  // starChallengeReducer: starChallengeReducer,
  // editAnswerReducer:editAnswerReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;