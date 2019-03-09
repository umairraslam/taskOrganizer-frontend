import { loaderConstants } from '../actions/loader';

const loader = (state=[], action) => {
    switch(action.type){
        case loaderConstants.SHOW_LOADER:
            return {...state, showLoader: true};
        case loaderConstants.HIDE_LOADER:
            return {...state, showLoader: false};
        case loaderConstants.SHOW_DIALOG_LOADER:
            return {...state, showDialogLoader: true};
        case loaderConstants.HIDE_DIALOG_LOADER:
            return {...state, showDialogLoader: false};
        default:
            return state;
    }
}

export default loader;