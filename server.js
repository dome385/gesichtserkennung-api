const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');




const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
        

    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'John@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else {
        res.status(400).json('error logging in');
    }
    
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user)
        }
    })
    if (!found){
        res.status(400).json('no such user');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(400).json('no such user');
    }
    console.log('ausgeführt');
})

app.listen(4000, () => {
    console.log('app is running on port 3000');
})



/*
--> res = this is working
/Signin --> POST wir posten registrierungsdaten entweder success/fail
/register --> POST daten hinzufügen = user
/profile/:userId --> GET Daten abrufen = user
/image --> PUT daten werden geupdated = updated user
*/