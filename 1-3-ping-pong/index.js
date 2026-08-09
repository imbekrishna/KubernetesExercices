const http = require('node:http');

let count = 0;

function handleRequest(req, res) {
	res.writeHead(200);
	res.end(`pong ${count++}`);
}

const server = http.createServer(handleRequest);
server.listen(5001)

function cleanUp() {
	server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
