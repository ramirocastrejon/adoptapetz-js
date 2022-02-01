import React, {useContext} from 'react';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table'
import { GlobalState } from '../../../GlobalState';
import RequestedPet from './RequestedPet';

function Requests() {
    const state = useContext(GlobalState)
    const [requests] = state.requestsAPI.requests
    


    if(requests === null) return (<div>there are no requests</div>) 
  return (
      <Container>
          <Table>
              <thead>
                  <tr>
                      <th>User_id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Appointment</th>
                      <th>Pet</th>
                      <th>Available</th>
                  </tr>
              </thead>
              <tbody>
                  
                  {requests.map(req =>(
                  <tr key={req._id}>
                      <td>{req.user_id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.appointment}</td>
                <RequestedPet pet_id={req.pet_id} />
                    </tr>
                    ))}
                  
              </tbody>
          </Table>
          
      </Container>
  );
}

export default Requests;