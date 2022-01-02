import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./Products.module.css";
import ProductItem from "./ProductItem";
import mealsImage from "../../Assets/homeimg4.jpg";

const Products = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:13978/api/Products");
      const loadedItems = await response.json();
      setItems(loadedItems);
      setFilteredItems(loadedItems);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onChangeHandler = (event) => {
    const { value: searchTerm } = event.target;
    console.log(searchTerm);
    setSearch(searchTerm);

    let newFilteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(newFilteredItems);
    if (searchTerm === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(newFilteredItems);
    }
  };

  const productList = filteredItems.map((item) => (
    <ProductItem
      id={item.id}
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  ));

  return (
    <React.Fragment>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
      <div className={classes.contentDiv}>
        <div className={classes.summary}>
          <input
            className={classes.searchBar}
            placeholder="Search Products"
            value={search}
            onChange={onChangeHandler}
          />
        </div>
        <section className={classes.products}>
          <Card>
            <ul>{productList}</ul>
          </Card>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Products;
