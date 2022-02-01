import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Login from './auth/Login';
import Register from './auth/Register';
import AddPet from './addPet/AddPet';
import Requests from './requests/Requests';
import Pets from './pets/Pets';
import PetDetails from './petDetails/PetDetails';
import Home from './home/Home';
import EditPet from './editPet/EditPet';

function Pages() {

  return (
      <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/addPet' exact element={<AddPet/>} />
          <Route path='/request' exact element={<Requests/>} />
          <Route path='/find' exact element={<Pets />} />
          <Route path='/detail/:id' exact element={<PetDetails />} />
          <Route path='/editpet/:id' exact element={<EditPet />} />
      </Routes>
  )
}

export default Pages;