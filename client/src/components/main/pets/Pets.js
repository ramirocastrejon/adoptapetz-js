import React, {useContext} from 'react';
import { GlobalState } from '../../../GlobalState';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function Pets() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [pets] = state.petsAPI.pets
    

  return (
      <>
        <Container>
        <CardGroup><Row xs={1} md={2} xl={4}>{
            pets.map(pet => {
                return(<Card style={{ width: '18rem' }} key={pet._id}>
                <Card.Img variant="top" src={pet.image.url} style={{'width':'100%', 'height':'200px'}}/>
                <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                {pet.description}
                </Card.Text>
                
                </Card.Body>
                <Card.Footer class="card-footer text-center">
                <Button href={`/detail/${pet._id}`} variant="primary" style={{'justifyContent':'center'}}>
                  View
                  </Button>
                {isAdmin ? <Button href={`/editpet/${pet._id}`}>Edit</Button> : ``}
                </Card.Footer>
            </Card>)
            })
            
        }</Row>
        </CardGroup>
        </Container>
      </>
  )
}

export default Pets;