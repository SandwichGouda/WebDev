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
    try {
        dbjson = readFileSync("server/db.json");
        db = JSON.parse(dbjson);
        console.log("db.json reloaded");
        res.type("text/plain");
        res.send("OK");
    } catch (error) {
        console.error(error);
    }
});

app.get('/nbpapers', (req, res) => {
    try {
        res.type('txt');
        res.send(""+JSON.parse(dbjson).length);
    } catch (error) {
        console.error(error);
    }
});

app.get('/byauthor/:author', (req, res) => {
    try {
        let author = req.params["author"];
        let list = [] ;
        for (let paper of db) {
            if (paper["authors"].some(obj => obj.toLowerCase() === author.toLowerCase())) {
                list.push(paper);
            }
        }
        res.type("text/plain");
        res.send(list.length);
    } catch (error) {
        console.error(error);
    }
});

app.get('/papersdesc/:chunk', (req, res) => {
    try {
        let chunk = req.params["chunk"];
        let list = [] ;
        for (let paper of db) {
            if (paper["authors"].some(obj => obj.toLowerCase().includes(chunk.toLowerCase()))) {
                list.push(paper);
            }
        }
        res.type("application/json");
        res.send(list);
    } catch (error) {
        console.error(error);
    }
});

app.get('/titlelist/:authorchunk', (req, res) => {
    try {
        let authorchunk = req.params["authorchunk"];
        let list = [] ;
        for (let paper of db) {
            if (paper["authors"].some(obj => obj.toLowerCase().includes(authorchunk.toLowerCase()))) {
                list.push(paper["title"]);
            }
        }
        res.type("application/json");
        res.send(list);
    } catch (error) {
        console.error(error);
    }
});

app.get('/titlelist/:authorchunk', (req, res) => {
    try {
        let authorchunk = req.params["authorchunk"];
        let list = [] ;
        for (let paper of db) {
            if (paper["authors"].some(obj => obj.toLowerCase().includes(authorchunk.toLowerCase()))) {
                list.push(paper["title"]);
            }
        }
        res.type("application/json");
        res.send(list);
    } catch (error) {
        console.error(error);
    }
});

app.get('/ref/:key', (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
    }
});

app.delete('/ref/:key', (req, res) => {
    try {
        let key = req.params["key"];
        for (let k in db) {
            if (db[k]["key"] === key) {
                delete db[k];
                break
            }
        }
        res.type("text/plain");
        res.send("OK");
    } catch (error) {
        console.error(error);
    }
});

app.use(express.json());

app.post('/ref/:key', (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
    }
});

app.put('/ref/:key', (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
    }
});


let port = process.argv[2];
// server starting
app.listen(port, () => console.log('Example app listening on port '+port+'!'));