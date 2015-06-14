'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

import Navbar from './Navbar';

export default class Layout extends React.Component {

  render () {
    return (
      <div>
        <Navbar/>
        <RouteHandler/>
      </div>
    );
  }

};
