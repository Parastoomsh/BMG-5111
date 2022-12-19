const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
 app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/api/users', db.getUsers)
app.get('/api/medication/:id',db.getMedicationByID)

app.get('/api/user/:id', db.getUserById)
app.get('/api/Diagnosis/:id', db.getdiagnosisByID)
app.get('/api/lab/:id', db.getlabByID)
app.post('/api/createUser', db.createUser)

app.post('/api/createmeddata', db.createmeddata)
app.post('/api/creatediagdata', db.creatediagdata)
app.post('/api/deletediagdata', db.deletediagdata)
app.post('/api/deletelabdata', db.deletelabdata)
app.post('/api/createlabdata', db.createlabdata)

app.post('/api/predictByModel', db.predictByModel)

app.post('/api/health', (req, res) => {
  res.send({"result":"POST Request Called"})
})
app.post('/api/deletemeddata', db.deletemeddata)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
