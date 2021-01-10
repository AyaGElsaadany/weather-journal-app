// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app =express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, ()=>{
    console.log('server running');
    console.log(`running on localhost: ${port}`)});

// Respond with JS object when a GET request is made to the homepage
app.get('/allData', function (req, res) {
    res.send(projectData);
    projectData = [];
  });

//post request
app.post('/allData', addData);


function addData(req,res){
  console.log(res.body)
  
  newEntry = {
    date : req.body.date,
    temp : req.body.temp,
    content : req.body.content
  }

  projectData.push(newEntry)
  console.log(projectData)
  
}    