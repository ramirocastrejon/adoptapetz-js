import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useNavigate} from 'react-router-dom'

const initialState = {
    name: '', 
    description: '',
    category: '',
    breed: 'n/a'
}

function AddPet() {
    const state = useContext(GlobalState)
    const [pet, setPet] = useState(initialState)
    const [image, setImage] = useState(false)
    const history = useNavigate()
    const [token] = state.token

    const handleUpload = async e => {
        try {
          
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/for-data', Authorization: token}
            })
            setImage(res.data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const onChangeInput = e => {
        const {name, value} = e.target
        setPet({...pet, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            
            if(!image) return alert('No image uploaded')
            await axios.post('/api/pets', {...pet, image}, {
                headers: {Authorization: token}
            })
             
        
            history('/')
        } catch (err) {
            alert(err)
        }
    }
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Name</Form.Label>
      <Form.Control name='name' type="text" placeholder="Enter name of pet" onChange={onChangeInput} />
    </Form.Group>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file" onChange={handleUpload} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Description</Form.Label>
      <Form.Control name='description' type="text" placeholder="Enter brief description." onChange={onChangeInput} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Category</Form.Label>
      <Form.Control name='category' type="text" placeholder="Select Category." onChange={onChangeInput} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Breed</Form.Label>
      <Form.Control name='breed' type="text" placeholder="Enter breed (Optional)." onChange={onChangeInput}/>
    </Form.Group>
  
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default AddPet;
