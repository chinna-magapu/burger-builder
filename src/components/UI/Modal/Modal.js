import React from 'react';
import classes from './Modal.css';
import WRAP from '../../../hoc/Wrap';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <WRAP>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity:props.show ? '1' : '0'
        }}
        >
        {props.children}
    </div>
    </WRAP>
);

export default modal;