const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pet_id: {
        type: String,
        required: true
    },
    appointment: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Requests', requestSchema)