import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel'


function Home() {
  return (
      <Container>
      <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.flytap.com/-/media/Flytap/new-tap-pages/travelling-with-animals/pets/flying-with-pets-og-image-1200x630.jpg"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>Welcome</h3>
            <p>Adopt-A-Pet is a fictional pet adoption agency.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://todaysveterinarybusiness.com/wp-content/uploads/sites/2/2020/10/Dog-and-Cat-1020.jpg"
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Getting Started</h3>
            <p>Before requesting a specific pet, please register an account.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.bls.gov/opub/btn/volume-2/images/2-16-image.jpg"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Request an appointment</h3>
            <p>Click a specific pet to set up an appointment.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
      </Container>
  )
}

export default Home;
