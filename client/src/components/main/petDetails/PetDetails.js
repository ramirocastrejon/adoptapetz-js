import React, {useContext, useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios'
import Container from 'react-bootstrap/esm/Container';
import Figure from 'react-bootstrap/Figure'


function PetDetails() {
    const params = useParams()
    const state = useContext(GlobalState);
    const [token] = state.token
    const [pets] = state.petsAPI.pets
    const [petDetails, setPetDetails] = useState([])
    const [date, setDate] = useState('1-23-2022')
    const history = useNavigate()
    
    useEffect(() => {
        if(params.id){
            pets.forEach(pet => {
                if(pet._id === params.id) setPetDetails(pet)
            })
        }
    },[params.id, pets])

    if(petDetails.length === 0) return null;
    
    const requestSuccess = async () => {
        try {
            await axios.post('/api/requests',{
                pet_id: petDetails._id, appointment: date
            }, {headers: {Authorization: token}})
            alert('Request placed successfully!')
            history('/')
        } catch (error) {
            alert(error.response.data.msg)
        }
        
    }

  return (
      <Container>
          <h1>{petDetails.name}</h1>
          <Figure>
              <Figure.Image alt='' src={petDetails.image.url} />
          </Figure>
          <h2>Description: {petDetails.description}</h2>
          <h2>Category: {petDetails.category}</h2>
          <h2>Breed: {petDetails.breed}</h2>
          <h2>Available: {petDetails.available === true ? 'Yes' : 'No'}</h2>
          
          <button onClick={requestSuccess}>Request Appointment</button>
      </Container>
  )
}

export default PetDetails;
