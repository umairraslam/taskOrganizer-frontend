import { SNACKBARS } from '../actions/snackbar';

const snackbar = (state = [], action) => {

    switch (action.type) {
        case SNACKBARS.SHOW_SUCCESS:
            return { ...state, showSuccessSnackbar: action.showSuccessSnackbar, message:action.message }
        case SNACKBARS.SHOW_ERROR:
            return { ...state, showErrorSnackbar: action.showErrorSnackbar, message:action.message}
        default:
            return state;

    }

}

export default snackbar