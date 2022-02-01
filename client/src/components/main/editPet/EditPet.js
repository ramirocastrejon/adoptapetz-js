import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import {useNavigate, useParams} from 'react-router-dom'
import CloseButton from 'react-bootstrap/esm/CloseButton';
const initialState = {
    name: '', 
    description: '',
    category: '',
    breed: 'n/a',
    __v: ''
}
function EditPet() {
    const state = useContext(GlobalState)
    const [pet, setPet] = useState(initialState)
    const [image, setImage] = useState(false)
    const history = useNavigate()
    const param = useParams()
    const [token] = state.token
    const [pets] = state.petsAPI.pets

    useEffect(() => {
        if(param.id){
            pets.forEach(p => {
                if(p._id === param.id){
                    setPet(p)
                    setImage(p.image)
                }
            })
        }
    }, [param.id, pets])

    const handleUpload = async e => {
        e.preventDefault()
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
    const handleDeleteImage = async () => {
        try {
            await axios.post('/api/delete', {public_id: image.public_id}, {
                headers: {Authorization: token}
            })
            setImage(false)
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
            console.log(pet)
            console.log(image)
            await axios.put(`/api/pets/${pet._id}`, {...pet, image}, {
                headers: {Authorization: token}
            })
             
            alert('Action Successful.')
            history('/')
        } catch (err) {
            alert(err)
        }
    }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Name</Form.Label>
      <Form.Control name='name' type="text" value={pet.name} onChange={onChangeInput} />
    </Form.Group>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload Picture</Form.Label>
    <div>
    <CloseButton onClick={handleDeleteImage} />
    <img src={image.url} alt=''></img>
    
    </div>
    <Form.Control type="file" onChange={handleUpload} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Description</Form.Label>
      <Form.Control name='description' type="text" value={pet.description} onChange={onChangeInput} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Category</Form.Label>
      <Form.Control name='category' type="text" value={pet.category} onChange={onChangeInput} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicField">
      <Form.Label>Breed</Form.Label>
      <Form.Control name='breed' type="text" value={pet.breed} onChange={onChangeInput}/>
    </Form.Group>
  
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default EditPet;
