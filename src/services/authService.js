export const authService = {
    login
}

const URL = process.env.REACT_APP_BACKEND_API_URL + "/user";

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