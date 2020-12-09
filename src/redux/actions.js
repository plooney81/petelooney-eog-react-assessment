export const SET_MEASUREMENTS = 'SET_MEASUREMENTS';
export const SET_MEASUREMENT_DATA_ERROR = 'SET_MEASUREMENT_DATA_ERROR';
export const SET_POSSIBLE_METRICS = 'SET_POSSIBLE_METRICS';
export const ADD_METRIC = 'ADD_METRIC';
export const REMOVE_METRIC = 'REMOVE_METRIC';

export const measurements = (measurementData) => {
    return {
        type: SET_MEASUREMENTS,
        payload:{
            measurementData
        }
    }
}

export const measurementDataError = (measurementDataError) => {
    return {
        type: SET_MEASUREMENT_DATA_ERROR,
        payload:{
            measurementDataError
        }
    }
}

export const setPossibleMetrics = (metricNamesArray) => {
    return {
        type: SET_POSSIBLE_METRICS,
        payload:{
            metricNamesArray
        }
    }
}

export const addMetric = (metricName) => {
    return {
        type: ADD_METRIC,
        payload:{
            metricName
        }
    }
}

export const removeMetric = (metricName) => {
    return {
        type: REMOVE_METRIC,
        payload:{
            metricName
        }
    }
}