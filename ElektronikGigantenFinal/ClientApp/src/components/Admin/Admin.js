import React, { useState, useEffect } from "react";
import Card from "../UI/AdminCard";
import classes from "./Admin.module.css";
import ProductItem from "../Products/AdminItem";
import { Container, Row } from "reactstrap";
import Modal from "../Admin/AdminModal"
import PostModal from "../Admin/AdminPostModal"

const Admin = (props) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [productShown, SetProductShown] = useState(false);
  const [postModalShown, setPostModalShown] = useState(false);
  const [salesModalShown, setSalesModalShown] = useState(false);
  const [salesItems, setSalesItems] = useState([]);

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

  const fetchSalesItems = async () => {
    try {
      const response = await fetch("http://localhost:13978/api/OrderSales/xxx");
      const loadedItems = await response.json();
      setSalesItems(loadedItems);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchSalesItems();
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

  const hideModal = () => {
    SetProductShown(false);
  };

  const showModal = (event) => {
    const id = +event.target.value;
    var product = filteredItems.filter(item => item.id === id)[0];
    setSelectedProduct(product);
    console.log(product);
    SetProductShown(true);
  };

  const hidePostModal = () => {
    setPostModalShown(false);
  };

  const showPostModal = () => {
    setPostModalShown(true);
  };

  const hideSalesModal = () => {
    setSalesModalShown(false);
  };

  const showSalesModal = () => {
    setSalesModalShown(true);
  };

  const selectedProductChangeHandler = (event) => {
    const { name, value } = event.target;

    setSelectedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveEdit = async () => {
    let url = "http://localhost:13978/api/Products/"+selectedProduct.id;
    console.log(selectedProduct);
    console.log(JSON.stringify(selectedProduct));
    try {
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify(selectedProduct),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      console.log(url+selectedProduct.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async () => {
    let url = "http://localhost:13978/api/Products/"+selectedProduct.id;
    console.log(selectedProduct);
    console.log(JSON.stringify(selectedProduct));
    try {
      await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(selectedProduct),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const CreateProduct = async () => {
    let url = "http://localhost:13978/api/Products/";
    console.log(selectedProduct);
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(selectedProduct),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      console.log(selectedProduct);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {    
    console.log(selectedProduct);
  }, [selectedProduct])

  const salesOrderList = salesItems.map((item) => (
    <div key={item.id}>
      <table>
        <thead>
      <th className={classes.thStyle}>SalesOrderId</th>
      <th className={classes.thStyle}>Customer</th>
      <th className={classes.thStyle}>Products</th>
        </thead>
        <tbody>
          <td>{item.id}</td>
          <td>{item.customer.firstname + " " + item.customer.lastname}</td>
        <td>
      <ul>
        {item.orderLines.map(orderLine => (
          <li>
            {orderLine.id + orderLine.product.name}
          </li>
        ))}
      </ul>
        </td>
        </tbody>
        <br></br>
      </table>
    </div>
  ));

  const productList = filteredItems.map((item) => (
    <Card key={item.id}>
      <ProductItem
        id={item.id}
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        quantity={item.quantity}
        showModal={showModal}
      />
    </Card>
  ));

  return (
    <React.Fragment>
      <div className={classes.contentDiv}>
      <button onClick={showPostModal} className={classes.createButton3}>Create Product</button>
      <button onClick={showSalesModal} className={classes.createButton4}>View all Sales</button>
        <div className={classes.summary}>
          <input
            className={classes.searchBar}
            placeholder="Search Products"
            value={search}
            onChange={onChangeHandler}
          />
        </div>
        <section className={classes.products}>
          <Container>
            <Row>{productList}</Row>
          </Container>
        </section>
      </div>
      {postModalShown &&     
    <PostModal onClose={hidePostModal}>
      <div className={classes.actions}>
        <label>Name</label>
        <input type="text" name="name" onChange={selectedProductChangeHandler}></input>
        <label>Description</label>
        <textarea type="text" name="description" className={classes.descriptionTxt} onChange={selectedProductChangeHandler}></textarea>
        <label>Price</label>
        <input type="text" name="price" onChange={selectedProductChangeHandler}></input>
        <label>Quantity</label>
        <input type="text" name="quantity" onChange={selectedProductChangeHandler}></input>
        <label>Category id</label>
        <input type="text" name="categoryId" onChange={selectedProductChangeHandler}></input>
        <br></br><br></br>
        <button onClick={CreateProduct} className={classes.createButton2}>Create Product</button>
        <br></br><br></br>
        <button className={classes.createButton2} onClick={hidePostModal}>
          Close
        </button>
      </div>
    </PostModal>}  
      {productShown &&     
    <Modal onClose={hideModal}>
      <div className={classes.actions}>
        <label>Name</label>
        <input type="text" name="name" value={selectedProduct.name} onChange={selectedProductChangeHandler}></input>
        <label>Description</label>
        <textarea type="text" className={classes.descriptionTxt} name="description" value={selectedProduct.description} onChange={selectedProductChangeHandler}></textarea>
        <label>Price</label>
        <input type="text" name="price" value={selectedProduct.price} onChange={selectedProductChangeHandler}></input>
        <label>Quantity</label>
        <input type="text" name="quantity" value={selectedProduct.quantity} onChange={selectedProductChangeHandler}></input>
        <br></br><br></br>
        <button onClick={saveEdit} className={classes.createButton2}>Save Edit</button>
        <br></br><br></br>
        <button onClick={deleteProduct} className={classes.createButton2}>Delete Product</button>
        <br></br><br></br>
        <button className={classes.createButton2} onClick={hideModal}>
          Close
        </button>
      </div>  
    </Modal>}  
    {salesModalShown &&     
    <Modal onClose={hideSalesModal}>
      <div className={classes.actions}>
        <label className={classes.salesTitle}>Sales</label>
          {salesOrderList}
        <button className={classes.createButton2} onClick={hideSalesModal}>
          Close
        </button>
      </div>
    </Modal>}  
    
    </React.Fragment>
  );
};

export default Admin;
