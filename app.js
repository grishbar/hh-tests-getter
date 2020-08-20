var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require('cors')
const path = require('path');
 
var app = express();
var jsonParser = bodyParser.json();
const port = process.env.PORT || 3001;
 
//app.use(express.static(__dirname + "/public"));
// получение списка тестов
app.get("/api/tests-data", function(req, res){
    var content = fs.readFileSync("tests-data.json", "utf8");
    var testsData = JSON.parse(content);
    res.send(testsData);
});

// добавление теста
app.post("/api/tests-data/add-test", cors(), jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var content = fs.readFileSync("tests-data.json", "utf8");
    var data = JSON.parse(content);
    data.tests.push(req.body.test);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("tests-data.json", JSON.stringify(data));
    res.send(data);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
  
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});