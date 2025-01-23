const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

const getUserByToken = async (token) => {
    if(!token) {
        return res.status(401).json({message: "Acesso negado!"})
    }

    const decoded = jwt.verify(token, process.env.MY_SECRET)

    const userId = decoded.id

    const user = await User.findById({_id: userId})

    return user

}

module.exports = getUserByToken