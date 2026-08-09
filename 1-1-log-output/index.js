const { randomUUID } = require('node:crypto');
const http = require('node:http');

const randomString = randomUUID();

function createOutput() {
	const date = new Date();
	const response = `${date.toISOString()}: ${randomString}`;
	return response
}

const interval = setInterval(() => console.log(createOutput()), 5000);

function handleRequest(req, res) {
	res.writeHead(200);
	res.end(createOutput());
}

const server = http.createServer(handleRequest);
server.listen(4000)

function cleanUp() {
	clearInterval(interval);
	server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
