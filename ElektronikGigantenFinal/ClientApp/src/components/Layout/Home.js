import React, { Component } from 'react';
import classes from "./Home.module.css";
import bgimg from "../../Assets/homebgg.jpg"

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <img alt="test" src={bgimg} className={classes.homebg}></img>
      </div>
    );
  }
}
