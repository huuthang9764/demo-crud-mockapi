import axios from "axios";
export default axios.create({
    baseURL:"https://656ec26b6529ec1c6236957b.mockapi.io",
    headers:{
        "Content-Type":"application/json"
    }
});