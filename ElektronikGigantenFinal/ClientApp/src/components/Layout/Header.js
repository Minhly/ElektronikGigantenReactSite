import React, { Fragment, useContext } from "react";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import AuthContext from "../../Store/LoginAuthContext";
import {Link} from "react-router-dom";

const Header = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes.titleTxt}><Link  to="/Admin" >ElektronikGiganten</Link></h1>
        <ul className={classes.ulCLass}>
          <li className={classes.liClass}>
            <Link className={classes.aClass} to="/">
              Home
            </Link>
          </li>
          <li className={classes.liClass}>
            <Link className={classes.aClass} to="/Products">
              Products
            </Link>
          </li>
          {ctx.isLoggedIn && <li className={classes.liClass}>
            <Link onClick={ctx.onLogout} className={classes.aClass} to="/Login">
              Logout
            </Link>
          </li>}
          {!ctx.isLoggedIn && <li className={classes.liClass}>
            <Link className={classes.aClass} to="/Login">
              Login
            </Link>
          </li>}

        </ul>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
