import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('MessageList.jsx');
    return (
      <main className="messages">

        {this.props.messages.map( (message) => (
          <Message key={message.id} msg={message}/>
        ))}

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;