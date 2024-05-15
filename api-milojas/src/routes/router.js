const express = require('express')

const lojasRouter = require('./lojas-router')
const produtosRouter = require('./produtos-router')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online')
})

router.use('/lojas', lojasRouter)
router.use('/produtos', produtosRouter)

module.exports = router