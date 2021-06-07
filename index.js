const express = require('express')
const data = require('./data.js')


const app = express()
const port = process.env.PORT || 3005


//bcrypt setup
const bcrypt = require('bcrypt')
const saltRounds = 10;

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('pages/index',
        {
            Heading: 'Welcome to Mr Coffee\'s Website'

        })
})


//Step 2
//route to display schedules
app.get('/schedules', (req, res) => {
    res.render('pages/schedules.ejs', {
        data: data.schedules
    })
})

//route to display users
app.get('/users', (req, res) => {
    res.render('pages/users.ejs', {
        data: data.users
    })
})


//Step 3


//route to display user by id
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id)
//     if (id >= data.users.length) {
//         res.render('pages/id.ejs', {
//             data: 'Invalid ID entered'
//         })
//     } else {
//         res.render('pages/id.ejs', {
//             data: data.users[id]
//         })
//     }
// }
// )



//route to display user by id
app.get('/users/:id/schedules', (req, res) => {
    const arr = []
    if (Number(req.params.id) >= data.users.length) {
        res.render('pages/id_schedules.ejs', {
            data: 'Invalid ID entered'
        })
    }
    for (let i = 0; i < data.schedules.length; i++) {
        if (data.schedules[i].user_id === Number(req.params.id)) {
            res.render('pages/id_schedules.ejs', {
                data: data.schedules[i]
            })
        }
    }})

//Step 4


app.get('/users/new', (req,res)=>{
    res.render('pages/newUser',{
        documentTitle: 'New User'
    })
})


app.get('/schedules/new', (req,res)=>{
    res.render('pages/newSchedule',{
        documentTitle: 'New Schedule'
    })
})

app.post('/schedules/new', (req, res) => {
    console.log(req.body)
    data.schedules.push(req.body)
    res.redirect('/')
})


// app.post('/schedules', (req, res) => {
//     data.users.push(req.body)
//     res.send(req.body)
// })


// // curl -d "firstname=Donald&lastname=Duck&email=coincoin@gmail.com&password=daisy" -X POST localhost:3000/users

// app.post('/users', (req, res) => {
//     const plainTextPassword = req.body.password
//     console.log(`The user password: ${plainTextPassword}`)
//     console.log('before')
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         const hash = bcrypt.hash(plainTextPassword, salt, (err, hash) => {
//             console.log(`The hash: ${hash}`)
//             res.send(hash)
//         });
//     });
//     console.log('after')
// })




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