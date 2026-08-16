const fs = require('node:fs');
const { randomUUID } = require('node:crypto');
const path = require('node:path');
const http = require('node:http')

function createOutput() {
    const randomString = randomUUID();
    const date = new Date();
    const response = `${date.toISOString()}: ${randomString}`;
    return response
}

function getPing() {
    const res = fetch('http://ping-pong-svc:2349/pings').then(res => res.text()).catch(console.error)
    return res;
}


async function handleRequest(req, res) {
    res.writeHead(200);
    res.end(`${createOutput()}\nPing / Pongs: ${await getPing()}`);
}

const server = http.createServer(handleRequest);
server.listen(4000)

function cleanUp() {
    server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
