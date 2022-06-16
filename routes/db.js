// the routing file for the database

const db = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
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
        data_id: uuidv4(),
    }

    readAndAppend(dataEntry, "../db/db.json");

    const response = {
        status: 'success',
        body: dataEntry,
      };

      res.json(response);
    } else {
        res.json('Error adding entry to the database');
    }
});

module.exports = db;