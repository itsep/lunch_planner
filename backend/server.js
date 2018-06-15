var express = require('express');
var formidable = require('formidable');
const path = require('path');
const uuidv4 = require('uuid/v4')

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')))


app.post('/', function (req, res){
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file){
    file.path = 'C:\\Users\\marcm\\OneDrive\\Desktop\\data' + uuidv4() + file.name;
  });


  return res.json(200, {
    result: 'Upload Success'
  });
});
app.listen(3000, () => console.log('Server app listening on port 3000!'))

