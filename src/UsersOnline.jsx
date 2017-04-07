import React, {Component} from 'react';
import User from './User.jsx'

class UsersOnline extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('UsersOnline.jsx');
    return (
      <aside className="usersOnline">
        <span className="">{this.props.userList.length} user(s) online:</span>
        <br/><br/>
        {this.props.userList.map( (user) => (
          <User key={user.id} user={user} />
        ))}
      </aside>
    );
  }
}
export default UsersOnline;