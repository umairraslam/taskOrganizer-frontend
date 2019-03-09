export const loaderConstants ={
    SHOW_LOADER : "SHOW_LOADER",
    HIDE_LOADER : "HIDE_LOADER",
    SHOW_DIALOG_LOADER : "SHOW_DIALOG_LOADER",
    HIDE_DIALOG_LOADER : "HIDE_DIALOG_LOADER",
}

export function showLoader(){ 
    return {type: loaderConstants.SHOW_LOADER } 
}
export function hideLoader(){ 
    return { type: loaderConstants.HIDE_LOADER }
}
export function showDialogLoader(){ 
    return { type: loaderConstants.SHOW_DIALOG_LOADER} 
}
export function hideDialogLoader(){ 
    return { type: loaderConstants.HIDE_DIALOG_LOADER} 
}