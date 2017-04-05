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
    console.log(newName);
    this.setState({
      username: newName
    });

  }

  handleSubmit(event) {
    if (event.key === 'Enter'){
      console.log(event.target.value)
      let content = event.target.value;
      let msg = {
        username: this.state.username,
        content: content
      };
      this.props.postMessage(msg);
      event.target.value = '';
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
