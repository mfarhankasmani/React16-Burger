//Main Container
import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
    //    ingredients : null,
        //purchasable: false,
        purchasing : false,
        // loading: false,
        // error: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
        // axios.get('/ingredients.json')
        // .then(res =>{
        //     this.setState({ingredients: res.data})
        // }).catch(error => {
        //     this.setState({error: true})
        // })
    }
    updatePurchseState (ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     //update state in imutable way
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;
    //     const newPrice = this.state.totalPrices + INGREDIENTS_PRICES[type];
    //     this.setState({totalPrices: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const newCount = oldCount - 1;
    //     //update state in imutable way
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;
    //     const newPrice = this.state.totalPrices - INGREDIENTS_PRICES[type];
    //     this.setState({
    //         totalPrices: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchseState(updatedIngredients);

    // }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        //alert('You Continue')
        // let queryParam = [];
        // for (let i in this.state.ingredients){
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParam.push('price=' + this.state.totalPrices);
        // const queryString = queryParam.join('&');

        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?'+queryString,
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;

        if (this.state.purchasing){
            orderSummary = (
                <OrderSummary ingredients = {this.props.ings}
                purchaseCancelled = {this.purchaseCancelHandler}
                price = {this.props.price.toFixed(2)}
                purchaseContinue = {this.purchaseContinueHandler}/>
            )
        }
        // if (this.state.loading) {
        //     orderSummary = (
        //         <Spinner />
        //     )
        // }

        let burger = this.props.error?<p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls ingredientAdded = {this.props.onIngredientAdded} 
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disable = {disabledInfo}
                    purchasable = {this.updatePurchseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    isAuth = {this.props.isAuth}
                    price = {Number.parseFloat(this.props.price).toFixed(2)}/>
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrices,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreator.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreator.initIngredient()),
        onInitPurchase: () => dispatch(actionCreator.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));