import { LOGIN, EDIT_PROFILE } from '../actions/auth';

const auth = (state = [], action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isProcessing: action.isProcessing, isProcessed: action.isProcessed, token: action.token, user: action.user, success: action.success, error: action.error, message: action.message, isAuthenticated: action.isAuthenticated };
        case EDIT_PROFILE:
            return { ...state, user: action.user };
        default:
            return state;
    }
    
}

export default auth;