const mongoose = require('mongoose');

// Replace 'myFirstDatabase' with your database name and <password> with your password
const uri = "mongodb+srv://ashotbon:sbe92nEbD4rciWyE@dataclustermarkethub.lnesdpy.mongodb.net/database?retryWrites=true&w=majority"

mongoose.connect(uri)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));
