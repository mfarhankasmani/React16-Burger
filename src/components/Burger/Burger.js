import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // way of transforming object into key value pair
    let transformedIngredient = Object.keys(props.ingredients).map(igKey =>{ //object key will give 'salad', meat etc
        return [...Array(props.ingredients[igKey])].map((_,i) => { // .map array() creates the array with blank array places depending on the number passed in props obj
            return <BurgerIngredient key = {igKey + i} type ={igKey}/> // .map will itrate throw kyes for given number of times
        }) 
    }).reduce((arr,el) => {
        return arr.concat(el) 
    },[]);

    if (transformedIngredient.length === 0){
        transformedIngredient = <p>Please Add Ingredients!!</p>;
    }
    return (
        <div className ={classes.Burger}>
            <BurgerIngredient type = 'bread-top'/>
            {transformedIngredient}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    );
};

export default burger;

