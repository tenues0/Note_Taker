// Import express package
const express = require('express');
const path = require('path');
const { clog } = require("./middleware/clog");
const api = require('./routes/index.js');


// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// the port that we are using for this app
const PORT = process.env.port || 3001;
// app is an object representation of a server
const app = express();

// import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use helps us add configurations 
// make the public folder accessible to the client 
app.use(express.static('public'));


// bringing the JSON file in and assigning it a variable
// const notes = require('./db/db.json');




// HTML routes
// GET request that returns the HTML page
// the homework notes call to make a GET * request
// instead of a GET '/' request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// GET request that returns the /notes HTML page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// API routes
// return the JSON file containing the saved notes
app.get('/api/notes', (req, res) => res.json(notes));

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

    // req.body.id = Math.floor(Math.random() * 1000000);
    // notesData.push(req.body);
    // res.json(`${req.method} request received`);
    // receiving Title and Text from note
    // const { title, text } = req.body;
    console.log(req.body);
    const title = req.body.title;
    const text = req.body.text;

    if (title && text) {
    const newNote = {
      title,
      text,
      id: 1,
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);

    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
    notes.push(newNote);
    res.json(notes);
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });



app.use('/api', api);

// This code is for the listening PORT,
// without this the server will not listen and 
// will not be able to respond to the client.
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);