import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:'Bob'},
      messages: []
    };

    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    var socket = new WebSocket('ws://localhost:3001');
    socket.onopen = function(event) {
      console.log('Connected to server');
    };
    socket.onmessage = (event) => {
      // code to handle incoming message
      var msg = JSON.parse(event.data);
      // console.log('msg', msg);
      const newMessage = {id: msg.id, username: msg.username, content: msg.content};
      var messages = this.state.messages.concat(newMessage);
      // console.log(messages);
      this.setState({messages: messages});
    }
    this.socket = socket;
  }

  postMessage(msg) {
    this.socket.send(JSON.stringify(msg));
    // console.log(msg);
  }



  render() {
    console.log('App.jsx');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} postMessage={this.postMessage}/>
      </div>
    );
  }
}
export default App;
