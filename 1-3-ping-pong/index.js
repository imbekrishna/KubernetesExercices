const http = require('node:http');
const path = require('node:path');
const url = require('node:url');

let count = 0;

const ping = (req, res) => {
    count += 1;
    res.writeHead(200);
    res.end(`pong ${count}`);
};

const routes = {
    '/': ping,
    '/pingpong': ping,
    '/pings': (req, res) => res.end(String(count))
};


const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (routes[pathname]) {
    routes[pathname](req, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
server.listen(5001)

function cleanUp() {
	server.close()
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
