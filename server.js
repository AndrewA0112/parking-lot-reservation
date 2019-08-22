const express = require('express');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();

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
        id: 0,
        available: true,
        reserveId: null
    },
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
        id: 5,
        available: true,
        reserveId: null
    },
]

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
    const { authorization } = req.headers;
    if (users.filter(user => authorization === user.token).length > 0) {
        next();
    } else {
        res.status(403).json({ error: 'User be logged in to do that.' });
    }
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

app.get('/api/parking-lot', authenticator, (req, res) => {
    setTimeout(() => {
        res.send(parkingLot);
    }, 1000);
});

app.put('/api/parking-lot', authenticator, (req, res) => {
    const { token, parkingId } = req.body;
    const parkingIndex = parkingLot.findIndex(p => p.id == parkingId)
    const userIndex = users.findIndex(u => u.token == token)

    if (parkingIndex > -1 && userIndex > -1) {
        let reserveId = parkingLot[parkingIndex].available ? users.filter(user => user.username == username)[0].id : null
        const parkingSpace = { ...parkingLot[parkingIndex], available: !parkingLot[parkingIndex].available, reserveId: reserveId}
        parkingLot = [
            ...parkingLot.slice(0, parkingIndex),
            parkingSpace,
            ...parkingLot.slice(parkingIndex + 1)
        ];

        if(reserveId) {
            const user = { ...users[userIndex], reservation: parkingLot.filter(parkingSpace => parkingSpace.id == parkingId)[0].id}
            users = [
                ...users.slice(0, userIndex),
                user,
                ...users.slice(userIndex + 1)
            ]
            console.log('ADDED PARKING ID TO USER OBJECT', users)
        } else {
            const user = { ...users[userIndex], reservation: null}
            users = [
                ...users.slice(0, userIndex),
                user,
                ...users.slice(userIndex + 1)
            ]
            console.log('REMOVED PARKING ID FROM USER OBJECT', users)
        }
        
        res.send(parkingLot);
    } else {
        res.status(404).send({ msg: 'Parking Spot Not Found' });
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
