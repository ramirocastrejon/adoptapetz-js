import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({email: '', password: ''})

    const onChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
        console.log(e)
    }

    const submitLogin = async e => {
        e.preventDefault()
        try {
        
            await axios.post('/user/login', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

  return (
      <Container>
          <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" onChange={onChangeInput}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" onChange={onChangeInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <Link to='/register'>Register</Link>
            </Form>
      </Container>
  )
}

export default Login;
