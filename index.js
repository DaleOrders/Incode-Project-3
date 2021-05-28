//const express = require('express')
//const data=require('./data.js')
import express from 'express'
const app = express()
import { users, schedules } from './data.js'
const port = 3000
//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send("Welcome to our schedule website")
})

//Step 2
app.get('/schedules', (req, res) => {
    res.send(schedules)
})

app.get('/users', (req, res) => {
    res.send(users)
})

// app.get('/schedules/:id', (req, res) => {
//     const arr = []
//     for (let i = 0; i < schedules.length; i++) {
//         if(schedules[i].user_id === Number(req.params.id)){
//         arr.push(schedules[i])
//         }
//     }
//     res.send(arr)
// })



//Step 3

// '/users/2' will return the information of user n°2

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (id >= users.length) {
        res.send('invalid number')
    } else {
        res.send(users[id])
    }
}
)


// '/users/2/schedules' will return a list of all schedules for user n°2

app.get('/users/:id/schedules', (req, res) => {
    const arr = []
    if (Number(req.params.id) >= users.length) {
        res.send('invalid user id')
    }
    for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].user_id === Number(req.params.id)) {
            arr.push(schedules[i])
        }
    }
    res.send(arr)
})

//Step 4

app.post('/users', (req, res) => {
    users.push(req.body)
    res.send(req.body)
})

app.post('/users', (req, res) => {
    users.push(req.body.password)
    res.send(req.body)
})

app.post('/schedules', (req, res) => {
    users.push(req.body)
    res.send(req.body)
})


app.post('/users', (req, res) => {
    const plainTextPassword = req.body.password
    console.log(plainTextPassword)
    bcrypt.genSalt(saltRounds, (err, salt)=> {
        const hash = bcrypt.hash(myPlaintextPassword, salt, (err, hash)=> {
            console.log(hash)
            res.send(hash)
        });
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})