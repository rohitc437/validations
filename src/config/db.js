
const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/validations_assiagmnets')
}

module.exports = connect