import React from "react";

import classes from "./AdminItem.module.css";
import homeimg1 from "../../Assets/electronics2.jpg";

const AdminItem = (props) => {

  const price = `${props.price.toFixed(2)} kr.`;



  return (
    <React.Fragment>

    <li key={props.id} className={classes.product}>
      <div>
        <div className={classes.imgDiv}>
        <img src={homeimg1} alt="HeheIMG" className={classes.imgIcon}/>
        </div>
        <div className={classes.contentDiv}>
        <h3 className={classes.title}>{props.name}</h3>
        <div className={classes.price}>{price}</div>
        </div>
        <button type="button" className={classes.editButton} value={props.id} onClick={props.showModal}>Edit Product</button>
      </div>
    </li>
    </React.Fragment>
  );
};

export default AdminItem;
