const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
    'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 3;

let users = [
    {
        id: 1,
        username: 'UserOne',
        password: 'password',
        reservation: null
    },
    {
        id: 2,
        username: 'UserTwo',
        password: 'password',
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
    if (authorization === token) {
        next();
    } else {
        res.status(403).json({ error: 'User be logged in to do that.' });
    }
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (users.filter(user => 
        user.username === username && user.password === password
    ).length > 0) {
        req.loggedIn = true;
        res.status(200).json({
            payload: token
        });
    } else {
        res
            .status(403)
            .json({ error: `Username or Password incorrect. Please see Readme` });
    }
});

app.get('/api/parking-lot', authenticator, (req, res) => {
    setTimeout(() => {
        res.send(parkingLot);
    }, 1000);
});

app.put('/api/parking-lot', authenticator, (req, res) => {
    const { username, parkingId } = req.body;
    const parkingIndex = parkingLot.findIndex(p => p.id == parkingId)
    const userIndex = users.findIndex(u => u.username == username)

    if (parkingIndex > -1 && userIndex > -1) {
        let reserveId = parkingLot[parkingIndex].available ? users.filter(user => user.username == username)[0].id : null
        const parkingSpace = { ...parkingLot[parkingIndex], available: !parkingLot[parkingIndex].available, reserveId: reserveId}
        parkingLot = [
            ...parkingLot.slice(0, parkingIndex),
            parkingSpace,
            ...parkingLot.slice(parkingIndex + 1)
        ];
        
        res.send(parkingLot);
    } else {
        res.status(404).send({ msg: 'Friend not found' });
    }
});

function getNextId() {
    return nextId++;
}

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
