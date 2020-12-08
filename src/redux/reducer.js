import { combineReducers } from "redux";
import { SET_MEASUREMENTS, SET_MEASUREMENT_DATA_ERROR } from "./actions";

const measurementReducer = (state={data:null, error:null}, action) => {
    switch(action.type){
        case SET_MEASUREMENTS:
            return {...state, data: action.payload.measurementData, error: false}
        case SET_MEASUREMENT_DATA_ERROR:
            return {...state, data: null, error: action.payload.measurementDataError}
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    measurements: measurementReducer
})