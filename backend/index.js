const express = require('express')
const cors = require('cors')
require ('dotenv').config()

// Configuração do express
const app = express()

// Configuração do cors
app.use(cors({credentials:true, origin: process.env.CORS_URI})) // Colocar o localhost aqui

// Configuração de respostas em JSON
app.use(express.json())

// Configuração das Rotas
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const QuestionRoutes = require('./routes/QuestionRoutes')
app.use('/questions', QuestionRoutes)

const RankingRoutes = require('./routes/RankingRoutes')
app.use('/ranking', RankingRoutes)

// Inicialização do servidor
const PORT = process.env.PORT || 5000
app.listen(PORT)