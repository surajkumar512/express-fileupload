const express = require('express');
const fileUpload = require('../../lib/index.js');
const app = express();

app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files);

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.get('/download/', function(req, res) {
	var fileName = req.query.fname
	var downloadPath = __dirname + '/uploads/' + fileName;
    res.download(downloadPath);  
});


app.listen(8080, function() {
  console.log('Express server listening on port 8080 : 2');
});
