import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../../store/actions/index';

class ContactData extends Component {
    state ={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 5 
                },
                valid: false,
                touched: false
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    // event is added to for preventing form to reload as default == it will erase the data
    orderHandler = (event) =>{
        event.preventDefault();
        // this.setState({loading: true});

        const formData={};
        for (let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // })
        // .catch(error => {
        //     this.setState({loading: false});
        // });
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler= (event, identifier) => {
        //deep cloning needs multiple spread methods
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = updatedFormElement.validation ? this.checkValidity(updatedFormElement.value,updatedFormElement.validation) : true;
        updatedFormElement.touched = true;
        updatedOrderForm[identifier] = updatedFormElement;

        let formIsValid = true;
        for(let identifier in updatedOrderForm){
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render(){
        let formElementArray= [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    changed={(event) => this.inputChangeHandler(event,formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please Enter Contact Details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrices,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order,token) => dispatch(actionCreator.purchaseBurger(order,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));