import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return(
    <div className="header">
      <ul>
        <li><Link to='/Home'>Home</Link></li>
        <li><Link to='/statistics'>Statistics</Link></li>
        <li style={{float: 'right'}}><Link to='/'>Change User</Link></li>
      </ul>
    </div>
  )
}
export default Header;
