"use strict";

// no {} this time in import
import express from "express"; 
import {readFileSync} from "fs";


// add middlewares here
import morgan from "morgan";

const app = express();

app.use(morgan('tiny'));  

let dbjson = readFileSync("server/db.json").toString();

// list of routes
app.get('/', (req, res) => res.send('Hi'));
app.get('/kill', (req, res) => process.exit(0));
app.get('/clean', (req, res) => {
    dbjson = readFileSync("server/db.json");
    console.log("db.json reloaded");
});



let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));