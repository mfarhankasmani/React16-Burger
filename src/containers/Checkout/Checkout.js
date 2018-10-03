import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0,
    // }
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price =0;
    //     for (let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else {
    //             //['salad'[0],1[1]] 
    //             ingredients[param[0]] = +param[1]; //+ sign indicates number
    //         }

    //     };
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render (){
        let summary = <Redirect to='/'/>
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                checkoutCancelled= {this.checkoutCancelledHandler}
                checkoutContinued= {this.checkoutContinuedHandler}
                ingredients={this.props.ings} />
                <Route path={this.props.match.path + '/contact-data'} 
                // render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}
                component = {ContactData}
                />
            </div>                
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);