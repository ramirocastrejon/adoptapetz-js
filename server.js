require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const path = require('path')


const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cookieParser())

//Database
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
   autoIndex: false
}, (err) => {
   if(err) throw err;
   console.log('Connected to MONGODB.') 
})
//Routes
app.use('/api', routes)
app.use('/user', routes)

if(process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build'))
   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
   })
}

//Start server listening
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`)
})