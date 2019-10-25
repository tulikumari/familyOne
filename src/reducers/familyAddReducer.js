import { actionTypes as formActionTypes } from 'redux-form'
import {  FAMILY_ADD,FAMILY_ADD_COMPLETE,FAMILY_ADD_ERROR ,FAMILY_ADD_INFO, FAMILY_ADD_INFO_COMPLETE, FAMILY_ADD_INFO_ERROR } from '../actionTypes';
const INITIAL_STATE = {

   
    loadingIndicator: false,
  
};

const familyAddReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FAMILY_ADD_INFO:
            return { ...state, loadingIndicator: true }
        case FAMILY_ADD_INFO_COMPLETE:
            return  {...state,loadingIndicator: false,familyRelation_info:[]}
        case FAMILY_ADD_INFO_ERROR:
            return {...state,loadingIndicator: false}
        case FAMILY_ADD:
            return { ...state, loadingIndicator: true }
        case FAMILY_ADD_COMPLETE:
            return  {...state,loadingIndicator: false,familyRelation_info:[]}
        case FAMILY_ADD_ERROR:
            return {...state,loadingIndicator: false,}
        default:
            return state;
    }
}

export default familyAddReducer;