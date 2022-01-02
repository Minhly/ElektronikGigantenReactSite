import React, { useContext } from "react";
import CartContext from "../../Store/Cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import UserContext from "../../Store/LoginAuthContext"

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)} kr.`;
  const hasItems = cartCtx.items.length > 0;

  let transformedItems = [];
  cartCtx.items.forEach(item => {
    transformedItems.push({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    })
  });
  let date = new Date();
  const OrderSale = {
    "orderdate": date,
    "customerId": userCtx.customerId,
    "orderstatusId": 1,
    "storeId": 1,
    "orderDeliveries": [
        {
            "customerId": userCtx.customerId,
            "address": userCtx.address,
            "deliverystatusId": 1,
            "datedelivered": date,
            "postal": userCtx.postal
        }
    ],
    "orderLines": transformedItems
  }

  

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, quantity: 1});
  };



  const OrderCheckout = async () => {
    let url = "http://localhost:13978/api/OrderSales";
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(OrderSale),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      console.log("WTF IS GOING ON?!");
      console.log(userCtx.customerId);
      console.log(OrderSale);
      console.log(JSON.stringify(OrderSale));
      console.log("Success items bought!")
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={OrderCheckout}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
