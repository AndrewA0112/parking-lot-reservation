import {
    POST_LOGIN_START,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAIL,
    GET_PARKING_START,
    GET_PARKING_SUCCESS,
    GET_PARKING_FAIL,
    UPDATE_PARKING_START,
    UPDATE_PARKING_SUCCESS,
    UPDATE_PARKING_FAIL,
    SET_USERNAME,
    login,
    getParkingLot,
    updateReservation,
} from '../actions'

const initialState = {
    token: '',
    parkingLot: [],
    error: '',
    isLoading: false,
}

export const parkingLotReducer = (state=initialState, action) =>
{
    switch(action.type)
    {
        case POST_LOGIN_START:
            return {
                ...state,
                isLoading: true
            }
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoading: false,
                error: "",
            }
        case POST_LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}