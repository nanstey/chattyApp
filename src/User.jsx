import React, {Component} from 'react';

class User extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('User.jsx');
    let style = {
      color: this.props.user.color
    }
    return (
      <div className="user" style={style} >
        <svg className="user-color"  >
          <circle cx="5" cy="5" r="5" fill={this.props.user.color} />
        </svg>
        <span className="user-name">{this.props.user.name}</span>
      </div>
    );
  }
}
export default User;