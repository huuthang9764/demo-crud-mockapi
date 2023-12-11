import httpCommon from "../http-common"

const getAll = () =>{
    return httpCommon.get('/users');
}
const create = data => {
    return httpCommon.post("/users", data);
  };
const getById = (id) =>{
    return httpCommon.get(`/users/${id}`);
}
const update = (id,data) =>{
    return httpCommon.put(`/users/${id}`,data);
}
const remove = id => {
    return httpCommon.delete(`/users/${id}`);
  };
const UserDataService ={
    getAll,
    create,
    getById,
    update,
    remove
}

export default UserDataService;