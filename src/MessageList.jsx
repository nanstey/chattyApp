import React, {Component} from 'react';
import Message from './Message.jsx';
// import Notification from './Notification'

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('MessageList.jsx');
    return (
      <main className="messages">

        {this.props.messages.map( (message) => (
          <Message key={message.id} msg={message} color={this.props.color}/>
        ))}

      </main>
    );
  }
}
export default MessageList;