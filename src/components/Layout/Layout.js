import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css'

const layout = (props) => (
    <Wrap>
    <div>
        Toolbar, Side Drawer, Backdrop
    </div>
    <main className={classes.content}>
        {props.children}
    </main>
    </Wrap>
);

export default layout;