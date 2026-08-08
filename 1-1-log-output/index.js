const {randomUUID} = require('crypto');

const randomString = randomUUID();

function print(){
	const date = new Date();
	console.log(`${date.toISOString()}: ${randomString}`);
}

const interval = setInterval(print, 5000);

process.on('SIGTERM', () => clearInterval(interval));
process.on('SIGINT', () => clearInterval(interval));
