const express = require('express')
const app = express()


//postgres setup
const db=require('./database.js')
const port = process.env.PORT||3000

//bcrypt
const bcrypt=require('bcrypt')
const saltRounds = 10;

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')

//show schedules
app.get('/', (req, res) => {
    db.any('SELECT * FROM schedules;')
    .then((schedules) => {
    console.log(schedules)
    res.render('pages/index', {
        documentTitle: 'Schedules',
        schedules: schedules
    })
 })
 .catch((err) => {
     res.send(err)
 })
})




//   app.get('/new', (req,res)=>{
//       res.render('pages/new', {
//           documentTitle: 'New Schedule'
//       })
//   })

//   app.post('/new', (req, res)=>{
//     const { user_id, day, start_at, end_at } = req.body
//     schedules.query('INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4)', [user_id, day, start_at, end_at], (error, results) => {
//         if (error) {
//           throw error
//         }
//         //res.status(201).send(`Schedule added with ID: ${result.user_id}`)
//         res.redirect('/new')
//       })

//   })

//show schedules form
app.get('/new',(req, res) => {
    res.render('pages/schedules')
})

//submit schedules form
app.post('/new' ,(req, res) => {
req.body.user_id = Number(req.body.user_id)
req.body.day = Number(req.body.day)
db.any('INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);', 
    [req.body.user_id, req.body.day, req.body.start_at, req.body.end_at])
.catch((err) => {
  res.send(err)
})
res.redirect('/')
})







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

