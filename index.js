const app = require('express')();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


// socket server initialization
const io = require('socket.io')(http, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  // console.log('hello');
});

app.get('/test', function(req, res){
  res.sendFile(__dirname + '/index_test.html');
});


// socket handling
const homeNamespace = io.of('/');
homeNamespace.on('connection', function(socket){
  socket.on('chat message', function(msg){
    // console.log(msg);
    homeNamespace.emit('chat message', msg);
  });
});


const testNamespace = io.of('/test');
testNamespace.on('connection', function(socket){
  socket.on('chat message', function(msg){
    // console.log(msg);
    testNamespace.emit('chat message', msg);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
