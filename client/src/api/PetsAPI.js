import {useEffect, useState} from 'react';
import axios from 'axios';

function PetsAPI() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        const getPets = async () => {
            const res = await axios.get('/api/pets')
            setPets(res.data.pets)
        }
        getPets()
        
    }, [])
  return {
      pets: [pets, setPets]
  }
}

export default PetsAPI;