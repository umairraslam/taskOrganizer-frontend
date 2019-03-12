import { taskService } from '../services/taskService';
import {showSuccess, hideSuccess, showError, hideError} from './snackbar';
import {showLoader, hideLoader} from './loader';
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';

function setTasks(tasks, isProcessing, isProcessed) {
    return {
        type: GET_TASKS,
        tasks: tasks,
        isProcessing: isProcessing,
        isProcessed: isProcessed
    };
}

export function clearTaskState() {
    return {
        type: GET_TASKS,
        tasks: [],
        isProcessing: false,
        isProcessed: false
    };
}

export function addTask(payload) {
    return (dispatch) => {
        dispatch(showLoader());
        taskService.addTask(payload)
        .then((result) => {
            if(result.ok){
                result.json().then((json) => {
                    dispatch(showSuccess(json.message));
                    dispatch(getTasksByUser(payload.userId))
                })
            } else{
                result.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showError(json.message));
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    };
}

export function updateTask(payload, id) {
    return (dispatch) => {
        dispatch(showLoader());
        taskService.updateTask(payload, id)
        .then((result) => {
            if(result.ok){
                result.json().then((json) => {
                    dispatch(showSuccess(json.message));
                    dispatch(getTasksByUser(payload.userId))
                })
            } else{
                result.json().then((json) => {
                    dispatch(hideLoader());
                    dispatch(showError(json.message));
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    };
}

export function getTasks() {
    return (dispatch) => {
        dispatch(showLoader());
        dispatch(setTasks([], true, false));
        taskService.getAllTasks()
        .then((result) => {
            console.log(result);
            if(result.ok){
                result.json().then((json) => {
                    dispatch(setTasks(json, false, true));
                    dispatch(hideLoader());
                })
            } else{
                result.json().then((json) => {
                    dispatch(setTasks([], false, false));
                    dispatch(showError(json.message));
                    dispatch(hideLoader());
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function getTasksByUser(userId) {
    return (dispatch) => {
        dispatch(showLoader());
        dispatch(setTasks([], true, false));
        taskService.getAllTasksByUser(userId)
        .then((result) => {
            console.log(result);
            if(result.ok){
                result.json().then((json) => {
                    for(let index in json){
                        json[index].start = new Date(json[index].start);
                        json[index].end = new Date(json[index].end);
                    }
                    dispatch(setTasks(json, false, true));
                    dispatch(hideLoader());
                })
            } else{
                result.json().then((json) => {
                    dispatch(setTasks([], false, false));
                    dispatch(showError(json.message));
                    dispatch(hideLoader());
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}