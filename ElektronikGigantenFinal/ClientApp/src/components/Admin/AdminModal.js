import React, { Fragment } from 'react';

import classes from './AdminModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const AdminModal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose}/>
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default AdminModal;