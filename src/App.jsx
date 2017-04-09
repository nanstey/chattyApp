import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import UsersOnline from './UsersOnline.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:'Anonymous'},
      userList: [],
      messages: []
    };
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    var socket = new WebSocket('ws://localhost:4002');

    socket.onopen = (event) => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      // code to handle incoming message
      let msg = JSON.parse(event.data);
      console.log(msg);

      switch (msg.type){
        case "updateUserList":
          let userArr = [];
          for (let key in msg.users){
            userArr.push(msg.users[key]);
          }
          this.setState({userList: userArr})
          break;
        case "setUserConfig":
          this.setState({currentUser:{name: msg.name, id: msg.id}, color: msg.color});
          break;
        case "incomingMessage":
        case "incomingNotification":
          this.setState({messages: this.state.messages.concat(msg)});
          break;
      }
    }
    this.socket = socket;
  }

  postMessage(msg) {
    console.log(msg);
    msg.color = this.state.color;
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    console.log('App.jsx');
    return (
      <div>
        <Navbar />
        <div className="container">
          <MessageList messages={this.state.messages}/>
          <UsersOnline userList={this.state.userList} />
        </div>
        <ChatBar user={this.state.currentUser} postMessage={this.postMessage}/>
      </div>
    );
  }
}
export default App;
