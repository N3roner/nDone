import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './nUiEditor.css';

function NMenu() {
    return (
        <NavBar>
            <NavItem nDisp='skrol' />
            <NavItem nDisp='drugi' />
            <NavItem nDisp='moj meni'>
                <DropdownMenu></DropdownMenu>
            </NavItem>

        </NavBar>)
}

function NavBar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav"> {props.children} </ul>
        </nav>
    );
}
function NavItem(props) {

    const [open, setOpen] = useState(false);
    return (
        <li className="nav-item">
            <button className="nButton" onClick={() => setOpen(!open)} >
                {props.nDisp}
            </button>

            {open ? console.log('open') : console.log('nije open')}
            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])


    function DropdownItem(props) {
        return (
            <button className="nButton" onClick={console.log('klikno drop')}>
                {props.children}
            </button>
        );
    }

    function calcHeight(el) {
        console.log('aaaaaa ' + el);
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    < DropdownItem goToMenu="settings">Settings </ DropdownItem>
                    < DropdownItem goToMenu="settings"> drugi </ DropdownItem>

                </div>
            </CSSTransition>
     
        </div>
    )
}

export default NMenu;