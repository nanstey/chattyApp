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
      </nav>
    );
  }
}
export default Navbar;