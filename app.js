const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User'); // This should be the only place User is defined/imported
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

// Middleware configuration

const app = express();
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


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
app.use(flash());
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

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


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: __dirname + '/public' });
});
app.get('/register', (req, res) => {
  res.sendFile('signup.html', { root: __dirname + '/public' });
});

// app.post('/register', async (req, res) => {
//   console.log(req.body);  // Log the body to see what is received
//   try {
//       const { username, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ username, password: hashedPassword });
//       await user.save();
//       req.flash('success', 'Registration successful! Please log in.'); // Set a success message
//       res.redirect('/login');
//   } catch (err) {
//       console.error(err);
//       req.flash('error', 'Failed to register.');
//       res.redirect('/register');
//   }
// });

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/login?message=Registration successful. Please log in.');
  } catch (err) {
    console.error(err);
    res.redirect('/register?error=Failed to register.');
  }
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',  // redirect to the home page on success
  failureRedirect: '/login',  // redirect back to the login page on failure
  failureFlash: true  // enable flash messages
}));

app.get('/login', (req, res) => {
  var errorMessages = req.flash('error');
  var successMessages = req.flash('success');
  res.render('login', { errorMessages, successMessages });
});

app.get('/test-flash', (req, res) => {
  req.flash('info', 'Flash is working!');
  res.redirect('/check-flash');
});

app.get('/check-flash', (req, res) => {
  var messages = req.flash('info');
  res.send(messages.join(', '));  // Output flash message
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',  // Redirect to the home page after successful login
  failureRedirect: '/login',  // Redirect back to the login page on failure
  failureFlash: true  // Optionally enable flash messages for login failures
}));

