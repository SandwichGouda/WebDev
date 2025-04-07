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
    let db = JSON.parse(dbjson);
    let author = req.params["author"];
    let list = [] ;
    for (let paper of db) {
        if (paper["authors"].some(obj => obj.toLowerCase() === author.toLowerCase())) {
            list.push(paper);
        }
    }
    res.type("text/plain");
    res.send(list.length);
});

app.get('/papersdesc/:chunk', (req, res) => {
    let db = JSON.parse(dbjson);
    let chunk = req.params["chunk"];
    let list = [] ;
    for (let paper of db) {
        if (paper["authors"].some(obj => obj.toLowerCase().includes(chunk.toLowerCase()))) {
            list.push(paper);
        }
    }
    res.type("application/json");
    res.send(list);
});

app.get('/titlelist/:authorchunk', (req, res) => {
    let db = JSON.parse(dbjson);
    let authorchunk = req.params["authorchunk"];
    let list = [] ;
    for (let paper of db) {
        if (paper["authors"].some(obj => obj.toLowerCase().includes(authorchunk.toLowerCase()))) {
            list.push(paper["title"]);
        }
    }
    res.type("application/json");
    res.send(list);
});

let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));