const express = require('express')
const data=require('./data.js')

const app = express()
const port = process.env.PORT||3000


//bcrypt setup
const bcrypt =require('bcrypt')
const saltRounds = 10;

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
    res.send(data.schedules)
})

app.get('/users', (req, res) => {
    res.send(data.users)
})


//Step 3

// '/users/2' will return the information of user n°2

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    if (id >= data.users.length) {
        res.send('invalid number')
    } else {
        res.send(data.users[id])
    }
}
)


// '/users/2/schedules' will return a list of all schedules for user n°2

app.get('/users/:id/schedules', (req, res) => {
    const arr = []
    if (Number(req.params.id) >= data.users.length) {
        res.send('invalid user id')
    }
    for (let i = 0; i < data.schedules.length; i++) {
        if (data.schedules[i].user_id === Number(req.params.id)) {
            arr.push(data.schedules[i])
        }
    }
    res.send(arr)
})

//Step 4


app.post('/schedules', (req, res) => {
    data.users.push(req.body)
    res.send(req.body)
})


// curl -d "firstname=Donald&lastname=Duck&email=coincoin@gmail.com&password=daisy" -X POST localhost:3000/users

app.post('/users', (req, res) => {
    const plainTextPassword = req.body.password
    console.log(`The user password: ${plainTextPassword}`)
    console.log('before')
    bcrypt.genSalt(saltRounds, (err, salt) => {
        const hash = bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            console.log(`The hash: ${hash}`)
            res.send(hash)
        });
    });
    console.log('after')
})




//testing


/*
app.get('/schedules/:id', (req, res) => {
    const arr = []
    for (let i = 0; i < schedules.length; i++) {
        if(schedules[i].user_id === Number(req.params.id)){
        arr.push(schedules[i])
        }
    }
    res.send(arr)
})

*/

/*
app.post('/users', (req, res) => {
    users.push(req.body)
    res.send(req.body)
})

*/


/*

app.post('/users', (req, res) => {
    users.push(req.body.password)
    res.send(req.body)
})

*/


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})