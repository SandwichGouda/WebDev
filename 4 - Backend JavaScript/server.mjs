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
    'pdf': 'application/pdf',
    'mjs': 'application/javascript'
};

let users = [];
let user;

function extension(file) {
    return file.split(".").slice(-1)[0]
}

// handle requests
function webserver( request, response ) {

    try {
        if (request.url === "/end") {
            response.setHeader("Content-Type", "text/html; charset=utf-8");  
            response.end("<!doctype html><html><body>The server will stop now.</body></html>"); // The response.end is important, it allows to set the HTML responded
            process.exit(0)
        } else if (request.url.slice(0,4) === "/www") {
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
        } else if (request.url.slice(0,16) === "/hallo?visiteur=" && request.method === "GET") {
            response.setHeader("Content-Type", "text/html; charset=utf-8"); 
            response.end("<!doctype html><html><body>hallo "+decodeURIComponent(request.url.slice(16))+"</body></html>");
        } else if (request.url.slice(0,11) === "/ciao?user=") {
            user = request.url.slice(11);
            user.replace("<","_");
            user.replace(">","_")
            response.setHeader("Content-Type", "text/html; charset=utf-8"); 
            response.end("<!doctype html><html><body>ciao "+user+", the following users have already visited this page: "+users.join(", ")+"</body></html>");
            users.push(user);
        } else if (request.url.slice(0,6) === "/clear") {
            users = [];
            response.setHeader("Content-Type", "text/html; charset=utf-8"); 
            response.end("<!doctype html><html><body>ciao "+user+", the following users have already visited this page: "+users.join(", ")+"</body></html>");
        } else {
            response.setHeader("Content-Type", "text/html; charset=utf-8"); 
            response.end("<!doctype html><html><body>Server is working</body></html>");
        }
    } catch (error) {
        console.error(error)
    }
}

// server object creation
const server = createServer(webserver);

let port = process.argv[2];
// start listening
server.listen(process.argv[2], (err) => {});

