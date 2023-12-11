import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import './ListUser.css'
import UserDataService from '../../Service/User.service';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUser();
    }, [])

    const retrieveUser = () => {
        UserDataService.getAll()
            .then(response => {
                setUsers(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    UserDataService.remove(id)
                        .then(response => {
      
                            retrieveUser();
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your book has been deleted.',
                                icon: 'success'
                            });
                        })
                        .catch(error => {
                            console.error('Error deleting book: ', error);
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed to delete book.',
                                icon: 'error'
                            });
                        });
                }
            })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 d-flex align-items-center h-60'>
                    <div className='col-sm-4 mr-auto'>
                        <h4>List User</h4>
                    </div>
                    <div className='col-sm-4'>
                        <Link to="/add-user">
                            <Button>Add User</Button>
                        </Link>
                    </div>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, i) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.fullname}</td>
                                <td>{user.isActive ? "Published" : "Pending"}</td>
                                <td>
                                    <Link to={`/edit-user/${user.id}`}>
                                        <i className="bi bi-pencil-square m-2" ></i>
                                    </Link>
                                    <i className="bi bi-trash3 m-2"
                                        onClick={() => handleDelete(user.id)}
                                    ></i>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ListUser;