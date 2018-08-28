// Import the required modules
var express = require('express');
var fs = require('fs');

// Initialize the express app
var app = express();

// Declare public dir to be used as the static dir
app.use('/public', express.static(__dirname + '/public'));

// Make the default route to serve the static file
app.get('/', function(req, res) {
	return res.redirect('/public/home.html');
});

// Define a route music to create a readstream to the requested file and pipes the data
app.get('/music', function(req, res) {
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if(exists) {
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send('It\'s a 404');
			res.end();
		}
	});
});

// This is the code for downloading music files, almost the same aside from 2 variables
// Content-disposition and Content-Type which force chrome browser to force download rather then playing the media

app.get('/download', function(req, res) {
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file, function(exists) {
		if(exists) {
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'applictaion/audio/mpeg3');
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		} else {
			res.send('It\'s a 404');
			res.end();
		}
	});
});


app.listen(3000, function() {
	console.log('Hey, Listen! -Navi on port 3000');
});

