const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
let contador=0;
const mensajes=[];
const app = express();
const server = http.createServer(app);
//Socket io requires de HTTP server as parameter.
const io = socketio(server, 
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

const port = process.env.PORT || 3002;
const publicDirectory = path.join(__dirname, '../public');

app.use(express.static(publicDirectory));

// socket parameter is {} with the client information
io.on('connection', (socket) => {
  
  socket.on('sendMessage',(data)=>{
    let usu =JSON.parse(data);
    usuarios.push(usu.nombre);
    mensajes.push(usu)
    io.emit(usu)
    contador++;
  });
  
  socket.on('increment',(data)=>{
    let usu =JSON.parse(data);
    usuarios.push(usu.nombre);
    
    contador++;
    io.emit('contador',contador)
  });
  
  // Must be inside callback of connection
  socket.on('disconnect', () => {});
});

server.listen(port, () => {
  console.log(`Server Runing on PORT ${port}`);
});
let usuarios=[]

app.get('/main',(req,res)=>{
  let todos;
  console.log(mensajes)
  mensajes.forEach((uno)=>{todos+=`<h4>${uno.nombre}</h4><p>${uno.message}</p>`});
  res.send(`El contador es : ${contador} ${todos}`)
})
/**
 * socket.emit() : Sends message to single client
 * socket.on(): Receives all messages
 * io.emit(): Send message to all clients
 * socket.broadcast.emit() : Send message to all clients EXCEPT the one that just connected.
 */