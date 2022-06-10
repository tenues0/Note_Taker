// Import express package
const express = require('express');
const path = require('path');

// app is an object representation of a server
const app = express();

// bringing the JSON file in and assigning it a variable
const notesData = require('./db/db.json')

// the port that we are using for this app
const PORT = 3001;

// app.use helps us add configurations 
// make the public folder accessible to the client 
app.use(express.static('public'));

// HTML routes
// GET request that returns the HTML page
// the homework notes call to make a GET * request
// instead of a GET '/' request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// GET request that returns the /notes HTML page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// API routes
// return the JSON file containing the saved notes
app.get('/api/notes', (req, res) => res.json(notesData));

// POST request 
//
// activities 13 - 18 from week 11 Express
//
// POST request should receive a new note to save on the request body
// add it to the db.json file
// and then return the new note to the client
// find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

// starter code
app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });



// This code is for the listening PORT,
// without this the server will not listen and 
// will not be able to respond to the client.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);