
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import snackbar from './snackbar';
import loader from './loader';
import task from './task';

const appReducer = combineReducers({
    form: formReducer,
    auth,
    snackbar,
    loader,
    task
});


const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;
