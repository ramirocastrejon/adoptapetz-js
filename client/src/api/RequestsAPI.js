import {useState, useEffect} from 'react';
import axios from 'axios';

function RequestsAPI(token) {
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        if(token){
        const getRequests = async () => {
            const res = await axios.get('/api/requests', {
                headers: {Authorization: token}
            })
            setRequests(res.data)

        }
        getRequests()
    }
    }, [token])
  return {
      requests: [requests, setRequests]
  }
}

export default RequestsAPI;