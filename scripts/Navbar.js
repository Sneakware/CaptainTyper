'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {

  render () {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
        </ul>
      </nav>
    );
  }

}
