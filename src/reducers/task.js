import { GET_TASKS } from '../actions/task';

const task = (state = [], action) => {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: action.tasks, isProcessing: action.isProcessing, isProcessed: action.isProcessed, message: action.message, error: action.error };
        default:
            return state;
    }
    
}

export default task;