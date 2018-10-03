import * as actionType from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ingredientName) => {
    return {
        type: actionType.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED,
    }
}

const setIngredient = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(res =>{
            dispatch(setIngredient(res.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed(error));
        })
    }
}
