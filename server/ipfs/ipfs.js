const IPFS = require('ipfs');
const node = new IPFS();

node.on('ready', async () => {
	const version = await node.version();
	const myobj = { Key: 'Value' };
	const filesAdded = await node.files.add({
		path: 'hello.txt',
		content: Buffer.from(JSON.stringify(myobj))
	});

	console.log('Version:', version.version);
	console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);

	const fileBuffer = await node.files.cat(filesAdded[0].hash);

	console.log('Added files contents:', fileBuffer.toString());
});
