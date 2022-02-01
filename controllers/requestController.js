const Requests = require('../models/requestModel')
const Users = require('../models/userModel')

const requestController = {
    getRequests: async (req, res) => {
        try {
            const requests = await Requests.find()
            res.json(requests)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createRequest:async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: 'The user does not exist.'})

            const {pet_id, appointment} = req.body;
            const {_id, name, email} = user;
            if(pet_id === null || _id===null || appointment === null) return res.status(400).json({msg: 'missing values'})

            const newRequest = new Requests({
                user_id: _id, name: name, email: email, pet_id: pet_id, appointment: appointment
            })

            await newRequest.save()

            res.json(newRequest)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = requestController;