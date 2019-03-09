export const SNACKBARS = {
    SHOW_SUCCESS : 'SHOW_SUCCESS',
    SHOW_ERROR:'SHOW_ERROR'
}


export function showSuccess(message){
    return {
        type:SNACKBARS.SHOW_SUCCESS,
        showSuccessSnackbar:true,
        message: message
    }
}

export function hideSuccess(){
    return {
        type:SNACKBARS.SHOW_SUCCESS,
        showSuccessSnackbar:false,
        message: ''
    }
}

export function showError(message){
    return {
        type:SNACKBARS.SHOW_ERROR,
        showErrorSnackbar:true,
        message: message
    }
}

export function hideError(){
    return {
        type:SNACKBARS.SHOW_ERROR,
        showErrorSnackbar:false,
        message: ''
    }
}