import React, {useState, useEffect, useContext} from 'react';
import { GlobalState } from '../../../GlobalState';

function RequestedPet(pet_id) {
  const state = useContext(GlobalState)
  const [pets] = state.petsAPI.pets
  const [petDetails, setPetDetails] = useState([])

  useEffect(() => {
    if(pet_id){
        pets.forEach(pet => {
            if(pet._id === pet_id.pet_id) setPetDetails(pet)
        })
    }
},[pet_id, pets])
    


  return (<><td>{petDetails.name}</td> 
  <td>{petDetails.available === true ? 'Yes': 'No'}
  </td></>);
}

export default RequestedPet;