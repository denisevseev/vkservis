// import React, { useEffect, useRef, useState } from "react";
// import "./Module.LeftMenu.scss";
// // import State from "../store/State";
// import { observer } from "mobx-react";
// import { NavLink } from "react-router-dom";
//
// const LeftMenu = () => {
//   const [isActive, setActive] = useState(false);
//   let ChangeCheckBox = (e) => {
//     // State.LeftMenuCheckboxes(e)
//   };
//   let ref = useRef();
//   let showMenu = () => {
//     ref.current.style.display = "inline";
//   };
//   const inputChanged = (e) => {
//     setActive(true);
//     setTimeout(() => setActive(false), 2000);
//   };
//   return (
//     <div>
//       <div className="d-grid gap-5 col-3">
//         <div className="" >Button</div>
//         <div className="" >Button</div>
//       </div>
//       <input type="checkbox" id="hmt" className="hidden-menu-ticker" />
//       <label className="btn-menu" htmlFor="hmt">
//         <span className="first"></span>
//         <span className="second"></span>
//         <span className="third"></span>
//       </label>
//       <div className="hidden-menu">
//
//
//         <li>
//           <a style={{ marginTop: "1em" }} className="dropdown-item" href="#">
//             группы
//           </a>
//         </li>
//         <li>
//           <a className="dropdown-item" href="#">
//             рассылка
//           </a>
//         </li>
//         <NavLink to="/BuyAccounts" style={{ textDecoration: "none" }}>
//           <li>
//             <a className="dropdown-item">Аккаунты</a>
//           </li>
//         </NavLink>
//       </div>
//     </div>
//   );
// };
//
// export default observer(LeftMenu);

import React from 'react';
import { Component } from 'react';
// import './nav.css';

import { Navbar, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { goToAnchor, configureAnchors } from 'react-scrollable-anchor';

// import {
//   GithubOutlined,
//   CopyrightOutlined,
//   TwitterOutlined
// } from '@ant-design/icons';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  onSelect(e) {
    console.log('onSelect');
  }

  toggleNav() {
    console.log('toggle..');
  }

  render() {
    configureAnchors({ scrollDuration: 1000 });
    return (
        <Navbar className='home'>
          <Card className='card'>
            <Card.Body>
              <Card.Text>
                <div className='space'></div>
                <ListGroup variant='flush'>
                  <ListGroupItem className='list'>
                  <span className='link' onClick={() => goToAnchor('section1')}>
                    Home
                  </span>
                  </ListGroupItem>
                  <ListGroupItem className='list'>
                  <span className='link' onClick={() => goToAnchor('section2')}>
                    About
                  </span>
                  </ListGroupItem>
                  <ListGroupItem className='list'>
                  <span className='link' onClick={() => goToAnchor('section3')}>
                    Portfolio
                  </span>
                  </ListGroupItem>
                  <ListGroupItem className='list'>
                  <span className='link' onClick={() => goToAnchor('section4')}>
                    Contact
                  </span>
                  </ListGroupItem>
                </ListGroup>
              </Card.Text>
              <div className='spaces'></div>
              <ListGroup horizontal>
                <ListGroup.Item className='li'>

                </ListGroup.Item>
                <ListGroup.Item className='li'>
                  <a href='https://twitter.com' className='link'>
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className='li'>
                  <a
                      href='https://en.wikipedia.org/wiki/Copyright'
                      className='link'
                  >
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Navbar>
    );
  }
  componentDidMount() {}
}

export default SideNav;