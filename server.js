const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Set up PostgreSQL database connection using knex
const db = knex({
  client: 'pg',
  connection:{
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// Set up Express.js app
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// End Points
app.get('/', (req, res) => { res.send('Nothing here') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// Post boot confirmation
app.listen(process.env.PORT || 3000, () => { console.log(`App is running in port ${process.env.PORT}`) });