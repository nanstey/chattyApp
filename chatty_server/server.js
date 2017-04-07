// server.js
const uuidV1 = require('uuid/v1');
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 4001
const PORT = 4002;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let ColorCounter = 0;
let Sockets = {};
const colors = ['red', 'blue', 'green', 'magenta', 'rebeccapurple', 'cornflowerblue', 'grey', 'sienna', 'darkblue', 'teal'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let color = setUserColor();

  ws.id = uuidV1();
  Sockets[ws.id] = {
    id: ws.id,
    name: 'Anonymous',
    color: color
  };

  console.log(Sockets);
  updateUserList();

  function updateUserList() {
    let message = {
      type: "updateUserList",
      users: Sockets
    }
    broadcast(message);
  }

  function setUserColor(){
    let index = ColorCounter % colors.length;
    ColorCounter++;
    let message = {
      type: "setUserColor",
      color: colors[index]
    };
    ws.send(JSON.stringify(message));
    return message.color;
  }

  function broadcast(msg){
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  }

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    // console.log(message);
    switch (message.type){
      case "postNotification":
        console.log(message);
        Sockets[ws.id].name = message.newName;
        updateUserList();
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
   delete Sockets[ws.id]
   updateUserList();
  });

});
