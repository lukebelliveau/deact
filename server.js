const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

//serve static assets
app.use(express.static(__dirname + '/dist'));

//handle other assets (react stuff) through app.bundle.js script inside index.html
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(port);
console.log("server started on port " + port);