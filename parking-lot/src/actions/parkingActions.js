import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'

export const POST_LOGIN_START = "POST_LOGIN_START"
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS"
export const POST_LOGIN_FAIL = "POST_LOGIN_FAIL"

export const GET_PARKING_START = "GET_PARKING_START"
export const GET_PARKING_SUCCESS = "GET_PARKING_SUCCESS"
export const GET_PARKING_FAIL = "GET_PARKING_FAIL"

export const UPDATE_PARKING_START = "UPDATE_PARKING_START"
export const UPDATE_PARKING_SUCCESS = "UPDATE_PARKING_SUCCESS"
export const UPDATE_PARKING_FAIL = "UPDATE_PARKING_FAIL"

export const SET_USERNAME = "SET_USERNAME"
const url = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : '/api'

export const login = (creds, history) => dispatch =>
{
    dispatch({ type: POST_LOGIN_START })
    console.log("blah")
    console.log(creds)
    axios
        .post(`${url}/login`, creds)
        .then(res =>
            {
                console.log('res from login:', res)

                dispatch({ type: POST_LOGIN_SUCCESS, payload: res.data.payload})
                localStorage.setItem('token', res.data.payload)
                history.push('/parking-lot')
            })
        .catch(err =>
            {
                console.log('a',err)
                dispatch({ type: POST_LOGIN_FAIL, payload: err })
            })
}

export const getParkingLot = () => dispatch =>
{
    dispatch({ type: GET_PARKING_START })
    console.log('blah2')
    // Add axiosWithAuth
    axios
        .get(`${url}/parking-lot`)
        .then(res =>
            {
                console.log('res from getPL', res)
                dispatch({ type: GET_PARKING_SUCCESS, payload: res.data })
            })
        .catch(err =>
            {
                console.log(err)
                dispatch({ type: GET_PARKING_FAIL, payload: err })
            })
}
export const updateReservation = (parkingID) => dispatch =>
{
    dispatch({ type: UPDATE_PARKING_START })
    const token = localStorage.getItem('token')
    console.log(token, parkingID)
    axiosWithAuth()
        .put(`${url}/parking-lot`,{"parkingId": parkingID})
        .then(res =>
            {
                console.log('res from updateReservation', res)
                dispatch({ type: UPDATE_PARKING_SUCCESS, payload: res.data })
            })
        .catch(err =>
            {
                console.log('err from updateParking', err)
                dispatch({ type: UPDATE_PARKING_FAIL, payload: err })
            })
}