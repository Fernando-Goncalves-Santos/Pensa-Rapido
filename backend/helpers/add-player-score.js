const User = require('../models/User')
const getToken = require('./get-token')
const getUserByToken = require('./get-user-by-token')

const addPlayerScore = async (req) => {
    
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(!token || !user) {
        return res.status(500).json({message: "Acesso negado!"})
    }


    const query = {_id: user._id}
    const update = {$inc: {score: 1}}
    const options = {upsert: true}

    await User.updateOne(query, update, options)
    return

}

module.exports = addPlayerScore