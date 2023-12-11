import React, { useState } from 'react';
import UserDataService from '../../Service/User.service';
import { Link } from 'react-router-dom';

const AddUser = () => {
    // const [username, setUserName] = useState(''); 
    // const [fullname, setFullName] = useState(''); 
    // const [email, setEmail] = useState(''); 
    // const [password, setPassword] = useState(''); 
    // const [isActive, setIsActive] = useState(false); 
    const [submitted,setSubmitted] = useState(false);
    const userState = {
        username: "",
        fullname: "",
        email: "",
        password: "",
        isActive: false,
        id: null
    }   
  
    const [users, setUser] = useState(userState);
    const handleInputChange = e =>{
        const { name, value } = e.target;
        setUser({ ...users, [name]: value });
    }


    const saveUSer = (e) =>{
        e.preventDefault();
        var data = {
            username: users.username,
            fullname: users.fullname,
            email: users.email,
            password: users.password,
            isActive:users.isActive,
        };
        UserDataService.create(data)
          .then(response=>{
            setUser({
                username: response.data.username,
                fullname: response.data.fullname,
                email: response.data.email,
                password: response.data.password,
                isActive: response.data.isActive
            })
            setSubmitted(true);
          })
          .catch(e => {
            console.log(e);
          });
    }
    const newUser = ()=>{
        setUser(userState);
        setSubmitted(false);
    }

    return (
        <>
        {submitted ? ( 
            <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newUser}>
              Add
            </button>
            <Link to="/user">Go to List User!</Link>
          </div>
          ) : (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 d-flex align-items-center h-60'>
                    <div className='col-sm-4 mr-auto'>
                        <h4>Add User</h4>
                    </div>
                </div>
                <form className='col-sm-8' onSubmit={saveUSer}>
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
                        value={users.email}
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
                    <button type="submit" className="btn btn-primary" >Submit</button>
                    <Link to='/user'>go to list user</Link>
                </form>
            </div>
        </div>)}
        </>
    );
};

export default AddUser;