export const authService = {
    login,
    editProfile,
    forgotPassword,
    resetPassword,
    signUp,
    resetPasswordInternal
}

const URL = process.env.REACT_APP_BACKEND_API_URL + "/user";
const token = localStorage.getItem('token');
function login(email, password){
    let config = {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            email:email,
            password: password
        })
    };
    return fetch(URL+"/login", config);
}

function signUp(payload){
    let config = {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/signUp", config);
}


function editProfile(id, payload){
    let config = {
        method:'PUT',
        headers:{"Content-Type":"application/json", "authorization": token},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/edit/"+id, config);
}

function forgotPassword(payload){
    let config = {
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/forgotPassword", config);
}

function resetPassword(payload){
    let config = {
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/resetPassword", config);
}

function resetPasswordInternal(payload){
    let config = {
        method:'PUT',
        headers:{"Content-Type":"application/json", "authorization": token},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/resetPassword/internal", config);
}