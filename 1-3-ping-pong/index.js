const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const directory = path.join('/', 'app', 'logs')
const filePath = path.join(directory, 'counter.txt')

function writeLog(output) {
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '', 'utf-8');
	}
	fs.writeFileSync(filePath, output + os.EOL, 'utf-8');
}

let count = 0;

function handleRequest(req, res) {
	count += 1;
	console.log(count);
	res.writeHead(200);
	res.end(`pong ${count}`);
	writeLog(count);
}

const server = http.createServer(handleRequest);
server.listen(5001)

function cleanUp() {
	server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
