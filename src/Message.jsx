import React, {Component} from 'react';

class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Message.jsx');

    let newMessage;
    if (this.props.msg.type === 'incomingMessage'){
      newMessage = (
        <div className="message">
          <span className="message-username">{this.props.msg.username}</span>
          <span className="message-content">{this.props.msg.content}</span>
        </div>
      )
    }
    else if (this.props.msg.type === 'incomingNotification') {
      newMessage = (
        <div className="message system">
          {this.props.msg.content}
        </div>
      )
    }

    return (
      <div>
        {newMessage}
      </div>
    );
  }
}
export default Message;