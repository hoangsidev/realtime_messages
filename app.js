const express =  require('express');
const app = express();
const server = require('http').Server(app);
 
server.listen(port=3000, function(){
console.log ('App listening on port', port);
});
 
app.get('/', function (req, res) {
  res.send('Hello World!')
});