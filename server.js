//перед проектом нужно использовать npm install
var express = require('express'); 
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req,res){ 
    res.sendFile(__dirname + "/проект/student.html");
});

app.post('/', urlencodedParser, function(req,res){ 
    if (!req.body) return res.status(400);
    console.log(req.body);
    res.sendFile(__dirname + "/проект/student.html");; 
});

app.listen(3000);