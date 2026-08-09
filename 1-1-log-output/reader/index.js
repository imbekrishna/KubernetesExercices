const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http')

// const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const directory = path.join('/', 'app', 'logs')
const filePath = path.join(directory, 'log.txt')

function readLog() {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, '', 'utf-8');
    }

    return fs.readFileSync(filePath, 'utf-8');
}

function handleRequest(req, res) {
    res.writeHead(200);
    res.end(readLog());
}

const server = http.createServer(handleRequest);
server.listen(4000)

function cleanUp() {
    server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
