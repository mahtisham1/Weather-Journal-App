// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route
const wheatherData = [];

app.get('/all', getData);

function getData (req, res) {
  res.send(wheatherData);
  console.log(wheatherData);
};

// POST route

app.post('/add', addData);

function addData(req,res){
  console.log(req.body);
  newEntry = {
    newDate: req.body.date,
    temp: req.body.temp,
    feelings : req.body.content
  };
  wheatherData.push(newEntry);
  res.send(wheatherData)
  console.log(wheatherData);
}
