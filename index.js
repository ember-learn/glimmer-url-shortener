const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  if(!req.param('url')) {
    res.send('');
    return;
  }

  let url = "https://tinyurl.com/api-create.php?url=" + req.param('url');
  console.log('input: ' + url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('->  ' + body);
      res.send(body);
    }
  })
});

const server = app.listen(PORT, function(){
  console.log('Server listening on port ' + PORT);
});
