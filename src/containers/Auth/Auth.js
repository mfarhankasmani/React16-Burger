import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:  {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignup: true,
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

        // if(rules.isEmail){
        //     const filter = "/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/";
        //     isValid = String(value).search(filter) != -1 && isValid;
        // }
        return isValid;
    }

    inputChangeHandler= (event, identifier) => {
        //deep cloning needs multiple spread methods
        const updatedOrderForm = {
            ...this.state.controls
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
        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler=() => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }
    render() {
        let formElementArray= [];
        for (let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                changed={(event) => this.inputChangeHandler(event,formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}
            />
        ))

        if (this.props.loading) form = <Spinner />;
        
        let errorMsg = this.props.error ? (<p>{this.props.error.message}</p>) : null;
        let authRedirect = this.props.isAuth ? <Redirect to='/'/> : null;
        
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
                <Button
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? 'LOGIN': 'SIGNUP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth : state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup)=> dispatch(actionCreator.auth(email,password,isSignup)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);