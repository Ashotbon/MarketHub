const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User'); // This should be the only place User is defined/imported

const app = express();

// MongoDB Atlas connection string from environment variable
mongoose.connect("mongodb+srv://ashotbon:sbe92nEbD4rciWyE@dataclustermarkethub.lnesdpy.mongodb.net/database?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'marketplace secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define routes and static file directory
app.use(express.static('public'));

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.get('/login', (req, res) => {
//   res.sendFile('path_to_login.html', { root: __dirname });
// });

app.get('/register', (req, res) => {
  res.sendFile('path_to_register.html', { root: __dirname });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: __dirname + '/public' });
});