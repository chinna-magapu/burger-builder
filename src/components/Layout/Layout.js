import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css'
import ToolBar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Wrap>
    <div>
       <ToolBar/>
        Side Drawer, Backdrop
    </div>
    <main className={classes.content}>
        {props.children}
    </main>
    </Wrap>
);

export default layout;