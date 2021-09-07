import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { createMessage, getMessage, removeMessage } from './mongo';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    //log the received message and send it back to the client
    console.log('received: %s', message);
    const messageFromDB = async () => {
      await createMessage(message);
      const result = await getMessage(message);
      await removeMessage(message);
      return result;
    };
    messageFromDB().then((res) => ws.send(`Hello, you sent -> ${res.message}`));
  });

  //send immediatly a feedback to the incoming connection
  ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server started on port ${
      (<WebSocket.AddressInfo>server.address()).port
    } :)`
  );
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
