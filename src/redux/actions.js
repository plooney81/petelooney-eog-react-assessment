export const SET_MEASUREMENTS = 'SET_MEASUREMENTS';
export const SET_MEASUREMENT_DATA_ERROR = 'SET_MEASUREMENT_DATA_ERROR'

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