import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:'Bob'},
      messages: [
        {
          id: 1,
          username: 'Anonymous1',
          content: 'I wont be impressed with technology until I can download food.'
        },
        {
          id: 2,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 3,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 4, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  postMessage(msg) {
    console.log(msg);
    const newMessage = {id: this.state.messages.length + 1, username: msg.username, content: msg.content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
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
