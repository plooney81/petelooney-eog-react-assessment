import { CardActionArea } from "@material-ui/core";
import { combineReducers } from "redux";
import { ADD_METRIC, REMOVE_METRIC, SET_MEASUREMENTS, SET_MEASUREMENT_DATA_ERROR, SET_POSSIBLE_METRICS } from "./actions";

const measurementReducer = (state={data:null, error:null}, action) => {
    switch(action.type){
        case SET_MEASUREMENTS:
            return {...state, data: action.payload.measurementData, error: false};
        case SET_MEASUREMENT_DATA_ERROR:
            return {...state, data: null, error: action.payload.measurementDataError};
        default:
            return state;
    }
}

const metricReducer = (state={current:[], possible:[]}, action) => {
    switch (action.type){
        case SET_POSSIBLE_METRICS:
            return {...state, possible: action.payload.metricNamesArray};
        case ADD_METRIC:
            return {...state, current: state.current.concat(action.payload.metricName)};
        case REMOVE_METRIC:
            return {...state, current: state.current.filter(metric => metric !== action.payload.metricName)}
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    measurements: measurementReducer,
    metrics: metricReducer,
})