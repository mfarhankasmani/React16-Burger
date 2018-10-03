import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
// import {connect} from 'react-redux';

const navigationItems = (props) => (
    <ul className ={classes.NavigationItems}>
    <NavigationItem link= "/" >Burger Builder</NavigationItem>
    {props.isAuth ? <NavigationItem link= "/orders" >Orders</NavigationItem> : null }
    {/* <NavigationItem link= "/auth" >{props.token?'Log Off':'Log In'}</NavigationItem> */}
    {props.isAuth 
        ? <NavigationItem link= "/logout" >Logout</NavigationItem>
        : <NavigationItem link= "/auth" >Login</NavigationItem> }
    </ul>
)

// const mapStateToProps = state => {
//     return{
//         token: state.auth.token,
//     }
// }

// export default connect(mapStateToProps)(navigationItems);
export default navigationItems;