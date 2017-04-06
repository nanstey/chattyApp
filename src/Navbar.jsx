import React, {Component} from 'react';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Navbar.jsx');
    return (
      <nav className="navbar">
        <div href="/" className="navbar-brand">ChattyApp</div>
        <span className="usersOnline">{this.props.users} user(s) online</span>
      </nav>
    );
  }
}
export default Navbar;