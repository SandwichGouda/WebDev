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

let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));