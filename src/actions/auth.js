import { authService } from '../services/authService';
import {showSuccess, hideSuccess, showError, hideError} from './snackbar';
import {showLoader, hideLoader} from './loader';
import jwt from 'jsonwebtoken';
export const LOGIN = 'LOGIN';
export const EDIT_PROFILE = 'EDIT_PROFILE';

function requestlogin() {
    return {
        type: LOGIN,
        isProcessing: true,
        isProcessed: false,
        token: '',
        user: {},
        message: '',
        isAuthenticated: false
    };
}

function loginSuccess(token, user, message) {
    return {
        type: LOGIN,
        isProcessing: false,
        isProcessed: true,
        token: token,
        user: user,
        message: message,
        isAuthenticated: true
    };
}

function editProfileUpdateState(user) {
    return {
        type: EDIT_PROFILE,
        user: user
    };
}

function loginFailure(message) {
    return {
        type: LOGIN,
        isProcessing: false,
        isProcessed: true,
        token: '',
        user: {},
        message: message,
        isAuthenticated: false
    };
}

function logout() {
    return {
        type: LOGIN,
        isAuthenticated: false,
        user: {}
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logout());
    }
}

export function editProfile(id, payload) {
    return (dispatch) => {
        dispatch(showLoader())
        authService.editProfile(id, payload).then((response) => {
            if(response.ok) {
                response.json().then((json) => {
                    console.log(json);
                    dispatch(showSuccess(json.message));
                    dispatch(hideLoader());
                    dispatch(editProfileUpdateState({user: json.user}))
                })
            }else {
                response.json().then((json) => {
                    console.log(json);
                    dispatch(showError(json.message));
                    dispatch(hideLoader());
                })
            }
        })
    }
}

export function forgotPassword(payload){
    return(dispatch) => {
        dispatch(showLoader());
        authService.forgotPassword(payload).then((response) => {
            if(response.ok){
                response.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showSuccess(json.message))        
                })
            } else{
                response.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showError(json.message))        
                })
            }
        }).catch((err) => {

        })
    }
}

export function resetPassword(payload){
    return(dispatch) => {
        dispatch(showLoader());
        authService.resetPassword(payload).then((response) => {
            if(response.ok){
                response.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showSuccess(json.message))        
                })
            } else{
                response.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showError(json.message))        
                })
            }
        }).catch((err) => {

        })
    }
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestlogin(creds));
        authService.login(creds.email, creds.password).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    console.log(json)
                    localStorage.setItem('token', json.token.token);
                    jwt.verify(json.token.token, process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
                        dispatch(loginSuccess(json.token.token, decoded, json.message));
                        // dispatch(showSuccess(json.message));
                    });
                });

            } else {
                response.json().then((json) => {
                    dispatch(loginFailure(json.message))
                    dispatch(showError(json.message));
                });
            }
        }).catch((error) => {
            dispatch(loginFailure(error.message));
            dispatch(showError(error.message));
        })
    }
}
