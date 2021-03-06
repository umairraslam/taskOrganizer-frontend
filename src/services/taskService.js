export const taskService = {
    getAllTasks,
    addTask,
    getAllTasksByUser,
    updateTask,
    deleteTask
}

const URL = process.env.REACT_APP_BACKEND_API_URL + "/task";
const token = localStorage.getItem('token');
function getAllTasks(){
    let config = {
        method:'GET',
        headers:{"Content-Type":"application/json", "authorization": token}
    };
    return fetch(URL, config);
}

function getAllTasksByUser(userId){
    let config = {
        method:'GET',
        headers:{"Content-Type":"application/json", "authorization": token}
    };
    return fetch(URL+"/"+userId, config);
}

function addTask(payload){
    let config = {
        method:'POST',
        headers:{"Content-Type":"application/json", "authorization": token},
        body: JSON.stringify(payload)
    };
    return fetch(URL, config);
}

function updateTask(payload, id){
    let config = {
        method:'PUT',
        headers:{"Content-Type":"application/json", "authorization": token},
        body: JSON.stringify(payload)
    };
    return fetch(URL+"/"+id, config);
}

function deleteTask(id){
    let config = {
        method:'DELETE',
        headers:{"Content-Type":"application/json", "authorization": token}
    };
    return fetch(URL+"/"+id, config);
}