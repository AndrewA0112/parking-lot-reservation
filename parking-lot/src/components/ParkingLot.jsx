import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {getParkingLot, updateReservation} from "../actions"

const ParkingLot = _ =>
{
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(_ =>
        {
            console.log('inf')
            dispatch(getParkingLot())
        }, [])

    return (
        <>
            {state.parkingLot.map(spot => <p key={spot.id}>{spot.id}</p>)}
        </>
    )
}

export default ParkingLot