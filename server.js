const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const app = express()

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'newPassword',
    database : 'postgres'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
}) 


app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => res.send(database.users))

app.post('/signin',(req,res) => { signin.handleSignin(req, res ,db ,bcrypt)})


app.post('/register',(req,res) => { register.handleRegister(req, res ,db ,bcrypt) })


app.get('/profile/:id',(req,res) => { profile.handleProfile(req,res,db)})


app.put('/image',(req,res) => { image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => { image.handleApiCall(req,res)})

app.listen(3000,() => console.log('Example app listening on port 3000!'))