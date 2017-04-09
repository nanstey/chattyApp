import React, {Component} from 'react';
import reactStringReplace from 'react-string-replace';


class Message extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    const URL = /(https?:\/\/[\w\-\.]+\.[a-zA-Z]{2,3}(?:\/\S*)?(?:[\w])+\.(?:jpg|png|gif|jpeg|bmp))/ig;
    console.log('Message.jsx');
    let style = {
      color: this.props.msg.color
    }
    let newMessage;
    if (this.props.msg.type === 'incomingMessage'){
      newMessage = (
        <div className="message">
          { this.props.printName &&
            <span className="message-username" style={style}>{this.props.msg.username}</span>
          }
          <div className="message-content">
            {reactStringReplace(this.props.msg.content, URL, (match, i) => (
              <img key={i} src={match} />
            ))}
          </div>
        </div>
      )
    }
    else if (this.props.msg.type === 'incomingNotification') {
      newMessage = (
        <div className="message system">
          {this.props.msg.oldName} changed their name to {this.props.msg.newName}
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