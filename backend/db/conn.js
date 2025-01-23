const mongoose = require('mongoose')
require('dotenv').config()

async function main() {
    const dbURI = process.env.MONGO_URI 
    await mongoose.connect(dbURI)
    console.log('conectado ao Mongoose!')
}

main().catch((err) => console.log(`Erro ao conectar ao Mongoose: ${err}`)) 

module.exports = mongoose