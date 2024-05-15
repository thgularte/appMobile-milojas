const express = require('express')
const checa_token = require('../middlewares/checa-token')
const router = express.Router()
const controllerProdutos = require('../controllers/produtos-controller')

router.post('/', checa_token, (req,res) =>controllerProdutos.create(req,res))
router.get('/', checa_token,(req,res) => controllerProdutos.list(req,res))
router.get('/:id', checa_token, (req,res) =>controllerProdutos.getId(req,res))
router.put('/:id', checa_token,(req,res) => controllerProdutos.update(req,res))

module.exports = router