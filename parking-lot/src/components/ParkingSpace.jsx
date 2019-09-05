import React from 'react';
import { useDispatch } from 'react-redux'
import { updateReservation } from '../actions'

const ParkingSpace = ({ spot }) => {
    const dispatch = useDispatch()

    const updateReservationFunc = () => {
        dispatch(updateReservation(spot.id))
    }

    return (
        <div className={'parking-spot ' + (spot.available ? 'available' : 'taken')}>
            <h1>{spot.id}</h1>
            <h1>{(spot.available ? 'Not taken' : 'Taken')}</h1>
            {/*  <p key={spot.id} className={'parking-spot ' + (spot.available ? 'available' : 'taken')}>{spot.id}</p> */}
            <button onClick={updateReservationFunc}>Reserve</button>
        </div>
    )
}

export default ParkingSpace;
