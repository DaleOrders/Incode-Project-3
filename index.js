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

  app.get('/new',(req, res) => {
    res.render('pages/schedules')
})
app.post('/new' ,(req, res) => {
    console.log(req.body)
    new_Schedule = {
        username: req.body.username,
        day: +req.body.day,
        start_time: req.body.start_time,
        end_time: req.body.end_time
      };
      console.log(new_Schedule)

    db.none('INSERT INTO schedules(username, day, start_time, end_time)' +
    'values(${new_Schedule.username}, ${new_Schedule.day}, ${new_Schedule.start_time}, ${new_Schedule.end_time})',{new_Schedule} )
.catch((err) => {
  res.send(err)
})
res.redirect('/new')
})







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

