import { LOGIN } from '../actions/auth';

const auth = (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isProcessing: action.isProcessing, isProcessed: action.isProcessed, token: action.token, user: action.user, success: action.success, error: action.error, message: action.message, isAuthenticated: action.isAuthenticated };
        default:
            return state;
    }
    
}

export default auth;