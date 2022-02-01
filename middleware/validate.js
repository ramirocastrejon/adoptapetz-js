
const checkPetData = async (req, res, next) => {
    const errors = []


    for(const key in req.body){
        if(req.body[key] === null){
            errors.push(`Please add pet ${key}. Current value: ${req.body[key]}`)
        }
    }
    if(errors.length > 0)
        return res.status(401).json({msg: errors})

    next();
}
module.exports = checkPetData