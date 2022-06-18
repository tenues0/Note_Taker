// Import express package
const express = require('express');
const path = require('path');
const api = require('./routes/db.js');

// the port that we are using for this app
const PORT = process.env.port || 3001;
// app is an object representation of a server
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use helps us add configurations 
// make the public folder accessible to the client 
app.use(express.static('public'));

app.use(api);

// HTML routes
// GET request that returns the HTML page
// the homework notes call to make a GET * request
// instead of a GET '/' request
// the '*' is a Wildcard route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// GET request that returns the /notes HTML page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// This code is for the listening PORT,
// without this the server will not listen and 
// will not be able to respond to the client.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);