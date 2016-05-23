var express = require('express');
var app = express();
var path = require("path");

// set static directories
app.use(express.static(path.join(__dirname, './')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

var port = process.env.PORT || 80;
app.listen(port);
console.log('Listening on port ', port);
