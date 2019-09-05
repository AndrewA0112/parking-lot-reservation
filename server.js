// import {join} from 'path'
const join = require('path')
const express = require('express');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const ISDEPLOYED = process.env.HEROKU === 'TRUE';
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        username: 'UserOne',
        password: 'password',
        token: uuidv4(),
        reservation: null
    },
    {
        id: 2,
        username: 'UserTwo',
        password: 'password',
        token: uuidv4(),
        reservation: null
    }
];

let parkingLot = [
    {
        id: 1,
        available: true,
        reserveId: null
    },
    {
        id: 2,
        available: true,
        reserveId: null
    },
    {
        id: 3,
        available: true,
        reserveId: null
    },
    {
        id: 4,
        available: true,
        reserveId: null
    },
    {
        id: 5,
        available: true,
        reserveId: null
    },
]

// If we're in heroku, serve up the built react code.
if (ISDEPLOYED) {
    app.use(express.static(join(__dirname, '..', 'build')));
} else {
    // Otherwise we're local, so allow cross-origin resource sharing.
    // (i.e. so localhost:3000 can call against localhost:8080)
    app.use(cors());
}

function authenticator(req, res, next) {
    const { authorization } = req.headers;
    if (users.filter(user => authorization === user.token).length > 0) {
        next();
    } else {
        res.status(403).json({ error: 'User be logged in to do that.' });
    }
}

function replaceAtIndex(arr, index, object) {
    tempArr = [
        ...arr.slice(0, index),
        object,
        ...arr.slice(index + 1)
    ];
    return tempArr;
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.filter(user => user.username === username && user.password === password)
    if (user.length > 0) {
        req.loggedIn = true;
        console.log(user[0].token)
        res.status(200).json({
            payload: user[0].token
        });
    } else {
        res
            .status(403)
            .json({ error: `Username or Password incorrect.` });
    }
});

// add authenticator
app.get('/api/parking-lot', (req, res) => {
    setTimeout(() => {
        res.send(parkingLot);
    }, 1000);
});

// add authenticator
app.put('/api/parking-lot', (req, res) => {
    const { parkingId } = req.body;
    const token = req.headers.authorization;
    const parkingIndex = parkingLot.findIndex(p => p.id == parkingId)
    const userIndex = users.findIndex(u => u.token == token)
    const currentParkingSpot = parkingLot[parkingIndex]
    const currentUser = users[userIndex]
    if (!currentParkingSpot.available && currentParkingSpot.reserveId !== currentUser.id) {
        return res.status(404).send({ msg: `Parking Spot Already Taken`})
    }
    if (!currentParkingSpot) {
        return res.status(404).send({ msg: `Parking Spot Not Found` });
    }
    if (!currentUser) {
        return res.status(404).send({ msg: `User Not Found` });
    }
    if (currentUser.reservation) {
        parkingLot.find(parkingSpace => parkingSpace.id == currentUser.reservation).reserveId = null
        parkingLot.find(parkingSpace => parkingSpace.id == currentUser.reservation).available = true
    }
    let reserveId = currentParkingSpot.available ? users.find(user => user.token == token).id : null
    const parkingSpace = { ...currentParkingSpot, available: !currentParkingSpot.available, reserveId: reserveId }
    parkingLot = replaceAtIndex(parkingLot, parkingIndex, parkingSpace)

    if (reserveId) {
        const user = { ...currentUser, reservation: parkingLot.find(parkingSpace => parkingSpace.id == parkingId).id }
        users = replaceAtIndex(users, userIndex, user)
    } else {
        const user = { ...currentUser, reservation: null }
        users = replaceAtIndex(users, userIndex, user)
    }

    res.send(parkingLot);
});


// If we're in heroku, serve up the built react code to catch all other calls.
if (ISDEPLOYED) {
    app.get('*', (req, res, next) => {
        req.url = 'index.html';
        next();
    });
    app.use(express.static(join(__dirname, '..', 'build')));
}


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
