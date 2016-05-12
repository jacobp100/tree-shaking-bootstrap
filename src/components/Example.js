/* eslint max-len: [0] */
import React from 'react';
import classnames from 'classnames';
import {
  container, navbar, navbarLight, bgFaded, navbarToggler, hiddenSmUp, collapse, navbarToggleableXs,
  navbarBrand, nav, navbarNav, navItem, active, navLink, srOnly, formInline, pullXsRight, btn,
  btnSuccessOutline, formControl, jumbotron, btnLg, btnPrimary,
} from '../../styles/bootstrap.m.css';

export default () => (
  <div className={container}>
    <nav className={classnames(navbar, navbarLight, bgFaded)}>
      <button className={classnames(navbarToggler, hiddenSmUp)} type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header">
        &#9776;
      </button>
      <div className={classnames(collapse, navbarToggleableXs)}>
        <a className={navbarBrand} href="#">Navbar</a>
        <ul className={classnames(nav, navbarNav)}>
          <li className={classnames(navItem, active)}>
            <a className={navLink} href="#">Home <span className={srOnly}>(current)</span></a>
          </li>
          <li className={navItem}>
            <a className={navLink} href="#">Features</a>
          </li>
          <li className={navItem}>
            <a className={navLink} href="#">Pricing</a>
          </li>
          <li className={navItem}>
            <a className={navLink} href="#">About</a>
          </li>
        </ul>
        <form className={classnames(formInline, pullXsRight)}>
          <input className={formControl} type="text" placeholder="Search" />
          <button className={classnames(btn, btnSuccessOutline)} type="submit">Search</button>
        </form>
      </div>
    </nav>
    <div className={jumbotron}>
      <h1>Navbar example</h1>
      <p>This example is a quick exercise to illustrate how the default responsive navbar works. It's placed within a <code>.container</code> to limit its width and will scroll with the rest of the page's content.</p>
      <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
      <p>
        <a className={classnames(btn, btnLg, btnPrimary)} href="../../components/navbar" role="button">View navbar docs &raquo;</a>
      </p>
    </div>
  </div>
);
