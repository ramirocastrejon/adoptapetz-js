import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const submitRegister = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

  return (
    <Container>
    <Form onSubmit={submitRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control name='name' type="text" placeholder="Enter name" onChange={onChangeInput}/>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email" onChange={onChangeInput}/>
          <Form.Text className="text-muted" >
          We'll never share your email with anyone else.
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" onChange={onChangeInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
          Register
      </Button>
      </Form>
</Container>
  )
}

export default Register;
