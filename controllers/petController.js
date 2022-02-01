const Pets = require("../models/petModel")
const APIfeatures = require("../lib/features");

const petController = {
    getPets: async (req, res) => {
        try {
            const features = new APIfeatures(Pets.find(), req.query).paginating()
            .sorting().searching().filtering()

            const result = await Promise.allSettled([
                features.query,
                Pets.countDocuments()
            ])

            const pets = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;
            return res.status(200).json({pets, count})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPet: async (req, res) => {
        try {
            const pet = await Pets.findById(req.params.id)
            if(!pet) return res.status(400).json({msg: 'This pet does not exist.'})

            return res.status(200).json(pet)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    addPet: async (req, res) => {
        try {
            const {name, image, description, category, breed} = req.body
            const newPet = new Pets({
                name, image, description, category, breed
            })
            await newPet.save()
            return res.status(200).json(newPet)
        } catch (err) {
            return res.json({msg: err.message})
        }
     },
     updatePet: async (req, res) => {
         try {
            const {name, image, description, category, breed, available, __v} = req.body

            const pet = await Pets.findByIdAndUpdate(req.params.id, {
                name, image, description, category, breed, available, __v
            }, { new: true})
    
            if(!pet) return res.status(404).json({msg: 'This pet does not exist.'})
    
            return res.status(200).json(pet)
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
        
     },
     deletePet: async (req, res) => {
        try {
            const pet = await Pets.findByIdAndDelete(req.params.id)
            if(!pet) return res.status(404).json({msg: 'This pet does not exist.'})
    
            return res.status(200).json({msg: 'Pet was successfully deleted.'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
     }
}

module.exports = petController;