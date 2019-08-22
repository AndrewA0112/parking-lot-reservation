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
    login,
    getParkingLot,
    updateReservation,
} from '../'

const initialState = {

}

export const parkingLotReducer = (state=initialState, action) =>
{
    switch(action.type)
    {
        case P
        default:
            return state
    }
}