import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:'Bob'},
      connectedUsers: 0,
      messages: []
    };

    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    var socket = new WebSocket('ws://localhost:3002');

    socket.onopen = (event) => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      // code to handle incoming message
      let msg = JSON.parse(event.data);
      console.log(msg);

      if (msg.type === "usersConnected"){
        this.setState({connectedUsers: msg.users })
      } else {
        let messages = this.state.messages.concat(msg);
        this.setState({messages: messages});
      }
    }

    this.socket = socket;
  }

  postMessage(msg) {
    console.log(msg);
    this.socket.send(JSON.stringify(msg));
  }



  render() {
    console.log('App.jsx');
    return (
      <div>
        <Navbar users={this.state.connectedUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} postMessage={this.postMessage}/>
      </div>
    );
  }
}
export default App;
