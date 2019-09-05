import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {getParkingLot, updateReservation} from "../actions"
import ParkingSpace from "./ParkingSpace";

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
            {state.parkingLot.map(spot => <ParkingSpace key={spot.id} spot={spot} />)}
        </>
    )
}

export default ParkingLot