import React, { useContext } from "react";

import CartContext from "../../Store/Cart-context";
import ProductForm from "./ProductForm";
import classes from "./ProductItem.module.css";
import homeimg1 from "../../Assets/electronics2.jpg";

const ProductItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price.toFixed(2)} kr.`;

  const addToCartHandler = quantity => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price
    });
  };

  return (
    <li key={props.id} className={classes.product}>
      <div>
        <div className={classes.imgDiv}>
        <img src={homeimg1} alt="HeheIMG" className={classes.imgIcon}/>
        </div>
        <div className={classes.contentDiv}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        </div>
      </div>
      <div>
        <ProductForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ProductItem;
