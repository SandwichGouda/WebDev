"use strict";

// no {} this time in import
import express from "express"; 
import {readFileSync} from "fs";


// add middlewares here
import morgan from "morgan";

const app = express();

app.use(morgan('tiny'));  

let dbjson = readFileSync("server/db.json").toString();
let db = JSON.parse(dbjson);

// list of routes
app.get('/', (req, res) => res.send('Hi'));
app.get('/kill', (req, res) => process.exit(0));
app.get('/clean', (req, res) => {
    dbjson = readFileSync("server/db.json");
    db = JSON.parse(dbjson);
    console.log("db.json reloaded");
});

app.get('/nbpapers', (req, res) => {
    res.type('txt');
    res.send(""+JSON.parse(dbjson).length);
});

app.get('/byauthor/:author', (req, res) => {
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

app.get('/titlelist/:authorchunk', (req, res) => {
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

app.get('/ref/:key', (req, res) => {
    let key = req.params["key"];
    let found = false ;
    for (let paper of db) {
        if (paper["key"] === key) {
            res.type("application/json");
            res.send(JSON.stringify(paper));
            found = true; 
            break;
        }
    }
    if (!found) {
        res.type("application/json");
        res.send("[]");
    }
});

app.delete('/ref/:key', (req, res) => {
    let key = req.params["key"];
    for (let k in db) {
        if (db[k]["key"] === key) {
            delete db[k];
            break
        }
    }
    res.type("text/plain");
    res.send("OK");
});

app.use(express.json());

app.post('/ref/:key', (req, res) => {
    let key = req.params["key"];
    let newRef = req.body;

    if (newRef.key !== key) {
        console.log("Key mismatch between URL and body");
    }

    console.log(newRef);

    db.push(newRef);
    dbjson = JSON.stringify(db);

    res.type("text/plain");
    res.send("OK");
});

app.put('/ref/:key', (req, res) => {
    let key = req.params["key"];
    let newRef = req.body;

    console.log(newRef);

    for (let k in db) {
        if (db[k]["key"] === key) {
            for (let field in newRef) {
                db[k][field] = newRef[field];
            }
        }
    }

    res.type("text/plain");
    res.send("OK");
});


let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));