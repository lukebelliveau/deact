const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(port);
console.log("server started on port " + port);