import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.name
    };

    this.nameChange = this.nameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChange(event) {
    let newName = event.target.value;
    if (newName !== this.state.username) {
      this.setState({
        username: newName
      });
      // console.log(this.state.username, 'changed to', newName);
      let msg = {
        type: 'postNotification',
        oldName: this.state.username,
        newName: newName
      }
      this.props.postMessage(msg);
    }
  }

  handleSubmit(event) {
    if (event.key === 'Enter'){
      // console.log(event.target.value)
      let content = event.target.value;
      let name;
      this.state.username ? name = this.state.username : name = 'Anonymous';
      let msg = {
        type: 'postMessage',
        username: name,
        content: content
      };
      event.target.value = '';
      this.props.postMessage(msg);
    }
  }

  render() {
    console.log('ChatBar.jsx');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.username} onBlur={this.nameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmit}/>
      </footer>
    );
  }
}
export default ChatBar;
