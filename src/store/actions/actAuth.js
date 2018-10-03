import * as actionType from './actionTypes';
import axios from 'axios';

const authStart= () => {
    return {
        type:actionType.AUTH_START
    }
}

const authSuccess= (idToken, localId) => {
    return {
        type:actionType.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    }
}

const authFail= (error) => {
    console.log(error);
    return {
        type:actionType.AUTH_FAIL,
        error: error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT,
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime*1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFUKe_Dngddg31d6yWYSJef5Dk0aIUpLE';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDFUKe_Dngddg31d6yWYSJef5Dk0aIUpLE'
        }
        axios.post(url, authData)
        .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(error => {
                dispatch(authFail(error.response.data.error));
            });
     
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    }
}