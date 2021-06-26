import React, { Component } from 'react';
// import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className='mainDivClass' >
        <NavMenu />        
          {this.props.children}          
      </div>
    );
  }
}
