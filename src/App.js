import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ListUser from './components/User/ListUser';
import Home from './components/Home/Home';
import AddUser from './components/User/AddUser';
import EditUser from './components/User/EditUser';

function App() {
  return (
    <div className="pageWrapper">
      <Sidebar/>
      <div className='main-panel'>
      <Routes>
        <Route exact path='/'  extrac element={<Home/>}/>
        <Route path='/user'  element={<ListUser/>}/>
        <Route path='/add-user'  element={<AddUser/>}/>
        <Route path='/edit-user/:id'  element={<EditUser/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
