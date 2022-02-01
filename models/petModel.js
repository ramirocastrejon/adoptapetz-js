const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    breed: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

petSchema.index({name: 'text'})

const Pets = mongoose.model('Pets', petSchema)

Pets.createIndexes({title: 'text'})

module.exports = Pets;