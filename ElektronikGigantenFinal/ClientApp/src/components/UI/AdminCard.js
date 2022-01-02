import React from 'react';
import classes from './AdminCard.module.css';
import { Col} from "reactstrap";

const AdminCard = props => {
  
  return (
          <Col md="3" className={"py-2 border rounded " + classes.card}>
            {props.children}
          </Col>
  )
};

export default AdminCard;