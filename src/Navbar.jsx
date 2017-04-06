import React, {Component} from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Navbar.jsx');
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="usersOnline">{this.props.users} user(s) online</span>
      </nav>
    );
  }
}
export default Navbar;