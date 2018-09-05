// apiRoutes/puppies.js
const router = require('express').Router();
const IPFS = require('ipfs');
const node = new IPFS();

// matches GET requests to /api/puppies/
router.get('/:ipfsFile', function(req, res, next) {
	/* etc */
});

router.get('/', async (req, res, next) => {
	console.log('Server is working');
	const version = await node.version();

	res.status(200).send(version);
});

router.get('/hash/:ipfsHash', async (req, res, next) => {
	const hash = req.params.ipfsHash;

	console.log('Request: ', hash);
	const fileBuffer = await node.files.cat(hash);
	res.status(200).send(fileBuffer.toString());
});
// matches POST requests to /api/puppies/
router.post('/', async (req, res, next) => {
	console.log('The body', req.body);
	const message = JSON.stringify(req.body);

	const fileAdded = await node.files.add({
		path: 'hello.txt',
		content: Buffer.from(message)
	});

	console.log('file added', fileAdded);
	res.status(200).send(fileAdded);
});

module.exports = router;

// node.on('ready', async () => {
// 	const version = await node.version();

// 	const filesAdded = await node.files.add({
// 		path: 'hello.txt',
// 		content: Buffer.from('{JSON: text}')
// 	});

// 	console.log('Version:', version.version);
// 	console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);

// 	const fileBuffer = await node.files.cat(filesAdded[0].hash);

// 	console.log('Added files contents:', fileBuffer.toString());
// });
