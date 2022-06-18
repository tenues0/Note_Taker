// the routing file for the database

const db = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils");
const fs = require("fs");
const path = require('path');

// GET route for retrieving database information from db.json
db.get('/api/notes', (req, res) => {
      // get the data
      return fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err,data) => {
        if (err) throw err;
    
        // send the data
        res.json(JSON.parse(data));
      });
});

// POST route for adding entry to the database
db.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    if (title && text) {

    const dataEntry = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }

    // I had to fix the path to the db.json file
    readAndAppend(dataEntry, path.join(__dirname, "../db/db.json"));

    const response = {
        status: 'success',
        body: dataEntry,
      };

      res.json(response);
    } else {
        res.json('Error adding entry to the database');
    }
});

db.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  // get the data
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err,data) => {
    if (err) throw err;

    const result = JSON.parse(data).filter(note => note.id !== noteId);
    writeToFile(path.join(__dirname, "../db/db.json"), result);



    // send the data
    res.json(JSON.parse(data));
  });
});

module.exports = db;




// db.delete("/api/notes/:id", (req, res) => {
//   // get the data
//   return fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err,data) => {
//     if (err) throw err;

//     let notes = JSON.parse(data);
//     let filterNotes = notes.filter(note => note.id !== req.params.id)

    

//     // send the data
//     res.json(JSON.parse(data));
//   });
// });