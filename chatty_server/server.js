// server.js
const uuidV1 = require('uuid/v1');
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3002;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let ConnectedUsers = 0;
const colors = ['red', 'blue', 'green', 'magenta'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  setUserColor();
  usersConnected(1);

  function setUserColor(){
    let index = ConnectedUsers % colors.length;
    let message = {
      type: "setUserColor",
      color: colors[index]
    };
    ws.send(JSON.stringify(message))
  }

  function broadcast(msg){
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  }

  function usersConnected(num) {
    ConnectedUsers += num;
    let message = {
      type: "usersConnected",
      users: ConnectedUsers
    }
    broadcast(message);
  }

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    // console.log(message);
    switch (message.type){
      case "postNotification":
        message.type = "incomingNotification";
        break;
      case "postMessage":
        message.type = "incomingMessage";
        break;
    }
    message.id = uuidV1();
    broadcast(message);
    // console.log(message.id, 'User', message.username, 'said', message.content);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
   console.log('Client disconnected');
   usersConnected(-1);
  });

});
