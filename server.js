const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');
const port = 3000;

const app = express(); //creates instance for express

app.use(express.static(path.join(__dirname, 'dist'))); //specifies dist path to express to use

app.use(bodyParser.urlencoded({
  extended: true
})); //parsers text as url encoded data

app.use(bodyParser.json()); //parses text as json

/* Routing: if routing is /app then it will use api.js path; otherwise it will use index.html in dist folder */
app.use('/api', api);

app.get('*', () => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//listens on port
app.listen(port, function() {
  console.log('server is running on localhost:' + port);
});