import express from 'express';
import * as http from 'http';
import path from 'path';
// import * as WebSocket from 'ws';
import { Server, Socket } from 'socket.io';
import { handleAction } from './socket-reducer';
// import { createMessage, getMessage, removeMessage } from './mongo';

const app = express();

app.use('/temp', express.static(__dirname + '/temp'));

//initialize a simple http server
const server = http.createServer(app);
const options = {
  path: '/api/',
  maxHttpBufferSize: 10 * 1024 * 1024, // increase message size to 10mb to handle file upload
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
};
export const io = new Server(server, options);

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
  socket.on('UPDATE_SERVER', (action) => {
    console.log('');
    console.log('action from client');
    console.log(action);
    handleAction(socket, action);
  });
});

//initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws: WebSocket) => {
//   //connection is up, let's add a simple simple event
//   ws.on('message', (message: string) => {
//     //log the received message and send it back to the client
//     console.log('received: %s', message);
//     const messageFromDB = async () => {
//       await createMessage(message);
//       const result = await getMessage(message);
//       await removeMessage(message);
//       return result;
//     };
//     messageFromDB().then((res) => ws.send(`Hello, you sent -> ${res.message}`));
//   });

//   //send immediatly a feedback to the incoming connection
//   ws.send('Hi there, I am a WebSocket server');
// });

//start our server
// server.listen(process.env.PORT || 3001, () => {
//   console.log(
//     `Server started on port ${
//       (<WebSocket.AddressInfo>server.address()).port
//     } :)`
//   );
// });

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3001');

server.listen(port, () => {
  console.log(`Server started on port 3001`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.json({
    statusCode: 404,
  });
});

// error handler
app.use((err, req, res, next) => {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});
