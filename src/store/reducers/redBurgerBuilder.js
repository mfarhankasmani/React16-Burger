import * as actionType from '../actions/actionTypes';

// Global constant should be in capital
const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const initialState = {
    ingredients: null,
    totalPrices: 4,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.PURCHASE_BURGER_SUCCESS :
            return {ingredients: null, totalPrices: 4, error:false};
        case actionType.AUTH_LOGOUT :
            return {ingredients: null, totalPrices: 4, error:false};
        case actionType.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrices: state.totalPrices + INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrices: state.totalPrices - INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionType.SET_INGREDIENTS :
            if (state.ingredients){
                return state;
            }
            else {
                return {
                    ...state,
                    ingredients: {
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese: action.ingredients.cheese,
                        meat: action.ingredients.cheese,
                    },
                    error: false
                }
            }
        case actionType.FETCH_INGREDIENTS_FAILED :
            return {
                ...state,
                error: true
            }
        default :
        return state;
    }
}

export default reducer;