import React , { Component } from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.css'
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        const sideDrawer = this.state.showSideDrawer;
        this.setState({showSideDrawer: !sideDrawer });
    }

   render(){
       return (
           <Wrap>
               <div>
                   <ToolBar toggleButton={this.sideDrawerCloseHandler}/>
                   <SideDrawer open={this.state.showSideDrawer}
                               closed={this.sideDrawerCloseHandler}/>
               </div>
               <main className={classes.content}>
                   {this.props.children}
               </main>
           </Wrap>
       );
    }
}
export default Layout;