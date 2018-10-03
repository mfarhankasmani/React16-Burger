import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
]

const buildControls = (props) => { 
    return (
        <div className ={classes.BuildControls}>
        <p>Current Price: <strong>{props.price}$</strong></p>
            {controls.map(ctlr => (
                <BuildControl 
                key = {ctlr.label} 
                label = {ctlr.label}
                added ={() => props.ingredientAdded(ctlr.type)}
                removed = {() => props.ingredientRemoved(ctlr.type)}
                disabled = {props.disable[ctlr.type]}/>
            ))}
            <button 
            className = {classes.OrderButton}
            onClick = {props.ordered}
            disabled = {!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'LOGIN / SIGNUP'}</button>
        </div>
    );
}

export default buildControls;