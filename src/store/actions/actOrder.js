import * as actionType from './actionTypes';
import axios from '../../axios-order';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFailure = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch  => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT,
    }
}

const fetchOrderStart= () => {
    return {
        type:actionType.FETCH_ORDERS_START
    }
}

const fetchOrderSuccess= (orders) => {
    return {
        type:actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrderFail= (error) => {
    return {
        type:actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
        dispatch(fetchOrderStart());
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        }).catch(err => {
            dispatch(fetchOrderFail(err));
        })
    }
}