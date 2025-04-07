"use strict";

import {createServer} from "http";
import {readFileSync, existsSync, writeFileSync} from "fs";

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'txt': 'text/plain',
    'pdf': 'application/pdf',
    'mjs': 'application/javascript'
};

let users = [];
let user;

function extension(file) {
    return file.split(".").slice(-1)[0]
}

function remove(arr, i) {
    if (i === 0) {
        return arr.slice(1)
    } else if (i === arr.length) {
        return arr.slice(0,arr.length -1)
    } else {
        return arr.slice(0,i).concat(arr.slice(i+1))
    }
}

// handle requests
function webserver( request, response ) {

    try {
        if (request.url === "/end") {
            response.setHeader("Content-Type", "text/html; charset=utf-8");  
            response.end("<!doctype html><html><body>The server will stop now.</body></html>"); // The response.end is important, it allows to set the HTML responded
            process.exit(0)
        } else if (request.url.slice(0,4).toUpperCase() === "/WWW") {
            let path = request.url.slice(5);
            console.log(request.url);
            console.log(path);
    
            if (request.url.includes("../")) {
                console.log("403 Path traversal");
                response.statusCode = 403;
                response.end("403 Forbidden - don't try to path traversal us !");
            } else if (!existsSync(path) || !path.includes(".")) {
                console.log("404");
                response.statusCode = 404;
                response.end("404 Not found - This path or file does not exist on this server");
            } else {
                console.log("200");
                let rfs = readFileSync(path); 
                response.setHeader("Content-Type", mimeTypes[extension(path)]);
                response.end(rfs); 
                // The response.end is important, it allows to set the HTML responded
                // It also sens the response ! (!!!)(imporant : that means you can't set headers afterwards)
            }
        } else if (request.url === "/Data") {
            let storage = readFileSync("storage.json").toString();
            response.setHeader("Content-Type", mimeTypes["json"]);
            response.end(storage);
        } else if (request.url.slice(0,4) === "/add") {
            let req = request.url.slice(5);
            let t = req.split("&");
            console.log(req,t);
            let title = t[0].slice(6);
            let value = t[1].slice(6);
            let color = t[2].slice(6);

            console.log(value, parseInt(value))

            let storage = JSON.parse(readFileSync("storage.json").toString());

            let newObj = {
                "title" : title,
                "color" : color,
                "value" : parseInt(value),
            };

            storage.push(newObj);

            console.log(storage);

            console.log(JSON.stringify(storage));

            writeFileSync("storage.json",JSON.stringify(storage));
            /*
            console.log(title);
            console.log(value);
            console.log(color);
            console.log(storage);
            */
            response.end();
        } else if (request.url.slice(0,7) === "/remove") {
            let index = +request.url.slice(14);

            let storage = JSON.parse(readFileSync("storage.json").toString());
            
            let storage_ = remove(storage,index);

            writeFileSync("storage.json",JSON.stringify(storage_));
            response.end();
        } else if (request.url.slice(0,6) === "/clear") {
            writeFileSync("storage.json",`[{"title": "empty", "color": "red", "value": 1}]`);
            response.end();
        } else if (request.url.slice(0,8) === "/restore") {
            console.log("restore")
            writeFileSync("storage.json",`[{"title":"foo","color":"red","value":20},{"title":"bar","color":"ivory","value":100},{"title": "gouda", "color": "orange", "value": 10}]`);
            response.end();

        } else if (request.url.slice(0,7).toLowerCase() === "/pchart") {
            console.log("pchart");
            response.setHeader("Content-Type", "image/svg+xml; charset=utf-8"); 
            let rfs = readFileSync("piechart.svg");
            response.end(rfs);

        } else if (request.url.slice(0,6).toLowerCase() === "/data") {
            console.log("pchart");
            response.setHeader("Content-Type", "image/svg+xml; charset=utf-8"); 
            let rfs = readFileSync("piechart.svg");
            response.end(rfs);

        } else {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>Server is working</body></html>");
        }
    } catch (error) {
        console.error(error);
    }
}

// server object creation
const server = createServer(webserver);

let port = process.argv[2];
// start listening
server.listen(process.argv[2], (err) => {});

