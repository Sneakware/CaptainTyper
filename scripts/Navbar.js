'use strict';

import React from 'react';

export default class Navbar extends React.Component {

  render () {
    return (
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/game">Game</a></li>
        </ul>
      </nav>
    );
  }

}
