const { connect } = require('mongoose')

const url = 'mongodb+srv://renegarciaq:coder39750@cluster0.y5tyvlw.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectDB: () => {
        connect(url)
        console.log('Database connected')
    }
}


