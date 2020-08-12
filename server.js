const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const knex = require('knex')

const app = express()

const postgres = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'newPassword',
    database : 'postgres'
  }
});

postgres.select('*').from('users').then(data => {
  console.log(data);
}) 

const database = {
  users : [
  {
    id: '123',
    name: 'John',
    email: 'john@gmail.com',
    password: 'cookies',
    entries: 0,
    joined : new Date()
  },
  {
    id: '124',
    name: 'Sally',
    email: 'sally@gmail.com',
    password: 'bananas',
    entries: 0,
    joined : new Date()
  }
  ]
}

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => res.send(database.users))

app.post('/signin',(req,res) =>{
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json('signed in');
  }
  else{
    res.status(400).json('access denied');
  }
})

app.post('/findface',(req,res) => {
  database.users.forEach(user => {
    if(user.email === req.body.email ){
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')
})


app.post('/register',(req,res) => {
  const { email,name,password } = req.body;
  database.users.push({
    id:'125',
       name: name ,
       email: email ,
       password: password,
       entries: 0,
       joined : new Data()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId',(req,res) => {
  const { id } = req.params;
  let found = false;
    database.users.forEach(user => {
      if(user.id === id){
        found = true; 
        return res.json(user);
      }
    })
    if(!found){
      res.status(400).json('not found');
    }
})
app.post('/image',(req,res) => {
  const { id } = req.params;
    database.users.forEach(user => {
      if(user.id === id){
        found = true;
        user.entries++  
        return res.json(user);
      }
      if(!found){
      res.status(400).json('not found');
    }
    })
})

app.listen(3000,() => console.log('Example app listening on port 3000!'))