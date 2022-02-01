const petRoute = require('./petRoute')
const userRouter = require('./userRouter')
const requestRouter = require('./requestRouter')
const upload = require('./upload')

const routes = [
    petRoute,
    userRouter,
    requestRouter,
    upload
]

module.exports = routes;