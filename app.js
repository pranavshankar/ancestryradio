var express = require('express');
var http =  require('http');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

var SCRIPTS_PATH = "js";
var scriptsFiles = fs.readdirSync(path.join(__dirname, "static/" + SCRIPTS_PATH));
var scripts = [];
scriptsFiles.forEach(function(fileName) {
	if(path.extname(fileName) == ".js") {
		scripts.push(path.join(SCRIPTS_PATH, fileName));
	}
});

app.get('/radio', function(request, response) {
	var birthYear = request.query.birthYear;
	var location = request.query.location;
	var obj = {
		scripts: scripts,
		birthYear: birthYear}
	response.render('index', obj);
});

app.get('/', function(request, response) {
	response.render('index', {scripts: scripts, birthYear: 5});
});

http.createServer(app).listen(app.get('port'));