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

app.get('/nbpapers', (req, res) => {
    res.type('txt');
    res.send(""+JSON.parse(dbjson).length);
});

app.get('/byauthor/:author', (req, res) => {
    console.log("caca")
    let db = JSON.parse(dbjson);
    let author = req.params["author"];
    let list = [] ;
    for (let paper of db) {
        if (paper["authors"].some(obj => obj.toLowerCase() === author.toLowerCase())) {
            list.push(paper);
        }
    }
    res.type("json");
    res.send(list);
});

let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));