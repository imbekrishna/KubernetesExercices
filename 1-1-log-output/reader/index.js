const fs = require('node:fs');
const { randomUUID } = require('node:crypto');
const path = require('node:path');
const http = require('node:http')

// const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const directory = path.join('/', 'app', 'logs')
// const filePath = path.join(directory, 'log.txt')
const counterPath = path.join(directory, 'counter.txt')


function createOutput() {
    const randomString = randomUUID();
    const date = new Date();
    const response = `${date.toISOString()}: ${randomString}`;
    return response
}

function readLog(readFilePath) {
    try {
        return fs.readFileSync(readFilePath, 'utf-8');
    } catch (error) {
        return '0'
    }
}

function handleRequest(req, res) {
    res.writeHead(200);
    // res.end(readlog(filePath));
    res.end(`${createOutput()}\nPing / Pongs: ${readLog(counterPath)}`);
}

const server = http.createServer(handleRequest);
server.listen(4000)

function cleanUp() {
    server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
