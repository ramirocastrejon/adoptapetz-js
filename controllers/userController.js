const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email});
            if(user) return res.status(400).json({msg: 'This email already exists.'})

            if(password.length < 7)
                return res.status(400).json({msg: 'Password must be atleast 7 characters long.'})

            //Encrypt the password
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: hashPassword
            })

            await newUser.save()     
            
            
            const refreshToken = createRefreshToken({id: newUser._id})

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 5 * 24 * 60 * 60 * 1000
            })

            return res.status(200).json({msg: "Registration Successful."})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: 'No user exists with given email.'})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Incorrect password.'})

            const accessToken = createAccessToken({id: user._id})
            const refreshToken = createRefreshToken({id: user._id})

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 5 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({accessToken})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    refreshToken: (req, res) => {
        try {
            const rfrsh_token = req.cookies.refreshToken
            if(!rfrsh_token) return res.status(400).json({msg: 'Please login or register.'})

            jwt.verify(rfrsh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: 'Please login or register'})

                const accessToken = createAccessToken({id: user.id})
                res.json({user, accessToken})
            })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {path: 'user/refresh_token'})
            return res.json({msg: 'Successfully logged out.'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUser:async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: 'The user does not exist.'})

            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
   
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5d'})
}
module.exports = userController;