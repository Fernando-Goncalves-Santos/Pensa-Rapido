const router = require('express').Router()
const RankingController = require('../controllers/RankingController')

// Middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/save', verifyToken, RankingController.saveScore)
router.get('/:mode/:category', RankingController.showRanking)
router.get('/getall', verifyToken, RankingController.getAll)

module.exports = router