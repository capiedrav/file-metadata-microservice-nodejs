var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer"); // module for handling file uploads

var app = express();

app.use(cors());

const multerMiddleware = multer({dest: "/tmp"}) // put uploaded files in tmp directory (to not fill up the disk)

app.use('/public', express.static(process.cwd() + '/public'));

/*
requests to "/api/fileanalyse" endpoint must first pass through multer.
"single" function is used when uploading one file at a time,
"upfile" is the name of the input field in the form in charge of uploading files
*/
app.use("/api/fileanalyse", multerMiddleware.single("upfile"))

app.post("/api/fileanalyse", (request, response) => { // handle POST requests to the "/api/fileanalyse" endpoint
  
  const fileMetaData = { // get file metadata
    name: request.file.originalname,
    type: request.file.mimetype,
    size: request.file.size
  }
  
  response.json(fileMetaData); // send file metadata as a json object
  
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
