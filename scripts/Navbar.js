'use strict';

import React from 'react';
import { Link } from 'react-router';

import Utils from './Utils';

export default class Navbar extends React.Component {

  showModal () {
    Utils.dispatcher().dispatch({
      eventType: 'toggleUsernameModal'
    });
  }

  saveUsername (e) {
    Utils.changeUsername(e.username);
    this.setState({ username: Utils.getUsername() });
  }

  componentWillMount () {
    this.setState({ username: Utils.getUsername() });
  }

  componentDidMount () {

    var events = {
      saveUsername: this.saveUsername.bind(this)
    };

    Utils.dispatcher().register(payload => {
      if (!events[payload.eventType]) { return; }
      events[payload.eventType](payload);
    });
  }

  render () {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li onClick={ this.showModal.bind(this) } className="selectable">{ this.state.username }</li>
        </ul>
      </nav>
    );
  }

}
