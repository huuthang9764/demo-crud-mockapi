import React, { useEffect, useState } from 'react';
import UserDataService from '../../Service/User.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = ( ) => {
    const { id }= useParams();
    let navigate = useNavigate();
    const userState = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        isActive: false,
        id: null
    }
    const [users, setUser] = useState(userState);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserDataService.getById(id);

                setUser({
                    username: response.data.username,
                    fullname: response.data.fullname,
                    email: response.data.email,
                    password: response.data.password,
                    isActive: response.data.isActive
                })
                
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser(); // Gọi hàm lấy thông tin người dùng khi component được render
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...users, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserDataService.update(id, users);
           if(response.status===200){
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              });
            navigate("/user");
           }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 d-flex align-items-center h-60'>
                    <div className='col-sm-4 mr-auto'>
                        <h4>Add User</h4>
                    </div>
                </div>
                <form className='col-sm-8' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" 
                        className="form-control" 
                        value={users.username}
                        name="username"
                        onChange={handleInputChange}
                        placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text" 
                        className="form-control" 
                        value={users.fullname}
                        name="fullname"
                        onChange={handleInputChange}
                        placeholder="Fullname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                        className="form-control"
                        value={users.email || ''}
                        name="email"
                        onChange={handleInputChange}
                         placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                        className="form-control" 
                        name="password"
                        value={users.password}
                        onChange={handleInputChange}
                        placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isActive">Active</label>
                        <select className="form-control" 
                        value={users.isActive}
                        name="isActive"  
                        onChange={handleInputChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Published">Published</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/user'>go to list user</Link>
                </form>
            </div>
            </div>
    );
};

export default EditUser;