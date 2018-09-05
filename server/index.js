const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const db = require('./database/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use(morgan('dev'));

//routes go here
app.use('/api', require('./apiRoutes'));



app.get('*', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//middleware for 404 and server 500 errors.

app.use(function(err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});


db.sync({ force: false }).then(function() {
	app.listen(port, function() {
		console.log('Knock, knock');
		console.log("Who's there?");
		console.log(`Your server, listening on port ${port}`);
	});
});

