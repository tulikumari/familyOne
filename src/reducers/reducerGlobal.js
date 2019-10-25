import * as actionTypes from './../actionTypes';
//import store from './../../store/index.js';
const initialState = {
    date:"2012-1-2017"
    
}
export default function (state = [], action= {})
{
    switch(action.type)
    {
        case actionTypes.UPDATE_DATE : {
            //let date = {...state};
           
            console.log("update stae reducer is called"+ JSON.stringify(action))
            return [
                ...state,
                {
                    date: action.element
                }
            ]
        }
        case actionTypes.ON_LOADING : {
            //let date = {...state};
           
            console.log("IsLoading"+ JSON.stringify(action))
            return [
                ...state,
                {
                    isLoading: true
                }
            ]
        }
        default:{
            return state
        }
    }
}