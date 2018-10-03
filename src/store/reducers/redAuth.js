import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState= {
    token: null,
    userId:null,
    error: null,
    loading: false
}

const authSuccess = (state, action) => {
    return updateObject(state,{
        token: action.token, 
        userId: action.userId,
        error: null, 
        loading: false});
}


const reducer = (state = initialState,action) => {
    switch (action.type) {
        case actionType.AUTH_START  : return updateObject(state,{error: null, loading: true});
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL   : return updateObject(state,{error: action.error, loading: false});
        case actionType.AUTH_LOGOUT : return updateObject(state,{token: null, userId: null});
        default                     : return state;
    }

}

export default reducer;