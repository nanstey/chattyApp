import React, {Component} from 'react';
import Message from './Message.jsx';
// import Notification from './Notification'

class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('MessageList.jsx');

    let lastPostUser = '';
    let lastMsgType = '';
    let printName = true;
    let Messages = [];
    for (let i = 0; i < this.props.messages.length; i++){
      let message = this.props.messages[i];
      printName = (message.user_id !== lastPostUser || lastMsgType === "incomingNotification");

      Messages.push(
        <Message key={message.id} msg={message} color={this.props.color} printName={printName} />
      )
      lastPostUser = message.user_id;
      lastMsgType = message.type;
    }

    return (
      <main className="messages">
        {Messages}
      </main>
    );
  }
}
export default MessageList;