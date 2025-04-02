"use strict";

import {createServer} from "http";
import {readFileSync, existsSync} from "fs";

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
    'pdf': 'application/pdf'
};

function extension(file) {
    return file.split(".").slice(-1)[0]
}

// handle requests
function webserver( request, response ) {
    console.log(request.url);
    let rfs = readFileSync("exercise1c.html"); 
    response.setHeader("Content-Type", "text/html; charset=utf-8");  
    response.end(rfs);
}

// server object creation
const server = createServer(webserver);

let port = process.argv[2];
// start listening
server.listen(process.argv[2], (err) => {});

