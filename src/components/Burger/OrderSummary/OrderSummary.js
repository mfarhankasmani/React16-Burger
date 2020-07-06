// Create Order Summary
import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
        <li key = {igKey}>
            <span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>
        )
    });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Burger with the following Indredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked ={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked ={props.purchaseContinue}>CONTINUE</Button>
        </React.Fragment>
    )

};

export default orderSummary;