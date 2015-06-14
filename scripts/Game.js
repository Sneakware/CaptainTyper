'use strict';

import React from 'react';

import Text from './components/Text';
import View from './components/View';

var socket = io('localhost:3000');

export default class Game extends React.Component {

  componentWillMount () {

    this.setState({
      logged: false,
      serverName: '',
      servers: {}
    });

    // Initialize request for servers list
    socket.emit('list');

    socket.on('list', (servers) => {
      console.log(servers);
      this.setState({ servers: servers });
    });

  }

  createServer () {
    if (!this.state.serverName.length) { return ; }
    socket.emit('create', { room: this.state.serverName });
    this.setState({ logged: true, serverName: '' });
  }

  changeServerName (e) {
    this.setState({ serverName: e.target.value });
  }

  switchServer (name) {
    socket.emit('join', { room: name, player: 'NAME' });
    this.setState({ logged: true });
  }

  render () {
    if (this.state.logged) {
      return (
        <div>
          <View/>
          <Text/>
        </div>
      );
    }
    else {
      return (
        <div>
          <h3>Servers</h3>
          <input onChange={ this.changeServerName.bind(this) } type="text"/>
          <button onClick={ this.createServer.bind(this) }>Create</button>
          <ul>
            {
              Object.keys(this.state.servers).map(name => (
                <li onClick={ this.switchServer.bind(this, name) }>{name}</li>
              ))
            }
          </ul>
        </div>
      );
    }
  }

}
