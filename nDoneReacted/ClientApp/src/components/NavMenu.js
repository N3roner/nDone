import React, { Component } from 'react';
// import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';\
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (

      
        <nav className="navLV">
          <ul className="navBarList">
            <li className="navListItem">
              <NavLink tag={Link} to="/" className="navLink">Home</NavLink>
            </li>

            <li className="navListItem">
              <NavLink tag={Link} to="/" className="navLink">About</NavLink>
            </li>

            <li className="navListItem">
              <NavLink tag={Link} to="/dogadjaji" className="navLink">Dogadjaji</NavLink>
            </li>

            <li className="navListItem">
              <form className="navForm">
                <button className="navFormItem" type="submit">Search</button>
              </form>
            </li>
            <li className="signInButtonRight">
              <div id="loginBox">
              </div>
            </li>
          </ul>
        </nav>
        

    );
  }
}