const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http')
const os = require('node:os');

// const directory = path.join('/', 'usr', 'src', 'app', 'logs')
const directory = path.join('/', 'app', 'logs')
const filePath = path.join(directory, 'log.txt')

const randomString = randomUUID();

function createOutput() {
	const date = new Date();
	const response = `${date.toISOString()}: ${randomString}`;
	return response
}

function writeLog(output) {
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, '', 'utf-8');
	}
	fs.appendFileSync(filePath, output + os.EOL, 'utf-8');
}

const interval = setInterval(() => {
	const output = createOutput();
	writeLog(output)
	console.log(output)
}, 5000);


function cleanUp() {
	clearInterval(interval);
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
