import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index'


class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: false
    // }
    componentDidMount(){
        // axios.get('/orders.json')
        // .then(res => {
        //     const fetchedOrders = [];
        //     for (let key in res.data){
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id: key
        //         })
        //     }
        //     console.log(fetchedOrders);
        //     this.setState({loading: false, orders: fetchedOrders});
        // }).catch(err => {
        //     this.setState({loading: false});
        // })
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }
    render(){
        return(
            <div>
                {this.props.orders.map(order =>
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actionCreator.fetchOrder(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));