const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')

// Middlewares
const verifyToken = require('../helpers/verify-token')


router.get("/getall", QuestionController.getAll)
router.get('/categories', verifyToken, QuestionController.getAllCategories)
router.get('/:category', QuestionController.getCategory)


// Fluxo do jogo
router.post("/check/:id", verifyToken, QuestionController.checkAnswer)
router.post("/endgame", verifyToken, QuestionController.endGame)
router.get("/help/:id", verifyToken, QuestionController.eliminateOption)



module.exports = router