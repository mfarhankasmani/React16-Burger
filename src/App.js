import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter} from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
//import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actionCreator from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  };

  render() {
    let routes = (
      <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/' component={BurderBuilder}/>
      </Switch>
    )
    if (this.props.isAuth){
      routes = (
        <Switch>
            <Route path='/checkout' component={asyncCheckout}/>
            <Route path='/orders' component={asyncOrders}/>
            <Route path='/logout' component={asyncLogout}/>
            <Route path='/' component={BurderBuilder}/>
        </Switch>
      )
    }
    return (
      <div>
      <Layout>
        {routes}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actionCreator.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
